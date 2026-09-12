-- Local-only Phase 4 worker delivery contract. No scheduler, roster or remote application.
alter table public.xpress_teacher_reviews
  add column review_result jsonb,
  add column review_result_hash text check (review_result_hash ~ '^[0-9a-f]{64}$'),
  add column workflow_stage text not null default 'review' check (workflow_stage in ('review','qa')),
  add column completion_idempotency_key uuid,
  add column completion_outcome text check (completion_outcome in ('completed','needs_qa','failed')),
  add column completion_reviewer_id uuid references auth.users(id),
  add column completion_lease_id uuid,
  add constraint xpress_teacher_review_result_complete check (
    (status='completed' and review_result is not null and review_result_hash is not null
      and review_result->>'version'='icfes-teacher-review-result-2026-09-09-v1'
      and review_result->>'rubricVersion'=rubric_version)
    or (status<>'completed' and review_result is null and review_result_hash is null)
  );

create function public.protect_xpress_teacher_review_result()
returns trigger language plpgsql security invoker set search_path='' as $$
begin
  if old.review_result is not null and (
    new.review_result is distinct from old.review_result
    or new.review_result_hash is distinct from old.review_result_hash
  ) then raise exception 'teacher_review_result_immutable'; end if;
  return new;
end;
$$;
create trigger xpress_teacher_review_result_immutable_guard before update on public.xpress_teacher_reviews
for each row execute function public.protect_xpress_teacher_review_result();

create or replace function public.claim_xpress_teacher_review(p_review uuid,p_reviewer uuid,p_lease uuid)
returns boolean language plpgsql security invoker set search_path='' as $$
declare claimed integer;
begin
  if p_review is null or p_reviewer is null or p_lease is null then raise exception 'invalid_teacher_review_claim'; end if;
  if not exists(select 1 from public.xpress_teacher_reviewers where reviewer_id=p_reviewer
    and status='active' and rubric_version='icfes-teacher-rubric-2026-09-09-v1'
    and calibrated_at<=now() and calibration_expires_at>now())
  then raise exception 'teacher_reviewer_not_calibrated'; end if;
  update public.xpress_teacher_reviews set status='in_review',assigned_to=p_reviewer,lease_id=p_lease,
    lease_expires_at=now()+interval '15 minutes',attempts=attempts+1,last_error=null,updated_at=now()
  where id=p_review and rubric_version='icfes-teacher-rubric-2026-09-09-v1' and workflow_stage='review'
    and (status='queued' or status='failed' or (status='in_review' and lease_expires_at<=now()));
  get diagnostics claimed=row_count;
  return claimed=1;
end;
$$;

create function public.claim_xpress_teacher_review_qa(p_review uuid,p_reviewer uuid,p_lease uuid)
returns boolean language plpgsql security invoker set search_path='' as $$
declare claimed integer;
begin
  if p_review is null or p_reviewer is null or p_lease is null then raise exception 'invalid_teacher_review_claim'; end if;
  if not exists(select 1 from public.xpress_teacher_reviewers where reviewer_id=p_reviewer
    and status='active' and rubric_version='icfes-teacher-rubric-2026-09-09-v1'
    and calibrated_at<=now() and calibration_expires_at>now())
  then raise exception 'teacher_reviewer_not_calibrated'; end if;
  update public.xpress_teacher_reviews set status='in_review',assigned_to=p_reviewer,lease_id=p_lease,
    lease_expires_at=now()+interval '15 minutes',attempts=attempts+1,last_error=null,updated_at=now()
  where id=p_review and rubric_version='icfes-teacher-rubric-2026-09-09-v1' and workflow_stage='qa'
    and (status in ('needs_qa','failed') or (status='in_review' and lease_expires_at<=now()));
  get diagnostics claimed=row_count;
  return claimed=1;
end;
$$;

create function public.renew_xpress_teacher_review_lease(p_review uuid,p_reviewer uuid,p_lease uuid)
returns boolean language plpgsql security invoker set search_path='' as $$
declare renewed integer;
begin
  update public.xpress_teacher_reviews
    set lease_expires_at=greatest(lease_expires_at,now())+interval '15 minutes',updated_at=now()
    where id=p_review and status='in_review' and assigned_to=p_reviewer
      and lease_id=p_lease and lease_expires_at>now();
  get diagnostics renewed=row_count;
  return renewed=1;
