import assert from 'node:assert/strict';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const baseLogPath = path.resolve(process.argv[2] ?? '');
const replacementLogPath = path.resolve(process.argv[3] ?? '');
const outputLogPath = path.resolve(process.argv[4] ?? '');
const mediaIds = process.argv.slice(5);
assert.ok(process.argv[4] && mediaIds.length > 0, 'usage: apply-toefl-audio-replacements.mjs <base-log> <replacement-log> <output-log> <media-id> [...]');

const baseLog = JSON.parse(readFileSync(baseLogPath, 'utf8'));
const replacementLog = JSON.parse(readFileSync(replacementLogPath, 'utf8'));
assert.equal(baseLog.manifestSha256, replacementLog.manifestSha256, 'replacement log belongs to another manifest');
const replacements = new Map(replacementLog.files.map((file) => [file.media_id, file]));
assert.deepEqual(mediaIds.filter((mediaId) => !replacements.has(mediaId)), [], 'replacement log is missing a requested media ID');
const selected = new Set(mediaIds);
let replaced = 0;
const files = baseLog.files.map((file) => {
  const baseFile = { ...file };
  if (!selected.has(file.media_id)) return baseFile;
  const replacement = replacements.get(file.media_id);
  assert.ok(existsSync(replacement.path), `replacement audio is missing: ${replacement.path}`);
  replaced += 1;
  return {
    ...baseFile,
    path: replacement.path,
    replacedSourcePath: baseFile.path,
    replacementGenerationLog: replacementLogPath,
  };
});
assert.equal(replaced, selected.size, 'not every requested media ID existed in the base log');
writeFileSync(outputLogPath, `${JSON.stringify({
  ...baseLog,
  status: 'qa_accepted_source_selection',
  updatedAt: new Date().toISOString(),
  sourceLogs: [...new Set([...(baseLog.sourceLogs ?? [baseLogPath]), replacementLogPath])],
  files,
}, null, 2)}\n`);
console.log(JSON.stringify({ outputLogPath, files: files.length, replaced }, null, 2));
