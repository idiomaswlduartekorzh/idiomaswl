import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import mock from '../src/data/mocks/ielts-set-1.ts';
import set4 from '../src/data/mocks/ielts-set-4.ts';
import { buildIeltsGuidedMock } from '../src/data/ielts/guided-mock.ts';
import { getReadingLearningFeedback } from '../src/data/ielts/reading-learning-feedback.ts';
import { auditObjectiveKey } from '../scripts/lib/ielts-answer-key-audit.mjs';
import { scoreIeltsObjectiveAnswers, scoreIeltsMultiSelect, scoreIeltsUnorderedFillGroup } from '../src/lib/ielts/mock-scoring.ts';
import { getIeltsReviewBlueprint, isIeltsSubmissionVersionCurrent } from '../src/lib/ielts/review-blueprint.ts';

const fixture = JSON.parse(fs.readFileSync(new URL('./fixtures/ielts/set-1-approved.json', import.meta.url)));
const field = { fill:'fills', mcq:'mcq', multiselect:'ms', match:'match' };
const empty = () => ({ fills:{}, mcq:{}, ms:{}, match:{} });
function answersFor(rows) {
  const answers = empty();
  for (const q of rows) answers[field[q.responseKind]][q.responseKey] = q.responseKind === 'multiselect' ? [...q.acceptedAnswers] : q.acceptedAnswers[0];
  return answers;
}
test('approved independent key: every identity, option and number agrees', () => auditObjectiveKey(mock, fixture));
test('Set 4 Reading 1 displays the statement, comparison and feedback from its independent amendment', () => {
  const read = path => fs.readFileSync(new URL(`../${path}`, import.meta.url));
  const hash = value => createHash('sha256').update(value).digest('hex');
  const dossier = JSON.parse(read('config/ielts-harness/evidence/set-4.json'));
  const academic = JSON.parse(read(dossier.objectiveKey.evidencePath));
  const amendment = academic.currentItemReview;
  const receiptBytes = read(amendment.evidencePath);
  const receipt = JSON.parse(receiptBytes);
  const itemEvidence = academic.evidence.find(row => row.responseKey === 'r1q1');
  const reviewedRow = dossier.reading.questions.find(row => row.responseKey === 'r1q1');
  assert.deepEqual(amendment, dossier.objectiveKey.amendment);
  for (const record of [amendment, reviewedRow, itemEvidence]) {
    assert.equal(record.responseKey, receipt.responseKey);
    assert.equal(record.evidencePath, amendment.evidencePath);
    assert.equal(record.evidenceSha256, hash(receiptBytes));
    assert.deepEqual(record.reviewer, receipt.reviewer);
    assert.equal(record.reviewedAt, receipt.reviewedAt);
  }
  const section = set4.sections.find(section => section.skill === 'reading');
  const question = section.questions.find(question => question.id === receipt.responseKey);
  const paragraph = section.passage.split(/\n\s*\n/u)[receipt.passageEvidence.paragraph - 1];
  assert.equal(question.text, receipt.statement);
  assert.equal(hash(question.text), receipt.binding.statementSha256);
  assert.equal(itemEvidence.questionPrompt, question.text);
  assert.equal(itemEvidence.sourceExcerpt, paragraph);
  assert.equal(reviewedRow.sourceExcerpt, paragraph);
  assert.equal(hash(paragraph), receipt.binding.paragraphSha256);
  assert.ok(paragraph.includes(receipt.passageEvidence.excerpt));
  assert.equal(question.options[question.answer], receipt.blindSolve.answer);
  assert.notEqual(receipt.blindSolve.reviewer.id, receipt.reviewer.id);

  const item = buildIeltsGuidedMock(set4, dossier).readingUnits[0].items[0];
  const feedback = getReadingLearningFeedback(item, item.accepted[0], true, 4);
  // The interface appends its source cue after the reviewed explanation.
  const ends = feedback.reason.matchAll(/\.(?=\s|$)/gu);
  const displayedPrefixes = Array.from(ends, match => hash(feedback.reason.slice(0, match.index + 1)));
  assert.ok(displayedPrefixes.includes(receipt.binding.guidedFeedbackSha256));
});
test('all 80 points and every accepted variant score exactly once', () => {
  const perfect = scoreIeltsObjectiveAnswers(mock, answersFor(fixture.questions));
  assert.deepEqual(perfect, { listening:{correct:40,total:40,band:9}, reading:{correct:40,total:40,band:9} });
  for (const q of fixture.questions) {
    for (const accepted of q.acceptedAnswers) {
      const answers = empty();
      answers[field[q.responseKind]][q.responseKey] = q.responseKind === 'multiselect' ? [accepted] : accepted;
      const scored = scoreIeltsObjectiveAnswers(mock, answers);
      assert.equal(scored[q.skill].correct, 1, `${q.skill} ${q.numberLabel}: ${accepted}`);
      assert.equal(scored[q.skill === 'reading' ? 'listening':'reading'].correct, 0);
      if (q.responseKind === 'fill') {
        answers.fills[q.responseKey] = `  ${accepted.toUpperCase()}  `;
        assert.equal(scoreIeltsObjectiveAnswers(mock, answers)[q.skill].correct, 1);
      }
    }
  }
});
test('blank and obsolete accepted answers earn no points', () => {
  assert.equal(scoreIeltsObjectiveAnswers(mock, empty()).listening.correct, 0);
  assert.equal(scoreIeltsObjectiveAnswers(mock, empty()).reading.correct, 0);
  const old = empty();
  old.fills = { 'l1-form__1':'Poppyfield', 'l1-table__7':'1260', 'l1-table__9':'685', 'l2-form__13':'medical conditions' };
  assert.equal(scoreIeltsObjectiveAnswers(mock, old).listening.correct, 0);
});
test('multiselect: permutations, partial credit, duplicates and excess choices', () => {
  for (const q of fixture.questions.filter(q => q.responseKind === 'multiselect')) {
    const [a,b] = q.acceptedAnswers;
    const wrong = Object.keys(q.optionMap).find(k => !q.acceptedAnswers.includes(k));
    for (const [selected, expected] of [[[a,b],2],[[b,a],2],[[a],1],[[a,wrong],1],[[],0],[[a,a],0],[[a,b,wrong],0]]) {
      const answers = empty(); answers.ms[q.responseKey] = selected;
      assert.equal(scoreIeltsObjectiveAnswers(mock, answers)[q.skill].correct, expected);
      assert.equal(scoreIeltsMultiSelect(selected,q.acceptedAnswers,q.weight),expected);
    }
  }
});
test('Reading Q30-Q31 accept either order but consume each answer once', () => {
  assert.equal(scoreIeltsUnorderedFillGroup(['technical vocabulary', 'grammatical resources'], [['technical vocabulary'], ['grammatical resources']]), 2);
  assert.equal(scoreIeltsUnorderedFillGroup(['grammatical resources', 'technical vocabulary'], [['technical vocabulary'], ['grammatical resources']]), 2);
  assert.equal(scoreIeltsUnorderedFillGroup(['technical vocabulary', 'technical vocabulary'], [['technical vocabulary'], ['grammatical resources']]), 1);
  for (const [first, second, expected] of [
    ['technical vocabulary', 'grammatical resources', 2],
    ['grammatical resources', 'technical vocabulary', 2],
    ['technical vocabulary', 'technical vocabulary', 1],
    ['grammatical resources', 'grammatical resources', 1],
  ]) {
    const answers = empty();
    answers.fills['r3-summary__30'] = first;
    answers.fills['r3-summary__31'] = second;
    assert.equal(scoreIeltsObjectiveAnswers(mock, answers).reading.correct, expected);
  }
});
test('all raw scores 0–40 match pinned diagnostic bands', () => {
  const tables = {
    listening:[[39,9],[37,8.5],[35,8],[33,7.5],[30,7],[27,6.5],[23,6],[20,5.5],[16,5],[13,4.5],[10,4],[8,3.5],[6,3],[4,2.5],[0,1]],
    reading:[[39,9],[37,8.5],[35,8],[33,7.5],[30,7],[27,6.5],[23,6],[19,5.5],[15,5],[13,4.5],[10,4],[8,3.5],[6,3],[4,2.5],[0,1]],
  };
  for (const skill of ['listening','reading']) for (let raw=0; raw<=40; raw++) {
    const answers = empty(); let remaining=raw;
    for (const q of fixture.questions.filter(q => q.skill===skill)) {
      if (!remaining) break;
      const marks=Math.min(remaining,q.weight);
      answers[field[q.responseKind]][q.responseKey] = q.responseKind==='multiselect' ? q.acceptedAnswers.slice(0,marks) : q.acceptedAnswers[0];
      remaining-=marks;
    }
    assert.deepEqual(scoreIeltsObjectiveAnswers(mock,answers)[skill], {correct:raw,total:40,band:tables[skill].find(([min])=>raw>=min)[1]});
  }
});
test('guardian rejects old key, missing questions and shuffled options', () => {
  const old = structuredClone(mock); old.sections[0].questions[0].blanks[0].answers=['Poppyfield'];
  assert.throws(()=>auditObjectiveKey(old,fixture));
  const missing=structuredClone(mock); missing.sections[0].questions[0].blanks.splice(0,1);
  assert.throws(()=>auditObjectiveKey(missing,fixture));
  const shuffled=structuredClone(mock);
  const q=shuffled.sections.flatMap(s=>s.questions).find(q=>q.type==='mcq');
  [q.options[0],q.options[1]]=[q.options[1],q.options[0]];
  assert.throws(()=>auditObjectiveKey(shuffled,fixture));
});
test('old tabs fail closed while every historical W/S version remains reviewable', () => {
  const revisions = [4, 5, 3, 7, 4, 5, 4, 3, 6, 4, 5, 4, 4, 3, 2, 5, 4, 3, 4, 3];
  revisions.forEach((revision, index) => {
    const setNumber = index + 1;
    const mockId = `set-${setNumber}`;
    const active = `ielts-set-${setNumber}-v${revision}`;
    const historical = Array.from({ length: revision }, (_, versionIndex) =>
      `ielts-set-${setNumber}-v${versionIndex + 1}`,
    );
    assert.equal(isIeltsSubmissionVersionCurrent(mockId, active), true, `${mockId}: active version rejected`);
    assert.equal(isIeltsSubmissionVersionCurrent(mockId, `ielts-set-${setNumber}-v${revision + 1}`), false);
    assert.equal(isIeltsSubmissionVersionCurrent(mockId, revision === 1 ? null : `ielts-set-${setNumber}-v${revision - 1}`), false);
    assert.deepEqual(getIeltsReviewBlueprint(mockId).reviewableContentVersions, historical);
  });
  assert.equal(isIeltsSubmissionVersionCurrent('set-1', undefined), false);
  assert.equal(isIeltsSubmissionVersionCurrent('set-1', {}), false);
});
test('browser and persistence use shared scorer; stale check precedes writes', () => {
  const read = path => fs.readFileSync(new URL(path,import.meta.url),'utf8');
  const client=read('../src/app/(site)/examenes/[exam]/practica/[mockId]/IELTSPracticeClient.tsx');
  const server=read('../src/lib/ielts/submission.server.ts');
  assert.match(client,/scoreIeltsObjectiveAnswers\(mock, ans\)/);
  assert.doesNotMatch(client,/function scoreSection|const L_BAND|const R_BAND/);
  assert.match(server,/scoreIeltsObjectiveAnswers\(mock, payload.objectiveAnswers\)/);
  assert.ok(server.indexOf('if (!isIeltsSubmissionVersionCurrent') < server.indexOf('.insert('));
  assert.match(server,/objectiveScoring: \{ contentVersion: blueprint.contentVersion/);
});
