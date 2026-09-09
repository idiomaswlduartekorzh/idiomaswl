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

create table public.xpress_teacher_reviewers (
  reviewer_id uuid primary key references auth.users(id),
  status text not null default 'paused' check (status in ('active','paused')),
  rubric_version text not null check (rubric_version='icfes-teacher-rubric-2026-09-09-v1'),
  productive_minutes_per_day integer not null check (productive_minutes_per_day between 30 and 480),
  p75_review_minutes integer not null check (p75_review_minutes between 5 and 240),
  calibrated_at timestamptz not null,
  calibration_expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (calibration_expires_at>calibrated_at)
);

create table public.xpress_teacher_capacity_reservations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  environment text not null check (environment in ('sandbox','production')),
  idempotency_key uuid not null,
  exam_slug text not null check (exam_slug='icfes'),
  offer_id text not null check (offer_id='exam-teacher'),
  rubric_version text not null check (rubric_version='icfes-teacher-rubric-2026-09-09-v1'),
  addendum_version text not null check (addendum_version='icfes-teacher-addendum-2026-09-09-v1'),
  status text not null default 'held' check (status in ('held','order_linked','consumed','released','expired')),
  held_at timestamptz not null default now(),
  expires_at timestamptz not null default now()+interval '20 minutes',
  order_id uuid unique references public.xpress_orders(id),
  membership_id uuid unique references public.xpress_memberships(id),
  consumed_at timestamptz,
  unique(user_id,environment,idempotency_key),
  check (expires_at>held_at),
  check ((status='consumed')=(membership_id is not null and consumed_at is not null))
);

create index xpress_teacher_capacity_reservations_live
  on public.xpress_teacher_capacity_reservations(environment,expires_at)
  where status in ('held','order_linked');

create table public.xpress_teacher_reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  environment text not null check (environment in ('sandbox','production')),
  membership_id uuid not null unique references public.xpress_memberships(id),
  submission_id uuid references public.exam_submissions(id),
  icfes_attempt_id uuid unique references public.icfes_attempts(id),
  idempotency_key uuid not null,
  rubric_version text not null check (rubric_version='icfes-teacher-rubric-2026-09-09-v1'),
  rubric_snapshot jsonb not null,
  status text not null default 'queued' check (status in ('queued','in_review','needs_qa','completed','cancelled','failed')),
  requested_at timestamptz not null default now(),
  due_at timestamptz not null default now() + interval '24 hours',
  assigned_to uuid references auth.users(id),
  lease_id uuid,
  lease_expires_at timestamptz,
  attempts integer not null default 0 check (attempts>=0),
  last_error text,
  updated_at timestamptz not null default now(),
  completed_at timestamptz,
  unique(user_id,environment,idempotency_key),
  check ((submission_id is null)<>(icfes_attempt_id is null)),
  check (due_at=requested_at+interval '24 hours'),
  check ((status='in_review')=(lease_id is not null and lease_expires_at is not null))
);

create unique index xpress_teacher_reviews_one_active
  on public.xpress_teacher_reviews(user_id)
  where status in ('queued','in_review','needs_qa','failed');
create index xpress_teacher_reviews_due
  on public.xpress_teacher_reviews(due_at)
  where status in ('queued','in_review','needs_qa','failed');

-- This is the only ICFES teacher-facing projection. It follows the real Xpress
-- queue and the secure ICFES attempt, excluding learner identity and contact data.
create view public.xpress_teacher_review_payloads
with (security_invoker = true)
as
select
  review.id as review_id,
  review.assigned_to as assigned_reviewer_id,
  encode(extensions.digest(attempt.id::text, 'sha256'), 'hex') as review_subject_ref,
  'icfes'::text as exam_slug,
  attempt.exam_id,
  attempt.basic_result,
  attempt.answers as objective_answers,
  review.rubric_version,
  review.requested_at,
  review.due_at
