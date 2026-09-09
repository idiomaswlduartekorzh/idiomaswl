-- ICFES secure grading and one-time paid detail. Apply manually after Sandbox QA.
-- Browser roles intentionally receive no direct access; all access is mediated by trusted routes.

CREATE TABLE IF NOT EXISTS public.icfes_attempts (
  id uuid PRIMARY KEY,
  exam_id text NOT NULL CHECK (exam_id ~ '^[a-z0-9-]{3,80}$'),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  access_token_hash text NOT NULL CHECK (access_token_hash ~ '^[0-9a-f]{64}$'),
  answers jsonb NOT NULL CHECK (jsonb_typeof(answers) = 'object'),
  basic_result jsonb NOT NULL CHECK (jsonb_typeof(basic_result) = 'object'),
  completed_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.icfes_pass_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id uuid NOT NULL REFERENCES public.icfes_attempts(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  reference text NOT NULL UNIQUE CHECK (reference ~ '^WL-ICFES-'),
  amount_in_cents bigint NOT NULL CHECK (amount_in_cents = 4990000),
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
  product_code text NOT NULL CHECK (product_code = 'icfes-pass-v1'),
  granted_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS icfes_pass_orders_one_open_idx ON public.icfes_pass_orders (attempt_id)
  WHERE status IN ('PENDING', 'APPROVED');
CREATE INDEX IF NOT EXISTS icfes_pass_orders_status_created_idx ON public.icfes_pass_orders (status, created_at DESC);
CREATE INDEX IF NOT EXISTS icfes_attempts_user_created_idx ON public.icfes_attempts (user_id, created_at DESC) WHERE user_id IS NOT NULL;

ALTER TABLE public.icfes_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.icfes_pass_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.icfes_entitlements ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.icfes_attempts, public.icfes_pass_orders, public.icfes_entitlements FROM anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE ON TABLE public.icfes_attempts, public.icfes_pass_orders TO service_role;
GRANT SELECT, INSERT ON TABLE public.icfes_entitlements TO service_role;

COMMENT ON TABLE public.icfes_attempts IS 'Private answer payload and basic result for signed ICFES attempts.';
COMMENT ON TABLE public.icfes_entitlements IS 'Idempotent server-granted entitlement after a verified APPROVED Wompi event.';

-- Rollback (manual, destructive):
-- DROP TABLE IF EXISTS public.icfes_entitlements;
-- DROP TABLE IF EXISTS public.icfes_pass_orders;
-- DROP TABLE IF EXISTS public.icfes_attempts;
