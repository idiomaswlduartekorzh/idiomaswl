-- Independent pilot reference labels. The diagnostic level is deliberately not
-- stored here: reports derive it from the immutable completed result profile.

begin;

create table public.diagnostic_pilot_references (
  attempt_id uuid primary key references public.diagnostic_attempts(id) on delete cascade,
  reference_level text not null check (reference_level in ('A1','A2','B1','B2','C1','C2')),
  source text not null check (source in ('external-test','tutor-judgement','course-placement')),
  source_version text not null check (char_length(source_version) between 3 and 160),
  assessor_ref_hash text not null check (assessor_ref_hash ~ '^[0-9a-f]{64}$'),
  assessed_at timestamptz not null,
  recorded_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);

create index diagnostic_pilot_references_assessed_idx
  on public.diagnostic_pilot_references(assessed_at desc);

alter table public.diagnostic_pilot_references enable row level security;
revoke all on table public.diagnostic_pilot_references
  from public, anon, authenticated, service_role;
grant select, insert, update, delete on table public.diagnostic_pilot_references
  to service_role;

comment on table public.diagnostic_pilot_references is
  'Server-only independent CEFR reference labels for diagnostic validation; no participant or assessor PII is exported.';

create function public.record_diagnostic_pilot_reference(
  p_attempt_id uuid,
  p_reference_level text,
  p_source text,
  p_source_version text,
  p_assessor_ref_hash text,
  p_assessed_at timestamptz,
  p_recorded_by uuid
)
returns uuid
language plpgsql
security invoker
set search_path = ''
as $function$
declare
  v_attempt public.diagnostic_attempts%rowtype;
begin
  select * into v_attempt
  from public.diagnostic_attempts
  where id = p_attempt_id
  for update;
  if not found then raise exception 'diagnostic_attempt_not_found'; end if;
  if v_attempt.status <> 'completed'
    or v_attempt.result_profile is null
    or coalesce(v_attempt.result_profile->>'globalLevel', '') not in ('A1','A2','B1','B2','C1','C2') then
    raise exception 'diagnostic_reference_attempt_not_eligible';
  end if;
  if p_reference_level not in ('A1','A2','B1','B2','C1','C2')
    or p_source not in ('external-test','tutor-judgement','course-placement')
    or char_length(p_source_version) not between 3 and 160
    or p_assessor_ref_hash !~ '^[0-9a-f]{64}$'
    or p_assessed_at < v_attempt.started_at
    or p_assessed_at > now() + interval '5 minutes'
    or p_recorded_by is null then
    raise exception 'diagnostic_reference_invalid';
  end if;

  insert into public.diagnostic_pilot_references (
    attempt_id, reference_level, source, source_version,
    assessor_ref_hash, assessed_at, recorded_by
  ) values (
    p_attempt_id, p_reference_level, p_source, p_source_version,
    p_assessor_ref_hash, p_assessed_at, p_recorded_by
  );

  insert into public.diagnostic_attempt_events (attempt_id, user_id, event_type, payload)
  values (p_attempt_id, v_attempt.user_id, 'pilot.reference-recorded', jsonb_build_object(
    'source', p_source,
    'sourceVersion', p_source_version,
    'recordedBy', p_recorded_by
  ));
  return p_attempt_id;
end
$function$;

revoke all on function public.record_diagnostic_pilot_reference(
  uuid,text,text,text,text,timestamptz,uuid
) from public, anon, authenticated, service_role;
grant execute on function public.record_diagnostic_pilot_reference(
  uuid,text,text,text,text,timestamptz,uuid
) to service_role;

commit;
