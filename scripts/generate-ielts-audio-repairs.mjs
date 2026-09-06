#!/usr/bin/env node

import assert from 'node:assert/strict';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { mediaBinary } from './lib/ielts-audio-timing.mjs';
import { sha256, ttsText } from './lib/ielts-audio-production.mjs';

const API = 'https://api.elevenlabs.io';
const root = fileURLToPath(new URL('../', import.meta.url));
const manifest = JSON.parse(readFileSync(path.join(root, 'config/ielts-audio/repair-manifest.json'), 'utf8'));
const casting = JSON.parse(readFileSync(path.join(root, 'config/ielts-audio/voice-casting.json'), 'utf8'));
const args = process.argv.slice(2);
const has = flag => args.includes(flag);
const value = flag => has(flag) ? args[args.indexOf(flag) + 1] : null;

function parseSets(selection) {
  if (!selection) return [];
  return [...new Set(selection.split(',').map(token => Number(token.trim())))].sort((left, right) => left - right);
}

function profileVoice(profile) {
  const split = profile.lastIndexOf(':');
  const role = profile.slice(0, split);
  const accent = profile.slice(split + 1);
  const voice = casting.voices[accent]?.[casting.role_voice[role]];
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
  };
}

function seed(setNumber, index) {
  return Number.parseInt(sha256(`repair:${manifest.repairManifestSha256}:${setNumber}:${index}:${value('--seed-salt')}`).slice(0, 8), 16);
}

async function synthesize(apiKey, row, segment, index) {
  const voice = profileVoice(segment.profile);
  const response = await fetch(`${API}/v1/text-to-speech/${voice.voice_id}?output_format=${casting.target.intermediate_output_format}&enable_logging=false`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'xi-api-key': apiKey },
    body: JSON.stringify({
      text: ttsText(segment.text),
      model_id: casting.model_id,
      voice_settings: casting.voice_settings,
      seed: seed(row.set, index),
    }),
  });
  if (!response.ok) throw Error(`Repair Set ${row.set} segment ${index + 1} failed with HTTP ${response.status}: ${(await response.text()).slice(0, 500)}`);
  return Buffer.from(await response.arrayBuffer());
}

function runFfmpeg(arguments_, errorLabel) {
  const result = spawnSync(mediaBinary('ffmpeg'), arguments_, { encoding: 'utf8', maxBuffer: 4 * 1024 * 1024 });
  assert.equal(result.status, 0, `${errorLabel}: ${result.stderr}`);
}

