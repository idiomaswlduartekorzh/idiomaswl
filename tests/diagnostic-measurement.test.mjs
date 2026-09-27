import assert from 'node:assert/strict';
import test from 'node:test';

import { DIAGNOSTIC_SKILLS } from '../src/lib/diagnostic/types.ts';
import {
  buildDiagnosticCompositeResult,
  ENGLISH_PILOT_CALIBRATION,
  estimateObjectiveSkillEvidence,
  integrateWritingLanguageUseEvidence,
  validateDiagnosticCalibrationPolicy,
  validateDiagnosticLanguageUseIntegrationPolicy,
} from '../src/server/diagnostic/measurement.ts';

function record(index, parameters = undefined) {
  const id = `reading-${index}`;
  return {
    publicItem: {
      id, contentVersion: '1', language: 'en', skill: 'reading', subdomain: 'detail', levelCandidate: 'B1',
      prompt: id, stimulus: { kind: 'text', stimulusId: `text-${index}`, body: `Text ${index}` },
      response: { kind: 'single-choice', optionIds: ['a', 'b'] }, displayOptions: [{ id: 'a', text: 'A' }, { id: 'b', text: 'B' }],
    },
    status: 'pilot', exposure: 'reserved', review: { status: 'approved' },
    scoring: { kind: 'single-choice', optionId: 'a' }, rationale: { key: 'Fixture' },
    source: { kind: 'welearn-original', reference: 'fixture' }, levelRange: ['B1', 'B1'], parameters,
  };
}

test('withholds a skill estimate when the evidence floor is not met', () => {
  const records = [0, 1, 2, 3].map(index => record(index));
  const evidence = estimateObjectiveSkillEvidence('reading', records, records.map(item => ({ itemId: item.publicItem.id, outcome: 'correct' })), ENGLISH_PILOT_CALIBRATION);
  assert.equal(evidence.status, 'not-estimated');
  assert.equal(evidence.estimatedLevel, undefined);
});

test('omissions remain visible and do not masquerade as incorrect answers', () => {
  const records = [0, 1, 2, 3, 4].map(index => record(index));
  const observations = records.map((item, index) => ({ itemId: item.publicItem.id, outcome: index === 0 ? 'omitted' : 'correct' }));
  const evidence = estimateObjectiveSkillEvidence('reading', records, observations, ENGLISH_PILOT_CALIBRATION);
  assert.equal(evidence.status, 'provisional');
  assert.equal(evidence.omitted, 1);
  assert.equal(evidence.attempted, 4);
  assert.equal(evidence.observedAccuracy, 1);
  assert.ok(evidence.confidence <= 0.65);
});

test('more correct responses produce a non-decreasing ability estimate', () => {
  const records = [0, 1, 2, 3, 4, 5].map(index => record(index, {
    sampleSize: 500, difficulty: -1 + index * 0.4, discrimination: 1.2,
  }));
  const policy = { ...ENGLISH_PILOT_CALIBRATION, status: 'validated' };
  const estimates = Array.from({ length: records.length + 1 }, (_, correctCount) =>
    estimateObjectiveSkillEvidence('reading', records, records.map((item, index) => ({
      itemId: item.publicItem.id, outcome: index < correctCount ? 'correct' : 'incorrect',
    })), policy).theta,
  );
  for (let index = 1; index < estimates.length; index += 1) assert.ok(estimates[index] >= estimates[index - 1]);
  const calibrated = estimateObjectiveSkillEvidence('reading', records, records.map(item => ({ itemId: item.publicItem.id, outcome: 'correct' })), policy);
  assert.equal(calibrated.status, 'calibrated');
  assert.ok(calibrated.plausibleRange);
});

