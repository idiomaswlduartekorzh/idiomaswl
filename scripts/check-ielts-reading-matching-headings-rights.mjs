#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const require = createRequire(import.meta.url);
const ts = require('typescript');

const PACKETS_GENERATED_AT = '2026-08-09T07:10:00-05:00';
const VALIDATION_GENERATED_AT = '2026-08-09T07:30:00-05:00';
const CATALOG_PATH = 'src/data/practica-exams/seo-catalog.ts';
const ROUTE_PATH =
  'src/app/(site)/practica/ielts/reading/tipos-de-preguntas/matching-headings/page.tsx';
const ENGINE_PATH = 'src/components/exam-practice/MatchingHeadingsEngine.tsx';
const BANK_PATH = 'src/components/exam-practice/MatchingHeadingsPassageBank.tsx';
const NEXT_ROUTE_PATH =
  'src/app/(site)/practica/ielts/reading/tipos-de-preguntas/matching-features/page.tsx';
const NEXT_ENGINE_PATH = 'src/components/exam-practice/MatchingFeaturesEngine.tsx';
const NEXT_BANK_PATH = 'src/components/exam-practice/MatchingFeaturesPassageBank.tsx';
const OFFICIAL_STRATEGY_PATH = 'src/components/exam-practice/OfficialStrategyCard.tsx';
const REVIEW_SOURCE_BLOCK_PATH = 'src/components/exam-practice/QuestionTypeReviewSourceBlock.tsx';
const STRUCTURED_DATA_PATH = 'src/components/exam-practice/StructuredData.tsx';
const CONTRACT_PATH = 'src/lib/ielts/academic-reading-rights.ts';
const REGISTRY_PATH = 'src/data/practica-exams/ielts-reading-rights-registry.ts';
const VALIDATOR_PATH = 'scripts/check-ielts-reading-matching-headings-rights.mjs';
const TEST_PATH = 'tests/ielts-reading-matching-headings-rights.test.mjs';
const LOOP_DOC_PATH = 'docs/ielts-reading-loop.md';
const OUTPUT_DIRECTORY = 'output/audits/ielts-reading-rights-matching-headings-2026-08-09';
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

const EXPECTED_ASSET_IDS = [
  'formative:matching-headings:mh-public-libraries',
  'formative:matching-headings:mh-urban-farming',
  'formative:matching-headings:mh-night-trains',
];
const EXPECTED_SET_IDS = ['mh-public-libraries', 'mh-urban-farming', 'mh-night-trains'];
const EXPECTED_SOURCE_IDS = [
  'ielts-matching-headings-official-format',
  'libraries-gla-civic-spaces',
  'libraries-ala-digital-literacy',
  'libraries-imls-making',
  'urban-epa-brownfields-agriculture',
  'urban-usda-school-gardens',
  'urban-fao-healthy-soils',
  'night-eea-rail-low-carbon',
  'night-eu-cross-border-rail',
  'night-era-sleeper-authorisation',
];
const REQUIRED_FACTUAL_CLAIM_SPANS = {
  'formative:matching-headings:mh-public-libraries': [
    'Today, many library systems measure success differently.',
    'In many cities, libraries have become informal support centers.',
    'Some branches lend tablets or Wi-Fi devices, while others offer makerspaces with recording equipment and 3D printers.',
    'Staff members still organize collections, but they may also teach classes, troubleshoot devices, coordinate local partnerships and guide users through government websites.',
    'Traditional book borrowing has decreased in some places, yet attendance at events, demand for study areas and use of digital services have grown.',
  ],
  'formative:matching-headings:mh-urban-farming': [
    'Urban farming projects often begin with a practical problem: cities have little unused land.',
    'A tomato grown a few blocks away may require less transport and packaging than one shipped across a continent.',
    'Composting programmes connected to gardens can also reduce the amount of organic waste sent to landfill.',
    'In schools, gardens can become outdoor classrooms.',
    'Soil may be contaminated, roofs may not support heavy containers, and water access can be unreliable in summer.',
  ],
  'formative:matching-headings:mh-night-trains': [
    'Recently, several operators have announced new overnight services.',
    'A rail journey can produce far less pollution than a plane on the same route, especially when the electricity supply is relatively clean.',
    'Trains may cross several national networks, each with its own track access rules, maintenance windows and signalling systems.',
    'A delay in one country can also affect morning commuter services in another, so coordination matters as much as demand.',
    'Subsidies, early-booking fares and shared compartments can help, but operators still need enough revenue to cover staff, cleaning and rolling stock.',
  ],
};
const ALLOWED_HEADING_IDS = new Set(['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix']);
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
const sourceSha256 = relativePath => sha256(readFileSync(resolve(ROOT, relativePath)));
const readJson = relativePath => JSON.parse(readFileSync(resolve(ROOT, relativePath), 'utf8'));
const timestampMs = (value, label) => {
  const parsed = Date.parse(value);
  assert(Number.isFinite(parsed), `${label}: timestamp inválido.`);
  return parsed;
};

function assertExactIdCoverage(records, expectedIds, idField, label) {
  assert(Array.isArray(records) && records.length === expectedIds.length, `${label}: cardinalidad inválida.`);
  const observed = records.map(record => record?.[idField]);
  assert(new Set(observed).size === observed.length, `${label}: IDs duplicados.`);
  assert(JSON.stringify([...observed].sort()) === JSON.stringify([...expectedIds].sort()),
    `${label}: IDs extra o ausentes.`);
}

function stableValue(value) {
  if (Array.isArray(value)) return value.map(stableValue);
  if (!isObject(value)) return value;
  return Object.fromEntries(Object.keys(value).sort().map(key => [key, stableValue(value[key])]));
}
const stableJson = value => JSON.stringify(stableValue(value));

