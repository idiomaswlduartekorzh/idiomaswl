import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import {
  DIAGRAM_LABELING_GUIDED_PASSAGE_ID,
  DIAGRAM_LABELING_INDEPENDENT_PASSAGE_ID,
  DIAGRAM_LABELING_LEVELS,
  DIAGRAM_LABELING_PASSAGES,
  DIAGRAM_LABELING_STORAGE_KEY,
  countDiagramLabelingWords,
  getDiagramLabelingPassage,
  isDiagramLabelingCorrect,
  normalizeDiagramLabelingAnswer,
} from '../src/data/practica-exams/ielts-reading-diagram-labeling-progress.ts';

const decisions = DIAGRAM_LABELING_PASSAGES.flatMap((passage) => passage.decisions.map((decision) => ({ passage, decision })));

test('the progressive bank contains six passages and thirty-six visual decisions', () => {
  assert.equal(DIAGRAM_LABELING_PASSAGES.length, 6);
  assert.equal(decisions.length, 36);
  assert.equal(new Set(DIAGRAM_LABELING_PASSAGES.map((passage) => passage.id)).size, 6);
  assert.equal(new Set(decisions.map(({ decision }) => decision.id)).size, 36);
  assert.ok(DIAGRAM_LABELING_PASSAGES.every((passage) => passage.sourceUrl.startsWith('https://')));
  assert.ok(DIAGRAM_LABELING_PASSAGES.every((passage) => passage.sourceNote.length > 120));
});

test('every diagram exposes six unique visible markers with zones and landmarks', () => {
  for (const passage of DIAGRAM_LABELING_PASSAGES) {
    assert.equal(passage.decisions.length, 6, passage.id);
    assert.equal(new Set(passage.decisions.map((decision) => decision.marker)).size, 6, passage.id);
    assert.ok(passage.decisions.every((decision) => decision.zone.length >= 3 && decision.landmark.length >= 15), passage.id);
    for (const decision of passage.decisions) {
      const visibleMapCopy = normalizeDiagramLabelingAnswer(`${decision.zone} ${decision.landmark}`);
      for (const accepted of [decision.answer, ...decision.alternatives]) {
        assert.equal(visibleMapCopy.includes(normalizeDiagramLabelingAnswer(accepted)), false, `${decision.id} leaks ${accepted}`);
      }
    }
  }
});

test('every primary answer is a literal passage span within its displayed limit', () => {
  for (const { passage, decision } of decisions) {
    assert.ok(normalizeDiagramLabelingAnswer(passage.passage).includes(normalizeDiagramLabelingAnswer(decision.answer)), decision.id);
    assert.ok(countDiagramLabelingWords(decision.answer) <= decision.maxWords, decision.id);
    assert.equal(isDiagramLabelingCorrect(decision, decision.answer), true, decision.id);
    assert.ok(decision.evidenceQuote.length >= 20, decision.id);
  }
});

test('the bank covers three visual forms and all six diagnoses', () => {
  assert.deepEqual(new Set(DIAGRAM_LABELING_PASSAGES.map((passage) => passage.diagramType)), new Set(['cross-section', 'mechanism', 'layout']));
  assert.deepEqual(new Set(decisions.map(({ decision }) => decision.errorCode)), new Set(['visual-zone', 'wrong-part', 'direction-misread', 'grammar-mismatch', 'over-limit', 'copied-context']));
  assert.ok(decisions.every(({ decision }) => decision.trap.length >= 40));
});

test('guided, independent and Progress Engine passage pools are separated', () => {
  assert.notEqual(DIAGRAM_LABELING_GUIDED_PASSAGE_ID, DIAGRAM_LABELING_INDEPENDENT_PASSAGE_ID);
  const engineIds = new Set(DIAGRAM_LABELING_LEVELS.flatMap((level) => level.passageIds));
  assert.equal(engineIds.has(DIAGRAM_LABELING_GUIDED_PASSAGE_ID), false);
  assert.equal(engineIds.has(DIAGRAM_LABELING_INDEPENDENT_PASSAGE_ID), false);
  assert.equal(engineIds.size, 4);
});

test('two marker drills lead into four complete diagrams', () => {
  assert.equal(DIAGRAM_LABELING_LEVELS.length, 6);
  for (const level of DIAGRAM_LABELING_LEVELS.slice(0, 2)) { assert.equal(level.decisionIds?.length, 4); assert.equal(level.masteryScore, 3); }
  for (const level of DIAGRAM_LABELING_LEVELS.slice(2)) {
    assert.equal(level.decisionIds, undefined);
    assert.equal(level.passageIds.length, 1);
    const passage = getDiagramLabelingPassage(level.passageIds[0]);
    assert.ok(passage);
    assert.ok(level.masteryScore >= passage.decisions.length - 1);
  }
});

test('guided repair, closed independent feedback and versioned drafts are explicit', async () => {
  const lab = await readFile(new URL('../src/components/exam-practice/DiagramLabelingPracticeLab.tsx', import.meta.url), 'utf8');
  assert.match(lab, /<input/);
  assert.match(lab, /Repair this label/);
  assert.match(lab, /Submit full diagram/);
  assert.match(lab, /Repair this diagram/);
  assert.match(lab, /Repair this level/);
  assert.match(lab, /Press again to reset/);
  assert.match(lab, /drafts: Record<string/);
  assert.match(lab, /aria-label={`\$\{passage\.diagramTitle\} visual map`}/);
});

