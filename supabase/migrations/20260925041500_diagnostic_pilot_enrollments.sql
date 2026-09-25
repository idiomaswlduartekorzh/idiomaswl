-- Controlled pilot cohort. Browser roles cannot read or mutate enrollment.
-- Enrollment is created only after the approved pilot consent is captured by
-- an authorized operational workflow outside the diagnostic start request.

begin;

create table public.diagnostic_pilot_enrollments (
  user_id uuid primary key references auth.users(id) on delete cascade,
  cohort_id text not null check (char_length(cohort_id) between 3 and 100),
  status text not null check (status in ('invited','consented','revoked','completed')),
  pilot_consent_version text check (
    pilot_consent_version is null or char_length(pilot_consent_version) between 3 and 160
  ),
  consented_at timestamptz,
  enrolled_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (
    (status in ('consented','completed') and pilot_consent_version is not null and consented_at is not null)
    or (status in ('invited','revoked'))
  )
);

create index diagnostic_pilot_enrollments_status_idx
  on public.diagnostic_pilot_enrollments(status, cohort_id);

alter table public.diagnostic_pilot_enrollments enable row level security;
revoke all on table public.diagnostic_pilot_enrollments
  from public, anon, authenticated, service_role;
grant select, insert, update, delete on table public.diagnostic_pilot_enrollments
  to service_role;

comment on table public.diagnostic_pilot_enrollments is
  'Server-only allowlist and consent evidence for controlled adaptive diagnostic pilots.';

commit;
