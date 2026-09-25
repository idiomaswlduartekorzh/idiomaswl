import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  recordDiagnosticQualityEvidence,
  validateDiagnosticQualityReceipt,
} from './lib/diagnostic-quality-evidence.mjs';
import { diagnosticReleaseSourceSha256 } from './lib/diagnostic-release-source.mjs';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const privateRoot = resolve(root, '.diagnostic-private');
const evidencePath = resolve(root, 'config/diagnostic/release-evidence.json');
const value = name => process.argv.find(argument => argument.startsWith(`--${name}=`))?.slice(name.length + 3) ?? '';
const receiptArgument = value('receipt');
const receiptPath = resolve(root, receiptArgument);
const privateRelative = relative(privateRoot, receiptPath);
if (!receiptArgument || isAbsolute(receiptArgument) || !privateRelative || privateRelative === '..'
  || privateRelative.startsWith(`..${sep}`)) {
  throw new Error('Quality receipt must be a relative path below .diagnostic-private/.');
}
const workingTree = execFileSync('git', ['status', '--porcelain'], { cwd: root, encoding: 'utf8' }).trim();
if (workingTree) throw new Error('Recording quality evidence requires a clean working tree.');

const receiptBytes = readFileSync(receiptPath);
const receiptSha256 = createHash('sha256').update(receiptBytes).digest('hex');
const recordedAt = new Date().toISOString();
const validated = validateDiagnosticQualityReceipt({
  receipt: JSON.parse(receiptBytes.toString('utf8')),
  receiptSha256,
  expectedSourceSha256: diagnosticReleaseSourceSha256(root),
  recordedAt,
});
const confirmation = `RECORD_DIAGNOSTIC_QUALITY_EVIDENCE:${receiptSha256}`;
const summary = { decision: 'VALID_EVIDENCE_READY_TO_RECORD', recordedAt, ...validated };
if (!process.argv.includes('--write')) {
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
  process.stdout.write(`Dry run only. To record, add --write --attested-by=<verifier> --confirm=${confirmation}\n`);
  process.exit(0);
}
if (value('confirm') !== confirmation) throw new Error('Quality evidence confirmation does not match the receipt hash.');
const currentEvidence = JSON.parse(readFileSync(evidencePath, 'utf8'));
const nextEvidence = recordDiagnosticQualityEvidence({
  currentEvidence, validated, recordedAt, attestedBy: value('attested-by'),
});
writeFileSync(evidencePath, `${JSON.stringify(nextEvidence, null, 2)}\n`);
process.stdout.write(`${JSON.stringify({ ...summary, decision: 'RECORDED', attestedBy: value('attested-by') }, null, 2)}\n`);
