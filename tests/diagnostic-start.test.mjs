import assert from 'node:assert/strict';
import test from 'node:test';

import { DIAGNOSTIC_CONSENT_VERSION, DIAGNOSTIC_ENGINE_VERSION } from '../src/lib/diagnostic/delivery.ts';
import { CEFR_LEVELS, DIAGNOSTIC_SKILLS } from '../src/lib/diagnostic/types.ts';
import { toDiagnosticPublicItem } from '../src/server/diagnostic/scoring.ts';
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
const completeWritingBank = CEFR_LEVELS.flatMap(level => Array.from({ length: 4 }, (_, index) => ({
  publicPrompt: {
    id: `en-${level.toLowerCase()}-writing-${index + 1}`, contentVersion: '1', language: 'en', levelCandidate: level,
    title: 'Fixture', situation: 'Write a response.', instructions: ['Respond.'], minimumWords: 1, maximumWords: 100,
    recommendedMinutes: 10,
  },
  status: 'pilot', exposure: 'reserved', review: { status: 'approved' },
  source: { kind: 'welearn-original', reference: 'fixture' },
})));
const deliveryPolicy = {
  deliveryPolicyVersion: 'fixture-delivery-v1', accessMode: 'pilot',
  minimumDaysBetweenCompletedAttempts: 0, maximumConcurrentActiveAttempts: 1,
  exposureLookbackDays: 365, resultValidityDays: 30,
  excludedObjectiveItemIds: new Set(),
};

test('creates and persists a two-hour locator without exposing private bank fields', async () => {
  let persisted;
  let id = 0;
  const delivery = await prepareEnglishDiagnosticAttempt('user-1', {
    bank: completeBank, writingBank: completeWritingBank, bankVersion: 'bank-v1', consentVersion: DIAGNOSTIC_CONSENT_VERSION, selectionSecret: 'x'.repeat(32), ...deliveryPolicy,
    now: () => new Date('2026-09-24T12:00:00.000Z'), newId: () => `00000000-0000-4000-8000-${String(++id).padStart(12, '0')}`,
    persist: async input => { persisted = input; },
  });
  assert.equal(delivery.items.length, 12);
  const firstRecord = completeBank.find(record => record.publicItem.id === delivery.items[0].id);
  assert.deepEqual(delivery.items[0], toDiagnosticPublicItem(firstRecord, delivery.stage.stageId));
  assert.equal(delivery.items.every(item => item.response.optionIds.join('|')
    === item.displayOptions.map(option => option.id).join('|')), true);
  assert.equal(delivery.attemptVersion, 1);
  assert.equal(delivery.expiresAt, '2026-09-24T14:00:00.000Z');
  assert.equal(persisted.engineVersion, DIAGNOSTIC_ENGINE_VERSION);
  assert.equal(persisted.consentVersion, DIAGNOSTIC_CONSENT_VERSION);
  assert.equal(persisted.consentedAt, '2026-09-24T12:00:00.000Z');
  assert.equal(persisted.deliveryPolicyVersion, 'fixture-delivery-v1');
  assert.equal(persisted.resultValidityDays, 30);
  assert.equal(persisted.exposureLookbackDays, 365);
  assert.match(persisted.selectionSeedHash, /^[a-f0-9]{64}$/);
  const serialized = JSON.stringify(delivery);
  assert.equal(serialized.includes('private rationale'), false);
  assert.equal(serialized.includes('scoring'), false);
  assert.equal(serialized.includes('parameters'), false);
});

test('excludes recently exposed items and fails closed when one locator cell is exhausted', async () => {
  let call = 0;
  const common = {
    bank: completeBank, writingBank: completeWritingBank, bankVersion: 'bank-v1',
    consentVersion: DIAGNOSTIC_CONSENT_VERSION, selectionSecret: 's'.repeat(32), ...deliveryPolicy,
    now: () => new Date('2026-09-24T12:00:00.000Z'),
    newId: () => call++ === 0 ? '00000000-0000-4000-8000-000000000001' : '00000000-0000-4000-8000-999999999999',
    persist: async () => {},
  };
  const initial = await prepareEnglishDiagnosticAttempt('user-1', common);
  call = 0;
  const replacement = await prepareEnglishDiagnosticAttempt('user-1', {
    ...common, excludedObjectiveItemIds: new Set(initial.stage.itemIds),
  });
  assert.equal(replacement.stage.itemIds.some(id => initial.stage.itemIds.includes(id)), false);
  const exhaustedCell = new Set(completeBank
    .filter(record => record.publicItem.skill === 'reading' && record.publicItem.levelCandidate === 'A2')
    .map(record => record.publicItem.id));
  await assert.rejects(
    () => prepareEnglishDiagnosticAttempt('user-1', { ...common, excludedObjectiveItemIds: exhaustedCell }),
    error => error instanceof DiagnosticStartError && error.code === 'BANK_NOT_READY',
  );
});

test('same attempt identity produces the same form but a different identity changes it', async () => {
  async function create(attemptId) {
    let call = 0;
    return prepareEnglishDiagnosticAttempt('user-1', {
      bank: completeBank, writingBank: completeWritingBank, bankVersion: 'bank-v1', consentVersion: DIAGNOSTIC_CONSENT_VERSION, selectionSecret: 's'.repeat(32), ...deliveryPolicy,
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
    bank: completeBank, writingBank: completeWritingBank, bankVersion: 'bank-v1', consentVersion: DIAGNOSTIC_CONSENT_VERSION, selectionSecret: 's'.repeat(32), ...deliveryPolicy,
    now: () => new Date('2026-09-24T12:00:00.000Z'), newId: () => crypto.randomUUID(), persist: async () => {},
  };
  await assert.rejects(
    () => prepareEnglishDiagnosticAttempt('user-1', { ...base, bank: [] }),
    error => error instanceof DiagnosticStartError && error.code === 'BANK_NOT_READY',
  );
  await assert.rejects(
    () => prepareEnglishDiagnosticAttempt('user-1', { ...base, writingBank: [] }),
    error => error instanceof DiagnosticStartError && error.code === 'BANK_NOT_READY',
  );
  await assert.rejects(
    () => prepareEnglishDiagnosticAttempt('user-1', { ...base, selectionSecret: 'short' }),
    error => error instanceof DiagnosticStartError && error.code === 'SERVER_CONFIGURATION_INVALID',
  );
  await assert.rejects(
    () => prepareEnglishDiagnosticAttempt('user-1', { ...base, consentVersion: '' }),
    error => error instanceof DiagnosticStartError && error.code === 'SERVER_CONFIGURATION_INVALID',
  );
  await assert.rejects(
    () => prepareEnglishDiagnosticAttempt('user-1', { ...base, resultValidityDays: 0 }),
    error => error instanceof DiagnosticStartError && error.code === 'SERVER_CONFIGURATION_INVALID',
  );
});
