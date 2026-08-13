#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
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
  'src/app/(site)/practica/ielts/reading/tipos-de-preguntas/multiple-choice/page.tsx';
const ENGINE_PATH = 'src/components/exam-practice/MultipleChoicePracticeEngine.tsx';
const CONTRACT_PATH = 'src/lib/ielts/academic-reading-rights.ts';
const REGISTRY_PATH = 'src/data/practica-exams/ielts-reading-rights-registry.ts';
const VALIDATOR_PATH = 'scripts/check-ielts-reading-multiple-choice-rights.mjs';
const TEST_PATH = 'tests/ielts-reading-multiple-choice-rights.test.mjs';
const OUTPUT_DIRECTORY =
  'output/audits/ielts-reading-rights-multiple-choice-2026-08-09';
const BASELINE_PATH = `${OUTPUT_DIRECTORY}/baseline.json`;
const SOURCE_AVAILABILITY_PATH = `${OUTPUT_DIRECTORY}/source-availability.json`;
const BLIND_REVIEW_PATH = `${OUTPUT_DIRECTORY}/blind-review.json`;
const FACTUAL_SOURCE_REVIEW_PATH = `${OUTPUT_DIRECTORY}/factual-source-review.json`;
const EXPERT_VERDICT_PATH = `${OUTPUT_DIRECTORY}/expert-verdict.json`;
const STUDENT_WALKTHROUGH_PATH = `${OUTPUT_DIRECTORY}/student-walkthrough.json`;
const VALIDATION_PATH = `${OUTPUT_DIRECTORY}/validation.json`;
const EXPECTED_ASSET_IDS = [
  'formative:multiple-choice:mc-sleep-learning',
  'formative:multiple-choice:mc-river-restoration',
  'formative:multiple-choice:mc-digital-notes',
];
const EXPECTED_PASSAGE_IDS = [
  'mc-sleep-learning',
  'mc-river-restoration',
  'mc-digital-notes',
];
const REQUIRED_FACTUAL_CLAIM_SPANS = {
  'formative:multiple-choice:mc-sleep-learning': [
    'In particular, slow-wave sleep appears to support the consolidation of factual knowledge, while rapid eye movement sleep may help integrate emotional experiences and creative associations.',
    'One study asked participants to learn pairs of unrelated words in the evening.',
    'The group that slept remembered more pairs the next morning, especially when their sleep included longer periods of slow-wave activity.',
    'Yet several experiments suggest that sacrificing sleep can reduce attention, working memory and the ability to apply knowledge flexibly.',
  ],
  'formative:multiple-choice:mc-river-restoration': [
    'The aim is often more practical: to soften hard banks, create shallow planted edges and give floodwater somewhere safer to spread during storms.',
    'One project in Millgate replaced a concrete channel with a wider river corridor.',
    'Within two years, surveys recorded more insects and small fish, while residents reported using the nearby path more often.',
    'In Millgate, loading bays were moved rather than removed, and several cafes later used the river path to attract customers.',
  ],
  'formative:multiple-choice:mc-digital-notes': [
    "When students type quickly, they may copy a lecturer's words almost exactly.",
    'By contrast, slower note-taking often forces students to select, shorten and connect ideas, which can support understanding.',
    'A tablet with a stylus may encourage the same selection and diagramming as paper, while a paper notebook used for copying sentences may be no better than a laptop.',
    'The tool matters less than the thinking it encourages.',
  ],
};
const FORBIDDEN_BLIND_KEYS = new Set([
  'answer',
  'answers',
  'answerkey',
  'answerkeys',
  'correct',
  'correctanswer',
  'correctanswers',
  'distractor',
  'distractors',
  'explanation',
  'explanations',
  'feedback',
  'hint',
  'hints',
  'key',
  'keys',
  'solution',
  'solutions',
  'trap',
  'traps',
]);
const LEARNER_OR_CONTACT_PII_KEYS = new Set([
  'address',
  'attemptid',
  'contact',
  'email',
  'emailaddress',
  'ip',
  'ipaddress',
  'learnerid',
  'phone',
  'phonenumber',
  'sessionid',
  'studentid',
  'telephone',
  'userid',
  'whatsapp',
]);
const EMAIL_VALUE = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/iu;
const PHONE_VALUE = /(?:\+(?:[\s().-]*\d){7,}|(?:phone|tel(?:ephone)?|whats ?app|contact)[^\n]{0,24}(?:\d[\s().-]*){7,})/iu;
const ABSOLUTE_LANGUAGE = /\b(?:all|always|automatic(?:ally)?|completely|every|never|none|only)\b/iu;

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
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
  return String(text ?? '').normalize('NFKC').replace(/\s+/gu, ' ').trim();
}

function wordCount(text) {
  return normalizeText(text).split(' ').filter(Boolean).length;
}

