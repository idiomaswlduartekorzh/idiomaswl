-- Teacher-review queue extracted from the already-applied Xpress payment
-- migration. Keeping this as a later migration preserves production history.

create table public.xpress_teacher_reviewers (
  reviewer_id uuid primary key references auth.users(id),
  status text not null default 'paused' check (status in ('active','paused')),
  rubric_version text not null check (rubric_version='icfes-teacher-rubric-2026-09-09-v1'),
  productive_minutes_per_day integer not null check (productive_minutes_per_day between 30 and 480),
  p75_review_minutes integer not null check (p75_review_minutes between 5 and 240),
  calibrated_at timestamptz not null,
  calibration_expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (calibration_expires_at>calibrated_at)
);

create table public.xpress_teacher_capacity_reservations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  environment text not null check (environment in ('sandbox','production')),
  idempotency_key uuid not null,
  exam_slug text not null check (exam_slug='icfes'),
  offer_id text not null check (offer_id='exam-teacher'),
  rubric_version text not null check (rubric_version='icfes-teacher-rubric-2026-09-09-v1'),
  addendum_version text not null check (addendum_version='icfes-teacher-addendum-2026-09-09-v1'),
  status text not null default 'held' check (status in ('held','order_linked','consumed','released','expired')),
  held_at timestamptz not null default now(),
  expires_at timestamptz not null default now()+interval '20 minutes',
  order_id uuid unique references public.xpress_orders(id),
  membership_id uuid unique references public.xpress_memberships(id),
  consumed_at timestamptz,
  unique(user_id,environment,idempotency_key),
  check (expires_at>held_at),
  check ((status='consumed')=(membership_id is not null and consumed_at is not null))
);

create index xpress_teacher_capacity_reservations_live
  on public.xpress_teacher_capacity_reservations(environment,expires_at)
  where status in ('held','order_linked');

alter table public.xpress_teacher_reviews
  add column environment text,
  add column icfes_attempt_id uuid unique references public.icfes_attempts(id),
  add column idempotency_key uuid,
  add column rubric_version text,
  add column rubric_snapshot jsonb,
  add column lease_id uuid,
  add column lease_expires_at timestamptz,
  add column attempts integer not null default 0 check (attempts>=0),
  add column last_error text,
  add column updated_at timestamptz not null default now();

do $$
declare constraint_name text;
begin
  for constraint_name in
    select con.conname from pg_catalog.pg_constraint con
    join pg_catalog.pg_class rel on rel.oid=con.conrelid
    join pg_catalog.pg_namespace ns on ns.oid=rel.relnamespace
    where ns.nspname='public' and rel.relname='xpress_teacher_reviews' and con.contype='c'
      and (pg_catalog.pg_get_constraintdef(con.oid) like '%status%'
        or pg_catalog.pg_get_constraintdef(con.oid) like '%due_at%requested_at%')
  loop
    execute format('alter table public.xpress_teacher_reviews drop constraint %I',constraint_name);
  end loop;
end $$;

update public.xpress_teacher_reviews review set
  environment=membership.environment,
  idempotency_key=gen_random_uuid(),
  rubric_version='icfes-teacher-rubric-2026-09-09-v1',
  rubric_snapshot=jsonb_build_object('version','icfes-teacher-rubric-2026-09-09-v1'),
  due_at=review.requested_at+interval '24 hours',
  status=case when review.status in ('pending','in_review') then 'queued' else review.status end,
  assigned_to=case when review.status in ('pending','in_review') then null else review.assigned_to end
from public.xpress_memberships membership
where membership.id=review.membership_id;

alter table public.xpress_teacher_reviews
  alter column environment set not null,
  alter column idempotency_key set not null,
  alter column rubric_version set not null,
  alter column rubric_snapshot set not null,
  alter column status set default 'queued',
  add constraint xpress_teacher_reviews_environment_check check (environment in ('sandbox','production')),
  add constraint xpress_teacher_reviews_rubric_check check (rubric_version='icfes-teacher-rubric-2026-09-09-v1'),
  add constraint xpress_teacher_reviews_status_check check (status in ('queued','in_review','needs_qa','completed','cancelled','failed')),
  add constraint xpress_teacher_reviews_submission_check check ((submission_id is null)<>(icfes_attempt_id is null)),
  add constraint xpress_teacher_reviews_due_check check (due_at=requested_at+interval '24 hours'),
  add constraint xpress_teacher_reviews_lease_check check ((status='in_review')=(lease_id is not null and lease_expires_at is not null)),
  add constraint xpress_teacher_reviews_idempotency_unique unique(user_id,environment,idempotency_key);

