import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import {
  MATCHING_HEADINGS_GUIDED_PASSAGE_ID,
  MATCHING_HEADINGS_INDEPENDENT_PASSAGE_ID,
  MATCHING_HEADINGS_LEGACY_STORAGE_KEY,
  MATCHING_HEADINGS_LEVELS,
  MATCHING_HEADINGS_PASSAGES,
  MATCHING_HEADINGS_STORAGE_KEY,
  getMatchingHeadingsDrillOptionIds,
} from '../src/data/practica-exams/ielts-reading-matching-headings-progress.ts';

const paragraphRows = MATCHING_HEADINGS_PASSAGES.flatMap((passage) =>
  passage.paragraphs.map((paragraph) => ({ passage, paragraph })),
);

test('the pilot contains six source-backed passages and thirty unique decisions', () => {
  assert.equal(MATCHING_HEADINGS_PASSAGES.length, 6);
  assert.equal(paragraphRows.length, 30);
  assert.equal(new Set(MATCHING_HEADINGS_PASSAGES.map((passage) => passage.id)).size, 6);
  assert.equal(new Set(paragraphRows.map(({ paragraph }) => paragraph.id)).size, 30);
  assert.equal(new Set(MATCHING_HEADINGS_PASSAGES.map((passage) => passage.sourceUrl)).size, 6);
  assert.ok(MATCHING_HEADINGS_PASSAGES.every((passage) => passage.sourceUrl.startsWith('https://')));
  assert.ok(MATCHING_HEADINGS_PASSAGES.every((passage) => /EPA|NOAA|NIH|NASA|USDA|European/i.test(`${passage.sourceTitle} ${passage.sourceNote}`)));
});

test('each passage has five paragraphs, seven headings and two unused options', () => {
  for (const passage of MATCHING_HEADINGS_PASSAGES) {
    assert.equal(passage.paragraphs.length, 5, passage.id);
    assert.equal(passage.headings.length, 7, passage.id);
    const headingIds = passage.headings.map((heading) => heading.id);
    const answers = passage.paragraphs.map((paragraph) => paragraph.answerHeadingId);
    assert.equal(new Set(headingIds).size, 7, `${passage.id}: heading IDs`);
    assert.equal(new Set(answers).size, 5, `${passage.id}: answers must not reuse a heading`);
    assert.ok(answers.every((id) => headingIds.includes(id)), `${passage.id}: every answer resolves`);
    assert.equal(headingIds.filter((id) => !answers.includes(id)).length, 2, `${passage.id}: two unused headings`);
  }
});

test('every paragraph has auditable evidence and a distinct, resolvable distractor', () => {
  for (const { passage, paragraph } of paragraphRows) {
    const headingIds = passage.headings.map((heading) => heading.id);
    assert.ok(paragraph.text.split(/\s+/u).length >= 35, paragraph.id);
    assert.ok(paragraph.evidence.length >= 55, paragraph.id);
    assert.ok(paragraph.distractorFailure.length >= 45, paragraph.id);
    assert.notEqual(paragraph.closestDistractorId, paragraph.answerHeadingId, paragraph.id);
    assert.ok(headingIds.includes(paragraph.closestDistractorId), paragraph.id);
    assert.ok(['detail-not-main-idea', 'keyword-match', 'wrong-paragraph-function', 'too-broad', 'unsupported-claim'].includes(paragraph.errorCode));
  }
});

test('answer positions are balanced across the complete pilot', () => {
  const counts = Object.fromEntries(['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii'].map((id) => [id, 0]));
  for (const { paragraph } of paragraphRows) counts[paragraph.answerHeadingId] += 1;
  assert.ok(Object.values(counts).every((count) => count >= 3 && count <= 6), JSON.stringify(counts));
});

