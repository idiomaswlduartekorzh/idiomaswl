#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import set5 from '../src/data/mocks/ielts-set-5.ts';
import { withIeltsAcademic2026Blueprint } from '../src/data/mocks/ielts-academic-2026.ts';
import { IELTS_GOLDEN_STANDARD_2026 as golden } from '../src/data/mocks/ielts-golden-standard.ts';
import { toPublicIeltsMock } from '../src/data/mocks/ielts-public-payload.ts';

const REPORT_PATH = path.join(process.cwd(), 'docs', 'ielts-golden-set5-audit-2026-08-28.json');
const mock = withIeltsAcademic2026Blueprint(set5);
const failures = [];
const evidence = [];
const check = (condition, message) => (condition ? evidence : failures).push(message);
const words = (value = '') => value.trim().split(/\s+/).filter(Boolean).length;
const responseCount = (question) => question.qRange ? question.qRange[1] - question.qRange[0] + 1 : 1;

function numbers(question) {
  if (question.qRange) return Array.from({ length: responseCount(question) }, (_, index) => question.qRange[0] + index);
  const match = question.id.match(/q(\d+)$/i);
  return match ? [Number(match[1])] : [];
}

function canonical(value) {
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replaceAll('flavour', 'flavor').replaceAll('’', "'").replace(/[^a-z0-9'-]+/g, ' ').trim();
}

const numberWords = new Map([['2', 'two'], ['4', 'four'], ['6', 'six'], ['18', 'eighteen']]);
function sourceSupports(source, answer) {
  const haystack = ` ${canonical(source)} `;
  const needle = canonical(answer);
  const withNumberWords = needle.split(' ').map((token) => numberWords.get(token) ?? token).join(' ');
  return haystack.includes(` ${needle} `) || haystack.includes(` ${withNumberWords} `);
}

function keyCount(question) {
  let count = Number('answer' in question) + Number('answers' in question);
  if ('blanks' in question) count += question.blanks.filter((item) => 'answers' in item).length;
  if ('rows' in question) count += question.rows.flat().filter((item) => typeof item === 'object' && item && 'answers' in item).length;
  if ('items' in question) count += question.items.filter((item) => 'answer' in item).length;
  return count;
}

const skills = Object.fromEntries(['listening', 'reading', 'writing', 'speaking'].map((skill) => [
  skill, mock.sections.filter((section) => section.skill === skill),
]));

for (const skill of ['listening', 'reading']) {
  const actual = skills[skill].flatMap((section) => section.questions).flatMap(numbers);
  check(actual.length === 40 && actual.every((number, index) => number === index + 1), `${skill}: numbering covers 1–40 exactly.`);
}

const listeningResponses = skills.listening.flatMap((section) => section.questions).reduce((sum, item) => sum + responseCount(item), 0);
const readingResponses = skills.reading.flatMap((section) => section.questions).reduce((sum, item) => sum + responseCount(item), 0);
const listeningWords = skills.listening.reduce((sum, section) => sum + words(section.transcript), 0);
const readingWords = skills.reading.reduce((sum, section) => sum + words(section.passage), 0);
check(skills.listening.length === 4 && listeningResponses === 40, 'Listening has 4 parts and 40 responses.');
check(listeningWords >= golden.welearnInternalGates.listening.transcriptWordsMinimum, `Listening has ${listeningWords} transcript words.`);
check(skills.reading.length === 3 && readingResponses === 40, 'Reading has 3 passages and 40 responses.');
check(readingWords >= 2150 && readingWords <= 2750, `Reading has ${readingWords} words within 2,150–2,750.`);

for (const section of [...skills.listening, ...skills.reading]) {
  const source = section.skill === 'listening' ? section.transcript : section.passage;
  for (const question of section.questions) {
    const constrained = question.type === 'formgroup' && /(?:TRUE.+FALSE|YES.+NO).+NOT GIVEN/i.test(question.groupLabel);
    if (constrained) {
      const allowed = /TRUE/.test(question.groupLabel) ? new Set(['TRUE', 'FALSE', 'NOT GIVEN']) : new Set(['YES', 'NO', 'NOT GIVEN']);
      for (const blank of question.blanks) check(blank.answers.length === 1 && allowed.has(blank.answers[0]), `${question.id} Q${blank.num} has one canonical constrained key.`);
      continue;
    }
    const blanks = question.type === 'formgroup' ? question.blanks
      : question.type === 'tablegroup' ? question.rows.flat().filter((cell) => typeof cell === 'object') : [];
    for (const blank of blanks) for (const answer of blank.answers) {
      check(sourceSupports(source, answer), `${question.id} Q${blank.num}: “${answer}” is supported by the source.`);
    }
    if (question.type === 'matching') {
      const options = new Set(question.endings.map((item) => item.letter));
      for (const item of question.items) check(options.has(item.answer), `${question.id} Q${item.num} key exists in its options.`);
    }
    if (question.type === 'mcq') {
      check(question.answer >= 0 && question.answer < question.options.length, `${question.id} key is a valid option.`);
      check(new Set(question.options.map(canonical)).size === question.options.length, `${question.id} options are distinct.`);
    }
  }
}

const readingQuestions = skills.reading.flatMap((section) => section.questions);
const q1 = readingQuestions.find((item) => item.id === 'r1-tfng').blanks.find((item) => item.num === 1);
const q14 = readingQuestions.find((item) => item.id === 'r2-match').items.find((item) => item.num === 14);
check(q1.answers[0] === 'FALSE', 'Reading Q1 correctly uses FALSE, not NOT GIVEN.');
check(!q14.stem.includes('government'), 'Reading Q14 does not misclassify DarkSky as a government body.');
check(skills.reading.some((section) => section.passage.includes('single night in 2023')), 'Chicago collision year is 2023.');
check(skills.reading.some((section) => section.passage.includes('DarkSky International')), 'Current DarkSky International name is used.');
check(!skills.reading.some((section) => section.passage.includes('second most traded commodity')), 'Unsupported coffee ranking is absent.');

const writing = skills.writing.flatMap((section) => section.questions).filter((item) => item.type === 'write');
const task1 = writing.find((item) => item.taskNumber === 1);
const task2 = writing.find((item) => item.taskNumber === 2);
check(writing.length === 2 && task1?.minWords === 150 && task2?.minWords === 250, 'Writing preserves Task 1/2 and 150/250 minimums.');
check(Boolean(task1?.imageUrl && existsSync(path.join(process.cwd(), 'public', task1.imageUrl))), 'Task 1 visual exists.');
const svg = readFileSync(path.join(process.cwd(), 'public', task1.imageUrl), 'utf8');
check(svg.includes('<title>') && svg.includes('<desc>'), 'Task 1 SVG has accessible title and description.');
for (const token of ['Germany', 'United Kingdom', '2000', '2020', 'sector']) {
  check(canonical(`${task1.stimulus} ${task1.imageAlt} ${svg}`).includes(canonical(token)), `Task 1 prompt and visual share “${token}”.`);
}

const speaking = skills.speaking.flatMap((section) => section.questions).filter((item) => item.type === 'speak');
const part1 = speaking.find((item) => item.partNumber === 1);
const part2 = speaking.find((item) => item.partNumber === 2);
const part3 = speaking.find((item) => item.partNumber === 3);
check(new Set(speaking.map((item) => item.partNumber)).size === 3, 'Speaking covers Parts 1–3.');
check((part1?.followUp?.length ?? 0) >= 8, 'Speaking Part 1 has enough prompts for 4–5 minutes.');
check((part2?.cueCard?.match(/•/g)?.length ?? 0) >= 3 && part2.cueCard.includes('explain'), 'Speaking Part 2 has a complete cue card.');
check((part3?.followUp?.length ?? 0) >= 4, 'Speaking Part 3 has enough abstract prompts.');
check(/liv(?:e|ing)|home/i.test(part2.cueCard) && /living|society/i.test(part3.text), 'Speaking Parts 2 and 3 share a coherent topic.');

const publicKeys = toPublicIeltsMock(mock).sections.flatMap((section) => section.questions).reduce((sum, item) => sum + keyCount(item), 0);
check(publicKeys === 0, 'Public payload contains zero objective answer keys.');
check(mock.ieltsAcademic2026Blueprint.listeningMediaStatus === 'legacy-audio-under-review', 'Set 5 audio remains under review after timing rejection.');

const report = {
  schemaVersion: 1,
  reportAsOf: '2026-08-28',
  set: 5,
  status: failures.length ? 'blocked' : 'content-golden-audio-deferred',
  metrics: { listeningResponses, listeningWords, readingResponses, readingWords, writingTasks: writing.length, speakingParts: speaking.length, publicKeys },
  provenanceSearch: {
    method: 'Exact web searches of three distinctive opening phrases returned no matching public text; this supports but cannot mathematically prove original authorship.',
    phrasesChecked: [
      'Few beverages have shaped human society as profoundly as coffee',
      'Western consumer culture has long celebrated freedom of choice as an unqualified good',
      'Light pollution—the excessive or misdirected artificial light',
    ],
  },
  factualSources: [
    'https://www.fao.org/markets-and-trade/commodities-overview/beverages/coffee/',
    'https://www.fws.gov/story/one-bird-too-many',
    'https://darksky.org/what-we-do/international-dark-sky-places/',
  ],
  fixedFindings: [
    'Reading Q1: NOT GIVEN → FALSE.',
    'Reading Q14: government body → organisation.',
    'Unsupported accepted completion variants removed.',
    'Coffee ranking, Chicago year and DarkSky identity/count corrected.',
    'Speaking Part 1 expanded for the 4–5 minute target.',
    'Task 1 SVG given accessible title and description.',
  ],
  evidence,
  failures,
  deferred: ['Expand the Listening script to the timing-density floor, reassemble without padding, repeat technical/ASR QA, then request human acceptance.'],
};

if (process.argv.includes('--write')) {
  writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`Wrote ${path.relative(process.cwd(), REPORT_PATH)}`);
}
if (failures.length) {
  console.error(`IELTS Golden Set 5: BLOCKED (${failures.length})`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`✓ IELTS Golden Set 5: ${evidence.length} content/contract checks passed; audio remains deferred.`);
}
