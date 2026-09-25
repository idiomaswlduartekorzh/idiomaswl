import assert from 'node:assert/strict';
import test from 'node:test';

import {
  DIAGNOSTIC_WRITING_CRITERIA,
  validateWritingRubric,
} from '../src/lib/diagnostic/writing.ts';
import {
  compareWritingEvaluations,
  consolidateWritingEvidence,
  diagnosticWritingResponseSha256,
  selectDiagnosticWritingPrompt,
  validateDiagnosticWritingEvaluation,
  validateDiagnosticWritingResponse,
} from '../src/server/diagnostic/writing.ts';

const prompt = {
  id: 'en-b1-writing-01', contentVersion: '1', language: 'en', levelCandidate: 'B1', title: 'A local change',
  situation: 'Your community is considering a change.', instructions: ['Describe it.', 'Explain your opinion.'],
  minimumWords: 100, maximumWords: 180, recommendedMinutes: 20,
};
const response = 'The library should open later because many students finish work at six. This change would help us study.';

function evaluation(evaluator, levels = ['B1', 'B1', 'B1', 'B1']) {
  return {
    evaluator,
    ...(evaluator === 'human' ? { reviewerId: 'reviewer-1', decision: 'accept' } : { model: 'model-1', warnings: [] }),
    rubricVersion: 'mcer-writing-v1', promptId: prompt.id, promptContentVersion: prompt.contentVersion,
    responseSha256: diagnosticWritingResponseSha256(response), evaluatedAt: '2026-09-24T12:00:00.000Z',
    criteria: DIAGNOSTIC_WRITING_CRITERIA.map((criterion, index) => ({
      criterion, level: levels[index], confidence: 0.75,
      evidence: [index % 2 ? 'many students finish work at six' : 'The library should open later'],
      rationale: 'The cited response evidence supports this judgment.',
    })),
  };
}

test('the MCER writing rubric covers every criterion and level', () => {
  assert.deepEqual(validateWritingRubric(), []);
  assert.equal(DIAGNOSTIC_WRITING_CRITERIA.length, 4);
});

test('selects only approved prompts and avoids prompts used before', () => {
  const bank = [1, 2, 3, 4].map(number => ({
    publicPrompt: { ...prompt, id: `en-b1-writing-0${number}` },
    status: 'pilot', exposure: 'reserved', review: { status: 'approved' },
    source: { kind: 'welearn-original', reference: 'fixture' },
  }));
  bank.push({ ...bank[0], publicPrompt: { ...prompt, id: 'draft-prompt' }, review: { status: 'draft' } });
  const first = selectDiagnosticWritingPrompt(bank, 'en', 'B1', 'attempt-writing');
  const repeated = selectDiagnosticWritingPrompt([...bank].reverse(), 'en', 'B1', 'attempt-writing');
  assert.equal(first.id, repeated.id);
  const next = selectDiagnosticWritingPrompt(bank, 'en', 'B1', 'attempt-writing', new Set([first.id]));
  assert.notEqual(next.id, first.id);
  assert.notEqual(first.id, 'draft-prompt');
});

test('evaluation validation binds prompt, response and quoted evidence', () => {
  assert.deepEqual(validateDiagnosticWritingEvaluation(evaluation('automated'), prompt, response), []);
  const forged = evaluation('automated');
  forged.responseSha256 = '0'.repeat(64);
  forged.criteria[0].evidence = ['This sentence was never written.'];
  const errors = validateDiagnosticWritingEvaluation(forged, prompt, response);
  assert.ok(errors.includes('evaluation does not match the submitted writing response'));
  assert.ok(errors.some(error => error.includes('evidence absent')));
});

test('writing response length is checked against the server prompt', () => {
  assert.ok(validateDiagnosticWritingResponse(prompt, 'Too short.').some(error => error.includes('at least')));
  const validPrompt = { ...prompt, minimumWords: 3, maximumWords: 30 };
  assert.deepEqual(validateDiagnosticWritingResponse(validPrompt, response), []);
});

test('material automated-human disagreement requires adjudication', () => {
  const agreement = compareWritingEvaluations(evaluation('automated'), evaluation('human'));
  assert.equal(agreement.exactAgreement, 1);
  assert.equal(agreement.requiresAdjudication, false);
  const disagreement = compareWritingEvaluations(
    evaluation('automated', ['A2', 'B1', 'A2', 'B1']),
    evaluation('human', ['B2', 'B1', 'B2', 'B1']),
  );
  assert.equal(disagreement.maximumLevelDifference, 2);
  assert.equal(disagreement.requiresAdjudication, true);
});

test('writing level is withheld until human review and adjudication are complete', () => {
  const automated = evaluation('automated', ['A2', 'B1', 'A2', 'B1']);
  assert.equal(consolidateWritingEvidence({ automated }).reviewStatus, 'awaiting-human');
  const human = evaluation('human', ['B2', 'B1', 'B2', 'B1']);
  const pending = consolidateWritingEvidence({ automated, human });
  assert.equal(pending.status, 'not-estimated');
  assert.equal(pending.reviewStatus, 'awaiting-adjudication');
  const adjudicated = evaluation('human', ['B1', 'B1', 'B1', 'B1']);
  const final = consolidateWritingEvidence({ automated, human, adjudicated });
  assert.equal(final.status, 'provisional');
  assert.equal(final.estimatedLevel, 'B1');
  assert.equal(final.reviewStatus, 'human-reviewed');
});
