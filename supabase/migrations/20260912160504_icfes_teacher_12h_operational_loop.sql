-- Repairs the single-exam migration so ICFES teacher orders keep their
-- capacity reservation, introduces the 12-hour commercial contract, and adds
-- a durable notification outbox. This migration is local-only until the full
-- Sandbox release gate is approved.

alter table public.icfes_entitlements
  add column if not exists status text not null default 'active' check (status in ('active','revoked')),
  add column if not exists revoked_at timestamptz,
  add constraint icfes_entitlements_revocation_check
    check ((status='revoked')=(revoked_at is not null));
grant update(status,revoked_at) on public.icfes_entitlements to service_role;

alter table public.xpress_orders
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
    or (
      offer_version='xpress-2026-09-12-v5'
      and (
        order_kind='single' and offer_id='exam-single' and credit_in_cents=0 and amount_in_cents=1290000
          and coverage_ends_at is null and subscription_id is null and billing_period_start is null and billing_period_end is null
        or order_kind in ('subscription_start','renewal') and offer_id in ('exam-auto','exam-teacher')
          and credit_in_cents=0 and subscription_id is not null and billing_period_start is not null
          and billing_period_end=billing_period_start+interval '30 days' and coverage_ends_at=billing_period_end
          and ((offer_id='exam-auto' and amount_in_cents=4990000) or (offer_id='exam-teacher' and amount_in_cents=9990000))
      )
    )
  );

-- Keep historical reservations and reviews valid while every new reservation
-- and review uses the v2/12-hour contract.
do $$
declare constraint_name text;
begin
  for constraint_name in
    select con.conname
    from pg_catalog.pg_constraint con
    join pg_catalog.pg_class rel on rel.oid=con.conrelid
    join pg_catalog.pg_namespace ns on ns.oid=rel.relnamespace
    where ns.nspname='public' and rel.relname='xpress_teacher_capacity_reservations'
      and con.contype='c' and pg_catalog.pg_get_constraintdef(con.oid) like '%addendum_version%'
  loop
    execute format('alter table public.xpress_teacher_capacity_reservations drop constraint %I',constraint_name);
  end loop;
end $$;

alter table public.xpress_teacher_capacity_reservations
  add constraint xpress_teacher_capacity_addendum_version_check
  check (addendum_version in (
    'icfes-teacher-addendum-2026-09-09-v1',
    'icfes-teacher-addendum-2026-09-12-v2',
    'icfes-teacher-addendum-2026-09-12-v3'
  ));

do $$
declare constraint_name text;
begin
  for constraint_name in
    select con.conname
    from pg_catalog.pg_constraint con
    join pg_catalog.pg_class rel on rel.oid=con.conrelid
    join pg_catalog.pg_namespace ns on ns.oid=rel.relnamespace
    where ns.nspname='public' and rel.relname='xpress_teacher_reviews'
      and con.contype='c' and pg_catalog.pg_get_constraintdef(con.oid) like '%due_at%requested_at%'
  loop
    execute format('alter table public.xpress_teacher_reviews drop constraint %I',constraint_name);
  end loop;
end $$;

alter table public.xpress_teacher_reviews
  alter column due_at set default now()+interval '12 hours',
  add column codex_handoff_lease_id uuid,
  add column codex_handoff_payload_hash text check (codex_handoff_payload_hash ~ '^[0-9a-f]{64}$'),
  add column codex_handoff_at timestamptz,
  add column codex_model_reference text,
  add column human_attested_at timestamptz,
  add constraint xpress_teacher_reviews_due_contract_check
  check (due_at in (requested_at+interval '12 hours',requested_at+interval '24 hours')),
  add constraint xpress_teacher_reviews_codex_evidence_check check (
    (codex_handoff_lease_id is null and codex_handoff_payload_hash is null and codex_handoff_at is null
      and codex_model_reference is null and human_attested_at is null)
    or (codex_handoff_lease_id is not null and codex_handoff_payload_hash is not null and codex_handoff_at is not null
      and ((codex_model_reference is null and human_attested_at is null)
        or (codex_model_reference is not null and human_attested_at is not null)))
  );

