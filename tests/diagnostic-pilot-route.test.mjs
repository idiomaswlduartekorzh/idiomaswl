import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const route = await readFile(new URL('../src/app/api/admin/diagnostic/pilot-report/route.ts', import.meta.url), 'utf8');
const referenceRoute = await readFile(new URL('../src/app/api/admin/diagnostic/pilot-references/route.ts', import.meta.url), 'utf8');
const healthClient = await readFile(new URL('../src/app/(site)/dashboard/admin/nivel-radar/DiagnosticPilotHealthClient.tsx', import.meta.url), 'utf8');
const adminPage = await readFile(new URL('../src/app/(site)/dashboard/admin/nivel-radar/page.tsx', import.meta.url), 'utf8');
const repository = await readFile(new URL('../src/server/diagnostic/repository.server.ts', import.meta.url), 'utf8');
const migration = await readFile(new URL('../supabase/migrations/20260925023000_diagnostic_pilot_references.sql', import.meta.url), 'utf8');

test('pilot report is admin-only, rate-limited and never cacheable', () => {
  assert.match(route, /requireAdmin/);
  assert.match(route, /diagnostic-pilot-report-admin/);
  assert.match(route, /private, no-store/);
  assert.match(route, /loadDiagnosticPilotDataset/);
  assert.doesNotMatch(route, /response_text|user_id|submitted_response/);
});

test('pilot health projection keeps browser data aggregate and omits item-level payloads', () => {
  const projection = route.slice(route.indexOf('function healthProjection'), route.indexOf('function error'));
  assert.match(projection, /flagCounts/);
  assert.match(projection, /completedRouteCounts/);
  assert.match(projection, /measurementEvidence/);
  assert.doesNotMatch(projection, /itemId|contentVersion|optionSelections|distractorFunctioning|submittedResponse/);
  assert.match(route, /searchParams\.get\('scope'\) === 'health' \? healthProjection\(report\) : report/);
});

test('admin pilot health UI is manual, same-origin, no-store and covers operational gates', () => {
  assert.match(adminPage, /<DiagnosticPilotHealthClient \/>/);
  assert.match(healthClient, /scope=health/);
  assert.match(healthClient, /credentials: 'same-origin'/);
  assert.match(healthClient, /cache: 'no-store'/);
  assert.doesNotMatch(healthClient, /useEffect/);
  assert.match(healthClient, /No completados/);
  assert.match(healthClient, /Rutas completadas/);
  assert.match(healthClient, /Puertas del piloto/);
  assert.match(healthClient, /Cadena psicométrica/);
  assert.match(healthClient, /Alertas agregadas/);
});

test('pilot loader omits user identity and writing text from every select', () => {
  const loader = repository.slice(repository.indexOf('export async function loadDiagnosticPilotDataset'));
  assert.doesNotMatch(loader, /user_id|response_text/);
  assert.match(loader, /submitted_response/);
  assert.match(loader, /final_evidence/);
});

test('independent reference labels are server-only and do not duplicate the diagnostic result', () => {
  assert.match(migration, /enable row level security/);
  assert.match(migration, /revoke all on table public\.diagnostic_pilot_references/);
  assert.match(migration, /grant select, insert, update, delete[\s\S]*to service_role/);
  assert.doesNotMatch(migration, /diagnostic_level/);
  assert.doesNotMatch(migration, /\bemail\b|participant_name|assessor_name/i);
  assert.match(migration, /record_diagnostic_pilot_reference/);
  assert.match(migration, /v_attempt\.status <> 'completed'/);
  assert.match(migration, /result_profile->>'globalLevel'/);
  assert.match(migration, /grant execute on function public\.record_diagnostic_pilot_reference[\s\S]*to service_role/);
});

test('reference capture is an authenticated same-origin mutation with a pseudonymous assessor hash', () => {
  assert.match(referenceRoute, /requireAdmin/);
  assert.match(referenceRoute, /sameOrigin\(request\)/);
  assert.match(referenceRoute, /createHmac\('sha256', secret\)/);
  assert.match(referenceRoute, /persistDiagnosticPilotReference/);
  assert.match(referenceRoute, /private, no-store/);
  assert.doesNotMatch(referenceRoute, /userId|email|responseText/);
});
