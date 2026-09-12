#!/usr/bin/env node

import assert from 'node:assert/strict';
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, renameSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sha256 } from './lib/ielts-audio-production.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
assert.deepEqual(process.argv.slice(2), ['--approve-copy=13'], 'Publishing requires the exact one-time flag --approve-copy=13');

const readJson = file => JSON.parse(readFileSync(file, 'utf8'));
const manifest = readJson(path.join(root, 'config/ielts-audio/production-manifest.json'));
const repairManifest = readJson(path.join(root, 'config/ielts-audio/repair-manifest.json'));
const castingSha256 = sha256(readFileSync(path.join(root, 'config/ielts-audio/voice-casting.json')));
const approval = readJson(path.join(root, 'config/ielts-audio/batch-quality-approval.json'));
const baseline = readJson(path.join(root, 'config/ielts-audio/approved-batch-public-baseline.json'));
const { approvalSha256, ...approvalCore } = approval;
const { baselineSha256, ...baselineCore } = baseline;

assert.equal(sha256(JSON.stringify(approvalCore)), approvalSha256, 'Batch quality approval digest is stale');
assert.equal(approval.status, 'APPROVED', 'The staged audio batch has not been approved');
assert.equal(approval.productionManifestSha256, manifest.manifestSha256, 'Batch approval belongs to another production manifest');
assert.equal(approval.repairManifestSha256, repairManifest.repairManifestSha256, 'Batch approval belongs to another repair manifest');
assert.equal(approval.castingSha256, castingSha256, 'Batch approval belongs to another casting policy');
assert.deepEqual(approval.includedSets, [1, 2, 3, 4, 9, 13, 14, 15, 16, 17, 18, 19, 20]);
assert.equal(sha256(JSON.stringify(baselineCore)), baselineSha256, 'Pre-publication baseline digest is stale');
assert.equal(baseline.productionManifestSha256, manifest.manifestSha256, 'Pre-publication baseline belongs to another manifest');
assert.deepEqual(baseline.rows.map(row => row.set), approval.includedSets, 'Pre-publication baseline does not cover the approved batch');

const productionRoot = path.join(root, 'output/ielts-audio', manifest.manifestSha256);
const productionBySet = new Map();
for (const batchName of readdirSync(productionRoot)) {
  const batch = path.join(productionRoot, batchName);
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
    assert.ok(!productionBySet.has(file.set), `Duplicate staged master for Set ${file.set}`);
    productionBySet.set(file.set, { batch, file, technical });
  }
}

