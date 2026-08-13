import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import {
  MATCHING_FEATURES_GUIDED_PASSAGE_ID,
  MATCHING_FEATURES_INDEPENDENT_PASSAGE_ID,
  MATCHING_FEATURES_LEGACY_STORAGE_KEY,
  MATCHING_FEATURES_LEVELS,
  MATCHING_FEATURES_PASSAGES,
  MATCHING_FEATURES_STORAGE_KEY,
  getMatchingFeaturesDrillFeatureIds,
  getMatchingFeaturesPassage,
} from '../src/data/practica-exams/ielts-reading-matching-features-progress.ts';

const questions = MATCHING_FEATURES_PASSAGES.flatMap((passage) => passage.questions.map((question) => ({ passage, question })));

test('the progressive bank contains six bounded passages and thirty unique attributions', () => {
  assert.equal(MATCHING_FEATURES_PASSAGES.length, 6);
  assert.equal(questions.length, 30);
  assert.equal(new Set(MATCHING_FEATURES_PASSAGES.map((passage) => passage.id)).size, 6);
  assert.equal(new Set(questions.map(({ question }) => question.id)).size, 30);
  assert.ok(MATCHING_FEATURES_PASSAGES.every((passage) => passage.sourceUrl.startsWith('https://')));
  assert.ok(MATCHING_FEATURES_PASSAGES.every((passage) => passage.sourceNote.length > 100));
});

test('every statement resolves to a feature and records evidence plus one competitor', () => {
  const codes = new Set();
  for (const { passage, question } of questions) {
    const featureIds = new Set(passage.features.map((feature) => feature.id));
    assert.ok(featureIds.has(question.answer), question.id);
    assert.ok(featureIds.has(question.closestDistractorId), question.id);
    assert.notEqual(question.answer, question.closestDistractorId, question.id);
    assert.ok(question.evidence.length >= 45, question.id);
    assert.ok(question.distractorFailure.length >= 45, question.id);
    codes.add(question.errorCode);
  }
  assert.deepEqual(codes, new Set(['nearby-name', 'shared-topic', 'wrong-actor', 'wrong-result', 'qualifier-loss', 'relationship-reversal']));
});

test('guided, independent and Progress Engine passage pools are separated', () => {
  assert.notEqual(MATCHING_FEATURES_GUIDED_PASSAGE_ID, MATCHING_FEATURES_INDEPENDENT_PASSAGE_ID);
  const engineIds = new Set(MATCHING_FEATURES_LEVELS.flatMap((level) => level.passageIds));
  assert.equal(engineIds.has(MATCHING_FEATURES_GUIDED_PASSAGE_ID), false);
  assert.equal(engineIds.has(MATCHING_FEATURES_INDEPENDENT_PASSAGE_ID), false);
  assert.equal(engineIds.size, 4);
});

test('the engine has two attribution drills followed by four complete feature maps', () => {
  assert.equal(MATCHING_FEATURES_LEVELS.length, 6);
  for (const level of MATCHING_FEATURES_LEVELS.slice(0, 2)) {
    assert.equal(level.questionIds?.length, 4);
    assert.equal(level.masteryScore, 3);
  }
  for (const level of MATCHING_FEATURES_LEVELS.slice(2)) {
    assert.equal(level.questionIds, undefined);
    assert.equal(level.passageIds.length, 1);
    const passage = getMatchingFeaturesPassage(level.passageIds[0]);
    assert.ok(passage);
    assert.ok(level.masteryScore >= passage.questions.length - 1);
    assert.ok(level.masteryScore <= passage.questions.length);
  }
});

test('feature reuse remains possible where several statements belong to one option', () => {
  const reusable = MATCHING_FEATURES_PASSAGES.filter((passage) => (
    new Set(passage.questions.map((question) => question.answer)).size < passage.questions.length
  ));
  assert.ok(reusable.length >= 3);
});

