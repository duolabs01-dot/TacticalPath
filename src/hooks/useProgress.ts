import { useState, useEffect, useCallback } from 'react';
import { PuzzleTheme, Difficulty } from '../data/puzzles';
import { GAME_RESULTS_EVENT, readGameResults } from '../lib/game-results';

export interface UserProgress {
  totalPuzzlesSolved: number;
  themes: Record<PuzzleTheme, ThemeProgress>;
  streak: number;
  lastPlayed: string | null;
  difficulty: Difficulty;
  username: string;
}

export type GameType = 'chess' | 'tictactoe' | 'checkers' | 'morris' | 'fourinarow';

export interface GameRecord {
  game: GameType;
  won: boolean;
  ts: number;
}

export function useGameResults() {
  const [records, setRecords] = useState<GameRecord[]>([]);
  useEffect(() => {
    const load = () => {
      setRecords(readGameResults());
    };
    load();
    window.addEventListener("storage", load);
    window.addEventListener(GAME_RESULTS_EVENT, load);
    return () => {
      window.removeEventListener("storage", load);
      window.removeEventListener(GAME_RESULTS_EVENT, load);
    };
  }, []);

  const byGame = (type: GameType) => {
    const r = records.filter((x) => x.game === type);
    return { played: r.length, wins: r.filter((x) => x.won).length };
  };
  const total = { played: records.length, wins: records.filter((x) => x.won).length };
  return { records, byGame, total };
}

export interface ThemeProgress {
  solved: number;
  attempts: number;
  level: number; // 1-5
}

const DEFAULT_PROGRESS: UserProgress = {
  totalPuzzlesSolved: 0,
  themes: {
    checkmates: { solved: 0, attempts: 0, level: 1 },
    forks: { solved: 0, attempts: 0, level: 1 },
    pins: { solved: 0, attempts: 0, level: 1 },
    captures: { solved: 0, attempts: 0, level: 1 },
    hanging: { solved: 0, attempts: 0, level: 1 },
  },
  streak: 0,
  lastPlayed: null,
  difficulty: 'beginner',
  username: 'Player',
};

const STORAGE_KEY = 'tacticalpath_progress';

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(DEFAULT_PROGRESS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load progress from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setProgress({ ...DEFAULT_PROGRESS, ...JSON.parse(stored) });
      } catch {
        setProgress(DEFAULT_PROGRESS);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save progress to localStorage whenever it changes
  const saveProgress = useCallback((newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
  }, []);

  const recordAttempt = useCallback((theme: PuzzleTheme, solved: boolean) => {
    const newProgress = { ...progress };
    newProgress.themes[theme].attempts += 1;
    if (solved) {
      newProgress.themes[theme].solved += 1;
      newProgress.totalPuzzlesSolved += 1;
      newProgress.lastPlayed = new Date().toISOString();
      
      // Calculate level based on solved puzzles
      const solvedCount = newProgress.themes[theme].solved;
      newProgress.themes[theme].level = Math.min(5, Math.floor(solvedCount / 5) + 1);
    }
    saveProgress(newProgress);
  }, [progress, saveProgress]);

  const setUsername = useCallback((name: string) => {
    saveProgress({ ...progress, username: name });
  }, [progress, saveProgress]);

  const setDifficulty = useCallback((difficulty: Difficulty) => {
    saveProgress({ ...progress, difficulty });
  }, [progress, saveProgress]);

  const resetProgress = useCallback(() => {
    saveProgress(DEFAULT_PROGRESS);
  }, [saveProgress]);

  const getThemeLevel = useCallback((theme: PuzzleTheme): number => {
    return progress.themes[theme].level;
  }, [progress]);

  const getOverallLevel = useCallback((): number => {
    const themeValues = Object.values(progress.themes) as ThemeProgress[];
    const levels = themeValues.map(t => t.level);
    return Math.round(levels.reduce((a, b) => a + b, 0) / levels.length);
  }, [progress]);

  return {
    progress,
    isLoaded,
    recordAttempt,
    setUsername,
    setDifficulty,
    resetProgress,
    getThemeLevel,
    getOverallLevel,
  };
}
