-- Cover foreign keys used by subscription reconciliation and deletion checks.
create index if not exists xpress_subscriptions_last_order
  on public.xpress_subscriptions(last_payment_order_id)
  where last_payment_order_id is not null;

create index if not exists xpress_subscription_notifications_order
  on public.xpress_subscription_notifications(order_id)
  where order_id is not null;