create or replace function public.xpress_teacher_capacity_status(p_environment text)
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
declare projected integer; open_reviews integer;
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
      and not exists (select 1 from public.xpress_teacher_reviews review where review.membership_id=membership.id);
  select count(*)::integer into open_reviews
    from public.xpress_teacher_reviews
    where environment=p_environment and status in ('queued','in_review','needs_qa','failed');
  select extract(epoch from (now()-min(requested_at)))/3600 into oldest_queued_hours
    from public.xpress_teacher_reviews
    where environment=p_environment and status in ('queued','in_review','needs_qa','failed');
  select percentile_cont(0.95) within group (order by extract(epoch from (completed_at-requested_at))/3600)
    into rolling_p95_hours
    from public.xpress_teacher_reviews
    where environment=p_environment and status='completed' and completed_at>now()-interval '7 days';
  select exists(select 1 from public.xpress_teacher_reviews
    where environment=p_environment and status in ('queued','in_review','needs_qa','failed') and due_at<=now())
    into has_open_sla_breach;

  projected:=held_reservations+outstanding_credits+open_reviews+1;
  projected_utilization_percent:=case when raw_daily_slots>0 then projected::numeric*100/raw_daily_slots else null end;
  stop_reasons:=array_remove(array[
    case when calibrated_reviewers<1 then 'no-calibrated-reviewer' end,
    case when raw_daily_slots<1 or sellable_daily_slots<1 then 'capacity-not-finite' end,
    case when raw_daily_slots<1 or projected_utilization_percent>80 then 'capacity-utilization-red' end,
    case when oldest_queued_hours>=9 then 'oldest-queue-red' end,
    case when rolling_p95_hours>10 then 'rolling-p95-red' end,
    case when has_open_sla_breach then 'open-sla-breach' end
  ]::text[],null);
  can_reserve:=cardinality(stop_reasons)=0 and projected<=sellable_daily_slots;
  if not can_reserve and cardinality(stop_reasons)=0 then stop_reasons:=array['capacity-utilization-red']::text[]; end if;
  return next;
end $$;

create or replace function public.reserve_xpress_teacher_capacity(
  p_user uuid,p_environment text,p_key uuid,p_rubric text,p_addendum text
)
returns public.xpress_teacher_capacity_reservations
language plpgsql security invoker set search_path='' as $$
declare existing public.xpress_teacher_capacity_reservations; capacity record; result public.xpress_teacher_capacity_reservations;
begin
  if p_user is null or p_key is null or p_environment not in ('sandbox','production')
    or p_rubric<>'icfes-teacher-rubric-2026-09-09-v1'
    or p_addendum not in (
      'icfes-teacher-addendum-2026-09-09-v1',
      'icfes-teacher-addendum-2026-09-12-v2',
      'icfes-teacher-addendum-2026-09-12-v3'
    )
  then raise exception 'invalid_teacher_capacity_request'; end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended('icfes-teacher-capacity:'||p_environment,11));
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
  if not capacity.can_reserve then raise exception 'teacher_capacity_unavailable:%',array_to_string(capacity.stop_reasons,','); end if;
  insert into public.xpress_teacher_capacity_reservations(
    user_id,environment,idempotency_key,exam_slug,offer_id,rubric_version,addendum_version
  ) values(p_user,p_environment,p_key,'icfes','exam-teacher',p_rubric,p_addendum)
  returning * into result;
  return result;
end $$;

revoke all on function public.xpress_teacher_capacity_status(text) from public,anon,authenticated,service_role;
revoke all on function public.reserve_xpress_teacher_capacity(uuid,text,uuid,text,text) from public,anon,authenticated,service_role;
grant execute on function public.xpress_teacher_capacity_status(text) to service_role;
grant execute on function public.reserve_xpress_teacher_capacity(uuid,text,uuid,text,text) to service_role;