from public.xpress_teacher_reviews review
join public.icfes_attempts attempt
  on attempt.id=review.icfes_attempt_id and attempt.user_id=review.user_id
where review.status='in_review'
  and review.assigned_to is not null
  and review.lease_id is not null
  and review.lease_expires_at>now();

create function public.get_xpress_teacher_review_payload(
  p_review uuid,p_reviewer uuid,p_lease uuid
)
returns setof public.xpress_teacher_review_payloads
language sql
stable
security invoker
set search_path=''
as $$
  select payload.*
  from public.xpress_teacher_review_payloads payload
  join public.xpress_teacher_reviews review on review.id=payload.review_id
  where payload.review_id=p_review
    and review.assigned_to=p_reviewer
    and review.lease_id=p_lease
    and review.status='in_review'
    and review.lease_expires_at>now()
    and exists(
      select 1 from public.xpress_teacher_reviewers reviewer
      where reviewer.reviewer_id=p_reviewer and reviewer.status='active'
        and reviewer.rubric_version=payload.rubric_version
        and reviewer.calibrated_at<=now() and reviewer.calibration_expires_at>now()
    )
$$;

create table public.xpress_teacher_review_alerts (
  review_id uuid not null references public.xpress_teacher_reviews(id),
  threshold_hours integer not null check (threshold_hours in (12,18,22)),
  created_at timestamptz not null default now(),
  primary key(review_id,threshold_hours)
);

alter table public.xpress_orders enable row level security;
alter table public.xpress_payment_transactions enable row level security;
alter table public.xpress_payment_events enable row level security;
alter table public.xpress_memberships enable row level security;
alter table public.xpress_fulfillment_jobs enable row level security;
alter table public.xpress_payment_reconciliation_queue enable row level security;
alter table public.xpress_teacher_reviewers enable row level security;
alter table public.xpress_teacher_capacity_reservations enable row level security;
alter table public.xpress_teacher_reviews enable row level security;
alter table public.xpress_teacher_review_alerts enable row level security;

revoke all on public.xpress_orders, public.xpress_payment_transactions, public.xpress_payment_events,
  public.xpress_memberships, public.xpress_fulfillment_jobs, public.xpress_payment_reconciliation_queue,
  public.xpress_teacher_reviewers, public.xpress_teacher_capacity_reservations,
  public.xpress_teacher_reviews, public.xpress_teacher_review_alerts,
  public.xpress_teacher_review_payloads
  from public, anon, authenticated, service_role;
revoke all on function public.get_xpress_teacher_review_payload(uuid,uuid,uuid)
  from public, anon, authenticated, service_role;
grant select, insert on public.xpress_orders, public.xpress_payment_events, public.xpress_memberships,
  public.xpress_fulfillment_jobs, public.xpress_payment_reconciliation_queue to service_role;
grant select, insert, update on public.xpress_payment_transactions to service_role;
grant update(status, revoked_at) on public.xpress_memberships to service_role;
grant update(status, lease_id, attempts, last_error, next_attempt_at, updated_at, completed_at)
  on public.xpress_fulfillment_jobs to service_role;
grant update(status, attempts, last_error, next_attempt_at, updated_at, completed_at)
  on public.xpress_payment_reconciliation_queue to service_role;
grant select, insert, update on public.xpress_teacher_reviewers to service_role;
grant select, insert, update on public.xpress_teacher_capacity_reservations to service_role;
grant select, insert, update on public.xpress_teacher_reviews to service_role;
grant select, insert on public.xpress_teacher_review_alerts to service_role;
grant select on public.xpress_teacher_review_payloads to service_role;
grant execute on function public.get_xpress_teacher_review_payload(uuid,uuid,uuid) to service_role;

