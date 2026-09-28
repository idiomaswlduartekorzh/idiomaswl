import assert from 'node:assert/strict';
import test from 'node:test';

import { ENGLISH_DIAGNOSTIC_WRITTEN_DISCOURSE_CANDIDATES } from '../src/server/diagnostic/bank/written-discourse.en.ts';
import { auditDiagnosticItemCues } from '../src/server/diagnostic/bank/cue-audit.ts';
import { scoreDiagnosticResponse, toDiagnosticPublicItem } from '../src/server/diagnostic/scoring.ts';

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const SUBDOMAINS = new Set([
  'organisation-sequencing',
  'cohesion-reference',
  'rhetorical-relations',
  'audience-register',
  'revision-coherence',
]);

const bank = ENGLISH_DIAGNOSTIC_WRITTEN_DISCOURSE_CANDIDATES;
const byId = new Map(bank.map(record => [record.publicItem.id, record]));

function tokenCount(value) {
  return value.normalize('NFKC').match(/[\p{L}\p{N}]+(?:['’.-][\p{L}\p{N}]+)*/gu)?.length ?? 0;
}

function orderingPositions(record) {
  assert.equal(record.publicItem.response.kind, 'ordering');
  assert.equal(record.scoring.kind, 'ordering');
  return record.scoring.acceptedOrders[0].map(optionId =>
    record.publicItem.response.optionIds.indexOf(optionId) + 1);
}

test('the written-discourse bank contains twelve reserved drafts at every CEFR level', () => {
  assert.equal(bank.length, 72);
  assert.equal(new Set(bank.map(record => record.publicItem.id)).size, 72);
  assert.equal(new Set(bank.map(record => record.publicItem.stimulus.stimulusId)).size, 72);

  for (const level of LEVELS) {
    const records = bank.filter(record => record.publicItem.levelCandidate === level);
    assert.equal(records.length, 12, `${level} must contain twelve items`);
    assert.deepEqual(records.map(record => Number(record.publicItem.id.slice(-2))),
      Array.from({ length: 12 }, (_, index) => index + 1));
    assert.equal(records.filter(record => record.publicItem.response.kind === 'single-choice').length, 9);
    assert.equal(records.filter(record => record.publicItem.response.kind === 'ordering').length, 3);
    assert.deepEqual(new Set(records.map(record => record.publicItem.subdomain)), SUBDOMAINS);
  }

  for (const record of bank) {
    assert.equal(record.publicItem.skill, 'written-discourse');
    assert.equal(record.status, 'reserved');
    assert.equal(record.exposure, 'reserved');
    assert.equal(record.review.status, 'draft');
    assert.deepEqual(record.levelRange, [record.publicItem.levelCandidate, record.publicItem.levelCandidate]);
    assert.match(record.source.reference, /^en-written-discourse-original-draft-/u);
  }
});

test('single-choice keys are balanced 3/3/3 within every level without a length strategy', () => {
  const globalPositions = [0, 0, 0];
  for (const level of LEVELS) {
    const positions = [0, 0, 0];
    let uniqueLongestKeys = 0;
    let uniqueShortestKeys = 0;
    const records = bank.filter(record =>
      record.publicItem.levelCandidate === level && record.scoring.kind === 'single-choice');

    for (const record of records) {
      assert.equal(record.publicItem.response.kind, 'single-choice');
      const options = record.publicItem.displayOptions;
      assert.equal(options.length, 3);
      assert.deepEqual(new Set(record.publicItem.response.optionIds), new Set(options.map(option => option.id)));
      assert.equal(new Set(options.map(option => option.text.normalize('NFKC').toLocaleLowerCase('en'))).size, 3);
      const keyIndex = options.findIndex(option => option.id === record.scoring.optionId);
      assert.notEqual(keyIndex, -1);
      positions[keyIndex] += 1;
      globalPositions[keyIndex] += 1;

      const lengths = options.map(option => tokenCount(option.text));
      if (lengths[keyIndex] === Math.max(...lengths)
        && lengths.filter(length => length === lengths[keyIndex]).length === 1) uniqueLongestKeys += 1;
      if (lengths[keyIndex] === Math.min(...lengths)
        && lengths.filter(length => length === lengths[keyIndex]).length === 1) uniqueShortestKeys += 1;
      assert.equal(Object.keys(record.rationale.distractors ?? {}).length, 2);
    }

    assert.deepEqual(positions, [3, 3, 3], `${level} key positions must be balanced`);
    assert.ok(uniqueLongestKeys <= 5, `${level} overuses the uniquely longest option as its key`);
    assert.ok(uniqueShortestKeys <= 5, `${level} overuses the uniquely shortest option as its key`);
  }
  assert.deepEqual(globalPositions, [18, 18, 18]);
});

test('ordering items use exact private permutations with varied source-position patterns', () => {
  const expectedFragmentCount = { A1: 4, A2: 4, B1: 5, B2: 5, C1: 5, C2: 6 };
  for (const level of LEVELS) {
    const records = bank.filter(record =>
      record.publicItem.levelCandidate === level && record.scoring.kind === 'ordering');
    assert.equal(records.length, 3);
    assert.equal(new Set(records.map(record => orderingPositions(record).join('-'))).size, 3,
      `${level} repeats an ordering-key position pattern`);

    for (const record of records) {
      assert.equal(record.publicItem.response.kind, 'ordering');
      const publicIds = record.publicItem.response.optionIds;
      const displayIds = record.publicItem.displayOptions.map(option => option.id);
      assert.equal(publicIds.length, expectedFragmentCount[level]);
      assert.equal(new Set(publicIds).size, publicIds.length);
      assert.deepEqual(new Set(displayIds), new Set(publicIds));
      assert.ok(record.scoring.acceptedOrders.length >= 1);
      assert.equal(new Set(record.scoring.acceptedOrders.map(order => order.join('\u0000'))).size,
        record.scoring.acceptedOrders.length);
      for (const order of record.scoring.acceptedOrders) {
        assert.deepEqual(new Set(order), new Set(publicIds));
        assert.equal(order.length, publicIds.length);
        assert.equal(scoreDiagnosticResponse(record.scoring, { kind: 'ordering', optionIds: order }), 'correct');
      }

      const reversed = [...record.scoring.acceptedOrders[0]].reverse();
      if (!record.scoring.acceptedOrders.some(order => order.every((id, index) => id === reversed[index]))) {
        assert.equal(scoreDiagnosticResponse(record.scoring, { kind: 'ordering', optionIds: reversed }), 'incorrect');
      }
    }
  }

  assert.deepEqual(orderingPositions(byId.get('en-b1-written-discourse-04')), [3, 2, 1, 5, 4]);
});

test('cue audit covers every format without blocking or material key-length cues', () => {
  for (const record of bank) {
    const audit = auditDiagnosticItemCues(record);
    assert.equal(audit.disposition, 'NO_AUTOMATED_CUE_FOUND', record.publicItem.id);
    assert.equal(audit.findings.some(finding =>
      finding.code === 'KEY_MATERIALLY_LONGER' || finding.code === 'KEY_MATERIALLY_SHORTER'), false,
    `${record.publicItem.id} has a material keyed-length cue`);
    assert.equal(audit.findings.some(finding => finding.code === 'ABSOLUTE_LANGUAGE_ASYMMETRY'), false,
      `${record.publicItem.id} has asymmetric extreme language in its distractors`);
  }
});

test('public serialization exposes options but never scoring orders or rationales', () => {
  for (const record of bank) {
    const serialized = JSON.stringify(toDiagnosticPublicItem(record, 'written-discourse-test-seed'));
    assert.equal(serialized.includes('acceptedOrders'), false);
    assert.equal(serialized.includes('scoring'), false);
    assert.equal(serialized.includes('rationale'), false);
    assert.equal(serialized.includes(record.rationale.key), false);
  }
});

test('linguistic regressions preserve unambiguous anchors and exact rationales', () => {
  const a1Contrast = byId.get('en-a1-written-discourse-03');
  assert.equal(a1Contrast.publicItem.stimulus.body, 'I like tea. ___ I do not like coffee.');
  assert.equal(a1Contrast.publicItem.displayOptions.find(option => option.id === a1Contrast.scoring.optionId).text, 'But');

  assert.match(byId.get('en-a1-written-discourse-08').publicItem.prompt, /Ten minutes later/u);
  assert.match(byId.get('en-b1-written-discourse-07').publicItem.stimulus.body, /This benefit/u);
  assert.match(byId.get('en-b2-written-discourse-07').publicItem.stimulus.body, /First,.*second,/u);
  assert.match(byId.get('en-b2-written-discourse-08').publicItem.stimulus.body, /This explanation/u);
  assert.match(byId.get('en-b2-written-discourse-09').publicItem.stimulus.body, /Specifically/u);
  assert.match(byId.get('en-c1-written-discourse-07').publicItem.prompt, /following remedies/u);
  assert.match(byId.get('en-c1-written-discourse-08').publicItem.prompt, /another reason/u);
  assert.match(byId.get('en-c1-written-discourse-09').publicItem.stimulus.body, /This dependence on purpose/u);
  assert.match(byId.get('en-c2-written-discourse-08').publicItem.prompt, /mechanism described next/u);

  assert.match(byId.get('en-b2-written-discourse-03').rationale.key, /Provided that/u);
  assert.match(byId.get('en-c2-written-discourse-01').rationale.key, /That inconsistency notwithstanding/u);
  assert.match(byId.get('en-c2-written-discourse-02').rationale.key, /Only insofar as/u);
  assert.equal(byId.get('en-c2-written-discourse-02').rationale.distractors
    [byId.get('en-c2-written-discourse-02').publicItem.displayOptions[0].id].startsWith('“Even in cases where”'), true);
});
