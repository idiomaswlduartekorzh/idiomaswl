-- Additive, service-only operational data. No customer message bodies retained.
create table public.whatsapp_contact_intents (
  reference text primary key check (reference ~ '^WL-[A-F0-9]{24}$'),
  created_at timestamptz not null default now(),
  source_page text not null check (length(source_page) <= 400),
  landing_page text not null check (length(landing_page) <= 400),
  referrer_host text, utm_source text, utm_medium text, utm_campaign text, utm_content text,
  channel text not null,
  interaction text not null check (interaction in ('click', 'context_menu')),
  rate_key text not null check (length(rate_key) = 64)
);
create index whatsapp_contact_intents_date_idx on public.whatsapp_contact_intents(created_at desc);
create index whatsapp_contact_intents_rate_idx on public.whatsapp_contact_intents(rate_key, created_at desc);
create table public.whatsapp_contact_messages (
  message_id text primary key,
  wa_id text not null,
  occurred_at timestamptz not null,
  received_at timestamptz not null default now(),
  reference text check (reference ~ '^WL-[A-F0-9]{24}$')
  -- No FK: webhook may precede the browser POST. The report joins later.
);
create index whatsapp_contact_messages_date_idx on public.whatsapp_contact_messages(occurred_at desc);
create index whatsapp_contact_messages_conversation_idx on public.whatsapp_contact_messages(wa_id, occurred_at desc) where reference is not null;
create index whatsapp_contact_messages_ref_idx on public.whatsapp_contact_messages(reference) where reference is not null;
create table public.whatsapp_contact_manual_events (
  id bigint generated always as identity primary key,
  reference text not null references public.whatsapp_contact_intents(reference),
  actor_id uuid not null,
  confirmed boolean not null,
  created_at timestamptz not null default now()
);
create index whatsapp_contact_manual_events_ref_idx on public.whatsapp_contact_manual_events(reference, id desc);
alter table public.whatsapp_contact_intents enable row level security;
alter table public.whatsapp_contact_messages enable row level security;
alter table public.whatsapp_contact_manual_events enable row level security;
revoke all on public.whatsapp_contact_intents, public.whatsapp_contact_messages, public.whatsapp_contact_manual_events from public, anon, authenticated;
revoke all on public.whatsapp_contact_intents, public.whatsapp_contact_messages, public.whatsapp_contact_manual_events from service_role;
grant select, insert on public.whatsapp_contact_intents, public.whatsapp_contact_messages, public.whatsapp_contact_manual_events to service_role;
revoke all on sequence public.whatsapp_contact_manual_events_id_seq from public, anon, authenticated;
revoke all on sequence public.whatsapp_contact_manual_events_id_seq from service_role;
grant usage, select on sequence public.whatsapp_contact_manual_events_id_seq to service_role;

-- Atomic cross-instance quota, daily HMAC of trusted platform IP (not the raw IP).
create function public.record_whatsapp_contact_intent(p_intent jsonb, p_rate_key text)
returns boolean language plpgsql security invoker set search_path = '' as $$
begin
  perform pg_advisory_xact_lock(hashtextextended(p_rate_key, 0));
  if exists (select 1 from public.whatsapp_contact_intents where reference = p_intent->>'reference') then return true; end if;
  if (select count(*) from public.whatsapp_contact_intents where rate_key = p_rate_key and created_at > now() - interval '1 minute') >= 30 then return false; end if;
  insert into public.whatsapp_contact_intents(reference, source_page, landing_page, referrer_host,
    utm_source, utm_medium, utm_campaign, utm_content, channel, interaction, rate_key)
  values(p_intent->>'reference', p_intent->>'source_page', p_intent->>'landing_page', p_intent->>'referrer_host',
    p_intent->>'utm_source', p_intent->>'utm_medium', p_intent->>'utm_campaign', p_intent->>'utm_content',
    p_intent->>'channel', p_intent->>'interaction', p_rate_key) on conflict(reference) do nothing;
  return true;
end;
$$;
revoke all on function public.record_whatsapp_contact_intent(jsonb, text) from public, anon, authenticated;
grant execute on function public.record_whatsapp_contact_intent(jsonb, text) to service_role;

-- Full-cohort aggregates and paginated detail from ONE database snapshot.
create function public.whatsapp_contact_report(p_start timestamptz, p_end timestamptz,
  p_page integer default 1, p_reference text default null)
returns jsonb language sql stable security invoker set search_path = '' as $$
with contacts as (
  select i.*, coalesce(m.confirmed, false) as manually_confirmed,
    exists(select 1 from public.whatsapp_contact_messages w where w.reference = i.reference) as webhook_confirmed
  from public.whatsapp_contact_intents i
  left join lateral (select confirmed from public.whatsapp_contact_manual_events
    where reference = i.reference order by id desc limit 1) m on true
  where i.created_at >= p_start and i.created_at <= p_end and (p_reference is null or i.reference = p_reference)
), inbound as (
  select w.message_id, w.wa_id, w.occurred_at, coalesce(w.reference, previous.reference) as reference,
    case when w.reference is not null then 'message' when previous.reference is not null then 'conversation' else 'unknown' end as method
  from public.whatsapp_contact_messages w
  left join lateral (
    select h.reference from public.whatsapp_contact_messages h
    where h.wa_id = w.wa_id and h.reference is not null and h.occurred_at < w.occurred_at
    order by h.occurred_at desc, h.message_id limit 1
  ) previous on w.reference is null
  where w.occurred_at >= p_start and w.occurred_at <= p_end
), messages as (
  select w.*, i.source_page, i.utm_source, i.referrer_host from inbound w
  left join public.whatsapp_contact_intents i on i.reference = w.reference
  where p_reference is null or w.reference = p_reference
), breakdown as (
  select source_page, coalesce(utm_source, referrer_host, 'Directo / desconocido') as source,
    count(*) as intents, count(*) filter(where webhook_confirmed or manually_confirmed) as confirmed
  from contacts group by source_page, coalesce(utm_source, referrer_host, 'Directo / desconocido')
), rows as (
  select reference, created_at, source_page, landing_page, referrer_host, utm_source,
    utm_medium, utm_campaign, utm_content, channel, interaction, manually_confirmed, webhook_confirmed
  from contacts order by created_at desc, reference limit 50 offset (greatest(1, least(p_page, 10000)) - 1) * 50
)
select jsonb_build_object(
  'total', (select count(*) from contacts),
  'clicks', (select count(*) from contacts where interaction = 'click'),
  'context_menus', (select count(*) from contacts where interaction = 'context_menu'),
  'confirmed', (select count(*) from contacts where webhook_confirmed or manually_confirmed),
  'messages', (select count(*) from messages),
  'unattributed_messages', (select count(*) from messages where source_page is null),
  'rows', coalesce((select jsonb_agg(r) from rows r), '[]'::jsonb),
  'sources', coalesce((select jsonb_agg(b) from (select * from breakdown order by intents desc, source_page, source limit 50) b), '[]'::jsonb),
  'source_groups', (select count(*) from breakdown),
  'recent_messages', coalesce((select jsonb_agg(m) from (select * from messages order by occurred_at desc, message_id limit 50) m), '[]'::jsonb)
);
$$;
revoke all on function public.whatsapp_contact_report(timestamptz, timestamptz, integer, text) from public, anon, authenticated;
grant execute on function public.whatsapp_contact_report(timestamptz, timestamptz, integer, text) to service_role;
