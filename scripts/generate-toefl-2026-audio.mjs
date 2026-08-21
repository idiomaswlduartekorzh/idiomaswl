import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import {
  TOEFL_MISSING_AUDIO_ROWS,
  TOEFL_MISSING_AUDIO_SUMMARY,
} from './build-toefl-missing-audio-manifest.mjs';

const API = 'https://api.elevenlabs.io';
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..');
const castingPath = path.join(scriptDir, 'toefl-2026-voice-casting.json');
const casting = JSON.parse(readFileSync(castingPath, 'utf8'));
const args = process.argv.slice(2);
const has = (flag) => args.includes(flag);
const value = (flag) => has(flag) ? args[args.indexOf(flag) + 1] : null;
const doGenerate = has('--generate');
const sampleOnly = has('--sample');
const fullBatch = has('--all');
const requestedSets = value('--sets');
const listVoices = has('--list-voices');
const accountStatus = has('--account');
const manifestHash = TOEFL_MISSING_AUDIO_SUMMARY.manifestSha256;

assert.equal(casting.manifest_sha256, manifestHash, 'voice casting belongs to a different manifest version');

function setNumber(row) {
  return Number(row.set_id.replace('set-', ''));
}

function profileKey(row, segment) {
  const odd = setNumber(row) % 2 === 1;
  if (segment.profile === 'woman') return odd ? 'woman_a' : 'woman_b';
  if (segment.profile === 'man') return odd ? 'man_a' : 'man_b';
  if (segment.profile === 'student') return odd ? 'student_woman' : 'student_man';
  return segment.profile;
}

const FLASH_NUMBER_PRONUNCIATIONS = [
  [/\bRoom 4\b/g, 'Room four'],
  [/\bcarbon-14\b/gi, 'carbon fourteen'],
  [/\bScience Room 105\b/g, 'Science Room one oh five'],
  [/\bLibrary Room 214\b/g, 'Library Room two fourteen'],
  [/\bRoom 204\b/g, 'Room two oh four'],
  [/\bRoom 205\b/g, 'Room two oh five'],
];

function ttsText(text) {
  if (casting.model_id !== 'eleven_flash_v2_5') return text;
  return FLASH_NUMBER_PRONUNCIATIONS.reduce(
    (normalized, [pattern, replacement]) => normalized.replace(pattern, replacement),
    text,
  );
}

function publicCost(rows) {
  const rate = Number(casting.api_price_usd_per_1000_characters);
  let charactersWithMultipliers = 0;
  const unresolvedMultipliers = new Set();
  for (const row of rows) {
    for (const segment of row._segments) {
      const key = profileKey(row, segment);
      const configured = casting.profiles[key];
      assert.ok(configured, `missing casting profile ${key}`);
      const multiplier = Number(configured.credit_multiplier);
      if (!Number.isFinite(multiplier) || multiplier < 1) unresolvedMultipliers.add(key);
      charactersWithMultipliers += ttsText(segment.text).length * (Number.isFinite(multiplier) && multiplier >= 1 ? multiplier : 1);
    }
  }
  return {
    usd: charactersWithMultipliers / 1000 * rate,
    charactersWithMultipliers,
    unresolvedMultipliers: [...unresolvedMultipliers].sort(),
  };
}

function invoice(rows, label) {
  const cost = publicCost(rows);
  const profiles = [...new Set(rows.flatMap((row) => row._segments.map((segment) => profileKey(row, segment))))].sort();
  return {
    scope: label,
    manifestSha256: manifestHash,
    files: rows.length,
    billableCharacters: rows.reduce(
      (total, row) => total + row._segments.reduce((rowTotal, segment) => rowTotal + ttsText(segment.text).length, 0),
      0,
    ),
    estimatedCredits: Math.ceil(rows.reduce(
      (total, row) => total + row._segments.reduce((rowTotal, segment) => rowTotal + ttsText(segment.text).length, 0),
      0,
    ) * Number(casting.credits_per_character)),
    requestSegments: rows.reduce((total, row) => total + row.request_segments, 0),
    modelId: casting.model_id,
    basePriceUsdPer1000Characters: casting.api_price_usd_per_1000_characters,
    estimatedUsdBeforeTax: Number(cost.usd.toFixed(4)),
    castingProfiles: profiles,
    unresolvedVoiceIds: profiles.filter((key) => !casting.profiles[key]?.voice_id),
    unresolvedCreditMultipliers: cost.unresolvedMultipliers,
    unapprovedCastingProfiles: profiles.filter((key) => casting.profiles[key]?.approval !== 'approved_by_owner'),
    generationAuthorized: false,
  };
}

const sampleRows = TOEFL_MISSING_AUDIO_ROWS.filter((row) => row.sample_candidate === 'yes');

