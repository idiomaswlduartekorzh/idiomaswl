import { createHash } from 'node:crypto';

const SHA256 = /^[a-f0-9]{64}$/u;
const IDENTITY = /^[A-Za-z0-9][A-Za-z0-9._@+-]{2,159}$/u;
const RUN_ID = /^[A-Za-z0-9][A-Za-z0-9._:-]{2,159}$/u;
const OBJECTIVE_SKILLS = ['reading', 'listening', 'grammar', 'vocabulary'];
const ALL_SKILLS = ['reading', 'listening', 'writing', 'grammar', 'vocabulary'];
const CEFR_BOUNDARIES = ['A1/A2', 'A2/B1', 'B1/B2', 'B2/C1', 'C1/C2'];
const ROLE_CHECKS = {
  'academic-lead': [
    'constructCoverageReviewed', 'cefrBoundaryEvidenceReviewed',
    'standardSettingReviewed', 'interpretationLimitsAccepted',
  ],
  'measurement-lead': [
    'analysisProvenanceReviewed', 'adaptiveReliabilityReviewed',
    'classificationConsistencyReviewed', 'stabilityReviewed',
    'difMethodReviewed', 'sampleAdequacyReviewed',
  ],
  'privacy-lead': [
    'lawfulBasisVerified', 'aggregateOnlyVerified',
    'minimumCellProtectionVerified', 'reidentificationRiskAccepted',
  ],
};
const TOP_LEVEL_KEYS = [
  'adaptiveReliability', 'approval', 'bankSnapshotSha256', 'classificationConsistency',
  'criteriaVersion', 'evidenceVersion', 'fairness', 'generatedAt', 'provenance',
  'stabilityBySkill', 'standardSetting', 'status',
];

function exactKeys(value, expected, label) {
  if (!value || typeof value !== 'object' || Array.isArray(value)
    || Object.keys(value).sort().join('|') !== [...expected].sort().join('|')) {
    throw new Error(`${label} does not match the aggregate evidence schema.`);
  }
}

function canonicalIso(value, label) {
  if (typeof value !== 'string' || Number.isNaN(Date.parse(value))
    || new Date(Date.parse(value)).toISOString() !== value) {
    throw new Error(`${label} is not a canonical ISO timestamp.`);
  }
  return Date.parse(value);
}

function assertHash(value, label) {
  if (!SHA256.test(value ?? '')) throw new Error(`${label} is not a SHA-256 hash.`);
}

function positiveInteger(value) {
  return Number.isInteger(value) && value > 0;
}

function boundedRate(value) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 1;
}

function validateUniqueSkillRows(rows, skills, rowValidator, label) {
  if (!Array.isArray(rows) || rows.length !== skills.length
    || new Set(rows.map(row => row?.skill)).size !== skills.length
    || skills.some(skill => !rows.some(row => row?.skill === skill))) {
    throw new Error(`${label} must contain every required skill exactly once.`);
  }
  rows.forEach(rowValidator);
}