test('rejects unordered cuts and impossible item parameters', () => {
  assert.ok(validateDiagnosticCalibrationPolicy({
    ...ENGLISH_PILOT_CALIBRATION,
    cutScores: { ...ENGLISH_PILOT_CALIBRATION.cutScores, B2: -2 },
  }).some(error => error.includes('strictly increasing')));
  const records = [0, 1, 2, 3, 4].map(index => record(index, {
    sampleSize: 500, difficulty: 0, discrimination: index === 0 ? 0 : 1,
  }));
  assert.throws(() => estimateObjectiveSkillEvidence(
    'reading', records, records.map(item => ({ itemId: item.publicItem.id, outcome: 'correct' })),
    { ...ENGLISH_PILOT_CALIBRATION, status: 'validated' },
  ), /invalid item parameters/);
});

function finalWritingEvaluation(grammarLevel, vocabularyLevel, confidence = 0.8) {
  return {
    evaluator: 'human', reviewerId: 'reviewer-1', rubricVersion: 'mcer-writing-v2',
    promptId: 'prompt-1', promptContentVersion: '1', responseSha256: 'a'.repeat(64),
    responseQuality: { taskRelevance: 'on-task', authorship: 'no-concern', rationale: 'Sufficient fixture rationale for review.' },
    decision: 'accept', evaluatedAt: '2026-09-25T12:00:00.000Z',
    criteria: [
      { criterion: 'task-achievement', level: 'B1', confidence, evidence: ['x'], rationale: 'fixture' },
      { criterion: 'organization', level: 'B1', confidence, evidence: ['x'], rationale: 'fixture' },
      { criterion: 'grammar-control', level: grammarLevel, confidence, evidence: ['x'], rationale: 'fixture' },
      { criterion: 'vocabulary-control', level: vocabularyLevel, confidence, evidence: ['x'], rationale: 'fixture' },
    ],
  };
}

function languageUseObjective(skill, overrides = {}) {
  return {
    skill, decisions: 6, distinctStimuli: 6, attempted: 6, omitted: 0, observedAccuracy: 0.67,
    status: 'calibrated', estimatedLevel: 'B1', plausibleRange: ['B1', 'B1'], confidence: 0.6,
    theta: -0.2, standardError: 0.5, calibrationVersion: 'fixture-calibration-v1',
    ...overrides,
  };
}

test('reviewed writing corroborates language-use evidence without changing its level or counts', () => {
  const objective = languageUseObjective('grammar');
  const integrated = integrateWritingLanguageUseEvidence({
    objective,
    finalWritingEvaluation: finalWritingEvaluation('B1', 'B1'),
  });
  assert.equal(integrated.estimatedLevel, 'B1');
  assert.equal(integrated.decisions, 6);
  assert.equal(integrated.attempted, 6);
  assert.equal(integrated.status, 'provisional');
  assert.equal(integrated.confidence, 0.6);
  assert.equal(integrated.languageUseIntegration.outcome, 'corroborated');
  assert.equal(integrated.languageUseIntegration.automaticLevelShift, false);
});

test('adjacent and divergent writing evidence widen uncertainty but never shift the objective point estimate', () => {
  const adjacent = integrateWritingLanguageUseEvidence({
    objective: languageUseObjective('grammar'),
    finalWritingEvaluation: finalWritingEvaluation('B2', 'B1'),
  });
  assert.equal(adjacent.estimatedLevel, 'B1');
  assert.deepEqual(adjacent.plausibleRange, ['B1', 'B2']);
  assert.equal(adjacent.confidence, 0.51);
  assert.equal(adjacent.languageUseIntegration.outcome, 'adjacent');

  const divergent = integrateWritingLanguageUseEvidence({
    objective: languageUseObjective('vocabulary'),
    finalWritingEvaluation: finalWritingEvaluation('B1', 'C1'),
  });
  assert.equal(divergent.estimatedLevel, 'B1');
  assert.deepEqual(divergent.plausibleRange, ['B1', 'C1']);
  assert.equal(divergent.confidence, 0.39);
  assert.equal(divergent.languageUseIntegration.levelDifference, 2);
  const skills = DIAGNOSTIC_SKILLS.map(skill => skill === 'vocabulary' ? divergent : ({
    skill, decisions: 6, distinctStimuli: 3, status: 'provisional', estimatedLevel: 'B1',
    plausibleRange: ['B1', 'B1'], confidence: 0.6,
  }));
  const result = buildDiagnosticCompositeResult({
    attemptId: 'attempt-language-use', blueprintVersion: 'blueprint-1', bankVersion: 'bank-1', skills,
    generatedAt: '2026-09-24T12:00:00.000Z', validUntil: '2027-03-23T12:00:00.000Z',
  });
  assert.ok(result.warnings.includes('VOCABULARY_WRITING_EVIDENCE_DIVERGES'));
});

