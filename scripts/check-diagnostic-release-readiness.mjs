import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import { getDiagnosticWritingProviderReadiness } from '../src/server/diagnostic/writing-provider.ts';
import {
  ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK,
  ENGLISH_DIAGNOSTIC_WRITING_BANK,
} from '../src/server/diagnostic/bank/index.ts';
import { diagnosticPilotBankSha256 } from '../src/server/diagnostic/pilot-analytics.ts';
import { validateDiagnosticProductionRolloutConfiguration } from '../src/server/diagnostic/production-rollout.ts';
import { buildDiagnosticReleaseReadiness } from './lib/diagnostic-release-readiness.mjs';
import { diagnosticReleaseSourceSha256 } from './lib/diagnostic-release-source.mjs';
import { diagnosticGovernanceSnapshots } from './lib/diagnostic-governance-snapshots.mjs';
import { diagnosticListeningPreproductionReadiness } from './lib/diagnostic-listening-preproduction-review.mjs';
import { ENGLISH_DIAGNOSTIC_LISTENING_LOWER_PRODUCTION_BRIEFS } from '../src/server/diagnostic/bank/listening-production-lower.en.ts';
import { ENGLISH_DIAGNOSTIC_LISTENING_MID_PRODUCTION_BRIEFS } from '../src/server/diagnostic/bank/listening-production-mid.en.ts';
import { ENGLISH_DIAGNOSTIC_LISTENING_ADVANCED_PRODUCTION_BRIEFS } from '../src/server/diagnostic/bank/listening-production-advanced.en.ts';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const readJson = path => JSON.parse(readFileSync(join(root, path), 'utf8'));
const evidence = readJson('config/diagnostic/release-evidence.json');
const privateRoot = resolve(root, '.diagnostic-private');
const readPrivateEvidence = path => {
  if (!path || isAbsolute(path)) return { bytes: null, json: null, sha256: null };
  const resolvedPath = resolve(root, path);
  const privateRelative = relative(privateRoot, resolvedPath);
  if (!privateRelative || privateRelative === '..' || privateRelative.startsWith(`..${sep}`)
    || !existsSync(resolvedPath)) return { bytes: null, json: null, sha256: null };
  const bytes = readFileSync(resolvedPath);
  return {
    bytes,
    json: JSON.parse(bytes.toString('utf8')),
    sha256: createHash('sha256').update(bytes).digest('hex'),
  };
};
const pilotEvidence = readPrivateEvidence(evidence.pilot?.reportPath);
const pilotCaptureEvidence = readPrivateEvidence(evidence.pilot?.captureReceiptPath);
const pilotValidationEvidence = readPrivateEvidence(evidence.pilot?.validationManifestPath);
const migrationNames = readdirSync(join(root, 'supabase/migrations'))
  .filter(name => name.includes('diagnostic') && name.endsWith('.sql'))
  .sort();
const currentCommit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
const workingTreeClean = execFileSync('git', ['status', '--porcelain'], { cwd: root, encoding: 'utf8' }).trim() === '';
const currentSourceSha256 = diagnosticReleaseSourceSha256(root);
const listeningBriefs = [
  ...ENGLISH_DIAGNOSTIC_LISTENING_LOWER_PRODUCTION_BRIEFS,
  ...ENGLISH_DIAGNOSTIC_LISTENING_MID_PRODUCTION_BRIEFS,
  ...ENGLISH_DIAGNOSTIC_LISTENING_ADVANCED_PRODUCTION_BRIEFS,
];
const productionRollout = validateDiagnosticProductionRolloutConfiguration(process.env);

