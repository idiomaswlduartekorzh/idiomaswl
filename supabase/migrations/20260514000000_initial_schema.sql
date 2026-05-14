-- ============================================================
-- IDIOMAS WELEARN — Supabase Schema
-- ============================================================

-- Enums
create type user_role as enum ('user', 'admin');
create type subscription_plan as enum ('free', 'single_language', 'all_languages');
create type subscription_status as enum ('active', 'cancelled', 'past_due', 'trialing');
create type step_type as enum (
  'activation', 'guided_acquisition', 'recognition',
  'listenable_input', 'context', 'pattern_discovery',
  'micro_explanations', 'guided_production', 'reactive_interaction',
  'daily_exam', 'cumulative_exam'
);

-- ============================================================
-- USERS (extends Supabase auth.users)
-- ============================================================
create table public.profiles (
  id              uuid primary key references auth.users(id) on delete cascade,
  name            text,
  role            user_role not null default 'user',
  avatar_url      text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ============================================================
-- LANGUAGES
-- ============================================================
create table public.languages (
  id              serial primary key,
  code            char(2) not null unique,        -- 'ko', 'en', etc.
  slug            text not null unique,            -- 'korean', 'english', etc.
  name            text not null,                  -- 'Coreano'
  native_name     text not null,                  -- '한국어'
  flag_text       text not null,                  -- '한'
  lesson_count    int not null default 0,
  level_range     text not null,                  -- 'A1 – B2'
  is_active       boolean not null default true,
  created_at      timestamptz not null default now()
);

-- ============================================================
-- LESSONS (días de estudio)
-- ============================================================
create table public.lessons (
  id              serial primary key,
  language_code   char(2) not null references public.languages(code),
  day_number      int not null,
  title           text not null,
  created_at      timestamptz not null default now(),
  unique (language_code, day_number)
);

-- ============================================================
-- STEPS (los 11 pasos de cada lección)
-- ============================================================
create table public.steps (
  id              serial primary key,
  lesson_id       int not null references public.lessons(id) on delete cascade,
  step_number     int not null check (step_number between 1 and 11),
  type            step_type not null,
  name            text not null,
  description     text,
  duration_min    int not null default 6,
  content         jsonb,                          -- flexible content per step type
  created_at      timestamptz not null default now(),
  unique (lesson_id, step_number)
);

-- ============================================================
-- VOCAB WORDS (palabras del paso 01 — Activación)
-- ============================================================
create table public.vocab_words (
  id              serial primary key,
  step_id         int not null references public.steps(id) on delete cascade,
  glyph           text not null,                  -- '학교'
  romanization    text not null,                  -- 'hak-kyo'
  meaning         text not null,                  -- 'escuela'
  display_char    text,                           -- carácter de display corto
  audio_url       text,
  image_url       text,
  sort_order      int not null default 0,
  created_at      timestamptz not null default now(),
  unique (step_id, glyph)
);

-- ============================================================
-- ENROLLMENTS (usuario inscrito en un idioma)
-- ============================================================
create table public.enrollments (
  id              serial primary key,
  user_id         uuid not null references public.profiles(id) on delete cascade,
  language_code   char(2) not null references public.languages(code),
  current_day     int not null default 1,
  current_step    int not null default 1,
  goal            text,                           -- 'placer', 'viaje', 'trabajo', 'examen'
  level           text,                           -- 'principiante', 'basico', etc.
  enrolled_at     timestamptz not null default now(),
  last_active_at  timestamptz not null default now(),
  unique (user_id, language_code)
);

-- ============================================================
-- USER PROGRESS (progreso por paso)
-- ============================================================
create table public.user_progress (
  id              serial primary key,
  user_id         uuid not null references public.profiles(id) on delete cascade,
  step_id         int not null references public.steps(id) on delete cascade,
  completed_at    timestamptz not null default now(),
  score           numeric(5,2),                   -- 0–100
  time_spent_sec  int,
  unique (user_id, step_id)
);

-- ============================================================
-- SUBSCRIPTIONS
-- ============================================================
create table public.subscriptions (
  id                  serial primary key,
  user_id             uuid not null references public.profiles(id) on delete cascade,
  plan                subscription_plan not null default 'free',
  status              subscription_status not null default 'active',
  language_code       char(2) references public.languages(code), -- null = all languages
  stripe_customer_id  text,
  stripe_sub_id       text,
  current_period_start timestamptz,
  current_period_end   timestamptz,
  cancelled_at        timestamptz,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.profiles      enable row level security;
alter table public.languages     enable row level security;
alter table public.lessons       enable row level security;
alter table public.steps         enable row level security;
alter table public.vocab_words   enable row level security;
alter table public.enrollments   enable row level security;
alter table public.user_progress enable row level security;
alter table public.subscriptions enable row level security;

-- Profiles: user reads/edits own row; admin reads all
create policy "users can view own profile"
  on public.profiles for select using (auth.uid() = id);
create policy "users can update own profile"
  on public.profiles for update using (auth.uid() = id);
create policy "profiles are created on signup"
  on public.profiles for insert with check (auth.uid() = id);

-- Languages, lessons, steps, vocab: public read
create policy "languages are public"
  on public.languages for select using (true);
create policy "lessons are public"
  on public.lessons for select using (true);
create policy "steps are public"
  on public.steps for select using (true);
create policy "vocab is public"
  on public.vocab_words for select using (true);

-- Enrollments: user owns their rows
create policy "users manage own enrollments"
  on public.enrollments for all using (auth.uid() = user_id);

-- Progress: user owns their rows
create policy "users manage own progress"
  on public.user_progress for all using (auth.uid() = user_id);

-- Subscriptions: user reads own
create policy "users view own subscriptions"
  on public.subscriptions for select using (auth.uid() = user_id);

-- ============================================================
-- AUTO-CREATE PROFILE ON SIGNUP
-- ============================================================
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- SEED: idiomas base
-- ============================================================
insert into public.languages (code, slug, name, native_name, flag_text, lesson_count, level_range) values
  ('en', 'english',    'Inglés',    'English',   'En', 180, 'A1 – C2'),
  ('ko', 'korean',     'Coreano',   '한국어',    '한', 120, 'A1 – B2'),
  ('ja', 'japanese',   'Japonés',   '日本語',    '日', 140, 'A1 – B2'),
  ('it', 'italian',    'Italiano',  'Italiano',  'It', 96,  'A1 – C1'),
  ('fr', 'french',     'Francés',   'Français',  'Fr', 108, 'A1 – C1'),
  ('de', 'german',     'Alemán',    'Deutsch',   'De', 110, 'A1 – C1'),
  ('pt', 'portuguese', 'Portugués', 'Português', 'Pt', 92,  'A1 – C1'),
  ('ru', 'russian',    'Ruso',      'Русский',   'Ру', 88,  'A1 – B2');
