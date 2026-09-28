import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import {
  REVIEW_LOCATOR_ITEMS,
  REVIEW_PRECISION_ITEMS,
  REVIEW_PREVIEW_ITEMS,
} from '../src/lib/diagnostic-review-preview.ts';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const client = await readFile(
  path.join(projectRoot, 'src/app/(site)/nivel-radar/AdaptiveNivelRadarClient.tsx'),
  'utf8',
);
const skills = ['reading', 'listening', 'written-discourse', 'grammar', 'vocabulary'];
const stages = [
  { kind: 'locator', items: REVIEW_LOCATOR_ITEMS, expectedPerSkill: 3 },
  { kind: 'precision', items: REVIEW_PRECISION_ITEMS, expectedPerSkill: 4 },
];
// Test-only answer manifest. Keeping it outside the client fixture lets us audit
// answer-position and answer-length cues without shipping keys to the browser.
const intendedCorrectTextById = {
  'review-reading-01': 'At 9:20.',
  'review-reading-02': 'To announce temporary maintenance.',
  'review-reading-03': 'They should check for an update on Sunday.',
  'review-reading-04': 'A policy introduced to make desk access fairer.',
  'review-reading-05': 'Inspecting and repairing suitable objects.',
  'review-reading-06': 'Promising but inconclusive.',
  'review-reading-07': 'Combining flexibility with common availability.',
  'review-listening-01': 'In Riverside Park.',
  'review-listening-02': 'At the city park.',
  'review-listening-03': 'His student card.',
  'review-listening-04': 'Heavy rain flooded part of the road.',
  'review-listening-05': 'She wanted to sound natural.',
  'review-listening-06': 'A manager carried an emergency phone.',
  'review-listening-07': 'Some booked rooms were left unused.',
  'review-discourse-01': 'Instead',
  'review-discourse-03': 'Position 2.',
  'review-discourse-04': 'After reviewing the budget, Marta discussed the proposal with Elena.',
  'review-discourse-06': 'Dear Dr Patel, I am writing to request a short extension because I was unwell.',
  'review-discourse-07': 'Nevertheless',
  'review-grammar-01': 'The new schedule starts on Monday.',
  'review-grammar-02': 'had already started',
  'review-grammar-03': 'We had to submit the form yesterday.',
  'review-grammar-04': 'will practise',
  'review-grammar-05': 'who',
  'review-grammar-06': 'Maya said that she could not attend that day.',
  'review-grammar-07': 'Only after the review did the team change its plan.',
  'review-vocabulary-01': 'Use temporarily and return.',
  'review-vocabulary-02': 'make a decision',
  'review-vocabulary-03': 'Moved to a later time.',
  'review-vocabulary-04': 'helpful',
  'review-vocabulary-05': 'dealt with',
  'review-vocabulary-06': 'The results indicate a gradual decline.',
  'review-vocabulary-07': 'approved',
};

function countsBySkill(items) {
  return Object.fromEntries(skills.map(skill => [skill, items.filter(item => item.skill === skill).length]));
}

function normalizedText(value) {
  return value.toLocaleLowerCase('en').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
}

function optionLength(value) {
  return normalizedText(value).length;
}

test('review preview exposes the complete 15 + 20 path and every skill in both stages', () => {
  assert.equal(REVIEW_LOCATOR_ITEMS.length, 15, 'locator preview must expose 15 decisions');
  assert.equal(REVIEW_PRECISION_ITEMS.length, 20, 'precision preview must expose 20 decisions');
  assert.equal(REVIEW_PREVIEW_ITEMS.length, 35);

  for (const stage of stages) {
    assert.deepEqual(
      countsBySkill(stage.items),
      Object.fromEntries(skills.map(skill => [skill, stage.expectedPerSkill])),
      `${stage.kind} must expose every skill equally`,
    );
  }
  assert.deepEqual(
    countsBySkill(REVIEW_PREVIEW_ITEMS),
    Object.fromEntries(skills.map(skill => [skill, 7])),
  );
});

