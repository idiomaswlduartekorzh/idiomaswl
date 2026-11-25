begin;

create schema if not exists extensions;
create extension if not exists btree_gist with schema extensions;
set local search_path = public, extensions, pg_catalog;

create table public.admin_lessons (
  id uuid primary key default gen_random_uuid(),
  series_id uuid not null,
  occurrence smallint not null check (occurrence between 0 and 15),
  title text not null check (char_length(btrim(title)) between 1 and 120),
  participant text not null check (char_length(btrim(participant)) between 1 and 150),
  teacher text not null check (teacher in ('jose', 'zhanna')),
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status text not null default 'scheduled' check (status in ('scheduled', 'completed', 'cancelled')),
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (series_id, occurrence),
  check (ends_at - starts_at between interval '15 minutes' and interval '4 hours'),
  exclude using gist (
    teacher with =,
    tstzrange(starts_at, ends_at, '[)') with &&
  ) where (status <> 'cancelled')
);

create index admin_lessons_starts_idx on public.admin_lessons (starts_at);
create index admin_lessons_created_by_idx on public.admin_lessons (created_by);
create index admin_lessons_updated_by_idx on public.admin_lessons (updated_by);

create table public.admin_recorded_payments (
  id text primary key check (char_length(id) between 1 and 80),
  source text not null check (source in ('manual', 'historical')),
  period date not null check (extract(day from period) = 1),
  paid_on date,
  amount_in_cents bigint not null check (amount_in_cents between 1 and 100000000000),
  customer_name text not null check (char_length(btrim(customer_name)) between 1 and 150),
  description text not null check (char_length(btrim(description)) between 1 and 300),
  method text check (method in ('Transferencia', 'Efectivo', 'Nequi', 'Daviplata', 'Otro')),
  external_reference text check (char_length(external_reference) between 1 and 120),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  voided_at timestamptz,
  voided_by uuid references auth.users(id) on delete set null,
  void_reason text check (char_length(btrim(void_reason)) between 3 and 300),
  check (
    (source = 'historical' and id ~ '^NUMBERS-20[0-9]{2}-(0[1-9]|1[0-2])-[A-Z]{1,3}[0-9]{1,5}$'
        and substring(id from 9 for 7) = to_char(period, 'YYYY-MM')
        and (paid_on is null or date_trunc('month', paid_on::timestamp)::date = period))
    or (source = 'manual' and id ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
        and paid_on is not null and method is not null and date_trunc('month', paid_on::timestamp)::date = period)
  ),
  check ((voided_at is null) = (void_reason is null))
);

create unique index admin_recorded_payments_reference_idx
  on public.admin_recorded_payments (method, lower(external_reference))
  where source = 'manual' and external_reference is not null and voided_at is null;
create index admin_recorded_payments_created_by_idx on public.admin_recorded_payments (created_by);
create index admin_recorded_payments_voided_by_idx on public.admin_recorded_payments (voided_by);

alter table public.admin_lessons enable row level security;
alter table public.admin_recorded_payments enable row level security;
revoke all on public.admin_lessons, public.admin_recorded_payments from public, anon, authenticated, service_role;
grant select, insert, update on public.admin_lessons to service_role;
grant select, insert on public.admin_recorded_payments to service_role;
grant update (voided_at, voided_by, void_reason) on public.admin_recorded_payments to service_role;

-- TOEFL checkout is provisioned independently. Resolve its table only when present.
create function public.admin_toefl_payment_entries()
returns setof public.admin_payment_ledger
language plpgsql stable security invoker
set search_path = ''
as $$
begin
  if to_regclass('public.toefl_report_orders') is not null then
    return query
      select
        'toefl'::text, 'toefl:' || payment.id::text, payment.reference, payment.wompi_transaction_id,
        submission.user_name, submission.user_email, null::text, 'Informe TOEFL'::text, payment.amount_in_cents,
        payment.currency, payment.status, null::text, payment.environment, payment.created_at, payment.updated_at,
        payment.paid_at, null::text
      from public.toefl_report_orders payment
      join public.exam_submissions submission on submission.id = payment.submission_id;
  end if;
end;
$$;

revoke all on function public.admin_toefl_payment_entries() from public, anon, authenticated, service_role;
grant execute on function public.admin_toefl_payment_entries() to service_role;

create view public.admin_online_payment_ledger with (security_invoker = true) as
select * from public.admin_payment_ledger
union all
select * from public.admin_toefl_payment_entries();

create view public.admin_full_payment_ledger with (security_invoker = true) as
select online.*, null::date as source_period, null::date as paid_on
from public.admin_online_payment_ledger online
union all
select
  source, source || ':' || id, coalesce(external_reference, id), null::text,
  customer_name, null::text, null::text, description, amount_in_cents,
  'COP'::text, case when voided_at is null then 'APPROVED' else 'VOIDED' end,
  method, 'production'::text, created_at,
  coalesce(paid_on, period)::timestamp at time zone 'America/Bogota',
  paid_on::timestamp at time zone 'America/Bogota', null::text, period, paid_on
from public.admin_recorded_payments;

revoke all on public.admin_online_payment_ledger, public.admin_full_payment_ledger
  from public, anon, authenticated, service_role;
grant select on public.admin_online_payment_ledger, public.admin_full_payment_ledger to service_role;

commit;
