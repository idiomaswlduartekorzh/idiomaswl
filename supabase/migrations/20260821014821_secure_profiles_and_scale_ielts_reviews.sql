-- Security and scale gates for the shared IELTS review pipeline.
--
-- 1. A signed-in user may edit only harmless profile presentation fields.
-- 2. Administrative RLS access is tied to the server-owned email allowlist,
--    never to the user-editable profiles.role column.
-- 3. IELTS attempts retain the exact mock/content/audio evidence used for review.
-- 4. Score consolidation runs under a row lock so concurrent W1/W2/S reports
--    cannot overwrite one another's contribution to the final report.

BEGIN;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

REVOKE ALL PRIVILEGES ON TABLE public.profiles FROM anon, authenticated;
GRANT SELECT ON TABLE public.profiles TO authenticated;

-- Production has accumulated both `name` and `full_name` across schema eras.
-- Grant only whichever safe presentation columns actually exist.
DO $grant_safe_profile_columns$
DECLARE
  safe_columns text;
BEGIN
  SELECT string_agg(quote_ident(column_name), ', ' ORDER BY ordinal_position)
    INTO safe_columns
  FROM information_schema.columns
  WHERE table_schema = 'public'
    AND table_name = 'profiles'
    AND column_name IN ('name', 'full_name', 'avatar_url');

  IF safe_columns IS NOT NULL THEN
    EXECUTE format(
      'GRANT UPDATE (%s) ON TABLE public.profiles TO authenticated',
      safe_columns
    );
  END IF;
END
$grant_safe_profile_columns$;

DROP POLICY IF EXISTS "users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "users can update own safe profile fields" ON public.profiles;

CREATE POLICY "users can update own safe profile fields"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = id)
  WITH CHECK ((SELECT auth.uid()) = id);

-- Eliminate role-based privilege escalation from every policy that protects
-- the student artifacts used by the admin/evaluator workflow.
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "allowlisted admins can view all profiles"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (
    lower(COALESCE((SELECT auth.jwt()) ->> 'email', '')) IN (
      'josedavidduartesilva@gmail.com',
      'david.duartes182@gmail.com',
      'jose@welearn.com',
      'zhanna.korzh@gmail.com',
      'zhanna@welearn.com'
    )
  );

DROP POLICY IF EXISTS "Admins can update any profile" ON public.profiles;
-- Admin profile mutations now go through an allowlisted Server Action and the
-- service role. No browser role receives broad column UPDATE privileges.

DROP POLICY IF EXISTS "Admins update submissions" ON public.exam_submissions;
CREATE POLICY "Allowlisted admins update submissions"
  ON public.exam_submissions
  FOR UPDATE
  TO authenticated
  USING (
    lower(COALESCE((SELECT auth.jwt()) ->> 'email', '')) IN (
      'josedavidduartesilva@gmail.com',
      'david.duartes182@gmail.com',
      'jose@welearn.com',
      'zhanna.korzh@gmail.com',
      'zhanna@welearn.com'
    )
  )
  WITH CHECK (
    lower(COALESCE((SELECT auth.jwt()) ->> 'email', '')) IN (
      'josedavidduartesilva@gmail.com',
      'david.duartes182@gmail.com',
      'jose@welearn.com',
      'zhanna.korzh@gmail.com',
      'zhanna@welearn.com'
    )
  );

DROP POLICY IF EXISTS "Authorized users read submissions" ON public.exam_submissions;
CREATE POLICY "Authorized users read submissions"
  ON public.exam_submissions
  FOR SELECT
  TO authenticated
  USING (
    (SELECT auth.uid()) = user_id
    OR lower(COALESCE((SELECT auth.jwt()) ->> 'email', '')) IN (
      'josedavidduartesilva@gmail.com',
      'david.duartes182@gmail.com',
      'jose@welearn.com',
      'zhanna.korzh@gmail.com',
      'zhanna@welearn.com'
    )
  );

ALTER TABLE public.exam_submissions
  ADD COLUMN IF NOT EXISTS mock_id text,
  ADD COLUMN IF NOT EXISTS content_version text,
  ADD COLUMN IF NOT EXISTS assignment_snapshot jsonb,
  ADD COLUMN IF NOT EXISTS objective_answers jsonb,
  ADD COLUMN IF NOT EXISTS speaking_audio_metadata jsonb;

UPDATE public.exam_submissions
SET mock_id = 'set-4',
    content_version = COALESCE(content_version, 'ielts-set-4-v1')
WHERE exam_slug = 'ielts'
  AND mock_title = 'IELTS Academic Set 4'
  AND mock_id IS NULL;

CREATE INDEX IF NOT EXISTS exam_submissions_ielts_admin_queue_idx
  ON public.exam_submissions (created_at DESC)
  WHERE exam_slug = 'ielts' AND submission_status = 'submitted';

CREATE UNIQUE INDEX IF NOT EXISTS ielts_one_active_delegated_invite
  ON public.ielts_delegated_review_invites (submission_id, task_type)
  WHERE used_at IS NULL AND revoked_at IS NULL;

ALTER TABLE public.exam_submissions
  DROP CONSTRAINT IF EXISTS exam_submissions_listening_half_band_check,
  DROP CONSTRAINT IF EXISTS exam_submissions_reading_half_band_check,
  DROP CONSTRAINT IF EXISTS exam_submissions_writing_half_band_check,
  DROP CONSTRAINT IF EXISTS exam_submissions_speaking_half_band_check;