create function public.xpress_teacher_capacity_status(p_environment text)
returns table(
  can_reserve boolean,
  stop_reasons text[],
  calibrated_reviewers integer,
  raw_daily_slots integer,
  sellable_daily_slots integer,
  held_reservations integer,
  outstanding_credits integer,
  projected_utilization_percent numeric,
  oldest_queued_hours numeric,
  rolling_p95_hours numeric,
  has_open_sla_breach boolean
) language plpgsql security invoker set search_path='' as $$
declare projected integer;
begin
  if p_environment not in ('sandbox','production') then raise exception 'invalid_environment'; end if;
  select count(*)::integer,
         coalesce(sum(floor(productive_minutes_per_day::numeric/p75_review_minutes)),0)::integer
    into calibrated_reviewers,raw_daily_slots
    from public.xpress_teacher_reviewers
    where status='active' and rubric_version='icfes-teacher-rubric-2026-09-09-v1'
      and calibrated_at<=now() and calibration_expires_at>now();
  sellable_daily_slots:=floor(raw_daily_slots*0.80)::integer;
  select count(*)::integer into held_reservations
    from public.xpress_teacher_capacity_reservations
    where environment=p_environment and status in ('held','order_linked') and expires_at>now();
  select count(*)::integer into outstanding_credits
    from public.xpress_memberships membership
    where membership.environment=p_environment and membership.exam_slug='icfes'
      and membership.offer_id='exam-teacher' and membership.status='active' and membership.ends_at>now()
      and not exists (
        select 1 from public.xpress_teacher_reviews review where review.membership_id=membership.id
      );
  select extract(epoch from (now()-min(requested_at)))/3600 into oldest_queued_hours
    from public.xpress_teacher_reviews
    where environment=p_environment and status in ('queued','in_review','needs_qa','failed');
  select percentile_cont(0.95) within group (
      order by extract(epoch from (completed_at-requested_at))/3600
    ) into rolling_p95_hours
    from public.xpress_teacher_reviews
    where environment=p_environment and status='completed' and completed_at>now()-interval '7 days';
  select exists(
    select 1 from public.xpress_teacher_reviews
    where environment=p_environment and status in ('queued','in_review','needs_qa','failed') and due_at<=now()
  ) into has_open_sla_breach;

  projected:=held_reservations+outstanding_credits+1;
  projected_utilization_percent:=case when raw_daily_slots>0 then projected::numeric*100/raw_daily_slots else null end;
  stop_reasons:=array_remove(array[
    case when calibrated_reviewers<1 then 'no-calibrated-reviewer' end,
    case when raw_daily_slots<1 or sellable_daily_slots<1 then 'capacity-not-finite' end,
    case when raw_daily_slots<1 or projected_utilization_percent>80 then 'capacity-utilization-red' end,
    case when oldest_queued_hours>=18 then 'oldest-queue-red' end,
    case when rolling_p95_hours>20 then 'rolling-p95-red' end,
    case when has_open_sla_breach then 'open-sla-breach' end
  ]::text[],null);
  can_reserve:=cardinality(stop_reasons)=0 and projected<=sellable_daily_slots;
  if not can_reserve and cardinality(stop_reasons)=0 then
    stop_reasons:=array['capacity-utilization-red']::text[];
  end if;
  return next;
end $$;

revoke all on function public.xpress_teacher_capacity_status(text) from public, anon, authenticated;
grant execute on function public.xpress_teacher_capacity_status(text) to service_role;

create function public.reserve_xpress_teacher_capacity(
  p_user uuid,p_environment text,p_key uuid,p_rubric text,p_addendum text
)
returns public.xpress_teacher_capacity_reservations
language plpgsql security invoker set search_path='' as $$
declare
  existing public.xpress_teacher_capacity_reservations;
  capacity record;
  result public.xpress_teacher_capacity_reservations;
