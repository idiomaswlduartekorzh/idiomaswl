-- Bind every new pilot consent to an opaque evidence reference. The reference
-- identifies the approved external record; it must not contain the document,
-- participant name, email or other additional PII.

begin;

alter table public.diagnostic_pilot_enrollments
  add column consent_reference text check (
    consent_reference is null
    or consent_reference ~ '^[A-Za-z0-9][A-Za-z0-9._:/-]{2,199}$'
  );

alter table public.diagnostic_pilot_enrollments
  add constraint diagnostic_pilot_enrollments_consent_reference_required
  check (status not in ('consented','completed') or consent_reference is not null)
  not valid;

alter table public.diagnostic_pilot_enrollment_events
  add column consent_reference text check (
    consent_reference is null
    or consent_reference ~ '^[A-Za-z0-9][A-Za-z0-9._:/-]{2,199}$'
  );

drop function public.record_diagnostic_pilot_enrollment(
  uuid,text,text,text,timestamptz,uuid,text
);

create function public.record_diagnostic_pilot_enrollment(
  p_user_id uuid,
  p_cohort_id text,
  p_action text,
  p_pilot_consent_version text,
  p_consented_at timestamptz,
  p_consent_reference text,
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
  v_next_consent_reference text;
begin
  if p_user_id is null or p_acted_by is null
    or p_cohort_id !~ '^[a-z0-9][a-z0-9._-]{2,99}$'
    or p_action not in ('invited','consented','revoked','completed')
    or (p_consent_reference is not null
      and p_consent_reference !~ '^[A-Za-z0-9][A-Za-z0-9._:/-]{2,199}$')
    or (p_reason is not null and char_length(btrim(p_reason)) not between 3 and 500) then
    raise exception 'diagnostic_pilot_enrollment_invalid';
  end if;

  select * into v_existing
  from public.diagnostic_pilot_enrollments
  where user_id = p_user_id
  for update;

  if p_action = 'invited' then
    if found then raise exception 'diagnostic_pilot_enrollment_transition_invalid'; end if;
    if p_pilot_consent_version is not null or p_consented_at is not null
      or p_consent_reference is not null then
      raise exception 'diagnostic_pilot_enrollment_invalid';
    end if;
    insert into public.diagnostic_pilot_enrollments (
      user_id, cohort_id, status, enrolled_by
    ) values (p_user_id, p_cohort_id, 'invited', p_acted_by);
    v_next_consent_version := null;
    v_next_consented_at := null;
    v_next_consent_reference := null;
  elsif p_action = 'consented' then
    if p_pilot_consent_version is null
      or char_length(p_pilot_consent_version) not between 3 and 160
      or p_consented_at is null
      or p_consented_at > now() + interval '5 minutes'
      or p_consent_reference is null
      or (found and (v_existing.status <> 'invited' or v_existing.cohort_id <> p_cohort_id)) then
      raise exception 'diagnostic_pilot_enrollment_transition_invalid';
    end if;
    insert into public.diagnostic_pilot_enrollments (
      user_id, cohort_id, status, pilot_consent_version, consented_at,
      consent_reference, enrolled_by
    ) values (
      p_user_id, p_cohort_id, 'consented', p_pilot_consent_version,
      p_consented_at, p_consent_reference, p_acted_by
    ) on conflict (user_id) do update set
      status = 'consented',
      pilot_consent_version = excluded.pilot_consent_version,
      consented_at = excluded.consented_at,
      consent_reference = excluded.consent_reference,
      enrolled_by = excluded.enrolled_by,
      updated_at = now();
    v_next_consent_version := p_pilot_consent_version;
    v_next_consented_at := p_consented_at;
    v_next_consent_reference := p_consent_reference;
  else
    if not found or v_existing.cohort_id <> p_cohort_id
      or (p_action = 'revoked' and v_existing.status not in ('invited','consented'))
      or (p_action = 'completed' and v_existing.status <> 'consented')
      or p_consent_reference is not null
      or p_reason is null then
      raise exception 'diagnostic_pilot_enrollment_transition_invalid';
    end if;
    update public.diagnostic_pilot_enrollments set
      status = p_action,
      updated_at = now()
    where user_id = p_user_id;
    v_next_consent_version := v_existing.pilot_consent_version;
    v_next_consented_at := v_existing.consented_at;
    v_next_consent_reference := v_existing.consent_reference;
  end if;

  insert into public.diagnostic_pilot_enrollment_events (
    user_id, cohort_id, action, pilot_consent_version,
    consented_at, consent_reference, acted_by, reason
  ) values (
    p_user_id, p_cohort_id, p_action, v_next_consent_version,
    v_next_consented_at, v_next_consent_reference, p_acted_by,
    nullif(btrim(p_reason), '')
  );

  return jsonb_build_object('status', p_action, 'cohortId', p_cohort_id);
end
$function$;

revoke all on function public.record_diagnostic_pilot_enrollment(
  uuid,text,text,text,timestamptz,text,uuid,text
) from public, anon, authenticated, service_role;
grant execute on function public.record_diagnostic_pilot_enrollment(
  uuid,text,text,text,timestamptz,text,uuid,text
) to service_role;

comment on column public.diagnostic_pilot_enrollments.consent_reference is
  'Opaque identifier of the external consent evidence; never document content or participant PII.';

commit;
