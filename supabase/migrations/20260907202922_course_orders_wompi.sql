-- Additive, private ledger for four-week human classes. Legacy Wompi is untouched.
create table public.course_orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  purchaser_email text not null check (purchaser_email=lower(purchaser_email) and length(purchaser_email) between 5 and 254),
  access_token_hash text not null check (access_token_hash ~ '^[0-9a-f]{64}$'),
  idempotency_key uuid not null,
  environment text not null check (environment in ('sandbox','production')),
  reference text not null unique,
  offer_version text not null,
  selection jsonb not null,
  contact jsonb not null,
  amount_in_cents bigint not null check (amount_in_cents > 0),
  currency text not null default 'COP' check(currency='COP'),
  classes integer not null check(classes > 0),
  sessions integer not null check(sessions=classes*2),
  terms_version text not null,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default now() + interval '24 hours',
  unique(purchaser_email, environment, idempotency_key)
);
create index course_orders_owner_date on public.course_orders(user_id, created_at desc) where user_id is not null;
create index course_orders_email_date on public.course_orders(purchaser_email, created_at desc);
create table public.course_payment_transactions (
  environment text not null,
  provider_id text not null,
  order_id uuid not null references public.course_orders(id),
  status text not null check(status in ('PENDING','APPROVED','DECLINED','ERROR','VOIDED')),
  observed_at timestamptz not null,
  primary key(environment,provider_id)
);
create index course_payment_transactions_order on public.course_payment_transactions(order_id);
create table public.course_payment_events (
  fingerprint text primary key,
  order_id uuid not null references public.course_orders(id),
  provider_id text not null,
  environment text not null,
  status text not null,
  observed_at timestamptz not null,
  received_at timestamptz not null default now()
);
create index course_payment_events_order on public.course_payment_events(order_id);
create table public.course_enrollments (
  order_id uuid primary key references public.course_orders(id),
  credited_provider_id text not null,
  sessions integer not null,
  created_at timestamptz not null default now()
);
create table public.course_coordination_jobs (
  order_id uuid not null references public.course_orders(id),
  kind text not null check(kind in ('schedule','financial_review','student_welcome','owner_notification')),
  status text not null default 'pending' check(status in ('pending','processing','completed','failed')),
  lease_id uuid,
  attempts integer not null default 0,
  last_error text,
  next_attempt_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz,
  primary key(order_id,kind)
);
-- Immutable receipt of the agreed offer. Only payment projections can be updated.
alter table public.course_orders enable row level security;
alter table public.course_payment_transactions enable row level security;
alter table public.course_payment_events enable row level security;
alter table public.course_enrollments enable row level security;
alter table public.course_coordination_jobs enable row level security;
revoke all on public.course_orders,public.course_payment_transactions,public.course_payment_events,public.course_enrollments,public.course_coordination_jobs from public,anon,authenticated,service_role;
grant select,insert on public.course_orders,public.course_payment_events,public.course_enrollments,public.course_coordination_jobs to service_role;
grant update(user_id) on public.course_orders to service_role;
grant update(status,lease_id,attempts,last_error,next_attempt_at,updated_at,completed_at) on public.course_coordination_jobs to service_role;
grant select,insert,update on public.course_payment_transactions to service_role;

create function public.prepare_course_order(p_user uuid,p_email text,p_access_hash text,p_key uuid,p_environment text,p_offer text,p_selection jsonb,p_contact jsonb,p_amount bigint,p_classes integer,p_terms text)
returns public.course_orders language plpgsql security invoker set search_path='' as $$
declare result public.course_orders; new_id uuid;
begin
  if p_email is null or p_email<>lower(p_email) or p_access_hash !~ '^[0-9a-f]{64}$' then raise exception 'invalid_order_identity'; end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_email,0));
  select * into result from public.course_orders where purchaser_email=p_email and environment=p_environment and idempotency_key=p_key;
  if found then
    if result.access_token_hash<>p_access_hash or result.selection<>p_selection or result.contact<>p_contact or result.offer_version<>p_offer or result.amount_in_cents<>p_amount or result.terms_version<>p_terms then
      raise exception 'idempotency_conflict';
    end if;
    return result;
  end if;
  if (select count(*) from public.course_orders where purchaser_email=p_email and created_at>now()-interval '1 hour')>=5 then raise exception 'order_rate_limit'; end if;
  new_id:=gen_random_uuid();
  insert into public.course_orders(id,user_id,purchaser_email,access_token_hash,idempotency_key,environment,reference,offer_version,selection,contact,amount_in_cents,classes,sessions,terms_version)
  values(new_id,p_user,p_email,p_access_hash,p_key,p_environment,'WC-'||new_id::text,p_offer,p_selection,p_contact,p_amount,p_classes,p_classes*2,p_terms)
  returning * into result;
  return result;
end $$;
revoke all on function public.prepare_course_order(uuid,text,text,uuid,text,text,jsonb,jsonb,bigint,integer,text) from public,anon,authenticated;
grant execute on function public.prepare_course_order(uuid,text,text,uuid,text,text,jsonb,jsonb,bigint,integer,text) to service_role;

