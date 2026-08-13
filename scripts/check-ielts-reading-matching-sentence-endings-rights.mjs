#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const require = createRequire(import.meta.url);
const ts = require('typescript');

// Packet creation deliberately precedes every adjudication. Do not backdate reviewer work to
// satisfy this contract; validation adopts the final audit transaction's real reviewedAt.
const PACKETS_GENERATED_AT = '2026-08-09T15:20:00Z';
const CATALOG_PATH = 'src/data/practica-exams/seo-catalog.ts';
const ROUTE_PATH =
  'src/app/(site)/practica/ielts/reading/tipos-de-preguntas/matching-sentence-endings/page.tsx';
const ENGINE_PATH = 'src/components/exam-practice/MatchingSentenceEndingsEngine.tsx';
const BANK_PATH = 'src/components/exam-practice/MatchingSentenceEndingsPassageBank.tsx';
const NEXT_ROUTE_PATH =
  'src/app/(site)/practica/ielts/reading/tipos-de-preguntas/sentence-completion/page.tsx';
const NEXT_ENGINE_PATH = 'src/components/exam-practice/SummaryCompletionPracticeEngine.tsx';
const NEXT_BANK_PATH = 'src/components/exam-practice/SummaryCompletionPassageBank.tsx';
const OFFICIAL_STRATEGY_PATH = 'src/components/exam-practice/OfficialStrategyCard.tsx';
const REVIEW_SOURCE_BLOCK_PATH = 'src/components/exam-practice/QuestionTypeReviewSourceBlock.tsx';
const STRUCTURED_DATA_PATH = 'src/components/exam-practice/StructuredData.tsx';
const CONTRACT_PATH = 'src/lib/ielts/academic-reading-rights.ts';
const REGISTRY_PATH = 'src/data/practica-exams/ielts-reading-rights-registry.ts';
const VALIDATOR_PATH = 'scripts/check-ielts-reading-matching-sentence-endings-rights.mjs';
const TEST_PATH = 'tests/ielts-reading-matching-sentence-endings-rights.test.mjs';
const LOOP_DOC_PATH = 'docs/ielts-reading-loop.md';
const OUTPUT_DIRECTORY =
  'output/audits/ielts-reading-rights-matching-sentence-endings-2026-08-09';
const BASELINE_PATH = `${OUTPUT_DIRECTORY}/baseline.json`;
const SOURCE_AVAILABILITY_PATH = `${OUTPUT_DIRECTORY}/source-availability.json`;
const PROVENANCE_SEARCH_PATH = `${OUTPUT_DIRECTORY}/provenance-search.json`;
const UNIT_CHANGE_MANIFEST_PATH = `${OUTPUT_DIRECTORY}/unit-change-manifest.json`;
const CONNECTIVE_PACKET_PATH = `${OUTPUT_DIRECTORY}/connective-only.json`;
const CONNECTIVE_VERDICT_PATH = `${OUTPUT_DIRECTORY}/connective-only-verdict.json`;
const SURFACE_PACKET_PATH = `${OUTPUT_DIRECTORY}/surface-only.json`;
const SURFACE_VERDICT_PATH = `${OUTPUT_DIRECTORY}/surface-only-verdict.json`;
const BLIND_REVIEW_PATH = `${OUTPUT_DIRECTORY}/blind-review.json`;
const FACTUAL_SOURCE_REVIEW_PATH = `${OUTPUT_DIRECTORY}/factual-source-review.json`;
const FIRST_PASS_PATH = `${OUTPUT_DIRECTORY}/expert-first-pass.json`;
const EXPERT_VERDICT_PATH = `${OUTPUT_DIRECTORY}/expert-verdict.json`;
const STUDENT_WALKTHROUGH_PATH = `${OUTPUT_DIRECTORY}/student-walkthrough.json`;
const VALIDATION_PATH = `${OUTPUT_DIRECTORY}/validation.json`;
const AUDIT_VERDICTS_PATH = `${OUTPUT_DIRECTORY}/audit-verdicts.json`;
const BUILD_REPORT_PATH = `${OUTPUT_DIRECTORY}/build-report.mjs`;
const ARTIFACT_PATH = `${OUTPUT_DIRECTORY}/artifact.json`;
const REPORT_MD_PATH = `${OUTPUT_DIRECTORY}/report.md`;
const REPORT_HTML_PATH = `${OUTPUT_DIRECTORY}/report.html`;
const REPORT_VERIFICATION_PATH = `${OUTPUT_DIRECTORY}/report-verification.json`;

const EXPECTED_SET_IDS = ['mse-microclimates', 'mse-food-waste', 'mse-coastal-libraries'];
const EXPECTED_ASSET_IDS = EXPECTED_SET_IDS.map(id =>
  `formative:matching-sentence-endings:${id}`);
const EXPECTED_QUESTION_IDS = [
  ...Array.from({ length: 6 }, (_, index) =>
    `mse-microclimates-${String(index + 1).padStart(2, '0')}`),
  ...Array.from({ length: 6 }, (_, index) =>
    `mse-food-waste-${String(index + 1).padStart(2, '0')}`),
  ...Array.from({ length: 6 }, (_, index) =>
    `mse-libraries-${String(index + 1).padStart(2, '0')}`),
];
const ENDING_IDS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const OFFICIAL_EVIDENCE_ID = 'ielts-matching-sentence-endings-official-format';
const EXPECTED_TEXT_ORDER_VIOLATIONS = ['mse-food-waste-06', 'mse-libraries-06'];
const LEARNER_FACING_PATHS = [
  CATALOG_PATH, ROUTE_PATH, ENGINE_PATH, BANK_PATH, OFFICIAL_STRATEGY_PATH,
  REVIEW_SOURCE_BLOCK_PATH, STRUCTURED_DATA_PATH,
];
const NEXT_UNIT_PATHS = [NEXT_ROUTE_PATH, NEXT_ENGINE_PATH, NEXT_BANK_PATH];
const REQUIRED_FACTUAL_CLAIM_SPANS = {
  'formative:matching-sentence-endings:mse-microclimates': [
    'People often think of urban heat as a city-wide problem, but temperatures can vary sharply from one block to the next.',
    'Dark asphalt absorbs more solar energy than lighter paving, and it releases stored heat slowly after sunset.',
    'Building overhangs, awnings and transit shelters can provide similar relief when they are designed around the times when people actually use the space.',
    'Urban designers sometimes model airflow before approving large developments because a new tower may improve comfort in one street while making another feel stagnant.',
    'Small interventions are most effective when they appear along ordinary routes, where people are already walking, waiting or gathering.',
  ],
  'formative:matching-sentence-endings:mse-food-waste': [
    'Farmers may leave produce unharvested when market prices fall below picking costs.',
    'Some grocery chains now use local sales data, weather patterns and holiday schedules to predict demand more accurately.',
    'However, when the same produce is included in normal displays with simple recipe suggestions, customers are more likely to accept it as ordinary food rather than a special problem category.',
    'Effective programmes use clear collection windows and packaging routines so that surplus meals can move quickly to community kitchens.',
    'Composting does not prevent waste at the source, but it can reduce the environmental impact of food that cannot be eaten.',
  ],
  'formative:matching-sentence-endings:mse-coastal-libraries': [
    'However, because libraries are familiar, free and open for long hours, some local councils now use them as places where residents can find practical information about flooding, insurance and emergency planning.',
    'When staff receive training from emergency planners, they can guide visitors toward reliable resources without pretending to be engineers or legal advisers.',
    'Some libraries therefore run small workshops where residents compare official maps with photographs of streets they know.',
    'The council later used these observations to prioritize maintenance visits.',
    'Libraries cannot replace evacuation systems, flood barriers or housing policy.',
  ],
};

const FORBIDDEN_PACKET_KEYS = new Set([
  'answer', 'answers', 'answerkey', 'answerkeys', 'correct', 'correctanswer',
  'correctanswers', 'explanation', 'explanations', 'feedback', 'hint', 'hints',
  'key', 'keys', 'solution', 'solutions', 'trap', 'traps', 'skill', 'skills',
]);
const PII_KEYS = new Set([
  'address', 'attemptid', 'contact', 'email', 'emailaddress', 'ip', 'ipaddress',
  'learnerid', 'phone', 'phonenumber', 'sessionid', 'studentid', 'telephone',
  'userid', 'whatsapp',
]);
const EMAIL_VALUE = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/iu;
const PHONE_VALUE = /(?:\+(?:[\s().-]*\d){7,}|(?:phone|tel(?:ephone)?|whats ?app|contact)[^\n]{0,24}(?:\d[\s().-]*){7,})/iu;

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const sha256 = value => createHash('sha256').update(value).digest('hex');
const normalizeText = value => String(value ?? '').normalize('NFKC').replace(/\s+/gu, ' ').trim();
const wordCount = value => normalizeText(value).split(' ').filter(Boolean).length;
const tokenCount = value => (normalizeText(value).toLowerCase().match(/[a-z0-9]+/gu) ?? []).length;
const sourceSha256 = path => sha256(readFileSync(resolve(ROOT, path)));
const KNOWN_ROOT_LAYOUT_BEFORE_ANALYTICS_GUARD =
  '03d06f0aba4ac802fd9bf69b63229af511a8f4daa132d405dfc36a1a19f01dda';
const KNOWN_ROOT_LAYOUT_AFTER_ANALYTICS_GUARD =
  '6323573c44d1f473e5d9cd3cb7c13706b9aebcc158d211d1f56e190fefda9ec3';
const sourceMatchesReviewedSnapshot = (path, expectedSha) => {
  const actualSha = sourceSha256(path);
  return actualSha === expectedSha || (
    path === 'src/app/layout.tsx' &&
    expectedSha === KNOWN_ROOT_LAYOUT_BEFORE_ANALYTICS_GUARD &&
    actualSha === KNOWN_ROOT_LAYOUT_AFTER_ANALYTICS_GUARD
  );
};
const readJson = path => JSON.parse(readFileSync(resolve(ROOT, path), 'utf8'));

function stableValue(value) {
  if (Array.isArray(value)) return value.map(stableValue);
  if (!isObject(value)) return value;
  return Object.fromEntries(Object.keys(value).sort().map(key => [key, stableValue(value[key])]));
}
const stableJson = value => JSON.stringify(stableValue(value));

function assertExactKeys(value, expected, label) {
  assert(isObject(value), `${label}: se esperaba un objeto.`);
  assert(stableJson(Object.keys(value).sort()) === stableJson([...expected].sort()),
    `${label}: keys inesperadas. Esperadas ${[...expected].sort().join(', ')}; observadas ${Object.keys(value).sort().join(', ')}.`);
}

function assertExactIdCoverage(records, expectedIds, field, label) {
  assert(Array.isArray(records) && records.length === expectedIds.length,
    `${label}: cardinalidad inválida.`);
  const ids = records.map(row => row?.[field]);
  assert(new Set(ids).size === ids.length, `${label}: IDs duplicados.`);
  assert(stableJson([...ids].sort()) === stableJson([...expectedIds].sort()),
    `${label}: IDs extra o ausentes.`);
}

function hasNonEmptyNotes(value) {
  return (typeof value === 'string' && value.trim()) ||
    (Array.isArray(value) && value.length > 0 &&
      value.every(note => typeof note === 'string' && note.trim()));
}

function loadTsModule(path) {
  const absolutePath = resolve(ROOT, path);
  const result = ts.transpileModule(readFileSync(absolutePath, 'utf8'), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
    fileName: absolutePath,
    reportDiagnostics: true,
  });
  const errors = (result.diagnostics ?? []).filter(row =>
    row.category === ts.DiagnosticCategory.Error);
  assert(errors.length === 0, `No se pudo transpilar ${path}: ${errors.map(error =>
    ts.flattenDiagnosticMessageText(error.messageText, '\n')).join('; ')}`);
  const evaluated = { exports: {} };
  vm.runInNewContext(result.outputText, {
    module: evaluated,
    exports: evaluated.exports,
    require(specifier) {
      throw new Error(`Import runtime no permitido en ${path}: ${specifier}`);
    },
  }, { filename: absolutePath, timeout: 10_000 });
  return evaluated.exports;
}

function strictCalendarDate(value, label) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/u.exec(String(value));
  assert(match, `${label}: fecha inválida.`);
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const maximumDay = month >= 1 && month <= 12
    ? new Date(Date.UTC(year, month, 0)).getUTCDate() : 0;
  assert(year >= 1 && month >= 1 && month <= 12 && day >= 1 && day <= maximumDay,
    `${label}: fecha calendárica inválida.`);
  return true;
}

function timestampMs(value, label) {
  const match = /^(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d{1,3})?(Z|[+-]\d{2}:\d{2})$/u
    .exec(String(value));
  assert(match, `${label}: timestamp ISO inválido.`);
  strictCalendarDate(match[1], label);
  assert(Number(match[2]) <= 23 && Number(match[3]) <= 59 && Number(match[4]) <= 59,
    `${label}: hora inválida.`);
  if (match[5] !== 'Z') {
    const zoneHour = Number(match[5].slice(1, 3));
    const zoneMinute = Number(match[5].slice(4, 6));
    assert(zoneHour <= 14 && zoneMinute <= 59 && (zoneHour < 14 || zoneMinute === 0),
      `${label}: offset inválido.`);
  }
  const parsed = Date.parse(value);
  assert(Number.isFinite(parsed), `${label}: timestamp inválido.`);
  return parsed;
}

export function assertNoFutureTimestamp(value, label = 'timestamp', now = Date.now()) {
  assert(timestampMs(value, label) <= now, `${label}: timestamp futuro.`);
  return true;
}

function findForbiddenKeys(value, path = '$', findings = []) {
  if (Array.isArray(value)) {
    value.forEach((entry, index) => findForbiddenKeys(entry, `${path}[${index}]`, findings));
    return findings;
  }
  if (!isObject(value)) return findings;
  for (const [key, entry] of Object.entries(value)) {
    const normalized = key.toLowerCase().replace(/[-_]/gu, '');
    if (FORBIDDEN_PACKET_KEYS.has(normalized)) findings.push(`${path}.${key}`);
    findForbiddenKeys(entry, `${path}.${key}`, findings);
  }
  return findings;
}

function findPii(value, path = '$', findings = []) {
  if (Array.isArray(value)) {
    value.forEach((entry, index) => findPii(entry, `${path}[${index}]`, findings));
    return findings;
  }
  if (typeof value === 'string') {
    if (EMAIL_VALUE.test(value)) findings.push(`${path}:email-value`);
    if (PHONE_VALUE.test(value)) findings.push(`${path}:phone-value`);
    return findings;
  }
  if (!isObject(value)) return findings;
  for (const [key, entry] of Object.entries(value)) {
    const normalized = key.toLowerCase().replace(/[-_]/gu, '');
    if (PII_KEYS.has(normalized)) findings.push(`${path}.${key}`);
    findPii(entry, `${path}.${key}`, findings);
  }
  return findings;
}

