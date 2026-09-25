import { createHash } from 'node:crypto';

export const DIAGNOSTIC_REVIEW_ROLES = [
  'linguistic-reviewer',
  'assessment-reviewer',
  'audio-alignment-reviewer',
];

const CHECKLISTS = {
  'linguistic-reviewer': [
    'targetLanguageAccurate',
    'wordingNaturalAndUnambiguous',
    'cefrDemandDefensible',
    'registerAndCultureAppropriate',
  ],
  'assessment-reviewer': [
    'constructAligned',
    'keyUniquelyDefensible',
    'distractorsPlausibleButWrong',
    'difficultyAndBiasReviewed',
  ],
  'audio-alignment-reviewer': [
    'listenedToCompleteSegment',
    'boundariesMatchManifest',
    'audibleEvidenceSupportsKey',
    'audioQualityDoesNotConfoundLevel',
  ],
};

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, child]) => [key, canonicalize(child)]));
  }
  return value;
}

export function reviewContentSha256(kind, record) {
  const content = kind === 'objective'
    ? { publicItem: record.publicItem, scoring: record.scoring, rationale: record.rationale, source: record.source }
    : { publicPrompt: record.publicPrompt, source: record.source };
  return createHash('sha256').update(JSON.stringify(canonicalize(content))).digest('hex');
}

function objectivePayload(record, role) {
  const common = {
    publicItem: record.publicItem,
    levelRange: record.levelRange,
    source: record.source,
    warnings: record.warnings ?? [],
  };
  if (role === 'assessment-reviewer') return { ...common, scoring: record.scoring, rationale: record.rationale };
  if (role === 'audio-alignment-reviewer') {
    return {
      publicItem: record.publicItem,
      source: record.source,
      alignment: record.publicItem.stimulus.kind === 'audio' ? record.publicItem.stimulus : null,
    };
  }
  return common;
}

function writingPayload(record) {
  return { publicPrompt: record.publicPrompt, source: record.source };
}

function appliesToRole(kind, record, role) {
  if (role !== 'audio-alignment-reviewer') return true;
  return kind === 'objective' && record.publicItem.skill === 'listening';
}

export function createDiagnosticReviewPacket({
  role,
  packetId,
  generatedAt,
  objectiveCandidates,
  writingCandidates,
}) {
  if (!DIAGNOSTIC_REVIEW_ROLES.includes(role)) throw new Error(`unsupported diagnostic review role: ${role}`);
  if (!packetId?.trim()) throw new Error('review packet id is required');
  if (Number.isNaN(Date.parse(generatedAt))) throw new Error('review packet generation date is invalid');
  const checklist = CHECKLISTS[role];
  const objective = objectiveCandidates
    .filter(record => record.exposure === 'reserved' && record.status === 'reserved' && appliesToRole('objective', record, role))
    .map(record => ({
      kind: 'objective',
      itemId: record.publicItem.id,
      contentVersion: record.publicItem.contentVersion,
      contentSha256: reviewContentSha256('objective', record),
      level: record.publicItem.levelCandidate,
      skill: record.publicItem.skill,
      material: objectivePayload(record, role),
      decision: 'PENDING',
      checklist: Object.fromEntries(checklist.map(key => [key, null])),
      comments: '',
    }));
  const writing = writingCandidates
    .filter(record => record.exposure === 'reserved' && record.status === 'reserved' && appliesToRole('writing', record, role))
    .map(record => ({
      kind: 'writing',
      itemId: record.publicPrompt.id,
      contentVersion: record.publicPrompt.contentVersion,
      contentSha256: reviewContentSha256('writing', record),
      level: record.publicPrompt.levelCandidate,
      skill: 'writing',
      material: writingPayload(record),
      decision: 'PENDING',
      checklist: Object.fromEntries(checklist.map(key => [key, null])),
      comments: '',
    }));
  return {
    schemaVersion: 1,
    packetId,
    role,
    generatedAt: new Date(generatedAt).toISOString(),
    privacy: 'PRIVATE_REVIEW_MATERIAL_DO_NOT_PUBLISH',
    reviewer: { id: '', affiliation: '', attestsIndependentHumanReview: false },
    reviewedAt: '',
    instructions: [
      'Review every assigned entry against the checklist without consulting another role’s decision.',
      'Set every checklist field to true and decision to APPROVED only when the current immutable content is acceptable.',
      'Use CHANGES_REQUESTED with a specific comment when any criterion fails; never edit item content inside this receipt.',
      'Enter a stable reviewer ID, review date, and attestIndependentHumanReview=true before compilation.',
    ],
    entries: [...objective, ...writing],
  };
}

function candidateMaps(objectiveCandidates, writingCandidates) {
  return {
    objective: new Map(objectiveCandidates.map(record => [record.publicItem.id, record])),
    writing: new Map(writingCandidates.map(record => [record.publicPrompt.id, record])),
  };
}

function validatePacketHeader(packet) {
  if (!packet || typeof packet !== 'object' || Array.isArray(packet)) throw new Error('review receipt must be an object');
  if (packet.schemaVersion !== 1) throw new Error('unsupported diagnostic review receipt schema');
  if (!DIAGNOSTIC_REVIEW_ROLES.includes(packet.role)) throw new Error('review receipt role is invalid');
  if (!packet.reviewer?.id?.trim()) throw new Error(`${packet.packetId ?? 'packet'}: reviewer id is required`);
  if (packet.reviewer.attestsIndependentHumanReview !== true) throw new Error(`${packet.packetId}: independent human review must be attested`);
  if (Number.isNaN(Date.parse(packet.reviewedAt))) throw new Error(`${packet.packetId}: review date is invalid`);
  if (!Array.isArray(packet.entries) || packet.entries.length === 0) throw new Error(`${packet.packetId}: review receipt has no entries`);
}

