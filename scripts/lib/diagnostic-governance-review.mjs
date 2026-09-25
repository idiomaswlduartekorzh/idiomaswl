import {
  DIAGNOSTIC_DELIVERY_GOVERNANCE_PATHS,
  DIAGNOSTIC_PILOT_CRITERIA_GOVERNANCE_PATHS,
  DIAGNOSTIC_WRITING_GOVERNANCE_PATHS,
} from './diagnostic-governance-snapshots.mjs';

const SHA256 = /^[a-f0-9]{64}$/u;
const REVIEWER = /^[A-Za-z0-9][A-Za-z0-9._@+-]{2,159}$/u;
export const DIAGNOSTIC_GOVERNANCE_TOPICS = {
  'writing-operations': ['academic-lead', 'operations-lead'],
  'retention-policy': ['privacy-lead'],
  'pilot-criteria': ['academic-lead', 'measurement-lead'],
  'delivery-policy': ['academic-lead', 'product-owner'],
};
const EVIDENCE_PATHS = {
  'writing-operations': [
    ...DIAGNOSTIC_WRITING_GOVERNANCE_PATHS,
    'config/diagnostic/release-evidence.json',
  ],
  'retention-policy': [
    'config/diagnostic/data-retention-policy.json',
    'config/diagnostic/release-evidence.json',
    'docs/diagnostic-release-readiness.md',
  ],
  'pilot-criteria': DIAGNOSTIC_PILOT_CRITERIA_GOVERNANCE_PATHS,
  'delivery-policy': DIAGNOSTIC_DELIVERY_GOVERNANCE_PATHS,
};
const DELIVERY_CHECKS = {
  'academic-lead': [
    'pilotRetestDesignReviewed',
    'productionCooldownReviewed',
    'exposureWindowAndBankCapacityReviewed',
    'validityIsNonCertificationReviewed',
    'itemDriftSignalReviewed',
    'proposedValuesAccepted',
  ],
  'product-owner': [
    'activeAttemptUxReviewed',
    'cooldownAndEligibilityUxReviewed',
    'supportAndNoOverrideRuleReviewed',
    'resultExpiryCommunicationReviewed',
    'controlledRolloutAndDrainRollbackReviewed',
    'itemDriftResponseRunbookReviewed',
    'proposedValuesAccepted',
  ],
};
const DELIVERY_QUESTIONS = {
  'academic-lead': [
    'Are explicitly scheduled pilot retests appropriate for the approved reliability study design?',
    'Is the 90-day production cooldown linguistically and measurement-wise defensible?',
    'Can the reserved bank sustain a 365-day no-repeat window without distorting coverage?',
    'Is the 180-day result validity framed only as WeLearn guidance, never certification?',
    'Are the minimum sample, facility-shift and z-score thresholds suitable only as a signal for independent item review?',
    'Do you accept every proposed pilot and production value in the bound snapshot?',
  ],
  'product-owner': [
    'Is the single-active-attempt behavior understandable and recoverable in the product?',
    'Are cooldown and next-eligibility behaviors supportable without leaking participant history?',
    'Is the no-override production rule operationally acceptable?',
    'Is result expiry communicated consistently in the screen and exported PDF?',
    'Is the deterministic cohort rollout and drain-before-rollback procedure operationally acceptable?',
    'Can operations investigate a drift alert without automatic recalibration or bypassing independent retirement review?',
    'Do you accept every proposed pilot and production value in the bound snapshot?',
  ],
};

function canonicalIso(value) {
  return typeof value === 'string' && !Number.isNaN(Date.parse(value))
    && new Date(Date.parse(value)).toISOString() === value;
}

function packetId(topic, role) {
  return `diagnostic-governance:${topic}:${role}`;
}

function packetDetails(topic, role) {
  if (topic === 'writing-operations') return {
    selectedMode: null,
    verifiedReviewerReferences: [],
    slaHours: null,
    externalConsentCaptureReference: null,
    externalProviderReviewReference: null,
  };
  if (topic === 'delivery-policy') {
    return Object.fromEntries(DELIVERY_CHECKS[role].map(check => [check, null]));
  }
  return null;
}

