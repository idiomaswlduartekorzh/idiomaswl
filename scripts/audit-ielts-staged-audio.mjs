#!/usr/bin/env node

import assert from 'node:assert/strict';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { objectiveRows } from './lib/ielts-answer-key-audit.mjs';
import { auditAsrAlignment } from './lib/ielts-asr-audit.mjs';
import { mediaBinary } from './lib/ielts-audio-timing.mjs';
import { normalizedEvidenceText, plannedSegments, sha256, ttsText } from './lib/ielts-audio-production.mjs';
import { withIeltsListeningProductionTranscript } from '../src/data/mocks/ielts-listening-production.ts';

const root = fileURLToPath(new URL('../', import.meta.url));
const args = Object.fromEntries(process.argv.slice(2).map(argument => {
  const [key, ...value] = argument.replace(/^--/u, '').split('=');
  return [key, value.length ? value.join('=') : 'true'];
}));
for (const key of Object.keys(args)) assert.ok(['sets', 'input-dir', 'model', 'force'].includes(key), `Unknown flag: ${key}`);
assert.ok(args.sets, '--sets=2 or a comma-separated subset is required');
const sets = [...new Set(args.sets.split(',').map(Number))].sort((left, right) => left - right);
const input = path.resolve(args['input-dir'] || '');
assert.ok(input && existsSync(input), `Missing staging directory: ${input}`);
const model = args.model || 'mlx-community/whisper-small-mlx';
const executable = process.env.IELTS_MLX_WHISPER || path.join(root, 'output/tools/asr-venv/bin/mlx_whisper');
assert.ok(existsSync(executable), `Missing MLX Whisper at ${executable}`);
const generationLog = JSON.parse(readFileSync(path.join(input, 'generation-log.json'), 'utf8'));
const technicalQa = JSON.parse(readFileSync(path.join(input, 'technical-qa.json'), 'utf8'));
const manifest = JSON.parse(readFileSync(path.join(root, 'config/ielts-audio/production-manifest.json'), 'utf8'));
const policy = JSON.parse(readFileSync(path.join(root, 'config/ielts-audio/production-policy.json'), 'utf8'));
const variantsBytes = readFileSync(path.join(root, 'config/ielts-audio/asr-recognition-variants.json'));
const variants = JSON.parse(variantsBytes);
assert.equal(generationLog.manifestSha256, manifest.manifestSha256, 'Generation log belongs to a stale manifest');
assert.equal(technicalQa.manifestSha256, manifest.manifestSha256, 'Technical QA belongs to a stale manifest');

