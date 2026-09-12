-- Release canceled subscriptions after their already-paid access period ends.
create function public.finalize_xpress_subscription_cancellations()
returns integer language plpgsql security invoker set search_path='' as $$
declare changed integer;
begin
  update public.xpress_subscriptions set status='canceled',canceled_at=coalesce(canceled_at,now()),lease_id=null,lease_expires_at=null,updated_at=now()
    where status='cancel_at_period_end' and current_period_end<=now();
  get diagnostics changed=row_count;
  return changed;
end $$;

revoke all on function public.finalize_xpress_subscription_cancellations() from public,anon,authenticated;
grant execute on function public.finalize_xpress_subscription_cancellations() to service_role;
