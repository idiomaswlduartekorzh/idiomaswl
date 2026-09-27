import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { simulateDiagnosticMst } from '../src/server/diagnostic/simulation.ts';

const routeRank = { 'low-a1-a2': 0, 'mid-b1-b2': 1, 'high-c1-c2': 2 };

test('synthetic A1-C2 cohorts produce monotonic locator evidence', () => {
  const report = simulateDiagnosticMst(20260924, 2000);
  assert.equal(report.cohorts.length, 6);
  for (let index = 1; index < report.cohorts.length; index += 1) {
    assert.ok(report.cohorts[index].meanCorrect > report.cohorts[index - 1].meanCorrect);
  }
  for (const cohort of report.cohorts) {
    assert.equal(Object.values(cohort.routes).reduce((sum, count) => sum + count, 0), cohort.sampleSize);
    assert.ok(cohort.confirmationRate >= 0 && cohort.confirmationRate <= 1);
  }
});

test('the dominant route never moves downward as latent level increases', () => {
  const report = simulateDiagnosticMst(17, 5000);
  const dominant = report.cohorts.map(cohort =>
    Object.entries(cohort.routes).sort((a, b) => b[1] - a[1])[0][0],
  );
  for (let index = 1; index < dominant.length; index += 1) {
    assert.ok(routeRank[dominant[index]] >= routeRank[dominant[index - 1]], dominant.join(' -> '));
  }
});

test('scorecard proxies distinguish guessing from an inaccessible listening skill', () => {
  const report = simulateDiagnosticMst();
  assert.equal(report.scorecardProxies.oneCorrectPerSkill, 'low-a1-a2');
  assert.deepEqual(report.scorecardProxies.advancedWithoutAudio, {
    routeId: 'high-c1-c2', listeningRoute: null, requiresConfirmation: true, globalResultEligible: false,
  });
  assert.equal('adversarial' in report, false);
});

test('simulation is reproducible and refuses misleading tiny cohorts', () => {
  assert.deepEqual(simulateDiagnosticMst(42, 100), simulateDiagnosticMst(42, 100));
  assert.throws(() => simulateDiagnosticMst(42, 99), /at least 100/);
});

test('the versioned baseline report matches the current routing policy', async () => {
  const stored = JSON.parse(await readFile(new URL('../docs/diagnostic-mst-simulation-baseline.json', import.meta.url), 'utf8'));
  assert.deepEqual(stored, simulateDiagnosticMst());
});
