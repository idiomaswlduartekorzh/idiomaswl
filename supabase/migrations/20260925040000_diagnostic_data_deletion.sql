-- User-directed deletion for the diagnostic domain. The caller must derive the
-- subject from the authenticated session. A short table lock prevents a new
-- attempt from racing the count/delete/verification transaction.

begin;

create function public.delete_diagnostic_user_data(p_user_id uuid)
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
  v_remaining integer;
begin
  if p_user_id is null then
    raise exception 'diagnostic_deletion_user_required';
  end if;

  lock table public.diagnostic_attempts in share row exclusive mode;

  select count(*) into v_attempts
  from public.diagnostic_attempts where user_id = p_user_id;
  select count(*) into v_stages
  from public.diagnostic_stages where user_id = p_user_id;
  select count(*) into v_responses
  from public.diagnostic_responses where user_id = p_user_id;
  select count(*) into v_writing
  from public.diagnostic_writing_evaluations where user_id = p_user_id;
  select count(*) into v_events
  from public.diagnostic_attempt_events where user_id = p_user_id;
  select count(*) into v_references
  from public.diagnostic_pilot_references reference
  join public.diagnostic_attempts attempt on attempt.id = reference.attempt_id
  where attempt.user_id = p_user_id;

  delete from public.diagnostic_attempts where user_id = p_user_id;

  select count(*) into v_remaining
  from public.diagnostic_attempts where user_id = p_user_id;
  if v_remaining <> 0
    or exists (select 1 from public.diagnostic_stages where user_id = p_user_id)
    or exists (select 1 from public.diagnostic_responses where user_id = p_user_id)
    or exists (select 1 from public.diagnostic_writing_evaluations where user_id = p_user_id)
    or exists (select 1 from public.diagnostic_attempt_events where user_id = p_user_id) then
    raise exception 'diagnostic_deletion_incomplete';
  end if;

  return jsonb_build_object(
    'deletedAttempts', v_attempts,
    'deletedStages', v_stages,
    'deletedResponses', v_responses,
    'deletedWritingEvaluations', v_writing,
    'deletedEvents', v_events,
    'deletedPilotReferences', v_references,
    'remainingAttempts', v_remaining
  );
end
$function$;

revoke all on function public.delete_diagnostic_user_data(uuid)
  from public, anon, authenticated, service_role;
grant execute on function public.delete_diagnostic_user_data(uuid)
  to service_role;

comment on function public.delete_diagnostic_user_data(uuid) is
  'Service-only, idempotent deletion of all diagnostic data for the authenticated subject supplied by the server.';

commit;
