#!/usr/bin/env node

import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';

const API = 'https://api.elevenlabs.io';
const ROOT = '/Users/ddev/Documents/Codex/2026-10-02/pu';
const FFMPEG = '/Users/ddev/Library/Python/3.9/lib/python/site-packages/imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1';
const MAX_REQUEST_CHARACTERS = 1_850;
const MAX_REQUEST_TURNS = 12;
const CREDIT_RESERVE = 500;

const VOICES = {
  daniel: { id: 'onwK4e9ZLuTAKqWW03F9', name: 'Daniel - Steady Broadcaster', gender: 'male', accent: 'British' },
  alice: { id: 'Xb7hH8MSUJpSbSDYk0k2', name: 'Alice - Clear, Engaging Educator', gender: 'female', accent: 'British' },
  george: { id: 'JBFqnCBsd6RMkjVDRZzb', name: 'George - Warm, Captivating Storyteller', gender: 'male', accent: 'British' },
  sarah: { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah - Mature, Reassuring, Confident', gender: 'female', accent: 'North American' },
  will: { id: 'bIHbv24MWmeRgasZH58o', name: 'Will - Relaxed Optimist', gender: 'male', accent: 'North American' },
  matilda: { id: 'XrExE9yKIg1WjnnlVkGX', name: 'Matilda - Knowledgeable, Professional', gender: 'female', accent: 'North American' },
  claire: { id: '6UXvJKkwaqtXE3nZHvbF', name: 'Claire - Calm & Friendly', gender: 'female', accent: 'Australian' },
  grant: { id: 'y5emW3e0EB7TnaDoqFxW', name: 'Grant - Mature & Friendly', gender: 'male', accent: 'Australian' },
  jessie: { id: '7ceZgj78jCCeAW93ItNk', name: 'Jessie - Friendly Educator', gender: 'female', accent: 'New Zealand' },
  brian: { id: 'nPczCjzI2devNBz1zQrb', name: 'Brian - Deep, Resonant and Comforting', gender: 'male', accent: 'North American' },
};

const CASTS = {
  23: {
    NARRATOR: 'daniel',
    CARYS: 'alice',
    HARRIET: 'jessie',
    HINE: 'claire',
    LECTURER: 'grant',
    NIA: 'matilda',
    OWAIN: 'george',
    RHYS: 'will',
  },
  24: {
    NARRATOR: 'daniel',
    AOIFE: 'alice',
    LACHLAN: 'george',
    LECTURER: 'grant',
    MEI: 'matilda',
    NIAMH: 'jessie',
    OLIVIA: 'claire',
    'SEÁN': 'will',
  },
  25: {
    NARRATOR: 'daniel',
    'Asha Penrose': 'alice',
    'Iona Kerr': 'jessie',
    'Jonah Pike': 'george',
    Lecturer: 'grant',
    'Lewis Muir': 'will',
    'Maren Caldwell': 'claire',
  },
  26: {
    NARRATOR: 'daniel',
    'Amira Voss': 'alice',
    'Ethan Sloane': 'george',
    'Hana Rangi': 'jessie',
    Lecturer: 'grant',
    'Maeve Donnelly': 'matilda',
    'Tessa Whitlock': 'claire',
  },
  27: {
    NARRATOR: 'daniel',
    'Callum Webb': 'george',
    'Declan Shore': 'will',
    Lecturer: 'grant',
    'Moana Reed': 'claire',
    'Simone Baptiste': 'matilda',
    'Zoe Bartlett': 'alice',
  },
  28: {
    NARRATOR: 'daniel',
    'Eliza Wren': 'alice',
    'Finn Hollis': 'george',
    Lecturer: 'grant',
    'Orla Devlin': 'jessie',
    'Rowan Sinclair': 'matilda',
    'Toby Langford': 'will',
  },
  29: {
    NARRATOR: 'daniel',
    'Anwen Pryce': 'alice',
    'Caspian Dacre': 'george',
    'Jago Maberly': 'will',
    'Keira Mallon': 'jessie',
    Lecturer: 'grant',
    'Talia Northcott': 'matilda',
  },
  30: {
    NARRATOR: 'daniel',
    'Bronte Hales': 'alice',
    'Dr Elspeth Rennie': 'jessie',
    'Ivor Quade': 'george',
    'Jasper Tait': 'will',
    'Mireille Corbin': 'matilda',
    'Sorcha Venn': 'claire',
  },
  31: {
    NARRATOR: 'daniel',
    'Cerys Lomax': 'jessie',
    'Kieran Moss': 'will',
    Lecturer: 'grant',
    'Noemi Farrow': 'claire',
    'Osric Pym': 'george',
    'Tabitha Crowle': 'alice',
  },
  32: {
    NARRATOR: 'daniel',
    'Cormac Ellery': 'george',
    'Dorian Kells': 'will',
    Lecturer: 'grant',
    'Livia Sedgewick': 'alice',
    'Mae Solway': 'jessie',
    'Petra Wynne': 'matilda',
  },
  33: {
    NARRATOR: 'daniel',
    'Ailsa Trenwith': 'claire',
    'Finlay Rusk': 'will',
    'Imogen Vair': 'alice',
    Lecturer: 'grant',
    'Marta Keir': 'matilda',
    'Rory Fenlock': 'george',
  },
  34: {
    NARRATOR: 'daniel',
    'Elodie Marwick': 'claire',
    Lecturer: 'grant',
    'Merrick Thorneby': 'george',
    'Priyanka Shawl': 'alice',
    'Ruairi Gorseby': 'will',
    'Tamsin Orde': 'jessie',
  },
  35: {
    NARRATOR: 'daniel',
    'Alwyn Sloaneby': 'george',
    'Elspeth Faircombe': 'claire',
    Lecturer: 'grant',
    'Mabel Truett': 'matilda',
    'Neve Pritchlow': 'jessie',
    'Zachary Lorne': 'will',
  },
  36: {
    NARRATOR: 'daniel',
    'Crispin Penrith': 'will',
    'Eleri Snowe': 'alice',
    'Ffion Devereux': 'jessie',
    'Hamish Cleeve': 'george',
    Lecturer: 'grant',
    'Tavish Beckward': 'brian',
  },
  37: {
    NARRATOR: 'daniel',
    'Hugh Mallory': 'george',
    'Eleanor Price': 'alice',
    'Mara Fenwick': 'jessie',
    'Dr Carys Hume': 'matilda',
    'Aled Wynn': 'will',
    'Priya Norr': 'claire',
    'Dr Rowan Leith': 'grant',
  },
  38: {
    NARRATOR: 'daniel',
    'Calum Beck': 'george',
    'Leonie Ashford': 'alice',
    'Tessa Rowntree': 'jessie',
    'Professor Iona Kerr': 'matilda',
    'Soraya Linn': 'claire',
    'Ben Okoro': 'will',
    'Professor Maeve Haldane': 'sarah',
  },
  39: {
    NARRATOR: 'daniel',
    'Owen Vale': 'george',
    'Niamh Corbett': 'alice',
    'Harriet Saye': 'jessie',
    'Dr Ruth Nair': 'matilda',
    'Mina Duarte': 'claire',
    'Jacob Pell': 'will',
    'Professor Nia Mercer': 'sarah',
  },
  40: {
    NARRATOR: 'daniel',
    'Amrita Cole': 'alice',
    'Dylan Mercer': 'george',
    'Faye Linden': 'jessie',
    'Dr Helen Shaw': 'matilda',
    'Keira Moss': 'claire',
    'Tomislav Reed': 'will',
    'Professor Evan Marr': 'grant',
  },
};

const argv = process.argv.slice(2);
const has = flag => argv.includes(flag);
const value = flag => has(flag) ? argv[argv.indexOf(flag) + 1] : null;
const setNumber = Number(value('--set'));
assert.ok(Number.isInteger(setNumber) && CASTS[setNumber], '--set must be between 23 and 40');

const planPath = path.join(ROOT, `work/listening-sets22-40/set-${setNumber}/set${setNumber}-audio-production-plan.json`);
const outputDir = path.join(ROOT, `outputs/ielts-production/set-${setNumber}/listening/elevenlabs-v4`);
const manifestPath = path.join(outputDir, `set${setNumber}-eleven-v4-manifest.json`);
const progressPath = path.join(outputDir, `set${setNumber}-eleven-v4-progress.json`);
const masterWavPath = path.join(outputDir, `ielts-set-${setNumber}-listening-eleven-v4-master.wav`);
const masterMp3Path = path.join(outputDir, `ielts-set-${setNumber}-listening-eleven-v4.mp3`);

function sha256(data) {
  return createHash('sha256').update(data).digest('hex');
}

function fileSha(file) {
  return sha256(readFileSync(file));
}

function stableSeed(chunkId) {
  return Number.parseInt(sha256(`ielts-set-${setNumber}:${chunkId}:eleven-v4`).slice(0, 8), 16);
}

function ffmpeg(args, label) {
  const result = spawnSync(FFMPEG, args, { encoding: 'utf8' });
  assert.equal(result.status, 0, `${label} failed: ${result.stderr}`);
  return result;
}

async function apiJson(endpoint, apiKey) {
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const response = await fetch(`${API}${endpoint}`, { headers: { 'xi-api-key': apiKey } });
    if (response.ok) return response.json();
    const detail = (await response.text()).slice(0, 500);
    if (response.status !== 429 || attempt === 6) {
      throw new Error(`${endpoint} failed with HTTP ${response.status}: ${detail}`);
    }
    const retryAfter = Number(response.headers.get('retry-after'));
    const delayMs = Number.isFinite(retryAfter) && retryAfter > 0
      ? Math.ceil(retryAfter * 1_000)
      : 8_000 * attempt;
    await new Promise(resolve => setTimeout(resolve, delayMs));
  }
  throw new Error(`${endpoint} exhausted rate-limit retries`);
}

