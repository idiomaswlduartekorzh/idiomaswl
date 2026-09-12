#!/usr/bin/env node

import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { analyzeAudioTiming, mediaBinary } from './lib/ielts-audio-timing.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const args = Object.fromEntries(process.argv.slice(2).map(argument => {
  const [key, ...rest] = argument.replace(/^--/u, '').split('=');
  return [key, rest.length ? rest.join('=') : 'true'];
}));
for (const key of Object.keys(args)) assert.ok(['sets', 'output', 'decision-output'].includes(key), `Unknown flag: ${key}`);
assert.ok(args.sets, '--sets=5,6,... is required');
const sets = [...new Set(args.sets.split(',').map(Number))].sort((left, right) => left - right);
assert.ok(sets.every(Number.isInteger), 'Set selection must contain integers');

const manifest = JSON.parse(readFileSync(path.join(root, 'config/ielts-audio/production-manifest.json'), 'utf8'));
const casting = JSON.parse(readFileSync(path.join(root, 'config/ielts-audio/voice-casting.json'), 'utf8'));
const asrRoot = path.join(root, 'output/ielts-asr', manifest.manifestSha256);
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');

function probe(file) {
  const result = spawnSync(mediaBinary('ffprobe'), ['-v', 'error', '-select_streams', 'a:0', '-show_entries',
    'stream=codec_name,sample_rate,channels,bit_rate', '-of', 'json', file], { encoding: 'utf8' });
  assert.equal(result.status, 0, `ffprobe failed for ${file}: ${result.stderr}`);
  const stream = JSON.parse(result.stdout).streams?.[0];
  assert.ok(stream, `No audio stream in ${file}`);
  return { codec: stream.codec_name, sampleRateHz: Number(stream.sample_rate), channels: stream.channels, bitrateBps: Number(stream.bit_rate) };
}

function loudness(file) {
  const result = spawnSync(mediaBinary('ffmpeg'), ['-hide_banner', '-nostats', '-i', file, '-filter_complex', 'ebur128=peak=true', '-f', 'null', '-'],
    { encoding: 'utf8', timeout: 180_000, maxBuffer: 4 * 1024 * 1024 });
  assert.equal(result.status, 0, `loudness analysis failed for ${file}: ${result.stderr}`);
  const summary = result.stderr.slice(result.stderr.lastIndexOf('Summary:'));
  const value = pattern => Number(summary.match(pattern)?.[1]);
  return {
    integratedLoudnessLufs: value(/I:\s*(-?[\d.]+)\s*LUFS/u),
    loudnessRangeLu: value(/LRA:\s*([\d.]+)\s*LU/u),
    truePeakDbfs: value(/Peak:\s*(-?[\d.]+)\s*dBFS/u),
  };
}

function fullDecode(file) {
  const result = spawnSync(mediaBinary('ffmpeg'), ['-v', 'error', '-nostdin', '-i', file, '-map', '0:a:0', '-vn', '-f', 'null', '-'],
    { encoding: 'utf8', timeout: 180_000, maxBuffer: 2 * 1024 * 1024 });
  return { status: result.status === 0 ? 'PASS' : 'FAIL', error: result.status === 0 ? null : String(result.stderr).slice(0, 500) };
}