export function validateCompletedDiagnosticReviewPacket(packet, objectiveCandidates, writingCandidates) {
  validatePacketHeader(packet);
  const maps = candidateMaps(objectiveCandidates, writingCandidates);
  const seen = new Set();
  return packet.entries.map(entry => {
    const identity = `${entry.kind}:${entry.itemId}`;
    if (seen.has(identity)) throw new Error(`${packet.packetId}: duplicate review entry ${identity}`);
    seen.add(identity);
    if (!['objective', 'writing'].includes(entry.kind)) throw new Error(`${identity}: review kind is invalid`);
    const record = maps[entry.kind].get(entry.itemId);
    if (!record) throw new Error(`${identity}: candidate is unavailable`);
    if (!appliesToRole(entry.kind, record, packet.role)) throw new Error(`${identity}: ${packet.role} is not applicable`);
    const contentVersion = entry.kind === 'objective' ? record.publicItem.contentVersion : record.publicPrompt.contentVersion;
    if (entry.contentVersion !== contentVersion) throw new Error(`${identity}: content version mismatch`);
    if (entry.contentSha256 !== reviewContentSha256(entry.kind, record)) throw new Error(`${identity}: content hash mismatch`);
    if (!['APPROVED', 'CHANGES_REQUESTED'].includes(entry.decision)) throw new Error(`${identity}: decision is not complete`);
    const expectedChecklist = CHECKLISTS[packet.role];
    if (!entry.checklist || expectedChecklist.some(key => typeof entry.checklist[key] !== 'boolean')) {
      throw new Error(`${identity}: checklist is incomplete`);
    }
    if (entry.decision === 'APPROVED' && expectedChecklist.some(key => entry.checklist[key] !== true)) {
      throw new Error(`${identity}: approval requires every checklist criterion`);
    }
    if (entry.decision === 'CHANGES_REQUESTED' && String(entry.comments ?? '').trim().length < 10) {
      throw new Error(`${identity}: requested changes require a specific comment`);
    }
    return {
      kind: entry.kind,
      itemId: entry.itemId,
      contentVersion,
      contentSha256: entry.contentSha256,
      skill: entry.kind === 'objective' ? record.publicItem.skill : 'writing',
      decision: entry.decision,
      reviewedAt: new Date(packet.reviewedAt).toISOString(),
      reviewer: { id: packet.reviewer.id.trim(), role: packet.role },
    };
  });
}

function requiredRoles(signature) {
  if (signature.kind === 'objective' && signature.skill === 'listening') {
    return ['linguistic-reviewer', 'assessment-reviewer', 'audio-alignment-reviewer'];
  }
  return ['linguistic-reviewer', 'assessment-reviewer'];
}

export function compileDiagnosticApprovals(validatedSignatures) {
  const grouped = new Map();
  for (const signature of validatedSignatures.flat()) {
    const key = `${signature.kind}:${signature.itemId}`;
    const group = grouped.get(key) ?? [];
    if (group.some(existing => existing.reviewer.role === signature.reviewer.role)) {
      throw new Error(`${key}: duplicate ${signature.reviewer.role} signature`);
    }
    group.push(signature);
    grouped.set(key, group);
  }

  const objectiveApprovals = [];
  const writingApprovals = [];
  const incomplete = [];
  const changesRequested = [];
  for (const [identity, signatures] of grouped) {
    if (signatures.some(signature => signature.decision === 'CHANGES_REQUESTED')) {
      changesRequested.push(identity);
      continue;
    }
    const [first] = signatures;
    if (signatures.some(signature => signature.contentVersion !== first.contentVersion || signature.contentSha256 !== first.contentSha256)) {
      throw new Error(`${identity}: reviewers signed different content`);
    }
    const roles = requiredRoles(first);
    const missingRoles = roles.filter(role => !signatures.some(signature => signature.reviewer.role === role));
    if (missingRoles.length) {
      incomplete.push({ identity, missingRoles });
      continue;
    }
    const relevant = roles.map(role => signatures.find(signature => signature.reviewer.role === role));
    if (new Set(relevant.map(signature => signature.reviewer.id)).size !== relevant.length) {
      throw new Error(`${identity}: reviewers must be independent identities`);
    }
    const approval = {
      itemId: first.itemId,
      contentVersion: first.contentVersion,
      contentSha256: first.contentSha256,
      reviewedAt: relevant.map(signature => signature.reviewedAt).sort().at(-1),
      reviewers: relevant.map(signature => signature.reviewer),
    };
    (first.kind === 'objective' ? objectiveApprovals : writingApprovals).push(approval);
  }
  objectiveApprovals.sort((left, right) => left.itemId.localeCompare(right.itemId));
  writingApprovals.sort((left, right) => left.itemId.localeCompare(right.itemId));
  incomplete.sort((left, right) => left.identity.localeCompare(right.identity));
  changesRequested.sort();
  return { objectiveApprovals, writingApprovals, incomplete, changesRequested };
}
