-- Authorize Zhanna's current production email everywhere the academic admin
-- dashboard reads or reviews student work. Application authorization remains
-- server-owned; these RLS policies only grant the matching browser session the
-- row access needed by the limited academic dashboard.

begin;

drop policy if exists "authenticated users read permitted profiles" on public.profiles;
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
        'zhanna.duarte@mail.ru',
        'zhanna.korzh@gmail.com',
        'zhanna@welearn.com'
      ]
    )
  );

drop policy if exists "Authorized users read submissions" on public.exam_submissions;
create policy "Authorized users read submissions"
  on public.exam_submissions
  for select
  to authenticated
  using (
    (select auth.uid()) = user_id
    or lower(coalesce(((select auth.jwt()) ->> 'email'), '')) = any (
      array[
        'josedavidduartesilva@gmail.com',
        'david.duartes182@gmail.com',
        'jose@welearn.com',
        'zhanna.duarte@mail.ru',
        'zhanna.korzh@gmail.com',
        'zhanna@welearn.com'
      ]
    )
  );

drop policy if exists "Allowlisted admins update submissions" on public.exam_submissions;
create policy "Allowlisted admins update submissions"
  on public.exam_submissions
  for update
  to authenticated
  using (
    lower(coalesce(((select auth.jwt()) ->> 'email'), '')) = any (
      array[
        'josedavidduartesilva@gmail.com',
        'david.duartes182@gmail.com',
        'jose@welearn.com',
        'zhanna.duarte@mail.ru',
        'zhanna.korzh@gmail.com',
        'zhanna@welearn.com'
      ]
    )
  )
  with check (
    lower(coalesce(((select auth.jwt()) ->> 'email'), '')) = any (
      array[
        'josedavidduartesilva@gmail.com',
        'david.duartes182@gmail.com',
        'jose@welearn.com',
        'zhanna.duarte@mail.ru',
        'zhanna.korzh@gmail.com',
        'zhanna@welearn.com'
      ]
    )
  );

drop policy if exists "progress_select_admin" on public.user_progress;
create policy "progress_select_admin"
  on public.user_progress
  for select
  to authenticated
  using (
    lower(coalesce(((select auth.jwt()) ->> 'email'), '')) = any (
      array[
        'josedavidduartesilva@gmail.com',
        'david.duartes182@gmail.com',
        'jose@welearn.com',
        'zhanna.duarte@mail.ru',
        'zhanna.korzh@gmail.com',
        'zhanna@welearn.com'
      ]
    )
  );

commit;
