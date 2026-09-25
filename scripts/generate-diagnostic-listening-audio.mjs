import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import casting from '../config/diagnostic/english-listening-voice-casting.json' with { type: 'json' };
import { ENGLISH_DIAGNOSTIC_LISTENING_ADVANCED_PRODUCTION_BRIEFS } from '../src/server/diagnostic/bank/listening-production-advanced.en.ts';
import { ENGLISH_DIAGNOSTIC_LISTENING_LOWER_PRODUCTION_BRIEFS } from '../src/server/diagnostic/bank/listening-production-lower.en.ts';
import { ENGLISH_DIAGNOSTIC_LISTENING_MID_PRODUCTION_BRIEFS } from '../src/server/diagnostic/bank/listening-production-mid.en.ts';
import { buildDiagnosticListeningProductionPackage } from './lib/diagnostic-listening-production.mjs';

const API = 'https://api.elevenlabs.io';
const repoRoot = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const privateRoot = path.join(repoRoot, '.diagnostic-private');
const args = process.argv.slice(2);
const has = flag => args.includes(flag);
const value = flag => {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : null;
};
const sha256 = valueToHash => createHash('sha256').update(valueToHash).digest('hex');
const allBriefs = [
  ...ENGLISH_DIAGNOSTIC_LISTENING_LOWER_PRODUCTION_BRIEFS,
  ...ENGLISH_DIAGNOSTIC_LISTENING_MID_PRODUCTION_BRIEFS,
  ...ENGLISH_DIAGNOSTIC_LISTENING_ADVANCED_PRODUCTION_BRIEFS,
];
export const DIAGNOSTIC_A1_AUDIO_PILOT_MEDIA_IDS = [
  'en-a1-listening-original-01',
  'en-a1-listening-original-02',
  'en-a1-listening-original-04',
];
export const DIAGNOSTIC_A1_AUDIO_PILOT_MAX_CREDIT_DEBIT = 1_424;

export function diagnosticListeningAudioInvoice(briefs) {
  const productionPackage = buildDiagnosticListeningProductionPackage(briefs);
  const requestSegments = briefs.reduce((sum, brief) => sum + brief.recording.turns.length, 0);
  const billableCharacters = briefs.reduce((sum, brief) =>
    sum + brief.recording.turns.reduce((turnSum, turn) => turnSum + turn.text.length, 0), 0);
  const profiles = [...new Set(briefs.flatMap(brief => brief.recording.turns.map(turn =>
    turn.speaker === 'narrator'
      ? (Number.parseInt(sha256(brief.id).slice(0, 2), 16) % 2 ? 'narrator_a' : 'narrator_b')
      : turn.speaker.replace('-', '_'))))].sort();
  return {
    packageSha256: productionPackage.packageSha256,
    files: briefs.length,
    requestSegments,
    billableCharacters,
    estimatedMaximumCreditDebit: Math.ceil(billableCharacters * casting.creditSafetyMultiplier),
    modelId: casting.modelId,
    profiles,
    unresolvedProfiles: profiles.filter(profile => !casting.profiles[profile]?.voiceId),
    unapprovedProfiles: profiles.filter(profile => casting.profiles[profile]?.approval !== 'approved_by_owner'),
    generationAuthorized: false,
  };
}

function selectedBriefs() {
  const requestedLevels = value('--levels')?.split(',').map(level => level.trim().toUpperCase()).filter(Boolean) ?? [];
  const requestedMedia = value('--media-ids')?.split(',').map(mediaId => mediaId.trim()).filter(Boolean) ?? [];
  const pilotA1 = has('--pilot-a1');
  if (requestedLevels.length) {
    assert.ok(requestedLevels.every(level => ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].includes(level)), 'invalid --levels selection');
  }
  if (requestedMedia.length) {
    const known = new Set(allBriefs.map(brief => brief.id));
    assert.ok(requestedMedia.every(mediaId => known.has(mediaId)), 'invalid --media-ids selection');
  }
  assert.ok(Number(Boolean(requestedLevels.length)) + Number(Boolean(requestedMedia.length)) + Number(pilotA1) <= 1,
    'choose one selection mode: --pilot-a1, --levels or --media-ids');
  if (pilotA1) return allBriefs.filter(brief => DIAGNOSTIC_A1_AUDIO_PILOT_MEDIA_IDS.includes(brief.id));
  if (requestedMedia.length) return allBriefs.filter(brief => requestedMedia.includes(brief.id));
  if (requestedLevels.length) return allBriefs.filter(brief => requestedLevels.includes(brief.level));
  return allBriefs;
}

