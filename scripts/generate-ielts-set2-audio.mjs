import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const ts = require('typescript');
const API = 'https://api.elevenlabs.io';
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..');
const sourcePath = path.join(repoRoot, 'src/data/mocks/ielts-set-2.ts');
const casting = JSON.parse(fs.readFileSync(path.join(scriptDir, 'ielts-set2-voice-casting.json'), 'utf8'));
const args = process.argv.slice(2);
const has = flag => args.includes(flag);
const value = flag => has(flag) ? args[args.indexOf(flag) + 1] : null;

function loadMock() {
  const compiled = ts.transpileModule(fs.readFileSync(sourcePath, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    fileName: sourcePath,
  });
  const module = { exports: {} };
  Function('module', 'exports', compiled.outputText)(module, module.exports);
  return module.exports.default;
}

const mock = loadMock();
const sections = mock.sections.filter(section => section.skill === 'listening');
assert.equal(mock.id, 'set-2');
assert.equal(sections.length, 4);

const speakerProfiles = {
  RECEPTIONIST: 'receptionist',
  CUSTOMER: 'customer',
  SARAH: 'student_woman',
  TOM: 'student_man',
};

function speechSegments(section) {
  const defaultProfile = section.part === 2 ? 'adviser' : 'lecturer';
  return section.transcript.trim().split(/\n\s*\n/u).map((paragraph, index) => {
    const match = paragraph.match(/^([A-Z_]+):\s*([\s\S]+)$/u);
    const profile = match ? speakerProfiles[match[1]] : defaultProfile;
    assert.ok(profile, `Unknown speaker in section ${section.part}, paragraph ${index + 1}`);
    return { profile, text: (match?.[2] ?? paragraph).trim(), silenceAfter: match ? 0.38 : 0.5 };
  });
}

const directions = [
  'Section one. You will hear a conversation between a customer and a sports centre receptionist. First, you have thirty seconds to look at questions one to ten.',
  'Section two. You will hear an adviser giving an orientation talk to new university students. First, you have thirty seconds to look at questions eleven to twenty.',
  'Section three. You will hear two students discussing feedback on a renewable energy project. First, you have thirty seconds to look at questions twenty-one to thirty.',
  'Section four. You will hear a lecture about coral reef ecosystems. First, you have thirty seconds to look at questions thirty-one to forty.',
];

const allSegments = sections.flatMap((section, index) => [
  { profile: 'announcer', text: directions[index], silenceAfter: 30 },
  { profile: 'announcer', text: 'Now listen carefully and answer the questions.', silenceAfter: 1.2 },
  ...speechSegments(section),
  {
    profile: 'announcer',
    text: index === 3
      ? 'That is the end of the listening test. You now have two minutes to check your answers.'
      : `That is the end of section ${index + 1}. You now have twenty seconds to check your answers.`,
    silenceAfter: index === 3 ? 120 : 20,
  },
]);

const sourceSha256 = createHash('sha256').update(fs.readFileSync(sourcePath)).digest('hex');
const manifest = {
  contentVersion: casting.content_version,
  sourceSha256,
  modelId: casting.model_id,
  segments: allSegments.map(({ profile, text, silenceAfter }) => ({
    profile,
    textSha256: createHash('sha256').update(text).digest('hex'),
    characters: text.length,
    silenceAfter,
  })),
};
const manifestSha256 = createHash('sha256').update(JSON.stringify(manifest)).digest('hex');
const billableCharacters = allSegments.reduce((sum, segment) => sum + segment.text.length, 0);
const estimatedCredits = Math.ceil(billableCharacters * casting.credits_per_character);
const estimatedUsd = Number((billableCharacters / 1000 * casting.api_price_usd_per_1000_characters).toFixed(4));

function readEnv() {
  const candidates = [path.join(repoRoot, '.env.local'), path.resolve(repoRoot, '../../.env.local')];
  for (const file of candidates) {
    if (!fs.existsSync(file)) continue;
    const entries = fs.readFileSync(file, 'utf8').split('\n').flatMap(line => {
      if (!line.includes('=') || line.trim().startsWith('#')) return [];
      const split = line.indexOf('=');
      return [[line.slice(0, split).trim(), line.slice(split + 1).trim()]];
    });
    const env = Object.fromEntries(entries);
    if (env.ELEVENLABS_API_KEY) return env;
  }
  return {};
}

