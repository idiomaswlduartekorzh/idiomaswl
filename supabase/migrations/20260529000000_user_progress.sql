-- ============================================================
-- USER_PROGRESS — Progreso de lecciones por usuario
-- Registra qué pasos del método WeLearn ha completado cada usuario.
-- ============================================================

create table public.user_progress (
  id           uuid        primary key default gen_random_uuid(),
  user_id      uuid        not null references auth.users(id) on delete cascade,
  course_slug  text        not null,   -- 'korean' | 'english' | etc.
  step_id      text        not null,   -- '1' | '2' | 'step001' | etc.
  completed_at timestamptz not null default now(),
  -- Optional: track which stage within a step was last completed
  last_stage   text,                   -- 'step001' | 'step007' | null
  -- Allow re-completions (each row = one session completion)
  constraint user_progress_unique_step unique (user_id, course_slug, step_id)
);

-- ── Indexes ──────────────────────────────────────────────────────────────────
create index user_progress_user_idx   on public.user_progress (user_id);
create index user_progress_course_idx on public.user_progress (user_id, course_slug);

-- ── Row Level Security ────────────────────────────────────────────────────────
alter table public.user_progress enable row level security;

-- Users can read and write their own progress only
create policy "progress_select_own"
  on public.user_progress for select
  to authenticated
  using (auth.uid() = user_id);

create policy "progress_insert_own"
  on public.user_progress for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "progress_update_own"
  on public.user_progress for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Admins can read all progress for analytics
create policy "progress_select_admin"
  on public.user_progress for select
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.role = 'admin'
    )
  );
