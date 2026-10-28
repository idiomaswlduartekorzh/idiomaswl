import assert from 'node:assert/strict';
import test from 'node:test';
import { IELTS_GUIDED_WRITING_DRAFTS_21_40 } from '../src/data/ielts/guided-writing-samples-21-40.draft.ts';

const BANDS = ['5.5', '9.0'] as const;
const CRITERIA = ['Task Response', 'Coherence & Cohesion', 'Lexical Resource', 'Grammatical Range & Accuracy'];

function wordCount(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

test('staged Writing references cover Sets 21-40 and bind to each canonical Task 2', async () => {
  const answers = new Set<string>();
  assert.deepEqual(
    Object.keys(IELTS_GUIDED_WRITING_DRAFTS_21_40),
    Array.from({ length: 20 }, (_, index) => `set-${index + 21}`),
  );

  for (let setNumber = 21; setNumber <= 40; setNumber += 1) {
    const mockId = `set-${setNumber}` as const;
    const reference = IELTS_GUIDED_WRITING_DRAFTS_21_40[mockId];
    assert.ok(reference, `${mockId}: Writing reference missing`);
    const mock = (await import(`../src/data/mocks/ielts-set-${setNumber}.ts`)).default;
    const task = mock.sections.flatMap((section: { questions: unknown[] }) => section.questions)
      .find((question: { type?: string; taskNumber?: number }) => question.type === 'write' && question.taskNumber === 2);
    assert.ok(task && task.type === 'write');
    const stimulus = task.stimulus.trim();
    const text = task.text.trim();
    const canonicalPrompt = stimulus === text ? stimulus : `${stimulus}\n\n${text}`.trim();
    assert.equal(reference.prompt, canonicalPrompt);
    assert.equal(reference.prompt.split(stimulus).length - 1, 1, `${mockId}: canonical prompt must appear exactly once`);

    for (const band of BANDS) {
      const sample = reference.samples[band];
      assert.equal(sample.wordCount, wordCount(sample.answer));
      assert.ok(sample.wordCount >= 250, `${mockId} band ${band}: below 250 words`);
      assert.ok(!answers.has(sample.answer), `${mockId} band ${band}: duplicate answer`);
      answers.add(sample.answer);
      assert.deepEqual(sample.criteria.map(([criterion]) => criterion), CRITERIA);
      assert.ok(sample.criteria.every(([, note]) => note.length > 45));
      assert.ok(sample.verdict.length > 60);
      assert.ok(sample.notice.length >= 3);
    }
  }

  assert.equal(answers.size, 40);
});