function isDiagnosticA1PilotSelection(briefs) {
  return briefs.length === DIAGNOSTIC_A1_AUDIO_PILOT_MEDIA_IDS.length
    && briefs.every((brief, index) => brief.id === DIAGNOSTIC_A1_AUDIO_PILOT_MEDIA_IDS[index]);
}

export function diagnosticA1AudioPilotAuthorization(invoice) {
  assert.equal(invoice.files, 3, 'A1 audio pilot must contain exactly three files');
  assert.equal(invoice.billableCharacters, 712, 'A1 audio pilot character invoice changed');
  assert.equal(invoice.estimatedMaximumCreditDebit, DIAGNOSTIC_A1_AUDIO_PILOT_MAX_CREDIT_DEBIT,
    'A1 audio pilot exceeds or changed its approved credit envelope');
  return `GENERATE_DIAGNOSTIC_A1_AUDIO_PILOT:${invoice.packageSha256}:FILES_3:MAX_CREDITS_${DIAGNOSTIC_A1_AUDIO_PILOT_MAX_CREDIT_DEBIT}`;
}

function profileFor(brief, turn) {
  if (turn.speaker !== 'narrator') return turn.speaker.replace('-', '_');
  return Number.parseInt(sha256(brief.id).slice(0, 2), 16) % 2 ? 'narrator_a' : 'narrator_b';
}

function probeDuration(filePath) {
  const result = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', filePath], { encoding: 'utf8' });
  assert.equal(result.status, 0, `ffprobe failed for ${filePath}: ${result.stderr}`);
  const duration = Number(result.stdout.trim());
  assert.ok(Number.isFinite(duration) && duration > 0, `invalid duration for ${filePath}`);
  return duration;
}

function assembleSegments(segmentPaths, targetPath) {
  const inputArgs = [];
  const labels = [];
  let inputIndex = 0;
  segmentPaths.forEach((segmentPath, index) => {
    inputArgs.push('-i', segmentPath);
    labels.push(`[${inputIndex}:a]`);
    inputIndex += 1;
    if (index < segmentPaths.length - 1) {
      inputArgs.push('-f', 'lavfi', '-t', String(casting.target.turnPauseSeconds), '-i', 'anullsrc=r=44100:cl=mono');
      labels.push(`[${inputIndex}:a]`);
      inputIndex += 1;
    }
  });
  const temporaryPath = `${targetPath}.temporary.mp3`;
  const filter = `${labels.join('')}concat=n=${labels.length}:v=0:a=1[joined];[joined]loudnorm=I=${casting.target.integratedLoudnessLufs}:LRA=7:TP=${casting.target.maxTruePeakDbfs}[out]`;
  const result = spawnSync('ffmpeg', [
    '-y', '-hide_banner', '-loglevel', 'error', ...inputArgs,
    '-filter_complex', filter, '-map', '[out]', '-vn', '-ar', String(casting.target.sampleRateHz),
    '-ac', String(casting.target.channels), '-b:a', casting.target.bitrate, temporaryPath,
  ], { encoding: 'utf8' });
  if (result.status !== 0) throw new Error(`ffmpeg failed for ${targetPath}: ${result.stderr}`);
  renameSync(temporaryPath, targetPath);
}

async function apiJson(endpoint, apiKey) {
  const response = await fetch(`${API}${endpoint}`, { headers: { 'xi-api-key': apiKey } });
  if (!response.ok) throw new Error(`${endpoint} failed with HTTP ${response.status}: ${await response.text()}`);
  return response.json();
}

