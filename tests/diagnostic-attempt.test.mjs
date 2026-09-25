import assert from 'node:assert/strict';
import test from 'node:test';

import {
  assertDiagnosticAttemptAccess,
  assertDiagnosticStatusTransition,
  diagnosticSubmissionDigest,
  locatorDecisionFromResponses,
  scoreDiagnosticStage,
} from '../src/server/diagnostic/attempt.ts';

const skills = ['reading', 'listening', 'grammar', 'vocabulary'];
const levels = ['A2', 'B1', 'B2'];

function record(skill, level, answer = 'b') {
  const id = `${skill}-${level}`;
  return {
    publicItem: {
      id, contentVersion: 'v1', language: 'en', skill, subdomain: 'fixture', levelCandidate: level,
      prompt: id,
      stimulus: skill === 'listening'
        ? { kind: 'audio', mediaId: `audio-${id}`, src: `/private/${id}.mp3`, startMs: 0, endMs: 1000, maxPlays: 2 }
        : { kind: 'none' },
      response: { kind: 'single-choice', optionIds: ['a', 'b', 'c'] },
      displayOptions: [{ id: 'a', text: 'A' }, { id: 'b', text: 'B' }, { id: 'c', text: 'C' }],
    },
    status: 'pilot', exposure: 'reserved', review: { status: 'approved' },
    scoring: { kind: 'single-choice', optionId: answer }, rationale: { key: 'Because' },
    source: { kind: 'welearn-original', reference: 'fixture' }, levelRange: [level, level],
  };
}

const records = skills.flatMap(skill => levels.map(level => record(skill, level)));
const stage = {
  stageId: 'locator-1', kind: 'locator', routeId: null,
  itemIds: records.map(item => item.publicItem.id),
  contentVersions: Object.fromEntries(records.map(item => [item.publicItem.id, 'v1'])),
  issuedAt: '2026-09-24T12:00:00.000Z',
};

function submissions(optionId = 'b') {
  return records.map(item => ({
    itemId: item.publicItem.id,
    contentVersion: 'v1',
    response: { kind: 'single-choice', optionId },
    responseMs: 1000,
    audioPlayCount: item.publicItem.skill === 'listening' ? 1 : 0,
  }));
}

test('scores only the exact items and versions served by the stage', () => {
  const scored = scoreDiagnosticStage(stage, records, submissions());
  assert.equal(scored.length, 12);
  assert.equal(scored.every(response => response.outcome === 'correct'), true);

  const wrongVersion = submissions();
  wrongVersion[0] = { ...wrongVersion[0], contentVersion: 'v2' };
  assert.throws(() => scoreDiagnosticStage(stage, records, wrongVersion), /content version mismatch/);

  const unknownOption = submissions();
  unknownOption[0] = { ...unknownOption[0], response: { kind: 'single-choice', optionId: 'forged' } };
  assert.throws(() => scoreDiagnosticStage(stage, records, unknownOption), /unknown option/);
});

test('rejects missing, duplicate and unserved items', () => {
  assert.throws(() => scoreDiagnosticStage(stage, records, submissions().slice(1)), /explicitly answer or omit/);
  const duplicate = submissions();
  duplicate[1] = { ...duplicate[1], itemId: duplicate[0].itemId };
  assert.throws(() => scoreDiagnosticStage(stage, records, duplicate), /submitted more than once/);
  const forged = submissions();
  forged[0] = { ...forged[0], itemId: 'not-served' };
  assert.throws(() => scoreDiagnosticStage(stage, records, forged), /was not served/);
});

test('enforces audio playback limits and distinguishes omissions', () => {
  const excessive = submissions();
  const listeningIndex = excessive.findIndex(item => item.itemId.startsWith('listening'));
  excessive[listeningIndex] = { ...excessive[listeningIndex], audioPlayCount: 3 };
  assert.throws(() => scoreDiagnosticStage(stage, records, excessive), /audio play count/);

  const omitted = submissions();
  omitted[listeningIndex] = { ...omitted[listeningIndex], response: { kind: 'single-choice', optionId: null } };
  const scored = scoreDiagnosticStage(stage, records, omitted);
  assert.equal(scored[listeningIndex].outcome, 'omitted');
  assert.equal(locatorDecisionFromResponses(records, scored).totalOmitted, 1);
});

test('derives the route from server-computed outcomes', () => {
  const allCorrect = scoreDiagnosticStage(stage, records, submissions('b'));
  assert.equal(locatorDecisionFromResponses(records, allCorrect).routeId, 'high-c1-c2');
  const allWrong = scoreDiagnosticStage(stage, records, submissions('a'));
  assert.equal(locatorDecisionFromResponses(records, allWrong).routeId, 'low-a1-a2');
});

test('submission digests are stable across item and multi-select order', () => {
  const first = [
    { itemId: 'two', contentVersion: '1', response: { kind: 'multiple-choice', optionIds: ['b', 'a'] }, responseMs: 5, audioPlayCount: 0 },
    { itemId: 'one', contentVersion: '1', response: { kind: 'single-choice', optionId: 'c' }, responseMs: 4, audioPlayCount: 0 },
  ];
  const second = [
    first[1],
    { ...first[0], response: { kind: 'multiple-choice', optionIds: ['a', 'b'] } },
  ];
  assert.equal(diagnosticSubmissionDigest(first), diagnosticSubmissionDigest(second));
});

test('attempt access and state transitions reject stale or foreign writes', () => {
  assert.doesNotThrow(() => assertDiagnosticStatusTransition('locator', 'precision'));
  assert.throws(() => assertDiagnosticStatusTransition('locator', 'completed'), /invalid diagnostic transition/);
  const attempt = { userId: 'user-1', expiresAt: '2026-09-25T00:00:00.000Z', status: 'locator' };
  assert.doesNotThrow(() => assertDiagnosticAttemptAccess(attempt, 'user-1', new Date('2026-09-24T13:00:00.000Z')));
  assert.throws(() => assertDiagnosticAttemptAccess(attempt, 'user-2'), /does not belong/);
  assert.throws(() => assertDiagnosticAttemptAccess(attempt, 'user-1', new Date('2026-09-25T00:00:00.000Z')), /expired/);
});

