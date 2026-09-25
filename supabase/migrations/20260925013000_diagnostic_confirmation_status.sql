-- Align the attempt state constraint with the already-versioned confirmation transition.

begin;

alter table public.diagnostic_attempts
  drop constraint if exists diagnostic_attempts_status_check;

alter table public.diagnostic_attempts
  add constraint diagnostic_attempts_status_check
  check (status in (
    'locator', 'precision', 'confirmation', 'writing',
    'scoring', 'completed', 'expired', 'abandoned'
  ));

commit;
