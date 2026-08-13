#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '../../..');
const require = createRequire(import.meta.url);
const ts = require('typescript');

const own = (value, key) => Object.prototype.hasOwnProperty.call(value, key);
const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const round1 = value => Math.round(value * 10) / 10;
const round6 = value => Math.round(value * 1_000_000) / 1_000_000;
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

function loadTsModule(relativePath) {
  const absolutePath = resolve(ROOT, relativePath);
  const javascript = ts.transpileModule(readFileSync(absolutePath, 'utf8'), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
    fileName: absolutePath,
    reportDiagnostics: true,
  });

  const diagnostics = javascript.diagnostics ?? [];
  if (diagnostics.some(diagnostic => diagnostic.category === ts.DiagnosticCategory.Error)) {
    throw new Error(
      `No se pudo transpilar ${relativePath}: ${diagnostics
        .map(diagnostic => ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'))
        .join('; ')}`,
    );
  }

  const module = { exports: {} };
  vm.runInNewContext(
    javascript.outputText,
    {
      module,
      exports: module.exports,
      require(specifier) {
        throw new Error(`Import no permitido al evaluar ${relativePath}: ${specifier}`);
      },
    },
    { filename: absolutePath, timeout: 10_000 },
  );
  return module.exports;
}

function wordCount(text) {
  return String(text).trim().split(/\s+/u).filter(Boolean).length;
}

function letter(index) {
  return String.fromCharCode(65 + index);
}

function orderedCounts(entries) {
  return Object.fromEntries(
    [...entries].sort(([a], [b]) => String(a).localeCompare(String(b))),
  );
}

function optionMetrics(items) {
  const positions = new Map();
  let uniqueLongestEligible = 0;
  let uniqueLongestCorrect = 0;

  for (const item of items) {
    assert(Array.isArray(item.options), `Ítem sin options: ${item.id ?? '(sin id)'}`);
    assert(
      Number.isInteger(item.answer) && item.answer >= 0 && item.answer < item.options.length,
      `answer inválido: ${item.id ?? '(sin id)'}`,
    );

    const key = letter(item.answer);
    positions.set(key, (positions.get(key) ?? 0) + 1);

    const lengths = item.options.map(wordCount);
    const maximum = Math.max(...lengths);
    const longestIndexes = lengths.flatMap((length, index) =>
      length === maximum ? [index] : [],
    );

    if (longestIndexes.length === 1) {
      uniqueLongestEligible += 1;
      if (longestIndexes[0] === item.answer) uniqueLongestCorrect += 1;
    }
  }

  return {
    decisions: items.length,
    correctAnswerPositions: orderedCounts(positions),
    uniqueLongest: {
      correct: uniqueLongestCorrect,
      eligible: uniqueLongestEligible,
      accuracyPct: uniqueLongestEligible
        ? round1(100 * uniqueLongestCorrect / uniqueLongestEligible)
        : null,
    },
  };
}

const WILSON_Z = 1.645;
const MIN_STATISTICAL_SAMPLE = 100;
const ADVANTAGE_MARGIN = 0.10;

function normalizedText(text) {
  return String(text)
    .normalize('NFKD')
    .replace(/\p{Mark}+/gu, '')
    .toLocaleLowerCase('en')
    .match(/[\p{Letter}\p{Number}]+/gu)
    ?.join(' ') ?? '';
}

function lexicalTokenSet(text) {
  const normalized = normalizedText(text);
  return new Set(normalized ? normalized.split(' ') : []);
}

function mean(values) {
  return values.length
    ? round6(values.reduce((sum, value) => sum + value, 0) / values.length)
    : null;
}

function wilsonUpper95(hits, eligible) {
  if (!eligible) return null;
  const probability = hits / eligible;
  const zSquared = WILSON_Z ** 2;
  const numerator = probability + zSquared / (2 * eligible) + WILSON_Z * Math.sqrt(
    probability * (1 - probability) / eligible + zSquared / (4 * eligible ** 2),
  );
  return round6(numerator / (1 + zSquared / eligible));
}

