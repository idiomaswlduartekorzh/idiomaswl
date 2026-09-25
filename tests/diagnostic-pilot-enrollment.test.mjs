import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const migration = readFileSync(new URL('../supabase/migrations/20260925043000_diagnostic_pilot_enrollment_rpcs.sql', import.meta.url), 'utf8');
const route = readFileSync(new URL('../src/app/api/admin/diagnostic/pilot-enrollments/route.ts', import.meta.url), 'utf8');
const repository = readFileSync(new URL('../src/server/diagnostic/repository.server.ts', import.meta.url), 'utf8');

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
  assert.match(route, /suppliedVersion !== configuredConsentVersion/);
  assert.match(route, /suppliedDate\.toISOString\(\) !== candidate\.consentedAt/);
  assert.match(route, /REASON_REQUIRED/);
  assert.match(repository, /rpc\('record_diagnostic_pilot_enrollment'/);
  assert.doesNotMatch(route, /grant|service_role/);
});

test('full diagnostic deletion also removes enrollment evidence', () => {
  assert.match(migration, /delete from public\.diagnostic_pilot_enrollments where user_id = p_user_id/);
  assert.match(migration, /deletedPilotEnrollments/);
  assert.match(migration, /deletedPilotEnrollmentEvents/);
  assert.match(repository, /deletedPilotEnrollmentEvents/);
});
