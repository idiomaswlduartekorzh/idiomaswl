#!/usr/bin/env node

// Verifica candidatos documentales sin importarlos ni modificar el runtime.

import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { auditItems } from '../docs/toefl-listening-length-audit-draft.mjs';
import { screen, selfTest } from '../docs/toefl-option-length-screen-draft.mjs';

const MAX_EXTREME_RATE = 0.45;
const METRICS = ['words_longest', 'words_shortest', 'chars_longest', 'chars_shortest'];
const tracker = JSON.parse(readFileSync('docs/toefl-listening-length-correction-tracker-20260904.json'));
const replacements = new Map();
const candidates = [];

for (let set = 2; set <= 20; set += 1) {
  const path = `docs/toefl-listening-set${set}-options-candidate.json`;
  const bytes = readFileSync(path);
  const candidate = JSON.parse(bytes);
  const baseline = auditItems.filter((item) => item.set === set);

  assert.equal(candidate.status, 'draft-academic-review-required');
  assert.equal(candidate.reviewer, null);
  assert.equal(candidate.setId, `set-${set}`);
  assert.equal(candidate.items.length, 34);
  assert.deepEqual(candidate.items.map((item) => item.id), baseline.map((item) => item.id));

  for (const item of candidate.items) {
    assert.equal(item.options.length, 4, item.id);
    assert.ok(item.options.every((option) => typeof option === 'string' && option.trim()), item.id);
    assert.equal(new Set(item.options.map((option) => option.trim().toLocaleLowerCase('en'))).size, 4, item.id);
    replacements.set(item.id, item.options);
  }

  const sha256 = createHash('sha256').update(bytes).digest('hex');
  const trackerRow = tracker.sets.find((row) => row.set === set);
  assert.equal(trackerRow.candidate, path);
  assert.equal(trackerRow.candidateSha256, sha256);
  candidates.push({ set, path, sha256, items: candidate.items.length });
}

const projected = auditItems.map((item) => replacements.has(item.id)
  ? { ...item, options: replacements.get(item.id) }
  : item);

assert.equal(projected.length, 680);
assert.equal(new Set(projected.map((item) => item.id)).size, 680);

function summarize(items) {
  const result = screen(items);
  const metrics = Object.fromEntries(METRICS.map((metric) => {
    const row = result.totals[metric];
    const worstRate = Math.max(row.expectedRate, row.firstRate);
    assert.ok(worstRate <= MAX_EXTREME_RATE, `${metric}: ${worstRate} > ${MAX_EXTREME_RATE}`);
    return [metric, { ...row, worstRate }];
  }));
  return { questions: result.questions, metrics };
}

const before = screen(auditItems);
const after = summarize(projected);
const perSet = Array.from({ length: 20 }, (_, index) => {
  const set = index + 1;
  return { set, ...summarize(projected.filter((item) => item.set === set)) };
});

console.log(JSON.stringify({
  status: 'candidates-2-20-and-680-item-projection-pass',
  selfTests: selfTest(),
  threshold: MAX_EXTREME_RATE,
  candidateSets: candidates.length,
  candidates,
  before,
  after,
  perSet,
  academicReviewRequired: true,
  runtimeModified: false,
}, null, 2));
