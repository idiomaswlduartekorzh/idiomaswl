-- Canonical per-exam access ledger for non-payment grants. Paid access remains
-- evidenced by xpress_memberships; this table records the one free exam and
-- explicit WeLearn academic assignments.
create table public.exam_access_grants (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  exam_slug text not null check (
    exam_slug in ('ielts','toefl','sat','icfes','cambridge-b2','goethe','delf-dalf','cils-celi','topik','celpe-bras')
  ),
  source text not null check (source in ('autodidacta-free','welearn')),
  plan_id text not null check (plan_id in ('exam-free','welearn-full')),
  status text not null default 'active' check (status in ('active','completed','revoked')),
  starts_at timestamptz not null default now(),
  ends_at timestamptz,
  source_reference text,
  created_by uuid references auth.users(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_at is null or ends_at > starts_at),
  check (
    source='autodidacta-free' and plan_id='exam-free' and ends_at is null
    or source='welearn' and plan_id='welearn-full'
  )
);

-- A free exam is a lifetime acquisition rule. Revoking a grant does not make a
-- second free exam available.
create unique index exam_access_grants_one_free_exam_per_user
  on public.exam_access_grants(user_id)
  where source='autodidacta-free';

create unique index exam_access_grants_one_active_source
  on public.exam_access_grants(user_id,exam_slug,source)
  where status='active';

create index exam_access_grants_user_exam
  on public.exam_access_grants(user_id,exam_slug,status,starts_at desc);

alter table public.exam_access_grants enable row level security;
revoke all on table public.exam_access_grants from public,anon,authenticated,service_role;
grant select,insert on table public.exam_access_grants to service_role;
grant update(status,ends_at,source_reference,metadata,updated_at)
  on table public.exam_access_grants to service_role;

comment on table public.exam_access_grants is
  'Private non-payment access ledger. Browser metadata is never an authorization source.';

-- Paid subscriptions are independent per exam. Historical rows and payment
-- evidence remain unchanged.
alter table public.profiles
  drop constraint if exists profiles_xpress_plan_interest_check,
  add constraint profiles_xpress_plan_interest_check check (
    xpress_plan_interest is null or xpress_plan_interest in (
      'exam-free','exam-basic','exam-auto','exam-teacher','exam-single'
    )
  );

alter table public.xpress_subscriptions
  drop constraint if exists xpress_subscriptions_offer_id_check,
  drop constraint if exists xpress_subscriptions_offer_version_check,
  drop constraint if exists xpress_subscriptions_offer_amount_check_v5,
  add constraint xpress_subscriptions_offer_id_check
    check (offer_id in ('exam-basic','exam-auto','exam-teacher')),
  add constraint xpress_subscriptions_offer_version_check
    check (offer_version in ('xpress-2026-09-12-v4','xpress-2026-09-12-v5','xpress-2026-10-20-v8')),
  add constraint xpress_subscriptions_offer_amount_check_v8 check (
    offer_version='xpress-2026-09-12-v4' and (
      offer_id='exam-auto' and amount_in_cents=4900000
      or offer_id='exam-teacher' and amount_in_cents=9900000
    )
    or offer_version='xpress-2026-09-12-v5' and (
      offer_id='exam-auto' and amount_in_cents=4990000
      or offer_id='exam-teacher' and amount_in_cents=9990000
    )
    or offer_version='xpress-2026-10-20-v8' and (
      offer_id='exam-basic' and amount_in_cents=1590000
      or offer_id='exam-auto' and amount_in_cents=4990000
      or offer_id='exam-teacher' and amount_in_cents=9990000
    )
  );

alter table public.xpress_orders
  drop constraint if exists xpress_orders_offer_id_check,
  drop constraint if exists xpress_orders_offer_quote_check,
  add constraint xpress_orders_offer_id_check
    check (offer_id in ('exam-single','exam-basic','exam-auto','exam-teacher')),
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
    or offer_version='xpress-2026-10-20-v8'
      and order_kind in ('subscription_start','renewal')
      and offer_id in ('exam-basic','exam-auto','exam-teacher')
      and credit_in_cents=0 and subscription_id is not null and billing_period_start is not null
      and billing_period_end=billing_period_start+interval '30 days' and coverage_ends_at=billing_period_end
      and (
        offer_id='exam-basic' and amount_in_cents=1590000
        or offer_id='exam-auto' and amount_in_cents=4990000
        or offer_id='exam-teacher' and amount_in_cents=9990000
      )
  );

