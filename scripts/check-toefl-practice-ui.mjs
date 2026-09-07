import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  TOEFL_BUILD_SENTENCE_PRACTICE_SETS,
  TOEFL_COMPLETE_WORDS_PRACTICE_SETS,
  TOEFL_READING_PRACTICE_SETS,
} from '../src/data/toefl/practice-set-catalog.ts';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const activeUiFiles = [
  'src/app/(site)/practica/toefl/page.tsx',
  'src/app/(site)/practica/toefl/ejercicios/page.tsx',
  'src/app/(site)/practica/toefl/listening/simulacros/page.tsx',
  'src/app/(site)/practica/toefl/reading/formato-2026/complete-the-words/page.tsx',
  'src/app/(site)/practica/toefl/reading/formato-2026/read-in-daily-life/page.tsx',
  'src/app/(site)/practica/toefl/reading/formato-2026/read-an-academic-passage/page.tsx',
  'src/app/(site)/practica/toefl/writing/build-a-sentence/page.tsx',
  'src/app/(site)/practica/toefl/writing/write-an-email/page.tsx',
  'src/app/(site)/practica/toefl/writing/academic-discussion/page.tsx',
  'src/app/(site)/practica/toefl/speaking/page.tsx',
  'src/components/toefl/SpeakingPracticeSet.tsx',
  'src/components/toefl/ToeflPracticeSetCatalog.tsx',
  'src/app/(site)/practica/toefl/reading/formato-2026/complete-the-words/CompleteTheWordsPractice.tsx',
  'src/components/toefl/BuildSentenceSet1Practice.tsx',
  'src/components/toefl/ReadingPracticeSet.tsx',
  'src/components/toefl/TimedWritingTask.tsx',
  'src/components/exam-practice/PracticeRouteShell.tsx',
  'src/components/exam-practice/PracticeSessionHeader.tsx',
  'src/components/exam-practice/PracticeSetCatalog.tsx',
];
const bannedOldCopy = [
  'Finalizar y corregir',
  'laboratorio',
  'transferencia',
  'Práctica complementaria',
  'Selecciona un ejercicio',
  'Disponible',
];

assert.equal(TOEFL_COMPLETE_WORDS_PRACTICE_SETS.length, 20, 'Complete the Words must expose 20 sets.');
assert.equal(TOEFL_BUILD_SENTENCE_PRACTICE_SETS.length, 20, 'Build a Sentence must expose 20 sets.');
assert.equal(TOEFL_READING_PRACTICE_SETS.length, 20, 'Reading must expose 20 sets.');

for (const relativePath of activeUiFiles) {
  const source = await readFile(path.join(ROOT, relativePath), 'utf8');
  for (const phrase of bannedOldCopy) {
    assert.ok(!source.includes(phrase), `${relativePath} still contains old UI copy: ${phrase}`);
  }
}

const catalogSource = await readFile(
  path.join(ROOT, 'src/components/exam-practice/PracticeSetCatalog.tsx'),
  'utf8',
);
assert.ok(catalogSource.includes('Choose a {task} exercise.'), 'The shared catalog must ask the learner to choose first.');
assert.ok(catalogSource.includes('Open exercise'), 'The shared catalog must label each exercise action.');

const toeflCatalogSource = await readFile(
  path.join(ROOT, 'src/components/toefl/ToeflPracticeSetCatalog.tsx'),
  'utf8',
);
assert.ok(toeflCatalogSource.includes('PracticeSetCatalog'), 'TOEFL must use the reusable practice catalog template.');

for (const relativePath of [
  'src/app/(site)/practica/toefl/listening/simulacros/page.tsx',
  'src/app/(site)/practica/toefl/listening/simulacros/practica/[mockId]/page.tsx',
  'src/app/(site)/practica/toefl/reading/formato-2026/complete-the-words/page.tsx',
  'src/app/(site)/practica/toefl/reading/formato-2026/read-in-daily-life/page.tsx',
  'src/app/(site)/practica/toefl/reading/formato-2026/read-an-academic-passage/page.tsx',
  'src/app/(site)/practica/toefl/writing/build-a-sentence/page.tsx',
  'src/app/(site)/practica/toefl/writing/write-an-email/page.tsx',
  'src/app/(site)/practica/toefl/writing/academic-discussion/page.tsx',
  'src/app/(site)/practica/toefl/speaking/page.tsx',
]) {
  const source = await readFile(path.join(ROOT, relativePath), 'utf8');
  assert.ok(source.includes('PracticeRouteShell'), `${relativePath} must use the shared practice route shell.`);
}

const siteNavSource = await readFile(path.join(ROOT, 'src/components/SiteNav.tsx'), 'utf8');
assert.ok(
  siteNavSource.includes("pathname.startsWith('/practica/toefl')"),
  'TOEFL practice routes must activate the English global navigation.',
);
const whatsappSource = await readFile(path.join(ROOT, 'src/components/WhatsAppFloat.tsx'), 'utf8');
assert.ok(
  whatsappSource.includes("['/practica/toefl'"),
  'TOEFL practice routes must use the English WhatsApp message.',
);

const listeningRunnerSource = await readFile(
  path.join(ROOT, 'src/app/(site)/practica/toefl/listening/simulacros/practica/[mockId]/ToeflListeningSectionRunner.tsx'),
  'utf8',
);
assert.ok(listeningRunnerSource.includes('replayable'), 'Listening practice audio must be replayable.');
assert.ok(listeningRunnerSource.includes('Previous block'), 'Listening practice must support backward navigation.');
assert.ok(listeningRunnerSource.includes('unanswered questions are allowed'), 'Listening practice must allow blank responses.');
assert.ok(!listeningRunnerSource.includes('Answer choices unlock'), 'Listening choices must not wait for audio playback.');

const speakingPageSource = await readFile(
  path.join(ROOT, 'src/app/(site)/practica/toefl/speaking/page.tsx'),
  'utf8',
);
assert.ok(speakingPageSource.includes('SpeakingPracticeSet'), 'Speaking must open as independent practice.');
assert.ok(speakingPageSource.includes('href: `${PATH}?set=${index + 1}`'), 'Speaking sets must stay inside the practice route.');
const speakingPracticeSource = await readFile(
  path.join(ROOT, 'src/components/toefl/SpeakingPracticeSet.tsx'),
  'utf8',
);
assert.ok(speakingPracticeSource.includes('replayable'), 'Speaking practice audio must be replayable.');
assert.ok(speakingPracticeSource.includes('You may continue without listening or recording.'), 'Speaking practice must not block navigation on audio or recording.');
const audioPlayerSource = await readFile(
  path.join(ROOT, 'src/components/exam-runner/primitives.tsx'),
  'utf8',
);
assert.ok(audioPlayerSource.includes("aria-label={playing ? 'Pause'"), 'Replayable practice audio must support pause and resume.');
assert.ok(audioPlayerSource.includes('disabled={!replayable &&'), 'Replayable audio controls must never enter a disabled state.');

await assert.rejects(
  access(path.join(ROOT, 'src/app/(site)/practica/toefl/TOEFLHubClient.tsx')),
  'The retired TOEFL hub must stay removed.',
);

console.log('✓ TOEFL practice UI: catalog-first · 20 sets · active learner copy in English');
