#!/usr/bin/env node

import assert from 'node:assert/strict';
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const manifest = JSON.parse(readFileSync(path.join(root, 'config/ielts-audio/production-manifest.json'), 'utf8'));
const args = Object.fromEntries(process.argv.slice(2).map(argument => {
  const [key, ...value] = argument.replace(/^--/u, '').split('=');
  return [key, value.length ? value.join('=') : 'true'];
}));
for (const key of Object.keys(args)) assert.ok(['sets', 'model', 'output-dir', 'max-wer', 'force'].includes(key), `Unknown flag: ${key}`);

function parseSets(selection) {
  assert.ok(selection, '--sets=1,5-12 is required');
  const result = new Set();
  for (const token of selection.split(',')) {
    const match = token.trim().match(/^(\d+)(?:-(\d+))?$/u);
    assert.ok(match, `Invalid set selection: ${token}`);
    const start = Number(match[1]);
    const end = Number(match[2] ?? match[1]);
    assert.ok(start >= 1 && end <= 20 && start <= end, `Set selection outside 1-20: ${token}`);
    for (let set = start; set <= end; set += 1) result.add(set);
  }
  return [...result].sort((left, right) => left - right);
}

const selectedSets = parseSets(args.sets);
const model = args.model || 'mlx-community/whisper-small-mlx';
const output = path.resolve(args['output-dir'] || path.join(root, 'output/ielts-asr', manifest.manifestSha256));
const executable = process.env.IELTS_MLX_WHISPER || path.join(root, 'output/tools/asr-venv/bin/mlx_whisper');
assert.ok(existsSync(executable), `Missing MLX Whisper at ${executable}; install the isolated ASR environment first`);
mkdirSync(output, { recursive: true });

const summary = [];
for (const setNumber of selectedSets) {
  const row = manifest.rows.find(candidate => candidate.set === setNumber);
  assert.ok(row, `Manifest missing Set ${setNumber}`);
  assert.equal(row.action, 'AUDIT_BEFORE_REUSE', `Set ${setNumber} is ${row.action}; this command only audits reuse candidates`);
  const audio = path.join(root, 'public', row.audioUrl);
  assert.ok(existsSync(audio), `Missing audio for Set ${setNumber}: ${audio}`);
  const asrJson = path.join(output, `whisper-set-${setNumber}.json`);
  const report = path.join(output, `asr-report-set-${setNumber}.json`);
  const transcribe = args.force === 'true' || !existsSync(asrJson);
  if (transcribe) {
    const result = spawnSync(executable, [
      audio,
      '--model', model,
      '--language', 'en',
      '--task', 'transcribe',
      '--temperature', '0',
      '--condition-on-previous-text', 'True',
      '--word-timestamps', 'True',
      '--hallucination-silence-threshold', '2',
      '--verbose', 'False',
      '--output-dir', output,
      '--output-name', `whisper-set-${setNumber}`,
      '--output-format', 'json',
    ], {
      cwd: root,
      encoding: 'utf8',
      env: { ...process.env, PATH: `${path.join(root, 'output/tools/bin')}:${process.env.PATH ?? ''}` },
      maxBuffer: 16 * 1024 * 1024,
      timeout: 45 * 60 * 1000,
    });
    assert.equal(result.status, 0, `Whisper failed for Set ${setNumber}: ${result.stderr || result.stdout}`);
    assert.ok(existsSync(asrJson), `Whisper returned without creating ${asrJson}: ${result.stderr || result.stdout}`);
  }
  const audit = spawnSync(process.execPath, [
    '--experimental-strip-types', '--no-warnings', path.join(root, 'scripts/audit-ielts-asr.mjs'),
    `--set=${setNumber}`, `--asr-json=${asrJson}`, `--output=${report}`,
    `--engine=mlx-whisper:${model}`, `--max-wer=${args['max-wer'] || '0.25'}`,
    '--mode=reuse',
  ], { cwd: root, encoding: 'utf8', maxBuffer: 4 * 1024 * 1024 });
  const parsed = existsSync(report) ? JSON.parse(readFileSync(report, 'utf8')) : null;
  summary.push({
    set: setNumber,
    transcribed: transcribe,
    status: parsed?.status ?? 'ERROR',
    wordErrorRate: parsed?.wordErrorRate ?? null,
    completionEvidence: parsed ? `${parsed.completionEvidenceFound}/${parsed.completionEvidenceTotal}` : null,
    failures: parsed?.failures ?? [audit.stderr || audit.stdout || 'ASR audit produced no report'],
    report,
  });
}

console.log(JSON.stringify({
  model,
  manifestSha256: manifest.manifestSha256,
  output,
  releaseAuthorized: false,
  rows: summary,
}, null, 2));
if (summary.some(row => row.status !== 'PASS')) process.exitCode = 1;
