-- Keep one permissive SELECT policy per role and index submission ownership.

DROP POLICY IF EXISTS "Admins read all" ON public.exam_submissions;
DROP POLICY IF EXISTS "Users read own" ON public.exam_submissions;
DROP POLICY IF EXISTS "Authorized users read submissions" ON public.exam_submissions;

CREATE POLICY "Authorized users read submissions"
  ON public.exam_submissions
  FOR SELECT
  TO authenticated
  USING (
    (SELECT auth.uid()) = user_id
    OR EXISTS (
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

CREATE INDEX IF NOT EXISTS exam_submissions_user_id_idx
  ON public.exam_submissions (user_id);