test('drill option order is deterministic, varied and defeats always-first', () => {
  const positions = new Set();
  for (const [seed, level] of MATCHING_FEATURES_LEVELS.slice(0, 2).entries()) {
    let firstChoiceScore = 0;
    for (const questionId of level.questionIds ?? []) {
      const passage = level.passageIds.map(getMatchingFeaturesPassage).find((item) => item?.questions.some((question) => question.id === questionId));
      const question = passage?.questions.find((item) => item.id === questionId);
      assert.ok(passage && question);
      const order = getMatchingFeaturesDrillFeatureIds(passage, question, seed);
      assert.deepEqual(order, getMatchingFeaturesDrillFeatureIds(passage, question, seed));
      assert.equal(order.length, 4);
      assert.equal(new Set(order).size, 4);
      const position = order.indexOf(question.answer);
      positions.add(position);
      if (position === 0) firstChoiceScore += 1;
    }
    assert.ok(firstChoiceScore < level.masteryScore, `${level.id}: always-first scored ${firstChoiceScore}/4`);
  }
  assert.ok(positions.size >= 3, `answer positions only covered ${[...positions].join(', ')}`);
});

test('a clean retry changes order while preserving the four available features', () => {
  let changed = 0;
  for (const { passage, question } of questions.slice(19)) {
    const first = getMatchingFeaturesDrillFeatureIds(passage, question, 0);
    const retry = getMatchingFeaturesDrillFeatureIds(passage, question, 1);
    assert.deepEqual(first.toSorted(), retry.toSorted());
    if (first.join('|') !== retry.join('|')) changed += 1;
  }
  assert.ok(changed >= 8);
});

test('storage is versioned and isolated to Matching Features', () => {
  assert.equal(MATCHING_FEATURES_STORAGE_KEY, 'welearn:ielts-reading:matching-features:v2');
  assert.equal(MATCHING_FEATURES_LEGACY_STORAGE_KEY, 'welearn:ielts-reading:matching-features:v1');
});

test('canonical and rewrite pages mount all three English practice surfaces', async () => {
  const canonical = await readFile(new URL('../src/app/(site)/practica/ielts/reading/tipos-de-preguntas/matching-features/page.tsx', import.meta.url), 'utf8');
  const publicPage = await readFile(new URL('../src/app/(site)/practica/ielts/reading/international-question-type/[slug]/page.tsx', import.meta.url), 'utf8');
  const lab = await readFile(new URL('../src/components/exam-practice/MatchingFeaturesPracticeLab.tsx', import.meta.url), 'utf8');
  for (const page of [canonical, publicPage]) {
    assert.match(page, /MatchingFeaturesGuidedPractice/);
    assert.match(page, /MatchingFeaturesIndependentPractice/);
    assert.match(page, /MatchingFeaturesProgressEngine/);
    assert.match(page, /SkillReviewSourceBlock/);
    assert.match(page, /IELTS_ACADEMIC_URL/);
  }
  assert.match(publicPage, /isMatchingFeatures/);
  assert.match(canonical, /locale: 'en_US'/);
  assert.doesNotMatch(canonical, /Tres pasajes|Práctica guiada|Reiniciar|Cómo resolver/);
  assert.match(lab, /type="radio"/);
  assert.match(lab, /Features may be used more than once/);
  assert.match(lab, /disabled=\{submitted\}/);
  assert.match(lab, /Press again to reset/);
  assert.match(lab, /drafts: Record<string, AttemptDraft>/);
  assert.match(lab, /not a secure Exam or proctored mode/);
});

test('the blueprint records Matching Features gates before scaling again', async () => {
  const blueprint = await readFile(new URL('../docs/ielts-reading-practice-engine-blueprint.md', import.meta.url), 'utf8');
  for (const required of [
    'Matching Features practice begins with a feature map',
    'nearby-name matching',
    'native clickable radio cards',
    '6 source-backed or conservatively bounded passages and 30 attribution decisions',
    'Next question-type vertical:** Matching Sentence Endings',
  ]) assert.match(blueprint, new RegExp(required.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
});