export function findSentenceEndingAssignmentLeaks(
  value, path = '$', findings = [], inQuestionRow = false, assignmentContext = false,
) {
  if (Array.isArray(value)) {
    value.forEach((entry, index) =>
      findSentenceEndingAssignmentLeaks(
        entry, `${path}[${index}]`, findings, inQuestionRow, assignmentContext));
    return findings;
  }
  if (typeof value === 'string') {
    const rawText = normalizeText(value);
    const scopedLabelMatch =
      /^(?:(?:letter|ending|option|letra|opción|opcion)\s+)?[([]?\s*([A-Ha-h])\s*[)\]]?[,.;:!?]?$/u
        .exec(rawText);
    const scopedStandaloneLabel = inQuestionRow && Boolean(scopedLabelMatch) &&
      (scopedLabelMatch[1] !== 'a' || assignmentContext ||
        /^(?:letter|ending|option|letra|opción|opcion)\b/iu.test(rawText));
    const questionIdAndUppercaseLabel = /\bmse[-\w]+\b/iu.test(rawText) &&
      /\b[A-H]\b/u.test(rawText);
    const text = rawText
      .replace(/\b([A-H])\b/gu, (_match, id) => `endingid${id.toLowerCase()}`)
      .toLowerCase();
    const patterns = [
      /\b(?:choose|select|mark|use|pick)\s+(?:the\s+)?(?:ending|letter|option)?\s*endingid[a-h](?:\s+for\s+mse[-\w]+)?\b/u,
      /\b(?:correct|right|stored|gold)\s+(?:ending|letter|answer|option)\s+(?:for\s+mse[-\w]+\s+)?(?:is|:|=|→)\s*endingid[a-h]\b/u,
      /\bmse[-\w]+\s*(?:(?:is|maps? to|corresponds? to)|[:=→])\s*(?:the\s+)?(?:ending|letter|option)?\s*endingid[a-h]\b/u,
      /\b(?:the\s+)?complete(?:d)?\s+sentence\s+(?:for\s+)?mse[-\w]+\s*(?:is|:|=|→)\b/u,
      /\b(?:elige|selecciona|marca|usa)\s+(?:el\s+)?(?:final|ending|la\s+letra|letra|opción|opcion)?\s*endingid[a-h](?:\s+para\s+mse[-\w]+)?\b/u,
      /\bmse[-\w]+\s+(?:corresponde|mapea|apunta|pertenece)\s+(?:(?:al?|con)\s+)?(?:final|ending|la\s+letra|letra|opción|opcion)?\s*endingid[a-h]\b/u,
      /\b(?:la\s+)?(?:oración|oracion)\s+completa\s+de\s+mse[-\w]+\s+(?:es|:|=|→)\b/u,
      /\b(?:final|ending|letra|respuesta|opción|opcion)\s+(?:correct[oa]|almacenad[oa])\s+(?:de\s+mse[-\w]+\s+)?(?:es|:|=|→)\s*endingid[a-h]\b/u,
      /\b(?:la\s+)?respuesta\s+(?:correcta\s+)?corresponde\s+a\s+(?:la\s+)?(?:letra|opción|opcion|final|ending)\s*endingid[a-h]\b/u,
    ];
    const explicitLowercaseLabelPatterns = [
      /\b(?:choose|select|mark|use|pick)\s+(?:the\s+)?(?:ending|letter|option)\s+[a-h]\b/u,
      /\b(?:elige|selecciona|marca|usa)\s+(?:la\s+)?(?:letra|opción|opcion|final|ending)\s+[a-h]\b/u,
      /\b(?:answer|respuesta)\s+(?:correcta?\s+)?(?:is|maps? to|corresponde\s+a)\s+(?:the\s+|la\s+)?(?:letter|ending|option|letra|opción|opcion)\s+[a-h]\b/u,
      /\b(?:answer|respuesta)\s+(?:de|for)\s+mse[-\w]+\s+(?:is|es|:|=|→)\s*[a-h]\b/u,
      /\bpair\s+(?:mse[-\w]+|this|it|the\s+(?:item|statement))\s+with\s+(?:ending|letter|option)?\s*[a-h]\b/u,
      /\bmse[-\w]+\s+(?:takes|goes\s+with|va\s+con)\s+(?:ending|letter|option|letra|opción|opcion)?\s*[a-h]\b/u,
      /\bpon\s+[a-h]\s+en\s+mse[-\w]+\b/u,
      /\b(?:match|link|set)\s+mse[-\w]+\s+(?:to|with)\s+[a-h]\b/u,
      /\bmse[-\w]+\s+pairs?\s+with\s+[a-h]\b/u,
      /\bgo\s+with\s+[a-h]\s+for\s+mse[-\w]+\b/u,
      /\basigna\s+[a-h]\s+a\s+mse[-\w]+\b/u,
      /\bune\s+mse[-\w]+\s+con\s+[a-h]\b/u,
      /\bmse[-\w]+\s*(?:=|:|→)\s*[a-h]\b/u,
    ];
    if ((scopedStandaloneLabel || questionIdAndUppercaseLabel ||
      patterns.some(pattern => pattern.test(text)) ||
      explicitLowercaseLabelPatterns.some(pattern => pattern.test(rawText.toLowerCase()))) &&
      !findings.includes(path)) findings.push(path);
    return findings;
  }
  if (!isObject(value)) return findings;
  const scoped = inQuestionRow ||
    (typeof value.questionId === 'string' && /^mse[-\w]+$/u.test(value.questionId));
  const assignmentKeys = new Set([
    'answer', 'assignment', 'choice', 'completed', 'completedsentence', 'correctendingid',
    'ending', 'endingid', 'key', 'letter', 'match', 'option', 'respuesta', 'selected',
    'selectedendingid', 'selection', 'verdict', 'result',
  ]);
  for (const [key, entry] of Object.entries(value)) {
    const normalized = key.toLowerCase().replace(/[-_]/gu, '');
    const labelMatch = typeof entry === 'string'
      ? /^(?:(?:letter|ending|option|letra|opción|opcion)\s+)?[([]?\s*([A-Ha-h])\s*[)\]]?[,.;:!?]?$/u
        .exec(entry.trim())
      : null;
    const labelToken = labelMatch?.[1] ?? '';
    const explicitLabelWrapper = typeof entry === 'string' &&
      /^(?:letter|ending|option|letra|opción|opcion)\b/iu.test(entry.trim());
    const directMapLeak = /^mse[-\w]+$/u.test(key) && Boolean(labelToken);
    const standaloneScopedLabel = Boolean(labelToken) &&
      (labelToken !== 'a' || assignmentKeys.has(normalized) || explicitLabelWrapper);
    const scopedFieldLeak = scoped && typeof entry === 'string' &&
      ((standaloneScopedLabel && normalized !== 'questionid') ||
        (normalized === 'completedsentence' && entry.trim()));
    if ((directMapLeak || scopedFieldLeak) &&
      !findings.includes(`${path}.${key}`)) findings.push(`${path}.${key}`);
    findSentenceEndingAssignmentLeaks(key.replace(/[-_]+/gu, ' '), `${path}.${key}:key`, findings, scoped);
    findSentenceEndingAssignmentLeaks(entry, `${path}.${key}`, findings,
      scoped || /^mse[-\w]+$/u.test(key),
      assignmentContext || assignmentKeys.has(normalized) || /^mse[-\w]+$/u.test(key));
  }
  return findings;
}

function assertCleanPacket(packet, label) {
  assert(findForbiddenKeys(packet).length === 0,
    `${label}: filtra answers, feedback, explanations, traps o skills.`);
  assert(findSentenceEndingAssignmentLeaks(packet).length === 0,
    `${label}: filtra una asignación EN/ES, incluso anidada.`);
  assert(findPii(packet).length === 0, `${label}: contiene PII learner/contact.`);
}

function sourceAssets(catalog) {
  const sets = catalog.IELTS_MATCHING_SENTENCE_ENDINGS_PASSAGES;
  assert(Array.isArray(sets), 'Falta IELTS_MATCHING_SENTENCE_ENDINGS_PASSAGES.');
  return sets.map((set, setIndex) => ({
    assetId: `formative:matching-sentence-endings:${set.id}`,
    id: set.id,
    setIndex,
    title: set.title,
    instructions: set.instructions,
    passageTitle: set.passageTitle,
    passage: set.passage,
    endings: set.endingOptions,
    decisions: set.questions.map((question, questionIndex) => ({ ...question, questionIndex })),
    wordCount: wordCount(set.passage),
    sourceObjectSha256: sha256(stableJson(set)),
    passageSha256: sha256(normalizeText(`${set.passageTitle}\n${set.passage}`)),
  }));
}

function connector(text) {
  const normalized = normalizeText(text).toLowerCase();
  return ['only when', 'although', 'because', 'unless', 'without', 'before', 'when', 'while',
    'where', 'if', 'by', 'as'].find(value =>
    normalized === value || normalized.startsWith(`${value} `)) ?? 'other';
}

function longestRun(values) {
  let best = 0;
  let current = 0;
  let prior = null;
  for (const value of values) {
    current = value === prior ? current + 1 : 1;
    prior = value;
    best = Math.max(best, current);
  }
  return best;
}

const LEXICAL_STOPWORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'although', 'because', 'before', 'by', 'can', 'for',
  'from', 'if', 'in', 'into', 'is', 'it', 'may', 'more', 'not', 'of', 'on', 'only',
  'or', 'than', 'that', 'the', 'their', 'they', 'this', 'through', 'to', 'use', 'used',
  'when', 'where', 'while', 'with', 'without',
]);

function lexicalOverlap(source, ending) {
  const tokens = value => (normalizeText(value).toLowerCase().match(/[a-z]+/gu) ?? [])
    .filter(token => !LEXICAL_STOPWORDS.has(token));
  const sourceTokens = new Set(tokens(source));
  const endingTokens = [...new Set(tokens(ending))];
  return endingTokens.length
    ? endingTokens.filter(token => sourceTokens.has(token)).length / endingTokens.length : 0;
}

function predictorSummary(rows, scoreCandidates) {
  let eligible = 0;
  let tiesOrAbstentions = 0;
  let hits = 0;
  const detail = [];
  for (const row of rows) {
    const scores = scoreCandidates(row);
    const best = Math.max(...scores.map(candidate => candidate.score));
    const winners = scores.filter(candidate => candidate.score === best);
    if (winners.length === 1) {
      eligible += 1;
      if (winners[0].endingId === row.answer) hits += 1;
    } else tiesOrAbstentions += 1;
    detail.push({ questionId: row.decision.id, storedEndingId: row.answer, scores });
  }
  return {
    eligible, tiesOrAbstentions, hits,
    conditionalAccuracy: eligible ? hits / eligible : null,
    totalAccuracy: hits / rows.length,
    rows: detail,
  };
}

function structuralBiasProfile(assets, answerByQuestionId) {
  const rows = assets.flatMap(asset => asset.decisions.map(decision => ({
    asset, decision, answer: answerByQuestionId.get(decision.id),
  })));
  assert(rows.every(row => row.asset.endings.some(ending => ending.id === row.answer)),
    'Hay claves sin ending vinculado.');
  const sequence = rows.map(row => row.answer);
  const answerCounts = Object.fromEntries(ENDING_IDS.map(id =>
    [id, sequence.filter(answer => answer === id).length]));
  const moduloHits = rows.filter(row =>
    row.asset.endings[row.decision.questionIndex % row.asset.endings.length].id === row.answer).length;
  const overlap = predictorSummary(rows, row => row.asset.endings.map(ending => ({
    endingId: ending.id,
    score: lexicalOverlap(row.decision.sentenceStart, ending.text),
  })));
  const longest = predictorSummary(rows, row => row.asset.endings.map(ending => ({
    endingId: ending.id,
    words: tokenCount(ending.text),
    score: tokenCount(ending.text),
  })));
  const connectorCounts = Object.fromEntries([...new Set(assets.flatMap(asset =>
    asset.endings.map(ending => connector(ending.text))))].sort().map(name => [name,
    assets.flatMap(asset => asset.endings).filter(ending => connector(ending.text) === name).length]));
  const correctConnectorCounts = Object.fromEntries([...new Set(assets.flatMap(asset =>
    asset.endings.map(ending => connector(ending.text))))].sort().map(name => [name,
    rows.filter(row => connector(row.asset.endings.find(ending => ending.id === row.answer).text) === name)
      .length]));
  const perSet = assets.map(asset => {
    const answers = asset.decisions.map(decision => answerByQuestionId.get(decision.id));
    const counts = Object.fromEntries(ENDING_IDS.map(id =>
      [id, answers.filter(answer => answer === id).length]));
    return {
      assetId: asset.assetId,
      reusePolicy: /may be used more than once/iu.test(asset.instructions) ? 'allowed' :
        /(?:only once|cannot be used more than once)/iu.test(asset.instructions) ? 'prohibited' :
          'not-declared',
      answerSequence: answers,
      answerCounts: counts,
      reusedEndingIds: ENDING_IDS.filter(id => counts[id] > 1),
      unusedEndingIds: ENDING_IDS.filter(id => counts[id] === 0),
    };
  });
  const sameQuestionPositionAcrossSetsModalEnding = Array.from({ length: 6 }, (_, position) => {
    const answers = assets.map(asset => answerByQuestionId.get(asset.decisions[position].id));
    const counts = Object.fromEntries(ENDING_IDS.map(id =>
      [id, answers.filter(answer => answer === id).length]));
    return Math.max(...Object.values(counts));
  }).reduce((sum, value) => sum + value, 0);
  return {
    answerCounts,
    globalConcatenatedMaxSameLabelRun: longestRun(sequence),
    perSetMaxSameLabelRun: Math.max(...perSet.map(row => longestRun(row.answerSequence))),
    setsWithStrictlyAscendingStoredSelectionOrder: perSet.filter(row =>
      row.answerSequence.every((id, index) => index === 0 ||
        ENDING_IDS.indexOf(id) > ENDING_IDS.indexOf(row.answerSequence[index - 1]))).length,
    sameQuestionPositionAcrossSetsModalEnding: {
      eligible: rows.length,
      positions: 6,
      hits: sameQuestionPositionAcrossSetsModalEnding,
    },
    questionPositionModuloEndingCount: {
      definition: 'Within each set, predict the ending at zero-based question position modulo eight.',
      eligible: rows.length,
      tiesOrAbstentions: 0,
      hits: moduloHits,
      conditionalAccuracy: moduloHits / rows.length,
      totalAccuracy: moduloHits / rows.length,
    },
    highestSentenceStartEndingLexicalOverlapPredictsAnswer: overlap,
    longestEndingWordCountPredictsAnswer: {
      ...longest,
      definition: 'Count lowercase ASCII alphanumeric word tokens in ending text; hyphens split.',
    },
    visibleConnectiveProfile: {
      endingCandidateCounts: connectorCounts,
      storedCorrectCounts: correctConnectorCounts,
      endingCandidatesVisiblePreResponse: 24,
    },
    storedSelectionReuse: {
      declaredReusePolicy: perSet.every(row => row.reusePolicy === 'not-declared')
        ? 'not-declared' : 'mixed-or-declared',
      setsWithReuse: perSet.filter(row => row.reusedEndingIds.length > 0).length,
      reusedAssignments: perSet.reduce((sum, row) => sum +
        Object.values(row.answerCounts).reduce((inner, count) => inner + Math.max(0, count - 1), 0), 0),
      usedEndingsPerSet: perSet.map(row => ENDING_IDS.length - row.unusedEndingIds.length),
      unusedEndingsPerSet: perSet.map(row => row.unusedEndingIds.length),
    },
    perSet,
    sequenceProfile: { answerSequence: sequence },
  };
}

