import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  TOEFL_MISSING_AUDIO_ROWS,
  TOEFL_MISSING_AUDIO_SUMMARY,
} from './build-toefl-missing-audio-manifest.mjs';
import { TOEFL_RELEASED_FIXED_LISTENING_MEDIA_IDS } from '../src/data/toefl/listening-fixed-registry.ts';
import {
  TOEFL_RELEASED_FIXED_INTERVIEW_MEDIA_IDS,
  TOEFL_RELEASED_FIXED_REPEAT_MEDIA_IDS,
} from '../src/data/toefl/speaking-fixed-repeat.ts';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..');
const reportPath = path.join(repoRoot, 'docs', 'toefl-2026-audio-release-2026-08-21.json');
const report = JSON.parse(readFileSync(reportPath, 'utf8'));
const manifestByMediaId = new Map(TOEFL_MISSING_AUDIO_ROWS.map((row) => [row.media_id, row]));

function sha256(filePath) {
  return createHash('sha256').update(readFileSync(filePath)).digest('hex');
}

assert.equal(report.status, 'released', 'the checked-in TOEFL audio report must be released');
assert.equal(report.manifestSha256, TOEFL_MISSING_AUDIO_SUMMARY.manifestSha256, 'release belongs to a stale source manifest');
assert.equal(report.files, 400, 'release must contain exactly 400 files');
assert.equal(report.filesByMediaId.length, 400, 'release inventory must contain exactly 400 rows');
assert.equal(new Set(report.filesByMediaId.map((file) => file.mediaId)).size, 400, 'release media IDs must be unique');
assert.equal(new Set(report.filesByMediaId.map((file) => file.url)).size, 400, 'release URLs must be unique');
assert.deepEqual(
  report.filesByMediaId.map((file) => file.mediaId).sort(),
  TOEFL_MISSING_AUDIO_ROWS.map((row) => row.media_id).sort(),
  'release inventory must exactly match the approved source manifest',
);

let totalBytes = 0;
const setCounts = new Map();
for (const file of report.filesByMediaId) {
  const row = manifestByMediaId.get(file.mediaId);
  assert.ok(row, `release has an unknown media ID: ${file.mediaId}`);
  assert.equal(file.url, row.planned_url, `release URL changed for ${file.mediaId}`);
  assert.match(file.url, /^\/audio\/toefl\/set-(?:[1-9]|1\d|20)\/[a-z0-9-]+\.mp3$/, `unsafe TOEFL audio URL: ${file.url}`);
  const targetPath = path.join(repoRoot, 'public', file.url);
  assert.ok(targetPath.startsWith(path.join(repoRoot, 'public', 'audio', 'toefl')), `audio path escaped TOEFL root: ${file.url}`);
  assert.ok(existsSync(targetPath), `released audio is missing: ${file.url}`);
  const bytes = statSync(targetPath).size;
  assert.equal(bytes, file.bytes, `released audio size changed: ${file.url}`);
  assert.equal(sha256(targetPath), file.sha256, `released audio digest changed: ${file.url}`);
  totalBytes += bytes;
  const setNumber = Number(row.set_id.slice(4));
  setCounts.set(setNumber, (setCounts.get(setNumber) ?? 0) + 1);
}

assert.equal(totalBytes, report.totalBytes, 'release total byte count changed');
assert.deepEqual([...setCounts.entries()].sort((a, b) => a[0] - b[0]), Array.from(
  { length: 20 },
  (_, index) => [index + 1, 20],
), 'every set must contain exactly 20 released files');

const computedReleaseSha256 = createHash('sha256')
  .update([...report.filesByMediaId]
    .sort((left, right) => left.mediaId.localeCompare(right.mediaId))
    .map((file) => `${file.mediaId}\t${file.sha256}`)
    .join('\n'))
  .digest('hex');
assert.equal(computedReleaseSha256, report.releaseSha256, 'aggregate release digest changed');

const expectedListeningIds = TOEFL_MISSING_AUDIO_ROWS
  .filter((row) => row.section === 'listening')
  .map((row) => row.media_id)
  .sort();
const expectedRepeatIds = TOEFL_MISSING_AUDIO_ROWS
  .filter((row) => row.task === 'listen-and-repeat')
  .map((row) => row.media_id)
  .sort();
const expectedInterviewIds = TOEFL_MISSING_AUDIO_ROWS
  .filter((row) => row.task === 'take-an-interview')
  .map((row) => row.media_id)
  .sort();
assert.equal(expectedListeningIds.length, 280, 'manifest Listening release count changed');
assert.equal(expectedRepeatIds.length, 40, 'manifest Repeat release count changed');
assert.equal(expectedInterviewIds.length, 80, 'manifest Interview release count changed');
assert.deepEqual([...TOEFL_RELEASED_FIXED_LISTENING_MEDIA_IDS].sort(), expectedListeningIds, 'Listening runtime gate differs from release');
assert.deepEqual([...TOEFL_RELEASED_FIXED_REPEAT_MEDIA_IDS].sort(), expectedRepeatIds, 'Repeat runtime gate differs from release');
assert.deepEqual([...TOEFL_RELEASED_FIXED_INTERVIEW_MEDIA_IDS].sort(), expectedInterviewIds, 'Interview runtime gate differs from release');

console.log(`✓ TOEFL audio release: 400/400 exact files, ${totalBytes} bytes, 20 files per set, SHA ${report.releaseSha256}`);