export function validateDiagnosticPilotMeasurementCandidate({
  candidate,
  candidateSha256,
  criteria,
  expectedBankSnapshotSha256,
  objectiveItemCount,
}) {
  assertHash(candidateSha256, 'Measurement candidate');
  assertHash(expectedBankSnapshotSha256, 'Expected bank snapshot');
  exactKeys(candidate, TOP_LEVEL_KEYS, 'Measurement candidate');
  if (candidate.evidenceVersion !== 'diagnostic-pilot-measurement-evidence-v1'
    || candidate.status !== 'complete'
    || candidate.criteriaVersion !== criteria?.criteriaVersion
    || candidate.bankSnapshotSha256 !== expectedBankSnapshotSha256
    || candidate.approval !== null) {
    throw new Error('Measurement candidate is not complete, unapproved or bound to the current criteria and bank.');
  }
  canonicalIso(candidate.generatedAt, 'Measurement candidate generatedAt');
  exactKeys(candidate.provenance, ['aggregateDatasetSha256', 'analysisCodeSha256', 'analysisRunId'], 'Measurement provenance');
  assertHash(candidate.provenance.aggregateDatasetSha256, 'Aggregate dataset');
  assertHash(candidate.provenance.analysisCodeSha256, 'Measurement analysis code');
  if (!RUN_ID.test(candidate.provenance.analysisRunId ?? '')) throw new Error('Measurement analysis run id is invalid.');

  validateUniqueSkillRows(candidate.adaptiveReliability, OBJECTIVE_SKILLS, row => {
    exactKeys(row, ['coefficient', 'method', 'sampleSize', 'skill'], 'Adaptive reliability row');
    if (!positiveInteger(row.sampleSize)
      || row.sampleSize < criteria.minimumAdaptiveReliabilitySamplePerSkill
      || !boundedRate(row.coefficient)
      || row.coefficient < criteria.minimumAdaptiveReliability
      || !['marginal-reliability', 'route-aware-resampling'].includes(row.method)) {
      throw new Error(`Adaptive reliability does not meet criteria for ${row.skill ?? 'unknown skill'}.`);
    }
  }, 'Adaptive reliability');

  exactKeys(candidate.classificationConsistency, ['coefficient', 'method', 'sampleSize'], 'Classification consistency');
  if (!positiveInteger(candidate.classificationConsistency.sampleSize)
    || candidate.classificationConsistency.sampleSize < criteria.minimumClassificationConsistencySample
    || !boundedRate(candidate.classificationConsistency.coefficient)
    || candidate.classificationConsistency.coefficient < criteria.minimumClassificationConsistency
    || !['bootstrap-classification', 'replicated-routing'].includes(candidate.classificationConsistency.method)) {
    throw new Error('Classification consistency does not meet the approved criteria.');
  }

  validateUniqueSkillRows(candidate.stabilityBySkill, ALL_SKILLS, row => {
    exactKeys(row, ['correlation', 'method', 'pairs', 'skill', 'withinOneLevel'], 'Stability row');
    if (!positiveInteger(row.pairs)
      || row.pairs < criteria.minimumStabilityPairsPerSkill
      || !boundedRate(row.correlation)
      || row.correlation < criteria.minimumStabilityCorrelation
      || !boundedRate(row.withinOneLevel)
      || row.withinOneLevel < criteria.minimumStabilityWithinOneLevel
      || !['test-retest', 'parallel-forms'].includes(row.method)) {
      throw new Error(`Stability does not meet criteria for ${row.skill ?? 'unknown skill'}.`);
    }
  }, 'Stability');

  exactKeys(candidate.fairness, [
    'flaggedItems', 'groupSampleSizes', 'itemsAnalyzed', 'lawfulBasisReference',
    'method', 'unresolvedMaterialItems',
  ], 'Fairness evidence');
  if (candidate.fairness.method !== 'dif-analysis'
    || !Array.isArray(candidate.fairness.groupSampleSizes)
    || candidate.fairness.groupSampleSizes.length < criteria.minimumFairnessGroups
    || candidate.fairness.groupSampleSizes.some(sample => !positiveInteger(sample)
      || sample < criteria.minimumFairnessGroupSample)
    || candidate.fairness.itemsAnalyzed !== objectiveItemCount
    || !Number.isInteger(candidate.fairness.flaggedItems) || candidate.fairness.flaggedItems < 0
    || !Number.isInteger(candidate.fairness.unresolvedMaterialItems)
    || candidate.fairness.unresolvedMaterialItems < 0
    || candidate.fairness.unresolvedMaterialItems > criteria.maximumUnresolvedDifItems
    || candidate.fairness.unresolvedMaterialItems > candidate.fairness.flaggedItems
    || candidate.fairness.flaggedItems > candidate.fairness.itemsAnalyzed
    || !IDENTITY.test(candidate.fairness.lawfulBasisReference ?? '')) {
    throw new Error('Fairness evidence does not meet sample, DIF or lawful-basis requirements.');
  }

  exactKeys(candidate.standardSetting, ['decision', 'method', 'panelists', 'reviewedBoundaries'], 'Standard setting evidence');
  if (!['bookmark', 'body-of-work'].includes(candidate.standardSetting.method)
    || !positiveInteger(candidate.standardSetting.panelists)
    || candidate.standardSetting.panelists < criteria.minimumStandardSettingPanelists
    || !Array.isArray(candidate.standardSetting.reviewedBoundaries)
    || candidate.standardSetting.reviewedBoundaries.length !== CEFR_BOUNDARIES.length
    || new Set(candidate.standardSetting.reviewedBoundaries).size !== CEFR_BOUNDARIES.length
    || CEFR_BOUNDARIES.some(boundary => !candidate.standardSetting.reviewedBoundaries.includes(boundary))
    || candidate.standardSetting.decision !== 'approved') {
    throw new Error('Standard setting evidence does not cover every CEFR boundary with an approved decision.');
  }
  return candidate;
}

