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
const MOCK_PATH = 'src/data/mocks/ielts-set-1.ts';
const CONTRACT_PATH = 'src/lib/ielts/academic-reading-rights.ts';
const REGISTRY_PATH = 'src/data/practica-exams/ielts-reading-rights-registry.ts';
const VALIDATOR_PATH = 'scripts/check-ielts-reading-rights.mjs';
const TEST_PATH = 'tests/ielts-reading-rights-contract.test.mjs';
const OUTPUT_DIRECTORY = 'output/audits/ielts-reading-rights-set1-2026-08-09';
const VALIDATION_PATH = `${OUTPUT_DIRECTORY}/validation.json`;
const BLIND_REVIEW_PATH = `${OUTPUT_DIRECTORY}/blind-review.json`;
const EXPECTED_ASSET_IDS = [
  'mock:set-1:reading-part-5',
  'mock:set-1:reading-part-6',
  'mock:set-1:reading-part-7',
];
const FORBIDDEN_PAYLOAD_KEYS = new Set([
  'answer',
  'answers',
  'answerkey',
  'answerkeys',
  'correctanswers',
  'correctanswer',
  'distractor',
  'distractors',
  'explanation',
  'explanations',
  'feedback',
  'key',
  'keys',
  'options',
  'passage',
  'passages',
  'question',
  'questions',
  'template',
  'transcript',
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

function findForbiddenKeys(value, path = '$', findings = []) {
  if (Array.isArray(value)) {
    value.forEach((entry, index) => findForbiddenKeys(entry, `${path}[${index}]`, findings));
    return findings;
  }
  if (!isObject(value)) return findings;
  for (const [key, entry] of Object.entries(value)) {
    const normalizedKey = key.toLowerCase().replace(/[-_]/gu, '');
    if (FORBIDDEN_PAYLOAD_KEYS.has(normalizedKey)) findings.push(`${path}.${key}`);
    findForbiddenKeys(entry, `${path}.${key}`, findings);
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
    if (LEARNER_OR_CONTACT_PII_KEYS.has(normalizedKey)) {
      findings.push(`${path}.${key}`);
    }
    findLearnerOrContactPii(entry, `${path}.${key}`, findings);
  }
  return findings;
}

export function scanIeltsRightsAuditPayload(value) {
  return {
    forbiddenPayloadPaths: findForbiddenKeys(value),
    learnerOrContactPiiPaths: findLearnerOrContactPii(value),
  };
}

function sourceAssets(mock) {
  return mock.sections
    .filter(section => section.skill === 'reading')
    .map(section => ({
      assetId: `mock:${mock.id}:reading-part-${section.part}`,
      title: section.title.replace(/^Reading Passage \d+:\s*/u, ''),
      sourceObjectSha256: sha256(stableJson(section)),
      passageSha256: typeof section.passage === 'string'
        ? sha256(normalizeText(section.passage))
        : null,
    }));
}

function eligibleOwnedOriginal(registry, sourceAsset) {
  const record = structuredClone(registry.entries[0]);
  Object.assign(record, {
    assetId: sourceAsset.assetId,
    sourceObjectSha256: sourceAsset.sourceObjectSha256,
    passageSha256: sourceAsset.passageSha256,
  });
  record.moduleAssessment = {
    value: 'academic',
    status: 'declared',
    evidenceIds: ['fixture-module-declaration'],
  };
  record.authorship = {
    status: 'identified',
    authorId: 'author-welearn-fixture',
    authorName: 'Fixture Author',
    evidenceIds: ['fixture-authoring-record'],
  };
  record.provenanceAssessment = {
    status: 'verified-owned-original',
    observedWorkTitle: 'Synthetic validator fixture',
    observedCollection: null,
    observedIdentifier: null,
    confidence: 'high',
    evidenceIds: ['fixture-authoring-record'],
    limitation: 'Synthetic fixture used only to test state transitions.',
  };
  record.rightsAssessment = {
    basis: 'owned-original',
    status: 'verified',
    rightsHolder: 'WeLearn fixture',
    evidenceIds: ['fixture-authoring-record'],
    authorizationEvidenceStatus: 'located-and-verified',
    limitation: 'Synthetic fixture used only to test state transitions.',
  };
  record.factualReviewRequirement = {
    policy: 'not-applicable-allowed',
    rationale: 'Synthetic fixture contains no factual learner content.',
  };
  record.factualReview = {
    status: 'not-applicable',
    verifiedAt: '2026-08-09',
    sourceEvidenceIds: [],
    notApplicableRationale: 'Synthetic fixture contains no factual learner content.',
  };
  record.humanReview = {
    status: 'approved',
    reviewerId: 'reviewer-independent-fixture',
    reviewerName: 'Fixture Reviewer',
    reviewerRole: 'Independent rights reviewer fixture',
    reviewedAt: '2026-08-09',
    decisionNote: 'Synthetic approval used only to verify the contract transition.',
    evidenceIds: ['fixture-human-review-record'],
  };
  return record;
}

function registryWithFixture(registry, record, extraEvidence) {
  return {
    ...registry,
    evidence: [
      ...registry.evidence,
      ...(Array.isArray(extraEvidence) ? extraEvidence : [extraEvidence]),
    ],
    entries: [record],
  };
}

function contractMutationChecks(registry, assess, sourceAsset) {
  const fixtureEvidence = {
    id: 'fixture-authoring-record',
    kind: 'authoring-record',
    label: 'Synthetic authoring fixture',
    repositoryPath: 'tests/ielts-reading-rights-contract.test.mjs',
    accessedAt: '2026-08-09',
    note: 'Synthetic evidence used only by the executable validator.',
  };
  const moduleEvidence = {
    ...fixtureEvidence,
    id: 'fixture-module-declaration',
    kind: 'module-declaration',
    label: 'Synthetic module declaration fixture',
  };
  const humanReviewEvidence = {
    ...fixtureEvidence,
    id: 'fixture-human-review-record',
    kind: 'human-review-record',
    label: 'Synthetic independent-review fixture',
  };
  const baseEvidence = [fixtureEvidence, moduleEvidence, humanReviewEvidence];
  const eligibleRecord = eligibleOwnedOriginal(registry, sourceAsset);
  const ownedRegistry = registryWithFixture(registry, eligibleRecord, baseEvidence);
  const ownedDecision = assess(ownedRegistry, sourceAsset);

  const sameReviewer = structuredClone(eligibleRecord);
  sameReviewer.humanReview.reviewerId = ' AUTHOR-WELEARN-FIXTURE ';
  const independenceDecision = assess(
    registryWithFixture(registry, sameReviewer, baseEvidence),
    sourceAsset,
  );

  const licenseRecord = structuredClone(eligibleRecord);
  licenseRecord.provenanceAssessment.status = 'verified-licensed';
  licenseRecord.provenanceAssessment.evidenceIds = ['fixture-license-record'];
  licenseRecord.rightsAssessment = {
    basis: 'licensed',
    status: 'verified',
    rightsHolder: 'Fixture licensor',
    evidenceIds: ['fixture-license-record'],
    authorizationEvidenceStatus: 'located-and-verified',
    limitation: 'Synthetic fixture used only to test state transitions.',
  };
  const licenseEvidence = {
    ...fixtureEvidence,
    id: 'fixture-license-record',
    kind: 'license-document',
    label: 'Synthetic license fixture',
  };
  const licenseDecision = assess(
    registryWithFixture(registry, licenseRecord, [...baseEvidence, licenseEvidence]),
    sourceAsset,
  );
  licenseRecord.rightsAssessment.authorizationEvidenceStatus =
    'not-located-in-reviewed-sources';
  const unlicensedDecision = assess(
    registryWithFixture(registry, licenseRecord, [...baseEvidence, licenseEvidence]),
    sourceAsset,
  );

  const publicDomainRecord = structuredClone(eligibleRecord);
  publicDomainRecord.provenanceAssessment.status = 'verified-public-domain';
  publicDomainRecord.provenanceAssessment.evidenceIds = ['fixture-public-domain-record'];
  publicDomainRecord.rightsAssessment = {
    basis: 'public-domain',
    status: 'verified',
    rightsHolder: null,
    evidenceIds: ['fixture-public-domain-record'],
    authorizationEvidenceStatus: 'not-applicable-verified',
    limitation: 'Synthetic fixture used only to test state transitions.',
  };
  const publicDomainEvidence = {
    ...fixtureEvidence,
    id: 'fixture-public-domain-record',
    kind: 'public-domain-record',
    label: 'Synthetic public-domain fixture',
  };
  const publicDomainDecision = assess(
    registryWithFixture(registry, publicDomainRecord, [...baseEvidence, publicDomainEvidence]),
    sourceAsset,
  );

  const wrongModuleEvidence = structuredClone(eligibleRecord);
  wrongModuleEvidence.moduleAssessment.evidenceIds = ['fixture-authoring-record'];
  const wrongModuleDecision = assess(
    registryWithFixture(registry, wrongModuleEvidence, baseEvidence),
    sourceAsset,
  );

  const whitespaceAuthor = structuredClone(eligibleRecord);
  whitespaceAuthor.authorship.authorName = '   ';
  const whitespaceAuthorDecision = assess(
    registryWithFixture(registry, whitespaceAuthor, baseEvidence),
    sourceAsset,
  );

  const missingProvenanceEvidence = structuredClone(eligibleRecord);
  missingProvenanceEvidence.provenanceAssessment.evidenceIds = [];
  const missingProvenanceDecision = assess(
    registryWithFixture(registry, missingProvenanceEvidence, baseEvidence),
    sourceAsset,
  );

  const blankFactualReview = structuredClone(eligibleRecord);
  blankFactualReview.factualReview = {
    status: 'not-applicable',
    verifiedAt: ' ',
    sourceEvidenceIds: [],
    notApplicableRationale: ' ',
  };
  const blankFactualDecision = assess(
    registryWithFixture(registry, blankFactualReview, baseEvidence),
    sourceAsset,
  );

  const unknownFactualReview = structuredClone(eligibleRecord);
  unknownFactualReview.factualReview = { status: 'auto-approved' };
  const unknownFactualDecision = assess(
    registryWithFixture(registry, unknownFactualReview, baseEvidence),
    sourceAsset,
  );

  const whitespaceHuman = structuredClone(eligibleRecord);
  whitespaceHuman.humanReview.reviewerName = '   ';
  const whitespaceHumanDecision = assess(
    registryWithFixture(registry, whitespaceHuman, baseEvidence),
    sourceAsset,
  );

  const missingHumanEvidence = structuredClone(eligibleRecord);
  missingHumanEvidence.humanReview.evidenceIds = [];
  const missingHumanEvidenceDecision = assess(
    registryWithFixture(registry, missingHumanEvidence, baseEvidence),
    sourceAsset,
  );

  const unknownHumanStatus = structuredClone(eligibleRecord);
  unknownHumanStatus.humanReview.status = 'auto-approved';
  const unknownHumanDecision = assess(
    registryWithFixture(registry, unknownHumanStatus, baseEvidence),
    sourceAsset,
  );

  const automatedApproval = structuredClone(eligibleRecord);
  automatedApproval.automatedTriage.isHumanApproval = true;
  const automatedApprovalDecision = assess(
    registryWithFixture(registry, automatedApproval, baseEvidence),
    sourceAsset,
  );

  const invalidBasis = structuredClone(eligibleRecord);
  invalidBasis.rightsAssessment.basis = 'stolen';
  invalidBasis.provenanceAssessment.status = undefined;
  invalidBasis.rightsAssessment.evidenceIds = ['fixture-invalid-evidence-kind'];
  const invalidKindEvidence = {
    ...fixtureEvidence,
    id: 'fixture-invalid-evidence-kind',
    kind: undefined,
  };
  const invalidBasisDecision = assess(
    registryWithFixture(registry, invalidBasis, [...baseEvidence, invalidKindEvidence]),
    sourceAsset,
  );

  const wrongRegistryRecord = structuredClone(eligibleRecord);
  const wrongRegistry = registryWithFixture(registry, wrongRegistryRecord, baseEvidence);
  wrongRegistry.schemaVersion = 'wrong-schema';
  wrongRegistry.module = 'general-training';
  wrongRegistryRecord.moduleAssessment.value = 'general-training';
  const wrongRegistryDecision = assess(wrongRegistry, sourceAsset);

  const invalidCalendarDates = structuredClone(eligibleRecord);
  invalidCalendarDates.factualReview.verifiedAt = '2026-99-99';
  invalidCalendarDates.humanReview.reviewedAt = '2026-02-30T00:00:00Z';
  invalidCalendarDates.automatedTriage.assessedAt = '2026-08-09T25:00:00Z';
  const invalidCalendarDecision = assess(
    registryWithFixture(registry, invalidCalendarDates, baseEvidence),
    sourceAsset,
  );

  const invalidFactualResearch = structuredClone(eligibleRecord);
  invalidFactualResearch.factualSourceResearch = {
    status: 'candidate-sources-collected',
    sourceEvidenceIds: ['fixture-authoring-record'],
    limitation: 'Synthetic wrong-kind candidate source.',
  };
  const invalidFactualResearchDecision = assess(
    registryWithFixture(registry, invalidFactualResearch, baseEvidence),
    sourceAsset,
  );

  const requiredFactualReview = structuredClone(eligibleRecord);
  requiredFactualReview.factualReviewRequirement = {
    policy: 'required',
    rationale: 'Synthetic factual content requires verified review.',
  };
  const requiredFactualReviewDecision = assess(
    registryWithFixture(registry, requiredFactualReview, baseEvidence),
    sourceAsset,
  );

  const malformedEvidenceArray = structuredClone(eligibleRecord);
  malformedEvidenceArray.provenanceAssessment.evidenceIds = 'fixture-authoring-record';
  const malformedEvidenceDecision = assess(
    registryWithFixture(registry, malformedEvidenceArray, baseEvidence),
    sourceAsset,
  );

  const duplicateEvidenceIds = structuredClone(eligibleRecord);
  duplicateEvidenceIds.provenanceAssessment.evidenceIds = [
    'fixture-authoring-record',
    'fixture-authoring-record',
  ];
  const duplicateEvidenceDecision = assess(
    registryWithFixture(registry, duplicateEvidenceIds, baseEvidence),
    sourceAsset,
  );

  const duplicateEntryRegistry = registryWithFixture(registry, eligibleRecord, baseEvidence);
  duplicateEntryRegistry.entries.push(structuredClone(eligibleRecord));
  const duplicateEntryDecision = assess(duplicateEntryRegistry, sourceAsset);

  return {
    verifiedOwnedOriginalCanAdvance: ownedDecision.eligibleForPublicationPipeline,
    authorCannotSelfApprove: independenceDecision.reasonCodes.includes('reviewer-not-independent'),
    verifiedLicenseCanAdvance: licenseDecision.eligibleForPublicationPipeline,
    licenseWithoutAuthorizationIsBlocked:
      unlicensedDecision.reasonCodes.includes('rights-evidence-incomplete'),
    verifiedPublicDomainCanAdvance: publicDomainDecision.eligibleForPublicationPipeline,
    wrongKindModuleEvidenceIsBlocked:
      wrongModuleDecision.reasonCodes.includes('module-not-declared'),
    whitespaceAuthorshipIsBlocked:
      whitespaceAuthorDecision.reasonCodes.includes('authorship-unresolved'),
    missingProvenanceEvidenceIsBlocked:
      missingProvenanceDecision.reasonCodes.includes('provenance-evidence-incomplete'),
    blankFactualReviewIsBlocked:
      blankFactualDecision.reasonCodes.includes('factual-review-incomplete'),
    unknownFactualStatusIsBlocked:
      unknownFactualDecision.reasonCodes.includes('factual-review-incomplete'),
    whitespaceHumanReviewIsBlocked:
      whitespaceHumanDecision.reasonCodes.includes('human-review-incomplete'),
    missingHumanAttestationIsBlocked:
      missingHumanEvidenceDecision.reasonCodes.includes('human-review-incomplete'),
    unknownHumanStatusIsBlocked:
      unknownHumanDecision.reasonCodes.includes('human-review-pending'),
    automatedTriageCannotApprove:
      automatedApprovalDecision.reasonCodes.includes('automated-triage-invalid'),
    invalidRightsBasisIsBlocked:
      !invalidBasisDecision.eligibleForPublicationPipeline &&
      invalidBasisDecision.reasonCodes.includes('rights-unresolved'),
    invalidRegistryContractIsBlocked:
      !wrongRegistryDecision.eligibleForPublicationPipeline &&
      wrongRegistryDecision.reasonCodes.includes('registry-contract-invalid'),
    impossibleCalendarDatesAreBlocked:
      invalidCalendarDecision.reasonCodes.includes('factual-review-incomplete') &&
      invalidCalendarDecision.reasonCodes.includes('human-review-incomplete') &&
      invalidCalendarDecision.reasonCodes.includes('automated-triage-invalid'),
    wrongKindFactualResearchIsBlocked:
      invalidFactualResearchDecision.reasonCodes.includes('factual-source-research-invalid'),
    requiredFactualReviewCannotBeNotApplicable:
      requiredFactualReviewDecision.reasonCodes.includes('factual-review-incomplete'),
    malformedEvidenceArrayFailsClosed:
      !malformedEvidenceDecision.eligibleForPublicationPipeline &&
      malformedEvidenceDecision.disposition === 'quarantine',
    duplicateEvidenceIdsAreBlocked:
      duplicateEvidenceDecision.reasonCodes.includes('provenance-evidence-incomplete'),
    duplicateRegistryEntriesAreBlocked:
      duplicateEntryDecision.reasonCodes.includes('registry-contract-invalid'),
  };
}

export function buildValidationArtifacts() {
  const mock = loadTsModule(MOCK_PATH).default;
  const registry = loadTsModule(REGISTRY_PATH).IELTS_READING_RIGHTS_REGISTRY;
  const contract = loadTsModule(CONTRACT_PATH);
  const assess = contract.assessIeltsReadingRights;
  const assets = sourceAssets(mock);
  const assetById = new Map(assets.map(asset => [asset.assetId, asset]));
  const allRegistryIds = registry.entries.map(entry => entry.assetId);
  const targetRecords = EXPECTED_ASSET_IDS.map(assetId => {
    const matches = registry.entries.filter(entry => entry.assetId === assetId);
    assert(matches.length === 1, `${assetId}: se esperaba exactamente un registro global.`);
    return matches[0];
  });
  const registryIds = targetRecords.map(entry => entry.assetId);
  const evidenceIds = registry.evidence.map(evidence => evidence.id);

  assert(mock.id === 'set-1' && mock.examSlug === 'ielts', 'El mock objetivo no es IELTS set-1.');
  assert(assets.length === 3, 'IELTS set-1 debe contener exactamente tres secciones Reading.');
  assert(
    JSON.stringify(registryIds) === JSON.stringify(EXPECTED_ASSET_IDS),
    'F0.2a debe resolver exactamente las tres secciones Reading de set-1 y en orden estable.',
  );
  assert(
    new Set(allRegistryIds).size === allRegistryIds.length,
    'Hay assetId duplicados en el registry global.',
  );
  assert(new Set(evidenceIds).size === evidenceIds.length, 'Hay evidenceId duplicados.');
  assert(
    registry.schemaVersion === contract.IELTS_READING_RIGHTS_REGISTRY_SCHEMA_VERSION,
    'La versión del registry no coincide con el contrato.',
  );
  assert(
    registry.defaultDisposition.disposition === 'quarantine' &&
      registry.defaultDisposition.rightsBasis === 'unknown-quarantined',
    'La disposición por defecto debe ser cuarentena unknown-quarantined.',
  );

  for (const evidence of registry.evidence) {
    assert(/^\d{4}-\d{2}-\d{2}$/u.test(evidence.accessedAt), `${evidence.id}: accessedAt inválido.`);
    assert(Boolean(evidence.url || evidence.repositoryPath), `${evidence.id}: falta ubicación.`);
    if (evidence.url) assert(/^https:\/\//u.test(evidence.url), `${evidence.id}: URL no HTTPS.`);
    if (evidence.repositoryPath) {
      assert(existsSync(resolve(ROOT, evidence.repositoryPath)), `${evidence.id}: ruta inexistente.`);
    }
  }

  const decisions = targetRecords.map(record => {
    const asset = assetById.get(record.assetId);
    assert(asset, `${record.assetId}: no existe en el mock.`);
    assert(record.sourceObjectSha256 === asset.sourceObjectSha256, `${record.assetId}: object hash drift.`);
    assert(record.passageSha256 === asset.passageSha256, `${record.assetId}: passage hash drift.`);
    for (const evidenceId of [
      ...record.moduleAssessment.evidenceIds,
      ...record.authorship.evidenceIds,
      ...record.provenanceAssessment.evidenceIds,
      ...record.rightsAssessment.evidenceIds,
      ...record.factualSourceResearch.sourceEvidenceIds,
      ...record.factualReview.sourceEvidenceIds,
      ...record.humanReview.evidenceIds,
    ]) {
      assert(evidenceIds.includes(evidenceId), `${record.assetId}: evidencia inexistente ${evidenceId}.`);
    }
    const decision = assess(registry, asset);
    assert(!decision.eligibleForPublicationPipeline, `${record.assetId}: no debe avanzar.`);
    assert(decision.disposition === 'quarantine', `${record.assetId}: debe permanecer en cuarentena.`);
    assert(record.automatedTriage.isHumanApproval === false, `${record.assetId}: triage no puede aprobar.`);
    return {
      assetId: record.assetId,
      title: record.provenanceAssessment.observedWorkTitle,
      sourceObjectSha256: asset.sourceObjectSha256,
      passageSha256: asset.passageSha256,
      moduleStatus: record.moduleAssessment.status,
      provenanceStatus: record.provenanceAssessment.status,
      rightsBasis: decision.rightsBasis,
      authorizationEvidenceStatus: record.rightsAssessment.authorizationEvidenceStatus,
      humanReviewStatus: record.humanReview.status,
      disposition: decision.disposition,
      eligibleForPublicationPipeline: decision.eligibleForPublicationPipeline,
      reasonCodes: decision.reasonCodes,
    };
  });

  const missingDecision = assess(registry, {
    assetId: 'mock:set-1:reading-part-missing',
    sourceObjectSha256: '0'.repeat(64),
    passageSha256: null,
  });
  const mismatchDecision = assess(registry, {
    ...assets[0],
    sourceObjectSha256: '0'.repeat(64),
  });
  const mutations = contractMutationChecks(registry, assess, assets[0]);
  assert(
    missingDecision.reasonCodes.includes('missing-rights-registry-entry'),
    'Un activo ausente del registry no quedó bloqueado.',
  );
  assert(
    mismatchDecision.reasonCodes.includes('content-hash-mismatch'),
    'Una mutación de contenido no quedó bloqueada.',
  );
  assert(Object.values(mutations).every(Boolean), 'Falló una transición sintética del contrato.');

  const forbiddenPayloadPaths = findForbiddenKeys(registry);
  const learnerOrContactPiiPaths = findLearnerOrContactPii(registry);
  assert(forbiddenPayloadPaths.length === 0, `El registry contiene payload evaluable: ${forbiddenPayloadPaths.join(', ')}`);
  assert(
    learnerOrContactPiiPaths.length === 0,
    `El registry contiene PII de estudiante/contacto: ${learnerOrContactPiiPaths.join(', ')}`,
  );

  const blockerCounts = [...new Set(decisions.flatMap(decision => decision.reasonCodes))]
    .sort()
    .map(reasonCode => ({
      reasonCode,
      affectedAssets: decisions.filter(decision => decision.reasonCodes.includes(reasonCode)).length,
    }));
  const sources = [CONTRACT_PATH, REGISTRY_PATH, MOCK_PATH, VALIDATOR_PATH, TEST_PATH]
    .filter(path => existsSync(resolve(ROOT, path)))
    .map(path => ({ path, sha256: sourceSha256(path) }));

  const scopedEvidenceIds = new Set(targetRecords.flatMap(record => [
    ...record.moduleAssessment.evidenceIds,
    ...record.authorship.evidenceIds,
    ...record.provenanceAssessment.evidenceIds,
    ...record.rightsAssessment.evidenceIds,
    ...record.factualSourceResearch.sourceEvidenceIds,
    ...record.factualReview.sourceEvidenceIds,
    ...record.humanReview.evidenceIds,
  ]));
  const blindReview = {
    schemaVersion: 'ielts-reading-rights-blind-review.v1',
    generatedAt: GENERATED_AT,
    reviewScope: 'F0.2a — mock set-1 Reading only',
    excludes: ['passage text', 'questions', 'options', 'answer keys', 'student data'],
    instruction:
      'Review only contract completeness, source identity, evidence scope and deny-by-default behavior. This packet cannot support an IELTS-content or legal-clearance verdict.',
    evidence: registry.evidence.filter(evidence => scopedEvidenceIds.has(evidence.id)).map(evidence => ({
      id: evidence.id,
      kind: evidence.kind,
      label: evidence.label,
      location: evidence.url ?? evidence.repositoryPath,
      accessedAt: evidence.accessedAt,
      note: evidence.note,
    })),
    records: decisions,
    contractMutationChecks: mutations,
  };
  assert(findForbiddenKeys(blindReview).length === 0, 'El packet ciego contiene payload evaluable.');
  assert(
    findLearnerOrContactPii(blindReview).length === 0,
    'El packet ciego contiene PII de estudiante/contacto.',
  );

  const validation = {
    schemaVersion: 'ielts-reading-rights-validation.v1',
    generatedAt: GENERATED_AT,
    unit: 'F0.2a — Contrato deny-by-default y expediente de mock set-1',
    status: 'pass',
    scope: {
      targetMock: mock.id,
      readingAssetsInSource: assets.length,
      registryEntries: targetRecords.length,
      registryEntriesTotal: registry.entries.length,
      coveredAssetIds: registryIds,
      parentF02RemainsOpen: true,
    },
    policy: {
      defaultDisposition: registry.defaultDisposition,
      automatedTriageCanApprove: false,
      humanApprovalRequired: true,
      independentReviewerRequired: true,
      editorialReviewerIdentityAllowed: true,
      learnerAndContactPiiForbidden: true,
      contentHashPinned: true,
    },
    checks: {
      exactSetOneCoverage:
        registryIds.length === 3 &&
        JSON.stringify(registryIds) === JSON.stringify(EXPECTED_ASSET_IDS),
      uniqueAssetIds: new Set(allRegistryIds).size === allRegistryIds.length,
      uniqueEvidenceIds: new Set(evidenceIds).size === evidenceIds.length,
      sourceHashesCurrent: true,
      actualAssetsAllQuarantined: decisions.every(decision => !decision.eligibleForPublicationPipeline),
      missingRecordDenied: missingDecision.disposition === 'quarantine',
      contentMutationDenied: mismatchDecision.disposition === 'quarantine',
      registryStoresNoAssessmentPayload: forbiddenPayloadPaths.length === 0,
      registryStoresNoLearnerOrContactPii: learnerOrContactPiiPaths.length === 0,
      syntheticContractTransitionsPass: Object.values(mutations).every(Boolean),
    },
    decisions,
    blockerCounts,
    negativeControl: {
      missingRecord: missingDecision,
      contentHashMismatch: mismatchDecision,
    },
    contractMutationChecks: mutations,
    evidenceSearchLimit:
      'Directed and non-exhaustive. Authorization evidence was not located in the reviewed sources; no universal absence or legal conclusion is asserted.',
    sources,
  };
  assert(findForbiddenKeys(validation).length === 0, 'La validación contiene payload evaluable.');
  assert(
    findLearnerOrContactPii(validation).length === 0,
    'La validación contiene PII de estudiante/contacto.',
  );
  return { validation, blindReview };
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
  const mode = process.argv.includes('--write') ? 'write' : process.argv.includes('--check') ? 'check' : 'print';
  const artifacts = buildValidationArtifacts();
  if (mode === 'write') {
    writeJson(VALIDATION_PATH, artifacts.validation);
    writeJson(BLIND_REVIEW_PATH, artifacts.blindReview);
  } else if (mode === 'check') {
    checkJson(VALIDATION_PATH, artifacts.validation);
    checkJson(BLIND_REVIEW_PATH, artifacts.blindReview);
  }
  process.stdout.write(`${JSON.stringify({
    status: artifacts.validation.status,
    mode,
    assets: artifacts.validation.scope.registryEntries,
    quarantined: artifacts.validation.decisions.filter(row => row.disposition === 'quarantine').length,
    checks: artifacts.validation.checks,
  }, null, 2)}\n`);
}
