import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import test from 'node:test';
import { getMock } from '../src/data/mocks/index.ts';
import { selectToeflListeningPractice } from '../src/data/toefl/sectional-listening-adapter.ts';
import { auditItems } from '../docs/toefl-listening-length-audit-draft.mjs';
import { screen, selfTest } from '../docs/toefl-option-length-screen-draft.mjs';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url));
const json = path => JSON.parse(read(path));
const hash = value => createHash('sha256').update(value).digest('hex');
const candidatePath = 'docs/toefl-listening-set1-options-candidate.json';
const candidate = json(candidatePath);
const baseline = json('docs/toefl-listening-set1-options-integrity-baseline.json');
const approvedIds = new Set(candidate.items.map(r => r.id));
const expectedDigest = '6afedc554facae03c12103f7f238a0253292de9ea9d0b206fff44096e8f2ad5d';

test('Set 1 text matches the immutable candidate with both explicit approvals', () => {
  assert.equal(hash(read(candidatePath)), expectedDigest);
  const reviews = json('docs/toefl-sectional-review-log.json').reviews;
  for (const [gateId, reviewer] of [
    ['HR-06-SET1-OPTIONS-EXECUTIVE', 'David Duarte'],
    ['HR-06-SET1-OPTIONS-ACADEMIC', 'Zhanna Korzh'],
  ]) {
    const review = reviews.find(r => r.gateId === gateId);
    assert.equal(review?.decision, 'approved');
    assert.equal(review.reviewer, reviewer);
    assert.equal(review.contentDigest, expectedDigest);
    for (const evidence of review.supportingEvidence) assert.equal(hash(read(evidence.path)), evidence.sha256);
  }
  const source = getMock('toefl', 'set-1');
  const questions = source.sections.filter(s => s.skill === 'listening').flatMap(s => s.questions);
  assert.deepEqual(questions.map(q => ({ id: q.id, options: q.options.map(o => o.text) })),
    candidate.items.map(({ id, options }) => ({ id, options })));
  assert.deepEqual(selectToeflListeningPractice(source).sections, source.sections.filter(s => s.skill === 'listening'));
});

test('all other mock fields and the other 19 sets retain their pre-change digest', () => {
  for (const entry of baseline.sets) {
    const value = JSON.stringify(getMock('toefl', entry.setId), function(key, value) {
      if (key === 'text' && typeof this.id === 'string' && approvedIds.has(this.id.split(':option-')[0]) && this.label) {
        return '<approved-option-text>';
      }
      return value;
    });
    assert.equal(hash(value), entry.sha256, entry.setId);
  }
});

test('all 22 Set 1 audio files and private key source hashes are unchanged', () => {
  assert.equal(baseline.audioHashes.length, 22);
  for (const audio of baseline.audioHashes) assert.equal(hash(read(`public${audio.url}`)), audio.sha256, audio.url);
  const sources = json('docs/toefl-listening-length-audit-draft.json').sourceHashes;
  for (const source of sources.filter(s => s.path.startsWith('src/server/'))) {
    assert.equal(hash(read(source.path)), source.sha256, source.path);
  }
  assert.deepEqual(auditItems.filter(r => r.set === 1).map(r => String.fromCharCode(65 + r.correct)),
    'A C C A A C B A C D A B C D B C D A D B C A D B A C B D A C B C A D'.split(' '));
});

test('length diagnostics match the reviewed candidate; this is not a psychometric certification', () => {
  assert.equal(selfTest(), 'passed');
  const observed = screen(auditItems.filter(r => r.set === 1));
  const reviewed = json('docs/toefl-listening-set1-candidate-evidence.json').candidate;
  assert.deepEqual(observed, reviewed);
  assert.equal(observed.totals.chars_longest.unique, 8);
  assert.equal(observed.totals.words_longest.unique, 5);
  // Retain visibility of the approved residual short-answer tendency.
  assert.equal(observed.totals.chars_shortest.expectedRate, 14 / 34);
});
