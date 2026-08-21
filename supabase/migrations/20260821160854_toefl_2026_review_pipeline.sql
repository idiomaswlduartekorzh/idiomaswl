-- TOEFL iBT 2026: private speaking evidence and task-specific review records.
-- Student browsers upload only through short-lived signed URLs. The bucket has
-- no anon/authenticated object policies; service-role server code owns access.

INSERT INTO storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
VALUES (
  'toefl-speaking-audio',
  'toefl-speaking-audio',
  false,
  10485760,
  ARRAY[
    'audio/webm',
    'audio/mp4',
    'audio/ogg',
    'audio/mpeg',
    'audio/wav',
    'audio/x-m4a'
  ]::text[]
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

ALTER TABLE public.exam_submissions
  ADD COLUMN IF NOT EXISTS toefl_speaking_repeat_assessment jsonb,
  ADD COLUMN IF NOT EXISTS toefl_speaking_interview_assessment jsonb;

COMMENT ON COLUMN public.exam_submissions.toefl_speaking_repeat_assessment IS
  'Evidence-based pedagogical 0-5 task-family review for TOEFL 2026 Listen and Repeat; never an official ETS section score.';

COMMENT ON COLUMN public.exam_submissions.toefl_speaking_interview_assessment IS
  'Evidence-based pedagogical 0-5 task-family review for TOEFL 2026 Take an Interview; never an official ETS section score.';

CREATE INDEX IF NOT EXISTS exam_submissions_toefl_admin_queue_idx
  ON public.exam_submissions (created_at DESC)
  WHERE exam_slug = 'toefl' AND submission_status = 'submitted';

-- Newly created tables are not part of this migration. Existing submission
-- RLS remains authoritative: owner/admin reads and admin updates. Private
-- Storage is accessed through server-generated signed capabilities only.
