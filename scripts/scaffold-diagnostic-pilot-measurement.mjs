import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import criteria from '../config/diagnostic/pilot-publication-criteria.json' with { type: 'json' };
import template from '../config/diagnostic/pilot-measurement-evidence.json' with { type: 'json' };
import { ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK, ENGLISH_DIAGNOSTIC_WRITING_BANK } from '../src/server/diagnostic/bank/index.ts';
import { diagnosticPilotBankSha256 } from '../src/server/diagnostic/pilot-analytics.ts';
import { buildDiagnosticPilotMeasurementReviewPackets } from './lib/diagnostic-pilot-measurement-review.mjs';

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
const outputRoot = privatePath(value('output') || '.diagnostic-private/pilot/measurement', 'Measurement output');
const candidatePath = resolve(outputRoot, 'candidate.json');
const reviewRoot = resolve(outputRoot, 'reviews');
const bankSnapshotSha256 = diagnosticPilotBankSha256({
  bank: ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK, writingBank: ENGLISH_DIAGNOSTIC_WRITING_BANK,
});
mkdirSync(outputRoot, { recursive: true });

if (!process.argv.includes('--prepare-reviews')) {
  if (existsSync(candidatePath)) throw new Error('Measurement candidate already exists; refusing to overwrite private work.');
  const candidate = {
    ...template,
    criteriaVersion: criteria.criteriaVersion,
    bankSnapshotSha256,
    instructions: undefined,
  };
  writeFileSync(candidatePath, `${JSON.stringify(candidate, null, 2)}\n`, { mode: 0o600 });
  process.stdout.write(`${JSON.stringify({
    decision: 'MEASUREMENT_CANDIDATE_TEMPLATE_CREATED',
    candidate: relative(root, candidatePath),
    criteriaVersion: criteria.criteriaVersion,
    bankSnapshotSha256,
    objectiveItemCount: ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK.length,
    next: 'Complete aggregate metrics, set status=complete and generatedAt, then rerun with --prepare-reviews.',
  }, null, 2)}\n`);
  process.exit(0);
}

if (!existsSync(candidatePath)) throw new Error('Create and complete the measurement candidate before preparing reviews.');
if (existsSync(reviewRoot)) throw new Error('Measurement review directory already exists; refusing to overwrite reviews.');
const candidateBytes = readFileSync(candidatePath);
const candidate = JSON.parse(candidateBytes.toString('utf8'));
const candidateSha256 = createHash('sha256').update(candidateBytes).digest('hex');
const packets = buildDiagnosticPilotMeasurementReviewPackets({
  candidate, candidateSha256, criteria, expectedBankSnapshotSha256: bankSnapshotSha256,
  objectiveItemCount: ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK.length, generatedAt: new Date().toISOString(),
});
mkdirSync(reviewRoot, { recursive: true });
for (const packet of packets) {
  writeFileSync(resolve(reviewRoot, `${packet.role}.json`), `${JSON.stringify(packet, null, 2)}\n`, { mode: 0o600 });
}
process.stdout.write(`${JSON.stringify({
  decision: 'MEASUREMENT_REVIEWS_PREPARED', candidateSha256,
  reviewRoot: relative(root, reviewRoot), roles: packets.map(packet => packet.role),
}, null, 2)}\n`);
