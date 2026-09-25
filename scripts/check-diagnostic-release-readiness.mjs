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
import { buildDiagnosticReleaseReadiness } from './lib/diagnostic-release-readiness.mjs';
import { diagnosticReleaseSourceSha256 } from './lib/diagnostic-release-source.mjs';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const readJson = path => JSON.parse(readFileSync(join(root, path), 'utf8'));
const evidence = readJson('config/diagnostic/release-evidence.json');
const pilotPath = evidence.pilot?.reportPath;
const resolvedPilotPath = pilotPath ? resolve(root, pilotPath) : null;
const pilotRelativePath = resolvedPilotPath ? relative(root, resolvedPilotPath) : null;
const pilotPathIsSafe = Boolean(pilotPath)
  && !isAbsolute(pilotPath)
  && pilotRelativePath !== '..'
  && !pilotRelativePath.startsWith(`..${sep}`);
const pilotBytes = pilotPathIsSafe && resolvedPilotPath && existsSync(resolvedPilotPath)
  ? readFileSync(resolvedPilotPath)
  : null;
const migrationNames = readdirSync(join(root, 'supabase/migrations'))
  .filter(name => name.includes('diagnostic') && name.endsWith('.sql'))
  .sort();
const currentCommit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
const workingTreeClean = execFileSync('git', ['status', '--porcelain'], { cwd: root, encoding: 'utf8' }).trim() === '';
const currentSourceSha256 = diagnosticReleaseSourceSha256(root);

const report = buildDiagnosticReleaseReadiness({
  bankReadiness: readJson('docs/diagnostic-bank-readiness.json'),
  approvals: readJson('config/diagnostic/english-bank-approvals.json'),
  audioPublications: readJson('config/diagnostic/english-listening-audio-publications.json'),
  voiceCasting: readJson('config/diagnostic/english-listening-voice-casting.json'),
  pilotCriteria: readJson('config/diagnostic/pilot-publication-criteria.json'),
  retentionPolicy: readJson('config/diagnostic/data-retention-policy.json'),
  releaseEvidence: evidence,
  pilotReport: pilotBytes ? JSON.parse(pilotBytes.toString('utf8')) : null,
  pilotReportSha256: pilotBytes ? createHash('sha256').update(pilotBytes).digest('hex') : null,
  currentBankSha256: diagnosticPilotBankSha256({
    bank: ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK,
    writingBank: ENGLISH_DIAGNOSTIC_WRITING_BANK,
  }),
  providerReadiness: getDiagnosticWritingProviderReadiness(process.env),
  expectedMigration: migrationNames.at(-1) ?? null,
  currentCommit,
  currentSourceSha256,
  workingTreeClean,
  activation: {
    engineEnabled: process.env.DIAGNOSTIC_ADAPTIVE_ENABLED === 'true',
    uiEnabled: process.env.DIAGNOSTIC_ADAPTIVE_UI_ENABLED === 'true',
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
