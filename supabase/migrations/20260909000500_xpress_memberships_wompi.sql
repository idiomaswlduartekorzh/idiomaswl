-- Private, append-first ledger for 30-day Xpress exam memberships.
create table public.xpress_orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  purchaser_email text not null check (purchaser_email=lower(purchaser_email) and length(purchaser_email) between 5 and 254),
  idempotency_key uuid not null,
  environment text not null check (environment in ('sandbox','production')),
  reference text not null unique check (reference ~ '^WX-[0-9a-f-]{36}$'),
  offer_version text not null,
  offer_id text not null check (offer_id in ('exam-auto','exam-teacher')),
  exam_slug text not null check (exam_slug in ('ielts','toefl','sat','icfes','cambridge-b2','goethe','delf-dalf','cils-celi','topik','celpe-bras')),
  order_kind text not null check (order_kind in ('new','upgrade')),
  credit_in_cents bigint not null default 0 check (credit_in_cents >= 0),
  amount_in_cents bigint not null check (amount_in_cents > 0),
  currency text not null default 'COP' check (currency='COP'),
  coverage_ends_at timestamptz,
  terms_version text not null,
  privacy_version text not null,
  legal_snapshot jsonb not null,
  accepted_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default now() + interval '20 minutes',
  unique(user_id, environment, idempotency_key),
  check (expires_at > created_at),
  check (
    offer_version <> 'xpress-2026-09-08-v2'
    or (
      order_kind='new' and credit_in_cents=0 and coverage_ends_at is null
      and ((offer_id='exam-auto' and amount_in_cents=4900000) or (offer_id='exam-teacher' and amount_in_cents=9900000))
    )
    or (
      order_kind='upgrade' and offer_id='exam-teacher' and credit_in_cents=4900000
      and amount_in_cents=5000000 and coverage_ends_at>expires_at
    )
  )
);

create index xpress_orders_user_date on public.xpress_orders(user_id, created_at desc);
create index xpress_orders_reference_environment on public.xpress_orders(reference, environment);

create table public.xpress_payment_transactions (
  environment text not null,
  provider_id text not null check (length(provider_id) between 6 and 120),
  order_id uuid not null references public.xpress_orders(id),
  status text not null check (status in ('PENDING','APPROVED','DECLINED','ERROR','VOIDED')),
  observed_at timestamptz not null,
  primary key(environment, provider_id)
);

create index xpress_payment_transactions_order on public.xpress_payment_transactions(order_id);

create table public.xpress_payment_events (
  fingerprint text primary key,
  order_id uuid not null references public.xpress_orders(id),
  provider_id text not null,
  environment text not null,
  status text not null check (status in ('PENDING','APPROVED','DECLINED','ERROR','VOIDED')),
  observed_at timestamptz not null,
  received_at timestamptz not null default now()
);

create index xpress_payment_events_order on public.xpress_payment_events(order_id, received_at desc);

create table public.xpress_memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  source_order_id uuid not null unique references public.xpress_orders(id),
  credited_provider_id text not null,
  environment text not null check (environment in ('sandbox','production')),
  exam_slug text not null,
  offer_id text not null check (offer_id in ('exam-auto','exam-teacher')),
  grant_kind text not null check (grant_kind in ('new','upgrade')),
  status text not null default 'active' check (status in ('active','expired','revoked')),
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  revoked_at timestamptz,
  created_at timestamptz not null default now(),
  check (ends_at > starts_at)
);

create index xpress_memberships_active_user
  on public.xpress_memberships(user_id, environment, ends_at desc)
  where status='active';

create table public.xpress_fulfillment_jobs (
  order_id uuid not null references public.xpress_orders(id),
  kind text not null check (kind in ('student_receipt','owner_notification','financial_review')),
  status text not null default 'pending' check (status in ('pending','processing','completed','failed')),
  lease_id uuid,
  attempts integer not null default 0 check (attempts >= 0),
  last_error text,
  next_attempt_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz,
  primary key(order_id, kind)
);

create index xpress_fulfillment_jobs_due
  on public.xpress_fulfillment_jobs(next_attempt_at)
  where status in ('pending','failed');

create table public.xpress_payment_reconciliation_queue (
  environment text not null check (environment in ('sandbox','production')),
  provider_id text not null check (length(provider_id) between 6 and 120),
  order_id uuid not null references public.xpress_orders(id),
  status text not null default 'pending' check (status in ('pending','completed','failed')),
  attempts integer not null default 0 check (attempts >= 0),
  last_error text,
  next_attempt_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz,
  primary key(environment, provider_id)
);

create index xpress_payment_reconciliation_due
  on public.xpress_payment_reconciliation_queue(next_attempt_at)
  where status in ('pending','failed');

