import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { objectiveRows } from './lib/ielts-answer-key-audit.mjs';

const fixtureUrl = new URL('../tests/fixtures/ielts/set-1-listening-cambridge10-test1-reference.json', import.meta.url);
const bytes = fs.readFileSync(fixtureUrl);
const expectedSha256 = '6a2aa0d7ab3b415003042a65175fea0294bffbb83ef7479852a02a30e5b6c22b';
assert.equal(createHash('sha256').update(bytes).digest('hex'), expectedSha256, 'Independent Listening reference changed; review sources and pin a new hash explicitly');
const reference = JSON.parse(bytes);
assert.equal(reference.sourceIdentity, 'Cambridge IELTS 10 Academic, Test 1, Listening');
assert.equal(reference.references.length, 3);

const { default: mock } = await import('../src/data/mocks/ielts-set-1.ts');
const canonical = value => String(value).toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
  .replace(/(?<=\d),(?=\d)/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
const canonicalSet = values => [...new Set(values.map(canonical))].sort();
const live = objectiveRows(mock).filter(row => row.skill === 'listening').map(row => {
  const accepted = row.kind === 'mcq'
    ? row.accepted.map(index => String.fromCharCode(65 + Number(index)))
    : row.accepted;
  return { number: row.number, weight: row.weight, accepted: canonicalSet(accepted) };
});
const expected = reference.answerBlocks.map(row => ({ number: row.number, weight: row.weight, accepted: canonicalSet(row.accepted) }));
assert.deepEqual(live, expected, 'Set 1 live Listening key or grouping differs from the independently sourced Cambridge 10 Test 1 reference');
const part4 = mock.sections.find(section => section.skill === 'listening' && section.part === 4);
assert.match(part4?.transcript ?? '', /more emphasis on its expansion/i, 'Set 1 Listening Q40 transcript must preserve the audible answer “expansion”');
const points = live.flatMap(row => Array.from({ length: row.weight }, (_, index) => row.number + index));
assert.deepEqual(points, Array.from({ length: 40 }, (_, index) => index + 1));
console.log(`✓ IELTS Set 1 Listening: 40/40 points match the pinned Cambridge 10 Test 1 reference (${expectedSha256.slice(0, 12)}…)`);