alter table public.xpress_memberships
  drop constraint if exists xpress_memberships_offer_id_check,
  add constraint xpress_memberships_offer_id_check
    check (offer_id in ('exam-basic','exam-auto','exam-teacher'));

alter table public.xpress_submission_access
  drop constraint if exists xpress_submission_access_offer_id_check,
  drop constraint if exists xpress_submission_access_check,
  add constraint xpress_submission_access_offer_id_check
    check (offer_id in ('exam-single','exam-basic','exam-auto','exam-teacher')),
  add constraint xpress_submission_access_check check (
    access_kind='membership' and membership_id is not null and credit_id is null
      and offer_id in ('exam-basic','exam-auto','exam-teacher') and personalized_feedback=(offer_id='exam-teacher')
    or access_kind='single-credit' and membership_id is null and credit_id is not null
      and offer_id='exam-single' and personalized_feedback=false
  );

drop index if exists public.xpress_subscriptions_one_open_user;
create unique index xpress_subscriptions_one_open_user_exam
  on public.xpress_subscriptions(user_id,environment,exam_slug)
  where status<>'canceled';

-- All acquisitions for a user serialize on the same advisory key. This closes
-- the race where a paid membership and a first free claim arrive together.
create function public.lock_exam_access_membership_user()
returns trigger language plpgsql security invoker set search_path='' as $$
begin
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(new.user_id::text,73));
  return new;
end $$;

create trigger lock_exam_access_membership_user
  before insert on public.xpress_memberships
  for each row execute function public.lock_exam_access_membership_user();

revoke all on function public.lock_exam_access_membership_user()
  from public,anon,authenticated;

-- Human review is a separate operational entitlement from automated feedback.
-- Autodidacta ($49.900) has exactly five requests per paid membership period;
-- Pro is intentionally not assigned an invented numeric cap because the approved
-- offer promises human review plus an improvement plan without stating a count.
create table public.xpress_human_review_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  membership_id uuid not null references public.xpress_memberships(id),
  submission_id uuid not null unique references public.exam_submissions(id),
  environment text not null check (environment in ('sandbox','production')),
  exam_slug text not null check (
    exam_slug in ('ielts','toefl','sat','icfes','cambridge-b2','goethe','delf-dalf','cils-celi','topik','celpe-bras')
  ),
  review_kind text not null check (review_kind in ('writing','speaking')),
  status text not null default 'pending' check (status in ('pending','assigned','completed','declined')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz,
  check (status='completed' and completed_at is not null or status<>'completed')
);
create index xpress_human_review_membership_period
  on public.xpress_human_review_requests(membership_id,created_at);
create index xpress_human_review_queue
  on public.xpress_human_review_requests(status,created_at)
  where status in ('pending','assigned');
alter table public.xpress_human_review_requests enable row level security;
revoke all on public.xpress_human_review_requests from public,anon,authenticated,service_role;
grant select,insert on public.xpress_human_review_requests to service_role;
grant update(status,updated_at,completed_at) on public.xpress_human_review_requests to service_role;

create function public.request_xpress_human_review(
  p_user uuid,p_submission uuid,p_kind text,p_environment text
)
returns public.xpress_human_review_requests
language plpgsql security invoker set search_path='' as $$
declare
  selected_submission public.exam_submissions;
  selected_membership public.xpress_memberships;
  existing_request public.xpress_human_review_requests;
  used_requests integer;
  result public.xpress_human_review_requests;
