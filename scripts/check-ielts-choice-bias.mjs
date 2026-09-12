#!/usr/bin/env node

import assert from 'node:assert/strict';
import { withIeltsBalancedChoicePositions } from '../src/data/mocks/ielts-choice-presentation.ts';

const REPORT_ONLY = process.argv.includes('--report');
const MAX_AGGREGATE_EXTREME_RATE = 0.45;
const MAX_SET_EXTREME_RATE = 0.60;
const FIXED_LABELS = [
  ['TRUE', 'FALSE', 'NOT GIVEN'],
  ['YES', 'NO', 'NOT GIVEN'],
];

const words = value => String(value).trim().match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)?/gu)?.length ?? 0;
const chars = value => String(value).trim().length;
const normalized = value => String(value).trim().toUpperCase().replace(/\s+/gu, ' ');
const fixedLabels = question => FIXED_LABELS.some(pattern => (
  pattern.length === question.options.length
  && pattern.every((label, index) => label === normalized(question.options[index]))
));

function rows(mock) {
  return mock.sections.flatMap(section => section.questions.flatMap(question => {
    if ((question.type !== 'mcq' && question.type !== 'dialog') || fixedLabels(question)) return [];
    return [{ set: mock.id, skill: section.skill, question }];
  }));
}

function extremeExpectedRate(items, lengthOf, direction) {
  if (!items.length) return 0;
  return items.reduce((sum, { question }) => {
    const lengths = question.options.map(lengthOf);
    const extreme = direction === 'longest' ? Math.max(...lengths) : Math.min(...lengths);
    const tied = lengths.filter(length => length === extreme).length;
    return sum + (lengths[question.answer] === extreme ? 1 / tied : 0);
  }, 0) / items.length;
}

function percent(value) {
  return `${(value * 100).toFixed(1)} %`;
}

const authored = [];
const delivered = [];
for (let number = 1; number <= 20; number += 1) {
  const mock = (await import(`../src/data/mocks/ielts-set-${number}.ts`)).default;
  const presented = withIeltsBalancedChoicePositions(mock);
  const originalRows = rows(mock);
  const presentedRows = rows(presented);
  assert.equal(presentedRows.length, originalRows.length, `${mock.id}: presentation lost choice questions`);
  for (let index = 0; index < originalRows.length; index += 1) {
    const original = originalRows[index].question;
    const changed = presentedRows[index].question;
    assert.equal(changed.options[changed.answer], original.options[original.answer], `${mock.id}/${original.id}: keyed meaning changed`);
    assert.deepEqual([...changed.options].sort(), [...original.options].sort(), `${mock.id}/${original.id}: option text changed during presentation`);
  }
  authored.push(...originalRows);
  delivered.push(...presentedRows);
}

const failures = [];
for (const setNumber of Array.from({ length: 20 }, (_, index) => index + 1)) {
  const setId = `set-${setNumber}`;
  const positionRows = delivered.filter(row => row.set === setId);
  for (const optionCount of new Set(positionRows.map(row => row.question.options.length))) {
    const counts = Array(optionCount).fill(0);
    for (const { question } of positionRows.filter(row => row.question.options.length === optionCount)) counts[question.answer] += 1;
    if (Math.max(...counts) - Math.min(...counts) > 1) failures.push(`${setId}: posiciones ${optionCount}-opciones ${counts.join('/')}`);
  }

  if (positionRows.length >= 8) {
    for (const [metric, lengthOf, direction] of [
      ['words-longest', words, 'longest'],
      ['words-shortest', words, 'shortest'],
      ['chars-longest', chars, 'longest'],
      ['chars-shortest', chars, 'shortest'],
    ]) {
      const rate = extremeExpectedRate(positionRows, lengthOf, direction);
      if (rate > MAX_SET_EXTREME_RATE) failures.push(`${setId}/${metric}: ${percent(rate)} > ${percent(MAX_SET_EXTREME_RATE)}`);
    }
  }
}

for (const [scope, scoped] of [
  ['all', authored],
  ['listening', authored.filter(row => row.skill === 'listening')],
  ['reading', authored.filter(row => row.skill === 'reading')],
]) {
  const summary = [];
  for (const [metric, lengthOf, direction] of [
    ['words-longest', words, 'longest'],
    ['words-shortest', words, 'shortest'],
    ['chars-longest', chars, 'longest'],
    ['chars-shortest', chars, 'shortest'],
  ]) {
    const rate = extremeExpectedRate(scoped, lengthOf, direction);
    summary.push(`${metric}=${percent(rate)}`);
    if (rate > MAX_AGGREGATE_EXTREME_RATE) failures.push(`${scope}/${metric}: ${percent(rate)} > ${percent(MAX_AGGREGATE_EXTREME_RATE)}`);
  }
  console.log(`IELTS ${scope}: ${scoped.length} choice questions · ${summary.join(' · ')}`);
}

if (failures.length && !REPORT_ONLY) {
  console.error(`\n✗ IELTS choice-bias gate: ${failures.length} failure(s).`);
  for (const failure of failures) console.error(`  · ${failure}`);
  process.exitCode = 1;
} else if (failures.length) {
  console.log(`\nReport: ${failures.length} failure(s); --report does not block.`);
} else {
  console.log('\n✓ IELTS choice positions and length heuristics pass.');
}