function assertExactKeys(value, expectedKeys, label) {
  assert(isObject(value), `${label}: se esperaba un objeto.`);
  const observed = Object.keys(value).sort();
  const expected = [...expectedKeys].sort();
  assert(
    JSON.stringify(observed) === JSON.stringify(expected),
    `${label}: keys inesperadas. Esperadas ${expected.join(', ')}; observadas ${observed.join(', ')}.`,
  );
}

function sourceSha256(relativePath) {
  return sha256(readFileSync(resolve(ROOT, relativePath)));
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
        throw new Error(`Import runtime no permitido en ${relativePath}: ${specifier}`);
      },
    },
    { filename: absolutePath, timeout: 10_000 },
  );
  return evaluatedModule.exports;
}

function findForbiddenBlindKeys(value, path = '$', findings = []) {
  if (Array.isArray(value)) {
    value.forEach((entry, index) =>
      findForbiddenBlindKeys(entry, `${path}[${index}]`, findings));
    return findings;
  }
  if (!isObject(value)) return findings;
  for (const [key, entry] of Object.entries(value)) {
    const normalizedKey = key.toLowerCase().replace(/[-_]/gu, '');
    if (FORBIDDEN_BLIND_KEYS.has(normalizedKey)) findings.push(`${path}.${key}`);
    findForbiddenBlindKeys(entry, `${path}.${key}`, findings);
  }
  return findings;
}

function findLearnerOrContactPii(value, path = '$', findings = []) {
  if (Array.isArray(value)) {
    value.forEach((entry, index) =>
      findLearnerOrContactPii(entry, `${path}[${index}]`, findings));
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
    findLearnerOrContactPii(entry, `${path}.${key}`, findings);
  }
  return findings;
}

