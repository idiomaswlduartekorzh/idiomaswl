import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import {
  evaluateDiagnosticProductionRollout,
  validateDiagnosticProductionRolloutConfiguration,
} from '../src/server/diagnostic/production-rollout.ts';

const validEnv = {
  DIAGNOSTIC_PRODUCTION_ROLLOUT_ID: 'english-diagnostic-2026-09',
  DIAGNOSTIC_PRODUCTION_ROLLOUT_PERCENT: '25',
  DIAGNOSTIC_PRODUCTION_ROLLOUT_SECRET: 'fixture-secret-with-at-least-32-bytes',
};

test('production rollout validates a canonical percentage, stable id and private secret', () => {
  const configuration = validateDiagnosticProductionRolloutConfiguration(validEnv);
  assert.equal(configuration.valid, true);
  assert.equal(configuration.percentage, 25);
  assert.equal(configuration.rolloutId, validEnv.DIAGNOSTIC_PRODUCTION_ROLLOUT_ID);
  assert.equal(Object.hasOwn(configuration, 'secret'), false);

  for (const percentage of ['', '-1', '1.5', '01', '101', 'all']) {
    const result = validateDiagnosticProductionRolloutConfiguration({
      ...validEnv,
      DIAGNOSTIC_PRODUCTION_ROLLOUT_PERCENT: percentage,
    });
    assert.equal(result.valid, false);
    assert.ok(result.blockers.includes('rollout-percent-invalid'));
  }
});

test('production rollout assignment is deterministic and monotonic as percentage rises', () => {
  const users = Array.from({ length: 500 }, (_, index) => `user-${index}`);
  const eligibleAt = percentage => new Set(users.filter(userId =>
    evaluateDiagnosticProductionRollout({
      env: { ...validEnv, DIAGNOSTIC_PRODUCTION_ROLLOUT_PERCENT: String(percentage) },
      userId,
    }).eligible));

  const atFive = eligibleAt(5);
  const repeatedFive = eligibleAt(5);
  const atTwentyFive = eligibleAt(25);
  assert.deepEqual(repeatedFive, atFive);
  assert.ok(atFive.size > 0 && atFive.size < atTwentyFive.size);
  assert.ok([...atFive].every(userId => atTwentyFive.has(userId)));
});

test('zero stops every new start and one hundred admits every authenticated user', () => {
  for (const userId of ['user-a', 'user-b', 'user-c']) {
    assert.equal(evaluateDiagnosticProductionRollout({
      env: { ...validEnv, DIAGNOSTIC_PRODUCTION_ROLLOUT_PERCENT: '0' }, userId,
    }).eligible, false);
    assert.equal(evaluateDiagnosticProductionRollout({
      env: { ...validEnv, DIAGNOSTIC_PRODUCTION_ROLLOUT_PERCENT: '100' }, userId,
    }).eligible, true);
  }
});

test('missing or malformed rollout configuration fails closed without exposing cohort data', () => {
  const invalidCases = [
    {},
    { ...validEnv, DIAGNOSTIC_PRODUCTION_ROLLOUT_ID: 'x' },
    { ...validEnv, DIAGNOSTIC_PRODUCTION_ROLLOUT_SECRET: 'short' },
    { ...validEnv, DIAGNOSTIC_PRODUCTION_ROLLOUT_SECRET: ' '.repeat(40) },
    { ...validEnv, DIAGNOSTIC_PRODUCTION_ROLLOUT_PERCENT: '101' },
  ];
  for (const env of invalidCases) {
    const decision = evaluateDiagnosticProductionRollout({ env, userId: 'private-user-id' });
    assert.equal(decision.eligible, false);
    assert.equal(decision.configurationValid, false);
    assert.equal(JSON.stringify(decision).includes('private-user-id'), false);
    assert.equal(JSON.stringify(decision).includes(validEnv.DIAGNOSTIC_PRODUCTION_ROLLOUT_SECRET), false);
    assert.equal(Object.hasOwn(decision, 'bucket'), false);
  }
});

test('start gates only new production attempts after authentication; resume and submit stay drainable', () => {
  const start = readFileSync(new URL('../src/server/diagnostic/start.server.ts', import.meta.url), 'utf8');
  const resume = readFileSync(new URL('../src/server/diagnostic/resume.server.ts', import.meta.url), 'utf8');
  const submit = readFileSync(new URL('../src/server/diagnostic/submit.server.ts', import.meta.url), 'utf8');
  const authIndex = start.indexOf('supabase.auth.getUser()');
  const rolloutIndex = start.indexOf('const rollout = evaluateDiagnosticProductionRollout');
  const rateLimitIndex = start.indexOf('consumeExamReviewRateLimit({');
  assert.ok(authIndex > 0 && rolloutIndex > authIndex && rateLimitIndex > rolloutIndex);
  assert.match(start, /ROLLOUT_NOT_ELIGIBLE/);
  assert.doesNotMatch(resume, /ProductionRollout|ROLLOUT_NOT_ELIGIBLE/);
  assert.doesNotMatch(submit, /ProductionRollout|ROLLOUT_NOT_ELIGIBLE/);
});

test('operator check is fail-closed and never prints the rollout secret', () => {
  const result = spawnSync(process.execPath, [
    '--experimental-strip-types', '--no-warnings', '--experimental-loader', './tests/ts-paths-loader.mjs',
    'scripts/check-diagnostic-production-rollout.mjs',
  ], {
    cwd: new URL('..', import.meta.url),
    env: { ...process.env, ...validEnv },
    encoding: 'utf8',
  });
  assert.equal(result.status, 0, result.stderr);
  const output = `${result.stdout}${result.stderr}`;
  assert.equal(output.includes(validEnv.DIAGNOSTIC_PRODUCTION_ROLLOUT_SECRET), false);
  const report = JSON.parse(result.stdout);
  assert.equal(report.ready, true);
  assert.equal(report.percentage, 25);
  assert.equal(report.safeguards.secretValueIncluded, false);

  const invalid = spawnSync(process.execPath, [
    '--experimental-strip-types', '--no-warnings', '--experimental-loader', './tests/ts-paths-loader.mjs',
    'scripts/check-diagnostic-production-rollout.mjs',
  ], {
    cwd: new URL('..', import.meta.url),
    env: {
      ...process.env,
      DIAGNOSTIC_PRODUCTION_ROLLOUT_ID: '',
      DIAGNOSTIC_PRODUCTION_ROLLOUT_PERCENT: '',
      DIAGNOSTIC_PRODUCTION_ROLLOUT_SECRET: '',
    },
    encoding: 'utf8',
  });
  assert.notEqual(invalid.status, 0);
  assert.equal(JSON.parse(invalid.stdout).ready, false);
});
