-- TacticalPath Database Schema
-- Run this in your Supabase SQL Editor or as a migration

-- ============================================
-- ORGANIZATIONS (chess clubs / schools)
-- ============================================
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'chess_club' CHECK (type IN ('chess_club', 'school', 'camp')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- COACHES (auth via Supabase Auth)
-- ============================================
CREATE TABLE coaches (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- CLASSROOMS
-- ============================================
CREATE TABLE classrooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  coach_id UUID NOT NULL REFERENCES coaches(id) ON DELETE CASCADE,
  settings JSONB NOT NULL DEFAULT '{
    "defaultTimeControl": 600,
    "botFallback": true,
    "postGameDrills": true,
    "maxStudents": 30
  }'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_classrooms_slug ON classrooms(slug);
CREATE INDEX idx_classrooms_coach ON classrooms(coach_id);

-- ============================================
-- STUDENTS (picture-password auth, no email)
-- ============================================
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_initial TEXT NOT NULL,
  display_name TEXT GENERATED ALWAYS AS (first_name || ' ' || last_initial || '.') STORED,
  avatar_emoji TEXT NOT NULL DEFAULT '🎓',
  classroom_id UUID NOT NULL REFERENCES classrooms(id) ON DELETE CASCADE,
  -- Picture password: stored as a 3-element array of emoji indices
  picture_password_hash TEXT NOT NULL,
  -- Hidden Elo for matchmaking (not shown to students)
  hidden_elo INTEGER NOT NULL DEFAULT 600,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_students_classroom ON students(classroom_id);

-- ============================================
-- SESSIONS (coach starts/stops classroom sessions)
-- ============================================
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  classroom_id UUID NOT NULL REFERENCES classrooms(id) ON DELETE CASCADE,
  started_by UUID NOT NULL REFERENCES coaches(id),
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ended_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'ended')),
  settings JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX idx_sessions_classroom ON sessions(classroom_id);
CREATE INDEX idx_sessions_status ON sessions(status);

