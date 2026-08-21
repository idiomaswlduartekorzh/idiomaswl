-- Cross-instance quotas for student submissions and delegated-agent calls.
-- The application hashes identifiers before calling this function, so raw
-- email addresses, IP addresses and bearer tokens are never stored here.
create schema if not exists private;
revoke all on schema private from public;

create table if not exists private.ielts_rate_limits (
  key_hash text primary key,
  request_count integer not null check (request_count > 0),
  window_started_at timestamptz not null,
  updated_at timestamptz not null
);

revoke all on table private.ielts_rate_limits from public, anon, authenticated;

create or replace function public.consume_ielts_rate_limit(
  p_key_hash text,
  p_limit integer,
  p_window_seconds integer
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $function$
declare
  request_time timestamptz := clock_timestamp();
  cutoff timestamptz;
  allowed boolean;
begin
  if p_key_hash !~ '^[0-9a-f]{64}$'
    or p_limit < 1 or p_limit > 10000
    or p_window_seconds < 1 or p_window_seconds > 86400 then
    return false;
  end if;

  cutoff := request_time - make_interval(secs => p_window_seconds);

  insert into private.ielts_rate_limits as quota (
    key_hash,
    request_count,
    window_started_at,
    updated_at
  ) values (
    p_key_hash,
    1,
    request_time,
    request_time
  )
  on conflict (key_hash) do update
  set request_count = case
        when quota.window_started_at <= cutoff then 1
        else quota.request_count + 1
      end,
      window_started_at = case
        when quota.window_started_at <= cutoff then request_time
        else quota.window_started_at
      end,
      updated_at = request_time
  where quota.window_started_at <= cutoff
     or quota.request_count < p_limit
  returning true into allowed;

  return coalesce(allowed, false);
end
$function$;

revoke all on function public.consume_ielts_rate_limit(text, integer, integer)
  from public, anon, authenticated;
grant execute on function public.consume_ielts_rate_limit(text, integer, integer)
  to service_role;
