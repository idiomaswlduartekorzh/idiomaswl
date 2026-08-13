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

const GENERATED_AT = '2026-08-09T00:00:00-05:00';
const CATALOG_PATH = 'src/data/practica-exams/seo-catalog.ts';
const ROUTE_PATH =
  'src/app/(site)/practica/ielts/reading/tipos-de-preguntas/true-false-not-given/page.tsx';
const ENGINE_PATH = 'src/components/exam-practice/ObjectivePracticeEngine.tsx';
const BANK_PATH = 'src/components/exam-practice/ObjectivePracticeSetBank.tsx';
const CONTRACT_PATH = 'src/lib/ielts/academic-reading-rights.ts';
const REGISTRY_PATH = 'src/data/practica-exams/ielts-reading-rights-registry.ts';
const VALIDATOR_PATH = 'scripts/check-ielts-reading-tfng-rights.mjs';
const TEST_PATH = 'tests/ielts-reading-tfng-rights.test.mjs';
const LOOP_DOC_PATH = 'docs/ielts-reading-loop.md';
const OUTPUT_DIRECTORY = 'output/audits/ielts-reading-rights-tfng-2026-08-09';
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

const EXPECTED_ASSET_IDS = [
  'formative:true-false-not-given:tfng-set-urban-trees',
  'formative:true-false-not-given:tfng-set-school-libraries',
  'formative:true-false-not-given:tfng-set-coastal-paths',
];
const EXPECTED_SET_IDS = [
  'tfng-set-urban-trees',
  'tfng-set-school-libraries',
  'tfng-set-coastal-paths',
];
const REQUIRED_FACTUAL_CLAIM_SPANS = {
  'formative:true-false-not-given:tfng-set-urban-trees': [
    'Trees can lower surface temperatures by providing shade and by releasing moisture through transpiration.',
    'In dense neighborhoods, this cooling effect can reduce the need for air conditioning during hot months.',
    'Wealthier districts often have wider streets, private gardens and long-established parks, while lower-income areas may have fewer trees and more exposed concrete.',
    'Some cities now use satellite imagery to identify neighborhoods with the highest heat risk and the lowest tree coverage.',
  ],
  'formative:true-false-not-given:tfng-set-school-libraries': [
    'Several secondary schools have kept their libraries open after regular lessons.',
    'Teachers noticed that some pupils needed a quiet place to complete assignments before travelling home, especially those who shared bedrooms with younger siblings.',
    'In the second term, trained volunteers and senior students helped with basic supervision, while teachers remained available only on two afternoons each week.',
    'Younger students used the library mostly for homework support, while older students were more likely to use reference books and online databases for exam projects.',
    'Some parents wanted weekend opening hours, but the school board decided to review weekday demand first.',
  ],
  'formative:true-false-not-given:tfng-set-coastal-paths': [
    'A coastal town redesigned part of its walking path after winter storms damaged several wooden sections.',
    'After the path reopened, however, footfall data showed little change in weekend visitor numbers.',
    'Environmental groups supported the inland move because it allowed damaged dunes to recover.',
    'The council accepted the fencing proposal but said the notices would be tested for one summer before becoming permanent.',
    'Repairs were less frequent than before, although the council warned that one mild winter was not enough evidence to predict long-term savings.',
  ],
};
const ALLOWED_LABELS = new Set(['TRUE', 'FALSE', 'NOT GIVEN']);
const ABSOLUTE_LANGUAGE =
  /\b(?:all|always|every|never|only|immediately|permanently|throughout)\b/iu;
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

function stableValue(value) {
  if (Array.isArray(value)) return value.map(stableValue);
  if (!isObject(value)) return value;
  return Object.fromEntries(Object.keys(value).sort().map(key => [key, stableValue(value[key])]));
}

const stableJson = value => JSON.stringify(stableValue(value));
const normalizeText = text => String(text ?? '').normalize('NFKC').replace(/\s+/gu, ' ').trim();
const wordCount = text => normalizeText(text).split(' ').filter(Boolean).length;
const sourceSha256 = relativePath => sha256(readFileSync(resolve(ROOT, relativePath)));

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
    const keyLikePatterns = [
      /\b(?:correct|right|stored|gold)\s+(?:answer|response|label|key)\s*(?:is|:|=|→)/iu,
      /\b(?:answer|response|label|key)\s*(?:is|:|=|→)\s*(?:TRUE|FALSE|NOT GIVEN)\b/iu,
      /\btfng[-\w]+\s*(?:is|:|=|→)\s*(?:TRUE|FALSE|NOT GIVEN)\b/iu,
    ];
    if (keyLikePatterns.some(pattern => pattern.test(normalized))) findings.push(path);
    return findings;
  }
  if (!isObject(value)) return findings;
  for (const [key, entry] of Object.entries(value)) {
    findKeyLikePacketValues(entry, `${path}.${key}`, findings);
  }
  return findings;
}

