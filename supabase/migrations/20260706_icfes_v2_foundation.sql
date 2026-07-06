-- SPRINT 1: ICFES Dashboard V2 Foundation Tables
-- Created: 2026-07-06
-- Purpose: Onboarding, Diagnostic, Learning Path infrastructure

-- ============================================================================
-- TABLE 1: icfes_onboarding
-- Purpose: Store student's initial profile (level, time, goal, exam date)
-- ============================================================================
CREATE TABLE IF NOT EXISTS icfes_onboarding (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Student input from wizard
  initial_level INTEGER NOT NULL, -- 0-100 (student's self-assessment)
  min_per_day INTEGER NOT NULL, -- 30, 60, 90, 120
  goal TEXT NOT NULL, -- 'pass', 'bandA', 'bandAPlus'
  exam_date DATE NOT NULL,

  -- Derived from calculation
  weeks_available INTEGER NOT NULL, -- calculated from exam_date
  recommended_pace TEXT NOT NULL, -- 'slow', 'normal', 'fast'

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,

  UNIQUE(user_id) -- Only one active onboarding per user
);

-- ============================================================================
-- TABLE 2: icfes_diagnostic_results
-- Purpose: Store diagnostic test results and initial level assessment
-- ============================================================================
CREATE TABLE IF NOT EXISTS icfes_diagnostic_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Test metadata
  test_started_at TIMESTAMP NOT NULL,
  test_completed_at TIMESTAMP NOT NULL,
  total_questions INTEGER DEFAULT 20,
  questions_answered INTEGER NOT NULL,

  -- Results
  overall_level INTEGER NOT NULL, -- 0-100
  time_spent_seconds INTEGER NOT NULL,

  -- Skill breakdown (JSON)
  skill_levels JSONB NOT NULL, -- {"vocabulary_basic": 75, "paraphrase": 52, ...}

  -- Analysis
  top_weaknesses TEXT[] NOT NULL, -- ["paraphrase", "vocabulary_context"]
  top_strengths TEXT[] NOT NULL, -- ["main_idea", "dialogue_completion"]
  recommendations TEXT[] NOT NULL,

  -- Status
  created_at TIMESTAMP DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,

  UNIQUE(user_id) -- Only one diagnostic per student
);

-- ============================================================================
-- TABLE 3: icfes_learning_path
-- Purpose: Student's personalized weekly + daily schedule
-- ============================================================================
CREATE TABLE IF NOT EXISTS icfes_learning_path (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Path metadata
  path_created_from_onboarding_id UUID REFERENCES icfes_onboarding(id),
  path_created_from_diagnostic_id UUID REFERENCES icfes_diagnostic_results(id),

  -- Current state
  current_week INTEGER DEFAULT 1, -- 1-8
  current_day INTEGER DEFAULT 1, -- 1-7

  -- Schedule (JSON structure)
  weekly_schedule JSONB NOT NULL, -- Structured week-by-week plan
  daily_schedule JSONB NOT NULL, -- Time allocation (vocab, practice, mock)

  -- Skill focus per week
  weekly_focus_skills TEXT[][] NOT NULL, -- [["vocab", "connectors"], [...], ...]

  -- Progress tracking
  weeks_completed INTEGER DEFAULT 0,
  estimated_completion_date DATE,

  -- Status
  status TEXT DEFAULT 'active', -- 'active', 'paused', 'completed'
  updated_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(user_id) -- One active path per student
);

-- ============================================================================
-- TABLE 4: icfes_vocabulary_catalog
-- Purpose: Master list of 300 essential ICFES words
-- ============================================================================
CREATE TABLE IF NOT EXISTS icfes_vocabulary_catalog (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  word TEXT NOT NULL UNIQUE,
  pos TEXT, -- part of speech: 'verb', 'noun', 'adjective', 'adverb'
  definition_en TEXT NOT NULL,
  definition_es TEXT NOT NULL,

  -- ICFES metadata
  skill TEXT NOT NULL, -- which skill uses this word
  frequency_icfes_exams INTEGER DEFAULT 0, -- how many times appears
  difficulty INTEGER DEFAULT 2 CHECK (difficulty BETWEEN 1 AND 5),

  -- Examples
  example_sentence_en TEXT,
  example_context_icfes TEXT, -- real ICFES context

  -- Synonyms/Antonyms
  synonyms TEXT[],
  antonyms TEXT[],

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  active BOOLEAN DEFAULT TRUE
);

