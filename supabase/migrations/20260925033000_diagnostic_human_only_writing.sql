-- Preserve a complete human-review path when external automated processing is
-- unavailable or the learner has not authorized it. Automated evidence remains
-- immutable when present; it is no longer a prerequisite for human review.

begin;

create or replace function public.record_diagnostic_human_writing_evaluation(
  p_attempt_id uuid,
  p_user_id uuid,
  p_human_evaluation jsonb,
  p_next_status text
)
returns jsonb
language plpgsql
security invoker
set search_path = ''
as $function$
declare
  v_attempt public.diagnostic_attempts%rowtype;
  v_writing public.diagnostic_writing_evaluations%rowtype;
begin
  if jsonb_typeof(p_human_evaluation) <> 'object'
    or p_next_status not in ('human-review','adjudication') then
    raise exception 'diagnostic_human_evaluation_invalid';
  end if;

  select * into v_attempt
  from public.diagnostic_attempts
  where id = p_attempt_id and user_id = p_user_id
  for update;
  if not found then raise exception 'diagnostic_attempt_not_found'; end if;
  if v_attempt.status <> 'scoring' then raise exception 'diagnostic_attempt_not_scoring'; end if;

  select * into v_writing
  from public.diagnostic_writing_evaluations
  where attempt_id = p_attempt_id and user_id = p_user_id
  for update;
  if not found then raise exception 'diagnostic_writing_not_found'; end if;

  if v_writing.human_evaluation is not null then
    if v_writing.human_evaluation = p_human_evaluation then
      return jsonb_build_object('replayed', true, 'status', v_writing.status);
    end if;
    raise exception 'diagnostic_human_evaluation_conflict';
  end if;
  if (v_writing.automated_evaluation is null and v_writing.status <> 'pending')
    or (v_writing.automated_evaluation is not null and v_writing.status <> 'automated-scored') then
    raise exception 'diagnostic_writing_not_ready_for_human_review';
  end if;

  update public.diagnostic_writing_evaluations
  set human_evaluation = p_human_evaluation,
      status = p_next_status,
      updated_at = now()
  where id = v_writing.id;

  insert into public.diagnostic_attempt_events (attempt_id, user_id, event_type, payload)
  values (p_attempt_id, p_user_id, 'writing.human_reviewed', jsonb_build_object(
    'reviewStatus', p_next_status,
    'reviewerId', p_human_evaluation->>'reviewerId',
    'automatedEvidencePresent', v_writing.automated_evaluation is not null
  ));

  return jsonb_build_object('replayed', false, 'status', p_next_status);
end
$function$;

create or replace function public.complete_diagnostic_attempt(
  p_attempt_id uuid,
  p_user_id uuid,
  p_expected_attempt_version integer,
  p_automated_evaluation jsonb,
  p_human_evaluation jsonb,
  p_final_evidence jsonb,
  p_result_profile jsonb
)
returns jsonb
language plpgsql
security invoker
set search_path = ''
as $function$
declare
  v_attempt public.diagnostic_attempts%rowtype;
  v_writing public.diagnostic_writing_evaluations%rowtype;
  v_next_version integer;
begin
  if (p_automated_evaluation is not null and jsonb_typeof(p_automated_evaluation) <> 'object')
    or jsonb_typeof(p_human_evaluation) <> 'object'
    or jsonb_typeof(p_final_evidence) <> 'object'
    or jsonb_typeof(p_result_profile) <> 'object' then
    raise exception 'diagnostic_finalization_invalid';
  end if;

  select * into v_attempt
  from public.diagnostic_attempts
  where id = p_attempt_id and user_id = p_user_id
  for update;
  if not found then raise exception 'diagnostic_attempt_not_found'; end if;

  select * into v_writing
  from public.diagnostic_writing_evaluations
  where attempt_id = p_attempt_id and user_id = p_user_id
  for update;
  if not found then raise exception 'diagnostic_writing_not_found'; end if;

  if v_attempt.version <> p_expected_attempt_version then
    raise exception 'diagnostic_attempt_version_conflict';
  end if;
  if v_attempt.status <> 'scoring' then raise exception 'diagnostic_attempt_not_scoring'; end if;
  if v_writing.status not in ('human-review','adjudication') then
    raise exception 'diagnostic_writing_not_pending';
  end if;
  if v_writing.automated_evaluation is distinct from p_automated_evaluation
    or v_writing.human_evaluation is distinct from p_human_evaluation then
    raise exception 'diagnostic_finalization_evidence_conflict';
  end if;

  update public.diagnostic_writing_evaluations
  set status = 'completed',
      final_evidence = p_final_evidence,
      completed_at = now(),
      updated_at = now()
  where id = v_writing.id;

  v_next_version := v_attempt.version + 1;
  update public.diagnostic_attempts
  set status = 'completed',
      result_profile = p_result_profile,
      version = v_next_version,
      completed_at = now(),
      updated_at = now()
  where id = p_attempt_id;

  insert into public.diagnostic_attempt_events (attempt_id, user_id, event_type, payload)
  values (p_attempt_id, p_user_id, 'attempt.completed', jsonb_build_object(
    'attemptVersion', v_next_version,
    'globalLevel', p_result_profile->>'globalLevel',
    'overallStatus', p_result_profile->>'overallStatus',
    'automatedEvidencePresent', p_automated_evaluation is not null
  ));

  return jsonb_build_object('replayed', false, 'version', v_next_version);
end
$function$;

revoke all on function public.record_diagnostic_human_writing_evaluation(
  uuid,uuid,jsonb,text
) from public, anon, authenticated, service_role;
grant execute on function public.record_diagnostic_human_writing_evaluation(
  uuid,uuid,jsonb,text
) to service_role;

revoke all on function public.complete_diagnostic_attempt(
  uuid,uuid,integer,jsonb,jsonb,jsonb,jsonb
) from public, anon, authenticated, service_role;
grant execute on function public.complete_diagnostic_attempt(
  uuid,uuid,integer,jsonb,jsonb,jsonb,jsonb
) to service_role;

commit;
