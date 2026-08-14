import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { TOEFL_BUILD_SENTENCE_SET1 } from '../src/data/toefl/build-sentence-set-1.ts';
import {
  TOEFL_BUILD_SENTENCE_SET2_V2,
  TOEFL_BUILD_SENTENCE_SET3_V2,
  TOEFL_BUILD_SENTENCE_SET4_V2,
  TOEFL_BUILD_SENTENCE_SET5_V2,
} from '../src/data/toefl/build-sentence-sets-2-5.ts';
import {
  TOEFL_BUILD_SENTENCE_SET6_V2,
  TOEFL_BUILD_SENTENCE_SET7_V2,
  TOEFL_BUILD_SENTENCE_SET8_V2,
  TOEFL_BUILD_SENTENCE_SET9_V2,
  TOEFL_BUILD_SENTENCE_SET10_V2,
} from '../src/data/toefl/build-sentence-sets-6-10.ts';
import {
  TOEFL_BUILD_SENTENCE_SET11_V2,
  TOEFL_BUILD_SENTENCE_SET12_V2,
  TOEFL_BUILD_SENTENCE_SET13_V2,
  TOEFL_BUILD_SENTENCE_SET14_V2,
  TOEFL_BUILD_SENTENCE_SET15_V2,
} from '../src/data/toefl/build-sentence-sets-11-15.ts';

const root = new URL('../', import.meta.url);
const read = async (path) => readFile(new URL(path, root), 'utf8');

const sets = [
  TOEFL_BUILD_SENTENCE_SET1,
  TOEFL_BUILD_SENTENCE_SET2_V2,
  TOEFL_BUILD_SENTENCE_SET3_V2,
  TOEFL_BUILD_SENTENCE_SET4_V2,
  TOEFL_BUILD_SENTENCE_SET5_V2,
  TOEFL_BUILD_SENTENCE_SET6_V2,
  TOEFL_BUILD_SENTENCE_SET7_V2,
  TOEFL_BUILD_SENTENCE_SET8_V2,
  TOEFL_BUILD_SENTENCE_SET9_V2,
  TOEFL_BUILD_SENTENCE_SET10_V2,
  TOEFL_BUILD_SENTENCE_SET11_V2,
  TOEFL_BUILD_SENTENCE_SET12_V2,
  TOEFL_BUILD_SENTENCE_SET13_V2,
  TOEFL_BUILD_SENTENCE_SET14_V2,
  TOEFL_BUILD_SENTENCE_SET15_V2,
];

assert.equal(new Set(sets.map((set) => set.objectId)).size, 15, 'Build object IDs must be unique across Sets 1–15.');
for (const [setIndex, set] of sets.entries()) {
  assert.equal(set.items.length, 10, `Set ${setIndex + 1} must contain 10 Build a Sentence items.`);
  assert.equal(new Set(set.items.map((item) => item.id)).size, 10, `Set ${setIndex + 1} item IDs must be unique.`);
  for (const item of set.items) {
    assert.ok(item.context.trim().length >= 20, `${item.id} needs sufficient communicative context.`);
    assert.ok(item.replyPrefix.trim() && item.replySuffix.trim(), `${item.id} needs fixed reply context.`);
    assert.equal(item.tiles.length, item.blankCount + 1, `${item.id} must include exactly one unused distractor.`);
    assert.equal(new Set(item.tiles.map((tile) => tile.id)).size, item.tiles.length, `${item.id} tile IDs must be unique.`);
    assert.ok(item.tiles.every((tile) => tile.text.trim()), `${item.id} contains an empty tile.`);
    assert.ok(!('answer' in item) && !('acceptedOrders' in item), `${item.id} leaks a scoring key in public data.`);
  }
}