async function synthesize(brief, turn, segmentIndex, apiKey, seedSalt) {
  const profile = profileFor(brief, turn);
  const voiceId = casting.profiles[profile].voiceId;
  const response = await fetch(`${API}/v1/text-to-speech/${voiceId}?output_format=${casting.outputFormat}&enable_logging=false`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'xi-api-key': apiKey },
    body: JSON.stringify({
      text: turn.text,
      model_id: casting.modelId,
      seed: Number.parseInt(sha256(`${brief.id}:${segmentIndex}:${seedSalt}`).slice(0, 8), 16),
    }),
  });
  if (!response.ok) throw new Error(`${brief.id} segment ${segmentIndex + 1} failed with HTTP ${response.status}: ${await response.text()}`);
  return Buffer.from(await response.arrayBuffer());
}

async function generate(briefs) {
  assert.ok(briefs.length > 0, 'generation selection is empty');
  const invoice = diagnosticListeningAudioInvoice(briefs);
  assert.equal(value('--approve-package'), invoice.packageSha256, `pass --approve-package ${invoice.packageSha256}`);
  const isA1Pilot = isDiagnosticA1PilotSelection(briefs);
  if (isA1Pilot) {
    const authorization = diagnosticA1AudioPilotAuthorization(invoice);
    assert.equal(value('--authorize-pilot'), authorization, `pass --authorize-pilot ${authorization}`);
  }
  assert.deepEqual(invoice.unresolvedProfiles, [], 'every used profile needs a voiceId');
  assert.deepEqual(invoice.unapprovedProfiles, [], 'every used profile needs approval=approved_by_owner');
  const maxCharacters = Number(value('--max-billable-characters'));
  assert.ok(Number.isInteger(maxCharacters) && maxCharacters >= invoice.billableCharacters, `pass --max-billable-characters of at least ${invoice.billableCharacters}`);
  const protectedReserve = Number(value('--min-remaining-credits'));
  assert.ok(Number.isInteger(protectedReserve) && protectedReserve >= 0, 'pass a non-negative --min-remaining-credits');
  const maximumCreditDebit = Number(value('--max-credit-debit'));
  assert.ok(Number.isInteger(maximumCreditDebit) && maximumCreditDebit >= invoice.estimatedMaximumCreditDebit,
    `pass --max-credit-debit of at least ${invoice.estimatedMaximumCreditDebit}`);
  if (isA1Pilot) {
    assert.equal(maxCharacters, invoice.billableCharacters,
      `A1 pilot requires --max-billable-characters ${invoice.billableCharacters}`);
    assert.equal(maximumCreditDebit, DIAGNOSTIC_A1_AUDIO_PILOT_MAX_CREDIT_DEBIT,
      `A1 pilot requires --max-credit-debit ${DIAGNOSTIC_A1_AUDIO_PILOT_MAX_CREDIT_DEBIT}`);
  }
  const seedSalt = value('--seed-salt');
  assert.ok(seedSalt && seedSalt.length >= 8, 'pass a --seed-salt with at least eight characters');
  const apiKey = process.env.ELEVENLABS_API_KEY;
  assert.ok(apiKey, 'ELEVENLABS_API_KEY is required only with --generate');
  assert.equal(spawnSync('ffmpeg', ['-version'], { encoding: 'utf8' }).status, 0, 'ffmpeg is required');
  const [subscription, voicesPayload] = await Promise.all([
    apiJson('/v1/user/subscription', apiKey),
    apiJson('/v1/voices', apiKey),
  ]);
  const remainingCredits = Number(subscription.character_limit) - Number(subscription.character_count);
  assert.ok(Number.isFinite(remainingCredits) && remainingCredits >= maximumCreditDebit + protectedReserve,
    `generation permits up to ${maximumCreditDebit} credits plus ${protectedReserve} protected credits; ${remainingCredits} remain`);
  const availableVoiceIds = new Set((voicesPayload.voices ?? []).map(voice => voice.voice_id));
  for (const profile of invoice.profiles) assert.ok(availableVoiceIds.has(casting.profiles[profile].voiceId), `${profile} voice is unavailable`);

  const outputRoot = path.join(privateRoot, 'generated-listening', invoice.packageSha256.slice(0, 16));
  assert.ok(!existsSync(outputRoot), `refusing to overwrite ${outputRoot}`);
  mkdirSync(outputRoot, { recursive: true });
  const generated = [];
  for (const brief of briefs) {
    const mediaRoot = path.join(outputRoot, brief.id);
    const segmentsRoot = path.join(mediaRoot, '.segments');
    mkdirSync(segmentsRoot, { recursive: true });
    const segmentPaths = [];
    for (const [segmentIndex, turn] of brief.recording.turns.entries()) {
      const bytes = await synthesize(brief, turn, segmentIndex, apiKey, seedSalt);
      const segmentPath = path.join(segmentsRoot, `${String(segmentIndex + 1).padStart(2, '0')}.mp3`);
      writeFileSync(segmentPath, bytes);
      segmentPaths.push(segmentPath);
    }
    const audioPath = path.join(mediaRoot, `${brief.id}.mp3`);
    assembleSegments(segmentPaths, audioPath);
    const audio = readFileSync(audioPath);
    const durationSeconds = Number(probeDuration(audioPath).toFixed(3));
    const [minimumDuration, maximumDuration] = brief.recording.targetDurationSeconds;
    generated.push({
      mediaId: brief.id, productionVersion: brief.productionVersion, audioPath,
      audioSha256: sha256(audio),
      transcriptSha256: buildDiagnosticListeningProductionPackage([brief]).media[0].transcriptSha256,
      durationSeconds,
      durationAccepted: durationSeconds >= minimumDuration && durationSeconds <= maximumDuration,
      status: 'generated-private-pending-independent-transcript-and-alignment-review',
    });
  }
  const endingSubscription = await apiJson('/v1/user/subscription', apiKey);
  const endingCredits = Number(endingSubscription.character_limit) - Number(endingSubscription.character_count);
  const actualCreditDebit = remainingCredits - endingCredits;
  writeFileSync(path.join(outputRoot, 'generation-log.json'), `${JSON.stringify({
    generatedAt: new Date().toISOString(), castingVersion: casting.castingVersion,
    packageSha256: invoice.packageSha256, invoice, approvedMaximumCreditDebit: maximumCreditDebit,
    remainingCreditsBefore: remainingCredits, remainingCreditsAfter: endingCredits, actualCreditDebit, generated,
  }, null, 2)}\n`);
  assert.ok(Number.isFinite(actualCreditDebit) && actualCreditDebit >= 0 && actualCreditDebit <= maximumCreditDebit,
    `actual credit debit ${actualCreditDebit} exceeded approved ceiling ${maximumCreditDebit}`);
  assert.ok(endingCredits >= protectedReserve, `generation breached the protected reserve of ${protectedReserve} credits`);
  if (generated.some(file => !file.durationAccepted)) {
    throw new Error(`generated audio remains private: ${generated.filter(file => !file.durationAccepted).length} files fall outside duration envelopes`);
  }
  process.stdout.write(`${JSON.stringify({ outputRoot, files: generated.length, actualCreditDebit, status: 'private-pending-human-qa' }, null, 2)}\n`);
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const briefs = selectedBriefs();
  if (has('--generate')) {
    await generate(briefs);
  } else {
    const invoice = diagnosticListeningAudioInvoice(briefs);
    const isA1Pilot = isDiagnosticA1PilotSelection(briefs);
    process.stdout.write(`${JSON.stringify({
      ...invoice,
      selectionScope: isA1Pilot ? 'diagnostic-a1-audio-pilot-v1' : 'custom-or-full',
      authorizationPhrase: isA1Pilot ? diagnosticA1AudioPilotAuthorization(invoice) : null,
      note: 'Dry run only. No API call, secret read, credit spend or audio write occurred.',
    }, null, 2)}\n`);
  }
}