create or replace function public.prepare_xpress_order(
  p_user uuid,p_email text,p_key uuid,p_environment text,p_offer_version text,
  p_offer text,p_exam text,p_kind text,p_credit bigint,p_amount bigint,
  p_coverage_ends timestamptz,p_terms text,p_privacy text,p_legal jsonb
)
returns public.xpress_orders language plpgsql security invoker set search_path='' as $$
declare result public.xpress_orders; open_order public.xpress_orders; new_id uuid; teacher_reservation uuid;
begin
  if p_user is null or p_email is null or p_email<>lower(p_email) then raise exception 'invalid_order_identity'; end if;
  if not (
    p_offer_version='xpress-2026-09-08-v2' and p_terms='xpress-20260908-v1'
    or p_offer_version='xpress-2026-09-09-v3' and p_terms='xpress-20260909-v2'
    or p_offer_version='xpress-2026-09-12-v4' and p_terms='xpress-20260912-v3'
    or p_offer_version='xpress-2026-09-12-v5' and p_terms='xpress-20260912-v4'
  ) or p_privacy<>'xpress-privacy-20260908-v1' then raise exception 'invalid_offer_version'; end if;
  if p_exam not in ('ielts','toefl','sat','icfes','cambridge-b2','goethe','delf-dalf','cils-celi','topik','celpe-bras') then raise exception 'invalid_exam'; end if;
  if not (
    p_offer_version='xpress-2026-09-08-v2' and (
      p_kind='new' and p_credit=0 and p_coverage_ends is null
        and ((p_offer='exam-auto' and p_amount=4900000) or (p_offer='exam-teacher' and p_amount=9900000))
      or p_kind='upgrade' and p_offer='exam-teacher' and p_credit=4900000 and p_amount=5000000 and p_coverage_ends>now()+interval '20 minutes'
    )
    or p_offer_version='xpress-2026-09-09-v3' and (
      p_kind='single' and p_offer='exam-single' and p_credit=0 and p_amount=1200000 and p_coverage_ends is null
      or p_kind='new' and p_credit=0 and p_coverage_ends is null
        and ((p_offer='exam-auto' and p_amount=4900000) or (p_offer='exam-teacher' and p_amount=9900000))
      or p_kind='upgrade' and p_offer='exam-teacher' and p_credit=4900000 and p_amount=5000000 and p_coverage_ends>now()+interval '20 minutes'
    )
    or p_offer_version='xpress-2026-09-12-v4' and p_kind='single' and p_offer='exam-single'
      and p_credit=0 and p_amount=1200000 and p_coverage_ends is null
    or p_offer_version='xpress-2026-09-12-v5' and p_kind='single' and p_offer='exam-single'
      and p_credit=0 and p_amount=1290000 and p_coverage_ends is null
  ) then raise exception 'invalid_quote'; end if;

  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_user::text,9));
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
      and not exists(select 1 from public.xpress_payment_transactions pt where pt.order_id=xo.id and pt.status in ('APPROVED','DECLINED','ERROR','VOIDED'))
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

create or replace function public.record_xpress_payment(
  p_reference text,p_environment text,p_provider_id text,p_amount bigint,
  p_currency text,p_status text,p_observed timestamptz,p_fingerprint text
)
returns uuid language plpgsql security invoker set search_path='' as $$
declare
  selected_order public.xpress_orders; prior public.xpress_payment_transactions;
  prior_final boolean:=false;
  approved_count integer; approved_provider text; approved_at timestamptz;
  membership_start timestamptz; membership_end timestamptz; selected_membership_id uuid;
begin
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_reference,10));
  select * into selected_order from public.xpress_orders where reference=p_reference;
  if not found then raise exception 'unknown_order'; end if;
  if selected_order.environment<>p_environment or selected_order.amount_in_cents<>p_amount or selected_order.currency<>p_currency then raise exception 'payment_mismatch'; end if;
  if p_status not in ('PENDING','APPROVED','DECLINED','ERROR','VOIDED') or p_provider_id is null
    or length(p_provider_id) not between 6 and 120 or p_observed is null or p_fingerprint is null
  then raise exception 'invalid_payment'; end if;
  select * into prior from public.xpress_payment_transactions where environment=p_environment and provider_id=p_provider_id;
  if found and prior.order_id<>selected_order.id then raise exception 'transaction_order_mismatch'; end if;
  if found then prior_final:=prior.status in ('APPROVED','DECLINED','ERROR','VOIDED'); end if;
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
    if selected_order.subscription_id is null
      and selected_order.exam_slug='icfes' and selected_order.offer_id='exam-teacher' and not exists(
      select 1 from public.xpress_teacher_capacity_reservations
      where order_id=selected_order.id and status in ('order_linked','consumed') and expires_at>=approved_at
    ) then raise exception 'teacher_capacity_reservation_expired'; end if;

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
      select id into selected_membership_id from public.xpress_memberships where source_order_id=selected_order.id;
      if selected_order.subscription_id is not null
        and selected_order.exam_slug='icfes' and selected_order.offer_id='exam-teacher' then
        insert into public.xpress_teacher_capacity_reservations(
          user_id,environment,idempotency_key,exam_slug,offer_id,rubric_version,addendum_version,
          status,held_at,expires_at,order_id,membership_id,consumed_at
        ) values(
          selected_order.user_id,selected_order.environment,selected_order.id,'icfes','exam-teacher',
          'icfes-teacher-rubric-2026-09-09-v1','icfes-teacher-addendum-2026-09-12-v3',
          'consumed',approved_at,greatest(membership_end,approved_at+interval '1 second'),
          selected_order.id,selected_membership_id,approved_at
        ) on conflict do nothing;
      end if;
      update public.xpress_teacher_capacity_reservations
        set status='consumed',membership_id=selected_membership_id,consumed_at=coalesce(consumed_at,approved_at)
        where order_id=selected_order.id and status in ('order_linked','consumed');
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
    update public.xpress_teacher_reviews review set
      status='cancelled',last_error='payment_revoked',lease_id=null,lease_expires_at=null,updated_at=now()
      where review.membership_id in (
        select membership.id from public.xpress_memberships membership where membership.source_order_id=selected_order.id
      ) and review.status in ('queued','in_review','needs_qa','failed');
    if p_status in ('DECLINED','ERROR','VOIDED') then
      update public.xpress_teacher_capacity_reservations set status='released'
        where order_id=selected_order.id and status='order_linked';
    end if;
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