create table public.xpress_teacher_reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  membership_id uuid not null references public.xpress_memberships(id),
  submission_id uuid references public.exam_submissions(id),
  status text not null default 'pending' check (status in ('pending','in_review','completed','cancelled')),
  requested_at timestamptz not null default now(),
  due_at timestamptz not null default now() + interval '24 hours',
  assigned_to uuid references auth.users(id),
  completed_at timestamptz,
  check (due_at > requested_at)
);

create unique index xpress_teacher_reviews_one_pending
  on public.xpress_teacher_reviews(user_id)
  where status in ('pending','in_review');
create index xpress_teacher_reviews_due
  on public.xpress_teacher_reviews(due_at)
  where status in ('pending','in_review');

alter table public.xpress_orders enable row level security;
alter table public.xpress_payment_transactions enable row level security;
alter table public.xpress_payment_events enable row level security;
alter table public.xpress_memberships enable row level security;
alter table public.xpress_fulfillment_jobs enable row level security;
alter table public.xpress_payment_reconciliation_queue enable row level security;
alter table public.xpress_teacher_reviews enable row level security;

revoke all on public.xpress_orders, public.xpress_payment_transactions, public.xpress_payment_events,
  public.xpress_memberships, public.xpress_fulfillment_jobs, public.xpress_payment_reconciliation_queue,
  public.xpress_teacher_reviews from public, anon, authenticated, service_role;
grant select, insert on public.xpress_orders, public.xpress_payment_events, public.xpress_memberships,
  public.xpress_fulfillment_jobs, public.xpress_payment_reconciliation_queue, public.xpress_teacher_reviews to service_role;
grant select, insert, update on public.xpress_payment_transactions to service_role;
grant update(status, revoked_at) on public.xpress_memberships to service_role;
grant update(status, lease_id, attempts, last_error, next_attempt_at, updated_at, completed_at)
  on public.xpress_fulfillment_jobs to service_role;
grant update(status, attempts, last_error, next_attempt_at, updated_at, completed_at)
  on public.xpress_payment_reconciliation_queue to service_role;
grant update(status, assigned_to, completed_at) on public.xpress_teacher_reviews to service_role;

create function public.prepare_xpress_order(
  p_user uuid, p_email text, p_key uuid, p_environment text, p_offer_version text,
  p_offer text, p_exam text, p_kind text, p_credit bigint, p_amount bigint,
  p_coverage_ends timestamptz, p_terms text, p_privacy text, p_legal jsonb
)
returns public.xpress_orders language plpgsql security invoker set search_path='' as $$
declare result public.xpress_orders; open_order public.xpress_orders; new_id uuid;
begin
  if p_user is null or p_email is null or p_email<>lower(p_email) then raise exception 'invalid_order_identity'; end if;
  if p_offer_version<>'xpress-2026-09-08-v2' or p_terms<>'xpress-20260908-v1' or p_privacy<>'xpress-privacy-20260908-v1' then raise exception 'invalid_offer_version'; end if;
  if p_exam not in ('ielts','toefl','sat','icfes','cambridge-b2','goethe','delf-dalf','cils-celi','topik','celpe-bras') then raise exception 'invalid_exam'; end if;
  if not (
    p_kind='new' and p_credit=0 and p_coverage_ends is null
      and ((p_offer='exam-auto' and p_amount=4900000) or (p_offer='exam-teacher' and p_amount=9900000))
    or p_kind='upgrade' and p_offer='exam-teacher' and p_credit=4900000 and p_amount=5000000
      and p_coverage_ends>now()+interval '20 minutes'
  ) then raise exception 'invalid_quote'; end if;

  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_user::text, 9));
  select * into result from public.xpress_orders
    where user_id=p_user and environment=p_environment and idempotency_key=p_key;
  if found then
    if result.offer_version<>p_offer_version or result.offer_id<>p_offer or result.exam_slug<>p_exam
      or result.order_kind<>p_kind or result.credit_in_cents<>p_credit or result.amount_in_cents<>p_amount
      or result.coverage_ends_at is distinct from p_coverage_ends or result.terms_version<>p_terms
      or result.privacy_version<>p_privacy or result.legal_snapshot<>p_legal
    then raise exception 'idempotency_conflict'; end if;
    return result;
  end if;

  select xo.* into open_order from public.xpress_orders xo
    where xo.user_id=p_user and xo.environment=p_environment and xo.expires_at>now()
      and not exists (
        select 1 from public.xpress_payment_transactions pt
        where pt.order_id=xo.id and pt.status in ('APPROVED','DECLINED','ERROR','VOIDED')
      )
    order by xo.created_at desc limit 1;
  if found then raise exception 'xpress_order_pending'; end if;
  if (select count(*) from public.xpress_orders where user_id=p_user and created_at>now()-interval '1 hour')>=6 then raise exception 'order_rate_limit'; end if;

  new_id:=gen_random_uuid();
  insert into public.xpress_orders(
    id,user_id,purchaser_email,idempotency_key,environment,reference,offer_version,offer_id,exam_slug,
    order_kind,credit_in_cents,amount_in_cents,coverage_ends_at,terms_version,privacy_version,legal_snapshot
  ) values(
    new_id,p_user,p_email,p_key,p_environment,'WX-'||new_id::text,p_offer_version,p_offer,p_exam,
    p_kind,p_credit,p_amount,p_coverage_ends,p_terms,p_privacy,p_legal
  ) returning * into result;
  return result;
