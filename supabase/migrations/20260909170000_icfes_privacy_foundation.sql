-- Add the secure privacy foundation without rewriting the already-applied ICFES ledger migration.
-- Existing attempts are grandfathered as UNKNOWN with no retention deadline; new commercial
-- attempts are accepted only when the application supplies an approved contract and age assurance.

create table if not exists public.icfes_privacy_contracts (
  version text primary key check (version ~ '^icfes-privacy-[0-9]{4}-[0-9]{2}-[a-z0-9-]+$'),
  status text not null default 'DRAFT_BLOCKED' check (status in ('DRAFT_BLOCKED', 'APPROVED', 'RETIRED')),
  attempt_retention_days integer check (attempt_retention_days between 1 and 3650),
  export_response_days integer check (export_response_days between 1 and 90),
  deletion_response_days integer check (deletion_response_days between 1 and 90),
  minor_handling text check (minor_handling in ('ADULT_ONLY', 'GUARDIAN_ATTESTATION', 'BLOCK_ALL_MINORS')),
  processing_purpose text,
  legal_basis text,
  approved_by text,
  approval_evidence_ref text,
  approved_at timestamptz,
  retired_at timestamptz,
  created_at timestamptz not null default now(),
  check (status='DRAFT_BLOCKED' or (
    attempt_retention_days is not null and export_response_days is not null and deletion_response_days is not null
    and minor_handling is not null and processing_purpose is not null and length(processing_purpose)>=20
    and legal_basis is not null and length(legal_basis)>=5 and approved_by is not null and length(approved_by)>=2
    and approval_evidence_ref is not null and length(approval_evidence_ref)>=8 and approved_at is not null
  ))
);
insert into public.icfes_privacy_contracts(version,status)
values('icfes-privacy-2026-09-draft','DRAFT_BLOCKED') on conflict(version) do nothing;

create or replace function public.protect_icfes_privacy_contract_version()
returns trigger language plpgsql security invoker set search_path='' as $$
begin
  if new.version<>old.version then raise exception 'icfes_privacy_contract_version_immutable'; end if;
  if old.status='RETIRED' then raise exception 'icfes_privacy_contract_retired'; end if;
  if old.status='APPROVED' and (
    new.attempt_retention_days is distinct from old.attempt_retention_days
    or new.export_response_days is distinct from old.export_response_days
    or new.deletion_response_days is distinct from old.deletion_response_days
    or new.minor_handling is distinct from old.minor_handling
    or new.processing_purpose is distinct from old.processing_purpose
    or new.legal_basis is distinct from old.legal_basis
    or new.approved_by is distinct from old.approved_by
    or new.approval_evidence_ref is distinct from old.approval_evidence_ref
    or new.approved_at is distinct from old.approved_at
    or new.status<>'RETIRED'
  ) then raise exception 'icfes_privacy_contract_approved_version_immutable'; end if;
  return new;
end $$;
drop trigger if exists icfes_privacy_contract_version_guard on public.icfes_privacy_contracts;
create trigger icfes_privacy_contract_version_guard before update on public.icfes_privacy_contracts
for each row execute function public.protect_icfes_privacy_contract_version();

alter table public.icfes_attempts
  add column if not exists privacy_contract_version text references public.icfes_privacy_contracts(version)
    default 'icfes-privacy-2026-09-draft',
  add column if not exists age_assurance text default 'UNKNOWN',
  add column if not exists guardian_attested_at timestamptz,
  add column if not exists retention_expires_at timestamptz,
  add column if not exists question_snapshot_version text,
  add column if not exists question_snapshot_hash text,
  add column if not exists question_snapshot jsonb;
alter table public.icfes_attempts alter column privacy_contract_version set not null;
alter table public.icfes_attempts alter column age_assurance set not null;
alter table public.icfes_attempts drop constraint if exists icfes_attempts_age_assurance_check;
alter table public.icfes_attempts add constraint icfes_attempts_age_assurance_check
  check(age_assurance in ('UNKNOWN','ADULT_ATTESTED','MINOR_GUARDIAN_ATTESTED','MINOR_UNATTESTED'));
alter table public.icfes_attempts drop constraint if exists icfes_attempts_guardian_attestation_check;
alter table public.icfes_attempts add constraint icfes_attempts_guardian_attestation_check
  check((age_assurance='MINOR_GUARDIAN_ATTESTED')=(guardian_attested_at is not null)) not valid;