create table public.xpress_teacher_review_notifications (
  id uuid primary key default gen_random_uuid(),
  review_id uuid not null references public.xpress_teacher_reviews(id) on delete cascade,
  kind text not null check (kind in ('owner_requested','owner_due_6h','owner_due_9h','owner_due_11h','owner_breached','student_completed')),
  status text not null default 'pending' check (status in ('pending','processing','sent','failed','cancelled','dead')),
  attempts integer not null default 0 check (attempts between 0 and 5),
  lease_id uuid,
  next_attempt_at timestamptz not null default now(),
  last_error text,
  sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(review_id,kind),
  check ((status='processing')=(lease_id is not null)),
  check ((status='sent')=(sent_at is not null))
);

create index xpress_teacher_review_notifications_due
  on public.xpress_teacher_review_notifications(next_attempt_at)
  where status in ('pending','failed');

alter table public.xpress_teacher_review_notifications enable row level security;
revoke all on public.xpress_teacher_review_notifications from public,anon,authenticated,service_role;
grant select,insert on public.xpress_teacher_review_notifications to service_role;
grant update(status,attempts,lease_id,next_attempt_at,last_error,sent_at,updated_at)
  on public.xpress_teacher_review_notifications to service_role;

create function public.enqueue_xpress_teacher_review_notifications()
returns trigger language plpgsql security invoker set search_path='' as $$
begin
  if tg_op='INSERT' then
    insert into public.xpress_teacher_review_notifications(review_id,kind,next_attempt_at) values
      (new.id,'owner_requested',new.requested_at),
      (new.id,'owner_due_6h',new.requested_at+interval '6 hours'),
      (new.id,'owner_due_9h',new.requested_at+interval '9 hours'),
      (new.id,'owner_due_11h',new.requested_at+interval '11 hours'),
      (new.id,'owner_breached',new.due_at)
    on conflict(review_id,kind) do nothing;
  elsif new.status='completed' and old.status is distinct from 'completed' then
    update public.xpress_teacher_review_notifications set status='cancelled',lease_id=null,updated_at=now()
      where review_id=new.id and kind in ('owner_due_6h','owner_due_9h','owner_due_11h','owner_breached')
        and status in ('pending','failed');
    insert into public.xpress_teacher_review_notifications(review_id,kind,next_attempt_at)
      values(new.id,'student_completed',now()) on conflict(review_id,kind) do nothing;
  elsif new.status='cancelled' and old.status is distinct from 'cancelled' then
    update public.xpress_teacher_review_notifications set status='cancelled',lease_id=null,updated_at=now()
      where review_id=new.id and status in ('pending','failed','processing');
  end if;
  return new;
end $$;

create trigger xpress_teacher_review_notification_enqueue
after insert or update of status on public.xpress_teacher_reviews
for each row execute function public.enqueue_xpress_teacher_review_notifications();

insert into public.xpress_teacher_review_notifications(review_id,kind,next_attempt_at)
select review.id,schedule.kind,schedule.next_attempt_at
from public.xpress_teacher_reviews review
cross join lateral (values
  ('owner_requested'::text,now()),
  ('owner_due_6h'::text,greatest(now(),review.requested_at+interval '6 hours')),
  ('owner_due_9h'::text,greatest(now(),review.requested_at+interval '9 hours')),
  ('owner_due_11h'::text,greatest(now(),review.requested_at+interval '11 hours')),
  ('owner_breached'::text,greatest(now(),review.due_at))
) schedule(kind,next_attempt_at)
where review.status in ('queued','in_review','needs_qa','failed')
on conflict(review_id,kind) do nothing;

