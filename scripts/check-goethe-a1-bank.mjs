import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const release = process.argv.includes('--release');
const sets = [];
const finalSet = release ? 7 : 8;
for (let number = 3; number <= finalSet; number += 1) {
  const module = await import(`../src/data/mocks/goethe-a1-set-${number}.ts`);
  sets.push({ number, mock: module.default, audio: module.audioManifest });
}

function words(value = '') { return value.match(/[\p{L}\p{N}]+(?:[-'][\p{L}\p{N}]+)*/gu) ?? []; }
function maxRun(values) {
  let best = 0; let current = 0; let previous;
  for (const value of values) { current = value === previous ? current + 1 : 1; best = Math.max(best, current); previous = value; }
  return best;
}

for (const { number, mock, audio } of sets) {
  const sections = new Map(mock.sections.map(section => [section.part, section]));
  const listening = mock.sections.filter(section => section.skill === 'listening').flatMap(section => section.questions);
  const reading = mock.sections.filter(section => section.skill === 'reading').flatMap(section => section.questions);
  const writing = mock.sections.filter(section => section.skill === 'writing').flatMap(section => section.questions);
  const speaking = mock.sections.filter(section => section.skill === 'speaking').flatMap(section => section.questions);
  assert.equal(mock.id, `a1-${number}`);
  assert.equal(mock.timeMinutes, 80);
  assert.deepEqual([...sections.keys()], [1,2,3,4,5,6,7,8,9,10,11]);
  assert.deepEqual([1,2,3].map(part => sections.get(part).questions.length), [6,4,5]);
  assert.equal(listening.length, 15); assert.equal(reading.length, 15); assert.equal(writing.length, 2); assert.equal(speaking.length, 3);
  assert.equal(new Set(mock.sections.flatMap(section => section.questions.map(question => question.id))).size, 35);
  assert.deepEqual(audio.parts.map(part => part.items.length), [6,4,5]);
  assert.deepEqual(audio.parts.map(part => part.plays), [2,1,2]);
  assert.deepEqual(audio.production.cueFrequenciesHz, [990,831,698]);
  for (const part of audio.parts) {
    const transcript = sections.get(part.id).transcript ?? '';
    for (const item of part.items) assert.match(transcript, new RegExp(`Nummer ${item.number}\\n`), `Set ${number}: guided transcript is missing item ${item.number}`);
  }
  const audioCharacters = audio.parts.flatMap(part => [part.intro, part.outro ?? '', ...(part.example?.turns ?? []).map(turn => turn.text), ...part.items.flatMap(item => item.turns.map(turn => turn.text))]).join('').length;
  assert.ok(audioCharacters >= 3600 && audioCharacters <= 4600, `Set ${number}: audio source ${audioCharacters} chars`);
  for (const item of audio.parts.flatMap(part => part.items)) {
    const count = item.turns.map(turn => turn.text).join(' ').length;
    assert.ok(count >= 150 && count <= 280, `Set ${number} item ${item.number}: ${count} chars`);
  }
  const textParts = sections.get(4).passage.split(/\n\nTEXT B\n\n/);
  assert.equal(textParts.length, 2);
  for (const passage of textParts) assert.ok(words(passage).length >= 45 && words(passage).length <= 90, `Set ${number}: Lesen Teil 1 must contain two 45–90-word messages`);
  for (const question of sections.get(5).questions) {
    const adverts = question.stimulus.split('\n\n');
    assert.equal(adverts.length, 2);
    for (const advert of adverts) assert.ok(words(advert).length >= 10 && words(advert).length <= 30, `Set ${number} ${question.id}: ad outside compact range`);
  }
  const signLengths = sections.get(6).questions.map(question => words(question.stimulus).length);
  assert.ok(Math.min(...signLengths) <= 10 && Math.max(...signLengths) >= 10 && new Set(signLengths).size >= 3, `Set ${number}: signs need varied lengths`);
  const form = writing.find(question => question.type === 'formgroup');
  assert.ok(form); assert.deepEqual(form.qRange, [1,5]); assert.equal(form.blanks.length, 5); assert.equal((form.template.match(/{{\d+}}/g) ?? []).length, 5);
  assert.ok(words(form.groupLabel).length >= 50 && words(form.groupLabel).length <= 90, `Set ${number}: form scenario length`);
  const shortMessage = writing.find(question => question.type === 'write');
  assert.equal(shortMessage.minWords, 30); assert.equal((shortMessage.text.match(/^•/gm) ?? []).length, 3);
  const cue2 = speaking[1].cueCard.split('\n\n'); assert.equal(cue2.length, 2); cue2.forEach(group => assert.equal(group.split('\n')[1].split(' · ').length, 6));
  const cue3 = speaking[2].cueCard.split('\n\n'); assert.equal(cue3.length, 2); cue3.forEach(group => assert.equal(group.split('\n')[1].split(' · ').length, 6));
  const threeOptionAnswers = [...sections.get(1).questions, ...sections.get(3).questions].map(question => question.answer);
  assert.deepEqual([0,1,2].map(answer => threeOptionAnswers.filter(value => value === answer).length), [4,4,3]);
  assert.ok(maxRun(threeOptionAnswers) <= 2);
  const binaryAnswers = [...sections.get(2).questions, ...sections.get(4).questions, ...sections.get(5).questions, ...sections.get(6).questions].map(question => question.answer);
  assert.deepEqual([0,1].map(answer => binaryAnswers.filter(value => value === answer).length), [10,9], `Set ${number}: binary answer balance`);
  assert.ok(maxRun(binaryAnswers) <= 2, `Set ${number}: binary answer run`);
  if (release) {
    const imageDir = path.join(repoRoot, `public/images/goethe/a1-${number}`);
    const imageNames = ['hoeren-teil1-00.png', ...Array.from({length:6},(_,i)=>`hoeren-teil1-${String(i+1).padStart(2,'0')}.png`), 'lesen-teil2-00.png', ...Array.from({length:5},(_,i)=>`lesen-teil2-${String(i+6).padStart(2,'0')}.png`), 'sprechen-teil3-karten-01.png', 'sprechen-teil3-karten-02.png'];
    imageNames.forEach(name => assert.ok(fs.statSync(path.join(imageDir, name)).size > 20_000, `Set ${number}: missing image ${name}`));
    const audioDir = path.join(repoRoot, `public/audio/goethe/a1-${number}`);
    const audioNames = ['hoeren-komplett.mp3','hoeren-teil1.mp3','hoeren-teil2.mp3','hoeren-teil3.mp3', ...Array.from({length:15},(_,i)=>`item-${String(i+1).padStart(2,'0')}.mp3`), 'manifest.json'];
    audioNames.forEach(name => assert.ok(fs.statSync(path.join(audioDir, name)).size > (name.endsWith('.mp3') ? 10_000 : 100), `Set ${number}: missing audio ${name}`));
    const manifest = JSON.parse(fs.readFileSync(path.join(audioDir, 'manifest.json'), 'utf8'));
    assert.equal(manifest.outputs.length, 19); assert.equal(manifest.acousticCue.cueCount, 28);
    assert.ok(manifest.outputs.find(output => output.file.endsWith('/hoeren-komplett.mp3')).durationSeconds >= 1020);
  }
  console.log(`✓ Goethe A1 Set ${number}: 11 parts · 35 responses · ${audioCharacters} audio chars${release ? ' · 15 images · 19 audio outputs' : ''}`);
}

const comparable = sets.flatMap(({ number, mock }) => mock.sections.flatMap(section => [section.passage, ...section.questions.flatMap(question => [question.stimulus, question.type === 'mcq' ? question.text : question.groupLabel])]).filter(Boolean).map(value => ({ number, value: value.toLocaleLowerCase('de-DE').replace(/[^\p{L}\p{N}]+/gu, ' ').trim() })));
for (let left = 0; left < comparable.length; left += 1) for (let right = left + 1; right < comparable.length; right += 1) if (comparable[left].number !== comparable[right].number && comparable[left].value.length > 35) assert.notEqual(comparable[left].value, comparable[right].value, `duplicate stimulus across Sets ${comparable[left].number}/${comparable[right].number}`);
console.log(`✓ Sets 3–${finalSet} are mutually original at full-stimulus level${release ? ' and release-ready' : ' (Set 8 remains an unpublished draft)'}`);