test('Task 2 visual contracts are defined and mixed drills keep diagram, passage and answer together', async () => {
  const lab = await readFile(new URL('../src/components/exam-practice/DiagramLabelingPracticeLab.tsx', import.meta.url), 'utf8');
  const css = await readFile(new URL('../src/components/exam-practice/MatchingHeadingsPracticeLab.module.css', import.meta.url), 'utf8');
  for (const className of ['guidedLayout', 'independentLayout', 'engineHeader', 'engineStats', 'flowDrillGrid', 'flowDrillCard', 'flowAnswerCard', 'errorPanel']) {
    assert.match(lab, new RegExp(`styles\\.${className}`), className);
    assert.match(css, new RegExp(`\\.${className}\\b`), className);
  }
  const styleReferences = new Set([...lab.matchAll(/styles\.([A-Za-z0-9_]+)/g)].map((match) => match[1]));
  const styleDefinitions = new Set([...css.matchAll(/\.([A-Za-z_][A-Za-z0-9_-]*)/g)].map((match) => match[1]));
  assert.deepEqual([...styleReferences].filter((className) => !styleDefinitions.has(className)), []);
  assert.match(lab, /questions\.map\(\(\{ passage, decision \}/);
  for (const className of ['diagramCanvas', 'diagramVisual', 'diagramCallouts']) assert.match(lab, new RegExp(`styles\\.${className}`));
});

test('storage is versioned and isolated to Diagram Labeling', () => {
  assert.equal(DIAGRAM_LABELING_STORAGE_KEY, 'welearn:ielts-reading:diagram-labeling:v1');
});

test('the learner sees six contextual schematics rather than one generic placeholder', async () => {
  const lab = await readFile(new URL('../src/components/exam-practice/DiagramLabelingPracticeLab.tsx', import.meta.url), 'utf8');
  for (const passageId of DIAGRAM_LABELING_PASSAGES.map((passage) => passage.id)) assert.match(lab, new RegExp(`['\"]${passageId}['\"]`));
  assert.match(lab, /function DiagramArtwork/);
  assert.doesNotMatch(lab, /<rect className=\{styles\.diagramBody\} x="38" y="19" width="24" height="62"/);
});

test('canonical and public rewrite pages mount all three English practice surfaces', async () => {
  const canonical = await readFile(new URL('../src/app/(site)/practica/ielts/reading/tipos-de-preguntas/diagram-labeling/page.tsx', import.meta.url), 'utf8');
  const publicPage = await readFile(new URL('../src/app/(site)/practica/ielts/reading/international-question-type/[slug]/page.tsx', import.meta.url), 'utf8');
  for (const page of [canonical, publicPage]) for (const required of ['DiagramLabelingGuidedPractice', 'DiagramLabelingIndependentPractice', 'DiagramLabelingProgressEngine', 'SkillReviewSourceBlock']) assert.match(page, new RegExp(required));
  assert.match(publicPage, /isDiagramLabeling/);
  assert.match(canonical, /locale: 'en_US'/);
  assert.doesNotMatch(canonical, /Cómo resolver|Práctica guiada|Reiniciar|Ubica la zona/);
});

test('the page states the official task and security boundaries', async () => {
  const canonical = await readFile(new URL('../src/app/(site)/practica/ielts/reading/tipos-de-preguntas/diagram-labeling/page.tsx', import.meta.url), 'utf8');
  assert.match(canonical, /machine, building or other visual/);
  assert.match(canonical, /not a secure Exam or proctored mode/);
  assert.match(canonical, /Candidate sources provide factual context but do not independently verify every composite claim/);
});

test('the old immediate-feedback bank is no longer the canonical learning experience', async () => {
  const canonical = await readFile(new URL('../src/app/(site)/practica/ielts/reading/tipos-de-preguntas/diagram-labeling/page.tsx', import.meta.url), 'utf8');
  assert.doesNotMatch(canonical, /DiagramLabelingPassageBank/);
  assert.doesNotMatch(canonical, /IELTS_DIAGRAM_LABELING_PASSAGES/);
});

test('the guardian pins the public rewrite and the blueprint records the shadow-route failure', async () => {
  const guardian = await readFile(new URL('../scripts/check-exam-practice-content.mjs', import.meta.url), 'utf8');
  for (const required of ['DiagramLabelingGuidedPractice', 'DiagramLabelingIndependentPractice', 'DiagramLabelingProgressEngine', 'public rewrite must include']) assert.match(guardian, new RegExp(required));
  const blueprint = await readFile(new URL('../docs/ielts-reading-practice-engine-blueprint.md', import.meta.url), 'utf8');
  assert.match(blueprint, /Diagram Labeling practice must begin with the whole visual/);
  assert.match(blueprint, /may not be replaced by one generic central shape/);
  assert.match(blueprint, /public rewrite serves a different component/);
  assert.match(blueprint, /6 source-backed or conservatively bounded passages and 36 visual-component decisions/);
  assert.match(blueprint, /Next question-type vertical:\*\* Short Answer/);
});
