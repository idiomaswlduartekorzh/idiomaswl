import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK,
  ENGLISH_DIAGNOSTIC_WRITING_BANK,
} from '../src/server/diagnostic/bank/index.ts';
import { diagnosticPilotBankSha256 } from '../src/server/diagnostic/pilot-analytics.ts';
import {
  recordDiagnosticLiveEvidence,
  validateDiagnosticLiveEvidence,
} from './lib/diagnostic-live-evidence.mjs';
import { diagnosticReleaseSourceSha256 } from './lib/diagnostic-release-source.mjs';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const privateRoot = resolve(root, '.diagnostic-private');
const evidencePath = resolve(root, 'config/diagnostic/release-evidence.json');
const value = name => process.argv.find(argument => argument.startsWith(`--${name}=`))?.slice(name.length + 3) ?? '';
const safePrivateReceipt = (argument, label) => {
  const resolved = resolve(root, argument);
  const privateRelative = relative(privateRoot, resolved);
  if (!argument || isAbsolute(argument) || !privateRelative || privateRelative === '..'
    || privateRelative.startsWith(`..${sep}`)) {
    throw new Error(`${label} must be a relative path below .diagnostic-private/.`);
  }
  return resolved;
};

const inspectionPath = safePrivateReceipt(value('inspection'), 'Inspection receipt');
const flowPath = safePrivateReceipt(value('auth-flow'), 'Authenticated flow receipt');
const inspectionBytes = readFileSync(inspectionPath);
const flowBytes = readFileSync(flowPath);
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const inspectionReceiptSha256 = sha256(inspectionBytes);
const authenticatedFlowReceiptSha256 = sha256(flowBytes);
const migrations = readdirSync(resolve(root, 'supabase/migrations'))
  .filter(name => name.includes('diagnostic') && name.endsWith('.sql')).sort();
const expectedMigration = migrations.at(-1);
if (!expectedMigration) throw new Error('No diagnostic migration exists.');
const currentSourceSha256 = diagnosticReleaseSourceSha256(root);
const currentBankSnapshotSha256 = diagnosticPilotBankSha256({
  bank: ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK,
  writingBank: ENGLISH_DIAGNOSTIC_WRITING_BANK,
});
const currentCommit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
const workingTree = execFileSync('git', ['status', '--porcelain'], { cwd: root, encoding: 'utf8' }).trim();
if (workingTree) throw new Error('Recording live evidence requires a clean working tree.');
const recordedAt = new Date().toISOString();
const validated = validateDiagnosticLiveEvidence({
  inspectionReceipt: JSON.parse(inspectionBytes.toString('utf8')),
  inspectionReceiptSha256,
  authenticatedFlowReceipt: JSON.parse(flowBytes.toString('utf8')),
  authenticatedFlowReceiptSha256,
  expectedMigration,
  expectedSourceSha256: currentSourceSha256,
  expectedBankSnapshotSha256: currentBankSnapshotSha256,
  expectedCommitSha: currentCommit,
  recordedAt,
});

const confirmation = `RECORD_DIAGNOSTIC_LIVE_EVIDENCE:${inspectionReceiptSha256}:${authenticatedFlowReceiptSha256}`;
const summary = {
  decision: 'VALID_EVIDENCE_READY_TO_RECORD',
  recordedAt,
  expectedMigration,
  sourceSha256: currentSourceSha256,
  bankSnapshotSha256: currentBankSnapshotSha256,
  deployedCommit: currentCommit,
  target: {
    supabaseProject: validated.liveVerification.supabaseProject,
    applicationHost: validated.liveVerification.applicationHost,
  },
  receiptHashes: { inspectionReceiptSha256, authenticatedFlowReceiptSha256 },
};

if (!process.argv.includes('--write')) {
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
  process.stdout.write(`Dry run only. To record, add --write --attested-by=<operator> --confirm=${confirmation}\n`);
  process.exit(0);
}
if (value('confirm') !== confirmation) throw new Error('Live evidence confirmation does not match both receipt hashes.');
const attestedBy = value('attested-by');
const currentEvidence = JSON.parse(readFileSync(evidencePath, 'utf8'));
const nextEvidence = recordDiagnosticLiveEvidence({ currentEvidence, validated, recordedAt, attestedBy });
writeFileSync(evidencePath, `${JSON.stringify(nextEvidence, null, 2)}\n`);
process.stdout.write(`${JSON.stringify({ ...summary, decision: 'RECORDED', attestedBy }, null, 2)}\n`);