-- ============================================================================
-- TABLE 5: icfes_vocabulary_progress
-- Purpose: Track each student's vocabulary learning progress (SRS)
-- ============================================================================
CREATE TABLE IF NOT EXISTS icfes_vocabulary_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vocab_id UUID NOT NULL REFERENCES icfes_vocabulary_catalog(id) ON DELETE CASCADE,

  -- SRS Status
  status TEXT DEFAULT 'new', -- 'new', 'learning', 'review', 'mastered'

  -- Performance tracking
  total_attempts INTEGER DEFAULT 0,
  correct_attempts INTEGER DEFAULT 0,
  accuracy DECIMAL(5,2) DEFAULT 0, -- percentage

  -- Spaced Repetition scheduling
  last_reviewed_at TIMESTAMP,
  next_review_at TIMESTAMP,
  review_count INTEGER DEFAULT 0,

  -- Metadata
  added_to_queue_at TIMESTAMP DEFAULT NOW(),
  mastered_at TIMESTAMP,

  UNIQUE(user_id, vocab_id)
);

-- ============================================================================
-- Diagnostic questions are STATIC CONTENT, not a DB table.
-- They live in version control at src/data/icfes-diagnostic-questions.ts so
-- they can be edited/reviewed like code and need no seeding step. Answers
-- record the question's stable string id in `question_key` (see below).
-- ============================================================================

-- ============================================================================
-- TABLE 6: icfes_diagnostic_answers
-- Purpose: Track student's diagnostic test answers
-- ============================================================================
CREATE TABLE IF NOT EXISTS icfes_diagnostic_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  diagnostic_result_id UUID NOT NULL REFERENCES icfes_diagnostic_results(id) ON DELETE CASCADE,

  question_number INTEGER NOT NULL,
  question_key TEXT NOT NULL, -- stable id from the static question set (e.g. 'diag-01')

  -- Student's answer
  student_answer TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,

  -- Timing
  time_spent_seconds INTEGER,
  answered_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(diagnostic_result_id, question_number)
);

-- ============================================================================
-- TABLE 7: icfes_student_profile_summary
-- Purpose: Quick access to student's current status (for dashboard)
-- ============================================================================
CREATE TABLE IF NOT EXISTS icfes_student_profile_summary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,

  -- Current state
  onboarding_completed BOOLEAN DEFAULT FALSE,
  diagnostic_completed BOOLEAN DEFAULT FALSE,
  learning_path_started BOOLEAN DEFAULT FALSE,

  -- Quick stats
  current_level INTEGER DEFAULT 0, -- 0-100
  vocabulary_mastered INTEGER DEFAULT 0, -- out of 300
  days_consistent INTEGER DEFAULT 0, -- streak

  -- Targets
  target_band TEXT, -- 'A', 'A+', etc
  weeks_to_exam INTEGER,

  -- Last activity
  last_activity_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NOW(),

  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- INDEXES for performance
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_icfes_onboarding_user_id ON icfes_onboarding(user_id);
CREATE INDEX IF NOT EXISTS idx_icfes_diagnostic_user_id ON icfes_diagnostic_results(user_id);
CREATE INDEX IF NOT EXISTS idx_icfes_learning_path_user_id ON icfes_learning_path(user_id);
CREATE INDEX IF NOT EXISTS idx_icfes_vocab_progress_user_id ON icfes_vocabulary_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_icfes_vocab_progress_status ON icfes_vocabulary_progress(status);
CREATE INDEX IF NOT EXISTS idx_icfes_vocab_progress_next_review ON icfes_vocabulary_progress(next_review_at);
CREATE INDEX IF NOT EXISTS idx_icfes_vocab_catalog_skill ON icfes_vocabulary_catalog(skill);
CREATE INDEX IF NOT EXISTS idx_icfes_diagnostic_answers_user ON icfes_diagnostic_answers(user_id);
CREATE INDEX IF NOT EXISTS idx_icfes_student_summary_user ON icfes_student_profile_summary(user_id);

-- ============================================================================
-- RLS (Row Level Security) Policies
-- ============================================================================

-- Enable RLS on all tables (incl. the catalog: without RLS its "public read"
-- policy is ignored and the table would be client-writable).
ALTER TABLE icfes_onboarding ENABLE ROW LEVEL SECURITY;
ALTER TABLE icfes_diagnostic_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE icfes_learning_path ENABLE ROW LEVEL SECURITY;
ALTER TABLE icfes_vocabulary_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE icfes_vocabulary_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE icfes_diagnostic_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE icfes_student_profile_summary ENABLE ROW LEVEL SECURITY;

-- Students can only see their own data.
-- DROP-before-CREATE makes this script safe to re-run (CREATE POLICY has no
-- IF NOT EXISTS).
DROP POLICY IF EXISTS "Users can view own onboarding" ON icfes_onboarding;
CREATE POLICY "Users can view own onboarding"
  ON icfes_onboarding FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view own diagnostic" ON icfes_diagnostic_results;
