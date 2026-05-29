-- ============================================================
-- LEADS — Captura de contactos desde simulacros y landings
-- ============================================================

create table public.leads (
  id           uuid        primary key default gen_random_uuid(),
  name         text,
  whatsapp     text        not null,
  email        text,
  exam_slug    text,                    -- 'ielts' | 'toefl' | 'icfes' | 'goethe' | null
  exam_score   text,                    -- 'Band 6.0' | '98/120' | null
  source       text        not null,    -- 'simulacro' | 'landing_ingles' | 'landing_coreano' | etc.
  utm_source   text,
  utm_medium   text,
  utm_campaign text,
  notified     boolean     not null default false,  -- flag para tracking de notificación
  created_at   timestamptz not null default now()
);

-- ── Indexes ──────────────────────────────────────────────────────────────────
create index leads_created_at_idx on public.leads (created_at desc);
create index leads_exam_slug_idx  on public.leads (exam_slug)  where exam_slug is not null;
create index leads_whatsapp_idx   on public.leads (whatsapp);

-- ── Row Level Security ────────────────────────────────────────────────────────
alter table public.leads enable row level security;

-- Anon and authenticated users can INSERT (form submissions)
create policy "leads_insert_anon"
  on public.leads for insert
  to anon, authenticated
  with check (true);

-- Only admins (via service role or admin role in profiles) can SELECT
create policy "leads_select_admin"
  on public.leads for select
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.role = 'admin'
    )
  );

-- Admins can update (e.g. mark notified = true)
create policy "leads_update_admin"
  on public.leads for update
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.role = 'admin'
    )
  );
