-- Recurring Xpress subscriptions. Card details remain entirely in Wompi; this ledger stores only its payment-source id.
create table public.xpress_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  purchaser_email text not null check (purchaser_email=lower(purchaser_email) and length(purchaser_email) between 5 and 254),
  idempotency_key uuid not null,
  environment text not null check (environment in ('sandbox','production')),
  offer_version text not null check (offer_version='xpress-2026-09-12-v4'),
  offer_id text not null check (offer_id in ('exam-auto','exam-teacher')),
  exam_slug text not null check (exam_slug in ('ielts','toefl','sat','icfes','cambridge-b2','goethe','delf-dalf','cils-celi','topik','celpe-bras')),
  amount_in_cents bigint not null,
  currency text not null default 'COP' check (currency='COP'),
  cadence_days smallint not null default 30 check (cadence_days=30),
  status text not null default 'creating_source' check (status in ('creating_source','pending_initial','scheduled','active','past_due','cancel_at_period_end','canceled')),
  payment_source_id text,
  payment_source_type text check (payment_source_type is null or payment_source_type='CARD'),
  payment_source_status text check (payment_source_status is null or payment_source_status in ('AVAILABLE','UNAVAILABLE')),
  initial_charge_at timestamptz not null,
  current_period_start timestamptz,
  current_period_end timestamptz,
  next_charge_at timestamptz,
  payment_failure_count smallint not null default 0 check (payment_failure_count between 0 and 3),
  last_payment_order_id uuid,
  last_payment_status text check (last_payment_status is null or last_payment_status in ('PENDING','APPROVED','DECLINED','ERROR','VOIDED')),
  last_payment_at timestamptz,
  cancel_requested_at timestamptz,
  canceled_at timestamptz,
  terms_version text not null,
  privacy_version text not null,
  recurring_consent_version text not null,
  legal_snapshot jsonb not null,
  accepted_at timestamptz not null default now(),
  lease_id uuid,
  lease_expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, environment, idempotency_key),
  unique(environment, payment_source_id),
  check (
    (offer_id='exam-auto' and amount_in_cents=4900000)
    or (offer_id='exam-teacher' and amount_in_cents=9900000)
  ),
  check ((current_period_start is null and current_period_end is null) or current_period_end>current_period_start),
  check (
    status='creating_source' and payment_source_id is null and payment_source_type is null and payment_source_status is null
    or status<>'creating_source' and payment_source_id is not null and payment_source_type='CARD' and payment_source_status is not null
  )
);

create unique index xpress_subscriptions_one_open_user
  on public.xpress_subscriptions(user_id,environment)
  where status<>'canceled';
create index xpress_subscriptions_due
  on public.xpress_subscriptions(next_charge_at)
  where status in ('pending_initial','scheduled','active','past_due');
create index xpress_subscriptions_user_date
  on public.xpress_subscriptions(user_id,created_at desc);
alter table public.xpress_orders
  add column subscription_id uuid references public.xpress_subscriptions(id),
  add column billing_period_start timestamptz,
  add column billing_period_end timestamptz,
  add column renewal_attempt smallint not null default 0 check (renewal_attempt between 0 and 3),
  add column charge_started_at timestamptz,
  add column charge_dispatch_attempts smallint not null default 0 check (charge_dispatch_attempts between 0 and 3),
  add column last_charge_error text;

alter table public.xpress_subscriptions
  add constraint xpress_subscriptions_last_order_fk
  foreign key(last_payment_order_id) references public.xpress_orders(id);

