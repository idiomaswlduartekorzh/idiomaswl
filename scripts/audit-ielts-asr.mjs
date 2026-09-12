#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { objectiveRows } from './lib/ielts-answer-key-audit.mjs';
import { auditAsrAlignment } from './lib/ielts-asr-audit.mjs';
import { withIeltsListeningProductionTranscript } from '../src/data/mocks/ielts-listening-production.ts';
import { plannedSegments, ttsText } from './lib/ielts-audio-production.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const args = Object.fromEntries(process.argv.slice(2).map(argument => {
  const [key, ...value] = argument.replace(/^--/, '').split('=');
  return [key, value.join('=')];
}));
for (const key of Object.keys(args)) assert.ok(['set', 'asr-json', 'output', 'engine', 'max-wer', 'mode', 'audio', 'manifest-file'].includes(key), `Unknown flag: ${key}`);
const setNumber = Number(args.set);
assert.ok(Number.isInteger(setNumber) && setNumber >= 1 && setNumber <= 20, '--set=1..20 is required');
assert.ok(args['asr-json'], '--asr-json=/path/to/whisper.json is required');
assert.ok(args.output, '--output=/path/to/report.json is required');

const manifest = JSON.parse(fs.readFileSync(path.resolve(args['manifest-file'] ?? path.join(root, 'config/ielts-audio/production-manifest.json')), 'utf8'));
const manifestRow = manifest.rows.find(row => row.set === setNumber);
assert.ok(manifestRow, `Production manifest missing Set ${setNumber}`);
const hasFrozenText = manifestRow.segments.every(segment => typeof segment.text === 'string');
const authoredMock = (await import(new URL(`../src/data/mocks/ielts-set-${setNumber}.ts`, import.meta.url))).default;
const mock = hasFrozenText ? authoredMock : withIeltsListeningProductionTranscript(authoredMock);
const listening = mock.sections.filter(section => section.skill === 'listening');
assert.equal(listening.length, 4, `Set ${setNumber} must contain four Listening parts`);
const audioUrls = [...new Set(listening.map(section => section.audioUrl))];
assert.equal(audioUrls.length, 1, `Set ${setNumber} must use one auditable Listening file`);
const audioPath = args.audio ? path.resolve(args.audio) : path.join(root, 'public', audioUrls[0]);
assert.ok(fs.existsSync(audioPath), `Missing audio: ${audioUrls[0]}`);

const asrPath = path.resolve(args['asr-json']);
const asrBytes = fs.readFileSync(asrPath);
const asr = JSON.parse(asrBytes);
const segments = asr.segments ?? asr.result?.segments;
const maximumWordErrorRate = args['max-wer'] ? Number(args['max-wer']) : 0.08;
assert.ok(Number.isFinite(maximumWordErrorRate) && maximumWordErrorRate >= 0 && maximumWordErrorRate <= 1, '--max-wer must be between 0 and 1');
const transcripts = hasFrozenText
  ? [1, 2, 3, 4].map(part => ({ part, transcript: manifestRow.segments.filter(segment => segment.part === part && segment.kind === 'content').map(segment => segment.text).join('\n\n') }))
  : listening.map(section => ({ part: section.part, transcript: section.transcript ?? '' }));
const policy = JSON.parse(fs.readFileSync(path.join(root, 'config/ielts-audio/production-policy.json'), 'utf8'));
const recognitionVariantsBytes = fs.readFileSync(path.join(root, 'config/ielts-audio/asr-recognition-variants.json'));
const recognitionVariants = JSON.parse(recognitionVariantsBytes);
const expectedSegments = hasFrozenText
  ? manifestRow.segments.map(segment => ({ kind: segment.kind, part: segment.part, profile: segment.profile, text: segment.text, pauseAfterSeconds: segment.pauseAfterSeconds }))
  : listening.flatMap(section => plannedSegments(section, manifestRow.accentTarget, setNumber, policy));
const sha256 = value => createHash('sha256').update(value).digest('hex');
const audit = auditAsrAlignment({
  expectedText: expectedSegments.map(item => ttsText(item.text)).join('\n\n'),
  segments,
  objectiveRows: objectiveRows(mock).filter(row => row.skill === 'listening').map(row => {
    const asrRecognitionVariants = recognitionVariants.sets?.[String(setNumber)]?.[String(row.number)]?.variants ?? [];
    const canonicalAccepted = row.accepted ?? [];
    return {
      ...row,
      canonicalAccepted,
      asrRecognitionVariants,
      accepted: [...new Set([...canonicalAccepted, ...canonicalAccepted.map(ttsText), ...asrRecognitionVariants])],
    };
  }),
  maximumWordErrorRate,
  allowFuzzySingleWords: args.mode === 'reuse',
  enforceWordErrorRate: args.mode !== 'repair',
});
const report = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  set: setNumber,
  source: `src/data/mocks/ielts-set-${setNumber}.ts`,
  audioUrl: audioUrls[0],
  auditedAudioPath: audioPath,
  audioSha256: sha256(fs.readFileSync(audioPath)),
  transcriptSha256: sha256(JSON.stringify(transcripts)),
  productionManifestSha256: manifest.manifestSha256,
  expectedAudioTextSha256: sha256(JSON.stringify(expectedSegments.map(segment => ({ part: segment.part, profile: segment.profile, text: segment.text })))),
  asrRecognitionVariantsSha256: sha256(recognitionVariantsBytes),
  asrSourcePath: asrPath,
  asrSourceSha256: sha256(asrBytes),
  engine: args.engine || asr.model || 'unspecified',
  mode: args.mode || 'production',
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
