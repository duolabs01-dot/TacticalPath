import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { supabase } from '../lib/supabase';
import { hashPictures } from '../lib/crypto';
import type { Database } from '../lib/database.types';

type Coach = Database['public']['Tables']['coaches']['Row'];

interface AuthContextType {
  // Coach auth (Supabase Auth)
  coach: Coach | null;
  coachLoading: boolean;
  signInCoach: (email: string, password: string) => Promise<{ error: string | null }>;
  signUpCoach: (email: string, password: string, displayName: string, orgName: string) => Promise<{ error: string | null }>;
  signOutCoach: () => Promise<void>;

  // Student auth (picture password, no Supabase Auth)
  studentId: string | null;
  studentClassroomSlug: string | null;
  signInStudent: (classroomSlug: string, pictures: string[]) => Promise<{ error: string | null; studentId: string | null }>;
  signOutStudent: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [coach, setCoach] = useState<Coach | null>(null);
  const [coachLoading, setCoachLoading] = useState(true);
  const [studentId, setStudentId] = useState<string | null>(
    () => sessionStorage.getItem('tp_student_id')
  );
  const [studentClassroomSlug, setStudentClassroomSlug] = useState<string | null>(
    () => sessionStorage.getItem('tp_student_classroom')
  );

  // Listen to Supabase auth changes (coach)
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const { data } = await supabase
            .from('coaches')
            .select('*')
            .eq('id', session.user.id)
            .single();
          setCoach(data);
        } else {
          setCoach(null);
        }
        setCoachLoading(false);
      }
    );

    // Check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        supabase
          .from('coaches')
          .select('*')
          .eq('id', session.user.id)
          .single()
          .then(({ data }) => {
            setCoach(data);
            setCoachLoading(false);
          });
      } else {
        setCoachLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInCoach = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message || null };
  }, []);

  const signUpCoach = useCallback(async (
    email: string,
    password: string,
    displayName: string,
    orgName: string
  ) => {
    // 1. Sign up with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError || !authData.user) {
      return { error: authError?.message || 'Sign up failed' };
    }

    // 2. Create organization
    const { data: org, error: orgError } = await supabase
      .from('organizations')
      .insert({ name: orgName })
      .select()
      .single();

    if (orgError) {
      return { error: orgError.message };
    }

    // 3. Create coach profile
    const { error: coachError } = await supabase
      .from('coaches')
      .insert({
        id: authData.user.id,
        email,
        display_name: displayName,
        organization_id: org.id,
      });

    if (coachError) {
      return { error: coachError.message };
    }

    return { error: null };
  }, []);

  const signOutCoach = useCallback(async () => {
    await supabase.auth.signOut();
    setCoach(null);
  }, []);

  // Student auth: hash picture selection and match against DB
  const signInStudent = useCallback(async (classroomSlug: string, pictures: string[]) => {
    if (pictures.length !== 3) {
      return { error: 'Select exactly 3 pictures', studentId: null };
    }

    const hash = await hashPictures(pictures);

    // Find classroom by slug
    const { data: classroom } = await supabase
      .from('classrooms')
      .select('id')
      .eq('slug', classroomSlug)
      .single();

    if (!classroom) {
      return { error: 'Classroom not found', studentId: null };
    }

    // Find student by picture password hash in this classroom
    const { data: student } = await supabase
      .from('students')
      .select('id')
      .eq('classroom_id', classroom.id)
      .eq('picture_password_hash', hash)
      .eq('is_active', true)
      .single();

    if (!student) {
      return { error: 'Wrong picture password. Try again!', studentId: null };
    }

    // Store in session
    sessionStorage.setItem('tp_student_id', student.id);
    sessionStorage.setItem('tp_student_classroom', classroomSlug);
    setStudentId(student.id);
    setStudentClassroomSlug(classroomSlug);

    return { error: null, studentId: student.id };
  }, []);

  const signOutStudent = useCallback(() => {
    sessionStorage.removeItem('tp_student_id');
    sessionStorage.removeItem('tp_student_classroom');
    setStudentId(null);
    setStudentClassroomSlug(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        coach,
        coachLoading,
        signInCoach,
        signUpCoach,
        signOutCoach,
        studentId,
        studentClassroomSlug,
        signInStudent,
        signOutStudent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}


// Utility for coaches to generate picture password hash for a student
export async function generatePictureHash(pictures: string[]): Promise<string> {
  return hashPictures(pictures);
}
