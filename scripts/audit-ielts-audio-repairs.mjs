#!/usr/bin/env node

import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const manifest = JSON.parse(readFileSync(path.join(root, 'config/ielts-audio/repair-manifest.json'), 'utf8'));
const args = Object.fromEntries(process.argv.slice(2).map(argument => {
  const [key, ...value] = argument.replace(/^--/u, '').split('=');
  return [key, value.length ? value.join('=') : 'true'];
}));
for (const key of Object.keys(args)) assert.ok(['sets', 'input-dir', 'model', 'force'].includes(key), `Unknown flag: ${key}`);
assert.ok(args.sets, '--sets=1,9 or a subset is required');
const sets = [...new Set(args.sets.split(',').map(Number))].sort((left, right) => left - right);
const model = args.model || 'mlx-community/whisper-small-mlx';
const input = path.resolve(args['input-dir'] || path.join(root, 'output/ielts-audio-repairs', manifest.repairManifestSha256));
const executable = process.env.IELTS_MLX_WHISPER || path.join(root, 'output/tools/asr-venv/bin/mlx_whisper');
assert.ok(existsSync(executable), `Missing MLX Whisper at ${executable}`);
const rows = [];
for (const setNumber of sets) {
  const repair = manifest.rows.find(row => row.set === setNumber);
  assert.ok(repair, `Repair manifest missing Set ${setNumber}`);
  const directory = path.join(input, `set-${setNumber}`);
  const audio = path.join(directory, `ielts-listening-set-${setNumber}.repaired.mp3`);
  assert.ok(existsSync(audio), `Missing staged repair: ${audio}`);
  const asrJson = path.join(directory, `whisper-repaired-set-${setNumber}.json`);
  if (args.force === 'true' || !existsSync(asrJson)) {
    const result = spawnSync(executable, [audio, '--model', model, '--language', 'en', '--task', 'transcribe', '--temperature', '0', '--condition-on-previous-text', 'True', '--word-timestamps', 'True', '--hallucination-silence-threshold', '2', '--verbose', 'False', '--output-dir', directory, '--output-name', `whisper-repaired-set-${setNumber}`, '--output-format', 'json'], {
      cwd: root,
      encoding: 'utf8',
      env: { ...process.env, PATH: `${path.join(root, 'output/tools/bin')}:${process.env.PATH ?? ''}` },
      maxBuffer: 16 * 1024 * 1024,
      timeout: 45 * 60 * 1000,
    });
    assert.equal(result.status, 0, `Whisper failed for repaired Set ${setNumber}: ${result.stderr || result.stdout}`);
    assert.ok(existsSync(asrJson), `Whisper returned without creating ${asrJson}`);
  }
  const reportPath = path.join(directory, `asr-repair-report-set-${setNumber}.json`);
  const audit = spawnSync(process.execPath, ['--experimental-strip-types', '--no-warnings', path.join(root, 'scripts/audit-ielts-asr.mjs'), `--set=${setNumber}`, `--audio=${audio}`, `--asr-json=${asrJson}`, `--output=${reportPath}`, `--engine=mlx-whisper:${model}`, '--mode=repair'], { cwd: root, encoding: 'utf8', maxBuffer: 4 * 1024 * 1024 });
  const report = existsSync(reportPath) ? JSON.parse(readFileSync(reportPath, 'utf8')) : null;
  const required = report?.completionEvidence.filter(item => repair.requiredQuestions.includes(item.question)) ?? [];
  const requiredFound = required.length === repair.requiredQuestions.length && required.every(item => item.found);
  rows.push({ set: setNumber, status: audit.status === 0 && report?.status === 'PASS' && requiredFound ? 'PASS' : 'FAIL', wordErrorRate: report?.wordErrorRate ?? null, requiredQuestions: repair.requiredQuestions, requiredFound, completionEvidence: report ? `${report.completionEvidenceFound}/${report.completionEvidenceTotal}` : null, report: reportPath });
}
console.log(JSON.stringify({ repairManifestSha256: manifest.repairManifestSha256, model, releaseAuthorized: false, rows }, null, 2));
if (rows.some(row => row.status !== 'PASS')) process.exitCode = 1;
