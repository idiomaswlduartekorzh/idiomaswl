import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import set1 from '../src/data/mocks/goethe-a1-set-1.ts';
import set2 from '../src/data/mocks/goethe-a1-set-2.ts';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const audio = JSON.parse(fs.readFileSync(path.join(repoRoot, 'src/data/mocks/goethe-a1-set-2-audio.json'), 'utf8'));
const release = JSON.parse(fs.readFileSync(path.join(repoRoot, 'src/data/mocks/goethe-a1-set-2-release.json'), 'utf8'));
const imageManifest = JSON.parse(fs.readFileSync(path.join(repoRoot, 'public/images/goethe/a1-2/manifest.json'), 'utf8'));
const audioProductionManifest = JSON.parse(fs.readFileSync(path.join(repoRoot, 'public/audio/goethe/a1-2/manifest.json'), 'utf8'));
const runnerSource = fs.readFileSync(path.join(repoRoot, 'src/app/(site)/examenes/[exam]/practica/[mockId]/GoetheA1PracticeClient.tsx'), 'utf8');
const runnerStyles = fs.readFileSync(path.join(repoRoot, 'src/app/(site)/examenes/[exam]/practica/[mockId]/goethe-a1.module.css'), 'utf8');
const pageSource = fs.readFileSync(path.join(repoRoot, 'src/app/(site)/examenes/[exam]/practica/[mockId]/page.tsx'), 'utf8');
const adminSource = fs.readFileSync(path.join(repoRoot, 'src/app/(site)/dashboard/admin/JoseDashboardServer.tsx'), 'utf8');
const reviewSource = fs.readFileSync(path.join(repoRoot, 'src/lib/actions/completeGoetheReview.ts'), 'utf8');

const sections = new Map(set2.sections.map(section => [section.part, section]));
const objective = set2.sections.flatMap(section => section.questions.filter(question => question.type === 'mcq'));
const listening = set2.sections.filter(section => section.skill === 'listening').flatMap(section => section.questions);
const reading = set2.sections.filter(section => section.skill === 'reading').flatMap(section => section.questions);
const writing = set2.sections.filter(section => section.skill === 'writing').flatMap(section => section.questions);
const speaking = set2.sections.filter(section => section.skill === 'speaking').flatMap(section => section.questions);

