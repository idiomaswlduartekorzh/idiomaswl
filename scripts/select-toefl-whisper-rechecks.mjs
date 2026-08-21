import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const reportPath = path.resolve(process.argv[2] ?? '');
const existingTranscriptRoot = path.resolve(process.argv[3] ?? '');
assert.ok(process.argv[3], 'usage: select-toefl-whisper-rechecks.mjs <whisper-report> <existing-transcript-directory>');
const report = JSON.parse(readFileSync(reportPath, 'utf8'));
for (const file of report.files.filter((entry) => entry.wordEdits > 0)) {
  const expectedTranscript = path.join(
    existingTranscriptRoot,
    `${path.basename(file.audioPath, path.extname(file.audioPath))}.json`,
  );
  if (!existsSync(expectedTranscript)) process.stdout.write(`${file.audioPath}\0`);
}
