alter table public.profiles
  add column if not exists student_path text,
  add column if not exists target_exam text,
  add column if not exists xpress_plan_interest text,
  add column if not exists onboarding_completed_at timestamptz;

alter table public.profiles
  drop constraint if exists profiles_student_path_check,
  add constraint profiles_student_path_check
    check (student_path is null or student_path in ('welearn', 'exam')),
  drop constraint if exists profiles_target_exam_check,
  add constraint profiles_target_exam_check
    check (target_exam is null or target_exam in (
      'ielts', 'toefl', 'sat', 'icfes', 'cambridge-b2',
      'goethe', 'delf-dalf', 'cils-celi', 'topik', 'celpe-bras'
    )),
  drop constraint if exists profiles_xpress_plan_interest_check,
  add constraint profiles_xpress_plan_interest_check
    check (xpress_plan_interest is null or xpress_plan_interest in ('exam-auto', 'exam-teacher')),
  drop constraint if exists profiles_student_path_consistency_check,
  add constraint profiles_student_path_consistency_check
    check (
      student_path is null
      or (student_path = 'welearn' and target_exam is null and xpress_plan_interest is null)
      or (student_path = 'exam' and target_exam is not null and xpress_plan_interest is not null)
    );

update public.profiles
set
  student_path = 'exam',
  target_exam = subject,
  xpress_plan_interest = coalesce(xpress_plan_interest, 'exam-auto')
where student_path is null
  and subject in (
    'ielts', 'toefl', 'sat', 'icfes', 'cambridge-b2',
    'goethe', 'delf-dalf', 'cils-celi', 'topik', 'celpe-bras'
  );

update public.profiles
set student_path = 'welearn'
where student_path is null
  and subject in ('ingles', 'coreano', 'frances', 'aleman', 'italiano', 'portugues', 'japones', 'ruso');

create index if not exists profiles_student_path_idx on public.profiles (student_path);
create index if not exists profiles_target_exam_idx on public.profiles (target_exam) where target_exam is not null;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  display_name text;
  requested_path text;
  requested_language text;
  requested_exam text;
  requested_plan text;
begin
  display_name := coalesce(
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'name',
    split_part(new.email, '@', 1)
  );
  requested_path := new.raw_user_meta_data ->> 'student_path';
  requested_language := new.raw_user_meta_data ->> 'language';
  requested_exam := new.raw_user_meta_data ->> 'target_exam';
  requested_plan := new.raw_user_meta_data ->> 'xpress_plan_interest';

  if requested_path not in ('welearn', 'exam') then requested_path := null; end if;
  if requested_language not in ('ingles', 'coreano', 'frances', 'aleman', 'italiano', 'portugues', 'japones', 'ruso') then requested_language := null; end if;
  if requested_exam not in ('ielts', 'toefl', 'sat', 'icfes', 'cambridge-b2', 'goethe', 'delf-dalf', 'cils-celi', 'topik', 'celpe-bras') then requested_exam := null; end if;
  if requested_plan not in ('exam-auto', 'exam-teacher') then requested_plan := null; end if;

  if requested_path = 'welearn' and requested_language is null then requested_path := null; end if;
  if requested_path = 'exam' and (requested_exam is null or requested_plan is null) then requested_path := null; end if;

  insert into public.profiles (
    id, name, full_name, email, avatar_url, enrolled_at,
    student_path, language, subject, target_exam, xpress_plan_interest, onboarding_completed_at
  )
  values (
    new.id,
    display_name,
    display_name,
    new.email,
    new.raw_user_meta_data ->> 'avatar_url',
    now(),
    requested_path,
    requested_language,
    case when requested_path = 'exam' then requested_exam else requested_language end,
    case when requested_path = 'exam' then requested_exam else null end,
    case when requested_path = 'exam' then requested_plan else null end,
    case when requested_path is not null then now() else null end
  );

  return new;
end;
$$;

revoke execute on function public.handle_new_user() from public, anon, authenticated;

comment on column public.profiles.student_path is 'Product route selected during onboarding: WeLearn language student or exam student.';
comment on column public.profiles.target_exam is 'One exam family selected for the current Xpress membership.';
comment on column public.profiles.xpress_plan_interest is 'Validated exam plan selected before checkout; it never grants paid access.';
