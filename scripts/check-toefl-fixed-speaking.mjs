import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
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
assert.equal(TOEFL_RELEASED_FIXED_REPEAT_MEDIA_IDS.size, 0, 'no new Repeat media is released before owner approval');
assert.equal(TOEFL_RELEASED_FIXED_INTERVIEW_MEDIA_IDS.size, 0, 'no Interview prompt media is released before owner approval');

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

const [fixedFormSource, clientSource] = await Promise.all([
  read('src/data/mocks/toefl-fixed-form.ts'),
  read('src/app/(site)/examenes/[exam]/practica/[mockId]/Toefl2026PracticeClient.tsx'),
]);
assert.match(fixedFormSource, /withToefl2026FixedSpeaking/, 'the fixed form composes Speaking');
assert.match(fixedFormSource, /repeats\.slice\(0, 5\)/, 'the composer preserves five existing Repeat items');
assert.match(fixedFormSource, /additions\.map<RepeatQuestion>/, 'the composer appends the two planned Repeat items');
assert.match(fixedFormSource, /speaking-interview-\$\{interview\.partNumber\}/, 'the composer registers all Interview prompts as media');
assert.match(clientSource, /question\.type === 'toefl-listening-single' \|\| question\.type === 'repeat' \|\| question\.type === 'speak'/, 'the preview counts blocked Listening, Repeat and Interview media');
assert.match(clientSource, /question\.type !== 'repeat' && question\.type !== 'speak'/, 'blocked Repeat and Interview items are excluded from self-assessment');

const changedPaths = execFileSync('git', ['status', '--porcelain=v1', '--untracked-files=all'], {
  cwd: new URL('.', root), encoding: 'utf8',
}).trim().split('\n').filter(Boolean).flatMap((entry) => {
  const path = entry.slice(3).replace(/^"|"$/g, '');
  return path.includes(' -> ') ? path.split(' -> ') : [path];
});
assert.ok(changedPaths.every((path) => !path.startsWith('public/audio/') && !/\.(mp3|wav|m4a|ogg)$/i.test(path)), 'Repeat expansion changes no audio asset');

console.log('✓ TOEFL fixed Speaking Sets 1–20: 7 Repeat + 4 Interview, 120 blocked new media, no audio changes');
