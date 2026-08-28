#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import set3 from '../src/data/mocks/ielts-set-3.ts';
import { withIeltsAcademic2026Blueprint } from '../src/data/mocks/ielts-academic-2026.ts';
import { IELTS_GOLDEN_STANDARD_2026 as golden } from '../src/data/mocks/ielts-golden-standard.ts';
import { toPublicIeltsMock } from '../src/data/mocks/ielts-public-payload.ts';

const REPORT_PATH = path.join(process.cwd(), 'docs', 'ielts-golden-set3-audit-2026-08-28.json');
const mock = withIeltsAcademic2026Blueprint(set3);
const failures = [];
const evidence = [];
const check = (condition, message) => (condition ? evidence : failures).push(message);
const words = (value = '') => value.trim().split(/\s+/).filter(Boolean).length;
const responseCount = (question) => question.qRange ? question.qRange[1] - question.qRange[0] + 1 : 1;

function canonical(value) {
  return String(value).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replaceAll('’', "'").replace(/[^a-z0-9'-]+/g, ' ').trim();
}

function sourceSupports(source, answer) {
  const haystack = ` ${canonical(source)} `;
  const needle = canonical(answer);
  const numberEquivalents = new Map([
    ['two', '2'], ['three', '3'], ['six', '6'], ['eight', '8'], ['eleven', '11'],
    ['twelve', '12'], ['fourteen', '14'], ['thirty-two', '32'], ['fifty-five', '55'],
  ]);
  const alternate = needle.split(' ').map((token) => numberEquivalents.get(token) ?? token).join(' ');
  return haystack.includes(` ${needle} `) || haystack.includes(` ${alternate} `);
}

function numbers(question) {
  if (question.qRange) return Array.from({ length: responseCount(question) }, (_, index) => question.qRange[0] + index);
  const match = question.id.match(/q(\d+)$/i);
  return match ? [Number(match[1])] : [];
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
const listeningWords = skills.listening.reduce((sum, section) => sum + words(section.transcript), 0);
const readingWords = skills.reading.reduce((sum, section) => sum + words(section.passage), 0);
check(skills.listening.length === 4 && listeningResponses === 40, 'Listening has 4 parts and 40 responses.');
check(listeningWords >= golden.welearnInternalGates.listening.transcriptWordsMinimum, `Listening has ${listeningWords} transcript words.`);
check(skills.reading.length === 3 && readingResponses === 40, 'Reading has 3 passages and 40 responses.');
check(readingWords >= 2150 && readingWords <= 2750, `Reading has ${readingWords} words within 2,150–2,750.`);

for (const section of [...skills.listening, ...skills.reading]) {
  const source = section.skill === 'listening' ? section.transcript : section.passage;
  for (const question of section.questions) {
    for (const blank of completionBlanks(question)) {
      check(blank.answers.length > 0, `${question.id} Q${blank.num} has an accepted key.`);
      check(blank.answers.every((answer) => sourceSupports(source, answer)), `${question.id} Q${blank.num}: every accepted answer is supported by the source.`);
      const answerUnits = (answer) => /^\d(?:[\d\s.:,–-]*\d)?$/.test(answer) ? 1 : words(answer);
      check(blank.answers.every((answer) => answerUnits(answer) <= blank.maxWords), `${question.id} Q${blank.num}: every accepted answer obeys the word limit.`);
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
      check(question.answers.length === question.selectCount, `${question.id} has the requested number of keys.`);
      check(question.answers.every((answer) => options.has(answer)), `${question.id} keys exist in its options.`);
    }
  }
}

for (const section of skills.listening) {
  const source = canonical(section.transcript);
  let cursor = 0;
  for (const question of section.questions) {
    for (const blank of completionBlanks(question)) {
      const position = source.indexOf(canonical(blank.answers[0]), cursor);
      check(position >= cursor, `${question.id} Q${blank.num}: completion evidence appears in question order.`);
      if (position >= 0) cursor = position + 1;
    }
  }
}

const authoredText = canonical(JSON.stringify(mock));
for (const phrase of [
  'The Silk Road was not a single road but a vast network of overland and maritime trade routes',
  'Plastic pollution has become one of the most pressing environmental issues of the twenty-first century',
  'Artificial intelligence is transforming medicine at a pace that would have seemed extraordinary even a decade ago',
  'consumption of three kinds of spreads between 1981 and 2007',
]) check(!authoredText.includes(canonical(phrase)), `Known inherited phrase “${phrase}” is absent.`);

const readingQuestions = skills.reading.flatMap((section) => section.questions);
const q19 = readingQuestions.find((item) => item.id === 'r2-notes')?.blanks.find((item) => item.num === 19);
const q36 = readingQuestions.find((item) => item.id === 'r3q36');
check(q19?.answers.length === 1 && q19.answers[0] === '11', 'Reading Q19 uses the current UNEP estimate for annual leakage into aquatic ecosystems.');
check(q36?.options[q36.answer] === 'NO', 'Reading Q36 rejects the false claim that medical AI is bias-free.');
check(/consonantal alphabet[^.]*Phoenicians/i.test(skills.listening[3]?.transcript ?? ''), 'Listening Part 4 describes the Phoenician system as consonantal, not the first complete alphabet.');
check(!/Phoenicians developed the first true alphabet/i.test(skills.listening[3]?.transcript ?? ''), 'Listening Part 4 avoids the inherited historical overclaim.');

const writing = skills.writing.flatMap((section) => section.questions).filter((item) => item.type === 'write');
const task1 = writing.find((item) => item.taskNumber === 1);
const task2 = writing.find((item) => item.taskNumber === 2);
check(writing.length === 2 && task1?.minWords === 150 && task2?.minWords === 250, 'Writing preserves Task 1/2 and 150/250 minimums.');
const task1Path = task1?.imageUrl ? path.join(process.cwd(), 'public', task1.imageUrl) : '';
check(Boolean(task1Path && existsSync(task1Path)), 'Task 1 visual exists.');
const svg = task1Path && existsSync(task1Path) ? readFileSync(task1Path, 'utf8') : '';
check(/<title(?:\s|>)/.test(svg) && /<desc(?:\s|>)/.test(svg), 'Task 1 SVG has an accessible title and description.');
for (const token of ['Larton', 'metro', 'tram', 'ferry', '2010', '2015', '2020', '2025']) {
  check(canonical(`${task1?.stimulusLabel} ${task1?.imageAlt} ${svg}`).includes(canonical(token)), `Task 1 prompt and visual share “${token}”.`);
}
check((task2?.stimulus?.length ?? 0) >= 120 && /agree or disagree/i.test(task2?.stimulus ?? ''), 'Task 2 is a substantive opinion essay prompt.');

const speaking = skills.speaking.flatMap((section) => section.questions).filter((item) => item.type === 'speak');
const part1 = speaking.find((item) => item.partNumber === 1);
const part2 = speaking.find((item) => item.partNumber === 2);
const part3 = speaking.find((item) => item.partNumber === 3);
check(new Set(speaking.map((item) => item.partNumber)).size === 3, 'Speaking covers Parts 1–3.');
check((part1?.followUp?.length ?? 0) >= 8, 'Speaking Part 1 has enough prompts for 4–5 minutes.');
check((part2?.cueCard?.match(/•/g)?.length ?? 0) >= 3 && /explain/i.test(part2?.cueCard ?? ''), 'Speaking Part 2 has a complete cue card.');
check((part3?.followUp?.length ?? 0) >= 5, 'Speaking Part 3 has enough abstract prompts.');
check(/service|facility/i.test(part2?.cueCard ?? '') && part3?.followUp?.every((prompt) => /service|government|neighbourhood|tax|facilit|compan|technology/i.test(prompt)), 'Speaking Parts 2 and 3 share a coherent public-services topic.');

const publicKeys = toPublicIeltsMock(mock).sections.flatMap((section) => section.questions).reduce((sum, item) => sum + keyCount(item), 0);
check(publicKeys === 0, 'Public payload contains zero objective answer keys.');
check(mock.ieltsAcademic2026Blueprint.listeningMediaStatus === 'script-ready-audio-blocked', 'Set 3 exposes its script while final audio remains blocked.');

const report = {
  schemaVersion: 1,
  reportAsOf: '2026-08-28',
  set: 3,
  status: failures.length ? 'blocked' : 'content-golden-audio-deferred',
  metrics: { listeningResponses, listeningWords, readingResponses, readingWords, writingTasks: writing.length, speakingParts: speaking.length, publicKeys },
  provenanceSearch: {
    method: 'Exact searches of the three revised Reading openings returned no exact public match. Results contained only unrelated or generic topic material. This supports but cannot mathematically prove original authorship.',
    phrasesChecked: [
      'No merchant in antiquity set out along a route marked Silk Road',
      'Plastic leakage is not measured by one permanent number',
      'Artificial intelligence can assist tasks ranging from analysing images to predicting deterioration',
    ],
  },
  factualSources: [
    'https://en.unesco.org/silkroad/sites/default/files/knowledge-bank-article/6%20Promotion%20of%20Islamic%20Values%20in%20and%20via%20Central%20Asia%20-%20Copy.pdf',
    'https://en.unesco.org/silkroad/sites/default/files/knowledge-bank-article/the%20culture%20of%20trade.pdf',
    'https://wedocs.unep.org/bitstream/handle/20.500.11822/47535/WED-2025_Key-messages.pdf?sequence=3',
    'https://www.who.int/publications/i/item/9789240037403',
    'https://www.who.int/news/item/16-05-2023-who-calls-for-safe-and-ethical-ai-for-health',
    'https://www.who.int/news/item/02-06-2026-new-who-discussion-paper-sets-out-opportunities-and-risks-of-ai-in-evidence-informed-health-policy',
    'https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-enabled-medical-devices',
  ],
  reusedAndImproved: [
    'Listening and Reading topic shells, valid objective numbering and existing question-component architecture.',
    'Core exam navigation, timing and response formats.',
  ],
  replacedOrCorrected: [
    'Expanded all four Listening scripts and moved completion evidence into candidate question order.',
    'Expanded and fact-checked all Reading passages; corrected the plastic leakage estimate and medical-AI bias claim.',
    'Corrected the Phoenician-alphabet historical overclaim.',
    'Replaced the known published spreads chart and both Writing prompts with original WeLearn material.',
    'Replaced and expanded Speaking Parts 1–3 around a coherent public-services theme.',
  ],
  evidence,
  failures,
  deferred: ['Listening audio generation, mastering and waveform QA', 'Rendered browser and assistive-technology audit in later full-stack phases'],
};

if (process.argv.includes('--write')) {
  writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`Wrote ${path.relative(process.cwd(), REPORT_PATH)}`);
}
if (failures.length) {
  console.error(`IELTS Golden Set 3: BLOCKED (${failures.length})`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`✓ IELTS Golden Set 3: ${evidence.length} content/contract checks passed; audio remains deferred.`);
}
