import { useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Student = Database['public']['Tables']['students']['Row'];
type Classroom = Database['public']['Tables']['classrooms']['Row'];
type ThemeMastery = Database['public']['Tables']['theme_mastery']['Row'];

/**
 * Hook for coach classroom management operations
 */
export function useClassroomManagement() {
  /** Create a new classroom */
  const createClassroom = useCallback(async (
    name: string,
    organizationId: string,
    coachId: string
  ) => {
    // Generate slug
    const { data: org } = await supabase
      .from('organizations')
      .select('name')
      .eq('id', organizationId)
      .single();

    const slug = generateSlug(org?.name || 'school', name);

    const { data, error } = await supabase
      .from('classrooms')
      .insert({
        slug,
        name,
        organization_id: organizationId,
        coach_id: coachId,
      })
      .select()
      .single();

    return { data, error };
  }, []);

  /** Add a student to a classroom */
  const addStudent = useCallback(async (
    classroomId: string,
    firstName: string,
    lastInitial: string,
    picturePassword: string[], // 3 emojis
    avatarEmoji: string = '🎓'
  ) => {
    const hash = await hashPictures(picturePassword);

    const { data, error } = await supabase
      .from('students')
      .insert({
        first_name: firstName,
        last_initial: lastInitial,
        avatar_emoji: avatarEmoji,
        classroom_id: classroomId,
        picture_password_hash: hash,
      })
      .select()
      .single();

    return { data, error };
  }, []);

  /** Bulk add students from a roster */
  const bulkAddStudents = useCallback(async (
    classroomId: string,
    roster: Array<{
      firstName: string;
      lastInitial: string;
      picturePassword: string[];
      avatarEmoji?: string;
    }>
  ) => {
    const students = await Promise.all(
      roster.map(async (s) => ({
        first_name: s.firstName,
        last_initial: s.lastInitial,
        avatar_emoji: s.avatarEmoji || '🎓',
        classroom_id: classroomId,
        picture_password_hash: await hashPictures(s.picturePassword),
      }))
    );

    const { data, error } = await supabase
      .from('students')
      .insert(students)
      .select();

    return { data, error };
  }, []);

  /** Get all students in a classroom with mastery data */
  const getClassroomStudents = useCallback(async (classroomId: string) => {
    const { data: students, error } = await supabase
      .from('students')
      .select('*')
      .eq('classroom_id', classroomId)
      .eq('is_active', true)
      .order('first_name');

    if (!students) return { students: [], mastery: {}, error };

    // Fetch mastery for all students
    const { data: mastery } = await supabase
      .from('theme_mastery')
      .select('*')
      .in('student_id', students.map(s => s.id));

    // Group mastery by student
    const masteryByStudent: Record<string, ThemeMastery[]> = {};
    mastery?.forEach(m => {
      if (!masteryByStudent[m.student_id]) masteryByStudent[m.student_id] = [];
      masteryByStudent[m.student_id].push(m);
    });

    return { students, mastery: masteryByStudent, error };
  }, []);

  /** Get coach's classrooms */
  const getMyClassrooms = useCallback(async (coachId: string) => {
    const { data, error } = await supabase
      .from('classrooms')
      .select('*, organizations(name)')
      .eq('coach_id', coachId)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    return { data, error };
  }, []);

  /** Deactivate a student */
  const deactivateStudent = useCallback(async (studentId: string) => {
    const { error } = await supabase
      .from('students')
      .update({ is_active: false })
      .eq('id', studentId);

    return { error };
  }, []);

  /** Reset a student's picture password */
  const resetPassword = useCallback(async (studentId: string, newPictures: string[]) => {
    const hash = await hashPictures(newPictures);
    const { error } = await supabase
      .from('students')
      .update({ picture_password_hash: hash })
      .eq('id', studentId);

    return { error };
  }, []);

  return {
    createClassroom,
    addStudent,
    bulkAddStudents,
    getClassroomStudents,
    getMyClassrooms,
    deactivateStudent,
    resetPassword,
  };
}

// ---- Helpers ----

function generateSlug(orgName: string, classroomName: string): string {
  const base = `${orgName}-${classroomName}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 40);

  const suffix = Math.random().toString(36).substring(2, 6);
  return `${base}-${suffix}`;
}

async function hashPictures(pictures: string[]): Promise<string> {
  const data = pictures.join('|');
  const encoder = new TextEncoder();
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(data));
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
