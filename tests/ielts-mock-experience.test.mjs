import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { scoreIeltsObjectiveAnswers } from '../src/lib/ielts/mock-scoring.ts';
import { getIeltsReviewBlueprint } from '../src/lib/ielts/review-blueprint.ts';
import {
  createIeltsPracticeDraft,
  emptyIeltsPracticeAnswers,
  ieltsPracticeDraftKey,
  parseIeltsPracticeDraft,
} from '../src/lib/ielts/practice-state.ts';

const root = process.cwd();
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const expectedNumbers = Array.from({ length: 40 }, (_, index) => index + 1);

function questionNumbers(section) {
  return section.questions.flatMap(question => {
    if (question.type === 'formgroup') return question.blanks.map(blank => blank.num);
    if (question.type === 'tablegroup') {
      return question.rows.flatMap(row => row)
        .filter(cell => typeof cell !== 'string')
        .map(cell => cell.num);
    }
    if (question.type === 'multiselect') {
      return Array.from({ length: question.selectCount }, (_, index) => question.qRange[0] + index);
    }
    if (question.type === 'matching') return question.items.map(item => item.num);
    if (question.type === 'mcq' || question.type === 'dialog') {
      const number = Number(question.id.match(/q(\d+)$/i)?.[1]);
      return Number.isInteger(number) ? [number] : [];
    }
    return [];
  });
}

test('all 20 public IELTS sets satisfy the Set 1 navigation and answer-sheet contract', async () => {
  const bridge = read('src/lib/labs/exam-bridge/ielts.ts');
  for (let setNumber = 1; setNumber <= 20; setNumber += 1) {
    const mockId = `set-${setNumber}`;
    const mock = (await import(`../src/data/mocks/ielts-set-${setNumber}.ts`)).default;
    const active = mock.sections.filter(section => !section.comingSoon);
    const orderedSkills = [...new Set(active.map(section => section.skill))];

    assert.equal(mock.id, mockId);
    assert.equal(mock.examSlug, 'ielts');
    assert.match(bridge, new RegExp(`'${mockId}': \\(\\) => import\\('(?:@/data/mocks|\\.\\./\\.\\./data/mocks)/ielts-set-${setNumber}'\\)`), `${mockId}: missing submission route`);
    assert.ok(getIeltsReviewBlueprint(mockId), `${mockId}: missing result/review version`);
    assert.deepEqual(orderedSkills, ['listening', 'reading', 'writing', 'speaking'], `${mockId}: skill order`);
    assert.equal(active.filter(section => section.skill === 'listening').length, 4, `${mockId}: Listening parts`);
    assert.equal(active.filter(section => section.skill === 'reading').length, 3, `${mockId}: Reading passages`);
    assert.equal(new Set(active.map(section => section.part)).size, active.length, `${mockId}: duplicate section part key`);

    for (const skill of ['listening', 'reading']) {
      const numbers = active.filter(section => section.skill === skill).flatMap(questionNumbers).sort((a, b) => a - b);
      assert.deepEqual(numbers, expectedNumbers, `${mockId}: ${skill} answer-sheet numbers`);
    }

    const blank = { fills: {}, mcq: {}, ms: {}, match: {} };
    const score = scoreIeltsObjectiveAnswers(mock, blank);
    assert.equal(score.listening?.total, 40, `${mockId}: Listening score denominator`);
    assert.equal(score.reading.total, 40, `${mockId}: Reading score denominator`);

    const allQuestions = active.flatMap(section => section.questions);
    assert.deepEqual(allQuestions.filter(question => question.type === 'write').map(question => question.taskNumber).sort(), [1, 2], `${mockId}: Writing tasks`);
    assert.ok(allQuestions.filter(question => question.type === 'speak').length >= 3, `${mockId}: Speaking prompts`);
    assert.equal(new Set(allQuestions.map(question => question.id)).size, allQuestions.length, `${mockId}: duplicate question id`);
  }
});

test('the shared route, runner, submission and results flow cannot drift by set', () => {
  const route = read('src/app/(site)/examenes/[exam]/practica/[mockId]/page.tsx');
  const runner = read('src/app/(site)/examenes/[exam]/practica/[mockId]/IELTSPracticeClient.tsx');
  const submission = read('src/components/exam-runner/IELTSSubmission.tsx');

  assert.match(route, /slug === 'ielts'[\s\S]*<IELTSPracticeClient exam=\{exam\} mock=\{mock\}/);
  assert.match(runner, /scoreIeltsObjectiveAnswers\(mock, ans\)/);
  assert.match(runner, /<SkillTabs skills=\{skills\}/);
  assert.match(runner, /<IELTSSubmission/);
  assert.match(runner, /parseIeltsPracticeDraft/);
  assert.match(runner, /localStorage\.getItem\('wl_lead_captured'\) === '1'/);
  assert.match(runner, /maxSeconds=\{q\.partNumber === 2 \? 120 : 300\}/);
  assert.ok((runner.match(/spellCheck=\{false\}/g) ?? []).length >= 2, 'Writing and Speaking notes must disable spellcheck');
  assert.doesNotMatch(runner, /saveExamResult/);
  assert.match(submission, /`\/api\/ielts\/\$\{encodeURIComponent\(mockId\)\}\/submissions`/);
});

test('practice drafts are version-scoped, validated and omit microphone blobs', () => {
  const answers = emptyIeltsPracticeAnswers();
  answers.fills['l1-form__1'] = 'museum';
  answers.mcq['r1-q1'] = 2;
  answers.ms['l2-ms'] = ['A', 'C'];
  answers.write['w-task-1'] = 'A saved response';
  answers.speak['s-part-1'] = 'Preparation note';
  const draft = createIeltsPracticeDraft({
    mockId: 'set-1',
    contentVersion: 'ielts-set-1-v4',
    activeSkill: 'writing',
    expiresAt: Date.now() + 60_000,
    answers,
  });
  const serialized = JSON.stringify(draft);

  assert.equal(ieltsPracticeDraftKey('set-1', 'ielts-set-1-v4'), 'wl_ielts_practice_draft:set-1:ielts-set-1-v4');
  assert.deepEqual(parseIeltsPracticeDraft(serialized, 'set-1', 'ielts-set-1-v4'), draft);
  assert.equal(parseIeltsPracticeDraft(serialized, 'set-1', 'ielts-set-1-v5'), null);
  assert.equal(parseIeltsPracticeDraft('{broken', 'set-1', 'ielts-set-1-v4'), null);
  assert.equal(parseIeltsPracticeDraft(JSON.stringify({ ...draft, answers: { ...answers, mcq: { q1: -1 } } }), 'set-1', 'ielts-set-1-v4'), null);
  assert.equal(serialized.includes('blob'), false);
  assert.equal(serialized.includes('recordings'), false);
});
