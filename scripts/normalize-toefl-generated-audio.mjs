import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { ffmpegAssemble } from './generate-toefl-2026-audio.mjs';

const root = path.resolve(process.argv[2] ?? '');
assert.ok(process.argv[2], 'usage: normalize-toefl-generated-audio.mjs <generation-directory> [media-id]');
const requestedMediaId = process.argv[3] ?? null;
const logPath = path.join(root, 'generation-log.json');
const generationLog = JSON.parse(readFileSync(logPath, 'utf8'));
const selectedFiles = requestedMediaId
  ? generationLog.files.filter((file) => file.media_id === requestedMediaId)
  : generationLog.files;
assert.ok(selectedFiles.length > 0, 'no generated files selected for normalization');

const normalized = [];
for (const [index, file] of selectedFiles.entries()) {
  assert.ok(existsSync(file.path), `generated target is missing: ${file.path}`);
  const segmentDirectory = path.join(
    path.dirname(file.path),
    '.segments',
    file.media_id.replace(/[^a-z0-9-]+/gi, '_'),
  );
  assert.ok(existsSync(segmentDirectory), `source segments are missing: ${segmentDirectory}`);
  const segmentPaths = readdirSync(segmentDirectory)
    .filter((name) => /^segment-\d+\.mp3$/.test(name))
    .sort((left, right) => Number(left.match(/\d+/)[0]) - Number(right.match(/\d+/)[0]))
    .map((name) => path.join(segmentDirectory, name));
  assert.ok(segmentPaths.length > 0, `source segment directory is empty: ${segmentDirectory}`);
  ffmpegAssemble(segmentPaths, file.path);
  normalized.push({ media_id: file.media_id, path: file.path, segments: segmentPaths.length });
  console.log(`[${index + 1}/${selectedFiles.length}] ${file.media_id}`);
}

const reportPath = path.join(root, 'normalization-log.json');
const previous = existsSync(reportPath) ? JSON.parse(readFileSync(reportPath, 'utf8')) : { files: [] };
const byMediaId = new Map(previous.files.map((file) => [file.media_id, file]));
for (const file of normalized) byMediaId.set(file.media_id, file);
writeFileSync(reportPath, `${JSON.stringify({
  normalizedAt: new Date().toISOString(),
  method: 'source_segments_pcm_then_two_pass_ebu_r128',
  files: [...byMediaId.values()],
}, null, 2)}\n`);
console.log(JSON.stringify({ reportPath, normalized: normalized.length }, null, 2));