begin
  if p_user is null or p_submission is null or p_kind not in ('writing','speaking')
    or p_environment not in ('sandbox','production') then
    raise exception 'invalid_human_review_request';
  end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_user::text,91));
  select * into selected_submission from public.exam_submissions
    where id=p_submission and user_id=p_user and submission_status='submitted';
  if not found then raise exception 'submission_not_owned'; end if;
  select * into existing_request from public.xpress_human_review_requests
    where submission_id=p_submission;
  if found then return existing_request; end if;
  select membership.* into selected_membership from public.xpress_memberships membership
    where membership.user_id=p_user and membership.environment=p_environment
      and membership.exam_slug=selected_submission.exam_slug and membership.status='active'
      and membership.offer_id in ('exam-auto','exam-teacher')
      and membership.starts_at<=now() and membership.ends_at>now()
    order by membership.offer_id='exam-teacher' desc,membership.starts_at desc limit 1;
  if not found then raise exception 'human_review_not_included'; end if;
  if selected_membership.offer_id='exam-auto' then
    select count(*) into used_requests from public.xpress_human_review_requests
      where membership_id=selected_membership.id
        and created_at>=selected_membership.starts_at and created_at<selected_membership.ends_at;
    if used_requests>=5 then raise exception 'human_review_quota_exhausted'; end if;
  end if;
  insert into public.xpress_human_review_requests(
    user_id,membership_id,submission_id,environment,exam_slug,review_kind
  ) values (
    p_user,selected_membership.id,p_submission,p_environment,selected_submission.exam_slug,p_kind
  ) returning * into result;
  return result;
end $$;
revoke all on function public.request_xpress_human_review(uuid,uuid,text,text)
  from public,anon,authenticated;
grant execute on function public.request_xpress_human_review(uuid,uuid,text,text)
  to service_role;

-- Claiming Gratis is service-only, atomic and restricted to autonomous profiles.
-- The selected exam may change until this function commits the first activity.
create function public.claim_free_exam_access(p_user uuid,p_exam text)
returns public.exam_access_grants language plpgsql security invoker set search_path='' as $$
declare
  selected_profile public.profiles;
  existing_grant public.exam_access_grants;
  result public.exam_access_grants;
begin
  if p_user is null or p_exam not in (
    'ielts','toefl','sat','icfes','cambridge-b2','goethe','delf-dalf','cils-celi','topik','celpe-bras'
  ) then
    raise exception 'invalid_free_exam_claim';
  end if;

  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_user::text,73));

  select * into selected_profile from public.profiles where id=p_user for update;
  if not found or selected_profile.student_path<>'exam' then
    raise exception 'free_exam_not_available';
  end if;

  select * into existing_grant from public.exam_access_grants
    where user_id=p_user and source='autodidacta-free'
    order by created_at limit 1;
  if found then
    if existing_grant.exam_slug=p_exam and existing_grant.status='active' then return existing_grant; end if;
    raise exception 'free_exam_already_claimed';
  end if;

  if exists(select 1 from public.xpress_memberships where user_id=p_user)
    or exists(select 1 from public.xpress_subscriptions where user_id=p_user and status<>'canceled')
    or exists(select 1 from public.exam_access_grants where user_id=p_user and source='welearn') then
    raise exception 'free_exam_requires_first_access';
  end if;

  update public.profiles
    set target_exam=p_exam,subject=p_exam,xpress_plan_interest='exam-free'
    where id=p_user;

  insert into public.exam_access_grants(user_id,exam_slug,source,plan_id)
    values(p_user,p_exam,'autodidacta-free','exam-free')
    returning * into result;
  return result;
end $$;

revoke all on function public.claim_free_exam_access(uuid,text)
  from public,anon,authenticated,service_role;
grant execute on function public.claim_free_exam_access(uuid,text) to service_role;

-- Academic access is explicit and auditable. The caller must be trusted server
-- code that has verified the WeLearn enrollment or an authorized admin action.
create function public.grant_welearn_exam_access(
  p_user uuid,p_exam text,p_source_reference text,p_created_by uuid default null
)
returns public.exam_access_grants language plpgsql security invoker set search_path='' as $$
declare
  existing_grant public.exam_access_grants;
  result public.exam_access_grants;
