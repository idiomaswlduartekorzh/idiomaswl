-- ICFES secure grading and one-time paid detail. Apply manually after Sandbox QA.
-- Browser roles intentionally receive no direct access; all access is mediated by trusted routes.

CREATE TABLE IF NOT EXISTS public.icfes_privacy_contracts (
  version text PRIMARY KEY CHECK (version ~ '^icfes-privacy-[0-9]{4}-[0-9]{2}-[a-z0-9-]+$'),
  status text NOT NULL DEFAULT 'DRAFT_BLOCKED' CHECK (status IN ('DRAFT_BLOCKED', 'APPROVED', 'RETIRED')),
  attempt_retention_days integer CHECK (attempt_retention_days BETWEEN 1 AND 3650),
  export_response_days integer CHECK (export_response_days BETWEEN 1 AND 90),
  deletion_response_days integer CHECK (deletion_response_days BETWEEN 1 AND 90),
  minor_handling text CHECK (minor_handling IN ('ADULT_ONLY', 'GUARDIAN_ATTESTATION', 'BLOCK_ALL_MINORS')),
  processing_purpose text,
  legal_basis text,
  approved_by text,
  approval_evidence_ref text,
  approved_at timestamptz,
  retired_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (
    status = 'DRAFT_BLOCKED'
    OR (
      attempt_retention_days IS NOT NULL
      AND export_response_days IS NOT NULL
      AND deletion_response_days IS NOT NULL
      AND minor_handling IS NOT NULL
      AND processing_purpose IS NOT NULL
      AND length(processing_purpose) >= 20
      AND legal_basis IS NOT NULL
      AND length(legal_basis) >= 5
      AND approved_by IS NOT NULL
      AND length(approved_by) >= 2
      AND approval_evidence_ref IS NOT NULL
      AND length(approval_evidence_ref) >= 8
      AND approved_at IS NOT NULL
    )
  )
);

-- Deliberately not APPROVED. A later, human-authorized migration must supply the
-- retention periods, legal basis, minor rule and approval evidence before writes work.
INSERT INTO public.icfes_privacy_contracts (version, status)
VALUES ('icfes-privacy-2026-09-draft', 'DRAFT_BLOCKED')
ON CONFLICT (version) DO NOTHING;

CREATE FUNCTION public.protect_icfes_privacy_contract_version()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
BEGIN
  IF NEW.version <> OLD.version THEN
    RAISE EXCEPTION 'icfes_privacy_contract_version_immutable';
  END IF;
  IF OLD.status = 'RETIRED' THEN
    RAISE EXCEPTION 'icfes_privacy_contract_retired';
  END IF;
  IF OLD.status = 'APPROVED' AND (
    NEW.attempt_retention_days IS DISTINCT FROM OLD.attempt_retention_days
    OR NEW.export_response_days IS DISTINCT FROM OLD.export_response_days
    OR NEW.deletion_response_days IS DISTINCT FROM OLD.deletion_response_days
    OR NEW.minor_handling IS DISTINCT FROM OLD.minor_handling
    OR NEW.processing_purpose IS DISTINCT FROM OLD.processing_purpose
    OR NEW.legal_basis IS DISTINCT FROM OLD.legal_basis
    OR NEW.approved_by IS DISTINCT FROM OLD.approved_by
    OR NEW.approval_evidence_ref IS DISTINCT FROM OLD.approval_evidence_ref
    OR NEW.approved_at IS DISTINCT FROM OLD.approved_at
    OR NEW.status <> 'RETIRED'
  ) THEN
    RAISE EXCEPTION 'icfes_privacy_contract_approved_version_immutable';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER icfes_privacy_contract_version_guard
BEFORE UPDATE ON public.icfes_privacy_contracts
FOR EACH ROW EXECUTE FUNCTION public.protect_icfes_privacy_contract_version();