test('exact vocabulary overlap cannot solve most paragraph-heading decisions', () => {
  const stopwords = new Set('a an and are as at be been being by for from had has have he her hers him his i if in into is it its me my of on or our ours she that the their theirs them they this those to was we were what when where which who why will with you your'.split(' '));
  const tokens = (value) => new Set((value.toLowerCase().match(/[a-z]+/g) ?? []).filter((token) => token.length > 2 && !stopwords.has(token)));
  let uniqueWinners = 0;
  let uniqueWinnerHits = 0;

  for (const { passage, paragraph } of paragraphRows) {
    const paragraphTokens = tokens(paragraph.text);
    const scores = passage.headings.map((heading) => ({
      id: heading.id,
      score: [...tokens(heading.text)].filter((token) => paragraphTokens.has(token)).length,
    }));
    const highest = Math.max(...scores.map(({ score }) => score));
    const winners = scores.filter(({ score }) => score === highest);
    if (winners.length !== 1) continue;
    uniqueWinners += 1;
    if (winners[0].id === paragraph.answerHeadingId) uniqueWinnerHits += 1;
  }

  assert.ok(uniqueWinners <= 10, `exact overlap produced ${uniqueWinners}/30 unique winners`);
  assert.ok(uniqueWinners === 0 || uniqueWinnerHits / uniqueWinners <= 0.8, `exact-overlap shortcut hit ${uniqueWinnerHits}/${uniqueWinners}`);
});

test('guided, independent and engine passage pools are separated', () => {
  assert.notEqual(MATCHING_HEADINGS_GUIDED_PASSAGE_ID, MATCHING_HEADINGS_INDEPENDENT_PASSAGE_ID);
  const engineIds = new Set(MATCHING_HEADINGS_LEVELS.flatMap((level) => level.passageIds));
  assert.equal(engineIds.has(MATCHING_HEADINGS_GUIDED_PASSAGE_ID), false);
  assert.equal(engineIds.has(MATCHING_HEADINGS_INDEPENDENT_PASSAGE_ID), false);
  assert.equal(engineIds.size, 4);
});

test('the progress engine has four drills followed by four complete passages', () => {
  assert.equal(MATCHING_HEADINGS_LEVELS.length, 8);
  for (const level of MATCHING_HEADINGS_LEVELS.slice(0, 4)) {
    assert.equal(level.questionIds?.length, 4, level.id);
    assert.equal(level.masteryScore, 3, level.id);
  }
  for (const level of MATCHING_HEADINGS_LEVELS.slice(4)) {
    assert.equal(level.questionIds, undefined, level.id);
    assert.equal(level.passageIds.length, 1, level.id);
    assert.equal(level.masteryScore, 4, level.id);
  }
  const allParagraphIds = new Set(paragraphRows.map(({ paragraph }) => paragraph.id));
  for (const level of MATCHING_HEADINGS_LEVELS.slice(0, 4)) {
    assert.ok(level.questionIds?.every((id) => allParagraphIds.has(id)), level.id);
  }
});

test('storage is versioned, migratable and scoped to the Matching Headings unit', () => {
  assert.equal(MATCHING_HEADINGS_STORAGE_KEY, 'welearn:ielts-reading:matching-headings:v2');
  assert.equal(MATCHING_HEADINGS_LEGACY_STORAGE_KEY, 'welearn:ielts-reading:matching-headings:v1');
});

test('short drills use deterministic varied positions and reject an always-first shortcut', () => {
  const drillLevels = MATCHING_HEADINGS_LEVELS.slice(0, 4);
  const firstChoiceScores = [];
  const correctPositions = new Set();

  for (const [attemptSeed, level] of drillLevels.entries()) {
    let firstChoiceScore = 0;
    for (const questionId of level.questionIds ?? []) {
      const row = paragraphRows.find(({ paragraph }) => paragraph.id === questionId);
      assert.ok(row, questionId);
      const order = getMatchingHeadingsDrillOptionIds(row.passage, row.paragraph, attemptSeed);
      assert.deepEqual(order, getMatchingHeadingsDrillOptionIds(row.passage, row.paragraph, attemptSeed));
      assert.equal(order.length, 4);
      assert.equal(new Set(order).size, 4);
      assert.ok(order.includes(row.paragraph.answerHeadingId));
      assert.ok(order.includes(row.paragraph.closestDistractorId));
      const correctPosition = order.indexOf(row.paragraph.answerHeadingId);
      correctPositions.add(correctPosition);
      if (correctPosition === 0) firstChoiceScore += 1;
    }
    firstChoiceScores.push(firstChoiceScore);
    assert.ok(firstChoiceScore < level.masteryScore, `${level.id}: first-option strategy scored ${firstChoiceScore}/${level.questionIds?.length}`);
  }

  assert.ok(correctPositions.size >= 3, `correct positions only covered ${[...correctPositions].join(', ')}`);
  assert.ok(firstChoiceScores.some((score) => score === 0));
});

