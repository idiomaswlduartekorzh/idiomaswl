-- Goethe A1: private speaking evidence and a dedicated admin review queue.
-- Browsers upload only through short-lived signed URLs. No public Storage
-- policy is created; service-role server code owns reads and review writes.

INSERT INTO storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
VALUES (
  'goethe-speaking-audio',
  'goethe-speaking-audio',
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

CREATE INDEX IF NOT EXISTS exam_submissions_goethe_admin_queue_idx
  ON public.exam_submissions (created_at DESC)
  WHERE exam_slug = 'goethe' AND submission_status = 'submitted';

-- Existing exam_submissions RLS remains authoritative. The generic JSONB
-- columns already store the frozen assignment, student answers and rubric.