function heuristicResult({ id, predictionRule, k, records, select }) {
  let eligible = 0;
  let ties = 0;
  let abstentions = 0;
  let hits = 0;

  records.forEach((record, index) => {
    const candidates = select(record, index);
    if (!Array.isArray(candidates) || candidates.length === 0) {
      abstentions += 1;
      return;
    }
    if (candidates.length !== 1) {
      ties += 1;
      return;
    }
    eligible += 1;
    if (candidates[0] === record.item.answer) hits += 1;
  });

  const p0 = round6(1 / k);
  const threshold = round6(p0 + ADVANTAGE_MARGIN);
  const upper95 = wilsonUpper95(hits, eligible);
  const provisional = eligible < MIN_STATISTICAL_SAMPLE;
  const verdict = eligible === 0
    ? 'not-applicable'
    : provisional
      ? 'provisional'
      : upper95 <= threshold
        ? 'pass'
        : 'fail';

  return {
    id,
    predictionRule,
    k,
    n: records.length,
    eligible,
    ties,
    abstentions,
    hits,
    p0,
    coverage: records.length ? round6(eligible / records.length) : null,
    conditionalAccuracy: eligible ? round6(hits / eligible) : null,
    totalAccuracy: records.length ? round6(hits / records.length) : null,
    wilsonUpper95: upper95,
    threshold,
    provisional,
    verdict,
  };
}

function maximumPositionStreak(records) {
  let best = null;
  let current = null;

  for (const record of records) {
    const position = letter(record.item.answer);
    if (
      current &&
      current.position === position &&
      current.poolId === record.poolId &&
      current.lastOrdinal + 1 === record.ordinal
    ) {
      current.length += 1;
      current.lastOrdinal = record.ordinal;
    } else {
      current = {
        poolId: record.poolId,
        position,
        startOrdinal: record.ordinal,
        lastOrdinal: record.ordinal,
        length: 1,
      };
    }
    if (!best || current.length > best.length) best = { ...current };
  }

  return best && {
    poolId: best.poolId,
    position: best.position,
    startOrdinal: best.startOrdinal,
    endOrdinal: best.lastOrdinal,
    length: best.length,
  };
}

function permutationInvariant(records, k) {
  const failures = [];
  let testedPermutations = 0;

  for (const record of records) {
    const originalOptions = record.item.options;
    const permutations = [
      [...Array(k).keys()].slice(1).concat(0),
      [...Array(k).keys()].reverse(),
    ].filter((permutation, index, all) =>
      all.findIndex(candidate => candidate.join(',') === permutation.join(',')) === index,
    );

    for (const permutation of permutations) {
      testedPermutations += 1;
      const remappedAnswer = permutation.indexOf(record.item.answer);
      const permutedOptions = permutation.map(index => originalOptions[index]);
      const before = normalizedText(originalOptions[record.item.answer]);
      const after = normalizedText(permutedOptions[remappedAnswer]);
      if (remappedAnswer < 0 || before !== after) {
        failures.push({
          poolId: record.poolId,
          itemId: record.item.id ?? null,
          permutation,
          remappedAnswer,
        });
      }
    }
  }

  const failedItems = new Set(failures.map(failure => `${failure.poolId}:${failure.itemId}`)).size;
  return {
    k,
    n: records.length,
    testedPermutations,
    passedItems: records.length - failedItems,
    failedItems,
    failures,
    verdict: failures.length ? 'fail' : 'pass',
  };
}

