#!/usr/bin/env node

import assert from 'node:assert/strict';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sha256 } from './lib/ielts-audio-production.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const reviewPath = path.join(root, 'output/ielts-legacy-replacement-review-2026-09-09/review-batch.json');
const outputPath = path.join(root, 'config/ielts-audio/legacy-replacement-quality-approval.json');
const write = process.argv.includes('--write');
for (const argument of process.argv.slice(2)) assert.equal(argument, '--write', `Unknown argument: ${argument}`);

const review = JSON.parse(readFileSync(reviewPath, 'utf8'));
assert.ok(['AUTOMATIC_QA_PASS_PENDING_HUMAN_REVIEW', 'QUALITY_APPROVED_PENDING_PUBLICATION', 'PUBLISHED'].includes(review.status));
assert.equal(review.sets.length, 7);
assert.ok(review.sets.every(row => row.technicalStatus === 'PASS' && row.asrStatus === 'PASS' && row.completionEvidence === '33/33'));

const approvalCore = {
  schemaVersion: 1,
  status: 'APPROVED',
  scope: 'legacy_replacement_staged_audio_quality_batch',
  approvedAt: '2026-09-09',
  reviewer: { kind: 'human', id: 'owner' },
  basis: {
    decision: 'Owner listened to the staged legacy replacement batch and confirmed that it sounds good.',
    automaticQaRequired: true,
  },
  includedSets: review.sets.map(row => row.set),
  manifestSha256: review.manifestSha256,
  castingSha256: review.castingSha256,
  files: review.sets.map(row => ({
    set: row.set,
    source: 'STAGED_LEGACY_REPLACEMENT',
    audioSha256: row.audioSha256,
    technicalStatus: row.technicalStatus,
    asrStatus: row.asrStatus,
    completionEvidence: row.completionEvidence,
  })),
  releaseAuthorized: false,
};
const approval = { ...approvalCore, approvalSha256: sha256(JSON.stringify(approvalCore)) };

if (write) writeFileSync(outputPath, `${JSON.stringify(approval, null, 2)}\n`);
else {
  assert.ok(existsSync(outputPath), `Missing ${path.relative(root, outputPath)}; run with --write`);
  assert.deepEqual(JSON.parse(readFileSync(outputPath, 'utf8')), approval, 'Legacy replacement quality approval is stale; run with --write');
}

console.log(JSON.stringify({ status: approval.status, sets: approval.includedSets, approvalSha256: approval.approvalSha256, releaseAuthorized: false, write }, null, 2));
