const SHA256 = /^[a-f0-9]{64}$/u;
const COMMIT_SHA = /^[a-f0-9]{40}$/u;

function canonicalTime(value, label) {
  if (typeof value !== 'string' || Number.isNaN(Date.parse(value))
    || new Date(Date.parse(value)).toISOString() !== value) {
    throw new Error(`${label} is not a canonical ISO timestamp.`);
  }
  return Date.parse(value);
}

export function validateDiagnosticQualityReceipt(input) {
  const receipt = input.receipt;
  if (!SHA256.test(input.receiptSha256 ?? '')
    || !SHA256.test(input.expectedSourceSha256 ?? '')) {
    throw new Error('Quality receipt or source hash is invalid.');
  }
  const startedAt = canonicalTime(receipt?.startedAt, 'quality startedAt');
  const completedAt = canonicalTime(receipt?.completedAt, 'quality completedAt');
  const recordedAt = canonicalTime(input.recordedAt, 'recordedAt');
  if (completedAt < startedAt || completedAt > recordedAt + 5 * 60 * 1_000
    || recordedAt - completedAt > 24 * 60 * 60 * 1_000) {
    throw new Error('Quality receipt is stale or has an invalid time range.');
  }
  if (receipt?.receiptVersion !== 'diagnostic-quality-evidence-v1'
    || receipt.decision !== 'PASS'
    || receipt.sourceSha256 !== input.expectedSourceSha256
    || !COMMIT_SHA.test(receipt.commitSha ?? '')
    || receipt.checks?.workingTreeClean !== true
    || receipt.checks?.diagnosticSuite?.passed !== true
    || !Number.isInteger(receipt.checks.diagnosticSuite.testCount)
    || receipt.checks.diagnosticSuite.testCount < 1
    || receipt.checks?.typescript?.passed !== true
    || receipt.checks?.productionBuild?.passed !== true
    || !Number.isInteger(receipt.checks.productionBuild.staticPageCount)
    || receipt.checks.productionBuild.staticPageCount < 1
    || receipt.claims?.sourceUnchangedDuringRun !== true
    || receipt.claims?.outputsContainSecrets !== false) {
    throw new Error('Quality receipt does not prove the required clean release checks.');
  }
  return {
    sourceSha256: receipt.sourceSha256,
    verifiedCommit: receipt.commitSha,
    receiptSha256: input.receiptSha256,
    diagnosticTestCount: receipt.checks.diagnosticSuite.testCount,
    staticPageCount: receipt.checks.productionBuild.staticPageCount,
  };
}

export function recordDiagnosticQualityEvidence({ currentEvidence, validated, recordedAt, attestedBy }) {
  if (!currentEvidence || currentEvidence.evidenceVersion !== 'english-diagnostic-release-evidence-v1') {
    throw new Error('Release evidence version is invalid.');
  }
  if (typeof attestedBy !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9._@+-]{2,159}$/u.test(attestedBy)) {
    throw new Error('A stable quality verifier identity is required.');
  }
  canonicalTime(recordedAt, 'recordedAt');
  return {
    ...currentEvidence,
    updatedAt: recordedAt,
    quality: {
      ...currentEvidence.quality,
      diagnosticSuiteSourceSha256: validated.sourceSha256,
      productionBuildSourceSha256: validated.sourceSha256,
      verifiedCommit: validated.verifiedCommit,
      verifiedAt: recordedAt,
      verifiedBy: attestedBy,
      receiptSha256: validated.receiptSha256,
    },
  };
}
