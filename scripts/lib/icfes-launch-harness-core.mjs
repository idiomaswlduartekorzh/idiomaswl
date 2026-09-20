import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { buildEffectiveIcfesMock, canonicalJson } from './icfes-runtime-effective.mjs';

const ROOT = 'config/icfes-launch-harness';
const HASH_PATTERN = /^[a-f0-9]{64}$/;
const RAW_MOCKS = Array.from({ length: 23 }, (_, index) =>
  `src/data/mocks/icfes-mock-${String(index + 1).padStart(2, '0')}.ts`);
const CANDIDATE_ARTIFACTS = [
  `${ROOT}/policy.json`,
  'src/data/icfes/own-mock-expansion-manifest.json',
  'src/data/icfes/own-mock-expansion.schema.json',
  ...RAW_MOCKS,
  'src/data/mocks/index.ts',
  'src/data/mocks/normalize-icfes-mock.ts',
  'src/data/mocks/icfes-current-part-seven.ts',
  'src/lib/icfes/commercial-contract.ts',
  'src/lib/icfes/terms.ts',
  'src/lib/icfes/attempt-contract.ts',
  'src/lib/icfes/attempt-store.server.ts',
  'src/lib/icfes/attempt-token.server.ts',
  'src/lib/icfes/product-config.server.ts',
  'src/lib/icfes/personalized-feedback.server.ts',
  'src/lib/icfes/payment-events.server.ts',
  'src/lib/analytics/icfes.ts',
  'src/lib/xpress-commerce/catalog.ts',
  'src/lib/xpress-commerce/terms.ts',
  'src/lib/xpress-commerce/payment.ts',
  'src/lib/xpress-commerce/payments.server.ts',
  'src/lib/xpress-commerce/subscriptions.server.ts',
  'src/lib/xpress-commerce/fulfillment.server.ts',
  'src/app/api/icfes/attempts/grade/route.ts',
  'src/app/api/icfes/attempts/[attemptId]/lead/route.ts',
  'src/app/api/icfes/attempts/[attemptId]/free-summary/route.ts',
  'src/app/api/icfes/attempts/[attemptId]/detail/route.ts',
  'src/app/api/icfes/pass/checkout/route.ts',
  'src/app/api/xpress-orders/route.ts',
  'src/components/icfes/IcfesLeadOfferFlow.tsx',
  'src/components/icfes/IcfesLeadOfferFlow.module.css',
  'src/app/(site)/examenes/[exam]/practica/[mockId]/PracticeClient.tsx',
  'src/app/(site)/practica/icfes-saber-11/resultados/[attemptId]/IcfesPaidResultClient.tsx',
  'src/app/(site)/suscripcion/examenes/XpressMembershipClient.tsx',
  'src/app/(site)/suscripcion/examenes/page.tsx',
  'src/app/(auth)/login/AuthForm.tsx',
  'src/app/layout.tsx',
  'src/app/(site)/examenes/page.tsx',
  'src/app/(site)/clases-de-ingles/page.tsx',
  'src/app/(site)/clases-de-ingles-bucaramanga/page.tsx',
  'src/components/icfes/IcfesDashboardClient.tsx',
  'supabase/migrations/20260912193000_icfes_commercial_contract_v2.sql',
  'supabase/migrations/20260912194500_icfes_lead_consent_ledger.sql',
  'supabase/migrations/20260912200000_xpress_icfes_commercial_contract_v2.sql',
  'config/icfes-launch-harness/review-report.schema.json',
  '.env.example',
  'package.json',
  'playwright.config.ts',
  'scripts/check-icfes-own-expansion.mjs',
  'scripts/icfes-launch-harness.mjs',
  'scripts/lib/icfes-launch-harness-core.mjs',
  'scripts/lib/icfes-runtime-effective.mjs',
  'tests/icfes-final-integration.test.mjs',
  'tests/icfes-commercial-database.test.mjs',
  'tests/icfes-launch-harness.test.mjs',
  'tests/icfes-analytics.test.mjs',
  'tests/icfes-product.test.mjs',
  'tests/xpress-payments-database.test.mjs',
  'tests/e2e/icfes-commercial-funnel.spec.ts',
  'docs/icfes-product-activation.md',
  'docs/icfes-analytics-instrumentation.md',
  'docs/icfes-final-integration-20260912.md'
];

export function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

export function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

function readJson(repoRoot, relativePath) {
  return JSON.parse(readFileSync(path.join(repoRoot, relativePath), 'utf8'));
}

function writeJson(repoRoot, relativePath, value) {
  writeFileSync(path.join(repoRoot, relativePath), `${JSON.stringify(value, null, 2)}\n`);
}

function without(value, key) {
  const copy = structuredClone(value);
  delete copy[key];
  return copy;
}