function auditOptionGroup({ scope, bank = null, poolId = null, k, records }) {
  assert(records.every(record => record.item.options.length === k), `k inconsistente: ${scope}`);

  const distractorFrequency = new Map();
  const allOptionFrequency = new Map();
  for (const record of records) {
    record.item.options.forEach((option, index) => {
      const normalized = normalizedText(option);
      allOptionFrequency.set(normalized, (allOptionFrequency.get(normalized) ?? 0) + 1);
      if (index !== record.item.answer) {
        distractorFrequency.set(normalized, (distractorFrequency.get(normalized) ?? 0) + 1);
      }
    });
  }

  const selectUniqueExtreme = (scores, extreme) => {
    const target = extreme === 'max' ? Math.max(...scores) : Math.min(...scores);
    return scores.flatMap((score, index) => score === target ? [index] : []);
  };

  const heuristics = [];
  for (let index = 0; index < k; index += 1) {
    heuristics.push(heuristicResult({
      id: `always-position-${letter(index)}`,
      predictionRule: `always choose zero-based position ${index}`,
      k,
      records,
      select: () => [index],
    }));
  }

  heuristics.push(
    heuristicResult({
      id: 'longest-option',
      predictionRule: 'choose unique maximum whitespace-token length; ties abstain',
      k,
      records,
      select: record => selectUniqueExtreme(record.item.options.map(wordCount), 'max'),
    }),
    heuristicResult({
      id: 'shortest-option',
      predictionRule: 'choose unique minimum whitespace-token length; ties abstain',
      k,
      records,
      select: record => selectUniqueExtreme(record.item.options.map(wordCount), 'min'),
    }),
    heuristicResult({
      id: 'highest-lexical-overlap',
      predictionRule: 'choose unique option with most distinct normalized tokens present in source context',
      k,
      records,
      select: record => {
        const contextTokens = lexicalTokenSet(record.context);
        if (!contextTokens.size) return [];
        const scores = record.item.options.map(option =>
          [...lexicalTokenSet(option)].filter(token => contextTokens.has(token)).length,
        );
        return selectUniqueExtreme(scores, 'max');
      },
    }),
    heuristicResult({
      id: 'cyclic-position',
      predictionRule: 'choose ordinal modulo k, resetting to A at each source pool',
      k,
      records,
      select: record => [record.ordinal % k],
    }),
    heuristicResult({
      id: 'novel-vs-distractors',
      predictionRule: 'choose unique option with lowest leave-one-item-out exact normalized frequency among distractors in this reported group',
      k,
      records,
      select: record => selectUniqueExtreme(
        record.item.options.map((option, index) =>
          (distractorFrequency.get(normalizedText(option)) ?? 0) -
          (index === record.item.answer ? 0 : 1),
        ),
        'min',
      ),
    }),
    heuristicResult({
      id: 'most-recycled-distractor',
      predictionRule: 'choose unique option with highest leave-one-item-out exact normalized frequency among distractors in this reported group',
      k,
      records,
      select: record => selectUniqueExtreme(
        record.item.options.map((option, index) =>
          (distractorFrequency.get(normalizedText(option)) ?? 0) -
          (index === record.item.answer ? 0 : 1),
        ),
        'max',
      ),
    }),
  );

  const correctWordLengths = records.map(record => wordCount(record.item.options[record.item.answer]));
  const distractorWordLengths = records.flatMap(record =>
    record.item.options.filter((_, index) => index !== record.item.answer).map(wordCount),
  );
  const correctCharacterLengths = records.map(record =>
    String(record.item.options[record.item.answer]).trim().length,
  );
  const distractorCharacterLengths = records.flatMap(record =>
    record.item.options
      .filter((_, index) => index !== record.item.answer)
      .map(option => String(option).trim().length),
  );
  const recycledDistractorEntries = [...distractorFrequency.entries()]
    .filter(([, count]) => count > 1);

  return {
    scope,
    ...(bank === null ? {} : { bank }),
    ...(poolId === null ? {} : { poolId }),
    k,
    n: records.length,
    sourcePools: [...new Set(records.map(record => record.poolId))].sort(),
    correctAnswerPositions: optionMetrics(records.map(record => record.item)).correctAnswerPositions,
    maximumCorrectPositionStreak: maximumPositionStreak(records),
    optionLengths: {
      meanCorrectWords: mean(correctWordLengths),
      meanDistractorWords: mean(distractorWordLengths),
      meanCorrectCharacters: mean(correctCharacterLengths),
      meanDistractorCharacters: mean(distractorCharacterLengths),
    },
    recycledDistractors: {
      distinctOptionTexts: allOptionFrequency.size,
      distinctRecycledDistractorTexts: recycledDistractorEntries.length,
      recycledDistractorOccurrences: recycledDistractorEntries
        .reduce((sum, [, count]) => sum + count, 0),
      correctOptionsAlsoSeenAsDistractors: records.filter(record =>
        (distractorFrequency.get(normalizedText(record.item.options[record.item.answer])) ?? 0) > 0,
      ).length,
    },
    heuristics,
    permutationInvariant: permutationInvariant(records, k),
  };
}

function buildOptionAudit(records, scope) {
  const grouped = (keyFor, describe) => {
    const groups = new Map();
    for (const record of records) {
      const key = keyFor(record);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(record);
    }
    return [...groups.entries()]
      .sort(([a], [b]) => a.localeCompare(b, 'en'))
      .map(([key, groupRecords]) => describe(key, groupRecords));
  };

  return {
    schemaVersion: 'anti-shortcuts.v1',
    aggregateByK: grouped(
      record => String(record.item.options.length).padStart(2, '0'),
      (key, groupRecords) => auditOptionGroup({
        scope,
        k: Number(key),
        records: groupRecords,
      }),
    ),
    byBankAndK: grouped(
      record => `${record.bank}\0${String(record.item.options.length).padStart(2, '0')}`,
      (key, groupRecords) => {
        const [bank, k] = key.split('\0');
        return auditOptionGroup({ scope, bank, k: Number(k), records: groupRecords });
      },
    ),
    byPoolAndK: grouped(
      record => `${record.bank}\0${record.poolId}\0${String(record.item.options.length).padStart(2, '0')}`,
      (key, groupRecords) => {
        const [bank, poolId, k] = key.split('\0');
        return auditOptionGroup({ scope, bank, poolId, k: Number(k), records: groupRecords });
      },
    ),
  };
}

const ABSOLUTE_PATTERN = /\b(?:all|always|every|everyone|everything|never|only|exclusively|entirely|completely|none)\b/iu;

