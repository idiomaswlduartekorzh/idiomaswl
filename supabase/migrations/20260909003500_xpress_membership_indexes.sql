-- Cover private-ledger foreign keys used by reconciliation and review workers.
create index if not exists xpress_memberships_user on public.xpress_memberships(user_id);
create index if not exists xpress_payment_reconciliation_order on public.xpress_payment_reconciliation_queue(order_id);
create index if not exists xpress_teacher_reviews_membership on public.xpress_teacher_reviews(membership_id);
create index if not exists xpress_teacher_reviews_submission on public.xpress_teacher_reviews(submission_id) where submission_id is not null;
create index if not exists xpress_teacher_reviews_assignee on public.xpress_teacher_reviews(assigned_to) where assigned_to is not null;