export function buildDiagnosticGovernanceReviewPackets({ snapshots, generatedAt }) {
  if (!canonicalIso(generatedAt)) throw new Error('Governance packet timestamp is invalid.');
  for (const [topic, roles] of Object.entries(DIAGNOSTIC_GOVERNANCE_TOPICS)) {
    if (!SHA256.test(snapshots?.[topic] ?? '')) throw new Error(`${topic} snapshot is invalid.`);
    if (!roles.length) throw new Error(`${topic} has no independent review role.`);
  }
  return Object.entries(DIAGNOSTIC_GOVERNANCE_TOPICS).flatMap(([topic, roles]) => roles.map(role => ({
    receiptVersion: 'diagnostic-governance-review-v1',
    packetId: packetId(topic, role),
    topic,
    role,
    snapshotSha256: snapshots[topic],
    evidencePaths: EVIDENCE_PATHS[topic],
    reviewQuestions: topic === 'delivery-policy' ? DELIVERY_QUESTIONS[role] : [],
    generatedAt,
    reviewerId: null,
    decision: null,
    reviewedAt: null,
    attestation: false,
    details: packetDetails(topic, role),
    comments: null,
    instructions: [
      'Review the exact snapshot independently; do not copy another reviewer decision.',
      'Set APPROVE only when the snapshot and operational evidence are acceptable.',
      'Use CHANGES_REQUESTED with concrete comments when any requirement is unresolved.',
      'Set attestation=true only after completing the review under your stable reviewer identity.',
    ],
  })));
}

export function validateDiagnosticGovernanceReceipt(receipt, expectedSnapshot) {
  if (!receipt || receipt.receiptVersion !== 'diagnostic-governance-review-v1'
    || !Object.hasOwn(DIAGNOSTIC_GOVERNANCE_TOPICS, receipt.topic)
    || !DIAGNOSTIC_GOVERNANCE_TOPICS[receipt.topic].includes(receipt.role)
    || receipt.packetId !== packetId(receipt.topic, receipt.role)
    || JSON.stringify(receipt.evidencePaths) !== JSON.stringify(EVIDENCE_PATHS[receipt.topic])
    || JSON.stringify(receipt.reviewQuestions) !== JSON.stringify(
      receipt.topic === 'delivery-policy' ? DELIVERY_QUESTIONS[receipt.role] : [],
    )
    || receipt.snapshotSha256 !== expectedSnapshot
    || !SHA256.test(receipt.snapshotSha256 ?? '')
    || !REVIEWER.test(receipt.reviewerId ?? '')
    || !canonicalIso(receipt.reviewedAt)
    || receipt.attestation !== true
    || !['APPROVE', 'CHANGES_REQUESTED'].includes(receipt.decision)) {
    throw new Error('Governance review receipt is incomplete or belongs to another snapshot.');
  }
  if (receipt.decision === 'CHANGES_REQUESTED'
    && (typeof receipt.comments !== 'string' || receipt.comments.trim().length < 10)) {
    throw new Error('Changes requested require concrete comments.');
  }
  if (receipt.topic === 'writing-operations' && receipt.decision === 'APPROVE') {
    const details = receipt.details;
    if (!details || !['human', 'external'].includes(details.selectedMode)) {
      throw new Error('Writing operations approval must select one mode.');
    }
    if (details.selectedMode === 'human') {
      if (!Array.isArray(details.verifiedReviewerReferences)
        || details.verifiedReviewerReferences.length < 2
        || new Set(details.verifiedReviewerReferences).size !== details.verifiedReviewerReferences.length
        || details.verifiedReviewerReferences.some(reference => !REVIEWER.test(reference))
        || !Number.isFinite(details.slaHours)
        || details.slaHours <= 0
        || details.slaHours > 72) {
        throw new Error('Human writing operation requires two verified reviewers and an SLA of at most 72 hours.');
      }
    } else if (!REVIEWER.test(details.externalConsentCaptureReference ?? '')
      || !REVIEWER.test(details.externalProviderReviewReference ?? '')) {
      throw new Error('External writing operation requires consent and provider review references.');
    }
  }
  if (receipt.topic === 'delivery-policy' && receipt.decision === 'APPROVE') {
    const requiredChecks = DELIVERY_CHECKS[receipt.role];
    const details = receipt.details;
    if (!details || typeof details !== 'object' || Array.isArray(details)
      || Object.keys(details).sort().join('|') !== [...requiredChecks].sort().join('|')
      || requiredChecks.some(check => details[check] !== true)) {
      throw new Error(`Delivery policy approval requires every ${receipt.role} check.`);
    }
  }
  return {
    topic: receipt.topic,
    role: receipt.role,
    reviewerId: receipt.reviewerId,
    decision: receipt.decision,
    reviewedAt: receipt.reviewedAt,
    snapshotSha256: receipt.snapshotSha256,
    details: receipt.details ?? null,
  };
}

