-- Private finance ledger and one-use Wompi payment links created by administrators.
-- Browser roles never access these records directly; trusted server code uses service_role.

create table public.admin_payment_links (
  id uuid primary key default gen_random_uuid(),
  wompi_payment_link_id text unique check (
    wompi_payment_link_id is null or length(wompi_payment_link_id) between 3 and 120
  ),
  payment_url text unique check (
    payment_url is null or payment_url ~ '^https://checkout[.]wompi[.]co/l/[A-Za-z0-9_-]+$'
  ),
  environment text not null check (environment in ('sandbox', 'production')),
  amount_in_cents bigint not null check (amount_in_cents between 100000 and 10000000000),
  currency text not null default 'COP' check (currency = 'COP'),
  title text not null check (length(title) between 3 and 150),
  description text not null default '' check (length(description) <= 500),
  customer_name text check (customer_name is null or length(customer_name) <= 120),
  customer_email text check (
    customer_email is null or (
      customer_email = lower(customer_email)
      and length(customer_email) between 5 and 254
    )
  ),
  customer_phone text check (customer_phone is null or length(customer_phone) <= 30),
  internal_note text check (internal_note is null or length(internal_note) <= 1000),
  status text not null default 'CREATING' check (
    status in ('CREATING', 'ACTIVE', 'PAID', 'VOIDED', 'EXPIRED', 'CANCELLED', 'ERROR')
  ),
  last_payment_status text check (
    last_payment_status is null or last_payment_status in ('PENDING', 'APPROVED', 'DECLINED', 'VOIDED', 'ERROR')
  ),
  last_wompi_transaction_id text,
  created_by uuid not null references auth.users(id),
  created_by_email text not null check (
    created_by_email = lower(created_by_email)
    and length(created_by_email) between 5 and 254
  ),
  expires_at timestamptz not null,
  paid_at timestamptz,
  error_message text check (error_message is null or length(error_message) <= 500),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (expires_at > created_at),
  check (status <> 'ACTIVE' or (wompi_payment_link_id is not null and payment_url is not null)),
  check (status <> 'PAID' or paid_at is not null)
);

create index admin_payment_links_status_created_idx
  on public.admin_payment_links (environment, status, created_at desc);
create index admin_payment_links_expiry_idx
  on public.admin_payment_links (expires_at)
  where status in ('CREATING', 'ACTIVE');

create table public.admin_payment_link_transactions (
  environment text not null check (environment in ('sandbox', 'production')),
  provider_id text not null check (length(provider_id) between 6 and 120),
  link_id uuid not null references public.admin_payment_links(id),
  status text not null check (status in ('PENDING', 'APPROVED', 'DECLINED', 'VOIDED', 'ERROR')),
  amount_in_cents bigint not null check (amount_in_cents > 0),
  currency text not null check (currency = 'COP'),
  payment_method_type text check (payment_method_type is null or length(payment_method_type) <= 80),
  observed_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (environment, provider_id)
);

create index admin_payment_link_transactions_link_idx
  on public.admin_payment_link_transactions (link_id, observed_at desc);

create table public.admin_payment_link_events (
  fingerprint text primary key check (fingerprint ~ '^[0-9a-f]{64}$'),
  link_id uuid not null references public.admin_payment_links(id),
  provider_id text not null,
  environment text not null check (environment in ('sandbox', 'production')),
  status text not null check (status in ('PENDING', 'APPROVED', 'DECLINED', 'VOIDED', 'ERROR')),
  amount_in_cents bigint not null,
  observed_at timestamptz not null,
  received_at timestamptz not null default now()
);

create index admin_payment_link_events_link_idx
  on public.admin_payment_link_events (link_id, received_at desc);

alter table public.admin_payment_links enable row level security;
alter table public.admin_payment_link_transactions enable row level security;
alter table public.admin_payment_link_events enable row level security;

revoke all on public.admin_payment_links,
  public.admin_payment_link_transactions,
  public.admin_payment_link_events
from public, anon, authenticated, service_role;

grant select, insert, update on public.admin_payment_links to service_role;
grant select, insert, update on public.admin_payment_link_transactions to service_role;
grant select, insert on public.admin_payment_link_events to service_role;

