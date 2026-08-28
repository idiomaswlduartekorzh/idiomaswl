#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import set1 from '../src/data/mocks/ielts-set-1.ts';
import { withIeltsAcademic2026Blueprint } from '../src/data/mocks/ielts-academic-2026.ts';
import { IELTS_GOLDEN_STANDARD_2026 as golden } from '../src/data/mocks/ielts-golden-standard.ts';
import { toPublicIeltsMock } from '../src/data/mocks/ielts-public-payload.ts';

const REPORT_PATH = path.join(process.cwd(), 'docs', 'ielts-golden-set1-audit-2026-08-28.json');
const mock = withIeltsAcademic2026Blueprint(set1);
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
  return String(value).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replaceAll('’', "'").replace(/[^a-z0-9'-]+/g, ' ').trim();
}

const numberWords = new Map([
  ['1', 'one'], ['2', 'two'], ['3', 'three'], ['4', 'four'], ['5', 'five'],
  ['8', 'eight'], ['12', 'twelve'], ['15', 'fifteen'], ['18', 'eighteen'], ['20', 'twenty'], ['48', 'forty eight'],
  ['90', 'ninety'], ['135', 'one hundred and thirty five'],
]);
function variants(answer) {
  const plain = canonical(answer);
  const spoken = plain.split(' ').map((token) => numberWords.get(token) ?? token).join(' ');
  const numeric = new Map([['fifteen', '15'], ['minus 20', '-20']]).get(plain);
  return [...new Set([plain, spoken, numeric].filter(Boolean))];
}

function sourceSupports(source, answer) {
  const haystack = ` ${canonical(source)} `;
  return variants(answer).some((needle) => haystack.includes(` ${needle} `));
}

function completionBlanks(question) {
  if (question.type === 'formgroup') return question.blanks;
  if (question.type === 'tablegroup') return question.rows.flat().filter((cell) => typeof cell === 'object' && cell && 'answers' in cell);
  return [];
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
  check(new Set(actual).size === 40, `${skill}: no duplicate response numbers.`);
}

const listeningResponses = skills.listening.flatMap((section) => section.questions).reduce((sum, item) => sum + responseCount(item), 0);
const readingResponses = skills.reading.flatMap((section) => section.questions).reduce((sum, item) => sum + responseCount(item), 0);
const listeningPartWords = skills.listening.map((section) => words(section.transcript));
const listeningWords = listeningPartWords.reduce((sum, count) => sum + count, 0);
const readingWords = skills.reading.reduce((sum, section) => sum + words(section.passage), 0);
check(skills.listening.length === 4 && listeningResponses === 40, 'Listening has 4 parts and 40 responses.');
check(listeningWords >= golden.welearnInternalGates.listening.preSynthesisTimingWordsMinimum, `Listening has ${listeningWords} words and passes the pre-synthesis timing proxy.`);
listeningPartWords.forEach((count, index) => check(count >= 680 && count <= 760, `Listening Part ${index + 1} has ${count} words within 680–760.`));
check(skills.reading.length === 3 && readingResponses === 40, 'Reading has 3 passages and 40 responses.');
check(readingWords >= 2150 && readingWords <= 2750, `Reading has ${readingWords} words within 2,150–2,750.`);

for (const section of [...skills.listening, ...skills.reading]) {
  const source = section.skill === 'listening' ? section.transcript : section.passage;
  for (const question of section.questions) {
    for (const blank of completionBlanks(question)) {
      check(blank.answers.length > 0, `${question.id} Q${blank.num} has an accepted key.`);
      check(blank.answers.every((answer) => sourceSupports(source, answer)), `${question.id} Q${blank.num}: every accepted answer is supported by the source.`);
      check(blank.answers.every((answer) => words(answer) <= blank.maxWords), `${question.id} Q${blank.num}: accepted answers obey the word limit.`);
    }
    if (question.type === 'matching') {
      const options = new Set(question.endings.map((item) => item.letter));
      for (const item of question.items) check(options.has(item.answer), `${question.id} Q${item.num} key exists in its options.`);
    }
    if (question.type === 'mcq') {
      check(question.answer >= 0 && question.answer < question.options.length, `${question.id} key is a valid option.`);
      check(new Set(question.options.map(canonical)).size === question.options.length, `${question.id} options are distinct.`);
    }
    if (question.type === 'multiselect') {
      const options = new Set(question.options.map((item) => item.letter));
      check(question.answers.length === question.selectCount, `${question.id} has the required number of keys.`);
      check(question.answers.every((answer) => options.has(answer)), `${question.id} keys exist in its options.`);
    }
  }
}

for (const section of skills.listening) {
  const source = canonical(section.transcript);
  let cursor = 0;
  for (const question of section.questions) {
    for (const blank of completionBlanks(question)) {
      const positions = variants(blank.answers[0]).map((answer) => source.indexOf(answer, cursor)).filter((position) => position >= 0);
      const position = positions.length ? Math.min(...positions) : -1;
      check(position >= cursor, `${question.id} Q${blank.num}: completion evidence appears in question order.`);
      if (position >= 0) cursor = position + 1;
    }
  }
}

const legacyPhrases = [
  'Island Car Tours', 'Westfield Leisure Club', 'Global Design Competition', 'Spirit Bear',
  'Bakelite', "What's so funny", 'Birth of Scientific English',
];
const authoredText = skills.listening.map((section) => section.transcript).concat(skills.reading.map((section) => section.passage)).join('\n');
for (const phrase of legacyPhrases) check(!canonical(authoredText).includes(canonical(phrase)), `Known inherited phrase “${phrase}” is absent.`);

const writing = skills.writing.flatMap((section) => section.questions).filter((item) => item.type === 'write');
const task1 = writing.find((item) => item.taskNumber === 1);
const task2 = writing.find((item) => item.taskNumber === 2);
check(writing.length === 2 && task1?.minWords === 150 && task2?.minWords === 250, 'Writing preserves Task 1/2 and 150/250 minimums.');
const task1Path = task1?.imageUrl ? path.join(process.cwd(), 'public', task1.imageUrl) : '';
check(Boolean(task1Path && existsSync(task1Path)), 'Task 1 visual exists.');
const svg = task1Path && existsSync(task1Path) ? readFileSync(task1Path, 'utf8') : '';
check(/<title(?:\s|>)/.test(svg) && /<desc(?:\s|>)/.test(svg), 'Task 1 SVG has an accessible title and description.');
for (const token of ['Westhaven', 'winter', 'summer', '2025', 'electricity']) {
  check(canonical(`${task1?.stimulusLabel} ${task1?.imageAlt} ${svg}`).includes(canonical(token)), `Task 1 prompt and visual share “${token}”.`);
}
check((task2?.stimulus?.length ?? 0) >= 100 && /agree or disagree/i.test(task2?.stimulus ?? ''), 'Task 2 is a substantive opinion essay prompt.');

const speaking = skills.speaking.flatMap((section) => section.questions).filter((item) => item.type === 'speak');
const part1 = speaking.find((item) => item.partNumber === 1);
const part2 = speaking.find((item) => item.partNumber === 2);
const part3 = speaking.find((item) => item.partNumber === 3);
check(new Set(speaking.map((item) => item.partNumber)).size === 3, 'Speaking covers Parts 1–3.');
check((part1?.followUp?.length ?? 0) >= 8, 'Speaking Part 1 has enough prompts for 4–5 minutes.');
check((part2?.cueCard?.match(/•/g)?.length ?? 0) >= 3 && /explain/i.test(part2?.cueCard ?? ''), 'Speaking Part 2 has a complete cue card.');
check((part3?.followUp?.length ?? 0) >= 5, 'Speaking Part 3 has enough abstract prompts.');
check(/repair/i.test(part2?.cueCard ?? '') && part3?.followUp?.every((prompt) => /repair|product|manufacturer|government|business/i.test(prompt)), 'Speaking Parts 2 and 3 form a coherent repair-and-reuse topic.');

const publicKeys = toPublicIeltsMock(mock).sections.flatMap((section) => section.questions).reduce((sum, item) => sum + keyCount(item), 0);
check(publicKeys === 0, 'Public payload contains zero objective answer keys.');
check(mock.ieltsAcademic2026Blueprint.listeningMediaStatus === 'script-ready-audio-blocked', 'Set 1 exposes the approved script while its inherited audio remains blocked.');

const report = {
  schemaVersion: 1,
  reportAsOf: '2026-08-28',
  set: 1,
  status: failures.length ? 'blocked' : 'content-golden-audio-deferred',
  metrics: { listeningResponses, listeningWords, listeningPartWords, readingResponses, readingWords, writingTasks: writing.length, speakingParts: speaking.length, publicKeys },
  provenanceSearch: {
    method: 'Exact web searches of three distinctive Reading opening phrases returned no exact matching public text. One search returned unrelated pages sharing only generic concrete terminology; this is supporting evidence, not mathematical proof of authorship.',
    phrasesChecked: [
      'A seed bank is sometimes described as a library, but the comparison is incomplete',
      'Concrete is often confused with cement, although the two are not interchangeable',
      'A research team can place only so many sensors, inspect only so many photographs',
    ],
  },
  factualSources: [
    'https://brahmsonline.kew.org/msbp/Training/Standards',
    'https://www.kew.org/science/collections-and-resources/research-facilities/millennium-seed-bank',
    'https://www.croptrust.org/what-we-do/programs/svalbard-global-seed-vault/',
    'https://www.iea.org/reports/breakthrough-agenda-report-2025/cement-and-concrete',
    'https://www.iea.org/reports/cement-3',
    'https://science.nasa.gov/mission/hubble/science/citizen-science/',
    'https://sciencecouncil.noaa.gov/wp-content/uploads/2023/04/NOAA-Citizen-Science-Action-Plan_final.pdf',
  ],
  replacedInheritedMaterial: [
    'All four Listening scripts, questions and keys.',
    'All three Reading passages, questions and keys.',
    'Writing Task 1 prompt and visual; Writing Task 2 prompt.',
    'Speaking Parts 1–3.',
  ],
  evidence,
  failures,
  deferred: ['Listening audio generation, mastering and waveform/ASR QA'],
};

if (process.argv.includes('--write')) {
  writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`Wrote ${path.relative(process.cwd(), REPORT_PATH)}`);
}
if (failures.length) {
  console.error(`IELTS Golden Set 1: BLOCKED (${failures.length})`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`✓ IELTS Golden Set 1: ${evidence.length} content/contract checks passed; audio remains deferred.`);
}
