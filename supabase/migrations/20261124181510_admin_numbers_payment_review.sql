begin;

create table public.admin_numbers_payment_review (
  id text primary key check (id ~ '^NUMBERS-20[0-9]{2}-(0[1-9]|1[0-2])-[A-Z]{1,3}[0-9]{1,5}$'),
  reported_amount_in_cents bigint check (reported_amount_in_cents between 1 and 100000000000),
  reported_paid_on date,
  reason text not null check (reason in (
    'fecha_fuera_del_mes', 'coincidencia_de_nombre_e_importe_en_el_mes',
    'posible_duplicado', 'valor_o_concepto_por_verificar', 'nombre_por_verificar'
  )),
  created_at timestamptz not null default now()
);

alter table public.admin_numbers_payment_review enable row level security;
revoke all on public.admin_numbers_payment_review from public, anon, authenticated, service_role;
grant select on public.admin_numbers_payment_review to service_role;

-- A reviewed receipt can correct the month without losing the original cell's unique reference.
alter table public.admin_recorded_payments
  add column numbers_review_id text references public.admin_numbers_payment_review(id),
  drop constraint admin_recorded_payments_check,
  add constraint admin_recorded_payments_origin_check check (
    (source = 'historical'
      and id ~ '^NUMBERS-20[0-9]{2}-(0[1-9]|1[0-2])-[A-Z]{1,3}[0-9]{1,5}$'
      and (substring(id from 9 for 7) = to_char(period, 'YYYY-MM')
        or (numbers_review_id is not null and numbers_review_id = id))
      and (paid_on is null or date_trunc('month', paid_on::timestamp)::date = period)
      and (numbers_review_id is null or (numbers_review_id = id and paid_on is not null)))
    or (source = 'manual' and numbers_review_id is null
      and id ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
      and paid_on is not null and method is not null and date_trunc('month', paid_on::timestamp)::date = period)
  );

create index admin_recorded_payments_numbers_review_idx on public.admin_recorded_payments (numbers_review_id)
  where numbers_review_id is not null;
create unique index admin_recorded_payments_review_receipt_idx
  on public.admin_recorded_payments (lower(btrim(external_reference)))
  where numbers_review_id is not null and external_reference is not null and voided_at is null;

commit;