end $$;

revoke all on function public.prepare_xpress_order(uuid,text,uuid,text,text,text,text,text,bigint,bigint,timestamptz,text,text,jsonb)
  from public, anon, authenticated;
grant execute on function public.prepare_xpress_order(uuid,text,uuid,text,text,text,text,text,bigint,bigint,timestamptz,text,text,jsonb)
  to service_role;

create function public.record_xpress_payment(
  p_reference text, p_environment text, p_provider_id text, p_amount bigint,
  p_currency text, p_status text, p_observed timestamptz, p_fingerprint text
)
returns uuid language plpgsql security invoker set search_path='' as $$
declare
  selected_order public.xpress_orders;
  prior public.xpress_payment_transactions;
  approved_count integer;
  approved_provider text;
  approved_at timestamptz;
  membership_end timestamptz;
begin
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_reference, 10));
  select * into selected_order from public.xpress_orders where reference=p_reference;
  if not found then raise exception 'unknown_order'; end if;
  if selected_order.environment<>p_environment or selected_order.amount_in_cents<>p_amount or selected_order.currency<>p_currency then raise exception 'payment_mismatch'; end if;
  if p_status not in ('PENDING','APPROVED','DECLINED','ERROR','VOIDED') or p_provider_id is null
    or length(p_provider_id) not between 6 and 120 or p_observed is null or p_fingerprint is null
  then raise exception 'invalid_payment'; end if;

  select * into prior from public.xpress_payment_transactions
    where environment=p_environment and provider_id=p_provider_id;
  if found and prior.order_id<>selected_order.id then raise exception 'transaction_order_mismatch'; end if;

  insert into public.xpress_payment_events(fingerprint,order_id,provider_id,environment,status,observed_at)
    values(p_fingerprint,selected_order.id,p_provider_id,p_environment,p_status,p_observed)
    on conflict do nothing;
  insert into public.xpress_payment_transactions(environment,provider_id,order_id,status,observed_at)
    values(p_environment,p_provider_id,selected_order.id,p_status,p_observed)
    on conflict(environment,provider_id) do update set status=excluded.status,observed_at=excluded.observed_at
    where public.xpress_payment_transactions.observed_at<=excluded.observed_at
      and not (public.xpress_payment_transactions.status in ('APPROVED','VOIDED') and excluded.status in ('PENDING','DECLINED','ERROR'))
      and not (public.xpress_payment_transactions.status='VOIDED' and excluded.status='APPROVED');

  select count(*) into approved_count from public.xpress_payment_transactions
    where order_id=selected_order.id and status='APPROVED';
  if approved_count>0 then
    select provider_id,observed_at into approved_provider,approved_at
      from public.xpress_payment_transactions where order_id=selected_order.id and status='APPROVED'
      order by observed_at,provider_id limit 1;
    membership_end:=case when selected_order.order_kind='upgrade' then selected_order.coverage_ends_at else approved_at+interval '30 days' end;
    insert into public.xpress_memberships(
      user_id,source_order_id,credited_provider_id,environment,exam_slug,offer_id,grant_kind,starts_at,ends_at
    ) values(
      selected_order.user_id,selected_order.id,approved_provider,selected_order.environment,selected_order.exam_slug,
      selected_order.offer_id,selected_order.order_kind,approved_at,membership_end
    ) on conflict(source_order_id) do nothing;
    insert into public.xpress_fulfillment_jobs(order_id,kind) values(selected_order.id,'student_receipt') on conflict do nothing;
    insert into public.xpress_fulfillment_jobs(order_id,kind) values(selected_order.id,'owner_notification') on conflict do nothing;
  else
    update public.xpress_memberships set status='revoked',revoked_at=now()
      where source_order_id=selected_order.id and status='active';
  end if;
  if approved_count>1 or p_status='VOIDED' then
    insert into public.xpress_fulfillment_jobs(order_id,kind) values(selected_order.id,'financial_review') on conflict do nothing;
  end if;
  return selected_order.id;
