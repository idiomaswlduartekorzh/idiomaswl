import assert from 'node:assert/strict';
import test from 'node:test';

import {
  scoreDiagnosticResponse,
  toDiagnosticPublicItem,
} from '../src/server/diagnostic/scoring.ts';

const record = {
  publicItem: {
    id: 'en-a2-vocabulary-001',
    contentVersion: '1',
    language: 'en',
    skill: 'vocabulary',
    subdomain: 'meaning',
    levelCandidate: 'A2',
    prompt: 'Choose the best answer.',
    stimulus: { kind: 'none' },
    response: { kind: 'single-choice', optionIds: ['a', 'b', 'c'] },
    displayOptions: [
      { id: 'a', text: 'first' },
      { id: 'b', text: 'second' },
      { id: 'c', text: 'third' },
    ],
  },
  status: 'pilot',
  exposure: 'reserved',
  review: { status: 'approved', reviewerId: 'reviewer', contentSha256: 'secret-review-hash' },
  scoring: { kind: 'single-choice', optionId: 'b' },
  rationale: { key: 'Private explanation', distractors: { a: 'Private distractor note' } },
  source: { kind: 'welearn-legacy', reference: 'private-source' },
  levelRange: ['A1', 'B1'],
  parameters: { sampleSize: 50, difficulty: 0.5 },
};

test('the public serialization boundary excludes keys, rationales and parameters', () => {
  const payload = toDiagnosticPublicItem(record);
  const serialized = JSON.stringify(payload);
  assert.deepEqual(payload, record.publicItem);
  assert.notEqual(payload, record.publicItem);
  assert.equal(serialized.includes('Private explanation'), false);
  assert.equal(serialized.includes('secret-review-hash'), false);
  assert.equal(serialized.includes('difficulty'), false);
  assert.equal(serialized.includes('optionId":"b"'), false);
});

test('option presentation is stable per stage and rotates without changing option identity', () => {
  const original = structuredClone(record.publicItem);
  const first = toDiagnosticPublicItem(record, 'stage-alpha');
  const repeat = toDiagnosticPublicItem(record, 'stage-alpha');
  assert.deepEqual(first, repeat);
  assert.deepEqual(record.publicItem, original);
  assert.deepEqual(first.response.optionIds, first.displayOptions.map(option => option.id));
  assert.deepEqual([...first.response.optionIds].sort(), ['a', 'b', 'c']);
  const observedOrders = new Set(['stage-alpha', 'stage-beta', 'stage-gamma', 'stage-delta']
    .map(seed => toDiagnosticPublicItem(record, seed).response.optionIds.join(',')));
  assert.ok(observedOrders.size > 1, 'different stages should not preserve one universal answer position');
});

test('scores objective responses on the server and preserves omission', () => {
  assert.equal(scoreDiagnosticResponse(record.scoring, { kind: 'single-choice', optionId: 'b' }), 'correct');
  assert.equal(scoreDiagnosticResponse(record.scoring, { kind: 'single-choice', optionId: 'a' }), 'incorrect');
  assert.equal(scoreDiagnosticResponse(record.scoring, { kind: 'single-choice', optionId: null }), 'omitted');
  assert.equal(
    scoreDiagnosticResponse(
      { kind: 'multiple-choice', optionIds: ['b', 'a'] },
      { kind: 'multiple-choice', optionIds: ['a', 'b'] },
    ),
    'correct',
  );
  assert.equal(
    scoreDiagnosticResponse({ kind: 'short-text', accepted: ['The station'] }, { kind: 'short-text', value: ' the station ' }),
    'correct',
  );
  assert.throws(
    () => scoreDiagnosticResponse(record.scoring, { kind: 'multiple-choice', optionIds: ['b'] }),
    /does not match/,
  );
});