function words(value = '') {
  return value.match(/[\p{L}\p{N}]+(?:[-'][\p{L}\p{N}]+)*/gu) ?? [];
}

function mean(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function maxRun(values) {
  let best = 0;
  let current = 0;
  let previous;
  for (const value of values) {
    current = value === previous ? current + 1 : 1;
    best = Math.max(best, current);
    previous = value;
  }
  return best;
}

function normalise(value = '') {
  return value.toLocaleLowerCase('de-DE').normalize('NFKD').replace(/\p{M}/gu, '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
}

function pngDimensions(file) {
  const data = fs.readFileSync(file);
  assert.equal(data.toString('ascii', 1, 4), 'PNG', `${file} is not a PNG`);
  return { width: data.readUInt32BE(16), height: data.readUInt32BE(20) };
}

function assessableStrings(mock) {
  const generic = new Set(['welche anzeige passt']);
  return mock.sections.flatMap(section => [
    section.passage,
    ...section.questions.flatMap(question => [
      question.stimulus,
      question.groupLabel,
      question.type === 'mcq' ? question.text : undefined,
    ]),
  ]).filter(Boolean).map(normalise).filter(value => value.length >= 28 && !generic.has(value));
}

assert.equal(set2.id, 'a1-2');
assert.equal(set2.examSlug, 'goethe');
assert.equal(set2.timeMinutes, 80, 'the complete A1 simulation must last 80 minutes');
assert.deepEqual([...sections.keys()], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 'expected the 11 official parts in order');
assert.deepEqual(set2.sections.map(section => section.skill), [
  'listening', 'listening', 'listening', 'reading', 'reading', 'reading',
  'writing', 'writing', 'speaking', 'speaking', 'speaking',
]);
assert.equal(listening.length, 15, 'Hören must contain 15 scored items');
assert.equal(reading.length, 15, 'Lesen must contain 15 scored items');
assert.equal(writing.length, 2, 'Schreiben must contain a form and a short message');
assert.equal(speaking.length, 3, 'Sprechen must contain three parts');
assert.equal(new Set(set2.sections.flatMap(section => section.questions.map(question => question.id))).size, 35, 'all 35 response objects need unique ids');

assert.deepEqual([1, 2, 3].map(part => sections.get(part).questions.length), [6, 4, 5], 'Hören shape must be 6 + 4 + 5');
assert.deepEqual(audio.parts.map(part => part.items.length), [6, 4, 5], 'audio script must cover all 15 items');
assert.deepEqual(audio.parts.map(part => part.plays), [2, 1, 2], 'replay policy must be 2 + 1 + 2');
assert.deepEqual(audio.parts.flatMap(part => part.items.map(item => item.number)), Array.from({ length: 15 }, (_, index) => index + 1));
assert.deepEqual(audio.production.cueFrequenciesHz, [990, 831, 698], 'approved higher three-tone cue must be preserved');
assert.equal(audio.production.cueDurationSeconds, 2.1);
assert.equal(audio.status, 'ready-existing');
assert.deepEqual(set2.sections.filter(section => section.skill === 'listening').map(section => section.audioUrl), [
  '/audio/goethe/a1-2/hoeren-teil1.mp3?v=20260912',
  '/audio/goethe/a1-2/hoeren-teil2.mp3?v=20260912',
  '/audio/goethe/a1-2/hoeren-teil3.mp3?v=20260912',
]);

const audioCharacters = audio.parts.flatMap(part => [
  part.intro, part.outro ?? '', ...(part.example?.turns ?? []).map(turn => turn.text),
  ...part.items.flatMap(item => item.turns.map(turn => turn.text)),
]).join('').length;
assert.ok(audioCharacters >= release.audioBudget.sourceCharacterTarget[0] && audioCharacters <= release.audioBudget.sourceCharacterTarget[1], `audio source is outside the approved character envelope: ${audioCharacters}`);
for (const item of audio.parts.flatMap(part => part.items)) {
  const characters = item.turns.map(turn => turn.text).join(' ').length;
  assert.ok(characters >= 150 && characters <= 280, `audio item ${item.number} is outside the 150–280 character envelope: ${characters}`);
}
assert.equal(release.audioBudget.consumeInThisPhase, true, 'approved audio generation must be recorded');
assert.equal(release.audioBudget.actualCredits, audioProductionManifest.credits.charged);
assert.ok(release.audioBudget.remainingCreditsAfter >= 8000, 'protected ElevenLabs reserve was breached');
assert.equal(audioProductionManifest.outputs.length, 19, 'expected four assembled tracks and fifteen item clips');
assert.ok(audioProductionManifest.outputs.every(output => {
  const file = path.join(repoRoot, output.file);
  return fs.existsSync(file) && fs.statSync(file).size === output.bytes;
}), 'an audio output is absent or differs from its production manifest');
assert.ok(audioProductionManifest.outputs.find(output => output.file.endsWith('/hoeren-komplett.mp3'))?.durationSeconds >= 1020, 'complete Hören track is too short');
assert.deepEqual(audioProductionManifest.acousticCue.frequenciesHz, [990, 831, 698]);
assert.equal(audioProductionManifest.acousticCue.cueCount, 28);

const readingOne = sections.get(4);
assert.match(readingOne.passage ?? '', /^TEXT A —/);
assert.match(readingOne.passage ?? '', /\n\nTEXT B —/);
assert.equal((readingOne.passage ?? '').split('\n\nTEXT B —').length, 2, 'Lesen Teil 1 must contain exactly two documents');
assert.deepEqual(readingOne.questions.map(question => question.stimulusLabel), ['Text A', 'Text A', 'Text B', 'Text B', 'Text B'], 'Text A must precede questions 1–2 and Text B questions 3–5');
const [textA, textB] = readingOne.passage.split('\n\nTEXT B —');
assert.ok(words(textA).length >= 45 && words(textA).length <= 90, `Text A has ${words(textA).length} words`);
assert.ok(words(textB).length >= 45 && words(textB).length <= 90, `Text B has ${words(textB).length} words`);

const readingTwo = sections.get(5);
assert.equal(readingTwo.questions.length, 5);
for (const question of readingTwo.questions) {
  assert.equal(question.options.length, 2);
  assert.equal(question.stimulus?.split('\n\n').length, 2, `${question.id} needs one independent A/B advert pair`);
  assert.ok(words(question.stimulus).length >= 22 && words(question.stimulus).length <= 48, `${question.id} advert pair has ${words(question.stimulus).length} words`);
}

const readingThree = sections.get(6);
assert.equal(readingThree.questions.length, 5);
for (const question of readingThree.questions) {
  assert.equal(question.stimulusStyle, 'sign');
  assert.ok(question.stimulus && question.stimulusLabel, `${question.id} needs its own notice and location`);
}
const noticeLengths = readingThree.questions.map(question => words(question.stimulus).length);
assert.ok(noticeLengths.every(length => length >= 6 && length <= 25), `Lesen Teil 3 notices must stay inside the A1 envelope: ${noticeLengths.join('/')}`);
assert.ok(Math.min(...noticeLengths) <= 10 && Math.max(...noticeLengths) >= 16, `Lesen Teil 3 needs authentic short/long variation: ${noticeLengths.join('/')}`);
assert.ok(new Set(noticeLengths).size >= 3, `Lesen Teil 3 notices are too uniform: ${noticeLengths.join('/')}`);

const form = writing.find(question => question.type === 'formgroup');
const message = writing.find(question => question.type === 'write');
assert.deepEqual(form.qRange, [1, 5]);
assert.equal(form.blanks.length, 5);
assert.equal((form.template.match(/\{\{\d+\}\}/g) ?? []).length, 5, 'form needs exactly five missing fields');
assert.ok(form.template.split('\n').length >= 9, 'form needs substantial prefilled context');
assert.ok(words(form.groupLabel).length >= 50 && words(form.groupLabel).length <= 90, `form situation has ${words(form.groupLabel).length} words`);
assert.equal(message.minWords, 30);
assert.equal((message.text.match(/^•/gm) ?? []).length, 3, 'short message needs three communicative bullets');
assert.match(message.text, /Anrede und einen Gruß/);

const speakingTwo = speaking.find(question => question.part === 10);
const speakingThree = speaking.find(question => question.part === 11);
const speakingThemes = speakingTwo.cueCard.split('\n\n').map(group => group.split('\n'));
assert.equal(speakingThemes.length, 2);
assert.ok(speakingThemes.every(([, cards]) => cards.split(' · ').length === 6), 'Sprechen Teil 2 needs two themes with six word cards each');
assert.equal(speakingThree.cueCard.split(/[\n·]/).map(value => value.trim()).filter(Boolean).length, 12, 'Sprechen Teil 3 needs twelve picture-card concepts');

const threeOption = objective.filter(question => question.options.length === 3);
const binary = objective.filter(question => question.options.length === 2);
assert.deepEqual([0, 1, 2].map(index => threeOption.filter(question => question.answer === index).length), [4, 4, 3], 'three-option keys must use the ideal 4/4/3 distribution');
assert.deepEqual([0, 1].map(index => binary.filter(question => question.answer === index).length), [10, 9], 'binary keys must use the ideal 10/9 distribution');
assert.ok(maxRun(objective.map(question => question.answer)) <= 2, 'no answer position may repeat more than twice consecutively');
const correctLengths = threeOption.map(question => question.options[question.answer].length);
const distractorLengths = threeOption.flatMap(question => question.options.filter((_, index) => index !== question.answer).map(option => option.length));
const lengthRatio = mean(correctLengths) / mean(distractorLengths);
assert.ok(lengthRatio >= 0.85 && lengthRatio <= 1.15, `correct options expose a length cue: ratio ${lengthRatio.toFixed(3)}`);
const longestCorrect = threeOption.filter(question => question.options[question.answer].length > Math.max(...question.options.filter((_, index) => index !== question.answer).map(option => option.length))).length;
assert.ok(longestCorrect <= Math.ceil(threeOption.length / 2), `too many correct options are longest: ${longestCorrect}/${threeOption.length}`);

const set1Strings = new Set(assessableStrings(set1));
const exactDuplicates = assessableStrings(set2).filter(value => set1Strings.has(value));
assert.deepEqual(exactDuplicates, [], `Set 2 duplicates Set 1 assessable content: ${exactDuplicates.join(' | ')}`);

assert.equal(release.expectedImages.length, 15, 'media plan needs 15 visual plates');
assert.equal(new Set(release.expectedImages).size, 15);
assert.equal(release.releaseGates.images, 'ready-15-of-15');
assert.equal(imageManifest.status, 'ready-15-of-15');
assert.equal(imageManifest.assets.length, 15);
for (const asset of imageManifest.assets) {
  const file = path.join(repoRoot, 'public/images/goethe/a1-2', asset.file);
  assert.ok(fs.existsSync(file), `${asset.file} is missing`);
  assert.ok(fs.statSync(file).size > 100_000, `${asset.file} is unexpectedly small`);
  assert.deepEqual(pngDimensions(file), { width: asset.width, height: asset.height }, `${asset.file} dimensions changed`);
}
assert.equal(release.releaseGates.audio, 'ready-19-of-19');
assert.equal(release.releaseGates.serverScoring, 'ready');
assert.equal(release.releaseGates.production, 'ready-for-main');
assert.match(pageSource, /\/\^a1-\[1-7\]\$\/\.test\(mockId\)/, 'Set 2 must use the approved Goethe A1 runner');
assert.match(runnerSource, /mock\.id/, 'the approved runner must resolve media and labels by mock id');
assert.doesNotMatch(runnerSource, /Transkript als Beleg/);
assert.doesNotMatch(runnerSource, /Antwortübersicht/, 'exam mode must not expose an answer sheet before submission');
assert.doesNotMatch(runnerSource, /window\.print/);
assert.match(runnerSource, /function ReadingAdPair/, 'Set 2 Anzeigen need an integrated A/B advert renderer');
assert.match(runnerSource, /renderReadingAdCards=\{\/\^a1-\[1-7\]\$\/\.test\(mock\.id\)\}/, 'all published Goethe A1 sets must use the compact advert renderer');
assert.match(runnerStyles, /\.readingAdGrid/, 'the compact advert layout is missing');
assert.match(runnerStyles, /\.readingAdThumb/, 'the photographic advert header is missing');
assert.match(adminSource, /\.in\('mock_id', \['a1-1', 'a1-2', 'a1-3', 'a1-4', 'a1-5', 'a1-6', 'a1-7'\]\)/, 'admin review queue must include all published Goethe A1 sets');
assert.match(reviewSource, /goetheA1Set2/, 'human review must resolve the Set 2 answer key');

console.log('✓ Goethe A1 Set 2: 11 partes · Hören 6+4+5 · Lesen 5+5+5 · Schreiben 5+10 · Sprechen 3+6+6');
console.log(`✓ Lesen secuencial: Texto A (2 preguntas) → Texto B (3) · 5 pares A/B · 5 avisos`);
console.log(`✓ Lesen visual: anuncios A/B con texto integrado · avisos Teil 3 variados ${noticeLengths.join('/')} palabras`);
console.log(`✓ Sesgo: A/B/C = 4/4/3 · binario = 10/9 · longitud correcta/distractor = ${lengthRatio.toFixed(3)} · racha máxima ${maxRun(objective.map(question => question.answer))}`);
console.log(`✓ Audio: ${audioCharacters} caracteres · 19 salidas · ${audioProductionManifest.credits.charged} créditos consumidos · ${audioProductionManifest.credits.after} restantes`);
console.log('✓ Imágenes: 15/15 assets originales · dimensiones y peso verificados');