export function buildDiagnosticPilotMeasurementReviewPackets({
  candidate,
  candidateSha256,
  criteria,
  expectedBankSnapshotSha256,
  objectiveItemCount,
  generatedAt,
}) {
  validateDiagnosticPilotMeasurementCandidate({
    candidate, candidateSha256, criteria, expectedBankSnapshotSha256, objectiveItemCount,
  });
  canonicalIso(generatedAt, 'Measurement review packet generatedAt');
  return Object.entries(ROLE_CHECKS).map(([role, checks]) => ({
    receiptVersion: 'diagnostic-pilot-measurement-review-v1',
    packetId: `diagnostic-pilot-measurement:${role}`,
    role,
    candidateSha256,
    criteriaVersion: criteria.criteriaVersion,
    bankSnapshotSha256: expectedBankSnapshotSha256,
    generatedAt,
    reviewerId: null,
    decision: null,
    reviewedAt: null,
    attestation: false,
    checks: Object.fromEntries(checks.map(check => [check, false])),
    comments: null,
    instructions: [
      'Review only the aggregate evidence for your role; do not request or attach participant rows.',
      'Verify every named check against the private analysis materials before approval.',
      'Use CHANGES_REQUESTED with concrete comments for any unresolved limitation.',
      'Set attestation=true only under your stable reviewer identity.',
    ],
  }));
}

export function validateDiagnosticPilotMeasurementReview(review, expected) {
  const checks = ROLE_CHECKS[review?.role];
  if (!checks
    || review.receiptVersion !== 'diagnostic-pilot-measurement-review-v1'
    || review.packetId !== `diagnostic-pilot-measurement:${review.role}`
    || review.candidateSha256 !== expected.candidateSha256
    || review.criteriaVersion !== expected.criteriaVersion
    || review.bankSnapshotSha256 !== expected.bankSnapshotSha256
    || !IDENTITY.test(review.reviewerId ?? '')
    || !['APPROVE', 'CHANGES_REQUESTED'].includes(review.decision)
    || review.attestation !== true
    || Object.keys(review.checks ?? {}).sort().join('|') !== [...checks].sort().join('|')) {
    throw new Error('Measurement review is incomplete, malformed or belongs to another candidate.');
  }
  canonicalIso(review.reviewedAt, 'Measurement review reviewedAt');
  if (review.decision === 'APPROVE' && checks.some(check => review.checks[check] !== true)) {
    throw new Error('Measurement approval requires every role-specific check.');
  }
  if (review.decision === 'CHANGES_REQUESTED'
    && (typeof review.comments !== 'string' || review.comments.trim().length < 10)) {
    throw new Error('Measurement changes requested require concrete comments.');
  }
  return review;
}

export function compileDiagnosticPilotMeasurementReviews({ reviews, candidateSha256, criteriaVersion, bankSnapshotSha256 }) {
  if (!Array.isArray(reviews) || reviews.length !== Object.keys(ROLE_CHECKS).length) {
    throw new Error('Exactly three independent measurement reviews are required.');
  }
  const expected = { candidateSha256, criteriaVersion, bankSnapshotSha256 };
  const validated = reviews.map(review => validateDiagnosticPilotMeasurementReview(review, expected));
  const roles = Object.keys(ROLE_CHECKS);
  if (new Set(validated.map(review => review.role)).size !== roles.length
    || roles.some(role => !validated.some(review => review.role === role))) {
    throw new Error('Measurement review does not contain every required role.');
  }
  if (new Set(validated.map(review => review.reviewerId)).size !== roles.length) {
    throw new Error('Measurement reviews require independent reviewer identities.');
  }
  return {
    manifestVersion: 'diagnostic-pilot-measurement-manifest-v1',
    decision: validated.every(review => review.decision === 'APPROVE') ? 'APPROVED' : 'CHANGES_REQUESTED',
    candidateSha256,
    criteriaVersion,
    bankSnapshotSha256,
    reviews: validated.map(review => ({
      packetId: review.packetId,
      role: review.role,
      reviewerId: review.reviewerId,
      decision: review.decision,
      reviewedAt: review.reviewedAt,
      checks: review.checks,
      comments: review.comments,
    })),
    safeguards: {
      independentRoleReviews: true,
      aggregateEvidenceOnly: true,
      participantRowsIncluded: false,
      groupLabelsIncluded: false,
    },
  };
}

