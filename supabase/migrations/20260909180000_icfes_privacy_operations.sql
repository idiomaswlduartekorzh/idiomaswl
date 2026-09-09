-- ICFES data-subject operations and retention purge. Apply only after Sandbox QA.
-- No cron is scheduled here and the seeded DRAFT_BLOCKED contract keeps every
-- operation fail-closed until a human-approved policy version exists.

ALTER TABLE public.icfes_data_subject_requests
  ADD COLUMN IF NOT EXISTS idempotency_key uuid,
  ADD COLUMN IF NOT EXISTS subject_ref text,
  ADD COLUMN IF NOT EXISTS request_fingerprint text,
  ADD COLUMN IF NOT EXISTS result_summary jsonb;

-- Backfill defensively in case the earlier, unapplied migration is ever deployed
-- separately. These values are technical identifiers, not policy decisions.
UPDATE public.icfes_data_subject_requests
SET idempotency_key = gen_random_uuid()
WHERE idempotency_key IS NULL;

UPDATE public.icfes_data_subject_requests
SET subject_ref = pg_catalog.encode(
      extensions.digest(pg_catalog.convert_to(user_id::text, 'UTF8'), 'sha256'),
      'hex'
    ),
    request_fingerprint = pg_catalog.encode(
      extensions.digest(
        pg_catalog.convert_to(user_id::text || ':' || request_type || ':' || idempotency_key::text, 'UTF8'),
        'sha256'
      ),
      'hex'
    )
WHERE subject_ref IS NULL OR request_fingerprint IS NULL;

ALTER TABLE public.icfes_data_subject_requests
  ALTER COLUMN idempotency_key SET NOT NULL,
  ALTER COLUMN idempotency_key DROP DEFAULT,
  ALTER COLUMN subject_ref SET NOT NULL,
  ALTER COLUMN request_fingerprint SET NOT NULL,
  ALTER COLUMN user_id DROP NOT NULL,
  ADD CONSTRAINT icfes_data_subject_requests_subject_ref_format
    CHECK (subject_ref ~ '^[0-9a-f]{64}$'),
  ADD CONSTRAINT icfes_data_subject_requests_fingerprint_format
    CHECK (request_fingerprint ~ '^[0-9a-f]{64}$'),
  ADD CONSTRAINT icfes_data_subject_requests_summary_shape
    CHECK (result_summary IS NULL OR jsonb_typeof(result_summary) = 'object');

CREATE UNIQUE INDEX IF NOT EXISTS icfes_data_subject_requests_fingerprint_unique
  ON public.icfes_data_subject_requests (request_fingerprint);

DROP INDEX IF EXISTS public.icfes_data_subject_requests_one_open;
CREATE UNIQUE INDEX icfes_data_subject_requests_one_open
  ON public.icfes_data_subject_requests (user_id, request_type)
  WHERE user_id IS NOT NULL AND status IN ('QUEUED', 'PROCESSING');

CREATE TABLE public.icfes_privacy_purge_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  idempotency_key uuid NOT NULL UNIQUE,
  privacy_contract_version text NOT NULL REFERENCES public.icfes_privacy_contracts(version),
  status text NOT NULL DEFAULT 'PROCESSING' CHECK (status IN ('PROCESSING', 'COMPLETED')),
  batch_limit integer NOT NULL CHECK (batch_limit BETWEEN 1 AND 500),
  result_summary jsonb,
  started_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  CHECK ((status = 'COMPLETED') = (completed_at IS NOT NULL)),
  CHECK (result_summary IS NULL OR jsonb_typeof(result_summary) = 'object')
);

ALTER TABLE public.icfes_privacy_purge_runs ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.icfes_privacy_purge_runs FROM PUBLIC, anon, authenticated, service_role;
GRANT SELECT ON TABLE public.icfes_privacy_purge_runs TO service_role;

