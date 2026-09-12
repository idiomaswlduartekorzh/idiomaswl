-- Local-only Phase 3 contract. Do not apply until privacy and teacher launch gates approve it.
alter table public.icfes_attempts
  add column question_snapshot_version text,
  add column question_snapshot_hash text check (question_snapshot_hash ~ '^[0-9a-f]{64}$'),
  add column question_snapshot jsonb;

alter table public.icfes_attempts add constraint icfes_attempt_question_snapshot_complete check (
  (question_snapshot_version is null and question_snapshot_hash is null and question_snapshot is null)
  or (question_snapshot_version='icfes-question-snapshot-2026-09-09-v1'
    and question_snapshot_hash is not null
    and jsonb_typeof(question_snapshot)='object'
    and question_snapshot->>'version'=question_snapshot_version
    and question_snapshot->>'examId'=exam_id)
);

create function public.protect_icfes_attempt_evidence()
returns trigger language plpgsql security invoker set search_path='' as $$
begin
  if new.exam_id is distinct from old.exam_id
    or new.access_token_hash is distinct from old.access_token_hash
    or new.answers is distinct from old.answers
    or new.basic_result is distinct from old.basic_result
    or new.question_snapshot_version is distinct from old.question_snapshot_version
    or new.question_snapshot_hash is distinct from old.question_snapshot_hash
    or new.question_snapshot is distinct from old.question_snapshot
    or new.completed_at is distinct from old.completed_at
  then raise exception 'icfes_attempt_evidence_immutable'; end if;
  return new;
end;
$$;

create trigger icfes_attempt_evidence_immutable_guard before update on public.icfes_attempts
for each row execute function public.protect_icfes_attempt_evidence();

create function public.claim_icfes_attempt(p_user uuid,p_attempt uuid,p_exam text,p_token_hash text)
returns public.icfes_attempts language plpgsql security invoker set search_path='' as $$
declare current_attempt public.icfes_attempts;
begin
  if p_user is null or p_attempt is null or p_exam is null
    or p_token_hash is null or p_token_hash !~ '^[0-9a-f]{64}$'
  then raise exception 'icfes_attempt_claim_mismatch'; end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_attempt::text, 29));
  select * into current_attempt from public.icfes_attempts where id=p_attempt for update;
  if not found or current_attempt.exam_id<>p_exam or current_attempt.access_token_hash<>p_token_hash
  then raise exception 'icfes_attempt_claim_mismatch'; end if;
  if current_attempt.user_id is not null and current_attempt.user_id<>p_user
  then raise exception 'icfes_attempt_owned_by_another_user'; end if;
  if current_attempt.user_id is null then
    update public.icfes_attempts set user_id=p_user,updated_at=now()
      where id=p_attempt and user_id is null returning * into current_attempt;
    if not found then raise exception 'icfes_attempt_owned_by_another_user'; end if;
  end if;
  return current_attempt;
end;
$$;

create or replace view public.xpress_teacher_review_payloads with (security_invoker=true) as
select review.id review_id,review.assigned_to assigned_reviewer_id,
  encode(extensions.digest(attempt.id::text,'sha256'),'hex') review_subject_ref,
  'icfes'::text exam_slug,attempt.exam_id,attempt.basic_result,
  attempt.answers objective_answers,
  review.rubric_version,review.requested_at,review.due_at,
  attempt.question_snapshot_version,attempt.question_snapshot_hash,
  attempt.question_snapshot
from public.xpress_teacher_reviews review join public.icfes_attempts attempt
  on attempt.id=review.icfes_attempt_id and attempt.user_id=review.user_id
where review.status='in_review' and review.assigned_to is not null
  and review.lease_id is not null and review.lease_expires_at>now();

create or replace function public.request_xpress_teacher_review(
  p_user uuid,p_membership uuid,p_attempt uuid,p_key uuid,p_rubric text,p_snapshot jsonb
) returns public.xpress_teacher_reviews language plpgsql security invoker set search_path='' as $$
declare membership public.xpress_memberships; existing public.xpress_teacher_reviews; result public.xpress_teacher_reviews;
begin
  if p_user is null or p_membership is null or p_attempt is null or p_key is null
    or p_rubric<>'icfes-teacher-rubric-2026-09-09-v1'
    or jsonb_typeof(p_snapshot)<>'object' or p_snapshot->>'version'<>p_rubric
  then raise exception 'invalid_teacher_review_request'; end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_membership::text, 12));
  select * into membership from public.xpress_memberships
    where id=p_membership and user_id=p_user and exam_slug='icfes' and offer_id='exam-teacher'
      and status='active' and starts_at<=now() and ends_at>now();
  if not found then raise exception 'teacher_review_membership_required'; end if;
  select * into existing from public.xpress_teacher_reviews
    where user_id=p_user and environment=membership.environment and idempotency_key=p_key;
  if found then
    if existing.membership_id<>p_membership or existing.icfes_attempt_id<>p_attempt
      or existing.rubric_version<>p_rubric or existing.rubric_snapshot<>p_snapshot
    then raise exception 'teacher_review_idempotency_conflict'; end if;
    return existing;
  end if;
  if not exists(select 1 from public.xpress_teacher_capacity_reservations
    where membership_id=p_membership and status='consumed')
  then raise exception 'teacher_review_capacity_not_reserved'; end if;
  if not exists(select 1 from public.icfes_attempts where id=p_attempt and user_id=p_user
    and jsonb_typeof(answers)='object' and answers<>'{}'::jsonb
    and question_snapshot_version='icfes-question-snapshot-2026-09-09-v1'
    and question_snapshot_hash is not null and jsonb_typeof(question_snapshot)='object')
  then raise exception 'teacher_review_attempt_mismatch'; end if;
  if exists(select 1 from public.xpress_teacher_reviews where membership_id=p_membership)
  then raise exception 'teacher_review_credit_exhausted'; end if;
  insert into public.xpress_teacher_reviews(user_id,environment,membership_id,icfes_attempt_id,idempotency_key,rubric_version,rubric_snapshot)
    values(p_user,membership.environment,p_membership,p_attempt,p_key,p_rubric,p_snapshot) returning * into result;
  return result;
end;
$$;

revoke all on function public.request_xpress_teacher_review(uuid,uuid,uuid,uuid,text,jsonb)
  from public,anon,authenticated,service_role;
grant execute on function public.request_xpress_teacher_review(uuid,uuid,uuid,uuid,text,jsonb)
  to service_role;

revoke all on function public.protect_icfes_attempt_evidence() from public,anon,authenticated;
revoke all on function public.claim_icfes_attempt(uuid,uuid,text,text) from public,anon,authenticated,service_role;
grant execute on function public.claim_icfes_attempt(uuid,uuid,text,text) to service_role;
revoke all on table public.xpress_teacher_review_payloads from public,anon,authenticated,service_role;
grant select on table public.xpress_teacher_review_payloads to service_role;

comment on column public.icfes_attempts.question_snapshot is 'Immutable versioned rendering, stimuli, choices, answer keys and rationales used to grade the attempt.';
comment on function public.claim_icfes_attempt(uuid,uuid,text,text) is 'Service-only atomic claim using the hash of the signed HttpOnly attempt capability; replays by the same owner are idempotent.';