alter table public.xpress_orders
  drop constraint if exists xpress_orders_order_kind_check,
  add constraint xpress_orders_order_kind_check
    check (order_kind in ('single','new','upgrade','subscription_start','renewal')),
  drop constraint if exists xpress_orders_offer_quote_check,
  add constraint xpress_orders_offer_quote_check check (
    (
      offer_version='xpress-2026-09-08-v2'
      and subscription_id is null and billing_period_start is null and billing_period_end is null
      and (
        order_kind='new' and credit_in_cents=0 and coverage_ends_at is null
          and ((offer_id='exam-auto' and amount_in_cents=4900000) or (offer_id='exam-teacher' and amount_in_cents=9900000))
        or order_kind='upgrade' and offer_id='exam-teacher' and credit_in_cents=4900000
          and amount_in_cents=5000000 and coverage_ends_at>expires_at
      )
    )
    or (
      offer_version='xpress-2026-09-09-v3'
      and subscription_id is null and billing_period_start is null and billing_period_end is null
      and (
        order_kind='single' and offer_id='exam-single' and credit_in_cents=0
          and amount_in_cents=1200000 and coverage_ends_at is null
        or order_kind='new' and credit_in_cents=0 and coverage_ends_at is null
          and ((offer_id='exam-auto' and amount_in_cents=4900000) or (offer_id='exam-teacher' and amount_in_cents=9900000))
        or order_kind='upgrade' and offer_id='exam-teacher' and credit_in_cents=4900000
          and amount_in_cents=5000000 and coverage_ends_at>expires_at
      )
    )
    or (
      offer_version='xpress-2026-09-12-v4'
      and (
        order_kind='single' and offer_id='exam-single' and credit_in_cents=0 and amount_in_cents=1200000
          and coverage_ends_at is null and subscription_id is null and billing_period_start is null and billing_period_end is null
        or order_kind in ('subscription_start','renewal') and offer_id in ('exam-auto','exam-teacher')
          and credit_in_cents=0 and subscription_id is not null and billing_period_start is not null
          and billing_period_end=billing_period_start+interval '30 days' and coverage_ends_at=billing_period_end
          and ((offer_id='exam-auto' and amount_in_cents=4900000) or (offer_id='exam-teacher' and amount_in_cents=9900000))
      )
    )
  );

create unique index xpress_orders_subscription_period_attempt
  on public.xpress_orders(subscription_id,billing_period_start,renewal_attempt)
  where subscription_id is not null;
create index xpress_orders_subscription_date
  on public.xpress_orders(subscription_id,created_at desc)
  where subscription_id is not null;

alter table public.xpress_memberships
  add column subscription_id uuid references public.xpress_subscriptions(id),
  drop constraint if exists xpress_memberships_grant_kind_check,
  add constraint xpress_memberships_grant_kind_check
    check (grant_kind in ('new','upgrade','subscription_start','renewal'));
create index xpress_memberships_subscription
  on public.xpress_memberships(subscription_id,ends_at desc)
  where subscription_id is not null;

create table public.xpress_subscription_notifications (
  id uuid primary key default gen_random_uuid(),
  subscription_id uuid not null references public.xpress_subscriptions(id),
  order_id uuid references public.xpress_orders(id),
  event_key text not null check (length(event_key) between 3 and 120),
  kind text not null check (kind in ('payment_failed','cancellation_confirmed')),
  status text not null default 'pending' check (status in ('pending','processing','completed','failed')),
  lease_id uuid,
  attempts integer not null default 0 check (attempts>=0),
  last_error text,
  next_attempt_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz,
  unique(subscription_id,event_key)
);
create index xpress_subscription_notifications_due
  on public.xpress_subscription_notifications(next_attempt_at)
  where status in ('pending','failed');
alter table public.xpress_subscriptions enable row level security;
alter table public.xpress_subscription_notifications enable row level security;

revoke all on public.xpress_subscriptions, public.xpress_subscription_notifications from public,anon,authenticated,service_role;
grant select,insert on public.xpress_subscriptions,public.xpress_subscription_notifications to service_role;
grant update(payment_source_id,payment_source_type,payment_source_status,status,current_period_start,current_period_end,
  next_charge_at,payment_failure_count,last_payment_order_id,last_payment_status,last_payment_at,cancel_requested_at,canceled_at,
  lease_id,lease_expires_at,updated_at) on public.xpress_subscriptions to service_role;
grant update(status,lease_id,attempts,last_error,next_attempt_at,updated_at,completed_at)
  on public.xpress_subscription_notifications to service_role;
grant update(charge_started_at,charge_dispatch_attempts,last_charge_error) on public.xpress_orders to service_role;
grant update(subscription_id) on public.xpress_memberships to service_role;

