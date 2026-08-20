-- IELTS Academic Mock 4: private speaking recordings and reliable guest delivery.

ALTER TABLE public.exam_submissions
  ADD COLUMN IF NOT EXISTS speaking_audio_paths JSONB,
  ADD COLUMN IF NOT EXISTS submission_status TEXT NOT NULL DEFAULT 'submitted';

ALTER TABLE public.exam_submissions
  DROP CONSTRAINT IF EXISTS exam_submissions_submission_status_check;

ALTER TABLE public.exam_submissions
  ADD CONSTRAINT exam_submissions_submission_status_check
  CHECK (submission_status IN ('uploading', 'submitted'));

INSERT INTO storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
VALUES (
  'ielts-speaking-audio',
  'ielts-speaking-audio',
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

-- The former policy had USING (true) for the public role. Its name said
-- "Admins", but the Data API allowed every role to read student PII and work.
DROP POLICY IF EXISTS "Admins read all" ON public.exam_submissions;
DROP POLICY IF EXISTS "Admins update submissions" ON public.exam_submissions;
DROP POLICY IF EXISTS "Users read own" ON public.exam_submissions;

CREATE POLICY "Admins read all"
  ON public.exam_submissions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.profiles AS profile
      WHERE profile.id = (SELECT auth.uid())
        AND profile.role::text = 'admin'
    )
    OR lower(COALESCE((SELECT auth.jwt()) ->> 'email', '')) IN (
      'josedavidduartesilva@gmail.com',
      'david.duartes182@gmail.com',
      'jose@welearn.com',
      'zhanna.korzh@gmail.com',
      'zhanna@welearn.com'
    )
  );

CREATE POLICY "Admins update submissions"
  ON public.exam_submissions
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.profiles AS profile
      WHERE profile.id = (SELECT auth.uid())
        AND profile.role::text = 'admin'
    )
    OR lower(COALESCE((SELECT auth.jwt()) ->> 'email', '')) IN (
      'josedavidduartesilva@gmail.com',
      'david.duartes182@gmail.com',
      'jose@welearn.com',
      'zhanna.korzh@gmail.com',
      'zhanna@welearn.com'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.profiles AS profile
      WHERE profile.id = (SELECT auth.uid())
        AND profile.role::text = 'admin'
    )
    OR lower(COALESCE((SELECT auth.jwt()) ->> 'email', '')) IN (
      'josedavidduartesilva@gmail.com',
      'david.duartes182@gmail.com',
      'jose@welearn.com',
      'zhanna.korzh@gmail.com',
      'zhanna@welearn.com'
    )
  );

CREATE POLICY "Users read own"
  ON public.exam_submissions
  FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);
