import assert from 'node:assert/strict';
import { existsSync, mkdirSync, readFileSync, symlinkSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const initialReportPath = path.resolve(process.argv[2] ?? '');
const baseRoot = path.resolve(process.argv[3] ?? '');
const recheckRoot = path.resolve(process.argv[4] ?? '');
const outputRoot = path.resolve(process.argv[5] ?? '');
assert.ok(process.argv[5], 'usage: combine-toefl-whisper-transcripts.mjs <initial-report> <base-directory> <recheck-directory> <output-directory>');

const initialReport = JSON.parse(readFileSync(initialReportPath, 'utf8'));
assert.equal(initialReport.files.length, 400, 'combined Whisper QA requires 400 initial transcript results');
mkdirSync(outputRoot, { recursive: true });
let rechecked = 0;
for (const file of initialReport.files) {
  const basename = path.basename(file.transcriptPath);
  const recheckPath = path.join(recheckRoot, basename);
  const usedRecheck = existsSync(recheckPath);
  const sourcePath = usedRecheck ? recheckPath : path.join(baseRoot, basename);
  assert.ok(existsSync(sourcePath), `selected transcript is missing: ${sourcePath}`);
  const outputPath = path.join(outputRoot, basename);
  if (!existsSync(outputPath)) symlinkSync(sourcePath, outputPath);
  if (usedRecheck) rechecked += 1;
}
console.log(JSON.stringify({ outputRoot, files: initialReport.files.length, rechecked }, null, 2));
