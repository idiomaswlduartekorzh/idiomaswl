import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

import { getMock } from '../src/data/mocks/index.ts';
import { IELTS_SECTIONAL_LISTENING_SET_IDS } from '../src/data/ielts/sectional-listening-adapter.ts';
import { scoreIeltsObjectiveAnswers } from '../src/lib/ielts/mock-scoring.ts';

const root = process.cwd();
const blankKey = (groupId, num) => `${groupId}__${num}`;

function perfectReadingAnswers(mock) {
  const answers = { fills: {}, mcq: {}, ms: {}, match: {} };
  for (const section of mock.sections.filter(item => item.skill === 'reading')) {
    for (const question of section.questions) {
      if (question.type === 'formgroup') {
        for (const blank of question.blanks) answers.fills[blankKey(question.id, blank.num)] = blank.answers[0];
      } else if (question.type === 'tablegroup') {
        for (const cell of question.rows.flat()) if (typeof cell !== 'string') answers.fills[blankKey(question.id, cell.num)] = cell.answers[0];
      } else if (question.type === 'multiselect') {
        answers.ms[question.id] = [...question.answers];
      } else if (question.type === 'matching') {
        for (const item of question.items) answers.match[blankKey(question.id, item.num)] = item.answer;
      } else if (question.type === 'mcq' || question.type === 'dialog') {
        answers.mcq[question.id] = question.answer;
      }
    }
  }
  return answers;
}

test('each focused Reading set has three passages, 40 responses and a perfect-score path', () => {
  for (const mockId of IELTS_SECTIONAL_LISTENING_SET_IDS) {
    const mock = getMock('ielts', mockId);
    assert.ok(mock, mockId);
    const sections = mock.sections.filter(section => section.skill === 'reading' && !section.comingSoon);
    assert.equal(sections.length, 3, mockId);
    assert.ok(sections.every(section => section.passage?.trim()), `${mockId} needs three readable passages`);
    const result = scoreIeltsObjectiveAnswers(mock, perfectReadingAnswers(mock)).reading;
    assert.deepEqual([result.correct, result.total, result.band], [40, 40, 9], mockId);
  }
});

test('each focused Writing and Speaking set reuses both visual prompts and three spoken tasks', async () => {
  for (const mockId of IELTS_SECTIONAL_LISTENING_SET_IDS) {
    const mock = getMock('ielts', mockId);
    const writing = mock.sections.filter(section => section.skill === 'writing' && !section.comingSoon);
    const speaking = mock.sections.filter(section => section.skill === 'speaking' && !section.comingSoon);
    assert.equal(writing.length, 2, mockId);
    assert.equal(speaking.length, 1, mockId);
    const [task1, task2] = writing.flatMap(section => section.questions);
    assert.deepEqual([task1.taskNumber, task2.taskNumber], [1, 2], mockId);
    assert.deepEqual([task1.minWords, task2.minWords], [150, 250], mockId);
    assert.ok(task1.imageUrl, `${mockId} Task 1 visual missing`);
    await access(path.join(root, 'public', task1.imageUrl.replace(/^\//, '')));
    assert.deepEqual(speaking[0].questions.map(question => question.partNumber), [1, 2, 3], mockId);
  }
});
