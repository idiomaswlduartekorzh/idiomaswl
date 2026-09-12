#!/usr/bin/env node

import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const review = JSON.parse(fs.readFileSync(path.join(root, 'config/ielts-harness/speaking-semantic-review.json'), 'utf8'));
const sha256 = value => createHash('sha256').update(value).digest('hex');

assert.equal(review.schemaVersion, 1);
assert.deepEqual(review.sets.map(row => row.set), Array.from({ length: 20 }, (_, index) => index + 1));

for (const row of review.sets) {
  const mock = (await import(`../src/data/mocks/ielts-set-${row.set}.ts`)).default;
  const questions = mock.sections
    .filter(section => section.skill === 'speaking')
    .flatMap(section => section.questions)
    .filter(question => question.type === 'speak');
  const payload = questions.map(question => ({
    id: question.id,
    part: question.part,
    partNumber: question.partNumber,
    text: question.text,
    cueCard: question.cueCard ?? '',
    followUp: question.followUp ?? [],
  }));
  assert.equal(row.mockId, mock.id, `Set ${row.set}: mock identity drift`);
  assert.equal(row.speakingSha256, sha256(JSON.stringify(payload)), `Set ${row.set}: reviewed Speaking content changed`);
  assert.deepEqual(row.questionIds, questions.map(question => question.id), `Set ${row.set}: Speaking response fields changed`);
  assert.equal(row.semanticStatus, 'APPROVED', `Set ${row.set}: Speaking semantic review pending`);
  assert.deepEqual(questions.map(question => question.partNumber), [1, 2, 3], `Set ${row.set}: expected one response field per part`);
  assert.ok((questions[0].followUp ?? []).length >= 4, `Set ${row.set}: Part 1 lacks interview breadth`);
  assert.ok(questions[1].cueCard?.includes('You should say:'), `Set ${row.set}: Part 2 cue card is incomplete`);
  assert.ok(questions[1].cueCard?.toLowerCase().includes('explain'), `Set ${row.set}: Part 2 cue card lacks the final explanation`);
  assert.ok((questions[2].followUp ?? []).length >= 4, `Set ${row.set}: Part 3 lacks discussion breadth`);
  assert.ok(row.checks && Object.values(row.checks).every(Boolean), `Set ${row.set}: Speaking review contains a failed check`);
}

console.log(JSON.stringify({ status: 'PASS', reviewedSets: 20, parts: '1-2-3', hashBound: true }, null, 2));
