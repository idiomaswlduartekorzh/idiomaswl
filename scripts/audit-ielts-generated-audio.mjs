#!/usr/bin/env node

import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

assert.ok(process.argv[2], 'usage: audit-ielts-generated-audio.mjs <generation-directory>');
const root = path.resolve(process.argv[2]);
const logPath = path.join(root, 'generation-log.json');
assert.ok(existsSync(logPath), `missing generation log: ${logPath}`);
const log = JSON.parse(readFileSync(logPath, 'utf8'));
const plan = JSON.parse(readFileSync(path.resolve('docs/ielts-2026-audio-generation-plan-2026-08-25.json'), 'utf8'));
const casting = JSON.parse(readFileSync(path.resolve('scripts/ielts-2026-voice-casting.json'), 'utf8'));
assert.equal(log.manifestSha256, plan.manifestSha256, 'generation log belongs to a stale manifest');
assert.equal(log.modelId, casting.model_id, 'generation used a different model');

const sha256 = value => createHash('sha256').update(value).digest('hex');
const failures = [];
const files = [];
for (const entry of log.files ?? []) {
  assert.ok(existsSync(entry.path), `missing generated file: ${entry.path}`);
  const probe = spawnSync('ffprobe', [
    '-v', 'error', '-show_entries', 'format=duration,bit_rate:stream=codec_name,sample_rate,channels',
    '-of', 'json', entry.path,
  ], { encoding: 'utf8' });
  assert.equal(probe.status, 0, `ffprobe failed for ${entry.path}: ${probe.stderr}`);
  const payload = JSON.parse(probe.stdout);
  const stream = payload.streams?.find(candidate => candidate.codec_name === 'mp3');
  const durationSeconds = Number(payload.format?.duration);
  const bitRate = Number(payload.format?.bit_rate);
  const measured = spawnSync('ffmpeg', [
    '-hide_banner', '-nostats', '-i', entry.path,
    '-af', 'loudnorm=I=-18:LRA=7:TP=-1.5:print_format=json', '-f', 'null', '-',
  ], { encoding: 'utf8' });
  const measurements = [...measured.stderr.matchAll(/\{\s*"input_i"[\s\S]*?\}/g)].at(-1)?.[0];
  assert.ok(measurements, `loudness analysis returned no measurements for ${entry.path}`);
  const loudness = JSON.parse(measurements);
  const checks = {
    shaMatchesGenerationLog: sha256(readFileSync(entry.path)) === entry.audioSha256,
    codecMp3: Boolean(stream),
    sampleRate44100: Number(stream?.sample_rate) === casting.target.final_sample_rate_hz,
    mono: Number(stream?.channels) === casting.target.final_channels,
    bitRateNear64k: bitRate >= 60000 && bitRate <= 70000,
    officialApproximateDuration: durationSeconds >= 1620 && durationSeconds <= 1980,
    loudnessNearTarget: Math.abs(Number(loudness.input_i) - casting.target.integrated_loudness_lufs) <= 1,
    truePeakWithinCeiling: Number(loudness.input_tp) <= casting.target.max_true_peak_dbfs + 0.1,
  };
  const failedChecks = Object.entries(checks).filter(([, passed]) => !passed).map(([name]) => name);
  if (failedChecks.length) failures.push({ mediaId: entry.mediaId, failedChecks });
  files.push({
    mediaId: entry.mediaId, setId: entry.setId, path: entry.path,
    audioSha256: entry.audioSha256, durationSeconds: Number(durationSeconds.toFixed(3)),
    bitRate, integratedLoudnessLufs: Number(loudness.input_i), truePeakDbfs: Number(loudness.input_tp), checks,
  });
}
assert.ok(files.length > 0, 'generation log contains no files');
const reportCore = {
  schemaVersion: 1, auditedAt: new Date().toISOString(), manifestSha256: plan.manifestSha256,
  status: failures.length ? 'rejected' : 'technical_qa_passed_pending_transcript_and_owner_listening_review',
  releaseAuthorized: false, files, failures,
};
const report = { ...reportCore, reportSha256: sha256(JSON.stringify(reportCore)) };
const reportPath = path.join(root, 'technical-qa.json');
writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ reportPath, reportSha256: report.reportSha256, status: report.status, files: files.length, failures }, null, 2));
if (failures.length) process.exitCode = 1;
