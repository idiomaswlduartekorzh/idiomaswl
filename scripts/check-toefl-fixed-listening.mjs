import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { TOEFL_FIXED_LISTENING_SETS_1_TO_5 } from '../src/data/toefl/listening-fixed-sets-1-5.ts';
import { TOEFL_FIXED_LISTENING_SETS_6_TO_10 } from '../src/data/toefl/listening-fixed-sets-6-10.ts';
import { TOEFL_FIXED_LISTENING_SETS_11_TO_15 } from '../src/data/toefl/listening-fixed-sets-11-15.ts';
import { TOEFL_FIXED_LISTENING_SETS_16_TO_20 } from '../src/data/toefl/listening-fixed-sets-16-20.ts';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');
const words = (text) => text.match(/[A-Za-z]+(?:'[A-Za-z]+)?/g) ?? [];

const [publicSource1To5, publicSource6To10, publicSource11To15, publicSource16To20, privateSource1To5, privateSource6To10, privateSource11To15, privateSource16To20, contractSource, fixedFormSource, registrySource, routeSource, clientSource, mockIndexSource] = await Promise.all([
  read('src/data/toefl/listening-fixed-sets-1-5.ts'),
  read('src/data/toefl/listening-fixed-sets-6-10.ts'),
  read('src/data/toefl/listening-fixed-sets-11-15.ts'),
  read('src/data/toefl/listening-fixed-sets-16-20.ts'),
  read('src/server/toefl/listening-fixed-sets-1-5.ts'),
  read('src/server/toefl/listening-fixed-sets-6-10.ts'),
  read('src/server/toefl/listening-fixed-sets-11-15.ts'),
  read('src/server/toefl/listening-fixed-sets-16-20.ts'),
  read('docs/toefl-2026-listening-expansion-contract-2026-08-14.md'),
  read('src/data/mocks/toefl-fixed-form.ts'),
  read('src/server/toefl/listening-registry.ts'),
  read('src/app/api/practica/toefl/listening/score/route.ts'),
  read('src/app/(site)/examenes/[exam]/practica/[mockId]/Toefl2026PracticeClient.tsx'),
  read('src/data/mocks/index.ts'),
]);

const publicSource = `${publicSource1To5}\n${publicSource6To10}\n${publicSource11To15}\n${publicSource16To20}`;
const privateSources = [privateSource1To5, privateSource6To10, privateSource11To15, privateSource16To20];
assert.doesNotMatch(publicSource, /correctOptionId|KEY_LABELS|\banswer\s*:/, 'public fixed Listening data contains no answer keys');
privateSources.forEach((source) => assert.match(source, /import 'server-only'/, 'fixed Listening keys have an explicit server-only boundary'));
assert.match(contractSource, /\| 1 \| 8 \| 4 \(dos estímulos × 2\) \| 2 \| 4 \| 18 \|/, 'contract records official-practice Module 1 shape');
assert.match(contractSource, /\| 2 \| 8 \| 2 \(un estímulo × 2\) \| 2 \| 4 \| 16 \|/, 'contract records official-practice Module 2 shape');
assert.match(registrySource, /import 'server-only'/, 'the combined 34-item key registry has an explicit server-only boundary');
assert.match(registrySource, /items\.length !== 34/, 'the combined registry fails closed unless every set has exactly 34 scoring items');
assert.match(routeSource, /TOEFL_FIXED_LISTENING_SCORING_BY_OBJECT_ID/, 'the Listening endpoint resolves only the private fixed registry');
assert.match(routeSource, /presentedItemIds/, 'the Listening endpoint distinguishes presented from audio-blocked items');
assert.equal((mockIndexSource.match(/withToefl2026FixedForm\(toeflSet\d+\)/g) ?? []).length, 20, 'all twenty public mock entries use the fixed TOEFL form');
assert.match(fixedFormSource, /moduleId: 'listening-1'/, 'the public form composes Listening Module 1');
assert.match(fixedFormSource, /moduleId: 'listening-2'/, 'the public form composes Listening Module 2');
assert.match(fixedFormSource, /\.slice\(0, 5\)/, 'the form reuses five existing Choose items');
assert.match(fixedFormSource, /\.slice\(0, 4\)/, 'the form preserves four fixed questions from long existing stimuli');
assert.doesNotMatch(fixedFormSource, /answer:\s*question\.answer/, 'the public fixed adapter does not copy legacy keys');
assert.match(clientSource, /mediaStatus === 'script-ready-audio-blocked'/, 'the preview exposes blocked media honestly');
assert.match(clientSource, /\/api\/practica\/toefl\/listening\/score/, 'the runner closes presented Listening items through the server endpoint');
assert.match(clientSource, /key=\{currentMediaId \?\? currentForwardItem\.question\.id\}/, 'each forward-only media item remounts with its own playback identity');
assert.match(clientSource, /Omitir ítem sin audio y continuar/, 'blocked preview media has an explicit skip action');

const labelsBySet = new Map();
for (const privateSource of privateSources) {
  const keyBlock = privateSource.slice(privateSource.indexOf('const KEY_LABELS'), privateSource.indexOf('function orderedItems'));
  for (const match of keyBlock.matchAll(/^\s*(\d+): \[([^\]]+)\]/gm)) {
    labelsBySet.set(Number(match[1]), [...match[2].matchAll(/'([^']+)'/g)].map((entry) => entry[1]));
  }
}

const itemIds = [];
const mediaIds = [];
const plannedUrls = [];
const lengthClues = [];
const fixedListeningSets = [
  ...TOEFL_FIXED_LISTENING_SETS_1_TO_5,
  ...TOEFL_FIXED_LISTENING_SETS_6_TO_10,
  ...TOEFL_FIXED_LISTENING_SETS_11_TO_15,
  ...TOEFL_FIXED_LISTENING_SETS_16_TO_20,
];
assert.equal(fixedListeningSets.length, 20, 'all four fixed Listening batches have twenty sets');

for (const set of fixedListeningSets) {
  assert.equal(set.module1ChooseAdditions.length, 3, `Set ${set.setNumber} adds three Module 1 Choose items`);
  assert.equal(set.module2.choose.length, 8, `Set ${set.setNumber} Module 2 has eight Choose items`);
  assert.equal(set.module2.conversation.items.length, 2, `Set ${set.setNumber} Module 2 Conversation has two questions`);
  assert.equal(set.module2.announcement.items.length, 2, `Set ${set.setNumber} Module 2 Announcement has two questions`);
  assert.equal(set.module2.academic.items.length, 4, `Set ${set.setNumber} Module 2 Academic Talk has four questions`);

  const choose = [...set.module1ChooseAdditions, ...set.module2.choose];
  const long = [set.module2.conversation, set.module2.announcement, set.module2.academic];
  const orderedItems = [
    ...set.module1ChooseAdditions.map((entry) => entry.item),
    ...set.module2.choose.map((entry) => entry.item),
    ...set.module2.conversation.items,
    ...set.module2.announcement.items,
    ...set.module2.academic.items,
  ];
  assert.equal(orderedItems.length, 19, `Set ${set.setNumber} has 19 new written interactions`);

  for (const entry of choose) {
    const count = words(entry.script).length;
    assert.ok(count >= 4 && count <= 18, `${entry.mediaId} Choose script stays within 4–18 words (got ${count})`);
  }
  const expectedRanges = [[45, 100], [50, 100], [140, 210]];
  long.forEach((entry, index) => {
    const count = words(entry.script).length;
    const [min, max] = expectedRanges[index];
    assert.ok(count >= min && count <= max, `${entry.mediaId} script stays within ${min}–${max} words (got ${count})`);
  });

  const labels = labelsBySet.get(set.setNumber) ?? [];
  assert.equal(labels.length, 19, `Set ${set.setNumber} has 19 private labels`);
  orderedItems.forEach((entry, index) => {
    itemIds.push(entry.id);
    assert.equal(entry.options.length, 4, `${entry.id} has four options`);
    assert.deepEqual(entry.options.map((option) => option.label), ['A', 'B', 'C', 'D'], `${entry.id} labels A–D`);
    assert.equal(new Set(entry.options.map((option) => option.id)).size, 4, `${entry.id} option ids are unique`);
    assert.ok(entry.options.some((option) => option.id.endsWith(`option-${labels[index]?.toLowerCase()}`)), `${entry.id} private key names a public option`);
    const correctIndex = labels[index]?.charCodeAt(0) - 65;
    const optionLengths = entry.options.map((option) => words(option.text).length);
    const correctLength = optionLengths[correctIndex];
    const distractorMean = optionLengths
      .filter((_, optionIndex) => optionIndex !== correctIndex)
      .reduce((sum, length) => sum + length, 0) / 3;
    if (correctLength / distractorMean >= 2 && correctLength - distractorMean >= 3) {
      lengthClues.push(`${entry.id} (${correctLength} vs ${distractorMean.toFixed(1)})`);
    }
  });

  for (const entry of [...choose, ...long]) {
    mediaIds.push(entry.mediaId);
    plannedUrls.push(entry.plannedAudioUrl);
    assert.equal(entry.mediaStatus, 'script-ready-audio-blocked', `${entry.mediaId} remains blocked from generation`);
    assert.ok(entry.script.trim(), `${entry.mediaId} has a canonical script`);
    assert.ok(entry.voiceRoles.length >= 1, `${entry.mediaId} has a planned voice role`);
  }
  assert.equal(choose.length + long.length, 14, `Set ${set.setNumber} plans fourteen new TTS assets`);
}

assert.equal(new Set(itemIds).size, itemIds.length, 'new fixed Listening item ids are globally unique');
assert.equal(new Set(mediaIds).size, mediaIds.length, 'new fixed Listening media ids are globally unique');
assert.equal(new Set(plannedUrls).size, plannedUrls.length, 'new fixed Listening planned URLs are globally unique');
assert.deepEqual(lengthClues, [], `correct options must not reveal themselves through a large length advantage: ${lengthClues.join(', ')}`);
const allScripts = fixedListeningSets.flatMap((set) => [
  ...set.module1ChooseAdditions,
  ...set.module2.choose,
  set.module2.conversation,
  set.module2.announcement,
  set.module2.academic,
]).map((entry) => entry.script.trim().toLowerCase());
assert.equal(new Set(allScripts).size, allScripts.length, 'all planned scripts in the batch are distinct');

const changedPaths = execFileSync('git', ['status', '--porcelain=v1', '--untracked-files=all'], {
  cwd: new URL('.', root), encoding: 'utf8',
}).trim().split('\n').filter(Boolean).flatMap((entry) => {
  const path = entry.slice(3).replace(/^"|"$/g, '');
  return path.includes(' -> ') ? path.split(' -> ') : [path];
});
assert.ok(changedPaths.every((path) => !path.startsWith('public/audio/toefl/')), 'Listening script work changes no TOEFL audio asset');

console.log('✓ TOEFL fixed Listening scripts Sets 1–20: 19 new items/set, 14 blocked media/set, private keys, and no audio changes');