CREATE FUNCTION public.export_icfes_user_data(
  p_user uuid,
  p_idempotency_key uuid
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  approved_count integer;
  contract_version text;
  response_days integer;
  subject_hash text;
  fingerprint text;
  request_row public.icfes_data_subject_requests;
  export_data jsonb;
  evidence_hash text;
  attempt_count integer;
  is_replay boolean := false;
BEGIN
  IF p_user IS NULL OR p_idempotency_key IS NULL THEN
    RAISE EXCEPTION 'icfes_privacy_identity_and_idempotency_required';
  END IF;

  SELECT count(*)::integer, min(version), min(export_response_days)
  INTO approved_count, contract_version, response_days
  FROM public.icfes_privacy_contracts
  WHERE status = 'APPROVED';

  IF approved_count <> 1 OR contract_version IS NULL OR response_days IS NULL THEN
    RAISE EXCEPTION 'icfes_privacy_contract_not_uniquely_approved';
  END IF;

  subject_hash := pg_catalog.encode(
    extensions.digest(pg_catalog.convert_to(p_user::text, 'UTF8'), 'sha256'),
    'hex'
  );
  fingerprint := pg_catalog.encode(
    extensions.digest(
      pg_catalog.convert_to(p_user::text || ':EXPORT:' || p_idempotency_key::text, 'UTF8'),
      'sha256'
    ),
    'hex'
  );

  -- Export and deletion for the same subject share one lock, so they cannot race.
  PERFORM pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(subject_hash, 0));

  SELECT * INTO request_row
  FROM public.icfes_data_subject_requests
  WHERE request_fingerprint = fingerprint
  FOR UPDATE;

  IF FOUND THEN
    IF request_row.status <> 'COMPLETED'
      OR request_row.privacy_contract_version <> contract_version THEN
      RAISE EXCEPTION 'icfes_privacy_request_invalid_state';
    END IF;
    is_replay := true;
  END IF;

  IF NOT FOUND THEN
    IF EXISTS (
      SELECT 1 FROM public.icfes_data_subject_requests
      WHERE user_id = p_user AND request_type = 'EXPORT'
        AND status IN ('QUEUED', 'PROCESSING')
    ) THEN
      RAISE EXCEPTION 'icfes_privacy_request_already_open';
    END IF;

    INSERT INTO public.icfes_data_subject_requests (
      user_id, request_type, status, privacy_contract_version, requested_at, due_at,
      idempotency_key, subject_ref, request_fingerprint
    ) VALUES (
      p_user, 'EXPORT', 'PROCESSING', contract_version, now(),
      now() + make_interval(days => response_days), p_idempotency_key,
      subject_hash, fingerprint
    )
    RETURNING * INTO request_row;
  END IF;

  -- Every collection is constrained by p_user or by an already-owned attempt.
  -- Reviewer identity, internal rubric snapshots and raw provider events are excluded.
  export_data := jsonb_build_object(
    'schemaVersion', 1,
    'scope', 'icfes-user-data-v1',
    'attempts', COALESCE((
      SELECT jsonb_agg(jsonb_build_object(
        'id', attempt.id,
        'examId', attempt.exam_id,
        'answers', attempt.answers,
        'basicResult', attempt.basic_result,
        'privacyContractVersion', attempt.privacy_contract_version,
        'ageAssurance', attempt.age_assurance,
        'guardianAttestedAt', attempt.guardian_attested_at,
        'retentionExpiresAt', attempt.retention_expires_at,
        'completedAt', attempt.completed_at,
        'createdAt', attempt.created_at,
        'updatedAt', attempt.updated_at
      ) ORDER BY attempt.created_at, attempt.id)
      FROM public.icfes_attempts attempt
      WHERE attempt.user_id = p_user
    ), '[]'::jsonb),
    'oneTimeOrders', COALESCE((
      SELECT jsonb_agg(jsonb_build_object(
        'id', purchase.id,
        'attemptId', purchase.attempt_id,
        'reference', purchase.reference,
        'amountInCents', purchase.amount_in_cents,
        'currency', purchase.currency,
        'status', purchase.status,
        'environment', purchase.environment,
        'paidAt', purchase.paid_at,
        'createdAt', purchase.created_at,
        'updatedAt', purchase.updated_at
      ) ORDER BY purchase.created_at, purchase.id)
      FROM public.icfes_pass_orders purchase
      JOIN public.icfes_attempts attempt
        ON attempt.id = purchase.attempt_id AND attempt.user_id = p_user
    ), '[]'::jsonb),
    'entitlements', COALESCE((
      SELECT jsonb_agg(jsonb_build_object(
        'id', entitlement.id,
        'attemptId', entitlement.attempt_id,
        'productCode', entitlement.product_code,
        'grantedAt', entitlement.granted_at,
        'createdAt', entitlement.created_at
      ) ORDER BY entitlement.created_at, entitlement.id)
      FROM public.icfes_entitlements entitlement
      JOIN public.icfes_attempts attempt
        ON attempt.id = entitlement.attempt_id AND attempt.user_id = p_user
    ), '[]'::jsonb),
    'memberships', COALESCE((
      SELECT jsonb_agg(jsonb_build_object(
        'id', membership.id,
        'offerId', membership.offer_id,
        'status', membership.status,
        'startsAt', membership.starts_at,
        'endsAt', membership.ends_at,
        'revokedAt', membership.revoked_at,
        'createdAt', membership.created_at
      ) ORDER BY membership.created_at, membership.id)
      FROM public.xpress_memberships membership
      WHERE membership.user_id = p_user AND membership.exam_slug = 'icfes'
    ), '[]'::jsonb),
    'teacherReviews', COALESCE((
      SELECT jsonb_agg(jsonb_build_object(
        'id', review.id,
        'attemptId', review.icfes_attempt_id,
        'rubricVersion', review.rubric_version,
        'status', review.status,
        'requestedAt', review.requested_at,
        'dueAt', review.due_at,
        'updatedAt', review.updated_at,
        'completedAt', review.completed_at
      ) ORDER BY review.requested_at, review.id)
      FROM public.xpress_teacher_reviews review
      JOIN public.icfes_attempts attempt
        ON attempt.id = review.icfes_attempt_id
        AND attempt.user_id = p_user
        AND review.user_id = p_user
    ), '[]'::jsonb),
    'privacyRequests', COALESCE((
      SELECT jsonb_agg(jsonb_build_object(
        'id', privacy_request.id,
        'requestType', privacy_request.request_type,
        'status', privacy_request.status,
        'privacyContractVersion', privacy_request.privacy_contract_version,
        'requestedAt', privacy_request.requested_at,
        'dueAt', privacy_request.due_at,
        'completedAt', privacy_request.completed_at
      ) ORDER BY privacy_request.requested_at, privacy_request.id)
      FROM public.icfes_data_subject_requests privacy_request
      WHERE privacy_request.user_id = p_user
        AND privacy_request.id <> request_row.id
    ), '[]'::jsonb)
  );

  attempt_count := jsonb_array_length(export_data->'attempts');
  evidence_hash := pg_catalog.encode(
    extensions.digest(pg_catalog.convert_to(export_data::text, 'UTF8'), 'sha256'),
    'hex'
  );

  IF is_replay THEN
    IF request_row.result_evidence_ref IS NULL
      OR request_row.result_evidence_ref <> evidence_hash THEN
      RAISE EXCEPTION 'icfes_privacy_export_replay_drift';
    END IF;
    RETURN jsonb_build_object(
      'requestId', request_row.id,
      'status', 'COMPLETED',
      'privacyContractVersion', request_row.privacy_contract_version,
      'evidenceRef', request_row.result_evidence_ref,
      'replayed', true,
      'data', export_data
    );
  END IF;

  UPDATE public.icfes_data_subject_requests
  SET status = 'COMPLETED',
      completed_at = COALESCE(completed_at, now()),
      result_evidence_ref = evidence_hash,
      result_summary = jsonb_build_object('attemptCount', attempt_count)
  WHERE id = request_row.id;

  RETURN jsonb_build_object(
    'requestId', request_row.id,
    'status', 'COMPLETED',
    'privacyContractVersion', contract_version,
    'evidenceRef', evidence_hash,
    'replayed', false,
    'data', export_data
  );
