#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import {
  existsSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '../../..');
const require = createRequire(import.meta.url);
const ts = require('typescript');

const GENERATED_AT = '2026-08-09T00:00:00-05:00';
const CATALOG_PATH = 'src/data/practica-exams/seo-catalog.ts';
const LEGACY_HUB_PATH = 'src/app/(site)/practica/ielts/reading/Content.tsx';
const READING_PAGE_PATH = 'src/app/(site)/practica/ielts/reading/page.tsx';
const QUESTION_TYPES_HUB_PATH =
  'src/app/(site)/practica/ielts/reading/tipos-de-preguntas/page.tsx';
const MIXED_ENGINE_PATH =
  'src/components/exam-practice/IeltsReadingMixedQuestionTypeEngine.tsx';
const LOOP_POLICY_PATH = 'docs/ielts-reading-loop.md';
const MOCK_INDEX_PATH = 'src/data/mocks/index.ts';
const MOCK_PATHS = Array.from(
  { length: 20 },
  (_, index) => `src/data/mocks/ielts-set-${index + 1}.ts`,
);
const OFFICIAL_SOURCES = {
  copyright: 'https://ielts.org/legal/ielts-copyright-and-trade-mark-statement',
  format: 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading',
  samples: 'https://www.ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test',
};

const ALLOWED_RIGHTS_BASES = new Set([
  'owned-original',
  'licensed',
  'public-domain',
  'unknown-quarantined',
]);
const METADATA_KEYS = {
  author: ['author', 'createdBy'],
  reviewer: ['reviewedBy', 'reviewer', 'reviewers'],
  reviewedAt: ['reviewedAt', 'lastReviewedAt'],
  reviewStatus: ['reviewStatus', 'editorialStatus'],
  version: ['version', 'contentVersion'],
  status: ['status'],
  module: ['module'],
  rightsBasis: ['rightsBasis'],
  rightsHolder: ['rightsHolder', 'copyrightHolder'],
  licenseDocument: ['licenseDocument', 'licenseUrl', 'license'],
  provenance: ['provenance', 'sourceAttribution'],
  sources: ['sources', 'sourceUrl'],
  factualSources: ['factualSources'],
};

const FORMATIVE_EXPORTS = [
  ['true-false-not-given', 'IELTS_TFNG_PRACTICE_SETS', value => value.questions],
  ['yes-no-not-given', 'IELTS_YNNG_PRACTICE_SETS', value => value.questions],
  ['matching-headings', 'IELTS_MATCHING_HEADINGS_PASSAGES', value => value.paragraphs],
  ['matching-information', 'IELTS_MATCHING_INFORMATION_PASSAGES', value => value.questions],
  ['matching-features', 'IELTS_MATCHING_FEATURES_PASSAGES', value => value.questions],
  [
    'matching-sentence-endings',
    'IELTS_MATCHING_SENTENCE_ENDINGS_PASSAGES',
    value => value.questions,
  ],
  ['diagram-labeling', 'IELTS_DIAGRAM_LABELING_PASSAGES', value => value.questions],
  ['multiple-choice', 'IELTS_MULTIPLE_CHOICE_PASSAGES', value => value.questions],
  ['summary-completion', 'IELTS_SUMMARY_COMPLETION_PASSAGES', value => value.questions],
  [
    'note-completion',
    'IELTS_NOTE_COMPLETION_PASSAGES',
    value => value.noteGroups.flatMap(group => group.items),
  ],
  [
    'table-completion',
    'IELTS_TABLE_COMPLETION_PASSAGES',
    value => value.rows
      .flatMap(row => row.cells)
      .filter(cell => isObject(cell) && cell.type === 'blank'),
  ],
  ['flow-chart-completion', 'IELTS_FLOW_CHART_COMPLETION_PASSAGES', value => value.steps],
  ['short-answer', 'IELTS_SHORT_ANSWER_PASSAGES', value => value.questions],
  ['sentence-completion', 'IELTS_SENTENCE_COMPLETION_PASSAGES', value => value.questions],
];

const LEARNING_EXPORTS = [
  {
    bank: 'skimming',
    exportName: 'IELTS_SKIMMING_PRACTICE',
    values: catalog => [catalog.IELTS_SKIMMING_PRACTICE],
    readItems: value => [value.summaryQuestion, ...value.paragraphMap],
    routes: ['/practica/ielts/reading/habilidades/skimming'],
  },
  {
    bank: 'scanning',
    exportName: 'IELTS_SCANNING_PRACTICE',
    values: catalog => [catalog.IELTS_SCANNING_PRACTICE],
    readItems: value => value.targets,
    routes: ['/practica/ielts/reading/habilidades/scanning'],
  },
  {
    bank: 'mixed',
    exportName: 'IELTS_READING_MIXED_QUESTION_TYPE_SETS',
    values: catalog => catalog.IELTS_READING_MIXED_QUESTION_TYPE_SETS,
    readItems: value => value.tasks,
    routes: ['/practica/ielts/reading/tipos-de-preguntas'],
    claimSourcePaths: [MIXED_ENGINE_PATH],
  },
  {
    bank: 'skim-scan-transfer',
    exportName: 'IELTS_SKIM_SCAN_TRANSFER_SETS',
    values: catalog => catalog.IELTS_SKIM_SCAN_TRANSFER_SETS,
    readItems: value => value.tasks,
    routes: [
      '/practica/ielts/reading/habilidades/skimming',
      '/practica/ielts/reading/habilidades/scanning',
    ],
  },
  {
    bank: 'inference',
    exportName: 'IELTS_INFERENCE_PRACTICE_SETS',
    values: catalog => catalog.IELTS_INFERENCE_PRACTICE_SETS,
    readItems: value => value.questions,
    routes: ['/practica/ielts/reading/habilidades/inferencia'],
  },
  {
    bank: 'paraphrase',
    exportName: 'IELTS_PARAPHRASE_PRACTICE_SETS',
    values: catalog => catalog.IELTS_PARAPHRASE_PRACTICE_SETS,
    readItems: value => value.items,
    routes: ['/practica/ielts/reading/habilidades/parafrasis'],
  },
  {
    bank: 'word-limit',
    exportName: 'IELTS_WORD_LIMIT_PRACTICE_SETS',
    values: catalog => catalog.IELTS_WORD_LIMIT_PRACTICE_SETS,
    readItems: value => value.questions,
    routes: ['/practica/ielts/reading/habilidades/limite-de-palabras'],
  },
  {
    bank: 'time-management',
    exportName: 'IELTS_TIME_MANAGEMENT_PRACTICE_SETS',
    values: catalog => catalog.IELTS_TIME_MANAGEMENT_PRACTICE_SETS,
    readItems: value => value.decisions,
    routes: ['/practica/ielts/reading/habilidades/gestion-del-tiempo'],
  },
];

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
const own = (value, key) => Object.prototype.hasOwnProperty.call(value, key);
const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const sha256 = value => createHash('sha256').update(value).digest('hex');

