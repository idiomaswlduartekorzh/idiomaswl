import assert from 'node:assert/strict';
import test from 'node:test';

import { ENGLISH_DIAGNOSTIC_BLUEPRINT } from '../src/lib/diagnostic/blueprint.ts';
import { DIAGNOSTIC_ENGINE_VERSION } from '../src/lib/diagnostic/delivery.ts';
import { DIAGNOSTIC_WRITING_CRITERIA } from '../src/lib/diagnostic/writing.ts';
import { finalizeEnglishDiagnostic } from '../src/server/diagnostic/finalize-core.ts';
import { diagnosticWritingResponseSha256 } from '../src/server/diagnostic/writing.ts';

const bankVersion = 'fixture-bank-v1';
const prompt = {
  id: 'en-b1-writing-01', contentVersion: '1', language: 'en', levelCandidate: 'B1', title: 'Proposal',
  situation: 'Your library may change its hours.', instructions: ['Describe your position.', 'Give reasons.'],
  minimumWords: 8, maximumWords: 100, recommendedMinutes: 15,
};
const responseText = 'The library should open later because working students need a quiet place to study after work.';
const attempt = {
  id: 'attempt-1', userId: 'student-1', version: 4, status: 'scoring', bankVersion,
  blueprintVersion: ENGLISH_DIAGNOSTIC_BLUEPRINT.id, engineVersion: DIAGNOSTIC_ENGINE_VERSION,
  resultValidityDays: 30,
};

function evaluation(evaluator, levels = ['B1', 'B1', 'B1', 'B1']) {
  return {
    evaluator,
    ...(evaluator === 'automated' ? { model: 'fixture-model', warnings: [] } : {
      reviewerId: 'admin-1', decision: 'accept',
      responseQuality: {
        taskRelevance: 'on-task', authorship: 'no-concern',
        rationale: 'The response addresses the task and shows no material authorship concern.',
      },
    }),
    rubricVersion: 'mcer-writing-v1', promptId: prompt.id, promptContentVersion: prompt.contentVersion,
    responseSha256: diagnosticWritingResponseSha256(responseText), evaluatedAt: '2026-09-25T12:00:00.000Z',
    criteria: DIAGNOSTIC_WRITING_CRITERIA.map((criterion, index) => ({
      criterion, level: levels[index], confidence: 0.8,
      evidence: [index % 2 ? 'working students need a quiet place' : 'The library should open later'],
      rationale: 'The quoted language supports the criterion-level judgment.',
    })),
  };
}

function record(skill, index) {
  const id = `${skill}-${index}`;
  const stimulus = skill === 'reading'
    ? { kind: 'text', stimulusId: `reading-text-${Math.floor(index / 2)}`, body: 'A sufficiently varied fixture.' }
    : skill === 'listening'
      ? { kind: 'audio', mediaId: `audio-${Math.floor(index / 2)}`, src: `/api/audio-${index}`, startMs: 0, endMs: 1000, maxPlays: 2 }
      : { kind: 'none' };
  return {
    publicItem: {
      id, contentVersion: '1', language: 'en', skill, subdomain: 'detail', levelCandidate: 'B1', prompt: id,
      stimulus, response: { kind: 'single-choice', optionIds: [`${id}-a`, `${id}-b`] },
      displayOptions: [{ id: `${id}-a`, text: 'A' }, { id: `${id}-b`, text: 'B' }],
    },
    status: 'pilot', exposure: 'reserved', review: { status: 'approved' },
    scoring: { kind: 'single-choice', optionId: `${id}-a` }, rationale: { key: 'Fixture.' },
    source: { kind: 'welearn-original', reference: 'fixture' }, levelRange: ['B1', 'B1'],
  };
}

const objectiveBank = ['reading', 'listening', 'grammar', 'vocabulary'].flatMap(skill =>
  Array.from({ length: 6 }, (_, index) => record(skill, index)));
const observations = objectiveBank.map((record, index) => ({
  itemId: record.publicItem.id, outcome: index % 4 === 0 ? 'incorrect' : 'correct',
}));

test('finalizes all five skills and persists one versioned result', async () => {
  let persisted;
  const result = await finalizeEnglishDiagnostic({
    authenticatedAdminId: 'admin-1', attempt, prompt, responseText, observations,
    automated: evaluation('automated'), human: evaluation('human'),
  }, {
    objectiveBank, objectiveBankVersion: bankVersion, now: () => new Date('2026-09-25T13:00:00.000Z'),
    persist: async input => { persisted = input; return { replayed: false, version: 5 }; },
  });
  assert.equal(result.version, 5);
  assert.equal(result.resultProfile.skills.length, 5);
  assert.equal(result.resultProfile.globalLevel, 'B2');
  assert.equal(result.resultProfile.overallStatus, 'provisional');
  assert.equal(result.resultProfile.validUntil, '2026-10-25T13:00:00.000Z');
  assert.equal(persisted.finalEvidence.writing.reviewStatus, 'human-reviewed');
  assert.equal(persisted.finalEvidence.languageUse.length, 2);
  assert.deepEqual(persisted.finalEvidence.languageUse.map(item => item.skill), ['grammar', 'vocabulary']);
  assert.ok(persisted.finalEvidence.languageUse.every(item => item.decisions === 6 && item.attempted === 6));
  assert.ok(persisted.finalEvidence.languageUse.every(item => item.languageUseIntegration.automaticLevelShift === false));
  assert.equal(persisted.resultProfile.attemptId, attempt.id);
});

