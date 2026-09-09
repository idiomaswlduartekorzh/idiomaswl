#!/usr/bin/env node

import assert from 'node:assert/strict';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sha256 } from './lib/ielts-audio-production.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const stagingRoot = path.resolve(process.argv[2] ?? '');
assert.ok(process.argv[2], 'usage: scaffold-ielts-audio-human-review.mjs <generation-or-repair-directory>');
const cli = process.argv.slice(3);
const value = flag => cli.includes(flag) ? cli[cli.indexOf(flag) + 1] : null;
const productionManifestPath = path.resolve(value('--manifest-file') ?? path.join(root, 'config/ielts-audio/production-manifest.json'));
const castingPath = path.resolve(value('--casting-file') ?? path.join(root, 'config/ielts-audio/voice-casting.json'));
const productionManifest = JSON.parse(readFileSync(productionManifestPath, 'utf8'));
const repairManifest = JSON.parse(readFileSync(path.join(root, 'config/ielts-audio/repair-manifest.json'), 'utf8'));
const castingSha256 = sha256(readFileSync(castingPath));
const productionLogPath = path.join(stagingRoot, 'generation-log.json');
const repairLogPath = path.join(stagingRoot, 'repair-generation-log.json');
assert.ok(existsSync(productionLogPath) || existsSync(repairLogPath), 'Staging directory has no supported generation log');

const repairMode = existsSync(repairLogPath);
const log = JSON.parse(readFileSync(repairMode ? repairLogPath : productionLogPath, 'utf8'));
if (repairMode) assert.equal(log.repairManifestSha256, repairManifest.repairManifestSha256, 'Repair log belongs to a stale manifest');
else assert.equal(log.manifestSha256, productionManifest.manifestSha256, 'Generation log belongs to a stale manifest');
assert.equal(log.castingSha256, castingSha256, 'Generation log belongs to a stale casting and assembly policy');

const outputs = [];
for (const file of log.files ?? []) {
  const audioSha256 = repairMode ? file.sha256 : file.audioSha256;
  const directory = path.dirname(file.path);
  const automaticQaPath = path.join(directory, repairMode ? `repair-qa-report-set-${file.set}.json` : `staged-asr-qa-set-${file.set}.json`);
  assert.ok(existsSync(automaticQaPath), `Set ${file.set} automatic QA is missing`);
  const automaticQa = JSON.parse(readFileSync(automaticQaPath, 'utf8'));
  assert.equal(automaticQa.status, 'PASS', `Set ${file.set} automatic QA has not passed`);
  assert.equal(automaticQa.audioSha256, audioSha256, `Set ${file.set} automatic QA belongs to another audio file`);
  assert.equal(automaticQa.castingSha256, castingSha256, `Set ${file.set} automatic QA belongs to another casting and assembly policy`);
  const output = path.join(directory, `human-review-set-${file.set}.template.json`);
  if (existsSync(output)) {
    const existing = JSON.parse(readFileSync(output, 'utf8'));
    assert.equal(existing.status, 'PENDING', `Refusing to overwrite a non-pending review template: ${output}`);
    assert.equal(existing.listenedComplete, false, `Refusing to overwrite a completed review template: ${output}`);
  }
  const template = {
    schemaVersion: 1,
    set: file.set,
    status: 'PENDING',
    reviewer: { kind: 'human', id: '' },
    reviewedAt: '',
    manifestSha256: repairMode ? repairManifest.repairManifestSha256 : productionManifest.manifestSha256,
    audioSha256,
    listenedComplete: false,
    instructions: 'Listen to the complete recording once. For every question, record the exact audible evidence and time range. Set status to APPROVED only after all 40 rows are approved, then save as human-review-set-N.json.',
    questionEvidence: Array.from({ length: 40 }, (_, index) => ({
      question: index + 1,
      status: 'PENDING',
      startSeconds: null,
      endSeconds: null,
      audiblePhrase: '',
      rationale: '',
    })),
  };
  writeFileSync(output, `${JSON.stringify(template, null, 2)}\n`);
  outputs.push(output);
}
console.log(JSON.stringify({ mode: repairMode ? 'repair' : 'production', files: outputs.length, outputs }, null, 2));
