import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  TOEFL_FIXED_REPEAT_BY_SET,
  TOEFL_FIXED_REPEAT_EXPANSIONS,
  TOEFL_RELEASED_FIXED_INTERVIEW_MEDIA_IDS,
  TOEFL_RELEASED_FIXED_REPEAT_MEDIA_IDS,
} from '../src/data/toefl/speaking-fixed-repeat.ts';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');
const words = (text) => text.match(/[A-Za-z]+(?:[’'][A-Za-z]+)?/g) ?? [];

assert.equal(TOEFL_FIXED_REPEAT_EXPANSIONS.length, 40, 'twenty sets have two new Repeat scripts each');
assert.equal(TOEFL_RELEASED_FIXED_REPEAT_MEDIA_IDS.size, 40, 'all 40 audited Repeat media IDs are released');
assert.equal(TOEFL_RELEASED_FIXED_INTERVIEW_MEDIA_IDS.size, 80, 'all 80 audited Interview prompt IDs are released');

const ids = [];
const mediaIds = [];
const urls = [];
const scripts = [];
for (let setNumber = 1; setNumber <= 20; setNumber++) {
  const entries = TOEFL_FIXED_REPEAT_BY_SET[setNumber] ?? [];
  assert.equal(entries.length, 2, `Set ${setNumber} has two Repeat additions`);
  assert.deepEqual(entries.map((entry) => entry.itemNumber), [6, 7], `Set ${setNumber} adds items 6 and 7`);
  assert.equal(new Set(entries.map((entry) => entry.voiceRole)).size, 2, `Set ${setNumber} alternates two voice roles`);
  assert.ok(words(entries[0].targetSentence).length >= 15 && words(entries[0].targetSentence).length <= 17, `Set ${setNumber} item 6 has 15–17 words`);
  assert.ok(words(entries[1].targetSentence).length >= 18 && words(entries[1].targetSentence).length <= 24, `Set ${setNumber} item 7 has 18–24 words`);
  entries.forEach((entry) => {
    assert.equal(entry.mediaStatus, 'script-ready-audio-blocked', `${entry.mediaId} remains blocked`);
    ids.push(entry.id);
    mediaIds.push(entry.mediaId);
    urls.push(entry.plannedAudioUrl);
    scripts.push(entry.targetSentence.trim().toLowerCase());
  });

  const rawSource = await read(`src/data/mocks/toefl-set-${setNumber}.ts`);
  assert.equal((rawSource.match(/type:\s*'repeat'/g) ?? []).length, 5, `Set ${setNumber} preserves five existing Repeat items`);
  assert.equal((rawSource.match(/type:\s*'speak'/g) ?? []).length, 4, `Set ${setNumber} preserves four Interview items`);
}

assert.equal(new Set(ids).size, 40, 'new Repeat IDs are globally unique');
assert.equal(new Set(mediaIds).size, 40, 'new Repeat media IDs are globally unique');
assert.equal(new Set(urls).size, 40, 'new Repeat URLs are globally unique');
assert.equal(new Set(scripts).size, 40, 'new Repeat scripts are globally unique');
assert.deepEqual(
  [...TOEFL_RELEASED_FIXED_REPEAT_MEDIA_IDS].sort(),
  [...mediaIds].sort(),
  'the Repeat release gate exactly matches the fixed expansion',
);

const [fixedFormSource, clientSource, recorderSource] = await Promise.all([
  read('src/data/mocks/toefl-fixed-form.ts'),
  read('src/app/(site)/examenes/[exam]/practica/[mockId]/Toefl2026PracticeClient.tsx'),
  read('src/components/exam-runner/IELTSSpeakingRecorder.tsx'),
]);
assert.match(fixedFormSource, /withToefl2026FixedSpeaking/, 'the fixed form composes Speaking');
assert.match(fixedFormSource, /repeats\.slice\(0, 5\)/, 'the composer preserves five existing Repeat items');
assert.match(fixedFormSource, /additions\.map<RepeatQuestion>/, 'the composer appends the two planned Repeat items');
assert.match(fixedFormSource, /speaking-interview-\$\{interview\.partNumber\}/, 'the composer registers all Interview prompts as media');
assert.match(clientSource, /question\.type === 'toefl-listening-single' \|\| question\.type === 'repeat' \|\| question\.type === 'speak'/, 'the preview counts blocked Listening, Repeat and Interview media');
assert.match(clientSource, /currentForwardBlocked[\s\S]*script-ready-audio-blocked/, 'blocked Repeat and Interview items advance without entering evaluation');
assert.doesNotMatch(clientSource, /SelfAssessModal|speakBands/, 'Speaking cannot become a self-awarded score');
assert.match(clientSource, /<IELTSSpeakingRecorder/, 'ready Speaking items use the hardened recorder');
assert.match(recorderSource, /new MediaRecorder\(stream/, 'ready Speaking items capture a real local response');

console.log('✓ TOEFL fixed Speaking Sets 1–20: 7 Repeat + 4 Interview and 120 released new media');