alter table public.icfes_attempts drop constraint if exists icfes_attempts_retention_check;
alter table public.icfes_attempts add constraint icfes_attempts_retention_check
  check(retention_expires_at is null or retention_expires_at>created_at) not valid;
alter table public.icfes_attempts drop constraint if exists icfes_attempts_basic_result_safe_check;
alter table public.icfes_attempts add constraint icfes_attempts_basic_result_safe_check check (
  jsonb_typeof(basic_result)='object'
  and not (basic_result ?| array['answer','answers','correctAnswer','rationale','explanation','questions'])
) not valid;

create or replace function public.enforce_icfes_attempt_privacy_contract()
returns trigger language plpgsql security invoker set search_path='' as $$
declare contract public.icfes_privacy_contracts;
begin
  select * into contract from public.icfes_privacy_contracts where version=new.privacy_contract_version;
  if not found or contract.status<>'APPROVED' or contract.attempt_retention_days is null
    then raise exception 'icfes_privacy_contract_not_approved'; end if;
  if new.age_assurance='UNKNOWN' then raise exception 'icfes_age_assurance_required'; end if;
  if new.age_assurance='MINOR_UNATTESTED' then raise exception 'icfes_minor_without_guardian_blocked'; end if;
  if new.age_assurance='MINOR_GUARDIAN_ATTESTED' and contract.minor_handling<>'GUARDIAN_ATTESTATION'
    then raise exception 'icfes_minor_processing_not_approved'; end if;
  new.retention_expires_at:=new.created_at+make_interval(days=>contract.attempt_retention_days);
  return new;
end $$;
drop trigger if exists icfes_attempt_privacy_contract_guard on public.icfes_attempts;
create trigger icfes_attempt_privacy_contract_guard
before insert or update of privacy_contract_version,age_assurance,guardian_attested_at,created_at on public.icfes_attempts
for each row execute function public.enforce_icfes_attempt_privacy_contract();

alter table public.icfes_entitlements drop constraint if exists icfes_entitlements_product_code_check;
alter table public.icfes_entitlements add constraint icfes_entitlements_product_code_check
  check(product_code='icfes-detail-attempt-v1') not valid;

create table if not exists public.icfes_data_subject_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  request_type text not null check(request_type in ('EXPORT','DELETE')),
  status text not null default 'BLOCKED_POLICY' check(status in ('BLOCKED_POLICY','QUEUED','PROCESSING','COMPLETED','REJECTED')),
  privacy_contract_version text not null default 'icfes-privacy-2026-09-draft' references public.icfes_privacy_contracts(version),
  requested_at timestamptz not null default now(), due_at timestamptz, completed_at timestamptz, result_evidence_ref text,
  check((status='BLOCKED_POLICY')=(due_at is null)),
  check((status='COMPLETED')=(completed_at is not null)),
  check(due_at is null or due_at>requested_at)
);
create unique index if not exists icfes_data_subject_requests_one_open
  on public.icfes_data_subject_requests(user_id,request_type)
  where status in ('BLOCKED_POLICY','QUEUED','PROCESSING');
create index if not exists icfes_attempts_retention_idx on public.icfes_attempts(retention_expires_at);

alter table public.icfes_privacy_contracts enable row level security;
alter table public.icfes_data_subject_requests enable row level security;
revoke all on table public.icfes_privacy_contracts,public.icfes_data_subject_requests from public,anon,authenticated,service_role;
revoke all on function public.enforce_icfes_attempt_privacy_contract() from public,anon,authenticated;
revoke all on function public.protect_icfes_privacy_contract_version() from public,anon,authenticated;
grant select on table public.icfes_privacy_contracts to service_role;
grant select,insert on table public.icfes_data_subject_requests to service_role;
grant update(status,due_at,completed_at,result_evidence_ref) on table public.icfes_data_subject_requests to service_role;
revoke update on table public.icfes_attempts from service_role;
grant update(user_id,updated_at) on table public.icfes_attempts to service_role;

comment on table public.icfes_privacy_contracts is 'Versioned, human-approved retention and minor-handling policy.';
comment on table public.icfes_data_subject_requests is 'Private queue for authenticated-owner export and deletion operations.';
