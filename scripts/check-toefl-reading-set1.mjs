import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { TOEFL_READING_SET1 } from '../src/data/toefl/reading-set-1.ts';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');
const sha = (value) => createHash('sha256').update(value).digest('hex');

const daily = TOEFL_READING_SET1.blocks.filter((block) => block.scope === 'daily-life');
const academic = TOEFL_READING_SET1.blocks.find((block) => block.scope === 'academic');
assert.deepEqual(daily.map((block) => block.items.length), [3, 2], 'Daily Life remains two texts with 3 + 2 items');
assert.ok(daily.every((block) => {
  const words = block.text.trim().split(/\s+/).length;
  return words >= 15 && words <= 150;
}), 'Daily Life texts remain within the ETS overview range of about 15–150 words');
assert.ok(academic, 'the academic block exists');
const academicWords = academic.text.trim().split(/\s+/).length;
assert.ok(academicWords >= 180 && academicWords <= 220, `academic passage stays near 200 words (actual ${academicWords})`);
assert.equal(academic.items.filter((item) => item.alignment === 'official-family-pilot').length, 5, 'academic pilot has five official-family questions');
assert.equal(academic.items.filter((item) => item.alignment === 'welearn-supplementary').length, 1, 'legacy multi-select is one labeled supplement');

const items = TOEFL_READING_SET1.blocks.flatMap((block) => block.items);
assert.equal(items.length, 11, 'Set 1 exposes eleven visible Reading interactions');
assert.equal(new Set(items.map((item) => item.id)).size, items.length, 'item ids are unique');
for (const item of items) {
  assert.equal(item.options.length, 4, `${item.id} has four options`);
  assert.equal(new Set(item.options.map((option) => option.id)).size, 4, `${item.id} option ids are unique`);
  assert.ok(item.options.every((option) => option.id.startsWith(`${item.id}:option-`)), `${item.id} options are stably namespaced`);
}

const [publicSource, serverSource, mockSource, clientSource, dailyPage, academicPage] = await Promise.all([
  read('src/data/toefl/reading-set-1.ts'),
  read('src/server/toefl/reading-set-1.ts'),
  read('src/data/mocks/toefl-set-1.ts'),
  read('src/app/(site)/examenes/[exam]/practica/[mockId]/Toefl2026PracticeClient.tsx'),
  read('src/app/(site)/practica/toefl/reading/formato-2026/read-in-daily-life/page.tsx'),
  read('src/app/(site)/practica/toefl/reading/formato-2026/read-an-academic-passage/page.tsx'),
]);
assert.doesNotMatch(publicSource, /ANSWER_KEY|correctOptionIds|\banswer\s*:/, 'public Set 1 data contains no key field');
assert.match(serverSource, /import 'server-only'/, 'the key has an explicit server-only boundary');
assert.equal([...serverSource.matchAll(/^\s*'item:t1-r-(?:dl|ap)[^']*': \[/gm)].length, 11, 'the server key has exactly eleven entries');
const legacyPassage = serverSource.match(/passage: `([\s\S]*?)`,\n  items:/)?.[1];
assert.ok(legacyPassage, 'the superseded academic source remains preserved server-side');
assert.equal(sha(legacyPassage), '276ee66e2e4dca317c7bac0335993dc0b23fafa95bb03d4b3932764739a87340', 'the preserved v1 runtime passage hash stays pinned');
assert.doesNotMatch(mockSource, /correctOptionIds|ANSWER_KEY/, 'Set 1 mock does not import a Reading key');
assert.match(mockSource, /type: 'toefl-reading-single'/, 'Set 1 maps the new single-select contract');
assert.match(mockSource, /type: 'toefl-reading-multi'/, 'Set 1 maps the supplementary exact-set contract');
assert.match(clientSource, /case 'toefl-reading-multi'/, 'the shared client renders Set 1 multi-select');
assert.match(clientSource, /case 'multiselect'/, 'the shared client no longer silently omits legacy multi-select');
assert.match(dailyPage, /<ReadingSet1Practice scope="daily-life" \/>/, 'Daily Life exposes interactive Set 1 practice');
assert.match(academicPage, /<ReadingSet1Practice scope="academic" \/>/, 'Academic Passage exposes interactive Set 1 practice');

for (const path of [
  'src/components/toefl/ReadingSet1Practice.tsx',
  'src/app/(site)/examenes/[exam]/practica/[mockId]/Toefl2026PracticeClient.tsx',
  'src/data/mocks/toefl-set-1.ts',
]) {
  assert.doesNotMatch(await read(path), /@\/server\/toefl\/reading-set-1/, `${path} does not import the private key`);
}

const changedPaths = execFileSync('git', ['diff', '--name-only', 'HEAD'], { cwd: new URL('.', root), encoding: 'utf8' })
  .trim().split('\n').filter(Boolean);
assert.ok(changedPaths.every((path) => !path.startsWith('public/audio/') && !/\.(mp3|wav|m4a|ogg)$/i.test(path)), 'T13 changes no audio asset');

console.log(`✓ TOEFL Reading T13: 3+2 Daily Life, ${academicWords}-word Academic, server-only key, visible scoring, no audio changes`);
