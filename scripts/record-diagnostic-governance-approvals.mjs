import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  recordDiagnosticGovernanceApprovals,
  validateDiagnosticGovernanceManifest,
} from './lib/diagnostic-governance-record.mjs';
import { diagnosticGovernanceSnapshots } from './lib/diagnostic-governance-snapshots.mjs';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const privateRoot = resolve(root, '.diagnostic-private');
const value = name => process.argv.find(argument => argument.startsWith(`--${name}=`))?.slice(name.length + 3) ?? '';
const manifestArgument = value('manifest') || '.diagnostic-private/governance-review/manifest.json';
const manifestPath = resolve(root, manifestArgument);
const privateRelative = relative(privateRoot, manifestPath);
if (isAbsolute(manifestArgument) || !privateRelative || privateRelative === '..'
  || privateRelative.startsWith(`..${sep}`)) {
  throw new Error('Governance manifest must be a relative path below .diagnostic-private/.');
}
const workingTree = execFileSync('git', ['status', '--porcelain'], { cwd: root, encoding: 'utf8' }).trim();
if (workingTree) throw new Error('Recording governance approvals requires a clean working tree.');

const manifestBytes = readFileSync(manifestPath);
const manifest = JSON.parse(manifestBytes.toString('utf8'));
const manifestSha256 = manifest.manifestSha256;
const receiptFiles = new Map(manifest.receipts.map(reference => {
  if (typeof reference.file !== 'string' || reference.file !== reference.file.split('/').at(-1)) {
    throw new Error('Governance manifest contains an unsafe receipt path.');
  }
  const receiptPath = resolve(dirname(manifestPath), reference.file);
  const bytes = readFileSync(receiptPath);
  return [reference.file, {
    sha256: createHash('sha256').update(bytes).digest('hex'),
    receipt: JSON.parse(bytes.toString('utf8')),
  }];
}));
const snapshots = diagnosticGovernanceSnapshots(root);
const validated = validateDiagnosticGovernanceManifest({
  manifest, manifestSha256, receiptFiles, snapshots,
});
const recordedAt = new Date().toISOString();
const confirmation = `APPLY_DIAGNOSTIC_GOVERNANCE_APPROVALS:${manifestSha256}`;
const summary = {
  decision: 'APPROVED_MANIFEST_READY_TO_APPLY',
  recordedAt,
  manifestSha256,
  snapshots,
  writingMode: validated.writing.selectedMode,
  reviewerCount: validated.writing.verifiedReviewerReferences?.length ?? null,
};
if (!process.argv.includes('--write')) {
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
  process.stdout.write(`Dry run only. To apply, add --write --applied-by=<operator> --confirm=${confirmation}\n`);
  process.exit(0);
}
if (value('confirm') !== confirmation) throw new Error('Governance confirmation does not match the approved manifest.');

const evidencePath = resolve(root, 'config/diagnostic/release-evidence.json');
const retentionPath = resolve(root, 'config/diagnostic/data-retention-policy.json');
const criteriaPath = resolve(root, 'config/diagnostic/pilot-publication-criteria.json');
const deliveryPolicyPath = resolve(root, 'config/diagnostic/delivery-policy.json');
const result = recordDiagnosticGovernanceApprovals({
  currentEvidence: JSON.parse(readFileSync(evidencePath, 'utf8')),
  retentionPolicy: JSON.parse(readFileSync(retentionPath, 'utf8')),
  pilotCriteria: JSON.parse(readFileSync(criteriaPath, 'utf8')),
  deliveryPolicy: JSON.parse(readFileSync(deliveryPolicyPath, 'utf8')),
  validated,
  recordedAt,
  appliedBy: value('applied-by'),
});
writeFileSync(evidencePath, `${JSON.stringify(result.nextEvidence, null, 2)}\n`);
writeFileSync(retentionPath, `${JSON.stringify(result.nextRetentionPolicy, null, 2)}\n`);
writeFileSync(criteriaPath, `${JSON.stringify(result.nextPilotCriteria, null, 2)}\n`);
writeFileSync(deliveryPolicyPath, `${JSON.stringify(result.nextDeliveryPolicy, null, 2)}\n`);
process.stdout.write(`${JSON.stringify({ ...summary, decision: 'APPLIED', appliedBy: value('applied-by') }, null, 2)}\n`);
