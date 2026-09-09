import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..');
const scriptManifest = JSON.parse(fs.readFileSync(path.join(repoRoot, 'src/data/mocks/goethe-a1-set-1-audio.json'), 'utf8'));
const outputDir = path.join(repoRoot, 'public/audio/goethe/a1-1');
const sourceDir = path.join(outputDir, 'voice-sources');
const ffmpeg = '/Users/ddev/Documents/ChatGPT/IdiomasWL/handoff-local/continuidad/ielts-harness/worktree/output/tools/bin/ffmpeg';
const ffprobe = '/Users/ddev/Documents/ChatGPT/IdiomasWL/handoff-local/continuidad/ielts-harness/worktree/output/tools/bin/ffprobe';
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'wl-goethe-a1-natural-'));
const sampleRate = 44100;
const cueDurationSeconds = 2.1;
const cueTailSeconds = 2.4;
let sequence = 0;

fs.mkdirSync(outputDir, { recursive: true });

function run(binary, args) {
  execFileSync(binary, args, { stdio: ['ignore', 'ignore', 'inherit'] });
}

function nextFile(prefix, extension = 'wav') {
  sequence += 1;
  return path.join(tempDir, `${String(sequence).padStart(4, '0')}-${prefix}.${extension}`);
}

function sourceWav(name) {
  const source = path.join(sourceDir, name);
  if (!fs.existsSync(source)) throw new Error(`Falta fuente de voz natural: ${source}`);
  const wav = nextFile(path.parse(name).name);
  run(ffmpeg, [
    '-hide_banner', '-loglevel', 'error', '-y', '-i', source,
    '-ar', String(sampleRate), '-ac', '1', '-c:a', 'pcm_s16le', wav,
  ]);
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
    '-filter_complex',
    '[0:a]volume=0.105,afade=t=in:st=0:d=0.02,afade=t=out:st=0.68:d=0.10[a0];' +
      '[1:a]volume=0.10,afade=t=in:st=0:d=0.02,afade=t=out:st=0.62:d=0.10[a1];' +
      '[2:a]volume=0.095,afade=t=in:st=0:d=0.02,afade=t=out:st=0.48:d=0.12[a2];' +
      '[a0][a1][a2]concat=n=3:v=0:a=1[out]',
    '-map', '[out]', '-ar', String(sampleRate), '-ac', '1', '-c:a', 'pcm_s16le', acousticCue,
  ]);
  return acousticCue;
}

function cueWindow(seconds) {
  const leadSeconds = Number((seconds - cueDurationSeconds - cueTailSeconds).toFixed(2));
  if (leadSeconds < 0) throw new Error(`La ventana de ${seconds}s es demasiado corta para la señal acústica.`);
  return [silence(leadSeconds), signal(), silence(cueTailSeconds)];
}

function concatWav(files, output) {
  const list = nextFile('concat', 'txt');
  fs.writeFileSync(list, `${files.map(file => `file '${file.replaceAll("'", "'\\''")}'`).join('\n')}\n`);
  run(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', list, '-ar', String(sampleRate), '-ac', '1', '-c:a', 'pcm_s16le', output]);
}

function encodeMp3(wav, output) {
  run(ffmpeg, [
    '-hide_banner', '-loglevel', 'error', '-y', '-i', wav,
    '-af', 'loudnorm=I=-18:TP=-2:LRA=7', '-ar', '44100', '-ac', '1', '-b:a', '64k', output,
  ]);
}

function itemSequence(itemNumber, plays) {
  const padded = String(itemNumber).padStart(2, '0');
  const stimulus = sourceWav(`item${padded}.mp3`);
  const files = [];

  // Teil 1 uses a separate neutral narrator. The sources for Teil 2 and Teil 3
  // already start with “Nummer …” in the same natural recording.
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

  const expectedNames = [
    'hoeren-komplett.mp3', 'hoeren-teil1.mp3', 'hoeren-teil2.mp3', 'hoeren-teil3.mp3',
    ...Array.from({ length: 15 }, (_, index) => `item-${String(index + 1).padStart(2, '0')}.mp3`),
  ];
  const outputs = expectedNames.sort().map(name => {
    const file = path.join(outputDir, name);
    const duration = Number(execFileSync(ffprobe, ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', file], { encoding: 'utf8' }).trim());
    return { file: `public/audio/goethe/a1-1/${name}`, durationSeconds: Number(duration.toFixed(3)), bytes: fs.statSync(file).size };
  });
  fs.writeFileSync(path.join(outputDir, 'manifest.json'), `${JSON.stringify({
    sourceVersion: scriptManifest.version,
    generatedWith: 'ElevenLabs v3 · WeLearn German custom voices · ffmpeg assembly',
    voiceCast: {
      narrator: 'WL de · Klara',
      female: ['WL de · Emma', 'WL de · Frau Schneider'],
      male: ['WL de · Jonas', 'WL de · Herr Becker'],
    },
    acousticCue: {
      kind: 'WeLearn synthetic descending three-tone exam signal',
      frequenciesHz: [990, 831, 698],
      durationSeconds: cueDurationSeconds,
      cueCount: 28,
      placement: 'before every scored playback and both Teil 1 example playbacks',
    },
    outputs,
  }, null, 2)}\n`);
  console.log(JSON.stringify(outputs, null, 2));
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
