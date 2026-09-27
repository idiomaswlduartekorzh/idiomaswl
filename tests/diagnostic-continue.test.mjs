import assert from 'node:assert/strict';
import test from 'node:test';

import { CEFR_LEVELS, DIAGNOSTIC_SKILLS } from '../src/lib/diagnostic/types.ts';
import {
  continueEnglishDiagnosticConfirmation,
  continueEnglishDiagnosticLocator,
  continueEnglishDiagnosticPrecision,
} from '../src/server/diagnostic/continue-core.ts';
import { toDiagnosticPublicItem } from '../src/server/diagnostic/scoring.ts';
import { selectEnglishLocator, selectEnglishPrecisionStage } from '../src/server/diagnostic/selection.ts';

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

const writingBank = ['B1', 'B2'].flatMap(level => Array.from({ length: 4 }, (_, index) => ({
  publicPrompt: {
    id: `en-${level.toLowerCase()}-writing-${index + 1}`, contentVersion: '1', language: 'en', levelCandidate: level,
    title: `${level} writing task ${index + 1}`,
    situation: 'Write for a community website about a practical change that affects people in your area.',
    instructions: ['Describe the situation clearly.', 'Explain your position with relevant support.', 'Recommend a realistic next step.'],
    minimumWords: level === 'B1' ? 100 : 160, maximumWords: level === 'B1' ? 160 : 240, recommendedMinutes: 20,
  },
  status: 'pilot', exposure: 'reserved', review: { status: 'approved' },
  source: { kind: 'welearn-original', reference: 'fixture' },
})));

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
  const priorExposure = new Set(bank
    .filter(item => ['C1', 'C2'].includes(item.publicItem.levelCandidate)
      && Number(item.publicItem.id.split('-').at(-1)) > 2)
    .map(item => item.publicItem.id));
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
    excludedObjectiveItemIds: priorExposure,
    newId: () => 'stage-precision', persist: async input => { persisted = input; return { replayed: false, version: 2 }; },
  });
  assert.equal(result.routeDecision.routeId, 'high-c1-c2');
  assert.equal(result.delivery.attemptVersion, 2);
  assert.equal(result.delivery.items.length, 16);
  const deliveredRecord = bank.find(item => item.publicItem.id === result.delivery.items[0].id);
  assert.deepEqual(result.delivery.items[0], toDiagnosticPublicItem(deliveredRecord, 'stage-precision'));
  assert.equal(result.delivery.items.some(item => stage.itemIds.includes(item.id)), false);
  assert.equal(result.delivery.items.some(item => priorExposure.has(item.id)), false);
  assert.equal(persisted.scoredResponses.every(response => response.outcome === 'correct'), true);
  assert.match(persisted.submissionDigest, /^[a-f0-9]{64}$/);
  const serialized = JSON.stringify(result.delivery);
  assert.equal(serialized.includes('rationale'), false);
  assert.equal(serialized.includes('scoring'), false);
  assert.equal(serialized.includes('parameters'), false);
});