test('finalizes a consent-safe human-only writing path with null automated evidence', async () => {
  let persisted;
  const result = await finalizeEnglishDiagnostic({
    authenticatedAdminId: 'admin-1', attempt, prompt, responseText, observations,
    human: evaluation('human'),
  }, {
    objectiveBank, objectiveBankVersion: bankVersion, now: () => new Date('2026-09-25T13:00:00.000Z'),
    persist: async input => { persisted = input; return { replayed: false, version: 5 }; },
  });
  assert.equal(result.resultProfile.skills.find(skill => skill.skill === 'writing').reviewStatus, 'human-reviewed');
  assert.equal(persisted.automated, null);
  assert.equal('agreement' in persisted.finalEvidence.writing, false);
});

test('requires adjudication for material disagreement and binds the reviewer identity', async () => {
  const dependencies = {
    objectiveBank, objectiveBankVersion: bankVersion, now: () => new Date(),
    persist: async () => { throw new Error('must not persist'); },
  };
  await assert.rejects(() => finalizeEnglishDiagnostic({
    authenticatedAdminId: 'admin-1', attempt, prompt, responseText, observations,
    automated: evaluation('automated', ['A2', 'B1', 'A2', 'B1']),
    human: evaluation('human', ['B2', 'B1', 'B2', 'B1']),
  }, dependencies), /adjudication required/);
  await assert.rejects(() => finalizeEnglishDiagnostic({
    authenticatedAdminId: 'another-admin', attempt, prompt, responseText, observations,
    automated: evaluation('automated'), human: evaluation('human'),
  }, dependencies), /reviewer identity mismatch/);
});

test('adjudication is accepted only from a reviewer independent of the first human review', async () => {
  const automated = evaluation('automated', ['A2', 'B1', 'A2', 'B1']);
  const human = evaluation('human', ['B2', 'B1', 'B2', 'B1']);
  const adjudicated = { ...evaluation('human', ['B1', 'B1', 'B1', 'B1']), reviewerId: 'admin-2' };
  const successful = await finalizeEnglishDiagnostic({
    authenticatedAdminId: 'admin-2', attempt, prompt, responseText, observations,
    automated, human, adjudicated,
  }, {
    objectiveBank, objectiveBankVersion: bankVersion, now: () => new Date(),
    persist: async () => ({ replayed: false, version: 5 }),
  });
  assert.equal(successful.version, 5);
  await assert.rejects(() => finalizeEnglishDiagnostic({
    authenticatedAdminId: 'admin-1', attempt, prompt, responseText, observations,
    automated, human, adjudicated: { ...adjudicated, reviewerId: 'admin-1' },
  }, {
    objectiveBank, objectiveBankVersion: bankVersion, now: () => new Date(),
    persist: async () => ({ replayed: false, version: 5 }),
  }), /reviewer identity mismatch/);
});

test('independently excluded off-task writing completes with writing and global level withheld', async () => {
  let persisted;
  const human = {
    ...evaluation('human'), decision: 'exclude',
    responseQuality: {
      taskRelevance: 'off-task', authorship: 'no-concern',
      rationale: 'The response does not address the assigned situation or any required instruction.',
    },
  };
  const adjudicated = { ...human, reviewerId: 'admin-2' };
  const result = await finalizeEnglishDiagnostic({
    authenticatedAdminId: 'admin-2', attempt, prompt, responseText, observations,
    human, adjudicated,
  }, {
    objectiveBank, objectiveBankVersion: bankVersion, now: () => new Date('2026-09-25T13:00:00.000Z'),
    persist: async input => { persisted = input; return { replayed: false, version: 5 }; },
  });
  const writing = result.resultProfile.skills.find(skill => skill.skill === 'writing');
  assert.equal(writing.status, 'not-estimated');
  assert.equal(writing.reviewStatus, 'excluded');
  assert.deepEqual(writing.exclusionReasons, ['off-task']);
  assert.equal(result.resultProfile.globalLevel, null);
  assert.equal(result.resultProfile.overallStatus, 'not-estimated');
  assert.equal(persisted.finalEvidence.writing.reviewStatus, 'excluded');
  assert.deepEqual(persisted.finalEvidence.languageUse, []);
});

test('rejects unknown objective evidence and stale versions', async () => {
  const dependencies = {
    objectiveBank, objectiveBankVersion: bankVersion, now: () => new Date(),
    persist: async () => { throw new Error('must not persist'); },
  };
  await assert.rejects(() => finalizeEnglishDiagnostic({
    authenticatedAdminId: 'admin-1', attempt, prompt, responseText,
    observations: [...observations, { itemId: 'forged', outcome: 'correct' }],
    automated: evaluation('automated'), human: evaluation('human'),
  }, dependencies), /versioned bank/);
  await assert.rejects(() => finalizeEnglishDiagnostic({
    authenticatedAdminId: 'admin-1', attempt: { ...attempt, bankVersion: 'old' }, prompt, responseText, observations,
    automated: evaluation('automated'), human: evaluation('human'),
  }, dependencies), /version unavailable/);
});