create or replace function public.prepare_xpress_order(
  p_user uuid, p_email text, p_key uuid, p_environment text, p_offer_version text,
  p_offer text, p_exam text, p_kind text, p_credit bigint, p_amount bigint,
  p_coverage_ends timestamptz, p_terms text, p_privacy text, p_legal jsonb
)
returns public.xpress_orders language plpgsql security invoker set search_path='' as $$
declare result public.xpress_orders; open_order public.xpress_orders; new_id uuid;
begin
  if p_user is null or p_email is null or p_email<>lower(p_email) then raise exception 'invalid_order_identity'; end if;
  if not (
    p_offer_version='xpress-2026-09-08-v2' and p_terms='xpress-20260908-v1'
    or p_offer_version='xpress-2026-09-09-v3' and p_terms='xpress-20260909-v2'
    or p_offer_version='xpress-2026-09-12-v4' and p_terms='xpress-20260912-v3'
  ) or p_privacy<>'xpress-privacy-20260908-v1' then raise exception 'invalid_offer_version'; end if;
  if p_exam not in ('ielts','toefl','sat','icfes','cambridge-b2','goethe','delf-dalf','cils-celi','topik','celpe-bras') then raise exception 'invalid_exam'; end if;
  if not (
    p_offer_version='xpress-2026-09-08-v2' and (
      p_kind='new' and p_credit=0 and p_coverage_ends is null
        and ((p_offer='exam-auto' and p_amount=4900000) or (p_offer='exam-teacher' and p_amount=9900000))
      or p_kind='upgrade' and p_offer='exam-teacher' and p_credit=4900000 and p_amount=5000000
        and p_coverage_ends>now()+interval '20 minutes'
    )
    or p_offer_version='xpress-2026-09-09-v3' and (
      p_kind='single' and p_offer='exam-single' and p_credit=0 and p_amount=1200000 and p_coverage_ends is null
      or p_kind='new' and p_credit=0 and p_coverage_ends is null
        and ((p_offer='exam-auto' and p_amount=4900000) or (p_offer='exam-teacher' and p_amount=9900000))
      or p_kind='upgrade' and p_offer='exam-teacher' and p_credit=4900000 and p_amount=5000000
        and p_coverage_ends>now()+interval '20 minutes'
    )
    or p_offer_version='xpress-2026-09-12-v4' and p_kind='single' and p_offer='exam-single'
      and p_credit=0 and p_amount=1200000 and p_coverage_ends is null
  ) then raise exception 'invalid_quote'; end if;

  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_user::text, 9));
  select * into result from public.xpress_orders where user_id=p_user and environment=p_environment and idempotency_key=p_key;
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
      and not exists (select 1 from public.xpress_payment_transactions pt where pt.order_id=xo.id and pt.status in ('APPROVED','DECLINED','ERROR','VOIDED'))
    order by xo.created_at desc limit 1;
  if found then raise exception 'xpress_order_pending'; end if;
  if (select count(*) from public.xpress_orders where user_id=p_user and created_at>now()-interval '1 hour')>=6 then raise exception 'order_rate_limit'; end if;
  new_id:=gen_random_uuid();
  insert into public.xpress_orders(id,user_id,purchaser_email,idempotency_key,environment,reference,offer_version,offer_id,exam_slug,
    order_kind,credit_in_cents,amount_in_cents,coverage_ends_at,terms_version,privacy_version,legal_snapshot)
  values(new_id,p_user,p_email,p_key,p_environment,'WX-'||new_id::text,p_offer_version,p_offer,p_exam,
    p_kind,p_credit,p_amount,p_coverage_ends,p_terms,p_privacy,p_legal) returning * into result;
  return result;
end $$;

