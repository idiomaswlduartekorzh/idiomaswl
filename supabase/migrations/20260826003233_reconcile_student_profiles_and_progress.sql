-- Reconcile the original production schema with the student dashboard that is
-- already shipped in the application. The first production schema uses
-- profiles.role = 'user' for students and an integer, catalog-backed
-- user_progress.step_id. Later application code expects profile contact fields
-- and course-scoped string step identifiers.

alter table public.profiles
  add column if not exists email text,
  add column if not exists full_name text,
  add column if not exists enrolled_at timestamptz,
  add column if not exists language text,
  add column if not exists level text,
  add column if not exists subject text;

update public.profiles as profile
set
  email = coalesce(profile.email, auth_user.email),
  full_name = coalesce(
    profile.full_name,
    profile.name,
    auth_user.raw_user_meta_data ->> 'full_name',
    split_part(auth_user.email, '@', 1)
  ),
  enrolled_at = coalesce(profile.enrolled_at, profile.created_at)
from auth.users as auth_user
where auth_user.id = profile.id;

create unique index if not exists profiles_email_lower_unique
  on public.profiles (lower(email))
  where email is not null;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  display_name text;
begin
  display_name := coalesce(
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'name',
    split_part(new.email, '@', 1)
  );

  insert into public.profiles (
    id,
    name,
    full_name,
    email,
    avatar_url,
    enrolled_at
  )
  values (
    new.id,
    display_name,
    display_name,
    new.email,
    new.raw_user_meta_data ->> 'avatar_url',
    now()
  );

  return new;
end;
$$;

revoke execute on function public.handle_new_user() from public, anon, authenticated;

alter table public.user_progress
  add column if not exists course_slug text,
  add column if not exists last_stage text;

update public.user_progress
set course_slug = 'legacy'
where course_slug is null;

alter table public.user_progress
  alter column course_slug set not null,
  drop constraint if exists user_progress_step_id_fkey,
  drop constraint if exists user_progress_user_id_step_id_key;

alter table public.user_progress
  alter column step_id type text using step_id::text;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.user_progress'::regclass
      and conname = 'user_progress_unique_step'
  ) then
    alter table public.user_progress
      add constraint user_progress_unique_step
      unique (user_id, course_slug, step_id);
  end if;
end
$$;

create index if not exists user_progress_user_idx
  on public.user_progress (user_id);

create index if not exists user_progress_course_idx
  on public.user_progress (user_id, course_slug);

alter table public.user_progress enable row level security;

drop policy if exists "users manage own progress" on public.user_progress;
drop policy if exists "progress_select_own" on public.user_progress;
drop policy if exists "progress_insert_own" on public.user_progress;
drop policy if exists "progress_update_own" on public.user_progress;
drop policy if exists "progress_delete_own" on public.user_progress;
drop policy if exists "progress_select_admin" on public.user_progress;

create policy "progress_select_own"
  on public.user_progress for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "progress_insert_own"
  on public.user_progress for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "progress_update_own"
  on public.user_progress for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "progress_delete_own"
  on public.user_progress for delete
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "progress_select_admin"
  on public.user_progress for select
  to authenticated
  using (
    lower(coalesce((select auth.jwt()) ->> 'email', '')) = any (
      array[
        'josedavidduartesilva@gmail.com',
        'david.duartes182@gmail.com',
        'jose@welearn.com',
        'zhanna.korzh@gmail.com',
        'zhanna@welearn.com'
      ]
    )
  );

grant select, insert, update, delete on public.user_progress to authenticated;
