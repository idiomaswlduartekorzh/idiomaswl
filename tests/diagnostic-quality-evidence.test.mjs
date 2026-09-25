import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import {
  recordDiagnosticQualityEvidence,
  validateDiagnosticQualityReceipt,
} from '../scripts/lib/diagnostic-quality-evidence.mjs';

const sourceSha256 = 'a'.repeat(64);
const receiptSha256 = 'b'.repeat(64);
const commitSha = 'c'.repeat(40);
const recordedAt = '2026-09-25T12:00:00.000Z';

function receipt() {
  return {
    receiptVersion: 'diagnostic-quality-evidence-v1', decision: 'PASS',
    startedAt: '2026-09-25T11:00:00.000Z', completedAt: '2026-09-25T11:10:00.000Z',
    sourceSha256, commitSha,
    checks: {
      workingTreeClean: true,
      diagnosticSuite: { passed: true, testCount: 214 },
      typescript: { passed: true },
      productionBuild: { passed: true, staticPageCount: 2564 },
    },
    claims: { sourceUnchangedDuringRun: true, outputsContainSecrets: false },
  };
}

function validate(candidate = receipt()) {
  return validateDiagnosticQualityReceipt({
    receipt: candidate, receiptSha256, expectedSourceSha256: sourceSha256, recordedAt,
  });
}

test('quality receipt proves suite, TypeScript and build for one source fingerprint', () => {
  assert.deepEqual(validate(), {
    sourceSha256, verifiedCommit: commitSha, receiptSha256,
    diagnosticTestCount: 214, staticPageCount: 2564,
  });
});

test('stale, dirty or source-mismatched quality evidence fails closed', () => {
  const dirty = receipt();
  dirty.checks.workingTreeClean = false;
  assert.throws(() => validate(dirty), /does not prove/);
  const changed = receipt();
  changed.sourceSha256 = 'd'.repeat(64);
  assert.throws(() => validate(changed), /does not prove/);
  const stale = receipt();
  stale.completedAt = '2026-09-20T11:10:00.000Z';
  assert.throws(() => validate(stale), /stale/);
});

test('recording quality proof touches no academic, privacy or pilot decision', () => {
  const currentEvidence = {
    evidenceVersion: 'english-diagnostic-release-evidence-v1', updatedAt: null,
    database: { authenticatedFlowVerified: false }, writingOperations: { mode: null },
    privacy: { retentionPolicyVersion: null }, pilot: { validationDecision: null },
    quality: {
      diagnosticSuiteSourceSha256: null, productionBuildSourceSha256: null,
      verifiedCommit: null, verifiedAt: null, verifiedBy: null, receiptSha256: null,
    },
  };
  const result = recordDiagnosticQualityEvidence({
    currentEvidence, validated: validate(), recordedAt, attestedBy: 'codex-local-verifier',
  });
  assert.equal(result.quality.diagnosticSuiteSourceSha256, sourceSha256);
  assert.equal(result.quality.productionBuildSourceSha256, sourceSha256);
  assert.equal(result.quality.receiptSha256, receiptSha256);
  assert.equal(result.database.authenticatedFlowVerified, false);
  assert.equal(result.privacy.retentionPolicyVersion, null);
  assert.equal(result.pilot.validationDecision, null);
});

test('quality verifier replaces conflicting heap limits and the release hash includes every diagnostic runner', () => {
  const verifier = readFileSync(new URL('../scripts/verify-diagnostic-release-quality.mjs', import.meta.url), 'utf8');
  const sourceHash = readFileSync(new URL('../scripts/lib/diagnostic-release-source.mjs', import.meta.url), 'utf8');
  assert.match(verifier, /!option\.startsWith\('--max-old-space-size='\)/);
  assert.match(verifier, /--max-old-space-size=8192/);
  assert.match(sourceHash, /path\.startsWith\('scripts\/'\) && path\.includes\('diagnostic-'\)/);
});
