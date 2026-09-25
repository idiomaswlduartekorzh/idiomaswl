-- Atomic creation and stage submission for the adaptive diagnostic.
-- Both functions are SECURITY INVOKER and executable only by service_role.

begin;

alter table public.diagnostic_stages
  add column submission_digest text check (submission_digest is null or submission_digest ~ '^[0-9a-f]{64}$');

create function public.create_diagnostic_attempt(
  p_attempt_id uuid,
  p_user_id uuid,
  p_language text,
  p_blueprint_version text,
  p_bank_version text,
  p_engine_version text,
  p_selection_seed_hash text,
  p_expires_at timestamptz,
  p_stage_id uuid,
  p_item_ids text[],
  p_content_versions jsonb,
  p_selection_receipt jsonb
)
returns uuid
language plpgsql
security invoker
set search_path = ''
as $function$
begin
  if p_user_id is null or p_expires_at <= now() then
    raise exception 'diagnostic_attempt_invalid';
  end if;
  if cardinality(p_item_ids) <> 12
    or (select count(distinct item_id) from unnest(p_item_ids) as items(item_id)) <> cardinality(p_item_ids)
    or jsonb_typeof(p_content_versions) <> 'object'
    or jsonb_typeof(p_selection_receipt) <> 'object' then
    raise exception 'diagnostic_locator_invalid';
  end if;

  insert into public.diagnostic_attempts (
    id, user_id, language, blueprint_version, bank_version, engine_version,
    status, selection_seed_hash, expires_at
  ) values (
    p_attempt_id, p_user_id, p_language, p_blueprint_version, p_bank_version, p_engine_version,
    'locator', p_selection_seed_hash, p_expires_at
  );

  insert into public.diagnostic_stages (
    id, attempt_id, user_id, stage_index, kind, status, item_ids,
    content_versions, selection_receipt
  ) values (
    p_stage_id, p_attempt_id, p_user_id, 0, 'locator', 'issued', p_item_ids,
    p_content_versions, p_selection_receipt
  );

  insert into public.diagnostic_attempt_events (attempt_id, user_id, event_type, payload)
  values (p_attempt_id, p_user_id, 'attempt.created', jsonb_build_object(
    'stageId', p_stage_id,
    'blueprintVersion', p_blueprint_version,
    'bankVersion', p_bank_version,
    'engineVersion', p_engine_version
  ));

  return p_attempt_id;
end
$function$;

