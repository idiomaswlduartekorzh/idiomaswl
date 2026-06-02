-- ══════════════════════════════════════════════
-- WeLearn Live Quiz — Multiplayer game tables
-- Run this in Supabase SQL Editor
-- ══════════════════════════════════════════════

-- 1. Sessions (one per live event David creates)
create table if not exists game_sessions (
  id            uuid default gen_random_uuid() primary key,
  code          text unique not null,
  set_id        text not null,
  status        text not null default 'lobby',
  -- status values: lobby | question | locked | reveal | finished
  current_question_index integer not null default 0,
  created_by    uuid references auth.users(id),
  created_at    timestamptz default now()
);

-- 2. Participants (one row per person who joins)
create table if not exists game_participants (
  id            uuid default gen_random_uuid() primary key,
  session_id    uuid references game_sessions(id) on delete cascade not null,
  name          text not null,
  whatsapp      text,
  score         integer default 0,
  joined_at     timestamptz default now()
);

-- 3. Answers (one row per participant per question)
create table if not exists game_answers (
  id              uuid default gen_random_uuid() primary key,
  session_id      uuid references game_sessions(id) on delete cascade not null,
  participant_id  uuid references game_participants(id) on delete cascade not null,
  question_index  integer not null,
  answer          text not null,
  is_correct      boolean not null,
  answered_at     timestamptz default now()
);

-- Indexes
create index if not exists game_sessions_code_idx on game_sessions(code);
create index if not exists game_answers_session_q_idx on game_answers(session_id, question_index);

-- ── RLS ──────────────────────────────────────
alter table game_sessions    enable row level security;
alter table game_participants enable row level security;
alter table game_answers      enable row level security;

-- game_sessions
create policy "public can read sessions"
  on game_sessions for select using (true);
create policy "auth users can create sessions"
  on game_sessions for insert with check (auth.uid() is not null);
create policy "creator can update session"
  on game_sessions for update using (auth.uid() = created_by);

-- game_participants (no auth needed — anyone can join)
create policy "public can read participants"
  on game_participants for select using (true);
create policy "anyone can join"
  on game_participants for insert with check (true);

-- game_answers (no auth needed — anyone can answer)
create policy "public can read answers"
  on game_answers for select using (true);
create policy "anyone can submit answer"
  on game_answers for insert with check (true);
create policy "anyone can update own answer score"
  on game_answers for update using (true);

-- ── Realtime ─────────────────────────────────
-- Run these if supabase_realtime publication exists:
alter publication supabase_realtime add table game_sessions;
alter publication supabase_realtime add table game_participants;
alter publication supabase_realtime add table game_answers;