function assertExactKeys(value, expectedKeys, label) {
  assert(isObject(value), `${label}: se esperaba un objeto.`);
  const observed = Object.keys(value).sort();
  const expected = [...expectedKeys].sort();
  assert(JSON.stringify(observed) === JSON.stringify(expected),
    `${label}: keys inesperadas. Esperadas ${expected.join(', ')}; observadas ${observed.join(', ')}.`);
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

function findKeyLikePacketValues(value, path = '$', findings = []) {
  if (Array.isArray(value)) {
    value.forEach((entry, index) => findKeyLikePacketValues(entry, `${path}[${index}]`, findings));
    return findings;
  }
  if (typeof value === 'string') {
    const normalized = normalizeText(value);
    const patterns = [
      /\b(?:correct|right|stored|gold)\s+(?:answer|heading|roman numeral|key)\s+(?:for\s+(?:mh[-\w]+|paragraph\s+[a-f])\s+)?(?:is|:|=|→)\s*(?:heading\s+)?(?:i|ii|iii|iv|v|vi|vii|viii|ix)\b/iu,
      /\bmh[-\w]+(?:\s+(?:is|maps? to)|\s*[:=→])\s*(?:heading\s*)?(?:i|ii|iii|iv|v|vi|vii|viii|ix)\b/iu,
      /\b(?:choose|select|mark|use)\s+(?:the\s+)?(?:answer\s+)?(?:heading|roman numeral)?\s*(?:i|ii|iii|iv|v|vi|vii|viii|ix)\s+for\s+(?:mh[-\w]+|paragraph\s+[a-f])\b/iu,
      /\bmh[-\w]+\s+(?:corresponds?|maps?|points?|belongs?)\s+(?:to\s+)?(?:the\s+)?(?:heading|roman numeral)?\s*(?:i|ii|iii|iv|v|vi|vii|viii|ix)\b/iu,
      /\b(?:el\s+)?(?:heading|encabezado|título|titulo|número romano|numero romano|respuesta|clave)\s+(?:correcto|correcta|almacenado|almacenada|esperado|esperada)\s+(?:de\s+(?:mh[-\w]+|(?:el\s+)?párrafo\s+[a-f])\s+)?(?:es|:|=|→)\s*(?:i|ii|iii|iv|v|vi|vii|viii|ix)\b/iu,
      /\bmh[-\w]+\s+(?:tiene|lleva|usa)\s+(?:como\s+)?(?:respuesta|heading|encabezado|título|titulo|clave)\s*(?:i|ii|iii|iv|v|vi|vii|viii|ix)\b/iu,
      /\b(?:elige|selecciona|marca|usa)\s+(?:el|la)?\s*(?:respuesta|heading|encabezado|título|titulo|clave|número romano|numero romano)?\s*(?:i|ii|iii|iv|v|vi|vii|viii|ix)\s+(?:para|en)\s+mh[-\w]+\b/iu,
      /\bmh[-\w]+\s+corresponde\s+(?:al|a\s+la)?\s*(?:heading|encabezado|título|titulo|número romano|numero romano)?\s*(?:i|ii|iii|iv|v|vi|vii|viii|ix)\b/iu,
    ];
    if (patterns.some(pattern => pattern.test(normalized))) findings.push(path);
    return findings;
  }
  if (!isObject(value)) return findings;
  for (const [key, entry] of Object.entries(value)) {
    findKeyLikePacketValues(entry, `${path}.${key}`, findings);
  }
  return findings;
}

function sourceAssets(catalog) {
  const sets = catalog.IELTS_MATCHING_HEADINGS_PASSAGES;
  assert(Array.isArray(sets), 'Falta IELTS_MATCHING_HEADINGS_PASSAGES.');
  return sets.map((set, index) => ({
    assetId: `formative:matching-headings:${set.id}`,
    setIndex: index,
    id: set.id,
    title: set.title,
    instructions: set.instructions,
    headingOptions: set.headingOptions,
    paragraphs: set.paragraphs,
    decisions: set.paragraphs.map(paragraph => ({
      questionId: `${set.id}-${paragraph.id}`,
      paragraphId: paragraph.id,
      paragraphLabel: paragraph.label,
      paragraphText: paragraph.text,
      answer: paragraph.answer,
    })),
    wordCount: set.paragraphs.reduce((sum, paragraph) => sum + wordCount(paragraph.text), 0),
    sourceObjectSha256: sha256(stableJson(set)),
    passageSha256: sha256(normalizeText(set.paragraphs.map(paragraph => `${paragraph.id} ${paragraph.text}`).join('\n'))),
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
  const absoluteDirectory = resolve(ROOT, relativeDirectory);
  return readdirSync(absoluteDirectory, { recursive: true, withFileTypes: true })
    .filter(entry => entry.isFile() && /\.(?:ts|tsx|js|jsx|mjs)$/u.test(entry.name))
    .map(entry => resolve(entry.parentPath, entry.name));
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
  if (eligible === 0) return null;
  const p = hits / eligible;
  const z2 = z * z;
  const denominator = 1 + z2 / eligible;
  const center = p + z2 / (2 * eligible);
  const margin = z * Math.sqrt((p * (1 - p) + z2 / (4 * eligible)) / eligible);
  return (center + margin) / denominator;
}

function overlapScore(headingText, paragraphText) {
  const sourceTokens = new Set(normalizeText(paragraphText).toLowerCase().match(/[a-z]{3,}/gu) ?? []);
  const headingTokens = [...new Set(normalizeText(headingText).toLowerCase().match(/[a-z]{3,}/gu) ?? [])];
  return headingTokens.length
    ? headingTokens.filter(token => sourceTokens.has(token)).length / headingTokens.length
    : 0;
}

function structuralBiasProfile(assets, answerByQuestionId) {
  const rows = assets.flatMap(asset => asset.decisions.map((decision, paragraphIndex) => ({
    asset,
    decision,
    paragraphIndex,
    answer: answerByQuestionId.get(decision.questionId),
  })));
  assert(rows.every(row => ALLOWED_HEADING_IDS.has(row.answer)), 'El perfil contiene headings inválidos.');
  const labels = [...ALLOWED_HEADING_IDS];
  const answerSequence = rows.map(row => row.answer);
  const answerCounts = Object.fromEntries(labels.map(label => [label, answerSequence.filter(value => value === label).length]));
  const constantLabelHeuristics = Object.fromEntries(labels.map(label => {
    const hits = answerCounts[label];
    return [label, { hits, total: rows.length, accuracy: hits / rows.length }];
  }));
  const positionalHits = rows.filter(row => row.answer === labels[row.paragraphIndex]).length;
  let overlapHits = 0;
  let overlapEligible = 0;
  let overlapTies = 0;
  const overlapRows = [];
  for (const row of rows) {
    const scores = row.asset.headingOptions.map(heading => ({
      headingId: heading.id,
      score: overlapScore(heading.text, row.decision.paragraphText),
    }));
    const best = Math.max(...scores.map(item => item.score));
    const winners = scores.filter(item => item.score === best);
    if (winners.length === 1) {
      overlapEligible += 1;
      if (winners[0].headingId === row.answer) overlapHits += 1;
    } else {
      overlapTies += 1;
    }
    overlapRows.push({ questionId: row.decision.questionId, storedHeadingId: row.answer, scores });
  }
  let longestHits = 0;
  let longestEligible = 0;
  let longestTies = 0;
  for (const row of rows) {
    const lengths = row.asset.headingOptions.map(heading => ({ headingId: heading.id, words: wordCount(heading.text) }));
    const longest = Math.max(...lengths.map(item => item.words));
    const winners = lengths.filter(item => item.words === longest);
    if (winners.length === 1) {
      longestEligible += 1;
      if (winners[0].headingId === row.answer) longestHits += 1;
    } else longestTies += 1;
  }
  const headingLengthByLabel = Object.fromEntries(labels.map(label => {
    const lengths = assets.flatMap(asset => asset.headingOptions.filter(heading => heading.id === label)
      .map(heading => wordCount(heading.text)));
    return [label, {
      options: lengths.length,
      averageWords: lengths.length ? lengths.reduce((sum, value) => sum + value, 0) / lengths.length : null,
      minWords: lengths.length ? Math.min(...lengths) : null,
      maxWords: lengths.length ? Math.max(...lengths) : null,
    }];
  }));
  const perSet = assets.map(asset => {
    const answers = asset.decisions.map(decision => answerByQuestionId.get(decision.questionId));
    const counts = Object.fromEntries(labels.map(label => [label, answers.filter(value => value === label).length]));
    return {
      assetId: asset.assetId,
      answerCounts: counts,
      answerSequence: answers,
      reusedHeadingIds: labels.filter(label => counts[label] > 1),
      unusedHeadingIds: labels.filter(label => counts[label] === 0),
    };
  });
  const extremeCue = /\b(?:always|complete|every|only|unlimited|replaced|end of)\b/iu;
  const extremeRows = assets.flatMap(asset => asset.headingOptions
    .filter(heading => extremeCue.test(heading.text))
    .map(heading => {
      const timesCorrect = asset.decisions.filter(decision =>
        answerByQuestionId.get(decision.questionId) === heading.id).length;
      return { assetId: asset.assetId, headingId: heading.id, text: heading.text, timesCorrect };
    }));
  const transitions = {};
  for (let index = 1; index < answerSequence.length; index += 1) {
    const transition = `${answerSequence[index - 1]} → ${answerSequence[index]}`;
    transitions[transition] = (transitions[transition] ?? 0) + 1;
  }
  return {
    answerCounts,
    maxSameLabelRun: longestRun(answerSequence),
    constantLabelHeuristics,
    samePositionPredictsHeading: {
      definition: 'For paragraph position n, predict heading option position n.',
      eligible: rows.length,
      tiesOrAbstentions: 0,
      hits: positionalHits,
      conditionalAccuracy: positionalHits / rows.length,
      totalAccuracy: positionalHits / rows.length,
      uniformNineHeadingBaseline: 1 / 9,
      wilsonUpper95: wilsonUpper(positionalHits, rows.length),
    },
    highestLexicalOverlapPredictsHeading: {
      eligible: overlapEligible,
      tiesOrAbstentions: overlapTies,
      hits: overlapHits,
      conditionalAccuracy: overlapEligible ? overlapHits / overlapEligible : null,
      totalAccuracy: overlapHits / rows.length,
      uniformNineHeadingBaseline: 1 / 9,
    },
    longestHeadingPredictsAnswer: {
      eligible: longestEligible,
      tiesOrAbstentions: longestTies,
      hits: longestHits,
      conditionalAccuracy: longestEligible ? longestHits / longestEligible : null,
      totalAccuracy: longestHits / rows.length,
      uniformNineHeadingBaseline: 1 / 9,
    },
    extremeCueDistractorSignal: {
      cuePattern: extremeCue.source,
      flaggedOptions: extremeRows.length,
      flaggedCorrectUses: extremeRows.reduce((sum, row) => sum + row.timesCorrect, 0),
      flaggedOptionsNeverCorrect: extremeRows.filter(row => row.timesCorrect === 0).length,
      rows: extremeRows,
    },
    headingLengthByLabel,
    overlapRows,
    perSet,
    sequenceProfile: { answerSequence, transitions },
  };
}

export function buildBlindReviewPacket() {
  const assets = sourceAssets(loadTsModule(CATALOG_PATH));
  const records = EXPECTED_ASSET_IDS.map(assetId => {
    const asset = assets.find(candidate => candidate.assetId === assetId);
    assert(asset, `${assetId}: activo ausente.`);
    return asset;
  });
  const packet = {
    schemaVersion: 'ielts-reading-matching-headings-blind-review.v1',
    generatedAt: PACKETS_GENERATED_AT,
    reviewScope: 'F0.2b.5 — three formative Matching Headings passages',
    reviewerIsolation:
      'Use only this packet for the first pass. Do not open the catalog, registry, validator, route, UI, prior audits or factual-source packet until every decision has been fixed in a separate first-pass file.',
    taskRule:
      'Match each paragraph or section to one Roman-numeral heading that summarizes its main idea. There are more headings than paragraphs, some headings remain unused, and no heading may be used more than once.',
    instruction:
      'Independently adjudicate all 17 paragraphs. Select exactly one Roman-numeral heading for each paragraph, state the whole-paragraph main idea, quote decisive spans, explain the paragraph-to-heading paraphrase, and identify the strongest competing heading and why it fails. Mark ambiguity as material whenever two headings remain reasonable under the whole paragraph. Record title-cue risk and IELTS fitness. This is an AI editorial review, not a human signature, rights clearance or publication approval.',
    excludes: [
      'answer keys', 'correctness labels', 'explanations', 'trap labels',
      'declared skills', 'prior reviewer decisions', 'student data',
    ],
    records: records.map(asset => ({
      assetId: asset.assetId,
      title: asset.title,
      sourceObjectSha256: asset.sourceObjectSha256,
      passageSha256: asset.passageSha256,
      instructions: asset.instructions,
      headingOptions: asset.headingOptions.map(heading => ({
        headingId: heading.id,
        text: heading.text,
      })),
      paragraphs: asset.paragraphs.map(paragraph => ({
        questionId: `${asset.id}-${paragraph.id}`,
        paragraphId: paragraph.id,
        label: paragraph.label,
        text: paragraph.text,
      })),
    })),
  };
  assertExactKeys(packet,
    ['schemaVersion', 'generatedAt', 'reviewScope', 'reviewerIsolation', 'taskRule', 'instruction', 'excludes', 'records'],
    'blindReview');
  packet.records.forEach((record, recordIndex) => {
    assertExactKeys(record,
      ['assetId', 'title', 'sourceObjectSha256', 'passageSha256', 'instructions', 'headingOptions', 'paragraphs'],
      `blindReview.records[${recordIndex}]`);
    record.headingOptions.forEach((heading, headingIndex) => assertExactKeys(
      heading, ['headingId', 'text'],
      `blindReview.records[${recordIndex}].headingOptions[${headingIndex}]`));
    record.paragraphs.forEach((paragraph, paragraphIndex) => assertExactKeys(
      paragraph, ['questionId', 'paragraphId', 'label', 'text'],
      `blindReview.records[${recordIndex}].paragraphs[${paragraphIndex}]`));
  });
  assert(findForbiddenKeys(packet).length === 0, 'El packet ciego filtra claves o feedback.');
  const packetValueLeakage = findKeyLikePacketValues(packet);
  assert(packetValueLeakage.length === 0,
    `El packet ciego filtra una clave en un valor textual: ${packetValueLeakage.join(', ')}`);
  assert(findPii(packet).length === 0, 'El packet ciego contiene PII.');
  return packet;
}

export function buildFactualSourceReviewPacket() {
  const registry = loadTsModule(REGISTRY_PATH).IELTS_READING_RIGHTS_REGISTRY;
  const evidenceById = new Map(registry.evidence.map(evidence => [evidence.id, evidence]));
  const packet = {
    schemaVersion: 'ielts-reading-matching-headings-factual-source-review.v1',
    generatedAt: PACKETS_GENERATED_AT,
    reviewScope: 'F0.2b.5 — second-pass factual-source review only',
    instruction:
      'Open only after persisting the full blind first pass. Review every exact claim span against candidate sources and classify it supported, oversimplified, unsupported or untraceable. Separate factual support from the writer’s normative stance. Candidate sources do not prove authorship, license, authorization or verification.',
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
  assert(findKeyLikePacketValues(packet).length === 0, 'El packet factual filtra claves en valores.');
  assert(findPii(packet).length === 0, 'El packet factual contiene PII.');
  return packet;
}

function validateQuestionDecision(decision, sourceDecision, asset, label) {
  assertExactKeys(decision,
    ['questionId', 'paragraphId', 'selectedHeadingId', 'globalEvidenceScope', 'mainIdeaStatement',
      'supportingQuotes', 'paraphraseMap', 'closestCompetingHeadingId', 'competitorFailure',
      'ambiguity', 'reasoning'],
    label);
  assert(decision.questionId === sourceDecision.questionId &&
    decision.paragraphId === sourceDecision.paragraphId,
  `${label}: questionId o paragraphId no coincide.`);
  const headingIds = asset.headingOptions.map(heading => heading.id);
  assert(headingIds.includes(decision.selectedHeadingId), `${label}: heading seleccionado inválido.`);
  assert(headingIds.includes(decision.closestCompetingHeadingId) &&
    decision.closestCompetingHeadingId !== decision.selectedHeadingId,
  `${label}: rival ausente, inválido o idéntico.`);
  const normalizedScope = normalizeText(decision.globalEvidenceScope).toLowerCase();
  const normalizedLabel = normalizeText(sourceDecision.paragraphLabel).toLowerCase();
  const paragraphScopePattern = new RegExp(`\\bparagraph\\s+${sourceDecision.paragraphId}\\b`, 'iu');
  assert(typeof decision.globalEvidenceScope === 'string' && decision.globalEvidenceScope.trim() &&
    (normalizedScope === sourceDecision.paragraphId || normalizedScope === normalizedLabel ||
      paragraphScopePattern.test(normalizedScope)),
  `${label}: globalEvidenceScope no identifica el párrafo completo.`);
  assert(typeof decision.mainIdeaStatement === 'string' && decision.mainIdeaStatement.trim(),
    `${label}: mainIdeaStatement ausente.`);
  assert(Array.isArray(decision.supportingQuotes) && decision.supportingQuotes.length >= 1 &&
    new Set(decision.supportingQuotes.map(normalizeText)).size === decision.supportingQuotes.length &&
    decision.supportingQuotes.every(quote => typeof quote === 'string' && quote.trim() &&
      normalizeText(sourceDecision.paragraphText).includes(normalizeText(quote))),
  `${label}: supportingQuotes deben ser spans únicos del párrafo.`);
  assert(isObject(decision.paraphraseMap) && Object.keys(decision.paraphraseMap).length > 0 &&
    Object.entries(decision.paraphraseMap).every(entry =>
      typeof entry[0] === 'string' && entry[0].trim() &&
      typeof entry[1] === 'string' && entry[1].trim()) &&
    typeof decision.competitorFailure === 'string' && decision.competitorFailure.trim() &&
    ['none', 'minor', 'material'].includes(decision.ambiguity) &&
    typeof decision.reasoning === 'string' && decision.reasoning.trim(),
  `${label}: contrato pedagógico incompleto.`);
}

function validateFirstPass(firstPass, assets, blindReview) {
  assertExactKeys(firstPass, ['schemaVersion', 'reviewer', 'records'], 'firstPass');
  assert(firstPass.schemaVersion === 'ielts-reading-matching-headings-expert-first-pass.v1',
    'Schema first-pass inválido.');
  assertExactKeys(firstPass.reviewer,
    ['reviewerRunId', 'reviewedAt', 'blindPacketSha256', 'humanSignature', 'sourceContext', 'notes'],
    'firstPass.reviewer');
  assert(typeof firstPass.reviewer.reviewerRunId === 'string' && firstPass.reviewer.reviewerRunId.trim() &&
    Number.isFinite(Date.parse(firstPass.reviewer.reviewedAt)) && firstPass.reviewer.humanSignature === false &&
    firstPass.reviewer.sourceContext === 'blind-review-packet-only' &&
    firstPass.reviewer.blindPacketSha256 === sourceSha256(BLIND_REVIEW_PATH) &&
    ((typeof firstPass.reviewer.notes === 'string' && firstPass.reviewer.notes.trim()) ||
      (Array.isArray(firstPass.reviewer.notes) && firstPass.reviewer.notes.length > 0 &&
        firstPass.reviewer.notes.every(note => typeof note === 'string' && note.trim()))),
  'Reviewer first-pass inválido.');
  assertExactIdCoverage(firstPass.records, assets.map(asset => asset.assetId), 'assetId', 'firstPass.records');
  const seen = new Set();
  for (const asset of assets) {
    const record = firstPass.records.find(candidate => candidate.assetId === asset.assetId);
    assertExactKeys(record, ['assetId', 'passageAssessment', 'questions'], `${asset.assetId}:firstPass`);
    assertExactKeys(record.passageAssessment, ['ieltsFitness', 'titleCueRisk', 'notes'],
      `${asset.assetId}:passageAssessment`);
    assert(['fit', 'mixed', 'unfit'].includes(record.passageAssessment.ieltsFitness) &&
      ['low', 'medium', 'high'].includes(record.passageAssessment.titleCueRisk) &&
      ((typeof record.passageAssessment.notes === 'string' && record.passageAssessment.notes.trim()) ||
        (Array.isArray(record.passageAssessment.notes) && record.passageAssessment.notes.length > 0 &&
          record.passageAssessment.notes.every(note => typeof note === 'string' && note.trim()))),
    `${asset.assetId}: assessment incompleto.`);
    assertExactIdCoverage(record.questions, asset.decisions.map(decision => decision.questionId), 'questionId',
      `${asset.assetId}:firstPass.questions`);
    const usedHeadings = new Set();
    for (const sourceDecision of asset.decisions) {
      const decision = record.questions.find(candidate => candidate.questionId === sourceDecision.questionId);
      assert(decision && !seen.has(sourceDecision.questionId),
        `${sourceDecision.questionId}: decisión ausente o duplicada.`);
      validateQuestionDecision(decision, sourceDecision, asset, `${sourceDecision.questionId}:firstPass`);
      assert(!usedHeadings.has(decision.selectedHeadingId),
        `${asset.assetId}: el experto reutilizó heading ${decision.selectedHeadingId}.`);
      usedHeadings.add(decision.selectedHeadingId);
      seen.add(sourceDecision.questionId);
    }
  }
  assert(blindReview.records.flatMap(record => record.paragraphs).length === seen.size,
    'First-pass no cubre el packet exacto.');
  return { questionCount: seen.size, fileSha256: sourceSha256(FIRST_PASS_PATH) };
}

function validateExpertVerdict(expertVerdict, firstPass, firstPassTrace, assets, factualPacket) {
  assertExactKeys(expertVerdict, ['schemaVersion', 'reviewer', 'records'], 'expertVerdict');
  assert(expertVerdict.schemaVersion === 'ielts-reading-matching-headings-expert-verdict.v1',
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
  'Trazabilidad de experto inválida.');
  assertExactIdCoverage(expertVerdict.records, assets.map(asset => asset.assetId), 'assetId', 'expertVerdict.records');
  const comparisons = [];
  const factualClaims = [];
  for (const asset of assets) {
    const record = expertVerdict.records.find(candidate => candidate.assetId === asset.assetId);
    const firstRecord = firstPass.records.find(candidate => candidate.assetId === asset.assetId);
    const sourceRecord = factualPacket.records.find(candidate => candidate.assetId === asset.assetId);
    assert(record && firstRecord && sourceRecord, `${asset.assetId}: expediente experto incompleto.`);
    assertExactKeys(record, ['assetId', 'passageAssessment', 'questions', 'factualClaims'], `${asset.assetId}:expert`);
    assertExactKeys(record.passageAssessment,
      ['ieltsFitness', 'factualRisk', 'representationRisk', 'priorKnowledgeRisk',
        'irrelevantLoadRisk', 'titleCueRisk', 'notes'], `${asset.assetId}:expertAssessment`);
    assert(['fit', 'mixed', 'unfit'].includes(record.passageAssessment.ieltsFitness) &&
      ['factualRisk', 'representationRisk', 'priorKnowledgeRisk', 'irrelevantLoadRisk', 'titleCueRisk']
        .every(key => ['low', 'medium', 'high'].includes(record.passageAssessment[key])) &&
      ((typeof record.passageAssessment.notes === 'string' && record.passageAssessment.notes.trim()) ||
        (Array.isArray(record.passageAssessment.notes) && record.passageAssessment.notes.length > 0 &&
          record.passageAssessment.notes.every(note => typeof note === 'string' && note.trim()))),
    `${asset.assetId}: assessment final inválido.`);
    assertExactIdCoverage(record.questions, asset.decisions.map(decision => decision.questionId), 'questionId',
      `${asset.assetId}:expert.questions`);
    const usedHeadings = new Set();
    for (const sourceDecision of asset.decisions) {
      const decision = record.questions.find(candidate => candidate.questionId === sourceDecision.questionId);
      const firstDecision = firstRecord.questions.find(candidate =>
        candidate.questionId === sourceDecision.questionId);
      validateQuestionDecision(decision, sourceDecision, asset, `${sourceDecision.questionId}:expert`);
      assert(!usedHeadings.has(decision.selectedHeadingId),
        `${asset.assetId}: el experto reutilizó heading ${decision.selectedHeadingId}.`);
      usedHeadings.add(decision.selectedHeadingId);
      assert(stableJson(decision) === stableJson(firstDecision),
        `${sourceDecision.questionId}: cambió tras abrir fuentes.`);
      comparisons.push({
        questionId: sourceDecision.questionId,
        expertHeadingId: decision.selectedHeadingId,
        matchesStoredKey: decision.selectedHeadingId === sourceDecision.answer,
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
        typeof claim.note === 'string' && claim.note.trim(), `${asset.assetId}: claim review inválido.`);
      const findingIds = new Set();
      for (const finding of claim.sourceFindings) {
        assertExactKeys(finding, ['evidenceId', 'locator', 'evidenceSummary'], `${asset.assetId}:sourceFinding`);
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
  assert(walkthrough.schemaVersion === 'ielts-reading-matching-headings-student-walkthrough.v1',
    'Schema walkthrough inválido.');
  assertExactKeys(walkthrough.reviewer, ['humanSignature', 'sourceContext', 'reviewedAt', 'notes'],
    'studentWalkthrough.reviewer');
  assert(walkthrough.reviewer.humanSignature === false &&
    walkthrough.reviewer.sourceContext === 'blind-review-packet-only' &&
    Number.isFinite(Date.parse(walkthrough.reviewer.reviewedAt)) &&
    Array.isArray(walkthrough.reviewer.notes) && walkthrough.reviewer.notes.length > 0 &&
    walkthrough.reviewer.notes.every(note => typeof note === 'string' && note.trim()),
  'Reviewer walkthrough inválido.');
  assert(findForbiddenKeys(walkthrough).length === 0 && findKeyLikePacketValues(walkthrough).length === 0 &&
    findPii(walkthrough).length === 0, 'Walkthrough filtra clave, feedback editorial o PII.');
  assertExactIdCoverage(walkthrough.records, assets.map(asset => asset.assetId), 'assetId', 'studentWalkthrough.records');
  let questionsCovered = 0;
  for (const asset of assets) {
    const record = walkthrough.records.find(candidate => candidate.assetId === asset.assetId);
    assertExactKeys(record,
      ['assetId', 'passageBarrier', 'titleInfluenceRisk', 'shortcutRisks', 'transferValue',
        'nextAction', 'questionWalkthrough'], `${asset.assetId}:walkthrough`);
    assert(['low', 'medium', 'high'].includes(record.titleInfluenceRisk) &&
      typeof record.passageBarrier === 'string' && record.passageBarrier.trim() &&
      Array.isArray(record.shortcutRisks) && record.shortcutRisks.length >= 2 &&
      record.shortcutRisks.every(value => typeof value === 'string' && value.trim()) &&
      typeof record.transferValue === 'string' && record.transferValue.trim() &&
      typeof record.nextAction === 'string' && record.nextAction.trim(), `${asset.assetId}: walkthrough incompleto.`);
    assertExactIdCoverage(record.questionWalkthrough, asset.decisions.map(decision => decision.questionId), 'questionId',
      `${asset.assetId}:walkthrough.questions`);
    for (const sourceDecision of asset.decisions) {
      const row = record.questionWalkthrough.find(candidate =>
        candidate.questionId === sourceDecision.questionId);
      assertExactKeys(row,
        ['questionId', 'likelyMisread', 'globalRead', 'mainIdeaCheck', 'headingComparison',
          'competitorCheck', 'decisionRule', 'repairAction'], `${sourceDecision.questionId}:walkthrough`);
      assert(Object.values(row).every(value => typeof value === 'string' && value.trim()),
        `${sourceDecision.questionId}: walkthrough vacío.`);
      questionsCovered += 1;
    }
  }
  return { passagesCovered: assets.length, questionsCovered };
}

function validateSourceAvailability(sourceAvailability, registry) {
  assertExactKeys(sourceAvailability, ['schemaVersion', 'checkedAt', 'method', 'sources', 'interpretation'], 'sourceAvailability');
  assert(sourceAvailability.schemaVersion === 'ielts-reading-matching-headings-source-availability.v1' &&
    /^\d{4}-\d{2}-\d{2}$/u.test(sourceAvailability.checkedAt) &&
    sourceAvailability.method.includes('response-body SHA-256') &&
    sourceAvailability.interpretation.includes('do not establish authorship'),
  'Metadata de disponibilidad inválida.');
  assert(JSON.stringify(sourceAvailability.sources.map(source => source.evidenceId).sort()) ===
    JSON.stringify([...EXPECTED_SOURCE_IDS].sort()), 'Disponibilidad no cubre exactamente diez fuentes.');
  const evidenceById = new Map(registry.evidence.map(evidence => [evidence.id, evidence]));
  sourceAvailability.sources.forEach((source, index) => {
    assertExactKeys(source,
      ['evidenceId', 'requestedUrl', 'retrievedAt', 'httpStatus', 'finalUrl', 'redirected', 'contentType', 'sizeBytes', 'bodySha256'],
      `sourceAvailability.sources[${index}]`);
    const evidence = evidenceById.get(source.evidenceId);
    assert(evidence?.url === source.requestedUrl && source.httpStatus === 200 &&
      source.finalUrl === source.requestedUrl && source.redirected === false &&
      Number.isFinite(Date.parse(source.retrievedAt)) && typeof source.contentType === 'string' &&
      (source.contentType.startsWith('text/html') || source.contentType === 'application/pdf') &&
      Number.isInteger(source.sizeBytes) && source.sizeBytes > 1000 && /^[a-f0-9]{64}$/u.test(source.bodySha256),
    `${source.evidenceId}: disponibilidad no coincide con registry o fetch.`);
  });
}

function validateProvenanceSearch(provenanceSearch) {
  assertExactKeys(provenanceSearch,
    ['schemaVersion', 'searchedAt', 'method', 'searchSurface', 'queries', 'interpretation'],
    'provenanceSearch');
  assert(provenanceSearch.schemaVersion === 'ielts-reading-matching-headings-provenance-search.v1' &&
    !Number.isNaN(Date.parse(provenanceSearch.searchedAt)) &&
    provenanceSearch.interpretation.includes('non-exhaustive') &&
    provenanceSearch.interpretation.includes('does not prove originality'),
  'Ledger de procedencia inválido.');
  assert(JSON.stringify(provenanceSearch.queries.map(query => query.assetId)) === JSON.stringify(EXPECTED_ASSET_IDS),
    'Ledger de procedencia no cubre exactamente los activos.');
  provenanceSearch.queries.forEach((query, queryIndex) => {
    assertExactKeys(query, ['assetId', 'query', 'resultsReviewed', 'outcome'], `provenanceSearch.queries[${queryIndex}]`);
    assert(typeof query.query === 'string' && query.query.trim() &&
      query.outcome === 'no-exact-match-in-reviewed-results' &&
      Array.isArray(query.resultsReviewed) && query.resultsReviewed.length >= 2,
    `${query.assetId}: búsqueda incompleta.`);
    query.resultsReviewed.forEach((result, resultIndex) => {
      assertExactKeys(result, ['title', 'url', 'exactMatch', 'relevanceNote'], `${query.assetId}:result[${resultIndex}]`);
      assert(typeof result.title === 'string' && result.title.trim() &&
        typeof result.url === 'string' && result.url.startsWith('https://') &&
        result.exactMatch === false && typeof result.relevanceNote === 'string' && result.relevanceNote.trim(),
      `${query.assetId}: resultado inválido.`);
    });
  });
}

function validateAuditVerdicts(auditVerdicts, facts = null) {
  assertExactKeys(auditVerdicts, ['schemaVersion', 'reviewedAt', 'status', 'passMeaning', 'rows'], 'auditVerdicts');
  assert(auditVerdicts.schemaVersion === 'ielts-reading-matching-headings-audit-verdicts.v1' &&
    auditVerdicts.status === 'pass' && Number.isFinite(Date.parse(auditVerdicts.reviewedAt)) &&
    /quarantined/u.test(auditVerdicts.passMeaning) && /blocked/u.test(auditVerdicts.passMeaning),
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
  for (const pair of expected) {
    const lane = pair[0];
    const mark = pair[1];
    const row = auditVerdicts.rows.find(candidate => candidate.lane === lane);
    assertExactKeys(row, ['lane', 'boardMark', 'scope', 'findings', 'blockersCarriedForward'], lane + ':audit');
    assert(row.boardMark === mark && [row.scope, row.findings, row.blockersCarriedForward]
      .every(value => typeof value === 'string' && value.trim()), lane + ': dictamen incompleto.');
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
  assert(rights.findings.includes(facts.quarantined + '/' + facts.passages + ' assets remain unknown-quarantined') &&
    /Authorship/iu.test(rights.blockersCarriedForward) && /license/iu.test(rights.blockersCarriedForward),
  'El carril de derechos contradice la cuarentena ejecutable.');
  assert(fullStack.findings.includes(facts.passages + ' passages') &&
    fullStack.findings.includes(facts.questions + ' heading decisions') &&
    fullStack.blockersCarriedForward.includes('content certification'),
  'El carril full-stack contradice el expediente.');
  assert(ielts.findings.includes(facts.expertMatches + '/' + facts.questions + ' heading decisions') &&
    ielts.findings.includes(facts.materialAmbiguities.length + ' material ambiguities') &&
    facts.materialAmbiguities.every(id => ielts.blockersCarriedForward.includes(id)),
  'El carril IELTS contradice la adjudicación independiente.');
  assert(walkthrough.findings.includes(facts.passages + '/' + facts.passages + ' passages') &&
    walkthrough.findings.includes(facts.questions + '/' + facts.questions + ' paragraphs'),
  'El carril walkthrough contradice su cobertura.');
  assert(antiBias.findings.includes('i=' + facts.answerCounts.i) &&
    antiBias.findings.includes('ii=' + facts.answerCounts.ii) &&
    antiBias.findings.includes('iii=' + facts.answerCounts.iii) &&
    antiBias.findings.includes('iv=' + facts.answerCounts.iv) &&
    antiBias.findings.includes('v=' + facts.answerCounts.v) &&
    antiBias.findings.includes('vi=' + facts.answerCounts.vi) &&
    antiBias.findings.includes('vii=' + facts.answerCounts.vii) &&
    antiBias.findings.includes('viii=' + facts.answerCounts.viii) &&
    antiBias.findings.includes('ix=' + facts.answerCounts.ix) &&
    antiBias.findings.includes(facts.positionCue.hits + '/' + facts.positionCue.eligible) &&
    antiBias.blockersCarriedForward.includes('contentCertification remains blocked'),
  'El carril anti-sesgo contradice el perfil ejecutable.');
  assert(ui.scope.includes('Not applicable') && ui.blockersCarriedForward.includes('does not certify') &&
    playwright.scope.includes('Not applicable') && playwright.blockersCarriedForward.includes('No browser matrix'),
  'Los carriles UI/Playwright sobredeclaran conformidad.');
}

function validateChronology(input) {
  const nowWithTolerance = Date.now() + 5 * 60 * 1000;
  const baselineAt = timestampMs(input.baseline.capturedAt, 'baseline.capturedAt');
  const retrievalTimes = input.sourceAvailability.sources.map(source =>
    timestampMs(source.retrievedAt, source.evidenceId + '.retrievedAt'));
  const provenanceAt = timestampMs(input.provenanceSearch.searchedAt, 'provenanceSearch.searchedAt');
  const manifestAt = timestampMs(input.unitChangeManifest.recordedAt, 'unitChangeManifest.recordedAt');
  const blindAt = timestampMs(input.blindReview.generatedAt, 'blindReview.generatedAt');
  const factualPacketAt = timestampMs(input.factualSourceReview.generatedAt, 'factualSourceReview.generatedAt');
  const firstPassAt = timestampMs(input.firstPass.reviewer.reviewedAt, 'firstPass.reviewer.reviewedAt');
  const studentAt = timestampMs(input.studentWalkthrough.reviewer.reviewedAt, 'studentWalkthrough.reviewer.reviewedAt');
  const verdictAt = timestampMs(input.expertVerdict.reviewer.reviewedAt, 'expertVerdict.reviewer.reviewedAt');
  const validationAt = timestampMs(VALIDATION_GENERATED_AT, 'VALIDATION_GENERATED_AT');
  const auditAt = timestampMs(input.auditVerdicts.reviewedAt, 'auditVerdicts.reviewedAt');
  const allTimes = [baselineAt, ...retrievalTimes, provenanceAt, manifestAt, blindAt, factualPacketAt,
    firstPassAt, studentAt, verdictAt, validationAt, auditAt];
  assert(allTimes.every(value => value <= nowWithTolerance), 'La cronología contiene timestamps futuros.');
  assert(Math.max(baselineAt, ...retrievalTimes, provenanceAt, manifestAt) <= blindAt &&
    blindAt === factualPacketAt && blindAt <= firstPassAt && firstPassAt <= verdictAt &&
    blindAt <= studentAt && Math.max(verdictAt, studentAt) <= validationAt && validationAt <= auditAt,
  'La cronología declarada del expediente es imposible o no monotónica.');
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
  const questionIds = assets.flatMap(asset => asset.decisions.map(decision => decision.questionId));
  const paragraphCount = assets.reduce((sum, asset) => sum + asset.paragraphs.length, 0);
  const headingCandidateCount = assets.reduce((sum, asset) => sum + asset.headingOptions.length, 0);

  assert(assets.length === 3 && stableJson(assets.map(asset => asset.id)) === stableJson(EXPECTED_SET_IDS),
    'Cobertura Matching Headings inesperada.');
  assert(stableJson(assetIds) === stableJson(EXPECTED_ASSET_IDS) &&
    new Set(assetIds).size === 3 && questionIds.length === 17 &&
    new Set(questionIds).size === 17 && paragraphCount === 17 && headingCandidateCount === 27,
  'IDs o cardinalidad Matching Headings inválidos.');
  assert(assets.every(asset =>
    asset.headingOptions.length === 9 &&
    new Set(asset.headingOptions.map(heading => heading.id)).size === 9 &&
    stableJson(asset.headingOptions.map(heading => heading.id)) === stableJson([...ALLOWED_HEADING_IDS]) &&
    asset.decisions.length === asset.paragraphs.length &&
    asset.decisions.every(decision => asset.headingOptions.some(heading => heading.id === decision.answer)) &&
    new Set(asset.decisions.map(decision => decision.answer)).size === asset.decisions.length),
  'Los IDs romanos, bindings o la regla stored de no-reutilización son inválidos.');
  assertExactKeys(baseline,
    ['schemaVersion', 'capturedAt', 'scope', 'assets', 'structuralRisk',
      'learnerFacingSourceSha256', 'nextUnitSourceSha256', 'interpretation'], 'baseline');
  assert(baseline.schemaVersion === 'ielts-reading-matching-headings-baseline.v1' &&
    baseline.scope.passages === 3 && baseline.scope.paragraphs === 17 &&
    baseline.scope.questions === 17 && baseline.scope.headingCandidates === 27 && baseline.assets.length === 3,
  'Baseline inválido.');
  assertExactIdCoverage(baseline.assets, EXPECTED_ASSET_IDS, 'assetId', 'baseline.assets');
  const baselineById = new Map(baseline.assets.map(asset => [asset.assetId, asset]));
  for (const asset of assets) {
    const pinned = baselineById.get(asset.assetId);
    assert(pinned.sourceObjectSha256 === asset.sourceObjectSha256 &&
      pinned.passageSha256 === asset.passageSha256 && pinned.wordCount === asset.wordCount &&
      pinned.questionCount === asset.decisions.length && pinned.paragraphCount === asset.paragraphs.length &&
      pinned.headingCandidateCount === asset.headingOptions.length,
    asset.assetId + ': drift desde baseline.');
  }
  for (const entry of Object.entries(baseline.learnerFacingSourceSha256)) {
    assert(sourceSha256(entry[0]) === entry[1], entry[0] + ': cambió una fuente learner-facing.');
  }
  assert(stableJson(Object.keys(baseline.nextUnitSourceSha256)) ===
    stableJson([NEXT_ROUTE_PATH, NEXT_ENGINE_PATH, NEXT_BANK_PATH]) &&
    Object.entries(baseline.nextUnitSourceSha256)
      .every(([path, expectedSha]) => sourceSha256(path) === expectedSha),
  'F0.2b.6 cambió aunque esta iteración debía detenerse antes de iniciarla.');
  assertExactKeys(unitChangeManifest,
    ['schemaVersion', 'unit', 'recordedAt', 'learnerFacingChangeAuthorized',
      'learnerFacingBaselinePaths', 'unitSourceFiles', 'unitOutputDirectory', 'interpretation'],
    'unitChangeManifest');
  assert(unitChangeManifest.schemaVersion === 'ielts-reading-matching-headings-unit-change-manifest.v1' &&
    unitChangeManifest.unit === 'F0.2b.5' && Number.isFinite(Date.parse(unitChangeManifest.recordedAt)) &&
    unitChangeManifest.learnerFacingChangeAuthorized === false &&
    stableJson(unitChangeManifest.learnerFacingBaselinePaths) ===
      stableJson([CATALOG_PATH, ROUTE_PATH, ENGINE_PATH, BANK_PATH, OFFICIAL_STRATEGY_PATH,
        REVIEW_SOURCE_BLOCK_PATH, STRUCTURED_DATA_PATH]) &&
    stableJson(unitChangeManifest.unitSourceFiles) ===
      stableJson([REGISTRY_PATH, VALIDATOR_PATH, TEST_PATH, LOOP_DOC_PATH]) &&
    unitChangeManifest.unitOutputDirectory === OUTPUT_DIRECTORY &&
    unitChangeManifest.interpretation.includes('does not assert that the entire repository'),
  'Manifest de unidad inválido.');
  validateSourceAvailability(sourceAvailability, registry);
  validateProvenanceSearch(provenanceSearch);
  validateAuditVerdicts(auditVerdicts);
  validateChronology({ baseline, sourceAvailability, provenanceSearch, blindReview,
    factualSourceReview, firstPass, expertVerdict, studentWalkthrough, unitChangeManifest, auditVerdicts });

  assert(registry.schemaVersion === 'ielts-academic-reading-rights-registry.v2' &&
    registry.policyVersion === '2026-08-09.v8' && registry.module === 'academic',
  'Registry global no está en la versión esperada.');
  const evidenceById = new Map(registry.evidence.map(evidence => [evidence.id, evidence]));
  assert(evidenceById.size === registry.evidence.length, 'Evidence IDs duplicados.');
  const unitRecords = EXPECTED_ASSET_IDS.map(assetId => {
    const rows = registry.entries.filter(entry => entry.assetId === assetId);
    assert(rows.length === 1, assetId + ': registry debe tener una fila.');
    return rows[0];
  });
  const decisions = assets.map(asset => {
    const record = unitRecords.find(candidate => candidate.assetId === asset.assetId);
    referencedEvidenceIds(record).forEach(evidenceId =>
      assert(evidenceById.has(evidenceId), asset.assetId + ': evidencia inexistente ' + evidenceId));
    assert(record.sourceObjectSha256 === asset.sourceObjectSha256 &&
      record.passageSha256 === asset.passageSha256, asset.assetId + ': hash registry inválido.');
    assert(record.authorship.status === 'unknown' &&
      record.provenanceAssessment.status === 'unresolved' &&
      record.rightsAssessment.basis === 'unknown-quarantined' &&
      record.rightsAssessment.status === 'reviewed-unresolved' &&
      record.rightsAssessment.rightsHolder === null &&
      record.rightsAssessment.authorizationEvidenceStatus === 'not-located-in-reviewed-sources',
    asset.assetId + ': el registro contradice el estado de derechos desconocido y en cuarentena.');
    assert(record.factualReviewRequirement.policy === 'required' &&
      record.factualSourceResearch.status === 'candidate-sources-collected' &&
      record.factualSourceResearch.sourceEvidenceIds.length === 3 &&
      new Set(record.factualSourceResearch.sourceEvidenceIds).size === 3 &&
      record.factualSourceResearch.sourceEvidenceIds.every(id => evidenceById.get(id)?.kind === 'factual-source') &&
      record.factualReview.status === 'not-reviewed' && record.humanReview.status === 'pending',
    asset.assetId + ': estado editorial inválido.');
    const assessed = contract.assessIeltsReadingRights(registry, asset);
    assert(assessed.disposition === 'quarantine' && assessed.eligibleForPublicationPipeline === false,
      asset.assetId + ': debe quedar en cuarentena.');
    assert(!assessed.reasonCodes.some(code =>
      ['registry-contract-invalid', 'content-hash-mismatch', 'factual-source-research-invalid'].includes(code)),
    asset.assetId + ': registro inválido oculto: ' + assessed.reasonCodes.join(', '));
    return {
      assetId: asset.assetId,
      title: asset.title,
      sourceObjectSha256: asset.sourceObjectSha256,
      passageSha256: asset.passageSha256,
      wordCount: asset.wordCount,
      paragraphCount: asset.paragraphs.length,
      questionCount: asset.decisions.length,
      headingCandidateCount: asset.headingOptions.length,
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
  });
  const runtimeAuditReferences = [...sourceFilesUnder('src/app'), ...sourceFilesUnder('src/components')]
    .filter(absolutePath => {
      const source = readFileSync(absolutePath, 'utf8');
      return source.includes('ielts-reading-rights-registry') || source.includes('academic-reading-rights');
    });
  assert(runtimeAuditReferences.length === 0, 'Runtime importa expediente: ' + runtimeAuditReferences.join(', '));
  const routeText = readFileSync(resolve(ROOT, ROUTE_PATH), 'utf8');
  const engineText = readFileSync(resolve(ROOT, ENGINE_PATH), 'utf8');
  const runtimeOffersAllHeadingOptionsPerParagraph =
    engineText.includes('passage.headingOptions.map((heading) =>') && engineText.includes('<select');
  const runtimeDisablesPreviouslyUsedHeadings =
    /disabled\s*=\s*\{[^}]*answers|usedHeadingIds|usedHeadings/iu.test(engineText);
  const runtimeNoReuseMismatch =
    runtimeOffersAllHeadingOptionsPerParagraph && !runtimeDisablesPreviouslyUsedHeadings;
  const reviewSourceBlockText = readFileSync(resolve(ROOT, REVIEW_SOURCE_BLOCK_PATH), 'utf8');
  const visibleClaims = [
    ...['textos originales de WeLearn', 'Banco original WeLearn', 'sin copiar preguntas oficiales']
      .map(value => ({ text: value, sourcePath: ROUTE_PATH, observed: routeText.includes(value) })),
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
  const learnerFacingClosureTexts = [ROUTE_PATH, ENGINE_PATH, BANK_PATH, OFFICIAL_STRATEGY_PATH,
    REVIEW_SOURCE_BLOCK_PATH, STRUCTURED_DATA_PATH]
    .map(path => readFileSync(resolve(ROOT, path), 'utf8'));
  assert(findKeyLikePacketValues(learnerFacingClosureTexts).length === 0,
    'Una dependencia learner-facing contiene una asignación de heading visible.');
  const loopDocText = readFileSync(resolve(ROOT, LOOP_DOC_PATH), 'utf8');
  const expectedClosedBoardRow =
    '| 0 | 　　　 ↳ F0.2b.5 Matching Headings | ✅ | ✅ | ✅ | ✅ | ✅ | ➖ | ➖ |';
  const expectedCompletedNextBoardRow =
    '| 0 | 　　　 ↳ F0.2b.6 Matching Features | ✅ | ✅ | ✅ | ✅ | ✅ | ➖ | ➖ |';
  const expectedOpenParentRow =
    '| 0 | 　 ↳ F0.2b Adjudicación de bancos formativos — padre | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 |';
  const stopText = 'Siguiente subunidad, sin iniciarla: ' + String.fromCharCode(96) +
    'F0.2b.6 Matching Features' + String.fromCharCode(96) + '.';
  assert(loopDocText.includes(expectedClosedBoardRow), 'El tablero no refleja F0.2b.5 cerrado.');
  assert(loopDocText.includes(expectedCompletedNextBoardRow) &&
    loopDocText.includes(expectedOpenParentRow) &&
    !loopDocText.includes('No se inició F0.2b.6') && loopDocText.includes(stopText),
  'El historial F0.2b.5 o el avance cerrado de F0.2b.6 contradice el tablero actual.');

  const firstPassTrace = validateFirstPass(firstPass, assets, blindReview);
  const expertValidation = validateExpertVerdict(
    expertVerdict, firstPass, firstPassTrace, assets, factualSourceReview);
  const studentSummary = validateStudentWalkthrough(studentWalkthrough, assets);
  const storedAnswerById = new Map(assets.flatMap(asset =>
    asset.decisions.map(decision => [decision.questionId, decision.answer])));
  const expertAnswerById = new Map(expertValidation.comparisons.map(row =>
    [row.questionId, row.expertHeadingId]));
  const storedBias = structuralBiasProfile(assets, storedAnswerById);
  const expertBias = structuralBiasProfile(assets, expertAnswerById);
  assert(stableJson(storedBias.answerCounts) === stableJson(baseline.structuralRisk.answerCounts) &&
    storedBias.maxSameLabelRun === baseline.structuralRisk.maxSameLabelRun &&
    storedBias.samePositionPredictsHeading.eligible ===
      baseline.structuralRisk.samePositionPredictsHeading.eligible &&
    storedBias.samePositionPredictsHeading.hits ===
      baseline.structuralRisk.samePositionPredictsHeading.hits &&
    storedBias.highestLexicalOverlapPredictsHeading.eligible ===
      baseline.structuralRisk.highestLexicalOverlapPredictsHeading.eligible &&
    storedBias.highestLexicalOverlapPredictsHeading.hits ===
      baseline.structuralRisk.highestLexicalOverlapPredictsHeading.hits &&
    storedBias.longestHeadingPredictsAnswer.eligible ===
      baseline.structuralRisk.longestHeadingPredictsAnswer.eligible &&
    storedBias.longestHeadingPredictsAnswer.hits ===
      baseline.structuralRisk.longestHeadingPredictsAnswer.hits,
  'El perfil estructural cambió desde baseline.');
  const conflicts = expertValidation.comparisons
    .filter(row => !row.matchesStoredKey).map(row => row.questionId);
  const materialAmbiguities = expertValidation.comparisons
    .filter(row => row.ambiguity === 'material').map(row => row.questionId);
  const factualAssessmentCounts = Object.fromEntries(
    ['supported', 'oversimplified', 'unsupported', 'untraceable'].map(assessment => [
      assessment,
      expertValidation.factualClaims.filter(claim => claim.assessment === assessment).length,
    ]),
  );
  const panelFacts = {
    quarantined: decisions.filter(decision => decision.disposition === 'quarantine').length,
    passages: assets.length,
    questions: questionIds.length,
    expertMatches: questionIds.length - conflicts.length,
    materialAmbiguities,
    answerCounts: storedBias.answerCounts,
    positionCue: storedBias.samePositionPredictsHeading,
  };
  validateAuditVerdicts(auditVerdicts, panelFacts);
  const negativeControl = contract.assessIeltsReadingRights(
    registry, { ...assets[0], passageSha256: '0'.repeat(64) });
  assert(negativeControl.reasonCodes.includes('content-hash-mismatch'), 'Una mutación no falla cerrada.');
  const keyLikeValueLeakFindings = findKeyLikePacketValues({
    instruction: 'Correct heading for mh-public-libraries-a is iii.',
  });
  const spanishKeyLikeValueLeakFindings = findKeyLikePacketValues({
    repairAction: 'El heading correcto de mh-public-libraries-a es iii.',
  });
  const imperativeKeyLikeValueLeakFindings = findKeyLikePacketValues({
    instruction: 'Choose heading iii for mh-public-libraries-a.',
  });
  const spanishCorrespondenceLeakFindings = findKeyLikePacketValues({
    repairAction: 'mh-public-libraries-a corresponde al heading iii.',
  });
  assert(keyLikeValueLeakFindings.length === 1 && spanishKeyLikeValueLeakFindings.length === 1 &&
    imperativeKeyLikeValueLeakFindings.length === 1 && spanishCorrespondenceLeakFindings.length === 1,
    'El control textual EN/ES de fuga no detecta una clave.');
  const contentCertificationBlocked = questionIds.length < 100 ||
    storedBias.highestLexicalOverlapPredictsHeading.conditionalAccuracy > 1 / 9 ||
    storedBias.extremeCueDistractorSignal.flaggedOptionsNeverCorrect > 0 ||
    runtimeNoReuseMismatch ||
    conflicts.length > 0 || materialAmbiguities.length > 0;
  const allSourcePaths = [
    CATALOG_PATH, ROUTE_PATH, ENGINE_PATH, BANK_PATH, OFFICIAL_STRATEGY_PATH,
    REVIEW_SOURCE_BLOCK_PATH, STRUCTURED_DATA_PATH, NEXT_ROUTE_PATH, NEXT_ENGINE_PATH,
    NEXT_BANK_PATH, CONTRACT_PATH, REGISTRY_PATH,
    VALIDATOR_PATH, TEST_PATH, LOOP_DOC_PATH, BASELINE_PATH, SOURCE_AVAILABILITY_PATH,
    PROVENANCE_SEARCH_PATH, UNIT_CHANGE_MANIFEST_PATH, BLIND_REVIEW_PATH,
    FACTUAL_SOURCE_REVIEW_PATH, FIRST_PASS_PATH, EXPERT_VERDICT_PATH, STUDENT_WALKTHROUGH_PATH,
    AUDIT_VERDICTS_PATH, BUILD_REPORT_PATH, REPORT_MD_PATH,
  ];
  const validation = {
    schemaVersion: 'ielts-reading-matching-headings-rights-validation.v1',
    generatedAt: VALIDATION_GENERATED_AT,
    unit: 'F0.2b.5 — three formative Matching Headings passages',
    status: 'pass',
    passMeaning:
      'PASS certifies audit coverage, identity, quarantine, blind adjudication and risk detection. It does not approve keys, factuality, rights, publication, UI or student efficacy.',
    scope: {
      passages: assets.length,
      paragraphs: paragraphCount,
      questions: questionIds.length,
      headingCandidates: headingCandidateCount,
      registryEntriesInUnit: decisions.length,
      registryEntriesTotal: registry.entries.length,
      coveredAssetIds: EXPECTED_ASSET_IDS,
      parentF02bRemainsOpen: true,
      scopedLearnerSourcesChangedSinceBaseline: false,
    },
    checks: {
      exactCoverage: assets.length === 3 && paragraphCount === 17 && questionIds.length === 17 &&
        headingCandidateCount === 27,
      stableUniqueIds: new Set(assetIds).size === 3 && new Set(questionIds).size === 17,
      sourceHashesMatchBaseline: true,
      registryReferencesResolve: true,
      officialRuleSourceAvailable:
        sourceAvailability.sources.some(source => source.evidenceId === 'ielts-matching-headings-official-format'),
      factualSourceAvailabilityRecorded: sourceAvailability.sources.length === 10,
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
      learnerFacingDependencyClosureContainsNoKeyLikeValues:
        findKeyLikePacketValues(learnerFacingClosureTexts).length === 0,
      blindPacketContainsNoKeysFeedbackOrSkills: findForbiddenKeys(blindReview).length === 0,
      blindPacketContainsNoKeyLikeValues: findKeyLikePacketValues(blindReview).length === 0,
      blindPacketContainsNoLearnerOrContactPii: findPii(blindReview).length === 0,
      factualSourcePacketContainsNoKeysFeedbackOrSkills:
        findForbiddenKeys(factualSourceReview).length === 0,
      factualSourcePacketContainsNoKeyLikeValues:
        findKeyLikePacketValues(factualSourceReview).length === 0,
      independentExpertCoverageComplete: expertValidation.comparisons.length === 17,
      expertFirstPassPersistedAndPinned:
        expertVerdict.reviewer.firstPassSha256 === sourceSha256(FIRST_PASS_PATH),
      wholeParagraphMainIdeaEvidenceContractEnforced: expertValidation.comparisons.length === 17,
      singleHeadingDecisionContractEnforced: expertValidation.comparisons.length === 17,
      storedHeadingReuseAbsent: assets.every(asset =>
        new Set(asset.decisions.map(decision => decision.answer)).size === asset.decisions.length),
      officialNoHeadingReuseRuleCaptured:
        blindReview.taskRule.includes('no heading may be used more than once'),
      runtimeNoReuseMismatchDetected:
        runtimeNoReuseMismatch,
      studentWalkthroughCoverageComplete:
        studentSummary.passagesCovered === 3 && studentSummary.questionsCovered === 17,
      headingIdTextBindingsPreserved: assets.every(asset =>
        asset.headingOptions.every(heading => ALLOWED_HEADING_IDS.has(heading.id))),
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
        Object.keys(storedBias.constantLabelHeuristics).length === 9 &&
        Object.keys(storedBias.headingLengthByLabel).length === 9 &&
        storedBias.overlapRows.length === 17 && storedBias.perSet.length === 3 &&
        storedBias.samePositionPredictsHeading.hits === 5 &&
        storedBias.highestLexicalOverlapPredictsHeading.eligible === 14 &&
        storedBias.highestLexicalOverlapPredictsHeading.hits === 6 &&
        storedBias.highestLexicalOverlapPredictsHeading.tiesOrAbstentions === 3 &&
        storedBias.longestHeadingPredictsAnswer.eligible === 12 &&
        storedBias.longestHeadingPredictsAnswer.hits === 2 &&
        storedBias.longestHeadingPredictsAnswer.tiesOrAbstentions === 5 &&
        storedBias.extremeCueDistractorSignal.flaggedOptions === 9 &&
        storedBias.extremeCueDistractorSignal.flaggedCorrectUses === 1 &&
        storedBias.extremeCueDistractorSignal.flaggedOptionsNeverCorrect === 8 &&
        expertVerdict.records.every(record =>
          ['representationRisk', 'priorKnowledgeRisk', 'irrelevantLoadRisk', 'titleCueRisk']
            .every(key => ['low', 'medium', 'high'].includes(record.passageAssessment[key]))),
      keyLikeValueLeakageMutationDetected:
        keyLikeValueLeakFindings.length === 1 && spanishKeyLikeValueLeakFindings.length === 1 &&
        imperativeKeyLikeValueLeakFindings.length === 1 && spanishCorrespondenceLeakFindings.length === 1,
      boardStateMatchesValidatedUnit: loopDocText.includes(expectedClosedBoardRow),
      nextUnitCompletedAndParentRemainsOpen:
        loopDocText.includes(expectedCompletedNextBoardRow) &&
        loopDocText.includes(expectedOpenParentRow),
    },
    decisions,
    visibleClaims,
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
    antiBias: {
      optionPermutationApplied: false,
      optionPermutationReason:
        'Roman numerals are stable response labels bound to heading text and cannot be shuffled independently from their text. Array order, ID-text binding, position, length, lexical overlap and per-set patterns are audited instead.',
      storedKeyProfile: storedBias,
      independentExpertProfile: expertBias,
      qualitativeCoverage: {
        perspectiveAndRepresentation: true,
        priorKnowledge: true,
        irrelevantCognitiveLoad: true,
        visibleTitleCue: true,
        paragraphCompetition: true,
      },
      sampleAdequacy: {
        certificationThreshold: 100,
        observedQuestions: questionIds.length,
        eligibleForStatisticalCertification: false,
        conclusion:
          'The sample exposes a 6/14 unique-winner lexical-overlap shortcut, an unused ii label and an 8-option extreme-cue distractor signal, but n=17 is too small to certify balanced content statistically.',
      },
      statisticalCertification: 'withheld-n-below-100',
      contentCertification: 'blocked-editorial-review-required',
    },
    applicability: {
      rights: 'applicable',
      fullStackData: 'applicable',
      ieltsExpert: 'applicable',
      cognitiveWalkthrough: 'applicable-to-content-only',
      antiBias: 'applicable',
      uiUxAccessibility: 'not-applicable-scoped-learner-sources-unchanged',
      playwright: 'not-applicable-scoped-learner-runtime-unchanged',
      evidence:
        'Within F0.2b.5, seven learner-facing source/dependency files remain pinned and no app/component imports the audit registry. This does not certify the existing UI or repository globally.',
    },
    processLimitations: {
      firstPassTrace:
        'The persisted hash detects ordinary mutation but is not an external append-only witness; coordinated post-hoc rewriting cannot be ruled out cryptographically.',
      directSourceReview:
        'Direct-source review is declared by an AI reviewer and checked for exact IDs plus non-empty locators; it is not automatic proof of browsing, a human signature or factual verification.',
      provenanceSearch:
        'Public-web search is directed and non-exhaustive; no exact match does not prove original authorship or universal absence.',
    },
    negativeControl: {
      contentHashMismatch: negativeControl,
      keyLikeValueLeakFindings,
      spanishKeyLikeValueLeakFindings,
      imperativeKeyLikeValueLeakFindings,
      spanishCorrespondenceLeakFindings,
    },
    sources: allSourcePaths.filter(sourcePath => existsSync(resolve(ROOT, sourcePath)))
      .map(sourcePath => ({ path: sourcePath, sha256: sourceSha256(sourcePath) })),
  };
  const failedChecks = Object.entries(validation.checks)
    .filter(([, passed]) => !passed)
    .map(([name]) => name);
  assert(failedChecks.length === 0, `Falló un gate de F0.2b.5: ${failedChecks.join(', ')}.`);
  return { validation, blindReview, factualSourceReview };
}

export function validateFinalReportArtifacts(validation) {
  for (const path of [ARTIFACT_PATH, REPORT_MD_PATH, REPORT_HTML_PATH, REPORT_VERIFICATION_PATH,
    BUILD_REPORT_PATH, AUDIT_VERDICTS_PATH]) {
    assert(existsSync(resolve(ROOT, path)), 'Falta artefacto final: ' + path);
  }
  const auditVerdicts = readJson(AUDIT_VERDICTS_PATH);
  validateAuditVerdicts(auditVerdicts, {
    quarantined: validation.decisions.filter(decision => decision.disposition === 'quarantine').length,
    passages: validation.scope.passages,
    questions: validation.scope.questions,
    expertMatches: validation.expertReview.answerAgreement.matches,
    materialAmbiguities: validation.expertReview.materialAmbiguityQuestionIds,
    answerCounts: validation.antiBias.storedKeyProfile.answerCounts,
    positionCue: validation.antiBias.storedKeyProfile.samePositionPredictsHeading,
  });
  const artifact = readJson(ARTIFACT_PATH);
  assert(artifact.surface === 'report' && artifact.manifest?.surface === 'report' &&
    artifact.manifest.title === 'IELTS Reading Matching Headings — audit gate' &&
    timestampMs(artifact.manifest.generatedAt, 'artifact.manifest.generatedAt') >=
      timestampMs(auditVerdicts.reviewedAt, 'auditVerdicts.reviewedAt') &&
    artifact.snapshot.generatedAt === artifact.manifest.generatedAt &&
    artifact.manifest.cards?.length === 4 && artifact.manifest.charts?.length === 2 &&
    artifact.manifest.tables?.length === 2 && artifact.snapshot?.status === 'ready',
  'Artifact portable incompleto o con estado incorrecto.');
  assert(stableJson(artifact.manifest.charts.map(chart => chart.title)) ===
    stableJson(['Stored heading-option counts', 'Independent factual-claim assessments']),
  'Los títulos de gráficos deben ser neutrales y descriptivos.');
  const expectedSummary = [{
    passages: validation.scope.passages,
    paragraphs: validation.scope.paragraphs,
    questions: validation.scope.questions,
    quarantined: validation.decisions.filter(row => row.disposition === 'quarantine').length,
    expertMatches: validation.expertReview.answerAgreement.matches,
    expertTotal: validation.expertReview.answerAgreement.total,
    materialAmbiguities: validation.expertReview.materialAmbiguityCount,
  }];
  const expectedLabels = Object.entries(validation.antiBias.storedKeyProfile.answerCounts)
    .map(entry => ({ label: entry[0], count: entry[1] }));
  const expectedClaims = Object.entries(validation.expertReview.factualAssessmentCounts)
    .map(entry => ({ assessment: entry[0], claims: entry[1] }));
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
    '6/14',
    'F0.2b.6 Matching Features',
    ...validation.expertReview.materialAmbiguityQuestionIds,
    ...validation.expertReview.keyConflictQuestionIds,
  ];
  requiredMarkdown.forEach(value =>
    assert(reportMarkdown.includes(value), 'report.md omite límite obligatorio: ' + value));
  assert(reportHtml.includes('IELTS Reading Matching Headings') &&
    reportHtml.includes('Material ambiguities') && reportHtml.includes('Panel scope') &&
    reportHtml.includes('Recommended next decisions'),
  'report.html incompleto o desalineado.');
  const verification = readJson(REPORT_VERIFICATION_PATH);
  assertExactKeys(verification,
    ['schemaVersion', 'verifiedAt', 'command', 'stages', 'viewports',
      'counts', 'sha256', 'interpretation'], 'reportVerification');
  assert(verification.schemaVersion === 'ielts-reading-matching-headings-report-verification.v1' &&
    timestampMs(verification.verifiedAt, 'reportVerification.verifiedAt') >=
      timestampMs(auditVerdicts.reviewedAt, 'auditVerdicts.reviewedAt') &&
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
      questions: blindReview.records.reduce((sum, record) => sum + record.paragraphs.length, 0),
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
      quarantined: artifacts.validation.decisions.filter(decision => decision.disposition === 'quarantine').length,
      checks: artifacts.validation.checks,
      reportArtifacts,
    }, null, 2)}\n`);
  }
}
