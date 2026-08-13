import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import {
  NOTE_COMPLETION_GUIDED_PASSAGE_ID,
  NOTE_COMPLETION_INDEPENDENT_PASSAGE_ID,
  NOTE_COMPLETION_LEVELS,
  NOTE_COMPLETION_PASSAGES,
  NOTE_COMPLETION_STORAGE_KEY,
  countNoteCompletionWords,
  getNoteCompletionPassage,
  isNoteCompletionCorrect,
  normalizeNoteCompletionAnswer,
} from '../src/data/practica-exams/ielts-reading-note-completion-progress.ts';

const decisions = NOTE_COMPLETION_PASSAGES.flatMap((passage) =>
  passage.decisions.map((decision) => ({ passage, decision }))
);

test('the progressive bank contains six passages and thirty-six structured-note decisions', () => {
  assert.equal(NOTE_COMPLETION_PASSAGES.length, 6);
  assert.equal(decisions.length, 36);
  assert.equal(new Set(NOTE_COMPLETION_PASSAGES.map((passage) => passage.id)).size, 6);
  assert.equal(new Set(decisions.map(({ decision }) => decision.id)).size, 36);
  assert.ok(NOTE_COMPLETION_PASSAGES.every((passage) => passage.sourceUrl.startsWith('https://')));
  assert.ok(NOTE_COMPLETION_PASSAGES.every((passage) => passage.sourceNote.length > 120));
});

test('each passage exposes three headings with two decisions per group', () => {
  for (const passage of NOTE_COMPLETION_PASSAGES) {
    const counts = Object.groupBy(passage.decisions, (decision) => decision.groupHeading);
    assert.equal(Object.keys(counts).length, 3, passage.id);
    assert.ok(Object.values(counts).every((group) => group?.length === 2), passage.id);
  }
});

test('every primary answer is a literal passage span within its displayed limit', () => {
  for (const { passage, decision } of decisions) {
    assert.ok(normalizeNoteCompletionAnswer(passage.passage).includes(normalizeNoteCompletionAnswer(decision.answer)), decision.id);
    assert.ok(countNoteCompletionWords(decision.answer) <= decision.maxWords, decision.id);
    assert.equal(isNoteCompletionCorrect(decision, decision.answer), true, decision.id);
    assert.ok(decision.evidenceQuote.length >= 20, decision.id);
    assert.ok(decision.groupHeading.length >= 4, decision.id);
  }
});

test('the inherited duplicate-frame alternative remains rejected', () => {
  const roof = decisions.find(({ decision }) => decision.id === 'note-urban-farms-06')?.decision;
  assert.ok(roof);
  assert.equal(isNoteCompletionCorrect(roof, 'roof'), true);
  assert.equal(isNoteCompletionCorrect(roof, 'the roof'), false);
  assert.deepEqual(roof.alternatives, []);
});

test('the bank covers all six heading, evidence and answer-boundary diagnoses', () => {
  assert.deepEqual(new Set(decisions.map(({ decision }) => decision.errorCode)), new Set([
    'heading-ignored', 'wrong-note-group', 'grammar-mismatch', 'over-limit', 'incomplete-span', 'copied-context',
  ]));
  assert.ok(decisions.every(({ decision }) => decision.trap.length >= 40));
});

test('guided, independent and Progress Engine passage pools are separated', () => {
  assert.notEqual(NOTE_COMPLETION_GUIDED_PASSAGE_ID, NOTE_COMPLETION_INDEPENDENT_PASSAGE_ID);
  const engineIds = new Set(NOTE_COMPLETION_LEVELS.flatMap((level) => level.passageIds));
  assert.equal(engineIds.has(NOTE_COMPLETION_GUIDED_PASSAGE_ID), false);
  assert.equal(engineIds.has(NOTE_COMPLETION_INDEPENDENT_PASSAGE_ID), false);
  assert.equal(engineIds.size, 4);
});

test('two focused drills lead into four complete passage sets', () => {
  assert.equal(NOTE_COMPLETION_LEVELS.length, 6);
  for (const level of NOTE_COMPLETION_LEVELS.slice(0, 2)) {
    assert.equal(level.decisionIds?.length, 4);
    assert.equal(level.masteryScore, 3);
  }
  for (const level of NOTE_COMPLETION_LEVELS.slice(2)) {
    assert.equal(level.decisionIds, undefined);
    assert.equal(level.passageIds.length, 1);
    const passage = getNoteCompletionPassage(level.passageIds[0]);
    assert.ok(passage);
    assert.ok(level.masteryScore >= passage.decisions.length - 1);
  }
});

test('guided repair, closed independent feedback and versioned drafts are explicit', async () => {
  const lab = await readFile(new URL('../src/components/exam-practice/NoteCompletionPracticeLab.tsx', import.meta.url), 'utf8');
  assert.match(lab, /<input/);
  assert.match(lab, /disabled=\{checked\}/);
  assert.match(lab, /Retry this note/);
  assert.match(lab, /disabled=\{submitted\}/);
  assert.match(lab, /Submit full set/);
  assert.match(lab, /Press again to reset/);
  assert.match(lab, /drafts: Record<string, AttemptDraft>/);
  assert.match(lab, /aria-label="Note group map"/);
});

test('storage is versioned and isolated to Note Completion', () => {
  assert.equal(NOTE_COMPLETION_STORAGE_KEY, 'welearn:ielts-reading:note-completion:v1');
});

test('canonical and public rewrite pages mount all three English practice surfaces', async () => {
  const canonical = await readFile(new URL('../src/app/(site)/practica/ielts/reading/tipos-de-preguntas/note-completion/page.tsx', import.meta.url), 'utf8');
  const publicPage = await readFile(new URL('../src/app/(site)/practica/ielts/reading/international-question-type/[slug]/page.tsx', import.meta.url), 'utf8');
  for (const page of [canonical, publicPage]) {
    assert.match(page, /NoteCompletionGuidedPractice/);
    assert.match(page, /NoteCompletionIndependentPractice/);
    assert.match(page, /NoteCompletionProgressEngine/);
    assert.match(page, /SkillReviewSourceBlock/);
    assert.match(page, /IELTS_ACADEMIC_URL/);
  }
  assert.match(publicPage, /isNoteCompletion/);
  assert.match(canonical, /locale: 'en_US'/);
  assert.doesNotMatch(canonical, /Cómo resolver|Tres pasajes|Práctica guiada|Reiniciar/);
});

test('the content guardian requires progressive Note Completion surfaces', async () => {
  const guardian = await readFile(new URL('../scripts/check-exam-practice-content.mjs', import.meta.url), 'utf8');
  for (const required of ['NoteCompletionGuidedPractice', 'NoteCompletionIndependentPractice', 'NoteCompletionProgressEngine']) {
    assert.match(guardian, new RegExp(required));
  }
  assert.doesNotMatch(guardian, /note-completion'[\s\S]{0,500}must render NoteCompletionPassageBank/);
});

test('the blueprint records Note Completion gates before scaling again', async () => {
  const blueprint = await readFile(new URL('../docs/ielts-reading-practice-engine-blueprint.md', import.meta.url), 'utf8');
  for (const required of [
    'Note Completion practice must treat every group heading as an evidence boundary',
    '6 source-backed or conservatively bounded passages and 36 structured-note decisions',
    'Next question-type vertical:** Flow-chart Completion',
  ]) assert.match(blueprint, new RegExp(required.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
});
