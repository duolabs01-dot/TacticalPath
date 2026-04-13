// Auto-generated types matching the Supabase schema
// Regenerate with: npx supabase gen types typescript --local > src/lib/database.types.ts

export type ThemeId = 'hanging' | 'captures' | 'checkmates' | 'forks' | 'pins';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type GameResult = '1-0' | '0-1' | '1/2-1/2' | '*';
export type GameResultReason = 'checkmate' | 'stalemate' | 'draw' | 'resign' | 'timeout' | 'abort';
export type SessionStatus = 'active' | 'paused' | 'ended';
export type DrillStatus = 'pending' | 'in_progress' | 'completed';

export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string;
          name: string;
          type: 'chess_club' | 'school' | 'camp';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          type?: 'chess_club' | 'school' | 'camp';
        };
        Update: Partial<Database['public']['Tables']['organizations']['Insert']>;
      };
      coaches: {
        Row: {
          id: string;
          email: string;
          display_name: string;
          organization_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          display_name: string;
          organization_id?: string | null;
        };
        Update: Partial<Database['public']['Tables']['coaches']['Insert']>;
      };
      classrooms: {
        Row: {
          id: string;
          slug: string;
          name: string;
          organization_id: string;
          coach_id: string;
          settings: ClassroomSettings;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          organization_id: string;
          coach_id: string;
          settings?: ClassroomSettings;
        };
        Update: Partial<Database['public']['Tables']['classrooms']['Insert']>;
      };
      students: {
        Row: {
          id: string;
          first_name: string;
          last_initial: string;
          display_name: string;
          avatar_emoji: string;
          classroom_id: string;
          picture_password_hash: string;
          hidden_elo: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          first_name: string;
          last_initial: string;
          avatar_emoji?: string;
          classroom_id: string;
          picture_password_hash: string;
          hidden_elo?: number;
        };
        Update: Partial<Database['public']['Tables']['students']['Insert']>;
      };
      sessions: {
        Row: {
          id: string;
          classroom_id: string;
          started_by: string;
          started_at: string;
          ended_at: string | null;
          status: SessionStatus;
          settings: Record<string, unknown>;
        };
        Insert: {
          id?: string;
          classroom_id: string;
          started_by: string;
          settings?: Record<string, unknown>;
        };
        Update: Partial<Database['public']['Tables']['sessions']['Insert']> & {
          status?: SessionStatus;
          ended_at?: string;
        };
      };
      games: {
        Row: {
          id: string;
          session_id: string | null;
          classroom_id: string;
          white_player_id: string | null;
          black_player_id: string | null;
          is_bot_game: boolean;
          bot_color: 'w' | 'b' | null;
          bot_strength: number | null;
          time_control: number;
          pgn: string | null;
          result: GameResult | null;
          result_reason: GameResultReason | null;
          started_at: string;
          ended_at: string | null;
          move_count: number;
        };
        Insert: {
          id?: string;
          session_id?: string | null;
          classroom_id: string;
          white_player_id?: string | null;
          black_player_id?: string | null;
          is_bot_game?: boolean;
          bot_color?: 'w' | 'b' | null;
          bot_strength?: number | null;
          time_control?: number;
        };
        Update: Partial<Database['public']['Tables']['games']['Insert']> & {
          pgn?: string;
          result?: GameResult;
          result_reason?: GameResultReason;
          ended_at?: string;
          move_count?: number;
        };
      };
      game_analyses: {
        Row: {
          id: string;
          game_id: string;
          critical_move_number: number;
          critical_fen: string;
          played_move: string;
          best_move: string;
          eval_before: number | null;
          eval_after: number | null;
          explanation: string;
          theme: ThemeId;
          student_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          game_id: string;
          critical_move_number: number;
          critical_fen: string;
          played_move: string;
          best_move: string;
          eval_before?: number | null;
          eval_after?: number | null;
          explanation: string;
          theme: ThemeId;
          student_id: string;
        };
        Update: Partial<Database['public']['Tables']['game_analyses']['Insert']>;
      };
      puzzles: {
        Row: {
          id: string;
          external_id: string | null;
          fen: string;
          solution: string[];
          theme: ThemeId;
          difficulty: Difficulty;
          rating: number | null;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          external_id?: string | null;
          fen: string;
          solution: string[];
          theme: ThemeId;
          difficulty: Difficulty;
          rating?: number | null;
          description?: string | null;
        };
        Update: Partial<Database['public']['Tables']['puzzles']['Insert']>;
      };
      drill_sets: {
        Row: {
          id: string;
          game_analysis_id: string;
          student_id: string;
          theme: string;
          puzzle_ids: string[];
          status: DrillStatus;
          created_at: string;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          game_analysis_id: string;
          student_id: string;
          theme: string;
          puzzle_ids: string[];
        };
        Update: Partial<Database['public']['Tables']['drill_sets']['Insert']> & {
          status?: DrillStatus;
          completed_at?: string;
        };
      };
      drill_attempts: {
        Row: {
          id: string;
          drill_set_id: string;
          puzzle_id: string;
          student_id: string;
          correct: boolean;
          time_taken_ms: number | null;
          attempts: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          drill_set_id: string;
          puzzle_id: string;
          student_id: string;
          correct: boolean;
          time_taken_ms?: number | null;
          attempts?: number;
        };
        Update: Partial<Database['public']['Tables']['drill_attempts']['Insert']>;
      };
      theme_mastery: {
        Row: {
          id: string;
          student_id: string;
          theme: ThemeId;
          level: number;
          xp: number;
          games_played: number;
          puzzles_solved: number;
          puzzles_attempted: number;
          updated_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          theme: ThemeId;
          level?: number;
          xp?: number;
        };
        Update: Partial<Database['public']['Tables']['theme_mastery']['Insert']>;
      };
    };
  };
}

export interface ClassroomSettings {
  defaultTimeControl: number;
  botFallback: boolean;
  postGameDrills: boolean;
  maxStudents: number;
}
