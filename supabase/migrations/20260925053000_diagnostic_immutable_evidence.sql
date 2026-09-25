-- Objective responses and attempt events are append-only evidence. The service
-- role inserts them through versioned RPCs; corrections create new evidence or
-- invalidate the attempt rather than rewriting history. User deletion remains
-- possible by deleting the parent attempt, whose foreign keys cascade internally.

begin;

revoke update, delete on table public.diagnostic_responses from service_role;
revoke update, delete on table public.diagnostic_attempt_events from service_role;

comment on table public.diagnostic_responses is
  'Append-only versioned objective evidence. Service role may select and insert; update/delete are denied, with erasure performed by parent-attempt cascade.';
comment on table public.diagnostic_attempt_events is
  'Append-only diagnostic audit trail. Service role may select and insert; update/delete are denied, with erasure performed by parent-attempt cascade.';

commit;
