import assert from 'node:assert/strict';
import { QUICK_PRACTICE } from '../src/data/quick-practice.ts';

assert.equal(QUICK_PRACTICE.length, 8, 'Eight languages are required');
const slugs = new Set();
const ids = new Set();
for (const set of QUICK_PRACTICE) {
  assert(!slugs.has(set.slug), `Duplicate language: ${set.slug}`);
  slugs.add(set.slug);
  assert.equal(set.questions.length, 5, `${set.slug}: expected five questions`);
  for (const question of set.questions) {
    assert(!ids.has(question.id), `Duplicate question: ${question.id}`);
    ids.add(question.id);
    assert.equal(question.options.length, 4, `${question.id}: expected four choices`);
    assert(question.options.every((option) => option.trim()), `${question.id}: empty choice`);
    assert.equal(new Set(question.options).size, 4, `${question.id}: duplicate choices`);
    assert(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < 4,
      `${question.id}: invalid answer`);
    assert(question.prompt.trim() && question.explanation.trim(), `${question.id}: missing teaching text`);
  }
}
console.log(`Practice bank valid: ${slugs.size} languages, ${ids.size} questions.`);
