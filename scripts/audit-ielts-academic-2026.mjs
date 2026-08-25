#!/usr/bin/env node

import { existsSync } from 'node:fs';
import path from 'node:path';
import { toPublicIeltsMock } from '../src/data/mocks/ielts-public-payload.ts';

const SETS = Array.from({ length: 17 }, (_, index) => index + 4);
const READING_WORD_RANGE = [2150, 2750];
const PUBLIC_KEYS = new Set(['answer', 'answers']);

function words(value = '') {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function responseCount(question) {
  if ('qRange' in question && question.qRange) {
    return question.qRange[1] - question.qRange[0] + 1;
  }
  return 1;
}

function keyCount(question) {
  let total = 0;
  for (const key of PUBLIC_KEYS) {
    if (key in question) total += 1;
  }
  if ('blanks' in question) {
    total += question.blanks.filter((blank) => 'answers' in blank).length;
  }
  if ('rows' in question) {
    total += question.rows.flat().filter((cell) => typeof cell === 'object' && cell && 'answers' in cell).length;
  }
  if ('items' in question) {
    total += question.items.filter((item) => 'answer' in item).length;
  }
  return total;
}

function questionNumbers(question) {
  if ('qRange' in question && question.qRange) {
    return Array.from(
      { length: question.qRange[1] - question.qRange[0] + 1 },
      (_, index) => question.qRange[0] + index,
    );
  }
  const match = question.id.match(/q(\d+)$/i);
  return match ? [Number(match[1])] : [];
}

function answerLeak(question) {
  if ((question.type !== 'mcq' && question.type !== 'dialog') || !Array.isArray(question.options)) return null;
  const lengths = question.options.map(words);
  const correctLength = lengths[question.answer];
  const uniquelyLongest = correctLength === Math.max(...lengths)
    && lengths.filter((length) => length === correctLength).length === 1;
  return { answer: question.answer, uniquelyLongest };
}

const rows = [];
const blockers = [];
const warnings = [];
const listeningTypes = new Set();
const readingTypes = new Set();
const fingerprints = new Map();
const distributions = {
  listening: [0, 0, 0, 0],
  reading: [0, 0, 0, 0],
  listeningLongest: 0,
  readingLongest: 0,
  listeningMcq: 0,
  readingMcq: 0,
};

for (const setNumber of SETS) {
  const { default: mock } = await import(`../src/data/mocks/ielts-set-${setNumber}.ts`);
  const bySkill = Object.fromEntries(
    ['listening', 'reading', 'writing', 'speaking'].map((skill) => [
      skill,
      mock.sections.filter((section) => section.skill === skill),
    ]),
  );

  const listeningResponses = bySkill.listening.flatMap((section) => section.questions).reduce(
    (total, question) => total + responseCount(question),
    0,
  );
  const readingResponses = bySkill.reading.flatMap((section) => section.questions).reduce(
    (total, question) => total + responseCount(question),
    0,
  );
  const readingWords = bySkill.reading.reduce((total, section) => total + words(section.passage), 0);
  const writingTasks = bySkill.writing.flatMap((section) => section.questions).filter((question) => question.type === 'write');
  const speakingParts = new Set(
    bySkill.speaking.flatMap((section) => section.questions)
      .filter((question) => question.type === 'speak')
      .map((question) => question.partNumber),
  );
  const audioUrls = new Set(bySkill.listening.map((section) => section.audioUrl).filter(Boolean));
  const missingAudio = [...audioUrls].filter((url) => !existsSync(path.join(process.cwd(), 'public', url)));
  const sourceKeyCount = mock.sections.flatMap((section) => section.questions).reduce(
    (total, question) => total + keyCount(question),
    0,
  );
  const publicMock = toPublicIeltsMock(mock);
  const publicKeyCount = publicMock.sections.flatMap((section) => section.questions).reduce(
    (total, question) => total + keyCount(question),
    0,
  );

  for (const skill of ['listening', 'reading']) {
    const questions = bySkill[skill].flatMap((section) => section.questions);
    const numbers = questions.flatMap(questionNumbers);
    const expected = Array.from({ length: 40 }, (_, index) => index + 1);
    if (numbers.length !== 40 || numbers.some((number, index) => number !== expected[index])) {
      blockers.push(`Set ${setNumber} ${skill}: numeración no cubre 1–40 exactamente (${numbers.join(', ')}).`);
    }
    for (const question of questions) {
      (skill === 'listening' ? listeningTypes : readingTypes).add(question.type);
      const leak = answerLeak(question);
      if (leak) {
        distributions[skill][leak.answer] += 1;
        distributions[`${skill}Mcq`] += 1;
        if (leak.uniquelyLongest) distributions[`${skill}Longest`] += 1;
      }
    }
  }

  for (const section of mock.sections) {
    for (const value of [section.passage, section.transcript]) {
      if (!value) continue;
      const fingerprint = value.toLowerCase().replace(/\s+/g, ' ').trim();
      const previous = fingerprints.get(fingerprint);
      if (previous) blockers.push(`Texto duplicado exacto: Set ${previous} y Set ${setNumber}.`);
      fingerprints.set(fingerprint, setNumber);
    }
  }

  if (bySkill.listening.length !== 4) blockers.push(`Set ${setNumber}: Listening debe tener 4 partes.`);
  if (listeningResponses !== 40) blockers.push(`Set ${setNumber}: Listening tiene ${listeningResponses}, no 40 respuestas.`);
  if (bySkill.listening.some((section) => !section.transcript?.trim())) blockers.push(`Set ${setNumber}: falta transcript en Listening.`);
  if (audioUrls.size !== 1) blockers.push(`Set ${setNumber}: se esperaba un único audio integral; hay ${audioUrls.size}.`);
  for (const url of missingAudio) blockers.push(`Set ${setNumber}: falta ${url}.`);

  if (bySkill.reading.length !== 3) blockers.push(`Set ${setNumber}: Reading debe tener 3 pasajes.`);
  if (readingResponses !== 40) blockers.push(`Set ${setNumber}: Reading tiene ${readingResponses}, no 40 respuestas.`);
  if (readingWords < READING_WORD_RANGE[0] || readingWords > READING_WORD_RANGE[1]) {
    blockers.push(`Set ${setNumber}: Reading suma ${readingWords} palabras; objetivo oficial ${READING_WORD_RANGE.join('–')}.`);
  }

  if (writingTasks.length !== 2 || !writingTasks.some((question) => question.taskNumber === 1) || !writingTasks.some((question) => question.taskNumber === 2)) {
    blockers.push(`Set ${setNumber}: Writing no contiene exactamente Task 1 y Task 2.`);
  }
  if (!writingTasks.find((question) => question.taskNumber === 1)?.imageUrl) blockers.push(`Set ${setNumber}: Writing Task 1 carece de visual.`);
  if (![1, 2, 3].every((part) => speakingParts.has(part))) blockers.push(`Set ${setNumber}: Speaking no cubre Parts 1–3.`);

  if (publicKeyCount > 0) blockers.push(`Set ${setNumber}: ${publicKeyCount} claves cruzan al payload del cliente.`);

  rows.push({
    set: setNumber,
    listening: listeningResponses,
    reading: readingResponses,
    readingWords,
    audio: missingAudio.length ? 'MISSING' : 'OK',
    sourceKeys: sourceKeyCount,
    publicKeys: publicKeyCount,
  });
}

const readingA = distributions.reading[0];
const readingMcq = distributions.readingMcq;
if (readingMcq > 0 && readingA / readingMcq < 0.15) {
  blockers.push(`Distribución Reading sesgada: A sólo aparece ${readingA}/${readingMcq} veces.`);
}
for (const skill of ['listening', 'reading']) {
  const longest = distributions[`${skill}Longest`];
  const total = distributions[`${skill}Mcq`];
  if (total > 0 && longest / total > 0.35) {
    blockers.push(`${skill}: la respuesta correcta es la única más larga en ${longest}/${total} MCQ.`);
  }
}
if (!listeningTypes.has('matching')) blockers.push('Listening 4–20 no contiene ninguna tarea matching.');
if (![...listeningTypes].some((type) => type.includes('diagram'))) {
  blockers.push('Listening 4–20 no contiene una tarea explícita de plan/map/diagram labelling.');
}

console.table(rows);
console.log(`Listening types: ${[...listeningTypes].sort().join(', ')}`);
console.log(`Reading types: ${[...readingTypes].sort().join(', ')}`);
console.log(`MCQ Listening A/B/C/D: ${distributions.listening.join('/')}; correcta única más larga ${distributions.listeningLongest}/${distributions.listeningMcq}`);
console.log(`MCQ Reading A/B/C/D: ${distributions.reading.join('/')}; correcta única más larga ${distributions.readingLongest}/${distributions.readingMcq}`);

if (warnings.length) {
  console.warn(`\nAdvertencias (${warnings.length}):`);
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (blockers.length) {
  console.error(`\nIELTS Academic 2026 release audit: BLOCKED (${blockers.length})`);
  for (const blocker of blockers) console.error(`- ${blocker}`);
  process.exitCode = 1;
} else {
  console.log('\n✓ IELTS Academic 2026 release audit: Sets 4–20 conformes.');
}
