-- Atomic, idempotent handoff from the writing stage into the scoring queue.

begin;

create function public.submit_diagnostic_writing_stage(
  p_attempt_id uuid,
  p_stage_id uuid,
  p_user_id uuid,
  p_expected_attempt_version integer,
  p_prompt_id text,
  p_content_version text,
  p_response_text text,
  p_response_sha256 text,
  p_word_count integer
)
returns jsonb
language plpgsql
security invoker
set search_path = ''
as $function$
declare
  v_attempt public.diagnostic_attempts%rowtype;
  v_stage public.diagnostic_stages%rowtype;
  v_next_version integer;
begin
  select * into v_attempt
  from public.diagnostic_attempts
  where id = p_attempt_id and user_id = p_user_id
  for update;
  if not found then raise exception 'diagnostic_attempt_not_found'; end if;

  select * into v_stage
  from public.diagnostic_stages
  where id = p_stage_id and attempt_id = p_attempt_id and user_id = p_user_id
  for update;
  if not found then raise exception 'diagnostic_stage_not_found'; end if;

  if v_stage.status = 'completed' then
    if v_stage.submission_digest = p_response_sha256 then
      return jsonb_build_object('replayed', true, 'version', v_attempt.version);
    end if;
    raise exception 'diagnostic_stage_already_completed';
  end if;
  if v_attempt.version <> p_expected_attempt_version then raise exception 'diagnostic_attempt_version_conflict'; end if;
  if v_attempt.expires_at <= now() then raise exception 'diagnostic_attempt_expired'; end if;
  if v_attempt.status <> 'writing' or v_stage.kind <> 'writing' then
    raise exception 'diagnostic_stage_out_of_order';
  end if;
  if cardinality(v_stage.item_ids) <> 1
    or v_stage.item_ids[1] <> p_prompt_id
    or coalesce(v_stage.content_versions->>p_prompt_id, '') <> p_content_version then
    raise exception 'diagnostic_response_binding_invalid';
  end if;
  if char_length(p_response_text) < 1 or char_length(p_response_text) > 12000
    or p_response_sha256 !~ '^[0-9a-f]{64}$'
    or p_word_count < 1 or p_word_count > 3000 then
    raise exception 'diagnostic_writing_response_invalid';
  end if;

  insert into public.diagnostic_writing_evaluations (
    attempt_id, user_id, prompt_id, content_version, response_text, word_count, status
  ) values (
    p_attempt_id, p_user_id, p_prompt_id, p_content_version, p_response_text, p_word_count, 'pending'
  );

  update public.diagnostic_stages
  set status = 'completed', completed_at = now(), submission_digest = p_response_sha256
  where id = p_stage_id;

  v_next_version := v_attempt.version + 1;
  update public.diagnostic_attempts
  set status = 'scoring', version = v_next_version, updated_at = now()
  where id = p_attempt_id;

  insert into public.diagnostic_attempt_events (attempt_id, user_id, event_type, payload)
  values (p_attempt_id, p_user_id, 'writing.submitted', jsonb_build_object(
    'stageId', p_stage_id,
    'promptId', p_prompt_id,
    'contentVersion', p_content_version,
    'wordCount', p_word_count,
    'attemptVersion', v_next_version
  ));

  return jsonb_build_object('replayed', false, 'version', v_next_version);
end
$function$;

revoke all on function public.submit_diagnostic_writing_stage(
  uuid,uuid,uuid,integer,text,text,text,text,integer
) from public, anon, authenticated, service_role;
grant execute on function public.submit_diagnostic_writing_stage(
  uuid,uuid,uuid,integer,text,text,text,text,integer
) to service_role;

commit;