create function public.prepare_xpress_subscription(
  p_user uuid,p_email text,p_key uuid,p_environment text,p_offer_version text,p_offer text,p_exam text,p_amount bigint,
  p_initial_charge_at timestamptz,p_terms text,p_privacy text,p_recurring text,p_legal jsonb
)
returns public.xpress_subscriptions language plpgsql security invoker set search_path='' as $$
declare result public.xpress_subscriptions; open_subscription public.xpress_subscriptions;
begin
  if p_user is null or p_email is null or p_email<>lower(p_email) then raise exception 'invalid_subscription_identity'; end if;
  if p_offer_version<>'xpress-2026-09-12-v4' or p_terms<>'xpress-20260912-v3'
    or p_privacy<>'xpress-privacy-20260908-v1' or p_recurring<>'xpress-recurring-30d-20260912-v1'
  then raise exception 'invalid_subscription_version'; end if;
  if p_exam not in ('ielts','toefl','sat','icfes','cambridge-b2','goethe','delf-dalf','cils-celi','topik','celpe-bras') then raise exception 'invalid_exam'; end if;
  if not ((p_offer='exam-auto' and p_amount=4900000) or (p_offer='exam-teacher' and p_amount=9900000)) then raise exception 'invalid_subscription_quote'; end if;
  if p_initial_charge_at is null or p_initial_charge_at<now()-interval '1 minute' then raise exception 'invalid_initial_charge'; end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_user::text, 12));
  select * into result from public.xpress_subscriptions where user_id=p_user and environment=p_environment and idempotency_key=p_key;
  if found then
    if result.offer_id<>p_offer or result.exam_slug<>p_exam or result.amount_in_cents<>p_amount
      or result.terms_version<>p_terms or result.privacy_version<>p_privacy
      or result.recurring_consent_version<>p_recurring or result.legal_snapshot<>p_legal
    then raise exception 'idempotency_conflict'; end if;
    return result;
  end if;
  select * into open_subscription from public.xpress_subscriptions
    where user_id=p_user and environment=p_environment and status<>'canceled' order by created_at desc limit 1;
  if found then
    if open_subscription.status='creating_source' and open_subscription.offer_id=p_offer and open_subscription.exam_slug=p_exam
      and open_subscription.amount_in_cents=p_amount and open_subscription.terms_version=p_terms
      and open_subscription.privacy_version=p_privacy and open_subscription.recurring_consent_version=p_recurring
    then return open_subscription; end if;
    raise exception 'xpress_subscription_exists';
  end if;
  insert into public.xpress_subscriptions(user_id,purchaser_email,idempotency_key,environment,offer_version,offer_id,exam_slug,
    amount_in_cents,initial_charge_at,next_charge_at,terms_version,privacy_version,recurring_consent_version,legal_snapshot)
  values(p_user,p_email,p_key,p_environment,p_offer_version,p_offer,p_exam,p_amount,p_initial_charge_at,null,
    p_terms,p_privacy,p_recurring,p_legal) returning * into result;
  return result;
end $$;

create function public.attach_xpress_subscription_source(
  p_subscription uuid,p_user uuid,p_environment text,p_source_id text,p_source_status text
)
returns public.xpress_subscriptions language plpgsql security invoker set search_path='' as $$
declare result public.xpress_subscriptions;
begin
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_subscription::text, 13));
  select * into result from public.xpress_subscriptions where id=p_subscription and user_id=p_user and environment=p_environment for update;
  if not found then raise exception 'subscription_not_found'; end if;
  if result.payment_source_id is not null then
    if result.payment_source_id<>p_source_id then raise exception 'payment_source_conflict'; end if;
    return result;
  end if;
  if result.status<>'creating_source' or p_source_id is null or length(p_source_id)>120 or p_source_status<>'AVAILABLE' then raise exception 'invalid_payment_source'; end if;
  update public.xpress_subscriptions set payment_source_id=p_source_id,payment_source_type='CARD',payment_source_status=p_source_status,
    status=case when initial_charge_at>now()+interval '5 minutes' then 'scheduled' else 'pending_initial' end,
    next_charge_at=case when initial_charge_at>now()+interval '5 minutes' then initial_charge_at-interval '24 hours' else now() end,
    updated_at=now() where id=p_subscription returning * into result;
  return result;
end $$;

