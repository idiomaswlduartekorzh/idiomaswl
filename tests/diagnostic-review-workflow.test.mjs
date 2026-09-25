import assert from 'node:assert/strict';
import test from 'node:test';

import { ENGLISH_DIAGNOSTIC_LISTENING_CANDIDATES } from '../src/server/diagnostic/bank/listening.en.ts';
import { ENGLISH_DIAGNOSTIC_READING_CANDIDATES } from '../src/server/diagnostic/bank/reading.en.ts';
import { ENGLISH_DIAGNOSTIC_WRITING_CANDIDATES } from '../src/server/diagnostic/bank/writing.en.ts';
import {
  compileDiagnosticApprovals,
  createDiagnosticReviewPacket,
  validateCompletedDiagnosticReviewPacket,
} from '../scripts/lib/diagnostic-review-workflow.mjs';

const generatedAt = '2026-09-25T12:00:00.000Z';
const reading = ENGLISH_DIAGNOSTIC_READING_CANDIDATES.slice(0, 1);
const writing = ENGLISH_DIAGNOSTIC_WRITING_CANDIDATES.slice(0, 1);

function complete(packet, reviewerId) {
  return {
    ...packet,
    reviewer: { id: reviewerId, affiliation: 'Independent review', attestsIndependentHumanReview: true },
    reviewedAt: generatedAt,
    entries: packet.entries.map(entry => ({
      ...entry,
      decision: 'APPROVED',
      checklist: Object.fromEntries(Object.keys(entry.checklist).map(key => [key, true])),
      comments: 'Reviewed against the declared construct.',
    })),
  };
}

function packet(role, objectiveCandidates = reading, writingCandidates = writing) {
  return createDiagnosticReviewPacket({ role, packetId: `fixture:${role}`, generatedAt, objectiveCandidates, writingCandidates });
}

test('role packets expose only the evidence each independent reviewer needs', () => {
  const linguistic = packet('linguistic-reviewer');
  const assessment = packet('assessment-reviewer');
  assert.equal(linguistic.entries.length, 2);
  assert.equal('scoring' in linguistic.entries[0].material, false);
  assert.equal('rationale' in linguistic.entries[0].material, false);
  assert.equal('scoring' in assessment.entries[0].material, true);
  assert.equal(assessment.entries[0].decision, 'PENDING');
  assert.equal(assessment.reviewer.attestsIndependentHumanReview, false);
});

test('completed receipts remain bound to current version and hash', () => {
  const completed = complete(packet('linguistic-reviewer'), 'linguist-1');
  assert.equal(validateCompletedDiagnosticReviewPacket(completed, reading, writing).length, 2);
  const tampered = structuredClone(completed);
  tampered.entries[0].contentSha256 = '0'.repeat(64);
  assert.throws(() => validateCompletedDiagnosticReviewPacket(tampered, reading, writing), /content hash mismatch/);
});

test('approval compilation requires complete checklists and independent roles', () => {
  const linguistic = complete(packet('linguistic-reviewer'), 'linguist-1');
  const assessment = complete(packet('assessment-reviewer'), 'assessor-1');
  const signatures = [linguistic, assessment].map(receipt => validateCompletedDiagnosticReviewPacket(receipt, reading, writing));
  const compiled = compileDiagnosticApprovals(signatures);
  assert.equal(compiled.objectiveApprovals.length, 1);
  assert.equal(compiled.writingApprovals.length, 1);
  assert.equal(compiled.incomplete.length, 0);

  const samePerson = complete(packet('assessment-reviewer'), 'linguist-1');
  assert.throws(() => compileDiagnosticApprovals([
    signatures[0],
    validateCompletedDiagnosticReviewPacket(samePerson, reading, writing),
  ]), /independent identities/);
});

test('listening approval additionally requires an audio-alignment reviewer', () => {
  const recycled = ENGLISH_DIAGNOSTIC_LISTENING_CANDIDATES[0];
  const reserved = { ...recycled, exposure: 'reserved', status: 'reserved', review: { status: 'draft' } };
  const candidates = [reserved];
  const linguistic = complete(packet('linguistic-reviewer', candidates, []), 'linguist-1');
  const assessment = complete(packet('assessment-reviewer', candidates, []), 'assessor-1');
  const firstTwo = [linguistic, assessment].map(receipt => validateCompletedDiagnosticReviewPacket(receipt, candidates, []));
  const incomplete = compileDiagnosticApprovals(firstTwo);
  assert.equal(incomplete.objectiveApprovals.length, 0);
  assert.deepEqual(incomplete.incomplete[0].missingRoles, ['audio-alignment-reviewer']);

  const audio = complete(packet('audio-alignment-reviewer', candidates, []), 'audio-1');
  const compiled = compileDiagnosticApprovals([
    ...firstTwo,
    validateCompletedDiagnosticReviewPacket(audio, candidates, []),
  ]);
  assert.equal(compiled.objectiveApprovals.length, 1);
  assert.equal(compiled.objectiveApprovals[0].reviewers.length, 3);
});

test('changes requested never compile into an approval', () => {
  const linguistic = complete(packet('linguistic-reviewer'), 'linguist-1');
  linguistic.entries[0] = { ...linguistic.entries[0], decision: 'CHANGES_REQUESTED', comments: 'The target level is not defensible.' };
  const assessment = complete(packet('assessment-reviewer'), 'assessor-1');
  const compiled = compileDiagnosticApprovals([
    validateCompletedDiagnosticReviewPacket(linguistic, reading, writing),
    validateCompletedDiagnosticReviewPacket(assessment, reading, writing),
  ]);
  assert.deepEqual(compiled.changesRequested, ['objective:en-a1-reading-01-q1']);
  assert.equal(compiled.objectiveApprovals.length, 0);
  assert.equal(compiled.writingApprovals.length, 1);
});
