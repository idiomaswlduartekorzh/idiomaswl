-- Scope ICFES recurring prices without regressing the generic Xpress v5
-- contract already live in production. Payment flags remain off until verified.

ALTER TABLE public.xpress_subscriptions
  DROP CONSTRAINT IF EXISTS xpress_subscriptions_offer_version_check,
  ADD CONSTRAINT xpress_subscriptions_offer_version_check CHECK (
    offer_version IN ('xpress-2026-09-12-v4', 'xpress-2026-09-12-v5')
    OR (offer_version = 'icfes-2026-09-12-v2' AND exam_slug = 'icfes')
  ),
  DROP CONSTRAINT IF EXISTS xpress_subscriptions_check,
  DROP CONSTRAINT IF EXISTS xpress_subscriptions_offer_amount_check_v5,
  DROP CONSTRAINT IF EXISTS xpress_subscriptions_offer_quote_check,
  ADD CONSTRAINT xpress_subscriptions_offer_quote_check CHECK (
    (
      offer_version = 'xpress-2026-09-12-v4'
      AND ((offer_id = 'exam-auto' AND amount_in_cents = 4900000)
        OR (offer_id = 'exam-teacher' AND amount_in_cents = 9900000))
    )
    OR (
      offer_version = 'xpress-2026-09-12-v5'
      AND ((offer_id = 'exam-auto' AND amount_in_cents = 4990000)
        OR (offer_id = 'exam-teacher' AND amount_in_cents = 9990000))
    )
    OR (
      offer_version = 'icfes-2026-09-12-v2'
      AND exam_slug = 'icfes'
      AND ((offer_id = 'exam-auto' AND amount_in_cents = 4990000)
        OR (offer_id = 'exam-teacher' AND amount_in_cents = 9990000))
    )
  );

ALTER TABLE public.xpress_orders
  DROP CONSTRAINT IF EXISTS xpress_orders_offer_quote_check,
  ADD CONSTRAINT xpress_orders_offer_quote_check CHECK (
    (
      offer_version = 'xpress-2026-09-08-v2'
      AND subscription_id IS NULL AND billing_period_start IS NULL AND billing_period_end IS NULL
      AND (
        order_kind = 'new' AND credit_in_cents = 0 AND coverage_ends_at IS NULL
          AND ((offer_id = 'exam-auto' AND amount_in_cents = 4900000) OR (offer_id = 'exam-teacher' AND amount_in_cents = 9900000))
        OR order_kind = 'upgrade' AND offer_id = 'exam-teacher' AND credit_in_cents = 4900000
          AND amount_in_cents = 5000000 AND coverage_ends_at > expires_at
      )
    )
    OR (
      offer_version = 'xpress-2026-09-09-v3'
      AND subscription_id IS NULL AND billing_period_start IS NULL AND billing_period_end IS NULL
      AND (
        order_kind = 'single' AND offer_id = 'exam-single' AND credit_in_cents = 0
          AND amount_in_cents = 1200000 AND coverage_ends_at IS NULL
        OR order_kind = 'new' AND credit_in_cents = 0 AND coverage_ends_at IS NULL
          AND ((offer_id = 'exam-auto' AND amount_in_cents = 4900000) OR (offer_id = 'exam-teacher' AND amount_in_cents = 9900000))
        OR order_kind = 'upgrade' AND offer_id = 'exam-teacher' AND credit_in_cents = 4900000
          AND amount_in_cents = 5000000 AND coverage_ends_at > expires_at
      )
    )
    OR (
      offer_version = 'xpress-2026-09-12-v4'
      AND (
        order_kind = 'single' AND offer_id = 'exam-single' AND credit_in_cents = 0 AND amount_in_cents = 1200000
          AND coverage_ends_at IS NULL AND subscription_id IS NULL AND billing_period_start IS NULL AND billing_period_end IS NULL
        OR order_kind IN ('subscription_start','renewal') AND offer_id IN ('exam-auto','exam-teacher')
          AND credit_in_cents = 0 AND subscription_id IS NOT NULL AND billing_period_start IS NOT NULL
          AND billing_period_end = billing_period_start + interval '30 days' AND coverage_ends_at = billing_period_end
          AND ((offer_id = 'exam-auto' AND amount_in_cents = 4900000) OR (offer_id = 'exam-teacher' AND amount_in_cents = 9900000))
      )
    )
    OR (
      offer_version = 'xpress-2026-09-12-v5'
      AND (
        order_kind = 'single' AND offer_id = 'exam-single' AND credit_in_cents = 0 AND amount_in_cents = 1290000
          AND coverage_ends_at IS NULL AND subscription_id IS NULL AND billing_period_start IS NULL AND billing_period_end IS NULL
        OR order_kind IN ('subscription_start','renewal') AND offer_id IN ('exam-auto','exam-teacher')
          AND credit_in_cents = 0 AND subscription_id IS NOT NULL AND billing_period_start IS NOT NULL
          AND billing_period_end = billing_period_start + interval '30 days' AND coverage_ends_at = billing_period_end
          AND ((offer_id = 'exam-auto' AND amount_in_cents = 4990000) OR (offer_id = 'exam-teacher' AND amount_in_cents = 9990000))
      )
    )
    OR (
      offer_version = 'icfes-2026-09-12-v2' AND exam_slug = 'icfes'
      AND order_kind IN ('subscription_start','renewal') AND offer_id IN ('exam-auto','exam-teacher')
      AND credit_in_cents = 0 AND subscription_id IS NOT NULL AND billing_period_start IS NOT NULL
      AND billing_period_end = billing_period_start + interval '30 days' AND coverage_ends_at = billing_period_end
      AND ((offer_id = 'exam-auto' AND amount_in_cents = 4990000) OR (offer_id = 'exam-teacher' AND amount_in_cents = 9990000))
    )
  );

