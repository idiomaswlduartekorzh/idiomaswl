create table if not exists public.manual_course_enrollment_invites (
  id uuid primary key default gen_random_uuid(),
  token_hash text not null unique check (token_hash ~ '^[a-f0-9]{64}$'),
  email text not null,
  plan text not null default 'intensivo' check (plan = 'intensivo'),
  payment_method text not null default 'consignacion' check (payment_method = 'consignacion'),
  payment_reported_by text not null,
  amount_in_cents bigint,
  preferred_schedule text not null default 'Entre semana, 10:00 a 11:40 a. m.; días por acordar',
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  contact jsonb,
  selection jsonb,
  terms_version text,
  privacy_version text,
  legal_snapshot text,
  legal_sha256 text,
  signed_pdf_base64 text,
  signed_pdf_sha256 text,
  signed_by text,
  accepted_at timestamptz,
  user_id uuid references auth.users(id),
  completed_at timestamptz,
  welcome_sent_at timestamptz,
  constraint manual_invite_evidence_consistent check (
    (accepted_at is null and contact is null and selection is null and legal_snapshot is null and signed_pdf_base64 is null)
    or (accepted_at is not null and contact is not null and selection is not null and legal_snapshot is not null and legal_sha256 is not null and signed_pdf_base64 is not null and signed_pdf_sha256 is not null and signed_by is not null)
  )
);
create index if not exists manual_course_enrollment_invites_email_idx on public.manual_course_enrollment_invites (lower(email));
alter table public.manual_course_enrollment_invites enable row level security;
revoke all on public.manual_course_enrollment_invites from anon, authenticated;
