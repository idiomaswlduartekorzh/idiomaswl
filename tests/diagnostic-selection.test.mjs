import assert from 'node:assert/strict';
import test from 'node:test';

import { CEFR_LEVELS, DIAGNOSTIC_SKILLS } from '../src/lib/diagnostic/types.ts';
import {
  auditEnglishMstCapacity,
  selectEnglishConfirmationStage,
  selectEnglishLocator,
  selectEnglishPrecisionStage,
} from '../src/server/diagnostic/selection.ts';

const objectiveSkills = DIAGNOSTIC_SKILLS.filter(skill => skill !== 'writing');

function fixtureRecord(skill, level, variant, overrides = {}) {
  const id = `en-${level.toLowerCase()}-${skill}-${variant}`;
  return {
    publicItem: {
      id,
      contentVersion: '1',
      language: 'en',
      skill,
      subdomain: `${skill}-subdomain`,
      levelCandidate: level,
      prompt: `Prompt ${id}`,
      stimulus: skill === 'listening'
        ? { kind: 'audio', mediaId: `media-${id}`, src: `/private/${id}.mp3`, startMs: 0, endMs: 10000, maxPlays: 2 }
        : skill === 'reading'
          ? { kind: 'text', stimulusId: `text-${id}`, body: `Text ${id}` }
          : { kind: 'none' },
      response: { kind: 'single-choice', optionIds: ['a', 'b', 'c'] },
      displayOptions: [{ id: 'a', text: 'A' }, { id: 'b', text: 'B' }, { id: 'c', text: 'C' }],
    },
    status: 'pilot', exposure: 'reserved', review: { status: 'approved' },
    scoring: { kind: 'single-choice', optionId: 'b' },
    rationale: { key: 'Fixture rationale' },
    source: { kind: 'welearn-original', reference: 'fixture' },
    levelRange: [level, level],
    ...overrides,
  };
}

function completeBank() {
  return objectiveSkills.flatMap(skill =>
    CEFR_LEVELS.flatMap(level => [1, 2, 3].map(variant => fixtureRecord(skill, level, variant))),
  );
}

function capacityBank() {
  return objectiveSkills.flatMap(skill =>
    CEFR_LEVELS.flatMap(level => Array.from({ length: 12 }, (_, index) => fixtureRecord(skill, level, index + 1))),
  );
}

test('selects a reproducible locator balanced by skill and target level', () => {
  const bank = completeBank();
  const first = selectEnglishLocator(bank, 'attempt-123');
  const second = selectEnglishLocator([...bank].reverse(), 'attempt-123');
  assert.deepEqual(first.receipt.itemIds, second.receipt.itemIds);
  assert.equal(first.records.length, 12);
  assert.deepEqual(first.receipt.allocation, { reading: 3, listening: 3, grammar: 3, vocabulary: 3 });
  for (const skill of objectiveSkills) {
    assert.deepEqual(
      first.records.filter(record => record.publicItem.skill === skill).map(record => record.publicItem.levelCandidate).sort(),
      ['A2', 'B1', 'B2'],
    );
  }
});

test('selects 16 precision decisions without reusing locator items', () => {
  const bank = completeBank();
  const locator = selectEnglishLocator(bank, 'attempt-123');
  const used = new Set(locator.receipt.itemIds);
  const precision = selectEnglishPrecisionStage(bank, 'mid-b1-b2', 'attempt-123:precision', used);
  assert.equal(precision.records.length, 16);
  assert.deepEqual(precision.receipt.allocation, { reading: 4, listening: 4, grammar: 4, vocabulary: 4 });
  assert.equal(precision.records.some(record => used.has(record.publicItem.id)), false);
  for (const skill of objectiveSkills) {
    const levels = precision.records.filter(record => record.publicItem.skill === skill).map(record => record.publicItem.levelCandidate);
    assert.equal(levels.filter(level => level === 'B1').length, 2);
    assert.equal(levels.filter(level => level === 'B2').length, 2);
  }
});

test('selects an eight-decision confirmation without reusing items or stimuli', () => {
  const bank = capacityBank();
  const locator = selectEnglishLocator(bank, 'attempt-confirm');
  const used = new Set(locator.receipt.itemIds);
  const precision = selectEnglishPrecisionStage(bank, 'mid-b1-b2', 'attempt-confirm:precision', used);
  precision.records.forEach(record => used.add(record.publicItem.id));
  const confirmation = selectEnglishConfirmationStage(bank, 'mid-b1-b2', 'attempt-confirm:confirmation', used);
  assert.equal(confirmation.records.length, 8);
  assert.deepEqual(confirmation.receipt.allocation, { reading: 2, listening: 2, grammar: 2, vocabulary: 2 });
  assert.equal(confirmation.records.some(record => used.has(record.publicItem.id)), false);
  const identity = (record) => {
    const stimulus = record.publicItem.stimulus;
    return stimulus.kind === 'audio' ? `audio:${stimulus.mediaId}`
      : stimulus.kind === 'text' ? `text:${stimulus.stimulusId}` : `item:${record.publicItem.id}`;
  };
  const usedStimuli = new Set(bank.filter(record => used.has(record.publicItem.id)).map(identity));
  assert.equal(confirmation.records.some(record => usedStimuli.has(identity(record))), false);
});

test('reports bank capacity deficits and refuses silent underfilled forms', () => {
  const bank = capacityBank();
  assert.deepEqual(auditEnglishMstCapacity(bank), []);
  const collapsedStimuli = bank.map(record => record.publicItem.skill === 'listening'
    && record.publicItem.levelCandidate === 'C2'
    ? { ...record, publicItem: { ...record.publicItem, stimulus: { ...record.publicItem.stimulus, mediaId: 'shared-audio' } } }
    : record);
  assert.deepEqual(auditEnglishMstCapacity(collapsedStimuli), [{
    stage: 'precision', skill: 'listening', level: 'C2', metric: 'distinct-stimuli', required: 6, available: 1,
  }]);
  const exhausted = bank.filter(record => !(record.publicItem.skill === 'listening'
    && record.publicItem.levelCandidate === 'C2'
    && ['-7', '-8', '-9', '-10', '-11', '-12'].some(suffix => record.publicItem.id.endsWith(suffix))));
  assert.deepEqual(auditEnglishMstCapacity(exhausted), [{
    stage: 'precision', skill: 'listening', level: 'C2', metric: 'decisions', required: 12, available: 6,
  }]);
  assert.throws(
    () => selectEnglishPrecisionStage(exhausted.filter(record => !(record.publicItem.skill === 'listening'
      && record.publicItem.levelCandidate === 'C2'
      && !record.publicItem.id.endsWith('-1'))), 'high-c1-c2', 'attempt-high', new Set()),
    /bank exhausted for listening\/C2/,
  );
});

test('draft, unreviewed and non-English items never enter a delivered form', () => {
  const bank = completeBank();
  bank.push(fixtureRecord('reading', 'A2', 99, { review: { status: 'draft' } }));
  bank.push(fixtureRecord('reading', 'A2', 97, { exposure: 'previously-public' }));
  bank.push(fixtureRecord('reading', 'A2', 98, {
    publicItem: { ...fixtureRecord('reading', 'A2', 98).publicItem, language: 'es' },
  }));
  const selected = selectEnglishLocator(bank, 'attempt-filter');
  assert.equal(selected.records.some(record => record.publicItem.id.endsWith('-99')), false);
  assert.equal(selected.records.some(record => record.publicItem.id.endsWith('-98')), false);
  assert.equal(selected.records.some(record => record.publicItem.id.endsWith('-97')), false);
});
