import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import {
  diagnosticDeliveryRules,
  validateDiagnosticDeliveryPolicy,
} from '../src/server/diagnostic/delivery-policy.ts';

const policy = JSON.parse(await readFile(new URL('../config/diagnostic/delivery-policy.json', import.meta.url), 'utf8'));
const migration = await readFile(new URL('../supabase/migrations/20260925050000_diagnostic_delivery_policy.sql', import.meta.url), 'utf8');
const start = await readFile(new URL('../src/server/diagnostic/start.server.ts', import.meta.url), 'utf8');
const resultUi = await readFile(new URL('../src/app/(site)/nivel-radar/AdaptiveNivelRadarClient.tsx', import.meta.url), 'utf8');

test('delivery policy separates pilot retests from production cooldown and remains unapproved', () => {
  assert.deepEqual(validateDiagnosticDeliveryPolicy(policy), []);
  assert.equal(diagnosticDeliveryRules(policy, 'pilot').scheduledRetestAllowed, true);
  assert.equal(diagnosticDeliveryRules(policy, 'pilot').minimumDaysBetweenCompletedAttempts, 0);
  assert.deepEqual(policy.monitoring.itemDrift, {
    minimumAttemptedPerWindow: 50,
    maximumAbsoluteFacilityShift: 0.15,
    minimumTwoProportionZScore: 3,
  });
  assert.throws(() => diagnosticDeliveryRules(policy, 'production'), /not approved/);
  assert.equal(policy.approval, null);
});

test('delivery policy rejects weakened limits, hidden fields and false approval state', () => {
  assert.match(validateDiagnosticDeliveryPolicy({
    ...policy, production: { ...policy.production, minimumDaysBetweenCompletedAttempts: 0 },
  }).join('; '), /production policy must enforce a cooldown/);
  assert.match(validateDiagnosticDeliveryPolicy({ ...policy, bypass: true }).join('; '), /unexpected fields/);
  assert.match(validateDiagnosticDeliveryPolicy({
    ...policy,
    monitoring: { itemDrift: { ...policy.monitoring.itemDrift, minimumAttemptedPerWindow: 19 } },
  }).join('; '), /minimum sample/);
  assert.match(validateDiagnosticDeliveryPolicy({
    ...policy,
    monitoring: { itemDrift: { ...policy.monitoring.itemDrift, maximumAbsoluteFacilityShift: 0.01 } },
  }).join('; '), /facility shift/);
  assert.match(validateDiagnosticDeliveryPolicy({
    ...policy, status: 'approved', approval: null,
  }).join('; '), /requires bound approval/);
});

test('attempt creation enforces concurrent and cooldown rules atomically', () => {
  assert.match(migration, /pg_advisory_xact_lock\(hashtextextended\(p_user_id::text, 0\)\)/);
  assert.match(migration, /diagnostic_attempt_active_limit/);
  assert.match(migration, /diagnostic_attempt_cooldown/);
  assert.match(migration, /status in \('locator','precision','confirmation','writing','scoring'\)/);
  assert.match(migration, /make_interval\(days => p_minimum_days_between_completed\)/);
  assert.match(migration, /result_validity_days/);
  assert.match(migration, /exposure_lookback_days/);
  assert.match(start, /loadDiagnosticPriorExposure/);
  assert.match(migration, /grant execute on function public\.create_diagnostic_attempt[\s\S]+to service_role/);
  assert.doesNotMatch(migration, /to (anon|authenticated)/);
});

test('server maps policy limits without exposing dates and result UI communicates expiry', () => {
  assert.match(start, /diagnosticDeliveryRules/);
  assert.match(start, /ACTIVE_ATTEMPT_EXISTS/);
  assert.match(start, /RETAKE_NOT_YET_AVAILABLE/);
  assert.match(start, /PILOT_RETEST_NOT_AUTHORIZED/);
  assert.doesNotMatch(start, /completedAt.*jsonError|nextEligibleAt.*jsonError/);
  assert.match(resultUi, /Vigente como orientación hasta/);
  assert.match(resultUi, /Después conviene repetir el diagnóstico/);
});