async function dialogueRequest(manifest, chunk, apiKey) {
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const response = await fetch(`${API}${manifest.endpoint}?output_format=${manifest.outputFormat}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'xi-api-key': apiKey },
      body: JSON.stringify({
        model_id: manifest.modelId,
        language_code: 'en',
        seed: stableSeed(chunk.id),
        apply_text_normalization: 'auto',
        inputs: chunk.inputs.map(input => ({ text: input.text, voice_id: input.voiceId })),
      }),
    });
    if (response.ok) return response;
    const detail = (await response.text()).slice(0, 1_000);
    if (response.status !== 429 || attempt === 6) {
      throw new Error(`${chunk.id} failed with HTTP ${response.status}: ${detail}`);
    }
    const retryAfter = Number(response.headers.get('retry-after'));
    const delayMs = Number.isFinite(retryAfter) && retryAfter > 0
      ? Math.ceil(retryAfter * 1_000)
      : 10_000 * attempt;
    await new Promise(resolve => setTimeout(resolve, delayMs));
  }
  throw new Error(`${chunk.id} exhausted rate-limit retries`);
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

function castFor(speaker) {
  const key = CASTS[setNumber][speaker];
  assert.ok(key, `No approved voice cast for ${speaker}`);
  return VOICES[key];
}

function buildChunks(spokenSegments) {
  const chunks = [];
  let pending = [];
  const flush = () => {
    if (!pending.length) return;
    const index = chunks.length + 1;
    const id = `chunk-${String(index).padStart(2, '0')}`;
    chunks.push({
      id,
      kind: pending.every(segment => segment.kind === 'narrator-cue') ? 'narrator' : 'programme',
      part: pending[0].part,
      segmentIds: pending.map(segment => segment.segment_id),
      billableCharacters: pending.reduce((total, segment) => total + segment.text.length, 0),
      inputs: pending.map(segment => {
        const voice = castFor(segment.speaker);
        return {
          segmentId: segment.segment_id,
          speaker: segment.speaker,
          text: segment.text,
          textSha256: sha256(segment.text),
          voiceId: voice.id,
          voiceName: voice.name,
          gender: voice.gender,
          accent: voice.accent,
        };
      }),
      terminalWindowSeconds: pending.at(-1).window_seconds,
      terminalPauseAfterSeconds: Number(pending.at(-1).pause_after_seconds || 0),
    });
    pending = [];
  };

  for (const segment of spokenSegments) {
    if (segment.kind === 'narrator-cue') {
      flush();
      pending = [segment];
      flush();
      continue;
    }
    const nextCharacters = pending.reduce((total, item) => total + item.text.length, 0) + segment.text.length;
    if (pending.length && (nextCharacters > MAX_REQUEST_CHARACTERS || pending.length >= MAX_REQUEST_TURNS || pending[0].part !== segment.part)) flush();
    pending.push(segment);
  }
  flush();
  return chunks;
}

function buildManifest() {
  const planBytes = readFileSync(planPath);
  const plan = JSON.parse(planBytes);
  const spoken = plan.segments.filter(segment => segment.kind !== 'silence' && String(segment.text || '').trim());
  assert.deepEqual([...new Set(spoken.map(segment => segment.part).filter(Number.isInteger))].sort(), [1, 2, 3, 4], 'Full-set plan must cover Parts 1-4');
  const chunks = buildChunks(spoken);
  for (const chunk of chunks) {
    assert.ok(chunk.billableCharacters <= MAX_REQUEST_CHARACTERS, `${chunk.id} is too large`);
    assert.ok(chunk.inputs.length <= MAX_REQUEST_TURNS, `${chunk.id} has too many turns`);
  }
  const characters = chunks.reduce((total, chunk) => total + chunk.billableCharacters, 0);
  assert.ok(characters >= 15_000, 'Full-set plan is unexpectedly short');
  return {
    schemaVersion: 1,
    artifactType: 'IELTS_ELEVENLABS_V4_FULL_SET_MANIFEST',
    artifactVersion: '1.0.0',
    set: setNumber,
    provider: 'ElevenLabs',
    endpoint: '/v1/text-to-dialogue',
    modelId: 'eleven_v4',
    outputFormat: 'mp3_44100_128',
    sourcePlan: { path: planPath, sha256: sha256(planBytes) },
    casting: CASTS[setNumber],
    chunks,
    billableCharacters: characters,
    expectedCreditsAtPilotRate: Math.ceil(characters * (260 / 1183)),
    budget: { minimumRemainingCredits: CREDIT_RESERVE, stopBeforeExhaustion: true },
    outputs: { wav: masterWavPath, mp3: masterMp3Path },
    gates: { technicalQa: 'PENDING', asr: 'PENDING', humanListening: 'PENDING', release: 'NOT_APPROVED' },
  };
}

function chunkPaths(chunk) {
  const base = path.join(outputDir, 'chunks', chunk.id);
  return { raw: `${base}.mp3`, wav: `${base}.wav` };
}

function wavDuration(file) {
  const bytes = readFileSync(file);
  const dataMarker = bytes.indexOf(Buffer.from('data'));
  assert.ok(dataMarker >= 0, `No data chunk in ${file}`);
  const dataBytes = bytes.readUInt32LE(dataMarker + 4);
  return dataBytes / (44_100 * 2);
}

function prepareChunk(raw, wav) {
  ffmpeg([
    '-y', '-hide_banner', '-loglevel', 'error', '-i', raw,
    '-af', 'silenceremove=start_periods=1:start_silence=0.03:start_threshold=-48dB,areverse,silenceremove=start_periods=1:start_silence=0.03:start_threshold=-48dB,areverse,loudnorm=I=-18:TP=-2.2:LRA=7,afade=t=in:ss=0:d=0.01,areverse,afade=t=in:ss=0:d=0.01,areverse',
    '-ar', '44100', '-ac', '1', '-c:a', 'pcm_s16le', wav,
  ], `prepare ${path.basename(raw)}`);
}

function silenceFile(seconds) {
  const rounded = Math.max(0, Number(seconds.toFixed(3)));
  const file = path.join(outputDir, 'chunks', `silence-${rounded.toFixed(3).replace('.', '_')}.wav`);
  if (!existsSync(file)) {
    ffmpeg(['-y', '-hide_banner', '-loglevel', 'error', '-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=mono', '-t', String(rounded), '-c:a', 'pcm_s16le', file], `silence ${rounded}`);
  }
  return file;
}

function assemble(manifest) {
  const targetSeconds = 1_740;
  const programmeRawSeconds = manifest.chunks
    .filter(chunk => chunk.kind === 'programme')
    .reduce((total, chunk) => total + wavDuration(chunkPaths(chunk).wav), 0);
  const fixedSeconds = manifest.chunks.reduce((total, chunk) => {
    const rawDuration = wavDuration(chunkPaths(chunk).wav);
    if (chunk.kind === 'programme') return total + Math.max(0.25, chunk.terminalPauseAfterSeconds);
    return total + Math.max(rawDuration, Number(chunk.terminalWindowSeconds || 0)) + chunk.terminalPauseAfterSeconds + 4.0;
  }, 0);
  const programmeTempo = Math.min(1.12, Math.max(0.90, programmeRawSeconds / Math.max(1, targetSeconds - fixedSeconds)));
  const baseDurationSeconds = programmeRawSeconds / programmeTempo + fixedSeconds;
  let extraExamPaddingSeconds = Math.max(0, targetSeconds - baseDurationSeconds);
  const examPaddingCapacity = new Map();
  for (const chunk of manifest.chunks) {
    if (chunk.kind !== 'narrator') continue;
    const cue = chunk.inputs.map(input => input.text).join(' ').toLowerCase();
    let capacity = 0;
    if (cue.includes('end of the listening test')) capacity = 110;
    else if (cue.includes('some time to look')) capacity = 26;
    else if (cue.includes('end of part')) capacity = 18;
    else if (cue.includes('hear four recordings')) capacity = 12;
    if (capacity > 0) examPaddingCapacity.set(chunk.id, capacity);
  }
  const totalExamPaddingCapacity = [...examPaddingCapacity.values()].reduce((total, value) => total + value, 0);
  const examPaddingRatio = totalExamPaddingCapacity > 0
    ? Math.min(1, extraExamPaddingSeconds / totalExamPaddingCapacity)
    : 0;
  const extraPaddingByChunk = new Map(
    [...examPaddingCapacity].map(([chunkId, capacity]) => [chunkId, capacity * examPaddingRatio]),
  );
  extraExamPaddingSeconds -= totalExamPaddingCapacity * examPaddingRatio;
  const previewChunkIds = manifest.chunks
    .filter(chunk => chunk.kind === 'narrator' && chunk.inputs.some(input => input.text.toLowerCase().includes('some time to look')))
    .map(chunk => chunk.id);
  if (extraExamPaddingSeconds > 0 && previewChunkIds.length > 0) {
    const perPreview = extraExamPaddingSeconds / previewChunkIds.length;
    for (const chunkId of previewChunkIds) {
      extraPaddingByChunk.set(chunkId, (extraPaddingByChunk.get(chunkId) || 0) + perPreview);
    }
  }
  const concatEntries = [];
  for (const chunk of manifest.chunks) {
    const paths = chunkPaths(chunk);
    assert.ok(existsSync(paths.wav), `Missing prepared chunk ${chunk.id}`);
    let programmePath = paths.wav;
    if (chunk.kind === 'programme') {
      programmePath = paths.wav.replace(/\.wav$/u, '-paced.wav');
      ffmpeg([
        '-y', '-hide_banner', '-loglevel', 'error', '-i', paths.wav,
        '-af', `atempo=${programmeTempo.toFixed(6)}`, '-ar', '44100', '-ac', '1', '-c:a', 'pcm_s16le', programmePath,
      ], `pace ${chunk.id}`);
    }
    concatEntries.push(programmePath);
    const duration = wavDuration(programmePath);
    const basePadding = chunk.terminalWindowSeconds == null
      ? Math.max(0.25, chunk.terminalPauseAfterSeconds)
      : Math.max(0, Number(chunk.terminalWindowSeconds) - duration) + chunk.terminalPauseAfterSeconds + 4.0;
    const padding = basePadding + (extraPaddingByChunk.get(chunk.id) || 0);
    if (padding > 0) concatEntries.push(silenceFile(padding));
  }
  const concatPath = path.join(outputDir, `set${setNumber}-concat.txt`);
  writeFileSync(concatPath, `${concatEntries.map(file => `file '${file.replaceAll("'", "'\\''")}'`).join('\n')}\n`);
  ffmpeg(['-y', '-hide_banner', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', concatPath, '-c:a', 'pcm_s16le', masterWavPath], 'master WAV assembly');
  ffmpeg(['-y', '-hide_banner', '-loglevel', 'error', '-i', masterWavPath, '-c:a', 'libmp3lame', '-b:a', '128k', masterMp3Path], 'master MP3 encode');
  if (existsSync(progressPath)) {
    const progress = JSON.parse(readFileSync(progressPath));
    progress.assembly = {
      targetSeconds,
      programmeTempo: Number(programmeTempo.toFixed(6)),
      addedExamPaddingSeconds: Number([...extraPaddingByChunk.values()].reduce((total, value) => total + value, 0).toFixed(3)),
      durationSeconds: Number(wavDuration(masterWavPath).toFixed(3)),
      updatedAt: new Date().toISOString(),
    };
    writeFileSync(progressPath, `${JSON.stringify(progress, null, 2)}\n`);
  }
}

mkdirSync(path.join(outputDir, 'chunks'), { recursive: true });

if (has('--plan')) {
  const manifest = buildManifest();
  const bytes = Buffer.from(`${JSON.stringify(manifest, null, 2)}\n`);
  writeFileSync(manifestPath, bytes);
  console.log(JSON.stringify({
    manifestPath,
    manifestSha256: sha256(bytes),
    chunks: manifest.chunks.length,
    billableCharacters: manifest.billableCharacters,
    expectedCreditsAtPilotRate: manifest.expectedCreditsAtPilotRate,
  }, null, 2));
  process.exit(0);
}

assert.ok(has('--generate') || has('--assemble'), 'Use --plan, --generate, or --assemble');
assert.ok(existsSync(manifestPath), 'Run --plan first');
assert.equal(value('--approve-manifest'), fileSha(manifestPath), 'Manifest approval hash does not match');
const manifest = JSON.parse(readFileSync(manifestPath));
assert.equal(manifest.sourcePlan.sha256, fileSha(planPath), 'Source plan changed after manifest freeze');

if (has('--generate')) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  assert.ok(apiKey, 'ELEVENLABS_API_KEY is required');
  const prior = existsSync(progressPath) ? JSON.parse(readFileSync(progressPath)) : { completed: [], receipts: [] };
  const completed = new Set(prior.completed || []);
  const runStartAccount = await accountSnapshot(apiKey);
  let localDebits = 0;
  for (const chunk of manifest.chunks) {
    const paths = chunkPaths(chunk);
    if (completed.has(chunk.id) && existsSync(paths.raw) && existsSync(paths.wav)) continue;
    const before = await accountSnapshot(apiKey);
    const guardedEstimate = Math.ceil(chunk.billableCharacters * 0.25);
    const effectiveAvailableCredits = Math.min(before.availableCredits, runStartAccount.availableCredits - localDebits);
    if (effectiveAvailableCredits < guardedEstimate + CREDIT_RESERVE) {
      writeFileSync(progressPath, `${JSON.stringify({ ...prior, status: 'STOPPED_CREDIT_RESERVE', stoppedBefore: chunk.id, account: before, effectiveAvailableCredits, localDebits }, null, 2)}\n`);
      throw new Error(`Credit guard stopped before ${chunk.id}: ${effectiveAvailableCredits} effectively available; ${guardedEstimate + CREDIT_RESERVE} required`);
    }
    const response = await dialogueRequest(manifest, chunk, apiKey);
    const audio = Buffer.from(await response.arrayBuffer());
    assert.ok(audio.length > 1_000, `${chunk.id} returned empty audio`);
    writeFileSync(paths.raw, audio);
    prepareChunk(paths.raw, paths.wav);
    const after = await accountSnapshot(apiKey);
    const receipt = {
      chunkId: chunk.id,
      segmentIds: chunk.segmentIds,
      billableCharacters: chunk.billableCharacters,
      characterCostHeader: Number(response.headers.get('character-cost') || 0),
      requestId: response.headers.get('request-id'),
      rawSha256: sha256(audio),
      preparedSha256: fileSha(paths.wav),
      durationSeconds: Number(wavDuration(paths.wav).toFixed(3)),
      accountBefore: before,
      accountAfter: after,
    };
    localDebits += receipt.characterCostHeader;
    prior.completed = [...completed, chunk.id];
    completed.add(chunk.id);
    prior.receipts = [...(prior.receipts || []).filter(item => item.chunkId !== chunk.id), receipt];
    prior.status = 'IN_PROGRESS';
    prior.updatedAt = new Date().toISOString();
    writeFileSync(progressPath, `${JSON.stringify(prior, null, 2)}\n`);
    console.log(JSON.stringify({ set: setNumber, chunk: chunk.id, completed: completed.size, total: manifest.chunks.length, charged: receipt.characterCostHeader, remaining: after.availableCredits }));
  }
  prior.status = 'AUDIO_CHUNKS_COMPLETE';
  prior.updatedAt = new Date().toISOString();
  writeFileSync(progressPath, `${JSON.stringify(prior, null, 2)}\n`);
}

assemble(manifest);
const finalAccount = has('--generate') ? await accountSnapshot(process.env.ELEVENLABS_API_KEY) : null;
console.log(JSON.stringify({
  set: setNumber,
  status: 'ASSEMBLED',
  wav: { path: masterWavPath, sha256: fileSha(masterWavPath), durationSeconds: Number(wavDuration(masterWavPath).toFixed(3)) },
  mp3: { path: masterMp3Path, sha256: fileSha(masterMp3Path) },
  account: finalAccount,
}, null, 2));
