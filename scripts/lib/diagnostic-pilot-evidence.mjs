import { createHash } from 'node:crypto';

const SHA256 = /^[a-f0-9]{64}$/u;
const COMMIT_SHA = /^[a-f0-9]{40}$/u;
const REVIEWER = /^[A-Za-z0-9][A-Za-z0-9._@+-]{2,159}$/u;
const PILOT_GATE_NAMES = [
  'criteriaApproved',
  'attemptVolume',
  'completion',
  'itemSamples',
  'itemQuality',
  'writingAgreement',
  'independentReference',
];
const REVIEW_ROLES = ['academic-lead', 'measurement-lead'];
const REVIEW_CHECKS = [
  'sampleAndCompletionReviewed',
  'itemQualityReviewed',
  'writingAgreementReviewed',
  'independentReferenceReviewed',
  'limitationsAccepted',
];
const FORBIDDEN_REPORT_KEYS = new Set([
  'attemptId', 'userId', 'email', 'submittedResponse', 'responseText', 'cookie', 'authorization',
]);

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

function forbiddenKey(value) {
  if (Array.isArray(value)) {
    for (const child of value) {
      const found = forbiddenKey(child);
      if (found) return found;
    }
    return null;
  }
  if (!value || typeof value !== 'object') return null;
  for (const [key, child] of Object.entries(value)) {
    if (FORBIDDEN_REPORT_KEYS.has(key)) return key;
    const found = forbiddenKey(child);
    if (found) return found;
  }
  return null;
}

function safeOrigin(value) {
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    throw new Error('Pilot capture application URL is invalid.');
  }
  const local = parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1';
  if (parsed.protocol !== 'https:' && !local) throw new Error('Remote pilot capture requires HTTPS.');
  if (parsed.pathname !== '/' || parsed.search || parsed.hash) {
    throw new Error('Pilot capture application URL must be an origin.');
  }
  return parsed.origin;
}

export function validateDiagnosticPilotCapture(input) {
  const report = input.report;
  const binding = input.binding;
  const capturedAtMs = canonicalIso(input.capturedAt, 'pilot capturedAt');
  const generatedAtMs = canonicalIso(report?.generatedAt, 'pilot report generatedAt');
  const sinceMs = canonicalIso(input.since, 'pilot since');
  if (sinceMs >= generatedAtMs || generatedAtMs > capturedAtMs + 60_000
    || capturedAtMs - generatedAtMs > 10 * 60_000) {
    throw new Error('Pilot report timestamps do not match a fresh capture window.');
  }
  assertHash(input.reportSha256, 'Pilot report');
  assertHash(input.expectedSourceSha256, 'Expected source');
  assertHash(input.expectedBankSnapshotSha256, 'Expected bank snapshot');
  if (!COMMIT_SHA.test(input.expectedCommitSha ?? '')) throw new Error('Expected commit SHA is invalid.');
  if (report?.reportVersion !== 'diagnostic-pilot-report-v1'
    || !['HOLD', 'ELIGIBLE_FOR_VALIDATION_REVIEW'].includes(report.decision)
    || report.bankSnapshot?.sha256 !== input.expectedBankSnapshotSha256
    || !Array.isArray(report.itemMetrics)
    || typeof report.criteria?.version !== 'string'
    || !['provisional-pending-academic-approval', 'approved'].includes(report.criteria?.status)
    || Object.keys(report.gates ?? {}).sort().join('|') !== [...PILOT_GATE_NAMES].sort().join('|')
    || PILOT_GATE_NAMES.some(name => typeof report.gates[name] !== 'boolean')) {
    throw new Error('Pilot report does not match the aggregate report contract or current bank.');
  }
  const unsafeKey = forbiddenKey(report);
  if (unsafeKey) throw new Error(`Pilot aggregate report includes forbidden participant field ${unsafeKey}.`);
  const origin = safeOrigin(input.applicationUrl);
  if (binding?.bindingVersion !== 'diagnostic-live-release-binding-v1'
    || binding.ready !== true
    || binding.accessMode !== 'pilot'
    || binding.sourceSha256 !== input.expectedSourceSha256
    || binding.bankSnapshotSha256 !== input.expectedBankSnapshotSha256
    || binding.commitSha !== input.expectedCommitSha
    || typeof binding.supabaseProject !== 'string'
    || binding.supabaseProject.length < 1) {
    throw new Error('Pilot capture deployment does not match the expected local release.');
  }
  return {
    receiptVersion: 'diagnostic-pilot-report-capture-v1',
    capturedAt: input.capturedAt,
    since: input.since,
    target: {
      applicationHost: new URL(origin).host,
      supabaseProject: binding.supabaseProject,
      sourceSha256: binding.sourceSha256,
      bankSnapshotSha256: binding.bankSnapshotSha256,
      commitSha: binding.commitSha,
      accessMode: binding.accessMode,
    },
    report: {
      file: input.reportFile,
      sha256: input.reportSha256,
      generatedAt: report.generatedAt,
      decision: report.decision,
      criteriaVersion: report.criteria.version,
    },
    safeguards: {
      aggregateReportOnly: true,
      participantRowsIncluded: false,
      cookiesIncluded: false,
      answerKeysIncluded: false,
    },
  };
}