create function public.prepare_xpress_subscription_charge(p_subscription uuid)
returns public.xpress_orders language plpgsql security invoker set search_path='' as $$
declare selected_subscription public.xpress_subscriptions; result public.xpress_orders; period_start timestamptz; period_end timestamptz; new_id uuid; attempt smallint;
begin
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_subscription::text, 14));
  select * into selected_subscription from public.xpress_subscriptions where id=p_subscription for update;
  if not found or selected_subscription.status not in ('pending_initial','scheduled','active','past_due')
    or selected_subscription.cancel_requested_at is not null or selected_subscription.payment_source_status<>'AVAILABLE'
    or selected_subscription.next_charge_at is null or selected_subscription.next_charge_at>now()
  then return null; end if;
  period_start:=coalesce(selected_subscription.current_period_end,selected_subscription.initial_charge_at,now());
  if period_start<now()-interval '3 days' then period_start:=now(); end if;
  period_end:=period_start+interval '30 days';
  attempt:=selected_subscription.payment_failure_count;
  select * into result from public.xpress_orders where subscription_id=p_subscription and billing_period_start=period_start and renewal_attempt=attempt;
  if found then return result; end if;
  new_id:=gen_random_uuid();
  insert into public.xpress_orders(id,user_id,purchaser_email,idempotency_key,environment,reference,offer_version,offer_id,exam_slug,
    order_kind,credit_in_cents,amount_in_cents,coverage_ends_at,terms_version,privacy_version,legal_snapshot,
    subscription_id,billing_period_start,billing_period_end,renewal_attempt,expires_at)
  values(new_id,selected_subscription.user_id,selected_subscription.purchaser_email,gen_random_uuid(),selected_subscription.environment,
    'WX-'||new_id::text,selected_subscription.offer_version,selected_subscription.offer_id,selected_subscription.exam_slug,
    case when selected_subscription.current_period_end is null then 'subscription_start' else 'renewal' end,
    0,selected_subscription.amount_in_cents,period_end,selected_subscription.terms_version,selected_subscription.privacy_version,
    selected_subscription.legal_snapshot,p_subscription,period_start,period_end,attempt,now()+interval '7 days') returning * into result;
  update public.xpress_subscriptions set next_charge_at=now()+interval '30 minutes',updated_at=now() where id=p_subscription;
  return result;
end $$;

create function public.claim_due_xpress_subscriptions(p_lease uuid,p_limit integer default 10)
returns setof public.xpress_subscriptions language plpgsql security invoker set search_path='' as $$
begin
  return query
  with due as (
    select id from public.xpress_subscriptions
    where status in ('pending_initial','scheduled','active','past_due') and cancel_requested_at is null
      and payment_source_status='AVAILABLE' and next_charge_at<=now() and payment_failure_count<3
      and (lease_expires_at is null or lease_expires_at<now())
    order by next_charge_at,id for update skip locked limit greatest(1,least(p_limit,50))
  )
  update public.xpress_subscriptions s set lease_id=p_lease,lease_expires_at=now()+interval '5 minutes',updated_at=now()
    from due where s.id=due.id returning s.*;
end $$;

create function public.release_xpress_subscription_lease(p_subscription uuid,p_lease uuid,p_next timestamptz default null)
returns boolean language plpgsql security invoker set search_path='' as $$
declare changed integer;
begin
  update public.xpress_subscriptions set lease_id=null,lease_expires_at=null,next_charge_at=coalesce(p_next,next_charge_at),updated_at=now()
    where id=p_subscription and lease_id=p_lease;
  get diagnostics changed=row_count;
  return changed=1;
end $$;

create function public.start_xpress_recurring_charge(p_order uuid)
returns boolean language plpgsql security invoker set search_path='' as $$
declare selected_order public.xpress_orders; changed integer;
begin
  select * into selected_order from public.xpress_orders where id=p_order for update;
  if not found or selected_order.subscription_id is null or selected_order.order_kind not in ('subscription_start','renewal')
    or selected_order.charge_dispatch_attempts>=3 or exists(select 1 from public.xpress_payment_transactions where order_id=p_order)
    or (selected_order.charge_started_at is not null and selected_order.charge_started_at>now()-interval '15 minutes')
    or not exists(select 1 from public.xpress_subscriptions s where s.id=selected_order.subscription_id and s.cancel_requested_at is null and s.status in ('pending_initial','scheduled','active','past_due'))
  then return false; end if;
  update public.xpress_orders set charge_started_at=now(),charge_dispatch_attempts=charge_dispatch_attempts+1,last_charge_error=null where id=p_order;
  get diagnostics changed=row_count;
  return changed=1;
end $$;

