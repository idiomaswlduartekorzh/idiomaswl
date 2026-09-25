-- Pilot retests must be scheduled explicitly. Authorization and consumption
-- are service-only, auditable and occur in the attempt-creation transaction.

begin;

alter table public.diagnostic_pilot_enrollments
  add column retest_not_before timestamptz,
  add column retest_not_after timestamptz,
  add column remaining_retests smallint not null default 0
    check (remaining_retests between 0 and 3),
  add column retest_authorization_reference text check (
    retest_authorization_reference is null
    or retest_authorization_reference ~ '^[A-Za-z0-9][A-Za-z0-9._:/-]{2,199}$'
  ),
  add constraint diagnostic_pilot_retest_window_check check (
    remaining_retests = 0
    or (
      status = 'consented'
      and retest_not_before is not null
      and retest_not_after is not null
      and retest_not_after > retest_not_before
      and retest_authorization_reference is not null
    )
  );

alter table public.diagnostic_pilot_enrollment_events
  drop constraint diagnostic_pilot_enrollment_events_action_check,
  add constraint diagnostic_pilot_enrollment_events_action_check check (
    action in ('invited','consented','revoked','completed','retest-authorized','retest-consumed')
  ),
  add column retest_not_before timestamptz,
  add column retest_not_after timestamptz,
  add column retest_count smallint check (retest_count is null or retest_count between 0 and 3),
  add column authorization_reference text check (
    authorization_reference is null
    or authorization_reference ~ '^[A-Za-z0-9][A-Za-z0-9._:/-]{2,199}$'
  );

create function public.record_diagnostic_pilot_retest_authorization(
  p_user_id uuid,
  p_cohort_id text,
  p_not_before timestamptz,
  p_not_after timestamptz,
  p_retest_count integer,
  p_authorization_reference text,
  p_acted_by uuid,
  p_reason text
)
returns jsonb
language plpgsql
security invoker
set search_path = ''
as $function$
declare
  v_enrollment public.diagnostic_pilot_enrollments%rowtype;
begin
  if p_user_id is null or p_acted_by is null
    or p_cohort_id !~ '^[a-z0-9][a-z0-9._-]{2,99}$'
    or p_not_before is null or p_not_after is null
    or p_not_before < now() - interval '5 minutes'
    or p_not_after <= p_not_before
    or p_not_after > p_not_before + interval '90 days'
    or p_retest_count not between 1 and 3
    or p_authorization_reference is null
    or p_authorization_reference !~ '^[A-Za-z0-9][A-Za-z0-9._:/-]{2,199}$'
    or p_reason is null
    or char_length(btrim(p_reason)) not between 3 and 500 then
    raise exception 'diagnostic_pilot_retest_authorization_invalid';
  end if;

  select * into v_enrollment
  from public.diagnostic_pilot_enrollments
  where user_id = p_user_id
  for update;
  if not found or v_enrollment.status <> 'consented'
    or v_enrollment.cohort_id <> p_cohort_id then
    raise exception 'diagnostic_pilot_retest_enrollment_invalid';
  end if;

  update public.diagnostic_pilot_enrollments set
    retest_not_before = p_not_before,
    retest_not_after = p_not_after,
    remaining_retests = p_retest_count,
    retest_authorization_reference = p_authorization_reference,
    updated_at = now()
  where user_id = p_user_id;

  insert into public.diagnostic_pilot_enrollment_events (
    user_id, cohort_id, action, pilot_consent_version, consented_at,
    consent_reference, acted_by, reason, retest_not_before, retest_not_after,
    retest_count, authorization_reference
  ) values (
    p_user_id, p_cohort_id, 'retest-authorized', v_enrollment.pilot_consent_version,
    v_enrollment.consented_at, v_enrollment.consent_reference, p_acted_by,
    btrim(p_reason), p_not_before, p_not_after, p_retest_count,
    p_authorization_reference
  );

  return jsonb_build_object(
    'status', 'retest-authorized',
    'cohortId', p_cohort_id,
    'remainingRetests', p_retest_count
  );
end
$function$;

revoke all on function public.record_diagnostic_pilot_retest_authorization(
  uuid,text,timestamptz,timestamptz,integer,text,uuid,text
) from public, anon, authenticated, service_role;
grant execute on function public.record_diagnostic_pilot_retest_authorization(
  uuid,text,timestamptz,timestamptz,integer,text,uuid,text
) to service_role;

create function public.enforce_diagnostic_pilot_retest_authorization()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $function$
declare
  v_enrollment public.diagnostic_pilot_enrollments%rowtype;
begin
  if new.access_mode <> 'pilot' or not exists (
    select 1 from public.diagnostic_attempts
    where user_id = new.user_id and language = new.language and status = 'completed'
  ) then
    return new;
  end if;

  select * into v_enrollment
  from public.diagnostic_pilot_enrollments
  where user_id = new.user_id
  for update;
  if not found or v_enrollment.status <> 'consented'
    or v_enrollment.remaining_retests < 1
    or now() < v_enrollment.retest_not_before
    or now() > v_enrollment.retest_not_after
    or v_enrollment.retest_authorization_reference is null then
    raise exception 'diagnostic_pilot_retest_not_authorized';
  end if;

  update public.diagnostic_pilot_enrollments set
    remaining_retests = remaining_retests - 1,
    updated_at = now()
  where user_id = new.user_id;

  insert into public.diagnostic_pilot_enrollment_events (
    user_id, cohort_id, action, pilot_consent_version, consented_at,
    consent_reference, reason, retest_not_before, retest_not_after,
    retest_count, authorization_reference
  ) values (
    new.user_id, v_enrollment.cohort_id, 'retest-consumed',
    v_enrollment.pilot_consent_version, v_enrollment.consented_at,
    v_enrollment.consent_reference, 'Consumed atomically by diagnostic attempt creation',
    v_enrollment.retest_not_before, v_enrollment.retest_not_after,
    v_enrollment.remaining_retests - 1, v_enrollment.retest_authorization_reference
  );
  return new;
end
$function$;

revoke all on function public.enforce_diagnostic_pilot_retest_authorization()
  from public, anon, authenticated, service_role;

create trigger diagnostic_pilot_retest_before_attempt
before insert on public.diagnostic_attempts
for each row execute function public.enforce_diagnostic_pilot_retest_authorization();

create function public.clear_diagnostic_pilot_retest_on_close()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $function$
begin
  if new.status <> 'consented' then
    new.remaining_retests := 0;
    new.retest_not_before := null;
    new.retest_not_after := null;
    new.retest_authorization_reference := null;
  end if;
  return new;
end
$function$;

revoke all on function public.clear_diagnostic_pilot_retest_on_close()
  from public, anon, authenticated, service_role;

create trigger diagnostic_pilot_retest_clear_on_close
before update of status on public.diagnostic_pilot_enrollments
for each row execute function public.clear_diagnostic_pilot_retest_on_close();

comment on function public.record_diagnostic_pilot_retest_authorization is
  'Schedules a bounded pilot retest window; never authorizes production retests.';

commit;
