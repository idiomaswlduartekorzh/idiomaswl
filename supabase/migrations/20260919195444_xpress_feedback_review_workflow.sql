-- Each paid personalized review has an explicit deadline and accountable reviewer.
alter table public.xpress_personalized_feedback_requests
  add column due_at timestamptz not null default (now() + interval '24 hours'),
  add column reviewer_id uuid references auth.users(id),
  add constraint xpress_feedback_completed_reviewer_check
    check (status<>'completed' or reviewer_id is not null);

create index xpress_personalized_feedback_due
  on public.xpress_personalized_feedback_requests(due_at)
  where status in ('pending','processing','failed');

grant update(reviewer_id) on public.xpress_personalized_feedback_requests to service_role;

comment on table public.xpress_personalized_feedback_requests is
  'Private queue for a personalized WeLearn tutor review due within 24 hours after exam submission.';