create function public.claim_xpress_teacher_review_notification(p_lease uuid,p_environment text)
returns public.xpress_teacher_review_notifications
language plpgsql security invoker set search_path='' as $$
declare selected public.xpress_teacher_review_notifications;
begin
  if p_lease is null or p_environment not in ('sandbox','production') then raise exception 'invalid_notification_lease'; end if;
  update public.xpress_teacher_review_notifications notification
    set status=case when attempts>=5 then 'dead' else 'failed' end,lease_id=null,
    next_attempt_at=now(),last_error='stale notification lease',updated_at=now()
    where notification.status='processing' and notification.updated_at<now()-interval '10 minutes'
      and exists(select 1 from public.xpress_teacher_reviews review
        where review.id=notification.review_id and review.environment=p_environment);
  select notification.* into selected from public.xpress_teacher_review_notifications notification
    join public.xpress_teacher_reviews review on review.id=notification.review_id
    where review.environment=p_environment and notification.status in ('pending','failed')
      and notification.attempts<5 and notification.next_attempt_at<=now()
    order by notification.next_attempt_at,notification.id for update of notification skip locked limit 1;
  if not found then return null; end if;
  update public.xpress_teacher_review_notifications
    set status='processing',lease_id=p_lease,attempts=attempts+1,updated_at=now()
    where id=selected.id returning * into selected;
  return selected;
end $$;

create function public.finish_xpress_teacher_review_notification(
  p_notification uuid,p_lease uuid,p_success boolean,p_error text default null
) returns boolean language plpgsql security invoker set search_path='' as $$
declare current_attempts integer; changed integer;
begin
  select attempts into current_attempts from public.xpress_teacher_review_notifications
    where id=p_notification and status='processing' and lease_id=p_lease for update;
  if not found then return false; end if;
  update public.xpress_teacher_review_notifications set
    status=case when p_success then 'sent' when current_attempts>=5 then 'dead' else 'failed' end,
    lease_id=null,
    last_error=case when p_success then null else left(coalesce(p_error,'notification_failed'),300) end,
    next_attempt_at=case when p_success then next_attempt_at else now()+make_interval(mins=>least(60,(5*power(2,greatest(current_attempts-1,0)))::integer)) end,
    sent_at=case when p_success then now() else null end,
    updated_at=now()
  where id=p_notification and status='processing' and lease_id=p_lease;
  get diagnostics changed=row_count;
  return changed=1;
end $$;

revoke all on function public.enqueue_xpress_teacher_review_notifications() from public,anon,authenticated;
revoke all on function public.claim_xpress_teacher_review_notification(uuid,text) from public,anon,authenticated;
revoke all on function public.finish_xpress_teacher_review_notification(uuid,uuid,boolean,text) from public,anon,authenticated;
grant execute on function public.claim_xpress_teacher_review_notification(uuid,text) to service_role;
grant execute on function public.finish_xpress_teacher_review_notification(uuid,uuid,boolean,text) to service_role;

-- A reviewer whose calibration was revoked cannot keep or finish a lease.
create or replace function public.renew_xpress_teacher_review_lease(p_review uuid,p_reviewer uuid,p_lease uuid)
returns boolean language plpgsql security invoker set search_path='' as $$
declare renewed integer;
begin
  update public.xpress_teacher_reviews review
    set lease_expires_at=now()+interval '15 minutes',updated_at=now()
    where review.id=p_review and review.status='in_review' and review.assigned_to=p_reviewer
      and review.lease_id=p_lease and review.lease_expires_at>now()
      and exists(select 1 from public.xpress_teacher_reviewers reviewer
        where reviewer.reviewer_id=p_reviewer and reviewer.status='active'
          and reviewer.rubric_version=review.rubric_version
          and reviewer.calibrated_at<=now() and reviewer.calibration_expires_at>now());
  get diagnostics renewed=row_count;
  return renewed=1;
end $$;

