#!/usr/bin/env node

import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { withIeltsListeningProductionTranscript } from '../src/data/mocks/ielts-listening-production.ts';
import { buildInvoice, plannedSegments, reviewPaddingPlan, sha256, ttsText } from './lib/ielts-audio-production.mjs';
import { mediaBinary } from './lib/ielts-audio-timing.mjs';
import { elevenLabsApiKey } from './lib/elevenlabs-api-key.mjs';

const API = 'https://api.elevenlabs.io';
const root = fileURLToPath(new URL('../', import.meta.url));
const manifest = JSON.parse(readFileSync(path.join(root, 'config/ielts-audio/production-manifest.json'), 'utf8'));
const policy = JSON.parse(readFileSync(path.join(root, 'config/ielts-audio/production-policy.json'), 'utf8'));
const castingBytes = readFileSync(path.join(root, 'config/ielts-audio/voice-casting.json'));
const casting = JSON.parse(castingBytes);
const castingSha256 = sha256(castingBytes);
assert.equal(casting.manifest_sha256, manifest.manifestSha256, 'Casting belongs to a stale manifest');

const args = process.argv.slice(2);
const has = flag => args.includes(flag);
const value = flag => has(flag) ? args[args.indexOf(flag) + 1] : null;

function parseSets(selection) {
  if (!selection) return [];
  const result = new Set();
  for (const token of selection.split(',')) {
    const match = token.trim().match(/^(\d+)(?:-(\d+))?$/u);
    assert.ok(match, `Invalid set selection: ${token}`);
    const start = Number(match[1]);
    const end = Number(match[2] ?? match[1]);
    assert.ok(start >= 1 && end <= 20 && start <= end, `Set selection outside 1-20: ${token}`);
    for (let set = start; set <= end; set += 1) result.add(set);
  }
  return [...result].sort((a, b) => a - b);
}

const selectedSets = parseSets(value('--sets'));
const productionRows = manifest.rows.filter(row => ['REPLACE_CONFIRMED_MISMATCH', 'CREATE_MISSING'].includes(row.action));
const selectedRows = selectedSets.length ? productionRows.filter(row => selectedSets.includes(row.set)) : [];

function profileVoice(profile) {
  const split = profile.lastIndexOf(':');
  const role = profile.slice(0, split);
  const accent = profile.slice(split + 1);
  const voiceRole = casting.role_voice[role];
  const voice = casting.voices[accent]?.[voiceRole];
  assert.ok(voice?.voice_id, `Missing voice for ${profile}`);
  assert.equal(voice.credit_multiplier, 1, `${profile} must use a 1x voice`);
  return voice;
}

async function apiJson(endpoint, apiKey) {
  const response = await fetch(`${API}${endpoint}`, { headers: { 'xi-api-key': apiKey } });
  if (!response.ok) throw Error(`${endpoint} failed with HTTP ${response.status}: ${(await response.text()).slice(0, 500)}`);
  return response.json();
}

async function accountSnapshot(apiKey) {
  const subscription = await apiJson('/v1/user/subscription', apiKey);
  return {
    capturedAt: new Date().toISOString(),
    tier: subscription.tier,
    usedCredits: Number(subscription.character_count),
    creditLimit: Number(subscription.character_limit),
    availableCredits: Number(subscription.character_limit) - Number(subscription.character_count),
    nextResetUnix: subscription.next_character_count_reset_unix,
  };
}

async function showReadOnlyData() {
  const apiKey = elevenLabsApiKey(root);
  if (has('--account')) console.log(JSON.stringify(await accountSnapshot(apiKey), null, 2));
  if (has('--list-voices')) {
    const payload = await apiJson('/v2/voices?page_size=100', apiKey);
    console.log(JSON.stringify({ voices: (payload.voices ?? []).map(voice => ({
      voiceId: voice.voice_id,
      name: voice.name,
      category: voice.category,
      labels: voice.labels,
      sharingRate: voice.sharing?.rate ?? null,
    })) }, null, 2));
  }
}

