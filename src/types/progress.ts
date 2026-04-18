export interface TacticalPathProgress {
  version: 2;
  createdAt: string;
  lastActiveAt: string;
  username: string;
  streak: {
    current: number;
    best: number;
    lastCompletedDate: string | null;
  };
  dailyBoard: {
    completedDates: string[];
    totalSolved: number;
  };
  games: Record<string, GameStats>;
  coaching: {
    insightsSeen: number;
    categoryCounts: Record<string, number>;
  };
}

export interface GameStats {
  played: number;
  wins: number;
  losses: number;
  draws: number;
  lastPlayedAt: string | null;
}
