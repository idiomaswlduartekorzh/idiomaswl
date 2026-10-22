-- Student Operations Center: auditable access control, communications,
-- private notes, and real assignment submissions.
begin;

alter table public.student_assignments
  add column submission_text text,
  add column submission_url text,
  add column submitted_at timestamptz,
  add column teacher_feedback text,
  add column feedback_at timestamptz,
  add column feedback_by uuid references auth.users(id) on delete set null,
  add constraint student_assignments_submission_text_length
    check (submission_text is null or char_length(submission_text) <= 12000),
  add constraint student_assignments_submission_url_format
    check (submission_url is null or submission_url ~ '^(https://|/)'),
  add constraint student_assignments_feedback_length
    check (teacher_feedback is null or char_length(teacher_feedback) <= 12000),
  add constraint student_assignments_submission_consistency
    check (
      submitted_at is null
      or status = 'completed'
    ),
  add constraint student_assignments_feedback_consistency
    check (
      feedback_at is null
      or (teacher_feedback is not null and feedback_by is not null)
    );

create index student_assignments_student_submitted
  on public.student_assignments(student_id, submitted_at desc)
  where submitted_at is not null;
create index student_assignments_feedback_by
  on public.student_assignments(feedback_by)
  where feedback_by is not null;

create table public.student_communications (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  created_by uuid references auth.users(id) on delete set null,
  related_assignment_id uuid references public.student_assignments(id) on delete set null,
  kind text not null check (kind in ('welcome','assignment','follow_up','general')),
  channel text not null default 'email' check (channel = 'email'),
  recipient_email text not null check (recipient_email = lower(recipient_email)),
  subject text not null check (char_length(trim(subject)) between 3 and 180),
  body_text text not null check (char_length(body_text) between 1 and 12000),
  status text not null default 'queued' check (status in ('queued','sent','failed')),
  provider_message_id text,
  error_message text check (error_message is null or char_length(error_message) <= 500),
  sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (
    status = 'sent' and sent_at is not null
    or status <> 'sent'
  )
);

create index student_communications_student_created
  on public.student_communications(student_id, created_at desc);
create index student_communications_status_created
  on public.student_communications(status, created_at desc);
create index student_communications_created_by
  on public.student_communications(created_by)
  where created_by is not null;
create index student_communications_assignment
  on public.student_communications(related_assignment_id)
  where related_assignment_id is not null;

alter table public.student_communications enable row level security;
revoke all on public.student_communications from public, anon, authenticated, service_role;
grant select, insert on public.student_communications to service_role;
grant update(status, provider_message_id, error_message, sent_at, updated_at)
  on public.student_communications to service_role;

comment on table public.student_communications is
  'Private audit log for administrator-to-student operational email sent through Resend.';