create or replace function public.finish_xpress_teacher_review_v2(
  p_review uuid,p_reviewer uuid,p_lease uuid,p_completion_key uuid,p_outcome text,
  p_result jsonb,p_result_hash text,p_error text default null
) returns boolean language plpgsql security invoker set search_path='' as $$
declare current_review public.xpress_teacher_reviews;
begin
  if p_review is null or p_reviewer is null or p_lease is null or p_completion_key is null
    or p_outcome not in ('needs_qa','failed')
    or p_result is not null or p_result_hash is not null
    or (p_outcome='failed' and nullif(left(coalesce(p_error,''),300),'') is null)
  then raise exception 'invalid_teacher_review_completion'; end if;
  select * into current_review from public.xpress_teacher_reviews where id=p_review for update;
  if not found then return false; end if;
  if current_review.completion_idempotency_key=p_completion_key then
    if current_review.completion_reviewer_id<>p_reviewer or current_review.completion_lease_id<>p_lease
      or current_review.completion_outcome<>p_outcome or current_review.review_result is distinct from p_result
      or current_review.review_result_hash is distinct from p_result_hash
      or current_review.last_error is distinct from (case when p_outcome='failed' then left(p_error,300) else null end)
    then raise exception 'teacher_review_completion_drift'; end if;
    return true;
  end if;
  if not exists(select 1 from public.xpress_teacher_reviewers reviewer
    where reviewer.reviewer_id=p_reviewer and reviewer.status='active'
      and reviewer.rubric_version=current_review.rubric_version
      and reviewer.calibrated_at<=now() and reviewer.calibration_expires_at>now())
  then raise exception 'teacher_reviewer_not_calibrated'; end if;
  if current_review.status<>'in_review' or current_review.assigned_to<>p_reviewer
    or current_review.lease_id<>p_lease or current_review.lease_expires_at<=now() then return false; end if;
  update public.xpress_teacher_reviews set status=p_outcome,
    workflow_stage=case when p_outcome='needs_qa' then 'qa' else workflow_stage end,
    review_result=null,review_result_hash=null,
    completion_idempotency_key=p_completion_key,completion_outcome=p_outcome,
    completion_reviewer_id=p_reviewer,completion_lease_id=p_lease,
    completed_at=null,
    last_error=case when p_outcome='failed' then left(p_error,300) else null end,
    lease_id=null,lease_expires_at=null,updated_at=now()
  where id=p_review;
  return true;
end $$;

-- Environment-bound claims keep Sandbox and Production in separate queues.
-- A single atomic claim-next RPC prevents two admins from colliding on the
-- same oldest row while other eligible work remains available.
create function public.claim_xpress_teacher_review_v3(
  p_review uuid,p_reviewer uuid,p_lease uuid,p_environment text,p_stage text
) returns boolean language plpgsql security invoker set search_path='' as $$
declare claimed integer;
begin
  if p_review is null or p_reviewer is null or p_lease is null
    or p_environment not in ('sandbox','production') or p_stage not in ('review','qa')
  then raise exception 'invalid_teacher_review_claim'; end if;
  if not exists(select 1 from public.xpress_teacher_reviewers reviewer
    where reviewer.reviewer_id=p_reviewer and reviewer.status='active'
      and reviewer.rubric_version='icfes-teacher-rubric-2026-09-09-v1'
      and reviewer.calibrated_at<=now() and reviewer.calibration_expires_at>now())
  then raise exception 'teacher_reviewer_not_calibrated'; end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended('icfes-teacher-reviewer:'||p_reviewer::text,32));
  if exists(select 1 from public.xpress_teacher_reviews review
    where review.assigned_to=p_reviewer and review.status='in_review'
      and review.lease_expires_at>now() and review.id<>p_review)
  then raise exception 'teacher_reviewer_busy'; end if;
  update public.xpress_teacher_reviews review set
    status='in_review',assigned_to=p_reviewer,lease_id=p_lease,
    lease_expires_at=now()+interval '15 minutes',attempts=attempts+1,
    last_error=null,updated_at=now(),codex_handoff_lease_id=null,
    codex_handoff_payload_hash=null,codex_handoff_at=null,
    codex_model_reference=null,human_attested_at=null
  where review.id=p_review and review.environment=p_environment
    and review.rubric_version='icfes-teacher-rubric-2026-09-09-v1'
    and review.workflow_stage=p_stage
    and (
      (p_stage='review' and review.status in ('queued','failed'))
      or (p_stage='qa' and review.status in ('needs_qa','failed'))
      or (review.status='in_review' and review.lease_expires_at<=now())
    );
  get diagnostics claimed=row_count;
  return claimed=1;
end $$;