async function hydrate(row) {
  const authored = (await import(`../src/data/mocks/ielts-set-${row.set}.ts`)).default;
  const mock = withIeltsListeningProductionTranscript(authored);
  const sections = mock.sections.filter(section => section.skill === 'listening').sort((a, b) => a.part - b.part);
  const segments = sections.flatMap(section => plannedSegments(section, row.accentTarget, row.set, policy)).map(segment => ({
    ...segment,
    characters: segment.text.length,
    billableCharacters: ttsText(segment.text).length,
  }));
  assert.deepEqual(segments.map(segment => ({
    kind: segment.kind,
    part: segment.part,
    profile: segment.profile,
    characters: segment.text.length,
    billableCharacters: ttsText(segment.text).length,
    words: segment.text.trim().split(/\s+/u).filter(Boolean).length,
    textSha256: sha256(segment.text),
    pauseAfterSeconds: segment.pauseAfterSeconds,
  })), row.segments, `Set ${row.set} source changed after manifest freeze`);
  return { ...row, segments };
}

function generationRoot(scope) {
  const destination = value('--output-dir')
    ? path.resolve(value('--output-dir'))
    : path.join(root, 'output', 'ielts-audio', manifest.manifestSha256, scope);
  const publicRoot = path.join(root, 'public', 'audio', 'ielts');
  const relative = path.relative(publicRoot, destination);
  assert.ok(relative.startsWith('..') || path.isAbsolute(relative), 'Generation must stay outside public/audio/ielts');
  return destination;
}

function commandAvailable(command) {
  return spawnSync(mediaBinary(command), ['-version'], { encoding: 'utf8' }).status === 0;
}

async function generationGate(rows) {
  assert.ok(rows.length, '--generate requires a non-empty --sets scope');
  assert.equal(value('--approve-manifest'), manifest.manifestSha256, `Pass --approve-manifest ${manifest.manifestSha256}`);
  for (const row of rows) {
    assert.equal(row.scriptAudit.status, 'PASS', `Set ${row.set} script gate failed`);
    assert.ok(casting.approval_scope.approved_sets.includes(row.set), `Set ${row.set} is outside the authorized scope`);
  }
  assert.ok(value('--seed-salt'), '--seed-salt is required for reproducible synthesis');
  const invoice = buildInvoice(rows, policy, casting.model_id);
  const cap = Number(value('--max-usd'));
  assert.ok(Number.isFinite(cap) && cap > 0, '--max-usd must be positive');
  assert.ok(cap <= Number(casting.approval_scope.approved_max_usd_before_tax), 'Requested USD cap exceeds authorized ceiling');
  if (!has('--reassemble')) assert.ok(invoice.estimatedUsdBeforeTax <= cap, `Invoice USD ${invoice.estimatedUsdBeforeTax} exceeds cap ${cap}`);
  const reserve = Number(value('--min-remaining-credits'));
  assert.ok(Number.isFinite(reserve) && reserve >= Number(casting.approval_scope.minimum_remaining_credits), 'Credit reserve is below policy');
  assert.ok(commandAvailable('ffmpeg') && commandAvailable('ffprobe'), 'ffmpeg and ffprobe are required before any provider call');
  const apiKey = elevenLabsApiKey(root);
  const account = await accountSnapshot(apiKey);
  const requiredCredits = has('--reassemble') ? reserve : invoice.estimatedCredits + reserve;
  assert.ok(requiredCredits <= account.availableCredits, `Need ${requiredCredits} credits including reserve; only ${account.availableCredits} available`);
  const voices = await apiJson('/v2/voices?page_size=100', apiKey);
  const available = new Map((voices.voices ?? []).map(voice => [voice.voice_id, voice]));
  for (const profile of new Set(rows.flatMap(row => row.profiles))) {
    const configured = profileVoice(profile);
    assert.ok(available.has(configured.voice_id), `Voice ${configured.voice_name} is unavailable for ${profile}`);
    assert.ok((available.get(configured.voice_id).sharing?.rate ?? 1) <= 1, `Voice ${configured.voice_name} has a cost multiplier above 1x`);
  }
  return { apiKey, invoice, cap, reserve, account };
}

function stableSeed(mediaId, segmentIndex) {
  return Number.parseInt(sha256(`${mediaId}:${segmentIndex}:${value('--seed-salt')}`).slice(0, 8), 16);
}