export function compileDiagnosticGovernanceReviews({ receipts, snapshots }) {
  if (!Array.isArray(receipts) || receipts.length !== 7) {
    throw new Error('Exactly seven governance receipts are required.');
  }
  const validated = receipts.map(receipt =>
    validateDiagnosticGovernanceReceipt(receipt, snapshots?.[receipt?.topic]));
  const identities = new Set();
  for (const topic of Object.keys(DIAGNOSTIC_GOVERNANCE_TOPICS)) {
    const topicReviews = validated.filter(review => review.topic === topic);
    const expectedRoles = DIAGNOSTIC_GOVERNANCE_TOPICS[topic];
    if (topicReviews.length !== expectedRoles.length
      || new Set(topicReviews.map(review => review.role)).size !== expectedRoles.length
      || expectedRoles.some(role => !topicReviews.some(review => review.role === role))) {
      throw new Error(`${topic} does not contain every required independent role.`);
    }
    if (new Set(topicReviews.map(review => review.reviewerId)).size !== topicReviews.length) {
      throw new Error(`${topic} reviews must use independent identities.`);
    }
    topicReviews.forEach(review => identities.add(`${review.topic}:${review.reviewerId}`));
  }
  const writing = validated.filter(review => review.topic === 'writing-operations');
  if (writing.every(review => review.decision === 'APPROVE')) {
    const first = JSON.stringify(writing[0].details);
    if (writing.some(review => JSON.stringify(review.details) !== first)) {
      throw new Error('Independent writing reviewers did not approve the same operating model.');
    }
  }
  return {
    manifestVersion: 'diagnostic-governance-review-manifest-v1',
    decision: validated.every(review => review.decision === 'APPROVE') ? 'APPROVED' : 'CHANGES_REQUESTED',
    topics: Object.fromEntries(Object.keys(DIAGNOSTIC_GOVERNANCE_TOPICS).map(topic => [topic, {
      snapshotSha256: snapshots[topic],
      reviews: validated.filter(review => review.topic === topic),
    }])),
    safeguards: { independentRoleReviews: true, reviewerIdentityCount: identities.size },
  };
}

export function diagnosticGovernanceReviewProgress({ receipts, snapshots }) {
  const entries = Array.isArray(receipts) ? receipts : [];
  const expected = Object.entries(DIAGNOSTIC_GOVERNANCE_TOPICS)
    .flatMap(([topic, roles]) => roles.map(role => ({ topic, role, packetId: packetId(topic, role) })));
  const expectedIds = new Set(expected.map(item => item.packetId));
  const extraCount = entries.filter(entry => !expectedIds.has(entry?.packetId)).length;
  const rows = expected.map(item => {
    const matches = entries.filter(entry => entry?.packetId === item.packetId);
    if (matches.length === 0) return { topic: item.topic, role: item.role, status: 'missing' };
    if (matches.length > 1) return { topic: item.topic, role: item.role, status: 'invalid' };
    const receipt = matches[0];
    const pending = receipt?.decision === null && receipt?.reviewerId === null
      && receipt?.reviewedAt === null && receipt?.attestation === false;
    try {
      if (pending) {
        const template = buildDiagnosticGovernanceReviewPackets({
          snapshots,
          generatedAt: receipt.generatedAt,
        }).find(packet => packet.packetId === item.packetId);
        const stableFields = [
          'receiptVersion', 'packetId', 'topic', 'role', 'snapshotSha256', 'evidencePaths',
          'reviewQuestions', 'generatedAt', 'details', 'comments', 'instructions',
        ];
        if (!template || stableFields.some(field => JSON.stringify(receipt[field]) !== JSON.stringify(template[field]))) {
          throw new Error('pending governance template was changed');
        }
        return { topic: item.topic, role: item.role, status: 'pending' };
      }
      const validated = validateDiagnosticGovernanceReceipt(receipt, snapshots?.[item.topic]);
      return {
        topic: item.topic,
        role: item.role,
        status: validated.decision === 'APPROVE' ? 'approved' : 'changes-requested',
      };
    } catch {
      return { topic: item.topic, role: item.role, status: 'invalid' };
    }
  });
  const counts = Object.fromEntries(['approved', 'pending', 'changes-requested', 'missing', 'invalid']
    .map(status => [status, rows.filter(row => row.status === status).length]));
  counts.invalid += extraCount;
  return {
    decision: counts.approved === expected.length && counts.invalid === 0
      ? 'READY_FOR_COMPILATION' : 'INCOMPLETE',
    requiredReceiptCount: expected.length,
    counts,
    topics: Object.fromEntries(Object.keys(DIAGNOSTIC_GOVERNANCE_TOPICS).map(topic => [topic,
      rows.filter(row => row.topic === topic).map(({ role, status }) => ({ role, status })),
    ])),
  };
}
