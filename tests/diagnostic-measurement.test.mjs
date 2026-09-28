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

const WRITTEN_DISCOURSE_SUBDOMAINS = [
  'organisation-sequencing',
  'rhetorical-relations',
  'cohesion-reference',
  'audience-register',
  'revision-coherence',
  'cohesion-reference',
  'audience-register',
  'revision-coherence',
];

function writtenDiscourseRecord(index, { subdomain, stimulusId } = {}) {
  const base = record(index);
  const id = `written-discourse-${index}`;
  return {
    ...base,
    publicItem: {
      ...base.publicItem,
      id,
      skill: 'written-discourse',
      subdomain: subdomain ?? WRITTEN_DISCOURSE_SUBDOMAINS[index],
      prompt: `Closed discourse decision ${index}`,
      stimulus: {
        kind: 'text',
        stimulusId: stimulusId ?? `written-discourse-text-${index}`,
        body: `Written discourse fixture ${index}`,
      },
    },
  };
}

function observe(records, omittedIndexes = []) {
  return records.map((item, index) => ({
    itemId: item.publicItem.id,
    outcome: omittedIndexes.includes(index) ? 'omitted' : 'correct',
  }));
}

test('written discourse is estimated from closed objective decisions when its full evidence floor is met', () => {
  const records = Array.from({ length: 7 }, (_, index) => writtenDiscourseRecord(index));
  const evidence = estimateObjectiveSkillEvidence(
    'written-discourse', records, observe(records, [6]), ENGLISH_PILOT_CALIBRATION,
  );
  assert.equal(evidence.status, 'provisional');
  assert.equal(evidence.skill, 'written-discourse');
  assert.equal(evidence.decisions, 7);
  assert.equal(evidence.attempted, 6);
  assert.equal(evidence.omitted, 1);
  assert.equal(evidence.distinctStimuli, 6);
  assert.equal('languageUseIntegration' in evidence, false);
});

test('written discourse requires broad subdomain coverage including organisation and rhetorical relations', () => {
  const narrow = Array.from({ length: 7 }, (_, index) => writtenDiscourseRecord(index, {
    subdomain: ['organisation-sequencing', 'rhetorical-relations', 'cohesion-reference'][index % 3],
  }));
  assert.equal(estimateObjectiveSkillEvidence(
    'written-discourse', narrow, observe(narrow), ENGLISH_PILOT_CALIBRATION,
  ).status, 'not-estimated');

  for (const required of ['organisation-sequencing', 'rhetorical-relations']) {
    const withoutRequired = Array.from({ length: 7 }, (_, index) => writtenDiscourseRecord(index, {
      subdomain: WRITTEN_DISCOURSE_SUBDOMAINS[index] === required
        ? 'revision-coherence'
        : WRITTEN_DISCOURSE_SUBDOMAINS[index],
    }));
    assert.equal(estimateObjectiveSkillEvidence(
      'written-discourse', withoutRequired, observe(withoutRequired), ENGLISH_PILOT_CALIBRATION,
    ).status, 'not-estimated', required);
  }
});

test('written discourse counts only attempted stimuli and permits at most one omission', () => {
  const sharedStimulus = Array.from({ length: 7 }, (_, index) => writtenDiscourseRecord(index, {
    stimulusId: index === 5 ? 'written-discourse-text-4' : undefined,
  }));
  assert.equal(estimateObjectiveSkillEvidence(
    'written-discourse', sharedStimulus, observe(sharedStimulus, [6]), ENGLISH_PILOT_CALIBRATION,
  ).status, 'not-estimated');

  const twoOmissions = Array.from({ length: 8 }, (_, index) => writtenDiscourseRecord(index));
  assert.equal(estimateObjectiveSkillEvidence(
    'written-discourse', twoOmissions, observe(twoOmissions, [6, 7]), ENGLISH_PILOT_CALIBRATION,
  ).status, 'not-estimated');
});

test('global result is withheld until all five skills have evidence', () => {
  const incomplete = DIAGNOSTIC_SKILLS.map(skill => ({
    skill,
    decisions: skill === 'written-discourse' ? 0 : 6,
    distinctStimuli: skill === 'written-discourse' ? 0 : 3,
    status: skill === 'written-discourse' ? 'not-estimated' : 'provisional',
    ...(skill === 'written-discourse' ? {} : {
      estimatedLevel: 'B1', plausibleRange: ['A2', 'B2'], confidence: 0.6,
    }),
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
