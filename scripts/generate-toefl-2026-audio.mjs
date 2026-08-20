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
      charactersWithMultipliers += segment.text.length * (Number.isFinite(multiplier) && multiplier >= 1 ? multiplier : 1);
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
    billableCharacters: rows.reduce((total, row) => total + row.billable_characters, 0),
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
const selectedRows = sampleOnly
  ? sampleRows
  : fullBatch
    ? TOEFL_MISSING_AUDIO_ROWS
    : [];

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

function ensureGenerationGate(rows) {
  assert.notEqual(sampleOnly, fullBatch, 'choose exactly one generation scope: --sample or --all');
  assert.ok(rows.length > 0, 'generation scope is empty');
  assert.equal(value('--approve-manifest'), manifestHash, `pass --approve-manifest ${manifestHash}`);
  if (fullBatch) assert.equal(value('--approve-full-batch'), '400', 'full generation also requires --approve-full-batch 400');
  const cap = Number(value('--max-usd'));
  assert.ok(Number.isFinite(cap) && cap > 0, 'pass a positive --max-usd owner-approved ceiling');
  const bill = invoice(rows, sampleOnly ? 'pilot' : 'full');
  assert.deepEqual(bill.unresolvedVoiceIds, [], 'every used casting profile needs an approved voice_id');
  assert.deepEqual(bill.unresolvedCreditMultipliers, [], 'every used casting profile needs a confirmed credit_multiplier');
  assert.deepEqual(bill.unapprovedCastingProfiles, [], 'every used casting profile needs approval=approved_by_owner');
  assert.ok(bill.estimatedUsdBeforeTax <= cap, `estimated USD ${bill.estimatedUsdBeforeTax} exceeds approved ceiling ${cap}`);
  const apiKey = process.env.ELEVENLABS_API_KEY;
  assert.ok(apiKey, 'ELEVENLABS_API_KEY is required for generation and is never read from a committed file');
  const ffmpeg = spawnSync('ffmpeg', ['-version'], { encoding: 'utf8' });
  assert.equal(ffmpeg.status, 0, 'ffmpeg is required for mono 64 kbps assembly');
  return { apiKey, bill, cap };
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
  const commonOutput = ['-vn', '-ar', String(casting.target.final_sample_rate_hz), '-ac', String(casting.target.final_channels), '-b:a', casting.target.final_bitrate, targetPath];
  const command = segmentPaths.length === 1
    ? ['-y', '-hide_banner', '-loglevel', 'error', '-i', segmentPaths[0], ...commonOutput]
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
        return ['-y', '-hide_banner', '-loglevel', 'error', ...inputArgs, '-filter_complex', `${labels.join('')}concat=n=${labels.length}:v=0:a=1[out]`, '-map', '[out]', ...commonOutput];
      })();
  const result = spawnSync('ffmpeg', command, { encoding: 'utf8' });
  if (result.status !== 0) throw new Error(`ffmpeg failed for ${targetPath}: ${result.stderr}`);
}

async function generate(rows) {
  const scope = sampleOnly ? 'pilot' : 'full';
  const { apiKey, bill, cap } = ensureGenerationGate(rows);
  const voicePayload = await apiJson('/v1/voices', apiKey);
  const availableVoiceIds = new Set((voicePayload.voices ?? []).map((voice) => voice.voice_id));
  const usedProfiles = [...new Set(rows.flatMap((row) => row._segments.map((segment) => profileKey(row, segment))))];
  for (const key of usedProfiles) {
    assert.ok(availableVoiceIds.has(casting.profiles[key].voice_id), `${key} voice_id is not available in this account`);
  }

  const root = outputDirectory(scope);
  mkdirSync(root, { recursive: true });
  const generated = [];
  for (const [rowIndex, row] of rows.entries()) {
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
        text: segment.text,
        previousText: row._segments[segmentIndex - 1]?.text,
        nextText: row._segments[segmentIndex + 1]?.text,
        mediaId: row.media_id,
        segmentIndex,
      });
      const segmentPath = path.join(partsDir, `segment-${segmentIndex + 1}.mp3`);
      writeFileSync(segmentPath, bytes);
      segmentPaths.push(segmentPath);
    }
    ffmpegAssemble(segmentPaths, targetPath);
    generated.push({ media_id: row.media_id, path: targetPath, billable_characters: row.billable_characters });
    console.log(`[${rowIndex + 1}/${rows.length}] ${row.media_id}`);
  }
  const log = {
    generatedAt: new Date().toISOString(),
    scope,
    manifestSha256: manifestHash,
    modelId: casting.model_id,
    approvedMaxUsd: cap,
    estimatedUsdBeforeTax: bill.estimatedUsdBeforeTax,
    files: generated,
  };
  writeFileSync(path.join(root, 'generation-log.json'), `${JSON.stringify(log, null, 2)}\n`);
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
    note: 'Dry run only. No API call, secret read, file generation, or audio write occurred.',
  }, null, 2));
}
