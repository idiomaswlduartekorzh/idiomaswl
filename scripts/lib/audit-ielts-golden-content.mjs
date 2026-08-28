import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { withIeltsAcademic2026Blueprint } from '../../src/data/mocks/ielts-academic-2026.ts';
import { IELTS_GOLDEN_STANDARD_2026 as golden } from '../../src/data/mocks/ielts-golden-standard.ts';
import { toPublicIeltsMock } from '../../src/data/mocks/ielts-public-payload.ts';

const words = (value = '') => value.trim().split(/\s+/).filter(Boolean).length;
const responseCount = (question) => question.qRange ? question.qRange[1] - question.qRange[0] + 1 : 1;
const canonical = (value) => String(value).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replaceAll('’', "'").replaceAll('£', '').replace(/[^a-z0-9@'-]+/g, ' ').trim();

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

function sourceSupports(source, answer) {
  const haystack = ` ${canonical(source)} `;
  const needle = canonical(answer);
  const equivalents = new Map([
    ['one', '1'], ['two', '2'], ['three', '3'], ['four', '4'], ['five', '5'], ['six', '6'], ['seven', '7'], ['eight', '8'], ['nine', '9'], ['ten', '10'],
    ['eleven', '11'], ['twelve', '12'], ['thirteen', '13'], ['fourteen', '14'], ['fifteen', '15'], ['thirty', '30'], ['thirty-five', '35'], ['forty', '40'], ['fifty', '50'],
    ['1', 'one'], ['2', 'two'], ['3', 'three'], ['4', 'four'], ['5', 'five'], ['6', 'six'], ['7', 'seven'], ['8', 'eight'], ['9', 'nine'], ['10', 'ten'],
    ['11', 'eleven'], ['12', 'twelve'], ['13', 'thirteen'], ['14', 'fourteen'], ['15', 'fifteen'], ['30', 'thirty'], ['35', 'thirty-five'], ['40', 'forty'], ['50', 'fifty'],
  ]);
  const alternate = needle.split(' ').map((token) => equivalents.get(token) ?? token).join(' ');
  const compactNumber = needle.replaceAll(' ', '');
  const compactSource = haystack.replace(/(?<=\d) (?=\d)/g, '');
  return haystack.includes(` ${needle} `)
    || haystack.includes(` ${alternate} `)
    || (/^\d+$/.test(compactNumber) && compactSource.includes(` ${compactNumber} `));
}

function keyCount(question) {
  let count = Number('answer' in question) + Number('answers' in question);
  if ('blanks' in question) count += question.blanks.filter((item) => 'answers' in item).length;
  if ('rows' in question) count += question.rows.flat().filter((item) => typeof item === 'object' && item && 'answers' in item).length;
  if ('items' in question) count += question.items.filter((item) => 'answer' in item).length;
  return count;
}

export function runGoldenContentAudit(config) {
  const mock = withIeltsAcademic2026Blueprint(config.mock);
  const failures = [];
  const evidence = [];
  const check = (condition, message) => (condition ? evidence : failures).push(message);
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
  check(listeningWords >= golden.welearnInternalGates.listening.transcriptWordsMinimum, `Listening has ${listeningWords} transcript words.`);
  listeningPartWords.forEach((count, index) => check(count >= 540 && count <= 620, `Listening Part ${index + 1} has ${count} words within 540–620.`));
  check(skills.reading.length === 3 && readingResponses === 40, 'Reading has 3 passages and 40 responses.');
  check(readingWords >= 2150 && readingWords <= 2750, `Reading has ${readingWords} words within 2,150–2,750.`);

  for (const section of [...skills.listening, ...skills.reading]) {
    const source = section.transcript || section.passage || '';
    for (const question of section.questions) {
      const constrainedChoice = question.type === 'formgroup' && /(?:TRUE.+FALSE|YES.+NO).+NOT GIVEN/i.test(question.groupLabel);
      if (!constrainedChoice) {
        for (const blank of completionBlanks(question)) {
          check(blank.answers.length > 0, `${question.id} Q${blank.num} has an accepted key.`);
          check(blank.answers.every((answer) => sourceSupports(source, answer)), `${question.id} Q${blank.num}: every accepted answer is supported by the source.`);
          if (blank.maxWords) {
            const units = (answer) => /^£?\d(?:[\d\s.:,–-]*\d)?$/.test(answer) ? 1 : words(answer);
            check(blank.answers.every((answer) => units(answer) <= blank.maxWords), `${question.id} Q${blank.num}: every accepted answer obeys the word limit.`);
          }
        }
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
    const source = ` ${canonical(section.transcript)} `;
    let cursor = 0;
    for (const question of section.questions) {
      for (const blank of completionBlanks(question)) {
        const positions = blank.answers.map((answer) => source.indexOf(` ${canonical(answer)} `, cursor)).filter((position) => position >= cursor);
        const position = positions.length ? Math.min(...positions) : -1;
        check(position >= cursor, `${question.id} Q${blank.num}: completion evidence appears in question order.`);
        if (position >= 0) cursor = position + 1;
      }
    }
  }

  const authoredText = canonical(JSON.stringify(mock));
  for (const phrase of config.inheritedPhrases ?? []) {
    check(!authoredText.includes(canonical(phrase)), `Known inherited phrase “${phrase}” is absent.`);
  }

  const writing = skills.writing.flatMap((section) => section.questions).filter((item) => item.type === 'write');
  const task1 = writing.find((item) => item.taskNumber === 1);
  const task2 = writing.find((item) => item.taskNumber === 2);
  check(writing.length === 2 && task1?.minWords === 150 && task2?.minWords === 250, 'Writing preserves Task 1/2 and 150/250 minimums.');
  const task1Path = task1?.imageUrl ? path.join(process.cwd(), 'public', task1.imageUrl) : '';
  check(Boolean(task1Path && existsSync(task1Path)), 'Task 1 visual exists.');
  const svg = task1Path && existsSync(task1Path) ? readFileSync(task1Path, 'utf8') : '';
  check(/<title(?:\s|>)/.test(svg) && /<desc(?:\s|>)/.test(svg), 'Task 1 SVG has an accessible title and description.');
  for (const token of config.task1Tokens ?? []) {
    check(canonical(`${task1?.stimulusLabel} ${task1?.stimulus} ${task1?.imageAlt} ${svg}`).includes(canonical(token)), `Task 1 prompt and visual share “${token}”.`);
  }
  check((task2?.stimulus?.length ?? 0) >= 120 && /agree or disagree|discuss both views|advantages.*disadvantages|positive or negative/i.test(`${task2?.stimulus} ${task2?.text}`), 'Task 2 is a substantive IELTS essay prompt.');

  const speaking = skills.speaking.flatMap((section) => section.questions).filter((item) => item.type === 'speak');
  const part1 = speaking.find((item) => item.partNumber === 1);
  const part2 = speaking.find((item) => item.partNumber === 2);
  const part3 = speaking.find((item) => item.partNumber === 3);
  check(new Set(speaking.map((item) => item.partNumber)).size === 3, 'Speaking covers Parts 1–3.');
  check((part1?.followUp?.length ?? 0) >= 8, 'Speaking Part 1 has enough prompts for 4–5 minutes.');
  check((part2?.cueCard?.match(/•/g)?.length ?? 0) >= 3 && /explain/i.test(part2?.cueCard ?? ''), 'Speaking Part 2 has a complete cue card.');
  check((part3?.followUp?.length ?? 0) >= 5, 'Speaking Part 3 has enough abstract prompts.');
  if (config.speakingPattern) check(config.speakingPattern.test(`${part2?.cueCard} ${part3?.followUp?.join(' ')}`), 'Speaking Parts 2 and 3 share the intended topic.');

  for (const item of config.extraChecks?.({ mock, skills }) ?? []) check(item.condition, item.message);
  const publicKeys = toPublicIeltsMock(mock).sections.flatMap((section) => section.questions).reduce((sum, item) => sum + keyCount(item), 0);
  check(publicKeys === 0, 'Public payload contains zero objective answer keys.');
  check(mock.ieltsAcademic2026Blueprint.listeningMediaStatus === config.expectedMediaStatus, `Set ${config.set} exposes the expected Listening media status.`);

  const report = {
    schemaVersion: 1,
    reportAsOf: config.reportAsOf,
    set: config.set,
    status: failures.length ? 'blocked' : 'content-golden-audio-replacement-pending',
    metrics: { listeningResponses, listeningWords, listeningPartWords, readingResponses, readingWords, writingTasks: writing.length, speakingParts: speaking.length, publicKeys },
    provenanceSearch: config.provenanceSearch,
    factualSources: config.factualSources,
    reusedAndImproved: config.reusedAndImproved,
    replacedOrCorrected: config.replacedOrCorrected,
    evidence,
    failures,
    deferred: config.deferred,
  };

  if (process.argv.includes('--write')) {
    const reportPath = path.join(process.cwd(), 'docs', config.reportFile);
    writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
    console.log(`Wrote ${path.relative(process.cwd(), reportPath)}`);
  }
  if (failures.length) {
    console.error(`IELTS Golden Set ${config.set}: BLOCKED (${failures.length})`);
    for (const failure of failures) console.error(`- ${failure}`);
    process.exitCode = 1;
  } else {
    console.log(`✓ IELTS Golden Set ${config.set}: ${evidence.length} content/contract checks passed; final audio remains deferred.`);
  }
  return report;
}
