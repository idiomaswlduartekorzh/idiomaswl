// Read-only proof of a proposed display permutation, not runtime or human approval.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { auditItems } from './toefl-listening-length-audit-draft.mjs';
import { screen } from './toefl-option-length-screen-draft.mjs';
import { scoreToeflListeningAttempt } from '../src/lib/toefl/listening-contract.ts';

const root = new URL('../', import.meta.url);
const read = path => readFileSync(new URL(path, root));
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const candidateBytes = read('docs/toefl-listening-set1-order-candidate.json');
const candidate = JSON.parse(candidateBytes);
assert.equal(candidate.status, 'draft-product-academic-review-required');
assert.equal(candidate.reviewer, null);
assert.equal(candidate.items.length, 3);
assert.equal(new Set(candidate.items.map(r => r.itemId)).size, 3);
const before = auditItems.filter(r => r.set === 1);
const original = JSON.stringify(before);
function permute(row, order) {
  assert.deepEqual([...order].sort(), [...row.optionIds].sort(), 'Each original ID must occur exactly once');
  const correctId = row.optionIds[row.correct];
  return { ...row, options: order.map(id => row.options[row.optionIds.indexOf(id)]),
    optionIds: [...order], correct: order.indexOf(correctId) };
}
const changes = new Map(candidate.items.map(r => [r.itemId, r.proposedOptionIds]));
assert.ok(candidate.items.every(r => before.some(q => q.id === r.itemId)));
const after = before.map(row => changes.has(row.id) ? permute(row, changes.get(row.id)) : structuredClone(row));
const count = rows => Object.fromEntries(['A', 'B', 'C', 'D'].map((label, i) => [label, rows.filter(r => r.correct === i).length]));
assert.deepEqual(count(after.slice(0, 8)), { A: 2, B: 2, C: 2, D: 2 });
assert.deepEqual(count(after), { A: 8, B: 8, C: 9, D: 9 });
assert.equal(after.filter((r, i) => JSON.stringify(r) !== JSON.stringify(before[i])).length, 3);
let scoredOptions = 0;
for (const [i, row] of after.entries()) {
  const source = before[i];
  assert.equal(row.id, source.id);
  assert.equal(row.prompt, source.prompt);
  assert.equal(row.audioUrl, source.audioUrl);
  const toMap = r => r.optionIds.map((id, i) => [id, r.options[i]]).sort((a, b) => a[0].localeCompare(b[0]));
  assert.deepEqual(toMap(row), toMap(source));
  const config = r => ({ scoringVersion: 'draft-id-parity', disclosure: 'Not official scoring.', items: [{
    itemId: r.id, optionIds: r.optionIds, correctOptionId: r.optionIds[r.correct], maxRawPoints: 1,
  }] });
  for (const optionId of source.optionIds) {
    const input = { attemptId: 'draft', closeId: 'draft-close', presentedItemIds: [row.id], responses: { [row.id]: optionId } };
    assert.deepEqual(scoreToeflListeningAttempt(config(source), input), scoreToeflListeningAttempt(config(row), input));
    scoredOptions++;
  }
}
assert.equal(scoredOptions, 136);
assert.equal(JSON.stringify(before), original);
assert.throws(() => permute(before[0], before[0].optionIds.slice(0, 3)));
assert.throws(() => permute(before[0], Array(4).fill(before[0].optionIds[0])));
assert.throws(() => permute(before[0], before[1].optionIds));
const oldLengths = screen(before), newLengths = screen(after);
for (const metric of Object.keys(oldLengths.totals)) {
  for (const statistic of ['unique', 'tied', 'expectedRate']) {
    assert.equal(newLengths.totals[metric][statistic], oldLengths.totals[metric][statistic]);
  }
}
const scope = rows => ({ questions: rows.length, distribution: count(rows) });
const files = ['src/data/mocks/toefl-set-1.ts', 'src/data/toefl/listening-fixed-sets-1-5.ts',
  'src/data/mocks/toefl-fixed-form.ts', 'src/lib/toefl/listening-contract.ts',
  'src/app/(site)/practica/toefl/listening/simulacros/practica/[mockId]/ToeflListeningSectionRunner.tsx',
  'docs/toefl-listening-set1-options-candidate.json', 'docs/toefl-listening-set1-order-check-draft.mjs'];
console.log(JSON.stringify({ status: 'draft-tested-not-approved-or-applied', candidateSha256: hash(candidateBytes),
  tests: { scoredOptions, unchangedIdTextPairs: 136, invalidPermutationsRejected: 3, inputNotMutated: true },
  before: { firstFive: scope(before.slice(0, 5)), firstEight: scope(before.slice(0, 8)), fullSet: scope(before) },
  after: { firstFive: scope(after.slice(0, 5)), firstEight: scope(after.slice(0, 8)), fullSet: scope(after) },
  changedItems: after.flatMap((row, i) => changes.has(row.id) ? [{
    id: row.id, questionNumber: i + 1, correctLabelBefore: String.fromCharCode(65 + before[i].correct),
    correctLabelAfter: String.fromCharCode(65 + row.correct), correctOptionId: row.optionIds[row.correct],
    proposedDisplay: row.optionIds.map((id, j) => ({ label: String.fromCharCode(65 + j), id, text: row.options[j] })),
  }] : []),
  lengthScreen: { before: oldLengths, after: newLengths },
  caveat: 'Exact quotas here describe one editorial proposal, not a general fixed quota rule, significance test, randomization strategy or certification of absence of bias. Existing attempts need explicit order-version compatibility before implementation.',
  sourceHashes: files.map(path => ({ path, sha256: hash(read(path)) })) }, null, 2));