create function public.record_xpress_recurring_dispatch_failure(p_order uuid,p_definite boolean,p_error text)
returns boolean language plpgsql security invoker set search_path='' as $$
declare selected_order public.xpress_orders; selected_subscription public.xpress_subscriptions;
begin
  select * into selected_order from public.xpress_orders where id=p_order for update;
  if not found or selected_order.subscription_id is null then return false; end if;
  update public.xpress_orders set last_charge_error=left(coalesce(p_error,'recurring_dispatch_failed'),300) where id=p_order;
  select * into selected_subscription from public.xpress_subscriptions where id=selected_order.subscription_id for update;
  if p_definite then
    update public.xpress_subscriptions set payment_failure_count=least(3,payment_failure_count+1),
      status=case when payment_failure_count+1>=3 or current_period_end is null or current_period_end<=now() then 'past_due' else status end,
      next_charge_at=case when payment_failure_count+1>=3 or cancel_requested_at is not null then null else now()+interval '8 hours' end,
      last_payment_order_id=p_order,last_payment_status='ERROR',last_payment_at=now(),lease_id=null,lease_expires_at=null,updated_at=now()
      where id=selected_order.subscription_id;
    insert into public.xpress_subscription_notifications(subscription_id,order_id,event_key,kind)
      values(selected_order.subscription_id,p_order,'dispatch-failed-'||p_order::text||'-'||selected_order.charge_dispatch_attempts::text,'payment_failed')
      on conflict do nothing;
  else
    update public.xpress_subscriptions set next_charge_at=now()+interval '30 minutes',lease_id=null,lease_expires_at=null,updated_at=now()
      where id=selected_order.subscription_id and cancel_requested_at is null;
    if selected_order.charge_dispatch_attempts>=3 then
      insert into public.xpress_fulfillment_jobs(order_id,kind) values(p_order,'financial_review') on conflict do nothing;
    end if;
  end if;
  return true;
end $$;

create function public.cancel_xpress_subscription(p_subscription uuid,p_user uuid,p_environment text)
returns public.xpress_subscriptions language plpgsql security invoker set search_path='' as $$
declare result public.xpress_subscriptions;
begin
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_subscription::text, 15));
  select * into result from public.xpress_subscriptions where id=p_subscription and user_id=p_user and environment=p_environment for update;
  if not found then raise exception 'subscription_not_found'; end if;
  if result.status='canceled' then return result; end if;
  update public.xpress_subscriptions set cancel_requested_at=coalesce(cancel_requested_at,now()),next_charge_at=null,
    status=case when current_period_end>now() or status='pending_initial' then 'cancel_at_period_end' else 'canceled' end,
    canceled_at=case when current_period_end>now() or status='pending_initial' then null else now() end,lease_id=null,lease_expires_at=null,updated_at=now()
    where id=p_subscription returning * into result;
  insert into public.xpress_subscription_notifications(subscription_id,event_key,kind)
    values(p_subscription,'cancellation','cancellation_confirmed') on conflict do nothing;
  return result;
end $$;

create function public.reactivate_xpress_subscription(p_subscription uuid,p_user uuid,p_environment text)
returns public.xpress_subscriptions language plpgsql security invoker set search_path='' as $$
declare result public.xpress_subscriptions;
begin
  select * into result from public.xpress_subscriptions where id=p_subscription and user_id=p_user and environment=p_environment for update;
  if not found then raise exception 'subscription_not_found'; end if;
  if result.status<>'cancel_at_period_end' or result.current_period_end<=now() then raise exception 'subscription_not_reactivatable'; end if;
  update public.xpress_subscriptions set status='active',cancel_requested_at=null,canceled_at=null,
    next_charge_at=greatest(now(),current_period_end-interval '24 hours'),updated_at=now()
    where id=p_subscription returning * into result;
  return result;
end $$;

create function public.claim_xpress_subscription_notification(p_notification uuid,p_lease uuid)
returns boolean language plpgsql security invoker set search_path='' as $$
declare changed integer;
begin
  update public.xpress_subscription_notifications set status='processing',lease_id=p_lease,attempts=attempts+1,last_error=null,updated_at=now()
    where id=p_notification and ((status in ('pending','failed') and next_attempt_at<=now()) or (status='processing' and updated_at<now()-interval '5 minutes'));
  get diagnostics changed=row_count;
  return changed=1;
end $$;