begin
  if p_user is null or p_exam not in (
    'ielts','toefl','sat','icfes','cambridge-b2','goethe','delf-dalf','cils-celi','topik','celpe-bras'
  ) or p_source_reference is null or length(trim(p_source_reference)) not between 1 and 240 then
    raise exception 'invalid_welearn_exam_grant';
  end if;

  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_user::text,73));
  if not exists(select 1 from public.profiles where id=p_user and student_path='welearn') then
    raise exception 'welearn_profile_required';
  end if;

  select * into existing_grant from public.exam_access_grants
    where user_id=p_user and exam_slug=p_exam and source='welearn' and status='active'
    order by created_at desc limit 1;
  if found then return existing_grant; end if;

  insert into public.exam_access_grants(
    user_id,exam_slug,source,plan_id,source_reference,created_by
  ) values(
    p_user,p_exam,'welearn','welearn-full',trim(p_source_reference),p_created_by
  ) returning * into result;

  update public.profiles set target_exam=p_exam where id=p_user;
  return result;
end $$;

revoke all on function public.grant_welearn_exam_access(uuid,text,text,uuid)
  from public,anon,authenticated,service_role;
grant execute on function public.grant_welearn_exam_access(uuid,text,text,uuid) to service_role;

-- Existing paid course enrollments predate this entitlement ledger. Backfill
-- only approved/enrolled orders whose stored objective names an exam program.
insert into public.exam_access_grants(
  user_id,exam_slug,source,plan_id,source_reference,metadata
)
select course.user_id,
  case course.selection->>'objective'
    when 'IELTS Academic' then 'ielts'
    when 'IELTS General Training' then 'ielts'
    when 'TOEFL iBT' then 'toefl'
    when 'SAT Reading and Writing' then 'sat'
    when 'ICFES inglés' then 'icfes'
    when 'Cambridge B2 First' then 'cambridge-b2'
    when 'Goethe' then 'goethe'
    when 'DELF' then 'delf-dalf'
    when 'DALF' then 'delf-dalf'
    when 'CILS' then 'cils-celi'
    when 'CELI' then 'cils-celi'
    when 'TOPIK I' then 'topik'
    when 'TOPIK II' then 'topik'
    when 'CELPE-Bras' then 'celpe-bras'
  end,
  'welearn','welearn-full','course-order:'||course.id::text,
  pg_catalog.jsonb_build_object('backfilledAt',now())
from public.course_orders course
join public.course_enrollments enrollment on enrollment.order_id=course.id
join public.profiles profile on profile.id=course.user_id and profile.student_path='welearn'
where course.user_id is not null and course.selection->>'objective' in (
  'IELTS Academic','IELTS General Training','TOEFL iBT','SAT Reading and Writing','ICFES inglés',
  'Cambridge B2 First','Goethe','DELF','DALF','CILS','CELI','TOPIK I','TOPIK II','CELPE-Bras'
)
on conflict (user_id,exam_slug,source) where status='active' do nothing;

-- Central read model for server routes. It never trusts user_metadata and never
-- grants one exam from a membership or assignment belonging to another exam.
create function public.resolve_exam_access(
  p_user uuid,p_exam text,p_environment text,p_at timestamptz default now()
)
returns jsonb language plpgsql security invoker set search_path='' as $$
declare
  selected_grant public.exam_access_grants;
  selected_membership public.xpress_memberships;
begin
  if p_user is null or p_environment not in ('sandbox','production') or p_exam not in (
    'ielts','toefl','sat','icfes','cambridge-b2','goethe','delf-dalf','cils-celi','topik','celpe-bras'
  ) then
    raise exception 'invalid_exam_access_lookup';
  end if;

  select * into selected_grant from public.exam_access_grants
    where user_id=p_user and exam_slug=p_exam and source='welearn' and status='active'
      and starts_at<=p_at and (ends_at is null or ends_at>p_at)
    order by starts_at desc,id desc limit 1;
  if found then
    return pg_catalog.jsonb_build_object(
      'level','welearn-full','planId','welearn-full','source','welearn','expiresAt',selected_grant.ends_at
    );
  end if;

  select * into selected_membership from public.xpress_memberships
    where user_id=p_user and exam_slug=p_exam and environment=p_environment
      and status='active' and starts_at<=p_at and ends_at>p_at
    order by case offer_id when 'exam-teacher' then 3 when 'exam-auto' then 2 else 1 end desc,
      starts_at desc,id desc limit 1;
  if found then
    return pg_catalog.jsonb_build_object(
      'level',case selected_membership.offer_id
        when 'exam-teacher' then 'pro'
        when 'exam-auto' then 'autodidacta'
        else 'essential'
      end,
      'planId',selected_membership.offer_id,
      'source','xpress-membership',
      'expiresAt',selected_membership.ends_at
    );
  end if;

  select * into selected_grant from public.exam_access_grants
    where user_id=p_user and exam_slug=p_exam and source='autodidacta-free' and status='active'
    order by starts_at desc,id desc limit 1;
  if found then
    return pg_catalog.jsonb_build_object(
      'level','free','planId','exam-free','source','autodidacta-free','expiresAt',null
    );
  end if;

  return pg_catalog.jsonb_build_object(
    'level','locked','planId',null,'source','none','expiresAt',null
  );
