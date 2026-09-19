import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

import { getMock } from '../src/data/mocks/index.ts';
import { displayIeltsSectionInstructions } from '../src/data/ielts/listening-instruction-errata.ts';
import {
  IELTS_SECTIONAL_LISTENING_SET_IDS,
  isIeltsSectionalListeningSetId,
  selectIeltsListeningPractice,
} from '../src/data/ielts/sectional-listening-adapter.ts';
import { scoreIeltsListeningPracticeAttempt } from '../src/lib/ielts/listening-practice-contract.ts';
import { POST as scoreListening } from '../src/app/api/practica/ielts/listening/score/route.ts';

const ROOT = process.cwd();
const blankKey = (groupId, num) => `${groupId}__${num}`;

function perfectAnswers(mock) {
  const answers = { fills: {}, mcq: {}, ms: {}, match: {} };
  for (const section of mock.sections.filter(item => item.skill === 'listening')) {
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

function assertNoKeys(value, location = 'practice') {
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    assert.notEqual(key, 'answer', `${location} exposes answer`);
    assert.notEqual(key, 'answers', `${location} exposes answers`);
    assert.notEqual(key, 'transcript', `${location} exposes transcript`);
    assertNoKeys(child, `${location}.${key}`);
  }
}

function responseNumbers(section) {
  return section.questions.flatMap(question => {
    if (question.type === 'formgroup') return question.blanks.map(blank => blank.num);
    if (question.type === 'tablegroup') return question.rows.flatMap(row => row.flatMap(cell => typeof cell === 'string' ? [] : [cell.num]));
    if (question.type === 'multiselect' || question.type === 'matching') return Array.from({ length: question.qRange[1] - question.qRange[0] + 1 }, (_, index) => question.qRange[0] + index);
    return [Number(question.id.match(/q(\d+)$/i)?.[1])];
  });
}

test('catalog exposes exactly IELTS Listening Sets 1–20', () => {
  assert.deepEqual(IELTS_SECTIONAL_LISTENING_SET_IDS, Array.from({ length: 20 }, (_, index) => `set-${index + 1}`));
  for (const id of IELTS_SECTIONAL_LISTENING_SET_IDS) assert.equal(isIeltsSectionalListeningSetId(id), true);
  for (const id of ['set-0', 'set-01', 'set-21', 'mock-1']) assert.equal(isIeltsSectionalListeningSetId(id), false);
});

test('all 20 projections preserve four parts, 40 response slots and one released audio', async () => {
  for (const mockId of IELTS_SECTIONAL_LISTENING_SET_IDS) {
    const mock = getMock('ielts', mockId);
    assert.ok(mock, `${mockId} must exist`);
    const practice = selectIeltsListeningPractice(mock);
    assert.ok(practice, `${mockId} must project to sectional Listening`);
    assert.equal(practice.sections.length, 4);
    assert.deepEqual(practice.sections.map(section => section.part), [1, 2, 3, 4]);
    assert.equal(new Set(practice.sections.map(section => section.audioUrl)).size, 1);
    assert.equal(practice.audioUrl, practice.sections[0].audioUrl);
    const numbers = practice.sections.flatMap(responseNumbers);
    assert.deepEqual(numbers.sort((a, b) => a - b), Array.from({ length: 40 }, (_, index) => index + 1));
    await access(path.join(ROOT, 'public', practice.audioUrl.replace(/^\//, '')));
  }
});

test('displayed part instructions name the actual response range in all 20 sets', () => {
  const sourceMismatches = [];
  const displayedMismatches = [];
  for (const mockId of IELTS_SECTIONAL_LISTENING_SET_IDS) {
    const mock = getMock('ielts', mockId);
    const practice = selectIeltsListeningPractice(mock);
    for (const section of mock.sections.filter(item => item.skill === 'listening')) {
      const displayed = displayIeltsSectionInstructions(mockId, section);
      assert.equal(practice.sections.find(item => item.part === section.part)?.instructions, displayed);
      const match = displayed.match(/Questions?\s+(\d+)\s*[–-]\s*(\d+)/i);
      if (!match) continue;
      const numbers = responseNumbers(section);
      const expected = [Math.min(...numbers), Math.max(...numbers)];
      const stated = [Number(match[1]), Number(match[2])];
      if (stated[0] !== expected[0] || stated[1] !== expected[1]) {
        displayedMismatches.push(`${mockId} part ${section.part}: says ${stated.join('–')}, has ${expected.join('–')}`);
      }
      if (section.instructions !== displayed) {
        sourceMismatches.push(`${mockId} part ${section.part}: ${section.instructions} -> ${displayed}`);
      }
    }
  }
  assert.deepEqual(displayedMismatches, []);
  assert.deepEqual(sourceMismatches, [
    'set-4 part 3: You will hear two students discussing a research project on social media and well-being. Listen and answer Questions 21–30. -> You will hear two students discussing a research project on social media and well-being. Listen and answer Questions 21–27.',
  ]);
});

test('client payloads never expose answer keys or transcripts', () => {
  for (const mockId of IELTS_SECTIONAL_LISTENING_SET_IDS) {
    const practice = selectIeltsListeningPractice(getMock('ielts', mockId));
    assert.ok(practice);
    assertNoKeys(practice);
  }
});

test('server scoring returns 40/40 and a complete four-part breakdown for every set', () => {
  for (const mockId of IELTS_SECTIONAL_LISTENING_SET_IDS) {
    const mock = getMock('ielts', mockId);
    const result = scoreIeltsListeningPracticeAttempt(mock, perfectAnswers(mock));
    assert.equal(result.correct, 40, mockId);
    assert.equal(result.denominator, 40);
    assert.equal(result.band, 9);
    assert.deepEqual(result.parts.map(part => part.part), [1, 2, 3, 4]);
    assert.equal(result.parts.reduce((total, part) => total + part.total, 0), 40);
    assert.ok(result.parts.every(part => part.correct === part.total));
    assert.equal('answers' in result, false);
  }
});

test('score endpoint accepts the exact set contract and rejects stale or injected fields', async () => {
  const mock = getMock('ielts', 'set-2');
  const practice = selectIeltsListeningPractice(mock);
  const validBody = {
    mockId: practice.sourceMockId,
    objectId: practice.objectId,
    contentVersion: practice.contentVersion,
    answers: perfectAnswers(mock),
  };
  const validResponse = await scoreListening(new Request('http://localhost/api/practica/ielts/listening/score', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(validBody) }));
  assert.equal(validResponse.status, 200);
  assert.equal((await validResponse.json()).correct, 40);

  const staleResponse = await scoreListening(new Request('http://localhost/api/practica/ielts/listening/score', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...validBody, contentVersion: 'ielts-set-2-v0' }) }));
  assert.equal(staleResponse.status, 409);

  const injected = structuredClone(validBody);
  injected.answers.fills['unknown__999'] = 'leaked';
  const injectedResponse = await scoreListening(new Request('http://localhost/api/practica/ielts/listening/score', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(injected) }));
  assert.equal(injectedResponse.status, 400);
});

