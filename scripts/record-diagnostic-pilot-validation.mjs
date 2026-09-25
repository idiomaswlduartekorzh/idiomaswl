import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { basename, dirname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync, writeFileSync } from 'node:fs';

import {
  ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK,
  ENGLISH_DIAGNOSTIC_WRITING_BANK,
} from '../src/server/diagnostic/bank/index.ts';
import { diagnosticPilotBankSha256 } from '../src/server/diagnostic/pilot-analytics.ts';
import { diagnosticReleaseSourceSha256 } from './lib/diagnostic-release-source.mjs';
import {
  recordDiagnosticPilotValidation,
  validateDiagnosticPilotCaptureReceipt,
  validateDiagnosticPilotValidationManifest,
} from './lib/diagnostic-pilot-evidence.mjs';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const privateRoot = resolve(root, '.diagnostic-private');
const value = name => process.argv.find(argument => argument.startsWith(`--${name}=`))?.slice(name.length + 3) ?? '';
const privatePath = (argument, label) => {
  const path = resolve(root, argument);
  const rel = relative(privateRoot, path);
  if (!argument || argument.startsWith('/') || !rel || rel === '..' || rel.startsWith(`..${sep}`)) {
    throw new Error(`${label} must be a relative path below .diagnostic-private/.`);
  }
  return { path, relativePath: relative(root, path) };
};
const report = privatePath(value('report') || '.diagnostic-private/pilot/pilot-report.json', 'Pilot report');
const capture = privatePath(value('capture') || '.diagnostic-private/pilot/capture-receipt.json', 'Pilot capture receipt');
const manifestEntry = privatePath(value('manifest') || '.diagnostic-private/pilot/validation/manifest.json', 'Pilot validation manifest');
const workingTree = execFileSync('git', ['status', '--porcelain'], { cwd: root, encoding: 'utf8' }).trim();
if (workingTree) throw new Error('Recording pilot validation requires a clean working tree.');
const reportBytes = readFileSync(report.path);
const captureBytes = readFileSync(capture.path);
const manifestBytes = readFileSync(manifestEntry.path);
const reportJson = JSON.parse(reportBytes.toString('utf8'));
const captureReceipt = JSON.parse(captureBytes.toString('utf8'));
const manifest = JSON.parse(manifestBytes.toString('utf8'));
const reportSha256 = createHash('sha256').update(reportBytes).digest('hex');
const captureReceiptSha256 = createHash('sha256').update(captureBytes).digest('hex');
const currentSourceSha256 = diagnosticReleaseSourceSha256(root);
const currentBankSnapshotSha256 = diagnosticPilotBankSha256({
  bank: ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK,
  writingBank: ENGLISH_DIAGNOSTIC_WRITING_BANK,
});
validateDiagnosticPilotCaptureReceipt({
  receipt: captureReceipt,
  receiptSha256: captureReceiptSha256,
  report: reportJson,
  reportSha256,
  reportFile: basename(report.path),
  expectedSourceSha256: currentSourceSha256,
  expectedBankSnapshotSha256: currentBankSnapshotSha256,
});
const reviewFiles = new Map(manifest.receipts.map(reference => {
  if (typeof reference.file !== 'string' || reference.file !== basename(reference.file)) {
    throw new Error('Pilot validation manifest contains an unsafe review path.');
  }
  const bytes = readFileSync(resolve(dirname(manifestEntry.path), reference.file));
  return [reference.file, {
    sha256: createHash('sha256').update(bytes).digest('hex'),
    review: JSON.parse(bytes.toString('utf8')),
  }];
}));
const validated = validateDiagnosticPilotValidationManifest({
  manifest,
  manifestSha256: manifest.manifestSha256,
  reviewFiles,
  captureReceipt,
  captureReceiptSha256,
});
if (validated.reportSha256 !== reportSha256) throw new Error('Pilot validation manifest targets another report.');
const confirmation = `APPLY_DIAGNOSTIC_PILOT_VALIDATION:${manifest.manifestSha256}:${reportSha256}`;
const recordedAt = new Date().toISOString();
const summary = {
  decision: 'APPROVED_PILOT_VALIDATION_READY_TO_APPLY',
  reportSha256,
  captureReceiptSha256,
  validationManifestSha256: manifest.manifestSha256,
  sourceSha256: currentSourceSha256,
  bankSnapshotSha256: currentBankSnapshotSha256,
};
if (!process.argv.includes('--write')) {
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
  process.stdout.write(`Dry run only. To apply, add --write --applied-by=<operator> --confirm=${confirmation}\n`);
  process.exit(0);
}
if (value('confirm') !== confirmation) throw new Error('Pilot validation confirmation does not match the exact manifest and report.');
const evidencePath = resolve(root, 'config/diagnostic/release-evidence.json');
const nextEvidence = recordDiagnosticPilotValidation({
  currentEvidence: JSON.parse(readFileSync(evidencePath, 'utf8')),
  validated,
  paths: {
    reportPath: report.relativePath,
    captureReceiptPath: capture.relativePath,
    validationManifestPath: manifestEntry.relativePath,
  },
  recordedAt,
  appliedBy: value('applied-by'),
});
writeFileSync(evidencePath, `${JSON.stringify(nextEvidence, null, 2)}\n`);
process.stdout.write(`${JSON.stringify({ ...summary, decision: 'APPLIED', appliedBy: value('applied-by') }, null, 2)}\n`);