function absoluteHeuristic(records, family, predictedAnswer) {
  const eligibleRecords = records.filter(record => ABSOLUTE_PATTERN.test(record.statement));
  const hits = eligibleRecords.filter(record => record.answer === predictedAnswer).length;
  const k = 3;
  const p0 = round6(1 / k);
  const upper95 = wilsonUpper95(hits, eligibleRecords.length);
  const threshold = round6(p0 + ADVANTAGE_MARGIN);
  const provisional = eligibleRecords.length < MIN_STATISTICAL_SAMPLE;
  return {
    id: `absolute-terms-imply-${predictedAnswer}`,
    family,
    predictionRule:
      `if statement contains ${ABSOLUTE_PATTERN.source}, predict ${predictedAnswer}; otherwise abstain`,
    k,
    n: records.length,
    eligible: eligibleRecords.length,
    ties: 0,
    abstentions: records.length - eligibleRecords.length,
    hits,
    p0,
    coverage: records.length ? round6(eligibleRecords.length / records.length) : null,
    conditionalAccuracy: eligibleRecords.length ? round6(hits / eligibleRecords.length) : null,
    totalAccuracy: records.length ? round6(hits / records.length) : null,
    wilsonUpper95: upper95,
    threshold,
    provisional,
    verdict: eligibleRecords.length === 0
      ? 'not-applicable'
      : provisional
        ? 'provisional'
        : upper95 <= threshold
          ? 'pass'
          : 'fail',
  };
}

const CATALOG_PATH = 'src/data/practica-exams/seo-catalog.ts';
const CLIENT_PATH =
  'src/app/(site)/examenes/[exam]/practica/[mockId]/IELTSPracticeClient.tsx';
const catalog = loadTsModule(CATALOG_PATH);

const FORMATIVE_EXPORTS = [
  ['true-false-not-given', 'IELTS_TFNG_PRACTICE_SETS', passage => passage.questions],
  ['yes-no-not-given', 'IELTS_YNNG_PRACTICE_SETS', passage => passage.questions],
  ['matching-headings', 'IELTS_MATCHING_HEADINGS_PASSAGES', passage => passage.paragraphs],
  ['matching-information', 'IELTS_MATCHING_INFORMATION_PASSAGES', passage => passage.questions],
  ['matching-features', 'IELTS_MATCHING_FEATURES_PASSAGES', passage => passage.questions],
  [
    'matching-sentence-endings',
    'IELTS_MATCHING_SENTENCE_ENDINGS_PASSAGES',
    passage => passage.questions,
  ],
  ['diagram-labeling', 'IELTS_DIAGRAM_LABELING_PASSAGES', passage => passage.questions],
  ['multiple-choice', 'IELTS_MULTIPLE_CHOICE_PASSAGES', passage => passage.questions],
  ['summary-completion', 'IELTS_SUMMARY_COMPLETION_PASSAGES', passage => passage.questions],
  [
    'note-completion',
    'IELTS_NOTE_COMPLETION_PASSAGES',
    passage => passage.noteGroups.flatMap(group => group.items),
  ],
  [
    'table-completion',
    'IELTS_TABLE_COMPLETION_PASSAGES',
    passage => passage.rows
      .flatMap(row => row.cells)
      .filter(cell => isObject(cell) && cell.type === 'blank'),
  ],
  ['flow-chart-completion', 'IELTS_FLOW_CHART_COMPLETION_PASSAGES', passage => passage.steps],
  ['short-answer', 'IELTS_SHORT_ANSWER_PASSAGES', passage => passage.questions],
  ['sentence-completion', 'IELTS_SENTENCE_COMPLETION_PASSAGES', passage => passage.questions],
];

const RIGHTS_KEYS = [
  'rightsBasis',
  'provenance',
  'license',
  'rights',
  'copyright',
  'sourceAttribution',
  'sourceUrl',
  'sources',
  'reviewStatus',
  'reviewedBy',
];

function hasRightsMetadata(value) {
  return RIGHTS_KEYS.some(key => own(value, key) && value[key] !== null && value[key] !== '');
}

const EVIDENCE_RELATIONS = new Set([
  'entails',
  'contradicts',
  'not-stated',
  'main-idea',
  'supports-inference',
]);

function validSpan(span) {
  return isObject(span) &&
    typeof span.paragraphId === 'string' &&
    Number.isInteger(span.start) &&
    Number.isInteger(span.end) &&
    span.start >= 0 &&
    span.end > span.start &&
    typeof span.quote === 'string' &&
    span.quote.trim().length > 0;
}

