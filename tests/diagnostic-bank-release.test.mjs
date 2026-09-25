import assert from 'node:assert/strict';
import test from 'node:test';

import { ENGLISH_DIAGNOSTIC_READING_CANDIDATES } from '../src/server/diagnostic/bank/reading.en.ts';
import {
  diagnosticObjectiveContentSha256,
  diagnosticWritingContentSha256,
  releaseApprovedObjectiveBank,
  releaseApprovedWritingBank,
} from '../src/server/diagnostic/bank/release.ts';
import { ENGLISH_DIAGNOSTIC_WRITING_CANDIDATES } from '../src/server/diagnostic/bank/writing.en.ts';

const manifest = (objectiveApprovals = [], writingApprovals = []) => ({
  manifestVersion: 'fixture-v1', updatedAt: '2026-09-25T12:00:00.000Z', objectiveApprovals, writingApprovals,
});
const reviewers = [
  { id: 'linguist-1', role: 'linguistic-reviewer' },
  { id: 'assessor-1', role: 'assessment-reviewer' },
];

test('promotes only an immutable objective candidate with independent required reviews', () => {
  const record = ENGLISH_DIAGNOSTIC_READING_CANDIDATES[0];
  const approval = {
    itemId: record.publicItem.id, contentVersion: record.publicItem.contentVersion,
    contentSha256: diagnosticObjectiveContentSha256(record), reviewedAt: '2026-09-25T12:00:00.000Z', reviewers,
  };
  const released = releaseApprovedObjectiveBank([record], manifest([approval]));
  assert.equal(released.length, 1);
  assert.equal(released[0].status, 'pilot');
  assert.equal(released[0].review.status, 'approved');
  assert.equal(released[0].review.contentSha256, approval.contentSha256);
  assert.equal(record.review.status, 'draft');
});

test('fails closed for changed content, duplicate reviewers and previously public media', async () => {
  const record = ENGLISH_DIAGNOSTIC_READING_CANDIDATES[0];
  const base = {
    itemId: record.publicItem.id, contentVersion: record.publicItem.contentVersion,
    contentSha256: diagnosticObjectiveContentSha256(record), reviewedAt: '2026-09-25T12:00:00.000Z', reviewers,
  };
  assert.throws(() => releaseApprovedObjectiveBank([record], manifest([{ ...base, contentSha256: '0'.repeat(64) }])), /content hash mismatch/);
  assert.throws(() => releaseApprovedObjectiveBank([record], manifest([{ ...base, reviewers: [reviewers[0], { ...reviewers[1], id: reviewers[0].id }] }])), /independent identities/);
  const { ENGLISH_DIAGNOSTIC_LISTENING_CANDIDATES } = await import('../src/server/diagnostic/bank/listening.en.ts');
  const listening = ENGLISH_DIAGNOSTIC_LISTENING_CANDIDATES[0];
  assert.throws(() => releaseApprovedObjectiveBank([listening], manifest([{
    itemId: listening.publicItem.id, contentVersion: listening.publicItem.contentVersion,
    contentSha256: diagnosticObjectiveContentSha256(listening), reviewedAt: base.reviewedAt,
    reviewers: [...reviewers, { id: 'audio-1', role: 'audio-alignment-reviewer' }],
  }])), /exposed content cannot enter/);
});

test('writing promotion binds the prompt hash and two review roles', () => {
  const record = ENGLISH_DIAGNOSTIC_WRITING_CANDIDATES[0];
  const approval = {
    itemId: record.publicPrompt.id, contentVersion: record.publicPrompt.contentVersion,
    contentSha256: diagnosticWritingContentSha256(record), reviewedAt: '2026-09-25T12:00:00.000Z', reviewers,
  };
  const released = releaseApprovedWritingBank([record], manifest([], [approval]));
  assert.equal(released[0].status, 'pilot');
  assert.equal(released[0].review.status, 'approved');
  assert.throws(() => releaseApprovedWritingBank([record], manifest([], [{ ...approval, reviewers: [reviewers[0]] }])), /missing assessment-reviewer/);
});

test('the committed approval manifest keeps both operational registries empty', async () => {
  const { ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK, ENGLISH_DIAGNOSTIC_WRITING_BANK } = await import('../src/server/diagnostic/bank/index.ts');
  assert.equal(ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK.length, 0);
  assert.equal(ENGLISH_DIAGNOSTIC_WRITING_BANK.length, 0);
});