CREATE POLICY "Users can view own diagnostic"
  ON icfes_diagnostic_results FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view own learning path" ON icfes_learning_path;
CREATE POLICY "Users can view own learning path"
  ON icfes_learning_path FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view own vocabulary progress" ON icfes_vocabulary_progress;
CREATE POLICY "Users can view own vocabulary progress"
  ON icfes_vocabulary_progress FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view own diagnostic answers" ON icfes_diagnostic_answers;
CREATE POLICY "Users can view own diagnostic answers"
  ON icfes_diagnostic_answers FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view own profile summary" ON icfes_student_profile_summary;
CREATE POLICY "Users can view own profile summary"
  ON icfes_student_profile_summary FOR SELECT
  USING (auth.uid() = user_id);

-- Vocabulary catalog is public (read-only for clients; writes via service role).
DROP POLICY IF EXISTS "Vocabulary catalog is public" ON icfes_vocabulary_catalog;
CREATE POLICY "Vocabulary catalog is public"
  ON icfes_vocabulary_catalog FOR SELECT
  USING (true);

-- ── Write policies ──────────────────────────────────────────────────────────
-- The server actions write with the authenticated SSR client (auth.uid() =
-- the student), NOT the service role. Without INSERT/UPDATE policies, RLS
-- rejects every write ("new row violates row-level security policy").
-- Each user may only write rows scoped to their own user_id.

DROP POLICY IF EXISTS "Users can insert own onboarding" ON icfes_onboarding;
CREATE POLICY "Users can insert own onboarding"
  ON icfes_onboarding FOR INSERT
  WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can update own onboarding" ON icfes_onboarding;
CREATE POLICY "Users can update own onboarding"
  ON icfes_onboarding FOR UPDATE
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own diagnostic" ON icfes_diagnostic_results;
CREATE POLICY "Users can insert own diagnostic"
  ON icfes_diagnostic_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can update own diagnostic" ON icfes_diagnostic_results;
CREATE POLICY "Users can update own diagnostic"
  ON icfes_diagnostic_results FOR UPDATE
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own diagnostic answers" ON icfes_diagnostic_answers;
CREATE POLICY "Users can insert own diagnostic answers"
  ON icfes_diagnostic_answers FOR INSERT
  WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can delete own diagnostic answers" ON icfes_diagnostic_answers;
CREATE POLICY "Users can delete own diagnostic answers"
  ON icfes_diagnostic_answers FOR DELETE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own learning path" ON icfes_learning_path;
CREATE POLICY "Users can insert own learning path"
  ON icfes_learning_path FOR INSERT
  WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can update own learning path" ON icfes_learning_path;
CREATE POLICY "Users can update own learning path"
  ON icfes_learning_path FOR UPDATE
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own vocabulary progress" ON icfes_vocabulary_progress;
CREATE POLICY "Users can insert own vocabulary progress"
  ON icfes_vocabulary_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can update own vocabulary progress" ON icfes_vocabulary_progress;
CREATE POLICY "Users can update own vocabulary progress"
  ON icfes_vocabulary_progress FOR UPDATE
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own profile summary" ON icfes_student_profile_summary;
CREATE POLICY "Users can insert own profile summary"
  ON icfes_student_profile_summary FOR INSERT
  WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can update own profile summary" ON icfes_student_profile_summary;
CREATE POLICY "Users can update own profile summary"
  ON icfes_student_profile_summary FOR UPDATE
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- Comments (documentation)
-- ============================================================================
COMMENT ON TABLE icfes_onboarding IS 'Student profile from 5-step wizard. Created once, defines learning path.';
COMMENT ON TABLE icfes_diagnostic_results IS 'Results from 20-question diagnostic test. Determines skill levels.';
COMMENT ON TABLE icfes_learning_path IS 'Personalized 8-week schedule. Adapts based on student performance.';
COMMENT ON TABLE icfes_vocabulary_catalog IS 'Master vocabulary list: 300 essential ICFES words with metadata.';
COMMENT ON TABLE icfes_vocabulary_progress IS 'Spaced Repetition tracking per student. Drives daily vocab exercises.';

-- ============================================================================
-- NOTES FOR SPRINT 1
-- ============================================================================
/*
PENDING:
- Seed icfes_vocabulary_catalog with 300 words (data task)
- Diagnostic questions are static content (src/data/icfes-diagnostic-questions.ts) — no seeding needed
- Create admin endpoints for managing these
- Implement spaced repetition algorithm (next sprint)
- Implement adaptive path algorithm (next sprint)

READY FOR:
- Onboarding UI component (flows to save data here)
- Diagnostic UI component (flows to save answers here)
- Learning path generator logic
*/
