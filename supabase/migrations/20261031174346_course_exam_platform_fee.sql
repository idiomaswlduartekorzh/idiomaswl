-- One platform payment per student for any exam objective. Historical paid exam
-- classes and active WeLearn exam grants count as existing platform access.
alter table public.course_orders
  add column platform_fee_in_cents bigint not null default 0 check (platform_fee_in_cents in (0,9900000)),
  add column platform_fee_reason text not null default 'legacy' check (platform_fee_reason in ('legacy','not_exam','first_exam','previous_exam_course','existing_welearn_access')),
  add column platform_fee_version text;

create or replace function public.prepare_course_order_with_fee(p_user uuid,p_email text,p_access_hash text,p_key uuid,p_environment text,p_offer text,p_selection jsonb,p_contact jsonb,p_amount bigint,p_classes integer,p_terms text)
returns public.course_orders language plpgsql security invoker set search_path='' as $$
declare
  result public.course_orders;
  new_id uuid;
  last_paid_at timestamptz;
  enrollment_fee bigint := 0;
  enrollment_reason text := 'legacy';
  platform_fee bigint := 0;
  platform_reason text := 'not_exam';
begin
  if p_email is null or p_email<>lower(p_email) or p_access_hash !~ '^[0-9a-f]{64}$'
    or p_amount<=0 or p_terms<>'course-20261031-v4' or coalesce(p_selection->>'objective','')='' then
    raise exception 'invalid_order_identity';
  end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_email,0));
  select * into result from public.course_orders where purchaser_email=p_email and environment=p_environment and idempotency_key=p_key;
  if found then
    if result.access_token_hash<>p_access_hash or result.selection<>p_selection or result.contact<>p_contact
      or result.offer_version<>p_offer or result.amount_in_cents<>p_amount+result.enrollment_fee_in_cents+result.platform_fee_in_cents
      or result.terms_version<>p_terms then raise exception 'idempotency_conflict'; end if;
    return result;
  end if;
  if (select count(*) from public.course_orders where purchaser_email=p_email and created_at>now()-interval '1 hour')>=5 then
    raise exception 'order_rate_limit';
  end if;
  if exists (
    select 1 from public.course_orders o where o.purchaser_email=p_email and o.environment=p_environment
      and o.expires_at>now() and not exists (
        select 1 from public.course_payment_transactions t where t.order_id=o.id and t.status='APPROVED'
      )
  ) then raise exception 'open_order_exists'; end if;

  select max(t.observed_at) into last_paid_at
    from public.course_orders o
    join public.course_payment_transactions t on t.order_id=o.id
    where o.purchaser_email=p_email and o.environment=p_environment and t.status='APPROVED';
  if last_paid_at is null then enrollment_reason := 'first_enrollment'; enrollment_fee := 4420000;
  elsif last_paid_at < now()-interval '42 days' then enrollment_reason := 'return_after_pause'; enrollment_fee := 4420000;
  else enrollment_reason := 'continuous_cycle'; end if;

  if p_selection->>'objective'<>'general' then
    if exists (
      select 1 from public.course_orders o
      join public.course_payment_transactions t on t.order_id=o.id
      where o.purchaser_email=p_email and o.environment=p_environment and t.status='APPROVED'
        and o.selection->>'objective'<>'general'
    ) then platform_reason := 'previous_exam_course';
    elsif exists (
      select 1 from public.profiles p join public.exam_access_grants g on g.user_id=p.id
      where p.email=p_email and g.source='welearn' and g.status='active'
    ) then platform_reason := 'existing_welearn_access';
    else platform_reason := 'first_exam'; platform_fee := 9900000;
    end if;
  end if;

  new_id:=gen_random_uuid();
  insert into public.course_orders(id,user_id,purchaser_email,access_token_hash,idempotency_key,environment,reference,offer_version,selection,contact,amount_in_cents,classes,sessions,terms_version,enrollment_fee_in_cents,enrollment_fee_reason,enrollment_fee_version,previous_paid_at,platform_fee_in_cents,platform_fee_reason,platform_fee_version)
  values(new_id,p_user,p_email,p_access_hash,p_key,p_environment,'WC-'||new_id::text,p_offer,p_selection,p_contact,p_amount+enrollment_fee+platform_fee,p_classes,p_classes*2,p_terms,enrollment_fee,enrollment_reason,'enrollment-20261031-v1',last_paid_at,platform_fee,platform_reason,'exam-platform-20261031-v1')
  returning * into result;
  return result;
end $$;
revoke all on function public.prepare_course_order_with_fee(uuid,text,text,uuid,text,text,jsonb,jsonb,bigint,integer,text) from public,anon,authenticated;
grant execute on function public.prepare_course_order_with_fee(uuid,text,text,uuid,text,text,jsonb,jsonb,bigint,integer,text) to service_role;
