#!/usr/bin/env node

import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildHarnessReport, hydrateRegistry } from './lib/ielts-harness-core.mjs';
import { loadVerifiedIeltsAudioPublications } from './lib/ielts-audio-publication.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const args = Object.fromEntries(process.argv.slice(2).map(argument => {
  const [key, ...rest] = argument.replace(/^--/u, '').split('=');
  return [key, rest.length ? rest.join('=') : 'true'];
}));
for (const key of Object.keys(args)) assert.ok(['reviewer', 'statement'].includes(key), `Unknown flag: ${key}`);
assert.ok(args.reviewer?.trim(), '--reviewer is required');
assert.ok(args.statement?.trim()?.length >= 20, '--statement must record the human approval in at least 20 characters');

const hash = value => createHash('sha256').update(value).digest('hex');
const readJson = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const relative = file => path.relative(root, file);
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'ielts-final-approval-'));
const inventoryFile = path.join(temporary, 'materials.json');
execFileSync(process.execPath, ['--experimental-strip-types', '--no-warnings',
  path.join(root, 'scripts/audit-ielts-materials.mjs'), '--media=true', `--output=${inventoryFile}`],
{ cwd: root, encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
const inventory = readJson(inventoryFile);
const registryFile = path.join(root, 'config/ielts-harness/evidence-registry.json');
const registry = hydrateRegistry(readJson(registryFile), root);
const publicationBySet = loadVerifiedIeltsAudioPublications(root).publicationBySet;
const before = buildHarnessReport(inventory, registry, root, publicationBySet);
assert.ok(before.sets.every(row => ['READY_FOR_HUMAN_REVIEW', 'RELEASE_READY'].includes(row.state)),
  'All 20 sets must pass every domain audit before final approval can be recorded');

const approvedAt = new Date().toISOString();
const reviewer = { kind: 'human', id: args.reviewer.trim() };
const receiptCore = {
  schemaVersion: 1,
  status: 'APPROVED',
  approvedAt,
  reviewer,
  statement: args.statement.trim(),
  sets: before.sets.map(row => ({ set: row.set, releaseFingerprintSha256: row.fingerprints.release })),
};
const receipt = { ...receiptCore, receiptSha256: hash(JSON.stringify(receiptCore)) };
const receiptFile = path.join(root, 'config/ielts-harness/final-release-approval.json');
fs.writeFileSync(receiptFile, `${JSON.stringify(receipt, null, 2)}\n`);
const receiptFileSha256 = hash(fs.readFileSync(receiptFile));
for (const row of receipt.sets) {
  const evidenceFile = path.join(root, `config/ielts-harness/evidence/set-${row.set}.json`);
  const evidence = readJson(evidenceFile);
  evidence.releaseApproval = {
    status: 'APPROVED',
    releaseFingerprintSha256: row.releaseFingerprintSha256,
    reviewer,
    reviewedAt: approvedAt,
    evidencePath: relative(receiptFile),
    evidenceSha256: receiptFileSha256,
  };
  fs.writeFileSync(evidenceFile, `${JSON.stringify(evidence, null, 2)}\n`);
}
const after = buildHarnessReport(inventory, hydrateRegistry(readJson(registryFile), root), root, publicationBySet);
assert.equal(after.summary.releaseReady, 20, 'Final approval receipt did not release all 20 current fingerprints');
fs.rmSync(temporary, { recursive: true, force: true });
console.log(JSON.stringify({ status: 'APPROVED', releaseReady: '20/20', approvedAt, reviewer,
  receipt: relative(receiptFile), receiptSha256: receipt.receiptSha256 }, null, 2));
