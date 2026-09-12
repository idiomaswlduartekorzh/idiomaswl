-- New public prices and transparent AI-assisted feedback contract.
-- Existing orders and subscriptions keep their immutable v2-v4 commercial terms.
alter table public.xpress_subscriptions
  drop constraint if exists xpress_subscriptions_offer_version_check,
  drop constraint if exists xpress_subscriptions_check,
  drop constraint if exists xpress_subscriptions_offer_amount_check_v5,
  add constraint xpress_subscriptions_offer_version_check
    check (offer_version in ('xpress-2026-09-12-v4','xpress-2026-09-12-v5')),
  add constraint xpress_subscriptions_offer_amount_check_v5 check (
    offer_version='xpress-2026-09-12-v4' and (
      offer_id='exam-auto' and amount_in_cents=4900000
      or offer_id='exam-teacher' and amount_in_cents=9900000
    )
    or offer_version='xpress-2026-09-12-v5' and (
      offer_id='exam-auto' and amount_in_cents=4990000
      or offer_id='exam-teacher' and amount_in_cents=9990000
    )
  );

alter table public.xpress_orders
  drop constraint if exists xpress_orders_offer_quote_check,
  add constraint xpress_orders_offer_quote_check check (
    offer_version='xpress-2026-09-08-v2'
      and subscription_id is null and billing_period_start is null and billing_period_end is null
      and (
        order_kind='new' and credit_in_cents=0 and coverage_ends_at is null
          and (offer_id='exam-auto' and amount_in_cents=4900000 or offer_id='exam-teacher' and amount_in_cents=9900000)
        or order_kind='upgrade' and offer_id='exam-teacher' and credit_in_cents=4900000
          and amount_in_cents=5000000 and coverage_ends_at>expires_at
      )
    or offer_version='xpress-2026-09-09-v3'
      and subscription_id is null and billing_period_start is null and billing_period_end is null
      and (
        order_kind='single' and offer_id='exam-single' and credit_in_cents=0 and amount_in_cents=1200000 and coverage_ends_at is null
        or order_kind='new' and credit_in_cents=0 and coverage_ends_at is null
          and (offer_id='exam-auto' and amount_in_cents=4900000 or offer_id='exam-teacher' and amount_in_cents=9900000)
        or order_kind='upgrade' and offer_id='exam-teacher' and credit_in_cents=4900000
          and amount_in_cents=5000000 and coverage_ends_at>expires_at
      )
    or offer_version='xpress-2026-09-12-v4' and (
      order_kind='single' and offer_id='exam-single' and credit_in_cents=0 and amount_in_cents=1200000
        and coverage_ends_at is null and subscription_id is null and billing_period_start is null and billing_period_end is null
      or order_kind in ('subscription_start','renewal') and offer_id in ('exam-auto','exam-teacher')
        and credit_in_cents=0 and subscription_id is not null and billing_period_start is not null
        and billing_period_end=billing_period_start+interval '30 days' and coverage_ends_at=billing_period_end
        and (offer_id='exam-auto' and amount_in_cents=4900000 or offer_id='exam-teacher' and amount_in_cents=9900000)
    )
    or offer_version='xpress-2026-09-12-v5' and (
      order_kind='single' and offer_id='exam-single' and credit_in_cents=0 and amount_in_cents=1290000
        and coverage_ends_at is null and subscription_id is null and billing_period_start is null and billing_period_end is null
      or order_kind in ('subscription_start','renewal') and offer_id in ('exam-auto','exam-teacher')
        and credit_in_cents=0 and subscription_id is not null and billing_period_start is not null
        and billing_period_end=billing_period_start+interval '30 days' and coverage_ends_at=billing_period_end
        and (offer_id='exam-auto' and amount_in_cents=4990000 or offer_id='exam-teacher' and amount_in_cents=9990000)
    )
  );

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
    or p_offer_version='xpress-2026-09-12-v5' and p_terms='xpress-20260912-v4'
  ) or p_privacy<>'xpress-privacy-20260908-v1' then raise exception 'invalid_offer_version'; end if;
  if p_exam not in ('ielts','toefl','sat','icfes','cambridge-b2','goethe','delf-dalf','cils-celi','topik','celpe-bras') then raise exception 'invalid_exam'; end if;
  if not (
    p_offer_version='xpress-2026-09-08-v2' and (
      p_kind='new' and p_credit=0 and p_coverage_ends is null
        and (p_offer='exam-auto' and p_amount=4900000 or p_offer='exam-teacher' and p_amount=9900000)
      or p_kind='upgrade' and p_offer='exam-teacher' and p_credit=4900000 and p_amount=5000000 and p_coverage_ends>now()+interval '20 minutes'
    )
    or p_offer_version='xpress-2026-09-09-v3' and (
      p_kind='single' and p_offer='exam-single' and p_credit=0 and p_amount=1200000 and p_coverage_ends is null
      or p_kind='new' and p_credit=0 and p_coverage_ends is null
        and (p_offer='exam-auto' and p_amount=4900000 or p_offer='exam-teacher' and p_amount=9900000)
      or p_kind='upgrade' and p_offer='exam-teacher' and p_credit=4900000 and p_amount=5000000 and p_coverage_ends>now()+interval '20 minutes'
    )
    or p_offer_version='xpress-2026-09-12-v4' and p_kind='single' and p_offer='exam-single'
      and p_credit=0 and p_amount=1200000 and p_coverage_ends is null
    or p_offer_version='xpress-2026-09-12-v5' and p_kind='single' and p_offer='exam-single'
      and p_credit=0 and p_amount=1290000 and p_coverage_ends is null
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

create or replace function public.prepare_xpress_subscription(
  p_user uuid,p_email text,p_key uuid,p_environment text,p_offer_version text,p_offer text,p_exam text,p_amount bigint,
  p_initial_charge_at timestamptz,p_terms text,p_privacy text,p_recurring text,p_legal jsonb
)
returns public.xpress_subscriptions language plpgsql security invoker set search_path='' as $$
declare result public.xpress_subscriptions; open_subscription public.xpress_subscriptions;
begin
  if p_user is null or p_email is null or p_email<>lower(p_email) then raise exception 'invalid_subscription_identity'; end if;
  if not (
    p_offer_version='xpress-2026-09-12-v4' and p_terms='xpress-20260912-v3' and p_recurring='xpress-recurring-30d-20260912-v1'
    or p_offer_version='xpress-2026-09-12-v5' and p_terms='xpress-20260912-v4' and p_recurring='xpress-recurring-30d-20260912-v2'
  ) or p_privacy<>'xpress-privacy-20260908-v1' then raise exception 'invalid_subscription_version'; end if;
  if p_exam not in ('ielts','toefl','sat','icfes','cambridge-b2','goethe','delf-dalf','cils-celi','topik','celpe-bras') then raise exception 'invalid_exam'; end if;
  if not (
    p_offer_version='xpress-2026-09-12-v4' and (p_offer='exam-auto' and p_amount=4900000 or p_offer='exam-teacher' and p_amount=9900000)
    or p_offer_version='xpress-2026-09-12-v5' and (p_offer='exam-auto' and p_amount=4990000 or p_offer='exam-teacher' and p_amount=9990000)
  ) then raise exception 'invalid_subscription_quote'; end if;
  if p_initial_charge_at is null or p_initial_charge_at<now()-interval '1 minute' then raise exception 'invalid_initial_charge'; end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_user::text, 12));
  select * into result from public.xpress_subscriptions where user_id=p_user and environment=p_environment and idempotency_key=p_key;
  if found then
    if result.offer_version<>p_offer_version or result.offer_id<>p_offer or result.exam_slug<>p_exam or result.amount_in_cents<>p_amount
      or result.terms_version<>p_terms or result.privacy_version<>p_privacy or result.recurring_consent_version<>p_recurring
      or result.legal_snapshot<>p_legal then raise exception 'idempotency_conflict'; end if;
    return result;
  end if;
  select * into open_subscription from public.xpress_subscriptions
    where user_id=p_user and environment=p_environment and status<>'canceled' order by created_at desc limit 1;
  if found then
    if open_subscription.status='creating_source' and open_subscription.offer_version=p_offer_version
      and open_subscription.offer_id=p_offer and open_subscription.exam_slug=p_exam and open_subscription.amount_in_cents=p_amount
      and open_subscription.terms_version=p_terms and open_subscription.privacy_version=p_privacy
      and open_subscription.recurring_consent_version=p_recurring
    then return open_subscription; end if;
    raise exception 'xpress_subscription_exists';
  end if;
  insert into public.xpress_subscriptions(user_id,purchaser_email,idempotency_key,environment,offer_version,offer_id,exam_slug,
    amount_in_cents,initial_charge_at,next_charge_at,terms_version,privacy_version,recurring_consent_version,legal_snapshot)
  values(p_user,p_email,p_key,p_environment,p_offer_version,p_offer,p_exam,p_amount,p_initial_charge_at,null,p_terms,p_privacy,p_recurring,p_legal)
  returning * into result;
  return result;
