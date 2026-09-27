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
  assert.equal(first.totals.flaggedItems, 0);
  assert.equal(first.totals.blockingItems, 0);
  assert.equal(first.cells.every(cell => cell.keyPositions.join(',') === '4,4,4'), true);
  assert.equal(first.cells.every(cell => cell.flaggedItems === 0 && cell.blockingItems === 0), true);
});

test('all 51 individually revised items remain cue-clean and source-versioned', () => {
  const revised = candidates.filter(candidate => candidate.publicItem.contentVersion !== 'draft-1');
  assert.equal(revised.length, 51);
  assert.equal(revised.filter(candidate => candidate.publicItem.contentVersion === 'draft-2').length, 33);
  assert.equal(revised.filter(candidate => candidate.publicItem.contentVersion === 'draft-3').length, 18);
  for (const record of revised) {
    assert.match(record.source.reference, new RegExp(`original-${record.publicItem.contentVersion}(?::|$)`));
    assert.deepEqual(auditDiagnosticItemCues(record).findings, []);
  }
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

  const semanticCue = structuredClone(source);
  const semanticKeyIndex = semanticCue.publicItem.displayOptions
    .findIndex(option => option.id === semanticCue.scoring.optionId);
  const semanticDistractors = semanticCue.publicItem.displayOptions
    .filter((_, index) => index !== semanticKeyIndex);
  semanticCue.publicItem.displayOptions[semanticKeyIndex].text = 'It may be useful in some cases.';
  semanticDistractors[0].text = 'It is always the only possible answer.';
  semanticDistractors[1].text = 'It is never useful anywhere.';
  const semanticAudit = auditDiagnosticItemCues(semanticCue);
  assert.equal(semanticAudit.disposition, 'HUMAN_REVIEW_REQUIRED');
  assert.ok(semanticAudit.findings.some(finding => finding.code === 'ABSOLUTE_LANGUAGE_ASYMMETRY'));
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