END;
$$;

CREATE FUNCTION public.delete_icfes_user_data(
  p_user uuid,
  p_idempotency_key uuid
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  approved_count integer;
  contract_version text;
  response_days integer;
  subject_hash text;
  fingerprint text;
  request_row public.icfes_data_subject_requests;
  summary jsonb;
  attempt_count integer;
  order_count integer;
  entitlement_count integer;
  review_count integer;
  alert_count integer;
BEGIN
  IF p_user IS NULL OR p_idempotency_key IS NULL THEN
    RAISE EXCEPTION 'icfes_privacy_identity_and_idempotency_required';
  END IF;

  SELECT count(*)::integer, min(version), min(deletion_response_days)
  INTO approved_count, contract_version, response_days
  FROM public.icfes_privacy_contracts
  WHERE status = 'APPROVED';

  IF approved_count <> 1 OR contract_version IS NULL OR response_days IS NULL THEN
    RAISE EXCEPTION 'icfes_privacy_contract_not_uniquely_approved';
  END IF;

  subject_hash := pg_catalog.encode(
    extensions.digest(pg_catalog.convert_to(p_user::text, 'UTF8'), 'sha256'),
    'hex'
  );
  fingerprint := pg_catalog.encode(
    extensions.digest(
      pg_catalog.convert_to(p_user::text || ':DELETE:' || p_idempotency_key::text, 'UTF8'),
      'sha256'
    ),
    'hex'
  );

  PERFORM pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(subject_hash, 0));

  SELECT * INTO request_row
  FROM public.icfes_data_subject_requests
  WHERE request_fingerprint = fingerprint
  FOR UPDATE;

  IF FOUND THEN
    IF request_row.status = 'COMPLETED' AND request_row.result_summary IS NOT NULL THEN
      RETURN jsonb_build_object(
        'requestId', request_row.id,
        'status', 'COMPLETED',
        'privacyContractVersion', request_row.privacy_contract_version,
        'replayed', true,
        'summary', request_row.result_summary
      );
    END IF;
    RAISE EXCEPTION 'icfes_privacy_request_invalid_state';
  END IF;

  IF EXISTS (
    SELECT 1 FROM public.icfes_data_subject_requests
    WHERE user_id = p_user AND request_type = 'DELETE'
      AND status IN ('QUEUED', 'PROCESSING')
  ) THEN
    RAISE EXCEPTION 'icfes_privacy_request_already_open';
  END IF;

  INSERT INTO public.icfes_data_subject_requests (
    user_id, request_type, status, privacy_contract_version, requested_at, due_at,
    idempotency_key, subject_ref, request_fingerprint
  ) VALUES (
    p_user, 'DELETE', 'PROCESSING', contract_version, now(),
    now() + make_interval(days => response_days), p_idempotency_key,
    subject_hash, fingerprint
  )
  RETURNING * INTO request_row;

  SELECT count(*)::integer INTO attempt_count
  FROM public.icfes_attempts WHERE user_id = p_user;

  SELECT count(*)::integer INTO order_count
  FROM public.icfes_pass_orders purchase
  JOIN public.icfes_attempts attempt
    ON attempt.id = purchase.attempt_id AND attempt.user_id = p_user;

  SELECT count(*)::integer INTO entitlement_count
  FROM public.icfes_entitlements entitlement
  JOIN public.icfes_attempts attempt
    ON attempt.id = entitlement.attempt_id AND attempt.user_id = p_user;

  DELETE FROM public.xpress_teacher_review_alerts alert
  USING public.xpress_teacher_reviews review, public.icfes_attempts attempt
  WHERE alert.review_id = review.id
    AND review.icfes_attempt_id = attempt.id
    AND review.user_id = p_user
    AND attempt.user_id = p_user;
  GET DIAGNOSTICS alert_count = ROW_COUNT;

  DELETE FROM public.xpress_teacher_reviews review
  USING public.icfes_attempts attempt
  WHERE review.icfes_attempt_id = attempt.id
    AND review.user_id = p_user
    AND attempt.user_id = p_user;
  GET DIAGNOSTICS review_count = ROW_COUNT;

  DELETE FROM public.icfes_attempts
  WHERE user_id = p_user;

  summary := jsonb_build_object(
    'scope', 'icfes-attempt-data-v1',
    'attemptsDeleted', attempt_count,
    'oneTimeOrdersDeleted', order_count,
    'entitlementsDeleted', entitlement_count,
    'teacherReviewsDeleted', review_count,
    'teacherAlertsDeleted', alert_count
  );

  -- Keep only pseudonymous request evidence after a deletion. Financial Xpress
  -- ledgers are deliberately outside this attempt-data deletion contract.
  UPDATE public.icfes_data_subject_requests
  SET subject_ref = subject_hash,
      user_id = NULL
  WHERE user_id = p_user;

  UPDATE public.icfes_data_subject_requests
  SET status = 'COMPLETED',
      completed_at = now(),
      result_evidence_ref = pg_catalog.encode(
        extensions.digest(pg_catalog.convert_to(summary::text, 'UTF8'), 'sha256'),
        'hex'
      ),
      result_summary = summary
  WHERE id = request_row.id;

  RETURN jsonb_build_object(
    'requestId', request_row.id,
    'status', 'COMPLETED',
    'privacyContractVersion', contract_version,
    'replayed', false,
    'summary', summary
  );
