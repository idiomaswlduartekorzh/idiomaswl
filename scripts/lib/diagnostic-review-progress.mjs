import { isDeepStrictEqual } from 'node:util';

import {
  createDiagnosticReviewPacket,
  reviewBasisSha256,
  reviewContentSha256,
  validateCompletedDiagnosticReviewPacket,
} from './diagnostic-review-workflow.mjs';

export const DIAGNOSTIC_BATCH_REVIEW_ROLES = [
  'linguistic-reviewer',
  'assessment-reviewer',
];

function identity(kind, itemId) {
  return `${kind}:${itemId}`;
}

function recordIdentity(record, skill) {
  return skill === 'writing'
    ? identity('writing', record.publicPrompt.id)
    : identity('objective', record.publicItem.id);
}

function currentCandidatesForCell({ level, skill, objectiveCandidates, writingCandidates }) {
  if (skill === 'writing') {
    return writingCandidates.filter(record => record.exposure === 'reserved'
      && record.status === 'reserved'
      && record.publicPrompt.levelCandidate === level);
  }
  return objectiveCandidates.filter(record => record.exposure === 'reserved'
    && record.status === 'reserved'
    && record.publicItem.levelCandidate === level
    && record.publicItem.skill === skill);
}

function expectedEntryMap(records, skill) {
  return new Map(records.map(record => {
    const kind = skill === 'writing' ? 'writing' : 'objective';
    const itemId = skill === 'writing' ? record.publicPrompt.id : record.publicItem.id;
    const contentVersion = skill === 'writing'
      ? record.publicPrompt.contentVersion
      : record.publicItem.contentVersion;
    return [identity(kind, itemId), {
      kind,
      itemId,
      contentVersion,
      contentSha256: reviewContentSha256(kind, record),
      reviewBasisSha256: reviewBasisSha256(kind, record),
    }];
  }));
}

function validateExactEntries(packet, expected, expectedLevel, expectedSkill) {
  if (!Array.isArray(packet.entries) || packet.entries.length !== expected.size) {
    throw new Error('ENTRY_SET_MISMATCH');
  }
  const seen = new Set();
  for (const entry of packet.entries) {
    const key = identity(entry.kind, entry.itemId);
    if (seen.has(key)) throw new Error('DUPLICATE_ENTRY');
    seen.add(key);
    const current = expected.get(key);
    if (!current) throw new Error('ENTRY_SET_MISMATCH');
    if (entry.contentVersion !== current.contentVersion) throw new Error('STALE_CONTENT_VERSION');
    if (entry.contentSha256 !== current.contentSha256) throw new Error('STALE_CONTENT_HASH');
    if (entry.reviewBasisSha256 !== current.reviewBasisSha256) throw new Error('STALE_REVIEW_BASIS');
    if (entry.level !== expectedLevel || entry.skill !== expectedSkill) throw new Error('WRONG_CELL');
  }
}

function validateCurrentTemplate(packet, { packageId, level, skill, role, records }) {
  if (packet.packetId !== `${packageId}:${level}:${skill}:${role}` || packet.role !== role) {
    throw new Error('WRONG_PACKET_HEADER');
  }
  const expected = expectedEntryMap(records, skill);
  validateExactEntries(packet, expected, level, skill);
  const expectedPacket = createDiagnosticReviewPacket({
    role,
    packetId: packet.packetId,
    generatedAt: packet.generatedAt,
    objectiveCandidates: skill === 'writing' ? [] : records,
    writingCandidates: skill === 'writing' ? records : [],
  });
  const expectedTemplateEntries = new Map(expectedPacket.entries.map(entry => [
    identity(entry.kind, entry.itemId), { material: entry.material, checklist: entry.checklist },
  ]));
  if (packet.entries.some(entry => !isDeepStrictEqual(
    entry.material,
    expectedTemplateEntries.get(identity(entry.kind, entry.itemId))?.material,
  ))) {
    throw new Error('REVIEW_MATERIAL_MISMATCH');
  }
  if (packet.entries.some(entry => !isDeepStrictEqual(
    entry.checklist,
    expectedTemplateEntries.get(identity(entry.kind, entry.itemId))?.checklist,
  ))) {
    throw new Error('STALE_REVIEW_BASIS');
  }
  if (packet.reviewer?.id !== '' || packet.reviewer?.attestsIndependentHumanReview !== false
    || packet.reviewer?.affiliation !== '' || packet.reviewedAt !== '') {
    throw new Error('TEMPLATE_CONTAINS_REVIEW');
  }
  if (packet.entries.some(entry => entry.decision !== 'PENDING'
    || Object.values(entry.checklist ?? {}).some(value => value !== null))) {
    throw new Error('TEMPLATE_CONTAINS_DECISION');
  }
}