function transcribe(audio, directory, outputName, focused = false) {
  const output = path.join(directory, `${outputName}.json`);
  if (args.force !== 'true' && existsSync(output)) return output;
  const whisperArgs = [audio, '--model', model, '--language', 'en', '--task', 'transcribe', '--temperature', '0', '--condition-on-previous-text', 'True', '--word-timestamps', 'True'];
  if (!focused) whisperArgs.push('--hallucination-silence-threshold', '2');
  whisperArgs.push('--verbose', 'False', '--output-dir', directory, '--output-name', outputName, '--output-format', 'json');
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

function acceptedForAsr(row, setNumber) {
  const canonicalAccepted = row.accepted ?? [];
  const asrRecognitionVariants = variants.sets?.[String(setNumber)]?.[String(row.number)]?.variants ?? [];
  return { ...row, canonicalAccepted, asrRecognitionVariants, accepted: [...new Set([...canonicalAccepted, ...canonicalAccepted.map(ttsText), ...asrRecognitionVariants])] };
}

function mapRowsToSegments(rows, segments) {
  const result = new Map();
  for (const part of [1, 2, 3, 4]) {
    const partSegments = segments.map((segment, index) => ({ ...segment, index })).filter(segment => segment.part === part && segment.kind === 'content');
    let stream = ' ';
    const ranges = partSegments.map(segment => {
      const text = normalizedEvidenceText(segment.text);
      const range = { segment, start: stream.length, end: stream.length + text.length };
      stream += `${text} `;
      return range;
    });
    let cursor = 0;
    for (const row of rows.filter(candidate => candidate.part === part).sort((left, right) => left.number - right.number)) {
      const needles = row.accepted.map(normalizedEvidenceText).filter(Boolean);
      const matches = needles.map(needle => ({ needle, index: stream.indexOf(` ${needle} `, cursor) })).filter(match => match.index >= 0).sort((left, right) => left.index - right.index);
      const match = matches[0] ?? null;
      assert.ok(match, `Cannot map Set ${row.set} Q${row.number} to a frozen source segment`);
      const range = ranges.find(candidate => match.index + 1 >= candidate.start && match.index + 1 <= candidate.end);
      assert.ok(range, `Cannot locate the source segment range for Set ${row.set} Q${row.number}`);
      result.set(row.number, range.segment);
      cursor = match.index + match.needle.length + 2;
    }
  }
  return result;
}

function focusedAudio(directory, part, segmentIndexes, label = 'focused') {
  const assembly = path.join(directory, '.assembly');
  const silence = path.join(assembly, 'silence-1.000.wav');
  if (!existsSync(silence)) {
    const made = spawnSync(mediaBinary('ffmpeg'), ['-y', '-hide_banner', '-loglevel', 'error', '-f', 'lavfi', '-t', '1', '-i', 'anullsrc=r=44100:cl=mono', '-c:a', 'pcm_s16le', silence], { encoding: 'utf8' });
    assert.equal(made.status, 0, `Could not create focused-QA silence: ${made.stderr}`);
  }
  const lines = [];
  for (const [index, segmentIndex] of segmentIndexes.entries()) {
    const prepared = path.join(assembly, `prepared-${String(segmentIndex + 1).padStart(3, '0')}.wav`);
    assert.ok(existsSync(prepared), `Missing prepared segment ${prepared}`);
    lines.push(`file '${prepared.replaceAll("'", "'\\''")}'`);
    if (index < segmentIndexes.length - 1) lines.push(`file '${silence.replaceAll("'", "'\\''")}'`);
  }
  const list = path.join(directory, `${label}-part-${part}-concat.txt`);
  const audio = path.join(directory, `${label}-part-${part}.wav`);
  writeFileSync(list, `${lines.join('\n')}\n`);
  const joined = spawnSync(mediaBinary('ffmpeg'), ['-y', '-hide_banner', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', list, '-ar', '16000', '-ac', '1', '-c:a', 'pcm_s16le', audio], { encoding: 'utf8' });
  assert.equal(joined.status, 0, `Could not assemble focused Part ${part}: ${joined.stderr}`);
  return audio;
}

const results = [];
for (const setNumber of sets) {
  const entry = generationLog.files.find(file => file.set === setNumber);
  assert.ok(entry, `Generation log has no Set ${setNumber}`);
  const technical = technicalQa.files.find(file => file.setId === entry.setId);
  const directory = path.dirname(entry.path);
  const fullAsr = transcribe(entry.path, directory, `whisper-set-${setNumber}`);
  const globalReportPath = path.join(directory, `asr-report-set-${setNumber}.json`);
  spawnSync(process.execPath, ['--experimental-strip-types', '--no-warnings', path.join(root, 'scripts/audit-ielts-asr.mjs'), `--set=${setNumber}`, `--audio=${entry.path}`, `--asr-json=${fullAsr}`, `--output=${globalReportPath}`, `--engine=mlx-whisper:${model}`, '--mode=production'], { cwd: root, encoding: 'utf8', maxBuffer: 4 * 1024 * 1024 });
  const globalReport = JSON.parse(readFileSync(globalReportPath, 'utf8'));

  const authored = (await import(new URL(`../src/data/mocks/ielts-set-${setNumber}.ts`, import.meta.url))).default;
  const mock = withIeltsListeningProductionTranscript(authored);
  const listening = mock.sections.filter(section => section.skill === 'listening').sort((left, right) => left.part - right.part);
  const sourceSegments = listening.flatMap(section => plannedSegments(section, manifest.rows.find(row => row.set === setNumber).accentTarget, setNumber, policy));
  const completionRows = objectiveRows(mock).filter(row => row.skill === 'listening' && row.kind === 'fill').map(row => {
    const section = listening.find(candidate => candidate.questions.some(question => row.key === question.id || row.key.startsWith(`${question.id}__`)));
    return { ...acceptedForAsr(row, setNumber), set: setNumber, part: section?.part };
  });
  const mapping = mapRowsToSegments(completionRows, sourceSegments);
  const partReports = [];
  if (globalReport.wordErrorRate > globalReport.maximumWordErrorRate) {
    for (const part of [1, 2, 3, 4]) {
      const segmentIndexes = sourceSegments.map((segment, index) => ({ segment, index }))
        .filter(candidate => candidate.segment.part === part).map(candidate => candidate.index);
      const partRows = completionRows.filter(row => row.part === part);
      const audio = focusedAudio(directory, part, segmentIndexes, 'full-part-qa');
      const asrPath = transcribe(audio, directory, `whisper-full-part-qa-set-${setNumber}-part-${part}`, true);
      const asr = JSON.parse(readFileSync(asrPath, 'utf8'));
      const audit = auditAsrAlignment({
        expectedText: segmentIndexes.map(index => ttsText(sourceSegments[index].text)).join('\n\n'),
        segments: asr.segments ?? asr.result?.segments,
        objectiveRows: partRows,
        maximumWordErrorRate: globalReport.maximumWordErrorRate,
      });
      partReports.push({ part, audioPath: audio, audioSha256: sha256(readFileSync(audio)), asrPath,
        asrSha256: sha256(readFileSync(asrPath)), segmentIndexes: segmentIndexes.map(index => index + 1), ...audit });
    }
  }
  const partFound = new Set(partReports.flatMap(report => report.completionEvidence.filter(item => item.found).map(item => item.question)));
  const missing = globalReport.completionEvidence.filter(item => !item.found && !partFound.has(item.question)).map(item => item.question);
  const focusedReports = [];
  for (const part of [1, 2, 3, 4]) {
    const partRows = completionRows.filter(row => row.part === part && missing.includes(row.number));
    if (!partRows.length) continue;
    const segmentIndexes = [...new Set(partRows.map(row => mapping.get(row.number).index))];
    const audio = focusedAudio(directory, part, segmentIndexes);
    const asrPath = transcribe(audio, directory, `whisper-focused-set-${setNumber}-part-${part}`, true);
    const asr = JSON.parse(readFileSync(asrPath, 'utf8'));
    const audit = auditAsrAlignment({
      expectedText: segmentIndexes.map(index => ttsText(sourceSegments[index].text)).join('\n\n'),
      segments: asr.segments ?? asr.result?.segments,
      objectiveRows: partRows,
      enforceWordErrorRate: false,
    });
    focusedReports.push({ part, audioPath: audio, audioSha256: sha256(readFileSync(audio)), asrPath, asrSha256: sha256(readFileSync(asrPath)), segmentIndexes: segmentIndexes.map(index => index + 1), ...audit });
  }
  const focusedFound = new Set(focusedReports.flatMap(report => report.completionEvidence.filter(item => item.found).map(item => item.question)));
  const unresolved = missing.filter(question => !focusedFound.has(question));
  const effectiveFound = globalReport.completionEvidenceTotal - unresolved.length;
  const partExpectedWords = partReports.reduce((sum, report) => sum + report.expectedWords, 0);
  const partEditDistance = partReports.reduce((sum, report) => sum + report.editDistance, 0);
  const partWordErrorRate = partExpectedWords ? Number((partEditDistance / partExpectedWords).toFixed(4)) : null;
  const wordErrorRateEvidence = partReports.length ? 'four_complete_parts' : 'complete_recording';
  const effectiveWordErrorRate = partReports.length ? partWordErrorRate : globalReport.wordErrorRate;
  const wordErrorRatePassed = partReports.length
    ? partReports.every(report => report.wordErrorRate <= globalReport.maximumWordErrorRate)
      && effectiveWordErrorRate <= globalReport.maximumWordErrorRate
    : globalReport.wordErrorRate <= globalReport.maximumWordErrorRate;
  const technicalPassed = Boolean(technical) && Object.values(technical.checks).every(Boolean);
  const status = technicalPassed && wordErrorRatePassed && unresolved.length === 0 ? 'PASS' : 'FAIL';
  const report = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    set: setNumber,
    status,
    manifestSha256: manifest.manifestSha256,
    audioPath: entry.path,
    audioSha256: sha256(readFileSync(entry.path)),
    technicalPassed,
    globalAsr: { reportPath: globalReportPath, reportSha256: sha256(readFileSync(globalReportPath)), wordErrorRate: globalReport.wordErrorRate, maximumWordErrorRate: globalReport.maximumWordErrorRate, completionEvidence: `${globalReport.completionEvidenceFound}/${globalReport.completionEvidenceTotal}` },
    partReports,
    wordErrorRateEvidence,
    effectiveWordErrorRate,
    focusedReports,
    effectiveCompletionEvidence: `${effectiveFound}/${globalReport.completionEvidenceTotal}`,
    unresolvedQuestions: unresolved,
    asrRecognitionVariantsSha256: sha256(variantsBytes),
    releaseAuthorized: false,
  };
  const output = path.join(directory, `staged-asr-qa-set-${setNumber}.json`);
  writeFileSync(output, `${JSON.stringify(report, null, 2)}\n`);
  results.push({ set: setNumber, status, globalWordErrorRate: globalReport.wordErrorRate, effectiveWordErrorRate,
    wordErrorRateEvidence, effectiveCompletionEvidence: report.effectiveCompletionEvidence, unresolvedQuestions: unresolved, report: output });
}
console.log(JSON.stringify({ manifestSha256: manifest.manifestSha256, model, releaseAuthorized: false, results }, null, 2));
if (results.some(result => result.status !== 'PASS')) process.exitCode = 1;