-- The provider lookup happens in trusted server code before this function is called.
-- Events are append-only and current state cannot regress after a terminal result.
create function public.record_admin_payment_link_transaction(
  p_wompi_link_id text,
  p_environment text,
  p_provider_id text,
  p_amount bigint,
  p_currency text,
  p_status text,
  p_payment_method text,
  p_observed timestamptz,
  p_fingerprint text
)
returns uuid
language plpgsql
security invoker
set search_path = ''
as $$
declare
  selected_link public.admin_payment_links;
  prior public.admin_payment_link_transactions;
begin
  if p_wompi_link_id is null or p_provider_id is null or p_observed is null
    or p_status not in ('PENDING', 'APPROVED', 'DECLINED', 'VOIDED', 'ERROR')
    or p_fingerprint !~ '^[0-9a-f]{64}$'
  then
    raise exception 'invalid_payment';
  end if;

  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_wompi_link_id, 31));

  select * into selected_link
  from public.admin_payment_links
  where wompi_payment_link_id = p_wompi_link_id
  for update;

  if not found then return null; end if;

  if selected_link.environment <> p_environment
    or selected_link.amount_in_cents <> p_amount
    or selected_link.currency <> p_currency
  then
    raise exception 'payment_mismatch';
  end if;

  select * into prior
  from public.admin_payment_link_transactions
  where environment = p_environment and provider_id = p_provider_id;

  if found and prior.link_id <> selected_link.id then
    raise exception 'transaction_link_mismatch';
  end if;

  insert into public.admin_payment_link_events (
    fingerprint, link_id, provider_id, environment, status, amount_in_cents, observed_at
  ) values (
    p_fingerprint, selected_link.id, p_provider_id, p_environment, p_status, p_amount, p_observed
  ) on conflict do nothing;

  if not found then return selected_link.id; end if;

  insert into public.admin_payment_link_transactions (
    environment, provider_id, link_id, status, amount_in_cents, currency,
    payment_method_type, observed_at
  ) values (
    p_environment, p_provider_id, selected_link.id, p_status, p_amount, p_currency,
    nullif(left(coalesce(p_payment_method, ''), 80), ''), p_observed
  )
  on conflict (environment, provider_id) do update
    set status = excluded.status,
        payment_method_type = excluded.payment_method_type,
        observed_at = excluded.observed_at,
        updated_at = now()
    where public.admin_payment_link_transactions.observed_at <= excluded.observed_at
      and not (
        public.admin_payment_link_transactions.status in ('APPROVED', 'VOIDED')
        and excluded.status in ('PENDING', 'DECLINED', 'ERROR')
      )
      and not (
        public.admin_payment_link_transactions.status = 'VOIDED'
        and excluded.status = 'APPROVED'
      );

  if p_status = 'APPROVED' then
    update public.admin_payment_links
      set status = 'PAID',
          last_payment_status = p_status,
          last_wompi_transaction_id = p_provider_id,
          paid_at = coalesce(paid_at, p_observed),
          error_message = null,
          updated_at = now()
      where id = selected_link.id and status <> 'VOIDED';
  elsif p_status = 'VOIDED' then
    update public.admin_payment_links
      set status = 'VOIDED',
          last_payment_status = p_status,
          last_wompi_transaction_id = p_provider_id,
          updated_at = now()
      where id = selected_link.id;
  else
    update public.admin_payment_links
      set last_payment_status = p_status,
          last_wompi_transaction_id = p_provider_id,
          updated_at = now()
      where id = selected_link.id and status not in ('PAID', 'VOIDED');
  end if;

  return selected_link.id;
end;
$$;

revoke all on function public.record_admin_payment_link_transaction(
  text, text, text, bigint, text, text, text, timestamptz, text
) from public, anon, authenticated;
grant execute on function public.record_admin_payment_link_transaction(
  text, text, text, bigint, text, text, text, timestamptz, text
) to service_role;