function parseSetSelection(selection) {
  if (!selection) return [];
  const selected = new Set();
  for (const part of selection.split(',')) {
    const match = part.trim().match(/^(\d+)(?:-(\d+))?$/);
    assert.ok(match, `invalid --sets selection: ${part}`);
    const start = Number(match[1]);
    const end = Number(match[2] ?? match[1]);
    assert.ok(start >= 1 && end <= 20 && start <= end, `--sets must stay within 1-20: ${part}`);
    for (let set = start; set <= end; set += 1) selected.add(set);
  }
  return [...selected].sort((a, b) => a - b);
}

const selectedSetNumbers = parseSetSelection(requestedSets);
const excludedMediaIds = new Set();
for (const logPath of args.flatMap((argument, index) => argument === '--exclude-log' ? [args[index + 1]] : [])) {
  assert.ok(logPath, '--exclude-log requires a generation log path');
  const excludedLog = JSON.parse(readFileSync(path.resolve(logPath), 'utf8'));
  assert.equal(excludedLog.manifestSha256, manifestHash, `excluded log belongs to another manifest: ${logPath}`);
  for (const file of excludedLog.files ?? []) excludedMediaIds.add(file.media_id);
}

const selectedRows = (sampleOnly
  ? sampleRows
  : fullBatch
    ? TOEFL_MISSING_AUDIO_ROWS
    : selectedSetNumbers.length > 0
      ? TOEFL_MISSING_AUDIO_ROWS.filter((row) => selectedSetNumbers.includes(setNumber(row)))
      : [])
  .filter((row) => !excludedMediaIds.has(row.media_id));

async function apiJson(endpoint, apiKey) {
  const response = await fetch(`${API}${endpoint}`, { headers: { 'xi-api-key': apiKey } });
  if (!response.ok) throw new Error(`${endpoint} failed with HTTP ${response.status}: ${await response.text()}`);
  return response.json();
}

async function showReadOnlyAccountData() {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  assert.ok(apiKey, 'ELEVENLABS_API_KEY is required only for read-only account queries or generation');
  if (listVoices) {
    const payload = await apiJson('/v1/voices', apiKey);
    const voices = (payload.voices ?? []).map((voice) => ({
      voice_id: voice.voice_id,
      name: voice.name,
      category: voice.category,
      labels: voice.labels,
      sharing_rate: voice.sharing?.rate ?? null,
    }));
    console.log(JSON.stringify({ voiceCount: voices.length, voices }, null, 2));
  }
  if (accountStatus) {
    const subscription = await apiJson('/v1/user/subscription', apiKey);
    console.log(JSON.stringify({
      tier: subscription.tier,
      character_count: subscription.character_count,
      character_limit: subscription.character_limit,
      can_extend_character_limit: subscription.can_extend_character_limit,
      next_character_count_reset_unix: subscription.next_character_count_reset_unix,
    }, null, 2));
  }
}

function scopeLabel() {
  if (sampleOnly) return 'pilot';
  if (fullBatch) return 'full';
  return `sets-${selectedSetNumbers.join('-')}`;
}

async function ensureGenerationGate(rows) {
  const scopeCount = [sampleOnly, fullBatch, selectedSetNumbers.length > 0].filter(Boolean).length;
  assert.equal(scopeCount, 1, 'choose exactly one generation scope: --sample, --all, or --sets');
  assert.ok(rows.length > 0, 'generation scope is empty');
  assert.equal(value('--approve-manifest'), manifestHash, `pass --approve-manifest ${manifestHash}`);
  if (fullBatch) assert.equal(value('--approve-full-batch'), '400', 'full generation also requires --approve-full-batch 400');
  const cap = Number(value('--max-usd'));
  assert.ok(Number.isFinite(cap) && cap > 0, 'pass a positive --max-usd owner-approved ceiling');
  const bill = invoice(rows, scopeLabel());
  assert.deepEqual(bill.unresolvedVoiceIds, [], 'every used casting profile needs an approved voice_id');
  assert.deepEqual(bill.unresolvedCreditMultipliers, [], 'every used casting profile needs a confirmed credit_multiplier');
  assert.deepEqual(bill.unapprovedCastingProfiles, [], 'every used casting profile needs approval=approved_by_owner');
  assert.ok(bill.estimatedUsdBeforeTax <= cap, `estimated USD ${bill.estimatedUsdBeforeTax} exceeds approved ceiling ${cap}`);
  const apiKey = process.env.ELEVENLABS_API_KEY;
  assert.ok(apiKey, 'ELEVENLABS_API_KEY is required for generation and is never read from a committed file');
  const ffmpeg = spawnSync('ffmpeg', ['-version'], { encoding: 'utf8' });
  assert.equal(ffmpeg.status, 0, 'ffmpeg is required for mono 64 kbps assembly');
  const reserve = Number(value('--min-remaining-credits'));
  assert.ok(Number.isFinite(reserve) && reserve >= 0, 'pass --min-remaining-credits to protect the account from exhaustion');
  const subscription = await apiJson('/v1/user/subscription', apiKey);
  const availableCredits = Number(subscription.character_limit) - Number(subscription.character_count);
  assert.ok(Number.isFinite(availableCredits) && availableCredits >= 0, 'unable to calculate available ElevenLabs credits');
  assert.ok(
    bill.estimatedCredits + reserve <= availableCredits,
    `estimated ${bill.estimatedCredits} credits plus ${reserve} reserve exceeds ${availableCredits} available`,
  );
  return { apiKey, bill, cap, reserve, availableCredits };
}

