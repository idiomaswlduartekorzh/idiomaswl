import assert from 'node:assert/strict';
import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { TOEFL_MISSING_AUDIO_ROWS, TOEFL_MISSING_AUDIO_SUMMARY } from './build-toefl-missing-audio-manifest.mjs';

const sourceLogPath = path.resolve(process.argv[2] ?? '');
assert.ok(process.argv[2], 'usage: publish-toefl-generated-audio.mjs <accepted-source-log> --approve-copy 400');
assert.equal(process.argv[process.argv.indexOf('--approve-copy') + 1], '400', 'publishing requires --approve-copy 400');
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..');
const sourceLog = JSON.parse(readFileSync(sourceLogPath, 'utf8'));
assert.equal(sourceLog.manifestSha256, TOEFL_MISSING_AUDIO_SUMMARY.manifestSha256, 'accepted source log belongs to another manifest');
assert.equal(sourceLog.files.length, 400, 'accepted source log must contain exactly 400 files');
assert.equal(new Set(sourceLog.files.map((file) => file.media_id)).size, 400, 'accepted source log has duplicate media IDs');
const rowsByMediaId = new Map(TOEFL_MISSING_AUDIO_ROWS.map((row) => [row.media_id, row]));

function sha256(filePath) {
  const hash = createHash('sha256');
  const bytes = readFileSync(filePath);
  hash.update(bytes);
  return hash.digest('hex');
}

const released = [];
for (const file of sourceLog.files) {
  const row = rowsByMediaId.get(file.media_id);
  assert.ok(row, `manifest row is missing: ${file.media_id}`);
  const sourcePath = path.resolve(file.replacementGenerationLog ? file.path : (file.source_path ?? file.path));
  assert.ok(existsSync(sourcePath), `accepted source audio is missing: ${sourcePath}`);
  assert.equal(path.basename(sourcePath), path.basename(row.planned_url), `accepted source basename does not match planned URL: ${file.media_id}`);
  const targetPath = path.join(repoRoot, 'public', row.planned_url);
  assert.ok(targetPath.startsWith(path.join(repoRoot, 'public', 'audio', 'toefl')), `target escaped TOEFL audio root: ${targetPath}`);
  mkdirSync(path.dirname(targetPath), { recursive: true });
  const sourceSha256 = sha256(sourcePath);
  if (existsSync(targetPath)) {
    assert.equal(sha256(targetPath), sourceSha256, `refusing to overwrite a different published target: ${targetPath}`);
  } else {
    copyFileSync(sourcePath, targetPath);
  }
  released.push({
    mediaId: file.media_id,
    url: row.planned_url,
    sha256: sourceSha256,
    bytes: statSync(targetPath).size,
  });
}

released.sort((left, right) => left.mediaId.localeCompare(right.mediaId));
const releaseSha256 = createHash('sha256')
  .update(released.map((file) => `${file.mediaId}\t${file.sha256}`).join('\n'))
  .digest('hex');
const report = {
  releasedAt: new Date().toISOString(),
  status: 'qa_accepted_pending_repository_guardians',
  manifestSha256: sourceLog.manifestSha256,
  modelId: sourceLog.modelId,
  files: released.length,
  totalBytes: released.reduce((total, file) => total + file.bytes, 0),
  releaseSha256,
  filesByMediaId: released,
};
const reportPath = path.join(repoRoot, 'docs', 'toefl-2026-audio-release-2026-08-21.json');
writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ reportPath, files: report.files, totalBytes: report.totalBytes, releaseSha256 }, null, 2));