function stableValue(value) {
  if (Array.isArray(value)) return value.map(stableValue);
  if (!isObject(value)) return value;
  return Object.fromEntries(
    Object.keys(value).sort().map(key => [key, stableValue(value[key])]),
  );
}

function stableJson(value) {
  return JSON.stringify(stableValue(value));
}

function normalizeText(text) {
  return String(text ?? '')
    .normalize('NFKC')
    .replace(/\s+/gu, ' ')
    .trim();
}

function wordCount(text) {
  const normalized = normalizeText(text);
  return normalized ? normalized.split(' ').length : 0;
}

function sourceSha(path) {
  return sha256(readFileSync(resolve(ROOT, path)));
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

  const diagnostics = javascript.diagnostics ?? [];
  const errors = diagnostics.filter(
    diagnostic => diagnostic.category === ts.DiagnosticCategory.Error,
  );
  assert(
    errors.length === 0,
    `No se pudo transpilar ${relativePath}: ${errors
      .map(error => ts.flattenDiagnosticMessageText(error.messageText, '\n'))
      .join('; ')}`,
  );

  const evaluatedModule = { exports: {} };
  vm.runInNewContext(
    javascript.outputText,
    {
      module: evaluatedModule,
      exports: evaluatedModule.exports,
      require(specifier) {
        throw new Error(`Import no permitido al evaluar ${relativePath}: ${specifier}`);
      },
    },
    { filename: absolutePath, timeout: 10_000 },
  );
  return evaluatedModule.exports;
}

function presentValue(value) {
  if (value == null) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

function firstPresentKey(value, keys) {
  return keys.find(key => own(value, key) && presentValue(value[key])) ?? null;
}

function metadataPresence(value) {
  return Object.fromEntries(
    Object.entries(METADATA_KEYS).map(([canonical, keys]) => {
      const sourceKey = firstPresentKey(value, keys);
      return [canonical, { present: sourceKey !== null, sourceKey }];
    }),
  );
}

function declaredRightsBasis(value) {
  if (!own(value, 'rightsBasis') || !presentValue(value.rightsBasis)) return null;
  return String(value.rightsBasis);
}

function passageText(value) {
  if (typeof value.passage === 'string') return normalizeText(value.passage);
  if (Array.isArray(value.passage)) {
    return normalizeText(value.passage.map(entry =>
      typeof entry === 'string' ? entry : entry?.text ?? entry?.content ?? '',
    ).join('\n\n'));
  }
  if (Array.isArray(value.paragraphs)) {
    return normalizeText(value.paragraphs.map(entry =>
      typeof entry === 'string' ? entry : entry?.text ?? entry?.content ?? '',
    ).join('\n\n'));
  }
  if (typeof value.text === 'string') return normalizeText(value.text);
  return '';
}

function contentForm(value, text) {
  if (typeof value.passage === 'string') return 'passage-string';
  if (Array.isArray(value.passage)) return 'passage-array';
  if (Array.isArray(value.paragraphs)) return 'paragraph-array';
  if (Array.isArray(value.passageMap)) return 'passage-map-without-full-text';
  if (text) return 'text-string';
  return 'task-set-without-full-passage';
}

function titleFor(value, fallback) {
  return String(
    value.title ?? value.passageTitle ?? value.heading ?? value.topic ?? fallback,
  );
}

function pagePath(routePath) {
  return `src/app/(site)${routePath}/page.tsx`;
}

function observedOriginalClaim(routePaths, extraEvidencePaths = []) {
  const evidencePaths = [...new Set([
    ...routePaths.map(pagePath),
    ...extraEvidencePaths,
  ])]
    .filter(path => existsSync(resolve(ROOT, path)))
    .filter(path => /original(?:es)?(?:\s+de)?\s+welearn|banco original welearn|ejercicios originales|pasajes originales|pasajes cortos originales|textos originales/iu
      .test(readFileSync(resolve(ROOT, path), 'utf8')));
  return {
    claim: evidencePaths.length ? 'original-welearn-visible-claim' : 'none-observed',
    evidencePaths,
    verification: evidencePaths.length ? 'unverified-by-structured-provenance' : 'not-applicable',
  };
}

function baseAsset({
  assetId,
  family,
  sourcePath,
  sourceLocator,
  value,
  title,
  routePaths,
  decisionCount,
  questionGroupCount,
  runtimeExposure,
  moduleInference,
  declaredId,
  sourceClaim,
  formatLabel,
  sourceIdentityValue,
}) {
  const text = passageText(value);
  const passageSha256 = text ? sha256(text) : null;
  const presence = metadataPresence(value);
  const rightsBasis = declaredRightsBasis(value);
  const validDeclaredRightsBasis = rightsBasis !== null && ALLOWED_RIGHTS_BASES.has(rightsBasis);
  const quarantineReasons = [];

  if (!validDeclaredRightsBasis) quarantineReasons.push('missing-or-invalid-rights-basis');
  if (!presence.author.present) quarantineReasons.push('missing-author');
  if (!presence.reviewer.present) quarantineReasons.push('missing-reviewer');
  if (!presence.factualSources.present) quarantineReasons.push('missing-factual-sources');
  if (!presence.module.present) quarantineReasons.push('module-not-declared-on-asset');

  return {
    assetId,
    family,
    formatLabel,
    sourcePath,
    sourceLocator,
    sourceFileSha256: sourceSha(sourcePath),
    sourceObjectSha256: sha256(stableJson(sourceIdentityValue ?? value)),
    declaredId: declaredId ?? null,
    stableIdStatus: declaredId ? 'declared' : 'inventory-synthetic',
    title,
    routePaths,
    runtimeExposure,
    module: presence.module.present ? String(value[presence.module.sourceKey]) : null,
    inferredModule: presence.module.present || moduleInference === 'missing-or-ambiguous'
      ? null
      : 'academic',
    moduleStatus: presence.module.present
      ? 'declared'
      : moduleInference === 'missing-or-ambiguous'
        ? 'missing-or-ambiguous'
        : 'inferred',
    moduleInferenceBasis: presence.module.present ? null : moduleInference,
    contentForm: contentForm(value, text),
    passageSha256,
    canonicalPassageId: passageSha256 ? `passage-sha256:${passageSha256}` : null,
    passageWordCount: text ? wordCount(text) : null,
    questionGroupCount,
    decisionCount,
    metadataPresence: presence,
    surfaceClaim: sourceClaim,
    provisionalRightsBasis: validDeclaredRightsBasis ? rightsBasis : 'unknown-quarantined',
    rightsAssessmentStatus: validDeclaredRightsBasis
      ? 'declared-unverified'
      : 'structured-evidence-absent',
    recommendedDisposition: validDeclaredRightsBasis && rightsBasis !== 'unknown-quarantined'
      ? 'requires-substantive-rights-review'
      : 'quarantine',
    quarantineReasonCodes: [...new Set(quarantineReasons)].sort(),
    runtimeQuarantineContradiction:
      runtimeExposure !== 'not-routable' && (!validDeclaredRightsBasis || rightsBasis === 'unknown-quarantined'),
  };
}

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
      throw new Error(`Tipo no soportado: ${question.type} (${question.id})`);
  }
}

