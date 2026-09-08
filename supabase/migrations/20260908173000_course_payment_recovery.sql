-- Durable inbox for signed Wompi course events. It preserves the provider ID
-- before the backend calls Wompi, so transient provider failures can be retried.
create table public.course_payment_reconciliation_queue (
  environment text not null check (environment in ('sandbox','production')),
  provider_id text not null check (length(provider_id) between 6 and 120),
  order_id uuid not null references public.course_orders(id),
  status text not null default 'pending' check (status in ('pending','completed','failed')),
  attempts integer not null default 0 check (attempts >= 0),
  last_error text,
  next_attempt_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz,
  primary key (environment, provider_id)
);

create index course_payment_reconciliation_due
  on public.course_payment_reconciliation_queue(next_attempt_at)
  where status in ('pending','failed');
create index course_payment_reconciliation_order
  on public.course_payment_reconciliation_queue(order_id);

alter table public.course_payment_reconciliation_queue enable row level security;
revoke all on public.course_payment_reconciliation_queue from public, anon, authenticated, service_role;
grant select, insert on public.course_payment_reconciliation_queue to service_role;
grant update(status, attempts, last_error, next_attempt_at, updated_at, completed_at)
  on public.course_payment_reconciliation_queue to service_role;

create function public.queue_course_payment_reconciliation(
  p_reference text,
  p_environment text,
  p_provider_id text
)
returns uuid language plpgsql security invoker set search_path='' as $$
declare selected_order public.course_orders; stored_order uuid;
begin
  if p_provider_id is null or length(p_provider_id) not between 6 and 120 then
    raise exception 'invalid_transaction';
  end if;

  select * into selected_order
  from public.course_orders
  where reference=p_reference and environment=p_environment;

  if not found then return null; end if;

  insert into public.course_payment_reconciliation_queue(environment,provider_id,order_id)
  values(p_environment,p_provider_id,selected_order.id)
  on conflict(environment,provider_id) do nothing;

  select order_id into stored_order
  from public.course_payment_reconciliation_queue
  where environment=p_environment and provider_id=p_provider_id;
  if stored_order<>selected_order.id then raise exception 'transaction_order_mismatch'; end if;

  return selected_order.id;
end $$;

revoke all on function public.queue_course_payment_reconciliation(text,text,text)
  from public, anon, authenticated;
grant execute on function public.queue_course_payment_reconciliation(text,text,text)
  to service_role;

create function public.finish_course_payment_reconciliation(
  p_environment text,
  p_provider_id text,
  p_success boolean,
  p_error text default null
)
returns boolean language plpgsql security invoker set search_path='' as $$
declare finished integer;
begin
  update public.course_payment_reconciliation_queue
  set status=case when p_success then 'completed' else 'failed' end,
      attempts=attempts+1,
      last_error=case when p_success then null else left(coalesce(p_error,'failed'),300) end,
      next_attempt_at=case
        when p_success then next_attempt_at
        else now()+least(interval '6 hours',interval '5 minutes'*power(2,least(attempts,6)))
      end,
      updated_at=now(),
      completed_at=case when p_success then now() else null end
  where environment=p_environment and provider_id=p_provider_id and status<>'completed';
  get diagnostics finished=row_count;
  return finished=1;
end $$;

revoke all on function public.finish_course_payment_reconciliation(text,text,boolean,text)
  from public, anon, authenticated;
grant execute on function public.finish_course_payment_reconciliation(text,text,boolean,text)
  to service_role;