create function public.claim_next_xpress_teacher_review_v3(
  p_reviewer uuid,p_lease uuid,p_environment text
) returns uuid language plpgsql security invoker set search_path='' as $$
declare selected_review public.xpress_teacher_reviews;
begin
  if p_reviewer is null or p_lease is null or p_environment not in ('sandbox','production')
  then raise exception 'invalid_teacher_review_claim'; end if;
  if not exists(select 1 from public.xpress_teacher_reviewers reviewer
    where reviewer.reviewer_id=p_reviewer and reviewer.status='active'
      and reviewer.rubric_version='icfes-teacher-rubric-2026-09-09-v1'
      and reviewer.calibrated_at<=now() and reviewer.calibration_expires_at>now())
  then raise exception 'teacher_reviewer_not_calibrated'; end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended('icfes-teacher-reviewer:'||p_reviewer::text,32));
  if exists(select 1 from public.xpress_teacher_reviews review
    where review.assigned_to=p_reviewer and review.status='in_review' and review.lease_expires_at>now())
  then raise exception 'teacher_reviewer_busy'; end if;
  select review.* into selected_review from public.xpress_teacher_reviews review
  where review.environment=p_environment
    and review.rubric_version='icfes-teacher-rubric-2026-09-09-v1'
    and (
      (review.workflow_stage='review' and review.status in ('queued','failed'))
      or (review.workflow_stage='qa' and review.status in ('needs_qa','failed'))
      or (review.status='in_review' and review.lease_expires_at<=now())
    )
  order by review.due_at,review.requested_at,review.id
  for update skip locked limit 1;
  if not found then return null; end if;
  update public.xpress_teacher_reviews set
    status='in_review',assigned_to=p_reviewer,lease_id=p_lease,
    lease_expires_at=now()+interval '15 minutes',attempts=attempts+1,
    last_error=null,updated_at=now(),codex_handoff_lease_id=null,
    codex_handoff_payload_hash=null,codex_handoff_at=null,
    codex_model_reference=null,human_attested_at=null
  where id=selected_review.id;
  return selected_review.id;
end $$;

create function public.record_xpress_teacher_codex_handoff(
  p_review uuid,p_reviewer uuid,p_lease uuid,p_environment text,p_payload_hash text
) returns boolean language plpgsql security invoker set search_path='' as $$
declare current_review public.xpress_teacher_reviews;
begin
  if p_review is null or p_reviewer is null or p_lease is null
    or p_environment not in ('sandbox','production') or p_payload_hash !~ '^[0-9a-f]{64}$'
  then raise exception 'invalid_teacher_codex_handoff'; end if;
  select * into current_review from public.xpress_teacher_reviews
    where id=p_review and environment=p_environment for update;
  if not found or current_review.status<>'in_review' or current_review.assigned_to<>p_reviewer
    or current_review.lease_id<>p_lease or current_review.lease_expires_at<=now() then return false; end if;
  if not exists(select 1 from public.xpress_teacher_reviewers reviewer
    where reviewer.reviewer_id=p_reviewer and reviewer.status='active'
      and reviewer.rubric_version=current_review.rubric_version
      and reviewer.calibrated_at<=now() and reviewer.calibration_expires_at>now())
  then raise exception 'teacher_reviewer_not_calibrated'; end if;
  if current_review.codex_handoff_lease_id=p_lease then
    if current_review.codex_handoff_payload_hash<>p_payload_hash
    then raise exception 'teacher_codex_handoff_drift'; end if;
    return true;
  end if;
  update public.xpress_teacher_reviews set codex_handoff_lease_id=p_lease,
    codex_handoff_payload_hash=p_payload_hash,codex_handoff_at=now(),updated_at=now()
  where id=p_review;
  return true;
end $$;

