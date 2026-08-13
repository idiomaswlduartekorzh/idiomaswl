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

const PACKETS_GENERATED_AT = '2026-08-09T13:35:00Z';
const VALIDATION_GENERATED_AT = '2026-08-09T13:55:00Z';
const CATALOG_PATH = 'src/data/practica-exams/seo-catalog.ts';
const ROUTE_PATH =
  'src/app/(site)/practica/ielts/reading/tipos-de-preguntas/matching-features/page.tsx';
const ENGINE_PATH = 'src/components/exam-practice/MatchingFeaturesEngine.tsx';
const BANK_PATH = 'src/components/exam-practice/MatchingFeaturesPassageBank.tsx';
const NEXT_ROUTE_PATH =
  'src/app/(site)/practica/ielts/reading/tipos-de-preguntas/matching-sentence-endings/page.tsx';
const NEXT_ENGINE_PATH = 'src/components/exam-practice/MatchingSentenceEndingsEngine.tsx';
const NEXT_BANK_PATH = 'src/components/exam-practice/MatchingSentenceEndingsPassageBank.tsx';
const OFFICIAL_STRATEGY_PATH = 'src/components/exam-practice/OfficialStrategyCard.tsx';
const REVIEW_SOURCE_BLOCK_PATH = 'src/components/exam-practice/QuestionTypeReviewSourceBlock.tsx';
const STRUCTURED_DATA_PATH = 'src/components/exam-practice/StructuredData.tsx';
const CONTRACT_PATH = 'src/lib/ielts/academic-reading-rights.ts';
const REGISTRY_PATH = 'src/data/practica-exams/ielts-reading-rights-registry.ts';
const VALIDATOR_PATH = 'scripts/check-ielts-reading-matching-features-rights.mjs';
const TEST_PATH = 'tests/ielts-reading-matching-features-rights.test.mjs';
const LOOP_DOC_PATH = 'docs/ielts-reading-loop.md';
const OUTPUT_DIRECTORY = 'output/audits/ielts-reading-rights-matching-features-2026-08-09';
const BASELINE_PATH = `${OUTPUT_DIRECTORY}/baseline.json`;
const SOURCE_AVAILABILITY_PATH = `${OUTPUT_DIRECTORY}/source-availability.json`;
const PROVENANCE_SEARCH_PATH = `${OUTPUT_DIRECTORY}/provenance-search.json`;
const UNIT_CHANGE_MANIFEST_PATH = `${OUTPUT_DIRECTORY}/unit-change-manifest.json`;
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
const PINNED_FINAL_REPORT_SHA256 = {
  auditVerdicts: 'e865c56875485f3da79db7e54e1d0963327694a95d6ba4b02ca872f1703db694',
  buildReport: 'e785dca504b5092c0420a7a2e4df9831dd0dfdd384e8381fdf05cb8b293ff569',
  artifact: 'e9a272e424c2b800a0a34c036e1452655f03212e510b58ae988b57f40c0bd2d9',
  reportMarkdown: '60d682b460c12574af17b7beb7c0d48be58021e9cf12a00d475fb875ed7cb929',
  reportHtml: '46dcb4e85b678c576a3a3703335e1fa5d5ba7b7bcac2df92638c80350058ada7',
};

const EXPECTED_SET_IDS = ['mf-urban-farming', 'mf-memory-research', 'mf-transport-policies'];
const EXPECTED_ASSET_IDS = EXPECTED_SET_IDS.map(id => `formative:matching-features:${id}`);
const EXPECTED_QUESTION_IDS = [
  ...Array.from({ length: 7 }, (_, index) => `mf-urban-farming-${String(index + 1).padStart(2, '0')}`),
  ...Array.from({ length: 6 }, (_, index) => `mf-memory-${String(index + 1).padStart(2, '0')}`),
  ...Array.from({ length: 6 }, (_, index) => `mf-transport-${String(index + 1).padStart(2, '0')}`),
];
const EXPECTED_FEATURE_IDS_BY_SET = {
  'mf-urban-farming': ['A', 'B', 'C', 'D'],
  'mf-memory-research': ['A', 'B', 'C', 'D', 'E'],
  'mf-transport-policies': ['A', 'B', 'C', 'D', 'E'],
};
const EXPECTED_SOURCE_IDS = [
  'ielts-matching-features-official-format',
  'urban-nyc-rooftop-farm',
  'urban-doe-controlled-environment-agriculture',
  'urban-usda-school-gardens',
  'urban-epa-vacant-land-agriculture',
  'urban-usda-cea-energy',
  'memory-pubmed-route-decisions',
  'memory-goodwin-cowitness',
  'memory-nia-external-aids',
  'memory-pmc-sleep-vocabulary',
  'memory-plos-open-book',
  'transport-tfl-bus-priority',
  'transport-who-safe-speeds',
  'transport-uk-maas-accessibility',
  'transport-doe-smart-charge',
  'transport-nyc-pedestrian-plaza',
];
const REQUIRED_FACTUAL_CLAIM_SPANS = {
  'formative:matching-features:mf-urban-farming': [
    'Urban farming is often described as a single movement, but city projects can have very different goals.',
    'The Green Roof Collective began by converting flat commercial roofs into small vegetable plots.',
    'Students maintain raised beds, record soil temperature and compare plant growth under different watering schedules.',
    'The alliance negotiates temporary use agreements with property owners and turns neglected lots into community gardens.',
    'Critics point out that such systems require energy and technical maintenance, but the company says the model is useful where year-round supply matters more than low-tech accessibility.',
  ],
  'formative:matching-features:mf-memory-research': [
    'Her team found that participants remembered routes better when they paused at decision points and described what they expected to see next.',
    'The lab found that people often adopted details they had only heard during discussion, especially when the other speaker sounded confident.',
    'Rather than testing complex digital systems, his project used simple visual routines: a tray by the door for keys, coloured stickers on medication boxes and a checklist beside the kettle.',
    'Students who reviewed new words shortly before sleep and again the next morning remembered more than those who completed both reviews during the afternoon.',
    'Instead, students with well-organized notes tended to review more actively before class because they wanted their notes to be usable under time pressure.',
  ],
  'formative:matching-features:mf-transport-policies': [
    'City officials reported that average bus journey times fell, but shop owners complained that loading spaces became harder to access.',
    'The programme did not greatly change total traffic volume, but hospital data showed fewer serious injuries among pedestrians and cyclists in the treated areas.',
    'Critics noted that the project helped smartphone users first, while cash users had to wait for a later phase.',
    'The trial reduced fuel use in city departments, but managers said the charging schedule had to be planned carefully because some vehicles returned late from maintenance jobs.',
    'After public meetings, the city added a small accessible shuttle around the zone.',
  ],
};
const SHARED_LEARNER_PATHS = [OFFICIAL_STRATEGY_PATH, REVIEW_SOURCE_BLOCK_PATH, STRUCTURED_DATA_PATH];
const LEARNER_FACING_PATHS = [CATALOG_PATH, ROUTE_PATH, ENGINE_PATH, BANK_PATH, ...SHARED_LEARNER_PATHS];
const NEXT_UNIT_PATHS = [NEXT_ROUTE_PATH, NEXT_ENGINE_PATH, NEXT_BANK_PATH];
const FEATURE_LABELS = ['A', 'B', 'C', 'D', 'E'];
const FORBIDDEN_PACKET_KEYS = new Set([
  'answer', 'answers', 'answerkey', 'answerkeys', 'correct', 'correctanswer',
  'correctanswers', 'explanation', 'explanations', 'feedback', 'hint', 'hints',
  'key', 'keys', 'solution', 'solutions', 'trap', 'traps', 'skill', 'skills',
]);
const LEARNER_OR_CONTACT_PII_KEYS = new Set([
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
const normalizeText = text => String(text ?? '').normalize('NFKC').replace(/\s+/gu, ' ').trim();
const wordCount = text => normalizeText(text).split(' ').filter(Boolean).length;
const lexicalWordCount = text => (normalizeText(text).toLowerCase().match(/[a-z0-9]+/gu) ?? []).length;
const sourceSha256 = relativePath => sha256(readFileSync(resolve(ROOT, relativePath)));
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
const readJson = relativePath => JSON.parse(readFileSync(resolve(ROOT, relativePath), 'utf8'));
const strictCalendarDate = (value, label) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/u.exec(String(value));
  assert(match, `${label}: fecha inválida.`);
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const maximumDay = month >= 1 && month <= 12
    ? new Date(Date.UTC(year, month, 0)).getUTCDate()
    : 0;
  assert(year >= 1 && month >= 1 && month <= 12 && day >= 1 && day <= maximumDay,
    `${label}: fecha calendárica inválida.`);
  return true;
};
const timestampMs = (value, label) => {
  const match = /^(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d{1,3})?(Z|[+-]\d{2}:\d{2})$/u
    .exec(String(value));
  assert(match, `${label}: timestamp ISO inválido.`);
  strictCalendarDate(match[1], label);
  const hour = Number(match[2]);
  const minute = Number(match[3]);
  const second = Number(match[4]);
  const zone = match[5];
  if (zone !== 'Z') {
    const zoneHour = Number(zone.slice(1, 3));
    const zoneMinute = Number(zone.slice(4, 6));
    assert(zoneHour <= 14 && zoneMinute <= 59 && (zoneHour < 14 || zoneMinute === 0),
      `${label}: offset ISO inválido.`);
  }
  assert(hour <= 23 && minute <= 59 && second <= 59, `${label}: hora inválida.`);
  const parsed = Date.parse(value);
  assert(Number.isFinite(parsed), `${label}: timestamp inválido.`);
  return parsed;
};

function stableValue(value) {
  if (Array.isArray(value)) return value.map(stableValue);
  if (!isObject(value)) return value;
  return Object.fromEntries(Object.keys(value).sort().map(key => [key, stableValue(value[key])]));
}
const stableJson = value => JSON.stringify(stableValue(value));

function assertExactKeys(value, expectedKeys, label) {
  assert(isObject(value), `${label}: se esperaba un objeto.`);
  assert(stableJson(Object.keys(value).sort()) === stableJson([...expectedKeys].sort()),
    `${label}: keys inesperadas. Esperadas ${[...expectedKeys].sort().join(', ')}; observadas ${Object.keys(value).sort().join(', ')}.`);
}

function assertExactIdCoverage(records, expectedIds, idField, label) {
  assert(Array.isArray(records) && records.length === expectedIds.length, `${label}: cardinalidad inválida.`);
  const observed = records.map(record => record?.[idField]);
  assert(new Set(observed).size === observed.length, `${label}: IDs duplicados.`);
  assert(stableJson([...observed].sort()) === stableJson([...expectedIds].sort()),
    `${label}: IDs extra o ausentes.`);
}

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
  const errors = (javascript.diagnostics ?? []).filter(
    diagnostic => diagnostic.category === ts.DiagnosticCategory.Error,
  );
  assert(errors.length === 0,
    `No se pudo transpilar ${relativePath}: ${errors.map(error => ts.flattenDiagnosticMessageText(error.messageText, '\n')).join('; ')}`);
  const evaluatedModule = { exports: {} };
  vm.runInNewContext(javascript.outputText, {
    module: evaluatedModule,
    exports: evaluatedModule.exports,
    require(specifier) {
      throw new Error(`Import runtime no permitido en ${relativePath}: ${specifier}`);
    },
  }, { filename: absolutePath, timeout: 10_000 });
  return evaluatedModule.exports;
}

function findForbiddenKeys(value, path = '$', findings = []) {
  if (Array.isArray(value)) {
    value.forEach((entry, index) => findForbiddenKeys(entry, `${path}[${index}]`, findings));
    return findings;
  }
  if (!isObject(value)) return findings;
  for (const [key, entry] of Object.entries(value)) {
    const normalizedKey = key.toLowerCase().replace(/[-_]/gu, '');
    if (FORBIDDEN_PACKET_KEYS.has(normalizedKey)) findings.push(`${path}.${key}`);
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
    const normalizedKey = key.toLowerCase().replace(/[-_]/gu, '');
    if (LEARNER_OR_CONTACT_PII_KEYS.has(normalizedKey)) findings.push(`${path}.${key}`);
    findPii(entry, `${path}.${key}`, findings);
  }
  return findings;
}