async function synthesize({ apiKey, row, segment, segmentIndex }) {
  const voice = profileVoice(segment.profile);
  const previous = row.segments[segmentIndex - 1]?.part === segment.part ? ttsText(row.segments[segmentIndex - 1].text) : undefined;
  const next = row.segments[segmentIndex + 1]?.part === segment.part ? ttsText(row.segments[segmentIndex + 1].text) : undefined;
  const response = await fetch(`${API}/v1/text-to-speech/${voice.voice_id}?output_format=${casting.target.intermediate_output_format}&enable_logging=false`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'xi-api-key': apiKey },
    body: JSON.stringify({
      text: ttsText(segment.text),
      model_id: casting.model_id,
      voice_settings: casting.voice_settings,
      seed: stableSeed(row.mediaId, segmentIndex),
      ...(previous ? { previous_text: previous } : {}),
      ...(next ? { next_text: next } : {}),
    }),
  });
  if (!response.ok) throw Error(`Set ${row.set} segment ${segmentIndex + 1} failed with HTTP ${response.status}: ${(await response.text()).slice(0, 500)}`);
  return Buffer.from(await response.arrayBuffer());
}

function prepareSegment(source, target) {
  const transitionFadeSeconds = Number(casting.target.transition_declick_fade_ms) / 1000;
  assert.ok(Number.isFinite(transitionFadeSeconds) && transitionFadeSeconds > 0 && transitionFadeSeconds <= 0.02, 'Transition de-click fade must be between 1 and 20 ms');
  const filter = [
    'silenceremove=start_periods=1:start_silence=0.03:start_threshold=-45dB',
    'areverse',
    'silenceremove=start_periods=1:start_silence=0.03:start_threshold=-45dB',
    'areverse',
    `loudnorm=I=${casting.target.integrated_loudness_lufs}:TP=${casting.target.normalization_true_peak_dbfs}:LRA=7`,
    `afade=t=in:ss=0:d=${transitionFadeSeconds}`,
    'areverse',
    `afade=t=in:ss=0:d=${transitionFadeSeconds}`,
    'areverse',
  ].join(',');
  const result = spawnSync(mediaBinary('ffmpeg'), ['-y', '-hide_banner', '-loglevel', 'error', '-i', source, '-af', filter,
    '-ar', String(casting.target.final_sample_rate_hz), '-ac', String(casting.target.final_channels), '-c:a', 'pcm_s16le', target], { encoding: 'utf8' });
  assert.equal(result.status, 0, `Segment preparation failed: ${result.stderr}`);
}

function assertCleanPcmEdges(file) {
  const bytes = readFileSync(file);
  const marker = bytes.indexOf(Buffer.from('data'));
  assert.ok(marker >= 0 && marker + 8 < bytes.length, `Prepared WAV has no PCM data chunk: ${file}`);
  const dataBytes = bytes.readUInt32LE(marker + 4);
  const start = marker + 8;
  const end = Math.min(start + dataBytes, bytes.length) - 2;
  assert.ok(end >= start, `Prepared WAV has no PCM samples: ${file}`);
  const first = Math.abs(bytes.readInt16LE(start));
  const last = Math.abs(bytes.readInt16LE(end));
  assert.ok(first <= 32 && last <= 32, `Prepared WAV edge is not de-clicked: ${file} (${first}/${last})`);
}

function silenceFile(directory, seconds) {
  const roundedSeconds = Number(seconds.toFixed(3));
  const file = path.join(directory, `silence-${roundedSeconds.toFixed(3).replace('.', '_')}.wav`);
  if (existsSync(file)) return file;
  const result = spawnSync(mediaBinary('ffmpeg'), ['-y', '-hide_banner', '-loglevel', 'error', '-f', 'lavfi', '-t', String(roundedSeconds),
    '-i', 'anullsrc=r=44100:cl=mono', '-c:a', 'pcm_s16le', file], { encoding: 'utf8' });
  assert.equal(result.status, 0, `Silence generation failed: ${result.stderr}`);
  return file;
}