function mockQuestionTypeSummary(questions) {
  const counts = new Map();
  for (const question of questions) {
    counts.set(question.type, (counts.get(question.type) ?? 0) + 1);
  }
  return Object.fromEntries([...counts.entries()].sort(([a], [b]) => a.localeCompare(b)));
}

function parseLegacyHub() {
  const source = readFileSync(resolve(ROOT, LEGACY_HUB_PATH), 'utf8');
  const passageMatch = source.match(/const PASSAGE = `([\s\S]*?)`;/u);
  const statementsMatch = source.match(/const STATEMENTS:[\s\S]*?= \[([\s\S]*?)\n\];/u);
  assert(passageMatch, 'No se pudo extraer PASSAGE del hub legado');
  assert(statementsMatch, 'No se pudo extraer STATEMENTS del hub legado');
  const statementCount = [...statementsMatch[1].matchAll(/\{\s*statement:/gu)].length;
  assert(statementCount === 8, `Se esperaban 8 statements legados; se hallaron ${statementCount}`);
  return {
    assetValue: {
      id: null,
      title: 'True / False / Not Given — Amazon rainforest',
      passage: passageMatch[1],
      statementCount,
    },
    identityValue: {
      passageSource: passageMatch[0],
      statementsSource: statementsMatch[0],
    },
  };
}

function tsvCell(value) {
  if (value == null) return '';
  return String(value).replace(/[\t\r\n]+/gu, ' ').trim();
}

function buildTsv(assets) {
  const columns = [
    'assetId',
    'family',
    'formatLabel',
    'title',
    'sourcePath',
    'sourceLocator',
    'declaredId',
    'stableIdStatus',
    'routePaths',
    'runtimeExposure',
    'module',
    'inferredModule',
    'moduleStatus',
    'moduleInferenceBasis',
    'contentForm',
    'passageWordCount',
    'questionGroupCount',
    'decisionCount',
    'rightsBasisPresent',
    'authorPresent',
    'reviewerPresent',
    'factualSourcesPresent',
    'surfaceClaim',
    'provisionalRightsBasis',
    'rightsAssessmentStatus',
    'recommendedDisposition',
    'runtimeQuarantineContradiction',
    'quarantineReasonCodes',
    'sourceFileSha256',
    'sourceObjectSha256',
    'passageSha256',
  ];
  const rows = assets.map(asset => ({
    ...asset,
    routePaths: asset.routePaths.join(' | '),
    rightsBasisPresent: asset.metadataPresence.rightsBasis.present,
    authorPresent: asset.metadataPresence.author.present,
    reviewerPresent: asset.metadataPresence.reviewer.present,
    factualSourcesPresent: asset.metadataPresence.factualSources.present,
    surfaceClaim: asset.surfaceClaim.claim,
    quarantineReasonCodes: asset.quarantineReasonCodes.join(' | '),
  }));
  return [
    columns.join('\t'),
    ...rows.map(row => columns.map(column => tsvCell(row[column])).join('\t')),
  ].join('\n') + '\n';
}

function summarize(assets) {
  const byFamily = new Map();
  for (const asset of assets) {
    if (!byFamily.has(asset.family)) {
      byFamily.set(asset.family, {
        family: asset.family,
        assets: 0,
        decisions: 0,
        passagesWithText: 0,
        declaredStableIds: 0,
        rightsBasisPresent: 0,
        authorPresent: 0,
        reviewerPresent: 0,
        factualSourcesPresent: 0,
        quarantined: 0,
        runtimeContradictions: 0,
      });
    }
    const row = byFamily.get(asset.family);
    row.assets += 1;
    row.decisions += asset.decisionCount;
    row.passagesWithText += asset.passageSha256 ? 1 : 0;
    row.declaredStableIds += asset.stableIdStatus === 'declared' ? 1 : 0;
    row.rightsBasisPresent += asset.metadataPresence.rightsBasis.present ? 1 : 0;
    row.authorPresent += asset.metadataPresence.author.present ? 1 : 0;
    row.reviewerPresent += asset.metadataPresence.reviewer.present ? 1 : 0;
    row.factualSourcesPresent += asset.metadataPresence.factualSources.present ? 1 : 0;
    row.quarantined += asset.recommendedDisposition === 'quarantine' ? 1 : 0;
    row.runtimeContradictions += asset.runtimeQuarantineContradiction ? 1 : 0;
  }
  return [...byFamily.values()].sort((a, b) => a.family.localeCompare(b.family));
}

function duplicatePassages(assets) {
  const groups = new Map();
  for (const asset of assets.filter(entry => entry.passageSha256)) {
    if (!groups.has(asset.passageSha256)) groups.set(asset.passageSha256, []);
    groups.get(asset.passageSha256).push(asset.assetId);
  }
  return [...groups.entries()]
    .filter(([, ids]) => ids.length > 1)
    .map(([passageSha256, assetIds]) => ({ passageSha256, assetIds: assetIds.sort() }))
    .sort((a, b) => a.passageSha256.localeCompare(b.passageSha256));
}

const FORBIDDEN_CONTENT_FIELDS = new Set([
  'answer',
  'answers',
  'answerkey',
  'correct',
  'correctanswer',
  'correctanswers',
  'evidence',
  'explanation',
  'explanations',
  'option',
  'options',
  'solution',
  'solutions',
  'trap',
  'traps',
]);
const FORBIDDEN_PII_FIELDS = new Set([
  'email',
  'fullname',
  'phone',
  'phonenumber',
  'sessionid',
  'studentname',
  'userid',
  'whatsapp',
]);

function normalizedFieldKey(key) {
  return key.replace(/[^a-z0-9]/giu, '').toLowerCase();
}

function inspectSanitizedPayload(value, path = '$', result = {
  nodesVisited: 0,
  forbiddenContentFields: [],
  forbiddenPiiFields: [],
  emailLikeValues: [],
}) {
  result.nodesVisited += 1;
  if (Array.isArray(value)) {
    value.forEach((entry, index) => inspectSanitizedPayload(entry, `${path}[${index}]`, result));
    return result;
  }
  if (typeof value === 'string') {
    if (/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/iu.test(value)) {
      result.emailLikeValues.push(path);
    }
    return result;
  }
  if (!isObject(value)) return result;
  for (const [key, child] of Object.entries(value)) {
    const normalizedKey = normalizedFieldKey(key);
    if (FORBIDDEN_CONTENT_FIELDS.has(normalizedKey)) {
      result.forbiddenContentFields.push(`${path}.${key}`);
    }
    if (FORBIDDEN_PII_FIELDS.has(normalizedKey)) {
      result.forbiddenPiiFields.push(`${path}.${key}`);
    }
    inspectSanitizedPayload(child, `${path}.${key}`, result);
  }
  return result;
}

function assertSanitizedPayload(scan, label) {
  assert(
    scan.forbiddenContentFields.length === 0,
    `${label} contiene campos de clave/contenido prohibidos: ${scan.forbiddenContentFields.join(', ')}`,
  );
  assert(
    scan.forbiddenPiiFields.length === 0,
    `${label} contiene campos PII prohibidos: ${scan.forbiddenPiiFields.join(', ')}`,
  );
  assert(
    scan.emailLikeValues.length === 0,
    `${label} contiene valores similares a correo: ${scan.emailLikeValues.join(', ')}`,
  );
}

const catalog = loadTsModule(CATALOG_PATH);
const typeRoutes = catalog.IELTS_READING_TYPES;
const skillRoutes = catalog.IELTS_READING_SKILLS;
assert(Array.isArray(typeRoutes) && typeRoutes.length === 14, 'Se esperaban 14 rutas de tipos');
assert(Array.isArray(skillRoutes) && skillRoutes.length === 6, 'Se esperaban 6 rutas de habilidad');
const mockIndexSource = readFileSync(resolve(ROOT, MOCK_INDEX_PATH), 'utf8');
const mockImportRows = [...mockIndexSource.matchAll(
  /import\s+(ieltsSet(\d+))\s+from\s+['"]\.\/ielts-set-(\d+)['"];?/gu,
)].map(match => ({
  binding: match[1],
  bindingNumber: Number(match[2]),
  fileNumber: Number(match[3]),
}));
const mockRegistryRows = [...mockIndexSource.matchAll(
  /['"]ielts:set-(\d+)['"]\s*:\s*(ieltsSet\d+)/gu,
)].map(match => ({
  setNumber: Number(match[1]),
  key: `ielts:set-${match[1]}`,
  binding: match[2],
}));
const expectedSetNumbers = Array.from({ length: MOCK_PATHS.length }, (_, index) => index + 1);
assert(mockImportRows.length === 20, `Se esperaban 20 imports IELTS; se hallaron ${mockImportRows.length}`);
assert(mockRegistryRows.length === 20, `Se esperaban 20 entradas IELTS; se hallaron ${mockRegistryRows.length}`);
assert(
  new Set(mockImportRows.map(row => row.binding)).size === mockImportRows.length &&
    new Set(mockImportRows.map(row => row.fileNumber)).size === mockImportRows.length,
  'Hay imports IELTS duplicados en el registro',
);
assert(
  new Set(mockRegistryRows.map(row => row.key)).size === mockRegistryRows.length,
  'Hay keys IELTS duplicadas en el registro',
);
for (const setNumber of expectedSetNumbers) {
  const imported = mockImportRows.find(row => row.fileNumber === setNumber);
  const registered = mockRegistryRows.find(row => row.setNumber === setNumber);
  assert(imported, `Falta import de ielts-set-${setNumber}`);
  assert(imported.bindingNumber === setNumber, `Import IELTS ${setNumber} usa binding incorrecto`);
  assert(registered, `Falta key ielts:set-${setNumber}`);
  assert(
    registered.binding === imported.binding,
    `ielts:set-${setNumber} no apunta al import de ielts-set-${setNumber}`,
  );
}
const registeredIeltsMocks = mockRegistryRows
  .sort((a, b) => a.setNumber - b.setNumber)
  .map(row => ({
    ...row,
    sourcePath: `src/data/mocks/ielts-set-${row.setNumber}.ts`,
    expectedMockId: `set-${row.setNumber}`,
  }));

const typeRouteBySlug = new Map(typeRoutes.map(route => [route.slug, route]));
const assets = [];

for (const [routeSlug, exportName, readItems] of FORMATIVE_EXPORTS) {
  const values = catalog[exportName];
  const route = typeRouteBySlug.get(routeSlug);
  assert(Array.isArray(values), `Falta export ${exportName}`);
  assert(route, `Falta ruta para ${routeSlug}`);
  const claim = observedOriginalClaim([route.path]);
  values.forEach((value, index) => {
    const declaredId = typeof value.id === 'string' && value.id.trim() ? value.id : null;
    const assetId = `formative:${routeSlug}:${declaredId ?? `index-${index + 1}`}`;
    assets.push(baseAsset({
      assetId,
      family: 'formative-route-bank',
      formatLabel: routeSlug,
      sourcePath: CATALOG_PATH,
      sourceLocator: `${exportName}[${index}]`,
      value,
      title: titleFor(value, `${route.title} ${index + 1}`),
      routePaths: [route.path],
      decisionCount: readItems(value).length,
      questionGroupCount: 1,
      runtimeExposure: route.status === 'published' ? 'published-catalog-route' : 'planned-route',
      moduleInference: 'inferred-from-academic-reading-route',
      declaredId,
      sourceClaim: claim,
    }));
  });
}

for (const definition of LEARNING_EXPORTS) {
  const values = definition.values(catalog);
  assert(Array.isArray(values), `Falta export ${definition.exportName}`);
  const claim = observedOriginalClaim(definition.routes, definition.claimSourcePaths ?? []);
  values.forEach((value, index) => {
    const declaredId = typeof value.id === 'string' && value.id.trim() ? value.id : null;
    const assetId = `learning:${definition.bank}:${declaredId ?? `index-${index + 1}`}`;
    assets.push(baseAsset({
      assetId,
      family: 'learning-skill-bank',
      formatLabel: definition.bank,
      sourcePath: CATALOG_PATH,
      sourceLocator: `${definition.exportName}[${index}]`,
      value,
      title: titleFor(value, `${definition.bank} ${index + 1}`),
      routePaths: definition.routes,
      decisionCount: definition.readItems(value).length,
      questionGroupCount: 1,
      runtimeExposure: 'published-catalog-route',
      moduleInference: 'inferred-from-academic-reading-route',
      declaredId,
      sourceClaim: claim,
    }));
  });
}

for (const registryRow of registeredIeltsMocks) {
  const mockPath = registryRow.sourcePath;
  const mock = loadTsModule(mockPath).default;
  assert(mock?.examSlug === 'ielts', `Mock IELTS inválido: ${mockPath}`);
  assert(mock.id === registryRow.expectedMockId, `${registryRow.key} no coincide con mock.id`);
  const readingSections = mock.sections.filter(section => section.skill === 'reading');
  assert(readingSections.length === 3, `${mock.id} no contiene 3 secciones Reading`);
  readingSections.forEach((section, sectionIndex) => {
    const syntheticSectionId = `${mock.id}:reading-part-${section.part}`;
    const asset = baseAsset({
      assetId: `mock:${syntheticSectionId}`,
      family: 'legacy-mock-section',
      formatLabel: 'mixed-full-passage',
      sourcePath: mockPath,
      sourceLocator: `default.sections[reading:${sectionIndex}]`,
      value: section,
      title: titleFor(section, syntheticSectionId),
      routePaths: [`/examenes/ielts/practica/${mock.id}`],
      decisionCount: section.questions.reduce((sum, question) => sum + questionPoints(question), 0),
      questionGroupCount: section.questions.length,
      runtimeExposure: 'registered-public-mock-route',
      moduleInference: /^IELTS Academic\b/u.test(mock.title)
        ? 'inferred-from-parent-mock-title'
        : 'missing-or-ambiguous',
      declaredId: typeof section.id === 'string' ? section.id : null,
      sourceClaim: {
        claim: 'none-observed',
        evidencePaths: [],
        verification: 'not-applicable',
      },
    });
    asset.questionTypeCounts = mockQuestionTypeSummary(section.questions);
    asset.parentMockId = mock.id;
    asset.parentMockTitle = mock.title;
    assets.push(asset);
  });
}

const legacyValue = parseLegacyHub();
const legacyAsset = baseAsset({
  assetId: 'legacy:reading-hub:amazon-tfng',
  family: 'legacy-hub-exercise',
  formatLabel: 'true-false-not-given',
  sourcePath: LEGACY_HUB_PATH,
  sourceLocator: 'PASSAGE + STATEMENTS',
  value: legacyValue.assetValue,
  sourceIdentityValue: legacyValue.identityValue,
  title: legacyValue.assetValue.title,
  routePaths: ['/practica/ielts/reading'],
  decisionCount: legacyValue.assetValue.statementCount,
  questionGroupCount: 1,
  runtimeExposure: 'published-reading-hub',
  moduleInference: 'missing-or-ambiguous',
  declaredId: null,
  sourceClaim: {
    claim: 'real-passage-visible-claim',
    evidencePaths: [READING_PAGE_PATH],
    verification: 'unverified-by-structured-provenance',
  },
});
legacyAsset.surfaceScopeConflict = {
  status: 'conflicting-parent-metadata',
  evidencePath: READING_PAGE_PATH,
  observed:
    'metadata title says Academic and General Training; description, JSON-LD and exercise content frame the route as Academic',
};
assets.push(legacyAsset);

assets.sort((a, b) => a.assetId.localeCompare(b.assetId, 'en'));
const assetIds = assets.map(asset => asset.assetId);
assert(new Set(assetIds).size === assetIds.length, 'Hay assetId duplicados');
assert(assets.length === 120, `Se esperaban 120 activos; se hallaron ${assets.length}`);

const passageOccurrenceCounts = new Map();
for (const asset of assets.filter(entry => entry.canonicalPassageId)) {
  passageOccurrenceCounts.set(
    asset.canonicalPassageId,
    (passageOccurrenceCounts.get(asset.canonicalPassageId) ?? 0) + 1,
  );
}
for (const asset of assets) {
  asset.canonicalPassageOccurrenceCount = asset.canonicalPassageId
    ? passageOccurrenceCounts.get(asset.canonicalPassageId)
    : 0;
}

const familySummary = summarize(assets);
const passageDuplicateGroups = duplicatePassages(assets);
const summary = {
  assets: assets.length,
  questionGroups: assets.reduce((sum, asset) => sum + asset.questionGroupCount, 0),
  mockQuestionGroups: assets
    .filter(asset => asset.family === 'legacy-mock-section')
    .reduce((sum, asset) => sum + asset.questionGroupCount, 0),
  decisions: assets.reduce((sum, asset) => sum + asset.decisionCount, 0),
  passagesWithExtractableText: assets.filter(asset => asset.passageSha256).length,
  uniquePassageHashes: new Set(
    assets.map(asset => asset.passageSha256).filter(Boolean),
  ).size,
  assetsWithoutExtractablePassageText: assets.filter(asset => !asset.passageSha256).length,
  exactDuplicatePassageGroups: passageDuplicateGroups.length,
  declaredStableIds: assets.filter(asset => asset.stableIdStatus === 'declared').length,
  inventorySyntheticIds: assets.filter(asset => asset.stableIdStatus === 'inventory-synthetic').length,
  assetsWithModuleDeclared: assets.filter(asset => asset.metadataPresence.module.present).length,
  assetsWithRightsBasis: assets.filter(asset => asset.metadataPresence.rightsBasis.present).length,
  assetsWithAuthor: assets.filter(asset => asset.metadataPresence.author.present).length,
  assetsWithReviewer: assets.filter(asset => asset.metadataPresence.reviewer.present).length,
  assetsWithFactualSources: assets.filter(asset => asset.metadataPresence.factualSources.present).length,
  quarantined: assets.filter(asset => asset.recommendedDisposition === 'quarantine').length,
  runtimeQuarantineContradictions: assets.filter(asset => asset.runtimeQuarantineContradiction).length,
  visibleOriginalClaimsUnverified: assets.filter(
    asset => asset.surfaceClaim.claim === 'original-welearn-visible-claim',
  ).length,
};
assert(summary.decisions === 1_152, `Se esperaban 1.152 decisiones; se hallaron ${summary.decisions}`);
assert(summary.questionGroups === 310, `Se esperaban 310 grupos; se hallaron ${summary.questionGroups}`);
assert(summary.mockQuestionGroups === 250, `Se esperaban 250 grupos mock; se hallaron ${summary.mockQuestionGroups}`);
assert(summary.assetsWithRightsBasis === 0, 'El baseline esperaba 0 rightsBasis estructurados');
assert(
  summary.visibleOriginalClaimsUnverified === 59,
  `Se esperaban 59 activos bajo claims visibles de originalidad; se hallaron ${summary.visibleOriginalClaimsUnverified}`,
);

const assetPayloadScan = inspectSanitizedPayload(assets);
assertSanitizedPayload(assetPayloadScan, 'Inventario de activos');

const sourcePaths = [
  CATALOG_PATH,
  LEGACY_HUB_PATH,
  READING_PAGE_PATH,
  QUESTION_TYPES_HUB_PATH,
  MIXED_ENGINE_PATH,
  LOOP_POLICY_PATH,
  MOCK_INDEX_PATH,
  ...MOCK_PATHS,
  ...new Set(typeRoutes.map(route => pagePath(route.path))),
  ...new Set(skillRoutes.map(route => pagePath(route.path))),
].filter(path => existsSync(resolve(ROOT, path))).sort();
const sourceFiles = sourcePaths.map(path => ({ path, sha256: sourceSha(path) }));
const combinedSourceHash = createHash('sha256');
for (const source of sourceFiles) {
  combinedSourceHash.update(source.path);
  combinedSourceHash.update('\0');
  combinedSourceHash.update(readFileSync(resolve(ROOT, source.path)));
  combinedSourceHash.update('\0');
}

const gitHead = execFileSync('git', ['rev-parse', 'HEAD'], {
  cwd: ROOT,
  encoding: 'utf8',
}).trim();
const sourceGitStatus = execFileSync(
  'git',
  ['status', '--porcelain=v1', '--', ...sourcePaths],
  { cwd: ROOT, encoding: 'utf8' },
).trimEnd().split('\n').filter(Boolean).sort();

const externalMatchReviews = [
  {
    assetId: 'mock:set-1:reading-part-5',
    observedTitle: 'Reading Passage 1: Bakelite',
    matchClass: 'high-confidence-title-opening-and-sequence-match',
    matchedCollection: 'Cambridge IELTS 5 Academic Reading Test 2, Passage 1',
    supportingUrl: 'https://www.babarenglish.com/post/cambridge-ielts-academic-5-reading-test-1-answers-with-explanation',
    authorizationEvidenceLocatedInReviewedSources: false,
    reviewScope: 'supporting URL only; not a rights-clearance search',
    legalConclusion: 'none',
    action: 'priority-rights-holder-review; remain quarantined',
  },
  {
    assetId: 'mock:set-1:reading-part-6',
    observedTitle: "Reading Passage 2: What's so funny?",
    matchClass: 'high-confidence-title-opening-and-sequence-match',
    matchedCollection: 'Cambridge IELTS 5 Academic Reading Test 2, Passage 2',
    supportingUrl: 'https://www.babarenglish.com/post/cambridge-ielts-academic-5-reading-test-1-answers-with-explanation',
    authorizationEvidenceLocatedInReviewedSources: false,
    reviewScope: 'supporting URL only; not a rights-clearance search',
    legalConclusion: 'none',
    action: 'priority-rights-holder-review; remain quarantined',
  },
  {
    assetId: 'mock:set-1:reading-part-7',
    observedTitle: 'Reading Passage 3: The Birth of Scientific English',
    matchClass: 'high-confidence-title-opening-and-sequence-match',
    matchedCollection: 'Cambridge IELTS 5 Academic Reading Test 2, Passage 3',
    supportingUrl: 'https://ieltsdeal.com/ielts-academic-reading-cambridge-5-test-2-reading-passage-3-the-birth-of-scientific-english-with-best-solutions-and-best-explanations/',
    authorizationEvidenceLocatedInReviewedSources: false,
    reviewScope: 'supporting URL only; not a rights-clearance search',
    legalConclusion: 'none',
    action: 'priority-rights-holder-review; remain quarantined',
  },
];
externalMatchReviews.forEach(review => {
  assert(assetIds.includes(review.assetId), `Match externo sin activo: ${review.assetId}`);
});

const inventory = {
  schemaVersion: 'ielts-academic-reading-content-inventory.v1',
  generatedAt: GENERATED_AT,
  unit: 'F0.1 canonical census, grain and content identity',
  status: 'partial-parent-unit; census-complete; rights-adjudication-and-runtime-enforcement-open',
  scope: {
    includedFamilies: [
      '42 formative route-bank passage objects',
      '17 learning/skill set objects',
      '60 legacy mock Reading sections',
      '1 legacy hub exercise',
    ],
    excluded: [
      'Writing, Listening, Speaking and General Training content',
      'official sample materials linked but not stored as WeLearn assets',
      'item-level answer-key adjudication',
    ],
    grain: {
      formative: 'one catalog passage/practice-set object',
      learning: 'one catalog learning set object',
      mock: 'one section where skill equals reading',
      legacyHub: 'the single embedded PASSAGE + STATEMENTS exercise',
    },
    entityModel: {
      assetOccurrence:
        'one learner-facing source object or section at the family-specific grain; assets are occurrences, not necessarily unique texts',
      canonicalPassage:
        'one normalized non-empty passage hash; multiple asset occurrences may reference the same canonicalPassageId',
      questionGroup:
        'a counted task container; this F0.1 census records quantity only and does not claim stable editorial identity',
      decision:
        'a counted formative/learning decision, scored mock point or legacy statement; no prompt or answer payload is stored',
    },
  },
  discovery: {
    method: 'exhaustive allowlisted traversal plus public-registry reconciliation; no sampling',
    searchRoots: [
      CATALOG_PATH,
      'src/data/mocks/ielts-set-1.ts … src/data/mocks/ielts-set-20.ts',
      MOCK_INDEX_PATH,
      LEGACY_HUB_PATH,
    ],
    inclusionRules: [
      'all objects in the 14 exported IELTS Reading question-type banks',
      'all objects in the 8 exported IELTS Reading learning/skill banks',
      "all mock sections where examSlug is ielts and skill is reading",
      'the single PASSAGE + STATEMENTS exercise embedded in the public Reading hub',
    ],
    reconciliation: {
      declaredQuestionTypeRoutes: typeRoutes.length,
      declaredSkillRoutes: skillRoutes.length,
      formativeExportsTraversed: FORMATIVE_EXPORTS.length,
      learningExportsTraversed: LEARNING_EXPORTS.length,
      registeredIeltsMocks: registeredIeltsMocks.length,
      readingSectionsPerMockRequired: 3,
      legacyHubExercises: 1,
      assetOccurrences: summary.assets,
      textOccurrences: summary.passagesWithExtractableText,
      uniqueCanonicalPassages: summary.uniquePassageHashes,
      questionGroups: summary.questionGroups,
      decisions: summary.decisions,
    },
    knownBoundary:
      'Exhaustiveness is guaranteed only for the named exports/files/routes at this snapshot. Future new source roots require an explicit extractor update and will otherwise fail review rather than be silently inferred.',
  },
  policy: {
    allowedRightsBasis: [...ALLOWED_RIGHTS_BASES],
    conservativeRule:
      'A visible originality claim is not rights evidence. Without a structured, reviewable rightsBasis and supporting provenance, the asset remains unknown-quarantined.',
    currentSubunitBoundary:
      'This census records the contradiction but does not change runtime routing or content. Enforcement is a later child subunit.',
    officialSources: OFFICIAL_SOURCES,
  },
  extractor: {
    path: 'output/audits/ielts-reading-inventory-2026-08-09/extract-inventory.mjs',
    sha256: sourceSha('output/audits/ielts-reading-inventory-2026-08-09/extract-inventory.mjs'),
    runtime: { node: process.version, typescript: ts.version },
    deterministicTimestamp: GENERATED_AT,
    storesQuestionOrAnswerPayloads: false,
  },
  sourceIdentity: {
    gitHead,
    sourceGitStatus,
    combinedSha256: combinedSourceHash.digest('hex'),
    files: sourceFiles,
  },
  qualityChecks: {
    expectedAssets: 120,
    expectedDecisions: 1_152,
    uniqueAssetIds: true,
    sourceObjectHashesComplete: assets.every(asset => /^[a-f0-9]{64}$/u.test(asset.sourceObjectSha256)),
    sourceFileHashesComplete: assets.every(asset => /^[a-f0-9]{64}$/u.test(asset.sourceFileSha256)),
    noAnswerPayloadStored: assetPayloadScan.forbiddenContentFields.length === 0,
    noPiiPayloadStored:
      assetPayloadScan.forbiddenPiiFields.length === 0 && assetPayloadScan.emailLikeValues.length === 0,
    payloadScanNodesVisited: assetPayloadScan.nodesVisited,
    exactMockRegistryMapping:
      registeredIeltsMocks.length === 20 &&
      registeredIeltsMocks.every(row => row.binding === `ieltsSet${row.setNumber}`),
    classificationRuleAppliedToAllAssets: assets.every(asset =>
      asset.provisionalRightsBasis === 'unknown-quarantined' &&
      asset.recommendedDisposition === 'quarantine'),
  },
  summary,
  byFamily: familySummary,
  exactPassageHashDuplicates: passageDuplicateGroups,
  externalSearchMethodology: {
    mode: 'directed-non-exhaustive-spot-check',
    reviewedAt: '2026-08-09',
    selectionRule:
      'Three consecutive sections in set-1 were selected after a recognizable title/sequence signal; this was not a search across all 120 assets.',
    reviewedAssetIds: externalMatchReviews.map(review => review.assetId),
    reviewedUrls: [...new Set(externalMatchReviews.map(review => review.supportingUrl))],
    limitation:
      'No conclusion—positive or negative—may be inferred for the other 117 assets. False means only that authorization evidence was not located in the cited page, not that no authorization exists anywhere.',
  },
  externalMatchReviews,
  sourceConflicts: [
    {
      id: 'visible-original-claim-without-structured-proof',
      affectedAssets: summary.visibleOriginalClaimsUnverified,
      observed:
        'Published route pages describe banks or exercises as original WeLearn, while their source objects contain no structured author, rightsBasis or factualSources fields.',
      treatment: 'claim remains unverified; no asset is rights-cleared by this census',
    },
    {
      id: 'legacy-hub-module-scope-conflict',
      affectedAssets: 1,
      observed:
        'The Reading page metadata title says Academic and General Training, while its description, JSON-LD and embedded exercise frame the surface as Academic; the same metadata calls it a real passage without provenance.',
      treatment:
        'module remains missing-or-ambiguous and the real-passage claim remains unverified; no rights or module clearance is inferred',
    },
    {
      id: 'runtime-exposure-versus-quarantine-policy',
      affectedAssets: summary.runtimeQuarantineContradictions,
      observed:
        'All inventoried assets are reachable or registered while the governing loop says unknown-quarantined content must not render, index or enter practice/mock.',
      treatment: 'recorded as a parent-unit blocker; enforcement stays open',
    },
  ],
  assets,
};

const blindPacket = {
  schemaVersion: 'ielts-academic-reading-content-census-blind.v1',
  generatedAt: GENERATED_AT,
  reviewRole:
    'Independent IELTS Academic Reading scope and provenance reviewer; no answer key, editorial rationale, proposed classification or external-match adjudication is included.',
  reviewQuestions: [
    'Is the declared grain sufficient to account for every learner-facing Reading content object without double counting?',
    'Does the family split plausibly cover Academic Reading practice, skills, mocks and the legacy hub?',
    'Can any asset be cleared for publication from the observable metadata alone?',
    'Which structural gaps must remain blocking before a later content-level IELTS review?',
  ],
  policySources: OFFICIAL_SOURCES,
  observableSummary: {
    assets: summary.assets,
    questionGroups: summary.questionGroups,
    decisions: summary.decisions,
    passagesWithExtractableText: summary.passagesWithExtractableText,
    declaredStableIds: summary.declaredStableIds,
    inventorySyntheticIds: summary.inventorySyntheticIds,
  },
  scope: inventory.scope,
  discovery: inventory.discovery,
  subunitBoundary:
    'F0.1 proves occurrence coverage and identity only. Stable passage/group/question data contracts, rights adjudication, content resolution and runtime quarantine enforcement remain separate open units.',
  byFamily: familySummary.map(row => ({
    family: row.family,
    assets: row.assets,
    decisions: row.decisions,
    passagesWithText: row.passagesWithText,
    declaredStableIds: row.declaredStableIds,
  })),
  assets: assets.map(asset => ({
    assetId: asset.assetId,
    family: asset.family,
    formatLabel: asset.formatLabel,
    title: asset.title,
    sourcePath: asset.sourcePath,
    sourceLocator: asset.sourceLocator,
    declaredId: asset.declaredId,
    stableIdStatus: asset.stableIdStatus,
    routePaths: asset.routePaths,
    runtimeExposure: asset.runtimeExposure,
    module: asset.module,
    inferredModule: asset.inferredModule,
    moduleStatus: asset.moduleStatus,
    moduleInferenceBasis: asset.moduleInferenceBasis,
    contentForm: asset.contentForm,
    canonicalPassageId: asset.canonicalPassageId,
    canonicalPassageOccurrenceCount: asset.canonicalPassageOccurrenceCount,
    passageWordCount: asset.passageWordCount,
    questionGroupCount: asset.questionGroupCount,
    decisionCount: asset.decisionCount,
    metadataPresence: asset.metadataPresence,
    sourceFileSha256: asset.sourceFileSha256,
    sourceObjectSha256: asset.sourceObjectSha256,
    passageSha256: asset.passageSha256,
    questionTypeCounts: asset.questionTypeCounts ?? null,
  })),
};
const blindPayloadScan = inspectSanitizedPayload(blindPacket);
assertSanitizedPayload(blindPayloadScan, 'Paquete ciego');
inventory.qualityChecks.blindPacketNoAnswerPayload =
  blindPayloadScan.forbiddenContentFields.length === 0;
inventory.qualityChecks.blindPacketNoPii =
  blindPayloadScan.forbiddenPiiFields.length === 0 && blindPayloadScan.emailLikeValues.length === 0;
inventory.qualityChecks.blindPayloadScanNodesVisited = blindPayloadScan.nodesVisited;

const inventoryJson = `${JSON.stringify(inventory, null, 2)}\n`;
const blindJson = `${JSON.stringify(blindPacket, null, 2)}\n`;
const tsv = buildTsv(assets);

if (process.argv.includes('--write')) {
  writeFileSync(resolve(HERE, 'inventory.json'), inventoryJson);
  writeFileSync(resolve(HERE, 'inventory.tsv'), tsv);
  writeFileSync(resolve(HERE, 'blind-review.json'), blindJson);
}

if (process.argv.includes('--check')) {
  assert(readFileSync(resolve(HERE, 'inventory.json'), 'utf8') === inventoryJson, 'inventory.json tiene drift');
  assert(readFileSync(resolve(HERE, 'inventory.tsv'), 'utf8') === tsv, 'inventory.tsv tiene drift');
  assert(readFileSync(resolve(HERE, 'blind-review.json'), 'utf8') === blindJson, 'blind-review.json tiene drift');
}

process.stdout.write(`${JSON.stringify({
  inventorySha256: sha256(inventoryJson),
  blindReviewSha256: sha256(blindJson),
  tsvSha256: sha256(tsv),
  sourceCombinedSha256: inventory.sourceIdentity.combinedSha256,
  summary,
  familySummary,
  exactPassageHashDuplicateGroups: inventory.exactPassageHashDuplicates.length,
  externalPriorityMatches: externalMatchReviews.length,
}, null, 2)}\n`);
