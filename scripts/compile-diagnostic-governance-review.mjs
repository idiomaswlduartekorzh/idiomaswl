import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import { compileDiagnosticGovernanceReviews } from './lib/diagnostic-governance-review.mjs';
import { diagnosticGovernanceSnapshots } from './lib/diagnostic-governance-snapshots.mjs';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const privateRoot = resolve(root, '.diagnostic-private');
const value = name => process.argv.find(argument => argument.startsWith(`--${name}=`))?.slice(name.length + 3) ?? '';
const inputRoot = resolve(root, value('input') || '.diagnostic-private/governance-review');
const outputPath = resolve(root, value('output') || '.diagnostic-private/governance-review/manifest.json');
const assertPrivate = (path, label) => {
  const privateRelative = relative(privateRoot, path);
  if (!privateRelative || privateRelative === '..' || privateRelative.startsWith(`..${sep}`)) {
    throw new Error(`${label} must stay below .diagnostic-private/.`);
  }
};
assertPrivate(inputRoot, 'Governance review input');
assertPrivate(outputPath, 'Governance manifest output');

const expectedFiles = [
  'writing-operations--academic-lead.json',
  'writing-operations--operations-lead.json',
  'retention-policy--privacy-lead.json',
  'pilot-criteria--academic-lead.json',
  'pilot-criteria--measurement-lead.json',
  'delivery-policy--academic-lead.json',
  'delivery-policy--product-owner.json',
];
const snapshots = diagnosticGovernanceSnapshots(root);
const receipts = expectedFiles.map(file => {
  const path = resolve(inputRoot, file);
  if (!existsSync(path)) throw new Error(`Missing governance receipt ${file}.`);
  const bytes = readFileSync(path);
  return {
    file,
    sha256: createHash('sha256').update(bytes).digest('hex'),
    receipt: JSON.parse(bytes.toString('utf8')),
  };
});
const compiled = compileDiagnosticGovernanceReviews({
  receipts: receipts.map(entry => entry.receipt), snapshots,
});
const compiledAt = new Date().toISOString();
const core = {
  ...compiled,
  compiledAt,
  receipts: receipts.map(entry => ({
    packetId: entry.receipt.packetId,
    file: basename(entry.file),
    sha256: entry.sha256,
  })),
};
const manifest = {
  ...core,
  manifestSha256: createHash('sha256').update(JSON.stringify(core)).digest('hex'),
};
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`, { mode: 0o600 });
process.stdout.write(`${JSON.stringify({
  decision: manifest.decision,
  outputPath,
  manifestSha256: manifest.manifestSha256,
  receiptCount: manifest.receipts.length,
}, null, 2)}\n`);
if (manifest.decision !== 'APPROVED') process.exitCode = 1;