function duration(file) {
  const result = spawnSync(mediaBinary('ffprobe'), ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', file], { encoding: 'utf8' });
  assert.equal(result.status, 0, `ffprobe failed: ${result.stderr}`);
  return Number(result.stdout.trim());
}

function prepareSegment(source, target) {
  runFfmpeg(['-y', '-hide_banner', '-loglevel', 'error', '-i', source, '-vn', '-af', [
    'silenceremove=start_periods=1:start_silence=0.03:start_threshold=-45dB',
    'areverse',
    'silenceremove=start_periods=1:start_silence=0.03:start_threshold=-45dB',
    'areverse',
    `loudnorm=I=${casting.target.integrated_loudness_lufs}:TP=${casting.target.normalization_true_peak_dbfs}:LRA=7`,
  ].join(','), '-ar', '44100', '-ac', '1', '-c:a', 'pcm_s16le', target], 'Repair segment preparation failed');
}

function assembleRepair(row, prepared, directory) {
  const list = [];
  prepared.forEach((file, index) => {
    list.push(`file '${file.replaceAll("'", "'\\''")}'`);
    if (index < prepared.length - 1) {
      const silence = path.join(directory, 'turn-silence.wav');
      if (!existsSync(silence)) runFfmpeg(['-y', '-hide_banner', '-loglevel', 'error', '-f', 'lavfi', '-t', String(casting.target.silence_between_conversation_turns_seconds), '-i', 'anullsrc=r=44100:cl=mono', '-c:a', 'pcm_s16le', silence], 'Repair silence failed');
      list.push(`file '${silence.replaceAll("'", "'\\''")}'`);
    }
  });
  const concat = path.join(directory, 'repair-concat.txt');
  const output = path.join(directory, 'repair.wav');
  writeFileSync(concat, `${list.join('\n')}\n`);
  runFfmpeg(['-y', '-hide_banner', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', concat, '-c:a', 'pcm_s16le', '-ar', '44100', '-ac', '1', output], `Repair Set ${row.set} assembly failed`);
  return output;
}

function patchSource(row, repair, target) {
  const repairDuration = duration(repair);
  const trailing = row.gapDurationSeconds - row.leadingSilenceSeconds - repairDuration;
  assert.ok(trailing >= 1, `Repair Set ${row.set} is ${Math.abs(trailing - 1).toFixed(2)} seconds too long for its verified gap`);
  const source = path.join(root, 'public', row.audioUrl);
  assert.equal(sha256(readFileSync(source)), row.sourceAudioSha256, `Repair Set ${row.set} source audio changed`);
  const delay = Math.round(row.leadingSilenceSeconds * 1000);
  const filter = [
    `[0:a:0]atrim=start=0:end=${row.gapStartSeconds},asetpts=PTS-STARTPTS[pre]`,
    `[1:a:0]adelay=${delay}:all=1[repair]`,
    `anullsrc=r=44100:cl=mono:d=${trailing.toFixed(6)}[tail]`,
    `[0:a:0]atrim=start=${row.gapEndSeconds},asetpts=PTS-STARTPTS[post]`,
    '[pre][repair][tail][post]concat=n=4:v=0:a=1[out]',
  ].join(';');
  runFfmpeg(['-y', '-hide_banner', '-loglevel', 'error', '-i', source, '-i', repair, '-filter_complex', filter, '-map', '[out]', '-ar', '44100', '-ac', '1', '-b:a', casting.target.final_bitrate, target], `Repair Set ${row.set} patch failed`);
  assert.ok(Math.abs(duration(target) - duration(source)) <= 0.15, `Repair Set ${row.set} changed total duration`);
  return { repairDurationSeconds: Number(repairDuration.toFixed(3)), trailingSilenceSeconds: Number(trailing.toFixed(3)) };
}

const selectedSets = parseSets(value('--sets'));
const selectedRows = selectedSets.length ? manifest.rows.filter(row => selectedSets.includes(row.set)) : [];
if (!has('--generate')) {
  console.log(JSON.stringify({ mode: 'dry-run', repairManifestSha256: manifest.repairManifestSha256, availableSets: manifest.rows.map(row => row.set), invoice: manifest.invoice, providerCalled: false }, null, 2));
  process.exit(0);
}

assert.ok(selectedRows.length, '--generate requires --sets=1,9 or a subset');
assert.deepEqual(selectedRows.map(row => row.set), selectedSets, 'Selection contains a set without a frozen repair');
assert.equal(value('--approve-repair-manifest'), manifest.repairManifestSha256, `Pass --approve-repair-manifest ${manifest.repairManifestSha256}`);
assert.ok(value('--seed-salt'), '--seed-salt is required');
for (const row of selectedRows) assert.ok(casting.approval_scope.approved_repair_sets.includes(row.set), `Repair Set ${row.set} is outside authorized scope`);
const requestedCharacters = selectedRows.reduce((total, row) => total + row.billableCharacters, 0);
const requestedUsd = requestedCharacters * casting.api_price_usd_per_1000_characters / 1000;
const cap = Number(value('--max-usd'));
assert.ok(Number.isFinite(cap) && cap >= requestedUsd && cap <= casting.approval_scope.approved_max_usd_before_tax, `Repair cost ${requestedUsd.toFixed(4)} exceeds cap or authorization`);
const reserve = Number(value('--min-remaining-credits'));
assert.ok(Number.isFinite(reserve) && reserve >= casting.approval_scope.minimum_remaining_credits, 'Protected credit reserve is too low');
const apiKey = process.env.ELEVENLABS_API_KEY;
assert.ok(apiKey, 'ELEVENLABS_API_KEY is required only for paid repair generation');
const account = await accountSnapshot(apiKey);
const estimatedCredits = Math.ceil(requestedCharacters * casting.credits_per_character);
assert.ok(account.availableCredits >= estimatedCredits + reserve, `Need ${estimatedCredits} credits plus ${reserve} reserve; only ${account.availableCredits} available`);
const availableVoices = new Map((await apiJson('/v2/voices?page_size=100', apiKey)).voices.map(voice => [voice.voice_id, voice]));
for (const segment of selectedRows.flatMap(row => row.segments)) {
  const voice = profileVoice(segment.profile);
  assert.ok(availableVoices.has(voice.voice_id), `Voice ${voice.voice_name} is unavailable`);
  assert.ok((availableVoices.get(voice.voice_id).sharing?.rate ?? 1) <= 1, `Voice ${voice.voice_name} costs more than 1x`);
}

const output = path.resolve(value('--output-dir') || path.join(root, 'output/ielts-audio-repairs', manifest.repairManifestSha256));
assert.ok(path.relative(path.join(root, 'public/audio/ielts'), output).startsWith('..'), 'Repairs must remain outside public audio');
mkdirSync(output, { recursive: true });
const files = [];
for (const row of selectedRows) {
  const directory = path.join(output, `set-${row.set}`);
  mkdirSync(directory, { recursive: true });
  const prepared = [];
  for (const [index, segment] of row.segments.entries()) {
    const requestHash = sha256(JSON.stringify({ repairManifestSha256: manifest.repairManifestSha256, set: row.set, index, voice: profileVoice(segment.profile).voice_id, model: casting.model_id, text: ttsText(segment.text), settings: casting.voice_settings, seed: seed(row.set, index) }));
    const raw = path.join(directory, `${String(index + 1).padStart(2, '0')}-${requestHash}.mp3`);
    if (!existsSync(raw)) writeFileSync(raw, await synthesize(apiKey, row, segment, index));
    const wav = `${raw}.wav`;
    if (!existsSync(wav)) prepareSegment(raw, wav);
    prepared.push(wav);
  }
  const repair = assembleRepair(row, prepared, directory);
  const target = path.join(directory, `ielts-listening-set-${row.set}.repaired.mp3`);
  const timing = patchSource(row, repair, target);
  files.push({ set: row.set, path: target, sha256: sha256(readFileSync(target)), bytes: readFileSync(target).length, ...timing });
}
const logCore = { schemaVersion: 1, generatedAt: new Date().toISOString(), repairManifestSha256: manifest.repairManifestSha256, modelId: casting.model_id, accountAtStart: account, estimatedCredits, estimatedUsdBeforeTax: Number(requestedUsd.toFixed(4)), files, releaseAuthorized: false };
const log = { ...logCore, logSha256: sha256(JSON.stringify(logCore)) };
writeFileSync(path.join(output, 'repair-generation-log.json'), `${JSON.stringify(log, null, 2)}\n`);
console.log(JSON.stringify(log, null, 2));