begin
  if p_user is null or p_key is null or p_environment not in ('sandbox','production')
    or p_rubric<>'icfes-teacher-rubric-2026-09-09-v1'
    or p_addendum<>'icfes-teacher-addendum-2026-09-09-v1'
  then raise exception 'invalid_teacher_capacity_request'; end if;

  -- One environment-wide lock makes the read/capacity/write sequence atomic across buyers.
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended('icfes-teacher-capacity:'||p_environment, 11));
  update public.xpress_teacher_capacity_reservations set status='expired'
    where environment=p_environment and status='held' and expires_at<=now();
  select * into existing from public.xpress_teacher_capacity_reservations
    where user_id=p_user and environment=p_environment and idempotency_key=p_key;
  if found then
    if existing.rubric_version<>p_rubric or existing.addendum_version<>p_addendum
    then raise exception 'teacher_capacity_idempotency_conflict'; end if;
    if existing.status in ('expired','released') or existing.expires_at<=now()
    then raise exception 'teacher_capacity_reservation_expired'; end if;
    return existing;
  end if;

  select * into capacity from public.xpress_teacher_capacity_status(p_environment);
  if not capacity.can_reserve then
    raise exception 'teacher_capacity_unavailable:%',array_to_string(capacity.stop_reasons,',');
  end if;
  insert into public.xpress_teacher_capacity_reservations(
    user_id,environment,idempotency_key,exam_slug,offer_id,rubric_version,addendum_version
  ) values(
    p_user,p_environment,p_key,'icfes','exam-teacher',p_rubric,p_addendum
  ) returning * into result;
  return result;
end $$;

revoke all on function public.reserve_xpress_teacher_capacity(uuid,text,uuid,text,text)
  from public, anon, authenticated;
grant execute on function public.reserve_xpress_teacher_capacity(uuid,text,uuid,text,text)
  to service_role;

create function public.prepare_xpress_order(
  p_user uuid, p_email text, p_key uuid, p_environment text, p_offer_version text,
  p_offer text, p_exam text, p_kind text, p_credit bigint, p_amount bigint,
  p_coverage_ends timestamptz, p_terms text, p_privacy text, p_legal jsonb
)
returns public.xpress_orders language plpgsql security invoker set search_path='' as $$
declare result public.xpress_orders; open_order public.xpress_orders; new_id uuid; teacher_reservation uuid;
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

  if p_exam='icfes' and p_offer='exam-teacher' then
    select id into teacher_reservation from public.xpress_teacher_capacity_reservations
      where user_id=p_user and environment=p_environment and idempotency_key=p_key
        and exam_slug='icfes' and offer_id='exam-teacher' and status='held' and expires_at>now()
      for update;
    if not found then raise exception 'teacher_capacity_not_reserved'; end if;
  end if;

  new_id:=gen_random_uuid();
  insert into public.xpress_orders(
    id,user_id,purchaser_email,idempotency_key,environment,reference,offer_version,offer_id,exam_slug,
    order_kind,credit_in_cents,amount_in_cents,coverage_ends_at,terms_version,privacy_version,legal_snapshot
  ) values(
    new_id,p_user,p_email,p_key,p_environment,'WX-'||new_id::text,p_offer_version,p_offer,p_exam,
    p_kind,p_credit,p_amount,p_coverage_ends,p_terms,p_privacy,p_legal
  ) returning * into result;
  if teacher_reservation is not null then
    update public.xpress_teacher_capacity_reservations
      set status='order_linked',order_id=new_id,expires_at=result.expires_at+interval '15 minutes'
      where id=teacher_reservation;
  end if;
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
  selected_membership_id uuid;
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
    if selected_order.exam_slug='icfes' and selected_order.offer_id='exam-teacher' and not exists(
      select 1 from public.xpress_teacher_capacity_reservations
      where order_id=selected_order.id and status in ('order_linked','consumed')
        and expires_at>=approved_at
    ) then raise exception 'teacher_capacity_reservation_expired'; end if;
    membership_end:=case when selected_order.order_kind='upgrade' then selected_order.coverage_ends_at else approved_at+interval '30 days' end;
    insert into public.xpress_memberships(
      user_id,source_order_id,credited_provider_id,environment,exam_slug,offer_id,grant_kind,starts_at,ends_at
    ) values(
      selected_order.user_id,selected_order.id,approved_provider,selected_order.environment,selected_order.exam_slug,
      selected_order.offer_id,selected_order.order_kind,approved_at,membership_end
    ) on conflict(source_order_id) do nothing;
    select id into selected_membership_id from public.xpress_memberships where source_order_id=selected_order.id;
    update public.xpress_teacher_capacity_reservations
      set status='consumed',membership_id=selected_membership_id,consumed_at=coalesce(consumed_at,approved_at)
      where order_id=selected_order.id and status in ('order_linked','consumed');
    insert into public.xpress_fulfillment_jobs(order_id,kind) values(selected_order.id,'student_receipt') on conflict do nothing;
    insert into public.xpress_fulfillment_jobs(order_id,kind) values(selected_order.id,'owner_notification') on conflict do nothing;
  else
    update public.xpress_memberships set status='revoked',revoked_at=now()
      where source_order_id=selected_order.id and status='active';
    if p_status in ('DECLINED','ERROR','VOIDED') then
      update public.xpress_teacher_capacity_reservations
        set status='released'
        where order_id=selected_order.id and status='order_linked';
    end if;
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