export function calculateWorkOrderDigest(workOrder) {
  return sha256(stableStringify(without(workOrder, 'workOrderDigest')));
}

export function calculateCandidateDigest(candidate) {
  return sha256(stableStringify(without(candidate, 'candidateDigest')));
}

function fileRecord(repoRoot, relativePath) {
  const absolute = path.join(repoRoot, relativePath);
  assert.ok(existsSync(absolute), `Falta artefacto candidato: ${relativePath}`);
  return { path: relativePath, sha256: sha256(readFileSync(absolute)) };
}

function bundleDigest(manifest, key) {
  return sha256(stableStringify(manifest.mocks.map((record) => ({ mockId: record.mockId, hash: record[key] }))));
}

export async function computeRuntimeHashes(repoRoot) {
  const records = [];
  for (let index = 1; index <= 23; index += 1) {
    const mockId = `mock-${String(index).padStart(2, '0')}`;
    const moduleUrl = pathToFileURL(path.join(repoRoot, `src/data/mocks/icfes-${mockId}.ts`)).href;
    const { default: raw } = await import(moduleUrl);
    records.push({
      mockId,
      rawHash: sha256(JSON.stringify(raw)),
      runtimeHash: sha256(canonicalJson(buildEffectiveIcfesMock(raw))),
    });
  }
  return records;
}

export async function refreshHarness(repoRoot) {
  const policy = readJson(repoRoot, `${ROOT}/policy.json`);
  const workOrderPath = `${ROOT}/work-orders/icfes-final-integration-v2.json`;
  const workOrder = readJson(repoRoot, workOrderPath);
  workOrder.artifactPaths = CANDIDATE_ARTIFACTS;
  workOrder.inputArtifacts = CANDIDATE_ARTIFACTS.map((item) => fileRecord(repoRoot, item));
  workOrder.workOrderDigest = calculateWorkOrderDigest(workOrder);
  writeJson(repoRoot, workOrderPath, workOrder);

  const manifest = readJson(repoRoot, 'src/data/icfes/own-mock-expansion-manifest.json');
  const candidate = {
    candidateId: policy.candidateId,
    workOrderId: workOrder.workOrderId,
    workOrderDigest: workOrder.workOrderDigest,
    baseCommit: workOrder.baseCommit,
    state: 'BLOCKED_EDITORIAL',
    rawBundleDigest: bundleDigest(manifest, 'contentHash'),
    runtimeBundleDigest: bundleDigest(manifest, 'runtimeContentHash'),
    subjectArtifacts: CANDIDATE_ARTIFACTS.map((item) => fileRecord(repoRoot, item)),
    candidateDigest: '',
  };
  candidate.candidateDigest = calculateCandidateDigest(candidate);
  writeJson(repoRoot, `${ROOT}/candidate-ledger.json`, { schemaVersion: 2, candidates: [candidate] });
  return { candidate, workOrder };
}

function loadReports(repoRoot, policy) {
  const directory = path.join(repoRoot, policy.artifactRoot);
  if (!existsSync(directory)) return [];
  return readdirSync(directory).filter((name) => name.endsWith('.json')).sort()
    .map((name) => ({ name, report: readJson(repoRoot, path.join(policy.artifactRoot, name)) }));
}

function reportBlocks(report) {
  const verdict = typeof report.verdict === 'string' ? report.verdict : report.verdict?.status;
  return verdict === 'BLOCKED'
    || (report.findings ?? []).some((finding) => finding.blockProduction === true);
}

function canonicalReportRole(role) {
  return role === 'editorial-adjudicator-agent-input' ? 'editorial-adjudicator' : role;
}

