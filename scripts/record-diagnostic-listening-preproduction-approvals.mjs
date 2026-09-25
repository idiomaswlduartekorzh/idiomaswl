#!/usr/bin/env node

import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFileSync, realpathSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { CEFR_LEVELS } from '../src/lib/diagnostic/types.ts';
import { ENGLISH_DIAGNOSTIC_LISTENING_ADVANCED_PRODUCTION_BRIEFS } from '../src/server/diagnostic/bank/listening-production-advanced.en.ts';
import { ENGLISH_DIAGNOSTIC_LISTENING_LOWER_PRODUCTION_BRIEFS } from '../src/server/diagnostic/bank/listening-production-lower.en.ts';
import { ENGLISH_DIAGNOSTIC_LISTENING_MID_PRODUCTION_BRIEFS } from '../src/server/diagnostic/bank/listening-production-mid.en.ts';
import {
  compileDiagnosticListeningPreproductionApprovals,
  DIAGNOSTIC_LISTENING_PREPRODUCTION_ROLES,
  diagnosticListeningPreproductionSnapshotSha256,
} from './lib/diagnostic-listening-preproduction-review.mjs';

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const privateRoot = realpathSync(path.join(root, '.diagnostic-private'));
const cli = Object.fromEntries(process.argv.slice(2).map(argument => {
  const [key, ...rest] = argument.replace(/^--/u, '').split('=');
  return [key, rest.length ? rest.join('=') : true];
}));
for (const key of Object.keys(cli)) assert.ok(['root', 'write', 'confirm', 'applied-by'].includes(key), `Unknown flag: ${key}`);

const briefs = [
  ...ENGLISH_DIAGNOSTIC_LISTENING_LOWER_PRODUCTION_BRIEFS,
  ...ENGLISH_DIAGNOSTIC_LISTENING_MID_PRODUCTION_BRIEFS,
  ...ENGLISH_DIAGNOSTIC_LISTENING_ADVANCED_PRODUCTION_BRIEFS,
];
const snapshot = diagnosticListeningPreproductionSnapshotSha256(briefs);
const reviewRoot = realpathSync(path.resolve(root, cli.root
  ?? `.diagnostic-private/listening-preproduction-review/${snapshot.slice(0, 16)}`));
const relative = path.relative(privateRoot, reviewRoot);
assert.ok(relative && !relative.startsWith('..') && !path.isAbsolute(relative), '--root must stay inside .diagnostic-private');

const packets = CEFR_LEVELS.flatMap(level => DIAGNOSTIC_LISTENING_PREPRODUCTION_ROLES.map(role => {
  const file = path.join(reviewRoot, level.toLowerCase(), `${role}.completed.json`);
  return JSON.parse(readFileSync(file, 'utf8'));
}));
const manifest = compileDiagnosticListeningPreproductionApprovals({ briefs, packets });
const rendered = `${JSON.stringify(manifest, null, 2)}\n`;
const manifestSha256 = createHash('sha256').update(rendered).digest('hex');
const confirmation = `RECORD_DIAGNOSTIC_LISTENING_PREPRODUCTION:${manifestSha256}`;
if (!cli.write) {
  process.stdout.write(`${JSON.stringify({
    decision: 'VALID_APPROVALS_READY_TO_RECORD',
    approvals: manifest.approvals.length,
    snapshotSha256: snapshot,
    manifestSha256,
    confirmation,
  }, null, 2)}\n`);
} else {
  assert.equal(execFileSync('git', ['status', '--porcelain'], { cwd: root, encoding: 'utf8' }), '',
    'recording listening preproduction approvals requires a clean working tree');
  assert.match(String(cli['applied-by'] ?? ''), /^[A-Za-z0-9][A-Za-z0-9._@+-]{2,159}$/u,
    '--applied-by requires a stable operator identity');
  assert.equal(cli.confirm, confirmation, `pass --confirm=${confirmation}`);
  const output = path.join(root, 'config/diagnostic/english-listening-preproduction-approvals.json');
  writeFileSync(output, rendered);
  process.stdout.write(`${JSON.stringify({ decision: 'RECORDED', output, approvals: manifest.approvals.length, manifestSha256 }, null, 2)}\n`);
}
