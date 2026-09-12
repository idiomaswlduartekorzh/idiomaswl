-- A cancellation wins over later retries or failures while still allowing an in-flight approved payment to grant its paid period.
create function public.guard_xpress_subscription_cancellation()
returns trigger language plpgsql security invoker set search_path='' as $$
begin
  if new.cancel_requested_at is not null then
    new.next_charge_at:=null;
    if new.status='canceled' or (new.current_period_end is null and new.last_payment_status in ('DECLINED','ERROR','VOIDED')) or new.current_period_end<=now() then
      new.status:='canceled';
      new.canceled_at:=coalesce(new.canceled_at,now());
    elsif new.current_period_end>now() or new.last_payment_status='PENDING' then
      new.status:='cancel_at_period_end';
      new.canceled_at:=null;
    end if;
  end if;
  return new;
end $$;

create trigger xpress_subscription_cancellation_guard
  before update on public.xpress_subscriptions
  for each row execute function public.guard_xpress_subscription_cancellation();

revoke all on function public.guard_xpress_subscription_cancellation() from public,anon,authenticated;