export async function validateHarness(repoRoot) {
  const policy = readJson(repoRoot, `${ROOT}/policy.json`);
  const workOrder = readJson(repoRoot, `${ROOT}/work-orders/icfes-final-integration-v2.json`);
  const ledger = readJson(repoRoot, `${ROOT}/candidate-ledger.json`);
  assert.equal(policy.schemaVersion, 2);
  assert.equal(policy.commercialContract.examSlug, 'icfes');
  assert.deepEqual(policy.commercialContract.offers.map((offer) => [offer.priceCop, offer.billing, offer.personalizedFeedback]), [
    [12900, 'one-time', false], [49900, 'recurring-30-days', false], [99900, 'recurring-30-days', true],
  ]);
  assert.equal(policy.commercialContract.offers[2].benefit, 'Feedback pedagógico personalizado de WeLearn, generado automáticamente a partir de tus resultados');
  assert.equal(policy.expansion.frozen, true);
  assert.deepEqual(policy.expansion.workQueue, []);
  assert.equal(policy.expansion.publicationAllowed, false);
  assert.equal(policy.paymentPolicy.defaultEnvironment, 'sandbox');
  assert.equal(policy.paymentPolicy.productionEnabled, false);
  assert.equal(policy.paymentPolicy.remoteChargesAllowedByHarness, false);
  assert.equal(workOrder.workOrderDigest, calculateWorkOrderDigest(workOrder));
  assert.deepEqual(workOrder.artifactPaths, CANDIDATE_ARTIFACTS);
  for (const artifact of workOrder.inputArtifacts) {
    assert.match(artifact.sha256, HASH_PATTERN);
    assert.deepEqual(artifact, fileRecord(repoRoot, artifact.path));
  }

  assert.equal(ledger.schemaVersion, 2);
  assert.equal(ledger.candidates.length, 1);
  const candidate = ledger.candidates[0];
  assert.equal(candidate.candidateId, policy.candidateId);
  assert.equal(candidate.workOrderDigest, workOrder.workOrderDigest);
  assert.equal(candidate.candidateDigest, calculateCandidateDigest(candidate));
  for (const artifact of candidate.subjectArtifacts) assert.deepEqual(artifact, fileRecord(repoRoot, artifact.path));

  const manifest = readJson(repoRoot, 'src/data/icfes/own-mock-expansion-manifest.json');
  assert.equal(manifest.mocks.length, 23);
  assert.equal(candidate.rawBundleDigest, bundleDigest(manifest, 'contentHash'));
  assert.equal(candidate.runtimeBundleDigest, bundleDigest(manifest, 'runtimeContentHash'));
  const effective = await computeRuntimeHashes(repoRoot);
  for (const record of effective) {
    const declared = manifest.mocks.find((item) => item.mockId === record.mockId);
    assert.equal(record.rawHash, declared?.contentHash, `${record.mockId}: raw hash obsoleto`);
    assert.equal(record.runtimeHash, declared?.runtimeContentHash, `${record.mockId}: runtime hash obsoleto`);
  }
  assert.equal(existsSync(path.join(repoRoot, 'src/data/mocks/icfes-mock-24.ts')), false);
  assert.equal(manifest.mocks.some((record) => record.mockId === 'mock-24'), false);
  const registry = readFileSync(path.join(repoRoot, 'src/data/mocks/index.ts'), 'utf8');
  assert.equal(registry.includes("'icfes:mock-24'"), false);

  const reports = loadReports(repoRoot, policy);
  const reportStatus = reports.map(({ name, report }) => {
    const role = canonicalReportRole(report.role);
    const verdict = typeof report.verdict === 'string' ? report.verdict : report.verdict?.status;
    assert.ok(policy.requiredReportRoles.includes(role), `${name}: rol desconocido`);
    assert.ok(['PASS', 'BLOCKED'].includes(verdict), `${name}: veredicto inválido`);
    if (role === 'editorial-adjudicator') {
      assert.ok(Array.isArray(report.decisions) && report.decisions.length === 65, `${name}: adjudicación incompleta`);
      assert.equal(report.humanApprovalIssued, false, `${name}: un informe de agente no puede emitir aprobación humana`);
    } else {
      assert.ok(Array.isArray(report.checks) && Array.isArray(report.findings), `${name}: estructura incompleta`);
    }
    return {
      name,
      role,
      verdict,
      boundToCandidate: report.workOrderId === workOrder.workOrderId
        && report.workOrderDigest === workOrder.workOrderDigest
        && report.candidateId === candidate.candidateId
        && report.candidateDigest === candidate.candidateDigest,
      blockingFindings: role === 'editorial-adjudicator'
        ? report.decisionCounts?.productionBlockingDecisionEntries ?? 0
        : (report.findings ?? []).filter((finding) => finding.blockProduction === true).length,
    };
  });
  const blocked = reports.some(({ report }) => reportBlocks(report));
  const boundPassingRoles = new Set(reportStatus.filter((item) => item.boundToCandidate && item.verdict === 'PASS').map((item) => item.role));
  const state = blocked
    ? 'BLOCKED_EDITORIAL'
    : policy.requiredReportRoles.some((role) => !boundPassingRoles.has(role))
      ? 'AWAITING_REVIEW_REPORTS'
      : 'READY_FOR_RELEASE_CANDIDATE';
  assert.equal(candidate.state, state, `Estado declarado ${candidate.state}; estado derivado ${state}`);
  return {
    ok: true,
    state,
    workOrderId: workOrder.workOrderId,
    workOrderDigest: workOrder.workOrderDigest,
    candidateId: candidate.candidateId,
    candidateDigest: candidate.candidateDigest,
    rawBundleDigest: candidate.rawBundleDigest,
    runtimeBundleDigest: candidate.runtimeBundleDigest,
    mocks: effective.length,
    reports: reportStatus,
  };
}
