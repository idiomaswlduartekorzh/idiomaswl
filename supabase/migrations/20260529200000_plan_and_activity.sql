-- ── Plan column on profiles ─────────────────────────────────────────────────
-- Tracks which subscription plan each student is on.
alter table profiles
  add column if not exists plan text not null default 'autodidacta'
    check (plan in ('autodidacta', 'preparacion', 'intensivo'));

-- Admin can update any profile's plan
create policy "Admins can update any profile"
  on profiles for update
  using (exists (
    select 1 from profiles p where p.id = auth.uid() and p.role = 'admin'
  ));

-- ── Daily activity tracking (for streak calculation) ─────────────────────────
create table if not exists daily_activity (
  id            uuid default gen_random_uuid() primary key,
  user_id       uuid references profiles(id) on delete cascade not null,
  activity_date date not null default current_date,
  created_at    timestamptz default now(),
  unique (user_id, activity_date)
);

alter table daily_activity enable row level security;

create policy "Users can view own activity"
  on daily_activity for select using (auth.uid() = user_id);

create policy "Users can insert own activity"
  on daily_activity for insert with check (auth.uid() = user_id);

create policy "Admins can view all activity"
  on daily_activity for select
  using (exists (
    select 1 from profiles p where p.id = auth.uid() and p.role = 'admin'
  ));