const repairRoot = path.join(root, 'output/ielts-audio-repairs', repairManifest.repairManifestSha256);
const repairLog = readJson(path.join(repairRoot, 'repair-generation-log.json'));
assert.equal(repairLog.repairManifestSha256, repairManifest.repairManifestSha256);
assert.equal(repairLog.castingSha256, castingSha256);
const repairsBySet = new Map((repairLog.files ?? []).map(file => [file.set, file]));
const candidates = [];
for (const approved of approval.files) {
  const manifestRow = manifest.rows.find(row => row.set === approved.set);
  assert.ok(manifestRow, `Set ${approved.set} is missing from the production manifest`);
  const destination = path.join(root, 'public', manifestRow.audioUrl);
  let sourcePath;
  let expectedPreviousSha256;

  if (approved.source === 'STAGED_NEW') {
    const staged = productionBySet.get(approved.set);
    assert.ok(staged, `Set ${approved.set} has no staged master`);
    assert.equal(staged.file.audioSha256, approved.audioSha256, `Set ${approved.set} staged master changed after approval`);
    assert.equal(sha256(readFileSync(staged.file.path)), approved.audioSha256, `Set ${approved.set} staged master changed after QA`);
    assert.ok(path.relative(productionRoot, staged.file.path) && !path.relative(productionRoot, staged.file.path).startsWith('..'), `Set ${approved.set} staged path escapes its output namespace`);
    const technicalFile = staged.technical.files.find(file => file.setId === staged.file.setId);
    assert.ok(technicalFile && Object.values(technicalFile.checks).every(Boolean), `Set ${approved.set} technical checks are incomplete`);
    assert.equal(technicalFile.audioSha256, approved.audioSha256, `Set ${approved.set} technical QA belongs to another master`);
    const asr = readJson(path.join(path.dirname(staged.file.path), `staged-asr-qa-set-${approved.set}.json`));
    assert.equal(asr.status, 'PASS', `Set ${approved.set} ASR QA has not passed`);
    assert.equal(asr.audioSha256, approved.audioSha256, `Set ${approved.set} ASR QA belongs to another master`);
    assert.equal(asr.manifestSha256, manifest.manifestSha256, `Set ${approved.set} ASR QA belongs to another manifest`);
    assert.equal(asr.castingSha256, castingSha256, `Set ${approved.set} ASR QA belongs to another casting policy`);
    assert.match(asr.effectiveCompletionEvidence, /^(\d+)\/\1$/u, `Set ${approved.set} ASR answer coverage is incomplete`);
    sourcePath = staged.file.path;
    expectedPreviousSha256 = baseline.rows.find(row => row.set === approved.set)?.audioSha256 ?? null;
  } else if (approved.source === 'STAGED_REPAIR') {
    const repaired = repairsBySet.get(approved.set);
    const repairRow = repairManifest.rows.find(row => row.set === approved.set);
    assert.ok(repaired && repairRow, `Set ${approved.set} repair is missing`);
    assert.equal(repaired.sha256, approved.audioSha256, `Set ${approved.set} repair changed after approval`);
    assert.equal(sha256(readFileSync(repaired.path)), approved.audioSha256, `Set ${approved.set} repair changed after QA`);
    const qa = readJson(path.join(path.dirname(repaired.path), `repair-qa-report-set-${approved.set}.json`));
    assert.equal(qa.status, 'PASS', `Set ${approved.set} repair QA has not passed`);
    assert.equal(qa.audioSha256, approved.audioSha256, `Set ${approved.set} repair QA belongs to another master`);
    assert.equal(qa.repairManifestSha256, repairManifest.repairManifestSha256, `Set ${approved.set} repair QA belongs to another manifest`);
    assert.equal(qa.castingSha256, castingSha256, `Set ${approved.set} repair QA belongs to another casting policy`);
    sourcePath = repaired.path;
    expectedPreviousSha256 = baseline.rows.find(row => row.set === approved.set)?.audioSha256 ?? null;
    assert.equal(expectedPreviousSha256, repairRow.sourceAudioSha256, `Set ${approved.set} baseline differs from its repair source`);
  } else {
    assert.fail(`Set ${approved.set} uses unsupported source ${approved.source}`);
  }

  const currentSha256 = existsSync(destination) ? sha256(readFileSync(destination)) : null;
  assert.ok([expectedPreviousSha256, approved.audioSha256].includes(currentSha256), `Set ${approved.set} public audio changed outside this release`);
  candidates.push({ approved, manifestRow, destination, sourcePath, expectedPreviousSha256, currentSha256 });
}
assert.equal(candidates.length, 13, 'The release must contain exactly thirteen approved masters');

const publishedAt = new Date().toISOString();
const backupRoot = path.join(root, 'output/ielts-approved-audio-publication-originals', approvalSha256);
mkdirSync(backupRoot, { recursive: true });
const files = [];
for (const candidate of candidates) {
  const { approved, manifestRow, destination, sourcePath, expectedPreviousSha256, currentSha256 } = candidate;
  const alreadyPublished = currentSha256 === approved.audioSha256;
  if (!alreadyPublished) {
    if (currentSha256) {
      const backup = path.join(backupRoot, `${path.basename(destination)}.${currentSha256}.bak`);
      if (!existsSync(backup)) copyFileSync(destination, backup);
    }
    mkdirSync(path.dirname(destination), { recursive: true });
    const temporary = `${destination}.publishing`;
    copyFileSync(sourcePath, temporary);
    assert.equal(sha256(readFileSync(temporary)), approved.audioSha256, `Set ${approved.set} copy changed before atomic publish`);
    renameSync(temporary, destination);
  }
  assert.equal(sha256(readFileSync(destination)), approved.audioSha256, `Set ${approved.set} public hash does not match the approved master`);
  files.push({
    set: approved.set,
    source: approved.source,
    audioUrl: manifestRow.audioUrl,
    previousSha256: expectedPreviousSha256,
    audioSha256: approved.audioSha256,
    result: alreadyPublished ? 'ALREADY_PUBLISHED' : 'PUBLISHED',
  });
}

const receiptCore = {
  schemaVersion: 1,
  status: 'PUBLISHED',
  publishedAt,
  productionManifestSha256: manifest.manifestSha256,
  repairManifestSha256: repairManifest.repairManifestSha256,
  castingSha256,
  qualityApprovalSha256: approvalSha256,
  authorization: { kind: 'human', reviewerId: 'owner', approvedCopyCount: 13, cliGate: '--approve-copy=13' },
  files,
  releaseAuthorized: true,
};
const receipt = { ...receiptCore, receiptSha256: sha256(JSON.stringify(receiptCore)) };
const receiptPath = path.join(root, 'config/ielts-audio/approved-batch-publish-receipt.json');
writeFileSync(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`);
console.log(JSON.stringify({ status: receipt.status, files: files.length, receiptSha256: receipt.receiptSha256, receiptPath }, null, 2));
