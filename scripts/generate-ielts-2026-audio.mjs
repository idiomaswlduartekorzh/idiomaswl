#!/usr/bin/env node

import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { copyFileSync, existsSync, mkdirSync, readFileSync, renameSync, unlinkSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { expandIeltsListeningTranscript } from '../src/data/mocks/ielts-listening-expansions.ts';
import { assertAudioTiming } from './lib/ielts-audio-timing.mjs';

const API = 'https://api.elevenlabs.io';
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..');
const plan = JSON.parse(readFileSync(path.join(repoRoot, 'docs', 'ielts-2026-audio-generation-plan-2026-08-28.json'), 'utf8'));
const casting = JSON.parse(readFileSync(path.join(scriptDir, 'ielts-2026-voice-casting.json'), 'utf8'));
const pilotAcceptancePath = path.join(scriptDir, 'ielts-2026-audio-pilot-acceptance.json');
const pilotAcceptance = JSON.parse(readFileSync(pilotAcceptancePath, 'utf8'));
const set5Candidate = JSON.parse(readFileSync(path.join(scriptDir, 'ielts-2026-audio-set5-candidate.json'), 'utf8'));
const args = process.argv.slice(2);
const has = flag => args.includes(flag);
const value = flag => has(flag) ? args[args.indexOf(flag) + 1] : null;
const manifestHash = plan.manifestSha256;
const sourceCachePlanPath = value('--reuse-source-plan');
const sourceCacheSegmentsDir = value('--reuse-source-segments');

assert.equal(Boolean(sourceCachePlanPath), Boolean(sourceCacheSegmentsDir), 'pass both --reuse-source-plan and --reuse-source-segments');
const sourceCachePlan = sourceCachePlanPath
  ? JSON.parse(readFileSync(path.resolve(sourceCachePlanPath), 'utf8'))
  : null;
if (sourceCachePlan) {
  const sourceCacheLogPath = path.resolve(sourceCacheSegmentsDir, '..', '..', 'generation-log.json');
  assert.ok(existsSync(sourceCacheLogPath), `source cache generation log is missing: ${sourceCacheLogPath}`);
  const sourceCacheLog = JSON.parse(readFileSync(sourceCacheLogPath, 'utf8'));
  assert.equal(
    sourceCacheLog.manifestSha256,
    sourceCachePlan.manifestSha256,
    'source cache does not belong to the supplied source plan',
  );
}

assert.equal(casting.manifest_sha256, manifestHash, 'casting belongs to a stale IELTS manifest');

function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

function segmentSourceSha256(row) {
  return sha256(JSON.stringify(row.segments.map(segment => ({
    profile: segment.profile,
    textSha256: segment.textSha256,
  }))));
}

const acceptedPilotRow = plan.rows.find(row => row.setId === `set-${pilotAcceptance.pilot_set}`);
assert.ok(acceptedPilotRow, 'accepted pilot set is absent from the current plan');
assert.equal(
  pilotAcceptance.segment_source_sha256,
  segmentSourceSha256(acceptedPilotRow),
  'accepted pilot speech changed; its reusable segments are no longer valid',
);
const set5CandidateRow = plan.rows.find(row => row.setId === 'set-5');
assert.ok(set5CandidateRow, 'Set 5 candidate is absent from the current plan');
assert.equal(
  set5Candidate.segmentSourceSha256,
  segmentSourceSha256(set5CandidateRow),
  'Set 5 candidate speech changed; regenerate and re-audit before reuse',
);
assert.equal(set5Candidate.releaseAuthorized, false, 'Set 5 candidate cannot silently authorize its own release');

function parseSetSelection(selection) {
  if (!selection) return [];
  const selected = new Set();
  for (const token of selection.split(',')) {
    const match = token.trim().match(/^(\d+)(?:-(\d+))?$/);
    assert.ok(match, `invalid --sets selection: ${token}`);
    const start = Number(match[1]);
    const end = Number(match[2] ?? match[1]);
    assert.ok(start >= 1 && end <= 20 && start <= end, `--sets must stay within 1-20: ${token}`);
    for (let setNumber = start; setNumber <= end; setNumber += 1) selected.add(setNumber);
  }
  return [...selected].sort((a, b) => a - b);
}

const selectedSetNumbers = parseSetSelection(value('--sets'));
const fullBatch = has('--all');
const doGenerate = has('--generate');
const repairAssembly = has('--reassemble');
const accountStatus = has('--account');
const selectedRows = fullBatch
  ? plan.rows
  : selectedSetNumbers.length
    ? plan.rows.filter(row => selectedSetNumbers.includes(Number(row.setId.replace('set-', ''))))
    : [];

const femaleNames = new Set(['AMY', 'MAYA', 'MEG', 'PRIYA', 'SOPHIE']);
const maleNames = new Set(['BEN', 'JAMES', 'JOSH', 'LIAM', 'RYAN', 'SAM', 'TOM']);
const staffLabels = new Set(['AGENT', 'COORDINATOR', 'LIBRARIAN', 'OFFICER', 'ORGANISER', 'STAFF']);
const participantLabels = new Set(['CALLER', 'CUSTOMER', 'PARENT', 'STUDENT']);

function profileForLabel(label, accent, setNumber) {
  if (label === 'TUTOR') return `tutor:${accent}`;
  if (femaleNames.has(label)) return `student-woman:${accent}`;
  if (maleNames.has(label)) return `student-man:${accent}`;
  if (staffLabels.has(label)) return `service-staff:${accent}`;
  if (participantLabels.has(label)) return `participant-${setNumber % 2 ? 'woman' : 'man'}:${accent}`;
  return `speaker:${accent}`;
}

function sectionSegments(section, accent, setNumber) {
  const blocks = section.transcript.trim().split(/\n{2,}/).map(block => block.trim()).filter(Boolean);
  if (section.part === 2 || section.part === 4) {
    return blocks.map(text => ({ part: section.part, profile: `${section.part === 2 ? 'guide' : 'lecturer'}:${accent}`, text }));
  }
  return blocks.map(block => {
    const match = block.match(/^([A-Z][A-Z -]{1,30}):\s*([\s\S]+)$/);
    assert.ok(match, `Set ${setNumber} Part ${section.part}: unlabeled dialogue block`);
    return { part: section.part, profile: profileForLabel(match[1], accent, setNumber), text: match[2].trim() };
  });
}

const PART_NAMES = ['One', 'Two', 'Three', 'Four'];

function packContentSegments(setNumber, segments) {
  if (setNumber !== 5) return segments;
  return segments.reduce((packed, segment) => {
    const previous = packed.at(-1);
    if (previous?.profile === segment.profile) {
      previous.text = `${previous.text}\n\n${segment.text}`;
    } else {
      packed.push({ ...segment });
    }
    return packed;
  }, []);
}

function plannedSegments(section, accent, setNumber) {
  const content = sectionSegments(section, accent, setNumber);
  const split = Math.max(1, Math.ceil(content.length / 2));
  const firstQuestion = (section.part - 1) * 10 + 1;
  const midpointQuestion = firstQuestion + 4;
  const finalQuestion = firstQuestion + 9;
  const partName = PART_NAMES[section.part - 1];
  const withPauses = segments => packContentSegments(setNumber, segments)
    .map(segment => ({ kind: 'content', ...segment, pauseAfterSeconds: 0.35 }));
  return [
    {
      kind: 'announcer', part: section.part, profile: 'announcer:british',
      text: `Part ${partName}. First, review Questions ${firstQuestion} to ${midpointQuestion}.`,
      pauseAfterSeconds: 30,
    },
    ...withPauses(content.slice(0, split)),
    {
      kind: 'announcer', part: section.part, profile: 'announcer:british',
      text: `Now review Questions ${midpointQuestion + 1} to ${finalQuestion} before the recording continues.`,
      pauseAfterSeconds: 30,
    },
    ...withPauses(content.slice(split)),
    {
      kind: 'announcer', part: section.part, profile: 'announcer:british',
      text: `Part ${partName} is complete. Check your answers.`,
      pauseAfterSeconds: section.part === 4 ? 0 : 20,
    },
  ];
}

async function hydrateRow(row) {
  const setNumber = Number(row.setId.replace('set-', ''));
  const { default: mock } = await import(`../src/data/mocks/ielts-set-${setNumber}.ts`);
  const sections = mock.sections.filter(section => section.skill === 'listening').map(section => ({
    ...section,
    transcript: expandIeltsListeningTranscript(setNumber, section.part, section.transcript),
  }));
  assert.equal(sections.length, 4, `Set ${setNumber} must have four Listening parts`);
  const transcript = sections.map(section => section.transcript.trim()).join('\n\n');
  assert.equal(sha256(transcript), row.transcriptSha256, `Set ${setNumber} transcript changed after plan approval`);
  const segments = sections.flatMap(section => plannedSegments(section, row.accentTarget, setNumber));
  assert.deepEqual(
    segments.map(segment => ({
      kind: segment.kind, part: segment.part,
      profile: segment.profile,
      characters: segment.text.length,
      words: segment.text.trim().split(/\s+/).length,
      textSha256: sha256(segment.text),
      pauseAfterSeconds: segment.pauseAfterSeconds,
    })),
    row.segments,
    `Set ${setNumber} segment plan changed after approval`,
  );
  return { ...row, setNumber, segments };
}

function voiceFor(profile) {
  const separator = profile.lastIndexOf(':');
  const role = profile.slice(0, separator);
  const accent = profile.slice(separator + 1);
  const voiceRole = casting.role_voice[role];
  const voice = casting.voices[accent]?.[voiceRole];
  assert.ok(voice?.voice_id, `no voice configured for ${profile}`);
  assert.equal(voice.credit_multiplier, 1, `${profile} must keep the confirmed credit multiplier`);
  return voice;
}

function invoice(rows, label) {
  const characters = rows.reduce((total, row) => total + row.sourceCharacters, 0);
  return {
    scope: label,
    manifestSha256: manifestHash,
    files: rows.length,
    billableCharacters: characters,
    estimatedCredits: Math.ceil(characters * Number(casting.credits_per_character)),
    estimatedUsdBeforeTax: Number((characters / 1000 * Number(casting.api_price_usd_per_1000_characters)).toFixed(4)),
    generationAuthorized: false,
  };
}

async function apiJson(endpoint, apiKey) {
  const response = await fetch(`${API}${endpoint}`, { headers: { 'xi-api-key': apiKey } });
  if (!response.ok) throw new Error(`${endpoint} failed with HTTP ${response.status}: ${await response.text()}`);
  return response.json();
}

async function showAccount() {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  assert.ok(apiKey, 'ELEVENLABS_API_KEY is required only for this read-only account query');
  const subscription = await apiJson('/v1/user/subscription', apiKey);
  console.log(JSON.stringify({
    tier: subscription.tier,
    characterCount: subscription.character_count,
    characterLimit: subscription.character_limit,
    availableCredits: Number(subscription.character_limit) - Number(subscription.character_count),
    nextResetUnix: subscription.next_character_count_reset_unix,
  }, null, 2));
}

function scopeLabel() {
  return fullBatch ? 'full-sets-1-20' : `sets-${selectedSetNumbers.join('-')}`;
}

function outputDirectory(scope) {
  const output = value('--output-dir')
    ? path.resolve(value('--output-dir'))
    : path.join(os.tmpdir(), 'idiomaswl-ielts-audio-2026', manifestHash, scope);
  const publicRoot = path.join(repoRoot, 'public', 'audio', 'ielts');
  const relativeToPublic = path.relative(publicRoot, output);
  assert.ok(
    relativeToPublic.startsWith('..') || path.isAbsolute(relativeToPublic),
    'generation must stay outside public/audio/ielts until QA and release approval',
  );
  return output;
}

function seedFor(mediaId, segmentIndex) {
  return Number.parseInt(sha256(`${mediaId}:${segmentIndex}:${value('--seed-salt') ?? ''}`).slice(0, 8), 16);
}

async function ensureGenerationGate(rows) {
  assert.equal(Number(fullBatch) + Number(selectedSetNumbers.length > 0), 1, 'choose exactly one scope: --all or --sets');
  assert.ok(rows.length > 0, 'generation scope is empty');
  assert.equal(value('--approve-manifest'), manifestHash, `pass --approve-manifest ${manifestHash}`);
  assert.equal(casting.approval, 'approved_by_owner', 'voice casting still needs explicit owner approval');
  const approvedSets = new Set(casting.approval_scope.approved_sets ?? []);
  for (const row of rows) {
    assert.ok(approvedSets.has(Number(row.setId.replace('set-', ''))), `${row.setId} does not have explicit owner approval`);
  }
  if (pilotAcceptance.status !== 'accepted_by_owner') {
    assert.deepEqual(selectedSetNumbers, [4], 'only the Set 4 pilot may be generated before owner acceptance');
  }
  if (fullBatch) {
    assert.equal(value('--approve-full-batch'), '20', 'full generation also requires --approve-full-batch 20');
    assert.equal(pilotAcceptance.status, 'accepted_by_owner', 'full generation requires an owner-accepted Set 4 pilot');
    assert.ok(pilotAcceptance.audio_sha256, 'accepted pilot must record its audio SHA-256');
    assert.ok(pilotAcceptance.qa_report_sha256, 'accepted pilot must record its QA report SHA-256');
    assert.ok(pilotAcceptance.transcript_qa_report_sha256, 'accepted pilot must record its transcript QA report SHA-256');
  }
  const cap = Number(value('--max-usd'));
  assert.ok(Number.isFinite(cap) && cap > 0, 'pass a positive owner-approved --max-usd ceiling');
  const reserve = Number(value('--min-remaining-credits'));
  assert.ok(Number.isFinite(reserve) && reserve >= 0, 'pass --min-remaining-credits');
  assert.ok(
    cap <= Number(casting.approval_scope.approved_max_usd_before_tax),
    `requested USD ceiling ${cap} exceeds owner-approved ${casting.approval_scope.approved_max_usd_before_tax}`,
  );
  assert.ok(
    reserve >= Number(casting.approval_scope.minimum_remaining_credits),
    `requested reserve ${reserve} is below owner-approved ${casting.approval_scope.minimum_remaining_credits}`,
  );
  assert.ok(value('--seed-salt'), 'pass a non-empty --seed-salt for reproducible synthesis');
  const bill = invoice(rows, scopeLabel());
  assert.ok(bill.estimatedUsdBeforeTax <= cap, `estimated USD ${bill.estimatedUsdBeforeTax} exceeds approved ceiling ${cap}`);
  assert.equal(
    plan.timingFidelityGate?.status,
    'passed',
    'paid generation is blocked until every Listening script passes the official-sample timing-density gate',
  );
  const ffmpeg = spawnSync('ffmpeg', ['-version'], { encoding: 'utf8' });
  assert.equal(ffmpeg.status, 0, 'ffmpeg is required for assembly');
  if (has('--reuse-only')) {
    return { apiKey: null, bill, cap, reserve, availableCredits: null, allowPartialAtReserve: true, reuseOnly: true };
  }
  const apiKey = process.env.ELEVENLABS_API_KEY;
  assert.ok(apiKey, 'ELEVENLABS_API_KEY is required for generation and is never read from a committed file');
  const subscription = await apiJson('/v1/user/subscription', apiKey);
  const availableCredits = Number(subscription.character_limit) - Number(subscription.character_count);
  const allowPartialAtReserve = has('--allow-partial-at-reserve');
  if (!allowPartialAtReserve) {
    assert.ok(bill.estimatedCredits + reserve <= availableCredits, `estimated ${bill.estimatedCredits} credits plus ${reserve} reserve exceeds ${availableCredits} available`);
  }
  for (const profile of new Set(rows.flatMap(row => row.segments.map(segment => segment.profile)))) {
    const voice = voiceFor(profile);
    await apiJson(`/v1/voices/${voice.voice_id}`, apiKey);
  }
  return { apiKey, bill, cap, reserve, availableCredits, allowPartialAtReserve };
}

async function synthesize({ apiKey, row, segment, segmentIndex }) {
  const voice = voiceFor(segment.profile);
  const adjacent = (index) => row.segments[index]?.part === segment.part ? row.segments[index].text : undefined;
  const query = new URLSearchParams({ output_format: casting.target.intermediate_output_format, enable_logging: 'false' });
  const response = await fetch(`${API}/v1/text-to-speech/${voice.voice_id}?${query}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'xi-api-key': apiKey },
    body: JSON.stringify({
      text: segment.text,
      model_id: casting.model_id,
      voice_settings: casting.voice_settings,
      seed: seedFor(row.mediaId, segmentIndex),
      ...(adjacent(segmentIndex - 1) ? { previous_text: adjacent(segmentIndex - 1) } : {}),
      ...(adjacent(segmentIndex + 1) ? { next_text: adjacent(segmentIndex + 1) } : {}),
    }),
  });
  if (!response.ok) throw new Error(`${row.mediaId} segment ${segmentIndex + 1} failed with HTTP ${response.status}: ${await response.text()}`);
  return Buffer.from(await response.arrayBuffer());
}

function assemble(row, segmentPaths, targetPath) {
  const inputArgs = [];
  const labels = [];
  let inputIndex = 0;
  segmentPaths.forEach((segmentPath, index) => {
    inputArgs.push('-i', segmentPath);
    labels.push(`[${inputIndex}:a]`);
    inputIndex += 1;
    const partTransition = row.segments[index + 1]
      && row.segments[index + 1].part !== row.segments[index].part
      ? Number(casting.target.silence_between_parts_seconds ?? 0)
      : 0;
    const seconds = Number(row.segments[index].pauseAfterSeconds ?? 0) + partTransition;
    if (seconds > 0) {
      inputArgs.push('-f', 'lavfi', '-t', String(seconds), '-i', 'anullsrc=r=44100:cl=mono');
      labels.push(`[${inputIndex}:a]`);
      inputIndex += 1;
    }
  });
  const wavPath = `${targetPath}.assembly.wav`;
  const normalizedPath = `${targetPath}.normalized.mp3`;
  const joined = spawnSync('ffmpeg', [
    '-y', '-hide_banner', '-loglevel', 'error', ...inputArgs,
    '-filter_complex', `${labels.join('')}concat=n=${labels.length}:v=0:a=1[out]`,
    '-map', '[out]', '-vn', '-ar', String(casting.target.final_sample_rate_hz),
    '-ac', String(casting.target.final_channels), '-c:a', 'pcm_s16le', wavPath,
  ], { encoding: 'utf8' });
  if (joined.status !== 0) throw new Error(`assembly failed for ${row.mediaId}: ${joined.stderr}`);
  try {
    assertAudioTiming(wavPath, `${row.mediaId} pre-master assembly`);
    const targetI = casting.target.integrated_loudness_lufs;
    const targetTp = casting.target.normalization_true_peak_dbfs ?? casting.target.max_true_peak_dbfs;
    const analysis = spawnSync('ffmpeg', [
      '-hide_banner', '-nostats', '-i', wavPath,
      '-af', `loudnorm=I=${targetI}:LRA=7:TP=${targetTp}:print_format=json`, '-f', 'null', '-',
    ], { encoding: 'utf8' });
    if (analysis.status !== 0) throw new Error(`loudness analysis failed for ${row.mediaId}: ${analysis.stderr}`);
    const measurements = [...analysis.stderr.matchAll(/\{\s*"input_i"[\s\S]*?\}/g)].at(-1)?.[0];
    assert.ok(measurements, `loudness analysis returned no measurements for ${row.mediaId}`);
    const measured = JSON.parse(measurements);
    const filter = [
      `loudnorm=I=${targetI}`, 'LRA=7', `TP=${targetTp}`,
      `measured_I=${measured.input_i}`, `measured_LRA=${measured.input_lra}`,
      `measured_TP=${measured.input_tp}`, `measured_thresh=${measured.input_thresh}`,
      `offset=${measured.target_offset}`, 'linear=true', 'print_format=summary',
    ].join(':');
    const normalized = spawnSync('ffmpeg', [
      '-y', '-hide_banner', '-loglevel', 'error', '-i', wavPath, '-af', filter,
      '-vn', '-ar', String(casting.target.final_sample_rate_hz), '-ac', String(casting.target.final_channels),
      '-b:a', casting.target.final_bitrate, normalizedPath,
    ], { encoding: 'utf8' });
    if (normalized.status !== 0) throw new Error(`normalization failed for ${row.mediaId}: ${normalized.stderr}`);
    renameSync(normalizedPath, targetPath);
  } finally {
    if (existsSync(wavPath)) unlinkSync(wavPath);
    if (existsSync(normalizedPath)) unlinkSync(normalizedPath);
  }
}

async function reassemble(rows) {
  assert.equal(Number(fullBatch) + Number(selectedSetNumbers.length > 0), 1, 'choose exactly one scope: --all or --sets');
  assert.ok(rows.length > 0, 'reassembly scope is empty');
  const hydratedRows = await Promise.all(rows.map(hydrateRow));
  const root = outputDirectory(scopeLabel());
  const logPath = path.join(root, 'generation-log.json');
  assert.ok(existsSync(logPath), `missing generation log: ${logPath}`);
  const log = JSON.parse(readFileSync(logPath, 'utf8'));
  assert.equal(log.manifestSha256, manifestHash, 'reassembly log belongs to a stale manifest');
  for (const row of hydratedRows) {
    const entry = log.files.find(file => file.mediaId === row.mediaId);
    assert.ok(entry, `generation log has no completed file for ${row.mediaId}`);
    const segmentsDir = path.join(root, row.setId, '.segments');
    const segmentPaths = row.segments.map((_, segmentIndex) => (
      path.join(segmentsDir, `segment-${String(segmentIndex + 1).padStart(3, '0')}.mp3`)
    ));
    for (const segmentPath of segmentPaths) assert.ok(isReusableSegment(segmentPath), `missing reusable segment ${segmentPath}`);
    assemble(row, segmentPaths, entry.path);
    Object.assign(entry, reuseAccounting(row, segmentPaths));
    entry.audioSha256 = sha256(readFileSync(entry.path));
  }
  log.updatedAt = new Date().toISOString();
  log.reassembledAt = log.updatedAt;
  log.status = 'complete_pending_qa';
  writeFileSync(logPath, `${JSON.stringify(log, null, 2)}\n`);
  console.log(JSON.stringify({ outputDirectory: root, files: hydratedRows.length, reassembledWithoutSynthesis: true }, null, 2));
}

function isReusableSegment(segmentPath) {
  if (!existsSync(segmentPath)) return false;
  const probe = spawnSync('ffprobe', [
    '-v', 'error', '-show_entries', 'stream=codec_type', '-of', 'default=nw=1:nk=1', segmentPath,
  ], { encoding: 'utf8' });
  return probe.status === 0 && probe.stdout.trim().split(/\s+/).includes('audio');
}

function approvedPilotReusePath(row, segment) {
  const sourceDir = value('--reuse-approved-pilot-segments');
  if (!sourceDir || row.setId === acceptedPilotRow.setId) return null;
  assert.equal(pilotAcceptance.status, 'accepted_by_owner', 'pilot segments require owner acceptance');
  const textSha256 = sha256(segment.text);
  const sourceIndex = acceptedPilotRow.segments.findIndex(candidate => (
    candidate.profile === segment.profile && candidate.textSha256 === textSha256
  ));
  if (sourceIndex < 0) return null;
  const sourcePath = path.join(path.resolve(sourceDir), `segment-${String(sourceIndex + 1).padStart(3, '0')}.mp3`);
  assert.ok(isReusableSegment(sourcePath), `approved pilot reuse segment is missing or invalid: ${sourcePath}`);
  return sourcePath;
}

function priorSourceCacheReusePath(row, segment) {
  if (!sourceCachePlan) return null;
  const sourceRow = sourceCachePlan.rows.find(candidate => candidate.setId === row.setId);
  if (!sourceRow) return null;
  const textSha256 = sha256(segment.text);
  const sourceIndex = sourceRow.segments.findIndex(candidate => (
    candidate.profile === segment.profile && candidate.textSha256 === textSha256
  ));
  if (sourceIndex < 0) return null;
  const sourcePath = path.join(
    path.resolve(sourceCacheSegmentsDir),
    `segment-${String(sourceIndex + 1).padStart(3, '0')}.mp3`,
  );
  return isReusableSegment(sourcePath) ? sourcePath : null;
}

function sameAudioBytes(leftPath, rightPath) {
  return Boolean(leftPath && rightPath)
    && isReusableSegment(leftPath)
    && isReusableSegment(rightPath)
    && sha256(readFileSync(leftPath)) === sha256(readFileSync(rightPath));
}

function reuseAccounting(row, segmentPaths) {
  let reusedPilotCharacters = 0;
  let reusedPilotSegments = 0;
  let reusedCacheCharacters = 0;
  let reusedCacheSegments = 0;
  for (const [segmentIndex, segment] of row.segments.entries()) {
    const segmentPath = segmentPaths[segmentIndex];
    const approvedPilotPath = approvedPilotReusePath(row, segment);
    if (sameAudioBytes(segmentPath, approvedPilotPath)) {
      reusedPilotCharacters += segment.text.length;
      reusedPilotSegments += 1;
      continue;
    }
    const sourceCachePath = priorSourceCacheReusePath(row, segment);
    if (sameAudioBytes(segmentPath, sourceCachePath)) {
      reusedCacheCharacters += segment.text.length;
      reusedCacheSegments += 1;
    }
  }
  return {
    reusedCharacters: reusedPilotCharacters + reusedCacheCharacters,
    reusedSegments: reusedPilotSegments + reusedCacheSegments,
    reusedPilotCharacters,
    reusedPilotSegments,
    reusedCacheCharacters,
    reusedCacheSegments,
    // Prior-cache speech was already charged by ElevenLabs. Only byte-identical,
    // owner-accepted pilot announcements reduce the lifetime provider invoice.
    billableCharacters: row.sourceCharacters - reusedPilotCharacters,
  };
}

async function generate(rows) {
  const hydratedRows = await Promise.all(rows.map(hydrateRow));
  const root = outputDirectory(scopeLabel());
  mkdirSync(root, { recursive: true });
  const logPath = path.join(root, 'generation-log.json');
  const previous = existsSync(logPath) ? JSON.parse(readFileSync(logPath, 'utf8')) : null;
  if (previous) assert.equal(previous.manifestSha256, manifestHash, 'resume log belongs to a stale manifest');
  const files = previous?.files ?? [];
  const completed = new Set(files.map(file => file.mediaId));
  for (const file of files) assert.ok(existsSync(file.path), `resume log references missing file ${file.path}`);
  const pending = hydratedRows.filter(row => !completed.has(row.mediaId));
  if (!pending.length) return console.log(JSON.stringify({ outputDirectory: root, files: files.length, resumed: true, qaStatus: 'pending' }, null, 2));
  const gate = await ensureGenerationGate(pending);
  let conservativeAvailableCredits = gate.availableCredits;
  const writeLog = status => writeFileSync(logPath, `${JSON.stringify({
    generatedAt: previous?.generatedAt ?? new Date().toISOString(), updatedAt: new Date().toISOString(),
    status, scope: scopeLabel(), manifestSha256: manifestHash, modelId: casting.model_id,
    approvedMaxUsd: gate.cap, protectedCreditReserve: gate.reserve,
    availableCreditsAtResume: gate.availableCredits, estimatedPendingCreditsAtResume: gate.bill.estimatedCredits,
    files,
  }, null, 2)}\n`);
  writeLog('in_progress');
  for (const [rowIndex, row] of pending.entries()) {
    const setDir = path.join(root, row.setId);
    const segmentsDir = path.join(setDir, '.segments');
    mkdirSync(segmentsDir, { recursive: true });
    const targetPath = path.join(setDir, path.basename(row.plannedUrl));
    assert.ok(!existsSync(targetPath), `refusing to overwrite ${targetPath}`);
    const segmentPaths = row.segments.map((_, segmentIndex) => (
      path.join(segmentsDir, `segment-${String(segmentIndex + 1).padStart(3, '0')}.mp3`)
    ));
    for (const [segmentIndex, segment] of row.segments.entries()) {
      const segmentPath = segmentPaths[segmentIndex];
      if (isReusableSegment(segmentPath)) continue;
      const approvedPilotPath = approvedPilotReusePath(row, segment);
      const sourceCachePath = approvedPilotPath ? null : priorSourceCacheReusePath(row, segment);
      const reusePath = approvedPilotPath ?? sourceCachePath;
      if (reusePath) {
        copyFileSync(reusePath, segmentPath);
      }
    }
    const missing = row.segments
      .map((segment, segmentIndex) => ({ segment, segmentIndex, segmentPath: segmentPaths[segmentIndex] }))
      .filter(item => !isReusableSegment(item.segmentPath))
      .sort((left, right) => right.segment.text.length - left.segment.text.length);
    for (const { segment, segmentIndex, segmentPath } of missing) {
      if (gate.reuseOnly) {
        writeLog('partial_waiting_for_credits');
        console.log(JSON.stringify({
          outputDirectory: root,
          status: 'partial_reuse_materialized_no_provider_call',
          setId: row.setId,
          completedSegments: segmentPaths.filter(isReusableSegment).length,
          totalSegments: row.segments.length,
          protectedCreditReserve: gate.reserve,
        }, null, 2));
        return;
      }
      if (gate.allowPartialAtReserve) {
        let providerAvailableCredits = conservativeAvailableCredits;
        if (gate.reserve > 0) {
          const subscription = await apiJson('/v1/user/subscription', gate.apiKey);
          providerAvailableCredits = Number(subscription.character_limit) - Number(subscription.character_count);
        }
        const availableCredits = Math.min(providerAvailableCredits, conservativeAvailableCredits);
        const conservativeNextCost = Math.ceil(segment.text.length * Number(casting.credits_per_character));
        if (availableCredits - conservativeNextCost < gate.reserve) {
          writeLog('partial_waiting_for_credits');
          console.log(JSON.stringify({
            outputDirectory: root,
            status: 'partial_waiting_for_credits',
            setId: row.setId,
            completedSegments: segmentPaths.filter(isReusableSegment).length,
            totalSegments: row.segments.length,
            providerAvailableCredits,
            conservativeAvailableCredits,
            protectedCreditReserve: gate.reserve,
            nextSegmentConservativeCost: conservativeNextCost,
          }, null, 2));
          return;
        }
      }
      writeFileSync(segmentPath, await synthesize({ apiKey: gate.apiKey, row, segment, segmentIndex }));
      conservativeAvailableCredits -= Math.ceil(segment.text.length * Number(casting.credits_per_character));
    }
    for (const segmentPath of segmentPaths) assert.ok(isReusableSegment(segmentPath), `missing generated segment ${segmentPath}`);
    assemble(row, segmentPaths, targetPath);
    const accounting = reuseAccounting(row, segmentPaths);
    files.push({
      mediaId: row.mediaId, setId: row.setId, path: targetPath,
      plannedUrl: row.plannedUrl, sourceCharacters: row.sourceCharacters,
      ...accounting,
      audioSha256: sha256(readFileSync(targetPath)),
    });
    writeLog('in_progress');
    console.log(`[${rowIndex + 1}/${pending.length}] ${row.mediaId}`);
  }
  writeLog('complete_pending_qa');
  console.log(JSON.stringify({ outputDirectory: root, files: files.length, qaStatus: 'pending_no_public_release' }, null, 2));
}

if (accountStatus) {
  await showAccount();
} else if (doGenerate) {
  await generate(selectedRows);
} else if (repairAssembly) {
  await reassemble(selectedRows);
} else {
  if (has('--verify-source')) await Promise.all(plan.rows.map(hydrateRow));
  console.log(JSON.stringify({
    pilot: invoice(plan.rows.filter(row => row.setId === 'set-4'), 'pilot-set-4'),
    postPilotRemainder: invoice(plan.rows.filter(row => row.setId !== 'set-4'), 'sets-1-3-and-5-20-after-pilot'),
    remainingGeneration: invoice(plan.rows.filter(row => !['set-4', 'set-5'].includes(row.setId)), 'sets-1-3-and-6-20-after-preserved-synthesis'),
    full: invoice(plan.rows, 'full-sets-1-20'),
    ...(selectedRows.length ? { selected: invoice(selectedRows, scopeLabel()) } : {}),
    castingApproval: casting.approval,
    pilotAcceptance: pilotAcceptance.status,
    sourceVerified: has('--verify-source'),
    note: 'Dry run only. No API call, secret read, file generation, or audio write occurred.',
  }, null, 2));
}