drop index if exists public.xpress_teacher_reviews_one_pending;
drop index if exists public.xpress_teacher_reviews_due;
create unique index xpress_teacher_reviews_one_active on public.xpress_teacher_reviews(user_id)
  where status in ('queued','in_review','needs_qa','failed');
create index xpress_teacher_reviews_due on public.xpress_teacher_reviews(due_at)
  where status in ('queued','in_review','needs_qa','failed');

create view public.xpress_teacher_review_payloads with (security_invoker=true) as
select review.id as review_id,review.assigned_to as assigned_reviewer_id,
  encode(extensions.digest(attempt.id::text,'sha256'),'hex') as review_subject_ref,
  'icfes'::text as exam_slug,attempt.exam_id,attempt.basic_result,
  attempt.answers as objective_answers,review.rubric_version,review.requested_at,review.due_at
from public.xpress_teacher_reviews review join public.icfes_attempts attempt
  on attempt.id=review.icfes_attempt_id and attempt.user_id=review.user_id
where review.status='in_review' and review.assigned_to is not null
  and review.lease_id is not null and review.lease_expires_at>now();

create function public.get_xpress_teacher_review_payload(p_review uuid,p_reviewer uuid,p_lease uuid)
returns setof public.xpress_teacher_review_payloads language sql stable security invoker set search_path='' as $$
  select payload.* from public.xpress_teacher_review_payloads payload
  join public.xpress_teacher_reviews review on review.id=payload.review_id
  where payload.review_id=p_review and review.assigned_to=p_reviewer and review.lease_id=p_lease
    and review.status='in_review' and review.lease_expires_at>now()
    and exists(select 1 from public.xpress_teacher_reviewers reviewer
      where reviewer.reviewer_id=p_reviewer and reviewer.status='active'
        and reviewer.rubric_version=payload.rubric_version
        and reviewer.calibrated_at<=now() and reviewer.calibration_expires_at>now())
$$;

create table public.xpress_teacher_review_alerts (
  review_id uuid not null references public.xpress_teacher_reviews(id) on delete cascade,
  threshold_hours integer not null check (threshold_hours in (6,9,11)),
  created_at timestamptz not null default now(),
  primary key(review_id,threshold_hours)
);

create function public.queue_xpress_teacher_review_alerts()
returns integer language plpgsql security invoker set search_path='' as $$
declare queued integer;
begin
  insert into public.xpress_teacher_review_alerts(review_id,threshold_hours)
    select review.id,threshold.threshold_hours from public.xpress_teacher_reviews review
    cross join (values(6),(9),(11)) threshold(threshold_hours)
    where review.status in ('queued','in_review','needs_qa','failed')
      and review.requested_at+make_interval(hours=>threshold.threshold_hours)<=now()
    on conflict(review_id,threshold_hours) do nothing;
  get diagnostics queued=row_count;
  return queued;
end $$;

alter table public.xpress_teacher_reviewers enable row level security;
alter table public.xpress_teacher_capacity_reservations enable row level security;
alter table public.xpress_teacher_reviews enable row level security;
alter table public.xpress_teacher_review_alerts enable row level security;
revoke all on public.xpress_teacher_reviewers,public.xpress_teacher_capacity_reservations,
  public.xpress_teacher_review_alerts,public.xpress_teacher_review_payloads
  from public,anon,authenticated,service_role;
revoke all on function public.get_xpress_teacher_review_payload(uuid,uuid,uuid) from public,anon,authenticated,service_role;
revoke all on function public.queue_xpress_teacher_review_alerts() from public,anon,authenticated,service_role;
grant select,insert,update on public.xpress_teacher_reviewers to service_role;
grant select,insert,update on public.xpress_teacher_capacity_reservations to service_role;
grant select,insert on public.xpress_teacher_review_alerts to service_role;
grant select on public.xpress_teacher_review_payloads to service_role;
grant execute on function public.get_xpress_teacher_review_payload(uuid,uuid,uuid) to service_role;
grant execute on function public.queue_xpress_teacher_review_alerts() to service_role;
grant select,insert,update on public.xpress_teacher_reviews to service_role;

comment on table public.xpress_teacher_capacity_reservations is 'Server-only pre-checkout capacity holds for one-credit ICFES teacher memberships.';
comment on view public.xpress_teacher_review_payloads is 'Lease-bound ICFES review projection; learner identity and contact fields are excluded.';