end $$;

create table public.xpress_personalized_feedback_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  membership_id uuid not null references public.xpress_memberships(id),
  submission_id uuid not null unique references public.exam_submissions(id),
  exam_slug text not null check (exam_slug in ('ielts','toefl','sat','icfes','cambridge-b2','goethe','delf-dalf','cils-celi','topik','celpe-bras')),
  status text not null default 'pending' check (status in ('pending','processing','completed','failed')),
  generated_report jsonb,
  last_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz,
  check (status='completed' and generated_report is not null and completed_at is not null or status<>'completed')
);
create index xpress_personalized_feedback_user_date on public.xpress_personalized_feedback_requests(user_id,created_at desc);
create index xpress_personalized_feedback_pending on public.xpress_personalized_feedback_requests(created_at) where status in ('pending','failed');
alter table public.xpress_personalized_feedback_requests enable row level security;
revoke all on public.xpress_personalized_feedback_requests from public,anon,authenticated,service_role;
grant select,insert on public.xpress_personalized_feedback_requests to service_role;
grant update(status,generated_report,last_error,updated_at,completed_at) on public.xpress_personalized_feedback_requests to service_role;

comment on table public.xpress_personalized_feedback_requests is
  'Private queue for AI-assisted WeLearn feedback. It does not represent a human teacher review or an official exam score.';
