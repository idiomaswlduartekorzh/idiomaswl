import assert from 'node:assert/strict';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { TOEFL_MISSING_AUDIO_ROWS } from './build-toefl-missing-audio-manifest.mjs';

const root = path.resolve(process.argv[2] ?? '');
assert.ok(process.argv[2], 'usage: audit-toefl-whisper.mjs <generation-directory> [transcript-directory]');
const transcriptRoot = path.resolve(process.argv[3] ?? path.join(root, 'whisper-small'));
const whisperModel = process.argv[4] ?? 'small';
const generationLog = JSON.parse(readFileSync(path.join(root, 'generation-log.json'), 'utf8'));
const rowsByMediaId = new Map(TOEFL_MISSING_AUDIO_ROWS.map((row) => [row.media_id, row]));

const NUMBER_WORDS = new Map([
  ['zero', '0'], ['one', '1'], ['two', '2'], ['three', '3'], ['four', '4'],
  ['five', '5'], ['six', '6'], ['seven', '7'], ['eight', '8'], ['nine', '9'],
  ['ten', '10'], ['eleven', '11'], ['twelve', '12'], ['thirteen', '13'],
  ['fourteen', '14'], ['fifteen', '15'], ['sixteen', '16'], ['seventeen', '17'],
  ['eighteen', '18'], ['nineteen', '19'], ['twenty', '20'],
  ['advisor', 'adviser'], ['theatre', 'theater'], ['centre', 'center'],
]);

const CONTRACTIONS = [
  [/\bi[’']m\b/g, 'i am'], [/\bi[’']ve\b/g, 'i have'], [/\bi[’']ll\b/g, 'i will'],
  [/\bwe[’']re\b/g, 'we are'], [/\bwe[’']ve\b/g, 'we have'], [/\bwe[’']ll\b/g, 'we will'],
  [/\byou[’']re\b/g, 'you are'], [/\byou[’']ve\b/g, 'you have'], [/\byou[’']ll\b/g, 'you will'],
  [/\bthey[’']re\b/g, 'they are'], [/\bthey[’']ve\b/g, 'they have'], [/\bthey[’']ll\b/g, 'they will'],
  [/\bit[’']s\b/g, 'it is'], [/\bthat[’']s\b/g, 'that is'], [/\bthere[’']s\b/g, 'there is'],
  [/\bcan[’']t\b/g, 'cannot'], [/\bwon[’']t\b/g, 'will not'], [/\bdon[’']t\b/g, 'do not'],
  [/\bdoesn[’']t\b/g, 'does not'], [/\bdidn[’']t\b/g, 'did not'], [/\bisn[’']t\b/g, 'is not'],
  [/\baren[’']t\b/g, 'are not'], [/\bwasn[’']t\b/g, 'was not'], [/\bweren[’']t\b/g, 'were not'],
  [/\bhasn[’']t\b/g, 'has not'], [/\bhaven[’']t\b/g, 'have not'], [/\bhadn[’']t\b/g, 'had not'],
  [/\bshouldn[’']t\b/g, 'should not'], [/\bwouldn[’']t\b/g, 'would not'], [/\bcouldn[’']t\b/g, 'could not'],
];

function words(text) {
  const normalized = text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\b([ap])\s*\.\s*m\s*\./g, '$1m');
  return CONTRACTIONS.reduce((result, [pattern, replacement]) => result.replace(pattern, replacement), normalized)
    .replace(/[’']/g, '')
    .replace(/-/g, ' ')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/(\d)([a-z])/g, '$1 $2')
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
    audioPath: entry.path,
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
  whisperModel,
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
