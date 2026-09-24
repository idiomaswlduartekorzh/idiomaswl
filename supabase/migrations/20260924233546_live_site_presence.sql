-- Anonymous, short-lived presence records used only by server-side endpoints.
-- No IP address, email address, raw cookie or user-agent is persisted.
create table public.site_presence (
  session_key text primary key
    constraint site_presence_session_key_format
      check (session_key ~ '^[0-9a-f]{64}$'),
  visitor_kind text not null
    constraint site_presence_visitor_kind_values
      check (visitor_kind in ('person', 'bot')),
  source text not null
    constraint site_presence_source_values
      check (source in ('heartbeat', 'request')),
  path text not null
    constraint site_presence_path_length
      check (char_length(path) between 1 and 180),
  started_at timestamptz not null default now(),
  last_seen timestamptz not null default now()
);

comment on table public.site_presence is
  'Anonymous active-session estimates for the private administrator dashboard.';
comment on column public.site_presence.session_key is
  'SHA-256 digest; never a raw cookie, IP address, email or user-agent.';

create index site_presence_active_kind_idx
  on public.site_presence (visitor_kind, last_seen desc);
create index site_presence_last_seen_idx
  on public.site_presence (last_seen desc);

alter table public.site_presence enable row level security;
revoke all on table public.site_presence from anon, authenticated;
grant select, insert, update, delete on table public.site_presence to service_role;
