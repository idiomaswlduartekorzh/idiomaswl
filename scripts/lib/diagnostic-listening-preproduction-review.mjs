import { createHash } from 'node:crypto';

export const DIAGNOSTIC_LISTENING_PREPRODUCTION_MANIFEST_VERSION =
  'english-diagnostic-listening-preproduction-approvals-v1';
export const DIAGNOSTIC_LISTENING_PREPRODUCTION_ROLES = [
  'linguistic-reviewer',
  'assessment-reviewer',
];

const SHA256 = /^[a-f0-9]{64}$/u;
const REVIEWER = /^[A-Za-z0-9][A-Za-z0-9._@+-]{2,159}$/u;
const CHECKLISTS = {
  'linguistic-reviewer': [
    'transcriptAccurateNaturalAndRecordable',
    'questionAndOptionWordingUnambiguous',
    'cefrLanguageDemandDefensible',
    'registerCultureAndAccessibilityReviewed',
  ],
  'assessment-reviewer': [
    'constructAndSubdomainsAligned',
    'audioEvidenceSupportsUniqueKey',
    'distractorsPlausibleButWrong',
    'difficultyBiasAndLocalDependenceReviewed',
  ],
};

function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, child]) => [key, canonical(child)]));
  }
  return value;
}

function canonicalIso(value, label) {
  if (typeof value !== 'string' || Number.isNaN(Date.parse(value))
    || new Date(Date.parse(value)).toISOString() !== value) {
    throw new Error(`${label} must be a canonical ISO timestamp.`);
  }
  return value;
}

function reviewableBrief(brief) {
  return {
    mediaId: brief.audioArtifact.mediaId,
    level: brief.level,
    productionVersion: brief.productionVersion,
    exposure: brief.exposure,
    recording: brief.recording,
    questions: brief.questions,
  };
}

export function diagnosticListeningPreproductionContentSha256(brief) {
  return createHash('sha256')
    .update(JSON.stringify(canonical(reviewableBrief(brief))))
    .digest('hex');
}

export function diagnosticListeningPreproductionSnapshotSha256(briefs) {
  const snapshot = [...briefs]
    .sort((left, right) => left.id.localeCompare(right.id))
    .map(brief => ({
      mediaId: brief.audioArtifact.mediaId,
      productionVersion: brief.productionVersion,
      contentSha256: diagnosticListeningPreproductionContentSha256(brief),
    }));
  return createHash('sha256').update(JSON.stringify(snapshot)).digest('hex');
}

function materialForRole(brief, role) {
  const recording = {
    targetDurationSeconds: [...brief.recording.targetDurationSeconds],
    paceWordsPerMinute: [...brief.recording.paceWordsPerMinute],
    delivery: brief.recording.delivery,
    turns: brief.recording.turns.map(turn => ({ ...turn })),
  };
  const questions = role === 'assessment-reviewer'
    ? brief.questions.map(question => ({
      ...question,
      options: [...question.options],
      distractorRationales: [...question.distractorRationales],
    }))
    : brief.questions.map(question => ({
      subdomain: question.subdomain,
      prompt: question.prompt,
      options: [...question.options],
    }));
  return { level: brief.level, recording, questions };
}

export function createDiagnosticListeningPreproductionReviewPacket({
  role,
  level,
  briefs,
  generatedAt,
}) {
  if (!DIAGNOSTIC_LISTENING_PREPRODUCTION_ROLES.includes(role)) {
    throw new Error(`unsupported listening preproduction role: ${role}`);
  }
  canonicalIso(generatedAt, 'listening preproduction generatedAt');
  const selected = briefs.filter(brief => brief.level === level)
    .sort((left, right) => left.id.localeCompare(right.id));
  if (selected.length === 0) throw new Error(`no listening production briefs found for ${level}`);
  const checklist = CHECKLISTS[role];
  return {
    schemaVersion: 1,
    packetId: `english-listening-preproduction-v1:${level}:${role}`,
    snapshotSha256: diagnosticListeningPreproductionSnapshotSha256(selected),
    level,
    role,
    generatedAt,
    privacy: 'PRIVATE_ASSESSMENT_REVIEW_MATERIAL_DO_NOT_PUBLISH',
    reviewer: { id: '', affiliation: '', attestsIndependentHumanReview: false },
    reviewedAt: '',
    instructions: [
      'Review every testlet independently against the role-specific checklist.',
      'Do not edit transcripts, questions, options, keys or rationales inside this receipt.',
      'Use CHANGES_REQUESTED with a concrete comment when any criterion fails.',
      'APPROVED requires every checklist value to be true and a stable reviewer identity.',
    ],
    entries: selected.map(brief => ({
      mediaId: brief.audioArtifact.mediaId,
      productionVersion: brief.productionVersion,
      contentSha256: diagnosticListeningPreproductionContentSha256(brief),
      material: materialForRole(brief, role),
      decision: 'PENDING',
      checklist: Object.fromEntries(checklist.map(key => [key, null])),
      comments: '',
    })),
  };
}

