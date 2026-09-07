#!/usr/bin/env node

import assert from 'node:assert/strict';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { objectiveRows } from './lib/ielts-answer-key-audit.mjs';
import { auditAsrAlignment } from './lib/ielts-asr-audit.mjs';
import { mediaBinary } from './lib/ielts-audio-timing.mjs';
import { sha256, ttsText } from './lib/ielts-audio-production.mjs';

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
const recognitionVariantsBytes = readFileSync(path.join(root, 'config/ielts-audio/asr-recognition-variants.json'));
const recognitionVariants = JSON.parse(recognitionVariantsBytes);

function transcribe(audio, outputDirectory, outputName, focused = false) {
  const output = path.join(outputDirectory, `${outputName}.json`);
  if (args.force !== 'true' && existsSync(output)) return output;
  const whisperArgs = [audio, '--model', model, '--language', 'en', '--task', 'transcribe', '--temperature', '0', '--condition-on-previous-text', 'True', '--word-timestamps', 'True'];
  if (!focused) whisperArgs.push('--hallucination-silence-threshold', '2');
  whisperArgs.push('--verbose', 'False', '--output-dir', outputDirectory, '--output-name', outputName, '--output-format', 'json');
  const result = spawnSync(executable, whisperArgs, {
    cwd: root,
    encoding: 'utf8',
    env: { ...process.env, PATH: `${path.join(root, 'output/tools/bin')}:${process.env.PATH ?? ''}` },
    maxBuffer: 16 * 1024 * 1024,
    timeout: 45 * 60 * 1000,
  });
  assert.equal(result.status, 0, `Whisper failed for ${audio}: ${result.stderr || result.stdout}`);
  assert.ok(existsSync(output), `Whisper returned without creating ${output}`);
  return output;
}

function extractRepairWindow(audio, repair, output) {
  const contextSeconds = 3;
  const start = Math.max(0, repair.gapStartSeconds - contextSeconds);
  const duration = repair.gapEndSeconds - repair.gapStartSeconds + contextSeconds * 2;
  const result = spawnSync(mediaBinary('ffmpeg'), ['-y', '-hide_banner', '-loglevel', 'error', '-ss', String(start), '-i', audio, '-t', String(duration), '-ar', '16000', '-ac', '1', '-c:a', 'pcm_s16le', output], { encoding: 'utf8', maxBuffer: 4 * 1024 * 1024 });
  assert.equal(result.status, 0, `Failed to extract repair window: ${result.stderr}`);
}

const rows = [];
for (const setNumber of sets) {
  const repair = manifest.rows.find(row => row.set === setNumber);
  assert.ok(repair, `Repair manifest missing Set ${setNumber}`);
  const directory = path.join(input, `set-${setNumber}`);
  const audio = path.join(directory, `ielts-listening-set-${setNumber}.repaired.mp3`);
  assert.ok(existsSync(audio), `Missing staged repair: ${audio}`);
  const asrJson = transcribe(audio, directory, `whisper-repaired-set-${setNumber}`);
  const reportPath = path.join(directory, `asr-repair-report-set-${setNumber}.json`);
  const audit = spawnSync(process.execPath, ['--experimental-strip-types', '--no-warnings', path.join(root, 'scripts/audit-ielts-asr.mjs'), `--set=${setNumber}`, `--audio=${audio}`, `--asr-json=${asrJson}`, `--output=${reportPath}`, `--engine=mlx-whisper:${model}`, '--mode=repair'], { cwd: root, encoding: 'utf8', maxBuffer: 4 * 1024 * 1024 });
  const report = existsSync(reportPath) ? JSON.parse(readFileSync(reportPath, 'utf8')) : null;

  const windowAudio = path.join(directory, `repair-window-set-${setNumber}.wav`);
  extractRepairWindow(audio, repair, windowAudio);
  const windowAsrJson = transcribe(windowAudio, directory, `whisper-repair-window-set-${setNumber}`, true);
  const windowAsr = JSON.parse(readFileSync(windowAsrJson, 'utf8'));
  const authoredMock = (await import(new URL(`../src/data/mocks/ielts-set-${setNumber}.ts`, import.meta.url))).default;
  const focusedRows = objectiveRows(authoredMock).filter(row => row.skill === 'listening' && repair.requiredQuestions.includes(row.number)).map(row => {
    const canonicalAccepted = row.accepted ?? [];
    const asrRecognitionVariants = recognitionVariants.sets?.[String(setNumber)]?.[String(row.number)]?.variants ?? [];
    return { ...row, canonicalAccepted, asrRecognitionVariants, accepted: [...new Set([...canonicalAccepted, ...canonicalAccepted.map(ttsText), ...asrRecognitionVariants])] };
  });
  const focusedAudit = auditAsrAlignment({
    expectedText: repair.segments.map(segment => ttsText(segment.text)).join('\n\n'),
    segments: windowAsr.segments ?? windowAsr.result?.segments,
    objectiveRows: focusedRows,
    enforceWordErrorRate: false,
  });
  const requiredFound = focusedAudit.status === 'PASS' && focusedAudit.completionEvidenceFound === repair.requiredQuestions.length;
  const nonRepairMissing = report?.completionEvidence.filter(item => !item.found && !repair.requiredQuestions.includes(item.question)).map(item => item.question) ?? [];
  const status = report && requiredFound && nonRepairMissing.length === 0 ? 'PASS' : 'FAIL';
  const qaReportPath = path.join(directory, `repair-qa-report-set-${setNumber}.json`);
  const qaReport = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    set: setNumber,
    status,
    audioPath: audio,
    audioSha256: sha256(readFileSync(audio)),
    repairManifestSha256: manifest.repairManifestSha256,
    globalAsr: {
      reportPath,
      reportSha256: sha256(readFileSync(reportPath)),
      processExitCode: audit.status,
      wordErrorRate: report?.wordErrorRate ?? null,
      wordErrorRateEnforced: false,
      completionEvidence: report ? `${report.completionEvidenceFound}/${report.completionEvidenceTotal}` : null,
      missingRepairQuestions: report?.completionEvidence.filter(item => !item.found && repair.requiredQuestions.includes(item.question)).map(item => item.question) ?? [],
      missingNonRepairQuestions: nonRepairMissing,
    },
    focusedRepairAsr: {
      windowAudioPath: windowAudio,
      windowAudioSha256: sha256(readFileSync(windowAudio)),
      asrPath: windowAsrJson,
      asrSha256: sha256(readFileSync(windowAsrJson)),
      ...focusedAudit,
    },
    requiredQuestions: repair.requiredQuestions,
    requiredFound,
    effectiveCompletionEvidence: report ? `${report.completionEvidenceFound + report.completionEvidence.filter(item => !item.found && repair.requiredQuestions.includes(item.question) && focusedAudit.completionEvidence.some(focused => focused.question === item.question && focused.found)).length}/${report.completionEvidenceTotal}` : null,
    releaseAuthorized: false,
  };
  writeFileSync(qaReportPath, `${JSON.stringify(qaReport, null, 2)}\n`);
  rows.push({ set: setNumber, status, wordErrorRate: report?.wordErrorRate ?? null, requiredQuestions: repair.requiredQuestions, requiredFound, globalCompletionEvidence: report ? `${report.completionEvidenceFound}/${report.completionEvidenceTotal}` : null, effectiveCompletionEvidence: qaReport.effectiveCompletionEvidence, report: qaReportPath });
}
console.log(JSON.stringify({ repairManifestSha256: manifest.repairManifestSha256, model, releaseAuthorized: false, rows }, null, 2));
if (rows.some(row => row.status !== 'PASS')) process.exitCode = 1;