function validateCurrentCompleted(packet, context) {
  const { packageId, level, skill, role, records, objectiveCandidates, writingCandidates } = context;
  if (packet.packetId !== `${packageId}:${level}:${skill}:${role}` || packet.role !== role) {
    throw new Error('WRONG_PACKET_HEADER');
  }
  const expected = expectedEntryMap(records, skill);
  validateExactEntries(packet, expected, level, skill);
  const signatures = validateCompletedDiagnosticReviewPacket(
    packet,
    objectiveCandidates,
    writingCandidates,
  );
  const actual = new Set(signatures.map(signature => identity(signature.kind, signature.itemId)));
  if (actual.size !== expected.size || [...expected.keys()].some(key => !actual.has(key))) {
    throw new Error('ENTRY_SET_MISMATCH');
  }
  return signatures;
}

function safeValidationCode(error) {
  const message = error instanceof Error ? error.message : '';
  if (message.includes('content version mismatch')) return 'STALE_CONTENT_VERSION';
  if (message.includes('content hash mismatch')) return 'STALE_CONTENT_HASH';
  if (message.includes('review basis mismatch')) return 'STALE_REVIEW_BASIS';
  if (message.includes('review material mismatch')) return 'REVIEW_MATERIAL_MISMATCH';
  if (message.includes('review cell metadata mismatch')) return 'WRONG_CELL';
  if (message.includes('duplicate review entry')) return 'DUPLICATE_ENTRY';
  if (message.includes('checklist is incomplete')) return 'INCOMPLETE_CHECKLIST';
  if (message.includes('decision is not complete')) return 'INCOMPLETE_DECISION';
  if (message.includes('independent human review')) return 'INDEPENDENCE_NOT_ATTESTED';
  if (message.includes('reviewer id is required')) return 'REVIEWER_ID_MISSING';
  if (message.includes('review date is invalid')) return 'REVIEW_DATE_INVALID';
  if (message.includes('requested changes require')) return 'CHANGE_COMMENT_INCOMPLETE';
  if (/^[A-Z][A-Z_]+$/u.test(message)) return message;
  return 'INVALID_RECEIPT';
}

function assertUniqueCandidateAssignments(levels, skills, objectiveCandidates, writingCandidates) {
  const assigned = new Set();
  for (const level of levels) {
    for (const skill of skills) {
      const records = currentCandidatesForCell({ level, skill, objectiveCandidates, writingCandidates });
      if (records.length === 0) throw new Error(`EMPTY_EXPECTED_CELL:${level}:${skill}`);
      for (const record of records) {
        const key = recordIdentity(record, skill);
        if (assigned.has(key)) throw new Error(`DUPLICATE_CANDIDATE_ASSIGNMENT:${level}:${skill}`);
        assigned.add(key);
      }
    }
  }
}

/**
 * Produces an aggregate-only progress report. Artifacts contain already parsed private
 * packets, but reviewer identities, item IDs, content, keys and comments never leave
 * this function in the returned report.
 */
