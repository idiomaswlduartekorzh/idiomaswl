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
  ) or p_privacy<>'xpress-privacy-20260908-v1' then raise exception 'invalid_subscription_version'; end if;
  if p_exam not in ('ielts','toefl','sat','icfes','cambridge-b2','goethe','delf-dalf','cils-celi','topik','celpe-bras') then raise exception 'invalid_exam'; end if;
  if not (
    p_offer_version='xpress-2026-09-12-v4' and (p_offer='exam-auto' and p_amount=4900000 or p_offer='exam-teacher' and p_amount=9900000)
    or p_offer_version='xpress-2026-09-12-v5' and (p_offer='exam-auto' and p_amount=4990000 or p_offer='exam-teacher' and p_amount=9990000)
  ) then raise exception 'invalid_subscription_quote'; end if;
  if p_initial_charge_at is null or p_initial_charge_at<now()-interval '1 minute' then raise exception 'invalid_initial_charge'; end if;

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