create function public.finish_xpress_subscription_notification(p_notification uuid,p_lease uuid,p_success boolean,p_error text default null)
returns boolean language plpgsql security invoker set search_path='' as $$
declare changed integer;
begin
  update public.xpress_subscription_notifications
    set status=case when p_success then 'completed' else 'failed' end,completed_at=case when p_success then now() else null end,
      next_attempt_at=case when p_success then next_attempt_at else now()+least(interval '1 hour',interval '1 minute'*power(2,least(attempts,6))) end,
      last_error=case when p_success then null else left(coalesce(p_error,'failed'),300) end,lease_id=null,updated_at=now()
    where id=p_notification and status='processing' and lease_id=p_lease;
  get diagnostics changed=row_count;
  return changed=1;
end $$;

create or replace function public.record_xpress_payment(
  p_reference text,p_environment text,p_provider_id text,p_amount bigint,p_currency text,p_status text,p_observed timestamptz,p_fingerprint text
)
returns uuid language plpgsql security invoker set search_path='' as $$
declare selected_order public.xpress_orders; prior public.xpress_payment_transactions; prior_final boolean:=false;
  approved_count integer; approved_provider text; approved_at timestamptz; membership_start timestamptz; membership_end timestamptz;
begin
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_reference,10));
  select * into selected_order from public.xpress_orders where reference=p_reference;
  if not found then raise exception 'unknown_order'; end if;
  if selected_order.environment<>p_environment or selected_order.amount_in_cents<>p_amount or selected_order.currency<>p_currency then raise exception 'payment_mismatch'; end if;
  if p_status not in ('PENDING','APPROVED','DECLINED','ERROR','VOIDED') or p_provider_id is null
    or length(p_provider_id) not between 6 and 120 or p_observed is null or p_fingerprint is null then raise exception 'invalid_payment'; end if;
  select * into prior from public.xpress_payment_transactions where environment=p_environment and provider_id=p_provider_id;
  if found then
    if prior.order_id<>selected_order.id then raise exception 'transaction_order_mismatch'; end if;
    prior_final:=prior.status in ('APPROVED','DECLINED','ERROR','VOIDED');
  end if;
  insert into public.xpress_payment_events(fingerprint,order_id,provider_id,environment,status,observed_at)
    values(p_fingerprint,selected_order.id,p_provider_id,p_environment,p_status,p_observed) on conflict do nothing;
  insert into public.xpress_payment_transactions(environment,provider_id,order_id,status,observed_at)
    values(p_environment,p_provider_id,selected_order.id,p_status,p_observed)
    on conflict(environment,provider_id) do update set status=excluded.status,observed_at=excluded.observed_at
    where public.xpress_payment_transactions.observed_at<=excluded.observed_at
      and not (public.xpress_payment_transactions.status in ('APPROVED','VOIDED') and excluded.status in ('PENDING','DECLINED','ERROR'))
      and not (public.xpress_payment_transactions.status='VOIDED' and excluded.status='APPROVED');
  select count(*) into approved_count from public.xpress_payment_transactions where order_id=selected_order.id and status='APPROVED';
  if approved_count>0 then
    select provider_id,observed_at into approved_provider,approved_at from public.xpress_payment_transactions
      where order_id=selected_order.id and status='APPROVED' order by observed_at,provider_id limit 1;
    if selected_order.order_kind='single' then
      insert into public.xpress_exam_credits(user_id,source_order_id,credited_provider_id,environment,exam_slug,granted_at)
        values(selected_order.user_id,selected_order.id,approved_provider,selected_order.environment,selected_order.exam_slug,approved_at)
        on conflict(source_order_id) do nothing;
    else
      membership_start:=case when selected_order.subscription_id is not null then selected_order.billing_period_start else approved_at end;
      membership_end:=case when selected_order.subscription_id is not null then selected_order.billing_period_end
        when selected_order.order_kind='upgrade' then selected_order.coverage_ends_at else approved_at+interval '30 days' end;
      insert into public.xpress_memberships(user_id,source_order_id,credited_provider_id,environment,exam_slug,offer_id,grant_kind,starts_at,ends_at,subscription_id)
        values(selected_order.user_id,selected_order.id,approved_provider,selected_order.environment,selected_order.exam_slug,
          selected_order.offer_id,selected_order.order_kind,membership_start,membership_end,selected_order.subscription_id)
        on conflict(source_order_id) do nothing;
    end if;
    if selected_order.subscription_id is not null then
      update public.xpress_subscriptions set
        status=case when cancel_requested_at is null then 'active' else 'cancel_at_period_end' end,
        current_period_start=selected_order.billing_period_start,current_period_end=selected_order.billing_period_end,
        next_charge_at=case when cancel_requested_at is null then selected_order.billing_period_end-interval '24 hours' else null end,
        payment_failure_count=0,last_payment_order_id=selected_order.id,last_payment_status='APPROVED',last_payment_at=approved_at,
        canceled_at=null,lease_id=null,lease_expires_at=null,updated_at=now()
        where id=selected_order.subscription_id;
    end if;
    insert into public.xpress_fulfillment_jobs(order_id,kind) values(selected_order.id,'student_receipt') on conflict do nothing;
    insert into public.xpress_fulfillment_jobs(order_id,kind) values(selected_order.id,'owner_notification') on conflict do nothing;
  else
    update public.xpress_memberships set status='revoked',revoked_at=now() where source_order_id=selected_order.id and status='active';
    update public.xpress_exam_credits set status='revoked',revoked_at=now() where source_order_id=selected_order.id and status='active';
    if selected_order.subscription_id is not null and p_status in ('DECLINED','ERROR','VOIDED') and not prior_final then
      update public.xpress_subscriptions set payment_failure_count=least(3,payment_failure_count+1),
        status=case when payment_failure_count+1>=3 or current_period_end is null or current_period_end<=now() then 'past_due' else status end,
        next_charge_at=case when payment_failure_count+1>=3 or cancel_requested_at is not null then null else now()+interval '8 hours' end,
        last_payment_order_id=selected_order.id,last_payment_status=p_status,last_payment_at=p_observed,
        lease_id=null,lease_expires_at=null,updated_at=now() where id=selected_order.subscription_id;
      insert into public.xpress_subscription_notifications(subscription_id,order_id,event_key,kind)
        values(selected_order.subscription_id,selected_order.id,'payment-failed-'||selected_order.id::text,'payment_failed') on conflict do nothing;
    elsif selected_order.subscription_id is not null and p_status='PENDING' then
      update public.xpress_subscriptions set last_payment_order_id=selected_order.id,last_payment_status='PENDING',last_payment_at=p_observed,
        next_charge_at=now()+interval '30 minutes',lease_id=null,lease_expires_at=null,updated_at=now()
        where id=selected_order.subscription_id;
    end if;
  end if;
  if approved_count>1 or p_status='VOIDED' then
    insert into public.xpress_fulfillment_jobs(order_id,kind) values(selected_order.id,'financial_review') on conflict do nothing;
  end if;
  return selected_order.id;
