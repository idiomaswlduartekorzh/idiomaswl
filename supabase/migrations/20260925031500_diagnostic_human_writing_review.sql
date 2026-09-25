-- Store the first human writing review independently from adjudication. A
-- material disagreement can then be adjudicated by a different administrator
-- without losing or replacing the original blind review.

begin;

create function public.record_diagnostic_human_writing_evaluation(
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
  if v_writing.automated_evaluation is null then
    raise exception 'diagnostic_automated_evaluation_missing';
  end if;

  if v_writing.human_evaluation is not null then
    if v_writing.human_evaluation = p_human_evaluation then
      return jsonb_build_object('replayed', true, 'status', v_writing.status);
    end if;
    raise exception 'diagnostic_human_evaluation_conflict';
  end if;
  if v_writing.status <> 'automated-scored' then
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
    'reviewerId', p_human_evaluation->>'reviewerId'
  ));

  return jsonb_build_object('replayed', false, 'status', p_next_status);
end
$function$;

revoke all on function public.record_diagnostic_human_writing_evaluation(
  uuid,uuid,jsonb,text
) from public, anon, authenticated, service_role;
grant execute on function public.record_diagnostic_human_writing_evaluation(
  uuid,uuid,jsonb,text
) to service_role;

commit;
