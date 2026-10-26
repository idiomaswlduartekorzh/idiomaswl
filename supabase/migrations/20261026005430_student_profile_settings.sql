-- Student-owned profile details, notification preferences and profile photos.
alter table public.profiles
  add column if not exists phone text,
  add column if not exists city text;

grant update (phone, city) on public.profiles to authenticated;

create table if not exists public.student_notification_preferences (
  student_id uuid primary key references auth.users(id) on delete cascade,
  study_reminders_enabled boolean not null default false,
  study_reminder_frequency text not null default 'weekly'
    check (study_reminder_frequency in ('daily', 'weekly')),
  study_reminder_weekday integer not null default 1
    check (study_reminder_weekday between 1 and 7),
  correction_emails_enabled boolean not null default true,
  last_study_reminder_on date,
  updated_at timestamptz not null default now()
);

alter table public.student_notification_preferences enable row level security;
grant select, insert on public.student_notification_preferences to authenticated;
grant update (study_reminders_enabled, study_reminder_frequency, study_reminder_weekday,
  correction_emails_enabled, updated_at) on public.student_notification_preferences to authenticated;

create policy "students read own notification preferences"
  on public.student_notification_preferences for select to authenticated
  using ((select auth.uid()) = student_id);
create policy "students create own notification preferences"
  on public.student_notification_preferences for insert to authenticated
  with check ((select auth.uid()) = student_id);
create policy "students update own notification preferences"
  on public.student_notification_preferences for update to authenticated
  using ((select auth.uid()) = student_id)
  with check ((select auth.uid()) = student_id);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('student-avatars', 'student-avatars', true, 2097152,
  array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set public = true, file_size_limit = 2097152,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "students upload own avatar"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'student-avatars'
    and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "students delete own avatar"
  on storage.objects for delete to authenticated
  using (bucket_id = 'student-avatars'
    and (storage.foldername(name))[1] = (select auth.uid())::text);