create function public.submit_diagnostic_objective_stage(
  p_attempt_id uuid,
  p_stage_id uuid,
  p_user_id uuid,
  p_expected_attempt_version integer,
  p_submission_digest text,
  p_responses jsonb,
  p_next_status text,
  p_route_id text,
  p_next_stage_id uuid default null,
  p_next_stage_kind text default null,
  p_next_stage_index smallint default null,
  p_next_item_ids text[] default null,
  p_next_content_versions jsonb default null,
  p_next_selection_receipt jsonb default null
)
returns jsonb
language plpgsql
security invoker
set search_path = ''
as $function$
declare
  v_attempt public.diagnostic_attempts%rowtype;
  v_stage public.diagnostic_stages%rowtype;
  v_response jsonb;
  v_item_id text;
  v_seen text[] := array[]::text[];
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
    if v_stage.submission_digest = p_submission_digest then
      return jsonb_build_object('replayed', true, 'version', v_attempt.version);
    end if;
    raise exception 'diagnostic_stage_already_completed';
  end if;
  if v_attempt.version <> p_expected_attempt_version then raise exception 'diagnostic_attempt_version_conflict'; end if;
  if v_attempt.expires_at <= now() then raise exception 'diagnostic_attempt_expired'; end if;
  if v_attempt.status <> v_stage.kind then raise exception 'diagnostic_stage_out_of_order'; end if;
  if jsonb_typeof(p_responses) <> 'array' or jsonb_array_length(p_responses) <> cardinality(v_stage.item_ids) then
    raise exception 'diagnostic_response_count_invalid';
  end if;
  if not (
    (v_attempt.status = 'locator' and p_next_status = 'precision' and p_route_id is not null)
    or (v_attempt.status = 'precision' and p_next_status in ('confirmation','writing'))
    or (v_attempt.status = 'confirmation' and p_next_status = 'writing')
  ) then
    raise exception 'diagnostic_transition_invalid';
  end if;
  if p_next_status in ('precision','confirmation','writing') and (
    p_next_stage_id is null or p_next_stage_kind <> p_next_status or p_next_stage_index is null
    or cardinality(p_next_item_ids) = 0 or jsonb_typeof(p_next_content_versions) <> 'object'
    or jsonb_typeof(p_next_selection_receipt) <> 'object'
  ) then
    raise exception 'diagnostic_next_stage_invalid';
  end if;

  for v_response in select value from jsonb_array_elements(p_responses) loop
    v_item_id := v_response->>'itemId';
    if v_item_id is null
      or not (v_item_id = any(v_stage.item_ids))
      or v_item_id = any(v_seen)
      or coalesce(v_response->>'contentVersion', '') <> coalesce(v_stage.content_versions->>v_item_id, '') then
      raise exception 'diagnostic_response_binding_invalid';
    end if;
    v_seen := array_append(v_seen, v_item_id);
    insert into public.diagnostic_responses (
      attempt_id, stage_id, user_id, item_id, content_version, skill,
      submitted_response, outcome, response_ms, audio_play_count, served_at
    ) values (
      p_attempt_id, p_stage_id, p_user_id, v_item_id, v_response->>'contentVersion', v_response->>'skill',
      v_response->'response', v_response->>'outcome',
      nullif(v_response->>'responseMs', '')::integer,
      nullif(v_response->>'audioPlayCount', '')::smallint,
      v_stage.issued_at
    );
  end loop;

  update public.diagnostic_stages
  set status = 'completed', completed_at = now(), submission_digest = p_submission_digest
  where id = p_stage_id;

  v_next_version := v_attempt.version + 1;
  update public.diagnostic_attempts
  set status = p_next_status,
      route_id = coalesce(p_route_id, route_id),
      version = v_next_version,
      updated_at = now()
  where id = p_attempt_id;

  if p_next_stage_id is not null then
    insert into public.diagnostic_stages (
      id, attempt_id, user_id, stage_index, kind, route_id, status,
      item_ids, content_versions, selection_receipt
    ) values (
      p_next_stage_id, p_attempt_id, p_user_id, p_next_stage_index, p_next_stage_kind,
      coalesce(p_route_id, v_attempt.route_id), 'issued', p_next_item_ids,
      p_next_content_versions, p_next_selection_receipt
    );
  end if;

  insert into public.diagnostic_attempt_events (attempt_id, user_id, event_type, payload)
  values (p_attempt_id, p_user_id, 'stage.completed', jsonb_build_object(
    'stageId', p_stage_id,
    'stageKind', v_stage.kind,
    'nextStatus', p_next_status,
    'nextStageId', p_next_stage_id,
    'attemptVersion', v_next_version
  ));

  return jsonb_build_object('replayed', false, 'version', v_next_version);
end
$function$;

revoke all on function public.create_diagnostic_attempt(
  uuid,uuid,text,text,text,text,text,timestamptz,uuid,text[],jsonb,jsonb
) from public, anon, authenticated, service_role;
grant execute on function public.create_diagnostic_attempt(
  uuid,uuid,text,text,text,text,text,timestamptz,uuid,text[],jsonb,jsonb
) to service_role;

revoke all on function public.submit_diagnostic_objective_stage(
  uuid,uuid,uuid,integer,text,jsonb,text,text,uuid,text,smallint,text[],jsonb,jsonb
) from public, anon, authenticated, service_role;
grant execute on function public.submit_diagnostic_objective_stage(
  uuid,uuid,uuid,integer,text,jsonb,text,text,uuid,text,smallint,text[],jsonb,jsonb
) to service_role;

commit;
