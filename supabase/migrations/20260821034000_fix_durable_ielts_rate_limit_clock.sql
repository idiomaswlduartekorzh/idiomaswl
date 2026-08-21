-- `current_time` is a reserved SQL expression. Use an unambiguous local name
-- so the fixed-window cutoff remains a full timestamptz value.
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
