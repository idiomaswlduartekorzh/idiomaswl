const SHA256 = /^[a-f0-9]{64}$/u;
const COMMIT_SHA = /^[a-f0-9]{40}$/u;

function isoMillis(value, label) {
  if (typeof value !== 'string' || Number.isNaN(Date.parse(value))
    || new Date(Date.parse(value)).toISOString() !== value) {
    throw new Error(`${label} is not a canonical ISO timestamp.`);
  }
  return Date.parse(value);
}

function assertRecent(timestamp, now, label, maximumAgeHours) {
  const value = isoMillis(timestamp, label);
  const current = isoMillis(now, 'recordedAt');
  const maximumAge = maximumAgeHours * 60 * 60 * 1_000;
  if (value > current + 5 * 60 * 1_000 || current - value > maximumAge) {
    throw new Error(`${label} is outside the ${maximumAgeHours}-hour evidence window.`);
  }
  return value;
}

const INSPECTION_GROUPS = [
  'serviceSchema', 'publicTableIsolation', 'serviceFunctions',
  'publicFunctionIsolation', 'privateStorage', 'authenticatedBoundary',
];

export function validateDiagnosticLiveEvidence(input) {
  const inspection = input.inspectionReceipt;
  const flow = input.authenticatedFlowReceipt;
  const maximumAgeHours = input.maximumAgeHours ?? 24;
  if (!Number.isFinite(maximumAgeHours) || maximumAgeHours <= 0 || maximumAgeHours > 168) {
    throw new Error('Live evidence window must be between 0 and 168 hours.');
  }
  if (!SHA256.test(input.inspectionReceiptSha256 ?? '')
    || !SHA256.test(input.authenticatedFlowReceiptSha256 ?? '')) {
    throw new Error('Live evidence receipt hashes are invalid.');
  }
  if (!SHA256.test(input.expectedSourceSha256 ?? '')
    || !SHA256.test(input.expectedBankSnapshotSha256 ?? '')
    || !COMMIT_SHA.test(input.expectedCommitSha ?? '')) {
    throw new Error('Expected release identity is invalid.');
  }
  if (inspection?.receiptVersion !== 'diagnostic-supabase-inspection-v1'
    || inspection.decision !== 'PASS'
    || !INSPECTION_GROUPS.every(group => inspection.groups?.[group] === true)
    || inspection.expectedMigration !== input.expectedMigration
    || inspection.claims?.schemaContractVerified !== true
    || inspection.claims?.browserDirectAccessDenied !== true
    || inspection.claims?.privateStorageVerified !== true
    || inspection.claims?.authenticatedApplicationFlowVerified !== false
    || inspection.claims?.destructiveWritesPerformed !== false
    || inspection.claims?.participantDataIncluded !== false
    || inspection.claims?.secretsIncluded !== false
    || typeof inspection.target?.project !== 'string'
    || inspection.target.project.length < 1) {
    throw new Error('Supabase inspection receipt does not prove the required live contract.');
  }
  assertRecent(inspection.generatedAt, input.recordedAt, 'inspection generatedAt', maximumAgeHours);

  const flowStartedAt = assertRecent(flow?.startedAt, input.recordedAt, 'flow startedAt', maximumAgeHours);
  const flowCompletedAt = assertRecent(flow?.completedAt, input.recordedAt, 'flow completedAt', maximumAgeHours);
  const expectedChecks = flow?.checks;
  if (flow?.receiptVersion !== 'diagnostic-authenticated-flow-v1'
    || flow.decision !== 'PASS'
    || flow.failure !== null
    || flowCompletedAt < flowStartedAt
    || expectedChecks?.releaseBinding !== true
    || expectedChecks?.enrollment !== true
    || expectedChecks?.start !== true
    || expectedChecks?.resume !== true
    || expectedChecks?.privateAudio !== true
    || !Number.isInteger(expectedChecks?.objectiveStages)
    || expectedChecks.objectiveStages < 2
    || expectedChecks.objectiveStages > 3
    || expectedChecks?.writing !== true
    || expectedChecks?.humanFinalization !== true
    || expectedChecks?.fiveSkillResult !== true
    || expectedChecks?.deletion !== true
    || expectedChecks?.postDeletionNotFound !== true
    || flow.safeguards?.dedicatedFixtureConfirmed !== true
    || flow.safeguards?.answerKeysUsed !== false
    || flow.safeguards?.participantContentIncluded !== false
    || flow.safeguards?.cookiesIncluded !== false
    || flow.safeguards?.cleanupAttempted !== true) {
    throw new Error('Authenticated application flow receipt is incomplete or unsafe.');
  }
  const binding = flow.releaseBinding;
  if (binding?.bindingVersion !== 'diagnostic-live-release-binding-v1'
    || binding.sourceSha256 !== input.expectedSourceSha256
    || binding.bankSnapshotSha256 !== input.expectedBankSnapshotSha256
    || binding.commitSha !== input.expectedCommitSha
    || binding.accessMode !== flow.accessMode
    || !['pilot', 'production'].includes(binding.accessMode)
    || (binding.accessMode === 'production'
      && (typeof binding.releaseId !== 'string' || binding.releaseId.length < 1))
    || flow.target?.supabaseProject !== inspection.target.project
    || typeof flow.target?.applicationHost !== 'string'
    || !/^[a-z0-9.-]+(?::[0-9]{1,5})?$/iu.test(flow.target.applicationHost)) {
    throw new Error('Live receipts do not belong to the same expected deployment and Supabase project.');
  }

  return {
    appliedThroughMigration: input.expectedMigration,
    authenticatedFlowVerified: true,
    liveVerification: {
      inspectionReceiptSha256: input.inspectionReceiptSha256,
      authenticatedFlowReceiptSha256: input.authenticatedFlowReceiptSha256,
      supabaseProject: inspection.target.project,
      applicationHost: flow.target.applicationHost,
      sourceSha256: binding.sourceSha256,
      bankSnapshotSha256: binding.bankSnapshotSha256,
      deployedCommit: binding.commitSha,
      accessMode: binding.accessMode,
    },
    deletionFlowVerified: true,
    deletionReceiptSha256: input.authenticatedFlowReceiptSha256,
  };
}

export function recordDiagnosticLiveEvidence({ currentEvidence, validated, recordedAt, attestedBy }) {
  if (!currentEvidence || currentEvidence.evidenceVersion !== 'english-diagnostic-release-evidence-v1') {
    throw new Error('Release evidence version is invalid.');
  }
  if (typeof attestedBy !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9._@+-]{2,159}$/u.test(attestedBy)) {
    throw new Error('A stable operator identity is required for attestation.');
  }
  isoMillis(recordedAt, 'recordedAt');
  return {
    ...currentEvidence,
    updatedAt: recordedAt,
    database: {
      ...currentEvidence.database,
      appliedThroughMigration: validated.appliedThroughMigration,
      verifiedAt: recordedAt,
      verifiedBy: attestedBy,
      authenticatedFlowVerified: true,
      liveVerification: validated.liveVerification,
    },
    privacy: {
      ...currentEvidence.privacy,
      deletionFlowVerified: true,
      deletionReceiptSha256: validated.deletionReceiptSha256,
    },
  };
}
