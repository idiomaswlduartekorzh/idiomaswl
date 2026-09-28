import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import criteria from '../config/diagnostic/pilot-publication-criteria.json' with { type: 'json' };
import readiness from '../docs/diagnostic-bank-readiness.json' with { type: 'json' };
import simulation from '../docs/diagnostic-mst-simulation-baseline.json' with { type: 'json' };
import { ENGLISH_DIAGNOSTIC_BLUEPRINT } from '../src/lib/diagnostic/blueprint.ts';
import { buildDiagnosticPilotRecruitmentPlan } from '../scripts/lib/diagnostic-pilot-recruitment.mjs';

const plan = buildDiagnosticPilotRecruitmentPlan({
  criteria,
  blueprint: ENGLISH_DIAGNOSTIC_BLUEPRINT,
  bankReadiness: readiness,
  simulation,
});

test('pilot recruitment plan exposes the real item-calibration lower bound', () => {
  assert.equal(plan.assumptions.objectiveItems, 360);
  assert.equal(plan.assumptions.requiredItemResponses, 72_000);
  assert.equal(plan.assumptions.minimumObjectiveDecisionsPerCompletedAttempt, 35);
  assert.equal(plan.assumptions.maximumObjectiveDecisionsPerCompletedAttempt, 45);
  assert.equal(plan.itemCalibrationLowerBounds.absoluteBestCase.completedAttempts, 1_600);
  assert.equal(plan.itemCalibrationLowerBounds.absoluteBestCase.startedAttempts, 2_134);
  assert.equal(plan.itemCalibrationLowerBounds.simulationExpectedFormLength.completedAttempts, 1_949);
  assert.equal(plan.itemCalibrationLowerBounds.simulationExpectedFormLength.startedAttempts, 2_599);
  assert.equal(plan.itemCalibrationLowerBounds.withoutConfirmation.completedAttempts, 2_058);
  assert.equal(plan.itemCalibrationLowerBounds.withoutConfirmation.startedAttempts, 2_744);
  assert.ok(plan.itemCalibrationLowerBounds.absoluteBestCase.startedAttempts > criteria.minimumStartedAttempts);
});

test('route and specialist floors remain explicit instead of being hidden by the global sample', () => {
  assert.equal(plan.routeExposureLowerBounds.routes, 3);
  assert.equal(plan.routeExposureLowerBounds.objectiveItemsPerRoute, 120);
  assert.equal(plan.routeExposureLowerBounds.requiredItemResponsesPerRoute, 24_000);
  assert.equal(plan.routeExposureLowerBounds.bestCaseCompletedPerRoute, 800);
  assert.equal(plan.routeExposureLowerBounds.bestCaseStartedAcrossRoutes, 3_200);
  assert.equal(plan.routeExposureLowerBounds.simulationExpectedCompletedPerRoute, 1_093);
  assert.equal(plan.routeExposureLowerBounds.simulationExpectedStartedAcrossRoutes, 4_372);
  assert.equal(plan.routeExposureLowerBounds.withoutConfirmationCompletedPerRoute, 1_200);
  assert.equal(plan.routeExposureLowerBounds.withoutConfirmationStartedAcrossRoutes, 4_800);
  assert.equal(plan.routeExposureLowerBounds.configuredMinimumCompletedPerRoute, 60);
  assert.equal(plan.specialistEvidenceFloors.independentReferencePairsWithLevelCoverage, 100);
  assert.equal(plan.specialistEvidenceFloors.localDependencePairsPerTestlet, 50);
  assert.equal(plan.specialistEvidenceFloors.fairnessParticipantsAtMinimumGroupCount, 100);
  assert.match(plan.warnings.join(' '), /not a sufficient recruitment target/);
});

test('recruitment planner rejects impossible inputs and committed report stays reproducible', () => {
  assert.throws(() => buildDiagnosticPilotRecruitmentPlan({
    criteria: { ...criteria, minimumCompletionRate: 0 },
    blueprint: ENGLISH_DIAGNOSTIC_BLUEPRINT,
    bankReadiness: readiness,
    simulation,
  }), /completion rate/);
  const committed = JSON.parse(readFileSync(new URL('../docs/diagnostic-pilot-recruitment-plan.json', import.meta.url), 'utf8'));
  assert.deepEqual(committed, plan);
});
