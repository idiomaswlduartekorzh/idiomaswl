#!/usr/bin/env node

import assert from 'node:assert/strict';
import { copyFileSync, existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sha256 } from './lib/ielts-audio-production.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const stagingRoot = path.resolve(process.argv[2] ?? '');
assert.ok(process.argv[2], 'usage: publish-ielts-audio-repairs.mjs <repair-directory>');
const manifest = JSON.parse(readFileSync(path.join(root, 'config/ielts-audio/repair-manifest.json'), 'utf8'));
const log = JSON.parse(readFileSync(path.join(stagingRoot, 'repair-generation-log.json'), 'utf8'));
assert.equal(log.repairManifestSha256, manifest.repairManifestSha256, 'Repair log belongs to a stale manifest');

const receipts = [];
for (const entry of log.files ?? []) {
  const row = manifest.rows.find(candidate => candidate.set === entry.set);
  assert.ok(row, `Repair manifest is missing Set ${entry.set}`);
  const directory = path.dirname(entry.path);
  const qaPath = path.join(directory, `repair-qa-report-set-${entry.set}.json`);
  const humanPath = path.join(directory, `human-review-set-${entry.set}.json`);
  assert.ok(existsSync(qaPath), `Set ${entry.set} repair QA is missing`);
  assert.ok(existsSync(humanPath), `Set ${entry.set} human review is missing`);
  const qa = JSON.parse(readFileSync(qaPath, 'utf8'));
  const human = JSON.parse(readFileSync(humanPath, 'utf8'));
  assert.equal(qa.status, 'PASS', `Set ${entry.set} repair QA has not passed`);
  assert.equal(qa.audioSha256, entry.sha256, `Set ${entry.set} repair QA belongs to another audio file`);
  assert.equal(qa.repairManifestSha256, manifest.repairManifestSha256, `Set ${entry.set} repair QA belongs to another manifest`);
  assert.equal(sha256(readFileSync(entry.path)), entry.sha256, `Set ${entry.set} repaired audio changed after QA`);
  assert.equal(human.status, 'APPROVED', `Set ${entry.set} human review has not approved the repair`);
  assert.equal(human.set, entry.set, `Set ${entry.set} human review belongs to another set`);
  assert.equal(human.reviewer?.kind, 'human', `Set ${entry.set} requires a human reviewer`);
  assert.ok(human.reviewer?.id && !['harness', 'ielts-harness', 'generator', 'self'].includes(human.reviewer.id.trim().toLowerCase()), `Set ${entry.set} requires an independent reviewer`);
  assert.ok(typeof human.reviewedAt === 'string' && !Number.isNaN(Date.parse(human.reviewedAt)), `Set ${entry.set} human review needs a valid reviewedAt timestamp`);
  assert.equal(human.audioSha256, entry.sha256, `Set ${entry.set} human review belongs to another audio file`);
  assert.equal(human.manifestSha256, manifest.repairManifestSha256, `Set ${entry.set} human review belongs to another repair manifest`);
  assert.equal(human.listenedComplete, true, `Set ${entry.set} needs a complete listen-through`);
  assert.deepEqual(human.questionEvidence?.map(item => item.question), Array.from({ length: 40 }, (_, index) => index + 1), `Set ${entry.set} needs Q1-Q40 evidence`);
  assert.ok(human.questionEvidence.every(item => item.status === 'APPROVED'
    && Number.isFinite(item.startSeconds) && Number.isFinite(item.endSeconds) && item.startSeconds >= 0 && item.endSeconds > item.startSeconds
    && typeof item.audiblePhrase === 'string' && item.audiblePhrase.trim()
    && typeof item.rationale === 'string' && item.rationale.trim()), `Set ${entry.set} Q1-Q40 evidence must include approved timecodes, audible phrase and rationale`);

  const destination = path.join(root, 'public', row.audioUrl);
  const backupDirectory = path.join(stagingRoot, 'originals');
  mkdirSync(backupDirectory, { recursive: true });
  const previousSha256 = existsSync(destination) ? sha256(readFileSync(destination)) : null;
  if (existsSync(destination)) copyFileSync(destination, path.join(backupDirectory, `${path.basename(destination)}.${previousSha256}.bak`));
  mkdirSync(path.dirname(destination), { recursive: true });
  const temporary = `${destination}.publishing`;
  copyFileSync(entry.path, temporary);
  assert.equal(sha256(readFileSync(temporary)), entry.sha256, `Set ${entry.set} copy changed before atomic publish`);
  renameSync(temporary, destination);
  receipts.push({ set: entry.set, audioUrl: row.audioUrl, previousSha256, audioSha256: entry.sha256, publishedAt: new Date().toISOString() });
}

const receiptCore = { schemaVersion: 1, repairManifestSha256: manifest.repairManifestSha256, files: receipts };
const receipt = { ...receiptCore, receiptSha256: sha256(JSON.stringify(receiptCore)) };
const receiptPath = path.join(stagingRoot, 'publish-receipt.json');
writeFileSync(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`);
console.log(JSON.stringify({ receiptPath, files: receipts.length, status: 'published_repairs_pending_full_ielts_release_harness' }, null, 2));