create table public.student_notes (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  created_by uuid references auth.users(id) on delete set null,
  note text not null check (char_length(trim(note)) between 1 and 4000),
  pinned boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index student_notes_student_created
  on public.student_notes(student_id, pinned desc, created_at desc);
create index student_notes_created_by
  on public.student_notes(created_by)
  where created_by is not null;

alter table public.student_notes enable row level security;
revoke all on public.student_notes from public, anon, authenticated, service_role;
grant select, insert, update, delete on public.student_notes to service_role;

comment on table public.student_notes is
  'Private administrator notes for student follow-up; never exposed to student sessions.';

create or replace function public.submit_student_assignment(
  p_assignment_id uuid,
  p_submission_text text,
  p_submission_url text default null
)
returns boolean
language plpgsql
security invoker
set search_path = ''
as $function$
declare
  clean_text text := nullif(trim(coalesce(p_submission_text, '')), '');
  clean_url text := nullif(trim(coalesce(p_submission_url, '')), '');
begin
  if p_assignment_id is null
    or (clean_text is null and clean_url is null)
    or char_length(coalesce(clean_text, '')) > 12000
    or (clean_url is not null and clean_url !~ '^(https://|/)') then
    raise exception 'invalid_assignment_submission';
  end if;

  update public.student_assignments
  set submission_text = clean_text,
      submission_url = clean_url,
      submitted_at = now(),
      status = 'completed',
      completed_at = now(),
      updated_at = now()
  where id = p_assignment_id
    and student_id = (select auth.uid())
    and status <> 'canceled';

  return found;
end
$function$;

grant update(submission_text, submission_url, submitted_at, status, completed_at, updated_at)
  on public.student_assignments to authenticated;
revoke all on function public.submit_student_assignment(uuid, text, text)
  from public, anon, authenticated, service_role;
grant execute on function public.submit_student_assignment(uuid, text, text)
  to authenticated;

create or replace function public.set_student_assignment_completed(
  p_assignment_id uuid,
  p_completed boolean
)
returns boolean
language plpgsql
security invoker
set search_path = ''
as $function$
begin
  update public.student_assignments
  set status = case when p_completed then 'completed' else 'assigned' end,
      completed_at = case when p_completed then now() else null end,
      submitted_at = case when p_completed then submitted_at else null end,
      updated_at = now()
  where id = p_assignment_id
    and student_id = (select auth.uid())
    and status <> 'canceled';
  return found;
end
$function$;

revoke all on function public.set_student_assignment_completed(uuid, boolean)
  from public, anon, authenticated, service_role;
grant execute on function public.set_student_assignment_completed(uuid, boolean)
  to authenticated;

-- The original grant function updated profiles.target_exam for WeLearn students,
-- which conflicts with the profile path consistency constraint. The access ledger
-- is already the canonical source, so the grant remains explicit and auditable
-- without mutating onboarding preferences.
create or replace function public.grant_welearn_exam_access(
  p_user uuid,
  p_exam text,
  p_source_reference text,
  p_created_by uuid default null
)
returns public.exam_access_grants
language plpgsql
security invoker
set search_path = ''
as $function$
declare
  existing_grant public.exam_access_grants;
  result public.exam_access_grants;
begin
  if p_user is null or p_exam not in (
    'ielts','toefl','sat','icfes','cambridge-b2','goethe','delf-dalf','cils-celi','topik','celpe-bras'
  ) or p_source_reference is null or length(trim(p_source_reference)) not between 1 and 240 then
    raise exception 'invalid_welearn_exam_grant';
  end if;

  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_user::text, 73));
  if not exists (
    select 1 from public.profiles where id = p_user and student_path = 'welearn'
  ) then
    raise exception 'welearn_profile_required';
  end if;

  select * into existing_grant
  from public.exam_access_grants
  where user_id = p_user
    and exam_slug = p_exam
    and source = 'welearn'
    and status = 'active'
  order by created_at desc
  limit 1;

  if found then
    return existing_grant;
  end if;

  insert into public.exam_access_grants (
    user_id, exam_slug, source, plan_id, source_reference, created_by,
    metadata
  ) values (
    p_user, p_exam, 'welearn', 'welearn-full', trim(p_source_reference), p_created_by,
    pg_catalog.jsonb_build_object('grantedFrom', 'student-operations-center')
  )
  returning * into result;

  return result;
end
$function$;

revoke all on function public.grant_welearn_exam_access(uuid, text, text, uuid)
  from public, anon, authenticated, service_role;
grant execute on function public.grant_welearn_exam_access(uuid, text, text, uuid)
  to service_role;

create function public.revoke_welearn_exam_access(
  p_user uuid,
  p_exam text,
  p_reason text,
  p_revoked_by uuid default null
)
returns boolean
language plpgsql
security invoker
set search_path = ''
as $function$
declare
  clean_reason text := trim(coalesce(p_reason, ''));
begin
  if p_user is null or p_exam not in (
    'ielts','toefl','sat','icfes','cambridge-b2','goethe','delf-dalf','cils-celi','topik','celpe-bras'
  ) or char_length(clean_reason) not between 3 and 500 then
    raise exception 'invalid_welearn_exam_revocation';
  end if;

  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_user::text, 73));

  update public.exam_access_grants
  set status = 'revoked',
      ends_at = now(),
      source_reference = left(coalesce(source_reference || ' · ', '') || 'revoked:' || clean_reason, 240),
      metadata = metadata || pg_catalog.jsonb_build_object(
        'revocationReason', clean_reason,
        'revokedAt', now(),
        'revokedBy', p_revoked_by
      ),
      updated_at = now()
  where user_id = p_user
    and exam_slug = p_exam
    and source = 'welearn'
    and status = 'active';

  return found;
end
$function$;

revoke all on function public.revoke_welearn_exam_access(uuid, text, text, uuid)
  from public, anon, authenticated, service_role;
grant execute on function public.revoke_welearn_exam_access(uuid, text, text, uuid)
  to service_role;

commit;
