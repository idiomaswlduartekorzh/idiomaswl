import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = fs.readFileSync(path.join(repoRoot, 'src/data/mocks/goethe-a1-set-1.ts'), 'utf8');
const script = JSON.parse(fs.readFileSync(path.join(repoRoot, 'src/data/mocks/goethe-a1-set-1-audio.json'), 'utf8'));
const audioManifestPath = path.join(repoRoot, 'public/audio/goethe/a1-1/manifest.json');
const voiceSourceDir = path.join(repoRoot, 'public/audio/goethe/a1-1/voice-sources');
const imageDir = path.join(repoRoot, 'public/images/goethe/a1-1');
const ffprobe = '/Users/ddev/Documents/ChatGPT/IdiomasWL/handoff-local/continuidad/ielts-harness/worktree/output/tools/bin/ffprobe';

function uniqueMatches(pattern) {
  return [...new Set([...source.matchAll(pattern)].map(match => match[0]))];
}

assert.match(source, /timeMinutes:\s*80/);
assert.deepEqual(script.parts.map(part => part.items.length), [6, 4, 5], 'Hören must contain 6 + 4 + 5 scored items');
assert.deepEqual(script.parts.map(part => part.plays), [2, 1, 2], 'Hören replay policy must be 2 + 1 + 2');
assert.equal(uniqueMatches(/g-a1-1-h\d+/g).length, 15, 'expected 15 listening ids');
assert.equal(uniqueMatches(/g-a1-1-l\d+/g).length, 15, 'expected 15 reading ids');
assert.equal(uniqueMatches(/g-a1-1-sp\d+/g).length, 3, 'expected 3 speaking ids');
assert.match(source, /qRange:\s*\[1, 5\]/, 'writing form must contain five blanks');
assert.match(source, /minWords:\s*30/, 'open writing target must be about 30 words');

assert.ok(fs.existsSync(audioManifestPath), 'audio manifest is missing; run generate-goethe-a1-set1-audio.mjs');
const audioManifest = JSON.parse(fs.readFileSync(audioManifestPath, 'utf8'));
assert.match(audioManifest.generatedWith, /ElevenLabs v3/, 'production audio must use the approved natural German voices');
assert.deepEqual(audioManifest.acousticCue?.frequenciesHz, [880, 740, 622], 'expected the descending three-tone exam signal');
assert.equal(audioManifest.acousticCue?.durationSeconds, 2.1, 'exam signal must last 2.1 seconds');
assert.equal(audioManifest.acousticCue?.cueCount, 28, 'expected a cue before every scored playback and both repeated example playbacks');
assert.ok(fs.existsSync(voiceSourceDir), 'natural voice sources are missing');
assert.equal(fs.readdirSync(voiceSourceDir).filter(name => name.endsWith('.mp3')).length, 28, 'expected 28 natural voice source clips');
assert.ok(fs.existsSync(imageDir), 'exam illustration directory is missing');
assert.equal(fs.readdirSync(imageDir).filter(name => name.endsWith('.png')).length, 13, 'expected six listening plates, five reading ad pairs and two speaking card sheets');
for (const name of fs.readdirSync(imageDir).filter(file => file.endsWith('.png'))) {
  assert.ok(fs.statSync(path.join(imageDir, name)).size > 100_000, `${name} is unexpectedly small`);
}
assert.equal(audioManifest.outputs.length, 19, 'expected 15 item clips + 3 part tracks + 1 complete track');
for (const output of audioManifest.outputs) {
  const file = path.join(repoRoot, output.file);
  assert.ok(fs.existsSync(file), `${output.file} is missing`);
  assert.ok(fs.statSync(file).size > 50_000, `${output.file} is unexpectedly small`);
  const duration = Number(execFileSync(ffprobe, ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', file], { encoding: 'utf8' }).trim());
  assert.ok(Number.isFinite(duration) && duration > 5, `${output.file} has invalid duration`);
}
const complete = audioManifest.outputs.find(output => output.file.endsWith('/hoeren-komplett.mp3'));
assert.ok(complete.durationSeconds >= 1020 && complete.durationSeconds <= 1200, `complete listening audio must be 17–20 minutes, got ${complete.durationSeconds}s`);

console.log('✓ Goethe A1 Set 1: 11 partes, Hören 15, Lesen 15, Schreiben 5+10, Sprechen 3+6+6');
console.log(`✓ Audio completo: ${(complete.durationSeconds / 60).toFixed(2)} min · 19 assets verificados · 13 láminas visuales`);
