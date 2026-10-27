#!/usr/bin/env node

import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const API = 'https://api.elevenlabs.io';
const WORKSPACE = '/Users/ddev/Documents/Codex/2026-10-02/pu';
const PLAN_PATH = path.join(WORKSPACE, 'work/listening-sets22-40/set-40/set40-audio-production-plan.json');
const OUTPUT_DIR = path.join(WORKSPACE, 'outputs/ielts-production/set-40/listening/elevenlabs-v4-pilot');
const MANIFEST_PATH = path.join(OUTPUT_DIR, 'set40-part1-dialogue-pilot-manifest.json');
const AUDIO_PATH = path.join(OUTPUT_DIR, 'set40-part1-eleven-v4-dialogue-pilot.mp3');
const RECEIPT_PATH = path.join(OUTPUT_DIR, 'set40-part1-eleven-v4-dialogue-pilot-receipt.json');

const args = process.argv.slice(2);
const has = flag => args.includes(flag);
const value = flag => has(flag) ? args[args.indexOf(flag) + 1] : null;

function sha256Bytes(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

function sha256File(file) {
  return sha256Bytes(readFileSync(file));
}

async function apiJson(endpoint, apiKey) {
  const response = await fetch(`${API}${endpoint}`, { headers: { 'xi-api-key': apiKey } });
  if (!response.ok) {
    throw new Error(`${endpoint} failed with HTTP ${response.status}: ${(await response.text()).slice(0, 500)}`);
  }
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

function buildManifest() {
  const planBytes = readFileSync(PLAN_PATH);
  const plan = JSON.parse(planBytes);
  const wanted = new Set([
    '000-open',
    'p1-preview',
    's40-p1-t001',
    's40-p1-t002',
    's40-p1-t003',
    's40-p1-t004',
    's40-p1-t005',
    's40-p1-t006',
  ]);
  const voiceBySpeaker = {
    NARRATOR: { voiceId: 'onwK4e9ZLuTAKqWW03F9', voiceName: 'Daniel - Steady Broadcaster' },
    'Amrita Cole': { voiceId: 'Xb7hH8MSUJpSbSDYk0k2', voiceName: 'Alice - Clear, Engaging Educator' },
    'Dylan Mercer': { voiceId: 'JBFqnCBsd6RMkjVDRZzb', voiceName: 'George - Warm, Captivating Storyteller' },
  };
  const selected = plan.segments.filter(segment => wanted.has(segment.segment_id));
  assert.equal(selected.length, wanted.size, 'Pilot segment selection is incomplete');
  assert.deepEqual(selected.map(segment => segment.segment_id), [...wanted], 'Pilot order changed');
  const inputs = selected.map(segment => {
    const voice = voiceBySpeaker[segment.speaker];
    assert.ok(voice, `Missing ElevenLabs voice for ${segment.speaker}`);
    return {
      segmentId: segment.segment_id,
      speaker: segment.speaker,
      text: segment.text,
      textSha256: sha256Bytes(segment.text),
      voiceId: voice.voiceId,
      voiceName: voice.voiceName,
    };
  });
  const billableCharacters = inputs.reduce((total, input) => total + input.text.length, 0);
  assert.ok(billableCharacters <= 2_000, 'Pilot exceeds the reliable Text to Dialogue request size');
  return {
    schemaVersion: 1,
    artifactType: 'IELTS_ELEVENLABS_V4_DIALOGUE_PILOT_MANIFEST',
    artifactVersion: '1.0.0',
    set: 40,
    part: 1,
    provider: 'ElevenLabs',
    endpoint: '/v1/text-to-dialogue',
    modelId: 'eleven_v4',
    outputFormat: 'mp3_44100_128',
    seed: 402601,
    sourcePlan: { path: PLAN_PATH, sha256: sha256Bytes(planBytes) },
    inputs,
    billableCharacters,
    budget: {
      maximumCredits: 1_500,
      minimumRemainingCredits: 500,
      stopBeforeExhaustion: true,
    },
    output: AUDIO_PATH,
    gates: {
      humanListening: 'PENDING',
      fullSetGeneration: 'NOT_AUTHORIZED_BY_PILOT',
      release: 'NOT_APPROVED',
    },
  };
}

mkdirSync(OUTPUT_DIR, { recursive: true });

if (has('--plan')) {
  const manifest = buildManifest();
  const bytes = Buffer.from(`${JSON.stringify(manifest, null, 2)}\n`);
  writeFileSync(MANIFEST_PATH, bytes);
  console.log(JSON.stringify({
    manifestPath: MANIFEST_PATH,
    manifestSha256: sha256Bytes(bytes),
    billableCharacters: manifest.billableCharacters,
    maximumCredits: manifest.budget.maximumCredits,
    minimumRemainingCredits: manifest.budget.minimumRemainingCredits,
  }, null, 2));
  process.exit(0);
}

assert.ok(has('--generate'), 'Use --plan or --generate');
assert.ok(existsSync(MANIFEST_PATH), 'Run --plan first');
assert.equal(value('--approve-manifest'), sha256File(MANIFEST_PATH), 'Pilot manifest approval hash does not match');
assert.ok(!existsSync(AUDIO_PATH), 'Pilot audio already exists; refusing to overwrite paid output');

const apiKey = process.env.ELEVENLABS_API_KEY;
assert.ok(apiKey, 'ELEVENLABS_API_KEY is required for generation');
const manifest = JSON.parse(readFileSync(MANIFEST_PATH));
const accountBefore = await accountSnapshot(apiKey);
assert.ok(
  accountBefore.availableCredits >= manifest.budget.maximumCredits + manifest.budget.minimumRemainingCredits,
  `Insufficient guarded balance: ${accountBefore.availableCredits} credits available`,
);
assert.ok(
  manifest.billableCharacters <= manifest.budget.maximumCredits,
  'Pilot characters exceed approved credit ceiling',
);

const response = await fetch(`${API}${manifest.endpoint}?output_format=${manifest.outputFormat}`, {
  method: 'POST',
  headers: { 'content-type': 'application/json', 'xi-api-key': apiKey },
  body: JSON.stringify({
    model_id: manifest.modelId,
    language_code: 'en',
    seed: manifest.seed,
    apply_text_normalization: 'auto',
    inputs: manifest.inputs.map(input => ({ text: input.text, voice_id: input.voiceId })),
  }),
});
if (!response.ok) {
  throw new Error(`Text to Dialogue failed with HTTP ${response.status}: ${(await response.text()).slice(0, 1_000)}`);
}
const audio = Buffer.from(await response.arrayBuffer());
assert.ok(audio.length > 1_000, 'ElevenLabs returned an empty pilot');
writeFileSync(AUDIO_PATH, audio);
const accountAfter = await accountSnapshot(apiKey);
const consumedCredits = accountBefore.availableCredits - accountAfter.availableCredits;
const headerCost = Number(response.headers.get('character-cost') ?? Number.NaN);
assert.ok(consumedCredits <= manifest.budget.maximumCredits, `Provider consumed ${consumedCredits} credits, above pilot ceiling`);
assert.ok(accountAfter.availableCredits >= manifest.budget.minimumRemainingCredits, 'Credit reserve breached');

const receipt = {
  schemaVersion: 1,
  artifactType: 'IELTS_ELEVENLABS_V4_DIALOGUE_PILOT_RECEIPT',
  generatedAt: new Date().toISOString(),
  manifest: { path: MANIFEST_PATH, sha256: sha256File(MANIFEST_PATH) },
  output: { path: AUDIO_PATH, sha256: sha256Bytes(audio), bytes: audio.length },
  provider: {
    modelId: manifest.modelId,
    requestId: response.headers.get('request-id'),
    characterCostHeader: Number.isFinite(headerCost) ? headerCost : null,
    consumedCredits,
  },
  accountBefore,
  accountAfter,
  gates: {
    humanListening: 'PENDING',
    technicalQa: 'PENDING',
    asr: 'PENDING',
    release: 'NOT_APPROVED',
  },
};
writeFileSync(RECEIPT_PATH, `${JSON.stringify(receipt, null, 2)}\n`);
console.log(JSON.stringify(receipt, null, 2));