function sourceAssets(catalog) {
  const sets = catalog.IELTS_TFNG_PRACTICE_SETS;
  assert(Array.isArray(sets), 'Falta IELTS_TFNG_PRACTICE_SETS.');
  return sets.map((set, index) => ({
    assetId: `formative:true-false-not-given:${set.id}`,
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
  const counts = Object.fromEntries([...ALLOWED_LABELS].map(label => [label, labels.filter(value => value === label).length]));
  const eligibleQuestions = questions.filter(question => ABSOLUTE_LANGUAGE.test(question.statement));
  const hits = eligibleQuestions.filter(question => answerByQuestionId.get(question.id) === 'FALSE').length;
  return {
    answerCounts: counts,
    maxSameLabelRun: longestRun(labels),
    absoluteLanguageImpliesFalse: {
      definition: 'If a statement contains all, always, every, never, only, immediately, permanently or throughout, answer FALSE; otherwise abstain.',
      eligible: eligibleQuestions.length,
      tiesOrAbstentions: questions.length - eligibleQuestions.length,
      hits,
      conditionalAccuracy: eligibleQuestions.length === 0 ? null : hits / eligibleQuestions.length,
      totalAccuracy: hits / questions.length,
      randomBaseline: 1 / 3,
      wilsonUpper95: wilsonUpper(hits, eligibleQuestions.length),
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
  })));
  const labels = [...ALLOWED_LABELS];
  const constantLabelHeuristics = Object.fromEntries(labels.map(label => [label, {
    hits: questions.filter(question => answerByQuestionId.get(question.id) === label).length,
    total: questions.length,
    accuracy: questions.filter(question => answerByQuestionId.get(question.id) === label).length / questions.length,
  }]));
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
  const lexicalOverlapByLabel = Object.fromEntries(labels.map(label => {
    const overlaps = questions
      .filter(question => answerByQuestionId.get(question.id) === label)
      .map(question => {
        const passageTokens = new Set(normalizeText(question.passage).toLowerCase().match(/[a-z]{3,}/gu) ?? []);
        const statementTokens = [...new Set(normalizeText(question.statement).toLowerCase().match(/[a-z]{3,}/gu) ?? [])];
        return statementTokens.filter(token => passageTokens.has(token)).length / statementTokens.length;
      });
    return [label, {
      questions: overlaps.length,
      averageStatementTokenOverlap: overlaps.reduce((sum, overlap) => sum + overlap, 0) / overlaps.length,
    }];
  }));
  const perSet = assets.map(asset => {
    const setAnswers = new Map(asset.questions.map(question => [question.id, answerByQuestionId.get(question.id)]));
    return {
      assetId: asset.assetId,
      ...cueProfile([asset], setAnswers),
    };
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
    perSet,
    sequenceProfile: { answerSequence, transitions },
  };
}

function buildBlindReviewPacket() {
  const assets = sourceAssets(loadTsModule(CATALOG_PATH));
  const records = EXPECTED_ASSET_IDS.map(assetId => {
    const asset = assets.find(candidate => candidate.assetId === assetId);
    assert(asset, `${assetId}: activo ausente.`);
    return asset;
  });
  const packet = {
    schemaVersion: 'ielts-reading-tfng-blind-review.v1',
    generatedAt: GENERATED_AT,
    reviewScope: 'F0.2b.2 — three formative True/False/Not Given sets',
    reviewerIsolation:
      'Use only this packet for the first pass. Do not open the catalog, registry, validator, route, UI, prior audits or factual-source packet until every answer and evidence decision has been fixed in a separate first-pass file.',
    taskRule:
      'TRUE only when the statement agrees with the passage; FALSE only when the passage contradicts it; NOT GIVEN when the passage neither confirms nor contradicts it. Do not use prior knowledge.',
    instruction:
      'Independently adjudicate all 22 statements from passage evidence. For TRUE/FALSE, quote the shortest decisive span. For NOT GIVEN, identify the closest related zone and state precisely which required fact is absent. Classify ambiguity and IELTS Academic Reading fitness. This is an AI editorial review, not a human signature, rights clearance or publication approval.',
    excludes: [
      'answer keys', 'correctness labels', 'explanations', 'trap labels',
      'declared skills', 'prior reviewer answers', 'student data',
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
  assert(findKeyLikePacketValues(packet).length === 0, 'El packet ciego filtra una clave dentro de un valor textual.');
  assert(findPii(packet).length === 0, 'El packet ciego contiene PII de estudiante/contacto.');
  return packet;
}

function buildFactualSourceReviewPacket() {
  const registry = loadTsModule(REGISTRY_PATH).IELTS_READING_RIGHTS_REGISTRY;
  const evidenceById = new Map(registry.evidence.map(evidence => [evidence.id, evidence]));
  const packet = {
    schemaVersion: 'ielts-reading-tfng-factual-source-review.v1',
    generatedAt: GENERATED_AT,
    reviewScope: 'F0.2b.2 — second-pass factual-source review only',
    instruction:
      'Open only after saving the complete first-pass TFNG adjudication. Review every exact claim span against the candidate sources and classify it supported, oversimplified, unsupported or untraceable. Candidate sources do not prove authorship, license, authorization or verification.',
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
  assertExactKeys(packet,
    ['schemaVersion', 'generatedAt', 'reviewScope', 'instruction', 'records'],
    'factualSourceReview');
  packet.records.forEach((record, recordIndex) => {
    assertExactKeys(record,
      ['assetId', 'claimSpansToReview', 'candidateSources', 'limitation'],
      `factualSourceReview.records[${recordIndex}]`);
    record.candidateSources.forEach((source, sourceIndex) => assertExactKeys(
      source, ['evidenceId', 'label', 'url', 'note'],
      `factualSourceReview.records[${recordIndex}].candidateSources[${sourceIndex}]`));
  });
  assert(findForbiddenKeys(packet).length === 0, 'El packet factual filtra claves o feedback.');
  assert(findKeyLikePacketValues(packet).length === 0, 'El packet factual filtra una clave dentro de un valor textual.');
  assert(findPii(packet).length === 0, 'El packet factual contiene PII.');
  return packet;
}

function readJson(relativePath) {
  const absolutePath = resolve(ROOT, relativePath);
  assert(existsSync(absolutePath), `Falta artefacto: ${relativePath}`);
  return JSON.parse(readFileSync(absolutePath, 'utf8'));
}

function validateFirstPass(firstPass, assets, blindReview) {
  assertExactKeys(firstPass,
    ['schemaVersion', 'reviewerRunId', 'reviewedAt', 'reviewBasis', 'blindPacketSha256', 'records'],
    'expertFirstPass');
  assert(firstPass.schemaVersion === 'ielts-reading-tfng-expert-first-pass.v1', 'Schema de primer pase inválido.');
  assert(firstPass.reviewBasis === 'blind-review-only', 'El primer pase no declara aislamiento ciego.');
  assert(typeof firstPass.reviewerRunId === 'string' && firstPass.reviewerRunId.trim(), 'Falta reviewerRunId.');
  assert(!Number.isNaN(Date.parse(firstPass.reviewedAt)), 'reviewedAt del primer pase no es ISO válido.');
  const expectedPacketBytes = `${JSON.stringify(blindReview, null, 2)}\n`;
  assert(firstPass.blindPacketSha256 === sha256(expectedPacketBytes), 'El primer pase no referencia el packet ciego exacto.');
  assert(Array.isArray(firstPass.records) && firstPass.records.length === assets.length, 'Cobertura del primer pase incompleta.');
  const allowedAmbiguity = new Set(['none', 'minor', 'material']);
  const allowedFitness = new Set(['strong', 'mixed', 'weak']);
  for (const asset of assets) {
    const rows = firstPass.records.filter(record => record.assetId === asset.assetId);
    assert(rows.length === 1, `${asset.assetId}: primer pase faltante o duplicado.`);
    const record = rows[0];
    assertExactKeys(record, ['assetId', 'passageAssessment', 'questions'], `${asset.assetId}:firstPass`);
    assertExactKeys(record.passageAssessment, ['ieltsFitness', 'notes'], `${asset.assetId}:firstPass.passageAssessment`);
    assert(allowedFitness.has(record.passageAssessment.ieltsFitness) &&
      Array.isArray(record.passageAssessment.notes) && record.passageAssessment.notes.length > 0 &&
      record.passageAssessment.notes.every(note => typeof note === 'string' && note.trim()),
    `${asset.assetId}: passageAssessment del primer pase inválido.`);
    assert(Array.isArray(record.questions) && record.questions.length === asset.questions.length,
      `${asset.assetId}: preguntas del primer pase incompletas.`);
    for (const question of asset.questions) {
      const answers = record.questions.filter(answer => answer.questionId === question.id);
      assert(answers.length === 1, `${question.id}: primer pase faltante o duplicado.`);
      const answer = answers[0];
      assertExactKeys(answer,
        ['questionId', 'selectedAnswer', 'evidenceRelation', 'supportingQuote', 'relatedZoneQuote', 'absenceTarget', 'ambiguity', 'reasoning'],
        `${question.id}:firstPass`);
      assert(ALLOWED_LABELS.has(answer.selectedAnswer), `${question.id}: etiqueta de primer pase inválida.`);
      assert(allowedAmbiguity.has(answer.ambiguity), `${question.id}: ambigüedad de primer pase inválida.`);
      assert(typeof answer.relatedZoneQuote === 'string' && answer.relatedZoneQuote.trim() &&
        normalizeText(asset.passage).includes(normalizeText(answer.relatedZoneQuote)),
      `${question.id}: zona relacionada del primer pase inválida.`);
      if (answer.selectedAnswer === 'NOT GIVEN') {
        assert(answer.evidenceRelation === 'not-stated' && answer.supportingQuote === null &&
          typeof answer.absenceTarget === 'string' && answer.absenceTarget.trim(),
        `${question.id}: contrato NOT GIVEN inválido en primer pase.`);
      } else {
        assert(answer.evidenceRelation === (answer.selectedAnswer === 'TRUE' ? 'entails' : 'contradicts') &&
          typeof answer.supportingQuote === 'string' && answer.supportingQuote.trim() &&
          normalizeText(asset.passage).includes(normalizeText(answer.supportingQuote)) &&
          answer.absenceTarget === null,
        `${question.id}: contrato TRUE/FALSE inválido en primer pase.`);
      }
      assert(typeof answer.reasoning === 'string' && answer.reasoning.trim(), `${question.id}: razonamiento de primer pase vacío.`);
    }
  }
  return {
    reviewerRunId: firstPass.reviewerRunId,
    reviewedAt: firstPass.reviewedAt,
    blindPacketSha256: firstPass.blindPacketSha256,
    firstPassSha256: sourceSha256(FIRST_PASS_PATH),
  };
}

function validateExpertVerdict(verdict, firstPass, firstPassTrace, assets, factualPacket) {
  assert(verdict.schemaVersion === 'ielts-reading-tfng-expert-verdict.v1', 'Schema experto inválido.');
  assertExactKeys(verdict,
    ['schemaVersion', 'reviewer', 'records', 'recommendation', 'blockers'],
    'expertVerdict');
  assertExactKeys(verdict.reviewer,
    ['humanSignature', 'sourceContext', 'reviewSequence', 'reviewerRunId', 'reviewedAt', 'blindPacketSha256', 'firstPassSha256', 'openedEvidenceIds', 'directSourceReview', 'notes'],
    'expertVerdict.reviewer');
  assert(verdict.reviewer?.humanSignature === false, 'El revisor IA no puede simular firma humana.');
  assert(verdict.reviewer?.sourceContext === 'two-pass-blind-then-factual-sources', 'No se declaró revisión en dos pases.');
  assert(JSON.stringify(verdict.reviewer?.reviewSequence) === JSON.stringify(['blind-review', 'factual-source-review']),
    'Secuencia experta inválida.');
  assert(verdict.reviewer.reviewerRunId === firstPassTrace.reviewerRunId, 'El verdict no corresponde al mismo reviewerRunId.');
  assert(verdict.reviewer.blindPacketSha256 === firstPassTrace.blindPacketSha256, 'El verdict no referencia el packet ciego exacto.');
  assert(verdict.reviewer.firstPassSha256 === firstPassTrace.firstPassSha256, 'El verdict no referencia el primer pase persistido exacto.');
  assert(!Number.isNaN(Date.parse(verdict.reviewer.reviewedAt)) &&
    Date.parse(verdict.reviewer.reviewedAt) >= Date.parse(firstPassTrace.reviewedAt),
  'La secuencia temporal primer pase → segundo pase es inválida.');
  assert(Array.isArray(verdict.reviewer.notes) && verdict.reviewer.notes.length > 0 &&
    verdict.reviewer.notes.every(note => typeof note === 'string' && note.trim()),
  'Faltan notas de proceso del revisor.');
  const expectedOpenedEvidenceIds = [...new Set(
    factualPacket.records.flatMap(record => record.candidateSources.map(source => source.evidenceId)),
  )].sort();
  assert(verdict.reviewer.directSourceReview === true &&
    Array.isArray(verdict.reviewer.openedEvidenceIds) &&
    new Set(verdict.reviewer.openedEvidenceIds).size === verdict.reviewer.openedEvidenceIds.length &&
    JSON.stringify([...verdict.reviewer.openedEvidenceIds].sort()) === JSON.stringify(expectedOpenedEvidenceIds),
  'La revisión factual directa no cubre exactamente las ocho fuentes candidatas.');
  assert(Array.isArray(verdict.records) && verdict.records.length === assets.length,
    'Cobertura experta incompleta.');
  assert(verdict.recommendation === 'quarantine', 'El revisor IA no puede sacar estos activos de cuarentena.');
  assert(Array.isArray(verdict.blockers) && verdict.blockers.length > 0 && verdict.blockers.every(item => typeof item === 'string' && item.trim()),
    'Faltan bloqueantes expertos explícitos.');

  const allowedAmbiguity = new Set(['none', 'minor', 'material']);
  const allowedFitness = new Set(['strong', 'mixed', 'weak']);
  const allowedRisk = new Set(['low', 'medium', 'high']);
  const allowedAssessments = new Set(['supported', 'oversimplified', 'unsupported', 'untraceable']);
  const sourceIdsByAsset = new Map(factualPacket.records.map(record => [
    record.assetId, new Set(record.candidateSources.map(source => source.evidenceId)),
  ]));
  const comparisons = [];
  const factualClaims = [];
  for (const asset of assets) {
    const rows = verdict.records.filter(record => record.assetId === asset.assetId);
    assert(rows.length === 1, `${asset.assetId}: verdict faltante o duplicado.`);
    const record = rows[0];
    assertExactKeys(record, ['assetId', 'passageAssessment', 'questions', 'factualClaims'], `${asset.assetId}:expertVerdict`);
    assertExactKeys(record.passageAssessment,
      ['ieltsFitness', 'factualRisk', 'representationRisk', 'priorKnowledgeRisk', 'irrelevantLoadRisk', 'notes'],
      `${asset.assetId}:expertVerdict.passageAssessment`);
    assert(isObject(record.passageAssessment) && allowedFitness.has(record.passageAssessment.ieltsFitness) &&
      allowedRisk.has(record.passageAssessment.factualRisk) &&
      allowedRisk.has(record.passageAssessment.representationRisk) &&
      allowedRisk.has(record.passageAssessment.priorKnowledgeRisk) &&
      allowedRisk.has(record.passageAssessment.irrelevantLoadRisk) && Array.isArray(record.passageAssessment.notes) &&
      record.passageAssessment.notes.length > 0 && record.passageAssessment.notes.every(note => typeof note === 'string' && note.trim()),
    `${asset.assetId}: passageAssessment inválido.`);
    const firstPassRecord = firstPass.records.find(candidate => candidate.assetId === asset.assetId);
    assert(record.passageAssessment.ieltsFitness === firstPassRecord.passageAssessment.ieltsFitness,
      `${asset.assetId}: IELTS fitness cambió después de abrir fuentes.`);
    assert(Array.isArray(record.questions) && record.questions.length === asset.questions.length,
      `${asset.assetId}: cobertura de preguntas incompleta.`);
    for (const question of asset.questions) {
      const answers = record.questions.filter(row => row.questionId === question.id);
      assert(answers.length === 1, `${question.id}: adjudicación faltante o duplicada.`);
      const answer = answers[0];
      assertExactKeys(answer,
        ['questionId', 'selectedAnswer', 'evidenceRelation', 'supportingQuote', 'relatedZoneQuote', 'absenceTarget', 'ambiguity', 'reasoning'],
        `${question.id}:expertVerdict`);
      const firstPassAnswer = firstPassRecord.questions.find(candidate => candidate.questionId === question.id);
      assert(stableJson(answer) === stableJson(firstPassAnswer), `${question.id}: la decisión cambió después de abrir fuentes.`);
      assert(ALLOWED_LABELS.has(answer.selectedAnswer), `${question.id}: etiqueta experta inválida.`);
      assert(['entails', 'contradicts', 'not-stated'].includes(answer.evidenceRelation),
        `${question.id}: relación de evidencia inválida.`);
      assert(typeof answer.relatedZoneQuote === 'string' && answer.relatedZoneQuote.trim() &&
        normalizeText(asset.passage).includes(normalizeText(answer.relatedZoneQuote)),
      `${question.id}: la zona relacionada no aparece en el pasaje.`);
      if (answer.selectedAnswer === 'NOT GIVEN') {
        assert(answer.evidenceRelation === 'not-stated', `${question.id}: NOT GIVEN requiere not-stated.`);
        assert(answer.supportingQuote === null, `${question.id}: NOT GIVEN no admite una cita que pruebe la respuesta.`);
        assert(typeof answer.absenceTarget === 'string' && answer.absenceTarget.trim(),
          `${question.id}: NOT GIVEN requiere declarar el dato ausente.`);
      } else {
        assert(answer.evidenceRelation === (answer.selectedAnswer === 'TRUE' ? 'entails' : 'contradicts'),
          `${question.id}: relación incompatible con ${answer.selectedAnswer}.`);
        assert(typeof answer.supportingQuote === 'string' && answer.supportingQuote.trim() &&
          normalizeText(asset.passage).includes(normalizeText(answer.supportingQuote)),
        `${question.id}: cita decisiva ausente del pasaje.`);
        assert(answer.absenceTarget === null, `${question.id}: TRUE/FALSE no debe declarar ausencia.`);
      }
      assert(allowedAmbiguity.has(answer.ambiguity), `${question.id}: ambigüedad inválida.`);
      assert(typeof answer.reasoning === 'string' && answer.reasoning.trim(), `${question.id}: razonamiento vacío.`);
      comparisons.push({
        assetId: asset.assetId,
        questionId: question.id,
        expertAnswer: answer.selectedAnswer,
        matchesStoredKey: answer.selectedAnswer === question.answer,
        ambiguity: answer.ambiguity,
      });
    }

    const requiredClaims = REQUIRED_FACTUAL_CLAIM_SPANS[asset.assetId];
    assert(Array.isArray(record.factualClaims) && record.factualClaims.length === requiredClaims.length,
      `${asset.assetId}: cobertura factual incompleta.`);
    const normalizedClaims = record.factualClaims.map(claim => normalizeText(claim.claim));
    assert(new Set(normalizedClaims).size === normalizedClaims.length &&
      JSON.stringify([...normalizedClaims].sort()) === JSON.stringify(requiredClaims.map(normalizeText).sort()),
    `${asset.assetId}: los claims factuales no cubren exactamente los spans requeridos.`);
    const allowedSourceIds = sourceIdsByAsset.get(asset.assetId);
    for (const claim of record.factualClaims) {
      assertExactKeys(claim,
        ['claim', 'assessment', 'evidenceIds', 'sourceFindings', 'note'],
        `${asset.assetId}:factualClaim`);
      assert(normalizeText(asset.passage).includes(normalizeText(claim.claim)), `${asset.assetId}: claim ajeno al pasaje.`);
      assert(allowedAssessments.has(claim.assessment), `${asset.assetId}: assessment factual inválido.`);
      assert(Array.isArray(claim.evidenceIds) && new Set(claim.evidenceIds).size === claim.evidenceIds.length &&
        claim.evidenceIds.every(evidenceId => allowedSourceIds.has(evidenceId)),
      `${asset.assetId}: evidencia factual ajena, duplicada o malformada.`);
      if (claim.assessment !== 'untraceable') {
        assert(claim.evidenceIds.length > 0, `${asset.assetId}: claim evaluado sin fuente candidata.`);
      }
      assert(Array.isArray(claim.sourceFindings) &&
        claim.sourceFindings.length === claim.evidenceIds.length &&
        new Set(claim.sourceFindings.map(finding => finding.evidenceId)).size === claim.sourceFindings.length,
      `${asset.assetId}: sourceFindings no corresponde 1:1 con evidenceIds.`);
      claim.sourceFindings.forEach((finding, findingIndex) => {
        assertExactKeys(finding, ['evidenceId', 'locator', 'evidenceSummary'],
          `${asset.assetId}:sourceFindings[${findingIndex}]`);
        assert(claim.evidenceIds.includes(finding.evidenceId) &&
          typeof finding.locator === 'string' && finding.locator.trim() &&
          typeof finding.evidenceSummary === 'string' && finding.evidenceSummary.trim(),
        `${asset.assetId}: sourceFinding inválido.`);
      });
      assert(typeof claim.note === 'string' && claim.note.trim(), `${asset.assetId}: falta nota factual.`);
      factualClaims.push({ assetId: asset.assetId, assessment: claim.assessment, evidenceCount: claim.evidenceIds.length });
    }
  }
  return { comparisons, factualClaims };
}

function validateStudentWalkthrough(walkthrough, assets) {
  assertExactKeys(walkthrough, ['schemaVersion', 'reviewer', 'records'], 'studentWalkthrough');
  assert(walkthrough.schemaVersion === 'ielts-reading-tfng-student-walkthrough.v1', 'Schema de walkthrough inválido.');
  assertExactKeys(walkthrough.reviewer, ['humanSignature', 'sourceContext', 'notes'], 'studentWalkthrough.reviewer');
  assert(walkthrough.reviewer?.humanSignature === false, 'El walkthrough IA no puede simular firma humana.');
  assert(walkthrough.reviewer?.sourceContext === 'blind-review-packet-only', 'El walkthrough no fue ciego.');
  assert(Array.isArray(walkthrough.reviewer.notes) && walkthrough.reviewer.notes.length > 0 &&
    walkthrough.reviewer.notes.every(note => typeof note === 'string' && note.trim()),
  'Faltan notas del walkthrough.');
  assert(findForbiddenKeys(walkthrough).length === 0, 'El walkthrough filtra claves, feedback o skills.');
  assert(findPii(walkthrough).length === 0, 'El walkthrough contiene PII de estudiante/contacto.');
  assert(Array.isArray(walkthrough.records) && walkthrough.records.length === assets.length,
    'Cobertura del walkthrough incompleta.');
  let questionsCovered = 0;
  for (const asset of assets) {
    const rows = walkthrough.records.filter(record => record.assetId === asset.assetId);
    assert(rows.length === 1, `${asset.assetId}: walkthrough faltante o duplicado.`);
    const row = rows[0];
    assertExactKeys(row,
      ['assetId', 'likelyComprehensionBarriers', 'likelyShortcutBehaviors', 'learningValue', 'nextAction', 'questionWalkthrough'],
      `${asset.assetId}:studentWalkthrough`);
    for (const field of ['likelyComprehensionBarriers', 'likelyShortcutBehaviors', 'learningValue', 'nextAction']) {
      assert(Array.isArray(row[field]) && row[field].length > 0 &&
        row[field].every(item => typeof item === 'string' && item.trim()) &&
        new Set(row[field].map(normalizeText)).size === row[field].length,
      `${asset.assetId}: ${field} vacío o duplicado.`);
    }
    assert(Array.isArray(row.questionWalkthrough) && row.questionWalkthrough.length === asset.questions.length,
      `${asset.assetId}: walkthrough por pregunta incompleto.`);
    for (const question of asset.questions) {
      const entries = row.questionWalkthrough.filter(entry => entry.questionId === question.id);
      assert(entries.length === 1, `${question.id}: walkthrough faltante o duplicado.`);
      const entry = entries[0];
      assertExactKeys(entry,
        ['questionId', 'likelyMisread', 'evidenceHunt', 'decisionRule', 'repairAction'],
        `${question.id}:studentWalkthrough`);
      for (const field of ['likelyMisread', 'evidenceHunt', 'decisionRule', 'repairAction']) {
        assert(typeof entry[field] === 'string' && entry[field].trim(), `${question.id}: ${field} vacío.`);
      }
      assert(!('selectedAnswer' in entry) && !('answer' in entry), `${question.id}: el walkthrough no debe asignar clave.`);
      questionsCovered += 1;
    }
  }
  return { passagesCovered: assets.length, questionsCovered };
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
  const assetIds = assets.map(asset => asset.assetId);
  const questionIds = assets.flatMap(asset => asset.questions.map(question => question.id));
  const registryAssetIds = registry.entries.map(entry => entry.assetId);
  const evidenceIds = registry.evidence.map(evidence => evidence.id);
  const evidenceById = new Map(registry.evidence.map(evidence => [evidence.id, evidence]));

  assert(JSON.stringify(assetIds) === JSON.stringify(EXPECTED_ASSET_IDS), 'El catálogo TFNG cambió activos u orden.');
  assert(JSON.stringify(assets.map(asset => asset.id)) === JSON.stringify(EXPECTED_SET_IDS), 'Los set IDs TFNG cambiaron.');
  assert(questionIds.length === 22 && new Set(questionIds).size === 22, 'Se esperaban 22 questionId únicos.');
  assert(new Set(registryAssetIds).size === registryAssetIds.length, 'Hay assetId duplicados en el registry.');
  assert(new Set(evidenceIds).size === evidenceIds.length, 'Hay evidenceId duplicados.');
  assert(registry.schemaVersion === contract.IELTS_READING_RIGHTS_REGISTRY_SCHEMA_VERSION,
    'Registry y contrato no comparten schemaVersion.');

  assert(baseline.schemaVersion === 'ielts-reading-tfng-rights-baseline.v1', 'Schema de baseline inválido.');
  assert(JSON.stringify(baseline.assets.map(asset => asset.assetId)) === JSON.stringify(EXPECTED_ASSET_IDS),
    'El baseline no cubre exactamente los tres activos.');
  assert(baseline.scope.questions === 22 && baseline.scope.passages === 3, 'Scope baseline inválido.');
  const baselineSourceByPath = new Map(baseline.sources.map(source => [source.path, source.sha256]));
  for (const sourcePath of [CATALOG_PATH, ROUTE_PATH, ENGINE_PATH, BANK_PATH]) {
    assert(baselineSourceByPath.get(sourcePath) === sourceSha256(sourcePath),
      `${sourcePath}: cambió desde el baseline; UI/Playwright ya no pueden quedar fuera de alcance.`);
  }

  const unitRecords = EXPECTED_ASSET_IDS.map(assetId => {
    const rows = registry.entries.filter(entry => entry.assetId === assetId);
    assert(rows.length === 1, `${assetId}: se esperaba un registro.`);
    return rows[0];
  });
  const candidateEvidenceIds = [...new Set(unitRecords.flatMap(record => record.factualSourceResearch.sourceEvidenceIds))].sort();
  assertExactKeys(sourceAvailability,
    ['schemaVersion', 'checkedAt', 'method', 'sources', 'interpretation'],
    'sourceAvailability');
  assert(sourceAvailability.schemaVersion === 'ielts-reading-tfng-source-availability.v1' &&
    sourceAvailability.checkedAt === '2026-08-09' &&
    sourceAvailability.method === 'curl 8.x -sL with requested URL, final URL, HTTP status, content type and response-body SHA-256 recorded on the stated date' &&
    sourceAvailability.interpretation === 'Availability identifies sources that can be reviewed. It does not establish authorship, license, authorization, exact-case identity, claim-level accuracy or human approval.',
  'Contrato o interpretación de source-availability inválidos.');
  const availabilityIds = sourceAvailability.sources.map(source => source.evidenceId).sort();
  assert(sourceAvailability.sources.length === 8 && new Set(availabilityIds).size === 8 &&
    JSON.stringify(availabilityIds) === JSON.stringify(candidateEvidenceIds),
  'Source availability no cubre exactamente las ocho fuentes candidatas.');
  assert(sourceAvailability.sources.every(source => {
    const evidence = evidenceById.get(source.evidenceId);
    assertExactKeys(source,
      ['evidenceId', 'requestedUrl', 'retrievedAt', 'httpStatus', 'finalUrl', 'redirected', 'contentType', 'bodySha256'],
      `${source.evidenceId}:sourceAvailability`);
    return evidence?.kind === 'factual-source' && source.requestedUrl === evidence.url &&
      !Number.isNaN(Date.parse(source.retrievedAt)) && Number.isInteger(source.httpStatus) &&
      source.httpStatus >= 200 && source.httpStatus < 400 && typeof source.finalUrl === 'string' &&
      source.finalUrl.startsWith('https://') && source.redirected === (source.finalUrl !== source.requestedUrl) &&
      typeof source.contentType === 'string' && source.contentType.startsWith('text/html') &&
      /^[a-f0-9]{64}$/u.test(source.bodySha256);
  }), 'Source availability contiene kind, status o URL inválidos.');

  assertExactKeys(provenanceSearch,
    ['schemaVersion', 'searchedAt', 'method', 'searchSurface', 'queries', 'interpretation'],
    'provenanceSearch');
  assert(provenanceSearch.schemaVersion === 'ielts-reading-tfng-provenance-search.v1' &&
    !Number.isNaN(Date.parse(provenanceSearch.searchedAt)) &&
    provenanceSearch.method.includes('Directed web search') &&
    provenanceSearch.searchSurface.includes('result ranking is dynamic') &&
    provenanceSearch.interpretation.includes('non-exhaustive') &&
    provenanceSearch.interpretation.includes('does not prove originality'),
  'Contrato o límites de provenance-search inválidos.');
  assert(Array.isArray(provenanceSearch.queries) && provenanceSearch.queries.length === 3 &&
    JSON.stringify(provenanceSearch.queries.map(row => row.assetId)) === JSON.stringify(EXPECTED_ASSET_IDS),
  'Provenance search no cubre exactamente los tres activos.');
  provenanceSearch.queries.forEach((query, queryIndex) => {
    assertExactKeys(query, ['assetId', 'query', 'resultsReviewed', 'outcome'], `provenanceSearch.queries[${queryIndex}]`);
    assert(typeof query.query === 'string' && query.query.trim() &&
      query.outcome === 'no-exact-match-in-reviewed-results' &&
      Array.isArray(query.resultsReviewed) && query.resultsReviewed.length >= 2,
    `${query.assetId}: búsqueda dirigida incompleta.`);
    query.resultsReviewed.forEach((result, resultIndex) => {
      assertExactKeys(result, ['title', 'url', 'exactMatch', 'relevanceNote'],
        `${query.assetId}:resultsReviewed[${resultIndex}]`);
      assert(typeof result.title === 'string' && result.title.trim() &&
        typeof result.url === 'string' && result.url.startsWith('https://') &&
        result.exactMatch === false && typeof result.relevanceNote === 'string' && result.relevanceNote.trim(),
      `${query.assetId}: resultado de procedencia inválido.`);
    });
  });

  assertExactKeys(unitChangeManifest,
    ['schemaVersion', 'unit', 'recordedAt', 'learnerFacingChangeAuthorized', 'learnerFacingBaselinePaths', 'unitSourceFiles', 'unitOutputDirectory', 'interpretation'],
    'unitChangeManifest');
  assert(unitChangeManifest.schemaVersion === 'ielts-reading-tfng-unit-change-manifest.v1' &&
    unitChangeManifest.unit === 'F0.2b.2' && !Number.isNaN(Date.parse(unitChangeManifest.recordedAt)) &&
    unitChangeManifest.learnerFacingChangeAuthorized === false &&
    JSON.stringify(unitChangeManifest.learnerFacingBaselinePaths) ===
      JSON.stringify([CATALOG_PATH, ROUTE_PATH, ENGINE_PATH, BANK_PATH]) &&
    JSON.stringify(unitChangeManifest.unitSourceFiles) ===
      JSON.stringify([REGISTRY_PATH, VALIDATOR_PATH, TEST_PATH, LOOP_DOC_PATH]) &&
    unitChangeManifest.unitOutputDirectory === OUTPUT_DIRECTORY &&
    unitChangeManifest.interpretation.includes('does not assert that the entire repository'),
  'Manifest de cambios de unidad inválido o sobreafirmado.');
  const runtimeAuditReferences = [
    ...sourceFilesUnder('src/app'),
    ...sourceFilesUnder('src/components'),
  ].filter(absolutePath => {
    const text = readFileSync(absolutePath, 'utf8');
    return text.includes('ielts-reading-rights-registry') || text.includes('academic-reading-rights');
  });
  assert(runtimeAuditReferences.length === 0,
    `Una superficie runtime importa el expediente de auditoría: ${runtimeAuditReferences.join(', ')}`);

  const baselineById = new Map(baseline.assets.map(asset => [asset.assetId, asset]));
  const decisions = EXPECTED_ASSET_IDS.map(assetId => {
    const asset = assets.find(candidate => candidate.assetId === assetId);
    const record = unitRecords.find(candidate => candidate.assetId === assetId);
    const pinned = baselineById.get(assetId);
    assert(record.sourceObjectSha256 === asset.sourceObjectSha256 && pinned.sourceObjectSha256 === asset.sourceObjectSha256,
      `${assetId}: source object drift.`);
    assert(record.passageSha256 === asset.passageSha256 && pinned.passageSha256 === asset.passageSha256,
      `${assetId}: passage drift.`);
    referencedEvidenceIds(record).forEach(evidenceId => assert(evidenceById.has(evidenceId), `${assetId}: evidencia inexistente ${evidenceId}.`));
    assert(record.factualReviewRequirement.policy === 'required', `${assetId}: factual review debe ser required.`);
    assert(record.factualSourceResearch.status === 'candidate-sources-collected', `${assetId}: faltan fuentes candidatas.`);
    assert(record.factualSourceResearch.sourceEvidenceIds.length >= 2 &&
      new Set(record.factualSourceResearch.sourceEvidenceIds).size === record.factualSourceResearch.sourceEvidenceIds.length &&
      record.factualSourceResearch.sourceEvidenceIds.every(evidenceId => evidenceById.get(evidenceId)?.kind === 'factual-source'),
    `${assetId}: fuentes candidatas inválidas.`);
    assert(record.factualReview.status === 'not-reviewed', `${assetId}: se simuló factualización.`);
    assert(record.humanReview.status === 'pending', `${assetId}: se simuló revisión humana.`);
    const decision = contract.assessIeltsReadingRights(registry, asset);
    assert(decision.disposition === 'quarantine' && !decision.eligibleForPublicationPipeline,
      `${assetId}: el activo debe permanecer en cuarentena.`);
    assert(!decision.reasonCodes.some(code => ['registry-contract-invalid', 'content-hash-mismatch', 'factual-source-research-invalid'].includes(code)),
      `${assetId}: la cuarentena oculta un registro inválido: ${decision.reasonCodes.join(', ')}.`);
    return {
      assetId,
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

  const routeText = readFileSync(resolve(ROOT, ROUTE_PATH), 'utf8');
  const visibleClaims = ['Practica con sets originales de WeLearn', 'Banco original WeLearn', 'sin copiar preguntas oficiales']
    .map(text => ({ text, observed: routeText.includes(text) }));
  assert(visibleClaims.every(claim => claim.observed), 'Cambió el claim visible de originalidad.');
  const loopDocText = readFileSync(resolve(ROOT, LOOP_DOC_PATH), 'utf8');
  const expectedClosedBoardRow =
    '| 0 | 　　　 ↳ F0.2b.2 True/False/Not Given | ✅ | ✅ | ✅ | ✅ | ✅ | ➖ | ➖ |';
  assert(loopDocText.includes(expectedClosedBoardRow), 'El tablero no refleja el cierre auditado de F0.2b.2.');
  assert(!loopDocText.includes('No se inició F0.2b.2'), 'La evidencia conserva una contradicción: F0.2b.2 figura como no iniciada.');
  assert(loopDocText.includes('Siguiente subunidad, sin iniciarla: `F0.2b.3 Yes/No/Not Given`.'),
    'El loop no se detuvo explícitamente antes de F0.2b.3.');

  const firstPassTrace = validateFirstPass(firstPass, assets, blindReview);
  const expertValidation = validateExpertVerdict(
    expertVerdict,
    firstPass,
    firstPassTrace,
    assets,
    factualSourceReview,
  );
  const studentSummary = validateStudentWalkthrough(studentWalkthrough, assets);
  const storedAnswerById = new Map(assets.flatMap(asset => asset.questions.map(question => [question.id, question.answer])));
  const expertAnswerById = new Map(expertValidation.comparisons.map(row => [row.questionId, row.expertAnswer]));
  const storedBias = structuralBiasProfile(assets, storedAnswerById);
  const expertBias = structuralBiasProfile(assets, expertAnswerById);
  assert(JSON.stringify(storedBias.answerCounts) === JSON.stringify(baseline.structuralRisk.answerCounts),
    'La distribución almacenada cambió desde el baseline.');
  assert(storedBias.maxSameLabelRun === baseline.structuralRisk.maxSameLabelRun, 'La secuencia de etiquetas cambió.');
  assert(storedBias.absoluteLanguageImpliesFalse.eligible === 10 &&
    storedBias.absoluteLanguageImpliesFalse.hits === 8, 'Cambió la señal de lenguaje absoluto.');
  const conflicts = expertValidation.comparisons.filter(row => !row.matchesStoredKey).map(row => row.questionId);
  const materialAmbiguities = expertValidation.comparisons.filter(row => row.ambiguity === 'material').map(row => row.questionId);
  const factualAssessmentCounts = Object.fromEntries(
    ['supported', 'oversimplified', 'unsupported', 'untraceable'].map(assessment => [
      assessment, expertValidation.factualClaims.filter(claim => claim.assessment === assessment).length,
    ]),
  );
  const negativeControl = contract.assessIeltsReadingRights(registry, { ...assets[0], sourceObjectSha256: '0'.repeat(64) });
  assert(negativeControl.reasonCodes.includes('content-hash-mismatch'), 'Una mutación de contenido no falla cerrada.');
  const keyLikeValueLeakFindings = findKeyLikePacketValues({
    instruction: 'Correct answer for tfng-urban-trees-01 is FALSE',
  });
  assert(keyLikeValueLeakFindings.length === 1, 'El control adversarial no detecta una clave filtrada dentro de un valor.');
  const allSourcePaths = [
    CATALOG_PATH, ROUTE_PATH, ENGINE_PATH, BANK_PATH, CONTRACT_PATH, REGISTRY_PATH,
    VALIDATOR_PATH, TEST_PATH, LOOP_DOC_PATH, BASELINE_PATH, SOURCE_AVAILABILITY_PATH,
    PROVENANCE_SEARCH_PATH, UNIT_CHANGE_MANIFEST_PATH,
    BLIND_REVIEW_PATH, FACTUAL_SOURCE_REVIEW_PATH, EXPERT_VERDICT_PATH,
    FIRST_PASS_PATH, STUDENT_WALKTHROUGH_PATH,
  ];

  const validation = {
    schemaVersion: 'ielts-reading-tfng-rights-validation.v1',
    generatedAt: GENERATED_AT,
    unit: 'F0.2b.2 — expediente de tres sets formativos True/False/Not Given',
    status: 'pass',
    passMeaning:
      'PASS certifica cobertura, identidad, cuarentena, revisión ciega y detección de riesgos. NO aprueba claves, factualidad, derechos, publicación, UI ni eficacia pedagógica en estudiantes reales.',
    scope: {
      passages: assets.length,
      questions: questionIds.length,
      registryEntriesInUnit: decisions.length,
      registryEntriesTotal: registry.entries.length,
      coveredAssetIds: EXPECTED_ASSET_IDS,
      excludedAssetIds: ['legacy:reading-hub:amazon-tfng'],
      parentF02bRemainsOpen: true,
      scopedLearnerSourcesChangedSinceBaseline: false,
    },
    checks: {
      exactCoverage: decisions.length === 3 && questionIds.length === 22,
      stableUniqueIds: new Set(assetIds).size === 3 && new Set(questionIds).size === 22,
      sourceHashesMatchBaseline: true,
      registryReferencesResolve: true,
      factualSourceAvailabilityRecorded: sourceAvailability.sources.length === 8,
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
      expertFirstPassPersistedAndPinned:
        expertVerdict.reviewer.firstPassSha256 === sourceSha256(FIRST_PASS_PATH),
      notGivenEvidenceContractEnforced: expertValidation.comparisons.length === 22,
      studentWalkthroughCoverageComplete: studentSummary.passagesCovered === 3 && studentSummary.questionsCovered === 22,
      fixedLabelsNotPermuted: true,
      statisticalCertificationWithheld: assets.flatMap(asset => asset.questions).length < 100,
      contentCertificationBlocked: conflicts.length > 0 || storedBias.absoluteLanguageImpliesFalse.conditionalAccuracy > 1 / 3 + 0.1,
      contentMutationDenied: negativeControl.disposition === 'quarantine',
      scopedLearnerSourcesUnchanged: true,
      auditRegistryAbsentFromLearnerRuntimeImports: runtimeAuditReferences.length === 0,
      provenanceSearchLedgerComplete: provenanceSearch.queries.length === 3,
      antiBiasMultidimensionalCoverage:
        Object.keys(storedBias.constantLabelHeuristics).length === 3 &&
        Object.keys(storedBias.statementLengthByLabel).length === 3 &&
        Object.keys(storedBias.lexicalOverlapByLabel).length === 3 &&
        storedBias.perSet.length === 3 &&
        expertVerdict.records.every(record =>
          ['low', 'medium', 'high'].includes(record.passageAssessment.representationRisk) &&
          ['low', 'medium', 'high'].includes(record.passageAssessment.priorKnowledgeRisk) &&
          ['low', 'medium', 'high'].includes(record.passageAssessment.irrelevantLoadRisk)),
      keyLikeValueLeakageMutationDetected: keyLikeValueLeakFindings.length === 1,
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
      optionPermutationReason: 'TRUE/FALSE/NOT GIVEN are fixed IELTS response labels; permuting label identity would create a non-standard task. Bias is audited across items and semantically.',
      storedKeyProfile: storedBias,
      independentExpertProfile: expertBias,
      qualitativeCoverage: {
        perspectiveAndRepresentation: expertVerdict.records.every(record =>
          ['low', 'medium', 'high'].includes(record.passageAssessment.representationRisk)),
        priorKnowledge: expertVerdict.records.every(record =>
          ['low', 'medium', 'high'].includes(record.passageAssessment.priorKnowledgeRisk)),
        irrelevantCognitiveLoad: expertVerdict.records.every(record =>
          ['low', 'medium', 'high'].includes(record.passageAssessment.irrelevantLoadRisk)),
        visibleFocusLeak: 'removed-from-blind-packet',
      },
      sampleAdequacy: {
        certificationThreshold: 100,
        observedQuestions: 22,
        eligibleForStatisticalCertification: false,
        conclusion: 'The sample is sufficient to detect a severe cue risk, not to certify balanced content statistically.',
      },
      statisticalCertification: 'withheld-n-below-100',
      contentCertification: 'blocked-key-and-shortcut-review-required',
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
        'Within F0.2b.2, the catalog, TFNG route, ObjectivePracticeEngine and ObjectivePracticeSetBank remain exactly pinned by baseline hash, and no app/component source imports the audit registry/contract. This scoped claim does not assert that the entire repository or all shared UI are globally unchanged.',
    },
    processLimitations: {
      firstPassTrace:
        'The persisted hash detects ordinary mutation but is not an external append-only witness; a coordinated post-hoc rewrite of all local files cannot be ruled out cryptographically.',
      directSourceReview:
        'Direct-source review is declared by an AI reviewer and cross-checked for eight IDs plus non-empty locators; it is not automatic proof of browsing, a human signature or factual verification.',
      factualLocator:
        'One EPA finding follows a benefits subpage linked from the registered candidate URL; the relationship is documented but not represented as an exact same-page excerpt.',
    },
    negativeControl: {
      contentHashMismatch: negativeControl,
      keyLikeValueLeakFindings,
    },
    sources: allSourcePaths.filter(path => existsSync(resolve(ROOT, path))).map(path => ({ path, sha256: sourceSha256(path) })),
  };
  assert(Object.values(validation.checks).every(Boolean), 'Falló un gate de F0.2b.2.');
  return { validation, blindReview, factualSourceReview };
}

function writeJson(relativePath, value) {
  const absolutePath = resolve(ROOT, relativePath);
  mkdirSync(dirname(absolutePath), { recursive: true });
  writeFileSync(absolutePath, `${JSON.stringify(value, null, 2)}\n`);
}

function checkJson(relativePath, value) {
  const absolutePath = resolve(ROOT, relativePath);
  assert(existsSync(absolutePath), `Falta artefacto generado: ${relativePath}`);
  const expected = `${JSON.stringify(value, null, 2)}\n`;
  assert(readFileSync(absolutePath, 'utf8') === expected, `Artefacto desactualizado: ${relativePath}`);
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
    if (mode === 'write') {
      writeJson(VALIDATION_PATH, artifacts.validation);
      writeJson(BLIND_REVIEW_PATH, artifacts.blindReview);
      writeJson(FACTUAL_SOURCE_REVIEW_PATH, artifacts.factualSourceReview);
    } else if (mode === 'check') {
      checkJson(VALIDATION_PATH, artifacts.validation);
      checkJson(BLIND_REVIEW_PATH, artifacts.blindReview);
      checkJson(FACTUAL_SOURCE_REVIEW_PATH, artifacts.factualSourceReview);
    }
    process.stdout.write(`${JSON.stringify({
      status: artifacts.validation.status,
      mode,
      passages: artifacts.validation.scope.passages,
      questions: artifacts.validation.scope.questions,
      quarantined: artifacts.validation.decisions.filter(decision => decision.disposition === 'quarantine').length,
      checks: artifacts.validation.checks,
    }, null, 2)}\n`);
  }
}