export function validateDiagnosticPilotCaptureReceipt({
  receipt,
  receiptSha256,
  report,
  reportSha256,
  reportFile,
  expectedSourceSha256,
  expectedBankSnapshotSha256,
}) {
  assertHash(receiptSha256, 'Pilot capture receipt');
  assertHash(reportSha256, 'Pilot report');
  assertHash(expectedSourceSha256, 'Expected source');
  assertHash(expectedBankSnapshotSha256, 'Expected bank snapshot');
  canonicalIso(receipt?.capturedAt, 'pilot capturedAt');
  canonicalIso(receipt?.since, 'pilot since');
  canonicalIso(receipt?.report?.generatedAt, 'pilot report generatedAt');
  if (receipt?.receiptVersion !== 'diagnostic-pilot-report-capture-v1'
    || receipt.report.file !== reportFile
    || receipt.report.sha256 !== reportSha256
    || receipt.report.generatedAt !== report?.generatedAt
    || receipt.report.decision !== report?.decision
    || receipt.report.criteriaVersion !== report?.criteria?.version
    || receipt.target?.sourceSha256 !== expectedSourceSha256
    || receipt.target?.bankSnapshotSha256 !== expectedBankSnapshotSha256
    || receipt.target?.accessMode !== 'pilot'
    || !COMMIT_SHA.test(receipt.target?.commitSha ?? '')
    || typeof receipt.target?.applicationHost !== 'string'
    || receipt.target.applicationHost.length < 1
    || typeof receipt.target?.supabaseProject !== 'string'
    || receipt.target.supabaseProject.length < 1
    || receipt.safeguards?.aggregateReportOnly !== true
    || receipt.safeguards?.participantRowsIncluded !== false
    || receipt.safeguards?.cookiesIncluded !== false
    || receipt.safeguards?.answerKeysIncluded !== false) {
    throw new Error('Pilot capture receipt is incomplete or does not bind the exact report and release.');
  }
  if (report?.bankSnapshot?.sha256 !== expectedBankSnapshotSha256) {
    throw new Error('Pilot report bank snapshot changed after capture.');
  }
  return receipt;
}

