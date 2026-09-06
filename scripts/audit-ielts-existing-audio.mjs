#!/usr/bin/env node

import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { mediaBinary } from './lib/ielts-audio-timing.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const manifest = JSON.parse(readFileSync(path.join(root, 'config/ielts-audio/production-manifest.json'), 'utf8'));
const args = Object.fromEntries(process.argv.slice(2).map(argument => {
  const [key, ...rest] = argument.replace(/^--/u, '').split('=');
  return [key, rest.length ? rest.join('=') : 'true'];
}));
for (const key of Object.keys(args)) assert.ok(['output', 'decode', 'asr-dir'].includes(key), `Unknown flag: ${key}`);
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');

function afinfo(file) {
  const result = spawnSync('/usr/bin/afinfo', [file], { encoding: 'utf8', maxBuffer: 2 * 1024 * 1024 });
  assert.equal(result.status, 0, `afinfo failed for ${file}: ${result.stderr}`);
  const duration = Number(result.stdout.match(/estimated duration:\s*([\d.]+)\s*sec/iu)?.[1]);
  const channels = Number(result.stdout.match(/Data format:\s+(\d+)\s+ch/iu)?.[1]);
  const sampleRate = Number(result.stdout.match(/Data format:\s+\d+\s+ch,\s*(\d+)\s+Hz/iu)?.[1]);
  return { durationSeconds: Number(duration.toFixed(3)), channels, sampleRateHz: sampleRate };
}

function decodeComplete(file) {
  if (args.decode !== 'true') return { attempted: false, status: 'PENDING' };
  const result = spawnSync(mediaBinary('ffmpeg'), ['-v', 'error', '-nostdin', '-i', file, '-map', '0:a:0', '-vn', '-f', 'null', '-'], {
    encoding: 'utf8', timeout: 180_000, maxBuffer: 2 * 1024 * 1024,
  });
  return { attempted: true, status: result.status === 0 ? 'PASS' : 'FAIL', error: result.status === 0 ? null : String(result.stderr).slice(0, 500), engine: 'ffmpeg-full-decode' };
}

const rows = [];
for (const row of manifest.rows) {
  const file = path.join(root, 'public', row.audioUrl);
  if (!existsSync(file)) {
    rows.push({ set: row.set, action: row.action, audioUrl: row.audioUrl, exists: false, decision: 'CREATE', reasons: ['MP3_MISSING'] });
    continue;
  }
  const audioSha256 = sha256(readFileSync(file));
  const media = afinfo(file);
  const decode = decodeComplete(file);
  const asrPath = args['asr-dir'] ? path.join(path.resolve(args['asr-dir']), `asr-report-set-${row.set}.json`) : null;
  const asr = asrPath && existsSync(asrPath) ? JSON.parse(readFileSync(asrPath, 'utf8')) : null;
  const asrPass = asr?.status === 'PASS' && asr.audioSha256 === audioSha256 && asr.productionManifestSha256 === manifest.manifestSha256;
  let decision = 'MANUAL_REVIEW';
  const reasons = [];
  if (row.action === 'REPLACE_CONFIRMED_MISMATCH') {
    decision = 'REBUILD';
    reasons.push('CONFIRMED_MISMATCH');
  } else {
    if (decode.status !== 'PASS') reasons.push(decode.status === 'FAIL' ? 'FULL_DECODE_FAILED' : 'FULL_DECODE_PENDING');
    if (!asrPass) reasons.push(asr ? 'ASR_FAILED_OR_STALE' : 'ASR_PENDING');
    if (decode.status === 'PASS' && asrPass) reasons.push('HUMAN_Q1_Q40_REVIEW_PENDING');
  }
  rows.push({ set: row.set, action: row.action, audioUrl: row.audioUrl, exists: true, bytes: readFileSync(file).length,
    audioSha256, media, decode, asr: asr ? { status: asr.status, reportPath: asrPath, fresh: asrPass } : null, decision, reasons });
}

const reportCore = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  manifestSha256: manifest.manifestSha256,
  scope: 'Existing IELTS Listening MP3 conservation audit; never release authorization',
  releaseAuthorized: false,
  rows,
};
const report = { ...reportCore, reportSha256: sha256(JSON.stringify(reportCore)) };
if (args.output) {
  const output = path.resolve(args.output);
  mkdirSync(path.dirname(output), { recursive: true });
  writeFileSync(output, `${JSON.stringify(report, null, 2)}\n`);
}
console.log(JSON.stringify({
  manifestSha256: manifest.manifestSha256,
  decisions: Object.fromEntries([...new Set(rows.map(row => row.decision))].sort().map(decision => [decision, rows.filter(row => row.decision === decision).map(row => row.set)])),
  fullDecodeRequested: args.decode === 'true',
  output: args.output ? path.resolve(args.output) : null,
  releaseAuthorized: false,
}, null, 2));
