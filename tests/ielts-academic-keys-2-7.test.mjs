import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import set2 from '../src/data/mocks/ielts-set-2.ts';
import set3 from '../src/data/mocks/ielts-set-3.ts';
import set4 from '../src/data/mocks/ielts-set-4.ts';
import set5 from '../src/data/mocks/ielts-set-5.ts';
import set6 from '../src/data/mocks/ielts-set-6.ts';
import set7 from '../src/data/mocks/ielts-set-7.ts';
import { withIeltsListeningProductionTranscript } from '../src/data/mocks/ielts-listening-production.ts';
import { withIeltsListeningLegacyReplacementTranscript } from '../src/data/mocks/ielts-listening-legacy-replacement.ts';
import { auditIeltsAcademicReview } from '../scripts/lib/ielts-academic-review-evidence.mjs';
import { getIeltsReviewBlueprint } from '../src/lib/ielts/review-blueprint.ts';

const authored = new Map([[2, set2], [3, set3], [4, set4], [5, set5], [6, set6], [7, set7]]);
// Mirrors the learner-facing MOCK_REGISTRY mapping in src/data/mocks/index.ts.
const effective = setNumber => setNumber <= 4
  ? withIeltsListeningProductionTranscript(authored.get(setNumber))
  : withIeltsListeningLegacyReplacementTranscript(authored.get(setNumber));
const review = setNumber => JSON.parse(fs.readFileSync(new URL(
  `../config/ielts-harness/academic-reviews/set-${setNumber}-objective-review.json`, import.meta.url,
)));

test('Sets 2-7 retain all 480 independently reviewed objective points', () => {
  const results = [];
  for (let setNumber = 2; setNumber <= 7; setNumber += 1) {
    assert.equal(
      review(setNumber).contentVersionAtReview,
      getIeltsReviewBlueprint(`set-${setNumber}`).contentVersion,
      `Set ${setNumber}: review version is stale`,
    );
    results.push(auditIeltsAcademicReview(effective(setNumber), review(setNumber)));
  }
  assert.equal(results.reduce((sum, result) => sum + result.objectivePoints, 0), 480);
  assert.deepEqual(results.map(result => result.status), Array(6).fill('PASS'));
});

test('review bindings fail closed after transcript, passage, key or option drift', () => {
  const transcriptDrift = structuredClone(effective(2));
  transcriptDrift.sections.find(section => section.skill === 'listening').transcript += ' Material drift.';
  assert.throws(() => auditIeltsAcademicReview(transcriptDrift, review(2)), /objective material changed/iu);

  const passageDrift = structuredClone(effective(3));
  passageDrift.sections.find(section => section.skill === 'reading').passage += ' Material drift.';
  assert.throws(() => auditIeltsAcademicReview(passageDrift, review(3)), /objective material changed/iu);

  const keyDrift = structuredClone(effective(5));
  keyDrift.sections.find(section => section.skill === 'listening').questions[0].blanks[0].answers = ['Changed'];
  assert.throws(() => auditIeltsAcademicReview(keyDrift, review(5)), /objective material changed/iu);

  const optionDrift = structuredClone(effective(7));
  optionDrift.sections.find(section => section.skill === 'reading' && section.part === 7).questions[0].options[0] += ' changed';
  assert.throws(() => auditIeltsAcademicReview(optionDrift, review(7)), /objective material changed/iu);
});

test('review evidence cannot be edited without invalidating its digest', () => {
  const changed = review(6);
  changed.evidence[0].rationale += ' Changed.';
  assert.throws(() => auditIeltsAcademicReview(effective(6), changed), /review digest is stale/iu);
});