end;
$$;

create function public.finish_xpress_teacher_review_v2(
  p_review uuid,p_reviewer uuid,p_lease uuid,p_completion_key uuid,p_outcome text,
  p_result jsonb,p_result_hash text,p_error text default null
) returns boolean language plpgsql security invoker set search_path='' as $$
declare current_review public.xpress_teacher_reviews;
begin
  if p_review is null or p_reviewer is null or p_lease is null or p_completion_key is null
    or p_outcome not in ('completed','needs_qa','failed')
    or (p_outcome='completed' and (jsonb_typeof(p_result)<>'object'
      or p_result->>'version'<>'icfes-teacher-review-result-2026-09-09-v1'
      or p_result->>'rubricVersion'<>'icfes-teacher-rubric-2026-09-09-v1'
      or p_result_hash !~ '^[0-9a-f]{64}$'))
    or (p_outcome<>'completed' and (p_result is not null or p_result_hash is not null))
    or (p_outcome='failed' and nullif(left(coalesce(p_error,''),300),'') is null)
  then raise exception 'invalid_teacher_review_completion'; end if;
  select * into current_review from public.xpress_teacher_reviews where id=p_review for update;
  if not found then return false; end if;
  if p_outcome='completed' and exists(
    select 1 from jsonb_array_elements(p_result->'itemFeedback') feedback
    where not exists(
      select 1 from public.icfes_attempts attempt,
        jsonb_array_elements(attempt.question_snapshot->'exam'->'sections') section,
        jsonb_array_elements(section->'questions') question
      where attempt.id=current_review.icfes_attempt_id
        and question->>'id'=feedback->>'questionId'
    )
  ) then raise exception 'invalid_teacher_review_question_reference'; end if;
  if current_review.completion_idempotency_key=p_completion_key then
    if current_review.completion_reviewer_id<>p_reviewer or current_review.completion_lease_id<>p_lease
      or current_review.completion_outcome<>p_outcome
      or current_review.review_result is distinct from p_result
      or current_review.review_result_hash is distinct from p_result_hash
      or current_review.last_error is distinct from (case when p_outcome='failed' then left(p_error,300) else null end)
    then raise exception 'teacher_review_completion_drift'; end if;
    return true;
  end if;
  if current_review.status<>'in_review' or current_review.assigned_to<>p_reviewer
    or current_review.lease_id<>p_lease or current_review.lease_expires_at<=now() then return false; end if;
  update public.xpress_teacher_reviews set status=p_outcome,
    workflow_stage=case when p_outcome='needs_qa' then 'qa' else workflow_stage end,
    review_result=case when p_outcome='completed' then p_result else null end,
    review_result_hash=case when p_outcome='completed' then p_result_hash else null end,
    completion_idempotency_key=p_completion_key,completion_outcome=p_outcome,
    completion_reviewer_id=p_reviewer,completion_lease_id=p_lease,
    completed_at=case when p_outcome='completed' then now() else null end,
    last_error=case when p_outcome='failed' then left(p_error,300) else null end,
    lease_id=null,lease_expires_at=null,updated_at=now()
  where id=p_review;
  return true;
end;
$$;

revoke execute on function public.finish_xpress_teacher_review(uuid,uuid,text,text) from service_role;
revoke all on function public.protect_xpress_teacher_review_result() from public,anon,authenticated;
revoke all on function public.claim_xpress_teacher_review_qa(uuid,uuid,uuid) from public,anon,authenticated,service_role;
revoke all on function public.renew_xpress_teacher_review_lease(uuid,uuid,uuid) from public,anon,authenticated,service_role;
revoke all on function public.finish_xpress_teacher_review_v2(uuid,uuid,uuid,uuid,text,jsonb,text,text)
  from public,anon,authenticated,service_role;
grant execute on function public.claim_xpress_teacher_review_qa(uuid,uuid,uuid) to service_role;
grant execute on function public.renew_xpress_teacher_review_lease(uuid,uuid,uuid) to service_role;
grant execute on function public.finish_xpress_teacher_review_v2(uuid,uuid,uuid,uuid,text,jsonb,text,text) to service_role;

comment on column public.xpress_teacher_reviews.review_result is 'Immutable, versioned, PII-free teacher feedback returned to the owning learner.';
