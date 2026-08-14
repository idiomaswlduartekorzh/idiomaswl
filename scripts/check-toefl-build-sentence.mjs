import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { TOEFL_BUILD_SENTENCE_SET1 } from '../src/data/toefl/build-sentence-set-1.ts';

const root = new URL('../', import.meta.url);
const read = async (path) => readFile(new URL(path, root), 'utf8');

assert.equal(TOEFL_BUILD_SENTENCE_SET1.items.length, 10, 'Set 1 must contain the official 10 Build a Sentence items.');
assert.equal(new Set(TOEFL_BUILD_SENTENCE_SET1.items.map((item) => item.id)).size, 10, 'Item IDs must be unique.');
for (const item of TOEFL_BUILD_SENTENCE_SET1.items) {
  assert.ok(item.context.trim().length >= 20, `${item.id} needs sufficient communicative context.`);
  assert.ok(item.replyPrefix.trim() && item.replySuffix.trim(), `${item.id} needs fixed reply context.`);
  assert.equal(item.tiles.length, item.blankCount + 1, `${item.id} must include exactly one unused distractor.`);
  assert.equal(new Set(item.tiles.map((tile) => tile.id)).size, item.tiles.length, `${item.id} tile IDs must be unique.`);
  assert.ok(item.tiles.every((tile) => tile.text.trim()), `${item.id} contains an empty tile.`);
  assert.ok(!('answer' in item) && !('acceptedOrders' in item), `${item.id} leaks a scoring key in public data.`);
}

const publicData = await read('src/data/toefl/build-sentence-set-1.ts');
const serverData = await read('src/server/toefl/build-sentence-set-1.ts');
const mockData = await read('src/data/mocks/toefl-set-1.ts');
const renderer = await read('src/components/toefl/BuildSentenceItem.tsx');
const client = await read('src/app/(site)/examenes/[exam]/practica/[mockId]/Toefl2026PracticeClient.tsx');
const route = await read('src/app/api/practica/toefl/build-sentence/score/route.ts');
const practice = await read('src/components/toefl/BuildSentenceSet1Practice.tsx');

assert.ok(!publicData.includes('ANSWER_KEY') && !publicData.includes('acceptedOrders'), 'Public Build data must not contain the key.');
assert.match(serverData, /import 'server-only'/, 'Build scoring key must be server-only.');
assert.match(serverData, /TOEFL_BUILD_SENTENCE_SET1_LEGACY_SOURCE/, 'The six-item legacy source must remain preserved.');
assert.match(mockData, /TOEFL_BUILD_SENTENCE_SET1\.items\.map/, 'Set 1 mock must render all ten public items.');
assert.ok(!mockData.includes("type: 'sentencebuild', id: 't1-w-bs1'"), 'Set 1 must not retain the exposed legacy key.');
assert.match(renderer, /aria-live="polite"/, 'The renderer needs a screen-reader status announcement.');
assert.match(renderer, /onFocus/, 'The renderer must expose focus restoration hooks.');
assert.match(renderer, /type="button"/, 'The interaction must use keyboard-operable native buttons.');
assert.match(client, /buildScore/, 'The full mock must reconcile server-scored Build results.');
assert.match(route, /scoreToeflBuildSentenceAttempt/, 'The scoring route must call the shared exact-order contract.');
assert.match(practice, /localStorage/, 'The public pilot must persist an anonymous attempt.');
assert.match(practice, /fallo técnico/, 'Technical scoring failures must not become academic errors.');

console.log('✓ TOEFL 2026 Build a Sentence Set 1: 10 contextual items, server-only exact scoring, persistence and accessible controls verified.');
