-- ICFES commercial contract v2. Apply only after Sandbox QA and privacy approval.
-- No remote migration is executed by this repository change.

ALTER TABLE public.icfes_pass_orders
  DROP CONSTRAINT IF EXISTS icfes_pass_orders_amount_in_cents_check;

-- Preserve any legacy approved COP 49.900 order for reconciliation while all new
-- application orders are server-priced at COP 12.900.
ALTER TABLE public.icfes_pass_orders
  ADD CONSTRAINT icfes_pass_orders_amount_in_cents_check
  CHECK (amount_in_cents IN (1290000, 4990000));

ALTER TABLE public.icfes_pass_orders
  ADD COLUMN IF NOT EXISTS terms_version text,
  ADD COLUMN IF NOT EXISTS privacy_version text,
  ADD COLUMN IF NOT EXISTS consent_version text,
  ADD COLUMN IF NOT EXISTS legal_snapshot jsonb,
  ADD COLUMN IF NOT EXISTS accepted_at timestamptz;

ALTER TABLE public.icfes_pass_orders
  ADD CONSTRAINT icfes_pass_orders_v2_legal_snapshot_check CHECK (
    (amount_in_cents = 4990000 AND terms_version IS NULL)
    OR (
      amount_in_cents = 1290000
      AND terms_version = 'icfes-terms-2026-09-12-v2'
      AND privacy_version = 'icfes-privacy-2026-09-12-v2'
      AND consent_version = 'icfes-purchase-2026-09-12-v1'
      AND jsonb_typeof(legal_snapshot) = 'object'
      AND accepted_at IS NOT NULL
    )
  ) NOT VALID;

ALTER TABLE public.icfes_entitlements
  DROP CONSTRAINT IF EXISTS icfes_entitlements_product_code_check;

UPDATE public.icfes_entitlements
SET product_code = 'icfes-single-report-v1'
WHERE product_code = 'icfes-pass-v1';

ALTER TABLE public.icfes_entitlements
  ADD CONSTRAINT icfes_entitlements_product_code_check
  CHECK (product_code = 'icfes-single-report-v1');

COMMENT ON COLUMN public.icfes_pass_orders.legal_snapshot IS
  'Versioned ICFES terms, privacy notice and purchase consent accepted before checkout.';

-- Forward rollback: disable ICFES commerce flags, retain ledger rows and ship a
-- corrective migration. Do not drop or rewrite payment evidence.