export function validateDiagnosticPilotMeasurementManifest({
  manifest,
  manifestSha256,
  reviewFiles,
  candidateSha256,
  criteriaVersion,
  bankSnapshotSha256,
}) {
  assertHash(manifestSha256, 'Measurement manifest');
  const { manifestSha256: embeddedHash, ...core } = manifest ?? {};
  if (embeddedHash !== manifestSha256
    || createHash('sha256').update(JSON.stringify(core)).digest('hex') !== manifestSha256
    || manifest?.manifestVersion !== 'diagnostic-pilot-measurement-manifest-v1'
    || manifest.decision !== 'APPROVED'
    || manifest.candidateSha256 !== candidateSha256
    || manifest.criteriaVersion !== criteriaVersion
    || manifest.bankSnapshotSha256 !== bankSnapshotSha256
    || manifest.safeguards?.independentRoleReviews !== true
    || manifest.safeguards?.aggregateEvidenceOnly !== true
    || manifest.safeguards?.participantRowsIncluded !== false
    || manifest.safeguards?.groupLabelsIncluded !== false
    || !Array.isArray(manifest.receipts)
    || manifest.receipts.length !== Object.keys(ROLE_CHECKS).length) {
    throw new Error('Measurement manifest is incomplete, changed or not approved.');
  }
  canonicalIso(manifest.compiledAt, 'Measurement manifest compiledAt');
  if (!(reviewFiles instanceof Map) || reviewFiles.size !== Object.keys(ROLE_CHECKS).length) {
    throw new Error('Exactly three source measurement review files are required.');
  }
  const reviews = manifest.receipts.map(reference => {
    if (typeof reference.file !== 'string' || reference.file !== reference.file.split('/').at(-1)
      || !SHA256.test(reference.sha256 ?? '')) {
      throw new Error('Measurement manifest receipt reference is unsafe.');
    }
    const entry = reviewFiles.get(reference.file);
    if (!entry || entry.sha256 !== reference.sha256 || entry.review?.packetId !== reference.packetId) {
      throw new Error('Measurement source review does not match its manifest reference.');
    }
    return entry.review;
  });
  const recomputed = compileDiagnosticPilotMeasurementReviews({
    reviews, candidateSha256, criteriaVersion, bankSnapshotSha256,
  });
  if (recomputed.decision !== 'APPROVED'
    || JSON.stringify(recomputed.reviews) !== JSON.stringify(manifest.reviews)) {
    throw new Error('Measurement approvals no longer match the exact candidate.');
  }
  return {
    manifestSha256,
    candidateSha256,
    approvedAt: recomputed.reviews.map(review => review.reviewedAt).sort().at(-1),
    approvedBy: recomputed.reviews.map(review => `${review.role}:${review.reviewerId}`),
  };
}

export function recordDiagnosticPilotMeasurementEvidence({ candidate, validated, appliedAt, appliedBy }) {
  const appliedAtMs = canonicalIso(appliedAt, 'Measurement evidence appliedAt');
  if (!IDENTITY.test(appliedBy ?? '')) throw new Error('A stable measurement evidence operator identity is required.');
  if (appliedAtMs < Date.parse(validated.approvedAt)) {
    throw new Error('Measurement evidence cannot be applied before its final independent review.');
  }
  return {
    ...candidate,
    approval: {
      manifestSha256: validated.manifestSha256,
      candidateSha256: validated.candidateSha256,
      approvedAt: validated.approvedAt,
      approvedBy: validated.approvedBy,
      appliedAt,
      appliedBy,
    },
  };
}