END;
$$;

CREATE FUNCTION public.purge_expired_icfes_attempts(
  p_idempotency_key uuid,
  p_limit integer DEFAULT 100
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  approved_count integer;
  contract_version text;
  run_row public.icfes_privacy_purge_runs;
  candidate_ids uuid[];
  summary jsonb;
  attempt_count integer := 0;
  review_count integer := 0;
  alert_count integer := 0;
BEGIN
  IF p_idempotency_key IS NULL OR p_limit IS NULL OR p_limit < 1 OR p_limit > 500 THEN
    RAISE EXCEPTION 'icfes_privacy_purge_input_invalid';
  END IF;

  SELECT count(*)::integer, min(version)
  INTO approved_count, contract_version
  FROM public.icfes_privacy_contracts
  WHERE status = 'APPROVED' AND attempt_retention_days IS NOT NULL;

  IF approved_count <> 1 OR contract_version IS NULL THEN
    RAISE EXCEPTION 'icfes_privacy_contract_not_uniquely_approved';
  END IF;

  PERFORM pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended('ICFES:PURGE:' || p_idempotency_key::text, 0)
  );

  SELECT * INTO run_row
  FROM public.icfes_privacy_purge_runs
  WHERE idempotency_key = p_idempotency_key
  FOR UPDATE;

  IF FOUND THEN
    IF run_row.status = 'COMPLETED' AND run_row.result_summary IS NOT NULL THEN
      RETURN jsonb_build_object(
        'runId', run_row.id,
        'status', 'COMPLETED',
        'privacyContractVersion', run_row.privacy_contract_version,
        'replayed', true,
        'summary', run_row.result_summary
      );
    END IF;
    RAISE EXCEPTION 'icfes_privacy_purge_invalid_state';
  END IF;

  INSERT INTO public.icfes_privacy_purge_runs (
    idempotency_key, privacy_contract_version, status, batch_limit
  ) VALUES (p_idempotency_key, contract_version, 'PROCESSING', p_limit)
  RETURNING * INTO run_row;

  SELECT COALESCE(array_agg(candidate.id), ARRAY[]::uuid[])
  INTO candidate_ids
  FROM (
    SELECT attempt.id
    FROM public.icfes_attempts attempt
    WHERE attempt.retention_expires_at <= now()
    ORDER BY attempt.retention_expires_at, attempt.id
    FOR UPDATE SKIP LOCKED
    LIMIT p_limit
  ) candidate;

  attempt_count := cardinality(candidate_ids);

  DELETE FROM public.xpress_teacher_review_alerts alert
  USING public.xpress_teacher_reviews review
  WHERE alert.review_id = review.id
    AND review.icfes_attempt_id = ANY(candidate_ids);
  GET DIAGNOSTICS alert_count = ROW_COUNT;

  DELETE FROM public.xpress_teacher_reviews
  WHERE icfes_attempt_id = ANY(candidate_ids);
  GET DIAGNOSTICS review_count = ROW_COUNT;

  DELETE FROM public.icfes_attempts
  WHERE id = ANY(candidate_ids) AND retention_expires_at <= now();
  GET DIAGNOSTICS attempt_count = ROW_COUNT;

  summary := jsonb_build_object(
    'scope', 'expired-icfes-attempts-v1',
    'attemptsDeleted', attempt_count,
    'teacherReviewsDeleted', review_count,
    'teacherAlertsDeleted', alert_count
  );

  UPDATE public.icfes_privacy_purge_runs
  SET status = 'COMPLETED', completed_at = now(), result_summary = summary
  WHERE id = run_row.id;

  RETURN jsonb_build_object(
    'runId', run_row.id,
    'status', 'COMPLETED',
    'privacyContractVersion', contract_version,
    'replayed', false,
    'summary', summary
  );