function hasStructuredEvidence(item) {
  const relation = item.evidenceRelation ?? item.semanticRelation;
  if (!EVIDENCE_RELATIONS.has(relation)) return false;

  const supporting = validSpan(item.supportingSpan) ||
    (
      Array.isArray(item.supportingSpans) &&
      item.supportingSpans.length > 0 &&
      item.supportingSpans.every(validSpan)
    );
  const absence = item.relatedZone != null &&
    typeof item.absenceTarget === 'string' &&
    item.absenceTarget.trim().length > 0;
  const global = item.globalEvidenceScope != null &&
    (
      typeof item.globalEvidenceScope !== 'string' ||
      item.globalEvidenceScope.trim().length > 0
    );
  return supporting || absence || global;
}

const formativeRows = FORMATIVE_EXPORTS.map(([route, exportName, readItems]) => {
  const passages = catalog[exportName];
  assert(Array.isArray(passages), `Falta export ${exportName}`);
  const items = passages.flatMap(readItems);
  return {
    route,
    export: exportName,
    passages: passages.length,
    items: items.length,
    passagesWithRightsMetadata: passages.filter(hasRightsMetadata).length,
    itemsWithStructuredEvidence: items.filter(hasStructuredEvidence).length,
    itemsWithLegacyEvidenceString: items.filter(
      item => typeof item.evidence === 'string' && item.evidence.trim(),
    ).length,
    _passages: passages,
    _items: items,
  };
});

const allFormativePassages = formativeRows.flatMap(row => row._passages);
const allFormativeItems = formativeRows.flatMap(row => row._items);

const LEARNING_EXPORTS = [
  [
    'skimming',
    'IELTS_SKIMMING_PRACTICE',
    [catalog.IELTS_SKIMMING_PRACTICE],
    set => [set.summaryQuestion, ...set.paragraphMap],
  ],
  [
    'scanning',
    'IELTS_SCANNING_PRACTICE',
    [catalog.IELTS_SCANNING_PRACTICE],
    set => set.targets,
  ],
  [
    'mixed',
    'IELTS_READING_MIXED_QUESTION_TYPE_SETS',
    catalog.IELTS_READING_MIXED_QUESTION_TYPE_SETS,
    set => set.tasks,
  ],
  [
    'skim-scan-transfer',
    'IELTS_SKIM_SCAN_TRANSFER_SETS',
    catalog.IELTS_SKIM_SCAN_TRANSFER_SETS,
    set => set.tasks,
  ],
  [
    'inference',
    'IELTS_INFERENCE_PRACTICE_SETS',
    catalog.IELTS_INFERENCE_PRACTICE_SETS,
    set => set.questions,
  ],
  [
    'paraphrase',
    'IELTS_PARAPHRASE_PRACTICE_SETS',
    catalog.IELTS_PARAPHRASE_PRACTICE_SETS,
    set => set.items,
  ],
  [
    'word-limit',
    'IELTS_WORD_LIMIT_PRACTICE_SETS',
    catalog.IELTS_WORD_LIMIT_PRACTICE_SETS,
    set => set.questions,
  ],
  [
    'time-management',
    'IELTS_TIME_MANAGEMENT_PRACTICE_SETS',
    catalog.IELTS_TIME_MANAGEMENT_PRACTICE_SETS,
    set => set.decisions,
  ],
];

const learningRows = LEARNING_EXPORTS.map(([bank, exportName, sets, readItems]) => {
  assert(Array.isArray(sets), `Falta export ${exportName}`);
  return {
    bank,
    export: exportName,
    sets: sets.length,
    decisions: sets.flatMap(readItems).length,
  };
});

function recordsForSet(bank, set, items, context) {
  return items.map((item, ordinal) => ({
    bank,
    poolId: set.id,
    ordinal,
    item,
    context,
  }));
}

const skimmingSet = catalog.IELTS_SKIMMING_PRACTICE;
const ANTI_SHORTCUT_RECORD_POOLS = [
  [
    'Skimming',
    recordsForSet(
      'Skimming',
      skimmingSet,
      [skimmingSet.summaryQuestion, ...skimmingSet.paragraphMap],
      skimmingSet.passage,
    ),
  ],
  [
    'Mixed',
    catalog.IELTS_READING_MIXED_QUESTION_TYPE_SETS.flatMap(set =>
      recordsForSet(
        'Mixed',
        set,
        set.tasks,
        set.passage.map(paragraph => paragraph.text).join('\n\n'),
      ),
    ),
  ],
  [
    'Inference',
    catalog.IELTS_INFERENCE_PRACTICE_SETS.flatMap(set =>
      recordsForSet('Inference', set, set.questions, set.passage),
    ),
  ],
  [
    'Paraphrase',
    catalog.IELTS_PARAPHRASE_PRACTICE_SETS.flatMap(set =>
      set.items.map((item, ordinal) => ({
        bank: 'Paraphrase',
        poolId: set.id,
        ordinal,
        item,
        context: item.source,
      })),
    ),
  ],
  [
    'Time Management',
    catalog.IELTS_TIME_MANAGEMENT_PRACTICE_SETS.flatMap(set =>
      recordsForSet(
        'Time Management',
        set,
        set.decisions,
        set.passageMap
          .map(entry => [entry.label, entry.purpose, entry.timeBudget].join(' '))
          .join('\n'),
      ),
    ),
  ],
  [
    'Multiple Choice',
    catalog.IELTS_MULTIPLE_CHOICE_PASSAGES.flatMap(passage =>
      recordsForSet('Multiple Choice', passage, passage.questions, passage.passage),
    ),
  ],
];