test('routes provide free navigation, server scoring, replay controls and student PDFs', async () => {
  const runnerPath = 'src/app/(site)/practica/ielts/listening/simulacros/practica/[mockId]/IELTSListeningSectionRunner.tsx';
  const pagePath = 'src/app/(site)/practica/ielts/listening/simulacros/practica/[mockId]/page.tsx';
  const [runner, page, library, player, pdf] = await Promise.all([
    readFile(path.join(ROOT, runnerPath), 'utf8'),
    readFile(path.join(ROOT, pagePath), 'utf8'),
    readFile(path.join(ROOT, 'src/app/(site)/practica/ielts/listening/simulacros/page.tsx'), 'utf8'),
    readFile(path.join(ROOT, 'src/components/exam-runner/primitives.tsx'), 'utf8'),
    readFile(path.join(ROOT, 'src/lib/pdf/generateIeltsListeningWorksheetPdf.ts'), 'utf8'),
  ]);
  assert.match(page, /index:\s*false/);
  assert.match(page, /generateStaticParams/);
  assert.match(page, /key=\{practice\.id\}/);
  assert.match(library, /IELTS_SECTIONAL_LISTENING_SET_IDS\.map/);
  assert.match(runner, /replayable/);
  assert.doesNotMatch(runner, /Timer/);
  assert.match(runner, /setPartIndex/);
  assert.match(runner, /\/api\/practica\/ielts\/listening\/score/);
  assert.match(runner, /generateIeltsListeningWorksheetPdf/);
  assert.match(player, /Go back 10 seconds/);
  assert.match(player, /type="range"/);
  assert.doesNotMatch(pdf, /\.answers|\.answer\b/);
  assert.match(pdf, /Blank answer sheet/);
});