const report = buildDiagnosticReleaseReadiness({
  bankReadiness: readJson('docs/diagnostic-bank-readiness.json'),
  approvals: readJson('config/diagnostic/english-bank-approvals.json'),
  audioPublications: readJson('config/diagnostic/english-listening-audio-publications.json'),
  listeningPreproductionReadiness: diagnosticListeningPreproductionReadiness(
    listeningBriefs,
    readJson('config/diagnostic/english-listening-preproduction-approvals.json'),
  ),
  voiceCasting: readJson('config/diagnostic/english-listening-voice-casting.json'),
  pilotCriteria: readJson('config/diagnostic/pilot-publication-criteria.json'),
  retentionPolicy: readJson('config/diagnostic/data-retention-policy.json'),
  deliveryPolicy: readJson('config/diagnostic/delivery-policy.json'),
  releaseEvidence: evidence,
  pilotReport: pilotEvidence.json,
  pilotReportSha256: pilotEvidence.sha256,
  pilotCaptureReceipt: pilotCaptureEvidence.json,
  pilotCaptureReceiptSha256: pilotCaptureEvidence.sha256,
  pilotValidationManifest: pilotValidationEvidence.json,
  pilotValidationManifestSha256: pilotValidationEvidence.json?.manifestSha256 ?? null,
  currentBankSha256: diagnosticPilotBankSha256({
    bank: ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK,
    writingBank: ENGLISH_DIAGNOSTIC_WRITING_BANK,
  }),
  providerReadiness: getDiagnosticWritingProviderReadiness(process.env),
  expectedMigration: migrationNames.at(-1) ?? null,
  currentCommit,
  currentSourceSha256,
  governanceSnapshots: diagnosticGovernanceSnapshots(root),
  workingTreeClean,
  activation: {
    engineEnabled: process.env.DIAGNOSTIC_ADAPTIVE_ENABLED === 'true',
    uiEnabled: process.env.DIAGNOSTIC_ADAPTIVE_UI_ENABLED === 'true',
    accessMode: process.env.DIAGNOSTIC_ACCESS_MODE,
    productionRollout: {
      ready: productionRollout.valid,
      rolloutId: productionRollout.rolloutId,
      percentage: productionRollout.percentage,
      blockers: productionRollout.blockers,
    },
  },
});

if (process.argv.includes('--issue-certificate')) {
  if (!report.releaseReady) throw new Error('Cannot issue a diagnostic release certificate while gates are on HOLD.');
  const releaseId = process.env.DIAGNOSTIC_RELEASE_ID?.trim() ?? '';
  const issuedBy = process.env.DIAGNOSTIC_RELEASE_ISSUED_BY?.trim() ?? '';
  if (!/^[a-z0-9][a-z0-9._-]{7,99}$/u.test(releaseId) || !issuedBy) {
    throw new Error('DIAGNOSTIC_RELEASE_ID and DIAGNOSTIC_RELEASE_ISSUED_BY are required to issue a certificate.');
  }
  writeFileSync(join(root, 'config/diagnostic/release-certificate.json'), `${JSON.stringify({
    certificateVersion: 'english-diagnostic-release-certificate-v1',
    status: 'ready',
    releaseId,
    bankSnapshotSha256: diagnosticPilotBankSha256({
      bank: ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK,
      writingBank: ENGLISH_DIAGNOSTIC_WRITING_BANK,
    }),
    sourceSha256: currentSourceSha256,
    evidenceVersion: evidence.evidenceVersion,
    issuedAt: new Date().toISOString(),
    issuedBy,
  }, null, 2)}\n`);
  process.stdout.write(`Issued diagnostic release certificate ${releaseId}\n`);
  process.stdout.write(`Set DIAGNOSTIC_RELEASE_SOURCE_SHA256=${currentSourceSha256} for this release only\n`);
}

if (process.argv.includes('--json')) {
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
} else {
  process.stdout.write(`Nivel Radar release: ${report.decision} (${report.summary.passedGates}/${report.summary.totalGates} gates, ${report.summary.blockerCount} blockers)\n`);
  for (const candidate of report.gates) {
    process.stdout.write(`${candidate.status === 'PASS' ? '✓' : '✗'} ${candidate.id}${candidate.blockers.length ? `: ${candidate.blockers.join(', ')}` : ''}\n`);
  }
}

if (process.argv.includes('--strict') && !report.releaseReady) process.exitCode = 1;