-- A single server-only projection for the finance dashboard. It includes open
-- payment intents and every verified provider transaction without exposing the
-- underlying private tables to browser roles.
create view public.admin_payment_ledger
with (security_invoker = true)
as
select
  'plans'::text as source,
  'plan:' || wt.id::text as record_id,
  wt.reference,
  wt.wompi_transaction_id as provider_id,
  null::text as customer_name,
  null::text as customer_email,
  null::text as customer_phone,
  concat_ws(' · ', wt.plan_id, wt.language, wt.billing_period) as description,
  wt.amount_in_cents,
  wt.currency,
  wt.status,
  wt.payment_method_type,
  wt.environment,
  wt.created_at,
  coalesce(wt.last_event_at, wt.updated_at) as observed_at,
  case when wt.status = 'APPROVED' then coalesce(wt.last_event_at, wt.updated_at) end as paid_at,
  null::text as payment_url
from public.wompi_transactions wt

union all

select
  'courses'::text,
  'course:' || co.id::text || ':' || coalesce(cpt.provider_id, 'intent'),
  co.reference,
  cpt.provider_id,
  nullif(co.contact ->> 'studentName', ''),
  co.purchaser_email,
  coalesce(nullif(co.contact ->> 'studentWhatsapp', ''), nullif(co.contact ->> 'whatsapp', '')),
  concat('Clases · ', co.classes, ' clases / ', co.sessions, ' sesiones'),
  co.amount_in_cents,
  co.currency,
  coalesce(cpt.status, 'CREATED'),
  null::text,
  co.environment,
  co.created_at,
  coalesce(cpt.observed_at, co.created_at),
  case when cpt.status = 'APPROVED' then cpt.observed_at end,
  null::text
from public.course_orders co
left join public.course_payment_transactions cpt on cpt.order_id = co.id

union all

select
  'xpress'::text,
  'xpress:' || xo.id::text || ':' || coalesce(xpt.provider_id, 'intent'),
  xo.reference,
  xpt.provider_id,
  null::text,
  xo.purchaser_email,
  null::text,
  concat_ws(' · ', 'Xpress', xo.exam_slug, xo.offer_id, xo.order_kind),
  xo.amount_in_cents,
  xo.currency,
  coalesce(xpt.status, 'CREATED'),
  null::text,
  xo.environment,
  xo.created_at,
  coalesce(xpt.observed_at, xo.created_at),
  case when xpt.status = 'APPROVED' then xpt.observed_at end,
  null::text
from public.xpress_orders xo
left join public.xpress_payment_transactions xpt on xpt.order_id = xo.id

union all

select
  'icfes'::text,
  'icfes:' || ipo.id::text,
  ipo.reference,
  ipo.wompi_transaction_id,
  null::text,
  null::text,
  null::text,
  'Informe ICFES'::text,
  ipo.amount_in_cents,
  ipo.currency,
  ipo.status,
  null::text,
  ipo.environment,
  ipo.created_at,
  ipo.updated_at,
  ipo.paid_at,
  null::text
from public.icfes_pass_orders ipo

union all

select
  'custom_link'::text,
  'custom:' || apl.id::text || ':' || coalesce(aplt.provider_id, 'intent'),
  'WOMPI-LINK-' || coalesce(apl.wompi_payment_link_id, apl.id::text),
  aplt.provider_id,
  apl.customer_name,
  apl.customer_email,
  apl.customer_phone,
  apl.title,
  apl.amount_in_cents,
  apl.currency,
  coalesce(
    aplt.status,
    case apl.status
      when 'PAID' then 'APPROVED'
      when 'VOIDED' then 'VOIDED'
      when 'CANCELLED' then 'VOIDED'
      when 'ERROR' then 'ERROR'
      when 'EXPIRED' then 'EXPIRED'
      else 'CREATED'
    end
  ),
  aplt.payment_method_type,
  apl.environment,
  apl.created_at,
  coalesce(aplt.observed_at, apl.updated_at),
  case when aplt.status = 'APPROVED' then aplt.observed_at else apl.paid_at end,
  apl.payment_url
from public.admin_payment_links apl
left join public.admin_payment_link_transactions aplt on aplt.link_id = apl.id;

revoke all on public.admin_payment_ledger from public, anon, authenticated, service_role;
grant select on public.admin_payment_ledger to service_role;

comment on table public.admin_payment_links is
  'Server-only register of fixed-amount, single-use Wompi payment links created by administrators.';
comment on view public.admin_payment_ledger is
  'Server-only normalized finance projection across verified Wompi payment sources.';