-- Input must be obtained from an authenticated provider lookup in server code.
-- Event history is append-only; current projections cannot regress on late PENDING.
create function public.record_course_payment(p_reference text,p_environment text,p_provider_id text,p_amount bigint,p_currency text,p_status text,p_observed timestamptz,p_fingerprint text)
returns uuid language plpgsql security invoker set search_path='' as $$
declare o public.course_orders; prior public.course_payment_transactions; approved_count integer;
begin
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_reference,1));
  select * into o from public.course_orders where reference=p_reference;
  if not found then raise exception 'unknown_order'; end if;
  if o.environment<>p_environment or o.amount_in_cents<>p_amount or o.currency<>p_currency then raise exception 'payment_mismatch'; end if;
  if p_status not in ('PENDING','APPROVED','DECLINED','ERROR','VOIDED') or p_provider_id is null or length(p_provider_id)>120 or p_observed is null then raise exception 'invalid_payment'; end if;
  select * into prior from public.course_payment_transactions where environment=p_environment and provider_id=p_provider_id;
  if found and prior.order_id<>o.id then raise exception 'transaction_order_mismatch'; end if;
  insert into public.course_payment_events(fingerprint,order_id,provider_id,environment,status,observed_at)
    values(p_fingerprint,o.id,p_provider_id,p_environment,p_status,p_observed) on conflict do nothing;
  if not found then return o.id; end if;
  insert into public.course_payment_transactions(environment,provider_id,order_id,status,observed_at)
    values(p_environment,p_provider_id,o.id,p_status,p_observed)
    on conflict(environment,provider_id) do update set status=excluded.status,observed_at=excluded.observed_at
    where public.course_payment_transactions.observed_at<=excluded.observed_at
      and not (public.course_payment_transactions.status in ('APPROVED','VOIDED') and excluded.status in ('PENDING','DECLINED','ERROR'))
      and not (public.course_payment_transactions.status='VOIDED' and excluded.status='APPROVED');
  select count(*) into approved_count from public.course_payment_transactions where order_id=o.id and status='APPROVED';
  if approved_count>0 then
    insert into public.course_enrollments(order_id,credited_provider_id,sessions)
      select o.id,t.provider_id,o.sessions from public.course_payment_transactions t where t.order_id=o.id and t.status='APPROVED' order by observed_at limit 1
      on conflict do nothing;
    insert into public.course_coordination_jobs(order_id,kind) values(o.id,'schedule') on conflict do nothing;
    insert into public.course_coordination_jobs(order_id,kind) values(o.id,'student_welcome') on conflict do nothing;
    insert into public.course_coordination_jobs(order_id,kind) values(o.id,'owner_notification') on conflict do nothing;
  end if;
  if approved_count>1 or p_status='VOIDED' then
    insert into public.course_coordination_jobs(order_id,kind) values(o.id,'financial_review') on conflict do nothing;
  end if;
  return o.id;
end $$;
revoke all on function public.record_course_payment(text,text,text,bigint,text,text,timestamptz,text) from public,anon,authenticated;
grant execute on function public.record_course_payment(text,text,text,bigint,text,text,timestamptz,text) to service_role;

-- Short leases make webhook retries safe: only one worker performs each external side effect.
create function public.claim_course_job(p_order uuid,p_kind text,p_lease uuid)
returns boolean language plpgsql security invoker set search_path='' as $$
declare claimed integer;
begin
  update public.course_coordination_jobs
    set status='processing',lease_id=p_lease,attempts=attempts+1,updated_at=now(),last_error=null
    where order_id=p_order and kind=p_kind
      and (status in ('pending','failed') and next_attempt_at<=now() or status='processing' and updated_at<now()-interval '5 minutes');
  get diagnostics claimed=row_count;
  return claimed=1;
end $$;
revoke all on function public.claim_course_job(uuid,text,uuid) from public,anon,authenticated;
grant execute on function public.claim_course_job(uuid,text,uuid) to service_role;

create function public.finish_course_job(p_order uuid,p_kind text,p_lease uuid,p_success boolean,p_error text default null)
returns boolean language plpgsql security invoker set search_path='' as $$
declare finished integer;
begin
  update public.course_coordination_jobs
    set status=case when p_success then 'completed' else 'failed' end,
        completed_at=case when p_success then now() else null end,
        next_attempt_at=case when p_success then next_attempt_at else now()+least(interval '1 hour',interval '1 minute'*power(2,least(attempts,6))) end,
        last_error=case when p_success then null else left(coalesce(p_error,'failed'),300) end,
        lease_id=null,updated_at=now()
    where order_id=p_order and kind=p_kind and status='processing' and lease_id=p_lease;
  get diagnostics finished=row_count;
  return finished=1;
end $$;
revoke all on function public.finish_course_job(uuid,text,uuid,boolean,text) from public,anon,authenticated;
grant execute on function public.finish_course_job(uuid,text,uuid,boolean,text) to service_role;
