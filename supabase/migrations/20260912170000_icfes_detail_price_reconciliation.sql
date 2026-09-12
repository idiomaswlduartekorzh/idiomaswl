-- Canonical COP 12.900 ICFES detail price, revocable access, and durable Wompi reconciliation.
-- Legacy rows remain readable; NOT VALID enforces COP 12.900 for every new row.

alter table public.icfes_pass_orders
  drop constraint if exists icfes_pass_orders_amount_in_cents_check;
alter table public.icfes_pass_orders
  add constraint icfes_pass_orders_amount_in_cents_check
  check (amount_in_cents = 1290000) not valid;

do $$
declare constraint_name text;
begin
  for constraint_name in
    select conname from pg_catalog.pg_constraint
    where conrelid='public.xpress_subscriptions'::regclass and contype='c'
      and pg_catalog.pg_get_constraintdef(oid) like '%amount_in_cents%'
  loop
    execute format('alter table public.xpress_subscriptions drop constraint %I', constraint_name);
  end loop;
end $$;
alter table public.xpress_subscriptions
  add constraint xpress_subscriptions_amount_in_cents_check check (
    (offer_id='exam-auto' and amount_in_cents=4990000)
    or (offer_id='exam-teacher' and amount_in_cents=9990000)
  ) not valid;

do $$
declare constraint_name text;
begin
  for constraint_name in
    select conname from pg_catalog.pg_constraint
    where conrelid='public.xpress_subscriptions'::regclass and contype='c'
      and pg_catalog.pg_get_constraintdef(oid) like '%offer_version%'
  loop
    execute format('alter table public.xpress_subscriptions drop constraint %I', constraint_name);
  end loop;
end $$;
alter table public.xpress_subscriptions
  add constraint xpress_subscriptions_offer_version_check check (
    offer_version in ('xpress-2026-09-12-v4','xpress-2026-09-12-v5')
  ) not valid;

create or replace function public.prepare_xpress_subscription(
  p_user uuid,p_email text,p_key uuid,p_environment text,p_offer_version text,p_offer text,p_exam text,p_amount bigint,
  p_initial_charge_at timestamptz,p_terms text,p_privacy text,p_recurring text,p_legal jsonb
)
returns public.xpress_subscriptions language plpgsql security invoker set search_path='' as $$
declare
  result public.xpress_subscriptions;
  open_subscription public.xpress_subscriptions;
  capacity record;
  held_reservation public.xpress_teacher_capacity_reservations;
begin
  if p_user is null or p_email is null or p_email<>lower(p_email) then raise exception 'invalid_subscription_identity'; end if;
  if p_offer_version<>'xpress-2026-09-12-v5' or p_terms<>'xpress-20260912-v4'
    or p_privacy<>'xpress-privacy-20260908-v1' or p_recurring<>'xpress-recurring-30d-20260912-v1'
  then raise exception 'invalid_subscription_version'; end if;
  if p_exam not in ('ielts','toefl','sat','icfes','cambridge-b2','goethe','delf-dalf','cils-celi','topik','celpe-bras') then raise exception 'invalid_exam'; end if;
  if not ((p_offer='exam-auto' and p_amount=4990000) or (p_offer='exam-teacher' and p_amount=9990000)) then raise exception 'invalid_subscription_quote'; end if;
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
  if p_exam='icfes' and p_offer='exam-teacher' then
    perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended('icfes-teacher-capacity:'||p_environment,11));
    update public.xpress_teacher_capacity_reservations set status='expired'
      where environment=p_environment and status='held' and expires_at<=now();
    select * into held_reservation from public.xpress_teacher_capacity_reservations
      where user_id=p_user and environment=p_environment and idempotency_key=p_key for update;
    if found then
      if held_reservation.status<>'held' or held_reservation.expires_at<=now()
        then raise exception 'teacher_capacity_reservation_expired'; end if;
    else
      select * into capacity from public.xpress_teacher_capacity_status(p_environment);
      if not capacity.can_reserve
        then raise exception 'teacher_capacity_unavailable:%',array_to_string(capacity.stop_reasons,','); end if;
      insert into public.xpress_teacher_capacity_reservations(
        user_id,environment,idempotency_key,exam_slug,offer_id,rubric_version,addendum_version
      ) values(
        p_user,p_environment,p_key,'icfes','exam-teacher','icfes-teacher-rubric-2026-09-09-v1',
        'icfes-teacher-addendum-2026-09-12-v3'
      ) returning * into held_reservation;
    end if;
  end if;
  insert into public.xpress_subscriptions(user_id,purchaser_email,idempotency_key,environment,offer_version,offer_id,exam_slug,
    amount_in_cents,initial_charge_at,next_charge_at,terms_version,privacy_version,recurring_consent_version,legal_snapshot)
  values(p_user,p_email,p_key,p_environment,p_offer_version,p_offer,p_exam,p_amount,p_initial_charge_at,null,
    p_terms,p_privacy,p_recurring,p_legal) returning * into result;
  return result;