CREATE TABLE IF NOT EXISTS public.icfes_attempts (
  id uuid PRIMARY KEY,
  exam_id text NOT NULL CHECK (exam_id ~ '^[a-z0-9-]{3,80}$'),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  access_token_hash text NOT NULL CHECK (access_token_hash ~ '^[0-9a-f]{64}$'),
  answers jsonb NOT NULL CHECK (jsonb_typeof(answers) = 'object'),
  basic_result jsonb NOT NULL CHECK (
    jsonb_typeof(basic_result) = 'object'
    AND NOT (basic_result ?| ARRAY['answer', 'answers', 'correctAnswer', 'rationale', 'explanation', 'questions'])
  ),
  privacy_contract_version text NOT NULL DEFAULT 'icfes-privacy-2026-09-draft'
    REFERENCES public.icfes_privacy_contracts(version),
  age_assurance text NOT NULL DEFAULT 'UNKNOWN'
    CHECK (age_assurance IN ('UNKNOWN', 'ADULT_ATTESTED', 'MINOR_GUARDIAN_ATTESTED', 'MINOR_UNATTESTED')),
  guardian_attested_at timestamptz,
  retention_expires_at timestamptz NOT NULL,
  completed_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK ((age_assurance = 'MINOR_GUARDIAN_ATTESTED') = (guardian_attested_at IS NOT NULL)),
  CHECK (retention_expires_at > created_at)
);

CREATE FUNCTION public.enforce_icfes_attempt_privacy_contract()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
DECLARE
  contract public.icfes_privacy_contracts;
BEGIN
  SELECT * INTO contract
  FROM public.icfes_privacy_contracts
  WHERE version = NEW.privacy_contract_version;

  IF NOT FOUND OR contract.status <> 'APPROVED' OR contract.attempt_retention_days IS NULL THEN
    RAISE EXCEPTION 'icfes_privacy_contract_not_approved';
  END IF;
  IF NEW.age_assurance = 'UNKNOWN' THEN
    RAISE EXCEPTION 'icfes_age_assurance_required';
  END IF;
  IF NEW.age_assurance = 'MINOR_UNATTESTED' THEN
    RAISE EXCEPTION 'icfes_minor_without_guardian_blocked';
  END IF;
  IF NEW.age_assurance = 'MINOR_GUARDIAN_ATTESTED'
    AND contract.minor_handling <> 'GUARDIAN_ATTESTATION' THEN
    RAISE EXCEPTION 'icfes_minor_processing_not_approved';
  END IF;

  NEW.retention_expires_at := NEW.created_at + make_interval(days => contract.attempt_retention_days);
  RETURN NEW;
END;
$$;

CREATE TRIGGER icfes_attempt_privacy_contract_guard
BEFORE INSERT OR UPDATE OF privacy_contract_version, age_assurance, guardian_attested_at, created_at
ON public.icfes_attempts
FOR EACH ROW EXECUTE FUNCTION public.enforce_icfes_attempt_privacy_contract();

CREATE TABLE IF NOT EXISTS public.icfes_pass_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id uuid NOT NULL REFERENCES public.icfes_attempts(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  reference text NOT NULL UNIQUE CHECK (reference ~ '^WL-ICFES-'),
  amount_in_cents bigint NOT NULL CHECK (amount_in_cents = 1200000),
  currency text NOT NULL DEFAULT 'COP' CHECK (currency = 'COP'),
  status text NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'DECLINED', 'VOIDED', 'ERROR')),
  environment text NOT NULL CHECK (environment IN ('sandbox', 'production')),
  wompi_transaction_id text UNIQUE,
  paid_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.icfes_entitlements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id uuid NOT NULL UNIQUE REFERENCES public.icfes_attempts(id) ON DELETE CASCADE,
  order_id uuid NOT NULL UNIQUE REFERENCES public.icfes_pass_orders(id) ON DELETE CASCADE,
  product_code text NOT NULL CHECK (product_code = 'icfes-detail-attempt-v1'),
  granted_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.icfes_data_subject_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  request_type text NOT NULL CHECK (request_type IN ('EXPORT', 'DELETE')),
  status text NOT NULL DEFAULT 'BLOCKED_POLICY'
    CHECK (status IN ('BLOCKED_POLICY', 'QUEUED', 'PROCESSING', 'COMPLETED', 'REJECTED')),
  privacy_contract_version text NOT NULL DEFAULT 'icfes-privacy-2026-09-draft'
    REFERENCES public.icfes_privacy_contracts(version),
  requested_at timestamptz NOT NULL DEFAULT now(),
  due_at timestamptz,
  completed_at timestamptz,
  result_evidence_ref text,
  CHECK ((status = 'BLOCKED_POLICY') = (due_at IS NULL)),
  CHECK ((status = 'COMPLETED') = (completed_at IS NOT NULL)),
  CHECK (due_at IS NULL OR due_at > requested_at)
);

