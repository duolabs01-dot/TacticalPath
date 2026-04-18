export interface CoachingInsight {
  headline: string;
  explanation: string;
  turnNumber: number;
  severity: 'tip' | 'mistake' | 'blunder';
  category: string;
  visual?: {
    highlightPositions?: string[];
    arrows?: Array<{ from: string; to: string }>;
  };
  source: 'engine' | 'rules' | 'ai';
}

export interface GameCoach<TMove = unknown, TState = unknown> {
  analyze(
    moves: TMove[],
    finalState: TState,
    difficulty: 'easy' | 'medium' | 'hard'
  ): Promise<CoachingInsight | null>;
}