create function public.request_xpress_teacher_review(
  p_user uuid,p_membership uuid,p_attempt uuid,p_key uuid,p_rubric text,p_snapshot jsonb
)
returns public.xpress_teacher_reviews language plpgsql security invoker set search_path='' as $$
declare
  membership public.xpress_memberships;
  existing public.xpress_teacher_reviews;
  result public.xpress_teacher_reviews;
begin
  if p_user is null or p_membership is null or p_attempt is null or p_key is null
    or p_rubric<>'icfes-teacher-rubric-2026-09-09-v1'
    or jsonb_typeof(p_snapshot)<>'object' or p_snapshot->>'version'<>p_rubric
  then raise exception 'invalid_teacher_review_request'; end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_membership::text, 12));

  select * into membership from public.xpress_memberships
    where id=p_membership and user_id=p_user and exam_slug='icfes' and offer_id='exam-teacher'
      and status='active' and ends_at>now();
  if not found then raise exception 'teacher_review_membership_required'; end if;
  select * into existing from public.xpress_teacher_reviews
    where user_id=p_user and environment=membership.environment and idempotency_key=p_key;
  if found then
    if existing.membership_id<>p_membership or existing.icfes_attempt_id<>p_attempt
      or existing.rubric_version<>p_rubric or existing.rubric_snapshot<>p_snapshot
    then raise exception 'teacher_review_idempotency_conflict'; end if;
    return existing;
  end if;
  if not exists(
    select 1 from public.xpress_teacher_capacity_reservations
    where membership_id=p_membership and status='consumed'
  ) then raise exception 'teacher_review_capacity_not_reserved'; end if;
  if not exists(
    select 1 from public.icfes_attempts
    where id=p_attempt and user_id=p_user
      and jsonb_typeof(answers)='object' and answers<>'{}'::jsonb
  ) then raise exception 'teacher_review_attempt_mismatch'; end if;
  if exists(select 1 from public.xpress_teacher_reviews where membership_id=p_membership)
  then raise exception 'teacher_review_credit_exhausted'; end if;

  insert into public.xpress_teacher_reviews(
    user_id,environment,membership_id,icfes_attempt_id,idempotency_key,rubric_version,rubric_snapshot
  ) values(
    p_user,membership.environment,p_membership,p_attempt,p_key,p_rubric,p_snapshot
  ) returning * into result;
  return result;
end $$;

revoke all on function public.request_xpress_teacher_review(uuid,uuid,uuid,uuid,text,jsonb)
  from public, anon, authenticated;
grant execute on function public.request_xpress_teacher_review(uuid,uuid,uuid,uuid,text,jsonb)
  to service_role;