const publicData = await read('src/data/toefl/build-sentence-set-1.ts');
const expansionPublicData = await read('src/data/toefl/build-sentence-sets-2-5.ts');
const expansionPublicW5Data = await read('src/data/toefl/build-sentence-sets-6-10.ts');
const expansionPublicW6Data = await read('src/data/toefl/build-sentence-sets-11-15.ts');
const serverData = await read('src/server/toefl/build-sentence-set-1.ts');
const expansionServerData = await read('src/server/toefl/build-sentence-sets-2-5.ts');
const expansionServerW5Data = await read('src/server/toefl/build-sentence-sets-6-10.ts');
const expansionServerW6Data = await read('src/server/toefl/build-sentence-sets-11-15.ts');
const legacyW5Data = await read('src/server/toefl/build-sentence-legacy-sets-6-10.ts');
const legacyW6Data = await read('src/server/toefl/build-sentence-legacy-sets-11-15.ts');
const registryData = await read('src/server/toefl/build-sentence-registry.ts');
const mockData = await read('src/data/mocks/toefl-set-1.ts');
const expansionMocks = await Promise.all([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((set) => read(`src/data/mocks/toefl-set-${set}.ts`)));
const renderer = await read('src/components/toefl/BuildSentenceItem.tsx');
const client = await read('src/app/(site)/examenes/[exam]/practica/[mockId]/Toefl2026PracticeClient.tsx');
const route = await read('src/app/api/practica/toefl/build-sentence/score/route.ts');
const practice = await read('src/components/toefl/BuildSentenceSet1Practice.tsx');

assert.ok(!publicData.includes('ANSWER_KEY') && !publicData.includes('acceptedOrders'), 'Public Build data must not contain the key.');
assert.ok(!expansionPublicData.includes('acceptedOrders') && !expansionPublicData.includes('answer:'), 'Sets 2–5 public Build data must not contain scoring keys.');
assert.ok(!expansionPublicW5Data.includes('acceptedOrders') && !expansionPublicW5Data.includes('answer:'), 'Sets 6–10 public Build data must not contain scoring keys.');
assert.ok(!expansionPublicW6Data.includes('acceptedOrders') && !expansionPublicW6Data.includes('answer:'), 'Sets 11–15 public Build data must not contain scoring keys.');
assert.match(serverData, /import 'server-only'/, 'Build scoring key must be server-only.');
assert.match(serverData, /TOEFL_BUILD_SENTENCE_SET1_LEGACY_SOURCE/, 'The six-item legacy source must remain preserved.');
assert.match(expansionServerData, /import 'server-only'/, 'Sets 2–5 scoring keys must be server-only.');
assert.match(expansionServerData, /TOEFL_BUILD_SENTENCE_SETS_2_TO_5_LEGACY_SOURCES/, 'Sets 2–5 legacy sources must remain preserved.');
assert.match(expansionServerData, /public tiles differ from the private canonical source/, 'Public fragments and private keys must fail closed when they drift.');
assert.match(expansionServerW5Data, /import 'server-only'/, 'Sets 6–10 scoring keys must be server-only.');
assert.match(legacyW5Data, /import 'server-only'/, 'Sets 6–10 legacy sources must be server-only.');
assert.equal([...legacyW5Data.matchAll(/id: "t(?:6|7|8|9|10)-w-bs[1-6]"/g)].length, 30, 'Sets 6–10 preserve all thirty legacy Build items.');
assert.match(expansionServerW6Data, /import 'server-only'/, 'Sets 11–15 scoring keys must be server-only.');
assert.match(legacyW6Data, /import 'server-only'/, 'Sets 11–15 legacy sources must be server-only.');
assert.equal([...legacyW6Data.matchAll(/id: 't(?:11|12|13|14|15)-w-bs[1-6]'/g)].length, 30, 'Sets 11–15 preserve all thirty legacy Build items.');
assert.match(registryData, /TOEFL_BUILD_SENTENCE_SCORING_SETS_6_TO_10/, 'The master registry includes the W5 scoring objects.');
assert.match(registryData, /TOEFL_BUILD_SENTENCE_SCORING_SETS_11_TO_15/, 'The master registry includes the W6 scoring objects.');
assert.match(mockData, /TOEFL_BUILD_SENTENCE_SET1\.items\.map/, 'Set 1 mock must render all ten public items.');
assert.ok(!mockData.includes("type: 'sentencebuild', id: 't1-w-bs1'"), 'Set 1 must not retain the exposed legacy key.');
for (const [index, source] of expansionMocks.entries()) {
  const set = index + 2;
  assert.match(source, new RegExp(`TOEFL_BUILD_SENTENCE_SET${set}_V2\\.items\\.map`), `Set ${set} mock must render all ten public items.`);
  assert.ok(!source.includes(`type: 'sentencebuild', id: 't${set}-w-bs1'`), `Set ${set} must not retain an exposed legacy key.`);
}
assert.match(renderer, /aria-live="polite"/, 'The renderer needs a screen-reader status announcement.');
assert.match(renderer, /onFocus/, 'The renderer must expose focus restoration hooks.');
assert.match(renderer, /type="button"/, 'The interaction must use keyboard-operable native buttons.');
assert.match(client, /buildScore/, 'The full mock must reconcile server-scored Build results.');
assert.match(client, /buildObjectId/, 'The full mock must submit the Build object identity selected by the current set.');
assert.match(route, /scoreToeflBuildSentenceAttempt/, 'The scoring route must call the shared exact-order contract.');
assert.match(route, /TOEFL_BUILD_SENTENCE_SCORING_BY_OBJECT_ID/, 'The scoring route must resolve the server-only key registry.');
assert.match(practice, /localStorage/, 'The public pilot must persist an anonymous attempt.');
assert.match(practice, /fallo técnico/, 'Technical scoring failures must not become academic errors.');

console.log('✓ TOEFL 2026 Build a Sentence Sets 1–15: 150 contextual items, server-only exact scoring, persistence and accessible controls verified.');