export function validateDiagnosticListeningPreproductionReviewPacket(packet, briefs) {
  if (!packet || typeof packet !== 'object' || Array.isArray(packet) || packet.schemaVersion !== 1) {
    throw new Error('invalid listening preproduction review receipt');
  }
  if (!DIAGNOSTIC_LISTENING_PREPRODUCTION_ROLES.includes(packet.role)) {
    throw new Error(`${packet.packetId ?? 'packet'}: invalid reviewer role`);
  }
  if (!REVIEWER.test(packet.reviewer?.id ?? '')
    || packet.reviewer?.attestsIndependentHumanReview !== true) {
    throw new Error(`${packet.packetId}: stable independent reviewer identity is required`);
  }
  canonicalIso(packet.reviewedAt, `${packet.packetId} reviewedAt`);
  const selected = briefs.filter(brief => brief.level === packet.level)
    .sort((left, right) => left.id.localeCompare(right.id));
  if (selected.length === 0
    || packet.snapshotSha256 !== diagnosticListeningPreproductionSnapshotSha256(selected)) {
    throw new Error(`${packet.packetId}: review snapshot is stale`);
  }
  if (!Array.isArray(packet.entries) || packet.entries.length !== selected.length) {
    throw new Error(`${packet.packetId}: receipt must cover every ${packet.level} testlet exactly once`);
  }
  const entries = new Map(packet.entries.map(entry => [entry.mediaId, entry]));
  if (entries.size !== selected.length) throw new Error(`${packet.packetId}: duplicate review entry`);
  const checklist = CHECKLISTS[packet.role];
  const receiptSha256 = createHash('sha256').update(JSON.stringify(canonical(packet))).digest('hex');
  return selected.map(brief => {
    const mediaId = brief.audioArtifact.mediaId;
    const entry = entries.get(mediaId);
    const contentSha256 = diagnosticListeningPreproductionContentSha256(brief);
    if (!entry
      || entry.productionVersion !== brief.productionVersion
      || entry.contentSha256 !== contentSha256
      || JSON.stringify(canonical(entry.material)) !== JSON.stringify(canonical(materialForRole(brief, packet.role)))) {
      throw new Error(`${packet.packetId}: ${mediaId} content is missing, changed or stale`);
    }
    if (!['APPROVED', 'CHANGES_REQUESTED'].includes(entry.decision)) {
      throw new Error(`${packet.packetId}: ${mediaId} decision is incomplete`);
    }
    if (!entry.checklist
      || Object.keys(entry.checklist).sort().join('|') !== [...checklist].sort().join('|')
      || checklist.some(key => typeof entry.checklist[key] !== 'boolean')) {
      throw new Error(`${packet.packetId}: ${mediaId} checklist is incomplete`);
    }
    if (entry.decision === 'APPROVED' && checklist.some(key => entry.checklist[key] !== true)) {
      throw new Error(`${packet.packetId}: ${mediaId} approval requires every checklist criterion`);
    }
    if (entry.decision === 'CHANGES_REQUESTED' && String(entry.comments ?? '').trim().length < 10) {
      throw new Error(`${packet.packetId}: ${mediaId} requested changes need concrete comments`);
    }
    return {
      mediaId,
      productionVersion: brief.productionVersion,
      contentSha256,
      decision: entry.decision,
      reviewedAt: packet.reviewedAt,
      reviewer: { id: packet.reviewer.id.trim(), role: packet.role, receiptSha256 },
    };
  });
}

