#!/usr/bin/env node

// Valida un candidato de opciones sin importarlo al runtime ni cambiar claves.

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { auditItems } from '../docs/toefl-listening-length-audit-draft.mjs';
import { screen, selfTest } from '../docs/toefl-option-length-screen-draft.mjs';

const candidatePath = process.argv[2];
if (!candidatePath) throw new Error('Uso: check-toefl-listening-candidate.mjs <candidate.json>');

const bytes = readFileSync(candidatePath);
const candidate = JSON.parse(bytes);
assert.equal(candidate.status, 'draft-academic-review-required');
assert.equal(candidate.reviewer, null);
const setNumber = Number(String(candidate.setId).match(/^set-(\d+)$/)?.[1]);
assert.ok(Number.isInteger(setNumber) && setNumber >= 1 && setNumber <= 20, 'setId inválido');

const baseline = auditItems.filter((item) => item.set === setNumber);
assert.equal(baseline.length, 34);
assert.deepEqual(candidate.items.map((item) => item.id), baseline.map((item) => item.id));

const projected = baseline.map((item, index) => {
  const replacement = candidate.items[index];
  assert.equal(replacement.options.length, 4, item.id);
  assert.ok(replacement.options.every((option) => typeof option === 'string' && option.trim()), item.id);
  assert.equal(new Set(replacement.options.map((option) => option.trim().toLocaleLowerCase('en'))).size, 4, item.id);
  return { ...item, options: replacement.options };
});

assert.deepEqual(
  projected.map((item) => [item.id, item.optionIds, item.correct, item.prompt, item.audioUrl]),
  baseline.map((item) => [item.id, item.optionIds, item.correct, item.prompt, item.audioUrl]),
  'El candidato solo puede proyectar texto de opciones',
);

const before = screen(baseline);
const after = screen(projected);
assert.ok(Object.values(after.totals).every((row) => !row.flagged), 'El candidato conserva una alerta de longitud');

console.log(JSON.stringify({
  status: 'candidate-passes-automatic-screen-academic-review-still-required',
  selfTests: selfTest(),
  set: setNumber,
  candidateSha256: createHash('sha256').update(bytes).digest('hex'),
  before,
  after,
}, null, 2));
