#!/usr/bin/env node

import assert from 'node:assert/strict';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { CEFR_LEVELS } from '../src/lib/diagnostic/types.ts';
import { ENGLISH_DIAGNOSTIC_LISTENING_ADVANCED_PRODUCTION_BRIEFS } from '../src/server/diagnostic/bank/listening-production-advanced.en.ts';
import { ENGLISH_DIAGNOSTIC_LISTENING_LOWER_PRODUCTION_BRIEFS } from '../src/server/diagnostic/bank/listening-production-lower.en.ts';
import { ENGLISH_DIAGNOSTIC_LISTENING_MID_PRODUCTION_BRIEFS } from '../src/server/diagnostic/bank/listening-production-mid.en.ts';
import {
  createDiagnosticListeningPreproductionReviewPacket,
  DIAGNOSTIC_LISTENING_PREPRODUCTION_ROLES,
  diagnosticListeningPreproductionSnapshotSha256,
} from './lib/diagnostic-listening-preproduction-review.mjs';

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const privateRoot = path.join(root, '.diagnostic-private');
const args = Object.fromEntries(process.argv.slice(2).map(argument => {
  const [key, ...rest] = argument.replace(/^--/u, '').split('=');
  return [key, rest.length ? rest.join('=') : 'true'];
}));
for (const key of Object.keys(args)) assert.equal(key, 'output', `Unknown flag: ${key}`);

const briefs = [
  ...ENGLISH_DIAGNOSTIC_LISTENING_LOWER_PRODUCTION_BRIEFS,
  ...ENGLISH_DIAGNOSTIC_LISTENING_MID_PRODUCTION_BRIEFS,
  ...ENGLISH_DIAGNOSTIC_LISTENING_ADVANCED_PRODUCTION_BRIEFS,
];
const snapshotSha256 = diagnosticListeningPreproductionSnapshotSha256(briefs);
const output = path.resolve(args.output
  ?? path.join(privateRoot, 'listening-preproduction-review', snapshotSha256.slice(0, 16)));
const relative = path.relative(privateRoot, output);
assert.ok(relative && !relative.startsWith('..') && !path.isAbsolute(relative),
  '--output must stay inside .diagnostic-private');
assert.ok(!existsSync(output), `Refusing to overwrite existing review package: ${output}`);

const generatedAt = new Date().toISOString();
const files = [];
for (const level of CEFR_LEVELS) {
  const directory = path.join(output, level.toLowerCase());
  mkdirSync(directory, { recursive: true });
  for (const role of DIAGNOSTIC_LISTENING_PREPRODUCTION_ROLES) {
    const packet = createDiagnosticListeningPreproductionReviewPacket({ role, level, briefs, generatedAt });
    const file = path.join(directory, `${role}.template.json`);
    writeFileSync(file, `${JSON.stringify(packet, null, 2)}\n`);
    files.push({ level, role, entries: packet.entries.length, file });
  }
  writeFileSync(path.join(directory, 'README.txt'), [
    'PRIVATE ASSESSMENT MATERIAL — DO NOT COMMIT OR PUBLISH',
    '',
    'Rename each completed *.template.json file to *.completed.json.',
    'Do not edit immutable material, IDs, versions, hashes or snapshotSha256.',
    'Complete reviewer identity, reviewedAt, attestation, decisions and every checklist.',
    'The linguistic and assessment roles require independent human identities.',
    '',
  ].join('\n'));
}
writeFileSync(path.join(output, 'manifest.json'), `${JSON.stringify({
  packageVersion: 'diagnostic-listening-preproduction-review-package-v1',
  generatedAt,
  snapshotSha256,
  expectedReceipts: files.length,
  levels: CEFR_LEVELS,
  roles: DIAGNOSTIC_LISTENING_PREPRODUCTION_ROLES,
}, null, 2)}\n`);

process.stdout.write(`${JSON.stringify({ output, snapshotSha256, files: files.length, entries: briefs.length * 2 }, null, 2)}\n`);