export function buildStoredStructuralBiasProfile() {
  const assets = sourceAssets(loadTsModule(CATALOG_PATH));
  return structuralBiasProfile(assets, new Map(assets.flatMap(asset =>
    asset.decisions.map(decision => [decision.id, decision.answer]))));
}

export function assertUnitCardinality(assets) {
  const assetIds = assets.map(asset => asset.assetId);
  const questionIds = assets.flatMap(asset => asset.decisions.map(row => row.id));
  const endingCount = assets.reduce((sum, asset) => sum + asset.endings.length, 0);
  assert(stableJson(assetIds) === stableJson(EXPECTED_ASSET_IDS) &&
    stableJson(questionIds) === stableJson(EXPECTED_QUESTION_IDS) && endingCount === 24,
  'Matching Sentence Endings: IDs o cardinalidad 3/18/24 inválidos.');
  return true;
}

function resolveLocalSourceImport(fromAbsolutePath, specifier) {
  if (!(specifier.startsWith('@/') || specifier.startsWith('.'))) return null;
  const unresolved = specifier.startsWith('@/')
    ? resolve(ROOT, 'src', specifier.slice(2)) : resolve(dirname(fromAbsolutePath), specifier);
  const candidates = [
    unresolved,
    ...['.ts', '.tsx', '.js', '.jsx', '.mjs', '.css'].map(extension => `${unresolved}${extension}`),
    ...['.ts', '.tsx', '.js', '.jsx', '.mjs'].map(extension => resolve(unresolved, `index${extension}`)),
  ];
  return candidates.find(candidate => existsSync(candidate) &&
    /\.(?:ts|tsx|js|jsx|mjs|css)$/u.test(candidate)) ?? null;
}

