-- Auth changes the primary email only after its confirmation flow completes.
-- Keep the profile address used for student notifications in sync at that point.
create or replace function public.sync_confirmed_profile_email()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if new.email is distinct from old.email then
    update public.profiles set email = new.email where id = new.id;
  end if;
  return new;
end;
$$;

revoke all on function public.sync_confirmed_profile_email() from public, anon, authenticated;
drop trigger if exists sync_confirmed_profile_email on auth.users;
create trigger sync_confirmed_profile_email
  after update of email on auth.users
  for each row execute function public.sync_confirmed_profile_email();
