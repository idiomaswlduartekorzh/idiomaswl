import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  buildIcfesAutomaticFeedback,
  ICFES_AUTOMATIC_FEEDBACK_VERSION,
} from '../src/lib/icfes/automatic-feedback.ts';

const read = (path) => readFileSync(path, 'utf8');

const result = {
  attemptId: '123e4567-e89b-42d3-a456-426614174000',
  examId: 'mock-1', correct: 3, total: 5, percentage: 60,
  byPart: [
    { key: '1', label: 'Parte 1', correct: 2, total: 2, percentage: 100 },
    { key: '2', label: 'Parte 2', correct: 1, total: 3, percentage: 33 },
  ],
  bySkill: [
    { key: '1', label: 'Uso comunicativo', correct: 2, total: 2, percentage: 100 },
    { key: '2', label: 'Vocabulario', correct: 1, total: 3, percentage: 33 },
  ],
  recommendation: { label: 'Reforzar Vocabulario', href: '/practica/icfes-saber-11/parte-2' },
  officialResource: false, premiumEligible: true,
};

const questions = [
  { id: 'q-real-1', number: 1, part: 1, prompt: 'Saluda a una persona.', selectedOption: 'Hello', correctOption: 'Hello', correct: true, rationale: 'Es el saludo adecuado.' },
  { id: 'q-real-2', number: 2, part: 2, prompt: 'Elige el objeto correcto.', selectedOption: 'Desk', correctOption: 'Chair', correct: false, rationale: 'La descripción corresponde a una silla.' },
  { id: 'q-real-3', number: 3, part: 2, prompt: 'Completa el aviso.', selectedOption: null, correctOption: 'Closed', correct: false, rationale: 'El horario indica que está cerrado.' },
];

test('automatic feedback is deterministic and does not mutate its scored inputs', () => {
  const originalResult = structuredClone(result);
  const originalQuestions = structuredClone(questions);
  const first = buildIcfesAutomaticFeedback(result, questions);
  const second = buildIcfesAutomaticFeedback(structuredClone(result), structuredClone(questions));
  assert.deepEqual(first, second);
  assert.equal(first.version, ICFES_AUTOMATIC_FEEDBACK_VERSION);
  assert.deepEqual(result, originalResult);
  assert.deepEqual(questions, originalQuestions);
});

test('feedback ranks scored skills and references only real missed questions', () => {
  const feedback = buildIcfesAutomaticFeedback(result, questions);
  assert.equal(feedback.headline, 'Base en desarrollo');
  assert.equal(feedback.strongestAreas[0]?.label, 'Uso comunicativo');
  assert.equal(feedback.priorityAreas[0]?.label, 'Vocabulario');
  assert.deepEqual(feedback.questionFeedback.map((item) => item.questionId), ['q-real-2', 'q-real-3']);
  assert.equal(feedback.questionFeedback[0]?.skill, 'Vocabulario');
  assert.match(feedback.questionFeedback[0]?.guidance ?? '', /Desk/);
  assert.match(feedback.questionFeedback[0]?.guidance ?? '', /Chair/);
  assert.match(feedback.questionFeedback[1]?.guidance ?? '', /No registraste respuesta/);
  assert.doesNotMatch(JSON.stringify(feedback.questionFeedback), /q-real-1/);
});

test('paid detail builds the same feedback contract for one-time purchases and memberships', () => {
  const route = read('src/app/api/icfes/attempts/[attemptId]/detail/route.ts');
  assert.match(route, /automaticFeedback: buildIcfesAutomaticFeedback\(result, questions\)/);
  assert.match(route, /automaticFeedback: buildIcfesAutomaticFeedback\(base\.result as IcfesBasicResultDto, questions\)/);
});

test('paid client renders automatic feedback and safely recovers teacher status', () => {
  const client = read('src/app/(site)/practica/icfes-saber-11/resultados/[attemptId]/IcfesPaidResultClient.tsx');
  assert.match(client, /data-testid="icfes-automatic-feedback"/);
  assert.match(client, /automaticFeedback\.partFeedback/);
  assert.match(client, /automaticFeedback\.questionFeedback/);
  assert.match(client, /\/api\/icfes\/teacher-reviews\?attemptId=/);
  assert.match(client, /document\.visibilityState !== 'visible'/);
  assert.match(client, /window\.setInterval/);
  assert.match(client, /window\.clearInterval/);
  assert.match(client, /controller\?\.abort\(\)/);
  assert.match(client, /Actualizar estado/);
});