function sourceAssets(catalog) {
  const passages = catalog.IELTS_MULTIPLE_CHOICE_PASSAGES;
  assert(Array.isArray(passages), 'Falta IELTS_MULTIPLE_CHOICE_PASSAGES.');
  return passages.map((passage, index) => ({
    assetId: `formative:multiple-choice:${passage.id}`,
    passageIndex: index,
    id: passage.id,
    title: passage.title,
    passage: passage.passage,
    questions: passage.questions,
    wordCount: wordCount(passage.passage),
    sourceObjectSha256: sha256(stableJson(passage)),
    passageSha256: sha256(normalizeText(passage.passage)),
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

function optionLengthRisk(assets) {
  const questions = assets.flatMap(asset => asset.questions);
  const indexCounts = [0, 0, 0, 0];
  let uniqueLongestQuestions = 0;
  let correctIsUniqueLongest = 0;
  let uniqueShortestQuestions = 0;
  let correctIsUniqueShortest = 0;
  let correctWithAbsoluteLanguage = 0;
  let distractorsWithAbsoluteLanguage = 0;
  let permutationChecks = 0;

  for (const question of questions) {
    assert(question.options.length === 4, `${question.id}: se esperaban cuatro opciones.`);
    assert(Number.isInteger(question.answer), `${question.id}: answer no es entero.`);
    assert(question.answer >= 0 && question.answer < 4, `${question.id}: answer fuera de rango.`);
    indexCounts[question.answer] += 1;
    const lengths = question.options.map(option => wordCount(option));
    const max = Math.max(...lengths);
    const min = Math.min(...lengths);
    const longest = lengths
      .map((length, index) => ({ length, index }))
      .filter(row => row.length === max);
    const shortest = lengths
      .map((length, index) => ({ length, index }))
      .filter(row => row.length === min);
    if (longest.length === 1) {
      uniqueLongestQuestions += 1;
      if (longest[0].index === question.answer) correctIsUniqueLongest += 1;
    }
    if (shortest.length === 1) {
      uniqueShortestQuestions += 1;
      if (shortest[0].index === question.answer) correctIsUniqueShortest += 1;
    }
    question.options.forEach((option, optionIndex) => {
      if (!ABSOLUTE_LANGUAGE.test(option)) return;
      if (optionIndex === question.answer) correctWithAbsoluteLanguage += 1;
      else distractorsWithAbsoluteLanguage += 1;
    });
    for (let shift = 1; shift < question.options.length; shift += 1) {
      const permuted = question.options.map(
        (_, index) => question.options[(index + shift) % question.options.length],
      );
      const permutedAnswer =
        (question.answer - shift + question.options.length) % question.options.length;
      assert(
        permuted[permutedAnswer] === question.options[question.answer],
        `${question.id}: la permutación no preservó la clave semántica.`,
      );
      permutationChecks += 1;
    }
  }

  return {
    questionCount: questions.length,
    correctOptionIndexCounts: {
      A: indexCounts[0],
      B: indexCounts[1],
      C: indexCounts[2],
      D: indexCounts[3],
    },
    unusedCorrectPositions: ['A', 'B', 'C', 'D'].filter((_, index) => indexCounts[index] === 0),
    uniqueLongestQuestions,
    correctIsUniqueLongest,
    uniqueLongestHitRate:
      uniqueLongestQuestions === 0 ? null : correctIsUniqueLongest / uniqueLongestQuestions,
    uniqueShortestQuestions,
    correctIsUniqueShortest,
    uniqueShortestHitRate:
      uniqueShortestQuestions === 0 ? null : correctIsUniqueShortest / uniqueShortestQuestions,
    correctWithAbsoluteLanguage,
    distractorsWithAbsoluteLanguage,
    permutationChecks,
    sampleAdequacy: {
      certificationThreshold: 100,
      observedQuestions: questions.length,
      eligibleForStatisticalCertification: questions.length >= 100,
      conclusion:
        'Riesgo estructural reproducible, no certificación estadística. D nunca es correcta y la opción únicamente más larga acierta 10 de 13 veces.',
    },
    contentCertification: 'blocked-editorial-rebalancing-required',
  };
}

function buildBlindReviewPacket() {
  const catalog = loadTsModule(CATALOG_PATH);
  const assets = sourceAssets(catalog);
  const records = EXPECTED_ASSET_IDS.map(assetId => {
    const asset = assets.find(candidate => candidate.assetId === assetId);
    assert(asset, `${assetId}: activo ausente del catálogo.`);
    return asset;
  });
  const blindReview = {
    schemaVersion: 'ielts-reading-multiple-choice-blind-review.v1',
    generatedAt: GENERATED_AT,
    reviewScope: 'F0.2b.1 — three formative Multiple Choice passages',
    reviewerIsolation:
      'Use only this packet and official/public sources linked here. Do not open the catalog, registry, validator, source route, prior audit artifacts or UI components.',
    instruction:
      'First pass only: independently answer every question from passage evidence. Quote the shortest decisive span, classify ambiguity as none/minor/material, and assess IELTS Academic Reading fitness. Do not open the second-pass factual-source packet until all 18 selections and evidence spans are fixed. This is an AI editorial review, not a human signature, rights clearance or publication approval.',
    secondPassPath: FACTUAL_SOURCE_REVIEW_PATH,
    excludes: [
      'answer keys',
      'correctness labels',
      'explanations',
      'trap labels',
      'prior reviewer answers',
      'student data',
    ],
    records: records.map(asset => ({
      assetId: asset.assetId,
      title: asset.title,
      sourceObjectSha256: asset.sourceObjectSha256,
      passageSha256: asset.passageSha256,
      passage: asset.passage,
      questions: asset.questions.map(question => ({
        questionId: question.id,
        prompt: question.question,
        options: question.options,
        declaredSkill: question.skill,
      })),
    })),
  };
  const forbidden = findForbiddenBlindKeys(blindReview);
  const pii = findLearnerOrContactPii(blindReview);
  assert(forbidden.length === 0, `El packet ciego filtra claves: ${forbidden.join(', ')}`);
  assert(pii.length === 0, `El packet ciego contiene PII: ${pii.join(', ')}`);
  assertExactKeys(
    blindReview,
    [
      'schemaVersion',
      'generatedAt',
      'reviewScope',
      'reviewerIsolation',
      'instruction',
      'secondPassPath',
      'excludes',
      'records',
    ],
    'blindReview',
  );
  blindReview.records.forEach((record, recordIndex) => {
    assertExactKeys(
      record,
      ['assetId', 'title', 'sourceObjectSha256', 'passageSha256', 'passage', 'questions'],
      `blindReview.records[${recordIndex}]`,
    );
    record.questions.forEach((question, questionIndex) => {
      assertExactKeys(
        question,
        ['questionId', 'prompt', 'options', 'declaredSkill'],
        `blindReview.records[${recordIndex}].questions[${questionIndex}]`,
      );
    });
  });
  return blindReview;
}

function buildFactualSourceReviewPacket() {
  const registry = loadTsModule(REGISTRY_PATH).IELTS_READING_RIGHTS_REGISTRY;
  const evidenceById = new Map(registry.evidence.map(evidence => [evidence.id, evidence]));
  const packet = {
    schemaVersion: 'ielts-reading-multiple-choice-factual-source-review.v1',
    generatedAt: GENERATED_AT,
    reviewScope: 'F0.2b.1 — second-pass factual-source review only',
    instruction:
      'Open only after fixing all 18 first-pass answers and evidence spans. Use these sources to flag supported, oversimplified, unsupported or untraceable claims. Candidate sources do not prove authorship, licensing, authorization or factual verification.',
    records: EXPECTED_ASSET_IDS.map(assetId => {
      const records = registry.entries.filter(entry => entry.assetId === assetId);
      assert(records.length === 1, `${assetId}: se esperaba un registro global.`);
      const record = records[0];
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
    }),
  };
  assertExactKeys(
    packet,
    ['schemaVersion', 'generatedAt', 'reviewScope', 'instruction', 'records'],
    'factualSourceReview',
  );
  packet.records.forEach((record, recordIndex) => {
    assertExactKeys(
      record,
      ['assetId', 'claimSpansToReview', 'candidateSources', 'limitation'],
      `factualSourceReview.records[${recordIndex}]`,
    );
    record.candidateSources.forEach((source, sourceIndex) => {
      assertExactKeys(
        source,
        ['evidenceId', 'label', 'url', 'note'],
        `factualSourceReview.records[${recordIndex}].candidateSources[${sourceIndex}]`,
      );
    });
  });
  assert(findForbiddenBlindKeys(packet).length === 0, 'El packet factual filtra claves.');
  assert(findLearnerOrContactPii(packet).length === 0, 'El packet factual contiene PII.');
  return packet;
}

function readJson(relativePath) {
  const absolutePath = resolve(ROOT, relativePath);
  assert(existsSync(absolutePath), `Falta artefacto: ${relativePath}`);
  return JSON.parse(readFileSync(absolutePath, 'utf8'));
}

function validateExpertVerdict(verdict, assets, factualSourceReview) {
  assert(
    verdict.schemaVersion === 'ielts-reading-multiple-choice-expert-verdict.v1',
    'Schema de expert-verdict inválido.',
  );
  assert(verdict.reviewer?.humanSignature === false, 'El revisor IA no puede simular firma humana.');
  assert(
    verdict.reviewer?.sourceContext === 'two-pass-blind-then-factual-sources',
    'El contexto experto no respetó los dos pases.',
  );
  assert(
    JSON.stringify(verdict.reviewer?.reviewSequence) ===
      JSON.stringify(['blind-review', 'factual-source-review']),
    'La secuencia de revisión experta no quedó declarada.',
  );
  assert(Array.isArray(verdict.records) && verdict.records.length === assets.length, 'Cobertura experta incompleta.');
  const allowedAmbiguity = new Set(['none', 'minor', 'material']);
  const allowedFactualAssessments = new Set([
    'supported',
    'oversimplified',
    'unsupported',
    'untraceable',
  ]);
  const allowedIeltsFitness = new Set(['strong', 'mixed', 'weak']);
  const allowedFactualRisk = new Set(['low', 'medium', 'high']);
  const sourceIdsByAsset = new Map(
    factualSourceReview.records.map(record => [
      record.assetId,
      new Set(record.candidateSources.map(source => source.evidenceId)),
    ]),
  );
  const comparisons = [];
  const factualClaims = [];
  for (const asset of assets) {
    const records = verdict.records.filter(record => record.assetId === asset.assetId);
    assert(records.length === 1, `${asset.assetId}: falta o duplica verdict experto.`);
    const record = records[0];
    assert(
      isObject(record.passageAssessment) &&
        allowedIeltsFitness.has(record.passageAssessment.ieltsFitness) &&
        allowedFactualRisk.has(record.passageAssessment.factualRisk) &&
        Array.isArray(record.passageAssessment.notes) &&
        record.passageAssessment.notes.length > 0 &&
        record.passageAssessment.notes.every(note => typeof note === 'string' && note.trim()),
      `${asset.assetId}: passageAssessment experto inválido.`,
    );
    assert(record.questions.length === asset.questions.length, `${asset.assetId}: faltan respuestas expertas.`);
    const requiredClaims = REQUIRED_FACTUAL_CLAIM_SPANS[asset.assetId];
    assert(
      Array.isArray(record.factualClaims) &&
        record.factualClaims.length === requiredClaims.length,
      `${asset.assetId}: falta mapeo claim-by-claim del segundo pase.`,
    );
    const allowedSourceIds = sourceIdsByAsset.get(asset.assetId);
    assert(allowedSourceIds, `${asset.assetId}: faltan fuentes del segundo pase.`);
    const normalizedClaims = record.factualClaims.map(claim => normalizeText(claim.claim));
    assert(
      new Set(normalizedClaims).size === normalizedClaims.length &&
        JSON.stringify(normalizedClaims.sort()) ===
          JSON.stringify(requiredClaims.map(normalizeText).sort()),
      `${asset.assetId}: los claims factuales no cubren exactamente los spans requeridos.`,
    );
    for (const claim of record.factualClaims) {
      assert(typeof claim.claim === 'string' && claim.claim.trim(), `${asset.assetId}: claim vacío.`);
      assert(
        normalizeText(asset.passage).includes(normalizeText(claim.claim)),
        `${asset.assetId}: el claim factual no aparece en el pasaje.`,
      );
      assert(
        allowedFactualAssessments.has(claim.assessment),
        `${asset.assetId}: assessment factual inválido.`,
      );
      assert(Array.isArray(claim.evidenceIds), `${asset.assetId}: evidenceIds factual inválido.`);
      assert(
        new Set(claim.evidenceIds).size === claim.evidenceIds.length &&
          claim.evidenceIds.every(evidenceId => allowedSourceIds.has(evidenceId)),
        `${asset.assetId}: evidencia factual ajena o duplicada.`,
      );
      if (claim.assessment !== 'untraceable') {
        assert(claim.evidenceIds.length > 0, `${asset.assetId}: claim sin fuente candidata.`);
      }
      assert(typeof claim.note === 'string' && claim.note.trim(), `${asset.assetId}: falta nota factual.`);
      factualClaims.push({
        assetId: asset.assetId,
        assessment: claim.assessment,
        evidenceCount: claim.evidenceIds.length,
      });
    }
    for (const question of asset.questions) {
      const rows = record.questions.filter(row => row.questionId === question.id);
      assert(rows.length === 1, `${question.id}: falta o duplica respuesta experta.`);
      const row = rows[0];
      assert(Number.isInteger(row.selectedOptionIndex), `${question.id}: opción experta inválida.`);
      assert(row.selectedOptionIndex >= 0 && row.selectedOptionIndex < 4, `${question.id}: opción fuera de rango.`);
      assert(typeof row.evidenceQuote === 'string' && row.evidenceQuote.trim(), `${question.id}: falta evidencia.`);
      assert(
        normalizeText(asset.passage).includes(normalizeText(row.evidenceQuote)),
        `${question.id}: la cita experta no aparece en el pasaje.`,
      );
      assert(allowedAmbiguity.has(row.ambiguity), `${question.id}: ambigüedad inválida.`);
      assert(typeof row.reasoning === 'string' && row.reasoning.trim(), `${question.id}: falta razonamiento.`);
      comparisons.push({
        assetId: asset.assetId,
        questionId: question.id,
        matchesSourceKey: row.selectedOptionIndex === question.answer,
        ambiguity: row.ambiguity,
      });
    }
  }
  return { comparisons, factualClaims };
}

function validateStudentWalkthrough(walkthrough, assets) {
  assert(
    walkthrough.schemaVersion === 'ielts-reading-multiple-choice-student-walkthrough.v1',
    'Schema de student-walkthrough inválido.',
  );
  assert(walkthrough.reviewer?.humanSignature === false, 'El walkthrough IA no puede simular firma humana.');
  assert(walkthrough.reviewer?.sourceContext === 'blind-review-packet-only', 'El walkthrough no usó contexto ciego.');
  assert(Array.isArray(walkthrough.records) && walkthrough.records.length === assets.length, 'Cobertura del walkthrough incompleta.');
  for (const asset of assets) {
    const rows = walkthrough.records.filter(record => record.assetId === asset.assetId);
    assert(rows.length === 1, `${asset.assetId}: falta o duplica walkthrough.`);
    const row = rows[0];
    for (const field of [
      'likelyComprehensionBarriers',
      'likelyShortcutBehaviors',
      'learningValue',
      'nextAction',
    ]) {
      assert(
        Array.isArray(row[field]) &&
          row[field].length > 0 &&
          row[field].every(item => typeof item === 'string' && item.trim()) &&
          new Set(row[field].map(item => normalizeText(item))).size === row[field].length,
        `${asset.assetId}: ${field} vacío, malformado o duplicado.`,
      );
    }
  }
  return {
    passagesCovered: walkthrough.records.length,
    findings: walkthrough.records.reduce(
      (sum, record) => sum +
        record.likelyComprehensionBarriers.length +
        record.likelyShortcutBehaviors.length +
        record.learningValue.length +
        record.nextAction.length,
      0,
    ),
  };
}

export function buildValidationArtifacts() {
  const catalog = loadTsModule(CATALOG_PATH);
  const registry = loadTsModule(REGISTRY_PATH).IELTS_READING_RIGHTS_REGISTRY;
  const contract = loadTsModule(CONTRACT_PATH);
  const assets = sourceAssets(catalog);
  const baseline = readJson(BASELINE_PATH);
  const sourceAvailability = readJson(SOURCE_AVAILABILITY_PATH);
  const blindReview = buildBlindReviewPacket();
  const factualSourceReview = buildFactualSourceReviewPacket();
  const expertVerdict = readJson(EXPERT_VERDICT_PATH);
  const studentWalkthrough = readJson(STUDENT_WALKTHROUGH_PATH);
  const assetIds = assets.map(asset => asset.assetId);
  const questionIds = assets.flatMap(asset => asset.questions.map(question => question.id));
  const registryAssetIds = registry.entries.map(entry => entry.assetId);
  const evidenceIds = registry.evidence.map(evidence => evidence.id);
  const evidenceById = new Map(registry.evidence.map(evidence => [evidence.id, evidence]));
  const unitRegistryRecords = EXPECTED_ASSET_IDS.map(assetId => {
    const records = registry.entries.filter(entry => entry.assetId === assetId);
    assert(records.length === 1, `${assetId}: se esperaba exactamente un registro.`);
    return records[0];
  });
  const candidateEvidenceIds = [
    ...new Set(
      unitRegistryRecords.flatMap(
        record => record.factualSourceResearch.sourceEvidenceIds,
      ),
    ),
  ].sort();

  assert(
    JSON.stringify(assetIds) === JSON.stringify(EXPECTED_ASSET_IDS),
    'El catálogo Multiple Choice no conserva los tres activos esperados y su orden.',
  );
  assert(
    JSON.stringify(assets.map(asset => asset.id)) === JSON.stringify(EXPECTED_PASSAGE_IDS),
    'Los IDs declarados de pasaje cambiaron.',
  );
  assert(new Set(questionIds).size === questionIds.length, 'Hay questionId duplicados.');
  assert(questionIds.length === 18, 'Se esperaban 18 preguntas Multiple Choice.');
  assert(new Set(registryAssetIds).size === registryAssetIds.length, 'Hay assetId duplicados en el registry global.');
  assert(new Set(evidenceIds).size === evidenceIds.length, 'Hay evidenceId duplicados.');
  assert(
    registry.schemaVersion === contract.IELTS_READING_RIGHTS_REGISTRY_SCHEMA_VERSION,
    'Registry y contrato no comparten schemaVersion.',
  );
  assert(
    sourceAvailability.schemaVersion ===
      'ielts-reading-multiple-choice-source-availability.v1' &&
      sourceAvailability.checkedAt === '2026-08-09' &&
      typeof sourceAvailability.method === 'string' &&
      sourceAvailability.method.trim() &&
      typeof sourceAvailability.interpretation === 'string' &&
      sourceAvailability.interpretation.trim(),
    'El chequeo de disponibilidad no respeta su contrato.',
  );
  const availabilityIds = sourceAvailability.sources
    .map(source => source.evidenceId)
    .sort();
  assert(
    sourceAvailability.sources.length === 8 &&
      new Set(availabilityIds).size === 8 &&
      JSON.stringify(availabilityIds) === JSON.stringify(candidateEvidenceIds),
    'El chequeo de disponibilidad no cubre las ocho fuentes candidatas.',
  );
  assert(
    sourceAvailability.sources.every(source => {
      const evidence = evidenceById.get(source.evidenceId);
      const statusIsExpected =
        (Number.isInteger(source.httpStatus) &&
          source.httpStatus >= 200 &&
          source.httpStatus < 400) ||
        (source.evidenceId === 'notes-mueller-oppenheimer-2014' &&
          source.httpStatus === 403);
      return evidence?.kind === 'factual-source' &&
        statusIsExpected &&
        typeof source.finalUrl === 'string' &&
        source.finalUrl.startsWith('https://');
    }),
    'El chequeo de disponibilidad contiene fuente, kind, status o URL inválidos.',
  );

  assert(
    baseline.schemaVersion ===
      'ielts-reading-multiple-choice-rights-baseline.v1',
    'Schema de baseline inválido.',
  );
  const baselineAssetIds = baseline.assets.map(asset => asset.assetId);
  assert(
    new Set(baselineAssetIds).size === baselineAssetIds.length &&
      JSON.stringify(baselineAssetIds) === JSON.stringify(EXPECTED_ASSET_IDS),
    'El baseline no cubre exactamente los tres activos en orden.',
  );
  const baselineSourceByPath = new Map(
    baseline.sources.map(source => [source.path, source.sha256]),
  );
  for (const sourcePath of [CATALOG_PATH, ROUTE_PATH, ENGINE_PATH]) {
    assert(
      baselineSourceByPath.get(sourcePath) === sourceSha256(sourcePath),
      `${sourcePath}: cambió desde el baseline; la aplicabilidad UI/runtime debe reevaluarse.`,
    );
  }

  const baselineById = new Map(baseline.assets.map(asset => [asset.assetId, asset]));
  const decisions = EXPECTED_ASSET_IDS.map(assetId => {
    const asset = assets.find(candidate => candidate.assetId === assetId);
    const record = unitRegistryRecords.find(entry => entry.assetId === assetId);
    const baselineAsset = baselineById.get(assetId);
    assert(baselineAsset, `${assetId}: falta en baseline.`);
    assert(record.sourceObjectSha256 === asset.sourceObjectSha256, `${assetId}: object hash drift.`);
    assert(record.passageSha256 === asset.passageSha256, `${assetId}: passage hash drift.`);
    assert(baselineAsset.sourceObjectSha256 === asset.sourceObjectSha256, `${assetId}: drift contra baseline.`);
    assert(baselineAsset.passageSha256 === asset.passageSha256, `${assetId}: passage drift contra baseline.`);
    for (const evidenceId of referencedEvidenceIds(record)) {
      assert(evidenceById.has(evidenceId), `${assetId}: evidencia inexistente ${evidenceId}.`);
    }
    assert(
      record.factualSourceResearch.status === 'candidate-sources-collected',
      `${assetId}: faltan fuentes candidatas.`,
    );
    assert(
      record.factualReviewRequirement.policy === 'required',
      `${assetId}: la revisión factual claim-by-claim dejó de ser obligatoria.`,
    );
    assert(
      record.factualSourceResearch.sourceEvidenceIds.length >= 2,
      `${assetId}: cobertura factual candidata insuficiente.`,
    );
    assert(
      record.factualSourceResearch.sourceEvidenceIds.every(
        evidenceId => evidenceById.get(evidenceId)?.kind === 'factual-source',
      ),
      `${assetId}: una fuente candidata no es factual-source.`,
    );
    assert(record.factualReview.status === 'not-reviewed', `${assetId}: se simuló verificación factual.`);
    assert(record.humanReview.status === 'pending', `${assetId}: se simuló revisión humana.`);
    const decision = contract.assessIeltsReadingRights(registry, asset);
    assert(!decision.eligibleForPublicationPipeline, `${assetId}: no debe avanzar.`);
    assert(decision.disposition === 'quarantine', `${assetId}: debe permanecer en cuarentena.`);
    assert(
      !decision.reasonCodes.includes('registry-contract-invalid') &&
        !decision.reasonCodes.includes('content-hash-mismatch') &&
        !decision.reasonCodes.includes('factual-source-research-invalid'),
      `${assetId}: la cuarentena oculta un registry inválido: ${decision.reasonCodes.join(', ')}.`,
    );
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
  const visibleClaims = [
    'Practica con textos originales de WeLearn',
    'Banco original WeLearn',
    'sin copiar preguntas oficiales',
  ].map(text => ({ text, observed: routeText.includes(text) }));
  assert(visibleClaims.every(claim => claim.observed), 'Cambió el claim visible de originalidad.');
  const biasProfile = optionLengthRisk(assets);
  assert(
    JSON.stringify(biasProfile.correctOptionIndexCounts) ===
      JSON.stringify(baseline.structuralRisk.correctOptionIndexCounts),
    'La distribución de claves cambió desde el baseline.',
  );
  assert(
    biasProfile.correctIsUniqueLongest ===
      baseline.structuralRisk.correctAnswerIsUniqueLongest,
    'Cambió la señal de longitud desde el baseline.',
  );
  const expertValidation = validateExpertVerdict(
    expertVerdict,
    assets,
    factualSourceReview,
  );
  const expertComparisons = expertValidation.comparisons;
  const studentSummary = validateStudentWalkthrough(studentWalkthrough, assets);
  const expertMatches = expertComparisons.filter(row => row.matchesSourceKey).length;
  const materialAmbiguities = expertComparisons
    .filter(row => row.ambiguity === 'material')
    .map(row => ({
      assetId: row.assetId,
      questionId: row.questionId,
      ambiguity: row.ambiguity,
    }));
  const allSourcePaths = [
    CATALOG_PATH,
    ROUTE_PATH,
    ENGINE_PATH,
    CONTRACT_PATH,
    REGISTRY_PATH,
    VALIDATOR_PATH,
    TEST_PATH,
    BASELINE_PATH,
    SOURCE_AVAILABILITY_PATH,
    BLIND_REVIEW_PATH,
    FACTUAL_SOURCE_REVIEW_PATH,
    EXPERT_VERDICT_PATH,
    STUDENT_WALKTHROUGH_PATH,
  ];
  const sources = allSourcePaths
    .filter(path => existsSync(resolve(ROOT, path)))
    .map(path => ({ path, sha256: sourceSha256(path) }));
  const negativeControl = contract.assessIeltsReadingRights(registry, {
    ...assets[0],
    sourceObjectSha256: '0'.repeat(64),
  });
  assert(
    negativeControl.reasonCodes.includes('content-hash-mismatch'),
    'Una mutación de contenido no quedó bloqueada.',
  );

  const validation = {
    schemaVersion: 'ielts-reading-multiple-choice-rights-validation.v1',
    generatedAt: GENERATED_AT,
    unit: 'F0.2b.1 — expediente de tres pasajes formativos Multiple Choice',
    status: 'pass',
    passMeaning:
      'PASS certifica cobertura, identidad, cuarentena, paquete ciego y detección de riesgos. Los tres pasajes NO quedan aprobados, factualizados, licenciados ni listos para publicación.',
    scope: {
      passages: assets.length,
      questions: questionIds.length,
      registryEntriesInUnit: decisions.length,
      registryEntriesTotal: registry.entries.length,
      coveredAssetIds: EXPECTED_ASSET_IDS,
      parentF02bRemainsOpen: true,
      learnerFacingFilesChangedByUnit: false,
    },
    checks: {
      exactCoverage: decisions.length === 3 && questionIds.length === 18,
      stableUniqueIds:
        new Set(assetIds).size === assetIds.length &&
        new Set(questionIds).size === questionIds.length,
      sourceHashesMatchBaseline: true,
      registryReferencesResolve: true,
      factualSourceAvailabilityRecorded: sourceAvailability.sources.length === 8,
      candidateSourcesAreNotTreatedAsVerification: decisions.every(
        decision => decision.factualReviewStatus === 'not-reviewed',
      ),
      factualReviewRequiredForEveryAsset: decisions.every(
        decision => decision.factualReviewPolicy === 'required',
      ),
      actualAssetsAllQuarantined: decisions.every(
        decision => !decision.eligibleForPublicationPipeline,
      ),
      actualRegistryRecordsStructurallyValid: decisions.every(
        decision =>
          !decision.reasonCodes.includes('registry-contract-invalid') &&
          !decision.reasonCodes.includes('content-hash-mismatch') &&
          !decision.reasonCodes.includes('factual-source-research-invalid'),
      ),
      visibleOriginalityClaimObservedButUnverified: visibleClaims.every(claim => claim.observed),
      blindPacketContainsNoKeysOrFeedback: findForbiddenBlindKeys(blindReview).length === 0,
      blindPacketContainsNoLearnerOrContactPii:
        findLearnerOrContactPii(blindReview).length === 0,
      factualSourcePacketContainsNoKeysOrFeedback:
        findForbiddenBlindKeys(factualSourceReview).length === 0,
      independentExpertCoverageComplete: expertComparisons.length === questionIds.length,
      studentWalkthroughCoverageComplete: studentSummary.passagesCovered === assets.length,
      optionPermutationPreservesSemanticKey: biasProfile.permutationChecks === 54,
      statisticalCertificationWithheld: !biasProfile.sampleAdequacy.eligibleForStatisticalCertification,
      contentBalanceCertificationBlocked:
        biasProfile.contentCertification ===
          'blocked-editorial-rebalancing-required',
      contentMutationDenied: negativeControl.disposition === 'quarantine',
    },
    decisions,
    provenanceSearch: {
      method: 'directed-non-exhaustive-title-and-first-sentence-search',
      queries: [
        '“For decades, sleep was viewed mainly as a period of rest.”',
        '“Many industrial towns were built around rivers that provided transport, water and power.”',
        '“Students often assume that digital note-taking is automatically more efficient than writing by hand.”',
        '“Millgate” “river restoration” concrete channel loading bays cafes',
      ],
      reviewedResult: 'No exact external match located in the reviewed search results.',
      limitation:
        'A negative directed search does not prove originality, authorship, ownership or universal absence. No rights-holder authorization was located in the reviewed sources.',
    },
    factualResearch: decisions.map(decision => {
      const record = registry.entries.find(entry => entry.assetId === decision.assetId);
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
        matches: expertMatches,
        total: expertComparisons.length,
        rate: expertMatches / expertComparisons.length,
      },
      materialAmbiguityCount: materialAmbiguities.length,
      materialAmbiguities,
      factualClaimAssessments: expertValidation.factualClaims,
      verdictPath: EXPERT_VERDICT_PATH,
    },
    studentWalkthrough: {
      ...studentSummary,
      verdictPath: STUDENT_WALKTHROUGH_PATH,
      limitation:
        'Walkthrough cognitivo sobre contenido en packet ciego; no evalúa UI, accesibilidad visual ni interacción runtime.',
    },
    antiBias: biasProfile,
    applicability: {
      rights: 'applicable',
      fullStackData: 'applicable',
      ieltsExpert: 'applicable',
      cognitiveWalkthrough: 'applicable-to-content-only',
      antiBias: 'applicable',
      uiUxAccessibility: 'not-applicable-no-learner-facing-change',
      playwright: 'not-applicable-no-runtime-or-dom-change',
      evidence:
        'The unit changes only the rights contract, registry, validators, tests and audit outputs. The published route, bank and engine hashes remain the recorded baseline values.',
    },
    negativeControl: {
      contentHashMismatch: negativeControl,
    },
    sources,
  };
  assert(Object.values(validation.checks).every(Boolean), 'Falló un gate de F0.2b.1.');
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
  const mode = process.argv.includes('--write-blind')
    ? 'write-blind'
    : process.argv.includes('--write')
      ? 'write'
      : process.argv.includes('--check')
        ? 'check'
        : 'print';
  if (mode === 'write-blind') {
    const blindReview = buildBlindReviewPacket();
    const factualSourceReview = buildFactualSourceReviewPacket();
    writeJson(BLIND_REVIEW_PATH, blindReview);
    writeJson(FACTUAL_SOURCE_REVIEW_PATH, factualSourceReview);
    process.stdout.write(`${JSON.stringify({
      status: 'blind-packet-written',
      records: blindReview.records.length,
      questions: blindReview.records.reduce((sum, record) => sum + record.questions.length, 0),
      path: BLIND_REVIEW_PATH,
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
      quarantined: artifacts.validation.decisions.filter(
        decision => decision.disposition === 'quarantine',
      ).length,
      checks: artifacts.validation.checks,
    }, null, 2)}\n`);
  }
}