export function findFeatureAssignmentLeaks(value, path = '$', findings = [], inQuestionRow = false) {
  if (Array.isArray(value)) {
    value.forEach((entry, index) =>
      findFeatureAssignmentLeaks(entry, `${path}[${index}]`, findings, inQuestionRow));
    return findings;
  }
  if (typeof value === 'string') {
    if (inQuestionRow && /\b[A-E]\b/u.test(value) && !findings.includes(path)) findings.push(path);
    const text = normalizeText(value)
      .replace(/\b([A-E])\b/gu, (_match, label) => `featurelabel${label.toLowerCase()}`)
      .toLowerCase();
    const patterns = [
      /\b(?:correct|right|stored|gold)\s+(?:answer|feature|letter|key|choice|option)\s+(?:for\s+mf[-\w]+\s+)?(?:is|:|=|→)\s*(?:feature\s+)?featurelabel[a-e]\b/u,
      /\bmf[-\w]+\s*(?:(?:is|maps? to|corresponds? to)|[:=→])\s*(?:the\s+)?(?:feature|letter|option)?\s*featurelabel[a-e]\b/u,
      /\b(?:choose|select|mark|use|pick|assign)\s+(?:the\s+)?(?:answer\s+)?(?:feature|letter|option)?\s*featurelabel[a-e](?:\s+for\s+mf[-\w]+)?\b/u,
      /\b(?:match|assign)\s+(?:this\s+)?(?:statement|item|question)?\s*(?:with|to)?\s*(?:feature|letter|option)?\s*featurelabel[a-e]\b/u,
      /\b(?:it|this|the\s+(?:answer|choice|selection|match))\s+(?:is|maps? to|corresponds? to)\s+(?:the\s+)?(?:feature|letter|option)?\s*featurelabel[a-e]\b/u,
      /\b(?:answer|choice|selection|match|option|feature|letter|assignment)\s*(?:is|:|=|→)?\s*featurelabel[a-e]\b/u,
      /\b(?:answer|choice|selection|match|option|feature|letter)\s+(?:should|must)\s+be\s+featurelabel[a-e]\b/u,
      /\b(?:the\s+)?(?:correct|right)\s+one\s+(?:is|would\s+be|should\s+be)\s+featurelabel[a-e]\b/u,
      /\b(?:pair|associate)\s+(?:it|this|the\s+(?:statement|item|question))\s+with\s+(?:feature|letter|option)?\s*featurelabel[a-e]\b/u,
      /\b(?:you\s+)?(?:should|must)\s+(?:mark|choose|select|use|pick)\s+(?:feature|letter|option)?\s*featurelabel[a-e]\b/u,
      /\bgo\s+with\s+featurelabel[a-e]\b/u,
      /\bfeaturelabel[a-e]\s+(?:is|would\s+be|should\s+be)\s+(?:the\s+)?(?:correct|right|stored|gold)\s+(?:answer|choice|selection|match|option|feature|letter)\b/u,
      /\b(?:la\s+)?(?:feature|característica|caracteristica|letra|respuesta|clave|opción|opcion)\s+(?:correcta|correcto|almacenada|almacenado|esperada|esperado)\s+(?:de\s+mf[-\w]+\s+)?(?:es|:|=|→)\s*(?:la\s+)?(?:feature|letra)?\s*featurelabel[a-e]\b/u,
      /\bmf[-\w]+\s+(?:corresponde|mapea|apunta|pertenece)\s+(?:a|a\s+la|con|a\s+la\s+letra)?\s*(?:la\s+)?(?:feature|característica|caracteristica|letra|opción|opcion)?\s*featurelabel[a-e]\b/u,
      /\b(?:corresponde|mapea|apunta|pertenece)\s+(?:(?:a|con)\s+)?(?:la\s+)?(?:feature|característica|caracteristica|letra|opción|opcion)?\s*featurelabel[a-e]\b/u,
      /\b(?:elige|selecciona|marca|usa|asigna|empareja)\s+(?:(?:con|a)\s+)?(?:la\s+)?(?:feature|característica|caracteristica|letra|respuesta|clave|opción|opcion)?\s*featurelabel[a-e](?:\s+(?:para|en)\s+mf[-\w]+)?\b/u,
      /\b(?:la|el)\s+(?:correcta|correcto|esperada|esperado)\s+(?:es|:|=|→)\s*featurelabel[a-e]\b/u,
      /\b(?:esta|esto|la\s+(?:respuesta|opción|opcion|selección|seleccion|asociación|asociacion))\s+(?:es|corresponde|mapea|apunta)\s+(?:a\s+)?(?:la\s+)?(?:feature|característica|caracteristica|letra|opción|opcion)?\s*featurelabel[a-e]\b/u,
      /\b(?:respuesta|opción|opcion|selección|seleccion|asociación|asociacion|feature|característica|caracteristica|letra|asignación|asignacion)\s*(?:correcta|correcto)?\s*(?:es|:|=|→)?\s*featurelabel[a-e]\b/u,
      /\b(?:respuesta|opción|opcion|selección|seleccion|feature|característica|caracteristica|letra)\s+(?:debe|debería|deberia)\s+ser\s+featurelabel[a-e]\b/u,
      /\b(?:asocia|asociar|empareja|emparejar)\s+(?:esto|esta|el\s+(?:statement|enunciado|ítem|item))?\s*(?:con|a)\s+(?:la\s+)?(?:feature|letra|opción|opcion)?\s*featurelabel[a-e]\b/u,
      /\b(?:debes|deberías|deberias|tienes\s+que)\s+(?:marcar|elegir|seleccionar|usar)\s+(?:la\s+)?(?:feature|letra|opción|opcion)?\s*featurelabel[a-e]\b/u,
      /\b(?:va\s+con|pon)\s+(?:la\s+)?(?:feature|letra|opción|opcion)?\s*featurelabel[a-e]\b/u,
      /\bfeaturelabel[a-e]\s+es\s+(?:la|el)?\s*(?:respuesta|opción|opcion|selección|seleccion|asociación|asociacion|feature|característica|caracteristica|letra)\s+(?:correcta|correcto|esperada|esperado)\b/u,
    ];
    if (patterns.some(pattern => pattern.test(text)) && !findings.includes(path)) findings.push(path);
    return findings;
  }
  if (!isObject(value)) return findings;
  const scopedQuestionId = inQuestionRow ||
    (typeof value.questionId === 'string' && /^mf[-\w]+$/u.test(value.questionId));
  const assignmentValueKeys = new Set([
    'answer', 'assignment', 'choice', 'chosen', 'chosenoption', 'feature', 'key', 'letter',
    'match', 'option', 'respuesta', 'selected', 'selectedoption', 'selection', 'asignacion',
  ]);
  for (const [key, entry] of Object.entries(value)) {
    const keyPhrase = key.replace(/[-_]+/gu, ' ');
    findFeatureAssignmentLeaks(keyPhrase, `${path}.${key}:key`, findings, scopedQuestionId);
    const normalizedKey = key.toLowerCase().replace(/[-_]/gu, '');
    if (scopedQuestionId && typeof entry === 'string' && /^[A-E]$/u.test(entry.trim()) &&
      assignmentValueKeys.has(normalizedKey) && !findings.includes(`${path}.${key}`)) {
      findings.push(`${path}.${key}`);
    }
    findFeatureAssignmentLeaks(entry, `${path}.${key}`, findings, scopedQuestionId);
  }
  return findings;
}

export function assertBoardStopBoundary(loopDocText) {
  const expectedClosedBoardRow =
    '| 0 | 　　　 ↳ F0.2b.6 Matching Features | ✅ | ✅ | ✅ | ✅ | ✅ | ➖ | ➖ |';
  const expectedClosedSuccessorRow =
    '| 0 | 　　　 ↳ F0.2b.7 Matching Sentence Endings | ✅ | ✅ | ✅ | ✅ | ✅ | ➖ | ➖ |';
  const expectedClosedCurrentRow =
    '| 0 | 　　　 ↳ F0.2b.8 Sentence Completion | ✅ | ✅ | ✅ | ✅ | ✅ | ➖ | ➖ |';
  const expectedOpenBoardRow =
    '| 0 | 　　　 ↳ F0.2b.9 Summary Completion | — | — | — | — | — | — | — |';
  const expectedClosedProgressedRow =
    '| 0 | 　　　 ↳ F0.2b.9 Summary Completion | ✅ | ✅ | ✅ | ✅ | ✅ | ➖ | ➖ |';
  const expectedOpenParentRow =
    '| 0 | 　 ↳ F0.2b Adjudicación de bancos formativos — padre | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 |';
  const stopText = 'Siguiente subunidad, sin iniciarla: ' + String.fromCharCode(96) +
    'F0.2b.9 Summary Completion' + String.fromCharCode(96) + '.';
  const rows = loopDocText.split(/\r?\n/gu);
  const unitRows = label => rows.filter(row => row.includes(label));
  assert(unitRows('↳ F0.2b.6 Matching Features').length === 1 &&
    unitRows('↳ F0.2b.6 Matching Features')[0] === expectedClosedBoardRow,
  'El tablero debe contener una sola fila F0.2b.6 cerrada y exacta.');
  assert(unitRows('↳ F0.2b.7 Matching Sentence Endings').length === 1 &&
    unitRows('↳ F0.2b.7 Matching Sentence Endings')[0] === expectedClosedSuccessorRow,
  'El tablero debe contener una sola fila F0.2b.7 cerrada y exacta.');
  assert(unitRows('↳ F0.2b.8 Sentence Completion').length === 1 &&
    unitRows('↳ F0.2b.8 Sentence Completion')[0] === expectedClosedCurrentRow,
  'El tablero debe contener una sola fila F0.2b.8 cerrada y exacta.');
  assert(unitRows('↳ F0.2b.9 Summary Completion').length === 1 &&
    [expectedOpenBoardRow, expectedClosedProgressedRow]
      .includes(unitRows('↳ F0.2b.9 Summary Completion')[0]),
  'El tablero debe contener una sola fila F0.2b.9 exacta y con progreso monotónico.');
  assert(unitRows('↳ F0.2b Adjudicación de bancos formativos — padre').length === 1 &&
    unitRows('↳ F0.2b Adjudicación de bancos formativos — padre')[0] === expectedOpenParentRow,
  'El tablero debe contener un solo padre F0.2b abierto y exacto.');
  assert(loopDocText.split(stopText).length - 1 === 1,
    'El corte antes de F0.2b.9 debe aparecer exactamente una vez.');
  return true;
}

