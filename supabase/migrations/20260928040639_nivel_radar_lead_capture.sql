-- Nivel Radar lead capture: first-party attribution, explicit consent metadata,
-- durable abuse protection and an admin-manageable lead lifecycle.

alter table public.leads
  add column if not exists utm_content text,
  add column if not exists utm_term text,
  add column if not exists landing_page text,
  add column if not exists referrer_host text,
  add column if not exists contact_consent_at timestamptz,
  add column if not exists marketing_consent boolean not null default false,
  add column if not exists marketing_consent_at timestamptz,
  add column if not exists consent_version text,
  add column if not exists lead_status text not null default 'new',
  add column if not exists profile_data jsonb not null default '{}'::jsonb,
  add column if not exists rate_key text,
  add column if not exists updated_at timestamptz not null default now();

alter table public.leads
  drop constraint if exists leads_lead_status_check,
  add constraint leads_lead_status_check
    check (lead_status in ('new', 'contacted', 'qualified', 'converted', 'discarded')),
  drop constraint if exists leads_profile_data_object_check,
  add constraint leads_profile_data_object_check
    check (jsonb_typeof(profile_data) = 'object'),
  drop constraint if exists leads_rate_key_check,
  add constraint leads_rate_key_check
    check (rate_key is null or rate_key ~ '^[0-9a-f]{64}$');

create index if not exists leads_source_created_at_idx
  on public.leads (source, created_at desc);
create index if not exists leads_status_created_at_idx
  on public.leads (lead_status, created_at desc);
create index if not exists leads_utm_campaign_idx
  on public.leads (utm_campaign)
  where utm_campaign is not null;

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create table if not exists private.lead_capture_events (
  id bigserial primary key,
  rate_key text not null check (rate_key ~ '^[0-9a-f]{64}$'),
  created_at timestamptz not null default clock_timestamp()
);

create index if not exists lead_capture_events_rate_window_idx
  on private.lead_capture_events (rate_key, created_at desc);

revoke all on table private.lead_capture_events from public, anon, authenticated;
revoke all on sequence private.lead_capture_events_id_seq from public, anon, authenticated;

-- Lead writes must pass through the server action below. Removing the broad
-- client INSERT permission prevents browser callers from fabricating consent,
-- attribution or profile data directly through PostgREST.
drop policy if exists "leads_insert_anon" on public.leads;
revoke insert on table public.leads from anon, authenticated;

create or replace function public.capture_public_lead(
  p_lead jsonb,
  p_rate_key text
)
returns uuid
language plpgsql
security definer
set search_path = pg_catalog, public, private
as $$
declare
  v_id uuid;
  v_now timestamptz := clock_timestamp();
  v_name text := nullif(btrim(p_lead ->> 'name'), '');
  v_whatsapp text := nullif(btrim(p_lead ->> 'whatsapp'), '');
  v_email text := nullif(lower(btrim(p_lead ->> 'email')), '');
  v_source text := coalesce(nullif(btrim(p_lead ->> 'source'), ''), 'unknown');
  v_profile jsonb := coalesce(p_lead -> 'profile_data', '{}'::jsonb);
  v_marketing boolean := coalesce((p_lead ->> 'marketing_consent')::boolean, false);
  v_contact boolean := coalesce((p_lead ->> 'contact_consent')::boolean, false);
