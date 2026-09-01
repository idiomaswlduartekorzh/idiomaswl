#!/usr/bin/env node

// Guardián transversal de TOEFL Reading (Sets 1–20, módulos 1 y 2).
// Falla cuando marcar siempre la única opción más larga acertaría más de la
// mitad de un set, o cuando una clave sobresale por ocho palabras o más.
// Se mide sobre las claves privadas y el contenido público que consume la app.

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { registerHooks } from 'node:module';

const root = fileURLToPath(new URL('../', import.meta.url));

// Los mocks usan el alias de Next `@/` y omiten extensiones en imports relativos.
// Este guardián corre con Node puro, así que reproduce únicamente esa resolución.
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith('@/')) {
      const absolute = path.join(root, 'src', specifier.slice(2));
      try {
        return nextResolve(pathToFileURL(absolute).href, context);
      } catch {
        return nextResolve(pathToFileURL(`${absolute}.ts`).href, context);
      }
    }
    try {
      return nextResolve(specifier, context);
    } catch (error) {
      if (specifier.startsWith('.') && !specifier.match(/\.[cm]?[jt]s$/)) {
        return nextResolve(`${specifier}.ts`, context);
      }
      throw error;
    }
  },
});

const words = (text) => String(text).trim().match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)?/gu) ?? [];
const wordCount = (text) => words(text).length;

