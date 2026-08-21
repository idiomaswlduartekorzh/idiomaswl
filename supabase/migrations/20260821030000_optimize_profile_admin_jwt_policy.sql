-- The JWT function itself must be inside the scalar subquery. This makes the
-- value an init plan instead of executing auth.jwt() for every profile row.
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
        'zhanna.korzh@gmail.com',
        'zhanna@welearn.com'
      ]
    )
  );
