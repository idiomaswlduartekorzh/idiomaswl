import assert from 'node:assert/strict';
import test from 'node:test';

import { DIAGNOSTIC_SKILLS } from '../src/lib/diagnostic/types.ts';
import {
  buildDiagnosticCompositeResult,
  ENGLISH_PILOT_CALIBRATION,
  estimateObjectiveSkillEvidence,
  validateDiagnosticCalibrationPolicy,
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

test('a two-level skill spread remains explicit in the composite result', () => {
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
  assert.equal(result.globalLevel, 'B1');
  assert.equal(result.profileIsUneven, true);
  assert.ok(result.warnings.includes('UNEVEN_SKILL_PROFILE'));
});
