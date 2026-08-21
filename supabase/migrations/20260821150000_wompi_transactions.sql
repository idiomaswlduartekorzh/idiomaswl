-- Ledger privado para conciliar el checkout Wompi con sus eventos firmados.
-- No almacena número de documento, correo, dirección ni datos de tarjeta.
create table if not exists public.wompi_transactions (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique
    check (reference ~ '^WL-[a-z0-9]+-[a-z]+-[ma]-[0-9a-z]{8,12}-[0-9a-f]{12,24}$'),
  wompi_transaction_id text unique,
  environment text not null check (environment in ('sandbox', 'production')),
  plan_id text not null
    check (plan_id in ('autodidacta', 'preparacion', 'intensivo2', 'intensivo4')),
  language text not null
    check (language in ('ingles', 'coreano', 'frances', 'aleman', 'italiano', 'portugues', 'japones', 'ruso')),
  billing_period text not null check (billing_period in ('monthly', 'annual')),
  amount_in_cents bigint not null check (amount_in_cents > 0),
  currency text not null default 'COP' check (currency = 'COP'),
  status text not null
    check (status in ('CREATED', 'PENDING', 'APPROVED', 'DECLINED', 'VOIDED', 'ERROR')),
  payment_method_type text,
  last_event_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists wompi_transactions_status_created_idx
  on public.wompi_transactions (status, created_at desc);

alter table public.wompi_transactions enable row level security;

revoke all on table public.wompi_transactions from anon, authenticated;
grant select, insert, update on table public.wompi_transactions to service_role;

comment on table public.wompi_transactions is
  'Ledger servidor-servidor de referencias y estados verificados de Wompi.';
