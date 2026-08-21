BEGIN;

-- Registration intent is presentation state only. It must never be used as an
-- authorization claim: raw_user_meta_data is editable by the end user.
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS account_type text NOT NULL DEFAULT 'platform',
  ADD COLUMN IF NOT EXISTS intended_product_id text;

ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_account_type_check,
  DROP CONSTRAINT IF EXISTS profiles_registration_intent_check;

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_account_type_check
    CHECK (account_type IN ('platform', 'student')),
  ADD CONSTRAINT profiles_registration_intent_check
    CHECK (
      intended_product_id IS NULL
      OR (account_type = 'platform' AND intended_product_id = 'platform-unlimited-30d')
      OR (
        account_type = 'student'
        AND intended_product_id IN (
          'english-8h', 'english-16h', 'english-24h',
          'english-32h', 'english-40h', 'english-80h'
        )
      )
    );

-- A private, server-to-server ledger for registration purchases. Browser roles
-- receive no privileges; the API authenticates the caller and uses service_role.
CREATE TABLE IF NOT EXISTS public.registration_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  account_type text NOT NULL CHECK (account_type IN ('platform', 'student')),
  product_id text NOT NULL CHECK (
    product_id IN (
      'platform-unlimited-30d',
      'english-8h', 'english-16h', 'english-24h',
      'english-32h', 'english-40h', 'english-80h'
    )
  ),
  reference text NOT NULL UNIQUE CHECK (
    reference ~ '^WL-REG-[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}-[0-9a-f]{8}$'
  ),
  amount_in_cents bigint NOT NULL CHECK (amount_in_cents > 0),
  currency text NOT NULL DEFAULT 'COP' CHECK (currency = 'COP'),
  status text NOT NULL DEFAULT 'PENDING'
    CHECK (status IN ('PENDING', 'APPROVED', 'DECLINED', 'VOIDED', 'ERROR')),
  fulfillment_status text NOT NULL DEFAULT 'PENDING'
    CHECK (fulfillment_status IN ('PENDING', 'ACTIVE', 'AWAITING_SCHEDULE', 'EXPIRED')),
  environment text NOT NULL CHECK (environment IN ('sandbox', 'production')),
  wompi_transaction_id text UNIQUE,
  payment_method_type text,
  paid_at timestamptz,
  access_starts_at timestamptz,
  access_ends_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (
    access_ends_at IS NULL
    OR (access_starts_at IS NOT NULL AND access_ends_at > access_starts_at)
  )
);

CREATE UNIQUE INDEX IF NOT EXISTS registration_orders_one_pending_idx
  ON public.registration_orders (user_id, product_id)
  WHERE status = 'PENDING';

CREATE INDEX IF NOT EXISTS registration_orders_user_created_idx
  ON public.registration_orders (user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS registration_orders_status_created_idx
  ON public.registration_orders (status, created_at DESC);

ALTER TABLE public.registration_orders ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.registration_orders FROM anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE ON TABLE public.registration_orders TO service_role;

-- Preserve the existing role assignment and copy only a validated, non-
-- privileged registration intent from signup metadata.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  assigned_role public.user_role;
  selected_account_type text;
  selected_product_id text;
BEGIN
  IF new.email IN (
    'josedavidduartesilva@gmail.com',
    'david.duartes182@gmail.com',
    'zhanna.korzh@gmail.com'
  ) THEN
    assigned_role := 'admin';
  ELSE
    assigned_role := 'student';
  END IF;

  selected_account_type := CASE
    WHEN new.raw_user_meta_data->>'account_type' = 'student' THEN 'student'
    ELSE 'platform'
  END;

  selected_product_id := CASE
    WHEN selected_account_type = 'platform'
      AND new.raw_user_meta_data->>'intended_product_id' = 'platform-unlimited-30d'
      THEN 'platform-unlimited-30d'
    WHEN selected_account_type = 'student'
      AND new.raw_user_meta_data->>'intended_product_id' IN (
        'english-8h', 'english-16h', 'english-24h',
        'english-32h', 'english-40h', 'english-80h'
      )
      THEN new.raw_user_meta_data->>'intended_product_id'
    ELSE NULL
  END;

  INSERT INTO public.profiles (
    id, email, full_name, role, account_type, intended_product_id
  ) VALUES (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    assigned_role,
    selected_account_type,
    selected_product_id
  );
  RETURN new;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

COMMENT ON COLUMN public.profiles.account_type IS
  'Non-privileged onboarding path selected by the user: platform or student.';
COMMENT ON COLUMN public.profiles.intended_product_id IS
  'Validated product interest. Payment approval, not this field, grants access.';
COMMENT ON TABLE public.registration_orders IS
  'Private Wompi ledger for platform access and teacher-led English packages.';

COMMIT;
