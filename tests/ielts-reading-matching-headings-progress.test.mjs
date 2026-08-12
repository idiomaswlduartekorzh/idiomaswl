import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import {
  MATCHING_HEADINGS_GUIDED_PASSAGE_ID,
  MATCHING_HEADINGS_INDEPENDENT_PASSAGE_ID,
  MATCHING_HEADINGS_LEVELS,
  MATCHING_HEADINGS_PASSAGES,
  MATCHING_HEADINGS_STORAGE_KEY,
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

test('storage is versioned and scoped to the Matching Headings unit', () => {
  assert.equal(MATCHING_HEADINGS_STORAGE_KEY, 'welearn:ielts-reading:matching-headings:v1');
});

test('the public question-type page mounts all three real-practice surfaces', async () => {
  const page = await readFile(new URL('../src/app/(site)/practica/ielts/reading/international-question-type/[slug]/page.tsx', import.meta.url), 'utf8');
  const lab = await readFile(new URL('../src/components/exam-practice/MatchingHeadingsPracticeLab.tsx', import.meta.url), 'utf8');
  assert.match(page, /MatchingHeadingsGuidedPractice/);
  assert.match(page, /MatchingHeadingsIndependentPractice/);
  assert.match(page, /MatchingHeadingsProgressEngine/);
  assert.match(page, /slug === 'matching-headings'/);
  assert.match(lab, /role="radiogroup"/);
  assert.match(lab, /role="radio"/);
  assert.match(lab, /Choose the best heading/);
  assert.match(lab, /HeadingOptionButtons/);
  assert.match(lab, /independent-\$\{paragraph\.id\}/);
  assert.match(lab, /disabled=\{usedElsewhere\.has\(heading\.id\)\}/);
});
