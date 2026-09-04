import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import mock from '../src/data/mocks/ielts-set-1.ts';
import { auditObjectiveKey } from '../scripts/lib/ielts-answer-key-audit.mjs';
import { scoreIeltsObjectiveAnswers, scoreIeltsMultiSelect } from '../src/lib/ielts/mock-scoring.ts';
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
test('Set 1 old tabs fail closed; historical W/S remains reviewable', () => {
  for (const version of [undefined,null,'ielts-set-1-v1',{},'ielts-set-1-v3']) assert.equal(isIeltsSubmissionVersionCurrent('set-1',version),false);
  assert.equal(isIeltsSubmissionVersionCurrent('set-1','ielts-set-1-v2'),true);
  assert.ok(getIeltsReviewBlueprint('set-1').reviewableContentVersions.includes('ielts-set-1-v1'));
  for (const version of [undefined,null,'ielts-set-2-v1',{},'ielts-set-2-v3']) assert.equal(isIeltsSubmissionVersionCurrent('set-2',version),false);
  assert.equal(isIeltsSubmissionVersionCurrent('set-2','ielts-set-2-v2'),true);
  assert.ok(getIeltsReviewBlueprint('set-2').reviewableContentVersions.includes('ielts-set-2-v1'));
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
