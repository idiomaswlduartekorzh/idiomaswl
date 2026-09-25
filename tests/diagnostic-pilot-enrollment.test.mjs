import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const migration = readFileSync(new URL('../supabase/migrations/20260925043000_diagnostic_pilot_enrollment_rpcs.sql', import.meta.url), 'utf8');
const consentMigration = readFileSync(new URL('../supabase/migrations/20260925044500_diagnostic_pilot_consent_reference.sql', import.meta.url), 'utf8');
const route = readFileSync(new URL('../src/app/api/admin/diagnostic/pilot-enrollments/route.ts', import.meta.url), 'utf8');
const repository = readFileSync(new URL('../src/server/diagnostic/repository.server.ts', import.meta.url), 'utf8');
const page = readFileSync(new URL('../src/app/(site)/dashboard/admin/nivel-radar/page.tsx', import.meta.url), 'utf8');
const client = readFileSync(new URL('../src/app/(site)/dashboard/admin/nivel-radar/PilotEnrollmentAdminClient.tsx', import.meta.url), 'utf8');

test('pilot enrollment transitions are atomic, append-only and service-role-only', () => {
  assert.match(migration, /create function public\.record_diagnostic_pilot_enrollment/);
  assert.match(migration, /for update/);
  assert.match(migration, /diagnostic_pilot_enrollment_transition_invalid/);
  assert.match(migration, /insert into public\.diagnostic_pilot_enrollment_events/);
  assert.match(migration, /grant select, insert on table public\.diagnostic_pilot_enrollment_events/);
  assert.doesNotMatch(migration, /grant[^;]*delete[^;]*diagnostic_pilot_enrollment_events/i);
  assert.match(migration, /revoke all on function public\.record_diagnostic_pilot_enrollment[\s\S]*from public, anon, authenticated, service_role/i);
  assert.match(migration, /grant execute on function public\.record_diagnostic_pilot_enrollment[\s\S]*to service_role/i);
});

test('admin enrollment capture is same-origin, authenticated, rate-limited and no-store', () => {
  assert.match(route, /requireAdmin/);
  assert.match(route, /sameOrigin\(request\)/);
  assert.match(route, /diagnostic-pilot-enrollment-admin/);
  assert.match(route, /private, no-store/);
  assert.match(route, /persistDiagnosticPilotEnrollment/);
});

test('consented enrollment must match the configured version and an exact timestamp', () => {
  assert.match(route, /pilotConsentVersion = configuredConsentVersion/);
  assert.match(route, /candidate\.consentConfirmed !== true/);
  assert.match(route, /suppliedDate\.toISOString\(\) !== candidate\.consentedAt/);
  assert.match(route, /suppliedDate\.getTime\(\) > Date\.now\(\) \+ 300_000/);
  assert.match(route, /REASON_REQUIRED/);
  assert.doesNotMatch(route, /candidate\.pilotConsentVersion/);
  assert.match(repository, /rpc\('record_diagnostic_pilot_enrollment'/);
  assert.doesNotMatch(route, /grant|service_role/);
});

test('new consent captures an opaque evidence reference in enrollment and append-only history', () => {
  assert.match(consentMigration, /add column consent_reference/);
  assert.match(consentMigration, /p_consent_reference text/);
  assert.match(consentMigration, /consent_reference = excluded\.consent_reference/);
  assert.match(consentMigration, /consented_at, consent_reference, acted_by, reason/);
  assert.match(repository, /p_consent_reference: input\.consentReference/);
  assert.match(route, /\^\[A-Za-z0-9\]/);
});

test('admin UI keeps pilot enrollment private, confirms destructive transitions and clears participant data', () => {
  assert.match(page, /await requireAdmin\(\)/);
  assert.match(page, /PilotEnrollmentAdminClient consentVersion=\{pilotConsentVersion\}/);
  assert.match(client, /credentials: 'same-origin'/);
  assert.match(client, /window\.confirm/);
  assert.match(client, /setUserId\(''\)/);
  assert.match(client, /consentConfirmed: true/);
  assert.doesNotMatch(client, /localStorage|sessionStorage/);
  assert.doesNotMatch(client, /pilotConsentVersion/);
});

test('full diagnostic deletion also removes enrollment evidence', () => {
  assert.match(migration, /delete from public\.diagnostic_pilot_enrollments where user_id = p_user_id/);
  assert.match(migration, /deletedPilotEnrollments/);
  assert.match(migration, /deletedPilotEnrollmentEvents/);
  assert.match(repository, /deletedPilotEnrollmentEvents/);
});
