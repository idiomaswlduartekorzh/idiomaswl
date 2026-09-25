#!/usr/bin/env node

import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync, realpathSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { CEFR_LEVELS } from '../src/lib/diagnostic/types.ts';
import { ENGLISH_DIAGNOSTIC_LISTENING_ADVANCED_PRODUCTION_BRIEFS } from '../src/server/diagnostic/bank/listening-production-advanced.en.ts';
import { ENGLISH_DIAGNOSTIC_LISTENING_LOWER_PRODUCTION_BRIEFS } from '../src/server/diagnostic/bank/listening-production-lower.en.ts';
import { ENGLISH_DIAGNOSTIC_LISTENING_MID_PRODUCTION_BRIEFS } from '../src/server/diagnostic/bank/listening-production-mid.en.ts';
import {
  DIAGNOSTIC_LISTENING_PREPRODUCTION_ROLES,
  diagnosticListeningPreproductionSnapshotSha256,
  validateDiagnosticListeningPreproductionReviewPacket,
} from './lib/diagnostic-listening-preproduction-review.mjs';

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const privateRoot = realpathSync(path.join(root, '.diagnostic-private'));
const briefs = [
  ...ENGLISH_DIAGNOSTIC_LISTENING_LOWER_PRODUCTION_BRIEFS,
  ...ENGLISH_DIAGNOSTIC_LISTENING_MID_PRODUCTION_BRIEFS,
  ...ENGLISH_DIAGNOSTIC_LISTENING_ADVANCED_PRODUCTION_BRIEFS,
];
const snapshot = diagnosticListeningPreproductionSnapshotSha256(briefs);
const rootFlag = process.argv.slice(2).find(argument => argument.startsWith('--root='));
for (const argument of process.argv.slice(2)) assert.ok(argument.startsWith('--root='), `Unknown flag: ${argument}`);
const reviewRoot = realpathSync(path.resolve(root, rootFlag?.slice('--root='.length)
  ?? `.diagnostic-private/listening-preproduction-review/${snapshot.slice(0, 16)}`));
const relative = path.relative(privateRoot, reviewRoot);
assert.ok(relative && !relative.startsWith('..') && !path.isAbsolute(relative), '--root must stay inside .diagnostic-private');

const counts = { approved: 0, pending: 0, 'changes-requested': 0, invalid: 0, missing: 0 };
const levels = {};
for (const level of CEFR_LEVELS) {
  levels[level] = {};
  const directory = path.join(reviewRoot, level.toLowerCase());
  for (const role of DIAGNOSTIC_LISTENING_PREPRODUCTION_ROLES) {
    const completed = path.join(directory, `${role}.completed.json`);
    const template = path.join(directory, `${role}.template.json`);
    let status = 'missing';
    if (existsSync(completed)) {
      try {
        const packet = JSON.parse(readFileSync(completed, 'utf8'));
        const signatures = validateDiagnosticListeningPreproductionReviewPacket(packet, briefs);
        status = signatures.some(signature => signature.decision === 'CHANGES_REQUESTED')
          ? 'changes-requested'
          : 'approved';
      } catch {
        status = 'invalid';
      }
    } else if (existsSync(template)) {
      status = 'pending';
    }
    counts[status] += 1;
    levels[level][role] = status;
  }
  if (existsSync(directory)) {
    const allowed = new Set([
      'README.txt',
      ...DIAGNOSTIC_LISTENING_PREPRODUCTION_ROLES.flatMap(role => [
        `${role}.template.json`, `${role}.completed.json`,
      ]),
    ]);
    if (readdirSync(directory).some(file => !allowed.has(file))) throw new Error(`${level}: unexpected review artifact`);
  }
}
const decision = counts.approved === CEFR_LEVELS.length * DIAGNOSTIC_LISTENING_PREPRODUCTION_ROLES.length
  ? 'READY_TO_COMPILE'
  : 'INCOMPLETE';
process.stdout.write(`${JSON.stringify({
  decision,
  snapshotSha256: snapshot,
  requiredReceiptCount: 12,
  counts,
  levels,
}, null, 2)}\n`);
if (decision !== 'READY_TO_COMPILE') process.exitCode = 1;