create function public.complete_xpress_teacher_review_admin_v3(
  p_review uuid,p_reviewer uuid,p_lease uuid,p_completion_key uuid,p_environment text,
  p_result jsonb,p_result_hash text,p_codex_model text,p_human_attested boolean
) returns boolean language plpgsql security invoker set search_path='' as $$
declare current_review public.xpress_teacher_reviews;
begin
  if p_review is null or p_reviewer is null or p_lease is null or p_completion_key is null
    or p_environment not in ('sandbox','production') or p_human_attested is not true
    or nullif(btrim(coalesce(p_codex_model,'')),'') is null or length(p_codex_model)>120
    or p_codex_model ~ '[[:cntrl:]]'
    or jsonb_typeof(p_result)<>'object'
    or p_result->>'version'<>'icfes-teacher-review-result-2026-09-09-v1'
    or p_result->>'rubricVersion'<>'icfes-teacher-rubric-2026-09-09-v1'
    or p_result_hash !~ '^[0-9a-f]{64}$'
  then raise exception 'invalid_teacher_review_completion'; end if;
  select * into current_review from public.xpress_teacher_reviews
    where id=p_review and environment=p_environment for update;
  if not found then return false; end if;
  if current_review.completion_idempotency_key=p_completion_key then
    if current_review.completion_reviewer_id<>p_reviewer or current_review.completion_lease_id<>p_lease
      or current_review.completion_outcome<>'completed' or current_review.review_result is distinct from p_result
      or current_review.review_result_hash is distinct from p_result_hash
      or current_review.codex_model_reference is distinct from btrim(p_codex_model)
      or current_review.human_attested_at is null
    then raise exception 'teacher_review_completion_drift'; end if;
    return true;
  end if;
  if not exists(select 1 from public.xpress_teacher_reviewers reviewer
    where reviewer.reviewer_id=p_reviewer and reviewer.status='active'
      and reviewer.rubric_version=current_review.rubric_version
      and reviewer.calibrated_at<=now() and reviewer.calibration_expires_at>now())
  then raise exception 'teacher_reviewer_not_calibrated'; end if;
  if current_review.status<>'in_review' or current_review.assigned_to<>p_reviewer
    or current_review.lease_id<>p_lease or current_review.lease_expires_at<=now()
    or current_review.codex_handoff_lease_id<>p_lease
    or current_review.codex_handoff_payload_hash is null or current_review.codex_handoff_at is null
  then return false; end if;
  if exists(
    select 1 from jsonb_array_elements(p_result->'itemFeedback') feedback
    where not exists(
      select 1 from public.icfes_attempts attempt,
        jsonb_array_elements(attempt.question_snapshot->'exam'->'sections') section,
        jsonb_array_elements(section->'questions') question
      where attempt.id=current_review.icfes_attempt_id and question->>'id'=feedback->>'questionId'
    )
  ) then raise exception 'invalid_teacher_review_question_reference'; end if;
  update public.xpress_teacher_reviews set status='completed',review_result=p_result,
    review_result_hash=p_result_hash,completion_idempotency_key=p_completion_key,
    completion_outcome='completed',completion_reviewer_id=p_reviewer,
    completion_lease_id=p_lease,completed_at=now(),last_error=null,
    codex_model_reference=btrim(p_codex_model),human_attested_at=now(),
    lease_id=null,lease_expires_at=null,updated_at=now()
  where id=p_review;
  return true;
end $$;

create function public.retry_xpress_teacher_review_notification(
  p_notification uuid,p_environment text
) returns boolean language plpgsql security invoker set search_path='' as $$
declare changed integer;
begin
  if p_notification is null or p_environment not in ('sandbox','production')
  then raise exception 'invalid_teacher_notification_retry'; end if;
  update public.xpress_teacher_review_notifications notification set
    status='pending',attempts=0,lease_id=null,next_attempt_at=now(),
    last_error=null,sent_at=null,updated_at=now()
  where notification.id=p_notification and notification.status='dead'
    and exists(select 1 from public.xpress_teacher_reviews review
      where review.id=notification.review_id and review.environment=p_environment);
  get diagnostics changed=row_count;
  return changed=1;
end $$;

revoke execute on function public.claim_xpress_teacher_review(uuid,uuid,uuid) from service_role;
revoke execute on function public.claim_xpress_teacher_review_qa(uuid,uuid,uuid) from service_role;
drop function if exists public.finish_xpress_teacher_review(uuid,uuid,text,text);
revoke all on function public.claim_xpress_teacher_review_v3(uuid,uuid,uuid,text,text) from public,anon,authenticated,service_role;
revoke all on function public.claim_next_xpress_teacher_review_v3(uuid,uuid,text) from public,anon,authenticated,service_role;
revoke all on function public.record_xpress_teacher_codex_handoff(uuid,uuid,uuid,text,text) from public,anon,authenticated,service_role;
revoke all on function public.complete_xpress_teacher_review_admin_v3(uuid,uuid,uuid,uuid,text,jsonb,text,text,boolean) from public,anon,authenticated,service_role;
revoke all on function public.retry_xpress_teacher_review_notification(uuid,text) from public,anon,authenticated,service_role;
grant execute on function public.claim_xpress_teacher_review_v3(uuid,uuid,uuid,text,text) to service_role;
grant execute on function public.claim_next_xpress_teacher_review_v3(uuid,uuid,text) to service_role;
grant execute on function public.record_xpress_teacher_codex_handoff(uuid,uuid,uuid,text,text) to service_role;
grant execute on function public.complete_xpress_teacher_review_admin_v3(uuid,uuid,uuid,uuid,text,jsonb,text,text,boolean) to service_role;
grant execute on function public.retry_xpress_teacher_review_notification(uuid,text) to service_role;

comment on table public.xpress_teacher_reviews is 'One-credit ICFES human review queue; new requests use a capacity-backed 12-hour operating target.';
comment on table public.xpress_teacher_review_notifications is 'Durable, retryable owner and learner email outbox for the ICFES human review loop.';
