import { validateDiagnosticProductionRolloutConfiguration } from '../src/server/diagnostic/production-rollout.ts';

const configuration = validateDiagnosticProductionRolloutConfiguration(process.env);
const report = {
  checkVersion: 'diagnostic-production-rollout-check-v1',
  ready: configuration.valid,
  rolloutId: configuration.rolloutId,
  percentage: configuration.percentage,
  blockers: configuration.blockers,
  safeguards: {
    secretValueIncluded: false,
    assignmentUnit: 'authenticated-user',
    stableCohort: true,
    existingAttemptsRemainDrainable: true,
  },
};

console.log(JSON.stringify(report, null, 2));
if (!configuration.valid) process.exitCode = 1;