export function buildDiagnosticPilotValidationPackets({ captureReceipt, captureReceiptSha256, generatedAt }) {
  canonicalIso(generatedAt, 'pilot validation packet generatedAt');
  assertHash(captureReceiptSha256, 'Pilot capture receipt');
  if (captureReceipt?.receiptVersion !== 'diagnostic-pilot-report-capture-v1'
    || captureReceipt.report?.decision !== 'ELIGIBLE_FOR_VALIDATION_REVIEW') {
    throw new Error('Only an eligible captured pilot report can enter validation review.');
  }
  return REVIEW_ROLES.map(role => ({
    receiptVersion: 'diagnostic-pilot-validation-review-v1',
    packetId: `diagnostic-pilot-validation:${role}`,
    role,
    reportSha256: captureReceipt.report.sha256,
    captureReceiptSha256,
    sourceSha256: captureReceipt.target.sourceSha256,
    bankSnapshotSha256: captureReceipt.target.bankSnapshotSha256,
    generatedAt,
    reviewerId: null,
    decision: null,
    reviewedAt: null,
    attestation: false,
    checks: Object.fromEntries(REVIEW_CHECKS.map(check => [check, false])),
    comments: null,
    instructions: [
      'Review the captured aggregate report independently; do not copy the other reviewer decision.',
      'Verify each named check and set it true only after inspecting the supporting metrics.',
      'Use CHANGES_REQUESTED with concrete comments for any unresolved limitation.',
      'Set attestation=true only under your stable reviewer identity.',
    ],
  }));
}

export function validateDiagnosticPilotValidationReview(review, expected) {
  if (review?.receiptVersion !== 'diagnostic-pilot-validation-review-v1'
    || !REVIEW_ROLES.includes(review.role)
    || review.packetId !== `diagnostic-pilot-validation:${review.role}`
    || review.reportSha256 !== expected.reportSha256
    || review.captureReceiptSha256 !== expected.captureReceiptSha256
    || review.sourceSha256 !== expected.sourceSha256
    || review.bankSnapshotSha256 !== expected.bankSnapshotSha256
    || !REVIEWER.test(review.reviewerId ?? '')
    || !['APPROVE', 'CHANGES_REQUESTED'].includes(review.decision)
    || review.attestation !== true) {
    throw new Error('Pilot validation review is incomplete or belongs to another release.');
  }
  canonicalIso(review.reviewedAt, 'pilot validation reviewedAt');
  if (review.decision === 'APPROVE'
    && REVIEW_CHECKS.some(check => review.checks?.[check] !== true)) {
    throw new Error('Pilot validation approval requires every review check.');
  }
  if (review.decision === 'CHANGES_REQUESTED'
    && (typeof review.comments !== 'string' || review.comments.trim().length < 10)) {
    throw new Error('Pilot validation changes require concrete comments.');
  }
  return review;
}

export function compileDiagnosticPilotValidation({ reviews, captureReceipt, captureReceiptSha256 }) {
  if (!Array.isArray(reviews) || reviews.length !== REVIEW_ROLES.length) {
    throw new Error('Exactly two independent pilot validation reviews are required.');
  }
  const expected = {
    reportSha256: captureReceipt?.report?.sha256,
    captureReceiptSha256,
    sourceSha256: captureReceipt?.target?.sourceSha256,
    bankSnapshotSha256: captureReceipt?.target?.bankSnapshotSha256,
  };
  const validated = reviews.map(review => validateDiagnosticPilotValidationReview(review, expected));
  if (new Set(validated.map(review => review.role)).size !== REVIEW_ROLES.length
    || REVIEW_ROLES.some(role => !validated.some(review => review.role === role))) {
    throw new Error('Pilot validation does not contain both required roles.');
  }
  if (new Set(validated.map(review => review.reviewerId)).size !== REVIEW_ROLES.length) {
    throw new Error('Pilot validation reviews require independent reviewer identities.');
  }
  return {
    manifestVersion: 'diagnostic-pilot-validation-manifest-v1',
    decision: validated.every(review => review.decision === 'APPROVE') ? 'APPROVED' : 'CHANGES_REQUESTED',
    reportSha256: expected.reportSha256,
    captureReceiptSha256,
    sourceSha256: expected.sourceSha256,
    bankSnapshotSha256: expected.bankSnapshotSha256,
    reviews: validated.map(review => ({
      packetId: review.packetId,
      role: review.role,
      reviewerId: review.reviewerId,
      decision: review.decision,
      reviewedAt: review.reviewedAt,
      checks: review.checks,
      comments: review.comments,
    })),
    safeguards: { independentRoleReviews: true, aggregateEvidenceOnly: true },
  };
}