-- ============================================
-- GAMES
-- ============================================
CREATE TABLE games (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE SET NULL,
  classroom_id UUID NOT NULL REFERENCES classrooms(id) ON DELETE CASCADE,
  white_player_id UUID REFERENCES students(id) ON DELETE SET NULL,
  black_player_id UUID REFERENCES students(id) ON DELETE SET NULL,
  is_bot_game BOOLEAN NOT NULL DEFAULT false,
  bot_color TEXT CHECK (bot_color IN ('w', 'b')),
  bot_strength INTEGER, -- Stockfish level 1-8
  time_control INTEGER NOT NULL DEFAULT 600, -- seconds
  pgn TEXT,
  result TEXT CHECK (result IN ('1-0', '0-1', '1/2-1/2', '*')),
  result_reason TEXT CHECK (result_reason IN ('checkmate', 'stalemate', 'draw', 'resign', 'timeout', 'abort')),
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ended_at TIMESTAMPTZ,
  move_count INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX idx_games_session ON games(session_id);
CREATE INDEX idx_games_classroom ON games(classroom_id);
CREATE INDEX idx_games_white ON games(white_player_id);
CREATE INDEX idx_games_black ON games(black_player_id);

-- ============================================
-- GAME ANALYSIS (post-game teachable moment)
-- ============================================
CREATE TABLE game_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id UUID NOT NULL REFERENCES games(id) ON DELETE CASCADE UNIQUE,
  -- The critical moment
  critical_move_number INTEGER NOT NULL,
  critical_fen TEXT NOT NULL,
  played_move TEXT NOT NULL,
  best_move TEXT NOT NULL,
  eval_before FLOAT,
  eval_after FLOAT,
  -- Kid-friendly explanation (from Gemini)
  explanation TEXT NOT NULL,
  -- Theme classification
  theme TEXT NOT NULL CHECK (theme IN ('hanging', 'captures', 'checkmates', 'forks', 'pins')),
  -- Which student made the mistake
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_analyses_game ON game_analyses(game_id);
CREATE INDEX idx_analyses_student ON game_analyses(student_id);

-- ============================================
-- PUZZLES (imported from Lichess or custom)
-- ============================================
CREATE TABLE puzzles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_id TEXT, -- Lichess puzzle ID if imported
  fen TEXT NOT NULL,
  solution TEXT[] NOT NULL, -- Array of moves in UCI format
  theme TEXT NOT NULL CHECK (theme IN ('hanging', 'captures', 'checkmates', 'forks', 'pins')),
  difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  rating INTEGER, -- Puzzle rating
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_puzzles_theme ON puzzles(theme);
CREATE INDEX idx_puzzles_difficulty ON puzzles(difficulty);
CREATE INDEX idx_puzzles_theme_diff ON puzzles(theme, difficulty);

-- ============================================
-- DRILL SETS (generated after game analysis)
-- ============================================
CREATE TABLE drill_sets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_analysis_id UUID NOT NULL REFERENCES game_analyses(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  theme TEXT NOT NULL,
  puzzle_ids UUID[] NOT NULL, -- 3 puzzle IDs
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ
);

CREATE INDEX idx_drills_student ON drill_sets(student_id);

-- ============================================
-- DRILL ATTEMPTS (individual puzzle results)
-- ============================================
CREATE TABLE drill_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  drill_set_id UUID NOT NULL REFERENCES drill_sets(id) ON DELETE CASCADE,
  puzzle_id UUID NOT NULL REFERENCES puzzles(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  correct BOOLEAN NOT NULL,
  time_taken_ms INTEGER,
  attempts INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_attempts_student ON drill_attempts(student_id);
CREATE INDEX idx_attempts_drill ON drill_attempts(drill_set_id);

-- ============================================
-- THEME MASTERY (student progress per theme)
-- ============================================
CREATE TABLE theme_mastery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  theme TEXT NOT NULL CHECK (theme IN ('hanging', 'captures', 'checkmates', 'forks', 'pins')),
  level INTEGER NOT NULL DEFAULT 1 CHECK (level >= 1 AND level <= 5),
  xp INTEGER NOT NULL DEFAULT 0,
  games_played INTEGER NOT NULL DEFAULT 0,
  puzzles_solved INTEGER NOT NULL DEFAULT 0,
  puzzles_attempted INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(student_id, theme)
);

CREATE INDEX idx_mastery_student ON theme_mastery(student_id);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE coaches ENABLE ROW LEVEL SECURITY;
ALTER TABLE classrooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE puzzles ENABLE ROW LEVEL SECURITY;
ALTER TABLE drill_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE drill_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE theme_mastery ENABLE ROW LEVEL SECURITY;

-- Coaches can see their own data
CREATE POLICY "Coaches see own profile" ON coaches
  FOR ALL USING (id = auth.uid());

-- Coaches can manage their classrooms
CREATE POLICY "Coaches manage own classrooms" ON classrooms
  FOR ALL USING (coach_id = auth.uid());

-- Coaches can manage students in their classrooms
CREATE POLICY "Coaches manage students" ON students
  FOR ALL USING (
    classroom_id IN (SELECT id FROM classrooms WHERE coach_id = auth.uid())
  );

-- Coaches can manage sessions in their classrooms
CREATE POLICY "Coaches manage sessions" ON sessions
  FOR ALL USING (
    classroom_id IN (SELECT id FROM classrooms WHERE coach_id = auth.uid())
  );

-- Games visible to classroom coach
CREATE POLICY "Coach sees classroom games" ON games
  FOR ALL USING (
    classroom_id IN (SELECT id FROM classrooms WHERE coach_id = auth.uid())
  );

-- Analyses visible to classroom coach
CREATE POLICY "Coach sees analyses" ON game_analyses
  FOR ALL USING (
    student_id IN (
      SELECT s.id FROM students s
      JOIN classrooms c ON s.classroom_id = c.id
      WHERE c.coach_id = auth.uid()
    )
  );

-- Puzzles are public read
CREATE POLICY "Puzzles are readable by all" ON puzzles
  FOR SELECT USING (true);

-- Drill sets visible to coach
CREATE POLICY "Coach sees drills" ON drill_sets
  FOR ALL USING (
    student_id IN (
      SELECT s.id FROM students s
      JOIN classrooms c ON s.classroom_id = c.id
      WHERE c.coach_id = auth.uid()
    )
  );

-- Drill attempts visible to coach
CREATE POLICY "Coach sees attempts" ON drill_attempts
  FOR ALL USING (
    student_id IN (
      SELECT s.id FROM students s
      JOIN classrooms c ON s.classroom_id = c.id
      WHERE c.coach_id = auth.uid()
    )
  );

-- Mastery visible to coach
CREATE POLICY "Coach sees mastery" ON theme_mastery
  FOR ALL USING (
    student_id IN (
      SELECT s.id FROM students s
      JOIN classrooms c ON s.classroom_id = c.id
      WHERE c.coach_id = auth.uid()
    )
  );

-- Organization policy
CREATE POLICY "Coaches see own org" ON organizations
  FOR ALL USING (
    id IN (SELECT organization_id FROM coaches WHERE id = auth.uid())
  );

-- ============================================
-- STUDENT ACCESS (via service role + custom claims)
-- Students don't use Supabase Auth - they use picture passwords
-- Access is managed through Edge Functions with service role
-- ============================================

-- ============================================
-- FUNCTIONS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_coaches_updated_at BEFORE UPDATE ON coaches
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_classrooms_updated_at BEFORE UPDATE ON classrooms
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Update theme mastery after drill attempt
CREATE OR REPLACE FUNCTION update_mastery_on_attempt()
RETURNS TRIGGER AS $$
DECLARE
  puzzle_theme TEXT;
BEGIN
  SELECT theme INTO puzzle_theme FROM puzzles WHERE id = NEW.puzzle_id;
  
  INSERT INTO theme_mastery (student_id, theme, xp, puzzles_attempted, puzzles_solved)
  VALUES (
    NEW.student_id,
    puzzle_theme,
    CASE WHEN NEW.correct THEN 10 ELSE 2 END,
    1,
    CASE WHEN NEW.correct THEN 1 ELSE 0 END
  )
  ON CONFLICT (student_id, theme) DO UPDATE SET
    xp = theme_mastery.xp + CASE WHEN NEW.correct THEN 10 ELSE 2 END,
    puzzles_attempted = theme_mastery.puzzles_attempted + 1,
    puzzles_solved = theme_mastery.puzzles_solved + CASE WHEN NEW.correct THEN 1 ELSE 0 END,
    level = CASE
      WHEN theme_mastery.xp + CASE WHEN NEW.correct THEN 10 ELSE 2 END >= 200 THEN 5
      WHEN theme_mastery.xp + CASE WHEN NEW.correct THEN 10 ELSE 2 END >= 100 THEN 4
      WHEN theme_mastery.xp + CASE WHEN NEW.correct THEN 10 ELSE 2 END >= 50 THEN 3
      WHEN theme_mastery.xp + CASE WHEN NEW.correct THEN 10 ELSE 2 END >= 20 THEN 2
      ELSE 1
    END,
    updated_at = now();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_mastery AFTER INSERT ON drill_attempts
  FOR EACH ROW EXECUTE FUNCTION update_mastery_on_attempt();

-- Generate classroom slug
CREATE OR REPLACE FUNCTION generate_classroom_slug(classroom_name TEXT, org_name TEXT)
RETURNS TEXT AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter INTEGER := 0;
BEGIN
  base_slug := lower(regexp_replace(
    substring(org_name from 1 for 20) || '-' || substring(classroom_name from 1 for 20),
    '[^a-z0-9]+', '-', 'g'
  ));
  base_slug := trim(both '-' from base_slug);
  
  final_slug := base_slug;
  WHILE EXISTS (SELECT 1 FROM classrooms WHERE slug = final_slug) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;
  
  RETURN final_slug;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- REALTIME (enable for live game state)
-- ============================================
-- Run in Supabase Dashboard > Database > Replication
-- Enable realtime for: games, sessions
ALTER PUBLICATION supabase_realtime ADD TABLE games;
ALTER PUBLICATION supabase_realtime ADD TABLE sessions;