function durationSeconds(file) {
  const probe = spawnSync(mediaBinary('ffprobe'), ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', file], { encoding: 'utf8' });
  assert.equal(probe.status, 0, `Duration probe failed for ${file}: ${probe.stderr}`);
  const duration = Number(probe.stdout.trim());
  assert.ok(Number.isFinite(duration) && duration > 0, `Invalid duration for ${file}`);
  return duration;
}

function assemble(row, segmentPaths, target, workDirectory) {
  mkdirSync(workDirectory, { recursive: true });
  const prepared = segmentPaths.map((source, index) => {
    const file = path.join(workDirectory, `prepared-${String(index + 1).padStart(3, '0')}.wav`);
    if (has('--reassemble') || !existsSync(file)) prepareSegment(source, file);
    assertCleanPcmEdges(file);
    return file;
  });
  const reviewSlots = row.segments.filter(segment => segment.kind === 'announcer' && segment.pauseAfterSeconds > 0).length;
  const plannedSilenceSeconds = row.segments.reduce((total, segment, index) => {
    const next = row.segments[index + 1];
    return total + segment.pauseAfterSeconds + (next && next.part !== segment.part ? casting.target.silence_between_parts_seconds : 0);
  }, 0);
  const baseDurationSeconds = prepared.reduce((total, file) => total + durationSeconds(file), plannedSilenceSeconds);
  const padding = reviewPaddingPlan(baseDurationSeconds, casting.target.minimum_duration_seconds, casting.target.maximum_duration_seconds, reviewSlots);
  const list = [];
  prepared.forEach((file, index) => {
    list.push(`file '${file.replaceAll("'", "'\\''")}'`);
    const segment = row.segments[index];
    const reviewPadding = segment.kind === 'announcer' && segment.pauseAfterSeconds > 0 ? padding.paddingPerSlotSeconds : 0;
    const pauseAfterSeconds = segment.pauseAfterSeconds + reviewPadding;
    if (pauseAfterSeconds > 0) list.push(`file '${silenceFile(workDirectory, pauseAfterSeconds)}'`);
    const next = row.segments[index + 1];
    if (next && next.part !== segment.part) list.push(`file '${silenceFile(workDirectory, casting.target.silence_between_parts_seconds)}'`);
  });
  const listPath = path.join(workDirectory, 'concat.txt');
  writeFileSync(listPath, `${list.join('\n')}\n`);
  const wav = `${target}.assembly.wav`;
  const joined = spawnSync(mediaBinary('ffmpeg'), ['-y', '-hide_banner', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', listPath,
    '-c:a', 'pcm_s16le', '-ar', String(casting.target.final_sample_rate_hz), '-ac', String(casting.target.final_channels), wav], { encoding: 'utf8' });
  assert.equal(joined.status, 0, `Assembly failed: ${joined.stderr}`);
  const analysis = spawnSync(mediaBinary('ffmpeg'), ['-hide_banner', '-nostats', '-i', wav,
    '-af', `loudnorm=I=${casting.target.integrated_loudness_lufs}:LRA=7:TP=${casting.target.normalization_true_peak_dbfs}:print_format=json`, '-f', 'null', '-'], { encoding: 'utf8' });
  assert.equal(analysis.status, 0, `Loudness analysis failed: ${analysis.stderr}`);
  const json = [...analysis.stderr.matchAll(/\{\s*"input_i"[\s\S]*?\}/gu)].at(-1)?.[0];
  assert.ok(json, 'Loudness analysis returned no measurements');
  const measured = JSON.parse(json);
  const filter = [`loudnorm=I=${casting.target.integrated_loudness_lufs}`, 'LRA=7', `TP=${casting.target.normalization_true_peak_dbfs}`,
    `measured_I=${measured.input_i}`, `measured_LRA=${measured.input_lra}`, `measured_TP=${measured.input_tp}`,
    `measured_thresh=${measured.input_thresh}`, `offset=${measured.target_offset}`, 'linear=true'].join(':');
  const encoded = spawnSync(mediaBinary('ffmpeg'), ['-y', '-hide_banner', '-loglevel', 'error', '-i', wav, '-af', `${filter},alimiter=limit=0.63:attack=5:release=50:level=false:latency=1`,
    '-ar', String(casting.target.final_sample_rate_hz), '-ac', String(casting.target.final_channels), '-b:a', casting.target.final_bitrate, target], { encoding: 'utf8' });
  if (existsSync(wav)) unlinkSync(wav);
  assert.equal(encoded.status, 0, `Final encoding failed: ${encoded.stderr}`);
  return {
    baseDurationSeconds: Number(baseDurationSeconds.toFixed(3)),
    targetDurationSeconds: Number(padding.targetDurationSeconds.toFixed(3)),
    distributedReviewPaddingSeconds: Number(padding.totalPaddingSeconds.toFixed(3)),
    reviewPauseSlots: padding.slots,
    addedSecondsPerReviewPause: Number(padding.paddingPerSlotSeconds.toFixed(3)),
  };
}

async function generate(rows) {
  const hydrated = [];
  for (const row of rows) hydrated.push(await hydrate(row));
  const gate = await generationGate(hydrated);
  const scope = `sets-${rows.map(row => row.set).join('-')}`;
  const output = generationRoot(scope);
  const cache = path.join(output, '.cache');
  mkdirSync(cache, { recursive: true });
  const logPath = path.join(output, 'generation-log.json');
  const previous = existsSync(logPath) ? JSON.parse(readFileSync(logPath, 'utf8')) : null;
  if (previous) assert.equal(previous.manifestSha256, manifest.manifestSha256, 'Resume log belongs to a stale manifest');
  let files = previous?.files ?? [];
  const complete = new Set(files.map(file => file.set));
  let conservativeAvailableCredits = gate.account.availableCredits;
  const writeLog = status => writeFileSync(logPath, `${JSON.stringify({
    schemaVersion: 1, status, updatedAt: new Date().toISOString(), manifestSha256: manifest.manifestSha256,
    modelId: casting.model_id, castingSha256, approvedMaxUsd: gate.cap, protectedCreditReserve: gate.reserve,
    accountAtStart: gate.account, invoiceAtStart: gate.invoice, files,
  }, null, 2)}\n`);
  writeLog('in_progress');
  for (const row of hydrated.filter(candidate => has('--reassemble') || !complete.has(candidate.set))) {
    const setDirectory = path.join(output, row.setId);
    const segmentDirectory = path.join(setDirectory, '.segments');
    mkdirSync(segmentDirectory, { recursive: true });
    const segmentPaths = [];
    for (const [index, segment] of row.segments.entries()) {
      const voice = profileVoice(segment.profile);
      const requestCore = { modelId: casting.model_id, voiceId: voice.voice_id, text: ttsText(segment.text), settings: casting.voice_settings,
        seed: stableSeed(row.mediaId, index), previous: row.segments[index - 1]?.part === segment.part ? ttsText(row.segments[index - 1].text) : null,
        next: row.segments[index + 1]?.part === segment.part ? ttsText(row.segments[index + 1].text) : null };
      const cachePath = path.join(cache, `${createHash('sha256').update(JSON.stringify(requestCore)).digest('hex')}.mp3`);
      const setSegment = path.join(segmentDirectory, `segment-${String(index + 1).padStart(3, '0')}.mp3`);
      if (!existsSync(cachePath)) {
        if (has('--reassemble')) {
          assert.ok(existsSync(setSegment), `Reassembly source miss for Set ${row.set} segment ${index + 1}; refusing a provider call`);
          writeFileSync(cachePath, readFileSync(setSegment));
        } else {
          const cost = Math.ceil(requestCore.text.length * casting.credits_per_character);
          assert.ok(conservativeAvailableCredits - cost >= gate.reserve, `Reserve reached before Set ${row.set} segment ${index + 1}`);
          writeFileSync(cachePath, await synthesize({ apiKey: gate.apiKey, row, segment, segmentIndex: index }));
          conservativeAvailableCredits -= cost;
        }
      }
      if (!existsSync(setSegment)) writeFileSync(setSegment, readFileSync(cachePath));
      segmentPaths.push(setSegment);
    }
    const target = path.join(setDirectory, path.basename(row.audioUrl));
    if (has('--reassemble') && existsSync(target)) unlinkSync(target);
    assert.ok(!existsSync(target), `Refusing to overwrite staged target ${target}`);
    const assemblyTiming = assemble(row, segmentPaths, target, path.join(setDirectory, '.assembly'));
    const audioSha256 = sha256(readFileSync(target));
    files = files.filter(file => file.set !== row.set);
    files.push({ set: row.set, setId: row.setId, mediaId: row.mediaId, path: target, audioSha256,
      sourceCharacters: row.sourceCharacters, requestSegments: row.requestSegments, assemblyTiming, status: 'GENERATED_STAGING' });
    writeLog('in_progress');
  }
  writeLog('complete_pending_qa');
  console.log(JSON.stringify({ outputDirectory: output, generationLog: logPath, files: files.length, status: 'complete_pending_qa' }, null, 2));
}

if (has('--account') || has('--list-voices')) {
  await showReadOnlyData();
} else if (has('--generate')) {
  await generate(selectedRows);
} else {
  console.log(JSON.stringify({
    manifestSha256: manifest.manifestSha256,
    pilot: buildInvoice(productionRows.filter(row => row.set === policy.generation.pilotSet), policy),
    requiredProduction: manifest.invoice.requiredProduction,
    selected: selectedRows.length ? buildInvoice(selectedRows, policy) : null,
    actions: Object.fromEntries([...new Set(manifest.rows.map(row => row.action))].map(action => [action, manifest.rows.filter(row => row.action === action).map(row => row.set)])),
    note: 'Dry run only. No API call, secret read, audio write, or release occurred.',
  }, null, 2));
}
