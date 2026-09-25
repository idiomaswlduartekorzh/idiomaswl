import assert from 'node:assert/strict';
import test from 'node:test';

import { CEFR_LEVELS, DIAGNOSTIC_SKILLS } from '../src/lib/diagnostic/types.ts';
import { continueEnglishDiagnosticLocator } from '../src/server/diagnostic/continue-core.ts';
import { selectEnglishLocator } from '../src/server/diagnostic/selection.ts';

const skills = DIAGNOSTIC_SKILLS.filter(skill => skill !== 'writing');
function record(skill, level, variant) {
  const id = `en-${level.toLowerCase()}-${skill}-${variant}`;
  return {
    publicItem: {
      id, contentVersion: '1', language: 'en', skill, subdomain: 'fixture', levelCandidate: level, prompt: id,
      stimulus: skill === 'listening'
        ? { kind: 'audio', mediaId: `audio-${id}`, src: `/private/${id}.mp3`, startMs: 0, endMs: 1000, maxPlays: 2 }
        : skill === 'reading' ? { kind: 'text', stimulusId: `text-${id}`, body: id } : { kind: 'none' },
      response: { kind: 'single-choice', optionIds: ['a', 'b', 'c'] },
      displayOptions: [{ id: 'a', text: 'A' }, { id: 'b', text: 'B' }, { id: 'c', text: 'C' }],
    },
    status: 'pilot', exposure: 'reserved', review: { status: 'approved' },
    scoring: { kind: 'single-choice', optionId: 'b' }, rationale: { key: 'private' },
    source: { kind: 'welearn-original', reference: 'fixture' }, levelRange: [level, level],
  };
}
const bank = skills.flatMap(skill => CEFR_LEVELS.flatMap(level =>
  Array.from({ length: 12 }, (_, index) => record(skill, level, index + 1)),
));

function locatorFixture() {
  const selected = selectEnglishLocator(bank, 'locator-seed');
  const issuedAt = '2026-09-24T12:00:00.000Z';
  const stage = {
    stageId: 'stage-locator', kind: 'locator', routeId: null,
    itemIds: selected.records.map(item => item.publicItem.id),
    contentVersions: Object.fromEntries(selected.records.map(item => [item.publicItem.id, '1'])), issuedAt,
  };
  return { selected, stage };
}

test('scores locator server-side and atomically prepares a balanced precision stage', async () => {
  const { selected, stage } = locatorFixture();
  let persisted;
  const result = await continueEnglishDiagnosticLocator({
    authenticatedUserId: 'user-1',
    attempt: { id: 'attempt-1', userId: 'user-1', version: 1, status: 'locator', routeId: null, expiresAt: '2026-09-24T15:00:00.000Z' },
    stage,
    stageRecords: selected.records,
    submissions: selected.records.map(item => ({
      itemId: item.publicItem.id, contentVersion: '1', response: { kind: 'single-choice', optionId: 'b' },
      responseMs: 1000, audioPlayCount: item.publicItem.skill === 'listening' ? 1 : 0,
    })),
  }, {
    bank, selectionSecret: 's'.repeat(32), now: () => new Date('2026-09-24T13:00:00.000Z'),
    newId: () => 'stage-precision', persist: async input => { persisted = input; return { replayed: false, version: 2 }; },
  });
  assert.equal(result.routeDecision.routeId, 'high-c1-c2');
  assert.equal(result.delivery.attemptVersion, 2);
  assert.equal(result.delivery.items.length, 16);
  assert.equal(result.delivery.items.some(item => stage.itemIds.includes(item.id)), false);
  assert.equal(persisted.scoredResponses.every(response => response.outcome === 'correct'), true);
  assert.match(persisted.submissionDigest, /^[a-f0-9]{64}$/);
  const serialized = JSON.stringify(result.delivery);
  assert.equal(serialized.includes('rationale'), false);
  assert.equal(serialized.includes('scoring'), false);
  assert.equal(serialized.includes('parameters'), false);
});

test('rejects foreign, expired and tampered locator submissions before persistence', async () => {
  const { selected, stage } = locatorFixture();
  let persisted = false;
  const dependencies = {
    bank, selectionSecret: 's'.repeat(32), now: () => new Date('2026-09-24T16:00:00.000Z'),
    newId: () => 'stage-precision', persist: async () => { persisted = true; return { replayed: false, version: 2 }; },
  };
  const submissions = selected.records.map(item => ({
    itemId: item.publicItem.id, contentVersion: '1', response: { kind: 'single-choice', optionId: 'b' },
    responseMs: 1000, audioPlayCount: item.publicItem.skill === 'listening' ? 1 : 0,
  }));
  const attempt = { id: 'attempt-1', userId: 'user-1', version: 1, status: 'locator', routeId: null, expiresAt: '2026-09-24T15:00:00.000Z' };
  await assert.rejects(() => continueEnglishDiagnosticLocator({ authenticatedUserId: 'user-2', attempt, stage, stageRecords: selected.records, submissions }, dependencies), /does not belong/);
  await assert.rejects(() => continueEnglishDiagnosticLocator({ authenticatedUserId: 'user-1', attempt, stage, stageRecords: selected.records, submissions }, dependencies), /expired/);
  assert.equal(persisted, false);
});