end $$;

do $$
declare signature text;
begin
  foreach signature in array array[
    'public.prepare_xpress_subscription(uuid,text,uuid,text,text,text,text,bigint,timestamptz,text,text,text,jsonb)',
    'public.attach_xpress_subscription_source(uuid,uuid,text,text,text)',
    'public.prepare_xpress_subscription_charge(uuid)',
    'public.claim_due_xpress_subscriptions(uuid,integer)',
    'public.release_xpress_subscription_lease(uuid,uuid,timestamptz)',
    'public.start_xpress_recurring_charge(uuid)',
    'public.record_xpress_recurring_dispatch_failure(uuid,boolean,text)',
    'public.cancel_xpress_subscription(uuid,uuid,text)',
    'public.reactivate_xpress_subscription(uuid,uuid,text)',
    'public.claim_xpress_subscription_notification(uuid,uuid)',
    'public.finish_xpress_subscription_notification(uuid,uuid,boolean,text)'
  ] loop
    execute 'revoke all on function '||signature||' from public,anon,authenticated';
    execute 'grant execute on function '||signature||' to service_role';
  end loop;
end $$;

comment on table public.xpress_subscriptions is 'Recurring 30-day Xpress agreements. Stores Wompi source ids but never card numbers, CVV, or card tokens.';
comment on table public.xpress_subscription_notifications is 'Durable, idempotent operational email jobs for recurring Xpress subscriptions.';
comment on table public.xpress_orders is 'Immutable purchase intents for one exam, legacy passes, or recurring Xpress billing periods.';
