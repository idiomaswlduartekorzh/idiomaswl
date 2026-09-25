import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import { ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK, ENGLISH_DIAGNOSTIC_WRITING_BANK } from '../src/server/diagnostic/bank/index.ts';
import { diagnosticPilotBankSha256 } from '../src/server/diagnostic/pilot-analytics.ts';
import { validateDiagnosticProductionRelease } from '../src/server/diagnostic/release-runtime-core.ts';

const migration = readFileSync(new URL('../supabase/migrations/20260925041500_diagnostic_pilot_enrollments.sql', import.meta.url), 'utf8');
const start = readFileSync(new URL('../src/server/diagnostic/start.server.ts', import.meta.url), 'utf8');
const repository = readFileSync(new URL('../src/server/diagnostic/repository.server.ts', import.meta.url), 'utf8');
const committedCertificate = JSON.parse(readFileSync(new URL('../config/diagnostic/release-certificate.json', import.meta.url), 'utf8'));
const currentBankSha256 = diagnosticPilotBankSha256({
  bank: ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK,
  writingBank: ENGLISH_DIAGNOSTIC_WRITING_BANK,
});

function readiness(env, certificate) {
  return validateDiagnosticProductionRelease({
    env: { DIAGNOSTIC_RELEASE_SOURCE_SHA256: certificate.sourceSha256 ?? '', ...env },
    certificate,
    currentBankSha256,
  });
}

function readyCertificate() {
  return {
    certificateVersion: 'english-diagnostic-release-certificate-v1',
    status: 'ready',
    releaseId: 'diagnostic-en-release-001',
    bankSnapshotSha256: diagnosticPilotBankSha256({
      bank: ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK,
      writingBank: ENGLISH_DIAGNOSTIC_WRITING_BANK,
    }),
    sourceSha256: 'a'.repeat(64),
    evidenceVersion: 'english-diagnostic-release-evidence-v1',
    issuedAt: '2026-09-25T12:00:00.000Z',
    issuedBy: 'release-reviewer',
  };
}

test('the committed production certificate fails closed', () => {
  const result = readiness({ DIAGNOSTIC_RELEASE_ID: 'diagnostic-en-release-001' }, committedCertificate);
  assert.equal(result.ready, false);
  assert.ok(result.blockers.includes('certificate-not-ready'));
});

test('production requires the exact release id and current approved bank snapshot', () => {
  const certificate = readyCertificate();
  assert.equal(readiness({ DIAGNOSTIC_RELEASE_ID: certificate.releaseId }, certificate).ready, true);
  assert.ok(readiness({ DIAGNOSTIC_RELEASE_ID: 'wrong-release' }, certificate)
    .blockers.includes('release-id-mismatch'));
  assert.ok(readiness({ DIAGNOSTIC_RELEASE_ID: certificate.releaseId }, {
    ...certificate, bankSnapshotSha256: 'b'.repeat(64),
  }).blockers.includes('bank-snapshot-mismatch'));
  assert.ok(readiness({
    DIAGNOSTIC_RELEASE_ID: certificate.releaseId,
    DIAGNOSTIC_RELEASE_SOURCE_SHA256: 'b'.repeat(64),
  }, certificate).blockers.includes('deployed-source-fingerprint-mismatch'));
});

test('pilot enrollment is server-only and binds a versioned consent', () => {
  assert.match(migration, /pilot_consent_version text/);
  assert.match(migration, /status in \('consented','completed'\).*pilot_consent_version is not null/is);
  assert.match(migration, /revoke all on table public\.diagnostic_pilot_enrollments[\s\S]*from public, anon, authenticated, service_role/i);
  assert.match(repository, /data\.pilot_consent_version === input\.pilotConsentVersion/);
});

test('start separates pilot enrollment from production certification', () => {
  assert.match(start, /accessMode === 'production'/);
  assert.match(start, /RELEASE_NOT_AUTHORIZED/);
  assert.match(start, /accessMode === 'pilot'/);
  assert.match(start, /PILOT_ACCESS_REQUIRED/);
});

test('certificate issuance refuses HOLD evidence without modifying the committed certificate', () => {
  const certificateUrl = new URL('../config/diagnostic/release-certificate.json', import.meta.url);
  const before = readFileSync(certificateUrl, 'utf8');
  const result = spawnSync(process.execPath, [
    '--experimental-strip-types', '--no-warnings', '--experimental-loader', './tests/ts-paths-loader.mjs',
    'scripts/check-diagnostic-release-readiness.mjs', '--issue-certificate',
  ], {
    cwd: new URL('..', import.meta.url),
    env: { ...process.env, DIAGNOSTIC_RELEASE_ID: 'diagnostic-en-release-001', DIAGNOSTIC_RELEASE_ISSUED_BY: 'fixture' },
    encoding: 'utf8',
  });
  assert.notEqual(result.status, 0);
  assert.match(`${result.stdout}${result.stderr}`, /Cannot issue.*while gates are on HOLD/i);
  assert.equal(readFileSync(certificateUrl, 'utf8'), before);
});
