import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { TOEFL_CTW_SET1_V3 } from '../src/data/toefl/complete-the-words-set-1.ts';
import {
  TOEFL_CTW_SETS_2_TO_5,
} from '../src/data/toefl/complete-the-words-sets-2-5.ts';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');
const sha = (value) => createHash('sha256').update(value).digest('hex');

const serverSource = await read('src/server/toefl/complete-words-set-1.ts');
const sourceMatch = serverSource.match(/TOEFL_CTW_SET1_SOURCE_V2_TEXT = '([^']+)'/);
assert.ok(sourceMatch, 'the v2 provenance source remains in the server-only boundary');
assert.equal(sha(sourceMatch[1]), '591e04ee445b2367e1fdfc13373d6a727e42f305cebc1f8d777b58d88d220ada', 'v2 source hash stays pinned');
const answerEntries = [...serverSource.matchAll(/'((?:item:t1-r-cw2-v3:blank-)\d{2})': '([a-z]+)'/g)];
assert.equal(answerEntries.length, 10, 'the server-only key must contain exactly ten stable answers');
const answers = new Map(answerEntries.map((match) => [match[1], match[2]]));
const byNumber = new Map(TOEFL_CTW_SET1_V3.blanks.map((blank) => [blank.num, blank]));
const candidate = TOEFL_CTW_SET1_V3.template.replace(/\{\{(\d+)\}\}/g, (_, rawNum) => {
  const blank = byNumber.get(Number(rawNum));
  assert.ok(blank, `blank ${rawNum} exists`);
  const answer = answers.get(blank.id);
  assert.ok(answer, `${blank.id} has a server answer`);
  assert.equal(answer.length, blank.missingLength, `${blank.id} missing length matches`);
  return `${blank.prefix}${answer}`;
});

assert.equal(candidate.split(/\s+/).length, 76, 'candidate has 76 whitespace-delimited words');
assert.equal(sha(candidate), 'cebce2395c03dc360098a045f97ec560d865ca2aee49bf20da504221380a8a3e', 'candidate hash stays pinned');
assert.equal(sha(candidate.split(/(?<=\.)\s/)[0]), '484adf235348ca922d025eb1813bd6e156e9de4081b60e22736ab8f49d76cf79', 'first sentence stays intact');
assert.equal(new Set(TOEFL_CTW_SET1_V3.blanks.map((blank) => blank.id)).size, 10, 'blank ids are unique');