const antiShortcutRows = ANTI_SHORTCUT_RECORD_POOLS.map(([bank, records]) => ({
  bank,
  ...optionMetrics(records.map(record => record.item)),
}));
const allShortcutRecords = ANTI_SHORTCUT_RECORD_POOLS.flatMap(([, records]) => records);
const allShortcutItems = allShortcutRecords.map(record => record.item);

const formativeTfngAbsoluteRecords = catalog.IELTS_TFNG_PRACTICE_SETS.flatMap(set =>
  set.questions.map(question => ({
    statement: question.statement,
    answer: question.answer,
  })),
);
const formativeYnngAbsoluteRecords = catalog.IELTS_YNNG_PRACTICE_SETS.flatMap(set =>
  set.questions.map(question => ({
    statement: question.statement,
    answer: question.answer,
  })),
);

const MOCK_PATHS = Array.from(
  { length: 20 },
  (_, index) => `src/data/mocks/ielts-set-${index + 1}.ts`,
);

function tableBlankCells(question) {
  return question.rows
    .flat()
    .filter(cell => isObject(cell) && Number.isInteger(cell.num) && Array.isArray(cell.answers));
}

function questionPoints(question) {
  switch (question.type) {
    case 'mcq':
    case 'dialog':
    case 'fill':
      return 1;
    case 'formgroup':
      return question.blanks.length;
    case 'tablegroup':
      return tableBlankCells(question).length;
    case 'multiselect':
      return question.selectCount;
    case 'matching':
      return question.items.length;
    default:
      throw new Error(
        `Tipo no soportado en sección Reading: ${question.type} (${question.id})`,
      );
  }
}

function blankSlots(question) {
  switch (question.type) {
    case 'fill':
      return [question];
    case 'formgroup':
      return question.blanks;
    case 'tablegroup':
      return tableBlankCells(question);
    default:
      return [];
  }
}

const TFNG = ['TRUE', 'FALSE', 'NOT GIVEN'];
const YNNG = ['YES', 'NO', 'NOT GIVEN'];
const sameArray = (a, b) =>
  a.length === b.length && a.every((value, index) => value === b[index]);

const mockRows = [];
const regularMockMcq = [];
const regularMockMcqRecords = [];
const tfngAnswers = [];
const ynngAnswers = [];
const mockTfngAbsoluteRecords = [];
const mockYnngAbsoluteRecords = [];
const allMockSections = [];
const allMockQuestions = [];
const allMockBlanks = [];
const allMockMultiselect = [];

for (const path of MOCK_PATHS) {
  const mock = loadTsModule(path).default;
  assert(mock?.examSlug === 'ielts', `Mock IELTS inválido: ${path}`);

  const sections = mock.sections.filter(section => section.skill === 'reading');
  const questions = sections.flatMap(section => section.questions);
  const blanks = questions.flatMap(blankSlots);
  const multiselect = questions.filter(question => question.type === 'multiselect');
  const points = questions.reduce((sum, question) => sum + questionPoints(question), 0);

  for (const section of sections) {
    const mcqQuestions = section.questions.filter(question => question.type === 'mcq');
    let regularOrdinal = 0;
    for (const question of mcqQuestions) {
      const options = question.options.map(option => option.trim().toUpperCase());
      if (sameArray(options, TFNG)) {
        const answer = options[question.answer];
        tfngAnswers.push(answer);
        mockTfngAbsoluteRecords.push({ statement: question.text, answer });
      } else if (sameArray(options, YNNG)) {
        const answer = options[question.answer];
        ynngAnswers.push(answer);
        mockYnngAbsoluteRecords.push({ statement: question.text, answer });
      } else {
        regularMockMcq.push(question);
        regularMockMcqRecords.push({
          bank: mock.id,
          poolId: `${mock.id}:reading-part-${section.part}`,
          ordinal: regularOrdinal,
          item: question,
          context: section.passage ?? '',
        });
        regularOrdinal += 1;
      }
    }
  }

  mockRows.push({
    id: mock.id,
    file: path,
    readingSections: sections.length,
    scorePoints: points,
    blankSlots: blanks.length,
    blankSlotsWithoutMaxWords: blanks.filter(blank => blank.maxWords == null).length,
    multiselectGroups: multiselect.length,
    multiselectScorePoints: multiselect.reduce(
      (sum, question) => sum + question.selectCount,
      0,
    ),
  });

  allMockSections.push(...sections);
  allMockQuestions.push(...questions);
  allMockBlanks.push(...blanks);
  allMockMultiselect.push(...multiselect);
}