test('locator omission withholds listening precision without lowering the other skill routes', async () => {
  const { selected, stage } = locatorFixture();
  let persisted;
  const result = await continueEnglishDiagnosticLocator({
    authenticatedUserId: 'user-1',
    attempt: { id: 'attempt-accessible', userId: 'user-1', version: 1, status: 'locator', routeId: null, expiresAt: '2026-09-24T15:00:00.000Z' },
    stage,
    stageRecords: selected.records,
    submissions: selected.records.map(item => ({
      itemId: item.publicItem.id,
      contentVersion: '1',
      response: { kind: 'single-choice', optionId: item.publicItem.skill === 'listening' ? null : 'b' },
      responseMs: 1000,
      audioPlayCount: item.publicItem.skill === 'listening' ? 0 : null,
    })),
  }, {
    bank, selectionSecret: 's'.repeat(32), now: () => new Date('2026-09-24T13:00:00.000Z'),
    newId: () => 'stage-precision-accessible', persist: async input => { persisted = input; return { replayed: false, version: 2 }; },
  });
  assert.equal(result.routeDecision.routeId, 'high-c1-c2');
  assert.equal(result.routeDecision.skillRoutes.listening, null);
  assert.equal(result.routeDecision.requiresConfirmation, true);
  assert.equal(result.delivery.items.length, 12);
  assert.equal(result.delivery.items.some(item => item.skill === 'listening'), false);
  assert.deepEqual(persisted.nextSelectionReceipt.skillRoutes, result.routeDecision.skillRoutes);
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

test('an identical retry returns the persisted precision stage without creating a new form', async () => {
  const { selected, stage } = locatorFixture();
  const submissions = selected.records.map(item => ({
    itemId: item.publicItem.id, contentVersion: '1', response: { kind: 'single-choice', optionId: 'b' },
    responseMs: 1000, audioPlayCount: item.publicItem.skill === 'listening' ? 1 : 0,
  }));
  let proposed;
  const result = await continueEnglishDiagnosticLocator({
    authenticatedUserId: 'user-1',
    attempt: { id: 'attempt-1', userId: 'user-1', version: 2, status: 'precision', routeId: 'high-c1-c2', expiresAt: '2026-09-24T15:00:00.000Z' },
    stage: { ...stage, completedAt: '2026-09-24T12:29:00.000Z' }, stageRecords: selected.records, submissions,
  }, {
    bank, selectionSecret: 's'.repeat(32), now: () => new Date('2026-09-24T13:00:00.000Z'),
    newId: () => 'new-id-that-must-not-be-returned',
    persist: async input => {
      proposed = input.nextStage;
      return {
        replayed: true,
        version: 2,
        nextStage: { ...input.nextStage, stageId: 'persisted-stage-id', issuedAt: '2026-09-24T12:30:00.000Z' },
      };
    },
  });
  assert.equal(proposed.stageId, 'new-id-that-must-not-be-returned');
  assert.equal(result.delivery.stage.stageId, 'persisted-stage-id');
  assert.equal(result.delivery.stage.issuedAt, '2026-09-24T12:30:00.000Z');
  assert.equal(result.delivery.attemptVersion, 2);
});

test('scores precision with prior evidence and atomically delivers a route-appropriate writing prompt', async () => {
  const locator = selectEnglishLocator(bank, 'prior-locator');
  const precision = selectEnglishPrecisionStage(bank, 'mid-b1-b2', 'precision-seed', new Set(locator.records.map(record => record.publicItem.id)));
  const stage = {
    stageId: 'stage-precision', kind: 'precision', routeId: 'mid-b1-b2',
    itemIds: precision.records.map(record => record.publicItem.id),
    contentVersions: Object.fromEntries(precision.records.map(record => [record.publicItem.id, '1'])),
    issuedAt: '2026-09-24T12:30:00.000Z',
  };
  let persisted;
  const result = await continueEnglishDiagnosticPrecision({
    authenticatedUserId: 'user-1',
    attempt: { id: 'attempt-1', userId: 'user-1', version: 2, status: 'precision', routeId: 'mid-b1-b2', expiresAt: '2026-09-24T15:00:00.000Z' },
    stage,
    stageRecords: precision.records,
    priorObservations: locator.records.map(record => ({ itemId: record.publicItem.id, outcome: 'correct' })),
    submissions: precision.records.map(item => ({
      itemId: item.publicItem.id, contentVersion: '1', response: { kind: 'single-choice', optionId: 'b' },
      responseMs: 1200, audioPlayCount: item.publicItem.skill === 'listening' ? 1 : 0,
    })),
  }, {
    bank, writingBank, writingBankVersion: 'writing-bank-v1', selectionSecret: 's'.repeat(32),
    excludedWritingPromptIds: new Set(writingBank
      .filter(record => !record.publicPrompt.id.endsWith('-4'))
      .map(record => record.publicPrompt.id)),
    now: () => new Date('2026-09-24T13:00:00.000Z'), newId: () => 'stage-writing',
    persist: async input => { persisted = input; return { replayed: false, version: 3 }; },
  });
  assert.equal(result.delivery.stage.kind, 'writing');
  assert.equal(result.delivery.stage.stageId, 'stage-writing');
  assert.equal(result.delivery.attemptVersion, 3);
  assert.ok(['B1', 'B2'].includes(result.delivery.prompt.levelCandidate));
  assert.match(result.delivery.prompt.id, /-4$/);
  assert.equal(result.objectiveEvidence.length, 4);
  assert.equal(result.objectiveEvidence.every(skill => skill.decisions === 7 && skill.status === 'provisional'), true);
  assert.equal(persisted.nextStatus, 'writing');
  assert.equal(persisted.nextStageIndex, 2);
  assert.equal(persisted.nextSelectionReceipt.writingBankVersion, 'writing-bank-v1');
  const serialized = JSON.stringify(result.delivery);
  assert.equal(serialized.includes('scoring'), false);
  assert.equal(serialized.includes('objectiveEvidence'), false);
});

test('an identical precision retry returns the persisted writing stage', async () => {
  const locator = selectEnglishLocator(bank, 'prior-locator');
  const precision = selectEnglishPrecisionStage(bank, 'mid-b1-b2', 'precision-seed', new Set(locator.records.map(record => record.publicItem.id)));
  const stage = {
    stageId: 'stage-precision', kind: 'precision', routeId: 'mid-b1-b2',
    itemIds: precision.records.map(record => record.publicItem.id),
    contentVersions: Object.fromEntries(precision.records.map(record => [record.publicItem.id, '1'])),
    issuedAt: '2026-09-24T12:30:00.000Z', completedAt: '2026-09-24T12:59:00.000Z',
  };
  const result = await continueEnglishDiagnosticPrecision({
    authenticatedUserId: 'user-1',
    attempt: { id: 'attempt-1', userId: 'user-1', version: 3, status: 'writing', routeId: 'mid-b1-b2', expiresAt: '2026-09-24T15:00:00.000Z' },
    stage,
    stageRecords: precision.records,
    priorObservations: locator.records.map(record => ({ itemId: record.publicItem.id, outcome: 'correct' })),
    submissions: precision.records.map(item => ({
      itemId: item.publicItem.id, contentVersion: '1', response: { kind: 'single-choice', optionId: 'b' },
      responseMs: 1200, audioPlayCount: item.publicItem.skill === 'listening' ? 1 : 0,
    })),
  }, {
    bank, writingBank, writingBankVersion: 'writing-bank-v1', selectionSecret: 's'.repeat(32),
    now: () => new Date('2026-09-24T13:00:00.000Z'), newId: () => 'discarded-writing-stage',
    persist: async input => ({
      replayed: true, version: 3,
      nextStage: { ...input.nextStage, stageId: 'persisted-writing-stage', issuedAt: '2026-09-24T12:59:00.000Z' },
    }),
  });
  assert.equal(result.delivery.stage.stageId, 'persisted-writing-stage');
  assert.equal(result.delivery.attemptVersion, 3);
});

test('adds a bounded confirmation stage for insufficient evidence, then proceeds to writing', async () => {
  const locator = selectEnglishLocator(bank, 'confirm-locator');
  const used = new Set(locator.records.map(record => record.publicItem.id));
  const precision = selectEnglishPrecisionStage(bank, 'mid-b1-b2', 'confirm-precision', used);
  precision.records.forEach(record => used.add(record.publicItem.id));
  const precisionStage = {
    stageId: 'stage-precision', kind: 'precision', routeId: 'mid-b1-b2',
    itemIds: precision.records.map(record => record.publicItem.id),
    contentVersions: Object.fromEntries(precision.records.map(record => [record.publicItem.id, '1'])),
    issuedAt: '2026-09-24T12:30:00.000Z',
  };
  const precisionSubmissions = precision.records.map(item => ({
    itemId: item.publicItem.id, contentVersion: '1',
    response: { kind: 'single-choice', optionId: item.publicItem.skill === 'listening' ? null : 'b' },
    responseMs: 1200, audioPlayCount: item.publicItem.skill === 'listening' ? 1 : 0,
  }));
  const priorLocator = locator.records.map(record => ({ itemId: record.publicItem.id, outcome: 'correct' }));
  let precisionPersistence;
  const confirmationResult = await continueEnglishDiagnosticPrecision({
    authenticatedUserId: 'user-1',
    attempt: { id: 'attempt-confirm', userId: 'user-1', version: 2, status: 'precision', routeId: 'mid-b1-b2', expiresAt: '2026-09-24T15:00:00.000Z' },
    stage: precisionStage, stageRecords: precision.records, priorObservations: priorLocator,
    locatorRequestedConfirmation: true, submissions: precisionSubmissions,
  }, {
    bank, writingBank, writingBankVersion: 'writing-bank-v1', selectionSecret: 's'.repeat(32),
    now: () => new Date('2026-09-24T13:00:00.000Z'), newId: () => 'stage-confirmation',
    persist: async input => { precisionPersistence = input; return { replayed: false, version: 3 }; },
  });
  assert.equal(confirmationResult.delivery.stage.kind, 'confirmation');
  assert.equal(confirmationResult.delivery.items.length, 8);
  assert.equal(confirmationResult.confirmationDecision.required, true);
  assert.ok(confirmationResult.confirmationDecision.reasons.includes('INSUFFICIENT_SKILL_EVIDENCE'));
  assert.equal(precisionPersistence.nextStatus, 'confirmation');
  assert.equal(precisionPersistence.nextStageIndex, 2);
  assert.equal(confirmationResult.delivery.items.some(item => used.has(item.id)), false);

  const confirmationRecords = confirmationResult.delivery.stage.itemIds.map(itemId => bank.find(record => record.publicItem.id === itemId));
  assert.equal(confirmationRecords.every(Boolean), true);
  const priorPrecision = precisionSubmissions.map(submission => ({
    itemId: submission.itemId,
    outcome: submission.response.optionId === null ? 'omitted' : 'correct',
  }));
  let confirmationPersistence;
  const writingResult = await continueEnglishDiagnosticConfirmation({
    authenticatedUserId: 'user-1',
    attempt: { id: 'attempt-confirm', userId: 'user-1', version: 3, status: 'confirmation', routeId: 'mid-b1-b2', expiresAt: '2026-09-24T15:00:00.000Z' },
    stage: confirmationResult.delivery.stage,
    stageRecords: confirmationRecords,
    priorObservations: [...priorLocator, ...priorPrecision],
    submissions: confirmationRecords.map(item => ({
      itemId: item.publicItem.id, contentVersion: '1', response: { kind: 'single-choice', optionId: 'b' },
      responseMs: 1200, audioPlayCount: item.publicItem.skill === 'listening' ? 1 : 0,
    })),
  }, {
    bank, writingBank, writingBankVersion: 'writing-bank-v1', selectionSecret: 's'.repeat(32),
    now: () => new Date('2026-09-24T13:10:00.000Z'), newId: () => 'stage-writing-after-confirmation',
    persist: async input => { confirmationPersistence = input; return { replayed: false, version: 4 }; },
  });
  assert.equal(writingResult.delivery.stage.kind, 'writing');
  assert.equal(writingResult.delivery.attemptVersion, 4);
  assert.equal(confirmationPersistence.nextStatus, 'writing');
  assert.equal(confirmationPersistence.nextStageIndex, 3);
  assert.equal(writingResult.objectiveEvidence.find(skill => skill.skill === 'listening').decisions, 9);
});

test('confirmation recovers accidental listening omission but honors an explicit accommodation', async () => {
  const locator = selectEnglishLocator(bank, 'omitted-listening-locator');
  const skillRoutes = {
    reading: 'high-c1-c2', listening: null, grammar: 'high-c1-c2', vocabulary: 'high-c1-c2',
  };
  const precision = selectEnglishPrecisionStage(
    bank,
    'high-c1-c2',
    'omitted-listening-precision',
    new Set(locator.records.map(record => record.publicItem.id)),
    skillRoutes,
  );
  const stage = {
    stageId: 'stage-precision-omitted-listening', kind: 'precision', routeId: 'high-c1-c2',
    itemIds: precision.records.map(record => record.publicItem.id),
    contentVersions: Object.fromEntries(precision.records.map(record => [record.publicItem.id, '1'])),
    issuedAt: '2026-09-24T12:30:00.000Z',
  };
  const priorObservations = locator.records.map(record => ({
    itemId: record.publicItem.id,
    outcome: record.publicItem.skill === 'listening' ? 'omitted' : 'correct',
  }));
  const submissions = precision.records.map(item => ({
    itemId: item.publicItem.id, contentVersion: '1', response: { kind: 'single-choice', optionId: 'b' },
    responseMs: 1200, audioPlayCount: item.publicItem.skill === 'listening' ? 1 : 0,
  }));

  async function run(listeningAccommodation) {
    return continueEnglishDiagnosticPrecision({
      authenticatedUserId: 'user-1',
      attempt: { id: `attempt-${listeningAccommodation}`, userId: 'user-1', version: 2, status: 'precision', routeId: 'high-c1-c2', expiresAt: '2026-09-24T15:00:00.000Z' },
      stage, stageRecords: precision.records, priorObservations, skillRoutes,
      locatorRequestedConfirmation: true, listeningAccommodation, submissions,
    }, {
      bank, writingBank, writingBankVersion: 'writing-bank-v1', selectionSecret: 's'.repeat(32),
      now: () => new Date('2026-09-24T13:00:00.000Z'),
      newId: () => `stage-confirm-${listeningAccommodation}`,
      persist: async input => ({ replayed: false, version: 3, nextStage: input.nextStage }),
    });
  }

  const accidental = await run(false);
  assert.equal(accidental.delivery.stage.kind, 'confirmation');
  assert.equal(accidental.delivery.items.length, 8);
  assert.equal(accidental.delivery.items.filter(item => item.skill === 'listening').length, 2);

  const accommodated = await run(true);
  assert.equal(accommodated.delivery.stage.kind, 'confirmation');
  assert.equal(accommodated.delivery.items.length, 6);
  assert.equal(accommodated.delivery.items.some(item => item.skill === 'listening'), false);
  assert.equal(accommodated.delivery.listeningAccommodation, true);
});
