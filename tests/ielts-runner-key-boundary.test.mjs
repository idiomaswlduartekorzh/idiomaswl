import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import { getMock } from '../src/data/mocks/index.ts';
import { IELTS_SECTIONAL_LISTENING_SET_IDS } from '../src/data/ielts/sectional-listening-adapter.ts';
import { sanitizeIeltsMock } from '../src/lib/ielts/public-mock.ts';
import { scoreIeltsReadingPracticeAttempt } from '../src/lib/ielts/reading-practice-contract.ts';
import { loadIeltsMock } from '../src/lib/labs/exam-bridge/ielts.ts';

function assertNoKeys(value, path = 'mock') {
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    assert.ok(!['answer', 'answers', 'transcript', 'unorderedAnswerGroups', 'insights', 'exampleAnswer'].includes(key), `${path}.${key} leaks a key`);
    assertNoKeys(child, `${path}.${key}`);
  }
}

function perfectReadingAnswers(mock) {
  const answers = { fills: {}, mcq: {}, ms: {}, match: {} };
  for (const section of mock.sections.filter(item => item.skill === 'reading')) {
    for (const question of section.questions) {
      if (question.type === 'formgroup') {
        for (const blank of question.blanks) answers.fills[`${question.id}__${blank.num}`] = blank.answers[0];
      } else if (question.type === 'tablegroup') {
        for (const cell of question.rows.flat()) if (typeof cell !== 'string') answers.fills[`${question.id}__${cell.num}`] = cell.answers[0];
      } else if (question.type === 'multiselect') answers.ms[question.id] = [...question.answers];
      else if (question.type === 'matching') {
        for (const item of question.items) answers.match[`${question.id}__${item.num}`] = item.answer;
      } else if (question.type === 'mcq' || question.type === 'dialog') answers.mcq[question.id] = question.answer;
    }
  }
  return answers;
}

test('all 20 runner payloads retain prompts and media but expose no pre-submission keys', () => {
  for (const id of IELTS_SECTIONAL_LISTENING_SET_IDS) {
    const source = getMock('ielts', id);
    const sanitized = sanitizeIeltsMock(source);
    assert.equal(sanitized.id, source.id);
    assert.deepEqual(sanitized.sections.map(section => section.questions.length), source.sections.map(section => section.questions.length));
    assert.deepEqual(sanitized.sections.map(section => section.audioUrl), source.sections.map(section => section.audioUrl));
    assertNoKeys(sanitized);
    assert.notEqual(sanitized, source);
    assert.ok(source.sections.some(section => section.questions.some(question => 'answer' in question || 'answers' in question || 'blanks' in question)));
  }
});

test('Reading still scores 40 items per set on the server', () => {
  for (const id of IELTS_SECTIONAL_LISTENING_SET_IDS) {
    const source = getMock('ielts', id);
    const perfect = scoreIeltsReadingPracticeAttempt(source, perfectReadingAnswers(source));
    assert.deepEqual([perfect.correct, perfect.denominator, perfect.band], [40, 40, 9], id);
    assert.equal(perfect.passages.length, 3, id);
    assert.equal(perfect.passages.reduce((sum, passage) => sum + passage.total, 0), 40, id);
    assert.ok(perfect.passages.every(passage => passage.correct === passage.total), id);
    assertNoKeys(perfect);
  }
});

test('post-submission review uses the same 20 prompts, choices and keys as the delivered exam', async () => {
  for (const id of IELTS_SECTIONAL_LISTENING_SET_IDS) {
    assert.deepEqual(await loadIeltsMock(id), getMock('ielts', id), id);
  }
});

test('the browser runner never imports the server bridge or unsanitized mocks', () => {
  const client = readFileSync('src/app/(site)/examenes/[exam]/practica/[mockId]/IELTSPracticeClient.tsx', 'utf8');
  const page = readFileSync('src/app/(site)/examenes/[exam]/practica/[mockId]/page.tsx', 'utf8');
  assert.doesNotMatch(client, /from ['"]@\/lib\/labs\/exam-bridge\/ielts['"]/);
  assert.match(page, /mock=\{sanitizeIeltsMock\(mock\)\}/);
});
