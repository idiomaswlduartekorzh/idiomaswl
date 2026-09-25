-- Auditable, service-only pilot enrollment transitions plus deletion coverage.

begin;

alter table public.diagnostic_pilot_enrollments
  drop constraint diagnostic_pilot_enrollments_enrolled_by_fkey;
alter table public.diagnostic_pilot_enrollments
  alter column enrolled_by drop not null;
alter table public.diagnostic_pilot_enrollments
  add constraint diagnostic_pilot_enrollments_enrolled_by_fkey
  foreign key (enrolled_by) references auth.users(id) on delete set null;

create table public.diagnostic_pilot_enrollment_events (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.diagnostic_pilot_enrollments(user_id) on delete cascade,
  cohort_id text not null check (char_length(cohort_id) between 3 and 100),
  action text not null check (action in ('invited','consented','revoked','completed')),
  pilot_consent_version text check (
    pilot_consent_version is null or char_length(pilot_consent_version) between 3 and 160
  ),
  consented_at timestamptz,
  acted_by uuid references auth.users(id) on delete set null,
  reason text check (reason is null or char_length(reason) between 3 and 500),
  created_at timestamptz not null default now()
);

create index diagnostic_pilot_enrollment_events_user_created_idx
  on public.diagnostic_pilot_enrollment_events(user_id, created_at desc);

alter table public.diagnostic_pilot_enrollment_events enable row level security;
revoke all on table public.diagnostic_pilot_enrollment_events
  from public, anon, authenticated, service_role;
grant select, insert on table public.diagnostic_pilot_enrollment_events
  to service_role;
grant usage, select on sequence public.diagnostic_pilot_enrollment_events_id_seq
  to service_role;

create function public.record_diagnostic_pilot_enrollment(
  p_user_id uuid,
  p_cohort_id text,
  p_action text,
  p_pilot_consent_version text,
  p_consented_at timestamptz,
  p_acted_by uuid,
  p_reason text
)
returns jsonb
language plpgsql
security invoker
set search_path = ''
as $function$
declare
  v_existing public.diagnostic_pilot_enrollments%rowtype;
  v_next_consent_version text;
  v_next_consented_at timestamptz;
begin
  if p_user_id is null or p_acted_by is null
    or p_cohort_id !~ '^[a-z0-9][a-z0-9._-]{2,99}$'
    or p_action not in ('invited','consented','revoked','completed')
    or (p_reason is not null and char_length(btrim(p_reason)) not between 3 and 500) then
    raise exception 'diagnostic_pilot_enrollment_invalid';
  end if;

  select * into v_existing
  from public.diagnostic_pilot_enrollments
  where user_id = p_user_id
  for update;

  if p_action = 'invited' then
    if found then raise exception 'diagnostic_pilot_enrollment_transition_invalid'; end if;
    if p_pilot_consent_version is not null or p_consented_at is not null then
      raise exception 'diagnostic_pilot_enrollment_invalid';
    end if;
    insert into public.diagnostic_pilot_enrollments (
      user_id, cohort_id, status, enrolled_by
    ) values (p_user_id, p_cohort_id, 'invited', p_acted_by);
    v_next_consent_version := null;
    v_next_consented_at := null;
  elsif p_action = 'consented' then
    if p_pilot_consent_version is null
      or char_length(p_pilot_consent_version) not between 3 and 160
      or p_consented_at is null
      or p_consented_at > now() + interval '5 minutes'
      or (found and (v_existing.status <> 'invited' or v_existing.cohort_id <> p_cohort_id)) then
      raise exception 'diagnostic_pilot_enrollment_transition_invalid';
    end if;
    insert into public.diagnostic_pilot_enrollments (
      user_id, cohort_id, status, pilot_consent_version, consented_at, enrolled_by
    ) values (
      p_user_id, p_cohort_id, 'consented', p_pilot_consent_version, p_consented_at, p_acted_by
    ) on conflict (user_id) do update set
      status = 'consented',
      pilot_consent_version = excluded.pilot_consent_version,
      consented_at = excluded.consented_at,
      enrolled_by = excluded.enrolled_by,
      updated_at = now();
    v_next_consent_version := p_pilot_consent_version;
    v_next_consented_at := p_consented_at;
  else
    if not found or v_existing.cohort_id <> p_cohort_id
      or (p_action = 'revoked' and v_existing.status not in ('invited','consented'))
      or (p_action = 'completed' and v_existing.status <> 'consented')
      or p_reason is null then
      raise exception 'diagnostic_pilot_enrollment_transition_invalid';
    end if;
    update public.diagnostic_pilot_enrollments set
      status = p_action,
      updated_at = now()
    where user_id = p_user_id;
    v_next_consent_version := v_existing.pilot_consent_version;
    v_next_consented_at := v_existing.consented_at;
  end if;

  insert into public.diagnostic_pilot_enrollment_events (
    user_id, cohort_id, action, pilot_consent_version,
    consented_at, acted_by, reason
  ) values (
    p_user_id, p_cohort_id, p_action, v_next_consent_version,
    v_next_consented_at, p_acted_by, nullif(btrim(p_reason), '')
  );

  return jsonb_build_object('status', p_action, 'cohortId', p_cohort_id);