begin
  if p_lead is null or jsonb_typeof(p_lead) <> 'object' then
    raise exception 'invalid_lead_payload';
  end if;
  if p_rate_key is null or p_rate_key !~ '^[0-9a-f]{64}$' then
    raise exception 'invalid_rate_key';
  end if;
  if v_whatsapp is null or v_whatsapp !~ '^\+[1-9][0-9]{9,14}$' then
    raise exception 'invalid_whatsapp';
  end if;
  if v_email is not null and (length(v_email) > 254 or v_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$') then
    raise exception 'invalid_email';
  end if;
  if length(coalesce(v_name, '')) > 100
     or length(v_source) > 64
     or jsonb_typeof(v_profile) <> 'object'
     or octet_length(v_profile::text) > 8192 then
    raise exception 'invalid_lead_payload';
  end if;

  -- Serialize requests with the same privacy-preserving hash so concurrent
  -- submissions cannot race past the hourly quota.
  perform pg_advisory_xact_lock(hashtextextended(p_rate_key, 0));
  if (
    select count(*)
    from private.lead_capture_events
    where rate_key = p_rate_key
      and created_at >= v_now - interval '1 hour'
  ) >= 8 then
    raise exception 'lead_rate_limit';
  end if;

  insert into private.lead_capture_events (rate_key, created_at)
  values (p_rate_key, v_now);

  select id into v_id
  from public.leads
  where source = v_source
    and whatsapp = v_whatsapp
    and created_at >= v_now - interval '24 hours'
  order by created_at desc
  limit 1;

  if v_id is not null then
    update public.leads
    set name = coalesce(v_name, name),
        email = coalesce(v_email, email),
        exam_slug = coalesce(nullif(btrim(p_lead ->> 'exam_slug'), ''), exam_slug),
        exam_score = coalesce(nullif(btrim(p_lead ->> 'exam_score'), ''), exam_score),
        utm_source = coalesce(nullif(btrim(p_lead ->> 'utm_source'), ''), utm_source),
        utm_medium = coalesce(nullif(btrim(p_lead ->> 'utm_medium'), ''), utm_medium),
        utm_campaign = coalesce(nullif(btrim(p_lead ->> 'utm_campaign'), ''), utm_campaign),
        utm_content = coalesce(nullif(btrim(p_lead ->> 'utm_content'), ''), utm_content),
        utm_term = coalesce(nullif(btrim(p_lead ->> 'utm_term'), ''), utm_term),
        landing_page = coalesce(nullif(btrim(p_lead ->> 'landing_page'), ''), landing_page),
        referrer_host = coalesce(nullif(btrim(p_lead ->> 'referrer_host'), ''), referrer_host),
        contact_consent_at = case when v_contact then coalesce(contact_consent_at, v_now) else contact_consent_at end,
        marketing_consent = marketing_consent or v_marketing,
        marketing_consent_at = case when v_marketing then coalesce(marketing_consent_at, v_now) else marketing_consent_at end,
        consent_version = coalesce(nullif(btrim(p_lead ->> 'consent_version'), ''), consent_version),
        profile_data = case when v_profile = '{}'::jsonb then profile_data else v_profile end,
        rate_key = p_rate_key,
        updated_at = v_now
    where id = v_id;
    return v_id;
  end if;

  insert into public.leads (
    name, whatsapp, email, exam_slug, exam_score, source,
    utm_source, utm_medium, utm_campaign, utm_content, utm_term,
    landing_page, referrer_host, contact_consent_at,
    marketing_consent, marketing_consent_at, consent_version,
    profile_data, rate_key, created_at, updated_at
  ) values (
    v_name,
    v_whatsapp,
    v_email,
    nullif(btrim(p_lead ->> 'exam_slug'), ''),
    nullif(btrim(p_lead ->> 'exam_score'), ''),
    v_source,
    nullif(btrim(p_lead ->> 'utm_source'), ''),
    nullif(btrim(p_lead ->> 'utm_medium'), ''),
    nullif(btrim(p_lead ->> 'utm_campaign'), ''),
    nullif(btrim(p_lead ->> 'utm_content'), ''),
    nullif(btrim(p_lead ->> 'utm_term'), ''),
    nullif(btrim(p_lead ->> 'landing_page'), ''),
    nullif(btrim(p_lead ->> 'referrer_host'), ''),
    case when v_contact then v_now else null end,
    v_marketing,
    case when v_marketing then v_now else null end,
    nullif(btrim(p_lead ->> 'consent_version'), ''),
    v_profile,
    p_rate_key,
    v_now,
    v_now
  ) returning id into v_id;

  return v_id;
end;
$$;

revoke all on function public.capture_public_lead(jsonb, text) from public, anon, authenticated;
grant execute on function public.capture_public_lead(jsonb, text) to service_role;

comment on function public.capture_public_lead(jsonb, text) is
  'Server-only lead capture with hourly abuse quota and 24-hour source/WhatsApp deduplication.';
