-- Private-by-default access codes for supervised exam sessions.
-- Only server code using the service role can create, list, revoke or redeem.

create table public.exam_access_codes (
  id uuid primary key default gen_random_uuid(),
  code_hash text not null unique check (code_hash ~ '^[0-9a-f]{64}$'),
  code_hint text not null check (char_length(code_hint) between 4 and 12),
  kind text not null check (kind in ('single_use', 'classroom_5h')),
  exam_slug text not null check (exam_slug in ('icfes', 'ielts', 'toefl', 'goethe')),
  label text check (label is null or char_length(label) <= 120),
  created_by uuid references auth.users(id) on delete set null,
  created_by_email text,
  created_at timestamptz not null default clock_timestamp(),
  activated_at timestamptz,
  expires_at timestamptz,
  redemption_count integer not null default 0 check (redemption_count >= 0),
  last_redeemed_at timestamptz,
  constraint exam_access_codes_lifecycle_check check (
    (kind = 'single_use' and activated_at is null and expires_at is null)
    or
    (kind = 'classroom_5h' and (
      (activated_at is null and expires_at is null)
      or (activated_at is not null and expires_at = activated_at + interval '5 hours')
    ))
  )
);

create index exam_access_codes_active_idx
  on public.exam_access_codes (exam_slug, kind, expires_at);

create table public.exam_access_code_redemptions (
  id uuid primary key default gen_random_uuid(),
  code_id uuid references public.exam_access_codes(id) on delete set null,
  code_hint text not null,
  code_kind text not null check (code_kind in ('single_use', 'classroom_5h')),
  exam_slug text not null check (exam_slug in ('icfes', 'ielts', 'toefl', 'goethe')),
  attempt_ref text not null check (char_length(attempt_ref) between 8 and 160),
  redeemed_at timestamptz not null default clock_timestamp(),
  unique (exam_slug, attempt_ref)
);

create index exam_access_code_redemptions_attempt_idx
  on public.exam_access_code_redemptions (exam_slug, attempt_ref);

alter table public.exam_access_codes enable row level security;
alter table public.exam_access_code_redemptions enable row level security;

revoke all on table public.exam_access_codes from public, anon, authenticated;
revoke all on table public.exam_access_code_redemptions from public, anon, authenticated;
grant select, insert, update, delete on table public.exam_access_codes to service_role;
grant select, insert, update, delete on table public.exam_access_code_redemptions to service_role;

comment on table public.exam_access_codes is
  'Server-only hashed codes that bypass the post-exam payment interface.';
comment on column public.exam_access_codes.code_hash is
  'SHA-256 of the normalized code. Plaintext is returned once at creation and never persisted.';
comment on column public.exam_access_codes.expires_at is
  'Classroom codes expire exactly five hours after first successful redemption.';

create or replace function public.redeem_exam_access_code(
  p_code_hash text,
  p_exam_slug text,
  p_attempt_ref text
)
returns table (
  accepted boolean,
  code_kind text,
  active_until timestamptz,
  reason text
)
language plpgsql
security invoker
set search_path = ''
as $function$
declare
  request_time timestamptz := clock_timestamp();
  selected_code public.exam_access_codes%rowtype;
  inserted_count integer := 0;
begin
  if p_code_hash !~ '^[0-9a-f]{64}$'
    or p_exam_slug not in ('icfes', 'ielts', 'toefl', 'goethe')
    or char_length(p_attempt_ref) not between 8 and 160 then
    return query select false, null::text, null::timestamptz, 'invalid_input'::text;
    return;
  end if;

  if exists (
    select 1
    from public.exam_access_code_redemptions r
    where r.exam_slug = p_exam_slug and r.attempt_ref = p_attempt_ref
  ) then
    return query select true, 'existing_grant'::text, null::timestamptz, 'already_unlocked'::text;
    return;
  end if;

  select * into selected_code
  from public.exam_access_codes c
  where c.code_hash = p_code_hash and c.exam_slug = p_exam_slug
  for update;

  if not found then
    return query select false, null::text, null::timestamptz, 'invalid_code'::text;
    return;
  end if;

  if selected_code.kind = 'classroom_5h' then
    if selected_code.activated_at is null then
      update public.exam_access_codes
      set activated_at = request_time,
          expires_at = request_time + interval '5 hours'
      where id = selected_code.id
      returning * into selected_code;
    elsif selected_code.expires_at <= request_time then
      delete from public.exam_access_codes where id = selected_code.id;
      return query select false, 'classroom_5h'::text, selected_code.expires_at, 'expired'::text;
      return;
    end if;
  end if;

  insert into public.exam_access_code_redemptions (
    code_id, code_hint, code_kind, exam_slug, attempt_ref, redeemed_at
  ) values (
    selected_code.id, selected_code.code_hint, selected_code.kind,
    selected_code.exam_slug, p_attempt_ref, request_time
  )
  on conflict (exam_slug, attempt_ref) do nothing;
  get diagnostics inserted_count = row_count;

  if selected_code.kind = 'single_use' then
    delete from public.exam_access_codes where id = selected_code.id;
  elsif inserted_count > 0 then
    update public.exam_access_codes
    set redemption_count = redemption_count + 1,
        last_redeemed_at = request_time
    where id = selected_code.id;
  end if;

  return query select true, selected_code.kind, selected_code.expires_at, 'accepted'::text;
end
$function$;

revoke all on function public.redeem_exam_access_code(text, text, text)
  from public, anon, authenticated;
grant execute on function public.redeem_exam_access_code(text, text, text)
  to service_role;

-- Expiration is enforced inside the redemption transaction. This scheduled
-- cleanup physically removes classroom rows shortly after their five-hour window.
create extension if not exists pg_cron;

select cron.schedule(
  'cleanup-expired-exam-access-codes',
  '*/15 * * * *',
  $cron$delete from public.exam_access_codes where kind = 'classroom_5h' and expires_at <= clock_timestamp()$cron$
);
