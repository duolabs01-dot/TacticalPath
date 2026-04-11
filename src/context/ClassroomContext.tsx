import { createContext, useContext, useState, ReactNode } from 'react';

// Mock data for prototype
export interface Student {
  id: string;
  firstName: string;
  lastInitial: string;
  displayName: string;
  avatarEmoji: string;
  classroomId: string;
  mastery: Record<string, { level: number; xp: number }>;
}

export interface Classroom {
  id: string;
  slug: string;
  name: string;
  schoolName: string;
  coachName: string;
  students: Student[];
}

export const MOCK_THEMES = [
  { id: 'hanging', name: 'Hanging Pieces', emoji: '⚠️' },
  { id: 'captures', name: 'Missed Captures', emoji: '♟️' },
  { id: 'checkmates', name: '1-Move Checkmates', emoji: '♛' },
  { id: 'forks', name: 'Basic Forks', emoji: '♞' },
  { id: 'pins', name: 'Basic Pins', emoji: '♝' },
] as const;

export type ThemeId = typeof MOCK_THEMES[number]['id'];

const PICTURE_EMOJIS = ['🐱', '🍎', '🐴', '☀️', '🦋', '🌟', '🎪', '🌊', '🎸', '🚀', '🍕', '🌈'];

export const MOCK_CLASSROOM: Classroom = {
  id: 'classroom-1',
  slug: 'oak-creek-tuesday',
  name: 'Tuesday Beginners',
  schoolName: 'Oak Creek Middle School',
  coachName: 'Coach Rivera',
  students: [
    {
      id: 'student-1',
      firstName: 'Chloe',
      lastInitial: 'S',
      displayName: 'Chloe S.',
      avatarEmoji: '🦋',
      classroomId: 'classroom-1',
      mastery: {
        hanging: { level: 2, xp: 45 },
        captures: { level: 1, xp: 20 },
        checkmates: { level: 3, xp: 80 },
        forks: { level: 1, xp: 15 },
        pins: { level: 1, xp: 10 },
      },
    },
    {
      id: 'student-2',
      firstName: 'Marcus',
      lastInitial: 'J',
      displayName: 'Marcus J.',
      avatarEmoji: '🚀',
      classroomId: 'classroom-1',
      mastery: {
        hanging: { level: 3, xp: 70 },
        captures: { level: 2, xp: 40 },
        checkmates: { level: 2, xp: 55 },
        forks: { level: 2, xp: 35 },
        pins: { level: 1, xp: 20 },
      },
    },
    {
      id: 'student-3',
      firstName: 'Ava',
      lastInitial: 'L',
      displayName: 'Ava L.',
      avatarEmoji: '🌟',
      classroomId: 'classroom-1',
      mastery: {
        hanging: { level: 1, xp: 15 },
        captures: { level: 1, xp: 10 },
        checkmates: { level: 1, xp: 25 },
        forks: { level: 1, xp: 10 },
        pins: { level: 1, xp: 5 },
      },
    },
  ],
};

export const PICTURE_GRID = PICTURE_EMOJIS;

interface ClassroomContextType {
  classroom: Classroom;
  currentStudent: Student | null;
  isLoggedIn: boolean;
  selectedPictures: string[];
  login: (pictures: string[]) => boolean;
  logout: () => void;
  setSelectedPictures: (pics: string[]) => void;
}

const ClassroomContext = createContext<ClassroomContextType | null>(null);

export function ClassroomProvider({ children }: { children: ReactNode }) {
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [selectedPictures, setSelectedPictures] = useState<string[]>([]);

  const login = (pictures: string[]): boolean => {
    // Prototype: accept any 3-picture selection, assign first student
    if (pictures.length === 3) {
      setCurrentStudent(MOCK_CLASSROOM.students[0]);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentStudent(null);
    setSelectedPictures([]);
  };

  return (
    <ClassroomContext.Provider
      value={{
        classroom: MOCK_CLASSROOM,
        currentStudent,
        isLoggedIn: !!currentStudent,
        selectedPictures,
        login,
        logout,
        setSelectedPictures,
      }}
    >
      {children}
    </ClassroomContext.Provider>
  );
}

export function useClassroom() {
  const context = useContext(ClassroomContext);
  if (!context) throw new Error('useClassroom must be used within ClassroomProvider');
  return context;
}