create function public.claim_xpress_teacher_review(
  p_review uuid,p_reviewer uuid,p_lease uuid
)
returns boolean language plpgsql security invoker set search_path='' as $$
declare claimed integer;
begin
  if p_review is null or p_reviewer is null or p_lease is null then raise exception 'invalid_teacher_review_claim'; end if;
  if not exists(
    select 1 from public.xpress_teacher_reviewers
    where reviewer_id=p_reviewer and status='active'
      and rubric_version='icfes-teacher-rubric-2026-09-09-v1'
      and calibrated_at<=now() and calibration_expires_at>now()
  ) then raise exception 'teacher_reviewer_not_calibrated'; end if;
  update public.xpress_teacher_reviews
    set status='in_review',assigned_to=p_reviewer,lease_id=p_lease,
        lease_expires_at=now()+interval '15 minutes',attempts=attempts+1,
        last_error=null,updated_at=now()
    where id=p_review and rubric_version='icfes-teacher-rubric-2026-09-09-v1'
      and (status in ('queued','failed') or (status='in_review' and lease_expires_at<=now()));
  get diagnostics claimed=row_count;
  return claimed=1;
end $$;

revoke all on function public.claim_xpress_teacher_review(uuid,uuid,uuid)
  from public, anon, authenticated;
grant execute on function public.claim_xpress_teacher_review(uuid,uuid,uuid)
  to service_role;

create function public.finish_xpress_teacher_review(
  p_review uuid,p_lease uuid,p_outcome text,p_error text default null
)
returns boolean language plpgsql security invoker set search_path='' as $$
declare finished integer;
begin
  if p_outcome not in ('completed','needs_qa','failed') then raise exception 'invalid_teacher_review_outcome'; end if;
  update public.xpress_teacher_reviews
    set status=p_outcome,
        completed_at=case when p_outcome='completed' then now() else null end,
        last_error=case when p_outcome='failed' then left(coalesce(p_error,'failed'),300) else null end,
        lease_id=null,lease_expires_at=null,updated_at=now()
    where id=p_review and status='in_review' and lease_id=p_lease and lease_expires_at>now();
  get diagnostics finished=row_count;
  return finished=1;
end $$;

revoke all on function public.finish_xpress_teacher_review(uuid,uuid,text,text)
  from public, anon, authenticated;
grant execute on function public.finish_xpress_teacher_review(uuid,uuid,text,text)
  to service_role;

create function public.queue_xpress_teacher_review_alerts()
returns integer language plpgsql security invoker set search_path='' as $$
declare queued integer;
begin
  insert into public.xpress_teacher_review_alerts(review_id,threshold_hours)
    select review.id,threshold.threshold_hours
    from public.xpress_teacher_reviews review
    cross join (values(12),(18),(22)) as threshold(threshold_hours)
    where review.status in ('queued','in_review','needs_qa','failed')
      and review.requested_at+make_interval(hours=>threshold.threshold_hours)<=now()
    on conflict(review_id,threshold_hours) do nothing;
  get diagnostics queued=row_count;
  return queued;
end $$;

revoke all on function public.queue_xpress_teacher_review_alerts() from public, anon, authenticated;
grant execute on function public.queue_xpress_teacher_review_alerts() to service_role;

comment on table public.xpress_orders is 'Immutable purchase intents for one 30-day exam membership or same-period upgrade.';
comment on table public.xpress_memberships is 'Access grants created only from Wompi payments verified by the server.';
comment on table public.xpress_teacher_capacity_reservations is 'Server-only pre-checkout capacity holds for one-credit ICFES teacher memberships.';
comment on table public.xpress_teacher_reviews is 'One-credit ICFES teacher review queue with a capacity-backed 24-hour operating target.';
comment on view public.xpress_teacher_review_payloads is 'Lease-bound ICFES review projection over the real Xpress queue; learner identity and contact fields are excluded.';
