-- Replace the reviewed free-writing gate with a fifth machine-scored construct:
-- written-discourse construction and revision. Historical writing rows remain intact.

begin;

alter table public.diagnostic_responses
  drop constraint diagnostic_responses_skill_check,
  add constraint diagnostic_responses_skill_check
    check (skill in ('reading','listening','written-discourse','grammar','vocabulary'));

create or replace function public.create_diagnostic_attempt(
  p_attempt_id uuid,
  p_user_id uuid,
  p_language text,
  p_blueprint_version text,
  p_bank_version text,
  p_engine_version text,
  p_consent_version text,
  p_consented_at timestamptz,
  p_delivery_policy_version text,
  p_access_mode text,
  p_minimum_days_between_completed integer,
  p_maximum_concurrent_active integer,
  p_exposure_lookback_days integer,
  p_result_validity_days integer,
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
declare
  v_active_count integer;
begin
  if p_user_id is null
    or p_expires_at <= now()
    or p_consent_version is null
    or char_length(p_consent_version) not between 3 and 100
    or p_consented_at is null
    or p_consented_at > now() + interval '5 minutes'
    or p_delivery_policy_version is null
    or char_length(p_delivery_policy_version) not between 3 and 100
    or p_access_mode not in ('pilot','production')
    or p_minimum_days_between_completed not between 0 and 365
    or p_maximum_concurrent_active not between 1 and 3
    or p_exposure_lookback_days not between 1 and 730
    or p_result_validity_days not between 1 and 730 then
    raise exception 'diagnostic_attempt_invalid';
  end if;
  if cardinality(p_item_ids) <> 15
    or (select count(distinct item_id) from unnest(p_item_ids) as items(item_id)) <> cardinality(p_item_ids)
    or jsonb_typeof(p_content_versions) <> 'object'
    or jsonb_typeof(p_selection_receipt) <> 'object' then
    raise exception 'diagnostic_locator_invalid';
  end if;

  perform pg_advisory_xact_lock(hashtextextended(p_user_id::text, 0));
  select count(*) into v_active_count
  from public.diagnostic_attempts
  where user_id = p_user_id
    and status in ('locator','precision','confirmation','writing','scoring')
    and expires_at > now();
  if v_active_count >= p_maximum_concurrent_active then
    raise exception 'diagnostic_attempt_active_limit';
  end if;
  if p_minimum_days_between_completed > 0 and exists (
    select 1 from public.diagnostic_attempts
    where user_id = p_user_id
      and status = 'completed'
      and completed_at > now() - make_interval(days => p_minimum_days_between_completed)
  ) then
    raise exception 'diagnostic_attempt_cooldown';
  end if;

  insert into public.diagnostic_attempts (
    id, user_id, language, blueprint_version, bank_version, engine_version,
    consent_version, consented_at, delivery_policy_version, access_mode,
    exposure_lookback_days, result_validity_days, status, selection_seed_hash, expires_at
  ) values (
    p_attempt_id, p_user_id, p_language, p_blueprint_version, p_bank_version, p_engine_version,
    p_consent_version, p_consented_at, p_delivery_policy_version, p_access_mode,
    p_exposure_lookback_days, p_result_validity_days, 'locator', p_selection_seed_hash, p_expires_at
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
    'engineVersion', p_engine_version,
    'consentVersion', p_consent_version,
    'deliveryPolicyVersion', p_delivery_policy_version,
    'accessMode', p_access_mode,
    'exposureLookbackDays', p_exposure_lookback_days,
    'resultValidityDays', p_result_validity_days,
    'constructs', jsonb_build_array('reading','listening','written-discourse','grammar','vocabulary')
  ));

  return p_attempt_id;
end
$function$;

create function public.complete_diagnostic_objective_attempt(
  p_attempt_id uuid,
  p_stage_id uuid,
  p_user_id uuid,
  p_expected_attempt_version integer,
  p_submission_digest text,
  p_responses jsonb,
  p_result_profile jsonb
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
  if jsonb_typeof(p_result_profile) <> 'object' then
    raise exception 'diagnostic_result_invalid';
  end if;

  select * into v_attempt from public.diagnostic_attempts
  where id = p_attempt_id and user_id = p_user_id for update;
  if not found then raise exception 'diagnostic_attempt_not_found'; end if;

  select * into v_stage from public.diagnostic_stages
  where id = p_stage_id and attempt_id = p_attempt_id and user_id = p_user_id for update;
  if not found then raise exception 'diagnostic_stage_not_found'; end if;

  if v_stage.status = 'completed' then
    if v_stage.submission_digest = p_submission_digest and v_attempt.status = 'completed' then
      return jsonb_build_object('replayed', true, 'version', v_attempt.version);
    end if;
    raise exception 'diagnostic_stage_already_completed';
  end if;
  if v_attempt.version <> p_expected_attempt_version then raise exception 'diagnostic_attempt_version_conflict'; end if;
  if v_attempt.expires_at <= now() then raise exception 'diagnostic_attempt_expired'; end if;
  if v_attempt.status not in ('precision','confirmation') or v_stage.kind <> v_attempt.status then
    raise exception 'diagnostic_stage_out_of_order';
  end if;
  if jsonb_typeof(p_responses) <> 'array' or jsonb_array_length(p_responses) <> cardinality(v_stage.item_ids) then
    raise exception 'diagnostic_response_count_invalid';
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
  set status = 'completed', result_profile = p_result_profile,
      version = v_next_version, completed_at = now(), updated_at = now()
  where id = p_attempt_id;

  insert into public.diagnostic_attempt_events (attempt_id, user_id, event_type, payload)
  values (p_attempt_id, p_user_id, 'attempt.completed', jsonb_build_object(
    'stageId', p_stage_id,
    'stageKind', v_stage.kind,
    'attemptVersion', v_next_version,
    'globalLevel', p_result_profile->>'globalLevel',
    'overallStatus', p_result_profile->>'overallStatus'
  ));

  return jsonb_build_object('replayed', false, 'version', v_next_version);
end
$function$;

revoke all on function public.complete_diagnostic_objective_attempt(
  uuid,uuid,uuid,integer,text,jsonb,jsonb
) from public, anon, authenticated, service_role;
grant execute on function public.complete_diagnostic_objective_attempt(
  uuid,uuid,uuid,integer,text,jsonb,jsonb
) to service_role;

commit;