export function validateDiagnosticPilotValidationManifest({
  manifest,
  manifestSha256,
  reviewFiles,
  captureReceipt,
  captureReceiptSha256,
}) {
  assertHash(manifestSha256, 'Pilot validation manifest');
  const { manifestSha256: embeddedHash, ...core } = manifest ?? {};
  if (embeddedHash !== manifestSha256
    || createHash('sha256').update(JSON.stringify(core)).digest('hex') !== manifestSha256
    || manifest?.manifestVersion !== 'diagnostic-pilot-validation-manifest-v1'
    || manifest.decision !== 'APPROVED'
    || manifest.safeguards?.independentRoleReviews !== true
    || manifest.safeguards?.aggregateEvidenceOnly !== true
    || !Array.isArray(manifest.receipts)
    || manifest.receipts.length !== REVIEW_ROLES.length) {
    throw new Error('Pilot validation manifest is incomplete, changed or not approved.');
  }
  canonicalIso(manifest.compiledAt, 'pilot validation compiledAt');
  if (!(reviewFiles instanceof Map) || reviewFiles.size !== REVIEW_ROLES.length) {
    throw new Error('Exactly two source pilot review files are required.');
  }
  const reviews = manifest.receipts.map(reference => {
    if (typeof reference.file !== 'string' || reference.file !== reference.file.split('/').at(-1)
      || !SHA256.test(reference.sha256 ?? '')) {
      throw new Error('Pilot validation receipt reference is unsafe.');
    }
    const entry = reviewFiles.get(reference.file);
    if (!entry || entry.sha256 !== reference.sha256 || entry.review?.packetId !== reference.packetId) {
      throw new Error('Pilot validation source receipt does not match its manifest reference.');
    }
    return entry.review;
  });
  const recomputed = compileDiagnosticPilotValidation({ reviews, captureReceipt, captureReceiptSha256 });
  if (recomputed.decision !== 'APPROVED'
    || JSON.stringify(recomputed.reviews) !== JSON.stringify(manifest.reviews)) {
    throw new Error('Pilot validation approvals no longer match the captured report.');
  }
  return {
    manifestSha256,
    reportSha256: recomputed.reportSha256,
    captureReceiptSha256,
    sourceSha256: recomputed.sourceSha256,
    bankSnapshotSha256: recomputed.bankSnapshotSha256,
    reviewedAt: [...recomputed.reviews].map(review => review.reviewedAt).sort().at(-1),
    reviewedBy: recomputed.reviews.map(review => `${review.role}:${review.reviewerId}`).join(','),
  };
}

export function recordDiagnosticPilotValidation({ currentEvidence, validated, paths, recordedAt, appliedBy }) {
  canonicalIso(recordedAt, 'pilot validation recordedAt');
  if (!REVIEWER.test(appliedBy ?? '')) throw new Error('A stable pilot validation operator identity is required.');
  if (currentEvidence?.evidenceVersion !== 'english-diagnostic-release-evidence-v1') {
    throw new Error('Release evidence version is invalid.');
  }
  return {
    ...currentEvidence,
    updatedAt: recordedAt,
    pilot: {
      reportPath: paths.reportPath,
      reportSha256: validated.reportSha256,
      captureReceiptPath: paths.captureReceiptPath,
      captureReceiptSha256: validated.captureReceiptSha256,
      validationManifestPath: paths.validationManifestPath,
      validationManifestSha256: validated.manifestSha256,
      sourceSha256: validated.sourceSha256,
      bankSnapshotSha256: validated.bankSnapshotSha256,
      validationDecision: 'approved',
      reviewedAt: validated.reviewedAt,
      reviewedBy: validated.reviewedBy,
      appliedAt: recordedAt,
      appliedBy,
    },
  };
}
