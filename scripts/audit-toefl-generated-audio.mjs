import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';

const root = path.resolve(process.argv[2] ?? '');
assert.ok(process.argv[2], 'usage: audit-toefl-generated-audio.mjs <generation-directory>');

const generationLogPath = path.join(root, 'generation-log.json');
const generationLog = JSON.parse(readFileSync(generationLogPath, 'utf8'));
assert.ok(Array.isArray(generationLog.files) && generationLog.files.length > 0, 'generation log has no files');

function run(command, args) {
  const result = spawnSync(command, args, { encoding: 'utf8' });
  if (result.status !== 0) {
    throw new Error(`${command} failed (${result.status}): ${result.stderr || result.stdout}`);
  }
  return { stdout: result.stdout, stderr: result.stderr };
}

function numberFrom(text, pattern, label) {
  const match = text.match(pattern);
  assert.ok(match, `unable to read ${label}`);
  const value = Number(match[1]);
  assert.ok(Number.isFinite(value), `${label} is not finite`);
  return value;
}

const files = generationLog.files.map((entry) => {
  const filePath = path.resolve(entry.path);
  assert.ok(filePath.startsWith(root), `generated file escaped QA root: ${filePath}`);

  const probe = JSON.parse(run('ffprobe', [
    '-v', 'error',
    '-show_entries', 'stream=codec_name,sample_rate,channels,bit_rate',
    '-show_entries', 'format=duration,bit_rate',
    '-of', 'json',
    filePath,
  ]).stdout);
  const stream = probe.streams?.[0];
  assert.ok(stream, `missing audio stream: ${entry.media_id}`);

  run('ffmpeg', ['-v', 'error', '-i', filePath, '-f', 'null', '-']);
  const loudness = run('ffmpeg', [
    '-hide_banner', '-nostats', '-i', filePath,
    '-af', 'ebur128=peak=true', '-f', 'null', '-',
  ]).stderr;
  const summary = loudness.slice(loudness.lastIndexOf('Summary:'));
  const integratedLufs = numberFrom(summary, /Integrated loudness:[\s\S]*?I:\s+(-?\d+(?:\.\d+)?) LUFS/, 'integrated loudness');
  const loudnessRangeLu = numberFrom(summary, /Loudness range:[\s\S]*?LRA:\s+(-?\d+(?:\.\d+)?) LU/, 'loudness range');
  const truePeakDbfs = numberFrom(summary, /True peak:[\s\S]*?Peak:\s+(-?\d+(?:\.\d+)?) dBFS/, 'true peak');

  const durationSeconds = Number(probe.format?.duration);
  const formatBitRate = Number(probe.format?.bit_rate);
  const checks = {
    decodes: true,
    codecMp3: stream.codec_name === 'mp3',
    sampleRate44100: Number(stream.sample_rate) === 44_100,
    mono: Number(stream.channels) === 1,
    bitRate64k: Number(stream.bit_rate) === 64_000,
    positiveDuration: durationSeconds >= 0.4,
    normalizedLoudness: integratedLufs >= -19 && integratedLufs <= -17,
    safeTruePeak: truePeakDbfs <= -1,
  };

  return {
    mediaId: entry.media_id,
    path: filePath,
    durationSeconds: Number(durationSeconds.toFixed(3)),
    codec: stream.codec_name,
    sampleRateHz: Number(stream.sample_rate),
    channels: Number(stream.channels),
    bitRate: formatBitRate,
    integratedLufs,
    loudnessRangeLu,
    truePeakDbfs,
    checks,
    pass: Object.values(checks).every(Boolean),
  };
});

const failures = files.filter((file) => !file.pass);
const report = {
  auditedAt: new Date().toISOString(),
  generation: {
    scope: generationLog.scope,
    manifestSha256: generationLog.manifestSha256,
    modelId: generationLog.modelId,
  },
  files,
  summary: {
    files: files.length,
    passed: files.length - failures.length,
    failed: failures.length,
    totalDurationSeconds: Number(files.reduce((sum, file) => sum + file.durationSeconds, 0).toFixed(3)),
  },
};

const reportPath = path.join(root, 'technical-qa.json');
writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ reportPath, ...report.summary }, null, 2));
if (failures.length > 0) process.exitCode = 1;
