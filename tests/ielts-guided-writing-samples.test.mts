import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { IELTS_GUIDED_SET_1_WRITING } from '../src/data/ielts/guided-set-1.ts';
import type { IeltsGuidedWritingReference } from '../src/data/ielts/guided-mock.ts';
import { IELTS_GUIDED_WRITING_55_AUTHORED_SAMPLES } from '../src/data/ielts/guided-writing-band-55.ts';
import { IELTS_GUIDED_WRITING_BY_SET } from '../src/data/ielts/guided-writing-samples.ts';
import type { MockExam } from '../src/data/mocks/types.ts';

const EXPECTED_BANDS = ['5.5', '9.0'] as const;
const EXPECTED_CRITERIA = ['Task Response', 'Coherence & Cohesion', 'Lexical Resource', 'Grammatical Range & Accuracy'];

function countWords(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

test('guided Writing provides exactly two complete samples for each of the 20 IELTS mocks', async () => {
  const references: Partial<Record<string, IeltsGuidedWritingReference>> = IELTS_GUIDED_WRITING_BY_SET;
  const answers = new Set<string>();
  let sampleCount = 0;

  for (let setNumber = 1; setNumber <= 20; setNumber += 1) {
    const mockId = `set-${setNumber}`;
    const reference: IeltsGuidedWritingReference | undefined = setNumber === 1
      ? IELTS_GUIDED_SET_1_WRITING
      : references[mockId];
    assert.ok(reference, `missing Writing reference for ${mockId}`);
    assert.deepEqual(Object.keys(reference.samples).sort(), [...EXPECTED_BANDS], `${mockId} must have only band 5.5 and 9.0`);

    for (const band of EXPECTED_BANDS) {
      const modelAnswer: IeltsGuidedWritingReference['samples'][typeof band] = reference.samples[band];
      sampleCount += 1;
      assert.equal(countWords(modelAnswer.answer), modelAnswer.wordCount, `${mockId} band ${band} word count drifted`);
      assert.ok(modelAnswer.wordCount >= 250, `${mockId} band ${band} is below the Task 2 minimum`);
      assert.equal(modelAnswer.label, `Referencia pedagógica aproximada · Banda ${band === '9.0' ? '9' : band}`);
      assert.ok(modelAnswer.verdict.trim().length > 40, `${mockId} band ${band} needs a substantive verdict`);
      assert.deepEqual(modelAnswer.criteria.map(([criterion]) => criterion), EXPECTED_CRITERIA, `${mockId} band ${band} criteria drifted`);
      assert.equal(modelAnswer.criteria.length, 4);
      assert.ok(modelAnswer.criteria.every(([, observation]) => observation.trim().length > 35));
      assert.ok(modelAnswer.notice.length >= 3, `${mockId} band ${band} needs teaching observations`);
      if ('transcript' in modelAnswer) assert.equal(modelAnswer.transcript, modelAnswer.answer);
      assert.ok(!answers.has(modelAnswer.answer), `${mockId} band ${band} duplicates another model answer`);
      answers.add(modelAnswer.answer);
    }
  }

  assert.equal(sampleCount, 40);
  assert.equal(answers.size, 40);
  assert.deepEqual(Object.keys(IELTS_GUIDED_WRITING_BY_SET), Array.from({ length: 19 }, (_, index) => `set-${index + 2}`));
});

test('each guided Writing prompt is bound to its executable mock Task 2', async () => {
  const references: Partial<Record<string, IeltsGuidedWritingReference>> = IELTS_GUIDED_WRITING_BY_SET;
  for (let setNumber = 1; setNumber <= 20; setNumber += 1) {
    const mockId = `set-${setNumber}`;
    const mock = (await import(`../src/data/mocks/ielts-set-${setNumber}.ts`)).default as MockExam;
    const task = mock.sections
      .flatMap(section => section.questions)
      .find(question => question.type === 'write' && question.taskNumber === 2);
    assert.ok(task && task.type === 'write', `missing executable Task 2 for ${mockId}`);

    const reference = setNumber === 1
      ? IELTS_GUIDED_SET_1_WRITING
      : references[mockId];
    assert.ok(reference);

    const expectedPrompt = `${task.stimulus}\n\n${task.text}`.trim();
    assert.equal(reference.prompt, expectedPrompt, `${mockId} guided prompt does not match the mock`);
  }
});

test('band 5.5 references for Sets 2–20 expose varied evidence across all four criteria', () => {
  const references: Partial<Record<string, IeltsGuidedWritingReference>> = IELTS_GUIDED_WRITING_BY_SET;
  assert.deepEqual(
    IELTS_GUIDED_WRITING_55_AUTHORED_SAMPLES.map(sample => sample.setId),
    Array.from({ length: 19 }, (_, index) => `set-${index + 2}`),
  );
  const grammarProfileSizes = new Set(IELTS_GUIDED_WRITING_55_AUTHORED_SAMPLES.map(sample => sample.grammarEvidence?.length ?? 0));
  const paragraphCounts = new Set(IELTS_GUIDED_WRITING_55_AUTHORED_SAMPLES.map(sample => sample.answer.split('\n\n').length));
  const formulaicConclusions = IELTS_GUIDED_WRITING_55_AUTHORED_SAMPLES.filter(sample => /\n\nIn conclusion,/.test(sample.answer));
  assert.ok(grammarProfileSizes.size >= 4, 'grammar evidence must vary from accurate/simple profiles to several natural slips');
  assert.ok(paragraphCounts.size >= 3, 'responses must vary their paragraph architecture');
  assert.ok(formulaicConclusions.length < IELTS_GUIDED_WRITING_55_AUTHORED_SAMPLES.length / 2, 'most responses must not share the same formulaic conclusion');

  for (const authored of IELTS_GUIDED_WRITING_55_AUTHORED_SAMPLES) {
    const reference = references[authored.setId];
    assert.ok(reference, `${authored.setId} must have a Writing reference`);
    const model = reference.samples['5.5'];
    const notes = Object.fromEntries(model.criteria);

    assert.equal(model.answer, authored.answer, `${authored.setId} must use its independently authored intermediate response`);
    assert.equal(notes['Task Response'], authored.taskResponseNote);
    assert.equal(notes['Coherence & Cohesion'], authored.cohesionNote);
    assert.equal(notes['Lexical Resource'], authored.lexicalNote);
    for (const marker of authored.cohesionMarkers ?? []) {
      assert.ok(model.answer.includes(marker), `${authored.setId} is missing cohesion signal “${marker}”`);
    }
    if (authored.repeatedTerm) {
      const repetitions = model.answer.match(new RegExp(`\\b${authored.repeatedTerm}\\w*\\b`, 'gi'))?.length ?? 0;
      assert.ok(repetitions >= 3, `${authored.setId} declares repetition of “${authored.repeatedTerm}” but does not show it`);
    }
    for (const evidence of authored.grammarEvidence ?? []) {
      assert.ok(model.answer.includes(evidence), `${authored.setId} is missing grammar evidence “${evidence}”`);
      assert.ok(notes['Grammatical Range & Accuracy'].includes(evidence), `${authored.setId} criterion note must cite “${evidence}”`);
    }
    assert.ok(model.notice.some(note => /general|repeticiones/i.test(note)), `${authored.setId} needs an explicit calibration notice`);
  }
});

test('Set 5 takes a different analytical angle from the inherited Set 1 sample', () => {
  const set1Band9 = IELTS_GUIDED_SET_1_WRITING.samples['9.0'].answer;
  const set5Band9 = IELTS_GUIDED_WRITING_BY_SET['set-5'].samples['9.0'].answer;
  assert.match(set5Band9, /aggregate effects|housing, energy and care requirements/);
  assert.match(set5Band9, /mixed-size developments|duplicated space/);
  assert.doesNotMatch(set1Band9, /aggregate effects|mixed-size developments|duplicated space/);
});

test('transport-related sets use distinct organising angles', () => {
  const set4 = IELTS_GUIDED_WRITING_BY_SET['set-4'].samples['9.0'].answer;
  const set11 = IELTS_GUIDED_WRITING_BY_SET['set-11'].samples['9.0'].answer;
  const set20 = IELTS_GUIDED_WRITING_BY_SET['set-20'].samples['9.0'].answer;
  assert.match(set4, /staggered school schedules|timed delivery windows/);
  assert.match(set11, /climatic resilience|passive shading|municipal procurement/);
  assert.match(set20, /mobility hubs|congestion charging|freight consolidation centres/);

  const set4Lexical = IELTS_GUIDED_WRITING_BY_SET['set-4'].samples['9.0'].criteria
    .find(([criterion]) => criterion === 'Lexical Resource')?.[1] ?? '';
  for (const quotedExpression of set4Lexical.matchAll(/“([^”]+)”/g)) {
    assert.ok(set4.includes(quotedExpression[1]), `Set 4 feedback cites absent expression “${quotedExpression[1]}”`);
  }
});

test('Writing UI and documentation disclose approximation and Set 1 provenance', async () => {
  const [coachSource, documentation, writingSource] = await Promise.all([
    readFile(new URL('../src/app/(site)/examenes/[exam]/practica/[mockId]/guiado/IeltsGuidedMockCoach.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../docs/ielts-guided-sets-1-20.md', import.meta.url), 'utf8'),
    readFile(new URL('../src/data/ielts/guided-writing-samples.ts', import.meta.url), 'utf8'),
  ]);
  assert.match(coachSource, /Estas muestras son referencias aproximadas, no calificaciones oficiales/);
  assert.match(coachSource, /className=\{styles\.noticeStrip\} role="note"/);
  assert.match(documentation, /Sets 2–20; Set 1 conserva material\s+heredado y no se presenta como original/);
  assert.doesNotMatch(writingSource, /'5\.5':\s*(?:sample|advancedSample)\(/, 'discarded 5.5 essays must not remain beside the canonical samples');
  assert.doesNotMatch(writingSource, /sourceAnchor|startsWith\(/, 'Writing binding must use an explicit set id, not prose matching');
});
