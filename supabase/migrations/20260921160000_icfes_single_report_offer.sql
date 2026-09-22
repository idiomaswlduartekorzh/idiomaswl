-- Align the anonymous ICFES report checkout with the reviewed COP 12.900
-- single-attempt product. Historical COP 49.900 orders remain valid for
-- reconciliation and late signed Wompi events.

ALTER TABLE public.icfes_pass_orders
  DROP CONSTRAINT IF EXISTS icfes_pass_orders_amount_in_cents_check;

ALTER TABLE public.icfes_pass_orders
  ADD CONSTRAINT icfes_pass_orders_amount_in_cents_check
  CHECK (amount_in_cents IN (1290000, 4990000));

ALTER TABLE public.icfes_pass_orders
  ADD COLUMN IF NOT EXISTS terms_version text,
  ADD COLUMN IF NOT EXISTS privacy_version text,
  ADD COLUMN IF NOT EXISTS consented_at timestamptz;

ALTER TABLE public.icfes_pass_orders
  DROP CONSTRAINT IF EXISTS icfes_pass_orders_consent_check;

ALTER TABLE public.icfes_pass_orders
  ADD CONSTRAINT icfes_pass_orders_consent_check
  CHECK (
    (terms_version IS NULL AND privacy_version IS NULL AND consented_at IS NULL)
    OR (
      terms_version IS NOT NULL
      AND privacy_version IS NOT NULL
      AND consented_at IS NOT NULL
    )
  );

COMMENT ON COLUMN public.icfes_pass_orders.terms_version IS
  'Terms version accepted before opening the one-time ICFES checkout.';
COMMENT ON COLUMN public.icfes_pass_orders.privacy_version IS
  'Privacy notice version accepted before opening the one-time ICFES checkout.';