test('one writing sample cannot rescue missing objective language-use evidence', () => {
  const integrated = integrateWritingLanguageUseEvidence({
    objective: languageUseObjective('grammar', {
      decisions: 3, attempted: 3, status: 'not-estimated', estimatedLevel: undefined,
      plausibleRange: undefined, confidence: undefined, theta: undefined, standardError: undefined,
    }),
    finalWritingEvaluation: finalWritingEvaluation('C2', 'C2'),
  });
  assert.equal(integrated.status, 'not-estimated');
  assert.equal(integrated.estimatedLevel, undefined);
  assert.equal(integrated.decisions, 3);
  assert.equal(integrated.languageUseIntegration.outcome, 'objective-insufficient');
});

test('language-use integration rejects policies that imply weak materiality or inverted confidence penalties', () => {
  assert.ok(validateDiagnosticLanguageUseIntegrationPolicy({
    version: 'bad', status: 'pilot', materialDifferenceLevels: 1, confidenceCap: 0.65,
    adjacentConfidenceMultiplier: 0.7, divergentConfidenceMultiplier: 0.8,
  }).length >= 2);
});

test('global result is withheld until all five skills have evidence', () => {
  const incomplete = DIAGNOSTIC_SKILLS.map(skill => ({
    skill, decisions: skill === 'writing' ? 0 : 6, distinctStimuli: skill === 'writing' ? 0 : 3,
    status: skill === 'writing' ? 'not-estimated' : 'provisional',
    ...(skill === 'writing' ? {} : { estimatedLevel: 'B1', plausibleRange: ['A2', 'B2'], confidence: 0.6 }),
  }));
  const result = buildDiagnosticCompositeResult({
    attemptId: 'attempt-1', blueprintVersion: 'blueprint-1', bankVersion: 'bank-1', skills: incomplete,
    generatedAt: '2026-09-24T12:00:00.000Z',
    validUntil: '2027-03-23T12:00:00.000Z',
  });
  assert.equal(result.globalLevel, null);
  assert.equal(result.overallStatus, 'not-estimated');
  assert.ok(result.warnings.includes('GLOBAL_WITHHELD_INCOMPLETE_EVIDENCE'));
});

test('a two-level skill spread withholds the unsupported global level', () => {
  const levels = ['A2', 'B2', 'B1', 'B2', 'B1'];
  const skills = DIAGNOSTIC_SKILLS.map((skill, index) => ({
    skill, decisions: 6, distinctStimuli: 3, status: 'provisional', estimatedLevel: levels[index],
    plausibleRange: [levels[index], levels[index]], confidence: 0.6,
  }));
  const result = buildDiagnosticCompositeResult({
    attemptId: 'attempt-2', blueprintVersion: 'blueprint-1', bankVersion: 'bank-1', skills,
    generatedAt: '2026-09-24T12:00:00.000Z',
    validUntil: '2027-03-23T12:00:00.000Z',
  });
  assert.equal(result.globalLevel, null);
  assert.equal(result.globalRange, null);
  assert.equal(result.profileIsUneven, true);
  assert.ok(result.warnings.includes('UNEVEN_SKILL_PROFILE'));
  assert.ok(result.warnings.includes('GLOBAL_WITHHELD_UNEVEN_PROFILE'));
});
