import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const sha256 = value => createHash('sha256').update(value).digest('hex');
const source = readFileSync('scripts/publish-ielts-approved-audio-batch.mjs', 'utf8');

test('batch publisher fails closed across approval, QA, ASR and public-state boundaries', () => {
  assert.match(source, /--approve-copy=13/u);
  assert.match(source, /Batch quality approval digest is stale/u);
  assert.match(source, /Pre-publication baseline digest is stale/u);
  assert.match(source, /technical checks are incomplete/u);
  assert.match(source, /ASR answer coverage is incomplete/u);
  assert.match(source, /repair QA has not passed/u);
  assert.match(source, /public audio changed outside this release/u);
  assert.match(source, /copy changed before atomic publish/u);
});

test('published batch receipt and every public master remain hash-bound', { skip: !existsSync('config/ielts-audio/approved-batch-publish-receipt.json') }, () => {
  const receipt = JSON.parse(readFileSync('config/ielts-audio/approved-batch-publish-receipt.json', 'utf8'));
  const approval = JSON.parse(readFileSync('config/ielts-audio/batch-quality-approval.json', 'utf8'));
  const { receiptSha256, ...core } = receipt;
  assert.equal(sha256(JSON.stringify(core)), receiptSha256);
  assert.equal(receipt.status, 'PUBLISHED');
  assert.equal(receipt.qualityApprovalSha256, approval.approvalSha256);
  assert.deepEqual(receipt.files.map(file => file.set), [1, 2, 3, 4, 9, 13, 14, 15, 16, 17, 18, 19, 20]);
  for (const file of receipt.files) {
    assert.equal(sha256(readFileSync(`public${file.audioUrl}`)), file.audioSha256, `Set ${file.set} public audio is stale`);
    assert.equal(file.audioSha256, approval.files.find(item => item.set === file.set).audioSha256);
  }
  assert.equal(receipt.releaseAuthorized, true);
});