async function apiJson(endpoint, apiKey) {
  const response = await fetch(`${API}${endpoint}`, { headers: { 'xi-api-key': apiKey } });
  if (!response.ok) throw Error(`${endpoint}: HTTP ${response.status}`);
  return response.json();
}

async function accountStatus(apiKey) {
  const account = await apiJson('/v1/user/subscription', apiKey);
  return {
    tier: account.tier,
    usedCredits: Number(account.character_count),
    creditLimit: Number(account.character_limit),
    availableCredits: Number(account.character_limit) - Number(account.character_count),
    nextResetUnix: account.next_character_count_reset_unix,
  };
}

async function synthesize(apiKey, segment, index, previousText, nextText) {
  const voiceId = casting.profiles[segment.profile].voice_id;
  const query = new URLSearchParams({ output_format: 'mp3_44100_128', enable_logging: 'false' });
  const response = await fetch(`${API}/v1/text-to-speech/${voiceId}?${query}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'xi-api-key': apiKey },
    body: JSON.stringify({
      text: segment.text,
      model_id: casting.model_id,
      voice_settings: casting.voice_settings,
      seed: Number.parseInt(createHash('sha256').update(`${manifestSha256}:${index}`).digest('hex').slice(0, 8), 16),
      ...(previousText ? { previous_text: previousText } : {}),
      ...(nextText ? { next_text: nextText } : {}),
    }),
  });
  if (!response.ok) throw Error(`segment ${index + 1}: HTTP ${response.status}: ${(await response.text()).slice(0, 300)}`);
  return Buffer.from(await response.arrayBuffer());
}

function run(binary, commandArgs) {
  const result = spawnSync(binary, commandArgs, { encoding: 'utf8' });
  assert.equal(result.status, 0, `${binary} failed: ${result.stderr}`);
  return result.stdout;
}

function silenceFile(root, seconds) {
  const target = path.join(root, `silence-${String(seconds).replace('.', '_')}.mp3`);
  if (!fs.existsSync(target)) run('ffmpeg', ['-v', 'error', '-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=mono', '-t', String(seconds), '-b:a', '128k', '-y', target]);
  return target;
}

function assemble(root, speechPaths, outputPath) {
  const ordered = speechPaths.flatMap((speechPath, index) => [speechPath, silenceFile(root, allSegments[index].silenceAfter)]);
  const concatPath = path.join(root, 'concat.txt');
  fs.writeFileSync(concatPath, `${ordered.map(file => `file '${file.replaceAll("'", "'\\''")}'`).join('\n')}\n`);
  const joined = path.join(root, 'joined.mp3');
  run('ffmpeg', ['-v', 'error', '-f', 'concat', '-safe', '0', '-i', concatPath, '-c', 'copy', '-y', joined]);
  run('ffmpeg', ['-v', 'error', '-i', joined, '-af', 'loudnorm=I=-18:TP=-1.5:LRA=11', '-ar', '44100', '-ac', '1', '-b:a', '64k', '-map_metadata', '-1', '-y', outputPath]);
  const probe = JSON.parse(run('ffprobe', ['-v', 'error', '-show_entries', 'format=duration,bit_rate:stream=codec_name,sample_rate,channels', '-of', 'json', outputPath]));
  const duration = Number(probe.format.duration);
  assert.ok(duration >= 1200 && duration <= 1800, `Unexpected final duration: ${duration}`);
  assert.deepEqual(probe.streams, [{ codec_name: 'mp3', sample_rate: '44100', channels: 1 }]);
  return { duration, bitRate: Number(probe.format.bit_rate) };
}

const invoice = {
  contentVersion: casting.content_version,
  manifestSha256,
  sourceSha256,
  segments: allSegments.length,
  spokenWords: sections.reduce((sum, section) => sum + section.transcript.trim().split(/\s+/u).length, 0),
  billableCharacters,
  estimatedCredits,
  estimatedUsdBeforeTax: estimatedUsd,
  casting: Object.fromEntries(Object.entries(casting.profiles).map(([key, profile]) => [key, profile.voice_name])),
  generationAuthorized: false,
};

async function generate() {
  assert.equal(value('--approve-manifest'), manifestSha256, `Pass --approve-manifest ${manifestSha256}`);
  assert.equal(value('--approve-casting'), casting.content_version, `Pass --approve-casting ${casting.content_version}`);
  const cap = Number(value('--max-usd'));
  const reserve = Number(value('--min-remaining-credits'));
  assert.ok(Number.isFinite(cap) && cap > 0 && estimatedUsd <= cap, `Estimated USD ${estimatedUsd} exceeds approved cap ${cap}`);
  assert.ok(Number.isFinite(reserve) && reserve >= 0, 'Pass --min-remaining-credits');
  const apiKey = process.env.ELEVENLABS_API_KEY || readEnv().ELEVENLABS_API_KEY;
  assert.ok(apiKey, 'ELEVENLABS_API_KEY is unavailable');
  const account = await accountStatus(apiKey);
  assert.ok(account.availableCredits >= estimatedCredits + reserve, `Need ${estimatedCredits} credits plus ${reserve} reserve; only ${account.availableCredits} available`);
  const voices = await apiJson('/v1/voices', apiKey);
  const available = new Set((voices.voices ?? []).map(voice => voice.voice_id));
  for (const profile of Object.values(casting.profiles)) assert.ok(available.has(profile.voice_id), `${profile.voice_name} is unavailable`);

  const root = path.join(os.tmpdir(), 'idiomaswl-ielts-set2-audio', manifestSha256);
  const segmentsDir = path.join(root, 'segments');
  fs.mkdirSync(segmentsDir, { recursive: true });
  const speechPaths = [];
  for (const [index, segment] of allSegments.entries()) {
    const target = path.join(segmentsDir, `${String(index + 1).padStart(3, '0')}.mp3`);
    if (!fs.existsSync(target)) {
      const previous = allSegments[index - 1]?.profile === segment.profile ? allSegments[index - 1].text : undefined;
      const next = allSegments[index + 1]?.profile === segment.profile ? allSegments[index + 1].text : undefined;
      fs.writeFileSync(target, await synthesize(apiKey, segment, index, previous, next));
      console.log(`[${index + 1}/${allSegments.length}] ${segment.profile}`);
    }
    speechPaths.push(target);
  }
  const outputPath = path.join(root, 'ielts-listening-set-2-v2.mp3');
  assert.ok(!outputPath.startsWith(path.join(repoRoot, 'public')), 'Generation must not write directly to public');
  const media = assemble(root, speechPaths, outputPath);
  const releaseCandidate = {
    ...invoice,
    generationAuthorized: true,
    approvedMaxUsd: cap,
    protectedCreditReserve: reserve,
    availableCreditsBeforeGeneration: account.availableCredits,
    outputPath,
    outputSha256: createHash('sha256').update(fs.readFileSync(outputPath)).digest('hex'),
    ...media,
    status: 'GENERATED_PENDING_CONTENT_AND_LISTENING_QA',
  };
  fs.writeFileSync(path.join(root, 'generation.json'), `${JSON.stringify(releaseCandidate, null, 2)}\n`);
  console.log(JSON.stringify(releaseCandidate, null, 2));
}

if (has('--account')) {
  const apiKey = process.env.ELEVENLABS_API_KEY || readEnv().ELEVENLABS_API_KEY;
  assert.ok(apiKey, 'ELEVENLABS_API_KEY is unavailable');
  console.log(JSON.stringify(await accountStatus(apiKey), null, 2));
} else if (has('--generate')) {
  await generate();
} else {
  console.log(JSON.stringify({ ...invoice, note: 'Dry run only: no API call, credit spend, audio generation, or production write.' }, null, 2));
}
