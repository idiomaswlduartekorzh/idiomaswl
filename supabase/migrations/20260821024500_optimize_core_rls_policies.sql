-- Keep authorization predicates stable per statement so Postgres can reuse the
-- result instead of re-evaluating auth helpers for every row in large queues.
drop policy if exists "users can view own profile" on public.profiles;
drop policy if exists "allowlisted admins can view all profiles" on public.profiles;

create policy "authenticated users read permitted profiles"
  on public.profiles
  for select
  to authenticated
  using (
    (select auth.uid()) = id
    or lower(coalesce(((select auth.jwt()) ->> 'email'), '')) = any (
      array[
        'josedavidduartesilva@gmail.com',
        'david.duartes182@gmail.com',
        'jose@welearn.com',
        'zhanna.korzh@gmail.com',
        'zhanna@welearn.com'
      ]
    )
  );

drop policy if exists "profiles are created on signup" on public.profiles;
create policy "profiles are created on signup"
  on public.profiles
  for insert
  to authenticated
  with check ((select auth.uid()) = id);

drop policy if exists "Users insert own" on public.exam_submissions;
create policy "Users insert own"
  on public.exam_submissions
  for insert
  to public
  with check ((select auth.uid()) = user_id or user_id is null);
