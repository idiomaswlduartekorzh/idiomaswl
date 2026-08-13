import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import {
  FLOW_CHART_GUIDED_PASSAGE_ID,
  FLOW_CHART_INDEPENDENT_PASSAGE_ID,
  FLOW_CHART_LEVELS,
  FLOW_CHART_PASSAGES,
  FLOW_CHART_STORAGE_KEY,
  countFlowChartWords,
  getFlowChartPassage,
  isFlowChartCorrect,
  normalizeFlowChartAnswer,
} from '../src/data/practica-exams/ielts-reading-flow-chart-completion-progress.ts';

const decisions = FLOW_CHART_PASSAGES.flatMap((passage) => passage.decisions.map((decision) => ({ passage, decision })));

test('the progressive bank contains six passages and thirty-three process decisions', () => {
  assert.equal(FLOW_CHART_PASSAGES.length, 6);
  assert.equal(decisions.length, 33);
  assert.equal(new Set(FLOW_CHART_PASSAGES.map((passage) => passage.id)).size, 6);
  assert.equal(new Set(decisions.map(({ decision }) => decision.id)).size, 33);
  assert.ok(FLOW_CHART_PASSAGES.every((passage) => passage.sourceUrl.startsWith('https://')));
  assert.ok(FLOW_CHART_PASSAGES.every((passage) => passage.sourceNote.length > 120));
});

test('each passage exposes a connected sequence of at least five stages', () => {
  for (const passage of FLOW_CHART_PASSAGES) {
    assert.ok(passage.decisions.length >= 5, passage.id);
    assert.equal(new Set(passage.decisions.map((decision) => decision.label)).size, passage.decisions.length, passage.id);
    assert.ok(passage.flowTitle.length >= 12, passage.id);
  }
});

test('every primary answer is a literal passage span within its displayed limit', () => {
  for (const { passage, decision } of decisions) {
    assert.ok(normalizeFlowChartAnswer(passage.passage).includes(normalizeFlowChartAnswer(decision.answer)), decision.id);
    assert.ok(countFlowChartWords(decision.answer) <= decision.maxWords, decision.id);
    assert.equal(isFlowChartCorrect(decision, decision.answer), true, decision.id);
    assert.ok(decision.evidenceQuote.length >= 20, decision.id);
  }
});

test('the bank covers stage types and all six process diagnoses', () => {
  assert.deepEqual(new Set(decisions.map(({ decision }) => decision.stageType)), new Set(['input', 'action', 'condition', 'result', 'output']));
  assert.deepEqual(new Set(decisions.map(({ decision }) => decision.errorCode)), new Set(['sequence-skip', 'wrong-stage', 'connector-misread', 'grammar-mismatch', 'over-limit', 'copied-context']));
  assert.ok(decisions.every(({ decision }) => decision.trap.length >= 40));
});

test('guided, independent and Progress Engine passage pools are separated', () => {
  assert.notEqual(FLOW_CHART_GUIDED_PASSAGE_ID, FLOW_CHART_INDEPENDENT_PASSAGE_ID);
  const engineIds = new Set(FLOW_CHART_LEVELS.flatMap((level) => level.passageIds));
  assert.equal(engineIds.has(FLOW_CHART_GUIDED_PASSAGE_ID), false);
  assert.equal(engineIds.has(FLOW_CHART_INDEPENDENT_PASSAGE_ID), false);
  assert.equal(engineIds.size, 4);
});

test('two stage drills lead into four complete process maps', () => {
  assert.equal(FLOW_CHART_LEVELS.length, 6);
  for (const level of FLOW_CHART_LEVELS.slice(0, 2)) { assert.equal(level.decisionIds?.length, 4); assert.equal(level.masteryScore, 3); }
  for (const level of FLOW_CHART_LEVELS.slice(2)) {
    assert.equal(level.decisionIds, undefined); assert.equal(level.passageIds.length, 1);
    const passage = getFlowChartPassage(level.passageIds[0]); assert.ok(passage); assert.ok(level.masteryScore >= passage.decisions.length - 1);
  }
});

test('guided repair, closed independent feedback and versioned drafts are explicit', async () => {
  const lab = await readFile(new URL('../src/components/exam-practice/FlowChartCompletionPracticeLab.tsx', import.meta.url), 'utf8');
  assert.match(lab, /<input/); assert.match(lab, /disabled={checked}/); assert.match(lab, /Retry this stage/); assert.match(lab, /disabled={submitted}/); assert.match(lab, /Submit full flow/); assert.match(lab, /Repair this flow/); assert.match(lab, /Repair this level/); assert.match(lab, /Press again to reset/); assert.match(lab, /drafts: Record<string/); assert.match(lab, /aria-label="Flow-chart stage map"/);
});

