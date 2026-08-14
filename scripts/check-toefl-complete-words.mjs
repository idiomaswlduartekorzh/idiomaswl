import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { TOEFL_CTW_SET1_V3 } from '../src/data/toefl/complete-the-words-set-1.ts';

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

const [publicData, publicPage, legacyPage, mockSource, seoSource] = await Promise.all([
  read('src/data/toefl/complete-the-words-set-1.ts'),
  read('src/app/(site)/practica/toefl/reading/formato-2026/complete-the-words/page.tsx'),
  read('src/app/(site)/practica/toefl/reading/habilidades/seleccion-de-palabras-contexto/page.tsx'),
  read('src/data/mocks/toefl-set-1.ts'),
  read('src/data/practica-exams/seo-catalog.ts'),
]);

const publicCandidateObject = publicData.slice(0, publicData.indexOf('export type CompleteWordsOutcomeKind'));
assert.doesNotMatch(publicCandidateObject, /expectedMissing|answer\s*:/, 'public candidate data contains no answer key');
for (const answer of answers.values()) {
  assert.ok(!publicCandidateObject.includes(`'${answer}'`), `public candidate data does not expose missing letters ${answer}`);
}
assert.match(publicPage, /<CompleteTheWordsPractice \/>/, 'real CTW is the primary public interaction');
assert.doesNotMatch(publicPage, /TOEFL_COMPLETE_WORDS_ITEMS/, 'the CTW route no longer renders the old MCQ bank');
assert.match(legacyPage, /TOEFL_COMPLETE_WORDS_ITEMS/, 'the 16-item bank remains available');
assert.match(legacyPage, /no son la interacción Complete the Words/, 'legacy bank is honestly reclassified');
assert.match(mockSource, /id: TOEFL_CTW_SET1_V3\.id/, 'Set 1 uses the v3 candidate');
assert.match(mockSource, /missingLength: blank\.missingLength/, 'Set 1 sends lengths, not candidate answers');

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

console.log('✓ TOEFL Complete the Words T12: identity, security boundary, surfaces, and preserved bank');
