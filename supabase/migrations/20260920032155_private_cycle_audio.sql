-- Deploy the application routes for public lessons and admin-only submissions
-- before applying this migration; the old direct Storage URLs then become private.
UPDATE storage.buckets
SET public = false
WHERE id = 'cycle-audio';

DROP POLICY IF EXISTS "Public read cycle audio" ON storage.objects;
DROP POLICY IF EXISTS "Public upload cycle audio" ON storage.objects;

-- The public submission endpoint uses the server-side service role. Direct
-- Data API inserts are neither needed nor rate-limited.
DROP POLICY IF EXISTS "Anyone can submit audio" ON public.cycle_submissions;
REVOKE INSERT ON public.cycle_submissions FROM anon, authenticated;
