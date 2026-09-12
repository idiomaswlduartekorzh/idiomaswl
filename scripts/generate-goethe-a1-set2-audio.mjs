import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const API = 'https://api.elevenlabs.io';
const MODEL_ID = 'eleven_v3';
// Measured on this account by the existing audio harness. The restricted
// production key intentionally has no models_read permission.
// Text-to-Dialogue usage can settle a few seconds after generation. The
// 0.70 ceiling is intentionally above the observed ~0.65 charge so the next
// set is never started unless the whole set can finish.
const CREDIT_MULTIPLIER = 0.70;
const OUTPUT_FORMAT = 'mp3_44100_128';
const generate = process.argv.includes('--generate');
const setNumber = Number(process.argv.find(value => value.startsWith('--set='))?.split('=')[1] ?? 2);
assert.ok(Number.isInteger(setNumber) && setNumber >= 2 && setNumber <= 8, '--set must be a number from 2 to 8');
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..');
const scriptManifest = setNumber === 2
  ? JSON.parse(fs.readFileSync(path.join(repoRoot, 'src/data/mocks/goethe-a1-set-2-audio.json'), 'utf8'))
  : (await import(`../src/data/mocks/goethe-a1-set-${setNumber}.ts`)).audioManifest;
const outputDir = path.join(repoRoot, `public/audio/goethe/a1-${setNumber}`);
const sourceDir = path.join(outputDir, 'voice-sources');
function resolveExecutable(name, explicitPath) {
  const candidates = [
    explicitPath,
    path.join('/private/tmp/wl-goethe-audio-tools', name),
    ...String(process.env.PATH ?? '').split(path.delimiter).filter(Boolean).map(directory => path.join(directory, name)),
  ].filter(Boolean);
  return candidates.find(candidate => fs.existsSync(candidate));
}
const ffmpeg = resolveExecutable('ffmpeg', process.env.FFMPEG_PATH);
const ffprobe = resolveExecutable('ffprobe', process.env.FFPROBE_PATH);
const sampleRate = 44100;
const cueDurationSeconds = 2.1;
const cueTailSeconds = 2.4;
const minimumReserve = Number(process.argv.find(value => value.startsWith('--reserve='))?.split('=')[1] ?? 8000);
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), `wl-goethe-a1-set${setNumber}-`));
let sequence = 0;

const voices = {
  narrator: { id: 'VNHNa6nN6yJdVF3YRyuF', name: 'WL de · Klara' },
  female: { id: 'AnvlJBAqSLDzEevYr9Ap', name: 'WL de · Emma' },
  femaleAlt: { id: 'uvysWDLbKpA4XvpD3GI6', name: 'WL de · Frau Schneider' },
  male: { id: 'IeQubAjK1ujbppIdhJw4', name: 'WL de · Jonas' },
  maleAlt: { id: 'NlRO8ABjJNJNYaRaLiPJ', name: 'WL de · Herr Becker' },
};

