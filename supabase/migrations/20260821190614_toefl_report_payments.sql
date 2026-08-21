-- Paid TOEFL reports. All reads and writes happen through trusted server code.
-- Browser roles intentionally receive no table privileges or RLS policies.

CREATE TABLE IF NOT EXISTS public.toefl_report_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id uuid NOT NULL REFERENCES public.exam_submissions(id) ON DELETE CASCADE,
  reference text NOT NULL UNIQUE,
  amount_in_cents bigint NOT NULL CHECK (amount_in_cents > 0),
  currency text NOT NULL DEFAULT 'COP' CHECK (currency = 'COP'),
  status text NOT NULL DEFAULT 'PENDING'
    CHECK (status IN ('PENDING', 'APPROVED', 'DECLINED', 'VOIDED', 'ERROR')),
  environment text NOT NULL CHECK (environment IN ('sandbox', 'production')),
  access_token_hash text NOT NULL CHECK (access_token_hash ~ '^[0-9a-f]{64}$'),
  wompi_transaction_id text UNIQUE,
  paid_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS toefl_report_orders_one_pending_idx
  ON public.toefl_report_orders (submission_id)
  WHERE status = 'PENDING';

CREATE UNIQUE INDEX IF NOT EXISTS toefl_report_orders_one_approved_idx
  ON public.toefl_report_orders (submission_id)
  WHERE status = 'APPROVED';

CREATE INDEX IF NOT EXISTS toefl_report_orders_status_created_idx
  ON public.toefl_report_orders (status, created_at DESC);

ALTER TABLE public.toefl_report_orders ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.toefl_report_orders FROM anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE ON TABLE public.toefl_report_orders TO service_role;

COMMENT ON TABLE public.toefl_report_orders IS
  'Server-only Wompi payment attempts that unlock private TOEFL pedagogical reports.';
COMMENT ON COLUMN public.toefl_report_orders.access_token_hash IS
  'SHA-256 of a random HttpOnly browser capability; the raw token is never stored.';
