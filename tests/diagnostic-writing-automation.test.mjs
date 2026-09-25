import assert from 'node:assert/strict';
import test from 'node:test';

import {
  DIAGNOSTIC_WRITING_RUBRIC_VERSION,
  buildDiagnosticAutomatedWritingEvaluation,
  buildDiagnosticWritingAutomationRequest,
} from '../src/server/diagnostic/writing-automation.ts';

const prompt = {
  id: 'en-b1-writing-original-01', contentVersion: 'fixture-v1', language: 'en', levelCandidate: 'B1',
  title: 'Community proposal', situation: 'Write to a local coordinator.',
  instructions: ['Explain the problem.', 'Suggest a practical response.'],
  minimumWords: 80, maximumWords: 180, recommendedMinutes: 20,
};
const responseText = 'The library closes too early for students who work. I suggest opening until eight on Tuesdays because many of us finish work at six. Volunteers could cover the final hour, and the council could review attendance after one month.';
const rawOutput = {
  criteria: [
    { criterion: 'task-fulfilment', level: 'B1', confidence: 0.72, evidence: ['I suggest opening until eight on Tuesdays'], rationale: 'The response explains the problem and supplies a relevant practical proposal.' },
    { criterion: 'organisation', level: 'B1', confidence: 0.68, evidence: ['because many of us finish work at six'], rationale: 'The short response links its proposal to a clear reason and then adds implementation detail.' },
    { criterion: 'grammar-control', level: 'B1', confidence: 0.7, evidence: ['Volunteers could cover the final hour'], rationale: 'The learner controls frequent clause patterns and a modal construction without obscuring meaning.' },
    { criterion: 'vocabulary-control', level: 'B1', confidence: 0.66, evidence: ['the council could review attendance'], rationale: 'The lexical choices are suitable for a familiar civic proposal and communicate the intended action.' },
  ],
  warnings: ['Short sample; confidence remains provisional.'],
};

test('automation request is CEFR-native and never asks the model for an overall score', () => {
  const request = buildDiagnosticWritingAutomationRequest(prompt, responseText);
  const payload = JSON.parse(request.input);
  assert.equal(payload.rubricVersion, DIAGNOSTIC_WRITING_RUBRIC_VERSION);
  assert.deepEqual(Object.keys(payload.rubric), ['task-fulfilment', 'organisation', 'grammar-control', 'vocabulary-control']);
  assert.deepEqual(Object.keys(payload.rubric['grammar-control']), ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']);
  assert.equal(payload.learnerResponse, responseText);
  assert.doesNotMatch(JSON.stringify(request.responseSchema), /overall|band|pass|fail/iu);
  assert.match(request.systemInstruction, /Do not produce an overall level/iu);
  assert.match(request.systemInstruction, /do not convert from IELTS, TOEFL/iu);
});

test('server seals valid provider evidence with immutable prompt and response identity', () => {
  const evaluation = buildDiagnosticAutomatedWritingEvaluation({
    rawOutput, prompt, responseText, model: 'fixture-provider/model-v1',
    evaluatedAt: new Date('2026-09-25T15:00:00.000Z'),
  });
  assert.equal(evaluation.evaluator, 'automated');
  assert.equal(evaluation.rubricVersion, DIAGNOSTIC_WRITING_RUBRIC_VERSION);
  assert.equal(evaluation.promptId, prompt.id);
  assert.match(evaluation.responseSha256, /^[a-f0-9]{64}$/u);
  assert.equal(evaluation.criteria.length, 4);
  assert.equal(evaluation.criteria.every(criterion => criterion.confidence <= 0.8), true);
});

test('provider cannot invent evidence, duplicate criteria or claim calibrated confidence', () => {
  assert.throws(() => buildDiagnosticAutomatedWritingEvaluation({
    rawOutput: { ...rawOutput, criteria: rawOutput.criteria.map((criterion, index) => index === 0
      ? { ...criterion, evidence: ['This sentence was never written.'] } : criterion) },
    prompt, responseText, model: 'fixture/model', evaluatedAt: new Date(),
  }), /evidence is invalid/);
  assert.throws(() => buildDiagnosticAutomatedWritingEvaluation({
    rawOutput: { ...rawOutput, criteria: rawOutput.criteria.map((criterion, index) => index === 1
      ? { ...criterion, criterion: 'task-fulfilment' } : criterion) },
    prompt, responseText, model: 'fixture/model', evaluatedAt: new Date(),
  }), /invalid response/);
  assert.throws(() => buildDiagnosticAutomatedWritingEvaluation({
    rawOutput: { ...rawOutput, criteria: rawOutput.criteria.map((criterion, index) => index === 2
      ? { ...criterion, confidence: 0.95 } : criterion) },
    prompt, responseText, model: 'fixture/model', evaluatedAt: new Date(),
  }), /invalid response/);
});
