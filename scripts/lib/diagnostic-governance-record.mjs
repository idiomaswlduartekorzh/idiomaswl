import { createHash } from 'node:crypto';

import { compileDiagnosticGovernanceReviews } from './diagnostic-governance-review.mjs';

const SHA256 = /^[a-f0-9]{64}$/u;
const OPERATOR = /^[A-Za-z0-9][A-Za-z0-9._@+-]{2,159}$/u;

function canonicalIso(value, label) {
  if (typeof value !== 'string' || Number.isNaN(Date.parse(value))
    || new Date(Date.parse(value)).toISOString() !== value) {
    throw new Error(`${label} is not a canonical ISO timestamp.`);
  }
}

export function validateDiagnosticGovernanceManifest({ manifest, manifestSha256, receiptFiles, snapshots }) {
  if (!SHA256.test(manifestSha256 ?? '')) throw new Error('Governance manifest hash is invalid.');
  const { manifestSha256: embeddedHash, ...core } = manifest ?? {};
  const computedHash = createHash('sha256').update(JSON.stringify(core)).digest('hex');
  if (embeddedHash !== manifestSha256 || computedHash !== manifestSha256
    || manifest?.manifestVersion !== 'diagnostic-governance-review-manifest-v1'
    || manifest.decision !== 'APPROVED'
    || manifest.safeguards?.independentRoleReviews !== true
    || !Array.isArray(manifest.receipts)
    || manifest.receipts.length !== 5) {
    throw new Error('Governance manifest is incomplete, changed or not approved.');
  }
  canonicalIso(manifest.compiledAt, 'governance compiledAt');
  if (!(receiptFiles instanceof Map) || receiptFiles.size !== 5) {
    throw new Error('Exactly five source receipt files are required.');
  }
  const receipts = manifest.receipts.map(reference => {
    if (typeof reference.file !== 'string' || reference.file !== reference.file.split('/').at(-1)
      || !SHA256.test(reference.sha256 ?? '')) {
      throw new Error('Governance receipt reference is unsafe.');
    }
    const entry = receiptFiles.get(reference.file);
    if (!entry || entry.sha256 !== reference.sha256 || entry.receipt?.packetId !== reference.packetId) {
      throw new Error('Governance source receipt does not match its manifest reference.');
    }
    return entry.receipt;
  });
  const recomputed = compileDiagnosticGovernanceReviews({ receipts, snapshots });
  if (recomputed.decision !== 'APPROVED'
    || JSON.stringify(recomputed.topics) !== JSON.stringify(manifest.topics)) {
    throw new Error('Governance approvals no longer match the current snapshots.');
  }
  const writingReviews = recomputed.topics['writing-operations'].reviews;
  const writing = writingReviews[0].details;
  return {
    manifestSha256,
    snapshots,
    writing,
    writingApprovers: writingReviews.map(review => `${review.role}:${review.reviewerId}`),
    privacyApprover: recomputed.topics['retention-policy'].reviews
      .map(review => `${review.role}:${review.reviewerId}`).join(','),
    pilotApprovers: recomputed.topics['pilot-criteria'].reviews
      .map(review => `${review.role}:${review.reviewerId}`),
  };
}

export function recordDiagnosticGovernanceApprovals({
  currentEvidence,
  retentionPolicy,
  pilotCriteria,
  validated,
  recordedAt,
  appliedBy,
}) {
  canonicalIso(recordedAt, 'recordedAt');
  if (!OPERATOR.test(appliedBy ?? '')) throw new Error('A stable governance operator identity is required.');
  if (currentEvidence?.evidenceVersion !== 'english-diagnostic-release-evidence-v1') {
    throw new Error('Release evidence version is invalid.');
  }
  if (retentionPolicy?.policyVersion !== 'english-diagnostic-retention-proposal-v1'
    || pilotCriteria?.criteriaVersion !== 'english-diagnostic-pilot-criteria-v2') {
    throw new Error('Governance document version is unexpected.');
  }
  const writing = validated.writing;
  const commonApproval = {
    manifestSha256: validated.manifestSha256,
    approvedAt: recordedAt,
    appliedBy,
  };
  const nextRetentionPolicy = {
    ...retentionPolicy,
    status: 'approved',
    approval: {
      ...commonApproval,
      snapshotSha256: validated.snapshots['retention-policy'],
      approvedBy: validated.privacyApprover,
    },
  };
  const nextPilotCriteria = {
    ...pilotCriteria,
    status: 'approved',
    approval: {
      ...commonApproval,
      snapshotSha256: validated.snapshots['pilot-criteria'],
      approvedBy: validated.pilotApprovers,
    },
  };
  const writingEvidence = writing.selectedMode === 'human' ? {
    mode: 'human',
    governanceManifestSha256: validated.manifestSha256,
    workflowSnapshotSha256: validated.snapshots['writing-operations'],
    humanReview: {
      approved: true,
      verifiedReviewerCount: writing.verifiedReviewerReferences.length,
      reviewerRosterSha256: createHash('sha256')
        .update(JSON.stringify([...writing.verifiedReviewerReferences].sort())).digest('hex'),
      slaHours: writing.slaHours,
      verifiedAt: recordedAt,
      verifiedBy: validated.writingApprovers.join(','),
    },
    externalProcessing: currentEvidence.writingOperations.externalProcessing,
  } : {
    mode: 'external',
    governanceManifestSha256: validated.manifestSha256,
    workflowSnapshotSha256: validated.snapshots['writing-operations'],
    humanReview: currentEvidence.writingOperations.humanReview,
    externalProcessing: {
      consentCaptureVerified: true,
      consentCaptureReference: writing.externalConsentCaptureReference,
      providerReviewReference: writing.externalProviderReviewReference,
      verifiedAt: recordedAt,
      verifiedBy: validated.writingApprovers.join(','),
    },
  };
  const nextEvidence = {
    ...currentEvidence,
    updatedAt: recordedAt,
    governanceApplication: { ...commonApproval },
    writingOperations: writingEvidence,
    privacy: {
      ...currentEvidence.privacy,
      retentionPolicyVersion: retentionPolicy.policyVersion,
      retentionSnapshotSha256: validated.snapshots['retention-policy'],
      governanceManifestSha256: validated.manifestSha256,
      approvedAt: recordedAt,
      approvedBy: validated.privacyApprover,
    },
  };
  return { nextEvidence, nextRetentionPolicy, nextPilotCriteria };
}