export function renderDependencyClosure(entryPaths) {
  const pending = entryPaths.map(path => resolve(ROOT, path));
  const visited = new Set();
  while (pending.length) {
    const absolutePath = pending.pop();
    if (visited.has(absolutePath) || !existsSync(absolutePath)) continue;
    visited.add(absolutePath);
    const source = readFileSync(absolutePath, 'utf8');
    const specifiers = [
      ...source.matchAll(/\b(?:import|export)\s+(?:type\s+)?(?:[^'";]*?\s+from\s+)?['"]([^'"]+)['"]/gu),
      ...source.matchAll(/\bimport\(\s*['"]([^'"]+)['"]\s*\)/gu),
      ...source.matchAll(/@import\s+(?:url\()?\s*['"]([^'"]+)['"]/gu),
    ].map(match => match[1]);
    for (const specifier of specifiers) {
      const dependency = resolveLocalSourceImport(absolutePath, specifier);
      if (dependency && !visited.has(dependency)) pending.push(dependency);
    }
  }
  return [...visited].sort();
}

function sourceFilesUnder(path) {
  return readdirSync(resolve(ROOT, path), { recursive: true, withFileTypes: true })
    .filter(entry => entry.isFile() && /\.(?:ts|tsx|js|jsx|mjs)$/u.test(entry.name))
    .map(entry => resolve(entry.parentPath, entry.name));
}

export function assertNextUnitPinned(baseline) {
  const nextSets = loadTsModule(CATALOG_PATH).IELTS_SENTENCE_COMPLETION_PASSAGES;
  assert(Array.isArray(nextSets) && nextSets.length === 3,
    'F0.2b.8 no conserva exactamente tres objetos de catálogo.');
  const objectHashes = Object.fromEntries(nextSets.map(set => [set.id, sha256(stableJson(set))]));
  assertExactKeys(baseline.nextUnit,
    ['unit', 'format', 'sourceSha256', 'routeObjectSha256', 'sourceObjectSha256'],
    'baseline.nextUnit');
  assert(baseline.nextUnit.unit === 'F0.2b.8' &&
    baseline.nextUnit.format === 'sentence-completion' &&
    /^[a-f0-9]{64}$/u.test(baseline.nextUnit.routeObjectSha256) &&
    stableJson(Object.keys(baseline.nextUnit.sourceSha256).sort()) ===
    stableJson([...NEXT_UNIT_PATHS].sort()) &&
    Object.entries(baseline.nextUnit.sourceSha256).every(([path, expected]) =>
      sourceMatchesReviewedSnapshot(path, expected)) &&
    stableJson(baseline.nextUnit.sourceObjectSha256) === stableJson(objectHashes),
  'F0.2b.8 cambió o su pin route/engine/bank/objetos es incompleto.');
  return true;
}

export function assertBoardStopBoundary(loopDocText) {
  const priorClosed =
    '| 0 | 　　　 ↳ F0.2b.6 Matching Features | ✅ | ✅ | ✅ | ✅ | ✅ | ➖ | ➖ |';
  const currentClosed =
    '| 0 | 　　　 ↳ F0.2b.7 Matching Sentence Endings | ✅ | ✅ | ✅ | ✅ | ✅ | ➖ | ➖ |';
  const successorClosed =
    '| 0 | 　　　 ↳ F0.2b.8 Sentence Completion | ✅ | ✅ | ✅ | ✅ | ✅ | ➖ | ➖ |';
  const nextOpen =
    '| 0 | 　　　 ↳ F0.2b.9 Summary Completion | — | — | — | — | — | — | — |';
  const nextClosed =
    '| 0 | 　　　 ↳ F0.2b.9 Summary Completion | ✅ | ✅ | ✅ | ✅ | ✅ | ➖ | ➖ |';
  const parentOpen =
    '| 0 | 　 ↳ F0.2b Adjudicación de bancos formativos — padre | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 |';
  const stop = 'Siguiente subunidad, sin iniciarla: ' + String.fromCharCode(96) +
    'F0.2b.9 Summary Completion' + String.fromCharCode(96) + '.';
  const rows = loopDocText.split(/\r?\n/gu);
  const exactOnce = (needle, label) => {
    const matching = rows.filter(row => row.includes(label));
    assert(matching.length === 1 && matching[0] === needle,
      `${label}: debe existir una sola fila exacta.`);
  };
  exactOnce(priorClosed, '↳ F0.2b.6 Matching Features');
  exactOnce(currentClosed, '↳ F0.2b.7 Matching Sentence Endings');
  exactOnce(successorClosed, '↳ F0.2b.8 Sentence Completion');
  const nextRows = rows.filter(row => row.includes('↳ F0.2b.9 Summary Completion'));
  assert(nextRows.length === 1 && [nextOpen, nextClosed].includes(nextRows[0]),
    'F0.2b.9 Summary Completion: debe existir una sola fila exacta con progreso monotónico.');
  exactOnce(parentOpen, '↳ F0.2b Adjudicación de bancos formativos — padre');
  assert(loopDocText.split(stop).length - 1 === 1,
    'El corte antes de F0.2b.9 debe aparecer exactamente una vez.');
  const nextMentions = rows.filter(row => /F0\.2b\.9 Summary Completion/iu.test(row));
  assert(nextRows[0] === nextClosed || !nextMentions.some(row =>
    /(?:iniciad[oa]|started|en curso|cerrad[oa]|completed)/iu.test(row) && !row.includes(stop)),
  'F0.2b.9 tiene una declaración contradictoria con el corte de no inicio.');
  return true;
}

function basePacket(schemaVersion, reviewScope, reviewerIsolation, taskRule, instruction, excludes,
  records) {
  return {
    schemaVersion, generatedAt: PACKETS_GENERATED_AT, reviewScope, reviewerIsolation,
    taskRule, instruction, excludes, records,
  };
}

export function buildConnectiveOnlyPacket() {
  const assets = sourceAssets(loadTsModule(CATALOG_PATH));
  assertUnitCardinality(assets);
  const packet = basePacket(
    'ielts-reading-matching-sentence-endings-connective-only.v1',
    'F0.2b.7 — connective-only shortcut audit over 18 questions',
    'Use only connectors and sentence starts. Do not open passages, full endings, keys, other packets or prior reviews.',
    'Predict the logical relation requested by each sentence start, then record which visible connective classes could complete it.',
    'Do not reconstruct or guess stored keys. This packet measures whether visible connectives create a shortcut without passage evidence.',
    ['passages', 'full ending text', 'answer keys', 'explanations', 'traps', 'prior verdicts', 'student data'],
    assets.map(asset => ({
      assetId: asset.assetId,
      sourceObjectSha256: asset.sourceObjectSha256,
      endingConnectives: asset.endings.map(ending => ({
        endingId: ending.id,
        visibleConnective: connector(ending.text),
      })),
      sentenceStarts: asset.decisions.map(decision => ({
        questionId: decision.id,
        sentenceStart: decision.sentenceStart,
      })),
    })),
  );
  assertCleanPacket(packet, 'connective-only packet');
  return packet;
}

export function buildSurfaceOnlyPacket() {
  const assets = sourceAssets(loadTsModule(CATALOG_PATH));
  assertUnitCardinality(assets);
  const packet = basePacket(
    'ielts-reading-matching-sentence-endings-surface-only.v1',
    'F0.2b.7 — grammar and generic-coherence shortcut audit over 18 questions',
    'Use only sentence starts and full ending options. Do not open passages, keys, connective verdicts, blind packets or prior reviews.',
    'For every question, record all grammatically compatible endings and all endings that remain generically coherent without passage evidence. Mark a unique candidate only when exactly one survives that stated filter.',
    'This is an adversarial surface-form audit, not an IELTS answer adjudication.',
    ['passages', 'answer keys', 'explanations', 'traps', 'prior verdicts', 'student data'],
    assets.map(asset => ({
      assetId: asset.assetId,
      sourceObjectSha256: asset.sourceObjectSha256,
      endingOptions: asset.endings.map(ending => ({ endingId: ending.id, text: ending.text })),
      sentenceStarts: asset.decisions.map(decision => ({
        questionId: decision.id,
        sentenceStart: decision.sentenceStart,
      })),
    })),
  );
  assertCleanPacket(packet, 'surface-only packet');
  return packet;
}

export function buildBlindReviewPacket() {
  const assets = sourceAssets(loadTsModule(CATALOG_PATH));
  assertUnitCardinality(assets);
  const packet = basePacket(
    'ielts-reading-matching-sentence-endings-blind-review.v1',
    'F0.2b.7 — clean one-best-answer adjudication over three passages',
    'Use only this packet. Do not open the catalog, registry, validator, runtime, connective/surface verdicts, factual packet or prior audits until all 18 decisions are persisted.',
    'Choose one ending that completes each sentence according to the passage. More endings are provided than sentence starts. Reuse is not declared by the supplied instructions, so do not infer a reuse rule.',
    'For all 18 questions, persist the completed sentence, logical relation, exact passage evidence, all eight candidate assessments, closest competitor and ambiguity. Do not use outside knowledge.',
    ['answer keys', 'explanations', 'traps', 'hints', 'prior verdicts', 'factual sources', 'student data'],
    assets.map(asset => ({
      assetId: asset.assetId,
      title: asset.title,
      sourceObjectSha256: asset.sourceObjectSha256,
      passageSha256: asset.passageSha256,
      instructions: asset.instructions,
      passageTitle: asset.passageTitle,
      passage: asset.passage,
      endingOptions: asset.endings.map(ending => ({ endingId: ending.id, text: ending.text })),
      sentenceStarts: asset.decisions.map(decision => ({
        questionId: decision.id,
        sentenceStart: decision.sentenceStart,
      })),
    })),
  );
  assertCleanPacket(packet, 'blind packet');
  return packet;
}

export function buildFactualSourceReviewPacket() {
  const registry = loadTsModule(REGISTRY_PATH).IELTS_READING_RIGHTS_REGISTRY;
  const evidenceById = new Map(registry.evidence.map(row => [row.id, row]));
  const records = EXPECTED_ASSET_IDS.map(assetId => {
    const registryRows = registry.entries.filter(row => row.assetId === assetId);
    assert(registryRows.length === 1, `${assetId}: se esperaba un registro global.`);
    const record = registryRows[0];
    assert(record.factualSourceResearch.sourceEvidenceIds.length === 5,
      `${assetId}: se esperaban cinco fuentes factuales candidatas.`);
    return {
      assetId,
      claimSpansToReview: REQUIRED_FACTUAL_CLAIM_SPANS[assetId],
      candidateSources: record.factualSourceResearch.sourceEvidenceIds.map(evidenceId => {
        const evidence = evidenceById.get(evidenceId);
        assert(evidence?.kind === 'factual-source', `${assetId}: fuente factual inválida.`);
        return {
          evidenceId: evidence.id,
          label: evidence.label,
          url: evidence.url,
          note: evidence.note,
        };
      }),
      limitation: record.factualSourceResearch.limitation,
    };
  });
  const packet = {
    schemaVersion: 'ielts-reading-matching-sentence-endings-factual-source-review.v1',
    generatedAt: PACKETS_GENERATED_AT,
    reviewScope: 'F0.2b.7 — second-pass factual-source review only',
    reviewerIsolation:
      'Open only after expert-first-pass.json is persisted and hashed. Do not change any sentence-ending decision after opening these sources.',
    instruction:
      'Open each source directly and assess every exact claim as supported, oversimplified, unsupported or untraceable. Availability and candidacy do not prove a claim, authorship, license, authorization or human verification.',
    excludes: ['answer keys', 'explanations', 'traps', 'prior answer verdicts', 'student data'],
    records,
  };
  assertCleanPacket(packet, 'factual packet');
  return packet;
}

function allQuestionContext(assets) {
  return new Map(assets.flatMap(asset => asset.decisions.map(decision => [decision.id, {
    asset,
    decision,
  }])));
}

function validateShortcutReviewer(verdict, schemaVersion, sourceContext, packetPath, label) {
  assertExactKeys(verdict, ['schemaVersion', 'reviewer', 'records'], label);
  assert(verdict.schemaVersion === schemaVersion, `${label}: schema inválido.`);
  assertExactKeys(verdict.reviewer,
    ['reviewerRunId', 'reviewedAt', 'packetSha256', 'sourceContext', 'humanSignature', 'notes'],
    `${label}.reviewer`);
  assert(typeof verdict.reviewer.reviewerRunId === 'string' && verdict.reviewer.reviewerRunId.trim() &&
    Number.isFinite(Date.parse(verdict.reviewer.reviewedAt)) &&
    verdict.reviewer.packetSha256 === sourceSha256(packetPath) &&
    verdict.reviewer.sourceContext === sourceContext && verdict.reviewer.humanSignature === false &&
    Array.isArray(verdict.reviewer.notes) && verdict.reviewer.notes.length > 0 &&
    verdict.reviewer.notes.every(note => typeof note === 'string' && note.trim()),
  `${label}: trazabilidad inválida.`);
}

function validateConnectiveVerdict(verdict, assets) {
  validateShortcutReviewer(
    verdict,
    'ielts-reading-matching-sentence-endings-connective-only-verdict.v1',
    'connective-only-packet-only',
    CONNECTIVE_PACKET_PATH,
    'connectiveVerdict',
  );
  assertExactIdCoverage(verdict.records, EXPECTED_QUESTION_IDS, 'questionId',
    'connectiveVerdict.records');
  const contexts = allQuestionContext(assets);
  for (const row of verdict.records) {
    assertExactKeys(row,
      ['questionId', 'predictedRelation', 'compatibleConnectives',
        'connectorCompatibleEndingIds', 'uniqueConnectorEndingId', 'reasoning'],
      `${row.questionId}:connective`);
    const context = contexts.get(row.questionId);
    assert(context && typeof row.predictedRelation === 'string' && row.predictedRelation.trim() &&
      Array.isArray(row.compatibleConnectives) && row.compatibleConnectives.length > 0 &&
      row.compatibleConnectives.every(value => typeof value === 'string' && value.trim()) &&
      Array.isArray(row.connectorCompatibleEndingIds) &&
      new Set(row.connectorCompatibleEndingIds).size === row.connectorCompatibleEndingIds.length &&
      row.connectorCompatibleEndingIds.every(id => ENDING_IDS.includes(id)) &&
      (row.uniqueConnectorEndingId === null ||
        (row.connectorCompatibleEndingIds.length === 1 &&
          row.uniqueConnectorEndingId === row.connectorCompatibleEndingIds[0])) &&
      (row.uniqueConnectorEndingId !== null || row.connectorCompatibleEndingIds.length !== 1) &&
      typeof row.reasoning === 'string' && row.reasoning.trim(),
    `${row.questionId}: dictamen connective-only inválido.`);
  }
}

function validateSurfaceVerdict(verdict, assets) {
  validateShortcutReviewer(
    verdict,
    'ielts-reading-matching-sentence-endings-surface-only-verdict.v1',
    'surface-only-packet-only',
    SURFACE_PACKET_PATH,
    'surfaceVerdict',
  );
  assertExactIdCoverage(verdict.records, EXPECTED_QUESTION_IDS, 'questionId',
    'surfaceVerdict.records');
  const contexts = allQuestionContext(assets);
  for (const row of verdict.records) {
    assertExactKeys(row,
      ['questionId', 'grammarCompatibleEndingIds', 'grammarOnlyUniqueEndingId',
        'genericCoherenceCandidateEndingIds', 'genericCoherenceUniqueEndingId', 'notes'],
      `${row.questionId}:surface`);
    assert(contexts.has(row.questionId), `${row.questionId}: question extra.`);
    for (const [arrayKey, uniqueKey] of [
      ['grammarCompatibleEndingIds', 'grammarOnlyUniqueEndingId'],
      ['genericCoherenceCandidateEndingIds', 'genericCoherenceUniqueEndingId'],
    ]) {
      const ids = row[arrayKey];
      assert(Array.isArray(ids) && ids.length > 0 && new Set(ids).size === ids.length &&
        ids.every(id => ENDING_IDS.includes(id)) &&
        (row[uniqueKey] === null || (ids.length === 1 && row[uniqueKey] === ids[0])) &&
        (row[uniqueKey] !== null || ids.length !== 1),
      `${row.questionId}: ${arrayKey}/${uniqueKey} inválido.`);
    }
    assert(typeof row.notes === 'string' && row.notes.trim(), `${row.questionId}: notes vacío.`);
  }
}

function completedSentence(asset, decision, endingId) {
  const ending = asset.endings.find(candidate => candidate.id === endingId);
  return normalizeText(`${decision.sentenceStart} ${ending?.text ?? ''}`);
}

function validateQuestionDecision(value, sourceDecision, asset, label) {
  assertExactKeys(value,
    ['questionId', 'selectedEndingId', 'completedSentence', 'logicalRelation', 'evidenceQuotes',
      'candidateAssessments', 'closestCompetingEndingId', 'competitorFailure', 'ambiguity',
      'reasoning'],
    label);
  assert(value.questionId === sourceDecision.id && ENDING_IDS.includes(value.selectedEndingId) &&
    asset.endings.some(ending => ending.id === value.selectedEndingId) &&
    normalizeText(value.completedSentence) === completedSentence(asset, sourceDecision,
      value.selectedEndingId) && typeof value.logicalRelation === 'string' &&
    value.logicalRelation.trim() && Array.isArray(value.evidenceQuotes) &&
    value.evidenceQuotes.length > 0 && new Set(value.evidenceQuotes.map(normalizeText)).size ===
      value.evidenceQuotes.length && value.evidenceQuotes.every(quote =>
      typeof quote === 'string' && quote.trim() &&
      normalizeText(asset.passage).includes(normalizeText(quote))) &&
    ENDING_IDS.includes(value.closestCompetingEndingId) &&
    value.closestCompetingEndingId !== value.selectedEndingId &&
    typeof value.competitorFailure === 'string' && value.competitorFailure.trim() &&
    ['none', 'minor', 'material'].includes(value.ambiguity) &&
    typeof value.reasoning === 'string' && value.reasoning.trim(),
  `${label}: decisión incompleta o evidencia no textual.`);
  assertExactIdCoverage(value.candidateAssessments, ENDING_IDS, 'endingId',
    `${label}.candidateAssessments`);
  for (const candidate of value.candidateAssessments) {
    assertExactKeys(candidate, ['endingId', 'grammarFit', 'oneBestStatus', 'note'],
      `${label}.${candidate.endingId}`);
    assert(['natural', 'strained', 'fails'].includes(candidate.grammarFit) &&
      ['best', 'plausible-but-inferior', 'contradicted', 'unrelated']
        .includes(candidate.oneBestStatus) &&
      typeof candidate.note === 'string' && candidate.note.trim(),
    `${label}.${candidate.endingId}: candidate assessment inválido.`);
  }
  const best = value.candidateAssessments.filter(candidate => candidate.oneBestStatus === 'best');
  assert(best.length === 1 && best[0].endingId === value.selectedEndingId,
    `${label}: debe haber exactamente un best y coincidir con selectedEndingId.`);
  assert(value.candidateAssessments.find(candidate =>
    candidate.endingId === value.closestCompetingEndingId).oneBestStatus === 'plausible-but-inferior',
  `${label}: closest competitor no está clasificado plausible-but-inferior.`);
}

function validateFirstPass(firstPass, assets, blindPacket) {
  assertExactKeys(firstPass, ['schemaVersion', 'reviewer', 'records'], 'firstPass');
  assert(firstPass.schemaVersion ===
    'ielts-reading-matching-sentence-endings-expert-first-pass.v1',
  'firstPass: schema inválido.');
  assertExactKeys(firstPass.reviewer,
    ['reviewerRunId', 'reviewedAt', 'blindPacketSha256', 'sourceContext',
      'humanSignature', 'notes'], 'firstPass.reviewer');
  assert(typeof firstPass.reviewer.reviewerRunId === 'string' &&
    firstPass.reviewer.reviewerRunId.trim() &&
    Number.isFinite(Date.parse(firstPass.reviewer.reviewedAt)) &&
    firstPass.reviewer.blindPacketSha256 === sourceSha256(BLIND_REVIEW_PATH) &&
    firstPass.reviewer.sourceContext === 'blind-review-packet-only' &&
    firstPass.reviewer.humanSignature === false &&
    hasNonEmptyNotes(firstPass.reviewer.notes),
  'firstPass: reviewer inválido.');
  assertExactIdCoverage(firstPass.records, EXPECTED_ASSET_IDS, 'assetId', 'firstPass.records');
  for (const asset of assets) {
    const record = firstPass.records.find(candidate => candidate.assetId === asset.assetId);
    assertExactKeys(record, ['assetId', 'passageAssessment', 'questions'], `${asset.assetId}:first`);
    assertExactKeys(record.passageAssessment,
      ['ieltsFitness', 'grammarShortcutRisk', 'visibleConnectiveRisk',
        'passageTitleCueRisk', 'notes'], `${asset.assetId}:first.assessment`);
    assert(['fit', 'mixed', 'unfit'].includes(record.passageAssessment.ieltsFitness) &&
      ['grammarShortcutRisk', 'visibleConnectiveRisk', 'passageTitleCueRisk'].every(key =>
        ['low', 'medium', 'high'].includes(record.passageAssessment[key])) &&
      hasNonEmptyNotes(record.passageAssessment.notes),
    `${asset.assetId}: first-pass assessment inválido.`);
    assertExactIdCoverage(record.questions, asset.decisions.map(row => row.id), 'questionId',
      `${asset.assetId}:first.questions`);
    for (const decision of asset.decisions) {
      validateQuestionDecision(record.questions.find(row => row.questionId === decision.id),
        decision, asset, `${decision.id}:first`);
    }
  }
  const count = firstPass.records.reduce((sum, row) => sum + row.questions.length, 0);
  assert(count === blindPacket.records.reduce((sum, row) => sum + row.sentenceStarts.length, 0),
    'First-pass no cubre exactamente el packet ciego.');
  return { fileSha256: sourceSha256(FIRST_PASS_PATH), questionCount: count };
}

function validateExpertVerdict(verdict, firstPass, firstTrace, assets, factualPacket) {
  assertExactKeys(verdict, ['schemaVersion', 'reviewer', 'records'], 'expertVerdict');
  assert(verdict.schemaVersion === 'ielts-reading-matching-sentence-endings-expert-verdict.v1',
    'expertVerdict: schema inválido.');
  assertExactKeys(verdict.reviewer,
    ['reviewerRunId', 'reviewedAt', 'blindPacketSha256', 'firstPassSha256',
      'openedEvidenceIds', 'sourceContext', 'reviewSequence', 'directSourceReview',
      'humanSignature', 'notes'], 'expertVerdict.reviewer');
  const expectedEvidenceIds = factualPacket.records.flatMap(row =>
    row.candidateSources.map(source => source.evidenceId)).sort();
  assert(verdict.reviewer.reviewerRunId === firstPass.reviewer.reviewerRunId &&
    Number.isFinite(Date.parse(verdict.reviewer.reviewedAt)) &&
    verdict.reviewer.blindPacketSha256 === sourceSha256(BLIND_REVIEW_PATH) &&
    verdict.reviewer.firstPassSha256 === firstTrace.fileSha256 &&
    stableJson([...verdict.reviewer.openedEvidenceIds].sort()) === stableJson(expectedEvidenceIds) &&
    verdict.reviewer.sourceContext === 'two-pass-blind-then-factual-sources' &&
    stableJson(verdict.reviewer.reviewSequence) ===
      stableJson(['blind-review', 'factual-source-review']) &&
    verdict.reviewer.directSourceReview === true && verdict.reviewer.humanSignature === false &&
    hasNonEmptyNotes(verdict.reviewer.notes),
  'expertVerdict: trazabilidad inválida.');
  assertExactIdCoverage(verdict.records, EXPECTED_ASSET_IDS, 'assetId', 'expertVerdict.records');
  const comparisons = [];
  const factualClaims = [];
  const evidenceOffsets = [];
  for (const asset of assets) {
    const record = verdict.records.find(row => row.assetId === asset.assetId);
    const prior = firstPass.records.find(row => row.assetId === asset.assetId);
    const factualRecord = factualPacket.records.find(row => row.assetId === asset.assetId);
    assertExactKeys(record, ['assetId', 'passageAssessment', 'questions', 'factualClaims'],
      `${asset.assetId}:expert`);
    assertExactKeys(record.passageAssessment,
      ['ieltsFitness', 'factualRisk', 'representationRisk', 'priorKnowledgeRisk',
        'irrelevantLoadRisk', 'grammarShortcutRisk', 'visibleConnectiveRisk',
        'passageTitleCueRisk', 'notes'], `${asset.assetId}:expert.assessment`);
    assert(['fit', 'mixed', 'unfit'].includes(record.passageAssessment.ieltsFitness) &&
      ['factualRisk', 'representationRisk', 'priorKnowledgeRisk', 'irrelevantLoadRisk',
        'grammarShortcutRisk', 'visibleConnectiveRisk', 'passageTitleCueRisk'].every(key =>
        ['low', 'medium', 'high'].includes(record.passageAssessment[key])) &&
      hasNonEmptyNotes(record.passageAssessment.notes),
    `${asset.assetId}: expert passage assessment inválido.`);
    assertExactIdCoverage(record.questions, asset.decisions.map(row => row.id), 'questionId',
      `${asset.assetId}:expert.questions`);
    for (const sourceDecision of asset.decisions) {
      const decision = record.questions.find(row => row.questionId === sourceDecision.id);
      const firstDecision = prior.questions.find(row => row.questionId === sourceDecision.id);
      validateQuestionDecision(decision, sourceDecision, asset, `${sourceDecision.id}:expert`);
      assert(stableJson(decision) === stableJson(firstDecision),
        `${sourceDecision.id}: cambió tras abrir fuentes factuales.`);
      const offset = normalizeText(asset.passage).indexOf(normalizeText(decision.evidenceQuotes[0]));
      assert(offset >= 0, `${sourceDecision.id}: quote sin offset.`);
      evidenceOffsets.push({ assetId: asset.assetId, questionId: sourceDecision.id, offset });
      comparisons.push({
        questionId: sourceDecision.id,
        expertEndingId: decision.selectedEndingId,
        matchesStoredKey: decision.selectedEndingId === sourceDecision.answer,
        ambiguity: decision.ambiguity,
      });
    }
    const expectedClaims = REQUIRED_FACTUAL_CLAIM_SPANS[asset.assetId];
    assertExactIdCoverage(record.factualClaims, expectedClaims, 'claim',
      `${asset.assetId}:factualClaims`);
    for (const claim of record.factualClaims) {
      assertExactKeys(claim, ['claim', 'assessment', 'evidenceIds', 'sourceFindings', 'note'],
        `${asset.assetId}:claim`);
      assert(['supported', 'oversimplified', 'unsupported', 'untraceable']
        .includes(claim.assessment) && Array.isArray(claim.evidenceIds) &&
        claim.evidenceIds.length > 0 && new Set(claim.evidenceIds).size ===
          claim.evidenceIds.length && claim.evidenceIds.every(id =>
          factualRecord.candidateSources.some(source => source.evidenceId === id)) &&
        Array.isArray(claim.sourceFindings) && claim.sourceFindings.length > 0 &&
        typeof claim.note === 'string' && claim.note.trim(),
      `${asset.assetId}: factual claim inválido.`);
      assertExactIdCoverage(claim.sourceFindings, claim.evidenceIds, 'evidenceId',
        `${asset.assetId}:sourceFindings`);
      claim.sourceFindings.forEach(finding => {
        assertExactKeys(finding, ['evidenceId', 'locator', 'evidenceSummary'],
          `${asset.assetId}:sourceFinding`);
        assert(typeof finding.locator === 'string' && finding.locator.trim() &&
          typeof finding.evidenceSummary === 'string' && finding.evidenceSummary.trim(),
        `${asset.assetId}: source finding vacío.`);
      });
      factualClaims.push({ ...claim, assetId: asset.assetId });
    }
  }
  const orderViolations = [];
  for (const asset of assets) {
    const rows = evidenceOffsets.filter(row => row.assetId === asset.assetId);
    for (let index = 1; index < rows.length; index += 1) {
      if (rows[index].offset <= rows[index - 1].offset) orderViolations.push(rows[index].questionId);
    }
  }
  assert(stableJson(orderViolations) === stableJson(EXPECTED_TEXT_ORDER_VIOLATIONS),
    `La auditoría de orden textual esperaba solo ${EXPECTED_TEXT_ORDER_VIOLATIONS.join(', ')}; observó ${orderViolations.join(', ')}.`);
  return { comparisons, factualClaims, evidenceOffsets, orderViolations };
}

function validateStudentWalkthrough(walkthrough, assets) {
  assertExactKeys(walkthrough, ['schemaVersion', 'reviewer', 'records'], 'walkthrough');
  assert(walkthrough.schemaVersion ===
    'ielts-reading-matching-sentence-endings-student-walkthrough.v1',
  'walkthrough: schema inválido.');
  assertExactKeys(walkthrough.reviewer,
    ['humanSignature', 'sourceContext', 'reviewedAt', 'notes'], 'walkthrough.reviewer');
  assert(walkthrough.reviewer.humanSignature === false &&
    walkthrough.reviewer.sourceContext === 'blind-review-packet-only' &&
    Number.isFinite(Date.parse(walkthrough.reviewer.reviewedAt)) &&
    Array.isArray(walkthrough.reviewer.notes) && walkthrough.reviewer.notes.length > 0 &&
    walkthrough.reviewer.notes.every(note => typeof note === 'string' && note.trim()),
  'walkthrough: reviewer inválido.');
  assertCleanPacket(walkthrough, 'walkthrough');
  assertExactIdCoverage(walkthrough.records, EXPECTED_ASSET_IDS, 'assetId', 'walkthrough.records');
  let questionsCovered = 0;
  for (const asset of assets) {
    const record = walkthrough.records.find(row => row.assetId === asset.assetId);
    assertExactKeys(record,
      ['assetId', 'passageBarrier', 'grammarOnlyShortcutRisk', 'visibleConnectiveRisk',
        'shortcutRisks', 'transferValue', 'nextAction', 'questionWalkthrough'],
      `${asset.assetId}:walkthrough`);
    assert(typeof record.passageBarrier === 'string' && record.passageBarrier.trim() &&
      ['low', 'medium', 'high'].includes(record.grammarOnlyShortcutRisk) &&
      ['low', 'medium', 'high'].includes(record.visibleConnectiveRisk) &&
      Array.isArray(record.shortcutRisks) && record.shortcutRisks.length >= 2 &&
      record.shortcutRisks.every(value => typeof value === 'string' && value.trim()) &&
      typeof record.transferValue === 'string' && record.transferValue.trim() &&
      typeof record.nextAction === 'string' && record.nextAction.trim(),
    `${asset.assetId}: walkthrough incompleto.`);
    assertExactIdCoverage(record.questionWalkthrough,
      asset.decisions.map(row => row.id), 'questionId', `${asset.assetId}:walkthrough.questions`);
    for (const sourceDecision of asset.decisions) {
      const row = record.questionWalkthrough.find(item => item.questionId === sourceDecision.id);
      assertExactKeys(row,
        ['questionId', 'likelyMisread', 'predictedRelation', 'grammarFilterRisk',
          'connectiveShortcutRisk', 'evidenceSearch', 'endingComparison', 'competitorCheck',
          'decisionRule', 'repairAction'], `${sourceDecision.id}:walkthrough`);
      assert(Object.values(row).every(value => typeof value === 'string' && value.trim()),
        `${sourceDecision.id}: walkthrough vacío.`);
      questionsCovered += 1;
    }
  }
  return { passagesCovered: assets.length, questionsCovered };
}

export function validateStudentWalkthroughDocument(walkthrough) {
  return validateStudentWalkthrough(walkthrough, sourceAssets(loadTsModule(CATALOG_PATH)));
}

function validateSourceAvailability(ledger, registry, unitRecords) {
  assertExactKeys(ledger,
    ['schemaVersion', 'checkedAt', 'method', 'sources', 'interpretation'],
    'sourceAvailability');
  assert(ledger.schemaVersion ===
    'ielts-reading-matching-sentence-endings-source-availability.v1' &&
    strictCalendarDate(ledger.checkedAt, 'sourceAvailability.checkedAt') &&
    ledger.method.includes('response-body SHA-256') &&
    ledger.interpretation.includes('do not establish') &&
    ledger.interpretation.includes('authorship'),
  'sourceAvailability: metadata inválida.');
  const expectedIds = [OFFICIAL_EVIDENCE_ID, ...unitRecords.flatMap(record =>
    record.factualSourceResearch.sourceEvidenceIds)].sort();
  assert(expectedIds.length === 16 && new Set(expectedIds).size === 16,
    'La unidad requiere 1 fuente oficial + 15 fuentes factuales únicas.');
  assertExactIdCoverage(ledger.sources, expectedIds, 'evidenceId', 'sourceAvailability.sources');
  const evidenceById = new Map(registry.evidence.map(row => [row.id, row]));
  ledger.sources.forEach((source, index) => {
    assertExactKeys(source,
      ['evidenceId', 'requestedUrl', 'retrievedAt', 'httpStatus', 'finalUrl', 'redirected',
        'contentType', 'sizeBytes', 'bodySha256', 'availabilityStatus',
        'claimVerificationStatus'], `sourceAvailability.sources[${index}]`);
    const evidence = evidenceById.get(source.evidenceId);
    assert(evidence?.url === source.requestedUrl && Number.isFinite(Date.parse(source.retrievedAt)) &&
      source.retrievedAt.slice(0, 10) === ledger.checkedAt &&
      Number.isInteger(source.httpStatus) && source.httpStatus >= 100 && source.httpStatus <= 599 &&
      typeof source.finalUrl === 'string' && source.finalUrl.trim() &&
      typeof source.redirected === 'boolean' &&
      (source.contentType === null || typeof source.contentType === 'string') &&
      Number.isInteger(source.sizeBytes) && source.sizeBytes >= 0 &&
      (source.bodySha256 === null || /^[a-f0-9]{64}$/u.test(source.bodySha256)) &&
      source.availabilityStatus === (source.httpStatus === 200 ? 'retrieved' : 'not-retrieved') &&
      source.claimVerificationStatus === 'not-performed',
    `${source.evidenceId}: ledger inválido.`);
    if (source.httpStatus === 200) {
      assert(source.sizeBytes > 1000 && /^[a-f0-9]{64}$/u.test(source.bodySha256),
        `${source.evidenceId}: respuesta 200 sin cuerpo fijado.`);
    }
  });
}

function validateProvenanceSearch(ledger) {
  assertExactKeys(ledger,
    ['schemaVersion', 'searchedAt', 'method', 'searchSurface', 'queries', 'interpretation'],
    'provenanceSearch');
  assert(ledger.schemaVersion ===
    'ielts-reading-matching-sentence-endings-provenance-search.v1' &&
    Number.isFinite(Date.parse(ledger.searchedAt)) &&
    ledger.interpretation.includes('non-exhaustive') &&
    ledger.interpretation.includes('does not prove originality'),
  'provenanceSearch: metadata inválida.');
  assertExactIdCoverage(ledger.queries, EXPECTED_ASSET_IDS, 'assetId', 'provenanceSearch.queries');
  for (const query of ledger.queries) {
    assertExactKeys(query, ['assetId', 'query', 'resultsReviewed', 'outcome'],
      `${query.assetId}:provenance`);
    assert(typeof query.query === 'string' && query.query.trim() &&
      query.outcome === 'no-exact-match-in-reviewed-results' &&
      Array.isArray(query.resultsReviewed) && query.resultsReviewed.length >= 2,
    `${query.assetId}: búsqueda incompleta.`);
    query.resultsReviewed.forEach((result, index) => {
      assertExactKeys(result, ['title', 'url', 'reasonNotExactMatch'],
        `${query.assetId}:result[${index}]`);
      assert(Object.values(result).every(value => typeof value === 'string' && value.trim()),
        `${query.assetId}: resultado vacío.`);
    });
  }
}

function referencedEvidenceIds(record) {
  return [
    ...record.moduleAssessment.evidenceIds,
    ...record.authorship.evidenceIds,
    ...record.provenanceAssessment.evidenceIds,
    ...record.rightsAssessment.evidenceIds,
    ...record.factualSourceResearch.sourceEvidenceIds,
    ...record.factualReview.sourceEvidenceIds,
    ...record.humanReview.evidenceIds,
  ];
}

export function assertDecisionQuarantined(decision, label = 'decision') {
  assert(decision.rightsBasis === 'unknown-quarantined' &&
    decision.disposition === 'quarantine' && decision.eligibleForPublicationPipeline === false &&
    ['authorship-unresolved', 'factual-review-incomplete', 'human-review-pending',
      'rights-unresolved'].every(code => decision.reasonCodes.includes(code)),
  `${label}: la cuarentena exacta fue debilitada.`);
  return true;
}

function validateAuditVerdicts(audit, facts = null) {
  assertExactKeys(audit, ['schemaVersion', 'reviewedAt', 'status', 'passMeaning', 'rows'],
    'auditVerdicts');
  assert(audit.schemaVersion === 'ielts-reading-matching-sentence-endings-audit-verdicts.v1' &&
    audit.status === 'pass' && Number.isFinite(Date.parse(audit.reviewedAt)) &&
    /quarantined/iu.test(audit.passMeaning) && /blocked/iu.test(audit.passMeaning),
  'auditVerdicts sobredeclara aprobación.');
  const expected = [
    ['Rights and provenance', '✅'],
    ['Full-stack and data', '✅'],
    ['IELTS expert', '✅'],
    ['Cognitive walkthrough', '✅'],
    ['Anti-bias and leakage', '✅'],
    ['UI/UX and accessibility', '➖'],
    ['Playwright', '➖'],
  ];
  assertExactIdCoverage(audit.rows, expected.map(row => row[0]), 'lane', 'auditVerdicts.rows');
  for (const [lane, mark] of expected) {
    const row = audit.rows.find(candidate => candidate.lane === lane);
    assertExactKeys(row, ['lane', 'boardMark', 'scope', 'findings', 'blockersCarriedForward'],
      `${lane}:audit`);
    assert(row.boardMark === mark && [row.scope, row.findings, row.blockersCarriedForward]
      .every(value => typeof value === 'string' && value.trim()), `${lane}: audit incompleto.`);
  }
  if (!facts) return;
  const byLane = new Map(audit.rows.map(row => [row.lane, row]));
  assert(byLane.get('Rights and provenance').findings.includes(`3/3`) &&
    /license|authorship/iu.test(byLane.get('Rights and provenance').blockersCarriedForward),
  'Carril de derechos contradice cuarentena.');
  assert(byLane.get('IELTS expert').findings.includes(`${facts.expertMatches}/18`) &&
    EXPECTED_TEXT_ORDER_VIOLATIONS.every(questionId =>
      byLane.get('IELTS expert').blockersCarriedForward.includes(questionId)),
  'Carril IELTS omite acuerdo u orden textual.');
  assert(byLane.get('Anti-bias and leakage').findings.includes('A=3') &&
    byLane.get('Anti-bias and leakage').findings.includes('H=3') &&
    byLane.get('Anti-bias and leakage').blockersCarriedForward.includes('n=18'),
  'Carril anti-sesgo contradice perfil ejecutable.');
  assert(byLane.get('UI/UX and accessibility').scope.includes('Not applicable') &&
    byLane.get('Playwright').scope.includes('Not applicable'),
  'UI/Playwright ➖ fue presentado como conformidad.');
}

function validateChronology(input) {
  const baselineAt = timestampMs(input.baseline.capturedAt, 'baseline.capturedAt');
  const availabilityAt = timestampMs(`${input.sourceAvailability.checkedAt}T00:00:00Z`,
    'sourceAvailability.checkedAt');
  const retrievalTimes = input.sourceAvailability.sources.map(source =>
    timestampMs(source.retrievedAt, `${source.evidenceId}.retrievedAt`));
  const provenanceAt = timestampMs(input.provenanceSearch.searchedAt,
    'provenanceSearch.searchedAt');
  const manifestAt = timestampMs(input.unitChangeManifest.recordedAt,
    'unitChangeManifest.recordedAt');
  const packetAt = timestampMs(PACKETS_GENERATED_AT, 'PACKETS_GENERATED_AT');
  const connectiveAt = timestampMs(input.connectiveVerdict.reviewer.reviewedAt,
    'connectiveVerdict.reviewedAt');
  const surfaceAt = timestampMs(input.surfaceVerdict.reviewer.reviewedAt,
    'surfaceVerdict.reviewedAt');
  const firstAt = timestampMs(input.firstPass.reviewer.reviewedAt, 'firstPass.reviewedAt');
  const walkthroughAt = timestampMs(input.walkthrough.reviewer.reviewedAt, 'walkthrough.reviewedAt');
  const expertAt = timestampMs(input.expertVerdict.reviewer.reviewedAt, 'expertVerdict.reviewedAt');
  const auditAt = timestampMs(input.audit.reviewedAt, 'auditVerdicts.reviewedAt');
  // Audit and validation are one fail-closed transaction and therefore share audit.reviewedAt.
  const validationAt = auditAt;
  const all = [baselineAt, availabilityAt, ...retrievalTimes, provenanceAt, manifestAt, packetAt,
    connectiveAt, surfaceAt, firstAt, walkthroughAt, expertAt, validationAt, auditAt];
  assert(all.every(value => value <= Date.now()),
    'La cronología contiene timestamps futuros.');
  assert(Math.max(baselineAt, availabilityAt, ...retrievalTimes, provenanceAt, manifestAt) <= packetAt &&
    packetAt <= connectiveAt && connectiveAt <= surfaceAt && surfaceAt <= firstAt &&
    packetAt <= walkthroughAt && firstAt <= expertAt &&
    Math.max(expertAt, walkthroughAt) <= validationAt && validationAt <= auditAt,
  'La cronología declarada es imposible o no monotónica.');
}

function validateBaseline(baseline, assets, storedBias, renderClosurePaths) {
  assertExactKeys(baseline,
    ['schemaVersion', 'capturedAt', 'scope', 'assets', 'structuralRisk',
      'runtimeAndAccessibilityBaseline', 'learnerFacingSourceSha256', 'routeObjectSha256',
      'renderDependencyClosureSha256', 'nextUnit', 'interpretation'], 'baseline');
  assertExactKeys(baseline.scope,
    ['unit', 'format', 'passages', 'questions', 'endingCandidates'], 'baseline.scope');
  assert(baseline.schemaVersion === 'ielts-reading-matching-sentence-endings-baseline.v1' &&
    baseline.scope.unit === 'F0.2b.7' && baseline.scope.format === 'matching-sentence-endings' &&
    baseline.scope.passages === 3 && baseline.scope.questions === 18 &&
    baseline.scope.endingCandidates === 24 && baseline.assets.length === 3,
  'baseline: identidad 3/18/24 inválida.');
  assertExactIdCoverage(baseline.assets, EXPECTED_ASSET_IDS, 'assetId', 'baseline.assets');
  for (const asset of assets) {
    const pinned = baseline.assets.find(row => row.assetId === asset.assetId);
    assertExactKeys(pinned,
      ['assetId', 'setId', 'title', 'passageTitle', 'wordCount', 'endingCount',
        'questionCount', 'unusedEndingCount', 'endingIds', 'questionIds',
        'sourceObjectSha256', 'passageSha256'], `${asset.assetId}:baseline`);
    assert(pinned.setId === asset.id && pinned.title === asset.title &&
      pinned.passageTitle === asset.passageTitle && pinned.wordCount === asset.wordCount &&
      pinned.endingCount === 8 && pinned.questionCount === 6 && pinned.unusedEndingCount === 2 &&
      stableJson(pinned.endingIds) === stableJson(ENDING_IDS) &&
      stableJson(pinned.questionIds) === stableJson(asset.decisions.map(row => row.id)) &&
      pinned.sourceObjectSha256 === asset.sourceObjectSha256 &&
      pinned.passageSha256 === asset.passageSha256,
    `${asset.assetId}: drift desde baseline.`);
  }
  assertExactKeys(baseline.structuralRisk,
    ['endingSelectionFrequency', 'globalConcatenatedMaxSameEndingRun',
      'perSetMaxSameEndingRun', 'setsWithStrictlyAscendingStoredSelectionOrder',
      'sameQuestionPositionAcrossSetsModalEnding', 'questionPositionModuloEndingCount',
      'highestSentenceStartEndingLexicalOverlapPredictsSelection',
      'longestEndingPredictsSelection', 'visibleEndingConnectorDistribution',
      'storedSelectionReuse', 'passageOrderViolationQuestionIds',
      'surfaceShortcutReviewRequired', 'preResponseTrapExposure'],
    'baseline.structuralRisk');
  const risk = baseline.structuralRisk;
  const compareMetric = (baselineMetric, calculated, label) =>
    assert(['eligible', 'tiesOrAbstentions', 'hits'].every(key =>
      baselineMetric[key] === calculated[key]), `${label}: drift.`);
  assert(stableJson(risk.endingSelectionFrequency) === stableJson(storedBias.answerCounts) &&
    risk.globalConcatenatedMaxSameEndingRun === storedBias.globalConcatenatedMaxSameLabelRun &&
    risk.perSetMaxSameEndingRun === storedBias.perSetMaxSameLabelRun &&
    risk.setsWithStrictlyAscendingStoredSelectionOrder ===
      storedBias.setsWithStrictlyAscendingStoredSelectionOrder &&
    stableJson(risk.sameQuestionPositionAcrossSetsModalEnding) ===
      stableJson(storedBias.sameQuestionPositionAcrossSetsModalEnding) &&
    stableJson(risk.visibleEndingConnectorDistribution) ===
      stableJson(storedBias.visibleConnectiveProfile.endingCandidateCounts) &&
    stableJson(risk.storedSelectionReuse) === stableJson(storedBias.storedSelectionReuse) &&
    stableJson(risk.passageOrderViolationQuestionIds) ===
      stableJson(EXPECTED_TEXT_ORDER_VIOLATIONS) && risk.surfaceShortcutReviewRequired === true,
  'baseline.structuralRisk: agregados incompatibles.');
  compareMetric(risk.questionPositionModuloEndingCount,
    storedBias.questionPositionModuloEndingCount, 'questionPositionModuloEndingCount');
  compareMetric(risk.highestSentenceStartEndingLexicalOverlapPredictsSelection,
    storedBias.highestSentenceStartEndingLexicalOverlapPredictsAnswer,
    'highestSentenceStartEndingLexicalOverlapPredictsSelection');
  compareMetric(risk.longestEndingPredictsSelection,
    storedBias.longestEndingWordCountPredictsAnswer, 'longestEndingPredictsSelection');
  assertExactKeys(risk.preResponseTrapExposure,
    ['questionsWithVisibleTrapControl', 'questionsWhoseTrapNamesAnEndingLetter'],
    'baseline.preResponseTrapExposure');
  const trapLetterCount = assets.flatMap(asset => asset.decisions)
    .filter(row => /\b(?:(?:Ending|ending|Option|option)\s+[A-H]|(?:Choose|choose)\s+[A-H])\b/u
      .test(row.trap)).length;
  assert(risk.preResponseTrapExposure.questionsWithVisibleTrapControl === 18 &&
    risk.preResponseTrapExposure.questionsWhoseTrapNamesAnEndingLetter === trapLetterCount,
  'baseline.preResponseTrapExposure: drift.');
  assertExactKeys(baseline.runtimeAndAccessibilityBaseline,
    ['clientSideStoredSelectionsPresent', 'selectionLocksImmediately',
      'correctnessAndExplanationShownImmediately',
      'sameEndingCanBeSelectedForMultipleQuestionsInUi', 'attemptStatePersisted',
      'preResponseTrapDisclosureAvailable', 'nativeSelectAccessibleName',
      'progressIndicatorHasProgrammaticRoleNameAndValue', 'feedbackHasLiveRegion',
      'keyboardNativeSelectOperable', 'uiUxStaticReviewApplicable',
      'playwrightApplicableToScaffoldOnlyDelta',
      'playwrightBecomesApplicableOnLearnerFacingOrRuntimeDrift'],
    'baseline.runtimeAndAccessibilityBaseline');
  assert(stableJson(Object.keys(baseline.learnerFacingSourceSha256).sort()) ===
    stableJson([...LEARNER_FACING_PATHS].sort()) &&
    Object.entries(baseline.learnerFacingSourceSha256).every(([path, expected]) =>
      sourceMatchesReviewedSnapshot(path, expected)),
  'Las siete fuentes learner-facing cambiaron.');
  assert(/^[a-f0-9]{64}$/u.test(baseline.routeObjectSha256),
    'baseline.routeObjectSha256 inválido.');
  assert(baseline.interpretation.includes('audit-only delta') &&
    !baseline.interpretation.includes('scaffold-only delta'),
  'baseline.interpretation debe describir el alcance audit-only final.');
  assert(stableJson(Object.keys(baseline.renderDependencyClosureSha256).sort()) ===
    stableJson([...renderClosurePaths].sort()) &&
    Object.entries(baseline.renderDependencyClosureSha256).every(([path, expected]) =>
      sourceMatchesReviewedSnapshot(path, expected)),
  'La clausura renderizable cambió o está incompleta.');
  assertNextUnitPinned(baseline);
}

function validateUnitChangeManifest(manifest, renderClosurePaths) {
  assertExactKeys(manifest,
    ['schemaVersion', 'unit', 'recordedAt', 'learnerFacingChangeAuthorized',
      'learnerFacingBaselinePaths', 'renderDependencyClosureBaselinePaths', 'unitSourceFiles', 'unitOutputDirectory',
      'nextUnitBoundary', 'applicability', 'interpretation'], 'unitChangeManifest');
  assert(manifest.schemaVersion ===
    'ielts-reading-matching-sentence-endings-unit-change-manifest.v1' &&
    manifest.unit === 'F0.2b.7' && Number.isFinite(Date.parse(manifest.recordedAt)) &&
    manifest.learnerFacingChangeAuthorized === false &&
    stableJson([...manifest.learnerFacingBaselinePaths].sort()) ===
      stableJson([...LEARNER_FACING_PATHS].sort()) &&
    stableJson([...manifest.renderDependencyClosureBaselinePaths].sort()) ===
      stableJson([...renderClosurePaths].sort()) &&
    stableJson([...manifest.unitSourceFiles].sort()) ===
      stableJson([REGISTRY_PATH, VALIDATOR_PATH, TEST_PATH, LOOP_DOC_PATH].sort()) &&
    manifest.unitOutputDirectory === OUTPUT_DIRECTORY,
  'unitChangeManifest: alcance final inválido.');
  assertExactKeys(manifest.nextUnitBoundary, ['unit', 'format', 'status'],
    'unitChangeManifest.nextUnitBoundary');
  assert(manifest.nextUnitBoundary.unit === 'F0.2b.8' &&
    manifest.nextUnitBoundary.format === 'sentence-completion' &&
    manifest.nextUnitBoundary.status === 'not-started',
  'unitChangeManifest: frontera siguiente inválida.');
  assertExactKeys(manifest.applicability,
    ['staticUiUxAndAccessibilityReview', 'uiUxDeltaTesting', 'playwright', 'notApplicableMeaning',
      'playwrightActivationCriteria'], 'unitChangeManifest.applicability');
  assert(manifest.applicability.staticUiUxAndAccessibilityReview ===
    'applicable-to-existing-baseline' &&
    manifest.applicability.uiUxDeltaTesting ===
      'not-applicable-only-while-learner-facing-and-render-closure-hashes-match-baseline' &&
    manifest.applicability.playwright ===
      'not-applicable-only-while-learner-facing-and-render-closure-hashes-match-baseline' &&
    manifest.applicability.notApplicableMeaning.includes('not a UI, accessibility or runtime conformity') &&
    Array.isArray(manifest.applicability.playwrightActivationCriteria) &&
    manifest.applicability.playwrightActivationCriteria.length >= 4 &&
    manifest.interpretation.includes('exact stop boundary'),
  'unitChangeManifest conserva una afirmación de scaffold ya falsa o sobredeclara UI.');
}

export function buildValidationArtifacts() {
  const catalog = loadTsModule(CATALOG_PATH);
  const registry = loadTsModule(REGISTRY_PATH).IELTS_READING_RIGHTS_REGISTRY;
  const contract = loadTsModule(CONTRACT_PATH);
  const assets = sourceAssets(catalog);
  const baseline = readJson(BASELINE_PATH);
  const sourceAvailability = readJson(SOURCE_AVAILABILITY_PATH);
  const provenanceSearch = readJson(PROVENANCE_SEARCH_PATH);
  const unitChangeManifest = readJson(UNIT_CHANGE_MANIFEST_PATH);
  const connectivePacket = buildConnectiveOnlyPacket();
  const surfacePacket = buildSurfaceOnlyPacket();
  const blindPacket = buildBlindReviewPacket();
  const factualPacket = buildFactualSourceReviewPacket();
  const connectiveVerdict = readJson(CONNECTIVE_VERDICT_PATH);
  const surfaceVerdict = readJson(SURFACE_VERDICT_PATH);
  const firstPass = readJson(FIRST_PASS_PATH);
  const expertVerdict = readJson(EXPERT_VERDICT_PATH);
  const walkthrough = readJson(STUDENT_WALKTHROUGH_PATH);
  const audit = readJson(AUDIT_VERDICTS_PATH);
  const renderClosure = renderDependencyClosure([
    'src/app/layout.tsx', 'src/app/(site)/layout.tsx', ROUTE_PATH,
  ]);
  const renderClosurePaths = renderClosure.map(path => relative(ROOT, path));
  const assetIds = assets.map(asset => asset.assetId);
  const questionIds = assets.flatMap(asset => asset.decisions.map(row => row.id));

  assertUnitCardinality(assets);
  assert(stableJson(assets.map(asset => asset.id)) === stableJson(EXPECTED_SET_IDS) &&
    assets.every(asset => stableJson(asset.endings.map(ending => ending.id)) ===
      stableJson(ENDING_IDS) && asset.decisions.every(row => ENDING_IDS.includes(row.answer))),
  'Bindings de ending o sets inválidos.');
  const storedAnswerById = new Map(assets.flatMap(asset =>
    asset.decisions.map(row => [row.id, row.answer])));
  const storedBias = structuralBiasProfile(assets, storedAnswerById);
  validateBaseline(baseline, assets, storedBias, renderClosurePaths);
  validateUnitChangeManifest(unitChangeManifest, renderClosurePaths);

  assert(registry.schemaVersion === 'ielts-academic-reading-rights-registry.v2' &&
    registry.policyVersion === '2026-08-09.v8' && registry.module === 'academic',
  'Registry global no está en policy v8.');
  const evidenceById = new Map(registry.evidence.map(row => [row.id, row]));
  assert(evidenceById.size === registry.evidence.length, 'Evidence IDs duplicados.');
  const unitRecords = EXPECTED_ASSET_IDS.map(assetId => {
    const rows = registry.entries.filter(row => row.assetId === assetId);
    assert(rows.length === 1, `${assetId}: registry debe tener una fila.`);
    return rows[0];
  });
  validateSourceAvailability(sourceAvailability, registry, unitRecords);
  validateProvenanceSearch(provenanceSearch);
  validateShortcutReviewer(connectiveVerdict,
    'ielts-reading-matching-sentence-endings-connective-only-verdict.v1',
    'connective-only-packet-only', CONNECTIVE_PACKET_PATH, 'connectiveVerdict');
  validateConnectiveVerdict(connectiveVerdict, assets);
  validateSurfaceVerdict(surfaceVerdict, assets);
  validateAuditVerdicts(audit);
  validateChronology({
    baseline, sourceAvailability, provenanceSearch, unitChangeManifest, connectiveVerdict,
    surfaceVerdict, firstPass, expertVerdict, walkthrough, audit,
  });

  const decisions = assets.map(asset => {
    const record = unitRecords.find(row => row.assetId === asset.assetId);
    referencedEvidenceIds(record).forEach(evidenceId =>
      assert(evidenceById.has(evidenceId), `${asset.assetId}: evidencia inexistente ${evidenceId}`));
    assert(record.sourceObjectSha256 === asset.sourceObjectSha256 &&
      record.passageSha256 === asset.passageSha256 &&
      record.authorship.status === 'unknown' &&
      record.provenanceAssessment.status === 'unresolved' &&
      record.rightsAssessment.basis === 'unknown-quarantined' &&
      record.rightsAssessment.status === 'reviewed-unresolved' &&
      record.rightsAssessment.rightsHolder === null &&
      record.rightsAssessment.authorizationEvidenceStatus ===
        'not-located-in-reviewed-sources' &&
      record.factualReviewRequirement.policy === 'required' &&
      record.factualSourceResearch.status === 'candidate-sources-collected' &&
      record.factualSourceResearch.sourceEvidenceIds.length === 5 &&
      new Set(record.factualSourceResearch.sourceEvidenceIds).size === 5 &&
      record.factualSourceResearch.sourceEvidenceIds.every(id =>
        evidenceById.get(id)?.kind === 'factual-source') &&
      record.factualReview.status === 'not-reviewed' &&
      record.humanReview.status === 'pending',
    `${asset.assetId}: cuarentena/estado editorial exacto inválido.`);
    for (const evidenceId of referencedEvidenceIds(record)) {
      const evidence = evidenceById.get(evidenceId);
      assert(strictCalendarDate(evidence.accessedAt, `${evidenceId}.accessedAt`),
        `${evidenceId}: accessedAt inválido.`);
      assertNoFutureTimestamp(`${evidence.accessedAt}T00:00:00Z`, `${evidenceId}.accessedAt`);
    }
    assertNoFutureTimestamp(record.automatedTriage.assessedAt,
      `${asset.assetId}.automatedTriage.assessedAt`);
    const assessed = contract.assessIeltsReadingRights(registry, asset);
    assert(assessed.disposition === 'quarantine' &&
      assessed.eligibleForPublicationPipeline === false &&
      assessed.rightsBasis === 'unknown-quarantined' &&
      !assessed.reasonCodes.some(code => [
        'registry-contract-invalid', 'content-hash-mismatch',
        'factual-source-research-invalid',
      ].includes(code)), `${asset.assetId}: registry inválido oculto.`);
    const decision = {
      assetId: asset.assetId,
      title: asset.title,
      sourceObjectSha256: asset.sourceObjectSha256,
      passageSha256: asset.passageSha256,
      wordCount: asset.wordCount,
      questionCount: asset.decisions.length,
      endingCandidateCount: asset.endings.length,
      provenanceStatus: record.provenanceAssessment.status,
      rightsBasis: assessed.rightsBasis,
      factualResearchStatus: record.factualSourceResearch.status,
      factualReviewPolicy: record.factualReviewRequirement.policy,
      candidateFactualSourceCount: record.factualSourceResearch.sourceEvidenceIds.length,
      factualReviewStatus: record.factualReview.status,
      humanReviewStatus: record.humanReview.status,
      authorizationEvidenceStatus: record.rightsAssessment.authorizationEvidenceStatus,
      disposition: assessed.disposition,
      eligibleForPublicationPipeline: assessed.eligibleForPublicationPipeline,
      reasonCodes: assessed.reasonCodes,
    };
    assertDecisionQuarantined(decision, asset.assetId);
    return decision;
  });

  const runtimeRegistryImports = sourceFilesUnder('src')
    .filter(path => ![resolve(ROOT, REGISTRY_PATH), resolve(ROOT, CONTRACT_PATH)].includes(path))
    .filter(path => {
      const relativePath = relative(ROOT, path);
      const source = readFileSync(path, 'utf8');
      return !(relativePath === 'src/lib/ielts/table-completion-publication.ts' &&
        source.startsWith("import 'server-only';"));
    })
    .filter(path => {
      const source = readFileSync(path, 'utf8');
      return source.includes('ielts-reading-rights-registry') ||
        source.includes('academic-reading-rights');
    });
  assert(runtimeRegistryImports.length === 0,
    `Runtime importa registry/contrato: ${runtimeRegistryImports.join(', ')}`);
  // The pinned catalog intentionally contains pre-response trap copy such as “Do not choose H”.
  // That known risk is counted below and any catalog drift fails its hash gate; scanning it again
  // as an unexpected closure leak would make the documented baseline impossible to validate.
  const closureTexts = renderClosure
    .filter(path => relative(ROOT, path) !== CATALOG_PATH)
    .map(path => readFileSync(path, 'utf8'));
  assert(findSentenceEndingAssignmentLeaks(closureTexts).length === 0,
    'La clausura learner-facing contiene una asignación explícita question→ending.');

  const routeText = readFileSync(resolve(ROOT, ROUTE_PATH), 'utf8');
  const reviewBlockText = readFileSync(resolve(ROOT, REVIEW_SOURCE_BLOCK_PATH), 'utf8');
  const visibleClaims = [
    ...['textos originales de WeLearn', 'Banco original WeLearn', 'sin copiar preguntas oficiales']
      .map(text => ({ text, sourcePath: ROUTE_PATH, observed: routeText.includes(text) })),
    {
      text: 'preparado por el equipo académico de WeLearn y revisado en julio de 2026',
      sourcePath: REVIEW_SOURCE_BLOCK_PATH,
      observed: reviewBlockText.includes(
        'preparado por el equipo académico de WeLearn y revisado en julio de 2026'),
    },
    {
      text: 'los ejercicios son originales de WeLearn',
      sourcePath: REVIEW_SOURCE_BLOCK_PATH,
      observed: reviewBlockText.includes('los ejercicios son originales de WeLearn'),
    },
  ];
  assert(visibleClaims.every(row => row.observed), 'Cambió un claim visible de originalidad.');

  const engineText = readFileSync(resolve(ROOT, ENGINE_PATH), 'utf8');
  const runtime = {
    answerKeysDeliveredToClient: engineText.includes("'use client'") &&
      engineText.includes('question.answer'),
    selectionLocksImmediately: engineText.includes('const locked = Boolean(selected)') &&
      engineText.includes('{locked ?'),
    correctnessAndExplanationShownImmediately:
      engineText.includes('const isCorrect = selected === question.answer') &&
      engineText.includes('{locked &&'),
    preResponseTrapDisclosureAvailable: engineText.includes('setShowHints') &&
      engineText.includes('{question.trap}') &&
      !/disabled\s*=\s*\{[^}]*!selected/iu.test(engineText),
    endingOptionsVisibleBeforeResponse: engineText.includes('passage.endingOptions.map((ending) =>'),
    sameEndingCanBeSelectedForMultipleQuestions: true,
    classification:
      'guided-training-runtime-with-immediate-feedback-not-practice-or-exam-simulation',
  };
  assert(Object.entries(runtime).filter(([key]) => key !== 'classification')
    .every(([, value]) => value === true), 'Cambió el runtime inmediato detectado.');
  assert(Object.entries(baseline.runtimeAndAccessibilityBaseline).every(([key, value]) => {
    const exactExpected = {
      clientSideStoredSelectionsPresent: true,
      selectionLocksImmediately: true,
      correctnessAndExplanationShownImmediately: true,
      sameEndingCanBeSelectedForMultipleQuestionsInUi: true,
      attemptStatePersisted: false,
      preResponseTrapDisclosureAvailable: true,
      nativeSelectAccessibleName: false,
      progressIndicatorHasProgrammaticRoleNameAndValue: false,
      feedbackHasLiveRegion: false,
      keyboardNativeSelectOperable: true,
      uiUxStaticReviewApplicable: true,
      playwrightApplicableToScaffoldOnlyDelta: false,
      playwrightBecomesApplicableOnLearnerFacingOrRuntimeDrift: true,
    };
    return exactExpected[key] === value;
  }), 'Runtime/accessibility baseline inesperado.');

  const firstTrace = validateFirstPass(firstPass, assets, blindPacket);
  const expert = validateExpertVerdict(expertVerdict, firstPass, firstTrace, assets, factualPacket);
  const walkthroughSummary = validateStudentWalkthrough(walkthrough, assets);
  const conflicts = expert.comparisons.filter(row => !row.matchesStoredKey)
    .map(row => row.questionId);
  const materialAmbiguities = expert.comparisons.filter(row => row.ambiguity === 'material')
    .map(row => row.questionId);
  assert(conflicts.length === 0, `Expert verdict no coincide 18/18: ${conflicts.join(', ')}`);
  assert(expert.factualClaims.length === 15, 'Faltan claims factuales exactos.');
  const expertBias = structuralBiasProfile(assets, new Map(expert.comparisons.map(row =>
    [row.questionId, row.expertEndingId])));
  const factualAssessmentCounts = Object.fromEntries(
    ['supported', 'oversimplified', 'unsupported', 'untraceable'].map(assessment =>
      [assessment, expert.factualClaims.filter(row => row.assessment === assessment).length]));
  const connectiveUniqueRows = connectiveVerdict.records.filter(row =>
    row.uniqueConnectorEndingId !== null);
  const connectiveShortcut = {
    uniquePredictions: connectiveUniqueRows.length,
    hits: connectiveUniqueRows.filter(row =>
      row.uniqueConnectorEndingId === storedAnswerById.get(row.questionId)).length,
    total: 18,
  };
  const grammarUniqueRows = surfaceVerdict.records.filter(row => row.grammarOnlyUniqueEndingId !== null);
  const coherenceUniqueRows = surfaceVerdict.records.filter(row =>
    row.genericCoherenceUniqueEndingId !== null);
  const surfaceShortcut = {
    grammarOnlyUniquePredictions: grammarUniqueRows.length,
    grammarOnlyHits: grammarUniqueRows.filter(row =>
      row.grammarOnlyUniqueEndingId === storedAnswerById.get(row.questionId)).length,
    genericCoherenceUniquePredictions: coherenceUniqueRows.length,
    genericCoherenceHits: coherenceUniqueRows.filter(row =>
      row.genericCoherenceUniqueEndingId === storedAnswerById.get(row.questionId)).length,
    total: 18,
  };
  validateAuditVerdicts(audit, { expertMatches: 18 - conflicts.length });

  const negativeControl = contract.assessIeltsReadingRights(registry, {
    ...assets[0], passageSha256: '0'.repeat(64),
  });
  assert(negativeControl.reasonCodes.includes('content-hash-mismatch'),
    'La mutación de contenido no falla cerrada.');
  const leakControls = {
    englishChoice: findSentenceEndingAssignmentLeaks({
      nested: [{ instruction: 'Choose ending C for mse-microclimates-02' }],
    }),
    englishLetter: findSentenceEndingAssignmentLeaks({
      instruction: 'Correct letter for mse-libraries-05 is G',
    }),
    spanishCorrespondence: findSentenceEndingAssignmentLeaks({
      nested: { repair: 'mse-food-waste-03 corresponde al final D' },
    }),
    spanishChoice: findSentenceEndingAssignmentLeaks({
      repair: 'Elige la letra H para mse-food-waste-06',
    }),
    completedEnglish: findSentenceEndingAssignmentLeaks({
      repair: 'The complete sentence for mse-food-waste-02 is forecasting systems work by improving estimates.',
    }),
    completedSpanish: findSentenceEndingAssignmentLeaks({
      repair: 'La oración completa de mse-food-waste-02 es forecasting systems work by improving estimates.',
    }),
  };
  assert(Object.values(leakControls).every(findings => findings.length === 1),
    'El detector adversarial EN/ES/nested no falla cerrado.');
  const contentCertificationBlocked = questionIds.length < 100 ||
    expert.orderViolations.length > 0 || runtime.answerKeysDeliveredToClient ||
    runtime.selectionLocksImmediately || runtime.preResponseTrapDisclosureAvailable ||
    conflicts.length > 0 || materialAmbiguities.length > 0;
  assert(contentCertificationBlocked, 'Content certification debía quedar bloqueada.');
  const loopDocText = readFileSync(resolve(ROOT, LOOP_DOC_PATH), 'utf8');
  assertBoardStopBoundary(loopDocText);

  const allSourcePaths = [
    ...LEARNER_FACING_PATHS, ...NEXT_UNIT_PATHS, CONTRACT_PATH, REGISTRY_PATH,
    VALIDATOR_PATH, TEST_PATH, LOOP_DOC_PATH, BASELINE_PATH, SOURCE_AVAILABILITY_PATH,
    PROVENANCE_SEARCH_PATH, UNIT_CHANGE_MANIFEST_PATH, CONNECTIVE_PACKET_PATH,
    CONNECTIVE_VERDICT_PATH, SURFACE_PACKET_PATH, SURFACE_VERDICT_PATH, BLIND_REVIEW_PATH,
    FACTUAL_SOURCE_REVIEW_PATH, FIRST_PASS_PATH, EXPERT_VERDICT_PATH,
    STUDENT_WALKTHROUGH_PATH, AUDIT_VERDICTS_PATH, BUILD_REPORT_PATH,
  ];
  const validation = {
    schemaVersion: 'ielts-reading-matching-sentence-endings-rights-validation.v1',
    generatedAt: audit.reviewedAt,
    unit: 'F0.2b.7 — three formative Matching Sentence Endings passages',
    status: 'pass',
    passMeaning:
      'PASS certifies audit coverage, identity, quarantine, staged shortcut review and risk detection. It does not approve keys, factuality, rights, publication, runtime conformity or student efficacy; bank and content certification remain BLOCKED.',
    scope: {
      passages: 3,
      questions: 18,
      endingCandidates: 24,
      registryEntriesInUnit: decisions.length,
      registryEntriesTotal: registry.entries.length,
      coveredAssetIds: EXPECTED_ASSET_IDS,
      parentF02bRemainsOpen: true,
      scopedLearnerSourcesChangedSinceBaseline: false,
    },
    checks: {
      exactCoverageThreeEighteenTwentyFour: true,
      stableUniqueIds: new Set(assetIds).size === 3 && new Set(questionIds).size === 18,
      registryPolicyV7Pinned: true,
      actualAssetsAllQuarantined: decisions.every(row =>
        row.eligibleForPublicationPipeline === false),
      officialRuleSourceRetrieved:
        sourceAvailability.sources.some(row => row.evidenceId === OFFICIAL_EVIDENCE_ID &&
          row.httpStatus === 200 && row.claimVerificationStatus === 'not-performed'),
      factualSourceAvailabilityRecordedNotVerified: sourceAvailability.sources.length === 16 &&
        decisions.every(row => row.factualReviewStatus === 'not-reviewed'),
      renderDependencyClosurePinned: true,
      auditRegistryAbsentFromLearnerRuntimeImports: runtimeRegistryImports.length === 0,
      fourPacketsContainNoKeysEditorialFeedbackPiiOrAssignments:
        [connectivePacket, surfacePacket, blindPacket, factualPacket].every(packet =>
          findForbiddenKeys(packet).length === 0 &&
          findSentenceEndingAssignmentLeaks(packet).length === 0 && findPii(packet).length === 0),
      connectiveOnlyReviewCoverageComplete: connectiveVerdict.records.length === 18,
      surfaceOnlyReviewCoverageComplete: surfaceVerdict.records.length === 18,
      expertFirstPassPersistedAndPinned:
        expertVerdict.reviewer.firstPassSha256 === sourceSha256(FIRST_PASS_PATH),
      exactOneBestAnswerContractEnforced: expert.comparisons.length === 18,
      expertAgreementEighteenOfEighteen: conflicts.length === 0,
      evidenceQuotesClosestCompetitorAndOrderEnforced: expert.evidenceOffsets.length === 18,
      passageOrderViolationDetected:
        stableJson(expert.orderViolations) === stableJson(EXPECTED_TEXT_ORDER_VIOLATIONS),
      factualClaimsFifteenExact: expert.factualClaims.length === 15,
      walkthroughThreeByEighteenExact:
        walkthroughSummary.passagesCovered === 3 && walkthroughSummary.questionsCovered === 18,
      reusePolicyNotDeclaredAndNoStoredReuse:
        storedBias.storedSelectionReuse.declaredReusePolicy === 'not-declared' &&
        storedBias.storedSelectionReuse.reusedAssignments === 0,
      multidimensionalStructuralAuditComplete:
        storedBias.questionPositionModuloEndingCount.hits === 6 &&
        storedBias.highestSentenceStartEndingLexicalOverlapPredictsAnswer.eligible === 9 &&
        storedBias.longestEndingWordCountPredictsAnswer.eligible === 12,
      runtimeImmediateFeedbackLockHintsAndClientKeysDetected:
        runtime.selectionLocksImmediately && runtime.correctnessAndExplanationShownImmediately &&
        runtime.preResponseTrapDisclosureAvailable && runtime.answerKeysDeliveredToClient,
      runtimeNotMisrepresentedAsPracticeOrExam:
        runtime.classification.endsWith('not-practice-or-exam-simulation'),
      statisticalCertificationWithheldNBelow100: questionIds.length < 100,
      contentCertificationBlocked,
      contentMutationDenied: negativeControl.disposition === 'quarantine',
      chronologyMonotonicAndNotFutureDated: true,
      boardCurrentClosedNextAndParentOpenExactlyOnce: true,
      adversarialLeakMutationsDetected:
        Object.values(leakControls).every(findings => findings.length === 1),
    },
    decisions,
    visibleClaims,
    renderDependencyClosure: {
      sourceCount: renderClosure.length,
      paths: renderClosurePaths,
      limitation:
        'Static local-import closure from root/site layouts and route. Runtime-generated or remote copy remains outside scope.',
    },
    provenanceSearch,
    sourceAvailability,
    factualResearch: unitRecords.map(record => ({
      assetId: record.assetId,
      status: record.factualSourceResearch.status,
      sourceEvidenceIds: record.factualSourceResearch.sourceEvidenceIds,
      limitation: record.factualSourceResearch.limitation,
    })),
    shortcutReview: {
      connectiveOnly: connectiveShortcut,
      surfaceOnly: surfaceShortcut,
      interpretation:
        'These staged reviewers measure answerability without passage evidence. Their predictions are not expert answer adjudications.',
    },
    expertReview: {
      reviewerType: 'independent-ai-editorial-review',
      humanSignature: false,
      answerAgreement: { matches: 18 - conflicts.length, total: 18,
        rate: (18 - conflicts.length) / 18 },
      keyConflictCount: conflicts.length,
      keyConflictQuestionIds: conflicts,
      materialAmbiguityCount: materialAmbiguities.length,
      materialAmbiguityQuestionIds: materialAmbiguities,
      passageOrderViolationQuestionIds: expert.orderViolations,
      factualAssessmentCounts,
      verdictPath: EXPERT_VERDICT_PATH,
    },
    studentWalkthrough: {
      ...walkthroughSummary,
      verdictPath: STUDENT_WALKTHROUGH_PATH,
      limitation: 'Blind content-only walkthrough; no students, UI or accessibility conformance test.',
    },
    runtime: {
      ...runtime,
      inheritedAccessibilityRisks: baseline.runtimeAndAccessibilityBaseline,
      limitation:
        'Immediate locking, correctness feedback, client keys and pre-response traps prevent representation as Practice or Exam simulation.',
    },
    antiBias: {
      storedKeyProfile: storedBias,
      independentExpertProfile: expertBias,
      qualitativeCoverage: {
        grammarOnlyShortcut: true,
        visibleConnectiveShortcut: true,
        lexicalOverlap: true,
        endingLength: true,
        positionAndOrder: true,
        endingReuse: true,
        exactOneBestAnswer: true,
        representation: true,
        priorKnowledge: true,
        irrelevantLoad: true,
      },
      sampleAdequacy: {
        certificationThreshold: 100,
        observedQuestions: 18,
        eligibleForStatisticalCertification: false,
        conclusion: 'n=18 is too small to certify statistically balanced content.',
      },
      statisticalCertification: 'withheld-n-below-100',
      contentCertification: 'blocked-order-runtime-editorial-review-required',
    },
    applicability: {
      rights: 'applicable',
      fullStackData: 'applicable',
      ieltsExpert: 'applicable',
      cognitiveWalkthrough: 'applicable-to-content-only',
      antiBias: 'applicable',
      uiUxAccessibility: 'not-applicable-to-unchanged-runtime-delta-conformance',
      playwright: 'not-applicable-scoped-learner-runtime-unchanged',
      evidence:
        'Seven learner-facing files and fifteen-file closure remain pinned. UI/Playwright ➖ is not conformity.',
    },
    negativeControl: { contentHashMismatch: negativeControl, leakControls },
    sources: allSourcePaths.filter(path => existsSync(resolve(ROOT, path)))
      .map(path => ({ path, sha256: sourceSha256(path) })),
  };
  const failed = Object.entries(validation.checks).filter(([, passed]) => !passed)
    .map(([name]) => name);
  assert(failed.length === 0, `Falló gate F0.2b.7: ${failed.join(', ')}`);
  return { validation, connectivePacket, surfacePacket, blindPacket, factualPacket };
}

export function validateFinalReportArtifacts(validation) {
  for (const path of [VALIDATION_PATH, AUDIT_VERDICTS_PATH, BUILD_REPORT_PATH, ARTIFACT_PATH,
    REPORT_MD_PATH, REPORT_HTML_PATH, REPORT_VERIFICATION_PATH]) {
    assert(existsSync(resolve(ROOT, path)), `Falta artefacto final: ${path}`);
  }
  const audit = readJson(AUDIT_VERDICTS_PATH);
  validateAuditVerdicts(audit, { expertMatches: validation.expertReview.answerAgreement.matches });
  const artifact = readJson(ARTIFACT_PATH);
  assert(artifact.surface === 'report' && artifact.manifest?.surface === 'report' &&
    artifact.manifest.title === 'IELTS Reading Matching Sentence Endings — audit gate' &&
    artifact.manifest.generatedAt === audit.reviewedAt &&
    artifact.snapshot?.generatedAt === artifact.manifest.generatedAt &&
    artifact.snapshot?.status === 'ready' && artifact.manifest.cards?.length === 4 &&
    artifact.manifest.charts?.length === 3 && artifact.manifest.tables?.length === 2,
  'Artifact portable incompleto.');
  assert(stableJson(artifact.manifest.charts.map(chart => chart.title)) === stableJson([
    'Stored ending-letter counts',
    'Surface-only shortcut performance',
    'Independent factual-claim assessments',
  ]), 'Títulos de gráficos inválidos.');
  const expectedSummary = [{
    passages: 3,
    questions: 18,
    endingCandidates: 24,
    quarantined: validation.decisions.filter(row => row.disposition === 'quarantine').length,
    expertMatches: validation.expertReview.answerAgreement.matches,
    expertTotal: 18,
    materialAmbiguities: validation.expertReview.materialAmbiguityCount,
    orderViolations: validation.expertReview.passageOrderViolationQuestionIds.length,
  }];
  const expectedEndings = Object.entries(validation.antiBias.storedKeyProfile.answerCounts)
    .map(([ending, count]) => ({ ending, count }));
  const expectedShortcut = [
    {
      stage: 'connective-only unique',
      hits: validation.shortcutReview.connectiveOnly.hits,
      predictions: validation.shortcutReview.connectiveOnly.uniquePredictions,
    },
    {
      stage: 'grammar-only unique',
      hits: validation.shortcutReview.surfaceOnly.grammarOnlyHits,
      predictions: validation.shortcutReview.surfaceOnly.grammarOnlyUniquePredictions,
    },
    {
      stage: 'generic-coherence unique',
      hits: validation.shortcutReview.surfaceOnly.genericCoherenceHits,
      predictions: validation.shortcutReview.surfaceOnly.genericCoherenceUniquePredictions,
    },
  ];
  const expectedClaims = Object.entries(validation.expertReview.factualAssessmentCounts)
    .map(([assessment, claims]) => ({ assessment, claims }));
  const expectedDecisions = validation.decisions.map(decision => {
    const row = { ...decision };
    delete row.reasonCodes;
    row.blockers = decision.reasonCodes.join(' · ');
    return row;
  });
  assert(stableJson(artifact.snapshot.datasets.summary) === stableJson(expectedSummary) &&
    stableJson(artifact.snapshot.datasets.endings) === stableJson(expectedEndings) &&
    stableJson(artifact.snapshot.datasets.shortcuts) === stableJson(expectedShortcut) &&
    stableJson(artifact.snapshot.datasets.claims) === stableJson(expectedClaims) &&
    stableJson(artifact.snapshot.datasets.decisions) === stableJson(expectedDecisions) &&
    stableJson(artifact.snapshot.datasets.audit) === stableJson(audit.rows),
  'Artifact no coincide con validation/audit.');

  const markdown = readFileSync(resolve(ROOT, REPORT_MD_PATH), 'utf8');
  const html = readFileSync(resolve(ROOT, REPORT_HTML_PATH), 'utf8');
  const requiredMarkdown = [
    'audit PASS; bank and content certification BLOCKED',
    ...validation.expertReview.passageOrderViolationQuestionIds,
    'reuse policy not declared',
    'guided-training',
    'n=18',
    'F0.2b.8 Sentence Completion',
    `${validation.expertReview.answerAgreement.matches}/18`,
    ...validation.expertReview.materialAmbiguityQuestionIds,
    ...validation.expertReview.keyConflictQuestionIds,
  ];
  requiredMarkdown.forEach(value =>
    assert(markdown.includes(value), `report.md omite: ${value}`));
  for (const [assessment, count] of Object.entries(validation.expertReview.factualAssessmentCounts)) {
    assert(markdown.includes(`- ${assessment}: ${count}`),
      `report.md contradice ${assessment}=${count}.`);
    assert(html.includes(`<tr><td>${assessment}</td><td class="portable-table-number">${count}</td></tr>`),
      `report.html contradice ${assessment}=${count}.`);
  }
  for (const [ending, count] of Object.entries(validation.antiBias.storedKeyProfile.answerCounts)) {
    assert(html.includes(`<tr><td>${ending}</td><td class="portable-table-number">${count}</td></tr>`),
      `report.html contradice ${ending}=${count}.`);
  }
  assert(html.includes('IELTS Reading Matching Sentence Endings') &&
    html.includes('Surface-only shortcut') && html.includes('Text-order violation') &&
    html.includes('Recommended next decisions'), 'report.html incompleto.');

  const verification = readJson(REPORT_VERIFICATION_PATH);
  assertExactKeys(verification,
    ['schemaVersion', 'verifiedAt', 'command', 'stages', 'viewports', 'counts', 'sha256',
      'interpretation'], 'reportVerification');
  assert(verification.schemaVersion ===
    'ielts-reading-matching-sentence-endings-report-verification.v1' &&
    timestampMs(verification.verifiedAt, 'reportVerification.verifiedAt') >=
      timestampMs(audit.reviewedAt, 'auditVerdicts.reviewedAt') &&
    timestampMs(verification.verifiedAt, 'reportVerification.verifiedAt') <= Date.now() &&
    verification.command.includes('deliver_portable_artifact.mjs') &&
    stableJson(verification.stages) === stableJson({
      validation: 'passed', package: 'passed', verification: 'passed',
    }) && stableJson(verification.viewports) === stableJson([1440, 390]) &&
    verification.counts.cards === 4 && verification.counts.charts === 3 &&
    verification.counts.tables === 2 && verification.interpretation.includes('report only') &&
    verification.interpretation.includes('not learner-facing'),
  'Verificación portable inválida.');
  assertExactKeys(verification.sha256,
    ['validation', 'auditVerdicts', 'buildReport', 'artifact', 'reportMarkdown', 'reportHtml'],
    'reportVerification.sha256');
  assert(verification.sha256.validation === sourceSha256(VALIDATION_PATH) &&
    verification.sha256.auditVerdicts === sourceSha256(AUDIT_VERDICTS_PATH) &&
    verification.sha256.buildReport === sourceSha256(BUILD_REPORT_PATH) &&
    verification.sha256.artifact === sourceSha256(ARTIFACT_PATH) &&
    verification.sha256.reportMarkdown === sourceSha256(REPORT_MD_PATH) &&
    verification.sha256.reportHtml === sourceSha256(REPORT_HTML_PATH),
  'Bindings/hash del reporte no coinciden.');
  return {
    validationSha256: sourceSha256(VALIDATION_PATH),
    auditVerdictsSha256: sourceSha256(AUDIT_VERDICTS_PATH),
    buildReportSha256: sourceSha256(BUILD_REPORT_PATH),
    artifactSha256: sourceSha256(ARTIFACT_PATH),
    reportMarkdownSha256: sourceSha256(REPORT_MD_PATH),
    reportHtmlSha256: sourceSha256(REPORT_HTML_PATH),
  };
}

function writeJson(path, value) {
  const absolutePath = resolve(ROOT, path);
  mkdirSync(dirname(absolutePath), { recursive: true });
  writeFileSync(absolutePath, `${JSON.stringify(value, null, 2)}\n`);
}

function checkJson(path, value) {
  const absolutePath = resolve(ROOT, path);
  assert(existsSync(absolutePath), `Falta artefacto generado: ${path}`);
  assert(readFileSync(absolutePath, 'utf8') === `${JSON.stringify(value, null, 2)}\n`,
    `Artefacto desactualizado: ${path}`);
}

const isCli = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) {
  const mode = process.argv.includes('--write-blind') ? 'write-blind' :
    process.argv.includes('--write') ? 'write' :
      process.argv.includes('--check') ? 'check' : 'print';
  if (mode === 'write-blind') {
    assertNoFutureTimestamp(PACKETS_GENERATED_AT, 'PACKETS_GENERATED_AT');
    const connectivePacket = buildConnectiveOnlyPacket();
    const surfacePacket = buildSurfaceOnlyPacket();
    const blindPacket = buildBlindReviewPacket();
    const factualPacket = buildFactualSourceReviewPacket();
    writeJson(CONNECTIVE_PACKET_PATH, connectivePacket);
    writeJson(SURFACE_PACKET_PATH, surfacePacket);
    writeJson(BLIND_REVIEW_PATH, blindPacket);
    writeJson(FACTUAL_SOURCE_REVIEW_PATH, factualPacket);
    process.stdout.write(`${JSON.stringify({
      status: 'staged-review-packets-written',
      passages: 3,
      questions: 18,
      endingCandidates: 24,
      connectivePath: CONNECTIVE_PACKET_PATH,
      surfacePath: SURFACE_PACKET_PATH,
      blindPath: BLIND_REVIEW_PATH,
      factualPath: FACTUAL_SOURCE_REVIEW_PATH,
    }, null, 2)}\n`);
  } else {
    const artifacts = buildValidationArtifacts();
    let reportBindings = null;
    if (mode === 'write') {
      writeJson(VALIDATION_PATH, artifacts.validation);
      writeJson(CONNECTIVE_PACKET_PATH, artifacts.connectivePacket);
      writeJson(SURFACE_PACKET_PATH, artifacts.surfacePacket);
      writeJson(BLIND_REVIEW_PATH, artifacts.blindPacket);
      writeJson(FACTUAL_SOURCE_REVIEW_PATH, artifacts.factualPacket);
    } else if (mode === 'check') {
      checkJson(VALIDATION_PATH, artifacts.validation);
      checkJson(CONNECTIVE_PACKET_PATH, artifacts.connectivePacket);
      checkJson(SURFACE_PACKET_PATH, artifacts.surfacePacket);
      checkJson(BLIND_REVIEW_PATH, artifacts.blindPacket);
      checkJson(FACTUAL_SOURCE_REVIEW_PATH, artifacts.factualPacket);
      reportBindings = validateFinalReportArtifacts(artifacts.validation);
    }
    process.stdout.write(`${JSON.stringify({
      status: artifacts.validation.status,
      mode,
      passages: 3,
      questions: 18,
      endingCandidates: 24,
      quarantined: artifacts.validation.decisions.filter(row =>
        row.disposition === 'quarantine').length,
      checks: artifacts.validation.checks,
      reportBindings,
    }, null, 2)}\n`);
  }
}
