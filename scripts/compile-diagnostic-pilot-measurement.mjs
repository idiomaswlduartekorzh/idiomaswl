import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import criteria from '../config/diagnostic/pilot-publication-criteria.json' with { type: 'json' };
import { ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK, ENGLISH_DIAGNOSTIC_WRITING_BANK } from '../src/server/diagnostic/bank/index.ts';
import { diagnosticPilotBankSha256 } from '../src/server/diagnostic/pilot-analytics.ts';
import { compileDiagnosticPilotMeasurementReviews } from './lib/diagnostic-pilot-measurement-review.mjs';

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
const outputPath = privatePath(value('output') || `${base}/manifest.json`, 'Measurement manifest');
const candidateBytes = readFileSync(candidatePath);
const candidateSha256 = createHash('sha256').update(candidateBytes).digest('hex');
const bankSnapshotSha256 = diagnosticPilotBankSha256({
  bank: ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK, writingBank: ENGLISH_DIAGNOSTIC_WRITING_BANK,
});
const reviewEntries = ['academic-lead.json', 'measurement-lead.json', 'privacy-lead.json'].map(file => {
  const bytes = readFileSync(resolve(reviewRoot, file));
  return { file, bytes, review: JSON.parse(bytes.toString('utf8')) };
});
const compiled = compileDiagnosticPilotMeasurementReviews({
  reviews: reviewEntries.map(entry => entry.review), candidateSha256,
  criteriaVersion: criteria.criteriaVersion, bankSnapshotSha256,
});
const core = {
  ...compiled,
  compiledAt: new Date().toISOString(),
  receipts: reviewEntries.map(entry => ({
    packetId: entry.review.packetId,
    file: basename(entry.file),
    sha256: createHash('sha256').update(entry.bytes).digest('hex'),
  })),
};
const manifest = { ...core, manifestSha256: createHash('sha256').update(JSON.stringify(core)).digest('hex') };
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`, { mode: 0o600 });
process.stdout.write(`${JSON.stringify({
  decision: manifest.decision, output: relative(root, outputPath),
  candidateSha256, manifestSha256: manifest.manifestSha256,
}, null, 2)}\n`);
if (manifest.decision !== 'APPROVED') process.exitCode = 1;