const registrySource = await read('src/server/toefl/complete-words-registry.ts');
for (const object of TOEFL_CTW_SETS_2_TO_5) {
  assert.equal(object.blanks.length, 10, `${object.id} has exactly ten targets`);
  assert.equal(new Set(object.blanks.map((blank) => blank.id)).size, 10, `${object.id} blank ids are unique`);
  assert.equal((object.template.match(/\{\{\d+\}\}/g) ?? []).length, 10, `${object.id} renders ten inputs`);
  assert.doesNotMatch(object.template.split(/(?<=\.)\s/)[0], /\{\{\d+\}\}/, `${object.id} keeps its first sentence intact`);

  const byNum = new Map(object.blanks.map((blank) => [blank.num, blank]));
  const completed = object.template.replace(/\{\{(\d+)\}\}/g, (_, rawNum) => {
    const blank = byNum.get(Number(rawNum));
    assert.ok(blank, `${object.id} blank ${rawNum} exists`);
    const match = registrySource.match(new RegExp(`'${blank.id}': '([a-z]+)'`));
    assert.ok(match, `${blank.id} has a server-only key`);
    const missing = match[1];
    assert.equal(missing.length, blank.missingLength, `${blank.id} missing length matches`);
    const word = `${blank.prefix}${missing}`;
    assert.equal(blank.prefix.length, Math.floor(word.length / 2), `${blank.id} reveals the first half`);
    return word;
  });
  const wordCount = completed.match(/[A-Za-z]+(?:'[A-Za-z]+)?/g)?.length ?? 0;
  assert.ok(wordCount >= 70 && wordCount <= 100, `${object.id} stays within 70–100 words (got ${wordCount})`);

  const afterFirstSentence = object.template.split(/(?<=\.)\s/).slice(1).join(' ');
  const tokens = afterFirstSentence.match(/\{\{\d+\}\}|[A-Za-z]+(?:'[A-Za-z]+)?/g) ?? [];
  const markerPositions = tokens
    .map((token, index) => token.startsWith('{{') ? index + 1 : null)
    .filter((position) => position !== null);
  assert.deepEqual(markerPositions, [2, 4, 6, 8, 10, 12, 14, 16, 18, 20], `${object.id} masks every second word after the first sentence`);
}
assert.equal((registrySource.match(/id: 't[2-5]-r-cw[12]'/g) ?? []).length, 8, 'all eight superseded Set 2–5 blocks remain preserved server-side');

const [publicData, publicSets2To5, publicPage, legacyPage, mockSource, seoSource, routeSource, clientSource] = await Promise.all([
  read('src/data/toefl/complete-the-words-set-1.ts'),
  read('src/data/toefl/complete-the-words-sets-2-5.ts'),
  read('src/app/(site)/practica/toefl/reading/formato-2026/complete-the-words/page.tsx'),
  read('src/app/(site)/practica/toefl/reading/habilidades/seleccion-de-palabras-contexto/page.tsx'),
  read('src/data/mocks/toefl-set-1.ts'),
  read('src/data/practica-exams/seo-catalog.ts'),
  read('src/app/api/practica/toefl/complete-the-words/score/route.ts'),
  read('src/app/(site)/examenes/[exam]/practica/[mockId]/Toefl2026PracticeClient.tsx'),
]);

const publicCandidateObject = publicData.slice(0, publicData.indexOf('export type CompleteWordsOutcomeKind'));
assert.doesNotMatch(publicCandidateObject, /expectedMissing|answer\s*:/, 'public candidate data contains no answer key');
for (const answer of answers.values()) {
  assert.ok(!publicCandidateObject.includes(`'${answer}'`), `public candidate data does not expose missing letters ${answer}`);
}
assert.doesNotMatch(publicSets2To5, /expectedMissing|answer\s*:/, 'public Set 2–5 objects contain no answer key');
assert.match(publicPage, /<CompleteTheWordsPractice \/>/, 'real CTW is the primary public interaction');
assert.doesNotMatch(publicPage, /TOEFL_COMPLETE_WORDS_ITEMS/, 'the CTW route no longer renders the old MCQ bank');
assert.match(legacyPage, /TOEFL_COMPLETE_WORDS_ITEMS/, 'the 16-item bank remains available');
assert.match(legacyPage, /no son la interacción Complete the Words/, 'legacy bank is honestly reclassified');
assert.match(mockSource, /id: TOEFL_CTW_SET1_V3\.id/, 'Set 1 uses the v3 candidate');
assert.match(mockSource, /missingLength: blank\.missingLength/, 'Set 1 sends lengths, not candidate answers');
assert.match(routeSource, /TOEFL_CTW_SCORING_BY_OBJECT_ID\[payload\.objectId\]/, 'scoring selects the private key by submitted object id');
assert.match(routeSource, /Object\.hasOwn\(TOEFL_CTW_SCORING_BY_OBJECT_ID, payload\.objectId\)/, 'prototype names cannot select a registry value');
assert.doesNotMatch(routeSource, /TOEFL_CTW_SET1_V3/, 'scoring route is no longer hard-coded to Set 1');
assert.match(clientSource, /objectId: question\.objectId/, 'the mock runner submits each candidate object identity');
assert.doesNotMatch(clientSource, /TOEFL_CTW_SET1_V3\.objectId/, 'the mock runner has no fixed Set 1 scoring identity');

for (const setNumber of [2, 3, 4, 5]) {
  const setSource = await read(`src/data/mocks/toefl-set-${setNumber}.ts`);
  assert.match(setSource, new RegExp(`id: TOEFL_CTW_SET${setNumber}_V2\\.id`), `Set ${setNumber} uses its canonical CTW object`);
  assert.match(setSource, /qRange: \[1, 10\]/, `Set ${setNumber} exposes ten official-family targets`);
  assert.match(setSource, /serverScoring: 'toefl-complete-words'/, `Set ${setNumber} opts into server scoring explicitly`);
  assert.doesNotMatch(setSource, new RegExp(`id: 't${setNumber}-r-cw[12]'`), `Set ${setNumber} legacy blocks are not mixed into official counts`);
}

const seoObject = seoSource.slice(seoSource.indexOf("slug: 'complete-the-words'"), seoSource.indexOf("slug: 'read-in-daily-life'"));
assert.match(seoObject, /letras faltantes|palabras parciales/, 'SEO describes the missing-letter interaction');
assert.doesNotMatch(seoObject, /selección de palabra por contexto/, 'SEO no longer describes CTW as multiple choice');

const srcFiles = [
  'src/app/(site)/practica/toefl/reading/formato-2026/complete-the-words/CompleteTheWordsPractice.tsx',
  'src/app/(site)/examenes/[exam]/practica/[mockId]/Toefl2026PracticeClient.tsx',
  'src/data/mocks/toefl-set-1.ts',
];
for (const path of srcFiles) {
  const source = await read(path);
  assert.doesNotMatch(source, /@\/server\/toefl|complete-words-set-1\.server/, `${path} does not import the private key`);
}

console.log('✓ TOEFL Complete the Words: Sets 1–5 identity, format, security boundary, and preserved sources');
