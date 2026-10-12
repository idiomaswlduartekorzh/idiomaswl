-- One anonymous browser per public page per Colombia calendar day. This records reach rather
-- than page views; heartbeats and refreshes cannot inflate the count.
create table public.site_daily_page_reach (
  day date not null,
  session_key text not null
    constraint site_daily_page_reach_session_key_format
      check (session_key ~ '^[0-9a-f]{64}$'),
  path text not null
    constraint site_daily_page_reach_path_length
      check (char_length(path) between 1 and 180),
  first_seen timestamptz not null default now(),
  primary key (day, session_key, path)
);

comment on table public.site_daily_page_reach is
  'Anonymous daily unique browser reach by public path; excludes identified bots.';
comment on column public.site_daily_page_reach.session_key is
  'SHA-256 digest of signed browser cookie; never raw cookie, IP, email or user agent.';

create index site_daily_page_reach_day_path_idx
  on public.site_daily_page_reach (day desc, path);

alter table public.site_daily_page_reach enable row level security;
revoke all on table public.site_daily_page_reach from anon, authenticated;
grant select, insert, delete on table public.site_daily_page_reach to service_role;