test('Task 2 visual contracts are defined and mixed drills keep passage with decision', async () => {
  const lab = await readFile(new URL('../src/components/exam-practice/FlowChartCompletionPracticeLab.tsx', import.meta.url), 'utf8');
  const css = await readFile(new URL('../src/components/exam-practice/MatchingHeadingsPracticeLab.module.css', import.meta.url), 'utf8');
  for (const className of ['guidedLayout', 'independentLayout', 'engineHeader', 'engineStats', 'flowDrillGrid', 'flowDrillCard', 'flowAnswerCard', 'errorPanel']) {
    assert.match(lab, new RegExp(`styles\\.${className}`), className);
    assert.match(css, new RegExp(`\\.${className}\\b`), className);
  }
  const styleReferences = new Set([...lab.matchAll(/styles\.([A-Za-z0-9_]+)/g)].map((match) => match[1]));
  const styleDefinitions = new Set([...css.matchAll(/\.([A-Za-z_][A-Za-z0-9_-]*)/g)].map((match) => match[1]));
  assert.deepEqual([...styleReferences].filter((className) => !styleDefinitions.has(className)), []);
  assert.match(lab, /<ol className={`\$\{styles\.mapRail\} \$\{styles\.flowMapRail\}`}/);
  assert.match(css, /\.lab input:focus-visible/);
  assert.match(lab, /questions\.map\(\(\{ passage, decision \}/);
});

test('storage is versioned and isolated to Flow-chart Completion', () => {
  assert.equal(FLOW_CHART_STORAGE_KEY, 'welearn:ielts-reading:flow-chart-completion:v1');
});

test('canonical and public rewrite pages mount all three English practice surfaces', async () => {
  const canonical = await readFile(new URL('../src/app/(site)/practica/ielts/reading/tipos-de-preguntas/flow-chart-completion/page.tsx', import.meta.url), 'utf8');
  const publicPage = await readFile(new URL('../src/app/(site)/practica/ielts/reading/international-question-type/[slug]/page.tsx', import.meta.url), 'utf8');
  for (const page of [canonical, publicPage]) for (const required of ['FlowChartCompletionGuidedPractice', 'FlowChartCompletionIndependentPractice', 'FlowChartCompletionProgressEngine', 'SkillReviewSourceBlock']) assert.match(page, new RegExp(required));
  assert.match(publicPage, /isFlowChartCompletion/); assert.match(canonical, /locale: 'en_US'/); assert.doesNotMatch(canonical, /Cómo resolver|Tres procesos|Práctica guiada|Reiniciar/);
});

test('the page states the security and factual-source boundaries', async () => {
  const canonical = await readFile(new URL('../src/app/(site)/practica/ielts/reading/tipos-de-preguntas/flow-chart-completion/page.tsx', import.meta.url), 'utf8');
  assert.match(canonical, /not a secure Exam or proctored mode/);
  assert.match(canonical, /Candidate sources provide factual context but do not independently verify every composite claim/);
  assert.match(canonical, /previous and next boxes/);
});

test('the old immediate-feedback bank is no longer the canonical learning experience', async () => {
  const canonical = await readFile(new URL('../src/app/(site)/practica/ielts/reading/tipos-de-preguntas/flow-chart-completion/page.tsx', import.meta.url), 'utf8');
  assert.doesNotMatch(canonical, /FlowChartCompletionPassageBank/);
  assert.doesNotMatch(canonical, /IELTS_FLOW_CHART_COMPLETION_PASSAGES/);
});

test('the content guardian and blueprint pin Flow-chart before scaling again', async () => {
  const guardian = await readFile(new URL('../scripts/check-exam-practice-content.mjs', import.meta.url), 'utf8');
  for (const required of ['FlowChartCompletionGuidedPractice', 'FlowChartCompletionIndependentPractice', 'FlowChartCompletionProgressEngine']) assert.match(guardian, new RegExp(required));
  assert.doesNotMatch(guardian, /flow-chart-completion'[\s\S]{0,500}must render FlowChartCompletionPassageBank/);
  const blueprint = await readFile(new URL('../docs/ielts-reading-practice-engine-blueprint.md', import.meta.url), 'utf8');
  assert.match(blueprint, /Flow-chart Completion practice must begin with the whole process/);
  assert.match(blueprint, /6 source-backed or conservatively bounded passages and 33 process-stage decisions/);
  assert.match(blueprint, /Next question-type vertical:\*\* Diagram Labeling/);
});
