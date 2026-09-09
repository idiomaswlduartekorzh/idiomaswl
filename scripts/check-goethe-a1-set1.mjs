import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = fs.readFileSync(path.join(repoRoot, 'src/data/mocks/goethe-a1-set-1.ts'), 'utf8');
const runnerSource = fs.readFileSync(path.join(repoRoot, 'src/app/(site)/examenes/[exam]/practica/[mockId]/GoetheA1PracticeClient.tsx'), 'utf8');
const submissionSource = fs.readFileSync(path.join(repoRoot, 'src/app/(site)/examenes/[exam]/practica/[mockId]/GoetheSubmission.tsx'), 'utf8');
const scoringSource = fs.readFileSync(path.join(repoRoot, 'src/lib/goethe/scoring.ts'), 'utf8');
const serverSource = fs.readFileSync(path.join(repoRoot, 'src/lib/goethe/submission.server.ts'), 'utf8');
const adminSource = fs.readFileSync(path.join(repoRoot, 'src/app/(site)/dashboard/admin/GoetheReviewPanel.tsx'), 'utf8');
const script = JSON.parse(fs.readFileSync(path.join(repoRoot, 'src/data/mocks/goethe-a1-set-1-audio.json'), 'utf8'));
const audioManifestPath = path.join(repoRoot, 'public/audio/goethe/a1-1/manifest.json');
const voiceSourceDir = path.join(repoRoot, 'public/audio/goethe/a1-1/voice-sources');
const imageDir = path.join(repoRoot, 'public/images/goethe/a1-1');

function measureAudioDuration(file) {
  const candidates = [process.env.FFPROBE_PATH, 'ffprobe'].filter(Boolean);

  for (const candidate of candidates) {
    const result = spawnSync(candidate, [
      '-v', 'error',
      '-show_entries', 'format=duration',
      '-of', 'default=noprint_wrappers=1:nokey=1',
      file,
    ], { encoding: 'utf8' });
    const duration = Number(result.stdout?.trim());

    if (result.status === 0 && Number.isFinite(duration)) return duration;
  }

  return null;
}

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
assert.match(runnerSource, /Karte ziehen/, 'speaking cards must be revealed one at a time');
assert.match(runnerSource, /Antwortübersicht/, 'submission must show an omitted-answer summary');
assert.match(scoringSource, /GOETHE_FACTOR = 1\.66/, 'results must use the official 1.66 factor');
assert.match(runnerSource, /Revisión detallada/, 'results must include answer-by-answer feedback');
assert.match(runnerSource, /useState<DeliveryMode>\('simulation'\)/, 'the public route must open in exam mode');
assert.match(runnerSource, /function advanceExam\(\)/, 'the exam must advance through sequential skill blocks');
assert.match(runnerSource, /aria-current=\{activeSkill === skill\.id \? 'step'/, 'the exam must expose a non-interactive progress stepper');
assert.doesNotMatch(runnerSource, /window\.print/, 'the public exam must not expose a printable answer sheet');
assert.doesNotMatch(runnerSource, /Transkript als Beleg/, 'the public result must not expose listening transcripts');
assert.doesNotMatch(runnerSource, /Bewertungsbogen · docente/, 'students must not be able to assign their own open-task score');
assert.match(runnerSource, /phase === 'submit'/, 'the exam must enter a dedicated delivery phase before results');
assert.match(submissionSource, /saveLead\(/, 'delivery must capture the Goethe lead');
assert.match(submissionSource, /uploadToSignedUrl/, 'speaking evidence must use signed private uploads');
assert.match(serverSource, /scoreGoetheAutomatic/, 'objective scoring must be recalculated on the server');
assert.match(serverSource, /submission_status: 'uploading'/, 'submission must be persisted before audio upload');
assert.match(adminSource, /completeGoetheReview/, 'admin must be able to close the Goethe review');
assert.match(adminSource, /30 respuestas objetivas/, 'admin must receive the answer-by-answer sheet');

assert.ok(fs.existsSync(audioManifestPath), 'audio manifest is missing; run generate-goethe-a1-set1-audio.mjs');
const audioManifest = JSON.parse(fs.readFileSync(audioManifestPath, 'utf8'));
assert.match(audioManifest.generatedWith, /ElevenLabs v3/, 'production audio must use the approved natural German voices');
assert.deepEqual(audioManifest.acousticCue?.frequenciesHz, [990, 831, 698], 'expected the higher descending three-tone exam signal');
assert.equal(audioManifest.acousticCue?.durationSeconds, 2.1, 'exam signal must last 2.1 seconds');
assert.equal(audioManifest.acousticCue?.cueCount, 28, 'expected a cue before every scored playback and both repeated example playbacks');
assert.ok(fs.existsSync(voiceSourceDir), 'natural voice sources are missing');
assert.equal(fs.readdirSync(voiceSourceDir).filter(name => name.endsWith('.mp3')).length, 28, 'expected 28 natural voice source clips');
assert.ok(fs.existsSync(imageDir), 'exam illustration directory is missing');
assert.equal(fs.readdirSync(imageDir).filter(name => name.endsWith('.png')).length, 15, 'expected one listening example, six listening plates, six reading ad pairs and two speaking card sheets');
for (const name of fs.readdirSync(imageDir).filter(file => file.endsWith('.png'))) {
  assert.ok(fs.statSync(path.join(imageDir, name)).size > 100_000, `${name} is unexpectedly small`);
}
assert.equal(audioManifest.outputs.length, 19, 'expected 15 item clips + 3 part tracks + 1 complete track');
for (const output of audioManifest.outputs) {
  const file = path.join(repoRoot, output.file);
  assert.ok(fs.existsSync(file), `${output.file} is missing`);
  const bytes = fs.statSync(file).size;
  assert.ok(bytes > 50_000, `${output.file} is unexpectedly small`);
  assert.equal(bytes, output.bytes, `${output.file} does not match its manifest size`);
  const measuredDuration = measureAudioDuration(file);
  const duration = measuredDuration ?? Number(output.durationSeconds);
  assert.ok(Number.isFinite(duration) && duration > 5, `${output.file} has invalid duration`);
  if (measuredDuration !== null) {
    assert.ok(Math.abs(measuredDuration - Number(output.durationSeconds)) < 0.1, `${output.file} does not match its manifest duration`);
  }
}
const complete = audioManifest.outputs.find(output => output.file.endsWith('/hoeren-komplett.mp3'));
assert.ok(complete.durationSeconds >= 1020 && complete.durationSeconds <= 1200, `complete listening audio must be 17–20 minutes, got ${complete.durationSeconds}s`);

console.log('✓ Goethe A1 Set 1: 11 partes, Hören 15, Lesen 15, Schreiben 5+10, Sprechen 3+6+6');
console.log(`✓ Audio completo: ${(complete.durationSeconds / 60).toFixed(2)} min · 19 assets verificados · 15 láminas visuales`);
