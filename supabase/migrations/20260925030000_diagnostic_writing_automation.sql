-- Persist the server-generated automated writing evaluation before any human
-- review. Finalization consumes this immutable row instead of accepting a
-- model payload echoed by an administrator browser.

begin;

create function public.record_diagnostic_automated_writing_evaluation(
  p_attempt_id uuid,
  p_user_id uuid,
  p_automated_evaluation jsonb
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
  if jsonb_typeof(p_automated_evaluation) <> 'object' then
    raise exception 'diagnostic_automated_evaluation_invalid';
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

  if v_writing.automated_evaluation is not null then
    if v_writing.automated_evaluation = p_automated_evaluation then
      return jsonb_build_object('replayed', true);
    end if;
    raise exception 'diagnostic_automated_evaluation_conflict';
  end if;
  if v_writing.status <> 'pending' then
    raise exception 'diagnostic_writing_not_pending';
  end if;

  update public.diagnostic_writing_evaluations
  set automated_evaluation = p_automated_evaluation,
      status = 'automated-scored',
      updated_at = now()
  where id = v_writing.id;

  insert into public.diagnostic_attempt_events (attempt_id, user_id, event_type, payload)
  values (p_attempt_id, p_user_id, 'writing.automated_scored', jsonb_build_object(
    'rubricVersion', p_automated_evaluation->>'rubricVersion',
    'model', p_automated_evaluation->>'model'
  ));

  return jsonb_build_object('replayed', false);
end
$function$;

revoke all on function public.record_diagnostic_automated_writing_evaluation(
  uuid,uuid,jsonb
) from public, anon, authenticated, service_role;
grant execute on function public.record_diagnostic_automated_writing_evaluation(
  uuid,uuid,jsonb
) to service_role;

commit;