end $$;

create or replace function public.link_xpress_subscription_teacher_capacity(
  p_subscription uuid,
  p_order uuid
) returns boolean
language plpgsql security invoker set search_path=''
as $$
declare
  selected_subscription public.xpress_subscriptions;
  selected_order public.xpress_orders;
  reservation public.xpress_teacher_capacity_reservations;
  capacity record;
begin
  select * into selected_subscription from public.xpress_subscriptions
    where id=p_subscription for update;
  select * into selected_order from public.xpress_orders
    where id=p_order and subscription_id=p_subscription for update;
  if selected_subscription.id is null or selected_order.id is null
    or selected_subscription.exam_slug<>'icfes' or selected_subscription.offer_id<>'exam-teacher'
    or selected_order.exam_slug<>'icfes' or selected_order.offer_id<>'exam-teacher'
    or selected_order.order_kind not in ('subscription_start','renewal')
    or selected_order.billing_period_start is null or selected_order.billing_period_end is null
    or selected_order.amount_in_cents<>9990000
  then raise exception 'invalid_subscription_teacher_capacity_link'; end if;

  perform pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended('icfes-teacher-capacity:'||selected_subscription.environment,11)
  );
  update public.xpress_teacher_capacity_reservations set status='expired'
    where environment=selected_subscription.environment and status='held' and expires_at<=now();
  select * into reservation from public.xpress_teacher_capacity_reservations
    where order_id=p_order for update;
  if found then
    if reservation.status in ('order_linked','consumed') then return true; end if;
    raise exception 'teacher_capacity_reservation_invalid_state';
  end if;

  if selected_order.order_kind='subscription_start' then
    select * into reservation from public.xpress_teacher_capacity_reservations
      where user_id=selected_subscription.user_id
        and environment=selected_subscription.environment
        and idempotency_key=selected_subscription.idempotency_key
        and status='held' and expires_at>now()
      for update;
  end if;
  if not found then
    select * into capacity from public.xpress_teacher_capacity_status(selected_subscription.environment);
    if not capacity.can_reserve
      then raise exception 'teacher_capacity_unavailable:%',array_to_string(capacity.stop_reasons,','); end if;
    insert into public.xpress_teacher_capacity_reservations(
      user_id,environment,idempotency_key,exam_slug,offer_id,rubric_version,addendum_version
    ) values(
      selected_subscription.user_id,selected_subscription.environment,p_order,'icfes','exam-teacher',
      'icfes-teacher-rubric-2026-09-09-v1','icfes-teacher-addendum-2026-09-12-v3'
    ) returning * into reservation;
  end if;
  update public.xpress_teacher_capacity_reservations set
    status='order_linked',order_id=p_order,
    expires_at=greatest(expires_at,selected_order.expires_at+interval '15 minutes')
  where id=reservation.id;
  return true;
end;
$$;

revoke all on function public.link_xpress_subscription_teacher_capacity(uuid,uuid)
  from public,anon,authenticated,service_role;
grant execute on function public.link_xpress_subscription_teacher_capacity(uuid,uuid)
  to service_role;

alter table public.icfes_entitlements
  add column if not exists status text not null default 'active',
  add column if not exists revoked_at timestamptz;
