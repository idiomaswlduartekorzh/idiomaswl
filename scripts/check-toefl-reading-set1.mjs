import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { TOEFL_READING_SET1 } from '../src/data/toefl/reading-set-1.ts';
import { TOEFL_READING_SETS_2_TO_5 } from '../src/data/toefl/reading-sets-2-5.ts';
import { TOEFL_READING_SETS_6_TO_10 } from '../src/data/toefl/reading-sets-6-10.ts';
import { TOEFL_READING_SETS_11_TO_15 } from '../src/data/toefl/reading-sets-11-15.ts';
import { TOEFL_READING_SETS_16_TO_20 } from '../src/data/toefl/reading-sets-16-20.ts';

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

const expansionSets = [...TOEFL_READING_SETS_2_TO_5, ...TOEFL_READING_SETS_6_TO_10, ...TOEFL_READING_SETS_11_TO_15, ...TOEFL_READING_SETS_16_TO_20];
for (const object of expansionSets) {
  const words = object.academic.text.match(/[A-Za-z]+(?:'[A-Za-z]+)?/g)?.length ?? 0;
  assert.ok(words >= 180 && words <= 220, `${object.id} stays near 200 words (actual ${words})`);
  assert.equal(object.academic.items.filter((item) => item.alignment === 'official-family-pilot').length, 5, `${object.id} has five official-family questions`);
  assert.equal(object.academic.items.filter((item) => item.alignment === 'welearn-supplementary').length, 1, `${object.id} has one labeled supplement`);
  assert.equal(new Set(object.academic.items.map((item) => item.id)).size, 6, `${object.id} item ids are unique`);
  for (const item of object.academic.items) {
    assert.equal(item.options.length, 4, `${item.id} has four options`);
    assert.equal(new Set(item.options.map((option) => option.id)).size, 4, `${item.id} option ids are unique`);
    assert.ok(item.options.every((option) => option.id.startsWith(`${item.id}:option-`)), `${item.id} options are namespaced`);
  }
}

const [publicSource, publicExpansionSource, publicExpansionW5Source, publicExpansionW6Source, publicExpansionW7Source, serverSource, registrySource, legacyW5Source, legacyW6Source, legacyW7Source, mockSource, clientSource, routeSource, dailyPage, academicPage] = await Promise.all([
  read('src/data/toefl/reading-set-1.ts'),
  read('src/data/toefl/reading-sets-2-5.ts'),
  read('src/data/toefl/reading-sets-6-10.ts'),
  read('src/data/toefl/reading-sets-11-15.ts'),
  read('src/data/toefl/reading-sets-16-20.ts'),
  read('src/server/toefl/reading-set-1.ts'),
  read('src/server/toefl/reading-registry.ts'),
  read('src/server/toefl/reading-legacy-sets-6-10.ts'),
  read('src/server/toefl/reading-legacy-sets-11-15.ts'),
  read('src/server/toefl/reading-legacy-sets-16-20.ts'),
  read('src/data/mocks/toefl-set-1.ts'),
  read('src/app/(site)/examenes/[exam]/practica/[mockId]/Toefl2026PracticeClient.tsx'),
  read('src/app/api/practica/toefl/reading/score/route.ts'),
  read('src/app/(site)/practica/toefl/reading/formato-2026/read-in-daily-life/page.tsx'),
  read('src/app/(site)/practica/toefl/reading/formato-2026/read-an-academic-passage/page.tsx'),
]);
assert.doesNotMatch(publicSource, /ANSWER_KEY|correctOptionIds|\banswer\s*:/, 'public Set 1 data contains no key field');
assert.doesNotMatch(publicExpansionSource, /ANSWER_KEY|correctOptionIds|\banswer\s*:/, 'public Set 2–5 data contains no key field');
assert.doesNotMatch(publicExpansionW5Source, /ANSWER_KEY|correctOptionIds|\banswer\s*:/, 'public Set 6–10 data contains no key field');
assert.doesNotMatch(publicExpansionW6Source, /ANSWER_KEY|correctOptionIds|\banswer\s*:/, 'public Set 11–15 data contains no key field');
assert.doesNotMatch(publicExpansionW7Source, /ANSWER_KEY|correctOptionIds|\banswer\s*:/, 'public Set 16–20 data contains no key field');
assert.doesNotMatch(publicExpansionSource, /target as fine as a human hair|first domesticated on the grasslands of Central Asia around 3500 BCE/, 'superseded factual claims do not return to the public candidates');
assert.match(publicExpansionSource, /lower Volga-Don region/, 'Set 5 distinguishes the modern domestic lineage origin');
assert.match(publicExpansionSource, /rows of wires only 0\.18 millimeters thick/, 'Set 3 uses the measured bat result');
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
assert.match(clientSource, /objectId: readingObjectId/, 'the shared client submits the active reading object identity');
assert.doesNotMatch(clientSource, /TOEFL_READING_SET1\.objectId/, 'the shared client has no fixed Set 1 reading identity');
assert.match(routeSource, /Object\.hasOwn\(TOEFL_READING_SCORING_BY_OBJECT_ID, body\.objectId\)/, 'the route rejects unknown and prototype object names');
assert.equal([...registrySource.matchAll(/^\s*'item:t[2-5]-r-ap[^']*': \[/gm)].length, 24, 'Sets 2–5 have twenty-four private key entries');
assert.equal([...registrySource.matchAll(/^\s*'item:t(?:6|7|8|9|10)-r-ap[^']*': \[/gm)].length, 30, 'Sets 6–10 have thirty private key entries');
assert.equal([...registrySource.matchAll(/^\s*'item:t(?:11|12|13|14|15)-r-ap[^']*': \[/gm)].length, 30, 'Sets 11–15 have thirty private key entries');
assert.equal([...registrySource.matchAll(/^\s*'item:t(?:16|17|18|19|20)-r-ap[^']*': \[/gm)].length, 30, 'Sets 16–20 have thirty private key entries');
assert.equal([...registrySource.matchAll(/id: 'source:t[2-5]-r-ap-[^']+-v1'/g)].length, 4, 'four superseded academic sources remain server-side');
assert.match(legacyW5Source, /import 'server-only'/, 'the Set 6–10 editorial archive has a server-only boundary');
assert.equal([...legacyW5Source.matchAll(/id: 'source:t(?:6|7|8|9|10)-r-ap-[^']+-v1'/g)].length, 5, 'five W5 superseded academic sources remain server-side');
assert.equal([...legacyW5Source.matchAll(/\{ id: 't(?:6|7|8|9|10)-r-ap[1-6]'/g)].length, 30, 'the W5 archive preserves all thirty legacy answer identities');
assert.match(legacyW6Source, /import 'server-only'/, 'the Set 11–15 editorial archive has a server-only boundary');
assert.equal([...legacyW6Source.matchAll(/id: 'source:t(?:11|12|13|14|15)-r-ap-[^']+-v1'/g)].length, 5, 'five W6 superseded academic sources remain server-side');
assert.equal([...legacyW6Source.matchAll(/\{ id: 't(?:11|12|13|14|15)-r-ap[1-6]'/g)].length, 30, 'the W6 archive preserves all thirty legacy answer identities');
assert.match(legacyW7Source, /import 'server-only'/, 'the Set 16–20 editorial archive has a server-only boundary');
assert.equal([...legacyW7Source.matchAll(/id: 'source:t(?:16|17|18|19|20)-r-ap-[^']+-v1'/g)].length, 5, 'five W7 superseded academic sources remain server-side');
assert.equal([...legacyW7Source.matchAll(/\{ id: 't(?:16|17|18|19|20)-r-ap[1-6]'/g)].length, 30, 'the W7 archive preserves all thirty legacy answer identities');
assert.match(dailyPage, /<ReadingSet1Practice scope="daily-life" \/>/, 'Daily Life exposes interactive Set 1 practice');
assert.match(academicPage, /<ReadingSet1Practice scope="academic" \/>/, 'Academic Passage exposes interactive Set 1 practice');

for (const path of [
  'src/components/toefl/ReadingSet1Practice.tsx',
  'src/app/(site)/examenes/[exam]/practica/[mockId]/Toefl2026PracticeClient.tsx',
  'src/data/mocks/toefl-set-1.ts',
]) {
  assert.doesNotMatch(await read(path), /@\/server\/toefl\/reading-set-1/, `${path} does not import the private key`);
}

for (const setNumber of [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]) {
  const setSource = await read(`src/data/mocks/toefl-set-${setNumber}.ts`);
  assert.match(setSource, new RegExp(`TOEFL_READING_SET${setNumber}_V2\\.academic\\.items\\.map`), `Set ${setNumber} uses its v2 academic object`);
  assert.match(setSource, /práctica complementaria WeLearn/, `Set ${setNumber} labels the sixth interaction as supplementary`);
  assert.doesNotMatch(setSource, new RegExp(`id: 't${setNumber}-r-ap[1-6]'`), `Set ${setNumber} does not expose legacy academic keys`);
  assert.doesNotMatch(setSource, /@\/server\/toefl\/reading/, `Set ${setNumber} does not import a private key`);
}

const changedPaths = execFileSync('git', ['diff', '--name-only', 'HEAD'], { cwd: new URL('.', root), encoding: 'utf8' })
  .trim().split('\n').filter(Boolean);
assert.ok(changedPaths.every((path) => !path.startsWith('public/audio/toefl/')), 'T13 changes no TOEFL audio asset');

console.log(`✓ TOEFL Reading: Set 1 plus Academic Sets 2–20 near 200 words, server-only keys, visible scoring, no audio changes`);
