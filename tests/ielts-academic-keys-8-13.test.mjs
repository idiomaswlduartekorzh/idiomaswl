import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import set8 from '../src/data/mocks/ielts-set-8.ts';
import set9 from '../src/data/mocks/ielts-set-9.ts';
import set10 from '../src/data/mocks/ielts-set-10.ts';
import set11 from '../src/data/mocks/ielts-set-11.ts';
import set12 from '../src/data/mocks/ielts-set-12.ts';
import set13 from '../src/data/mocks/ielts-set-13.ts';
import { withIeltsListeningProductionTranscript } from '../src/data/mocks/ielts-listening-production.ts';
import { withIeltsListeningLegacyReplacementTranscript } from '../src/data/mocks/ielts-listening-legacy-replacement.ts';
import { auditIeltsAcademicReview, sha256 } from '../scripts/lib/ielts-academic-review-evidence.mjs';
import { getIeltsReviewBlueprint } from '../src/lib/ielts/review-blueprint.ts';

const authored = new Map([[8, set8], [9, set9], [10, set10], [11, set11], [12, set12], [13, set13]]);
const effective = setNumber => {
  const mock = authored.get(setNumber);
  if ([8, 10, 11, 12].includes(setNumber)) return withIeltsListeningLegacyReplacementTranscript(mock);
  if (setNumber === 13) return withIeltsListeningProductionTranscript(mock);
  return mock;
};
const review = setNumber => JSON.parse(fs.readFileSync(new URL(
  `../config/ielts-harness/academic-reviews/set-${setNumber}-objective-review.json`, import.meta.url,
)));

test('Sets 8-13 retain all 480 independently reviewed objective points', () => {
  const results = [];
  for (let setNumber = 8; setNumber <= 13; setNumber += 1) {
    results.push(auditIeltsAcademicReview(effective(setNumber), review(setNumber)));
  }
  assert.equal(results.reduce((sum, result) => sum + result.objectivePoints, 0), 480);
  assert.deepEqual(results.map(result => result.status), Array(6).fill('PASS'));
});

test('the Sets 8-13 manifest pins every approved review file and material hash', () => {
  const manifest = JSON.parse(fs.readFileSync(new URL(
    '../config/ielts-harness/academic-reviews/sets-8-13-manifest.json', import.meta.url,
  )));
  const { manifestSha256, ...manifestCore } = manifest;
  assert.equal(sha256(JSON.stringify(manifestCore)), manifestSha256);
  assert.deepEqual(manifest.summary, {
    sets: 6,
    objectivePoints: 480,
    supportedPoints: 480,
    ambiguousPoints: 0,
    corrections: 3,
    correctedAcceptedVariants: 2,
    correctedQuestionStems: 1,
  });
  for (const row of manifest.sets) {
    const bytes = fs.readFileSync(new URL(`../${row.reviewPath}`, import.meta.url));
    const pinned = JSON.parse(bytes);
    assert.equal(sha256(bytes), row.fileSha256, `Set ${row.set}: review file changed`);
    assert.equal(pinned.reviewSha256, row.reviewSha256, `Set ${row.set}: review digest changed`);
    assert.equal(pinned.binding.objectiveMaterialSha256, row.objectiveMaterialSha256,
      `Set ${row.set}: material binding changed`);
    assert.equal(pinned.contentVersionAtReview, getIeltsReviewBlueprint(`set-${row.set}`)?.contentVersion,
      `Set ${row.set}: product content version changed after review`);
  }
});

test('academic bindings fail closed after a transcript, passage, key or option change', () => {
  const transcriptDrift = structuredClone(effective(8));
  transcriptDrift.sections.find(section => section.skill === 'listening').transcript += ' Material drift.';
  assert.throws(() => auditIeltsAcademicReview(transcriptDrift, review(8)), /objective material changed/iu);

  const passageDrift = structuredClone(effective(9));
  passageDrift.sections.find(section => section.skill === 'reading').passage += ' Material drift.';
  assert.throws(() => auditIeltsAcademicReview(passageDrift, review(9)), /objective material changed/iu);

  const keyDrift = structuredClone(effective(10));
  keyDrift.sections.find(section => section.skill === 'listening').questions[0].blanks[0].answers = ['Changed'];
  assert.throws(() => auditIeltsAcademicReview(keyDrift, review(10)), /objective material changed/iu);

  const optionDrift = structuredClone(effective(13));
  optionDrift.sections.find(section => section.skill === 'reading' && section.part === 7).questions[0].options[0] += ' changed';
  assert.throws(() => auditIeltsAcademicReview(optionDrift, review(13)), /objective material changed/iu);
});

test('academic evidence cannot be edited without invalidating its digest', () => {
  const changed = review(12);
  changed.evidence[0].rationale += ' Changed.';
  assert.throws(() => auditIeltsAcademicReview(effective(12), changed), /review digest is stale/iu);
});
