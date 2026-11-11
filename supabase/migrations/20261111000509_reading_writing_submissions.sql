create table public.reading_writing_submissions (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references auth.users(id) on delete cascade,
  exercise_id text not null,
  language text not null check (language in ('en','fr','it','de','ru','ja','ko','pt')),
  level text not null check (level in ('B2','C1','C2')),
  exercise_title text not null,
  response_text text not null check (char_length(response_text) between 12 and 8000),
  response_units integer not null check (response_units between 1 and 220),
  submitted_at timestamptz not null default now()
);

create index reading_writing_submissions_student_time
  on public.reading_writing_submissions(student_id, submitted_at desc);
create index reading_writing_submissions_recent
  on public.reading_writing_submissions(submitted_at desc);

alter table public.reading_writing_submissions enable row level security;
revoke all on public.reading_writing_submissions from public, anon, authenticated;
grant select, insert on public.reading_writing_submissions to authenticated;
grant select, insert, update, delete on public.reading_writing_submissions to service_role;

create policy "Students can read their own reading writing submissions"
  on public.reading_writing_submissions for select to authenticated
  using ((select auth.uid()) = student_id);

create policy "Students can submit their own reading writing"
  on public.reading_writing_submissions for insert to authenticated
  with check ((select auth.uid()) = student_id);

comment on table public.reading_writing_submissions is
  'Private, explicitly submitted Reading B2-C2 writing. Tutors access it only through the verified admin server route.';
