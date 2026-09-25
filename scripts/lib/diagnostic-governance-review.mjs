const SHA256 = /^[a-f0-9]{64}$/u;
const REVIEWER = /^[A-Za-z0-9][A-Za-z0-9._@+-]{2,159}$/u;
const TOPICS = {
  'writing-operations': ['academic-lead', 'operations-lead'],
  'retention-policy': ['privacy-lead'],
  'pilot-criteria': ['academic-lead', 'measurement-lead'],
  'delivery-policy': ['academic-lead', 'product-owner'],
};

function canonicalIso(value) {
  return typeof value === 'string' && !Number.isNaN(Date.parse(value))
    && new Date(Date.parse(value)).toISOString() === value;
}

function packetId(topic, role) {
  return `diagnostic-governance:${topic}:${role}`;
}

export function buildDiagnosticGovernanceReviewPackets({ snapshots, generatedAt }) {
  if (!canonicalIso(generatedAt)) throw new Error('Governance packet timestamp is invalid.');
  for (const [topic, roles] of Object.entries(TOPICS)) {
    if (!SHA256.test(snapshots?.[topic] ?? '')) throw new Error(`${topic} snapshot is invalid.`);
    if (!roles.length) throw new Error(`${topic} has no independent review role.`);
  }
  return Object.entries(TOPICS).flatMap(([topic, roles]) => roles.map(role => ({
    receiptVersion: 'diagnostic-governance-review-v1',
    packetId: packetId(topic, role),
    topic,
    role,
    snapshotSha256: snapshots[topic],
    generatedAt,
    reviewerId: null,
    decision: null,
    reviewedAt: null,
    attestation: false,
    details: topic === 'writing-operations' ? {
      selectedMode: null,
      verifiedReviewerReferences: [],
      slaHours: null,
      externalConsentCaptureReference: null,
      externalProviderReviewReference: null,
    } : null,
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
    || !Object.hasOwn(TOPICS, receipt.topic)
    || !TOPICS[receipt.topic].includes(receipt.role)
    || receipt.packetId !== packetId(receipt.topic, receipt.role)
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
  for (const topic of Object.keys(TOPICS)) {
    const topicReviews = validated.filter(review => review.topic === topic);
    const expectedRoles = TOPICS[topic];
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
    topics: Object.fromEntries(Object.keys(TOPICS).map(topic => [topic, {
      snapshotSha256: snapshots[topic],
      reviews: validated.filter(review => review.topic === topic),
    }])),
    safeguards: { independentRoleReviews: true, reviewerIdentityCount: identities.size },
  };
}
