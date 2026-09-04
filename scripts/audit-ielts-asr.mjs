#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { objectiveRows } from './lib/ielts-answer-key-audit.mjs';
import { auditAsrAlignment } from './lib/ielts-asr-audit.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const args = Object.fromEntries(process.argv.slice(2).map(argument => {
  const [key, ...value] = argument.replace(/^--/, '').split('=');
  return [key, value.join('=')];
}));
for (const key of Object.keys(args)) assert.ok(['set', 'asr-json', 'output', 'engine', 'max-wer'].includes(key), `Unknown flag: ${key}`);
const setNumber = Number(args.set);
assert.ok(Number.isInteger(setNumber) && setNumber >= 1 && setNumber <= 20, '--set=1..20 is required');
assert.ok(args['asr-json'], '--asr-json=/path/to/whisper.json is required');
assert.ok(args.output, '--output=/path/to/report.json is required');

const mock = (await import(new URL(`../src/data/mocks/ielts-set-${setNumber}.ts`, import.meta.url))).default;
const listening = mock.sections.filter(section => section.skill === 'listening');
assert.equal(listening.length, 4, `Set ${setNumber} must contain four Listening parts`);
const audioUrls = [...new Set(listening.map(section => section.audioUrl))];
assert.equal(audioUrls.length, 1, `Set ${setNumber} must use one auditable Listening file`);
const audioPath = path.join(root, 'public', audioUrls[0]);
assert.ok(fs.existsSync(audioPath), `Missing audio: ${audioUrls[0]}`);

const asrPath = path.resolve(args['asr-json']);
const asrBytes = fs.readFileSync(asrPath);
const asr = JSON.parse(asrBytes);
const segments = asr.segments ?? asr.result?.segments;
const maximumWordErrorRate = args['max-wer'] ? Number(args['max-wer']) : 0.08;
assert.ok(Number.isFinite(maximumWordErrorRate) && maximumWordErrorRate >= 0 && maximumWordErrorRate <= 1, '--max-wer must be between 0 and 1');
const transcripts = listening.map(section => ({ part: section.part, transcript: section.transcript ?? '' }));
const sha256 = value => createHash('sha256').update(value).digest('hex');
const audit = auditAsrAlignment({
  expectedText: transcripts.map(item => item.transcript).join('\n\n'),
  segments,
  objectiveRows: objectiveRows(mock).filter(row => row.skill === 'listening'),
  maximumWordErrorRate,
});
const report = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  set: setNumber,
  source: `src/data/mocks/ielts-set-${setNumber}.ts`,
  audioUrl: audioUrls[0],
  audioSha256: sha256(fs.readFileSync(audioPath)),
  transcriptSha256: sha256(JSON.stringify(transcripts)),
  asrSourcePath: asrPath,
  asrSourceSha256: sha256(asrBytes),
  engine: args.engine || asr.model || 'unspecified',
  ...audit,
  releaseAuthorized: false,
};
const outputPath = path.resolve(args.output);
fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({
  output: outputPath,
  evidenceSha256: sha256(fs.readFileSync(outputPath)),
  status: report.status,
  wordErrorRate: report.wordErrorRate,
  completionEvidence: `${report.completionEvidenceFound}/${report.completionEvidenceTotal}`,
  failures: report.failures,
}, null, 2));
if (report.status !== 'PASS') process.exitCode = 1;
