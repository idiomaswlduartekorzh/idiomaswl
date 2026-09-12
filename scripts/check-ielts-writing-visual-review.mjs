#!/usr/bin/env node

import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const reviewPath = path.join(root, 'config/ielts-harness/writing-task1-visual-review.json');
const review = JSON.parse(fs.readFileSync(reviewPath, 'utf8'));
const sha256 = value => createHash('sha256').update(value).digest('hex');

assert.equal(review.schemaVersion, 1);
assert.equal(review.sets.length, 20, 'The semantic visual review must cover Sets 1–20');
assert.deepEqual(review.sets.map(row => row.set), Array.from({ length: 20 }, (_, index) => index + 1));

for (const row of review.sets) {
  const mock = (await import(`../src/data/mocks/ielts-set-${row.set}.ts`)).default;
  const task1 = mock.sections
    .flatMap(section => section.questions)
    .find(question => question.type === 'write' && question.taskNumber === 1);
  assert.ok(task1, `Set ${row.set}: Writing Task 1 is missing`);
  const task2 = mock.sections
    .flatMap(section => section.questions)
    .find(question => question.type === 'write' && question.taskNumber === 2);
  assert.ok(task2, `Set ${row.set}: Writing Task 2 is missing`);
  assert.equal(row.mockId, mock.id, `Set ${row.set}: mock ID drift`);
  assert.equal(row.questionId, task1.id, `Set ${row.set}: question ID drift`);
  assert.equal(row.imageUrl, task1.imageUrl, `Set ${row.set}: reviewed image URL drift`);
  assert.equal(row.semanticStatus, 'APPROVED', `Set ${row.set}: visual review is not approved`);
  assert.ok(row.task1Checks && Object.values(row.task1Checks).every(Boolean), `Set ${row.set}: Task 1 review is incomplete`);
  assert.ok(task1.imageAlt?.trim(), `Set ${row.set}: image alt text is missing`);

  const prompt = {
    stimulusLabel: task1.stimulusLabel ?? '',
    stimulus: task1.stimulus ?? '',
    text: task1.text ?? '',
    imageAlt: task1.imageAlt ?? '',
  };
  assert.equal(row.promptSha256, sha256(JSON.stringify(prompt)), `Set ${row.set}: reviewed prompt changed`);

  const assetPath = path.join(root, 'public', task1.imageUrl);
  const asset = fs.readFileSync(assetPath);
  assert.equal(row.assetSha256, sha256(asset), `Set ${row.set}: reviewed visual changed`);
  assert.equal(row.assetBytes, asset.length, `Set ${row.set}: reviewed asset size changed`);
  assert.ok(row.dimensions?.width >= 250 && row.dimensions?.height >= 250, `Set ${row.set}: visual is too small`);

  const task2Prompt = {
    stimulusLabel: task2.stimulusLabel ?? '',
    stimulus: task2.stimulus ?? '',
    text: task2.text ?? '',
  };
  assert.equal(row.task2?.questionId, task2.id, `Set ${row.set}: Task 2 question ID drift`);
  assert.equal(row.task2?.promptSha256, sha256(JSON.stringify(task2Prompt)), `Set ${row.set}: reviewed Task 2 prompt changed`);
  assert.equal(row.task2?.semanticStatus, 'APPROVED', `Set ${row.set}: Task 2 review is not approved`);
  assert.equal(task2.minWords, 250, `Set ${row.set}: Task 2 must require 250 words`);
  assert.ok(row.task2?.checks && Object.values(row.task2.checks).every(Boolean), `Set ${row.set}: Task 2 review is incomplete`);
}

console.log(JSON.stringify({
  status: 'PASS',
  reviewedSets: review.sets.length,
  semanticApprovals: review.sets.filter(row => row.semanticStatus === 'APPROVED').length,
  hashBound: true,
}, null, 2));
