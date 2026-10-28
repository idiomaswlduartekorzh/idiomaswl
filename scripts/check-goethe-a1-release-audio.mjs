import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, readdirSync, rmSync, statSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const release = JSON.parse(readFileSync(path.join(root, 'src/data/mocks/goethe-a1-audio-release.json'), 'utf8'));
const expectedFiles = [
  'hoeren-komplett.mp3',
  'hoeren-teil1.mp3',
  'hoeren-teil2.mp3',
  'hoeren-teil3.mp3',
  ...Array.from({ length: 15 }, (_, index) => `item-${String(index + 1).padStart(2, '0')}.mp3`),
];

assert.deepEqual(release.releasedSets, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

const inspectAudio = absolutePath => {
  const run = spawnSync('/usr/bin/afinfo', [absolutePath], { encoding: 'utf8' });
  assert.equal(run.status, 0, run.stderr || `afinfo failed for ${absolutePath}`);
  const output = run.stdout;
  const duration = Number(output.match(/estimated duration: ([\d.]+) sec/)?.[1]);
  const bitrate = Number(output.match(/bit rate: (\d+) bits per second/)?.[1]);
  assert.match(output, /1 ch/, `${absolutePath} must be mono`);
  assert.match(output, /44100 Hz/, `${absolutePath} must be 44.1 kHz`);
  assert.match(output, /\.mp3/, `${absolutePath} must decode as MP3`);
  assert.equal(Number.isFinite(duration), true, `${absolutePath} duration is unreadable`);
  assert.equal(bitrate >= 63_000 && bitrate <= 65_000, true, `${absolutePath} bitrate ${bitrate} is outside 64 kbps tolerance`);
  return duration;
};

const decodeMaster = (inputPath, setNumber) => {
  const temporaryDirectory = mkdtempSync(path.join(os.tmpdir(), `goethe-a1-${setNumber}-decode-`));
  const outputPath = path.join(temporaryDirectory, 'master.wav');
  try {
    const run = spawnSync('/usr/bin/afconvert', [inputPath, outputPath, '-f', 'WAVE', '-d', 'LEI16@44100'], { encoding: 'utf8' });
    assert.equal(run.status, 0, run.stderr || `A1 Set ${setNumber} master cannot be fully decoded`);
    assert.equal(statSync(outputPath).size > 80_000_000, true, `A1 Set ${setNumber} decoded master is unexpectedly small`);
  } finally {
    rmSync(temporaryDirectory, { recursive: true, force: true });
  }
};

for (const setNumber of release.releasedSets) {
  const relativeDirectory = `public/audio/goethe/a1-${setNumber}`;
  const audioDirectory = path.join(root, relativeDirectory);
  const directoryFiles = readdirSync(audioDirectory, { withFileTypes: true })
    .filter(entry => entry.isFile())
    .map(entry => entry.name)
    .sort();
  assert.deepEqual(directoryFiles, [...expectedFiles, 'manifest.json'].sort(), `A1 Set ${setNumber} public audio inventory drifted`);

  const manifest = JSON.parse(readFileSync(path.join(audioDirectory, 'manifest.json'), 'utf8'));
  assert.equal(manifest.outputs.length, 19, `A1 Set ${setNumber} must expose 19 audio files`);
  const manifestFiles = manifest.outputs.map(output => path.basename(output.file));
  assert.deepEqual([...manifestFiles].sort(), [...expectedFiles].sort(), `A1 Set ${setNumber} manifest inventory drifted`);
  assert.equal(new Set(manifestFiles).size, 19, `A1 Set ${setNumber} manifest contains duplicate files`);

  const measured = new Map();
  for (const output of manifest.outputs) {
    const absolutePath = path.join(root, output.file);
    assert.equal(statSync(absolutePath).size, output.bytes, `${output.file} byte count drifted`);
    const duration = inspectAudio(absolutePath);
    assert.equal(Math.abs(duration - output.durationSeconds) <= 0.12, true, `${output.file} duration drifted`);
    measured.set(path.basename(output.file), duration);
  }

  const masterDuration = measured.get('hoeren-komplett.mp3');
  assert.equal(masterDuration >= 1_020 && masterDuration <= 1_200, true, `A1 Set ${setNumber} master duration is outside 17–20 minutes`);
  for (let item = 1; item <= 15; item += 1) {
    const file = `item-${String(item).padStart(2, '0')}.mp3`;
    const duration = measured.get(file);
    assert.equal(duration >= 9 && duration <= 24, true, `A1 Set ${setNumber} ${file} duration is implausible`);
  }
  const partsDuration = ['hoeren-teil1.mp3', 'hoeren-teil2.mp3', 'hoeren-teil3.mp3']
    .reduce((sum, file) => sum + measured.get(file), 0);
  assert.equal(Math.abs((partsDuration + 4) - masterDuration) <= 0.2, true, `A1 Set ${setNumber} section/master timing drifted`);

  decodeMaster(path.join(audioDirectory, 'hoeren-komplett.mp3'), setNumber);
  console.log(`A1 Set ${setNumber}: PASS · 19/19 MP3 · ${Math.round(masterDuration)} s · master fully decoded`);
}

console.log('Goethe A1 audio release QA PASS: Sets 1–10, 190/190 MP3 assets, metadata, timing, inventory and full-master decoding verified.');