CREATE UNIQUE INDEX IF NOT EXISTS icfes_data_subject_requests_one_open
  ON public.icfes_data_subject_requests (user_id, request_type)
  WHERE status IN ('BLOCKED_POLICY', 'QUEUED', 'PROCESSING');

CREATE UNIQUE INDEX IF NOT EXISTS icfes_pass_orders_one_open_idx ON public.icfes_pass_orders (attempt_id)
  WHERE status IN ('PENDING', 'APPROVED');
CREATE INDEX IF NOT EXISTS icfes_pass_orders_status_created_idx ON public.icfes_pass_orders (status, created_at DESC);
CREATE INDEX IF NOT EXISTS icfes_attempts_user_created_idx ON public.icfes_attempts (user_id, created_at DESC) WHERE user_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS icfes_attempts_retention_idx ON public.icfes_attempts (retention_expires_at);

ALTER TABLE public.icfes_privacy_contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.icfes_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.icfes_pass_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.icfes_entitlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.icfes_data_subject_requests ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.icfes_privacy_contracts, public.icfes_attempts, public.icfes_pass_orders,
  public.icfes_entitlements, public.icfes_data_subject_requests FROM anon, authenticated, service_role;
REVOKE ALL ON FUNCTION public.enforce_icfes_attempt_privacy_contract() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.protect_icfes_privacy_contract_version() FROM PUBLIC, anon, authenticated;

GRANT SELECT ON TABLE public.icfes_privacy_contracts TO service_role;
GRANT SELECT, INSERT ON TABLE public.icfes_attempts, public.icfes_pass_orders TO service_role;
GRANT UPDATE (user_id, updated_at) ON TABLE public.icfes_attempts TO service_role;
GRANT UPDATE (status, wompi_transaction_id, paid_at, updated_at) ON TABLE public.icfes_pass_orders TO service_role;
GRANT SELECT, INSERT ON TABLE public.icfes_entitlements TO service_role;
GRANT SELECT, INSERT ON TABLE public.icfes_data_subject_requests TO service_role;
GRANT UPDATE (status, due_at, completed_at, result_evidence_ref) ON TABLE public.icfes_data_subject_requests TO service_role;

COMMENT ON TABLE public.icfes_attempts IS 'Private answer payload and basic result for signed ICFES attempts.';
COMMENT ON TABLE public.icfes_entitlements IS 'Idempotent server-granted entitlement after a verified APPROVED Wompi event.';
COMMENT ON TABLE public.icfes_privacy_contracts IS 'Versioned, human-approved retention and minor-handling policy. DRAFT_BLOCKED versions cannot accept attempts.';
COMMENT ON TABLE public.icfes_data_subject_requests IS 'Minimal queue for authenticated-owner export/deletion workflows; no request SLA exists until a privacy contract is approved.';

-- Rollback (manual, destructive):
-- DROP TABLE IF EXISTS public.icfes_entitlements;
-- DROP TABLE IF EXISTS public.icfes_pass_orders;
-- DROP TABLE IF EXISTS public.icfes_data_subject_requests;
-- DROP TABLE IF EXISTS public.icfes_attempts;
-- DROP TABLE IF EXISTS public.icfes_privacy_contracts;
