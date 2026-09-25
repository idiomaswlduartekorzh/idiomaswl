import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { basename, dirname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync, writeFileSync } from 'node:fs';

import criteria from '../config/diagnostic/pilot-publication-criteria.json' with { type: 'json' };
import { ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK, ENGLISH_DIAGNOSTIC_WRITING_BANK } from '../src/server/diagnostic/bank/index.ts';
import {
  diagnosticEligibleTestletCount,
  diagnosticPilotBankSha256,
} from '../src/server/diagnostic/pilot-analytics.ts';
import {
  recordDiagnosticPilotMeasurementEvidence,
  validateDiagnosticPilotMeasurementCandidate,
  validateDiagnosticPilotMeasurementManifest,
} from './lib/diagnostic-pilot-measurement-review.mjs';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const privateRoot = resolve(root, '.diagnostic-private');
const value = name => process.argv.find(argument => argument.startsWith(`--${name}=`))?.slice(name.length + 3) ?? '';
const privatePath = (argument, label) => {
  const path = resolve(root, argument);
  const rel = relative(privateRoot, path);
  if (!argument || argument.startsWith('/') || !rel || rel === '..' || rel.startsWith(`..${sep}`)) {
    throw new Error(`${label} must be a relative path below .diagnostic-private/.`);
  }
  return path;
};
const base = value('root') || '.diagnostic-private/pilot/measurement';
const candidatePath = privatePath(`${base}/candidate.json`, 'Measurement candidate');
const reviewRoot = privatePath(`${base}/reviews`, 'Measurement reviews');
const manifestPath = privatePath(value('manifest') || `${base}/manifest.json`, 'Measurement manifest');
if (execFileSync('git', ['status', '--porcelain'], { cwd: root, encoding: 'utf8' }).trim()) {
  throw new Error('Recording measurement evidence requires a clean working tree.');
}
const candidateBytes = readFileSync(candidatePath);
const candidate = JSON.parse(candidateBytes.toString('utf8'));
const candidateSha256 = createHash('sha256').update(candidateBytes).digest('hex');
const manifestBytes = readFileSync(manifestPath);
const manifest = JSON.parse(manifestBytes.toString('utf8'));
const bankSnapshotSha256 = diagnosticPilotBankSha256({
  bank: ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK, writingBank: ENGLISH_DIAGNOSTIC_WRITING_BANK,
});
const activeObjectiveBank = ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK
  .filter(record => record.status === 'pilot' || record.status === 'operational');
validateDiagnosticPilotMeasurementCandidate({
  candidate, candidateSha256, criteria, expectedBankSnapshotSha256: bankSnapshotSha256,
  objectiveItemCount: activeObjectiveBank.length,
  eligibleTestletCount: diagnosticEligibleTestletCount(activeObjectiveBank),
});
const reviewFiles = new Map(manifest.receipts.map(reference => {
  if (typeof reference.file !== 'string' || reference.file !== basename(reference.file)) {
    throw new Error('Measurement manifest contains an unsafe review path.');
  }
  const bytes = readFileSync(resolve(reviewRoot, reference.file));
  return [reference.file, {
    sha256: createHash('sha256').update(bytes).digest('hex'),
    review: JSON.parse(bytes.toString('utf8')),
  }];
}));
const validated = validateDiagnosticPilotMeasurementManifest({
  manifest, manifestSha256: manifest.manifestSha256, reviewFiles, candidateSha256,
  criteriaVersion: criteria.criteriaVersion, bankSnapshotSha256,
});
const confirmation = `APPLY_DIAGNOSTIC_PILOT_MEASUREMENT:${manifest.manifestSha256}:${candidateSha256}`;
const summary = {
  decision: 'APPROVED_MEASUREMENT_READY_TO_APPLY', candidateSha256,
  manifestSha256: manifest.manifestSha256, criteriaVersion: criteria.criteriaVersion,
  bankSnapshotSha256,
};
if (!process.argv.includes('--write')) {
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
  process.stdout.write(`Dry run only. To apply, add --write --applied-by=<operator> --confirm=${confirmation}\n`);
  process.exit(0);
}
if (value('confirm') !== confirmation) throw new Error('Measurement confirmation does not match the exact manifest and candidate.');
const appliedAt = new Date().toISOString();
const next = recordDiagnosticPilotMeasurementEvidence({
  candidate, validated, appliedAt, appliedBy: value('applied-by'),
});
const outputPath = resolve(root, 'config/diagnostic/pilot-measurement-evidence.json');
writeFileSync(outputPath, `${JSON.stringify(next, null, 2)}\n`);
process.stdout.write(`${JSON.stringify({ ...summary, decision: 'APPLIED', appliedAt, appliedBy: value('applied-by') }, null, 2)}\n`);
