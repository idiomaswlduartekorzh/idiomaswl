-- Durable, server-mediated state for the adaptive diagnostic.
-- The Data API exposes none of these rows to browser roles. Route handlers
-- authenticate the caller, then use the service role with explicit ownership
-- predicates in repository code. This also prevents mid-test outcome leakage.

begin;

create table public.diagnostic_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  language text not null check (language ~ '^[a-z]{2,3}$'),
  blueprint_version text not null check (char_length(blueprint_version) between 3 and 100),
  bank_version text not null check (char_length(bank_version) between 3 and 100),
  engine_version text not null check (char_length(engine_version) between 3 and 100),
  status text not null default 'locator'
    check (status in ('locator','precision','writing','scoring','completed','expired','abandoned')),
  route_id text check (route_id is null or route_id in ('low-a1-a2','mid-b1-b2','high-c1-c2')),
  selection_seed_hash text not null check (selection_seed_hash ~ '^[0-9a-f]{64}$'),
  result_profile jsonb check (result_profile is null or jsonb_typeof(result_profile) = 'object'),
  version integer not null default 1 check (version > 0),
  started_at timestamptz not null default now(),
  expires_at timestamptz not null,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  check (expires_at > started_at),
  check ((status = 'completed' and completed_at is not null and result_profile is not null) or status <> 'completed'),
  unique (id, user_id)
);

create table public.diagnostic_stages (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null,
  user_id uuid not null,
  stage_index smallint not null check (stage_index between 0 and 20),
  kind text not null check (kind in ('locator','precision','confirmation','writing')),
  route_id text check (route_id is null or route_id in ('low-a1-a2','mid-b1-b2','high-c1-c2')),
  status text not null default 'issued' check (status in ('issued','completed','expired')),
  item_ids text[] not null check (cardinality(item_ids) > 0),
  content_versions jsonb not null check (jsonb_typeof(content_versions) = 'object'),
  selection_receipt jsonb not null check (jsonb_typeof(selection_receipt) = 'object'),
  issued_at timestamptz not null default now(),
  completed_at timestamptz,
  foreign key (attempt_id, user_id) references public.diagnostic_attempts(id, user_id) on delete cascade,
  unique (attempt_id, stage_index),
  unique (id, attempt_id, user_id),
  check ((status = 'completed' and completed_at is not null) or status <> 'completed')
);

create table public.diagnostic_responses (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null,
  stage_id uuid not null,
  user_id uuid not null,
  item_id text not null check (char_length(item_id) between 3 and 160),
  content_version text not null check (char_length(content_version) between 1 and 100),
  skill text not null check (skill in ('reading','listening','grammar','vocabulary')),
  submitted_response jsonb not null check (jsonb_typeof(submitted_response) = 'object'),
  outcome text not null check (outcome in ('correct','incorrect','omitted')),
  response_ms integer check (response_ms is null or response_ms between 0 and 3600000),
  audio_play_count smallint check (audio_play_count is null or audio_play_count between 0 and 20),
  served_at timestamptz not null,
  submitted_at timestamptz not null default now(),
  foreign key (stage_id, attempt_id, user_id)
    references public.diagnostic_stages(id, attempt_id, user_id) on delete cascade,
  unique (attempt_id, item_id)
);

create table public.diagnostic_writing_evaluations (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null,
  user_id uuid not null,
  prompt_id text not null check (char_length(prompt_id) between 3 and 160),
  content_version text not null check (char_length(content_version) between 1 and 100),
  response_text text not null check (char_length(response_text) between 1 and 12000),
  word_count integer not null check (word_count between 1 and 3000),
  status text not null default 'pending'
    check (status in ('pending','automated-scored','human-review','adjudication','completed','failed')),
  automated_evaluation jsonb check (automated_evaluation is null or jsonb_typeof(automated_evaluation) = 'object'),
  human_evaluation jsonb check (human_evaluation is null or jsonb_typeof(human_evaluation) = 'object'),
  final_evidence jsonb check (final_evidence is null or jsonb_typeof(final_evidence) = 'object'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz,
  foreign key (attempt_id, user_id) references public.diagnostic_attempts(id, user_id) on delete cascade,
  unique (attempt_id),
  check ((status = 'completed' and completed_at is not null and final_evidence is not null) or status <> 'completed')
);

create table public.diagnostic_attempt_events (
  id bigint generated always as identity primary key,
  attempt_id uuid not null,
  user_id uuid not null,
  event_type text not null check (event_type ~ '^[a-z][a-z0-9_.-]{2,79}$'),
  payload jsonb not null default '{}'::jsonb check (jsonb_typeof(payload) = 'object'),
  created_at timestamptz not null default now(),
  foreign key (attempt_id, user_id) references public.diagnostic_attempts(id, user_id) on delete cascade
);

create index diagnostic_attempts_user_updated_idx
  on public.diagnostic_attempts(user_id, updated_at desc);
create index diagnostic_attempts_active_expiry_idx
  on public.diagnostic_attempts(expires_at)
  where status in ('locator','precision','writing','scoring');
create index diagnostic_stages_attempt_idx
  on public.diagnostic_stages(attempt_id, stage_index);
create index diagnostic_responses_attempt_skill_idx
  on public.diagnostic_responses(attempt_id, skill, submitted_at);
create index diagnostic_writing_user_created_idx
  on public.diagnostic_writing_evaluations(user_id, created_at desc);
create index diagnostic_events_attempt_created_idx
  on public.diagnostic_attempt_events(attempt_id, created_at);

alter table public.diagnostic_attempts enable row level security;
alter table public.diagnostic_stages enable row level security;
alter table public.diagnostic_responses enable row level security;
alter table public.diagnostic_writing_evaluations enable row level security;
alter table public.diagnostic_attempt_events enable row level security;

revoke all on table
  public.diagnostic_attempts,
  public.diagnostic_stages,
  public.diagnostic_responses,
  public.diagnostic_writing_evaluations,
  public.diagnostic_attempt_events
from public, anon, authenticated, service_role;

grant select, insert, update, delete on table
  public.diagnostic_attempts,
  public.diagnostic_stages,
  public.diagnostic_responses,
  public.diagnostic_writing_evaluations,
  public.diagnostic_attempt_events
to service_role;
grant usage, select on sequence public.diagnostic_attempt_events_id_seq to service_role;

comment on table public.diagnostic_attempts is
  'Server-mediated adaptive diagnostic state and final five-skill profile; no direct browser access.';
comment on table public.diagnostic_responses is
  'Versioned objective responses and server-computed outcomes used for item calibration.';
comment on table public.diagnostic_writing_evaluations is
  'Writing evidence with separate automated, human and adjudicated evaluations.';

commit;
