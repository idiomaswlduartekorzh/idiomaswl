-- One-time, task-scoped invitations let an external AI evaluator review a
-- single IELTS artifact without receiving an administrator account or broad
-- access to student data. Only the server-side service role can read/write
-- invitation rows; the browser receives the unhashed token once at creation.

ALTER TABLE public.exam_submissions
  ADD COLUMN IF NOT EXISTS writing_task1_delegated_assessment jsonb,
  ADD COLUMN IF NOT EXISTS writing_task2_delegated_assessment jsonb,
  ADD COLUMN IF NOT EXISTS speaking_assessment jsonb;

COMMENT ON COLUMN public.exam_submissions.writing_task1_delegated_assessment IS
  'External task-scoped report for IELTS Writing Task 1. Preserves the original automatic report.';

COMMENT ON COLUMN public.exam_submissions.writing_task2_delegated_assessment IS
  'External task-scoped report for IELTS Writing Task 2. Preserves the original automatic report.';

COMMENT ON COLUMN public.exam_submissions.speaking_assessment IS
  'Task-scoped IELTS Speaking report submitted through a one-time delegated review invitation.';

CREATE TABLE IF NOT EXISTS public.ielts_delegated_review_invites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id uuid NOT NULL REFERENCES public.exam_submissions(id) ON DELETE CASCADE,
  mock_id text NOT NULL,
  task_type text NOT NULL,
  call_code text NOT NULL UNIQUE,
  token_hash text NOT NULL UNIQUE,
  rubric_version text NOT NULL,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL,
  revoked_at timestamptz,
  used_at timestamptz,
  evaluator_name text,
  evaluator_model text,
  assessment jsonb,
  CONSTRAINT ielts_delegated_review_task_check
    CHECK (task_type IN ('writing_task_1', 'writing_task_2', 'speaking')),
  CONSTRAINT ielts_delegated_review_expiry_check
    CHECK (expires_at > created_at),
  CONSTRAINT ielts_delegated_review_use_payload_check
    CHECK (used_at IS NULL OR assessment IS NOT NULL)
);

ALTER TABLE public.ielts_delegated_review_invites ENABLE ROW LEVEL SECURITY;

-- No anon/authenticated policies are intentional. Admins manage invitations
-- only through authenticated Server Actions; delegated reviewers use a
-- high-entropy bearer token that is verified by a server-only route.
REVOKE ALL ON TABLE public.ielts_delegated_review_invites FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON TABLE public.ielts_delegated_review_invites TO service_role;

CREATE INDEX IF NOT EXISTS ielts_delegated_review_submission_task_idx
  ON public.ielts_delegated_review_invites (submission_id, task_type, created_at DESC);

CREATE INDEX IF NOT EXISTS ielts_delegated_review_created_by_idx
  ON public.ielts_delegated_review_invites (created_by)
  WHERE created_by IS NOT NULL;

CREATE INDEX IF NOT EXISTS ielts_delegated_review_active_expiry_idx
  ON public.ielts_delegated_review_invites (expires_at)
  WHERE used_at IS NULL AND revoked_at IS NULL;

-- A final administrator score always wins. Closing a submission immediately
-- invalidates every still-unused delegated capability, including links that
-- were copied before the administrator completed the review.
CREATE OR REPLACE FUNCTION public.revoke_ielts_delegated_reviews_after_final_score()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  UPDATE public.ielts_delegated_review_invites
    SET revoked_at = COALESCE(revoked_at, now())
    WHERE submission_id = NEW.id
      AND used_at IS NULL
      AND revoked_at IS NULL;
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.revoke_ielts_delegated_reviews_after_final_score() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.revoke_ielts_delegated_reviews_after_final_score() TO service_role;

DROP TRIGGER IF EXISTS revoke_ielts_delegated_reviews_after_final_score
  ON public.exam_submissions;
CREATE TRIGGER revoke_ielts_delegated_reviews_after_final_score
AFTER UPDATE OF reviewed_at ON public.exam_submissions
FOR EACH ROW
WHEN (NEW.reviewed_at IS NOT NULL AND OLD.reviewed_at IS DISTINCT FROM NEW.reviewed_at)
EXECUTE FUNCTION public.revoke_ielts_delegated_reviews_after_final_score();
