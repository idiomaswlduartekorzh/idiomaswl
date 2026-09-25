import assert from 'node:assert/strict';
import test from 'node:test';

import {
  clearDiagnosticAttemptDrafts,
  readObjectiveDraft,
  readWritingDraft,
  writeObjectiveDraft,
  writeWritingDraft,
} from '../src/lib/diagnostic-draft.ts';

class MemoryStorage {
  values = new Map();
  get length() { return this.values.size; }
  getItem(key) { return this.values.get(key) ?? null; }
  setItem(key, value) { this.values.set(key, String(value)); }
  removeItem(key) { this.values.delete(key); }
  key(index) { return [...this.values.keys()][index] ?? null; }
}

const objective = {
  attemptId: 'attempt-1', attemptVersion: 3,
  stage: { stageId: 'precision-1', itemIds: ['reading-1', 'listening-1', 'grammar-1'] },
  items: [
    { id: 'reading-1', response: { kind: 'single-choice', optionIds: ['a', 'b'] }, stimulus: { kind: 'none' } },
    { id: 'listening-1', response: { kind: 'multiple-choice', optionIds: ['a', 'b', 'c'], selectCount: 2 }, stimulus: { kind: 'audio', maxPlays: 2 } },
    { id: 'grammar-1', response: { kind: 'short-text', maxWords: 4 }, stimulus: { kind: 'none' } },
  ],
};

const answers = {
  'reading-1': { response: { kind: 'single-choice', optionId: 'b' }, responseMs: 1200, audioPlayCount: null },
  'listening-1': { response: { kind: 'multiple-choice', optionIds: ['a', 'c'] }, responseMs: null, audioPlayCount: 1 },
  'grammar-1': { response: { kind: 'short-text', value: 'has already arrived' }, responseMs: 900, audioPlayCount: null },
};

const writing = {
  attemptId: 'attempt-1', attemptVersion: 4,
  stage: { stageId: 'writing-1' },
  prompt: { id: 'prompt-b1-1', contentVersion: '2026-09-24.1', maximumWords: 180 },
};

test('objective answers and current position survive an exact stage reload', () => {
  const storage = new MemoryStorage();
  writeObjectiveDraft(storage, objective, answers, 2);
  assert.deepEqual(readObjectiveDraft(storage, objective), { answers, itemIndex: 2 });
});

test('objective draft is discarded when attempt version or served form changes', () => {
  const storage = new MemoryStorage();
  writeObjectiveDraft(storage, objective, answers, 1);
  assert.equal(readObjectiveDraft(storage, { ...objective, attemptVersion: 4 }), null);

  writeObjectiveDraft(storage, objective, answers, 1);
  assert.equal(readObjectiveDraft(storage, {
    ...objective,
    stage: { ...objective.stage, itemIds: ['reading-1', 'grammar-1', 'listening-1'] },
  }), null);
});

test('tampered response contracts and options cannot be restored', () => {
  const storage = new MemoryStorage();
  writeObjectiveDraft(storage, objective, answers, 0);
  const key = storage.key(0);
  const payload = JSON.parse(storage.getItem(key));
  payload.answers['reading-1'].response.optionId = 'server-key-guess';
  storage.setItem(key, JSON.stringify(payload));
  assert.equal(readObjectiveDraft(storage, objective), null);
  assert.equal(storage.length, 0);
});

test('writing text survives only the exact prompt and content version', () => {
  const storage = new MemoryStorage();
  writeWritingDraft(storage, writing, 'A carefully revised response.');
  assert.equal(readWritingDraft(storage, writing), 'A carefully revised response.');
  assert.equal(readWritingDraft(storage, { ...writing, prompt: { ...writing.prompt, contentVersion: 'changed' } }), null);
});

test('clearing an attempt removes its drafts without touching another attempt', () => {
  const storage = new MemoryStorage();
  writeObjectiveDraft(storage, objective, answers, 0);
  writeWritingDraft(storage, writing, 'Draft');
  writeObjectiveDraft(storage, { ...objective, attemptId: 'attempt-2' }, answers, 0);
  clearDiagnosticAttemptDrafts(storage, 'attempt-1');
  assert.equal(storage.length, 1);
  assert.deepEqual(readObjectiveDraft(storage, { ...objective, attemptId: 'attempt-2' }), { answers, itemIndex: 0 });
});