test('a clean retry changes option order without changing the option set', () => {
  for (const { passage, paragraph } of paragraphRows.slice(0, 8)) {
    const first = getMatchingHeadingsDrillOptionIds(passage, paragraph, 0);
    const retry = getMatchingHeadingsDrillOptionIds(passage, paragraph, 1);
    assert.deepEqual(first.toSorted(), retry.toSorted(), paragraph.id);
  }
  assert.ok(paragraphRows.slice(0, 8).some(({ passage, paragraph }) => (
    getMatchingHeadingsDrillOptionIds(passage, paragraph, 0).join(',') !==
    getMatchingHeadingsDrillOptionIds(passage, paragraph, 1).join(',')
  )));
});

test('the public question-type page mounts all three real-practice surfaces', async () => {
  const page = await readFile(new URL('../src/app/(site)/practica/ielts/reading/international-question-type/[slug]/page.tsx', import.meta.url), 'utf8');
  const lab = await readFile(new URL('../src/components/exam-practice/MatchingHeadingsPracticeLab.tsx', import.meta.url), 'utf8');
  const whatsAppFloat = await readFile(new URL('../src/components/WhatsAppFloat.tsx', import.meta.url), 'utf8');
  assert.match(page, /MatchingHeadingsGuidedPractice/);
  assert.match(page, /MatchingHeadingsIndependentPractice/);
  assert.match(page, /MatchingHeadingsProgressEngine/);
  assert.match(page, /slug === 'matching-headings'/);
  assert.match(lab, /type="radio"/);
  assert.match(lab, /<fieldset/);
  assert.match(lab, /<legend className=\{styles\.srOnly\}>/);
  assert.match(lab, /Choose the best heading/);
  assert.match(lab, /HeadingOptionButtons/);
  assert.match(lab, /independent-\$\{paragraph\.id\}/);
  assert.match(lab, /disabled=\{usedElsewhere\.has\(heading\.id\)\}/);
  assert.match(lab, /disabledIds=\{usedHeadingIds\}/);
  assert.match(lab, /Worked decision/);
  assert.match(lab, /Press again to restart/);
  assert.match(lab, /Press again to reset/);
  assert.match(lab, /drafts: Record<string, AttemptDraft>/);
  assert.match(lab, /parsed\.activeLevelIndex === undefined/);
  assert.match(lab, /normalizeDrafts\(parsed\.drafts\)/);
  assert.match(lab, /opens in a new tab/);
  assert.match(whatsAppFloat, /@media \(max-width: 640px\)[\s\S]*body:has\(\[data-active-practice="true"\]\) \.wl-wa-float/);
  assert.doesNotMatch(whatsAppFloat, /@media \(max-width: 640px\) and \(pointer: coarse\)[\s\S]*body:has/);
});

test('the scalable Reading blueprint records the audit regressions as mandatory gates', async () => {
  const blueprint = await readFile(new URL('../docs/ielts-reading-practice-engine-blueprint.md', import.meta.url), 'utf8');
  const migration = await readFile(new URL('../docs/ielts-toefl-migration-plan.md', import.meta.url), 'utf8');
  for (const rule of [
    'always choosing the first option cannot pass',
    'a heading cannot be reused',
    'native radio inputs',
    'Persist active level, in-progress answers, elapsed time',
    'Floating commercial controls must not obscure',
    'worked example must expose the reasoning sequence',
    'lexical-overlap winner',
    'real-browser story pass',
  ]) assert.match(blueprint, new RegExp(rule, 'i'), rule);
  assert.match(migration, /ielts-reading-practice-engine-blueprint\.md/);
});