function sourceAssets(catalog) {
  const sets = catalog.IELTS_MATCHING_FEATURES_PASSAGES;
  assert(Array.isArray(sets), 'Falta IELTS_MATCHING_FEATURES_PASSAGES.');
  return sets.map((set, setIndex) => ({
    assetId: `formative:matching-features:${set.id}`,
    setIndex,
    id: set.id,
    title: set.title,
    instructions: set.instructions,
    passageTitle: set.passageTitle,
    passage: set.passage,
    features: set.features,
    decisions: set.questions.map((question, questionIndex) => ({ ...question, questionIndex })),
    wordCount: wordCount(set.passage),
    sourceObjectSha256: sha256(stableJson(set)),
    passageSha256: sha256(normalizeText(`${set.passageTitle}\n${set.passage}`)),
  }));
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

function sourceFilesUnder(relativeDirectory) {
  return readdirSync(resolve(ROOT, relativeDirectory), { recursive: true, withFileTypes: true })
    .filter(entry => entry.isFile() && /\.(?:ts|tsx|js|jsx|mjs)$/u.test(entry.name))
    .map(entry => resolve(entry.parentPath, entry.name));
}

function resolveLocalSourceImport(fromAbsolutePath, specifier) {
  if (!(specifier.startsWith('@/') || specifier.startsWith('.'))) return null;
  const unresolved = specifier.startsWith('@/')
    ? resolve(ROOT, 'src', specifier.slice(2))
    : resolve(dirname(fromAbsolutePath), specifier);
  const candidates = [
    unresolved,
    ...['.ts', '.tsx', '.js', '.jsx', '.mjs', '.css'].map(extension => `${unresolved}${extension}`),
    ...['.ts', '.tsx', '.js', '.jsx', '.mjs'].map(extension => resolve(unresolved, `index${extension}`)),
  ];
  return candidates.find(candidate => existsSync(candidate) && /\.(?:ts|tsx|js|jsx|mjs|css)$/u.test(candidate)) ?? null;
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

function longestRun(labels) {
  let best = 0;
  let current = 0;
  let previous = null;
  for (const label of labels) {
    current = label === previous ? current + 1 : 1;
    previous = label;
    best = Math.max(best, current);
  }
  return best;
}

function wilsonUpper(hits, eligible, z = 1.645) {
  if (!eligible) return null;
  const p = hits / eligible;
  const z2 = z * z;
  const denominator = 1 + z2 / eligible;
  const center = p + z2 / (2 * eligible);
  const margin = z * Math.sqrt((p * (1 - p) + z2 / (4 * eligible)) / eligible);
  return (center + margin) / denominator;
}

const LEXICAL_SHORTCUT_STOPWORDS = new Set([
  'access', 'and', 'are', 'because', 'been', 'being', 'for', 'from', 'into', 'more',
  'one', 'rather', 'that', 'the', 'their', 'than', 'through', 'used', 'users', 'was',
  'were', 'with',
]);

function lexicalOverlap(source, candidate) {
  const tokens = text => (normalizeText(text).toLowerCase().match(/[a-z]{3,}/gu) ?? [])
    .filter(token => !LEXICAL_SHORTCUT_STOPWORDS.has(token));
  const sourceTokens = new Set(tokens(source));
  const candidateTokens = [...new Set(tokens(candidate))];
  return candidateTokens.length
    ? candidateTokens.filter(token => sourceTokens.has(token)).length / candidateTokens.length
    : 0;
}

function predictorSummary(rows, scoreCandidates, storedField) {
  let eligible = 0;
  let hits = 0;
  let tiesOrAbstentions = 0;
  const detail = [];
  for (const row of rows) {
    const scores = scoreCandidates(row);
    const best = Math.max(...scores.map(candidate => candidate.score));
    const winners = scores.filter(candidate => candidate.score === best);
    if (winners.length === 1) {
      eligible += 1;
      if (winners[0].featureId === row.answer) hits += 1;
    } else tiesOrAbstentions += 1;
    detail.push({ questionId: row.decision.id, [storedField]: row.answer, scores });
  }
  return {
    eligible,
    tiesOrAbstentions,
    hits,
    conditionalAccuracy: eligible ? hits / eligible : null,
    totalAccuracy: hits / rows.length,
    rows: detail,
  };
}

function structuralBiasProfile(assets, answerByQuestionId) {
  const rows = assets.flatMap(asset => asset.decisions.map(decision => ({
    asset,
    decision,
    answer: answerByQuestionId.get(decision.id),
  })));
  assert(rows.every(row => row.asset.features.some(feature => feature.id === row.answer)),
    'El perfil contiene letras sin feature vinculada.');
  const answerSequence = rows.map(row => row.answer);
  const answerCounts = Object.fromEntries(FEATURE_LABELS.map(label => [
    label, answerSequence.filter(answer => answer === label).length,
  ]));
  const constantLabelHeuristics = Object.fromEntries(FEATURE_LABELS.map(label => [label, {
    hits: answerCounts[label],
    total: rows.length,
    accuracy: answerCounts[label] / rows.length,
  }]));
  const moduloHits = rows.filter(row => {
    const predicted = row.asset.features[row.decision.questionIndex % row.asset.features.length].id;
    return predicted === row.answer;
  }).length;
  const overlap = predictorSummary(rows, row => row.asset.features.map(feature => ({
    featureId: feature.id,
    labelScore: lexicalOverlap(row.decision.statement, feature.label),
    descriptionScore: lexicalOverlap(row.decision.statement, feature.description),
    score: lexicalOverlap(row.decision.statement, `${feature.label} ${feature.description}`),
  })), 'storedFeatureId');
  const longest = predictorSummary(rows, row => row.asset.features.map(feature => ({
    featureId: feature.id,
    words: lexicalWordCount(feature.description),
    score: lexicalWordCount(feature.description),
  })), 'storedFeatureId');
  const featureLengthByLabel = Object.fromEntries(FEATURE_LABELS.map(label => {
    const lengths = assets.flatMap(asset => asset.features
      .filter(feature => feature.id === label)
      .map(feature => lexicalWordCount(`${feature.label} ${feature.description}`)));
    return [label, {
      options: lengths.length,
      averageWords: lengths.length ? lengths.reduce((sum, value) => sum + value, 0) / lengths.length : null,
      minWords: lengths.length ? Math.min(...lengths) : null,
      maxWords: lengths.length ? Math.max(...lengths) : null,
    }];
  }));
  const perSet = assets.map(asset => {
    const answers = asset.decisions.map(decision => answerByQuestionId.get(decision.id));
    const counts = Object.fromEntries(asset.features.map(feature => [
      feature.id, answers.filter(answer => answer === feature.id).length,
    ]));
    return {
      assetId: asset.assetId,
      declaredReuseAllowed: /may be used more than once/iu.test(asset.instructions),
      answerCounts: counts,
      answerSequence: answers,
      reusedFeatureIds: asset.features.map(feature => feature.id).filter(id => counts[id] > 1),
      unusedFeatureIds: asset.features.map(feature => feature.id).filter(id => counts[id] === 0),
    };
  });
  const transitions = {};
  for (let index = 1; index < answerSequence.length; index += 1) {
    const transition = `${answerSequence[index - 1]} → ${answerSequence[index]}`;
    transitions[transition] = (transitions[transition] ?? 0) + 1;
  }
  return {
    answerCounts,
    globalConcatenatedMaxSameLabelRun: longestRun(answerSequence),
    perSetMaxSameLabelRun: Math.max(...perSet.map(row => longestRun(row.answerSequence))),
    constantLabelHeuristics,
    questionPositionModuloFeatureCount: {
      definition: 'Within each set, predict feature at zero-based question position modulo k features.',
      eligible: rows.length,
      tiesOrAbstentions: 0,
      hits: moduloHits,
      conditionalAccuracy: moduloHits / rows.length,
      totalAccuracy: moduloHits / rows.length,
      perQuestionUniformBaseline: rows.reduce((sum, row) => sum + 1 / row.asset.features.length, 0) / rows.length,
      wilsonUpper95: wilsonUpper(moduloHits, rows.length),
    },
    highestLabelDescriptionOverlapPredictsAnswer: overlap,
    longestFeatureDescriptionWordCountPredictsAnswer: {
      ...longest,
      definition: 'Count lowercase ASCII word tokens in feature.description only; hyphens split tokens.',
    },
    featureLengthByLabel,
    descriptionTitleCue: {
      featureDescriptionsVisiblePreResponse: assets.reduce((sum, asset) => sum + asset.features.length, 0),
      passageTitlesVisible: assets.filter(asset => asset.passageTitle).length,
      independentDescriptionOnlyMatches: 16,
      independentPreAnswerTrapMatches: 18,
      expertRiskDimensionsRequired: ['featureDescriptionCueRisk', 'passageTitleCueRisk'],
    },
    perSet,
    sequenceProfile: { answerSequence, transitions },
  };
}

export function buildBlindReviewPacket() {
  const assets = sourceAssets(loadTsModule(CATALOG_PATH));
  const packet = {
    schemaVersion: 'ielts-reading-matching-features-blind-review.v1',
    generatedAt: PACKETS_GENERATED_AT,
    reviewScope: 'F0.2b.6 — three formative Matching Features passages',
    reviewerIsolation:
      'Use only this packet for the first pass. Do not open the catalog, registry, validator, route, runtime, prior audits or factual-source packet until all 19 decisions have been persisted separately.',
    taskRule:
      'Match each statement to the lettered person, group, study or policy responsible for the action, view, result or limitation. A feature may be reused when the instructions permit it, and some features may remain unused.',
    instruction:
      'Independently adjudicate all 19 statements. Choose one feature, quote decisive passage evidence, explain the association and identify the closest competing feature and why it fails. Record material ambiguity, passage-title cue risk, feature-description cue risk and IELTS fitness. This is an AI editorial review, not a human signature, rights clearance or publication approval.',
    excludes: [
      'answer keys', 'correctness labels', 'explanations', 'trap labels',
      'declared skills', 'prior reviewer decisions', 'student data',
    ],
    records: EXPECTED_ASSET_IDS.map(assetId => {
      const asset = assets.find(candidate => candidate.assetId === assetId);
      assert(asset, `${assetId}: activo ausente.`);
      return {
        assetId,
        title: asset.title,
        sourceObjectSha256: asset.sourceObjectSha256,
        passageSha256: asset.passageSha256,
        instructions: asset.instructions,
        passageTitle: asset.passageTitle,
        passage: asset.passage,
        features: asset.features.map(feature => ({
          featureId: feature.id,
          label: feature.label,
          description: feature.description,
        })),
        statements: asset.decisions.map(decision => ({
          questionId: decision.id,
          statement: decision.statement,
        })),
      };
    }),
  };
  assertExactKeys(packet,
    ['schemaVersion', 'generatedAt', 'reviewScope', 'reviewerIsolation', 'taskRule', 'instruction', 'excludes', 'records'],
    'blindReview');
  packet.records.forEach((record, recordIndex) => {
    assertExactKeys(record,
      ['assetId', 'title', 'sourceObjectSha256', 'passageSha256', 'instructions', 'passageTitle', 'passage', 'features', 'statements'],
      `blindReview.records[${recordIndex}]`);
    record.features.forEach((feature, featureIndex) => assertExactKeys(
      feature, ['featureId', 'label', 'description'],
      `blindReview.records[${recordIndex}].features[${featureIndex}]`));
    record.statements.forEach((statement, statementIndex) => assertExactKeys(
      statement, ['questionId', 'statement'],
      `blindReview.records[${recordIndex}].statements[${statementIndex}]`));
  });
  assert(findForbiddenKeys(packet).length === 0, 'El packet ciego filtra answers, feedback o skills.');
  assert(findFeatureAssignmentLeaks(packet).length === 0,
    'El packet ciego filtra una asignación EN/ES de feature o letra.');
  assert(findPii(packet).length === 0, 'El packet ciego contiene PII learner/contact.');
  return packet;
}

export function buildFactualSourceReviewPacket() {
  const registry = loadTsModule(REGISTRY_PATH).IELTS_READING_RIGHTS_REGISTRY;
  const evidenceById = new Map(registry.evidence.map(evidence => [evidence.id, evidence]));
  const packet = {
    schemaVersion: 'ielts-reading-matching-features-factual-source-review.v1',
    generatedAt: PACKETS_GENERATED_AT,
    reviewScope: 'F0.2b.6 — second-pass factual-source review only',
    instruction:
      'Open only after persisting the complete blind first pass. Review each exact claim span against candidate sources and classify it supported, oversimplified, unsupported or untraceable. A fetch status or candidate source does not prove the claim, authorship, license, authorization or human verification.',
    records: EXPECTED_ASSET_IDS.map(assetId => {
      const rows = registry.entries.filter(entry => entry.assetId === assetId);
      assert(rows.length === 1, `${assetId}: se esperaba un registro global.`);
      const record = rows[0];
      return {
        assetId,
        claimSpansToReview: REQUIRED_FACTUAL_CLAIM_SPANS[assetId],
        candidateSources: record.factualSourceResearch.sourceEvidenceIds.map(evidenceId => {
          const evidence = evidenceById.get(evidenceId);
          assert(evidence?.kind === 'factual-source', `${assetId}: fuente factual inválida.`);
          return { evidenceId: evidence.id, label: evidence.label, url: evidence.url, note: evidence.note };
        }),
        limitation: record.factualSourceResearch.limitation,
      };
    }),
  };
  assert(findForbiddenKeys(packet).length === 0, 'El packet factual filtra claves o feedback.');
  assert(findFeatureAssignmentLeaks(packet).length === 0, 'El packet factual filtra asignaciones.');
  assert(findPii(packet).length === 0, 'El packet factual contiene PII.');
  return packet;
}

function validateQuestionDecision(decision, sourceDecision, asset, label) {
  assertExactKeys(decision,
    ['questionId', 'selectedFeatureId', 'evidenceQuotes', 'association',
      'closestCompetingFeatureId', 'competitorFailure', 'ambiguity', 'reasoning'],
    label);
  assert(decision.questionId === sourceDecision.id, `${label}: questionId no coincide.`);
  const featureIds = asset.features.map(feature => feature.id);
  assert(featureIds.includes(decision.selectedFeatureId), `${label}: feature seleccionada inválida.`);
  assert(featureIds.includes(decision.closestCompetingFeatureId) &&
    decision.closestCompetingFeatureId !== decision.selectedFeatureId,
  `${label}: closest competitor ausente, inválido o idéntico.`);
  assert(Array.isArray(decision.evidenceQuotes) && decision.evidenceQuotes.length >= 1 &&
    new Set(decision.evidenceQuotes.map(normalizeText)).size === decision.evidenceQuotes.length &&
    decision.evidenceQuotes.every(quote => typeof quote === 'string' && quote.trim() &&
      normalizeText(asset.passage).includes(normalizeText(quote))),
  `${label}: evidenceQuotes deben ser spans únicos del pasaje.`);
  assert(typeof decision.association === 'string' && decision.association.trim() &&
    typeof decision.competitorFailure === 'string' && decision.competitorFailure.trim() &&
    ['none', 'minor', 'material'].includes(decision.ambiguity) &&
    typeof decision.reasoning === 'string' && decision.reasoning.trim(),
  `${label}: contrato de asociación/competencia incompleto.`);
}

function validateFirstPass(firstPass, assets, blindReview) {
  assertExactKeys(firstPass, ['schemaVersion', 'reviewer', 'records'], 'firstPass');
  assert(firstPass.schemaVersion === 'ielts-reading-matching-features-expert-first-pass.v1',
    'Schema first-pass inválido.');
  assertExactKeys(firstPass.reviewer,
    ['reviewerRunId', 'reviewedAt', 'blindPacketSha256', 'humanSignature', 'sourceContext', 'notes'],
    'firstPass.reviewer');
  assert(typeof firstPass.reviewer.reviewerRunId === 'string' && firstPass.reviewer.reviewerRunId.trim() &&
    Number.isFinite(Date.parse(firstPass.reviewer.reviewedAt)) &&
    firstPass.reviewer.blindPacketSha256 === sourceSha256(BLIND_REVIEW_PATH) &&
    firstPass.reviewer.humanSignature === false &&
    firstPass.reviewer.sourceContext === 'blind-review-packet-only' &&
    ((typeof firstPass.reviewer.notes === 'string' && firstPass.reviewer.notes.trim()) ||
      (Array.isArray(firstPass.reviewer.notes) && firstPass.reviewer.notes.length > 0 &&
        firstPass.reviewer.notes.every(note => typeof note === 'string' && note.trim()))),
  'Reviewer first-pass inválido.');
  assertExactIdCoverage(firstPass.records, EXPECTED_ASSET_IDS, 'assetId', 'firstPass.records');
  let questionCount = 0;
  for (const asset of assets) {
    const record = firstPass.records.find(candidate => candidate.assetId === asset.assetId);
    assertExactKeys(record, ['assetId', 'passageAssessment', 'questions'], `${asset.assetId}:firstPass`);
    assertExactKeys(record.passageAssessment,
      ['ieltsFitness', 'passageTitleCueRisk', 'featureDescriptionCueRisk', 'notes'],
      `${asset.assetId}:firstPass.passageAssessment`);
    assert(['fit', 'mixed', 'unfit'].includes(record.passageAssessment.ieltsFitness) &&
      ['low', 'medium', 'high'].includes(record.passageAssessment.passageTitleCueRisk) &&
      ['low', 'medium', 'high'].includes(record.passageAssessment.featureDescriptionCueRisk) &&
      ((typeof record.passageAssessment.notes === 'string' && record.passageAssessment.notes.trim()) ||
        (Array.isArray(record.passageAssessment.notes) && record.passageAssessment.notes.length > 0 &&
          record.passageAssessment.notes.every(note => typeof note === 'string' && note.trim()))),
    `${asset.assetId}: first-pass passage assessment incompleto.`);
    assertExactIdCoverage(record.questions, asset.decisions.map(question => question.id), 'questionId',
      `${asset.assetId}:firstPass.questions`);
    for (const sourceDecision of asset.decisions) {
      validateQuestionDecision(
        record.questions.find(candidate => candidate.questionId === sourceDecision.id),
        sourceDecision,
        asset,
        `${sourceDecision.id}:firstPass`,
      );
      questionCount += 1;
    }
  }
  assert(blindReview.records.reduce((sum, record) => sum + record.statements.length, 0) === questionCount,
    'First-pass no cubre exactamente el packet ciego.');
  return { questionCount, fileSha256: sourceSha256(FIRST_PASS_PATH) };
}

function validateExpertVerdict(expertVerdict, firstPass, firstPassTrace, assets, factualPacket) {
  assertExactKeys(expertVerdict, ['schemaVersion', 'reviewer', 'records'], 'expertVerdict');
  assert(expertVerdict.schemaVersion === 'ielts-reading-matching-features-expert-verdict.v1',
    'Schema expert inválido.');
  assertExactKeys(expertVerdict.reviewer,
    ['humanSignature', 'sourceContext', 'reviewSequence', 'reviewerRunId', 'reviewedAt',
      'blindPacketSha256', 'firstPassSha256', 'openedEvidenceIds', 'directSourceReview', 'notes'],
    'expertVerdict.reviewer');
  const expectedEvidenceIds = factualPacket.records
    .flatMap(record => record.candidateSources.map(source => source.evidenceId)).sort();
  assert(expertVerdict.reviewer.humanSignature === false &&
    expertVerdict.reviewer.sourceContext === 'two-pass-blind-then-factual-sources' &&
    stableJson(expertVerdict.reviewer.reviewSequence) === stableJson(['blind-review', 'factual-source-review']) &&
    expertVerdict.reviewer.reviewerRunId === firstPass.reviewer.reviewerRunId &&
    Number.isFinite(Date.parse(expertVerdict.reviewer.reviewedAt)) &&
    expertVerdict.reviewer.blindPacketSha256 === sourceSha256(BLIND_REVIEW_PATH) &&
    expertVerdict.reviewer.firstPassSha256 === firstPassTrace.fileSha256 &&
    stableJson([...expertVerdict.reviewer.openedEvidenceIds].sort()) === stableJson(expectedEvidenceIds) &&
    expertVerdict.reviewer.directSourceReview === true &&
    ((typeof expertVerdict.reviewer.notes === 'string' && expertVerdict.reviewer.notes.trim()) ||
      (Array.isArray(expertVerdict.reviewer.notes) && expertVerdict.reviewer.notes.length > 0 &&
        expertVerdict.reviewer.notes.every(note => typeof note === 'string' && note.trim()))),
  'Trazabilidad de expert verdict inválida.');
  assertExactIdCoverage(expertVerdict.records, EXPECTED_ASSET_IDS, 'assetId', 'expertVerdict.records');
  const comparisons = [];
  const factualClaims = [];
  for (const asset of assets) {
    const record = expertVerdict.records.find(candidate => candidate.assetId === asset.assetId);
    const firstRecord = firstPass.records.find(candidate => candidate.assetId === asset.assetId);
    const sourceRecord = factualPacket.records.find(candidate => candidate.assetId === asset.assetId);
    assertExactKeys(record, ['assetId', 'passageAssessment', 'questions', 'factualClaims'],
      `${asset.assetId}:expert`);
    assertExactKeys(record.passageAssessment,
      ['ieltsFitness', 'factualRisk', 'representationRisk', 'priorKnowledgeRisk',
        'irrelevantLoadRisk', 'passageTitleCueRisk', 'featureDescriptionCueRisk', 'notes'],
      `${asset.assetId}:expert.passageAssessment`);
    assert(['fit', 'mixed', 'unfit'].includes(record.passageAssessment.ieltsFitness) &&
      ['factualRisk', 'representationRisk', 'priorKnowledgeRisk', 'irrelevantLoadRisk',
        'passageTitleCueRisk', 'featureDescriptionCueRisk']
        .every(key => ['low', 'medium', 'high'].includes(record.passageAssessment[key])) &&
      ((typeof record.passageAssessment.notes === 'string' && record.passageAssessment.notes.trim()) ||
        (Array.isArray(record.passageAssessment.notes) && record.passageAssessment.notes.length > 0 &&
          record.passageAssessment.notes.every(note => typeof note === 'string' && note.trim()))),
    `${asset.assetId}: expert passage assessment inválido.`);
    assertExactIdCoverage(record.questions, asset.decisions.map(question => question.id), 'questionId',
      `${asset.assetId}:expert.questions`);
    for (const sourceDecision of asset.decisions) {
      const decision = record.questions.find(candidate => candidate.questionId === sourceDecision.id);
      const firstDecision = firstRecord.questions.find(candidate => candidate.questionId === sourceDecision.id);
      validateQuestionDecision(decision, sourceDecision, asset, `${sourceDecision.id}:expert`);
      assert(stableJson(decision) === stableJson(firstDecision),
        `${sourceDecision.id}: cambió tras abrir fuentes; el primer pase no quedó fijado.`);
      comparisons.push({
        questionId: sourceDecision.id,
        expertFeatureId: decision.selectedFeatureId,
        matchesStoredKey: decision.selectedFeatureId === sourceDecision.answer,
        ambiguity: decision.ambiguity,
      });
    }
    const expectedClaims = REQUIRED_FACTUAL_CLAIM_SPANS[asset.assetId];
    assertExactIdCoverage(record.factualClaims, expectedClaims, 'claim', `${asset.assetId}:factualClaims`);
    for (const claim of record.factualClaims) {
      assertExactKeys(claim, ['claim', 'assessment', 'evidenceIds', 'sourceFindings', 'note'],
        `${asset.assetId}:claim`);
      assert(['supported', 'oversimplified', 'unsupported', 'untraceable'].includes(claim.assessment) &&
        Array.isArray(claim.evidenceIds) && claim.evidenceIds.length > 0 &&
        new Set(claim.evidenceIds).size === claim.evidenceIds.length &&
        claim.evidenceIds.every(id => sourceRecord.candidateSources.some(source => source.evidenceId === id)) &&
        Array.isArray(claim.sourceFindings) && claim.sourceFindings.length > 0 &&
        typeof claim.note === 'string' && claim.note.trim(),
      `${asset.assetId}: claim review inválido.`);
      const findingIds = new Set();
      for (const finding of claim.sourceFindings) {
        assertExactKeys(finding, ['evidenceId', 'locator', 'evidenceSummary'],
          `${asset.assetId}:sourceFinding`);
        assert(claim.evidenceIds.includes(finding.evidenceId) && !findingIds.has(finding.evidenceId) &&
          typeof finding.locator === 'string' && finding.locator.trim() &&
          typeof finding.evidenceSummary === 'string' && finding.evidenceSummary.trim(),
        `${asset.assetId}: finding inválido.`);
        findingIds.add(finding.evidenceId);
      }
      assert(claim.evidenceIds.every(id => findingIds.has(id)), `${asset.assetId}: evidencia sin locator.`);
      factualClaims.push({ ...claim, assetId: asset.assetId });
    }
  }
  return { comparisons, factualClaims };
}

function validateStudentWalkthrough(walkthrough, assets) {
  assertExactKeys(walkthrough, ['schemaVersion', 'reviewer', 'records'], 'studentWalkthrough');
  assert(walkthrough.schemaVersion === 'ielts-reading-matching-features-student-walkthrough.v1',
    'Schema walkthrough inválido.');
  assertExactKeys(walkthrough.reviewer, ['humanSignature', 'sourceContext', 'reviewedAt', 'notes'],
    'studentWalkthrough.reviewer');
  assert(walkthrough.reviewer.humanSignature === false &&
    walkthrough.reviewer.sourceContext === 'blind-review-packet-only' &&
    Number.isFinite(Date.parse(walkthrough.reviewer.reviewedAt)) &&
    Array.isArray(walkthrough.reviewer.notes) && walkthrough.reviewer.notes.length > 0 &&
    walkthrough.reviewer.notes.every(note => typeof note === 'string' && note.trim()),
  'Reviewer walkthrough inválido.');
  assert(findForbiddenKeys(walkthrough).length === 0 &&
    findFeatureAssignmentLeaks(walkthrough).length === 0 && findPii(walkthrough).length === 0,
  'Walkthrough filtra clave, feedback editorial o PII.');
  assertExactIdCoverage(walkthrough.records, EXPECTED_ASSET_IDS, 'assetId', 'studentWalkthrough.records');
  let questionsCovered = 0;
  for (const asset of assets) {
    const record = walkthrough.records.find(candidate => candidate.assetId === asset.assetId);
    assertExactKeys(record,
      ['assetId', 'passageBarrier', 'featureDescriptionRisk', 'passageTitleInfluenceRisk',
        'shortcutRisks', 'transferValue', 'nextAction', 'questionWalkthrough'],
      `${asset.assetId}:walkthrough`);
    assert(['low', 'medium', 'high'].includes(record.featureDescriptionRisk) &&
      ['low', 'medium', 'high'].includes(record.passageTitleInfluenceRisk) &&
      typeof record.passageBarrier === 'string' && record.passageBarrier.trim() &&
      Array.isArray(record.shortcutRisks) && record.shortcutRisks.length >= 2 &&
      record.shortcutRisks.every(value => typeof value === 'string' && value.trim()) &&
      typeof record.transferValue === 'string' && record.transferValue.trim() &&
      typeof record.nextAction === 'string' && record.nextAction.trim(),
    `${asset.assetId}: walkthrough incompleto.`);
    assertExactIdCoverage(record.questionWalkthrough, asset.decisions.map(question => question.id), 'questionId',
      `${asset.assetId}:walkthrough.questions`);
    for (const sourceDecision of asset.decisions) {
      const row = record.questionWalkthrough.find(candidate => candidate.questionId === sourceDecision.id);
      assertExactKeys(row,
        ['questionId', 'likelyMisread', 'associationTarget', 'evidenceSearch', 'featureComparison',
          'competitorCheck', 'decisionRule', 'repairAction'],
        `${sourceDecision.id}:walkthrough`);
      assert(Object.values(row).every(value => typeof value === 'string' && value.trim()),
        `${sourceDecision.id}: walkthrough vacío.`);
      questionsCovered += 1;
    }
  }
  return { passagesCovered: assets.length, questionsCovered };
}

function validateSourceAvailability(sourceAvailability, registry) {
  assertExactKeys(sourceAvailability,
    ['schemaVersion', 'checkedAt', 'method', 'sources', 'interpretation'], 'sourceAvailability');
  assert(sourceAvailability.schemaVersion === 'ielts-reading-matching-features-source-availability.v1' &&
    strictCalendarDate(sourceAvailability.checkedAt, 'sourceAvailability.checkedAt') &&
    sourceAvailability.method.includes('response-body SHA-256') &&
    sourceAvailability.interpretation.includes('do not establish authorship'),
  'Metadata de disponibilidad inválida.');
  assertExactIdCoverage(sourceAvailability.sources, [...EXPECTED_SOURCE_IDS].sort(), 'evidenceId',
    'sourceAvailability.sources');
  const evidenceById = new Map(registry.evidence.map(evidence => [evidence.id, evidence]));
  sourceAvailability.sources.forEach((source, index) => {
    assertExactKeys(source,
      ['evidenceId', 'requestedUrl', 'retrievedAt', 'httpStatus', 'finalUrl', 'redirected',
        'contentType', 'sizeBytes', 'bodySha256'],
      `sourceAvailability.sources[${index}]`);
    const evidence = evidenceById.get(source.evidenceId);
    assert(evidence?.url === source.requestedUrl &&
      Number.isFinite(Date.parse(source.retrievedAt)) &&
      Number.isInteger(source.httpStatus) && source.httpStatus >= 100 && source.httpStatus <= 599 &&
      typeof source.finalUrl === 'string' && source.finalUrl.trim() &&
      typeof source.redirected === 'boolean' &&
      (source.contentType === null || typeof source.contentType === 'string') &&
      Number.isInteger(source.sizeBytes) && source.sizeBytes >= 0 &&
      (source.bodySha256 === null || /^[a-f0-9]{64}$/u.test(source.bodySha256)),
    `${source.evidenceId}: ledger de disponibilidad inválido.`);
    if (source.httpStatus === 200) {
      assert(source.sizeBytes > 1000 && /^[a-f0-9]{64}$/u.test(source.bodySha256),
        `${source.evidenceId}: respuesta 200 sin cuerpo fijado.`);
    }
  });
}

function validateProvenanceSearch(provenanceSearch) {
  assertExactKeys(provenanceSearch,
    ['schemaVersion', 'searchedAt', 'method', 'searchSurface', 'queries', 'interpretation'],
    'provenanceSearch');
  assert(provenanceSearch.schemaVersion === 'ielts-reading-matching-features-provenance-search.v1' &&
    Number.isFinite(Date.parse(provenanceSearch.searchedAt)) &&
    provenanceSearch.interpretation.includes('non-exhaustive') &&
    provenanceSearch.interpretation.includes('does not prove originality'),
  'Ledger de procedencia inválido.');
  assertExactIdCoverage(provenanceSearch.queries, EXPECTED_ASSET_IDS, 'assetId', 'provenanceSearch.queries');
  provenanceSearch.queries.forEach((query, queryIndex) => {
    assertExactKeys(query, ['assetId', 'query', 'resultsReviewed', 'outcome'],
      `provenanceSearch.queries[${queryIndex}]`);
    assert(typeof query.query === 'string' && query.query.trim() &&
      query.outcome === 'no-exact-match-in-reviewed-results' &&
      Array.isArray(query.resultsReviewed) && query.resultsReviewed.length >= 2,
    `${query.assetId}: búsqueda de procedencia incompleta.`);
    query.resultsReviewed.forEach((result, resultIndex) => {
      assertExactKeys(result, ['title', 'url', 'reasonNotExactMatch'],
        `${query.assetId}:resultsReviewed[${resultIndex}]`);
      assert(Object.values(result).every(value => typeof value === 'string' && value.trim()),
        `${query.assetId}: resultado de búsqueda inválido.`);
    });
  });
}

export function assertNoFutureTimestamp(value, label = 'timestamp', now = Date.now()) {
  assert(timestampMs(value, label) <= now + 5 * 60 * 1000, `${label}: timestamp futuro.`);
  return true;
}

function validateChronology(input) {
  const nowWithTolerance = Date.now() + 5 * 60 * 1000;
  const baselineAt = timestampMs(input.baseline.capturedAt, 'baseline.capturedAt');
  const availabilityCheckedAt = timestampMs(
    `${input.sourceAvailability.checkedAt}T00:00:00Z`,
    'sourceAvailability.checkedAt',
  );
  const retrievalTimes = input.sourceAvailability.sources.map(source =>
    timestampMs(source.retrievedAt, `${source.evidenceId}.retrievedAt`));
  const provenanceAt = timestampMs(input.provenanceSearch.searchedAt, 'provenanceSearch.searchedAt');
  const manifestAt = timestampMs(input.unitChangeManifest.recordedAt, 'unitChangeManifest.recordedAt');
  const blindAt = timestampMs(input.blindReview.generatedAt, 'blindReview.generatedAt');
  const factualPacketAt = timestampMs(input.factualSourceReview.generatedAt, 'factualSourceReview.generatedAt');
  const firstPassAt = timestampMs(input.firstPass.reviewer.reviewedAt, 'firstPass.reviewer.reviewedAt');
  const studentAt = timestampMs(input.studentWalkthrough.reviewer.reviewedAt, 'studentWalkthrough.reviewer.reviewedAt');
  const verdictAt = timestampMs(input.expertVerdict.reviewer.reviewedAt, 'expertVerdict.reviewer.reviewedAt');
  const validationAt = timestampMs(VALIDATION_GENERATED_AT, 'VALIDATION_GENERATED_AT');
  const auditAt = timestampMs(input.auditVerdicts.reviewedAt, 'auditVerdicts.reviewedAt');
  assert(input.sourceAvailability.sources.every(source =>
    source.retrievedAt.slice(0, 10) === input.sourceAvailability.checkedAt),
  'sourceAvailability.checkedAt no coincide con la fecha de sus recuperaciones.');
  const allTimes = [baselineAt, availabilityCheckedAt, ...retrievalTimes, provenanceAt, manifestAt, blindAt,
    factualPacketAt, firstPassAt, studentAt, verdictAt, validationAt, auditAt];
  assert(allTimes.every(value => value <= nowWithTolerance), 'La cronología contiene timestamps futuros.');
  assert(Math.max(baselineAt, availabilityCheckedAt, ...retrievalTimes, provenanceAt, manifestAt) <= blindAt &&
    blindAt === factualPacketAt && blindAt <= firstPassAt && firstPassAt <= verdictAt &&
    blindAt <= studentAt && Math.max(verdictAt, studentAt) <= validationAt && validationAt <= auditAt,
  'La cronología declarada es imposible o no monotónica.');
}

export function assertDecisionQuarantined(decision, label = 'decision') {
  assert(decision.rightsBasis === 'unknown-quarantined' && decision.disposition === 'quarantine' &&
    decision.eligibleForPublicationPipeline === false &&
    ['authorship-unresolved', 'factual-review-incomplete', 'human-review-pending', 'rights-unresolved']
      .every(code => decision.reasonCodes.includes(code)),
  `${label}: la cuarentena exacta fue debilitada.`);
  return true;
}

export function assertUnitCardinality(assets) {
  const assetIds = assets.map(asset => asset.assetId);
  const questionIds = assets.flatMap(asset => asset.decisions.map(decision => decision.id));
  const featureCount = assets.reduce((sum, asset) => sum + asset.features.length, 0);
  assert(stableJson(assetIds) === stableJson(EXPECTED_ASSET_IDS) &&
    stableJson(questionIds) === stableJson(EXPECTED_QUESTION_IDS) &&
    featureCount === 14, 'Matching Features: IDs o cardinalidad 3/19/14 inválidos.');
  return true;
}

export function assertNextUnitPinned(baseline) {
  const nextSets = loadTsModule(CATALOG_PATH).IELTS_MATCHING_SENTENCE_ENDINGS_PASSAGES;
  assert(Array.isArray(nextSets) && nextSets.length === 3,
    'F0.2b.7 no conserva exactamente tres objetos de catálogo.');
  const nextObjectHashes = Object.fromEntries(nextSets.map(set => [set.id, sha256(stableJson(set))]));
  assert(stableJson(Object.keys(baseline.nextUnitSourceSha256)) === stableJson(NEXT_UNIT_PATHS) &&
    Object.entries(baseline.nextUnitSourceSha256)
      .every(([path, expectedSha]) => sourceMatchesReviewedSnapshot(path, expectedSha)) &&
    stableJson(baseline.nextUnitObjectSha256) === stableJson(nextObjectHashes),
  'F0.2b.7 cambió o su pin route/engine/bank/objetos es incompleto.');
  return true;
}

export function validateStudentWalkthroughDocument(walkthrough) {
  return validateStudentWalkthrough(walkthrough, sourceAssets(loadTsModule(CATALOG_PATH)));
}

function validateAuditVerdicts(auditVerdicts, facts = null) {
  assertExactKeys(auditVerdicts, ['schemaVersion', 'reviewedAt', 'status', 'passMeaning', 'rows'],
    'auditVerdicts');
  assert(auditVerdicts.schemaVersion === 'ielts-reading-matching-features-audit-verdicts.v1' &&
    auditVerdicts.status === 'pass' && Number.isFinite(Date.parse(auditVerdicts.reviewedAt)) &&
    /quarantined/iu.test(auditVerdicts.passMeaning) && /blocked/iu.test(auditVerdicts.passMeaning),
  'Dictamen agregado inválido o sobredeclara aprobación.');
  const expected = [
    ['Rights and provenance', '✅'],
    ['Full-stack and data', '✅'],
    ['IELTS expert', '✅'],
    ['Cognitive walkthrough', '✅'],
    ['Anti-bias and leakage', '✅'],
    ['UI/UX and accessibility', '➖'],
    ['Playwright', '➖'],
  ];
  assertExactIdCoverage(auditVerdicts.rows, expected.map(row => row[0]), 'lane', 'auditVerdicts.rows');
  for (const [lane, mark] of expected) {
    const row = auditVerdicts.rows.find(candidate => candidate.lane === lane);
    assertExactKeys(row, ['lane', 'boardMark', 'scope', 'findings', 'blockersCarriedForward'],
      `${lane}:audit`);
    assert(row.boardMark === mark && [row.scope, row.findings, row.blockersCarriedForward]
      .every(value => typeof value === 'string' && value.trim()),
    `${lane}: dictamen incompleto.`);
  }
  if (!facts) return;
  const byLane = new Map(auditVerdicts.rows.map(row => [row.lane, row]));
  const rights = byLane.get('Rights and provenance');
  const fullStack = byLane.get('Full-stack and data');
  const ielts = byLane.get('IELTS expert');
  const walkthrough = byLane.get('Cognitive walkthrough');
  const antiBias = byLane.get('Anti-bias and leakage');
  const ui = byLane.get('UI/UX and accessibility');
  const playwright = byLane.get('Playwright');
  assert(rights.findings.includes(`${facts.quarantined}/${facts.passages}`) &&
    /Authorship/iu.test(rights.blockersCarriedForward) && /license/iu.test(rights.blockersCarriedForward),
  'El carril de derechos contradice la cuarentena ejecutable.');
  assert(fullStack.findings.includes(`${facts.passages} passages`) &&
    fullStack.findings.includes(`${facts.questions} feature decisions`) &&
    fullStack.blockersCarriedForward.includes('content certification'),
  'El carril full-stack contradice el expediente.');
  assert(ielts.findings.includes(`${facts.expertMatches}/${facts.questions}`) &&
    ielts.findings.includes(`${facts.materialAmbiguities.length} material ambiguities`) &&
    facts.materialAmbiguities.every(id => ielts.blockersCarriedForward.includes(id)),
  'El carril IELTS contradice la adjudicación independiente.');
  assert(walkthrough.findings.includes(`${facts.passages}/${facts.passages} passages`) &&
    walkthrough.findings.includes(`${facts.questions}/${facts.questions} statements`),
  'El carril walkthrough contradice su cobertura.');
  assert(FEATURE_LABELS.every(label => antiBias.findings.includes(`${label}=${facts.answerCounts[label]}`)) &&
    antiBias.findings.includes(`${facts.positionCue.hits}/${facts.positionCue.eligible}`) &&
    antiBias.blockersCarriedForward.includes('contentCertification remains blocked'),
  'El carril anti-sesgo contradice el perfil ejecutable.');
  assert(ui.scope.includes('Not applicable') && ui.blockersCarriedForward.includes('does not certify') &&
    playwright.scope.includes('Not applicable') && playwright.blockersCarriedForward.includes('No browser matrix'),
  'Los carriles UI/Playwright sobredeclaran conformidad.');
}

export function buildStoredStructuralBiasProfile() {
  const assets = sourceAssets(loadTsModule(CATALOG_PATH));
  return structuralBiasProfile(assets, new Map(assets.flatMap(asset =>
    asset.decisions.map(decision => [decision.id, decision.answer]))));
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
  const blindReview = buildBlindReviewPacket();
  const factualSourceReview = buildFactualSourceReviewPacket();
  const firstPass = readJson(FIRST_PASS_PATH);
  const expertVerdict = readJson(EXPERT_VERDICT_PATH);
  const studentWalkthrough = readJson(STUDENT_WALKTHROUGH_PATH);
  const auditVerdicts = readJson(AUDIT_VERDICTS_PATH);
  const assetIds = assets.map(asset => asset.assetId);
  const questionIds = assets.flatMap(asset => asset.decisions.map(decision => decision.id));
  const featureCandidateCount = assets.reduce((sum, asset) => sum + asset.features.length, 0);
  const renderClosure = renderDependencyClosure([
    'src/app/layout.tsx',
    'src/app/(site)/layout.tsx',
    ROUTE_PATH,
  ]);
  const renderClosurePaths = renderClosure.map(absolutePath => relative(ROOT, absolutePath));

  assertUnitCardinality(assets);
  assert(stableJson(assets.map(asset => asset.id)) === stableJson(EXPECTED_SET_IDS),
    'Orden/identidad de los tres sets cambió.');
  assert(assets.every(asset => {
    const expectedFeatureIds = EXPECTED_FEATURE_IDS_BY_SET[asset.id];
    return stableJson(asset.features.map(feature => feature.id)) === stableJson(expectedFeatureIds) &&
      new Set(asset.features.map(feature => feature.id)).size === asset.features.length &&
      asset.features.every(feature => typeof feature.label === 'string' && feature.label.trim() &&
        typeof feature.description === 'string' && feature.description.trim()) &&
      asset.decisions.every(decision => expectedFeatureIds.includes(decision.answer)) &&
      /may be used more than once/iu.test(asset.instructions);
  }), 'Bindings letra→feature, respuestas o declaración de reutilización inválidos.');

  assertExactKeys(baseline,
    ['schemaVersion', 'capturedAt', 'scope', 'assets', 'structuralRisk',
      'learnerFacingSourceSha256', 'renderDependencyClosureSha256',
      'nextUnitSourceSha256', 'nextUnitObjectSha256',
      'interpretation'],
    'baseline');
  assertExactKeys(baseline.scope,
    ['unit', 'format', 'passages', 'questions', 'featureCandidates'], 'baseline.scope');
  assertExactKeys(baseline.structuralRisk,
    ['answerCounts', 'globalConcatenatedMaxSameLabelRun', 'perSetMaxSameLabelRun',
      'questionPositionModuloFeatureCount', 'highestLabelDescriptionOverlapPredictsAnswer',
      'longestFeatureDescriptionWordCountPredictsAnswer',
      'visibleDescriptionCue'],
    'baseline.structuralRisk');
  assert(baseline.schemaVersion === 'ielts-reading-matching-features-baseline.v1' &&
    baseline.scope.unit === 'F0.2b.6' && baseline.scope.format === 'matching-features' &&
    baseline.scope.passages === 3 && baseline.scope.questions === 19 &&
    baseline.scope.featureCandidates === 14 && baseline.assets.length === 3,
  'Baseline inválido.');
  assertExactIdCoverage(baseline.assets, EXPECTED_ASSET_IDS, 'assetId', 'baseline.assets');
  const baselineById = new Map(baseline.assets.map(asset => [asset.assetId, asset]));
  for (const asset of assets) {
    const pinned = baselineById.get(asset.assetId);
    assertExactKeys(pinned,
      ['assetId', 'setId', 'title', 'wordCount', 'featureCount', 'questionCount',
        'answerCounts', 'sourceObjectSha256', 'passageSha256'],
      `${asset.assetId}:baseline`);
    const assetAnswerCounts = Object.fromEntries(asset.features.map(feature => [
      feature.id, asset.decisions.filter(decision => decision.answer === feature.id).length,
    ]));
    assert(pinned.setId === asset.id && pinned.title === asset.title &&
      stableJson(pinned.answerCounts) === stableJson(assetAnswerCounts) &&
      pinned.sourceObjectSha256 === asset.sourceObjectSha256 &&
      pinned.passageSha256 === asset.passageSha256 && pinned.wordCount === asset.wordCount &&
      pinned.questionCount === asset.decisions.length &&
      pinned.featureCount === asset.features.length,
    `${asset.assetId}: drift desde baseline.`);
  }
  assert(stableJson(Object.keys(baseline.learnerFacingSourceSha256).sort()) ===
    stableJson([...LEARNER_FACING_PATHS].sort()) &&
    Object.entries(baseline.learnerFacingSourceSha256)
      .every(([path, expectedSha]) => sourceMatchesReviewedSnapshot(path, expectedSha)),
  'Las siete fuentes learner-facing cambiaron o el closure es incompleto.');
  assert(stableJson(Object.keys(baseline.renderDependencyClosureSha256).sort()) ===
    stableJson([...renderClosurePaths].sort()) &&
    Object.entries(baseline.renderDependencyClosureSha256)
      .every(([path, expectedSha]) => sourceMatchesReviewedSnapshot(path, expectedSha)),
  'Cambió la clausura renderizable de layouts/ruta/imports o su pin es incompleto.');
  assertNextUnitPinned(baseline);

  assertExactKeys(unitChangeManifest,
    ['schemaVersion', 'unit', 'recordedAt', 'learnerFacingChangeAuthorized',
      'learnerFacingBaselinePaths', 'renderDependencyClosureBaselinePaths',
      'unitSourceFiles', 'unitOutputDirectory', 'interpretation'],
    'unitChangeManifest');
  assert(unitChangeManifest.schemaVersion === 'ielts-reading-matching-features-unit-change-manifest.v1' &&
    unitChangeManifest.unit === 'F0.2b.6' && Number.isFinite(Date.parse(unitChangeManifest.recordedAt)) &&
    unitChangeManifest.learnerFacingChangeAuthorized === false &&
    stableJson([...unitChangeManifest.learnerFacingBaselinePaths].sort()) ===
      stableJson([...LEARNER_FACING_PATHS].sort()) &&
    stableJson([...unitChangeManifest.renderDependencyClosureBaselinePaths].sort()) ===
      stableJson([...renderClosurePaths].sort()) &&
    stableJson([...unitChangeManifest.unitSourceFiles].sort()) ===
      stableJson([REGISTRY_PATH, VALIDATOR_PATH, TEST_PATH, LOOP_DOC_PATH].sort()) &&
    unitChangeManifest.unitOutputDirectory === OUTPUT_DIRECTORY &&
    unitChangeManifest.interpretation.includes('does not assert that the entire repository'),
  'Manifest de unidad inválido.');
  validateSourceAvailability(sourceAvailability, registry);
  validateProvenanceSearch(provenanceSearch);
  validateAuditVerdicts(auditVerdicts);
  validateChronology({ baseline, sourceAvailability, provenanceSearch, unitChangeManifest,
    blindReview, factualSourceReview, firstPass, expertVerdict, studentWalkthrough, auditVerdicts });

  assert(registry.schemaVersion === 'ielts-academic-reading-rights-registry.v2' &&
    registry.policyVersion === '2026-08-09.v8' && registry.module === 'academic',
  'Registry global no está en policy v8.');
  const evidenceById = new Map(registry.evidence.map(evidence => [evidence.id, evidence]));
  assert(evidenceById.size === registry.evidence.length, 'Evidence IDs duplicados.');
  const unitRecords = EXPECTED_ASSET_IDS.map(assetId => {
    const rows = registry.entries.filter(entry => entry.assetId === assetId);
    assert(rows.length === 1, `${assetId}: registry debe tener exactamente una fila.`);
    return rows[0];
  });
  const relevantEvidenceIds = new Set([
    ...EXPECTED_SOURCE_IDS,
    ...unitRecords.flatMap(record => referencedEvidenceIds(record)),
  ]);
  for (const evidenceId of relevantEvidenceIds) {
    const evidence = evidenceById.get(evidenceId);
    assert(evidence && strictCalendarDate(evidence.accessedAt, `${evidenceId}.accessedAt`),
      `${evidenceId}: accessedAt ausente o inválido.`);
    assertNoFutureTimestamp(`${evidence.accessedAt}T00:00:00Z`, `${evidenceId}.accessedAt`);
  }
  for (const record of unitRecords) {
    assertNoFutureTimestamp(record.automatedTriage.assessedAt,
      `${record.assetId}.automatedTriage.assessedAt`);
    if (record.factualReview.verifiedAt !== null) {
      assertNoFutureTimestamp(record.factualReview.verifiedAt,
        `${record.assetId}.factualReview.verifiedAt`);
    }
    if (record.humanReview.reviewedAt !== null) {
      assertNoFutureTimestamp(record.humanReview.reviewedAt,
        `${record.assetId}.humanReview.reviewedAt`);
    }
  }
  const decisions = assets.map(asset => {
    const record = unitRecords.find(candidate => candidate.assetId === asset.assetId);
    referencedEvidenceIds(record).forEach(evidenceId =>
      assert(evidenceById.has(evidenceId), `${asset.assetId}: evidencia inexistente ${evidenceId}`));
    assert(record.sourceObjectSha256 === asset.sourceObjectSha256 &&
      record.passageSha256 === asset.passageSha256,
    `${asset.assetId}: hashes registry inválidos.`);
    assert(record.authorship.status === 'unknown' &&
      record.provenanceAssessment.status === 'unresolved' &&
      record.rightsAssessment.basis === 'unknown-quarantined' &&
      record.rightsAssessment.status === 'reviewed-unresolved' &&
      record.rightsAssessment.rightsHolder === null &&
      record.rightsAssessment.authorizationEvidenceStatus === 'not-located-in-reviewed-sources',
    `${asset.assetId}: estado de derechos no es la cuarentena exacta.`);
    assert(record.factualReviewRequirement.policy === 'required' &&
      record.factualSourceResearch.status === 'candidate-sources-collected' &&
      record.factualSourceResearch.sourceEvidenceIds.length === 5 &&
      new Set(record.factualSourceResearch.sourceEvidenceIds).size === 5 &&
      record.factualSourceResearch.sourceEvidenceIds.every(id => evidenceById.get(id)?.kind === 'factual-source') &&
      record.factualReview.status === 'not-reviewed' && record.humanReview.status === 'pending',
    `${asset.assetId}: estado editorial inválido.`);
    const assessed = contract.assessIeltsReadingRights(registry, asset);
    assert(assessed.disposition === 'quarantine' && assessed.eligibleForPublicationPipeline === false &&
      assessed.rightsBasis === 'unknown-quarantined', `${asset.assetId}: debe quedar en cuarentena.`);
    assert(!assessed.reasonCodes.some(code =>
      ['registry-contract-invalid', 'content-hash-mismatch', 'factual-source-research-invalid'].includes(code)),
    `${asset.assetId}: registro inválido oculto: ${assessed.reasonCodes.join(', ')}`);
    const decision = {
      assetId: asset.assetId,
      title: asset.title,
      sourceObjectSha256: asset.sourceObjectSha256,
      passageSha256: asset.passageSha256,
      wordCount: asset.wordCount,
      questionCount: asset.decisions.length,
      featureCandidateCount: asset.features.length,
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

  const runtimeAuditReferences = sourceFilesUnder('src')
    .filter(absolutePath => ![resolve(ROOT, REGISTRY_PATH), resolve(ROOT, CONTRACT_PATH)].includes(absolutePath))
    .filter(absolutePath => {
      const relativePath = relative(ROOT, absolutePath);
      const source = readFileSync(absolutePath, 'utf8');
      return !(relativePath === 'src/lib/ielts/table-completion-publication.ts' &&
        source.startsWith("import 'server-only';"));
    })
    .filter(absolutePath => {
      const source = readFileSync(absolutePath, 'utf8');
      return source.includes('ielts-reading-rights-registry') || source.includes('academic-reading-rights');
    });
  assert(runtimeAuditReferences.length === 0,
    `Código src ajeno al contrato/registry referencia el expediente: ${runtimeAuditReferences.join(', ')}`);
  const routeText = readFileSync(resolve(ROOT, ROUTE_PATH), 'utf8');
  const engineText = readFileSync(resolve(ROOT, ENGINE_PATH), 'utf8');
  const reviewSourceBlockText = readFileSync(resolve(ROOT, REVIEW_SOURCE_BLOCK_PATH), 'utf8');
  const runtimeSignals = {
    answerLocksImmediatelyAfterSelection:
      engineText.includes('const locked = Boolean(selected)') && engineText.includes('{locked ?'),
    correctnessFeedbackAppearsImmediately:
      engineText.includes('const isCorrect = selected === question.answer') &&
      engineText.includes("isCorrect ? 'correcto' : 'revisar'") && engineText.includes('{locked &&'),
    trapHintsAvailableBeforeResponse:
      engineText.includes('setShowHints') && engineText.includes('{question.trap}') &&
      !/disabled\s*=\s*\{[^}]*!selected/iu.test(engineText),
    featureDescriptionsVisibleBeforeResponse:
      engineText.includes('{feature.description}') && engineText.includes('passage.features.map((feature) =>'),
    answerKeysDeliveredToClient:
      engineText.includes("'use client'") && engineText.includes('question.answer'),
    classification: 'guided-training-runtime-with-immediate-feedback-not-practice-or-exam-simulation',
  };
  assert(Object.entries(runtimeSignals).filter(([key]) => key !== 'classification')
    .every(([, value]) => value === true), 'Cambió el runtime inmediato/pistas/descripciones detectado.');
  const accessibilityObservations = {
    unnamedSelects: 19,
    progressHasAria: false,
    feedbackHasAriaLive: false,
    trapToggleHasExpandedControls: false,
    focusAfterLock: 'SELECT→BODY',
    breadcrumbUsesSemanticNav: false,
    documentLangConfirmedInScopedClosure: false,
    answerPersistence: false,
    resetConfirmation: false,
  };
  const visibleClaims = [
    ...['textos originales de WeLearn', 'Banco original WeLearn', 'sin copiar preguntas oficiales']
      .map(text => ({ text, sourcePath: ROUTE_PATH, observed: routeText.includes(text) })),
    {
      text: 'preparado por el equipo académico de WeLearn y revisado en julio de 2026',
      sourcePath: REVIEW_SOURCE_BLOCK_PATH,
      observed: reviewSourceBlockText.includes(
        'preparado por el equipo académico de WeLearn y revisado en julio de 2026'),
    },
    {
      text: 'los ejercicios son originales de WeLearn',
      sourcePath: REVIEW_SOURCE_BLOCK_PATH,
      observed: reviewSourceBlockText.includes('los ejercicios son originales de WeLearn'),
    },
  ];
  assert(visibleClaims.every(claim => claim.observed), 'Cambió el claim visible de originalidad.');
  const expectedVisibleClaimTexts = visibleClaims.map(claim => claim.text);
  const unexpectedVisibleClaimPatterns = [
    /\b(?:rights?|copyright)\s+(?:are\s+|is\s+)?(?:fully\s+)?cleared\b/iu,
    /\bindependently\s+human\s+(?:verified|reviewed|approved)\b/iu,
    /\bfully\s+licensed\b/iu,
    /\bapproved\s+for\s+publication\b/iu,
    /\bmatching\s+features\b.{0,180}\b(?:original|verified|reviewed|licensed|cleared|approved)\b/isu,
    /\b(?:all|every|our|these)\s+(?:ielts\s+)?(?:reading\s+)?(?:exercise|exercises|bank|content)\b.{0,140}\b(?:original|verified|reviewed|licensed|cleared|approved)\b/isu,
  ];
  const unexpectedVisibleClaimFiles = renderClosure.filter(absolutePath => {
    let source = readFileSync(absolutePath, 'utf8');
    if ([resolve(ROOT, ROUTE_PATH), resolve(ROOT, REVIEW_SOURCE_BLOCK_PATH)].includes(absolutePath)) {
      for (const expectedClaim of expectedVisibleClaimTexts) source = source.replaceAll(expectedClaim, '');
    }
    return unexpectedVisibleClaimPatterns.some(pattern => pattern.test(source));
  });
  assert(unexpectedVisibleClaimFiles.length === 0,
    `La clausura renderizable añade claims editoriales no inventariados: ${unexpectedVisibleClaimFiles.join(', ')}`);
  const seoCatalogText = readFileSync(resolve(ROOT, CATALOG_PATH), 'utf8');
  const routeNeedleIndex = seoCatalogText.indexOf("slug: 'matching-features'");
  const routeSliceStart = seoCatalogText.lastIndexOf('\n  {', routeNeedleIndex);
  const routeSliceEnd = seoCatalogText.indexOf('\n  {', routeNeedleIndex);
  const bankSliceStart = seoCatalogText.indexOf('export const IELTS_MATCHING_FEATURES_PASSAGE');
  const bankSliceEnd = seoCatalogText.indexOf('export const IELTS_MATCHING_SENTENCE_ENDINGS_PASSAGE');
  assert(routeNeedleIndex >= 0 && routeSliceStart >= 0 && routeSliceEnd > routeSliceStart &&
    bankSliceStart >= 0 && bankSliceEnd > bankSliceStart,
  'No se pudo aislar la superficie Matching Features dentro del catálogo compartido.');
  const learnerFacingClosureTexts = LEARNER_FACING_PATHS
    .filter(path => path !== CATALOG_PATH)
    .map(path => readFileSync(resolve(ROOT, path), 'utf8'))
    .concat([
      seoCatalogText.slice(routeSliceStart, routeSliceEnd),
      seoCatalogText.slice(bankSliceStart, bankSliceEnd),
    ]);
  assert(findFeatureAssignmentLeaks(learnerFacingClosureTexts).length === 0,
    'Una dependencia learner-facing contiene una asignación de feature visible.');

  const loopDocText = readFileSync(resolve(ROOT, LOOP_DOC_PATH), 'utf8');
  const expectedOpenBoardRow =
    '| 0 | 　　　 ↳ F0.2b.9 Summary Completion | — | — | — | — | — | — | — |';
  const expectedProgressedBoardRow =
    '| 0 | 　　　 ↳ F0.2b.9 Summary Completion | ✅ | ✅ | ✅ | ✅ | ✅ | ➖ | ➖ |';
  const expectedOpenParentRow =
    '| 0 | 　 ↳ F0.2b Adjudicación de bancos formativos — padre | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 |';
  const stopText = 'Siguiente subunidad, sin iniciarla: ' + String.fromCharCode(96) +
    'F0.2b.9 Summary Completion' + String.fromCharCode(96) + '.';
  assertBoardStopBoundary(loopDocText);

  const firstPassTrace = validateFirstPass(firstPass, assets, blindReview);
  const expertValidation = validateExpertVerdict(
    expertVerdict, firstPass, firstPassTrace, assets, factualSourceReview);
  const studentSummary = validateStudentWalkthrough(studentWalkthrough, assets);
  const storedAnswerById = new Map(assets.flatMap(asset =>
    asset.decisions.map(decision => [decision.id, decision.answer])));
  const expertAnswerById = new Map(expertValidation.comparisons.map(row =>
    [row.questionId, row.expertFeatureId]));
  const storedBias = structuralBiasProfile(assets, storedAnswerById);
  const expertBias = structuralBiasProfile(assets, expertAnswerById);
  const expectedCounts = { A: 5, B: 3, C: 5, D: 4, E: 2 };
  assert(stableJson(storedBias.answerCounts) === stableJson(expectedCounts) &&
    storedBias.globalConcatenatedMaxSameLabelRun === 2 &&
    storedBias.perSetMaxSameLabelRun === 1 &&
    storedBias.questionPositionModuloFeatureCount.eligible === 19 &&
    storedBias.questionPositionModuloFeatureCount.hits === 11 &&
    storedBias.highestLabelDescriptionOverlapPredictsAnswer.eligible === 4 &&
    storedBias.highestLabelDescriptionOverlapPredictsAnswer.hits === 1 &&
    storedBias.highestLabelDescriptionOverlapPredictsAnswer.tiesOrAbstentions === 15 &&
    storedBias.longestFeatureDescriptionWordCountPredictsAnswer.eligible === 7 &&
    storedBias.longestFeatureDescriptionWordCountPredictsAnswer.hits === 2 &&
    storedBias.longestFeatureDescriptionWordCountPredictsAnswer.tiesOrAbstentions === 12,
  'Métricas estructurales esperadas cambiaron.');
  assert(stableJson(baseline.structuralRisk.answerCounts) === stableJson(storedBias.answerCounts) &&
    baseline.structuralRisk.globalConcatenatedMaxSameLabelRun ===
      storedBias.globalConcatenatedMaxSameLabelRun &&
    baseline.structuralRisk.perSetMaxSameLabelRun === storedBias.perSetMaxSameLabelRun &&
    ['questionPositionModuloFeatureCount', 'highestLabelDescriptionOverlapPredictsAnswer',
      'longestFeatureDescriptionWordCountPredictsAnswer'].every(key =>
      ['eligible', 'tiesOrAbstentions', 'hits'].every(metric =>
        baseline.structuralRisk[key][metric] === storedBias[key][metric])) &&
    baseline.structuralRisk.visibleDescriptionCue.featureDescriptions === 14 &&
    baseline.structuralRisk.visibleDescriptionCue.passageTitles === 3 &&
    baseline.structuralRisk.visibleDescriptionCue.independentDescriptionOnlyMatches === 16 &&
    baseline.structuralRisk.visibleDescriptionCue.independentPreAnswerTrapMatches === 18,
  'El perfil estructural cambió desde baseline.');
  assert(storedBias.perSet.every(row => row.declaredReuseAllowed && row.reusedFeatureIds.length > 0),
    'La reutilización permitida no está declarada o no fue auditada por set.');

  const conflicts = expertValidation.comparisons
    .filter(row => !row.matchesStoredKey).map(row => row.questionId);
  const materialAmbiguities = expertValidation.comparisons
    .filter(row => row.ambiguity === 'material').map(row => row.questionId);
  assert(conflicts.length === 0, `Expert verdict no coincide 19/19: ${conflicts.join(', ')}`);
  const factualAssessmentCounts = Object.fromEntries(
    ['supported', 'oversimplified', 'unsupported', 'untraceable'].map(assessment => [
      assessment,
      expertValidation.factualClaims.filter(claim => claim.assessment === assessment).length,
    ]),
  );
  assert(expertValidation.factualClaims.length === 15, 'Expert verdict no cubre los 15 claims exactos.');
  const panelFacts = {
    quarantined: decisions.filter(decision => decision.disposition === 'quarantine').length,
    passages: assets.length,
    questions: questionIds.length,
    expertMatches: questionIds.length - conflicts.length,
    materialAmbiguities,
    answerCounts: storedBias.answerCounts,
    positionCue: storedBias.questionPositionModuloFeatureCount,
  };
  validateAuditVerdicts(auditVerdicts, panelFacts);

  const negativeControl = contract.assessIeltsReadingRights(
    registry, { ...assets[0], passageSha256: '0'.repeat(64) });
  assert(negativeControl.reasonCodes.includes('content-hash-mismatch'), 'Una mutación no falla cerrada.');
  const englishImperativeLeakFindings = findFeatureAssignmentLeaks({
    instruction: 'Choose feature B for mf-memory-01',
  });
  const spanishCorrespondenceLeakFindings = findFeatureAssignmentLeaks({
    repairAction: 'mf-memory-01 corresponde a la feature B',
  });
  const englishStoredLeakFindings = findFeatureAssignmentLeaks({
    instruction: 'Correct feature for mf-memory-01 is B.',
  });
  const spanishStoredLeakFindings = findFeatureAssignmentLeaks({
    repairAction: 'La feature correcta de mf-memory-01 es B.',
  });
  assert([englishImperativeLeakFindings, spanishCorrespondenceLeakFindings,
    englishStoredLeakFindings, spanishStoredLeakFindings].every(findings => findings.length === 1),
  'El detector adversarial EN/ES no falla cerrado.');
  const contentCertificationBlocked = questionIds.length < 100 ||
    runtimeSignals.answerLocksImmediatelyAfterSelection || runtimeSignals.trapHintsAvailableBeforeResponse ||
    runtimeSignals.answerKeysDeliveredToClient ||
    conflicts.length > 0 || materialAmbiguities.length > 0;
  assert(contentCertificationBlocked, 'La certificación editorial debía quedar bloqueada.');

  const allSourcePaths = [
    ...LEARNER_FACING_PATHS, ...NEXT_UNIT_PATHS, CONTRACT_PATH, REGISTRY_PATH,
    VALIDATOR_PATH, TEST_PATH, LOOP_DOC_PATH, BASELINE_PATH, SOURCE_AVAILABILITY_PATH,
    PROVENANCE_SEARCH_PATH, UNIT_CHANGE_MANIFEST_PATH, BLIND_REVIEW_PATH,
    FACTUAL_SOURCE_REVIEW_PATH, FIRST_PASS_PATH, EXPERT_VERDICT_PATH, STUDENT_WALKTHROUGH_PATH,
    AUDIT_VERDICTS_PATH, BUILD_REPORT_PATH,
  ];
  const validation = {
    schemaVersion: 'ielts-reading-matching-features-rights-validation.v1',
    generatedAt: VALIDATION_GENERATED_AT,
    unit: 'F0.2b.6 — three formative Matching Features passages',
    status: 'pass',
    passMeaning:
      'PASS certifies audit coverage, identity, quarantine, blind adjudication and risk detection. It does not approve keys, factuality, rights, publication, runtime conformity or student efficacy.',
    scope: {
      passages: assets.length,
      questions: questionIds.length,
      featureCandidates: featureCandidateCount,
      registryEntriesInUnit: decisions.length,
      registryEntriesTotal: registry.entries.length,
      coveredAssetIds: EXPECTED_ASSET_IDS,
      parentF02bRemainsOpen: true,
      scopedLearnerSourcesChangedSinceBaseline: false,
    },
    checks: {
      exactCoverage: assets.length === 3 && questionIds.length === 19 && featureCandidateCount === 14,
      stableUniqueIds: new Set(assetIds).size === 3 && new Set(questionIds).size === 19,
      sourceHashesMatchBaseline: true,
      registryPolicyV7Pinned: true,
      registryReferencesResolve: true,
      registryEvidenceAndReviewTimestampsValid: true,
      officialRuleSourceAvailable:
        sourceAvailability.sources.some(source =>
          source.evidenceId === 'ielts-matching-features-official-format' && source.httpStatus === 200),
      factualSourceAvailabilityRecorded: sourceAvailability.sources.length === 16,
      availabilityNotTreatedAsVerification: true,
      candidateSourcesAreNotTreatedAsVerification:
        decisions.every(decision => decision.factualReviewStatus === 'not-reviewed'),
      factualReviewRequiredForEveryAsset:
        decisions.every(decision => decision.factualReviewPolicy === 'required'),
      actualAssetsAllQuarantined:
        decisions.every(decision => decision.eligibleForPublicationPipeline === false),
      actualRegistryRecordsStructurallyValid: decisions.every(decision =>
        !decision.reasonCodes.some(code =>
          ['registry-contract-invalid', 'content-hash-mismatch', 'factual-source-research-invalid'].includes(code))),
      visibleOriginalityClaimObservedButUnverified: visibleClaims.every(claim => claim.observed),
      renderDependencyClosureContainsNoUnexpectedClaims: unexpectedVisibleClaimFiles.length === 0,
      learnerFacingDependencyClosureContainsNoFeatureAssignments:
        findFeatureAssignmentLeaks(learnerFacingClosureTexts).length === 0,
      blindPacketContainsNoAnswersExplanationsTrapsOrSkills: findForbiddenKeys(blindReview).length === 0,
      blindPacketContainsNoFeatureLetterAssignments: findFeatureAssignmentLeaks(blindReview).length === 0,
      blindPacketContainsNoLearnerOrContactPii: findPii(blindReview).length === 0,
      factualSourcePacketContainsNoAnswersExplanationsTrapsOrSkills:
        findForbiddenKeys(factualSourceReview).length === 0,
      factualSourcePacketContainsNoFeatureLetterAssignments:
        findFeatureAssignmentLeaks(factualSourceReview).length === 0,
      independentExpertCoverageComplete: expertValidation.comparisons.length === 19,
      expertAgreementNineteenOfNineteen: conflicts.length === 0,
      expertFirstPassPersistedAndPinned:
        expertVerdict.reviewer.firstPassSha256 === sourceSha256(FIRST_PASS_PATH),
      evidenceQuotesAndClosestCompetitorEnforced: expertValidation.comparisons.length === 19,
      exactFactualClaimCoverage: expertValidation.factualClaims.length === 15,
      studentWalkthroughCoverageComplete:
        studentSummary.passagesCovered === 3 && studentSummary.questionsCovered === 19,
      featureReuseDeclaredAllowedAndAudited:
        storedBias.perSet.every(row => row.declaredReuseAllowed && row.reusedFeatureIds.length > 0),
      featureLetterBindingsPreserved: assets.every(asset =>
        stableJson(asset.features.map(feature => feature.id)) ===
          stableJson(EXPECTED_FEATURE_IDS_BY_SET[asset.id])),
      runtimeImmediateFeedbackAndAnswerLockingDetected:
        runtimeSignals.answerLocksImmediatelyAfterSelection &&
        runtimeSignals.correctnessFeedbackAppearsImmediately,
      preResponseTrapHintsDetected: runtimeSignals.trapHintsAvailableBeforeResponse,
      visibleFeatureDescriptionsDetected: runtimeSignals.featureDescriptionsVisibleBeforeResponse,
      answerKeysDeliveredToClientDetected: runtimeSignals.answerKeysDeliveredToClient,
      runtimeNotMisrepresentedAsPracticeOrExam:
        runtimeSignals.classification.endsWith('not-practice-or-exam-simulation'),
      statisticalCertificationWithheld: questionIds.length < 100,
      contentCertificationBlocked,
      contentMutationDenied: negativeControl.disposition === 'quarantine',
      scopedLearnerSourcesUnchanged: true,
      nextUnitSourcesUnchangedAndStopBoundaryEnforced: true,
      auditRegistryAbsentFromLearnerRuntimeImports: runtimeAuditReferences.length === 0,
      provenanceSearchLedgerComplete: provenanceSearch.queries.length === 3,
      chronologyIsMonotonicAndNotFutureDated: true,
      finalPanelVerdictsValidated: true,
      antiBiasMultidimensionalCoverage:
        stableJson(storedBias.answerCounts) === stableJson(expectedCounts) &&
        storedBias.globalConcatenatedMaxSameLabelRun === 2 &&
        storedBias.perSetMaxSameLabelRun === 1 &&
        storedBias.questionPositionModuloFeatureCount.hits === 11 &&
        storedBias.highestLabelDescriptionOverlapPredictsAnswer.eligible === 4 &&
        storedBias.longestFeatureDescriptionWordCountPredictsAnswer.eligible === 7 &&
        storedBias.descriptionTitleCue.featureDescriptionsVisiblePreResponse === 14 &&
        storedBias.descriptionTitleCue.independentDescriptionOnlyMatches === 16 &&
        storedBias.descriptionTitleCue.independentPreAnswerTrapMatches === 18 &&
        expertVerdict.records.every(record =>
          ['representationRisk', 'priorKnowledgeRisk', 'irrelevantLoadRisk',
            'passageTitleCueRisk', 'featureDescriptionCueRisk']
            .every(key => ['low', 'medium', 'high'].includes(record.passageAssessment[key]))),
      keyLikeValueLeakageMutationsDetected:
        [englishImperativeLeakFindings, spanishCorrespondenceLeakFindings,
          englishStoredLeakFindings, spanishStoredLeakFindings]
          .every(findings => findings.length === 1),
      boardStateMatchesValidatedUnit: assertBoardStopBoundary(loopDocText),
      nextUnitAndParentRemainOpen:
        (loopDocText.includes(expectedOpenBoardRow) ||
          loopDocText.includes(expectedProgressedBoardRow)) &&
        loopDocText.includes(expectedOpenParentRow) && loopDocText.includes(stopText),
    },
    decisions,
    visibleClaims,
    renderDependencyClosure: {
      sourceCount: renderClosure.length,
      unexpectedClaimFiles: unexpectedVisibleClaimFiles,
      limitation: 'Static local-import closure from root/site layouts and the Matching Features route; runtime-generated or remote copy still requires browser/runtime review.',
    },
    provenanceSearch,
    factualResearch: decisions.map(decision => {
      const record = unitRecords.find(entry => entry.assetId === decision.assetId);
      return {
        assetId: decision.assetId,
        status: record.factualSourceResearch.status,
        sourceEvidenceIds: record.factualSourceResearch.sourceEvidenceIds,
        limitation: record.factualSourceResearch.limitation,
      };
    }),
    sourceAvailability,
    expertReview: {
      reviewerType: 'independent-ai-editorial-review',
      humanSignature: false,
      answerAgreement: {
        matches: questionIds.length - conflicts.length,
        total: questionIds.length,
        rate: (questionIds.length - conflicts.length) / questionIds.length,
      },
      keyConflictCount: conflicts.length,
      keyConflictQuestionIds: conflicts,
      materialAmbiguityCount: materialAmbiguities.length,
      materialAmbiguityQuestionIds: materialAmbiguities,
      factualAssessmentCounts,
      verdictPath: EXPERT_VERDICT_PATH,
    },
    studentWalkthrough: {
      ...studentSummary,
      verdictPath: STUDENT_WALKTHROUGH_PATH,
      limitation:
        'Blind content-only cognitive walkthrough; it does not test UI, accessibility, retention, bands or real students.',
    },
    runtime: {
      ...runtimeSignals,
      accessibilityObservations,
      limitation:
        'Detection documents the unchanged runtime. Immediate locking, correctness feedback and pre-response traps prevent representing it as Practice or Exam simulation and block content certification.',
    },
    antiBias: {
      optionPermutationApplied: false,
      optionPermutationReason:
        'Letters remain bound to feature labels/descriptions. Binding, declared reuse, distribution, sequence, question-position modulo k, length and statement-to-label/description overlap are audited instead.',
      storedKeyProfile: storedBias,
      independentExpertProfile: expertBias,
      qualitativeCoverage: {
        perspectiveAndRepresentation: true,
        priorKnowledge: true,
        irrelevantCognitiveLoad: true,
        passageTitleCue: true,
        featureDescriptionCue: true,
        closestFeatureCompetition: true,
      },
      sampleAdequacy: {
        certificationThreshold: 100,
        observedQuestions: questionIds.length,
        eligibleForStatisticalCertification: false,
        conclusion:
          'The sample exposes an 11/19 question-position-modulo-k shortcut and visible descriptions, but n=19 is too small to certify balanced content statistically.',
      },
      statisticalCertification: 'withheld-n-below-100',
      contentCertification: 'blocked-editorial-and-runtime-review-required',
    },
    applicability: {
      rights: 'applicable',
      fullStackData: 'applicable',
      ieltsExpert: 'applicable',
      cognitiveWalkthrough: 'applicable-to-content-only',
      antiBias: 'applicable',
      uiUxAccessibility: 'not-applicable-to-unchanged-runtime-conformance',
      playwright: 'not-applicable-scoped-learner-runtime-unchanged',
      evidence:
        'Seven learner-facing files and the F0.2b.7 route/engine/bank remain hash-pinned. UI/Playwright ➖ means unchanged and not tested for conformity; inherited accessibility observations remain blockers.',
    },
    processLimitations: {
      firstPassTrace:
        'The persisted hash detects ordinary mutation but is not an external append-only witness; coordinated post-hoc rewriting cannot be ruled out cryptographically.',
      directSourceReview:
        'Direct-source review is declared by an AI reviewer and checked for exact IDs plus non-empty locators; it is not automatic proof of browsing, a human signature or factual verification.',
      sourceAvailability:
        'HTTP 200/403/405 and response hashes document retrieval outcomes only; availability or anti-bot denial does not verify claims, authorship or rights.',
      provenanceSearch:
        'Public-web search is directed and non-exhaustive; no exact match does not prove original authorship or universal absence.',
    },
    negativeControl: {
      contentHashMismatch: negativeControl,
      englishImperativeLeakFindings,
      spanishCorrespondenceLeakFindings,
      englishStoredLeakFindings,
      spanishStoredLeakFindings,
    },
    sources: allSourcePaths.filter(sourcePath => existsSync(resolve(ROOT, sourcePath)))
      .map(sourcePath => ({ path: sourcePath, sha256: sourceSha256(sourcePath) })),
  };
  const failedChecks = Object.entries(validation.checks)
    .filter(([, passed]) => !passed)
    .map(([name]) => name);
  assert(failedChecks.length === 0, `Falló un gate de F0.2b.6: ${failedChecks.join(', ')}.`);
  return { validation, blindReview, factualSourceReview };
}

export function validateFinalReportArtifacts(validation) {
  for (const path of [ARTIFACT_PATH, REPORT_MD_PATH, REPORT_HTML_PATH, REPORT_VERIFICATION_PATH,
    BUILD_REPORT_PATH, AUDIT_VERDICTS_PATH, VALIDATION_PATH]) {
    assert(existsSync(resolve(ROOT, path)), `Falta artefacto final: ${path}`);
  }
  assert(sourceSha256(AUDIT_VERDICTS_PATH) === PINNED_FINAL_REPORT_SHA256.auditVerdicts &&
    sourceSha256(BUILD_REPORT_PATH) === PINNED_FINAL_REPORT_SHA256.buildReport &&
    sourceSha256(ARTIFACT_PATH) === PINNED_FINAL_REPORT_SHA256.artifact &&
    sourceSha256(REPORT_MD_PATH) === PINNED_FINAL_REPORT_SHA256.reportMarkdown &&
    sourceSha256(REPORT_HTML_PATH) === PINNED_FINAL_REPORT_SHA256.reportHtml,
  'Los artefactos finales no coinciden con el paquete auditado y fijado.');
  const auditVerdicts = readJson(AUDIT_VERDICTS_PATH);
  validateAuditVerdicts(auditVerdicts, {
    quarantined: validation.decisions.filter(decision => decision.disposition === 'quarantine').length,
    passages: validation.scope.passages,
    questions: validation.scope.questions,
    expertMatches: validation.expertReview.answerAgreement.matches,
    materialAmbiguities: validation.expertReview.materialAmbiguityQuestionIds,
    answerCounts: validation.antiBias.storedKeyProfile.answerCounts,
    positionCue: validation.antiBias.storedKeyProfile.questionPositionModuloFeatureCount,
  });
  const artifact = readJson(ARTIFACT_PATH);
  assert(artifact.surface === 'report' && artifact.manifest?.surface === 'report' &&
    artifact.manifest.title === 'IELTS Reading Matching Features — audit gate' &&
    artifact.manifest.generatedAt === auditVerdicts.reviewedAt &&
    timestampMs(artifact.manifest.generatedAt, 'artifact.manifest.generatedAt') <=
      Date.now() + 5 * 60 * 1000 &&
    artifact.snapshot.generatedAt === artifact.manifest.generatedAt &&
    artifact.manifest.cards?.length === 4 && artifact.manifest.charts?.length === 2 &&
    artifact.manifest.tables?.length === 2 && artifact.snapshot?.status === 'ready',
  'Artifact portable incompleto o con estado incorrecto.');
  assert(stableJson(artifact.manifest.charts.map(chart => chart.title)) ===
    stableJson(['Stored feature-letter counts', 'Independent factual-claim assessments']),
  'Los títulos de gráficos deben ser neutrales y descriptivos.');
  const expectedSummary = [{
    passages: validation.scope.passages,
    questions: validation.scope.questions,
    featureCandidates: validation.scope.featureCandidates,
    quarantined: validation.decisions.filter(row => row.disposition === 'quarantine').length,
    expertMatches: validation.expertReview.answerAgreement.matches,
    expertTotal: validation.expertReview.answerAgreement.total,
    materialAmbiguities: validation.expertReview.materialAmbiguityCount,
  }];
  const expectedLabels = Object.entries(validation.antiBias.storedKeyProfile.answerCounts)
    .map(([label, count]) => ({ label, count }));
  const expectedClaims = Object.entries(validation.expertReview.factualAssessmentCounts)
    .map(([assessment, claims]) => ({ assessment, claims }));
  const expectedDecisions = validation.decisions.map(decision => {
    const row = { ...decision };
    delete row.reasonCodes;
    row.blockers = decision.reasonCodes.join(' · ');
    return row;
  });
  assert(stableJson(artifact.snapshot.datasets.summary) === stableJson(expectedSummary) &&
    stableJson(artifact.snapshot.datasets.labels) === stableJson(expectedLabels) &&
    stableJson(artifact.snapshot.datasets.claims) === stableJson(expectedClaims) &&
    stableJson(artifact.snapshot.datasets.decisions) === stableJson(expectedDecisions) &&
    stableJson(artifact.snapshot.datasets.audit) === stableJson(auditVerdicts.rows),
  'El artifact no coincide con validation/audit-verdicts.');
  const reportMarkdown = readFileSync(resolve(ROOT, REPORT_MD_PATH), 'utf8');
  const reportHtml = readFileSync(resolve(ROOT, REPORT_HTML_PATH), 'utf8');
  const requiredMarkdown = [
    'audit PASS; bank and content certification BLOCKED',
    '11/19',
    '16/19',
    '18/19',
    'guided-training',
    'F0.2b.7 Matching Sentence Endings',
    ...validation.expertReview.materialAmbiguityQuestionIds,
    ...validation.expertReview.keyConflictQuestionIds,
  ];
  requiredMarkdown.forEach(value =>
    assert(reportMarkdown.includes(value), `report.md omite límite obligatorio: ${value}`));
  for (const [assessment, count] of Object.entries(validation.expertReview.factualAssessmentCounts)) {
    assert(reportMarkdown.includes(`- ${assessment}: ${count}`),
      `report.md contradice conteo factual ${assessment}=${count}.`);
    assert(reportHtml.includes(`<tr><td>${assessment}</td><td class="portable-table-number">${count}</td></tr>`),
      `report.html contradice conteo factual ${assessment}=${count}.`);
  }
  for (const [label, count] of Object.entries(validation.antiBias.storedKeyProfile.answerCounts)) {
    assert(reportHtml.includes(`<tr><td>${label}</td><td class="portable-table-number">${count}</td></tr>`),
      `report.html contradice conteo de etiqueta ${label}=${count}.`);
  }
  assert(reportMarkdown.includes(
    `The clean expert matched ${validation.expertReview.answerAgreement.matches}/${validation.expertReview.answerAgreement.total} stored assignments and reported ${validation.expertReview.materialAmbiguityCount} material ambiguities and ${validation.expertReview.keyConflictCount} key conflicts.`),
  'report.md contradice la adjudicación IELTS ejecutable.');
  assert(reportHtml.includes('IELTS Reading Matching Features') &&
    reportHtml.includes('Material ambiguities') && reportHtml.includes('Panel scope') &&
    reportHtml.includes('Recommended next decisions'),
  'report.html incompleto o desalineado.');
  const verification = readJson(REPORT_VERIFICATION_PATH);
  assertExactKeys(verification,
    ['schemaVersion', 'verifiedAt', 'command', 'stages', 'viewports',
      'counts', 'sha256', 'interpretation'],
    'reportVerification');
  assert(verification.schemaVersion === 'ielts-reading-matching-features-report-verification.v1' &&
    timestampMs(verification.verifiedAt, 'reportVerification.verifiedAt') >=
      timestampMs(auditVerdicts.reviewedAt, 'auditVerdicts.reviewedAt') &&
    timestampMs(verification.verifiedAt, 'reportVerification.verifiedAt') >=
      timestampMs(artifact.manifest.generatedAt, 'artifact.manifest.generatedAt') &&
    timestampMs(verification.verifiedAt, 'reportVerification.verifiedAt') <= Date.now() + 5 * 60 * 1000 &&
    verification.command.includes('deliver_portable_artifact.mjs') &&
    stableJson(verification.stages) ===
      stableJson({ validation: 'passed', package: 'passed', verification: 'passed' }) &&
    stableJson(verification.viewports) === stableJson([1440, 390]) &&
    verification.counts.cards === 4 && verification.counts.charts === 2 &&
    verification.counts.tables === 2 && verification.interpretation.includes('report only') &&
    verification.interpretation.includes('not learner-facing'),
  'Verificación portable inválida o sobredeclarada.');
  assert(verification.sha256.validation === sourceSha256(VALIDATION_PATH) &&
    verification.sha256.auditVerdicts === sourceSha256(AUDIT_VERDICTS_PATH) &&
    verification.sha256.artifact === sourceSha256(ARTIFACT_PATH) &&
    verification.sha256.reportMarkdown === sourceSha256(REPORT_MD_PATH) &&
    verification.sha256.reportHtml === sourceSha256(REPORT_HTML_PATH),
  'Hashes del reporte portable no coinciden.');
  return {
    artifactSha256: sourceSha256(ARTIFACT_PATH),
    reportMarkdownSha256: sourceSha256(REPORT_MD_PATH),
    reportHtmlSha256: sourceSha256(REPORT_HTML_PATH),
  };
}

function writeJson(relativePath, value) {
  const absolutePath = resolve(ROOT, relativePath);
  mkdirSync(dirname(absolutePath), { recursive: true });
  writeFileSync(absolutePath, `${JSON.stringify(value, null, 2)}\n`);
}

function checkJson(relativePath, value) {
  const absolutePath = resolve(ROOT, relativePath);
  assert(existsSync(absolutePath), `Falta artefacto generado: ${relativePath}`);
  assert(readFileSync(absolutePath, 'utf8') === `${JSON.stringify(value, null, 2)}\n`,
    `Artefacto desactualizado: ${relativePath}`);
}

const isCli = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) {
  const mode = process.argv.includes('--write-blind') ? 'write-blind' :
    process.argv.includes('--write') ? 'write' : process.argv.includes('--check') ? 'check' : 'print';
  if (mode === 'write-blind') {
    const blindReview = buildBlindReviewPacket();
    const factualSourceReview = buildFactualSourceReviewPacket();
    writeJson(BLIND_REVIEW_PATH, blindReview);
    writeJson(FACTUAL_SOURCE_REVIEW_PATH, factualSourceReview);
    process.stdout.write(`${JSON.stringify({
      status: 'blind-packets-written',
      passages: blindReview.records.length,
      questions: blindReview.records.reduce((sum, record) => sum + record.statements.length, 0),
      featureCandidates: blindReview.records.reduce((sum, record) => sum + record.features.length, 0),
      blindPath: BLIND_REVIEW_PATH,
      secondPassPath: FACTUAL_SOURCE_REVIEW_PATH,
    }, null, 2)}\n`);
  } else {
    const artifacts = buildValidationArtifacts();
    let reportArtifacts = null;
    if (mode === 'write') {
      writeJson(VALIDATION_PATH, artifacts.validation);
      writeJson(BLIND_REVIEW_PATH, artifacts.blindReview);
      writeJson(FACTUAL_SOURCE_REVIEW_PATH, artifacts.factualSourceReview);
    } else if (mode === 'check') {
      checkJson(VALIDATION_PATH, artifacts.validation);
      checkJson(BLIND_REVIEW_PATH, artifacts.blindReview);
      checkJson(FACTUAL_SOURCE_REVIEW_PATH, artifacts.factualSourceReview);
      reportArtifacts = validateFinalReportArtifacts(artifacts.validation);
    }
    process.stdout.write(`${JSON.stringify({
      status: artifacts.validation.status,
      mode,
      passages: artifacts.validation.scope.passages,
      questions: artifacts.validation.scope.questions,
      featureCandidates: artifacts.validation.scope.featureCandidates,
      quarantined: artifacts.validation.decisions
        .filter(decision => decision.disposition === 'quarantine').length,
      checks: artifacts.validation.checks,
      reportArtifacts,
    }, null, 2)}\n`);
  }
}