CREATE OR REPLACE FUNCTION public.enforce_new_icfes_xpress_subscription_contract()
RETURNS trigger LANGUAGE plpgsql SET search_path = '' AS $$
BEGIN
  IF NEW.exam_slug = 'icfes' AND (
    NEW.environment NOT IN ('sandbox','production')
    OR NEW.offer_version <> 'icfes-2026-09-12-v2'
    OR NEW.terms_version <> 'icfes-terms-2026-09-12-v2'
    OR NEW.privacy_version <> 'icfes-privacy-2026-09-12-v2'
    OR NEW.recurring_consent_version <> 'icfes-recurring-30d-2026-09-12-v1'
  ) THEN
    RAISE EXCEPTION 'invalid_icfes_subscription_contract';
  END IF;
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS enforce_new_icfes_xpress_subscription_contract ON public.xpress_subscriptions;
CREATE TRIGGER enforce_new_icfes_xpress_subscription_contract
  BEFORE INSERT ON public.xpress_subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.enforce_new_icfes_xpress_subscription_contract();

CREATE OR REPLACE FUNCTION public.prepare_icfes_xpress_subscription(
  p_user uuid,p_email text,p_key uuid,p_environment text,p_offer_version text,p_offer text,p_exam text,p_amount bigint,
  p_initial_charge_at timestamptz,p_terms text,p_privacy text,p_recurring text,p_legal jsonb
)
RETURNS public.xpress_subscriptions LANGUAGE plpgsql SECURITY INVOKER SET search_path = '' AS $$
DECLARE result public.xpress_subscriptions; open_subscription public.xpress_subscriptions;
BEGIN
  IF p_user IS NULL OR p_email IS NULL OR p_email <> lower(p_email) THEN RAISE EXCEPTION 'invalid_subscription_identity'; END IF;
  IF p_environment NOT IN ('sandbox','production') OR p_exam <> 'icfes'
    OR p_offer_version <> 'icfes-2026-09-12-v2'
    OR p_terms <> 'icfes-terms-2026-09-12-v2'
    OR p_privacy <> 'icfes-privacy-2026-09-12-v2'
    OR p_recurring <> 'icfes-recurring-30d-2026-09-12-v1'
  THEN RAISE EXCEPTION 'invalid_icfes_subscription_version'; END IF;
  IF NOT ((p_offer = 'exam-auto' AND p_amount = 4990000)
    OR (p_offer = 'exam-teacher' AND p_amount = 9990000))
  THEN RAISE EXCEPTION 'invalid_icfes_subscription_quote'; END IF;
  IF p_initial_charge_at IS NULL OR p_initial_charge_at < now() - interval '1 minute'
  THEN RAISE EXCEPTION 'invalid_initial_charge'; END IF;

  PERFORM pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_user::text, 12));
  SELECT * INTO result FROM public.xpress_subscriptions
    WHERE user_id = p_user AND environment = p_environment AND idempotency_key = p_key;
  IF found THEN
    IF result.offer_version <> p_offer_version OR result.offer_id <> p_offer OR result.exam_slug <> p_exam
      OR result.amount_in_cents <> p_amount OR result.terms_version <> p_terms
      OR result.privacy_version <> p_privacy OR result.recurring_consent_version <> p_recurring
      OR result.legal_snapshot <> p_legal
    THEN RAISE EXCEPTION 'idempotency_conflict'; END IF;
    RETURN result;
  END IF;

  SELECT * INTO open_subscription FROM public.xpress_subscriptions
    WHERE user_id = p_user AND environment = p_environment AND status <> 'canceled'
    ORDER BY created_at DESC LIMIT 1;
  IF found THEN
    IF open_subscription.status = 'creating_source' AND open_subscription.offer_version = p_offer_version
      AND open_subscription.offer_id = p_offer AND open_subscription.exam_slug = p_exam
      AND open_subscription.amount_in_cents = p_amount AND open_subscription.terms_version = p_terms
      AND open_subscription.privacy_version = p_privacy AND open_subscription.recurring_consent_version = p_recurring
      AND open_subscription.legal_snapshot = p_legal
    THEN RETURN open_subscription; END IF;
    RAISE EXCEPTION 'xpress_subscription_exists';
  END IF;

  INSERT INTO public.xpress_subscriptions(
    user_id,purchaser_email,idempotency_key,environment,offer_version,offer_id,exam_slug,
    amount_in_cents,initial_charge_at,next_charge_at,terms_version,privacy_version,recurring_consent_version,legal_snapshot
  ) VALUES (
    p_user,p_email,p_key,p_environment,p_offer_version,p_offer,p_exam,p_amount,p_initial_charge_at,NULL,
    p_terms,p_privacy,p_recurring,p_legal
  ) RETURNING * INTO result;
  RETURN result;
END $$;

REVOKE ALL ON FUNCTION public.prepare_icfes_xpress_subscription(uuid,text,uuid,text,text,text,text,bigint,timestamptz,text,text,text,jsonb)
  FROM public,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.prepare_icfes_xpress_subscription(uuid,text,uuid,text,text,text,text,bigint,timestamptz,text,text,text,jsonb)
  TO service_role;

COMMENT ON FUNCTION public.prepare_icfes_xpress_subscription(uuid,text,uuid,text,text,text,text,bigint,timestamptz,text,text,text,jsonb) IS
  'Creation of ICFES 30-day agreements under server-side flags. No card data is accepted by this function.';

-- Forward rollback: set ICFES flags false and preserve all ledgers. Correct the
-- contract with a subsequent migration; do not drop orders or subscriptions.
