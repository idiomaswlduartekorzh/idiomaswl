import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import { ENGLISH_DIAGNOSTIC_ADVANCED_LANGUAGE_USE_CANDIDATES } from '../src/server/diagnostic/bank/language-use-advanced.en.ts';
import { ENGLISH_DIAGNOSTIC_LANGUAGE_USE_CANDIDATES } from '../src/server/diagnostic/bank/language-use.en.ts';
import { ENGLISH_DIAGNOSTIC_ADVANCED_READING_CANDIDATES } from '../src/server/diagnostic/bank/reading-advanced.en.ts';
import { ENGLISH_DIAGNOSTIC_READING_CANDIDATES } from '../src/server/diagnostic/bank/reading.en.ts';
import {
  auditDiagnosticItemCues,
  diagnosticItemCueAuditAggregate,
} from '../src/server/diagnostic/bank/cue-audit.ts';

const candidates = [
  ...ENGLISH_DIAGNOSTIC_READING_CANDIDATES,
  ...ENGLISH_DIAGNOSTIC_ADVANCED_READING_CANDIDATES,
  ...ENGLISH_DIAGNOSTIC_LANGUAGE_USE_CANDIDATES,
  ...ENGLISH_DIAGNOSTIC_ADVANCED_LANGUAGE_USE_CANDIDATES,
];

test('the adversarial audit deterministically covers every reserved objective draft', () => {
  const first = diagnosticItemCueAuditAggregate(candidates);
  const second = diagnosticItemCueAuditAggregate([...candidates].reverse());
  assert.deepEqual(first, second);
  assert.equal(first.totals.items, 216);
  assert.equal(first.cells.length, 18);
  assert.equal(first.totals.flaggedItems, 36);
  assert.equal(first.totals.blockingItems, 0);
  assert.equal(first.cells.every(cell => cell.keyPositions.join(',') === '4,4,4'), true);
});

test('aggregate output contains no item identity, option text, key or rationale', () => {
  const serialized = JSON.stringify(diagnosticItemCueAuditAggregate(candidates));
  const record = candidates[0];
  assert.equal(serialized.includes(record.publicItem.id), false);
  assert.equal(serialized.includes(record.publicItem.displayOptions[0].text), false);
  assert.equal(serialized.includes(record.scoring.optionId), false);
  assert.equal(serialized.includes(record.rationale.key), false);
});

test('normalized duplicates block approval while length findings require human judgment', () => {
  const source = candidates[0];
  const duplicate = structuredClone(source);
  duplicate.publicItem.displayOptions[1].text = `${duplicate.publicItem.displayOptions[0].text.toLocaleUpperCase('en')}!`;
  const duplicateAudit = auditDiagnosticItemCues(duplicate);
  assert.equal(duplicateAudit.disposition, 'BLOCKING_DEFECT');
  assert.ok(duplicateAudit.findings.some(finding => finding.code === 'DUPLICATE_NORMALIZED_OPTIONS'));

  const lengthCue = structuredClone(source);
  const keyIndex = lengthCue.publicItem.displayOptions.findIndex(option => option.id === lengthCue.scoring.optionId);
  lengthCue.publicItem.displayOptions[keyIndex].text = 'A uniquely elaborate response with several unnecessary explanatory words';
  const lengthAudit = auditDiagnosticItemCues(lengthCue);
  assert.equal(lengthAudit.disposition, 'HUMAN_REVIEW_REQUIRED');
  assert.ok(lengthAudit.findings.some(finding => finding.code === 'KEY_MATERIALLY_LONGER'));
});

test('the CLI writes item-level detail only below the private evidence root', () => {
  const source = readFileSync(new URL('../scripts/audit-diagnostic-item-cues.mjs', import.meta.url), 'utf8');
  assert.match(source, /\.diagnostic-private/u);
  assert.match(source, /AGGREGATE_ONLY_NO_ITEM_IDS_CONTENT_KEYS_OR_RATIONALES/u);
  assert.match(source, /Refusing to overwrite private cue audit/u);
  assert.match(source, /realpathSync/u);
  assert.match(source, /cannot traverse a symlink/u);
  assert.match(source, /mode: 0o600/u);
});
