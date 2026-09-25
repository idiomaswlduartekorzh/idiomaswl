import assert from 'node:assert/strict';
import test from 'node:test';

import { ENGLISH_DIAGNOSTIC_BLUEPRINT } from '../src/lib/diagnostic/blueprint.ts';
import { applyDiagnosticItemControls } from '../src/server/diagnostic/bank/controls.ts';
import { scoreDiagnosticResponse } from '../src/server/diagnostic/scoring.ts';
import { selectEnglishLocator } from '../src/server/diagnostic/selection.ts';
import { selectDiagnosticWritingPrompt } from '../src/server/diagnostic/writing.ts';

const skills = ['reading', 'listening', 'grammar', 'vocabulary'];
const objectiveBank = skills.flatMap(skill => ENGLISH_DIAGNOSTIC_BLUEPRINT.locator.targetLevels.map(level => {
  const id = `en-${level.toLowerCase()}-${skill}-control-fixture`;
  return {
    publicItem: {
      id, contentVersion: 'v1', language: 'en', skill, subdomain: 'fixture', levelCandidate: level,
      prompt: id, stimulus: { kind: 'none' },
      response: { kind: 'single-choice', optionIds: ['a', 'b'] },
      displayOptions: [{ id: 'a', text: 'A' }, { id: 'b', text: 'B' }],
    },
    status: 'pilot', exposure: 'reserved', review: { status: 'approved', contentSha256: 'a'.repeat(64) },
    scoring: { kind: 'single-choice', optionId: 'b' }, rationale: { key: 'Fixture rationale.' },
    source: { kind: 'welearn-original', reference: 'fixture' }, levelRange: [level, level],
    parameters: { sampleSize: 30, difficulty: 0 },
  };
}));

const writingBank = [{
  publicPrompt: {
    id: 'en-b1-writing-control-fixture', contentVersion: 'v1', language: 'en', levelCandidate: 'B1',
    title: 'Fixture', situation: 'Write.', instructions: ['Respond.'], minimumWords: 1,
    maximumWords: 100, recommendedMinutes: 10,
  },
  status: 'pilot', exposure: 'reserved', review: { status: 'approved', contentSha256: 'b'.repeat(64) },
  source: { kind: 'welearn-original', reference: 'fixture' },
}];

function control(overrides = {}) {
  return {
    kind: 'objective', itemId: objectiveBank[0].publicItem.id, contentVersion: 'v1', action: 'retire',
    reason: 'psychometric-anomaly', retiredAt: '2026-09-25T12:00:00.000Z',
    decisionReference: 'pilot-review:fixture-1',
    reviewers: [
      { id: 'academic-reviewer', role: 'academic-lead' },
      { id: 'measurement-reviewer', role: 'measurement-lead' },
    ],
    ...overrides,
  };
}

function manifest(controls = [control()]) {
  return {
    manifestVersion: 'english-diagnostic-item-controls-v1',
    updatedAt: controls.length ? '2026-09-25T12:05:00.000Z' : null,
    controls,
  };
}

test('retirement blocks future selection but preserves the exact server record for historical scoring', () => {
  const controlled = applyDiagnosticItemControls({ objectiveBank, writingBank, manifest: manifest() });
  assert.equal(controlled.objectiveBank.length, objectiveBank.length);
  assert.equal(controlled.objectiveBank[0].status, 'retired');
  assert.equal(scoreDiagnosticResponse(controlled.objectiveBank[0].scoring, { kind: 'single-choice', optionId: 'b' }), 'correct');
  assert.throws(() => selectEnglishLocator(controlled.objectiveBank, 'fixture-seed'), /bank exhausted/);
});

test('objective and writing retirement require exact released versions and independent approvals', () => {
  const writingControl = control({
    kind: 'writing', itemId: writingBank[0].publicPrompt.id, reason: 'content-defect',
  });
  const controlled = applyDiagnosticItemControls({
    objectiveBank, writingBank, manifest: manifest([control(), writingControl]),
  });
  assert.equal(controlled.writingBank[0].status, 'retired');
  assert.throws(() => selectDiagnosticWritingPrompt(controlled.writingBank, 'en', 'B1', 'fixture-seed'), /bank exhausted/);
  assert.throws(() => applyDiagnosticItemControls({
    objectiveBank, writingBank, manifest: manifest([control({ contentVersion: 'wrong' })]),
  }), /does not match/);
  assert.throws(() => applyDiagnosticItemControls({
    objectiveBank, writingBank, manifest: manifest([control({
      reviewers: [
        { id: 'same-reviewer', role: 'academic-lead' },
        { id: 'same-reviewer', role: 'measurement-lead' },
      ],
    })]),
  }), /independent reviewers/);
});

test('item controls fail closed for duplicates, future decisions and unexpected fields', () => {
  assert.throws(() => applyDiagnosticItemControls({
    objectiveBank, writingBank, manifest: manifest([control(), control()]),
  }), /must be unique/);
  assert.throws(() => applyDiagnosticItemControls({
    objectiveBank, writingBank, manifest: manifest([control({ retiredAt: '2026-09-26T12:00:00.000Z' })]),
  }), /timestamp is invalid/);
  assert.throws(() => applyDiagnosticItemControls({
    objectiveBank, writingBank, manifest: manifest([{ ...control(), hiddenOverride: true }]),
  }), /unexpected fields/);
  assert.throws(() => applyDiagnosticItemControls({
    objectiveBank, writingBank, manifest: { ...manifest(), bypass: true },
  }), /manifest has unexpected fields/);
  assert.throws(() => applyDiagnosticItemControls({
    objectiveBank, writingBank, manifest: manifest([control({
      reviewers: [
        { id: 'academic-reviewer', role: 'academic-lead', signature: 'unverified' },
        { id: 'measurement-reviewer', role: 'measurement-lead' },
      ],
    })]),
  }), /independent reviewers/);
  assert.deepEqual(applyDiagnosticItemControls({
    objectiveBank, writingBank, manifest: manifest([]),
  }), { objectiveBank, writingBank });
});
