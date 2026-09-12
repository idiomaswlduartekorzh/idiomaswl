-- Private teacher assignments for students enrolled in guided courses.
begin;

-- Course fulfillment used to label paid guided students as self-directed.
-- Repair only profiles with a completed course enrollment.
update public.profiles profile
set plan=case when orders.selection->>'plan' in ('intensivo','diario') then 'intensivo' else 'preparacion' end
from public.course_orders orders
join public.course_enrollments enrollment on enrollment.order_id=orders.id
where profile.id=orders.user_id
  and profile.plan='autodidacta';

create table public.student_assignments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  created_by uuid references auth.users(id) on delete set null,
  title text not null check (char_length(trim(title)) between 3 and 140),
  instructions text not null default '' check (char_length(instructions) <= 4000),
  resource_url text check (resource_url is null or resource_url ~ '^(https://|/)'),
  due_at timestamptz,
  status text not null default 'assigned' check (status in ('assigned','completed','canceled')),
  assigned_at timestamptz not null default now(),
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  check ((status = 'completed' and completed_at is not null) or (status <> 'completed'))
);

create index student_assignments_student_status_due
  on public.student_assignments(student_id,status,due_at,assigned_at desc);

alter table public.student_assignments enable row level security;
revoke all on public.student_assignments from public,anon,authenticated,service_role;
grant select,insert,update,delete on public.student_assignments to service_role;
grant select on public.student_assignments to authenticated;
grant update(status,completed_at,updated_at) on public.student_assignments to authenticated;

create policy "students read own assignments"
  on public.student_assignments for select to authenticated
  using ((select auth.uid()) is not null and (select auth.uid()) = student_id);

create policy "students update own assignment completion"
  on public.student_assignments for update to authenticated
  using (
    (select auth.uid()) is not null
    and (select auth.uid()) = student_id
    and status <> 'canceled'
  )
  with check (
    (select auth.uid()) is not null
    and (select auth.uid()) = student_id
    and status in ('assigned','completed')
  );

create function public.set_student_assignment_completed(p_assignment_id uuid,p_completed boolean)
returns boolean
language plpgsql
security invoker
set search_path=''
as $function$
begin
  update public.student_assignments
  set status=case when p_completed then 'completed' else 'assigned' end,
      completed_at=case when p_completed then now() else null end,
      updated_at=now()
  where id=p_assignment_id
    and student_id=(select auth.uid())
    and status<>'canceled';
  return found;
end
$function$;

revoke all on function public.set_student_assignment_completed(uuid,boolean) from public,anon,authenticated,service_role;
grant execute on function public.set_student_assignment_completed(uuid,boolean) to authenticated;

comment on table public.student_assignments is
  'Private assignments created by an allowlisted administrator for one guided-course student.';

commit;
