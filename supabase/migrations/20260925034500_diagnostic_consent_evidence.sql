-- Version consent evidence at attempt creation. External writing processing is
-- fail-closed by default and can only become true with its own versioned policy.

begin;

alter table public.diagnostic_attempts
  add column consent_version text,
  add column consented_at timestamptz,
  add column external_writing_processing_consent boolean not null default false,
  add column external_writing_consent_version text,
  add column external_writing_provider_policy_version text,
  add column external_writing_consented_at timestamptz;

alter table public.diagnostic_attempts
  add constraint diagnostic_general_consent_evidence_check check (
    (consent_version is null and consented_at is null)
    or (
      consent_version is not null
      and char_length(consent_version) between 3 and 100
      and consented_at is not null
      and consented_at <= started_at + interval '5 minutes'
    )
  ),
  add constraint diagnostic_external_writing_consent_evidence_check check (
    (
      external_writing_processing_consent = false
      and external_writing_consent_version is null
      and external_writing_provider_policy_version is null
      and external_writing_consented_at is null
    )
    or (
      external_writing_processing_consent = true
      and external_writing_consent_version is not null
      and external_writing_provider_policy_version is not null
      and char_length(external_writing_consent_version) between 3 and 100
      and char_length(external_writing_provider_policy_version) between 3 and 100
      and external_writing_consented_at is not null
      and external_writing_consented_at <= started_at + interval '5 minutes'
    )
  );

drop function public.create_diagnostic_attempt(
  uuid,uuid,text,text,text,text,text,timestamptz,uuid,text[],jsonb,jsonb
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
  if p_user_id is null
    or p_expires_at <= now()
    or p_consent_version is null
    or char_length(p_consent_version) not between 3 and 100
    or p_consented_at is null
    or p_consented_at > now() + interval '5 minutes' then
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
    consent_version, consented_at, status, selection_seed_hash, expires_at
  ) values (
    p_attempt_id, p_user_id, p_language, p_blueprint_version, p_bank_version, p_engine_version,
    p_consent_version, p_consented_at, 'locator', p_selection_seed_hash, p_expires_at
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
    'externalWritingProcessingConsent', false
  ));

  return p_attempt_id;
end
$function$;

revoke all on function public.create_diagnostic_attempt(
  uuid,uuid,text,text,text,text,text,timestamptz,text,timestamptz,uuid,text[],jsonb,jsonb
) from public, anon, authenticated, service_role;
grant execute on function public.create_diagnostic_attempt(
  uuid,uuid,text,text,text,text,text,timestamptz,text,timestamptz,uuid,text[],jsonb,jsonb
) to service_role;

comment on column public.diagnostic_attempts.consent_version is
  'Version of the general diagnostic consent accepted when this attempt was created.';
comment on column public.diagnostic_attempts.external_writing_processing_consent is
  'False unless the learner separately authorized external processing of the writing response.';

commit;