function envValue(name) {
  if (process.env[name]) return process.env[name];
  const envPaths = [
    path.join(repoRoot, '.env.local'),
    path.join(repoRoot, '../handoff-local/continuidad/ielts-harness/worktree/.env.local'),
  ];
  for (const envPath of envPaths) {
    if (!fs.existsSync(envPath)) continue;
    const match = fs.readFileSync(envPath, 'utf8').split(/\r?\n/).find(line => line.startsWith(`${name}=`));
    if (match) return match.slice(name.length + 1).trim().replace(/^(['"])(.*)\1$/, '$2');
  }
  return undefined;
}

function selectedVoice(role, number = 0) {
  if (role === 'announcer') return voices.femaleAlt;
  if (role === 'female') return number % 2 === 0 ? voices.femaleAlt : voices.female;
  if (role === 'male') return number % 2 === 0 ? voices.maleAlt : voices.male;
  return voices.narrator;
}

function inputsForTurns(turns, number = 0) {
  return turns.map(turn => ({ text: turn.text, voice_id: selectedVoice(turn.voice, number).id }));
}

const jobs = [];
for (const part of scriptManifest.parts) {
  jobs.push({ name: `intro0${part.id}.mp3`, inputs: [{ text: part.intro, voice_id: voices.narrator.id }] });
  if (part.example) jobs.push({ name: `example0${part.id}.mp3`, inputs: inputsForTurns(part.example.turns, 0) });
  for (const item of part.items) {
    jobs.push({
      name: `item${String(item.number).padStart(2, '0')}.mp3`,
      inputs: [
        ...(part.id === 1 ? [] : [{ text: `Nummer ${item.number}.`, voice_id: voices.narrator.id }]),
        ...inputsForTurns(item.turns, item.number),
      ],
    });
  }
}
jobs.push({ name: 'label-example.mp3', inputs: [{ text: 'Beispiel.', voice_id: voices.narrator.id }] });
for (let number = 1; number <= 6; number += 1) jobs.push({ name: `label0${number}.mp3`, inputs: [{ text: `Nummer ${number}.`, voice_id: voices.narrator.id }] });
jobs.push({ name: 'outro.mp3', inputs: [{ text: scriptManifest.parts.find(part => part.id === 3).outro, voice_id: voices.narrator.id }] });

const totalCharacters = jobs.flatMap(job => job.inputs).reduce((sum, input) => sum + input.text.length, 0);
const manifestHash = createHash('sha256').update(JSON.stringify(jobs)).digest('hex').slice(0, 16);
assert.equal(jobs.length, 28, 'expected 28 natural source clips');
assert.ok(jobs.every(job => job.inputs.reduce((sum, input) => sum + input.text.length, 0) <= 2000), 'a dialogue request exceeds the reliable 2,000-character limit');
assert.ok(Number.isFinite(minimumReserve) && minimumReserve >= 0, 'reserve must be a non-negative number');

console.log(`Goethe A1 Set ${setNumber} · audio production manifest`);
console.log(`  jobs: ${jobs.length} source clips`);
console.log(`  characters: ${totalCharacters}`);
console.log(`  model: ${MODEL_ID} · ${OUTPUT_FORMAT}`);
console.log(`  voices: ${Object.values(voices).map(voice => voice.name).join(' · ')}`);
console.log(`  manifest: ${manifestHash}`);
console.log(`  protected reserve: ${minimumReserve} credits`);

if (!generate) {
  console.log('  dry run: 0 credits consumed; add --generate after editorial approval');
  fs.rmSync(tempDir, { recursive: true, force: true });
  process.exit(0);
}

if (setNumber !== 2) assert.equal(scriptManifest.status, 'script-ready-audio-blocked', 'audio script must remain explicitly gated before generation');
assert.ok(ffmpeg && ffprobe, 'approved ffmpeg/ffprobe toolchain is unavailable');

async function apiJson(endpoint, apiKey) {
  const response = await fetch(`${API}${endpoint}`, { headers: { 'xi-api-key': apiKey } });
  if (!response.ok) throw new Error(`${endpoint} failed with HTTP ${response.status}: ${await response.text()}`);
  return response.json();
}

const apiKey = envValue('ELEVENLABS_API_KEY');
assert.ok(apiKey, 'ELEVENLABS_API_KEY is required and is never committed');
const [voiceList, subscription] = await Promise.all([
  apiJson('/v2/voices?page_size=100', apiKey), apiJson('/v1/user/subscription', apiKey),
]);
const pendingJobs = jobs.filter(job => {
  const destination = path.join(sourceDir, job.name);
  return !fs.existsSync(destination) || fs.statSync(destination).size <= 10_000;
});
const billableCharacters = pendingJobs.flatMap(job => job.inputs).reduce((sum, input) => sum + input.text.length, 0);
const estimatedCredits = Math.ceil(billableCharacters * CREDIT_MULTIPLIER);
const availableCredits = Number(subscription.character_limit) - Number(subscription.character_count);
assert.ok(Number.isFinite(availableCredits) && availableCredits >= 0, 'unable to calculate available credits');
assert.ok(availableCredits - estimatedCredits >= minimumReserve, `estimated ${estimatedCredits} credits would leave less than the protected ${minimumReserve}-credit reserve`);
const availableVoiceIds = new Set((voiceList.voices ?? []).map(voice => voice.voice_id));
for (const voice of Object.values(voices)) assert.ok(availableVoiceIds.has(voice.id), `${voice.name} is unavailable`);
console.log(`  preflight: ${availableCredits} available · ${billableCharacters} billable characters · about ${estimatedCredits} needed · reserve stays above ${minimumReserve}`);

fs.mkdirSync(sourceDir, { recursive: true });
for (let index = 0; index < jobs.length; index += 1) {
  const job = jobs[index];
  const destination = path.join(sourceDir, job.name);
  if (fs.existsSync(destination) && fs.statSync(destination).size > 10_000) {
    console.log(`  skip ${job.name}: existing source`);
    continue;
  }
  const query = new URLSearchParams({ output_format: OUTPUT_FORMAT });
  const response = await fetch(`${API}/v1/text-to-dialogue?${query}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'xi-api-key': apiKey },
    body: JSON.stringify({
      inputs: job.inputs,
      model_id: MODEL_ID,
      language_code: 'de',
      seed: Number.parseInt(createHash('sha256').update(`${manifestHash}:${job.name}`).digest('hex').slice(0, 8), 16),
      apply_text_normalization: 'on',
    }),
  });
  if (!response.ok) throw new Error(`${job.name}: ElevenLabs HTTP ${response.status}: ${await response.text()}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  assert.ok(bytes.length > 10_000, `${job.name}: response is unexpectedly small`);
  fs.writeFileSync(destination, bytes);
  console.log(`  generated ${index + 1}/${jobs.length}: ${job.name} · ${Math.round(bytes.length / 1024)} KB`);
}

function run(binary, args) {
  execFileSync(binary, args, { stdio: ['ignore', 'ignore', 'inherit'] });
}

function nextFile(prefix, extension = 'wav') {
  sequence += 1;
  return path.join(tempDir, `${String(sequence).padStart(4, '0')}-${prefix}.${extension}`);
}

function sourceWav(name) {
  const source = path.join(sourceDir, name);
  assert.ok(fs.existsSync(source), `missing natural source: ${name}`);
  const wav = nextFile(path.parse(name).name);
  run(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', '-i', source, '-ar', String(sampleRate), '-ac', '1', '-c:a', 'pcm_s16le', wav]);
  return wav;
}

const silenceCache = new Map();
function silence(seconds) {
  const key = String(seconds);
  if (silenceCache.has(key)) return silenceCache.get(key);
  const wav = nextFile(`silence-${key.replace('.', '_')}`);
  run(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', '-f', 'lavfi', '-i', `anullsrc=r=${sampleRate}:cl=mono`, '-t', key, '-c:a', 'pcm_s16le', wav]);
  silenceCache.set(key, wav);
  return wav;
}

let acousticCue;
function signal() {
  if (acousticCue) return acousticCue;
  acousticCue = nextFile('exam-signal');
  run(ffmpeg, [
    '-hide_banner', '-loglevel', 'error', '-y',
    '-f', 'lavfi', '-i', `sine=frequency=990:sample_rate=${sampleRate}:duration=0.78`,
    '-f', 'lavfi', '-i', `sine=frequency=831:sample_rate=${sampleRate}:duration=0.72`,
    '-f', 'lavfi', '-i', `sine=frequency=698:sample_rate=${sampleRate}:duration=0.60`,
    '-filter_complex', '[0:a]volume=0.105,afade=t=in:st=0:d=0.02,afade=t=out:st=0.68:d=0.10[a0];[1:a]volume=0.10,afade=t=in:st=0:d=0.02,afade=t=out:st=0.62:d=0.10[a1];[2:a]volume=0.095,afade=t=in:st=0:d=0.02,afade=t=out:st=0.48:d=0.12[a2];[a0][a1][a2]concat=n=3:v=0:a=1[out]',
    '-map', '[out]', '-ar', String(sampleRate), '-ac', '1', '-c:a', 'pcm_s16le', acousticCue,
  ]);
  return acousticCue;
}

function cueWindow(seconds) {
  const leadSeconds = Number((seconds - cueDurationSeconds - cueTailSeconds).toFixed(2));
  assert.ok(leadSeconds >= 0, `cue window ${seconds}s is too short`);
  return [silence(leadSeconds), signal(), silence(cueTailSeconds)];
}

function concatWav(files, output) {
  const list = nextFile('concat', 'txt');
  fs.writeFileSync(list, `${files.map(file => `file '${file.replaceAll("'", "'\\''")}'`).join('\n')}\n`);
  run(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', list, '-ar', String(sampleRate), '-ac', '1', '-c:a', 'pcm_s16le', output]);
}

function encodeMp3(wav, output) {
  run(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', '-i', wav, '-af', 'loudnorm=I=-18:TP=-2:LRA=7', '-ar', '44100', '-ac', '1', '-b:a', '64k', output]);
}

function itemSequence(itemNumber, plays) {
  const padded = String(itemNumber).padStart(2, '0');
  const stimulus = sourceWav(`item${padded}.mp3`);
  const files = [];
  if (itemNumber <= 6) files.push(sourceWav(`label${padded}.mp3`));
  files.push(...cueWindow(15), stimulus);
  if (plays === 2) files.push(...cueWindow(6), stimulus);
  files.push(silence(7));
  const out = nextFile(`item-sequence-${padded}`);
  concatWav(files, out);
  encodeMp3(stimulus, path.join(outputDir, `item-${padded}.mp3`));
  return out;
}

function buildPart(part) {
  const files = [sourceWav(`intro0${part.id}.mp3`), silence(4)];
  if (part.id === 1) {
    const example = sourceWav('example01.mp3');
    files.push(sourceWav('label-example.mp3'), ...cueWindow(8), example, ...cueWindow(5), example, silence(6));
  } else if (part.id === 2) {
    files.push(sourceWav('example02.mp3'), silence(6));
  }
  part.items.forEach(item => files.push(itemSequence(item.number, part.plays)));
  if (part.outro) files.push(sourceWav('outro.mp3'), silence(180));
  const wav = nextFile(`part-${part.id}`);
  concatWav(files, wav);
  encodeMp3(wav, path.join(outputDir, `hoeren-teil${part.id}.mp3`));
  return wav;
}

try {
  const partWavs = scriptManifest.parts.map(buildPart);
  const complete = nextFile('complete');
  concatWav(partWavs.flatMap((part, index) => index === partWavs.length - 1 ? [part] : [part, silence(2)]), complete);
  encodeMp3(complete, path.join(outputDir, 'hoeren-komplett.mp3'));
  const expectedNames = ['hoeren-komplett.mp3', 'hoeren-teil1.mp3', 'hoeren-teil2.mp3', 'hoeren-teil3.mp3', ...Array.from({ length: 15 }, (_, index) => `item-${String(index + 1).padStart(2, '0')}.mp3`)];
  const outputs = expectedNames.sort().map(name => {
    const file = path.join(outputDir, name);
    const duration = Number(execFileSync(ffprobe, ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', file], { encoding: 'utf8' }).trim());
    return { file: `public/audio/goethe/a1-${setNumber}/${name}`, durationSeconds: Number(duration.toFixed(3)), bytes: fs.statSync(file).size };
  });
  const after = await apiJson('/v1/user/subscription', apiKey);
  const afterRemaining = Number(after.character_limit) - Number(after.character_count);
  fs.writeFileSync(path.join(outputDir, 'manifest.json'), `${JSON.stringify({
    sourceVersion: scriptManifest.version,
    sourceManifestHash: manifestHash,
    generatedWith: 'ElevenLabs Text to Dialogue · eleven_v3 · ffmpeg assembly',
    voiceCast: Object.fromEntries(Object.entries(voices).map(([role, voice]) => [role, voice.name])),
    credits: { before: availableCredits, after: afterRemaining, charged: availableCredits - afterRemaining },
    acousticCue: { kind: 'WeLearn synthetic descending three-tone exam signal', frequenciesHz: [990, 831, 698], durationSeconds: cueDurationSeconds, cueCount: 28, placement: 'before every scored playback and both Teil 1 example playbacks' },
    outputs,
  }, null, 2)}\n`);
  console.log(`  complete: ${(outputs.find(output => output.file.endsWith('/hoeren-komplett.mp3')).durationSeconds / 60).toFixed(2)} minutes`);
  console.log(`  charged: ${availableCredits - afterRemaining} credits · remaining: ${afterRemaining}`);
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
