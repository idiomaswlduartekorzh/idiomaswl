import assert from 'node:assert/strict';
import { existsSync, mkdirSync, readFileSync, symlinkSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const outputRoot = path.resolve(process.argv[2] ?? '');
const logPaths = process.argv.slice(3).map((logPath) => path.resolve(logPath));
assert.ok(process.argv[2] && logPaths.length > 0, 'usage: prepare-toefl-whisper-qa.mjs <output-directory> <generation-log> [...]');

const logs = logPaths.map((logPath) => JSON.parse(readFileSync(logPath, 'utf8')));
const manifestSha256 = logs[0].manifestSha256;
assert.ok(logs.every((log) => log.manifestSha256 === manifestSha256), 'generation logs belong to different manifests');
const sourceFiles = logs.flatMap((log) => log.files ?? []);
assert.equal(new Set(sourceFiles.map((file) => file.media_id)).size, sourceFiles.length, 'generation logs contain duplicate media IDs');
assert.equal(sourceFiles.length, 400, 'full TOEFL Whisper QA requires exactly 400 generated files');

const audioRoot = path.join(outputRoot, 'audio');
mkdirSync(audioRoot, { recursive: true });
const files = sourceFiles.map((file) => {
  const sourcePath = path.resolve(file.path);
  assert.ok(existsSync(sourcePath), `generated audio is missing: ${sourcePath}`);
  const basename = `${file.media_id.replace(/[^a-z0-9]+/gi, '-')}.mp3`;
  const qaPath = path.join(audioRoot, basename);
  if (!existsSync(qaPath)) symlinkSync(sourcePath, qaPath);
  return { ...file, source_path: sourcePath, path: qaPath };
});

const generationLogPath = path.join(outputRoot, 'generation-log.json');
writeFileSync(generationLogPath, `${JSON.stringify({
  generatedAt: new Date().toISOString(),
  status: 'qa_staging_only',
  scope: 'full-400',
  manifestSha256,
  modelId: logs[0].modelId,
  sourceLogs: logPaths,
  files,
}, null, 2)}\n`);
console.log(JSON.stringify({ outputRoot, generationLogPath, files: files.length }, null, 2));
