#!/usr/bin/env node

import assert from 'node:assert/strict';
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, renameSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sha256 } from './lib/ielts-audio-production.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
assert.deepEqual(process.argv.slice(2), ['--approve-copy=7'], 'Publishing requires the exact one-time flag --approve-copy=7');

const readJson = file => JSON.parse(readFileSync(file, 'utf8'));
const manifest = readJson(path.join(root, 'config/ielts-audio/legacy-replacement-manifest.json'));
const castingSha256 = sha256(readFileSync(path.join(root, 'config/ielts-audio/legacy-replacement-casting.json')));
const approval = readJson(path.join(root, 'config/ielts-audio/legacy-replacement-quality-approval.json'));
const { approvalSha256, ...approvalCore } = approval;

assert.equal(sha256(JSON.stringify(approvalCore)), approvalSha256, 'Quality approval digest is stale');
assert.equal(approval.status, 'APPROVED', 'The staged replacement batch has not been approved');
assert.equal(approval.manifestSha256, manifest.manifestSha256, 'Quality approval belongs to another manifest');
assert.equal(approval.castingSha256, castingSha256, 'Quality approval belongs to another casting policy');
assert.deepEqual(approval.includedSets, manifest.rows.map(row => row.set), 'Quality approval does not cover the complete replacement batch');

const stagingRoot = path.join(root, 'output', manifest.outputNamespace, manifest.manifestSha256);
assert.ok(existsSync(stagingRoot), `Missing staging directory: ${stagingRoot}`);
const stagedBySet = new Map();
for (const batchName of readdirSync(stagingRoot)) {
  const batch = path.join(stagingRoot, batchName);
  const logPath = path.join(batch, 'generation-log.json');
  const technicalPath = path.join(batch, 'technical-qa.json');
  if (!existsSync(logPath) || !existsSync(technicalPath)) continue;
  const log = readJson(logPath);
  const technical = readJson(technicalPath);
  assert.equal(log.manifestSha256, manifest.manifestSha256, `${batchName} generation log belongs to another manifest`);
  assert.equal(technical.manifestSha256, manifest.manifestSha256, `${batchName} technical QA belongs to another manifest`);
  assert.equal(log.castingSha256, castingSha256, `${batchName} generation log belongs to another casting policy`);
  assert.equal(technical.castingSha256, castingSha256, `${batchName} technical QA belongs to another casting policy`);
  assert.equal(technical.status, 'technical_qa_passed_pending_transcript_and_owner_listening_review', `${batchName} technical QA has not passed`);
  for (const file of log.files ?? []) {
    assert.ok(!stagedBySet.has(file.set), `Duplicate staged master for Set ${file.set}`);
    stagedBySet.set(file.set, { batch, file, technical });
  }
}