const rows = [];
for (const set of sets) {
  const planned = manifest.rows.find(row => row.set === set);
  assert.ok(planned, `Manifest missing Set ${set}`);
  assert.equal(planned.action, 'AUDIT_BEFORE_REUSE', `Set ${set} is not a legacy reuse candidate`);
  const audioPath = path.join(root, 'public', planned.audioUrl);
  assert.ok(existsSync(audioPath), `Missing legacy audio for Set ${set}`);
  const audioSha256 = sha256(readFileSync(audioPath));
  const asrPath = path.join(asrRoot, `asr-report-set-${set}.json`);
  assert.ok(existsSync(asrPath), `Missing current ASR report for Set ${set}`);
  const asr = JSON.parse(readFileSync(asrPath, 'utf8'));
  assert.equal(asr.audioSha256, audioSha256, `Set ${set} ASR belongs to another audio file`);
  assert.equal(asr.productionManifestSha256, manifest.manifestSha256, `Set ${set} ASR belongs to another manifest`);
  const timing = analyzeAudioTiming(audioPath);
  const encoding = probe(audioPath);
  const levels = loudness(audioPath);
  const decode = fullDecode(audioPath);
  const orderedAnswers = asr.completionEvidence.filter(item => item.found && !item.foundOutOfOrder).length;
  const checks = {
    fullDecode: decode.status === 'PASS',
    answerEvidenceCompleteAndOrdered: orderedAnswers === asr.completionEvidenceTotal,
    scriptLength: planned.scriptAudit.status === 'PASS',
    officialTiming: timing.status === 'passed',
    productionAsrFidelity: asr.wordErrorRate <= 0.08,
    targetEncoding: encoding.codec === 'mp3' && encoding.sampleRateHz === casting.target.final_sample_rate_hz
      && encoding.channels === casting.target.final_channels && encoding.bitrateBps === 64_000,
    targetIntegratedLoudness: Math.abs(levels.integratedLoudnessLufs - casting.target.integrated_loudness_lufs)
      <= casting.target.integrated_loudness_tolerance_lu,
    safeTruePeak: levels.truePeakDbfs <= casting.target.max_true_peak_dbfs,
  };
  const failures = Object.entries(checks).filter(([, passed]) => !passed).map(([name]) => name);
  rows.push({
    set,
    recommendation: failures.some(name => ['scriptLength', 'officialTiming', 'answerEvidenceCompleteAndOrdered'].includes(name)) ? 'REPLACE' : 'MANUAL_REVIEW',
    severity: failures.includes('officialTiming') || failures.includes('scriptLength') ? 'HIGH' : failures.length ? 'MEDIUM' : 'LOW',
    audioPath: path.relative(root, audioPath),
    audioSha256,
    script: { words: planned.scriptAudit.totalWords, minimumWords: 2800, partWords: planned.scriptAudit.partWords, failures: planned.scriptAudit.failures },
    timing,
    encoding,
    levels,
    asr: { status: asr.status, wordErrorRate: asr.wordErrorRate, productionMaximumWordErrorRate: 0.08,
      reuseMaximumWordErrorRate: asr.maximumWordErrorRate, expectedWords: asr.expectedWords, recognizedWords: asr.recognizedWords,
      completionEvidenceFound: orderedAnswers, completionEvidenceTotal: asr.completionEvidenceTotal },
    checks,
    failures,
  });
}

const reportCore = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  scope: 'Legacy IELTS Listening reuse decision for Sets 5-8 and 10-12',
  grain: 'one public MP3 per IELTS set',
  manifestSha256: manifest.manifestSha256,
  thresholds: {
    minimumScriptWords: 2800,
    maximumProductionWordErrorRate: 0.08,
    targetIntegratedLoudnessLufs: casting.target.integrated_loudness_lufs,
    integratedLoudnessToleranceLu: casting.target.integrated_loudness_tolerance_lu,
    maximumTruePeakDbfs: casting.target.max_true_peak_dbfs,
  },
  summary: {
    setsAudited: rows.length,
    fullDecodePassed: rows.filter(row => row.checks.fullDecode).length,
    answerEvidenceComplete: rows.filter(row => row.checks.answerEvidenceCompleteAndOrdered).length,
    scriptLengthPassed: rows.filter(row => row.checks.scriptLength).length,
    officialTimingPassed: rows.filter(row => row.checks.officialTiming).length,
    productionAsrFidelityPassed: rows.filter(row => row.checks.productionAsrFidelity).length,
    replacementRecommended: rows.filter(row => row.recommendation === 'REPLACE').length,
  },
  rows,
  releaseAuthorized: false,
};
const report = { ...reportCore, reportSha256: sha256(JSON.stringify(reportCore)) };
if (args.output) {
  const output = path.resolve(args.output);
  mkdirSync(path.dirname(output), { recursive: true });
  writeFileSync(output, `${JSON.stringify(report, null, 2)}\n`);
}
let decisionOutput = null;
if (args['decision-output']) {
  const decisionCore = {
    schemaVersion: 1,
    status: 'REPLACE_RECOMMENDED',
    generatedAt: report.generatedAt,
    productionManifestSha256: manifest.manifestSha256,
    auditReportSha256: report.reportSha256,
    sets: rows.map(row => ({
      set: row.set,
      audioSha256: row.audioSha256,
      recommendation: row.recommendation,
      severity: row.severity,
      failures: row.failures,
    })),
    releaseAuthorized: false,
  };
  const decision = { ...decisionCore, decisionSha256: sha256(JSON.stringify(decisionCore)) };
  decisionOutput = path.resolve(args['decision-output']);
  mkdirSync(path.dirname(decisionOutput), { recursive: true });
  writeFileSync(decisionOutput, `${JSON.stringify(decision, null, 2)}\n`);
}
console.log(JSON.stringify({ summary: report.summary, reportSha256: report.reportSha256,
  output: args.output ? path.resolve(args.output) : null, decisionOutput }, null, 2));
if (rows.some(row => row.recommendation === 'REPLACE')) process.exitCode = 1;