export function compileDiagnosticListeningPreproductionApprovals({ briefs, packets }) {
  const signatures = packets.flatMap(packet =>
    validateDiagnosticListeningPreproductionReviewPacket(packet, briefs));
  const approvals = [];
  for (const brief of [...briefs].sort((left, right) => left.id.localeCompare(right.id))) {
    const mediaId = brief.audioArtifact.mediaId;
    const relevant = signatures.filter(signature => signature.mediaId === mediaId);
    if (relevant.some(signature => signature.decision === 'CHANGES_REQUESTED')) {
      throw new Error(`${mediaId}: changes were requested; preproduction cannot be approved`);
    }
    for (const role of DIAGNOSTIC_LISTENING_PREPRODUCTION_ROLES) {
      if (relevant.filter(signature => signature.reviewer.role === role).length !== 1) {
        throw new Error(`${mediaId}: exactly one ${role} approval is required`);
      }
    }
    if (new Set(relevant.map(signature => signature.reviewer.id)).size !== relevant.length) {
      throw new Error(`${mediaId}: linguistic and assessment reviewers must be independent`);
    }
    const contentSha256 = diagnosticListeningPreproductionContentSha256(brief);
    if (relevant.some(signature => signature.contentSha256 !== contentSha256)) {
      throw new Error(`${mediaId}: reviewers signed different content`);
    }
    approvals.push({
      mediaId,
      productionVersion: brief.productionVersion,
      contentSha256,
      reviewedAt: relevant.map(signature => signature.reviewedAt).sort().at(-1),
      reviewers: DIAGNOSTIC_LISTENING_PREPRODUCTION_ROLES.map(role =>
        relevant.find(signature => signature.reviewer.role === role).reviewer),
    });
  }
  return {
    manifestVersion: DIAGNOSTIC_LISTENING_PREPRODUCTION_MANIFEST_VERSION,
    updatedAt: approvals.map(approval => approval.reviewedAt).sort().at(-1),
    approvals,
  };
}

export function diagnosticListeningPreproductionReadiness(briefs, manifest) {
  const blockers = [];
  if (manifest?.manifestVersion !== DIAGNOSTIC_LISTENING_PREPRODUCTION_MANIFEST_VERSION) {
    blockers.push('PREPRODUCTION_MANIFEST_VERSION_INVALID');
  }
  if (!Array.isArray(manifest?.approvals)) blockers.push('PREPRODUCTION_APPROVALS_INVALID');
  const approvals = new Map((manifest?.approvals ?? []).map(approval => [approval.mediaId, approval]));
  if (approvals.size !== (manifest?.approvals ?? []).length) blockers.push('PREPRODUCTION_APPROVAL_IDS_DUPLICATED');
  let approved = 0;
  for (const brief of briefs) {
    const approval = approvals.get(brief.audioArtifact.mediaId);
    if (!approval) continue;
    const roles = approval.reviewers?.map(reviewer => reviewer.role) ?? [];
    const identities = approval.reviewers?.map(reviewer => reviewer.id) ?? [];
    const receipts = approval.reviewers?.map(reviewer => reviewer.receiptSha256) ?? [];
    const valid = approval.productionVersion === brief.productionVersion
      && approval.contentSha256 === diagnosticListeningPreproductionContentSha256(brief)
      && DIAGNOSTIC_LISTENING_PREPRODUCTION_ROLES.every(role => roles.filter(candidate => candidate === role).length === 1)
      && identities.length === 2
      && identities.every(identity => REVIEWER.test(identity))
      && new Set(identities).size === 2
      && receipts.length === 2
      && receipts.every(receipt => SHA256.test(receipt))
      && SHA256.test(approval.contentSha256 ?? '');
    if (valid) approved += 1;
    else blockers.push('PREPRODUCTION_APPROVAL_STALE_OR_INVALID');
  }
  if (approved !== briefs.length) blockers.push('PREPRODUCTION_APPROVALS_INCOMPLETE');
  return {
    ready: blockers.length === 0,
    approvedBriefs: approved,
    requiredBriefs: briefs.length,
    blockers: [...new Set(blockers)],
  };
}