test('review stage receipts derive from rendered items and preview IDs never collide', () => {
  assert.match(client, /itemIds:\s*REVIEW_LOCATOR_ITEMS\.map\(item => item\.id\)/);
  assert.match(client, /items:\s*REVIEW_LOCATOR_ITEMS/);
  assert.match(client, /itemIds:\s*REVIEW_PRECISION_ITEMS\.map\(item => item\.id\)/);
  assert.match(client, /items:\s*REVIEW_PRECISION_ITEMS/);
  assert.equal(new Set(REVIEW_PREVIEW_ITEMS.map(item => item.id)).size, 35);
});

test('all seven listening decisions use playable local audio and no other skill is audio-backed', async () => {
  assert.deepEqual(
    stages.map(stage => stage.items.filter(item => item.skill === 'listening').length),
    [3, 4],
  );
  const listening = REVIEW_PREVIEW_ITEMS.filter(item => item.skill === 'listening');
  assert.equal(listening.length, 7);
  assert.equal(listening.every(item => item.stimulus.kind === 'audio'), true);
  assert.equal(
    REVIEW_PREVIEW_ITEMS.filter(item => item.stimulus.kind === 'audio').every(item => item.skill === 'listening'),
    true,
  );

  for (const item of listening) {
    assert.equal(item.stimulus.kind, 'audio');
    assert.ok(item.stimulus.mediaId.trim(), `${item.id} needs a mediaId`);
    assert.ok(item.stimulus.src.startsWith('/'), `${item.id} must use an application-relative source`);
    assert.ok(item.stimulus.startMs >= 0, `${item.id} needs a non-negative start`);
    assert.ok(item.stimulus.endMs > item.stimulus.startMs, `${item.id} needs a positive playback range`);
    assert.ok(item.stimulus.maxPlays >= 1, `${item.id} needs at least one allowed play`);
    await access(path.join(projectRoot, 'public', item.stimulus.src.replace(/^\//, '')));
  }
  assert.equal(
    new Set(listening.map(item => `${item.stimulus.mediaId}:${item.stimulus.startMs}:${item.stimulus.endMs}`)).size,
    7,
    'each listening decision needs an independent stimulus identity',
  );
});

test('the non-scored device-check recording is not recycled as a preview decision', async () => {
  const audioCheck = JSON.parse(await readFile(path.join(projectRoot, 'config/diagnostic/audio-check.json'), 'utf8'));
  assert.equal(audioCheck.scored, false);
  assert.equal(audioCheck.assessmentBankEligible, false);
  await access(path.join(projectRoot, 'public', audioCheck.assetPath.replace(/^\//, '')));
  for (const item of REVIEW_PREVIEW_ITEMS.filter(candidate => candidate.skill === 'listening')) {
    assert.equal(item.stimulus.kind, 'audio');
    assert.notEqual(item.stimulus.src, audioCheck.assetPath, `${item.id} reuses the ineligible sound check`);
  }
});

test('each stage avoids easy typographic and fixed-position length cues', () => {
  for (const stage of stages) {
    const uniqueLongestByPosition = [0, 0, 0];
    const positionLengths = [[], [], []];
    for (const item of stage.items) {
      if (item.response.kind === 'short-text') continue;
      const displayOptions = item.displayOptions ?? [];
      assert.ok(item.response.optionIds.length >= 3, `${item.id} needs at least three choices/fragments`);
      assert.equal(new Set(item.response.optionIds).size, item.response.optionIds.length, `${item.id} option IDs repeat`);
      assert.deepEqual(
        displayOptions.map(option => option.id),
        [...item.response.optionIds],
        `${item.id} display order must be explicit and bijective`,
      );
      assert.equal(
        new Set(displayOptions.map(option => normalizedText(option.text))).size,
        displayOptions.length,
        `${item.id} contains duplicate normalized option text`,
      );
      for (const option of displayOptions) {
        assert.equal(option.text.trim(), option.text, `${item.id}/${option.id} has edge whitespace`);
        assert.doesNotMatch(option.text, /^(?:[A-C][.)]|\*|✓|✔|correct\b)/i, `${item.id}/${option.id} exposes a cue`);
      }

      if (item.response.kind !== 'single-choice' || displayOptions.length !== 3) continue;
      const lengths = displayOptions.map(option => optionLength(option.text));
      lengths.forEach((length, index) => positionLengths[index].push(length));
      const maximum = Math.max(...lengths);
      const longest = lengths.flatMap((length, index) => length === maximum ? [index] : []);
      if (longest.length === 1) uniqueLongestByPosition[longest[0]] += 1;
    }

    assert.equal(
      uniqueLongestByPosition.filter(count => count > 0).length,
      3,
      `${stage.kind} unique-longest options must occur in A, B and C positions`,
    );
    assert.ok(
      Math.max(...uniqueLongestByPosition) - Math.min(...uniqueLongestByPosition) <= 2,
      `${stage.kind} unique-longest option positions are concentrated: ${uniqueLongestByPosition.join('/')}`,
    );
    const means = positionLengths.map(lengths => lengths.reduce((sum, value) => sum + value, 0) / lengths.length);
    assert.ok(
      Math.max(...means) / Math.min(...means) <= 1.2,
      `${stage.kind} mean displayed option lengths differ by position: ${means.map(value => value.toFixed(1)).join('/')}`,
    );
  }
});

test('test-only keys prove that correct positions and correct-option lengths are balanced by stage', () => {
  const choiceItems = REVIEW_PREVIEW_ITEMS.filter(item => item.response.kind === 'single-choice');
  assert.equal(Object.keys(intendedCorrectTextById).length, choiceItems.length);
  const globalPositions = [0, 0, 0];

  for (const stage of stages) {
    const keyedItems = stage.items.filter(item => item.response.kind === 'single-choice');
    const positions = [0, 0, 0];
    let correctLengthTotal = 0;
    let distractorLengthTotal = 0;
    let distractorCount = 0;
    let uniquelyLongestCorrect = 0;
    let uniquelyLongestCount = 0;
    for (const item of keyedItems) {
      const options = item.displayOptions ?? [];
      const correctText = intendedCorrectTextById[item.id];
      assert.ok(correctText, `${item.id} is missing from the test-only answer manifest`);
      const correctIndex = options.findIndex(option => option.text === correctText);
      assert.notEqual(correctIndex, -1, `${item.id} no longer contains its intended correct answer`);
      positions[correctIndex] += 1;
      globalPositions[correctIndex] += 1;

      const lengths = options.map(option => optionLength(option.text));
      correctLengthTotal += lengths[correctIndex];
      lengths.forEach((length, index) => {
        if (index !== correctIndex) {
          distractorLengthTotal += length;
          distractorCount += 1;
        }
      });
      const maximum = Math.max(...lengths);
      if (lengths.filter(length => length === maximum).length === 1) {
        uniquelyLongestCount += 1;
        if (lengths[correctIndex] === maximum) uniquelyLongestCorrect += 1;
      }
    }
    assert.ok(
      Math.max(...positions) - Math.min(...positions) <= 1,
      `${stage.kind} correct positions are concentrated: ${positions.join('/')}`,
    );
    const correctMean = correctLengthTotal / keyedItems.length;
    const distractorMean = distractorLengthTotal / distractorCount;
    assert.ok(
      correctMean / distractorMean >= 0.8 && correctMean / distractorMean <= 1.2,
      `${stage.kind} correct/distractor mean-length ratio is ${(correctMean / distractorMean).toFixed(2)}`,
    );
    assert.ok(
      uniquelyLongestCorrect / uniquelyLongestCount <= 0.5,
      `${stage.kind} correct option is uniquely longest in ${uniquelyLongestCorrect}/${uniquelyLongestCount} eligible items`,
    );
  }
  assert.deepEqual(globalPositions, [11, 11, 11], 'the 33 single-choice keys should occupy A/B/C equally');
});

test('review client remains key-free; keyed position and keyed-length audits stay server-side', () => {
  assert.doesNotMatch(client, /correctAnswer|correctOption|answerKey|acceptedAnswers|acceptedOrders/);
});
