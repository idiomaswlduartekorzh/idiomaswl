-- Keep each AI-generated IELTS Writing report on the same submission that
-- already contains the student's identity, essays, Listening/Reading bands,
-- Speaking notes and private audio paths. Nullable columns make this migration
-- backwards-compatible with existing submissions and future IELTS mocks.
ALTER TABLE public.exam_submissions
  ADD COLUMN IF NOT EXISTS writing_task1_assessment jsonb,
  ADD COLUMN IF NOT EXISTS writing_task2_assessment jsonb;

COMMENT ON COLUMN public.exam_submissions.writing_task1_assessment IS
  'Server-generated Writing Task 1 report. Never accepted directly from the browser.';

COMMENT ON COLUMN public.exam_submissions.writing_task2_assessment IS
  'Server-generated Writing Task 2 report. Never accepted directly from the browser.';