alter table public.icfes_entitlements
  drop constraint if exists icfes_entitlements_status_check;
alter table public.icfes_entitlements
  add constraint icfes_entitlements_status_check
  check (status in ('active', 'revoked'));
alter table public.icfes_entitlements
  drop constraint if exists icfes_entitlements_revocation_check;
alter table public.icfes_entitlements
  add constraint icfes_entitlements_revocation_check
  check ((status = 'revoked') = (revoked_at is not null));

create table if not exists public.icfes_payment_reconciliation_queue (
  environment text not null check (environment in ('sandbox', 'production')),
  provider_id text not null check (provider_id ~ '^[A-Za-z0-9_-]{6,120}$'),
  order_id uuid not null references public.icfes_pass_orders(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'completed', 'failed')),
  attempts integer not null default 0 check (attempts between 0 and 100),
  next_attempt_at timestamptz not null default now(),
  last_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (environment, provider_id)
);
create index if not exists icfes_payment_reconciliation_due
  on public.icfes_payment_reconciliation_queue(next_attempt_at)
  where status in ('pending', 'failed');
create index if not exists icfes_payment_reconciliation_order
  on public.icfes_payment_reconciliation_queue(order_id);

alter table public.icfes_payment_reconciliation_queue enable row level security;
revoke all on public.icfes_payment_reconciliation_queue from public, anon, authenticated, service_role;
grant select, insert on public.icfes_payment_reconciliation_queue to service_role;
grant update (status, attempts, next_attempt_at, last_error, updated_at)
  on public.icfes_payment_reconciliation_queue to service_role;
grant update (status, revoked_at) on public.icfes_entitlements to service_role;

create or replace function public.queue_icfes_payment_reconciliation(
  p_reference text,
  p_environment text,
  p_provider_id text
) returns uuid
language plpgsql security definer set search_path=''
as $$
declare stored_order uuid;
begin
  if p_environment not in ('sandbox', 'production')
    or p_provider_id is null or p_provider_id !~ '^[A-Za-z0-9_-]{6,120}$' then
    raise exception 'invalid_reconciliation';
  end if;
  select id into stored_order from public.icfes_pass_orders
  where reference=p_reference and environment=p_environment;
  if stored_order is null then return null; end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(stored_order::text,17));
  if not exists(select 1 from public.icfes_payment_reconciliation_queue
      where environment=p_environment and provider_id=p_provider_id)
    and (select count(*) from public.icfes_payment_reconciliation_queue where order_id=stored_order)>=10
  then raise exception 'icfes_reconciliation_rate_limit'; end if;
  insert into public.icfes_payment_reconciliation_queue(environment, provider_id, order_id)
  values(p_environment, p_provider_id, stored_order)
  on conflict(environment, provider_id) do update set updated_at=now()
  where public.icfes_payment_reconciliation_queue.order_id=excluded.order_id;
  select order_id into stored_order from public.icfes_payment_reconciliation_queue
  where environment=p_environment and provider_id=p_provider_id;
  return stored_order;
end;
$$;

create or replace function public.finish_icfes_payment_reconciliation(
  p_environment text,
  p_provider_id text,
  p_success boolean,
  p_error text
) returns boolean
language plpgsql security definer set search_path=''
as $$
begin
  update public.icfes_payment_reconciliation_queue set
    status=case when p_success then 'completed' else 'failed' end,
    attempts=attempts+1,
    next_attempt_at=case when p_success then now() else now()+make_interval(secs => least(21600, 30 * (2 ^ least(attempts, 9)))) end,
    last_error=case when p_success then null else left(coalesce(p_error, 'failed'), 300) end,
    updated_at=now()
  where environment=p_environment and provider_id=p_provider_id;
  return found;
end;
$$;

revoke all on function public.queue_icfes_payment_reconciliation(text,text,text) from public, anon, authenticated;
revoke all on function public.finish_icfes_payment_reconciliation(text,text,boolean,text) from public, anon, authenticated;
grant execute on function public.queue_icfes_payment_reconciliation(text,text,text) to service_role;
grant execute on function public.finish_icfes_payment_reconciliation(text,text,boolean,text) to service_role;
