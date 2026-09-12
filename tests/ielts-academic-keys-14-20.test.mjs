import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import set14 from '../src/data/mocks/ielts-set-14.ts';
import set15 from '../src/data/mocks/ielts-set-15.ts';
import set16 from '../src/data/mocks/ielts-set-16.ts';
import set17 from '../src/data/mocks/ielts-set-17.ts';
import set18 from '../src/data/mocks/ielts-set-18.ts';
import set19 from '../src/data/mocks/ielts-set-19.ts';
import set20 from '../src/data/mocks/ielts-set-20.ts';
import { withIeltsListeningProductionTranscript } from '../src/data/mocks/ielts-listening-production.ts';
import { auditIeltsAcademicReview } from '../scripts/lib/ielts-academic-review-evidence.mjs';
import { getIeltsReviewBlueprint } from '../src/lib/ielts/review-blueprint.ts';

const authored = new Map([[14, set14], [15, set15], [16, set16], [17, set17], [18, set18], [19, set19], [20, set20]]);
const effective = setNumber => withIeltsListeningProductionTranscript(authored.get(setNumber));
const review = setNumber => JSON.parse(fs.readFileSync(new URL(
  `../config/ielts-harness/academic-reviews/set-${setNumber}-objective-review.json`, import.meta.url,
)));

test('Sets 14-20 retain all 560 independently reviewed objective points', () => {
  const results = [];
  for (let setNumber = 14; setNumber <= 20; setNumber += 1) {
    results.push(auditIeltsAcademicReview(effective(setNumber), review(setNumber)));
  }
  assert.equal(results.reduce((sum, result) => sum + result.objectivePoints, 0), 560);
  assert.deepEqual(results.map(result => result.status), Array(7).fill('PASS'));
});

test('Sets 14-20 academic bindings fail closed after transcript, passage, key or option drift', () => {
  const transcriptDrift = structuredClone(effective(14));
  transcriptDrift.sections.find(section => section.skill === 'listening').transcript += ' Material drift.';
  assert.throws(() => auditIeltsAcademicReview(transcriptDrift, review(14)), /objective material changed/iu);

  const passageDrift = structuredClone(effective(15));
  passageDrift.sections.find(section => section.skill === 'reading').passage += ' Material drift.';
  assert.throws(() => auditIeltsAcademicReview(passageDrift, review(15)), /objective material changed/iu);

  const keyDrift = structuredClone(effective(17));
  keyDrift.sections.find(section => section.skill === 'listening').questions[0].blanks[0].answers = ['Changed'];
  assert.throws(() => auditIeltsAcademicReview(keyDrift, review(17)), /objective material changed/iu);

  const optionDrift = structuredClone(effective(20));
  optionDrift.sections.find(section => section.skill === 'reading' && section.part === 7).questions[0].options[0] += ' changed';
  assert.throws(() => auditIeltsAcademicReview(optionDrift, review(20)), /objective material changed/iu);
});

test('Sets 14-20 academic evidence cannot be edited without invalidating its digest', () => {
  const changed = review(18);
  changed.evidence[0].rationale += ' Changed.';
  assert.throws(() => auditIeltsAcademicReview(effective(18), changed), /review digest is stale/iu);
});

test('semantic corrections retain the intended keys and remove unsupported wording', () => {
  for (const set of [14, 15, 16, 17, 18, 19, 20]) {
    assert.equal(review(set).contentVersionAtReview, getIeltsReviewBlueprint(`set-${set}`).contentVersion);
  }
  for (const set of [14, 15, 16, 17, 18, 20]) {
    assert.equal(review(set).findings.status, 'CORRECTED_AND_APPROVED');
  }
  assert.equal(review(19).findings.length, 0);
  const source14 = fs.readFileSync(new URL('../src/data/mocks/ielts-set-14.ts', import.meta.url), 'utf8');
  assert.doesNotMatch(source14, /GDPR established a right to/u);
  assert.doesNotMatch(source14, /used by wealthy merchants/u);
  const source15 = fs.readFileSync(new URL('../src/data/mocks/ielts-set-15.ts', import.meta.url), 'utf8');
  assert.doesNotMatch(source15, /academic performance and mental health in adolescents/u);
  assert.doesNotMatch(source15, /Mobile platforms giving farmers/u);
  assert.doesNotMatch(fs.readFileSync(new URL('../src/data/mocks/ielts-set-16.ts', import.meta.url), 'utf8'), /specialise in their most efficient outputs/u);
  const source17 = fs.readFileSync(new URL('../src/data/mocks/ielts-set-17.ts', import.meta.url), 'utf8');
  assert.doesNotMatch(source17, /are highly vulnerable to acidification/u);
  assert.doesNotMatch(source17, /shells begin to dissolve/u);
  assert.doesNotMatch(fs.readFileSync(new URL('../src/data/mocks/ielts-set-18.ts', import.meta.url), 'utf8'), /city has been paralysed/u);
  const source20 = fs.readFileSync(new URL('../src/data/mocks/ielts-set-20.ts', import.meta.url), 'utf8');
  assert.doesNotMatch(source20, /developed resistance to multiple antibiotic classes/u);
  assert.doesNotMatch(source20, /main reason why electric vehicle sales/u);
});