function canonicalDistribution(labels, answers) {
  return Object.fromEntries(
    labels.map(label => [label, answers.filter(answer => answer === label).length]),
  );
}

assert(
  regularMockMcqRecords.length === regularMockMcq.length,
  'El universo MCQ mock perdió contexto durante la extracción',
);

const formativeOptionAudit = buildOptionAudit(allShortcutRecords, 'formative-option-banks');
const mockOptionAudit = buildOptionAudit(regularMockMcqRecords, 'mock-regular-mcq');
const absoluteHeuristics = [
  absoluteHeuristic(formativeTfngAbsoluteRecords, 'formative-tfng', 'FALSE'),
  absoluteHeuristic(mockTfngAbsoluteRecords, 'mock-tfng', 'FALSE'),
  absoluteHeuristic(
    [...formativeTfngAbsoluteRecords, ...mockTfngAbsoluteRecords],
    'all-tfng',
    'FALSE',
  ),
  absoluteHeuristic(formativeYnngAbsoluteRecords, 'formative-ynng', 'NO'),
  absoluteHeuristic(mockYnngAbsoluteRecords, 'mock-ynng', 'NO'),
  absoluteHeuristic(
    [...formativeYnngAbsoluteRecords, ...mockYnngAbsoluteRecords],
    'all-ynng',
    'NO',
  ),
];

const multiselectInconsistencies = allMockMultiselect.flatMap(question => {
  const rangePoints = question.qRange[1] - question.qRange[0] + 1;
  if (rangePoints === question.selectCount && question.answers.length === question.selectCount) {
    return [];
  }
  return [{
    id: question.id,
    qRangePoints: rangePoints,
    selectCount: question.selectCount,
    answers: question.answers.length,
  }];
});

const typeRoutes = catalog.IELTS_READING_TYPES;
const skillRoutes = catalog.IELTS_READING_SKILLS;
assert(Array.isArray(typeRoutes), 'Falta IELTS_READING_TYPES');
assert(Array.isArray(skillRoutes), 'Falta IELTS_READING_SKILLS');

function pagePath(route) {
  return `src/app/(site)${route.path}/page.tsx`;
}

const routeMetrics = routes => ({
  declared: routes.length,
  published: routes.filter(route => route.status === 'published').length,
  pageFilesPresent: routes.filter(route => existsSync(resolve(ROOT, pagePath(route)))).length,
  missingPageFiles: routes
    .map(pagePath)
    .filter(path => !existsSync(resolve(ROOT, path)))
    .sort(),
});

const clientSource = readFileSync(resolve(ROOT, CLIENT_PATH), 'utf8');
const allOrNothingSignals = {
  exactSetEquality:
    /ms\.answers\.every\(a\s*=>\s*sel\.includes\(a\)\)\s*&&\s*sel\.every\(s\s*=>\s*ms\.answers\.includes\(s\)\)/u
      .test(clientSource),
  awardsSelectCountAsBlock:
    /if\s*\(correct_ms\)\s*correct\s*\+=\s*ms\.selectCount/u.test(clientSource),
};

const sourcePaths = [
  CATALOG_PATH,
  CLIENT_PATH,
  ...MOCK_PATHS,
  ...typeRoutes.map(pagePath),
  ...skillRoutes.map(pagePath),
].filter(path => existsSync(resolve(ROOT, path))).sort();

const sourceFiles = sourcePaths.map(path => ({
  path,
  sha256: createHash('sha256')
    .update(readFileSync(resolve(ROOT, path)))
    .digest('hex'),
}));

const combinedHash = createHash('sha256');
for (const file of sourceFiles) {
  combinedHash.update(file.path);
  combinedHash.update('\0');
  combinedHash.update(readFileSync(resolve(ROOT, file.path)));
  combinedHash.update('\0');
}

const gitHead = execFileSync('git', ['rev-parse', 'HEAD'], {
  cwd: ROOT,
  encoding: 'utf8',
}).trim();
const sourceGitStatus = execFileSync(
  'git',
  ['status', '--porcelain=v1', '--', ...sourcePaths],
  { cwd: ROOT, encoding: 'utf8' },
).trim().split('\n').filter(Boolean).sort();

