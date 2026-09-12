-- Run after local migrations: supabase test db supabase/tests/icfes_privacy_contract.sql
BEGIN;

DO $test$
DECLARE
  error_message text;
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_catalog.pg_class c
    JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relname = 'icfes_attempts' AND c.relrowsecurity
  ) THEN RAISE EXCEPTION 'icfes_attempts RLS missing'; END IF;

  IF NOT EXISTS (
    SELECT 1 FROM public.icfes_privacy_contracts
    WHERE version = 'icfes-privacy-2026-09-draft' AND status = 'DRAFT_BLOCKED'
      AND attempt_retention_days IS NULL AND minor_handling IS NULL AND approved_at IS NULL
  ) THEN RAISE EXCEPTION 'draft privacy contract is not fail-closed'; END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_catalog.pg_class c
    JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relname = 'icfes_privacy_purge_runs' AND c.relrowsecurity
  ) THEN RAISE EXCEPTION 'icfes_privacy_purge_runs RLS missing'; END IF;

  IF pg_catalog.has_table_privilege('anon', 'public.icfes_attempts', 'SELECT')
    OR pg_catalog.has_table_privilege('authenticated', 'public.icfes_attempts', 'SELECT')
    OR pg_catalog.has_table_privilege('authenticated', 'public.xpress_teacher_review_payloads', 'SELECT')
  THEN RAISE EXCEPTION 'browser role can read private ICFES data'; END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'xpress_teacher_review_payloads'
      AND column_name IN ('user_id', 'access_token_hash', 'email', 'phone', 'name')
  ) THEN RAISE EXCEPTION 'teacher payload exposes identity or contact data'; END IF;

  IF (
    SELECT count(*) FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'xpress_teacher_review_payloads'
      AND column_name IN ('exam_id', 'basic_result', 'objective_answers')
  ) <> 3 THEN RAISE EXCEPTION 'teacher payload is missing minimum ICFES review evidence'; END IF;

  IF pg_get_viewdef('public.xpress_teacher_review_payloads'::regclass, true) NOT ILIKE '%icfes_attempts%'
    OR pg_get_viewdef('public.xpress_teacher_review_payloads'::regclass, true) ILIKE '%exam_submissions%'
  THEN RAISE EXCEPTION 'teacher payload does not use the secure ICFES attempt source'; END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_catalog.pg_class c
    JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relname = 'xpress_teacher_review_payloads'
      AND 'security_invoker=true' = ANY (COALESCE(c.reloptions, ARRAY[]::text[]))
  ) THEN RAISE EXCEPTION 'teacher payload must be security_invoker'; END IF;

  IF to_regclass('public.icfes_teacher_review_assignments') IS NOT NULL
    OR to_regclass('public.icfes_teacher_review_payloads') IS NOT NULL
  THEN RAISE EXCEPTION 'parallel ICFES teacher workflow must not exist'; END IF;

  IF pg_catalog.has_function_privilege(
    'authenticated', 'public.get_xpress_teacher_review_payload(uuid,uuid,uuid)', 'EXECUTE'
  ) THEN RAISE EXCEPTION 'browser role can execute teacher payload function'; END IF;

  IF pg_catalog.has_function_privilege(
    'authenticated', 'public.export_icfes_user_data(uuid,uuid)', 'EXECUTE'
  ) OR pg_catalog.has_function_privilege(
    'authenticated', 'public.delete_icfes_user_data(uuid,uuid)', 'EXECUTE'
  ) OR pg_catalog.has_function_privilege(
    'authenticated', 'public.purge_expired_icfes_attempts(uuid,integer)', 'EXECUTE'
  ) THEN RAISE EXCEPTION 'browser role can execute a privileged privacy operation'; END IF;

  BEGIN
    PERFORM public.export_icfes_user_data(
      '00000000-0000-4000-8000-000000000001',
      '10000000-0000-4000-8000-000000000001'
    );
    RAISE EXCEPTION 'draft privacy contract allowed export';
  EXCEPTION WHEN OTHERS THEN
    GET STACKED DIAGNOSTICS error_message = MESSAGE_TEXT;
    IF error_message <> 'icfes_privacy_contract_not_uniquely_approved' THEN RAISE; END IF;
  END;

  BEGIN
    PERFORM public.delete_icfes_user_data(
      '00000000-0000-4000-8000-000000000001',
      '20000000-0000-4000-8000-000000000001'
    );
    RAISE EXCEPTION 'draft privacy contract allowed deletion';
  EXCEPTION WHEN OTHERS THEN
    GET STACKED DIAGNOSTICS error_message = MESSAGE_TEXT;
    IF error_message <> 'icfes_privacy_contract_not_uniquely_approved' THEN RAISE; END IF;
  END;

  BEGIN
    PERFORM public.purge_expired_icfes_attempts(
      '30000000-0000-4000-8000-000000000001', 100
    );
    RAISE EXCEPTION 'draft privacy contract allowed retention purge';
  EXCEPTION WHEN OTHERS THEN
    GET STACKED DIAGNOSTICS error_message = MESSAGE_TEXT;
    IF error_message <> 'icfes_privacy_contract_not_uniquely_approved' THEN RAISE; END IF;
  END;

  BEGIN
    INSERT INTO public.icfes_attempts (
      id, exam_id, access_token_hash, answers, basic_result, age_assurance, retention_expires_at
    ) VALUES (
      '00000000-0000-4000-8000-000000000001', 'mock-01', repeat('a', 64), '{}',
      '{"correct":0,"total":1}', 'ADULT_ATTESTED', now() + interval '1 day'
    );
    RAISE EXCEPTION 'draft privacy contract accepted an attempt';
  EXCEPTION WHEN OTHERS THEN
    GET STACKED DIAGNOSTICS error_message = MESSAGE_TEXT;
    IF error_message <> 'icfes_privacy_contract_not_approved' THEN RAISE; END IF;
  END;
END;
$test$;

ROLLBACK;
