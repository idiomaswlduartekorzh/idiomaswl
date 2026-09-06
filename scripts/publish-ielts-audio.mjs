#!/usr/bin/env node

import assert from 'node:assert/strict';
import { copyFileSync, existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sha256 } from './lib/ielts-audio-production.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const generationRoot = path.resolve(process.argv[2] ?? '');
assert.ok(process.argv[2], 'usage: publish-ielts-audio.mjs <generation-directory>');
const manifest = JSON.parse(readFileSync(path.join(root, 'config/ielts-audio/production-manifest.json'), 'utf8'));
const log = JSON.parse(readFileSync(path.join(generationRoot, 'generation-log.json'), 'utf8'));
const technical = JSON.parse(readFileSync(path.join(generationRoot, 'technical-qa.json'), 'utf8'));
assert.equal(log.manifestSha256, manifest.manifestSha256, 'Generation log belongs to a stale manifest');
assert.equal(technical.manifestSha256, manifest.manifestSha256, 'Technical QA belongs to a stale manifest');
assert.equal(technical.status, 'technical_qa_passed_pending_transcript_and_owner_listening_review', 'Technical QA has not passed');

const receipts = [];
for (const entry of log.files ?? []) {
  const technicalFile = technical.files.find(file => file.setId === entry.setId);
  assert.ok(technicalFile && Object.values(technicalFile.checks).every(Boolean), `${entry.setId} technical checks are incomplete`);
  assert.equal(sha256(readFileSync(entry.path)), entry.audioSha256, `${entry.setId} staged audio changed after QA`);
  const asrPath = path.join(generationRoot, `asr-report-set-${entry.set}.json`);
  const humanPath = path.join(generationRoot, `human-review-set-${entry.set}.json`);
  assert.ok(existsSync(asrPath), `${entry.setId} ASR report is missing`);
  assert.ok(existsSync(humanPath), `${entry.setId} human review is missing`);
  const asr = JSON.parse(readFileSync(asrPath, 'utf8'));
  const human = JSON.parse(readFileSync(humanPath, 'utf8'));
  assert.equal(asr.status, 'PASS', `${entry.setId} ASR has not passed`);
  assert.equal(asr.audioSha256, entry.audioSha256, `${entry.setId} ASR belongs to another audio file`);
  assert.equal(asr.productionManifestSha256, manifest.manifestSha256, `${entry.setId} ASR belongs to another manifest`);
  assert.equal(human.status, 'APPROVED', `${entry.setId} human review has not approved the audio`);
  assert.equal(human.reviewer?.kind, 'human', `${entry.setId} requires a human reviewer`);
  assert.notEqual(human.reviewer?.id, 'ielts-harness', `${entry.setId} cannot be self-approved by the harness`);
  assert.equal(human.audioSha256, entry.audioSha256, `${entry.setId} human review belongs to another audio file`);
  assert.equal(human.manifestSha256, manifest.manifestSha256, `${entry.setId} human review belongs to another manifest`);
  assert.equal(human.listenedComplete, true, `${entry.setId} needs a complete listen-through`);
  assert.deepEqual(human.questionEvidence?.map(item => item.question), Array.from({ length: 40 }, (_, index) => index + 1), `${entry.setId} needs Q1-Q40 evidence`);

  const row = manifest.rows.find(candidate => candidate.set === entry.set);
  const destination = path.join(root, 'public', row.audioUrl);
  const backupDirectory = path.join(generationRoot, 'originals');
  mkdirSync(backupDirectory, { recursive: true });
  const previousSha256 = existsSync(destination) ? sha256(readFileSync(destination)) : null;
  if (existsSync(destination)) copyFileSync(destination, path.join(backupDirectory, `${path.basename(destination)}.${previousSha256}.bak`));
  mkdirSync(path.dirname(destination), { recursive: true });
  const temporary = `${destination}.publishing`;
  copyFileSync(entry.path, temporary);
  assert.equal(sha256(readFileSync(temporary)), entry.audioSha256, `${entry.setId} copy changed before atomic publish`);
  renameSync(temporary, destination);
  receipts.push({ set: entry.set, audioUrl: row.audioUrl, previousSha256, audioSha256: entry.audioSha256, publishedAt: new Date().toISOString() });
}

const receiptCore = { schemaVersion: 1, manifestSha256: manifest.manifestSha256, releaseAuthorized: false, files: receipts };
const receipt = { ...receiptCore, receiptSha256: sha256(JSON.stringify(receiptCore)) };
const receiptPath = path.join(generationRoot, 'publish-receipt.json');
writeFileSync(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`);
console.log(JSON.stringify({ receiptPath, files: receipts.length, status: 'published_audio_pending_full_ielts_release_harness' }, null, 2));
