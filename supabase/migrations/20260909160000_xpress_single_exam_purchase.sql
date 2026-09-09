-- Adds a durable one-exam purchase while preserving existing 30-day memberships.
alter table public.profiles
  drop constraint if exists profiles_xpress_plan_interest_check,
  add constraint profiles_xpress_plan_interest_check
    check (xpress_plan_interest is null or xpress_plan_interest in ('exam-single', 'exam-auto', 'exam-teacher'));

alter table public.xpress_orders
  drop constraint if exists xpress_orders_offer_id_check,
  add constraint xpress_orders_offer_id_check
    check (offer_id in ('exam-single', 'exam-auto', 'exam-teacher')),
  drop constraint if exists xpress_orders_order_kind_check,
  add constraint xpress_orders_order_kind_check
    check (order_kind in ('single', 'new', 'upgrade')),
  drop constraint if exists xpress_orders_check1,
  add constraint xpress_orders_offer_quote_check check (
    (
      offer_version='xpress-2026-09-08-v2'
      and (
        order_kind='new' and credit_in_cents=0 and coverage_ends_at is null
          and ((offer_id='exam-auto' and amount_in_cents=4900000) or (offer_id='exam-teacher' and amount_in_cents=9900000))
        or order_kind='upgrade' and offer_id='exam-teacher' and credit_in_cents=4900000
          and amount_in_cents=5000000 and coverage_ends_at>expires_at
      )
    )
    or (
      offer_version='xpress-2026-09-09-v3'
      and (
        order_kind='single' and offer_id='exam-single' and credit_in_cents=0
          and amount_in_cents=1200000 and coverage_ends_at is null
        or order_kind='new' and credit_in_cents=0 and coverage_ends_at is null
          and ((offer_id='exam-auto' and amount_in_cents=4900000) or (offer_id='exam-teacher' and amount_in_cents=9900000))
        or order_kind='upgrade' and offer_id='exam-teacher' and credit_in_cents=4900000
          and amount_in_cents=5000000 and coverage_ends_at>expires_at
      )
    )
  );

create table public.xpress_exam_credits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  source_order_id uuid not null unique references public.xpress_orders(id),
  credited_provider_id text not null,
  environment text not null check (environment in ('sandbox','production')),
  exam_slug text not null check (exam_slug in ('ielts','toefl','sat','icfes','cambridge-b2','goethe','delf-dalf','cils-celi','topik','celpe-bras')),
  status text not null default 'active' check (status in ('active','consumed','revoked')),
  granted_at timestamptz not null,
  consumed_at timestamptz,
  consumed_submission_id uuid references public.exam_submissions(id),
  revoked_at timestamptz,
  created_at timestamptz not null default now(),
  check (
    (status='active' and consumed_at is null and consumed_submission_id is null and revoked_at is null)
    or (status='consumed' and consumed_at is not null and consumed_submission_id is not null and revoked_at is null)
    or (status='revoked' and revoked_at is not null)
  )
);

create index xpress_exam_credits_available_user
  on public.xpress_exam_credits(user_id, environment, exam_slug, granted_at)
  where status='active';
create unique index xpress_exam_credits_consumed_submission
  on public.xpress_exam_credits(consumed_submission_id)
  where consumed_submission_id is not null;

alter table public.xpress_exam_credits enable row level security;
revoke all on public.xpress_exam_credits from public, anon, authenticated, service_role;
grant select, insert on public.xpress_exam_credits to service_role;
grant update(status, consumed_at, consumed_submission_id, revoked_at) on public.xpress_exam_credits to service_role;

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

