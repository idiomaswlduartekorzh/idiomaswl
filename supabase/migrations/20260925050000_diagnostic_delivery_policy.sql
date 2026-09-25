-- Bind attempt creation and result validity to one versioned delivery policy.
-- Limits are enforced inside the same transaction as creation so concurrent
-- requests cannot bypass the active-attempt or production cooldown rules.

begin;

alter table public.diagnostic_attempts
  add column delivery_policy_version text not null default 'legacy-unversioned'
    check (char_length(delivery_policy_version) between 3 and 100),
  add column access_mode text not null default 'pilot'
    check (access_mode in ('pilot','production')),
  add column exposure_lookback_days smallint not null default 365
    check (exposure_lookback_days between 1 and 730),
  add column result_validity_days smallint not null default 30
    check (result_validity_days between 1 and 730);

drop function public.create_diagnostic_attempt(
  uuid,uuid,text,text,text,text,text,timestamptz,text,timestamptz,uuid,text[],jsonb,jsonb
);

create function public.create_diagnostic_attempt(
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
  if cardinality(p_item_ids) <> 12
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
    'externalWritingProcessingConsent', false
  ));

  return p_attempt_id;
end
$function$;

revoke all on function public.create_diagnostic_attempt(
  uuid,uuid,text,text,text,text,text,timestamptz,text,text,integer,integer,integer,integer,text,timestamptz,uuid,text[],jsonb,jsonb
) from public, anon, authenticated, service_role;
grant execute on function public.create_diagnostic_attempt(
  uuid,uuid,text,text,text,text,text,timestamptz,text,text,integer,integer,integer,integer,text,timestamptz,uuid,text[],jsonb,jsonb
) to service_role;

comment on column public.diagnostic_attempts.delivery_policy_version is
  'Immutable delivery policy version used for start limits and result validity.';
comment on column public.diagnostic_attempts.result_validity_days is
  'Approved or pilot-policy validity window copied at attempt creation.';
comment on column public.diagnostic_attempts.exposure_lookback_days is
  'Immutable lookback window used to avoid recently served diagnostic content.';

commit;
