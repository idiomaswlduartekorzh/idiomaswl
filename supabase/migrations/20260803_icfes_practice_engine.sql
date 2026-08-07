-- ICFES practice engine persistence
-- Created: 2026-08-03
-- Additive migration: keeps the V2 foundation tables and anonymous local flow intact.

CREATE TABLE IF NOT EXISTS icfes_practice_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  client_session_id TEXT NOT NULL,
  context TEXT NOT NULL CHECK (context IN ('part-practice', 'guided-simulator', 'daily-question', 'error-review')),
  official_part SMALLINT CHECK (official_part BETWEEN 1 AND 7),
  progress_scope TEXT NOT NULL,
  question_count INTEGER NOT NULL CHECK (question_count > 0 AND question_count <= 100),
  correct_count INTEGER CHECK (correct_count >= 0 AND correct_count <= question_count),
  elapsed_seconds INTEGER CHECK (elapsed_seconds >= 0),
  started_at TIMESTAMPTZ NOT NULL,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, client_session_id)
);

CREATE TABLE IF NOT EXISTS icfes_practice_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  client_attempt_id TEXT NOT NULL,
  client_session_id TEXT,
  question_key TEXT NOT NULL,
  official_part SMALLINT NOT NULL CHECK (official_part BETWEEN 1 AND 7),
  skill TEXT NOT NULL,
  subskill TEXT NOT NULL,
  context TEXT NOT NULL CHECK (context IN ('part-practice', 'guided-simulator', 'daily-question', 'error-review')),
  selected_index SMALLINT NOT NULL CHECK (selected_index >= 0 AND selected_index <= 9),
  correct_index SMALLINT NOT NULL CHECK (correct_index >= 0 AND correct_index <= 9),
  is_correct BOOLEAN NOT NULL,
  elapsed_seconds INTEGER NOT NULL CHECK (elapsed_seconds >= 0 AND elapsed_seconds <= 7200),
  answered_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, client_attempt_id)
);

CREATE TABLE IF NOT EXISTS icfes_skill_mastery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  official_part SMALLINT NOT NULL CHECK (official_part BETWEEN 1 AND 7),
  skill TEXT NOT NULL,
  total_attempts INTEGER NOT NULL DEFAULT 0 CHECK (total_attempts >= 0),
  correct_attempts INTEGER NOT NULL DEFAULT 0 CHECK (correct_attempts >= 0 AND correct_attempts <= total_attempts),
  accuracy NUMERIC(5,2) NOT NULL DEFAULT 0 CHECK (accuracy BETWEEN 0 AND 100),
  last_attempt_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, official_part, skill)
);

CREATE TABLE IF NOT EXISTS icfes_error_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_key TEXT NOT NULL,
  official_part SMALLINT NOT NULL CHECK (official_part BETWEEN 1 AND 7),
  skill TEXT NOT NULL,
  wrong_count INTEGER NOT NULL DEFAULT 1 CHECK (wrong_count > 0),
  last_wrong_at TIMESTAMPTZ NOT NULL,
  next_review_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, question_key)
);

