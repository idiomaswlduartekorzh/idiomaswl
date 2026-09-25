import assert from 'node:assert/strict';
import test from 'node:test';

import { DIAGNOSTIC_ENGINE_VERSION } from '../src/lib/diagnostic/delivery.ts';
import { CEFR_LEVELS, DIAGNOSTIC_SKILLS } from '../src/lib/diagnostic/types.ts';
import { DiagnosticStartError, prepareEnglishDiagnosticAttempt } from '../src/server/diagnostic/start-core.ts';

const objectiveSkills = DIAGNOSTIC_SKILLS.filter(skill => skill !== 'writing');

function fixtureRecord(skill, level, variant) {
  const id = `en-${level.toLowerCase()}-${skill}-${variant}`;
  return {
    publicItem: {
      id, contentVersion: '1', language: 'en', skill, subdomain: 'fixture', levelCandidate: level,
      prompt: id,
      stimulus: skill === 'listening'
        ? { kind: 'audio', mediaId: `media-${id}`, src: `/private/${id}.mp3`, startMs: 0, endMs: 1000, maxPlays: 2 }
        : skill === 'reading'
          ? { kind: 'text', stimulusId: `text-${id}`, body: id }
          : { kind: 'none' },
      response: { kind: 'single-choice', optionIds: ['a', 'b', 'c'] },
      displayOptions: [{ id: 'a', text: 'A' }, { id: 'b', text: 'B' }, { id: 'c', text: 'C' }],
    },
    status: 'pilot', exposure: 'reserved', review: { status: 'approved' },
    scoring: { kind: 'single-choice', optionId: 'b' }, rationale: { key: 'private rationale' },
    source: { kind: 'welearn-original', reference: 'fixture' }, levelRange: [level, level],
    parameters: { sampleSize: 0 },
  };
}

const completeBank = objectiveSkills.flatMap(skill =>
  CEFR_LEVELS.flatMap(level => Array.from({ length: 12 }, (_, index) => fixtureRecord(skill, level, index + 1))),
);

test('creates and persists a two-hour locator without exposing private bank fields', async () => {
  let persisted;
  let id = 0;
  const delivery = await prepareEnglishDiagnosticAttempt('user-1', {
    bank: completeBank, bankVersion: 'bank-v1', selectionSecret: 'x'.repeat(32),
    now: () => new Date('2026-09-24T12:00:00.000Z'), newId: () => `00000000-0000-4000-8000-${String(++id).padStart(12, '0')}`,
    persist: async input => { persisted = input; },
  });
  assert.equal(delivery.items.length, 12);
  assert.equal(delivery.attemptVersion, 1);
  assert.equal(delivery.expiresAt, '2026-09-24T14:00:00.000Z');
  assert.equal(persisted.engineVersion, DIAGNOSTIC_ENGINE_VERSION);
  assert.match(persisted.selectionSeedHash, /^[a-f0-9]{64}$/);
  const serialized = JSON.stringify(delivery);
  assert.equal(serialized.includes('private rationale'), false);
  assert.equal(serialized.includes('scoring'), false);
  assert.equal(serialized.includes('parameters'), false);
});

test('same attempt identity produces the same form but a different identity changes it', async () => {
  async function create(attemptId) {
    let call = 0;
    return prepareEnglishDiagnosticAttempt('user-1', {
      bank: completeBank, bankVersion: 'bank-v1', selectionSecret: 's'.repeat(32),
      now: () => new Date('2026-09-24T12:00:00.000Z'),
      newId: () => call++ === 0 ? attemptId : '00000000-0000-4000-8000-999999999999',
      persist: async () => {},
    });
  }
  const first = await create('00000000-0000-4000-8000-000000000001');
  const replay = await create('00000000-0000-4000-8000-000000000001');
  const other = await create('00000000-0000-4000-8000-000000000002');
  assert.deepEqual(first.stage.itemIds, replay.stage.itemIds);
  assert.notDeepEqual(first.stage.itemIds, other.stage.itemIds);
});

test('fails closed for an incomplete bank or weak server secret', async () => {
  const base = {
    bank: completeBank, bankVersion: 'bank-v1', selectionSecret: 's'.repeat(32),
    now: () => new Date('2026-09-24T12:00:00.000Z'), newId: () => crypto.randomUUID(), persist: async () => {},
  };
  await assert.rejects(
    () => prepareEnglishDiagnosticAttempt('user-1', { ...base, bank: [] }),
    error => error instanceof DiagnosticStartError && error.code === 'BANK_NOT_READY',
  );
  await assert.rejects(
    () => prepareEnglishDiagnosticAttempt('user-1', { ...base, selectionSecret: 'short' }),
    error => error instanceof DiagnosticStartError && error.code === 'SERVER_CONFIGURATION_INVALID',
  );
});