end $$;

revoke all on function public.resolve_exam_access(uuid,text,text,timestamptz)
  from public,anon,authenticated,service_role;
grant execute on function public.resolve_exam_access(uuid,text,text,timestamptz)
  to service_role;

-- Keep existing subscription contracts valid while allowing one open agreement
-- for each exam. A later offer migration adds the $15.900 plan and its version.
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
    or p_offer_version='xpress-2026-10-20-v8' and p_terms='xpress-20261020-v8' and p_recurring='xpress-recurring-30d-20261020-v3'
  ) or p_privacy<>'xpress-privacy-20260908-v1' then raise exception 'invalid_subscription_version'; end if;
  if p_exam not in ('ielts','toefl','sat','icfes','cambridge-b2','goethe','delf-dalf','cils-celi','topik','celpe-bras') then raise exception 'invalid_exam'; end if;
  if not (
    p_offer_version='xpress-2026-09-12-v4' and (p_offer='exam-auto' and p_amount=4900000 or p_offer='exam-teacher' and p_amount=9900000)
    or p_offer_version='xpress-2026-09-12-v5' and (p_offer='exam-auto' and p_amount=4990000 or p_offer='exam-teacher' and p_amount=9990000)
    or p_offer_version='xpress-2026-10-20-v8' and (
      p_offer='exam-basic' and p_amount=1590000
      or p_offer='exam-auto' and p_amount=4990000
      or p_offer='exam-teacher' and p_amount=9990000
    )
  ) then raise exception 'invalid_subscription_quote'; end if;
  if p_initial_charge_at is null or p_initial_charge_at<now()-interval '1 minute' then raise exception 'invalid_initial_charge'; end if;

  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_user::text,73));
  perform pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended(p_user::text||':'||p_exam,12)
  );
  select * into result from public.xpress_subscriptions
    where user_id=p_user and environment=p_environment and idempotency_key=p_key;
  if found then
    if result.offer_version<>p_offer_version or result.offer_id<>p_offer or result.exam_slug<>p_exam or result.amount_in_cents<>p_amount
      or result.terms_version<>p_terms or result.privacy_version<>p_privacy or result.recurring_consent_version<>p_recurring
      or result.legal_snapshot<>p_legal then raise exception 'idempotency_conflict'; end if;
    return result;
  end if;

  select * into open_subscription from public.xpress_subscriptions
    where user_id=p_user and environment=p_environment and exam_slug=p_exam and status<>'canceled'
    order by created_at desc limit 1;
  if found then
    if open_subscription.status='creating_source' and open_subscription.offer_version=p_offer_version
      and open_subscription.offer_id=p_offer and open_subscription.amount_in_cents=p_amount
      and open_subscription.terms_version=p_terms and open_subscription.privacy_version=p_privacy
      and open_subscription.recurring_consent_version=p_recurring
    then return open_subscription; end if;
    raise exception 'xpress_subscription_exists';
  end if;

  insert into public.xpress_subscriptions(
    user_id,purchaser_email,idempotency_key,environment,offer_version,offer_id,exam_slug,
    amount_in_cents,initial_charge_at,next_charge_at,terms_version,privacy_version,recurring_consent_version,legal_snapshot
  ) values(
    p_user,p_email,p_key,p_environment,p_offer_version,p_offer,p_exam,
    p_amount,p_initial_charge_at,null,p_terms,p_privacy,p_recurring,p_legal
  ) returning * into result;
  return result;
end $$;