function outputDirectory(scope) {
  const requested = value('--output-dir');
  const result = requested
    ? path.resolve(requested)
    : path.join(os.tmpdir(), 'idiomaswl-toefl-audio-2026', manifestHash, scope);
  const publicAudio = path.join(repoRoot, 'public', 'audio', 'toefl');
  assert.ok(!result.startsWith(publicAudio), 'generation must land outside public/audio/toefl until QA and owner approval');
  return result;
}

function seedFor(mediaId, segmentIndex) {
  return Number.parseInt(createHash('sha256').update(`${mediaId}:${segmentIndex}`).digest('hex').slice(0, 8), 16);
}

async function synthesize({ apiKey, voiceId, text, previousText, nextText, mediaId, segmentIndex }) {
  const query = new URLSearchParams({
    output_format: casting.target.intermediate_output_format,
    enable_logging: 'false',
  });
  const response = await fetch(`${API}/v1/text-to-speech/${voiceId}?${query}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'xi-api-key': apiKey },
    body: JSON.stringify({
      text,
      model_id: casting.model_id,
      voice_settings: casting.voice_settings,
      seed: seedFor(mediaId, segmentIndex),
      ...(previousText ? { previous_text: previousText } : {}),
      ...(nextText ? { next_text: nextText } : {}),
    }),
  });
  if (!response.ok) throw new Error(`${mediaId} segment ${segmentIndex + 1} failed with HTTP ${response.status}: ${await response.text()}`);
  return Buffer.from(await response.arrayBuffer());
}

function ffmpegAssemble(segmentPaths, targetPath) {
  const durationSeconds = segmentPaths.reduce((total, segmentPath) => {
    const probe = spawnSync('ffprobe', [
      '-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', segmentPath,
    ], { encoding: 'utf8' });
    assert.equal(probe.status, 0, `ffprobe failed for ${segmentPath}: ${probe.stderr}`);
    return total + Number(probe.stdout.trim());
  }, 0);
  const speechCompression = durationSeconds <= 7
    ? 'acompressor=threshold=-30dB:ratio=4:attack=5:release=80:makeup=12dB,'
    : segmentPaths.length > 1
      ? 'acompressor=threshold=-28dB:ratio=3:attack=10:release=120:makeup=8dB,'
      : '';
  const loudnessFilter = `${speechCompression}loudnorm=I=${casting.target.integrated_loudness_lufs}:LRA=7:TP=${casting.target.max_true_peak_dbfs}`;
  const commonOutput = ['-vn', '-ar', String(casting.target.final_sample_rate_hz), '-ac', String(casting.target.final_channels), '-b:a', casting.target.final_bitrate, targetPath];
  const command = segmentPaths.length === 1
    ? ['-y', '-hide_banner', '-loglevel', 'error', '-i', segmentPaths[0], '-af', loudnessFilter, ...commonOutput]
    : (() => {
        const inputArgs = [];
        const labels = [];
        let inputIndex = 0;
        segmentPaths.forEach((segmentPath, index) => {
          inputArgs.push('-i', segmentPath);
          labels.push(`[${inputIndex}:a]`);
          inputIndex += 1;
          if (index < segmentPaths.length - 1) {
            inputArgs.push('-f', 'lavfi', '-t', String(casting.target.silence_between_conversation_turns_seconds), '-i', 'anullsrc=r=44100:cl=mono');
            labels.push(`[${inputIndex}:a]`);
            inputIndex += 1;
          }
        });
        return ['-y', '-hide_banner', '-loglevel', 'error', ...inputArgs, '-filter_complex', `${labels.join('')}concat=n=${labels.length}:v=0:a=1[joined];[joined]${loudnessFilter}[out]`, '-map', '[out]', ...commonOutput];
      })();
  const result = spawnSync('ffmpeg', command, { encoding: 'utf8' });
  if (result.status !== 0) throw new Error(`ffmpeg failed for ${targetPath}: ${result.stderr}`);
}

async function generate(rows) {
  const scope = scopeLabel();
  const root = outputDirectory(scope);
  mkdirSync(root, { recursive: true });
  const logPath = path.join(root, 'generation-log.json');
  const previousLog = existsSync(logPath) ? JSON.parse(readFileSync(logPath, 'utf8')) : null;
  if (previousLog) {
    assert.equal(previousLog.manifestSha256, manifestHash, 'resume log belongs to another manifest');
    assert.equal(previousLog.modelId, casting.model_id, 'resume log used another ElevenLabs model');
    assert.equal(previousLog.scope, scope, 'resume log used another generation scope');
  }
  const generated = previousLog?.files ?? [];
  const completedMediaIds = new Set(generated.map((file) => file.media_id));
  for (const file of generated) assert.ok(existsSync(file.path), `resume log references a missing file: ${file.path}`);
  const pendingRows = rows.filter((row) => !completedMediaIds.has(row.media_id));
  if (pendingRows.length === 0) {
    console.log(JSON.stringify({ outputDirectory: root, files: generated.length, resumed: true, qaStatus: 'pending_no_public_release' }, null, 2));
    return;
  }
  const { apiKey, bill, cap, reserve, availableCredits } = await ensureGenerationGate(pendingRows);
  const voicePayload = await apiJson('/v1/voices', apiKey);
  const availableVoiceIds = new Set((voicePayload.voices ?? []).map((voice) => voice.voice_id));
  const usedProfiles = [...new Set(pendingRows.flatMap((row) => row._segments.map((segment) => profileKey(row, segment))))];
  for (const key of usedProfiles) {
    assert.ok(availableVoiceIds.has(casting.profiles[key].voice_id), `${key} voice_id is not available in this account`);
  }

  const writeLog = (status) => writeFileSync(logPath, `${JSON.stringify({
    generatedAt: previousLog?.generatedAt ?? new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status,
    scope,
    manifestSha256: manifestHash,
    modelId: casting.model_id,
    approvedMaxUsd: cap,
    protectedCreditReserve: reserve,
    availableCreditsAtResume: availableCredits,
    estimatedPendingCreditsAtResume: bill.estimatedCredits,
    estimatedPendingUsdAtResume: bill.estimatedUsdBeforeTax,
    files: generated,
  }, null, 2)}\n`);
  writeLog('in_progress');
  for (const [rowIndex, row] of pendingRows.entries()) {
    const setDir = path.join(root, row.set_id);
    const partsDir = path.join(setDir, '.segments', row.media_id.replace(/[^a-z0-9-]+/gi, '_'));
    mkdirSync(partsDir, { recursive: true });
    const targetPath = path.join(setDir, path.basename(row.planned_url));
    assert.ok(!existsSync(targetPath), `refusing to overwrite generated target ${targetPath}`);
    const segmentPaths = [];
    for (const [segmentIndex, segment] of row._segments.entries()) {
      const key = profileKey(row, segment);
      const bytes = await synthesize({
        apiKey,
        voiceId: casting.profiles[key].voice_id,
        text: ttsText(segment.text),
        previousText: row._segments[segmentIndex - 1] ? ttsText(row._segments[segmentIndex - 1].text) : undefined,
        nextText: row._segments[segmentIndex + 1] ? ttsText(row._segments[segmentIndex + 1].text) : undefined,
        mediaId: row.media_id,
        segmentIndex,
      });
      const segmentPath = path.join(partsDir, `segment-${segmentIndex + 1}.mp3`);
      writeFileSync(segmentPath, bytes);
      segmentPaths.push(segmentPath);
    }
    ffmpegAssemble(segmentPaths, targetPath);
    generated.push({
      media_id: row.media_id,
      path: targetPath,
      billable_characters: row._segments.reduce((total, segment) => total + ttsText(segment.text).length, 0),
    });
    writeLog('in_progress');
    console.log(`[${rowIndex + 1}/${pendingRows.length}] ${row.media_id}`);
  }
  writeLog('complete');
  console.log(JSON.stringify({ outputDirectory: root, files: generated.length, qaStatus: 'pending_no_public_release' }, null, 2));
}

if (listVoices || accountStatus) {
  await showReadOnlyAccountData();
} else if (doGenerate) {
  await generate(selectedRows);
} else {
  console.log(JSON.stringify({
    sample: invoice(sampleRows, 'pilot'),
    full: invoice(TOEFL_MISSING_AUDIO_ROWS, 'full'),
    ...(selectedSetNumbers.length > 0 ? { selected: invoice(selectedRows, scopeLabel()) } : {}),
    note: 'Dry run only. No API call, secret read, file generation, or audio write occurred.',
  }, null, 2));
}
