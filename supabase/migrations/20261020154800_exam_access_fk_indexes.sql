-- Cover the administrative foreign keys added by the exam access ecosystem.
-- User-facing lookup indexes already exist in the entitlement migration.
create index exam_access_grants_created_by
  on public.exam_access_grants(created_by)
  where created_by is not null;

create index xpress_human_review_user_created
  on public.xpress_human_review_requests(user_id,created_at desc);

create index xpress_human_review_reviewer_status
  on public.xpress_human_review_requests(reviewer_id,status)
  where reviewer_id is not null;
