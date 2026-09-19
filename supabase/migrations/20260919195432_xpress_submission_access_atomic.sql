-- Persist a completed exam and its paid entitlement in one database transaction.
-- This also repairs a previously consumed credit whose access row was not saved.
create function public.record_xpress_submission_access(
  p_user uuid, p_exam text, p_submission uuid, p_environment text
)
returns jsonb language plpgsql security invoker set search_path='' as $$
declare
  selected_submission public.exam_submissions;
  selected_access public.xpress_submission_access;
  selected_membership public.xpress_memberships;
  selected_credit public.xpress_exam_credits;
begin
  if p_user is null or p_exam is null or p_submission is null
    or p_environment not in ('sandbox','production') then
    raise exception 'invalid_xpress_submission_access';
  end if;

  -- Duplicate submission callbacks must observe the same entitlement.
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_submission::text, 42));
  select * into selected_submission from public.exam_submissions
    where id=p_submission and user_id=p_user and exam_slug=p_exam;
  if not found then raise exception 'xpress_submission_not_owned'; end if;

  select * into selected_access from public.xpress_submission_access
    where submission_id=p_submission;
  if found then
    if selected_access.user_id<>p_user or selected_access.exam_slug<>p_exam
      or selected_access.environment<>p_environment then
      raise exception 'xpress_submission_access_mismatch';
    end if;
    return pg_catalog.jsonb_build_object('access',selected_access.access_kind,
      'personalizedFeedback',selected_access.personalized_feedback);
  end if;

  select membership.* into selected_membership from public.xpress_memberships membership
    where membership.user_id=p_user and membership.environment=p_environment
      and membership.exam_slug=p_exam and membership.status<>'revoked'
      and membership.starts_at<=selected_submission.created_at
      and membership.ends_at>selected_submission.created_at
    order by membership.starts_at desc,membership.id desc limit 1;
  if found then
    insert into public.xpress_submission_access(
      user_id,submission_id,environment,exam_slug,access_kind,offer_id,membership_id,personalized_feedback
    ) values (
      p_user,p_submission,p_environment,p_exam,'membership',selected_membership.offer_id,
      selected_membership.id,selected_membership.offer_id='exam-teacher'
    );
    if selected_membership.offer_id='exam-teacher' then
      insert into public.xpress_personalized_feedback_requests(
        user_id,membership_id,submission_id,environment,exam_slug,status
      ) values(p_user,selected_membership.id,p_submission,p_environment,p_exam,'pending')
      on conflict (submission_id) do nothing;
    end if;
    return pg_catalog.jsonb_build_object('access','membership',
      'personalizedFeedback',selected_membership.offer_id='exam-teacher');
  end if;

  select credit.* into selected_credit from public.xpress_exam_credits credit
    join public.xpress_orders source on source.id=credit.source_order_id
    where credit.user_id=p_user and credit.exam_slug=p_exam
      and source.environment=p_environment and credit.consumed_submission_id=p_submission
    limit 1;
  if not found then
    select credit.* into selected_credit from public.xpress_exam_credits credit
      join public.xpress_orders source on source.id=credit.source_order_id
      where credit.user_id=p_user and credit.exam_slug=p_exam and credit.status='active'
        and source.environment=p_environment
      order by credit.granted_at,credit.id for update of credit skip locked limit 1;
    if not found then
      return pg_catalog.jsonb_build_object('access','public','personalizedFeedback',false);
    end if;
    update public.xpress_exam_credits
      set status='consumed',consumed_at=now(),consumed_submission_id=p_submission
      where id=selected_credit.id;
  end if;

  insert into public.xpress_submission_access(
    user_id,submission_id,environment,exam_slug,access_kind,offer_id,credit_id,personalized_feedback
  ) values(p_user,p_submission,p_environment,p_exam,'single-credit','exam-single',selected_credit.id,false);
  return pg_catalog.jsonb_build_object('access','single-credit','personalizedFeedback',false);
end $$;

revoke all on function public.record_xpress_submission_access(uuid,text,uuid,text) from public,anon,authenticated;
grant execute on function public.record_xpress_submission_access(uuid,text,uuid,text) to service_role;