ALTER TABLE public.exam_submissions
  ADD CONSTRAINT exam_submissions_listening_half_band_check
    CHECK (listening_band IS NULL OR (listening_band BETWEEN 0 AND 9 AND listening_band * 2 = trunc(listening_band * 2))) NOT VALID,
  ADD CONSTRAINT exam_submissions_reading_half_band_check
    CHECK (reading_band IS NULL OR (reading_band BETWEEN 0 AND 9 AND reading_band * 2 = trunc(reading_band * 2))) NOT VALID,
  ADD CONSTRAINT exam_submissions_writing_half_band_check
    CHECK (writing_band IS NULL OR (writing_band BETWEEN 0 AND 9 AND writing_band * 2 = trunc(writing_band * 2))) NOT VALID,
  ADD CONSTRAINT exam_submissions_speaking_half_band_check
    CHECK (speaking_band IS NULL OR (speaking_band BETWEEN 0 AND 9 AND speaking_band * 2 = trunc(speaking_band * 2))) NOT VALID;

CREATE OR REPLACE FUNCTION public.recompute_ielts_submission_score(p_submission_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $function$
DECLARE
  submission public.exam_submissions%ROWTYPE;
  task1_band numeric;
  task2_band numeric;
  calculated_writing numeric;
  calculated_overall numeric;
  calculated_skills jsonb := '[]'::jsonb;
  calculated_label text;
BEGIN
  SELECT *
    INTO submission
  FROM public.exam_submissions
  WHERE id = p_submission_id
    AND exam_slug = 'ielts'
    AND submission_status = 'submitted'
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'IELTS submission not found';
  END IF;

  -- A final administrator decision is immutable to background/delegated jobs.
  IF submission.reviewed_at IS NOT NULL THEN
    RETURN jsonb_build_object(
      'writingBand', submission.writing_band,
      'speakingBand', submission.speaking_band,
      'overallBand', submission.total_score,
      'final', true
    );
  END IF;

  task1_band := COALESCE(
    NULLIF(submission.writing_task1_delegated_assessment ->> 'overallBand', '')::numeric,
    NULLIF(submission.writing_task1_assessment ->> 'overallBand', '')::numeric
  );
  task2_band := COALESCE(
    NULLIF(submission.writing_task2_delegated_assessment ->> 'overallBand', '')::numeric,
    NULLIF(submission.writing_task2_assessment ->> 'overallBand', '')::numeric
  );

  calculated_writing := CASE
    WHEN task1_band IS NOT NULL AND task2_band IS NOT NULL
      THEN round(((task1_band + task2_band * 2) / 3) * 2) / 2
    ELSE NULL
  END;

  IF submission.listening_band IS NOT NULL THEN
    calculated_skills := calculated_skills || jsonb_build_array(jsonb_build_object(
      'skill', 'Listening', 'score', submission.listening_band::double precision, 'max', 9,
      'label', 'Band ' || submission.listening_band::double precision::text
    ));
  END IF;
  IF submission.reading_band IS NOT NULL THEN
    calculated_skills := calculated_skills || jsonb_build_array(jsonb_build_object(
      'skill', 'Reading', 'score', submission.reading_band::double precision, 'max', 9,
      'label', 'Band ' || submission.reading_band::double precision::text
    ));
  END IF;
  IF calculated_writing IS NOT NULL THEN
    calculated_skills := calculated_skills || jsonb_build_array(jsonb_build_object(
      'skill', 'Writing', 'score', calculated_writing::double precision, 'max', 9,
      'label', 'Band ' || calculated_writing::double precision::text
    ));
  END IF;
  IF submission.speaking_band IS NOT NULL THEN
    calculated_skills := calculated_skills || jsonb_build_array(jsonb_build_object(
      'skill', 'Speaking', 'score', submission.speaking_band::double precision, 'max', 9,
      'label', 'Band ' || submission.speaking_band::double precision::text
    ));
  END IF;

  -- IELTS Overall exists only when all four skills are present.
  calculated_overall := CASE
    WHEN submission.listening_band IS NOT NULL
      AND submission.reading_band IS NOT NULL
      AND calculated_writing IS NOT NULL
      AND submission.speaking_band IS NOT NULL
    THEN round(((submission.listening_band + submission.reading_band + calculated_writing + submission.speaking_band) / 4) * 2) / 2
    ELSE NULL
  END;

  SELECT string_agg(
    (skill ->> 'skill') || ' Band ' || (skill ->> 'score'),
    ' · '
  )
  INTO calculated_label
  FROM jsonb_array_elements(calculated_skills) AS skill;

  UPDATE public.exam_submissions
  SET writing_band = calculated_writing,
      skills = calculated_skills,
      total_score = calculated_overall,
      total_max = 9,
      total_label = calculated_label
  WHERE id = p_submission_id;

  RETURN jsonb_build_object(
    'writingBand', calculated_writing,
    'speakingBand', submission.speaking_band,
    'overallBand', calculated_overall,
    'final', false
  );
END
$function$;

REVOKE ALL ON FUNCTION public.recompute_ielts_submission_score(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.recompute_ielts_submission_score(uuid) TO service_role;

COMMIT;