const result = {
  schemaVersion: 'ielts-reading-baseline.v2',
  extractor: {
    runtime: {
      node: process.version,
      typescript: ts.version,
    },
    countingRules: {
      optionLength: 'Unicode whitespace-separated token count',
      longestOptionTies: 'excluded from eligible denominator',
      lexicalOverlap:
        'count distinct NFKD/lowercase alphanumeric option tokens present in source context; maximum ties abstain',
      absoluteTerms:
        `${ABSOLUTE_PATTERN.source} predicts FALSE for TFNG and NO for YNNG; non-triggering statements abstain`,
      cyclicPosition: 'ordinal modulo k, reset at each source pool',
      recycledDistractors:
        'leave-one-item-out exact NFKD/lowercase alphanumeric text frequency among distractor occurrences in each reported group',
      permutationInvariant:
        'rotate left and reverse option indexes, remap answer index, and require normalized semantic key text to remain unchanged',
      statisticalGate: {
        z: WILSON_Z,
        minimumEligible: MIN_STATISTICAL_SAMPLE,
        threshold: 'Wilson unilateral U95 <= 1/k + 0.10',
      },
      blanks: 'fill question, each formgroup blank, and each object cell in tablegroup',
      missingMaxWords: 'maxWords == null',
      multiselectPoints: 'selectCount; must equal qRange width and answers length',
      mockScope: "sections where skill === 'reading'",
      regularMockMcq:
        'mcq excluding exact normalized TRUE/FALSE/NOT GIVEN and YES/NO/NOT GIVEN arrays',
      structuredEvidence:
        'valid evidenceRelation/semanticRelation plus supportingSpan(s), relatedZone+absenceTarget, or globalEvidenceScope',
      rightsMetadata: RIGHTS_KEYS,
    },
  },
  sourceIdentity: {
    gitHead,
    sourceGitStatus,
    combinedSha256: combinedHash.digest('hex'),
    files: sourceFiles,
  },
  routes: {
    questionTypes: routeMetrics(typeRoutes),
    skills: routeMetrics(skillRoutes),
  },
  formativeBank: {
    passages: allFormativePassages.length,
    items: allFormativeItems.length,
    passagesWithRightsMetadata: allFormativePassages.filter(hasRightsMetadata).length,
    itemsWithStructuredEvidence: allFormativeItems.filter(hasStructuredEvidence).length,
    byRoute: formativeRows.map(({ _passages, _items, ...publicRow }) => publicRow),
  },
  learningBanks: {
    sets: learningRows.reduce((sum, row) => sum + row.sets, 0),
    decisions: learningRows.reduce((sum, row) => sum + row.decisions, 0),
    byBank: learningRows,
  },
  antiShortcuts: {
    ...optionMetrics(allShortcutItems),
    byBank: antiShortcutRows,
    audit: formativeOptionAudit,
    absoluteHeuristics,
  },
  mocks: {
    files: mockRows.length,
    readingSections: allMockSections.length,
    scorePoints: allMockQuestions.reduce(
      (sum, question) => sum + questionPoints(question),
      0,
    ),
    sectionsWithRightsMetadata: allMockSections.filter(hasRightsMetadata).length,
    questionGroupsWithEvidenceOrExplanation: allMockQuestions.filter(question =>
      (typeof question.evidence === 'string' && question.evidence.trim()) ||
      (typeof question.explanation === 'string' && question.explanation.trim()),
    ).length,
    blanks: {
      total: allMockBlanks.length,
      withoutMaxWords: allMockBlanks.filter(blank => blank.maxWords == null).length,
    },
    multiselect: {
      groups: allMockMultiselect.length,
      scorePoints: allMockMultiselect.reduce(
        (sum, question) => sum + question.selectCount,
        0,
      ),
      inconsistencies: multiselectInconsistencies,
      runnerPolicyDetected:
        Object.values(allOrNothingSignals).every(Boolean) ? 'all-or-nothing' : 'unknown',
      runnerSignals: allOrNothingSignals,
    },
    regularMcq: {
      ...optionMetrics(regularMockMcq),
      audit: mockOptionAudit,
    },
    tfng: canonicalDistribution(TFNG, tfngAnswers),
    ynng: canonicalDistribution(YNNG, ynngAnswers),
    bySet: mockRows,
  },
};

const json = `${JSON.stringify(result, null, 2)}\n`;
if (process.argv.includes('--write')) {
  writeFileSync(resolve(HERE, 'baseline.json'), json);
} else {
  process.stdout.write(json);
}