END;
$$;

REVOKE ALL ON FUNCTION public.export_icfes_user_data(uuid, uuid)
  FROM PUBLIC, anon, authenticated, service_role;
REVOKE ALL ON FUNCTION public.delete_icfes_user_data(uuid, uuid)
  FROM PUBLIC, anon, authenticated, service_role;
REVOKE ALL ON FUNCTION public.purge_expired_icfes_attempts(uuid, integer)
  FROM PUBLIC, anon, authenticated, service_role;

GRANT EXECUTE ON FUNCTION public.export_icfes_user_data(uuid, uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.delete_icfes_user_data(uuid, uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.purge_expired_icfes_attempts(uuid, integer) TO service_role;

COMMENT ON FUNCTION public.export_icfes_user_data(uuid, uuid)
  IS 'Server-only owner export; fails closed unless exactly one privacy contract is APPROVED.';
COMMENT ON FUNCTION public.delete_icfes_user_data(uuid, uuid)
  IS 'Server-only idempotent deletion of ICFES attempt data and pedagogical derivatives; financial ledgers are out of scope.';
COMMENT ON FUNCTION public.purge_expired_icfes_attempts(uuid, integer)
  IS 'Unscheduled, idempotent retention purge; fails closed without exactly one APPROVED privacy contract.';

-- Rollback (manual, destructive):
-- DROP FUNCTION IF EXISTS public.purge_expired_icfes_attempts(uuid, integer);
-- DROP FUNCTION IF EXISTS public.delete_icfes_user_data(uuid, uuid);
-- DROP FUNCTION IF EXISTS public.export_icfes_user_data(uuid, uuid);
-- DROP TABLE IF EXISTS public.icfes_privacy_purge_runs;
