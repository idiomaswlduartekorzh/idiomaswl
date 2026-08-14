import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { TOEFL_READING_MODULE2_SETS_1_TO_5 } from '../src/data/toefl/reading-module2-sets-1-5.ts';
import { TOEFL_READING_MODULE2_SETS_6_TO_10 } from '../src/data/toefl/reading-module2-sets-6-10.ts';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');
const words = (text) => text.match(/[A-Za-z]+(?:'[A-Za-z]+)?/g) ?? [];

const [publicSource1, publicSource2, privateSource1, privateSource2, enhancerSource, readingRegistrySource, ctwRegistrySource] = await Promise.all([
  read('src/data/toefl/reading-module2-sets-1-5.ts'),
  read('src/data/toefl/reading-module2-sets-6-10.ts'),
  read('src/server/toefl/reading-module2-sets-1-5.ts'),
  read('src/server/toefl/reading-module2-sets-6-10.ts'),
  read('src/data/mocks/toefl-fixed-form.ts'),
  read('src/server/toefl/reading-registry.ts'),
  read('src/server/toefl/complete-words-registry.ts'),
]);

const sets = [...TOEFL_READING_MODULE2_SETS_1_TO_5, ...TOEFL_READING_MODULE2_SETS_6_TO_10];
const publicSources = [publicSource1, publicSource2];
const privateSources = [privateSource1, privateSource2];

assert.equal(sets.length, 10, 'batch has Sets 1–10');
for (const source of publicSources) {
  assert.doesNotMatch(source, /correctOptionIds|expectedMissing|\banswer\s*:/, 'public Module 2 data contains no answer key');
}
for (const source of privateSources) {
  assert.match(source, /import 'server-only'/, 'Module 2 keys have an explicit server-only boundary');
}
assert.match(readingRegistrySource, /\.\.\.module1\.items, \.\.\.module2\.items/, 'Reading scoring combines both modules');
assert.match(ctwRegistrySource, /TOEFL_CTW_MODULE2_SCORING_BY_OBJECT_ID/, 'CTW registry includes Sets 1–5 Module 2 keys');
assert.match(ctwRegistrySource, /TOEFL_CTW_MODULE2_SCORING_SETS_6_TO_10_BY_OBJECT_ID/, 'CTW registry includes Sets 6–10 Module 2 keys');
assert.match(enhancerSource, /question\.alignment === 'official-family-pilot'/, 'fixed session removes supplementary Reading items');
assert.match(enhancerSource, /question\.serverScoring === 'toefl-complete-words'/, 'fixed session removes Set 1 legacy CTW while preserving its source');

const privateKeys = new Map();
for (const source of privateSources) {
  const keyBlock = source.slice(source.indexOf('const CTW_KEYS'), source.indexOf('// Five Read'));
  for (const match of keyBlock.matchAll(/^\s*(\d+): \[([^\]]+)\]/gm)) {
    privateKeys.set(Number(match[1]), [...match[2].matchAll(/'([^']+)'/g)].map((entry) => entry[1]));
  }
}

const allIds = [];
for (const set of sets) {
  assert.equal(set.readingObjectId, `object:toefl-reading-set${set.setNumber}-v2`, `Set ${set.setNumber} shares one Reading scoring object across modules`);
  assert.equal(set.completeWords.blanks.length, 10, `Set ${set.setNumber} Module 2 CTW has ten targets`);
  assert.equal((set.completeWords.template.match(/\{\{\d+\}\}/g) ?? []).length, 10, `Set ${set.setNumber} Module 2 CTW renders ten inputs`);
  assert.doesNotMatch(set.completeWords.template.split(/(?<=\.)\s/)[0], /\{\{\d+\}\}/, `Set ${set.setNumber} keeps the first CTW sentence intact`);

  const keys = privateKeys.get(set.setNumber) ?? [];
  assert.equal(keys.length, 10, `Set ${set.setNumber} has ten private CTW answers`);
  const byNumber = new Map(set.completeWords.blanks.map((blank) => [blank.num, blank]));
  const completed = set.completeWords.template.replace(/\{\{(\d+)\}\}/g, (_, rawNumber) => {
    const blank = byNumber.get(Number(rawNumber));
    assert.ok(blank, `Set ${set.setNumber} blank ${rawNumber} exists`);
    const missing = keys[Number(rawNumber) - 1];
    assert.equal(missing.length, blank.missingLength, `${blank.id} length matches its private key`);
    const completeWord = `${blank.prefix}${missing}`;
    assert.equal(blank.prefix.length, Math.floor(completeWord.length / 2), `${blank.id} reveals the first half`);
    return completeWord;
  });
  assert.ok(words(completed).length >= 70 && words(completed).length <= 100, `Set ${set.setNumber} CTW stays within 70–100 words`);

  const afterFirstSentence = set.completeWords.template.split(/(?<=\.)\s/).slice(1).join(' ');
  const tokens = afterFirstSentence.match(/\{\{\d+\}\}|[A-Za-z]+(?:'[A-Za-z]+)?/g) ?? [];
  const positions = tokens.map((token, index) => token.startsWith('{{') ? index + 1 : null).filter(Boolean).slice(0, 10);
  assert.deepEqual(positions, [2, 4, 6, 8, 10, 12, 14, 16, 18, 20], `Set ${set.setNumber} masks every second word in the target sequence`);

  assert.deepEqual(set.dailyLife.map((block) => block.items.length), [2, 3], `Set ${set.setNumber} Daily Life uses 2 + 3 questions`);
  assert.ok(set.dailyLife.every((block) => words(block.text).length >= 15 && words(block.text).length <= 150), `Set ${set.setNumber} Daily Life texts stay within 15–150 words`);
  const academicWords = words(set.academic.text).length;
  assert.ok(academicWords >= 180 && academicWords <= 220, `Set ${set.setNumber} Academic Passage stays within 180–220 words (got ${academicWords})`);
  assert.equal(set.academic.items.length, 5, `Set ${set.setNumber} Academic Passage has five questions`);

  const readingItems = [...set.dailyLife.flatMap((block) => block.items), ...set.academic.items];
  assert.equal(readingItems.length, 10, `Set ${set.setNumber} Module 2 has ten selection questions`);
  for (const item of readingItems) {
    allIds.push(item.id);
    assert.equal(item.alignment, 'official-family-pilot', `${item.id} is in the official-family count`);
    assert.equal(item.options.length, 4, `${item.id} has four options`);
    assert.equal(new Set(item.options.map((option) => option.id)).size, 4, `${item.id} option ids are unique`);
    assert.ok(item.options.every((option) => option.id.startsWith(`${item.id}:option-`)), `${item.id} options are namespaced`);
  }
}

assert.equal(new Set(allIds).size, allIds.length, 'all Module 2 Reading item ids are globally unique');
const changedPaths = (await import('node:child_process')).execFileSync('git', ['diff', '--name-only', 'HEAD'], {
  cwd: new URL('.', root), encoding: 'utf8',
}).trim().split('\n').filter(Boolean);
assert.ok(changedPaths.every((path) => !path.startsWith('public/audio/') && !/\.(mp3|wav|m4a|ogg)$/i.test(path)), 'Reading expansion changes no audio asset');

console.log('✓ TOEFL fixed Reading Module 2: Sets 1–10 have 20 interactions, private keys, official-family shape, and no audio changes');
