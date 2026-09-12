import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { objectiveRows } from './lib/ielts-answer-key-audit.mjs';

const fixtureUrl = new URL('../tests/fixtures/ielts/set-1-reading-cambridge5-test2-reference.json', import.meta.url);
const bytes = fs.readFileSync(fixtureUrl);
const expectedSha256 = '73aa7df9da8f3c50c5c843e0f51d95f0a7b4e9e4bcb765a3b426f198493b6636';
assert.equal(createHash('sha256').update(bytes).digest('hex'), expectedSha256, 'Independent Reading reference changed; review sources and pin a new hash explicitly');
const reference = JSON.parse(bytes);
assert.equal(reference.sourceIdentity, 'Cambridge IELTS 5 Academic, Test 2, Reading');
assert.equal(reference.references.length, 2);

const { default: mock } = await import('../src/data/mocks/ielts-set-1.ts');
const canonical = value => String(value).toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, ' ').trim();
const canonicalSet = values => [...new Set(values.map(canonical))].sort();
const live = objectiveRows(mock).filter(row => row.skill === 'reading').map(row => {
  const accepted = row.kind === 'mcq'
    ? row.accepted.map(index => String.fromCharCode(65 + Number(index)))
    : row.accepted;
  return { number: row.number, weight: row.weight, accepted: canonicalSet(accepted) };
});
const expected = reference.answerBlocks.map(row => ({ number: row.number, weight: row.weight, accepted: canonicalSet(row.accepted) }));
assert.deepEqual(live, expected, 'Set 1 live Reading key or grouping differs from the independently sourced Cambridge 5 Test 2 reference');
const unorderedGroups = mock.sections.filter(section => section.skill === 'reading')
  .flatMap(section => section.questions)
  .filter(question => question.type === 'formgroup')
  .flatMap(question => question.unorderedAnswerGroups ?? []);
assert.deepEqual(unorderedGroups, reference.unorderedAnswerGroups, 'Set 1 must preserve the official Q30-Q31 IN EITHER ORDER rule');
const points = live.flatMap(row => Array.from({ length: row.weight }, (_, index) => row.number + index));
assert.deepEqual(points, Array.from({ length: 40 }, (_, index) => index + 1));
console.log(`✓ IELTS Set 1 Reading: 40/40 points and Q30-Q31 either-order rule match the pinned Cambridge 5 Test 2 reference (${expectedSha256.slice(0, 12)}…)`);