CREATE INDEX IF NOT EXISTS idx_icfes_sessions_user_updated ON icfes_practice_sessions (user_id, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_icfes_attempts_user_answered ON icfes_practice_attempts (user_id, answered_at DESC);
CREATE INDEX IF NOT EXISTS idx_icfes_attempts_user_part ON icfes_practice_attempts (user_id, official_part);
CREATE INDEX IF NOT EXISTS idx_icfes_mastery_user_part ON icfes_skill_mastery (user_id, official_part);
CREATE INDEX IF NOT EXISTS idx_icfes_errors_due ON icfes_error_queue (user_id, next_review_at) WHERE resolved_at IS NULL;

ALTER TABLE icfes_practice_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE icfes_practice_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE icfes_skill_mastery ENABLE ROW LEVEL SECURITY;
ALTER TABLE icfes_error_queue ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own ICFES practice sessions"
  ON icfes_practice_sessions FOR ALL
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users manage own ICFES practice attempts"
  ON icfes_practice_attempts FOR ALL
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users manage own ICFES skill mastery"
  ON icfes_skill_mastery FOR ALL
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users manage own ICFES error queue"
  ON icfes_error_queue FOR ALL
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

REVOKE ALL ON icfes_practice_sessions, icfes_practice_attempts, icfes_skill_mastery, icfes_error_queue FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON icfes_practice_sessions, icfes_practice_attempts, icfes_skill_mastery, icfes_error_queue TO authenticated;

-- Atomically stores one idempotent attempt and updates derived mastery/errors.
-- SECURITY INVOKER is intentional: all writes remain constrained by RLS.
CREATE OR REPLACE FUNCTION record_icfes_practice_attempt(
  p_client_attempt_id TEXT,
  p_client_session_id TEXT,
  p_question_key TEXT,
  p_official_part SMALLINT,
  p_skill TEXT,
  p_subskill TEXT,
  p_context TEXT,
  p_selected_index SMALLINT,
  p_correct_index SMALLINT,
  p_is_correct BOOLEAN,
  p_elapsed_seconds INTEGER,
  p_answered_at TIMESTAMPTZ
) RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID := auth.uid();
  v_inserted_count INTEGER := 0;
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'authentication required' USING ERRCODE = '42501';
  END IF;

  INSERT INTO icfes_practice_attempts (
    user_id, client_attempt_id, client_session_id, question_key, official_part,
    skill, subskill, context, selected_index, correct_index, is_correct,
    elapsed_seconds, answered_at
  ) VALUES (
    v_user_id, p_client_attempt_id, NULLIF(p_client_session_id, ''), p_question_key,
    p_official_part, p_skill, p_subskill, p_context, p_selected_index,
    p_correct_index, p_is_correct, p_elapsed_seconds, p_answered_at
  ) ON CONFLICT (user_id, client_attempt_id) DO NOTHING;

  GET DIAGNOSTICS v_inserted_count = ROW_COUNT;
  IF v_inserted_count = 0 THEN RETURN FALSE; END IF;

  INSERT INTO icfes_skill_mastery (
    user_id, official_part, skill, total_attempts, correct_attempts, accuracy, last_attempt_at
  ) VALUES (
    v_user_id, p_official_part, p_skill, 1, CASE WHEN p_is_correct THEN 1 ELSE 0 END,
    CASE WHEN p_is_correct THEN 100 ELSE 0 END, p_answered_at
  )
  ON CONFLICT (user_id, official_part, skill) DO UPDATE SET
    total_attempts = icfes_skill_mastery.total_attempts + 1,
    correct_attempts = icfes_skill_mastery.correct_attempts + CASE WHEN p_is_correct THEN 1 ELSE 0 END,
    accuracy = ROUND(
      100.0 * (icfes_skill_mastery.correct_attempts + CASE WHEN p_is_correct THEN 1 ELSE 0 END)
      / (icfes_skill_mastery.total_attempts + 1), 2
    ),
    last_attempt_at = GREATEST(icfes_skill_mastery.last_attempt_at, p_answered_at),
    updated_at = NOW();

  IF p_is_correct THEN
    UPDATE icfes_error_queue
      SET resolved_at = p_answered_at, updated_at = NOW()
      WHERE user_id = v_user_id AND question_key = p_question_key AND resolved_at IS NULL;
  ELSE
    INSERT INTO icfes_error_queue (
      user_id, question_key, official_part, skill, last_wrong_at, next_review_at
    ) VALUES (
      v_user_id, p_question_key, p_official_part, p_skill, p_answered_at,
      p_answered_at + INTERVAL '1 day'
    )
    ON CONFLICT (user_id, question_key) DO UPDATE SET
      official_part = EXCLUDED.official_part,
      skill = EXCLUDED.skill,
      wrong_count = icfes_error_queue.wrong_count + 1,
      last_wrong_at = EXCLUDED.last_wrong_at,
      next_review_at = EXCLUDED.last_wrong_at +
        CASE WHEN icfes_error_queue.wrong_count >= 3 THEN INTERVAL '7 days' ELSE INTERVAL '1 day' END,
      resolved_at = NULL,
      updated_at = NOW();
  END IF;

  RETURN TRUE;
END;
$$;

REVOKE ALL ON FUNCTION record_icfes_practice_attempt(TEXT, TEXT, TEXT, SMALLINT, TEXT, TEXT, TEXT, SMALLINT, SMALLINT, BOOLEAN, INTEGER, TIMESTAMPTZ) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION record_icfes_practice_attempt(TEXT, TEXT, TEXT, SMALLINT, TEXT, TEXT, TEXT, SMALLINT, SMALLINT, BOOLEAN, INTEGER, TIMESTAMPTZ) TO authenticated;

COMMENT ON TABLE icfes_practice_sessions IS 'Authenticated ICFES practice sessions; anonymous sessions remain in localStorage.';
COMMENT ON TABLE icfes_practice_attempts IS 'Idempotent question-level attempts from all ICFES practice contexts.';
COMMENT ON TABLE icfes_skill_mastery IS 'Derived accuracy by official part and skill for authenticated students.';
COMMENT ON TABLE icfes_error_queue IS 'Questions due for spaced error review; a later correct answer resolves the item.';

-- Reversal, if ever required, is explicit and does not touch foundation data:
-- DROP FUNCTION IF EXISTS record_icfes_practice_attempt(TEXT, TEXT, TEXT, SMALLINT, TEXT, TEXT, TEXT, SMALLINT, SMALLINT, BOOLEAN, INTEGER, TIMESTAMPTZ);
-- DROP TABLE IF EXISTS icfes_error_queue, icfes_skill_mastery, icfes_practice_attempts, icfes_practice_sessions;
