-- handle_new_user is a trigger function. It must not be callable through the
-- public Data API; revoking EXECUTE does not prevent the trigger from running.
revoke execute on function public.handle_new_user() from public, anon, authenticated;