const candidates = [];
for (const row of manifest.rows) {
  const staged = stagedBySet.get(row.set);
  const approved = approval.files.find(file => file.set === row.set);
  assert.ok(staged, `Set ${row.set} has no staged master`);
  assert.ok(approved, `Set ${row.set} has no quality approval`);
  assert.equal(approved.source, 'STAGED_LEGACY_REPLACEMENT', `Set ${row.set} approval has the wrong source`);
  assert.equal(approved.technicalStatus, 'PASS', `Set ${row.set} technical approval is incomplete`);
  assert.equal(approved.asrStatus, 'PASS', `Set ${row.set} ASR approval is incomplete`);
  assert.equal(approved.completionEvidence, '33/33', `Set ${row.set} answer evidence is incomplete`);
  assert.ok(existsSync(staged.file.path), `Set ${row.set} staged master is missing`);
  assert.ok(path.relative(stagingRoot, staged.file.path) && !path.relative(stagingRoot, staged.file.path).startsWith('..'), `Set ${row.set} staged path escapes its output namespace`);
  assert.equal(sha256(readFileSync(staged.file.path)), staged.file.audioSha256, `Set ${row.set} staged master changed after generation`);
  assert.equal(staged.file.audioSha256, approved.audioSha256, `Set ${row.set} staged master changed after approval`);
  const technicalFile = staged.technical.files.find(file => file.setId === staged.file.setId);
  assert.ok(technicalFile && Object.values(technicalFile.checks).every(Boolean), `Set ${row.set} technical checks are incomplete`);
  assert.equal(technicalFile.audioSha256, approved.audioSha256, `Set ${row.set} technical QA belongs to another master`);
  const asrPath = path.join(path.dirname(staged.file.path), `staged-asr-qa-set-${row.set}.json`);
  assert.ok(existsSync(asrPath), `Set ${row.set} ASR QA is missing`);
  const asr = readJson(asrPath);
  assert.equal(asr.status, 'PASS', `Set ${row.set} ASR QA has not passed`);
  assert.equal(asr.manifestSha256, manifest.manifestSha256, `Set ${row.set} ASR QA belongs to another manifest`);
  assert.equal(asr.castingSha256, castingSha256, `Set ${row.set} ASR QA belongs to another casting policy`);
  assert.equal(asr.audioSha256, approved.audioSha256, `Set ${row.set} ASR QA belongs to another master`);
  assert.equal(asr.effectiveCompletionEvidence, '33/33', `Set ${row.set} ASR answer coverage is incomplete`);

  const destination = path.join(root, 'public', row.audioUrl);
  assert.ok(existsSync(destination), `Set ${row.set} public audio is missing`);
  const previousSha256 = sha256(readFileSync(destination));
  assert.ok([row.replacesAudioSha256, approved.audioSha256].includes(previousSha256), `Set ${row.set} public audio changed outside this release`);
  candidates.push({ row, staged, approved, destination, previousSha256 });
}
assert.equal(candidates.length, 7, 'The release must contain exactly seven replacements');

const publishedAt = new Date().toISOString();
const backupRoot = path.join(stagingRoot, 'publication-originals');
mkdirSync(backupRoot, { recursive: true });
const files = [];
for (const candidate of candidates) {
  const { row, staged, approved, destination, previousSha256 } = candidate;
  const alreadyPublished = previousSha256 === approved.audioSha256;
  if (!alreadyPublished) {
    const backup = path.join(backupRoot, `${path.basename(destination)}.${previousSha256}.bak`);
    if (!existsSync(backup)) copyFileSync(destination, backup);
    const temporary = `${destination}.publishing`;
    copyFileSync(staged.file.path, temporary);
    assert.equal(sha256(readFileSync(temporary)), approved.audioSha256, `Set ${row.set} copy changed before atomic publish`);
    renameSync(temporary, destination);
  }
  assert.equal(sha256(readFileSync(destination)), approved.audioSha256, `Set ${row.set} public hash does not match the approved master`);
  files.push({
    set: row.set,
    audioUrl: row.audioUrl,
    previousSha256: row.replacesAudioSha256,
    audioSha256: approved.audioSha256,
    result: alreadyPublished ? 'ALREADY_PUBLISHED' : 'PUBLISHED',
  });
}

const receiptCore = {
  schemaVersion: 1,
  status: 'PUBLISHED',
  publishedAt,
  manifestSha256: manifest.manifestSha256,
  castingSha256,
  qualityApprovalSha256: approvalSha256,
  authorization: {
    kind: 'human',
    reviewerId: 'owner',
    approvedCopyCount: 7,
    cliGate: '--approve-copy=7',
  },
  files,
  releaseAuthorized: true,
};
const receipt = { ...receiptCore, receiptSha256: sha256(JSON.stringify(receiptCore)) };
const receiptPath = path.join(root, 'config/ielts-audio/legacy-replacement-publish-receipt.json');
writeFileSync(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`);
writeFileSync(path.join(stagingRoot, 'publish-receipt.json'), `${JSON.stringify(receipt, null, 2)}\n`);
console.log(JSON.stringify({ status: receipt.status, files: files.length, receiptSha256: receipt.receiptSha256, receiptPath }, null, 2));