function answerLabels(source) {
  const labels = new Map();
  for (const match of source.matchAll(/['"](item:t\d+-r-[^'"]+)['"]\s*:\s*\[\s*['"][^'"]+:option-([a-d])['"]/g)) {
    labels.set(match[1], match[2].toUpperCase());
  }
  return labels;
}

function numberedLabels(source, blockName) {
  const start = source.indexOf(`const ${blockName}`);
  if (start < 0) return new Map();
  const tail = source.slice(start);
  const end = tail.indexOf('\n};');
  const block = end < 0 ? tail : tail.slice(0, end);
  const labels = new Map();
  for (const match of block.matchAll(/^\s*(\d+):\s*\[([^\]]+)\]/gm)) {
    labels.set(Number(match[1]), [...match[2].matchAll(/['"]([A-D])['"]/g)].map((entry) => entry[1]));
  }
  return labels;
}

const [
  set1Module1,
  module1Batch2To5,
  module1Batch6To10,
  module1Batch11To15,
  module1Batch16To20,
  module2Batch1To5,
  module2Batch6To10,
  module2Batch11To15,
  module2Batch16To20,
] = await Promise.all([
  import('../src/data/toefl/reading-set-1.ts'),
  import('../src/data/toefl/reading-sets-2-5.ts'),
  import('../src/data/toefl/reading-sets-6-10.ts'),
  import('../src/data/toefl/reading-sets-11-15.ts'),
  import('../src/data/toefl/reading-sets-16-20.ts'),
  import('../src/data/toefl/reading-module2-sets-1-5.ts'),
  import('../src/data/toefl/reading-module2-sets-6-10.ts'),
  import('../src/data/toefl/reading-module2-sets-11-15.ts'),
  import('../src/data/toefl/reading-module2-sets-16-20.ts'),
]);

const module1BySet = new Map([
  ...module1Batch2To5.TOEFL_READING_SETS_2_TO_5,
  ...module1Batch6To10.TOEFL_READING_SETS_6_TO_10,
  ...module1Batch11To15.TOEFL_READING_SETS_11_TO_15,
  ...module1Batch16To20.TOEFL_READING_SETS_16_TO_20,
].map((set) => [Number(set.id.match(/set(\d+)/)?.[1]), set]));

const module2BySet = new Map([
  ...module2Batch1To5.TOEFL_READING_MODULE2_SETS_1_TO_5,
  ...module2Batch6To10.TOEFL_READING_MODULE2_SETS_6_TO_10,
  ...module2Batch11To15.TOEFL_READING_MODULE2_SETS_11_TO_15,
  ...module2Batch16To20.TOEFL_READING_MODULE2_SETS_16_TO_20,
].map((set) => [set.setNumber, set]));

const [set1KeysSource, module1KeysSource, ...module2KeySources] = await Promise.all([
  readFile(path.join(root, 'src/server/toefl/reading-set-1.ts'), 'utf8'),
  readFile(path.join(root, 'src/server/toefl/reading-registry.ts'), 'utf8'),
  ...['1-5', '6-10', '11-15', '16-20'].map((batch) =>
    readFile(path.join(root, `src/server/toefl/reading-module2-sets-${batch}.ts`), 'utf8')),
]);

const module1Labels = new Map([...answerLabels(set1KeysSource), ...answerLabels(module1KeysSource)]);
const module2Labels = new Map(module2KeySources.flatMap((source) => [...numberedLabels(source, 'READING_KEY_LABELS')]));

function choice(item, answerIndex, bank) {
  return {
    id: item.id,
    bank,
    options: item.options.map((option) => typeof option === 'string' ? option : option.text),
    answer: answerIndex,
  };
}

function serverChoice(item, bank, labelMap) {
  if (item.type !== 'single-select') return null;
  const label = labelMap.get(item.id);
  const answer = item.options.findIndex((option) => option.label === label);
  return choice(item, answer, bank);
}

const questionsBySet = new Map();
for (let setNumber = 1; setNumber <= 20; setNumber += 1) {
  const rows = [];
  if (setNumber === 1) {
    for (const block of set1Module1.TOEFL_READING_SET1.blocks) {
      for (const item of block.items) {
        const row = serverChoice(item, `M1 ${block.scope}`, module1Labels);
        if (row) rows.push(row);
      }
    }
  } else {
    const { default: mock } = await import(`../src/data/mocks/toefl-set-${setNumber}.ts`);
    for (const section of mock.sections.filter((entry) => entry.skill === 'reading')) {
      for (const item of section.questions.filter((entry) => entry.type === 'mcq')) {
        rows.push(choice(item, item.answer, 'M1 daily-life'));
      }
    }
    for (const item of module1BySet.get(setNumber)?.academic.items ?? []) {
      const row = serverChoice(item, 'M1 academic', module1Labels);
      if (row) rows.push(row);
    }
  }

  const module2 = module2BySet.get(setNumber);
  const labels = module2Labels.get(setNumber) ?? [];
  const items = module2 ? [...module2.dailyLife.flatMap((block) => block.items), ...module2.academic.items] : [];
  items.forEach((item, index) => {
    const bank = index < 5 ? 'M2 daily-life' : 'M2 academic';
    const row = serverChoice(item, bank, index < labels.length ? new Map([[item.id, labels[index]]]) : new Map());
    if (row) {
      rows.push(row);
    }
  });
  questionsBySet.set(setNumber, rows);
}

const reportOnly = process.argv.includes('--report');
const problems = [];
for (const [setNumber, questions] of questionsBySet) {
  const longest = [];
  const silhouettes = [];
  for (const question of questions) {
    if (question.answer < 0 || question.answer >= question.options.length) {
      problems.push(`Set ${setNumber}/${question.id}: no se pudo resolver la clave.`);
      continue;
    }
    const lengths = question.options.map(wordCount);
    const correctLength = lengths[question.answer];
    const maxDistractor = Math.max(...lengths.filter((_, index) => index !== question.answer));
    if (correctLength > maxDistractor) longest.push(question.id);
    if (correctLength - maxDistractor >= 8) silhouettes.push(`${question.id}(+${correctLength - maxDistractor})`);
  }
  const percentage = questions.length ? (longest.length / questions.length) * 100 : 0;
  console.log(`TOEFL Reading Set ${String(setNumber).padStart(2, '0')}: ${questions.length} ítems · correcta más larga ${longest.length}/${questions.length} (${percentage.toFixed(1)} %) · outliers +8 ${silhouettes.length}`);
  if (reportOnly) {
    console.log(`  largas: ${longest.join(', ') || 'ninguna'}`);
    console.log(`  +8: ${silhouettes.join(', ') || 'ninguna'}`);
  }
  if (questions.length !== 20) problems.push(`Set ${setNumber}: el guardián encontró ${questions.length}/20 preguntas; hay contenido sin auditar.`);
  if (!reportOnly && percentage > 50) problems.push(`Set ${setNumber}: elegir siempre la opción más larga acierta ${longest.length}/${questions.length} (${percentage.toFixed(1)} %).`);
  if (!reportOnly && silhouettes.length > 0) problems.push(`Set ${setNumber}: ${silhouettes.length} correcta(s) sobresalen 8+ palabras: ${silhouettes.join(', ')}.`);
}

if (problems.length > 0) {
  console.error(`\n✗ Guardián de longitud TOEFL: ${problems.length} problema(s).`);
  for (const problem of problems) console.error(`  · ${problem}`);
  process.exitCode = 1;
} else if (!reportOnly) {
  console.log('\n✓ TOEFL Reading sin pistas sistemáticas por longitud.');
}