end $$;

revoke all on function public.record_xpress_payment(text,text,text,bigint,text,text,timestamptz,text)
  from public, anon, authenticated;
grant execute on function public.record_xpress_payment(text,text,text,bigint,text,text,timestamptz,text)
  to service_role;

create function public.queue_xpress_payment_reconciliation(p_reference text,p_environment text,p_provider_id text)
returns uuid language plpgsql security invoker set search_path='' as $$
declare selected_order public.xpress_orders; stored_order uuid;
begin
  if p_provider_id is null or length(p_provider_id) not between 6 and 120 then raise exception 'invalid_transaction'; end if;
  select * into selected_order from public.xpress_orders where reference=p_reference and environment=p_environment;
  if not found then return null; end if;
  insert into public.xpress_payment_reconciliation_queue(environment,provider_id,order_id)
    values(p_environment,p_provider_id,selected_order.id) on conflict(environment,provider_id) do nothing;
  select order_id into stored_order from public.xpress_payment_reconciliation_queue
    where environment=p_environment and provider_id=p_provider_id;
  if stored_order<>selected_order.id then raise exception 'transaction_order_mismatch'; end if;
  return selected_order.id;
end $$;

revoke all on function public.queue_xpress_payment_reconciliation(text,text,text) from public, anon, authenticated;
grant execute on function public.queue_xpress_payment_reconciliation(text,text,text) to service_role;

create function public.finish_xpress_payment_reconciliation(
  p_environment text,p_provider_id text,p_success boolean,p_error text default null
)
returns boolean language plpgsql security invoker set search_path='' as $$
declare finished integer;
begin
  update public.xpress_payment_reconciliation_queue
    set status=case when p_success then 'completed' else 'failed' end,
        attempts=attempts+1,
        last_error=case when p_success then null else left(coalesce(p_error,'failed'),300) end,
        next_attempt_at=case when p_success then next_attempt_at else now()+least(interval '6 hours',interval '5 minutes'*power(2,least(attempts,6))) end,
        updated_at=now(),completed_at=case when p_success then now() else null end
    where environment=p_environment and provider_id=p_provider_id and status<>'completed';
  get diagnostics finished=row_count;
  return finished=1;
end $$;

revoke all on function public.finish_xpress_payment_reconciliation(text,text,boolean,text) from public, anon, authenticated;
grant execute on function public.finish_xpress_payment_reconciliation(text,text,boolean,text) to service_role;

create function public.claim_xpress_job(p_order uuid,p_kind text,p_lease uuid)
returns boolean language plpgsql security invoker set search_path='' as $$
declare claimed integer;
begin
  update public.xpress_fulfillment_jobs
    set status='processing',lease_id=p_lease,attempts=attempts+1,updated_at=now(),last_error=null
    where order_id=p_order and kind=p_kind
      and ((status in ('pending','failed') and next_attempt_at<=now()) or (status='processing' and updated_at<now()-interval '5 minutes'));
  get diagnostics claimed=row_count;
  return claimed=1;
end $$;

revoke all on function public.claim_xpress_job(uuid,text,uuid) from public, anon, authenticated;
grant execute on function public.claim_xpress_job(uuid,text,uuid) to service_role;

create function public.finish_xpress_job(p_order uuid,p_kind text,p_lease uuid,p_success boolean,p_error text default null)
returns boolean language plpgsql security invoker set search_path='' as $$
declare finished integer;
begin
  update public.xpress_fulfillment_jobs
    set status=case when p_success then 'completed' else 'failed' end,
        completed_at=case when p_success then now() else null end,
        next_attempt_at=case when p_success then next_attempt_at else now()+least(interval '1 hour',interval '1 minute'*power(2,least(attempts,6))) end,
        last_error=case when p_success then null else left(coalesce(p_error,'failed'),300) end,
        lease_id=null,updated_at=now()
    where order_id=p_order and kind=p_kind and status='processing' and lease_id=p_lease;
  get diagnostics finished=row_count;
  return finished=1;
end $$;

revoke all on function public.finish_xpress_job(uuid,text,uuid,boolean,text) from public, anon, authenticated;
grant execute on function public.finish_xpress_job(uuid,text,uuid,boolean,text) to service_role;

comment on table public.xpress_orders is 'Immutable purchase intents for one 30-day exam membership or same-period upgrade.';
comment on table public.xpress_memberships is 'Access grants created only from Wompi payments verified by the server.';
comment on table public.xpress_teacher_reviews is 'One-at-a-time teacher review queue with the promised 24-hour deadline.';
