-- Keep finance data server-only even if browser grants are changed later, and
-- index the administrator foreign key for efficient referential checks.
create index admin_payment_links_created_by_idx
  on public.admin_payment_links (created_by);

create policy "Browser roles cannot access admin payment links"
  on public.admin_payment_links
  for all
  to anon, authenticated
  using (false)
  with check (false);

create policy "Browser roles cannot access admin payment link transactions"
  on public.admin_payment_link_transactions
  for all
  to anon, authenticated
  using (false)
  with check (false);

create policy "Browser roles cannot access admin payment link events"
  on public.admin_payment_link_events
  for all
  to anon, authenticated
  using (false)
  with check (false);