create or replace function public.record_xpress_payment(
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
    if selected_order.order_kind='single' then
      insert into public.xpress_exam_credits(
        user_id,source_order_id,credited_provider_id,environment,exam_slug,granted_at
      ) values(
        selected_order.user_id,selected_order.id,approved_provider,selected_order.environment,selected_order.exam_slug,approved_at
      ) on conflict(source_order_id) do nothing;
    else
      membership_end:=case when selected_order.order_kind='upgrade' then selected_order.coverage_ends_at else approved_at+interval '30 days' end;
      insert into public.xpress_memberships(
        user_id,source_order_id,credited_provider_id,environment,exam_slug,offer_id,grant_kind,starts_at,ends_at
      ) values(
        selected_order.user_id,selected_order.id,approved_provider,selected_order.environment,selected_order.exam_slug,
        selected_order.offer_id,selected_order.order_kind,approved_at,membership_end
      ) on conflict(source_order_id) do nothing;
    end if;
    insert into public.xpress_fulfillment_jobs(order_id,kind) values(selected_order.id,'student_receipt') on conflict do nothing;
    insert into public.xpress_fulfillment_jobs(order_id,kind) values(selected_order.id,'owner_notification') on conflict do nothing;
  else
    update public.xpress_memberships set status='revoked',revoked_at=now()
      where source_order_id=selected_order.id and status='active';
    update public.xpress_exam_credits set status='revoked',revoked_at=now()
      where source_order_id=selected_order.id and status='active';
  end if;
  if approved_count>1 or p_status='VOIDED' then
    insert into public.xpress_fulfillment_jobs(order_id,kind) values(selected_order.id,'financial_review') on conflict do nothing;
  end if;
  return selected_order.id;
end $$;

create function public.consume_xpress_exam_credit(p_user uuid, p_exam text, p_submission uuid)
returns uuid language plpgsql security invoker set search_path='' as $$
declare selected_credit public.xpress_exam_credits;
begin
  if p_user is null or p_submission is null then raise exception 'invalid_credit_consumption'; end if;
  select * into selected_credit from public.xpress_exam_credits
    where consumed_submission_id=p_submission;
  if found then
    if selected_credit.user_id<>p_user or selected_credit.exam_slug<>p_exam then raise exception 'credit_submission_mismatch'; end if;
    return selected_credit.id;
  end if;
  select * into selected_credit from public.xpress_exam_credits
    where user_id=p_user and exam_slug=p_exam and status='active'
    order by granted_at,id for update skip locked limit 1;
  if not found then raise exception 'xpress_credit_unavailable'; end if;
  update public.xpress_exam_credits
    set status='consumed',consumed_at=now(),consumed_submission_id=p_submission
    where id=selected_credit.id;
  return selected_credit.id;
end $$;

revoke all on function public.consume_xpress_exam_credit(uuid,text,uuid) from public, anon, authenticated;
grant execute on function public.consume_xpress_exam_credit(uuid,text,uuid) to service_role;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  display_name text;
  requested_path text;
  requested_language text;
  requested_exam text;
  requested_plan text;
begin
  display_name := coalesce(new.raw_user_meta_data ->> 'full_name',new.raw_user_meta_data ->> 'name',split_part(new.email, '@', 1));
  requested_path := new.raw_user_meta_data ->> 'student_path';
  requested_language := new.raw_user_meta_data ->> 'language';
  requested_exam := new.raw_user_meta_data ->> 'target_exam';
  requested_plan := new.raw_user_meta_data ->> 'xpress_plan_interest';
  if requested_path not in ('welearn', 'exam') then requested_path := null; end if;
  if requested_language not in ('ingles', 'coreano', 'frances', 'aleman', 'italiano', 'portugues', 'japones', 'ruso') then requested_language := null; end if;
  if requested_exam not in ('ielts', 'toefl', 'sat', 'icfes', 'cambridge-b2', 'goethe', 'delf-dalf', 'cils-celi', 'topik', 'celpe-bras') then requested_exam := null; end if;
  if requested_plan not in ('exam-single', 'exam-auto', 'exam-teacher') then requested_plan := null; end if;
  if requested_path = 'welearn' and requested_language is null then requested_path := null; end if;
  if requested_path = 'exam' and (requested_language is null or requested_exam is null or requested_plan is null) then requested_path := null; end if;
  insert into public.profiles (
    id, name, full_name, email, avatar_url, enrolled_at,
    student_path, language, subject, target_exam, xpress_plan_interest, onboarding_completed_at
  ) values (
    new.id,display_name,display_name,new.email,new.raw_user_meta_data ->> 'avatar_url',now(),
    requested_path,requested_language,
    case when requested_path = 'exam' then requested_exam else requested_language end,
    case when requested_path = 'exam' then requested_exam else null end,
    case when requested_path = 'exam' then requested_plan else null end,
    case when requested_path is not null then now() else null end
  );
  return new;
end;
$$;

revoke execute on function public.handle_new_user() from public, anon, authenticated;

comment on table public.xpress_exam_credits is 'One durable exam attempt granted only after an approved Wompi payment.';
comment on table public.xpress_orders is 'Immutable purchase intents for one exam, a 30-day membership, or a same-period upgrade.';
