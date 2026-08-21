import assert from 'node:assert/strict';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { TOEFL_MISSING_AUDIO_ROWS } from './build-toefl-missing-audio-manifest.mjs';

const root = path.resolve(process.argv[2] ?? '');
assert.ok(process.argv[2], 'usage: audit-toefl-whisper.mjs <generation-directory> [transcript-directory]');
const transcriptRoot = path.resolve(process.argv[3] ?? path.join(root, 'whisper-small'));
const generationLog = JSON.parse(readFileSync(path.join(root, 'generation-log.json'), 'utf8'));
const rowsByMediaId = new Map(TOEFL_MISSING_AUDIO_ROWS.map((row) => [row.media_id, row]));

const NUMBER_WORDS = new Map([
  ['zero', '0'], ['one', '1'], ['two', '2'], ['three', '3'], ['four', '4'],
  ['five', '5'], ['six', '6'], ['seven', '7'], ['eight', '8'], ['nine', '9'],
  ['ten', '10'], ['eleven', '11'], ['twelve', '12'], ['thirteen', '13'],
  ['fourteen', '14'], ['fifteen', '15'], ['sixteen', '16'], ['seventeen', '17'],
  ['eighteen', '18'], ['nineteen', '19'], ['twenty', '20'],
]);

function words(text) {
  return text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/-/g, ' ')
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => NUMBER_WORDS.get(word) ?? word);
}

function editDistance(expected, actual) {
  const previous = Array.from({ length: actual.length + 1 }, (_, index) => index);
  for (let expectedIndex = 1; expectedIndex <= expected.length; expectedIndex += 1) {
    const current = [expectedIndex];
    for (let actualIndex = 1; actualIndex <= actual.length; actualIndex += 1) {
      current[actualIndex] = Math.min(
        previous[actualIndex] + 1,
        current[actualIndex - 1] + 1,
        previous[actualIndex - 1] + (expected[expectedIndex - 1] === actual[actualIndex - 1] ? 0 : 1),
      );
    }
    previous.splice(0, previous.length, ...current);
  }
  return previous[actual.length];
}

const files = generationLog.files.map((entry) => {
  const row = rowsByMediaId.get(entry.media_id);
  assert.ok(row, `missing manifest row for ${entry.media_id}`);
  const basename = `${path.basename(entry.path, path.extname(entry.path))}.json`;
  const setSpecificPath = path.join(transcriptRoot, row.set_id, basename);
  const transcriptPath = existsSync(setSpecificPath)
    ? setSpecificPath
    : path.join(transcriptRoot, basename);
  assert.ok(existsSync(transcriptPath), `missing Whisper transcript for ${entry.media_id}: ${transcriptPath}`);

  const expectedText = row._segments.map((segment) => segment.text).join(' ');
  const actualText = JSON.parse(readFileSync(transcriptPath, 'utf8')).text.trim();
  const expectedWords = words(expectedText);
  const actualWords = words(actualText);
  const edits = editDistance(expectedWords, actualWords);
  const wordErrorRate = expectedWords.length === 0 ? 0 : edits / expectedWords.length;
  const pass = wordErrorRate <= 0.05;

  return {
    mediaId: entry.media_id,
    transcriptPath,
    expectedText,
    actualText,
    expectedWordCount: expectedWords.length,
    actualWordCount: actualWords.length,
    wordEdits: edits,
    wordErrorRate: Number(wordErrorRate.toFixed(4)),
    pass,
  };
});

const expectedWords = files.reduce((total, file) => total + file.expectedWordCount, 0);
const wordEdits = files.reduce((total, file) => total + file.wordEdits, 0);
const failures = files.filter((file) => !file.pass);
const overallWordErrorRate = expectedWords === 0 ? 0 : wordEdits / expectedWords;
const report = {
  auditedAt: new Date().toISOString(),
  whisperModel: 'small.en',
  acceptance: {
    maximumPerFileWordErrorRate: 0.05,
    note: 'Punctuation, capitalization, accents, hyphenation, apostrophes, and zero-to-twenty digit formatting are normalized.',
  },
  files,
  summary: {
    files: files.length,
    passed: files.length - failures.length,
    failed: failures.length,
    expectedWords,
    wordEdits,
    overallWordErrorRate: Number(overallWordErrorRate.toFixed(4)),
  },
};

const reportPath = path.join(root, 'whisper-qa.json');
writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ reportPath, ...report.summary }, null, 2));
if (failures.length > 0) process.exitCode = 1;