export function auditDiagnosticBankReviewProgress({
  packageId,
  levels,
  skills,
  objectiveCandidates,
  writingCandidates,
  recordedListeningCandidates,
  artifacts,
}) {
  if (!packageId?.trim()) throw new Error('REVIEW_PACKAGE_ID_REQUIRED');
  if (!Array.isArray(levels) || !levels.length || new Set(levels).size !== levels.length) {
    throw new Error('INVALID_EXPECTED_LEVELS');
  }
  if (!Array.isArray(skills) || !skills.length || new Set(skills).size !== skills.length
    || skills.includes('listening')) {
    throw new Error('INVALID_EXPECTED_SKILLS');
  }
  assertUniqueCandidateAssignments(levels, skills, objectiveCandidates, writingCandidates);

  const expectedCells = new Set(levels.flatMap(level => skills.map(skill => `${level}:${skill}`)));
  const artifactMap = new Map();
  for (const artifact of artifacts) {
    const cellKey = `${artifact.level}:${artifact.skill}`;
    if (!expectedCells.has(cellKey)) throw new Error('UNEXPECTED_REVIEW_CELL');
    if (!DIAGNOSTIC_BATCH_REVIEW_ROLES.includes(artifact.role)) throw new Error('UNEXPECTED_REVIEW_ROLE');
    if (!['template', 'completed'].includes(artifact.state)) throw new Error('UNEXPECTED_REVIEW_ARTIFACT');
    const key = `${cellKey}:${artifact.role}:${artifact.state}`;
    if (artifactMap.has(key)) throw new Error('DUPLICATE_REVIEW_ARTIFACT');
    artifactMap.set(key, artifact);
  }

  const summary = {
    expectedBatches: levels.length * skills.length,
    expectedRoleReceipts: levels.length * skills.length * DIAGNOSTIC_BATCH_REVIEW_ROLES.length,
    currentTemplates: 0,
    missingTemplates: 0,
    currentCompletedReceipts: 0,
    missingCompletedReceipts: 0,
    invalidOrStaleArtifacts: 0,
    independentIdentityViolations: 0,
    batchesReadyToCompile: 0,
    batchesWithChangesRequested: 0,
    approvedEntrySignatures: 0,
    changesRequestedEntrySignatures: 0,
  };
  const cells = [];

  for (const level of levels) {
    for (const skill of skills) {
      const records = currentCandidatesForCell({ level, skill, objectiveCandidates, writingCandidates });
      const roleRows = [];
      const completed = new Map();
      let cellInvalid = false;
      let cellChangesRequested = false;
      for (const role of DIAGNOSTIC_BATCH_REVIEW_ROLES) {
        const templateArtifact = artifactMap.get(`${level}:${skill}:${role}:template`);
        const completedArtifact = artifactMap.get(`${level}:${skill}:${role}:completed`);
        let template = templateArtifact ? 'CURRENT' : 'MISSING';
        let receipt = completedArtifact ? 'CURRENT' : 'MISSING';
        let validationCode = null;

        if (templateArtifact) {
          try {
            if (templateArtifact.parseError) throw new Error('INVALID_JSON');
            validateCurrentTemplate(templateArtifact.packet, { packageId, level, skill, role, records });
            summary.currentTemplates += 1;
          } catch (error) {
            template = 'INVALID_OR_STALE';
            validationCode = safeValidationCode(error);
            summary.invalidOrStaleArtifacts += 1;
            cellInvalid = true;
          }
        } else {
          summary.missingTemplates += 1;
        }

        if (completedArtifact) {
          try {
            if (completedArtifact.parseError) throw new Error('INVALID_JSON');
            const signatures = validateCurrentCompleted(completedArtifact.packet, {
              packageId,
              level,
              skill,
              role,
              records,
              objectiveCandidates,
              writingCandidates,
            });
            completed.set(role, { packet: completedArtifact.packet, signatures });
            summary.currentCompletedReceipts += 1;
            summary.approvedEntrySignatures += signatures.filter(row => row.decision === 'APPROVED').length;
            const changes = signatures.filter(row => row.decision === 'CHANGES_REQUESTED').length;
            summary.changesRequestedEntrySignatures += changes;
            cellChangesRequested ||= changes > 0;
          } catch (error) {
            receipt = 'INVALID_OR_STALE';
            validationCode ??= safeValidationCode(error);
            summary.invalidOrStaleArtifacts += 1;
            cellInvalid = true;
          }
        } else {
          summary.missingCompletedReceipts += 1;
        }
        roleRows.push({ role, template, completedReceipt: receipt, validationCode });
      }

      const bothCompleted = DIAGNOSTIC_BATCH_REVIEW_ROLES.every(role => completed.has(role));
      let independentReviewerIdentities = null;
      if (bothCompleted) {
        independentReviewerIdentities = new Set(DIAGNOSTIC_BATCH_REVIEW_ROLES
          .map(role => completed.get(role).packet.reviewer.id.trim())).size
          === DIAGNOSTIC_BATCH_REVIEW_ROLES.length;
        if (!independentReviewerIdentities) {
          summary.independentIdentityViolations += 1;
          cellInvalid = true;
        }
      }
      let status = 'IN_PROGRESS';
      if (cellInvalid) status = 'INVALID';
      else if (cellChangesRequested) {
        status = 'CHANGES_REQUESTED';
        summary.batchesWithChangesRequested += 1;
      } else if (bothCompleted && independentReviewerIdentities) {
        status = 'READY_TO_COMPILE';
        summary.batchesReadyToCompile += 1;
      }
      cells.push({
        level,
        skill,
        candidateCount: records.length,
        status,
        independentReviewerIdentities,
        roles: roleRows,
      });
    }
  }

  const hasInvalid = summary.invalidOrStaleArtifacts > 0 || cells.some(cell => cell.status === 'INVALID');
  const ready = summary.batchesReadyToCompile === summary.expectedBatches
    && summary.currentCompletedReceipts === summary.expectedRoleReceipts
    && summary.batchesWithChangesRequested === 0
    && !hasInvalid;
  return {
    reportVersion: 'diagnostic-bank-review-progress-v1',
    packageId,
    decision: hasInvalid ? 'INVALID' : ready ? 'READY_TO_COMPILE' : 'REVIEW_IN_PROGRESS',
    privacy: 'AGGREGATE_ONLY_NO_ITEM_CONTENT_OR_REVIEWER_IDENTITIES',
    summary,
    cells,
    listening: recordedListeningCandidates.length === 0
      ? {
        status: 'NOT_BATCHABLE_RECORDED_CANDIDATES_MISSING',
        recordedCandidateCount: 0,
        note: 'Listening review starts only after private recordings are materialized and requires an additional independent audio-alignment role.',
      }
      : {
        status: 'SEPARATE_THREE_ROLE_REVIEW_REQUIRED',
        recordedCandidateCount: recordedListeningCandidates.length,
        note: 'Recorded listening candidates are outside this two-role editorial batch package.',
      },
  };
}
