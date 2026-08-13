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

const PACKETS_GENERATED_AT = '2026-08-09T05:36:00-05:00';
const VALIDATION_GENERATED_AT = '2026-08-09T05:50:00-05:00';
const CATALOG_PATH = 'src/data/practica-exams/seo-catalog.ts';
const ROUTE_PATH =
  'src/app/(site)/practica/ielts/reading/tipos-de-preguntas/yes-no-not-given/page.tsx';
const ENGINE_PATH = 'src/components/exam-practice/ObjectivePracticeEngine.tsx';
const BANK_PATH = 'src/components/exam-practice/ObjectivePracticeSetBank.tsx';
const CONTRACT_PATH = 'src/lib/ielts/academic-reading-rights.ts';
const REGISTRY_PATH = 'src/data/practica-exams/ielts-reading-rights-registry.ts';
const VALIDATOR_PATH = 'scripts/check-ielts-reading-ynng-rights.mjs';
const TEST_PATH = 'tests/ielts-reading-ynng-rights.test.mjs';
const LOOP_DOC_PATH = 'docs/ielts-reading-loop.md';
const OUTPUT_DIRECTORY = 'output/audits/ielts-reading-rights-ynng-2026-08-09';
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
  'formative:yes-no-not-given:ynng-station-art',
  'formative:yes-no-not-given:ynng-remote-work',
  'formative:yes-no-not-given:ynng-school-uniforms',
];
const EXPECTED_SET_IDS = ['ynng-station-art', 'ynng-remote-work', 'ynng-school-uniforms'];
const EXPECTED_SOURCE_IDS = [
  'ielts-ynng-official-format',
  'station-lta-gift-art',
  'station-opdc-community-brief',
  'remote-ons-hybrid-2025',
  'remote-london-assembly-central-2024',
  'remote-ecb-work-preference-2025',
  'uniforms-dfe-policy-2026',
  'uniforms-dfe-cost-2026',
  'uniforms-cma-costs',
];
const REQUIRED_FACTUAL_CLAIM_SPANS = {
  'formative:yes-no-not-given:ynng-station-art': [
    'Murals, small exhibitions and temporary installations can certainly soften places that otherwise feel rushed and anonymous.',
    'Transport authorities sometimes commission large works without asking local residents what would feel meaningful or useful.',
    'A modest project developed with community groups may do more for public trust than an expensive installation chosen by distant planners.',
    'Art programs can be funded separately, supported by cultural grants or used to explain local history while renovation is already taking place.',
  ],
  'formative:yes-no-not-given:ynng-remote-work': [
    'Fewer daily commuters may reduce pressure on trains and roads, but a city centre is not only a container for desks.',
    'It is also a place where shops, cafes, cultural venues and public services depend on repeated daytime movement.',
    'However, entirely optional attendance can create another problem: if nobody knows when colleagues will be present, the office loses its value as a shared meeting place.',
    'Teams may choose two or three common days for meetings, mentoring and decisions that benefit from quick conversation.',
    'Empty ground-floor units can become clinics, classrooms or small performance spaces.',
  ],
  'formative:yes-no-not-given:ynng-school-uniforms': [
    'Uniforms can reduce visible competition around clothing, especially in schools where students come from very different economic backgrounds.',
    'Expensive shoes, phones and bags can still signal status even when shirts and trousers look similar.',
    'If some hairstyles, cultural garments or body types are treated as problems, the policy can become a source of unfair discipline.',
    'It is less true when families must buy from a single supplier or replace branded pieces quickly.',
  ],
};
const ALLOWED_LABELS = new Set(['YES', 'NO', 'NOT GIVEN']);
const ALLOWED_RELATIONS = new Set(['agrees', 'contradicts', 'not-stated']);
const DEGREE_LANGUAGE =
  /\b(?:all|always|every|never|only|usually|normally|most|completely|exactly)\b/iu;
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
      /\b(?:correct|right|stored|gold)\s+(?:answer|response|label|key)\s*(?:is|:|=|→)/iu,
      /\b(?:answer|response|label|key)\s*(?:is|:|=|→)\s*(?:YES|NO|NOT GIVEN)\b/iu,
      /\bynng[-\w]+\s*(?:is|:|=|→)\s*(?:YES|NO|NOT GIVEN)\b/iu,
      /\b(?:la\s+)?(?:respuesta|etiqueta|clave)\s+(?:correcta|correcto|almacenada|esperada)\s+(?:de\s+ynng[-\w]+\s+)?(?:es|:|=|→)\s*(?:YES|NO|NOT GIVEN)\b/iu,
      /\b(?:respuesta|etiqueta|clave)\s+(?:de\s+)?ynng[-\w]+\s*(?:es|:|=|→)\s*(?:YES|NO|NOT GIVEN)\b/iu,
      /\bynng[-\w]+\s+(?:tiene|lleva|usa)\s+(?:como\s+)?(?:respuesta|etiqueta|clave)\s*(?:YES|NO|NOT GIVEN)\b/iu,
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
  const sets = catalog.IELTS_YNNG_PRACTICE_SETS;
  assert(Array.isArray(sets), 'Falta IELTS_YNNG_PRACTICE_SETS.');
  return sets.map((set, index) => ({
    assetId: `formative:yes-no-not-given:${set.id}`,
    setIndex: index,
    id: set.id,
    title: set.title,
    passageTitle: set.passageTitle,
    passage: set.passage,
    questions: set.questions,
    wordCount: wordCount(set.passage),
    sourceObjectSha256: sha256(stableJson(set)),
    passageSha256: sha256(normalizeText(set.passage)),
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

function cueProfile(assets, answerByQuestionId) {
  const questions = assets.flatMap(asset => asset.questions);
  const labels = questions.map(question => answerByQuestionId.get(question.id));
  assert(labels.every(label => ALLOWED_LABELS.has(label)), 'El perfil contiene etiquetas inválidas.');
  const answerCounts = Object.fromEntries(
    [...ALLOWED_LABELS].map(label => [label, labels.filter(value => value === label).length]),
  );
  const degreeQuestions = questions.filter(question => DEGREE_LANGUAGE.test(question.statement));
  const degreeHits = degreeQuestions.filter(question => answerByQuestionId.get(question.id) === 'NO').length;
  return {
    answerCounts,
    maxSameLabelRun: longestRun(labels),
    degreeLanguageImpliesNo: {
      definition: 'If a statement contains all, always, every, never, only, usually, normally, most, completely or exactly, answer NO; otherwise abstain.',
      eligible: degreeQuestions.length,
      tiesOrAbstentions: questions.length - degreeQuestions.length,
      hits: degreeHits,
      conditionalAccuracy: degreeQuestions.length ? degreeHits / degreeQuestions.length : null,
      totalAccuracy: degreeHits / questions.length,
      randomBaseline: 1 / 3,
      wilsonUpper95: wilsonUpper(degreeHits, degreeQuestions.length),
      threshold: 1 / 3 + 0.1,
    },
  };
}

function structuralBiasProfile(assets, answerByQuestionId) {
  const base = cueProfile(assets, answerByQuestionId);
  const questions = assets.flatMap(asset => asset.questions.map(question => ({
    ...question,
    assetId: asset.assetId,
    passage: asset.passage,
    passageTitle: asset.passageTitle,
  })));
  const labels = [...ALLOWED_LABELS];
  const constantLabelHeuristics = Object.fromEntries(labels.map(label => {
    const hits = questions.filter(question => answerByQuestionId.get(question.id) === label).length;
    return [label, { hits, total: questions.length, accuracy: hits / questions.length }];
  }));
  const statementLengthByLabel = Object.fromEntries(labels.map(label => {
    const lengths = questions
      .filter(question => answerByQuestionId.get(question.id) === label)
      .map(question => wordCount(question.statement));
    return [label, {
      questions: lengths.length,
      averageWords: lengths.reduce((sum, length) => sum + length, 0) / lengths.length,
      minWords: Math.min(...lengths),
      maxWords: Math.max(...lengths),
    }];
  }));
  const overlapProfile = (question, sourceText) => {
    const sourceTokens = new Set(normalizeText(sourceText).toLowerCase().match(/[a-z]{3,}/gu) ?? []);
    const statementTokens = [...new Set(normalizeText(question.statement).toLowerCase().match(/[a-z]{3,}/gu) ?? [])];
    return statementTokens.length
      ? statementTokens.filter(token => sourceTokens.has(token)).length / statementTokens.length
      : 0;
  };
  const lexicalOverlapByLabel = Object.fromEntries(labels.map(label => {
    const selected = questions.filter(question => answerByQuestionId.get(question.id) === label);
    const passageOverlaps = selected.map(question => overlapProfile(question, question.passage));
    const titleOverlaps = selected.map(question => overlapProfile(question, question.passageTitle));
    return [label, {
      questions: selected.length,
      averagePassageTokenOverlap: passageOverlaps.reduce((sum, value) => sum + value, 0) / selected.length,
      averageTitleTokenOverlap: titleOverlaps.reduce((sum, value) => sum + value, 0) / selected.length,
    }];
  }));
  const writerVerbByLabel = {};
  for (const question of questions) {
    const cue = /\bwriter\s+(believes|thinks|says|argues|recommends|prefers|is)\b/iu.exec(question.statement)?.[1]?.toLowerCase() ?? 'other';
    const label = answerByQuestionId.get(question.id);
    writerVerbByLabel[cue] ??= { YES: 0, NO: 0, 'NOT GIVEN': 0 };
    writerVerbByLabel[cue][label] += 1;
  }
  const perSet = assets.map(asset => {
    const setAnswers = new Map(asset.questions.map(question => [question.id, answerByQuestionId.get(question.id)]));
    return { assetId: asset.assetId, ...cueProfile([asset], setAnswers) };
  });
  const answerSequence = questions.map(question => answerByQuestionId.get(question.id));
  const transitions = {};
  for (let index = 1; index < answerSequence.length; index += 1) {
    const transition = `${answerSequence[index - 1]} → ${answerSequence[index]}`;
    transitions[transition] = (transitions[transition] ?? 0) + 1;
  }
  return {
    ...base,
    constantLabelHeuristics,
    statementLengthByLabel,
    lexicalOverlapByLabel,
    writerVerbByLabel,
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
    schemaVersion: 'ielts-reading-ynng-blind-review.v1',
    generatedAt: PACKETS_GENERATED_AT,
    reviewScope: 'F0.2b.3 — three formative Yes/No/Not Given sets',
    reviewerIsolation:
      'Use only this packet for the first pass. Do not open the catalog, registry, validator, route, UI, prior audits or factual-source packet until every decision has been fixed in a separate first-pass file.',
    taskRule:
      'YES only when the statement agrees with the writer’s own view or claim; NO only when it contradicts that view or claim; NOT GIVEN when it neither agrees nor contradicts. Distinguish the writer from reported supporters, opponents, critics and commentators. Do not use prior knowledge.',
    instruction:
      'Independently adjudicate all 22 statements. For YES/NO quote the shortest decisive span; for NOT GIVEN identify the closest related zone and the exact missing writer posture. Record who owns the quoted claim, ambiguity, title-cue risk and IELTS fitness. This is an AI editorial review, not a human signature, rights clearance or publication approval.',
    excludes: [
      'answer keys', 'correctness labels', 'explanations', 'trap labels',
      'declared skills', 'prior reviewer decisions', 'student data',
    ],
    records: records.map(asset => ({
      assetId: asset.assetId,
      passageTitle: asset.passageTitle,
      sourceObjectSha256: asset.sourceObjectSha256,
      passageSha256: asset.passageSha256,
      passage: asset.passage,
      statements: asset.questions.map(question => ({
        questionId: question.id,
        statement: question.statement,
      })),
    })),
  };
  assertExactKeys(packet,
    ['schemaVersion', 'generatedAt', 'reviewScope', 'reviewerIsolation', 'taskRule', 'instruction', 'excludes', 'records'],
    'blindReview');
  packet.records.forEach((record, recordIndex) => {
    assertExactKeys(record,
      ['assetId', 'passageTitle', 'sourceObjectSha256', 'passageSha256', 'passage', 'statements'],
      `blindReview.records[${recordIndex}]`);
    record.statements.forEach((statement, statementIndex) => assertExactKeys(
      statement, ['questionId', 'statement'],
      `blindReview.records[${recordIndex}].statements[${statementIndex}]`));
  });
  assert(findForbiddenKeys(packet).length === 0, 'El packet ciego filtra claves o feedback.');
  assert(findKeyLikePacketValues(packet).length === 0, 'El packet ciego filtra una clave en un valor textual.');
  assert(findPii(packet).length === 0, 'El packet ciego contiene PII.');
  return packet;
}

export function buildFactualSourceReviewPacket() {
  const registry = loadTsModule(REGISTRY_PATH).IELTS_READING_RIGHTS_REGISTRY;
  const evidenceById = new Map(registry.evidence.map(evidence => [evidence.id, evidence]));
  const packet = {
    schemaVersion: 'ielts-reading-ynng-factual-source-review.v1',
    generatedAt: PACKETS_GENERATED_AT,
    reviewScope: 'F0.2b.3 — second-pass factual-source review only',
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

function validateQuestionDecision(decision, question, passage, label) {
  assertExactKeys(decision,
    ['questionId', 'selectedAnswer', 'evidenceRelation', 'supportingQuote', 'relatedZoneQuote', 'absenceTarget', 'attributionSource', 'ambiguity', 'reasoning'],
    label);
  assert(decision.questionId === question.id, `${label}: ID incorrecto.`);
  assert(ALLOWED_LABELS.has(decision.selectedAnswer), `${label}: etiqueta inválida.`);
  assert(ALLOWED_RELATIONS.has(decision.evidenceRelation), `${label}: relación inválida.`);
  assert(['writer', 'reported-voice', 'mixed'].includes(decision.attributionSource), `${label}: atribución inválida.`);
  assert(['none', 'minor', 'material'].includes(decision.ambiguity), `${label}: ambigüedad inválida.`);
  assert(typeof decision.reasoning === 'string' && decision.reasoning.trim(), `${label}: falta razonamiento.`);
  assert(typeof decision.relatedZoneQuote === 'string' && decision.relatedZoneQuote.trim() &&
    normalizeText(passage).includes(normalizeText(decision.relatedZoneQuote)), `${label}: relatedZoneQuote inválido.`);
  if (decision.selectedAnswer === 'NOT GIVEN') {
    assert(decision.evidenceRelation === 'not-stated' && decision.supportingQuote === null &&
      typeof decision.absenceTarget === 'string' && decision.absenceTarget.trim(),
    `${label}: NOT GIVEN necesita related zone + absence target y no supporting quote.`);
  } else {
    assert((decision.selectedAnswer === 'YES' && decision.evidenceRelation === 'agrees') ||
      (decision.selectedAnswer === 'NO' && decision.evidenceRelation === 'contradicts'),
    `${label}: relación no coincide con etiqueta.`);
    assert(typeof decision.supportingQuote === 'string' && decision.supportingQuote.trim() &&
      normalizeText(passage).includes(normalizeText(decision.supportingQuote)) && decision.absenceTarget === null,
    `${label}: YES/NO necesita supporting quote textual y absenceTarget null.`);
  }
}

function validateFirstPass(firstPass, assets, blindReview) {
  assertExactKeys(firstPass, ['schemaVersion', 'reviewer', 'records'], 'firstPass');
  assert(firstPass.schemaVersion === 'ielts-reading-ynng-expert-first-pass.v1', 'Schema first-pass inválido.');
  assertExactKeys(firstPass.reviewer,
    ['reviewerRunId', 'reviewedAt', 'blindPacketSha256', 'humanSignature', 'sourceContext', 'notes'],
    'firstPass.reviewer');
  assert(typeof firstPass.reviewer.reviewerRunId === 'string' && firstPass.reviewer.reviewerRunId.trim() &&
    !Number.isNaN(Date.parse(firstPass.reviewer.reviewedAt)) && firstPass.reviewer.humanSignature === false &&
    firstPass.reviewer.sourceContext === 'blind-review-packet-only' &&
    firstPass.reviewer.blindPacketSha256 === sourceSha256(BLIND_REVIEW_PATH) &&
    Array.isArray(firstPass.reviewer.notes) && firstPass.reviewer.notes.every(note => typeof note === 'string' && note.trim()),
  'Reviewer first-pass inválido.');
  assertExactIdCoverage(firstPass.records, assets.map(asset => asset.assetId), 'assetId', 'firstPass.records');
  const seen = new Set();
  for (const asset of assets) {
    const record = firstPass.records.find(candidate => candidate.assetId === asset.assetId);
    assert(record, `${asset.assetId}: falta first-pass.`);
    assertExactKeys(record, ['assetId', 'passageAssessment', 'questions'], `${asset.assetId}:firstPass`);
    assertExactKeys(record.passageAssessment, ['ieltsFitness', 'titleCueRisk', 'notes'], `${asset.assetId}:passageAssessment`);
    assert(['fit', 'mixed', 'unfit'].includes(record.passageAssessment.ieltsFitness) &&
      ['low', 'medium', 'high'].includes(record.passageAssessment.titleCueRisk) &&
      Array.isArray(record.passageAssessment.notes) && record.passageAssessment.notes.length > 0 &&
      record.passageAssessment.notes.every(note => typeof note === 'string' && note.trim()),
    `${asset.assetId}: assessment incompleto.`);
    assertExactIdCoverage(record.questions, asset.questions.map(question => question.id), 'questionId',
      `${asset.assetId}:firstPass.questions`);
    for (const question of asset.questions) {
      const decision = record.questions.find(candidate => candidate.questionId === question.id);
      assert(decision && !seen.has(question.id), `${question.id}: decisión ausente o duplicada.`);
      seen.add(question.id);
      validateQuestionDecision(decision, question, asset.passage, `${question.id}:firstPass`);
    }
  }
  assert(blindReview.records.flatMap(record => record.statements).length === seen.size, 'First-pass no cubre el packet exacto.');
  return { questionCount: seen.size, fileSha256: sourceSha256(FIRST_PASS_PATH) };
}

function validateExpertVerdict(expertVerdict, firstPass, firstPassTrace, assets, factualPacket) {
  assertExactKeys(expertVerdict, ['schemaVersion', 'reviewer', 'records'], 'expertVerdict');
  assert(expertVerdict.schemaVersion === 'ielts-reading-ynng-expert-verdict.v1', 'Schema expert inválido.');
  assertExactKeys(expertVerdict.reviewer,
    ['humanSignature', 'sourceContext', 'reviewSequence', 'reviewerRunId', 'reviewedAt', 'blindPacketSha256', 'firstPassSha256', 'openedEvidenceIds', 'directSourceReview', 'notes'],
    'expertVerdict.reviewer');
  const expectedEvidenceIds = factualPacket.records.flatMap(record => record.candidateSources.map(source => source.evidenceId)).sort();
  assert(expertVerdict.reviewer.humanSignature === false &&
    expertVerdict.reviewer.sourceContext === 'two-pass-blind-then-factual-sources' &&
    JSON.stringify(expertVerdict.reviewer.reviewSequence) === JSON.stringify(['blind-review', 'factual-source-review']) &&
    typeof expertVerdict.reviewer.reviewerRunId === 'string' && expertVerdict.reviewer.reviewerRunId.trim() &&
    !Number.isNaN(Date.parse(expertVerdict.reviewer.reviewedAt)) &&
    expertVerdict.reviewer.blindPacketSha256 === sourceSha256(BLIND_REVIEW_PATH) &&
    expertVerdict.reviewer.firstPassSha256 === firstPassTrace.fileSha256 &&
    JSON.stringify([...expertVerdict.reviewer.openedEvidenceIds].sort()) === JSON.stringify(expectedEvidenceIds) &&
    expertVerdict.reviewer.directSourceReview === true &&
    Array.isArray(expertVerdict.reviewer.notes) && expertVerdict.reviewer.notes.length > 0,
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
      ['ieltsFitness', 'factualRisk', 'representationRisk', 'priorKnowledgeRisk', 'irrelevantLoadRisk', 'titleCueRisk', 'notes'],
      `${asset.assetId}:expertAssessment`);
    assert(['fit', 'mixed', 'unfit'].includes(record.passageAssessment.ieltsFitness) &&
      ['low', 'medium', 'high'].includes(record.passageAssessment.factualRisk) &&
      ['low', 'medium', 'high'].includes(record.passageAssessment.representationRisk) &&
      ['low', 'medium', 'high'].includes(record.passageAssessment.priorKnowledgeRisk) &&
      ['low', 'medium', 'high'].includes(record.passageAssessment.irrelevantLoadRisk) &&
      ['low', 'medium', 'high'].includes(record.passageAssessment.titleCueRisk) &&
      Array.isArray(record.passageAssessment.notes) && record.passageAssessment.notes.length > 0,
    `${asset.assetId}: assessment final inválido.`);
    assertExactIdCoverage(record.questions, asset.questions.map(question => question.id), 'questionId',
      `${asset.assetId}:expert.questions`);
    for (const question of asset.questions) {
      const decision = record.questions.find(candidate => candidate.questionId === question.id);
      const firstDecision = firstRecord.questions.find(candidate => candidate.questionId === question.id);
      assert(decision && firstDecision, `${question.id}: decisión final ausente.`);
      validateQuestionDecision(decision, question, asset.passage, `${question.id}:expert`);
      assert(stableJson(decision) === stableJson(firstDecision), `${question.id}: cambió tras abrir fuentes.`);
      comparisons.push({
        questionId: question.id,
        expertAnswer: decision.selectedAnswer,
        matchesStoredKey: decision.selectedAnswer === question.answer,
        ambiguity: decision.ambiguity,
      });
    }
    const expectedClaims = REQUIRED_FACTUAL_CLAIM_SPANS[asset.assetId];
    assert(record.factualClaims.length === expectedClaims.length, `${asset.assetId}: claims incompletos.`);
    for (const claimText of expectedClaims) {
      const claim = record.factualClaims.find(candidate => candidate.claim === claimText);
      assert(claim, `${asset.assetId}: falta claim exacto.`);
      assertExactKeys(claim, ['claim', 'assessment', 'evidenceIds', 'sourceFindings', 'note'], `${asset.assetId}:claim`);
      assert(['supported', 'oversimplified', 'unsupported', 'untraceable'].includes(claim.assessment) &&
        Array.isArray(claim.evidenceIds) && claim.evidenceIds.length > 0 &&
        new Set(claim.evidenceIds).size === claim.evidenceIds.length &&
        claim.evidenceIds.every(id => sourceRecord.candidateSources.some(source => source.evidenceId === id)) &&
        Array.isArray(claim.sourceFindings) && claim.sourceFindings.length > 0 &&
        typeof claim.note === 'string' && claim.note.trim(),
      `${asset.assetId}: claim review inválido.`);
      for (const finding of claim.sourceFindings) {
        assertExactKeys(finding, ['evidenceId', 'locator', 'evidenceSummary'], `${asset.assetId}:sourceFinding`);
        assert(claim.evidenceIds.includes(finding.evidenceId) &&
          typeof finding.locator === 'string' && finding.locator.trim() &&
          typeof finding.evidenceSummary === 'string' && finding.evidenceSummary.trim(),
        `${asset.assetId}: finding inválido.`);
      }
      factualClaims.push({ ...claim, assetId: asset.assetId });
    }
  }
  return { comparisons, factualClaims };
}

function validateStudentWalkthrough(walkthrough, assets) {
  assertExactKeys(walkthrough, ['schemaVersion', 'reviewer', 'records'], 'studentWalkthrough');
  assert(walkthrough.schemaVersion === 'ielts-reading-ynng-student-walkthrough.v1', 'Schema walkthrough inválido.');
  assertExactKeys(walkthrough.reviewer, ['humanSignature', 'sourceContext', 'notes'], 'studentWalkthrough.reviewer');
  assert(walkthrough.reviewer.humanSignature === false &&
    walkthrough.reviewer.sourceContext === 'blind-review-packet-only' &&
    Array.isArray(walkthrough.reviewer.notes) && walkthrough.reviewer.notes.length > 0,
  'Reviewer walkthrough inválido.');
  assert(findForbiddenKeys(walkthrough).length === 0 && findKeyLikePacketValues(walkthrough).length === 0 &&
    findPii(walkthrough).length === 0, 'Walkthrough filtra clave, feedback editorial o PII.');
  assertExactIdCoverage(walkthrough.records, assets.map(asset => asset.assetId), 'assetId', 'studentWalkthrough.records');
  let questionsCovered = 0;
  for (const asset of assets) {
    const record = walkthrough.records.find(candidate => candidate.assetId === asset.assetId);
    assert(record, `${asset.assetId}: walkthrough ausente.`);
    assertExactKeys(record,
      ['assetId', 'passageBarrier', 'titleInfluenceRisk', 'shortcutRisks', 'transferValue', 'nextAction', 'questionWalkthrough'],
      `${asset.assetId}:walkthrough`);
    assert(['low', 'medium', 'high'].includes(record.titleInfluenceRisk) &&
      typeof record.passageBarrier === 'string' && record.passageBarrier.trim() &&
      Array.isArray(record.shortcutRisks) && record.shortcutRisks.length >= 2 && record.shortcutRisks.every(Boolean) &&
      typeof record.transferValue === 'string' && record.transferValue.trim() &&
      typeof record.nextAction === 'string' && record.nextAction.trim(),
    `${asset.assetId}: walkthrough incompleto.`);
    assertExactIdCoverage(record.questionWalkthrough, asset.questions.map(question => question.id), 'questionId',
      `${asset.assetId}:walkthrough.questions`);
    for (const question of asset.questions) {
      const row = record.questionWalkthrough.find(candidate => candidate.questionId === question.id);
      assert(row, `${question.id}: walkthrough ausente.`);
      assertExactKeys(row,
        ['questionId', 'likelyMisread', 'evidenceHunt', 'attributionCheck', 'decisionRule', 'repairAction'],
        `${question.id}:walkthrough`);
      assert(Object.values(row).every(value => typeof value === 'string' && value.trim()), `${question.id}: walkthrough vacío.`);
      questionsCovered += 1;
    }
  }
  return { passagesCovered: assets.length, questionsCovered };
}

function validateSourceAvailability(sourceAvailability, registry) {
  assertExactKeys(sourceAvailability, ['schemaVersion', 'checkedAt', 'method', 'sources', 'interpretation'], 'sourceAvailability');
  assert(sourceAvailability.schemaVersion === 'ielts-reading-ynng-source-availability.v1' &&
    /^\d{4}-\d{2}-\d{2}$/u.test(sourceAvailability.checkedAt) &&
    sourceAvailability.method.includes('response-body SHA-256') &&
    sourceAvailability.interpretation.includes('does not establish authorship'),
  'Metadata de disponibilidad inválida.');
  assert(JSON.stringify(sourceAvailability.sources.map(source => source.evidenceId).sort()) ===
    JSON.stringify([...EXPECTED_SOURCE_IDS].sort()), 'Disponibilidad no cubre exactamente nueve fuentes.');
  const evidenceById = new Map(registry.evidence.map(evidence => [evidence.id, evidence]));
  sourceAvailability.sources.forEach((source, index) => {
    assertExactKeys(source,
      ['evidenceId', 'requestedUrl', 'retrievedAt', 'httpStatus', 'finalUrl', 'redirected', 'contentType', 'sizeBytes', 'bodySha256'],
      `sourceAvailability.sources[${index}]`);
    const evidence = evidenceById.get(source.evidenceId);
    assert(evidence?.url === source.requestedUrl && source.httpStatus === 200 &&
      source.finalUrl === source.requestedUrl && source.redirected === false &&
      !Number.isNaN(Date.parse(source.retrievedAt)) && typeof source.contentType === 'string' && source.contentType.startsWith('text/html') &&
      Number.isInteger(source.sizeBytes) && source.sizeBytes > 1000 && /^[a-f0-9]{64}$/u.test(source.bodySha256),
    `${source.evidenceId}: disponibilidad no coincide con registry o fetch.`);
  });
}

function validateProvenanceSearch(provenanceSearch) {
  assertExactKeys(provenanceSearch,
    ['schemaVersion', 'searchedAt', 'method', 'searchSurface', 'queries', 'interpretation'],
    'provenanceSearch');
  assert(provenanceSearch.schemaVersion === 'ielts-reading-ynng-provenance-search.v1' &&
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
  assert(auditVerdicts.schemaVersion === 'ielts-reading-ynng-audit-verdicts.v1' &&
    auditVerdicts.status === 'pass' && timestampMs(auditVerdicts.reviewedAt, 'auditVerdicts.reviewedAt') > 0 &&
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
  assertExactIdCoverage(auditVerdicts.rows, expected.map(([lane]) => lane), 'lane', 'auditVerdicts.rows');
  for (const [lane, mark] of expected) {
    const row = auditVerdicts.rows.find(candidate => candidate.lane === lane);
    assertExactKeys(row, ['lane', 'boardMark', 'scope', 'findings', 'blockersCarriedForward'], `${lane}:audit`);
    assert(row.boardMark === mark && [row.scope, row.findings, row.blockersCarriedForward]
      .every(value => typeof value === 'string' && value.trim()), `${lane}: dictamen incompleto.`);
  }
  if (facts) {
    const byLane = new Map(auditVerdicts.rows.map(row => [row.lane, row]));
    const rights = byLane.get('Rights and provenance');
    const ielts = byLane.get('IELTS expert');
    const walkthrough = byLane.get('Cognitive walkthrough');
    const antiBias = byLane.get('Anti-bias and leakage');
    const ui = byLane.get('UI/UX and accessibility');
    const playwright = byLane.get('Playwright');
    assert(rights.findings.includes(`${facts.quarantined}/${facts.passages} assets remain unknown-quarantined`) &&
      rights.blockersCarriedForward.includes('Authorship') && rights.blockersCarriedForward.includes('license'),
    'El carril de derechos contradice la cuarentena ejecutable.');
    assert(ielts.findings.includes(`${facts.expertMatches}/${facts.questions} statements`) &&
      ielts.findings.includes(`${facts.materialAmbiguities.length} material ambiguities`) &&
      facts.materialAmbiguities.every(id => ielts.blockersCarriedForward.includes(id)),
    'El carril IELTS contradice la adjudicación independiente.');
    assert(walkthrough.findings.includes(`${facts.passages}/${facts.passages} passages`) &&
      walkthrough.findings.includes(`${facts.questions}/${facts.questions} statements`),
    'El carril walkthrough contradice su cobertura.');
    assert(antiBias.findings.includes(`YES=${facts.answerCounts.YES}`) &&
      antiBias.findings.includes(`NO=${facts.answerCounts.NO}`) &&
      antiBias.findings.includes(`NOT GIVEN=${facts.answerCounts['NOT GIVEN']}`) &&
      antiBias.findings.includes(`${facts.degreeCue.hits}/${facts.degreeCue.eligible}`) &&
      antiBias.blockersCarriedForward.includes('contentCertification remains blocked'),
    'El carril anti-sesgo contradice el perfil ejecutable.');
    assert(ui.boardMark === '➖' && ui.scope.includes('Not applicable') && ui.blockersCarriedForward.includes('does not certify') &&
      playwright.boardMark === '➖' && playwright.scope.includes('Not applicable') &&
      playwright.blockersCarriedForward.includes('No browser matrix'),
    'Los carriles UI/Playwright sobredeclaran conformidad.');
  }
}

function validateChronology({ baseline, sourceAvailability, provenanceSearch, blindReview,
  factualSourceReview, firstPass, expertVerdict, unitChangeManifest, auditVerdicts }) {
  const nowWithTolerance = Date.now() + 5 * 60 * 1000;
  const baselineAt = timestampMs(baseline.capturedAt, 'baseline.capturedAt');
  const retrievalTimes = sourceAvailability.sources.map(source =>
    timestampMs(source.retrievedAt, `${source.evidenceId}.retrievedAt`));
  const provenanceAt = timestampMs(provenanceSearch.searchedAt, 'provenanceSearch.searchedAt');
  const blindAt = timestampMs(blindReview.generatedAt, 'blindReview.generatedAt');
  const factualPacketAt = timestampMs(factualSourceReview.generatedAt, 'factualSourceReview.generatedAt');
  const firstPassAt = timestampMs(firstPass.reviewer.reviewedAt, 'firstPass.reviewer.reviewedAt');
  const verdictAt = timestampMs(expertVerdict.reviewer.reviewedAt, 'expertVerdict.reviewer.reviewedAt');
  const manifestAt = timestampMs(unitChangeManifest.recordedAt, 'unitChangeManifest.recordedAt');
  const validationAt = timestampMs(VALIDATION_GENERATED_AT, 'VALIDATION_GENERATED_AT');
  const auditAt = timestampMs(auditVerdicts.reviewedAt, 'auditVerdicts.reviewedAt');
  const allTimes = [baselineAt, ...retrievalTimes, provenanceAt, blindAt, factualPacketAt,
    firstPassAt, verdictAt, manifestAt, validationAt, auditAt];
  assert(allTimes.every(value => value <= nowWithTolerance), 'La cronología contiene timestamps futuros.');
  assert(baselineAt <= Math.min(...retrievalTimes) && Math.max(...retrievalTimes) <= provenanceAt &&
    provenanceAt <= blindAt && blindAt === factualPacketAt && blindAt <= firstPassAt &&
    firstPassAt <= verdictAt && verdictAt <= manifestAt && manifestAt <= validationAt && validationAt <= auditAt,
  'La cronología declarada del expediente es imposible o no monotónica.');
}

export function buildValidationArtifacts() {
  const catalog = loadTsModule(CATALOG_PATH);
  const registryModule = loadTsModule(REGISTRY_PATH);
  const contract = loadTsModule(CONTRACT_PATH);
  const assets = sourceAssets(catalog);
  const registry = registryModule.IELTS_READING_RIGHTS_REGISTRY;
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

  assert(assets.length === 3 && JSON.stringify(assets.map(asset => asset.id)) === JSON.stringify(EXPECTED_SET_IDS),
    'Cobertura YNNG inesperada.');
  const assetIds = assets.map(asset => asset.assetId);
  const questionIds = assets.flatMap(asset => asset.questions.map(question => question.id));
  assert(JSON.stringify(assetIds) === JSON.stringify(EXPECTED_ASSET_IDS) && new Set(questionIds).size === 22,
    'IDs YNNG incompletos o duplicados.');

  assertExactKeys(baseline,
    ['schemaVersion', 'capturedAt', 'scope', 'assets', 'structuralRisk', 'learnerFacingSourceSha256', 'interpretation'],
    'baseline');
  assert(baseline.schemaVersion === 'ielts-reading-ynng-baseline.v1' && baseline.assets.length === 3 &&
    baseline.scope.passages === 3 && baseline.scope.questions === 22,
  'Baseline inválido.');
  const baselineById = new Map(baseline.assets.map(asset => [asset.assetId, asset]));
  for (const asset of assets) {
    const pinned = baselineById.get(asset.assetId);
    assert(pinned?.sourceObjectSha256 === asset.sourceObjectSha256 && pinned?.passageSha256 === asset.passageSha256 &&
      pinned?.wordCount === asset.wordCount && pinned?.questionCount === asset.questions.length,
    `${asset.assetId}: drift desde baseline.`);
  }
  for (const [path, hash] of Object.entries(baseline.learnerFacingSourceSha256)) {
    assert(sourceSha256(path) === hash, `${path}: cambió una fuente learner-facing.`);
  }

  assertExactKeys(unitChangeManifest,
    ['schemaVersion', 'unit', 'recordedAt', 'learnerFacingChangeAuthorized', 'learnerFacingBaselinePaths', 'unitSourceFiles', 'unitOutputDirectory', 'interpretation'],
    'unitChangeManifest');
  assert(unitChangeManifest.schemaVersion === 'ielts-reading-ynng-unit-change-manifest.v1' &&
    unitChangeManifest.unit === 'F0.2b.3' && !Number.isNaN(Date.parse(unitChangeManifest.recordedAt)) &&
    unitChangeManifest.learnerFacingChangeAuthorized === false &&
    JSON.stringify(unitChangeManifest.learnerFacingBaselinePaths) ===
      JSON.stringify([CATALOG_PATH, ROUTE_PATH, ENGINE_PATH, BANK_PATH]) &&
    JSON.stringify(unitChangeManifest.unitSourceFiles) ===
      JSON.stringify([REGISTRY_PATH, VALIDATOR_PATH, TEST_PATH, LOOP_DOC_PATH]) &&
    unitChangeManifest.unitOutputDirectory === OUTPUT_DIRECTORY &&
    unitChangeManifest.interpretation.includes('does not assert that the entire repository'),
  'Manifest de unidad inválido.');

  validateSourceAvailability(sourceAvailability, registry);
  validateProvenanceSearch(provenanceSearch);
  validateAuditVerdicts(auditVerdicts);
  validateChronology({ baseline, sourceAvailability, provenanceSearch, blindReview,
    factualSourceReview, firstPass, expertVerdict, unitChangeManifest, auditVerdicts });
  const evidenceById = new Map(registry.evidence.map(evidence => [evidence.id, evidence]));
  const unitRecords = EXPECTED_ASSET_IDS.map(assetId => {
    const rows = registry.entries.filter(entry => entry.assetId === assetId);
    assert(rows.length === 1, `${assetId}: registry debe tener una fila.`);
    return rows[0];
  });
  const decisions = assets.map(asset => {
    const record = unitRecords.find(candidate => candidate.assetId === asset.assetId);
    referencedEvidenceIds(record).forEach(evidenceId => assert(evidenceById.has(evidenceId), `${asset.assetId}: evidencia inexistente ${evidenceId}.`));
    assert(record.sourceObjectSha256 === asset.sourceObjectSha256 && record.passageSha256 === asset.passageSha256,
      `${asset.assetId}: hash registry inválido.`);
    assert(record.factualReviewRequirement.policy === 'required' &&
      record.factualSourceResearch.status === 'candidate-sources-collected' &&
      record.factualSourceResearch.sourceEvidenceIds.length >= 2 &&
      new Set(record.factualSourceResearch.sourceEvidenceIds).size === record.factualSourceResearch.sourceEvidenceIds.length &&
      record.factualSourceResearch.sourceEvidenceIds.every(id => evidenceById.get(id)?.kind === 'factual-source') &&
      record.factualReview.status === 'not-reviewed' && record.humanReview.status === 'pending',
    `${asset.assetId}: estado editorial inválido.`);
    const decision = contract.assessIeltsReadingRights(registry, asset);
    assert(decision.disposition === 'quarantine' && !decision.eligibleForPublicationPipeline,
      `${asset.assetId}: debe quedar en cuarentena.`);
    assert(!decision.reasonCodes.some(code => ['registry-contract-invalid', 'content-hash-mismatch', 'factual-source-research-invalid'].includes(code)),
      `${asset.assetId}: registro inválido oculto: ${decision.reasonCodes.join(', ')}.`);
    return {
      assetId: asset.assetId,
      title: asset.title,
      sourceObjectSha256: asset.sourceObjectSha256,
      passageSha256: asset.passageSha256,
      wordCount: asset.wordCount,
      questionCount: asset.questions.length,
      provenanceStatus: record.provenanceAssessment.status,
      rightsBasis: decision.rightsBasis,
      factualResearchStatus: record.factualSourceResearch.status,
      factualReviewPolicy: record.factualReviewRequirement.policy,
      candidateFactualSourceCount: record.factualSourceResearch.sourceEvidenceIds.length,
      factualReviewStatus: record.factualReview.status,
      humanReviewStatus: record.humanReview.status,
      authorizationEvidenceStatus: record.rightsAssessment.authorizationEvidenceStatus,
      disposition: decision.disposition,
      eligibleForPublicationPipeline: decision.eligibleForPublicationPipeline,
      reasonCodes: decision.reasonCodes,
    };
  });

  const runtimeAuditReferences = [
    ...sourceFilesUnder('src/app'),
    ...sourceFilesUnder('src/components'),
  ].filter(absolutePath => {
    const text = readFileSync(absolutePath, 'utf8');
    return text.includes('ielts-reading-rights-registry') || text.includes('academic-reading-rights');
  });
  assert(runtimeAuditReferences.length === 0, `Runtime importa expediente: ${runtimeAuditReferences.join(', ')}`);

  const routeText = readFileSync(resolve(ROOT, ROUTE_PATH), 'utf8');
  const visibleClaims = ['textos originales de WeLearn', 'Banco original WeLearn', 'sin copiar preguntas oficiales']
    .map(text => ({ text, observed: routeText.includes(text) }));
  assert(visibleClaims.every(claim => claim.observed), 'Cambió el claim visible de originalidad.');
  const loopDocText = readFileSync(resolve(ROOT, LOOP_DOC_PATH), 'utf8');
  const expectedClosedBoardRow =
    '| 0 | 　　　 ↳ F0.2b.3 Yes/No/Not Given | ✅ | ✅ | ✅ | ✅ | ✅ | ➖ | ➖ |';
  assert(loopDocText.includes(expectedClosedBoardRow), 'El tablero no refleja F0.2b.3 cerrado.');
  assert(!loopDocText.includes('No se inició F0.2b.3'), 'El loop conserva una contradicción de estado F0.2b.3.');
  assert(loopDocText.includes('Siguiente subunidad, sin iniciarla: `F0.2b.4 Matching Information`.'),
    'El loop no se detuvo explícitamente antes de F0.2b.4.');

  const firstPassTrace = validateFirstPass(firstPass, assets, blindReview);
  const expertValidation = validateExpertVerdict(expertVerdict, firstPass, firstPassTrace, assets, factualSourceReview);
  const studentSummary = validateStudentWalkthrough(studentWalkthrough, assets);
  const storedAnswerById = new Map(assets.flatMap(asset => asset.questions.map(question => [question.id, question.answer])));
  const expertAnswerById = new Map(expertValidation.comparisons.map(row => [row.questionId, row.expertAnswer]));
  const storedBias = structuralBiasProfile(assets, storedAnswerById);
  const expertBias = structuralBiasProfile(assets, expertAnswerById);
  assert(JSON.stringify(storedBias.answerCounts) === JSON.stringify(baseline.structuralRisk.answerCounts) &&
    storedBias.maxSameLabelRun === baseline.structuralRisk.maxSameLabelRun &&
    storedBias.degreeLanguageImpliesNo.eligible === baseline.structuralRisk.absoluteOrDegreeLanguageImpliesNo.eligible &&
    storedBias.degreeLanguageImpliesNo.hits === baseline.structuralRisk.absoluteOrDegreeLanguageImpliesNo.hits,
  'El perfil estructural cambió desde baseline.');
  const conflicts = expertValidation.comparisons.filter(row => !row.matchesStoredKey).map(row => row.questionId);
  const materialAmbiguities = expertValidation.comparisons.filter(row => row.ambiguity === 'material').map(row => row.questionId);
  const factualAssessmentCounts = Object.fromEntries(
    ['supported', 'oversimplified', 'unsupported', 'untraceable'].map(assessment => [
      assessment,
      expertValidation.factualClaims.filter(claim => claim.assessment === assessment).length,
    ]),
  );
  validateAuditVerdicts(auditVerdicts, {
    quarantined: decisions.filter(decision => decision.disposition === 'quarantine').length,
    passages: assets.length,
    questions: questionIds.length,
    expertMatches: questionIds.length - conflicts.length,
    materialAmbiguities,
    answerCounts: storedBias.answerCounts,
    degreeCue: storedBias.degreeLanguageImpliesNo,
  });
  const negativeControl = contract.assessIeltsReadingRights(registry, { ...assets[0], passageSha256: '0'.repeat(64) });
  assert(negativeControl.reasonCodes.includes('content-hash-mismatch'), 'Una mutación no falla cerrada.');
  const keyLikeValueLeakFindings = findKeyLikePacketValues({
    instruction: 'Correct answer for ynng-station-art-01 is NO',
  });
  assert(keyLikeValueLeakFindings.length === 1, 'El control textual de fuga no detecta una clave.');
  const spanishKeyLikeValueLeakFindings = findKeyLikePacketValues({
    repairAction: 'La respuesta correcta de ynng-station-art-01 es YES.',
  });
  assert(spanishKeyLikeValueLeakFindings.length === 1,
    'El control textual de fuga no detecta una clave redactada en español.');

  const allSourcePaths = [
    CATALOG_PATH, ROUTE_PATH, ENGINE_PATH, BANK_PATH, CONTRACT_PATH, REGISTRY_PATH,
    VALIDATOR_PATH, TEST_PATH, LOOP_DOC_PATH, BASELINE_PATH, SOURCE_AVAILABILITY_PATH,
    PROVENANCE_SEARCH_PATH, UNIT_CHANGE_MANIFEST_PATH, BLIND_REVIEW_PATH,
    FACTUAL_SOURCE_REVIEW_PATH, FIRST_PASS_PATH, EXPERT_VERDICT_PATH, STUDENT_WALKTHROUGH_PATH,
    AUDIT_VERDICTS_PATH, BUILD_REPORT_PATH, REPORT_MD_PATH,
  ];
  const validation = {
    schemaVersion: 'ielts-reading-ynng-rights-validation.v1',
    generatedAt: VALIDATION_GENERATED_AT,
    unit: 'F0.2b.3 — expediente de tres sets formativos Yes/No/Not Given',
    status: 'pass',
    passMeaning:
      'PASS certifica cobertura, identidad, cuarentena, revisión ciega y detección de riesgos. NO aprueba claves, factualidad, derechos, publicación, UI ni eficacia pedagógica en estudiantes reales.',
    scope: {
      passages: assets.length,
      questions: questionIds.length,
      registryEntriesInUnit: decisions.length,
      registryEntriesTotal: registry.entries.length,
      coveredAssetIds: EXPECTED_ASSET_IDS,
      parentF02bRemainsOpen: true,
      scopedLearnerSourcesChangedSinceBaseline: false,
    },
    checks: {
      exactCoverage: assets.length === 3 && questionIds.length === 22,
      stableUniqueIds: new Set(assetIds).size === 3 && new Set(questionIds).size === 22,
      sourceHashesMatchBaseline: true,
      registryReferencesResolve: true,
      officialRuleSourceAvailable: sourceAvailability.sources.some(source => source.evidenceId === 'ielts-ynng-official-format'),
      factualSourceAvailabilityRecorded: sourceAvailability.sources.length === 9,
      candidateSourcesAreNotTreatedAsVerification: decisions.every(decision => decision.factualReviewStatus === 'not-reviewed'),
      factualReviewRequiredForEveryAsset: decisions.every(decision => decision.factualReviewPolicy === 'required'),
      actualAssetsAllQuarantined: decisions.every(decision => !decision.eligibleForPublicationPipeline),
      actualRegistryRecordsStructurallyValid: decisions.every(decision =>
        !decision.reasonCodes.some(code => ['registry-contract-invalid', 'content-hash-mismatch', 'factual-source-research-invalid'].includes(code))),
      visibleOriginalityClaimObservedButUnverified: visibleClaims.every(claim => claim.observed),
      blindPacketContainsNoKeysFeedbackOrSkills: findForbiddenKeys(blindReview).length === 0,
      blindPacketContainsNoKeyLikeValues: findKeyLikePacketValues(blindReview).length === 0,
      blindPacketContainsNoLearnerOrContactPii: findPii(blindReview).length === 0,
      factualSourcePacketContainsNoKeysFeedbackOrSkills: findForbiddenKeys(factualSourceReview).length === 0,
      factualSourcePacketContainsNoKeyLikeValues: findKeyLikePacketValues(factualSourceReview).length === 0,
      independentExpertCoverageComplete: expertValidation.comparisons.length === 22,
      expertFirstPassPersistedAndPinned: expertVerdict.reviewer.firstPassSha256 === sourceSha256(FIRST_PASS_PATH),
      viewpointAttributionContractEnforced: expertValidation.comparisons.length === 22,
      notGivenAbsenceContractEnforced: expertValidation.comparisons.length === 22,
      studentWalkthroughCoverageComplete: studentSummary.passagesCovered === 3 && studentSummary.questionsCovered === 22,
      fixedLabelsNotPermuted: true,
      statisticalCertificationWithheld: questionIds.length < 100,
      contentCertificationBlocked:
        conflicts.length > 0 || materialAmbiguities.length > 0 ||
        storedBias.degreeLanguageImpliesNo.conditionalAccuracy > 1 / 3 + 0.1,
      contentMutationDenied: negativeControl.disposition === 'quarantine',
      scopedLearnerSourcesUnchanged: true,
      auditRegistryAbsentFromLearnerRuntimeImports: runtimeAuditReferences.length === 0,
      provenanceSearchLedgerComplete: provenanceSearch.queries.length === 3,
      chronologyIsMonotonicAndNotFutureDated: true,
      finalPanelVerdictsValidated: true,
      antiBiasMultidimensionalCoverage:
        Object.keys(storedBias.constantLabelHeuristics).length === 3 &&
        Object.keys(storedBias.statementLengthByLabel).length === 3 &&
        Object.keys(storedBias.lexicalOverlapByLabel).length === 3 &&
        Object.keys(storedBias.writerVerbByLabel).length >= 4 && storedBias.perSet.length === 3 &&
        expertVerdict.records.every(record =>
          ['low', 'medium', 'high'].includes(record.passageAssessment.representationRisk) &&
          ['low', 'medium', 'high'].includes(record.passageAssessment.priorKnowledgeRisk) &&
          ['low', 'medium', 'high'].includes(record.passageAssessment.irrelevantLoadRisk) &&
          ['low', 'medium', 'high'].includes(record.passageAssessment.titleCueRisk)),
      keyLikeValueLeakageMutationDetected:
        keyLikeValueLeakFindings.length === 1 && spanishKeyLikeValueLeakFindings.length === 1,
      boardStateMatchesValidatedUnit: loopDocText.includes(expectedClosedBoardRow),
    },
    decisions,
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
        matches: 22 - conflicts.length,
        total: 22,
        rate: (22 - conflicts.length) / 22,
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
      limitation: 'Walkthrough cognitivo ciego sobre contenido; no prueba UI, accesibilidad, retención, bandas ni estudiantes reales.',
    },
    antiBias: {
      optionPermutationApplied: false,
      optionPermutationReason: 'YES/NO/NOT GIVEN are fixed IELTS response labels; label identity is not shuffled. Bias is audited across items, stance attribution and semantics.',
      storedKeyProfile: storedBias,
      independentExpertProfile: expertBias,
      qualitativeCoverage: {
        perspectiveAndRepresentation: true,
        priorKnowledge: true,
        irrelevantCognitiveLoad: true,
        writerVsReportedVoice: true,
        visibleTitleCue: true,
      },
      sampleAdequacy: {
        certificationThreshold: 100,
        observedQuestions: 22,
        eligibleForStatisticalCertification: false,
        conclusion: 'The sample can expose severe cues but cannot certify balanced content statistically.',
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
        'Within F0.2b.3, the catalog, YNNG route, ObjectivePracticeEngine and ObjectivePracticeSetBank remain pinned by baseline hash, and no app/component imports the audit registry/contract. This does not certify the existing UI or the repository globally.',
    },
    processLimitations: {
      firstPassTrace:
        'The persisted hash detects ordinary mutation but is not an external append-only witness; coordinated post-hoc rewriting of all local files cannot be ruled out cryptographically.',
      directSourceReview:
        'Direct-source review is declared by an AI reviewer and checked for exact IDs plus non-empty locators; it is not automatic proof of browsing, a human signature or factual verification.',
      provenanceSearch:
        'Public-web search is directed and non-exhaustive; no exact match in reviewed results does not prove original authorship or universal absence.',
    },
    negativeControl: {
      contentHashMismatch: negativeControl,
      keyLikeValueLeakFindings,
      spanishKeyLikeValueLeakFindings,
    },
    sources: allSourcePaths.filter(path => existsSync(resolve(ROOT, path))).map(path => ({ path, sha256: sourceSha256(path) })),
  };
  assert(Object.values(validation.checks).every(Boolean), 'Falló un gate de F0.2b.3.');
  return { validation, blindReview, factualSourceReview };
}

export function validateFinalReportArtifacts(validation) {
  for (const path of [ARTIFACT_PATH, REPORT_MD_PATH, REPORT_HTML_PATH, REPORT_VERIFICATION_PATH,
    BUILD_REPORT_PATH, AUDIT_VERDICTS_PATH]) {
    assert(existsSync(resolve(ROOT, path)), `Falta artefacto final: ${path}`);
  }
  const auditVerdicts = readJson(AUDIT_VERDICTS_PATH);
  validateAuditVerdicts(auditVerdicts, {
    quarantined: validation.decisions.filter(decision => decision.disposition === 'quarantine').length,
    passages: validation.scope.passages,
    questions: validation.scope.questions,
    expertMatches: validation.expertReview.answerAgreement.matches,
    materialAmbiguities: validation.expertReview.materialAmbiguityQuestionIds,
    answerCounts: validation.antiBias.storedKeyProfile.answerCounts,
    degreeCue: validation.antiBias.storedKeyProfile.degreeLanguageImpliesNo,
  });
  const artifact = readJson(ARTIFACT_PATH);
  assert(artifact.surface === 'report' && artifact.manifest?.surface === 'report' &&
    artifact.manifest.title === 'IELTS Reading Yes / No / Not Given — audit gate' &&
    timestampMs(artifact.manifest.generatedAt, 'artifact.manifest.generatedAt') >=
      timestampMs(auditVerdicts.reviewedAt, 'auditVerdicts.reviewedAt') &&
    artifact.snapshot.generatedAt === artifact.manifest.generatedAt &&
    artifact.manifest.cards?.length === 4 && artifact.manifest.charts?.length === 2 &&
    artifact.manifest.tables?.length === 2 && artifact.snapshot?.status === 'ready',
  'Artifact portable incompleto o con estado incorrecto.');
  assert(JSON.stringify(artifact.manifest.charts.map(chart => chart.title)) ===
    JSON.stringify(['Stored response-label counts', 'Independent factual-claim assessments']),
  'Los títulos de gráficos deben ser neutrales y descriptivos.');
  const expectedSummary = [{
    passages: validation.scope.passages,
    questions: validation.scope.questions,
    quarantined: validation.decisions.filter(row => row.disposition === 'quarantine').length,
    expertMatches: validation.expertReview.answerAgreement.matches,
    expertTotal: validation.expertReview.answerAgreement.total,
    materialAmbiguities: validation.expertReview.materialAmbiguityCount,
  }];
  const expectedLabels = Object.entries(validation.antiBias.storedKeyProfile.answerCounts)
    .map(([label, count]) => ({ label, count }));
  const expectedClaims = Object.entries(validation.expertReview.factualAssessmentCounts)
    .map(([assessment, claims]) => ({ assessment, claims }));
  const expectedDecisions = validation.decisions.map(({ reasonCodes, ...row }) => ({
    ...row,
    blockers: reasonCodes.join(' · '),
  }));
  assert(stableJson(artifact.snapshot.datasets.summary) === stableJson(expectedSummary) &&
    stableJson(artifact.snapshot.datasets.labels) === stableJson(expectedLabels) &&
    stableJson(artifact.snapshot.datasets.claims) === stableJson(expectedClaims) &&
    stableJson(artifact.snapshot.datasets.decisions) === stableJson(expectedDecisions) &&
    stableJson(artifact.snapshot.datasets.audit) === stableJson(auditVerdicts.rows),
  'El artifact no coincide con validation/audit-verdicts.');
  const reportMarkdown = readFileSync(resolve(ROOT, REPORT_MD_PATH), 'utf8');
  const reportHtml = readFileSync(resolve(ROOT, REPORT_HTML_PATH), 'utf8');
  for (const required of ['audit PASS; bank and content certification BLOCKED',
    'ynng-station-art-07', 'ynng-uniforms-04', 'F0.2b.4 Matching Information']) {
    assert(reportMarkdown.includes(required), `report.md omite límite obligatorio: ${required}`);
  }
  assert(reportHtml.includes('IELTS Reading Yes / No / Not Given') &&
    reportHtml.includes('Material ambiguities') && reportHtml.includes('Panel scope') &&
    reportHtml.includes('Recommended next decisions'), 'report.html incompleto o desalineado.');
  const verification = readJson(REPORT_VERIFICATION_PATH);
  assertExactKeys(verification,
    ['schemaVersion', 'verifiedAt', 'command', 'stages', 'viewports', 'counts', 'sha256', 'interpretation'],
    'reportVerification');
  assert(verification.schemaVersion === 'ielts-reading-ynng-report-verification.v1' &&
    timestampMs(verification.verifiedAt, 'reportVerification.verifiedAt') >=
      timestampMs(auditVerdicts.reviewedAt, 'auditVerdicts.reviewedAt') &&
    timestampMs(verification.verifiedAt, 'reportVerification.verifiedAt') <= Date.now() + 5 * 60 * 1000 &&
    verification.command.includes('deliver_portable_artifact.mjs') &&
    stableJson(verification.stages) === stableJson({ validation: 'passed', package: 'passed', verification: 'passed' }) &&
    stableJson(verification.viewports) === stableJson([1440, 390]) &&
    verification.counts.cards === 4 && verification.counts.charts === 2 && verification.counts.tables === 2 &&
    verification.interpretation.includes('report only') && verification.interpretation.includes('not learner-facing'),
  'Verificación portable inválida o sobredeclarada.');
  assert(verification.sha256.validation === sourceSha256(VALIDATION_PATH) &&
    verification.sha256.auditVerdicts === sourceSha256(AUDIT_VERDICTS_PATH) &&
    verification.sha256.artifact === sourceSha256(ARTIFACT_PATH) &&
    verification.sha256.reportMarkdown === sourceSha256(REPORT_MD_PATH) &&
    verification.sha256.reportHtml === sourceSha256(REPORT_HTML_PATH),
  'Hashes del reporte portable no coinciden con los artefactos actuales.');
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