end
$function$;

revoke all on function public.record_diagnostic_pilot_enrollment(
  uuid,text,text,text,timestamptz,uuid,text
) from public, anon, authenticated, service_role;
grant execute on function public.record_diagnostic_pilot_enrollment(
  uuid,text,text,text,timestamptz,uuid,text
) to service_role;

create or replace function public.delete_diagnostic_user_data(p_user_id uuid)
returns jsonb
language plpgsql
security invoker
set search_path = ''
as $function$
declare
  v_attempts integer;
  v_stages integer;
  v_responses integer;
  v_writing integer;
  v_events integer;
  v_references integer;
  v_enrollments integer;
  v_enrollment_events integer;
  v_remaining integer;
begin
  if p_user_id is null then raise exception 'diagnostic_deletion_user_required'; end if;
  lock table public.diagnostic_attempts in share row exclusive mode;
  lock table public.diagnostic_pilot_enrollments in share row exclusive mode;

  select count(*) into v_attempts from public.diagnostic_attempts where user_id = p_user_id;
  select count(*) into v_stages from public.diagnostic_stages where user_id = p_user_id;
  select count(*) into v_responses from public.diagnostic_responses where user_id = p_user_id;
  select count(*) into v_writing from public.diagnostic_writing_evaluations where user_id = p_user_id;
  select count(*) into v_events from public.diagnostic_attempt_events where user_id = p_user_id;
  select count(*) into v_references
  from public.diagnostic_pilot_references reference
  join public.diagnostic_attempts attempt on attempt.id = reference.attempt_id
  where attempt.user_id = p_user_id;
  select count(*) into v_enrollments
  from public.diagnostic_pilot_enrollments where user_id = p_user_id;
  select count(*) into v_enrollment_events
  from public.diagnostic_pilot_enrollment_events where user_id = p_user_id;

  delete from public.diagnostic_attempts where user_id = p_user_id;
  delete from public.diagnostic_pilot_enrollments where user_id = p_user_id;

  select count(*) into v_remaining from public.diagnostic_attempts where user_id = p_user_id;
  if v_remaining <> 0
    or exists (select 1 from public.diagnostic_stages where user_id = p_user_id)
    or exists (select 1 from public.diagnostic_responses where user_id = p_user_id)
    or exists (select 1 from public.diagnostic_writing_evaluations where user_id = p_user_id)
    or exists (select 1 from public.diagnostic_attempt_events where user_id = p_user_id)
    or exists (select 1 from public.diagnostic_pilot_enrollments where user_id = p_user_id)
    or exists (select 1 from public.diagnostic_pilot_enrollment_events where user_id = p_user_id) then
    raise exception 'diagnostic_deletion_incomplete';
  end if;

  return jsonb_build_object(
    'deletedAttempts', v_attempts,
    'deletedStages', v_stages,
    'deletedResponses', v_responses,
    'deletedWritingEvaluations', v_writing,
    'deletedEvents', v_events,
    'deletedPilotReferences', v_references,
    'deletedPilotEnrollments', v_enrollments,
    'deletedPilotEnrollmentEvents', v_enrollment_events,
    'remainingAttempts', v_remaining
  );
end
$function$;

comment on table public.diagnostic_pilot_enrollment_events is
  'Server-only append-only pilot cohort transitions; removed with the participant diagnostic domain.';

commit;
