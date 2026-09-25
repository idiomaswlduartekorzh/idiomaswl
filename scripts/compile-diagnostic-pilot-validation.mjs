import { createHash } from 'node:crypto';
import { basename, dirname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

import { compileDiagnosticPilotValidation } from './lib/diagnostic-pilot-evidence.mjs';

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
const capturePath = privatePath(value('capture') || '.diagnostic-private/pilot/capture-receipt.json', 'Pilot capture receipt');
const inputRoot = privatePath(value('input') || '.diagnostic-private/pilot/validation', 'Pilot validation input');
const outputPath = privatePath(value('output') || '.diagnostic-private/pilot/validation/manifest.json', 'Pilot validation manifest');
const captureBytes = readFileSync(capturePath);
const captureReceipt = JSON.parse(captureBytes.toString('utf8'));
const captureReceiptSha256 = createHash('sha256').update(captureBytes).digest('hex');
const reviewEntries = ['academic-lead.json', 'measurement-lead.json'].map(file => {
  const bytes = readFileSync(resolve(inputRoot, file));
  return { file, sha256: createHash('sha256').update(bytes).digest('hex'), review: JSON.parse(bytes.toString('utf8')) };
});
const compiled = compileDiagnosticPilotValidation({
  reviews: reviewEntries.map(entry => entry.review), captureReceipt, captureReceiptSha256,
});
const core = {
  ...compiled,
  compiledAt: new Date().toISOString(),
  receipts: reviewEntries.map(entry => ({
    packetId: entry.review.packetId, file: basename(entry.file), sha256: entry.sha256,
  })),
};
const manifest = { ...core, manifestSha256: createHash('sha256').update(JSON.stringify(core)).digest('hex') };
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`, { mode: 0o600 });
process.stdout.write(`${JSON.stringify({
  decision: manifest.decision,
  outputPath: relative(root, outputPath),
  manifestSha256: manifest.manifestSha256,
  receiptCount: manifest.receipts.length,
}, null, 2)}\n`);
if (manifest.decision !== 'APPROVED') process.exitCode = 1;
