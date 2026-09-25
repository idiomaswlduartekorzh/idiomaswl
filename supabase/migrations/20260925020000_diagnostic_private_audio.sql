-- Private source media for diagnostic listening. Application routes authorize
-- the active attempt and stream with service_role; browser roles get no policy.

begin;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('diagnostic-audio', 'diagnostic-audio', false, 10485760, array['audio/mpeg'])
on conflict (id) do update
set public = false,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public read diagnostic audio" on storage.objects;
drop policy if exists "Authenticated read diagnostic audio" on storage.objects;

commit;
