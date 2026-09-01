import assert from 'node:assert/strict';
import test from 'node:test';

import {
  ieltsListeningQuestionNumbers,
  ieltsListeningResponseSpecs,
  projectIeltsListeningPractice,
  scoreIeltsListeningPractice,
  validateIeltsListeningResponses,
} from '../src/lib/ielts/listening-practice-contract.ts';

function option(key, label) {
  return { key, label };
}

function answer(number, prompt, correctOptionKey) {
  return {
    number,
    prompt,
    correctOptionKey,
    expected: correctOptionKey,
    explanation: `The discussion gives direct evidence that option ${correctOptionKey} resolves Question ${number}.`,
  };
}

function matchingAnswer(number, prompt, correctOptionKey) {
  return {
    number,
    prompt,
    correctOptionKey,
    explanation: `The discussion gives direct evidence that option ${correctOptionKey} resolves Question ${number}.`,
  };
}

function sourceFixture() {
  return {
    id: 'welearn-listening-part-3-001',
    contentVersion: '2099-01-01.test.1',
    part: 3,
    practiceNumber: 1,
    title: 'Contract-only Part 3 fixture',
    scenario: 'Three people discuss a small educational research project.',
    instructions: 'Listen and answer Questions 21–30.',
    transcript: 'A private transcript that must not appear in the projected practice.',
    audio: {
      localPath: '/audio/ielts/listening/welearn-listening-part-3-001.mp3',
      durationSeconds: 180,
      sha256: 'a'.repeat(64),
    },
    groups: [
      {
        type: 'single-choice',
        id: 'pilot-review',
        questionRange: [21, 25],
        instruction: 'Select one option, A, B or C, for each question.',
        questions: [
          { ...answer(21, 'What is the first decision?', 'B'), options: [option('A', 'One'), option('B', 'Two'), option('C', 'Three')] },
          { ...answer(22, 'What caused the delay?', 'C'), options: [option('A', 'Cost'), option('B', 'Space'), option('C', 'Timing')] },
          { ...answer(23, 'Which result surprised them?', 'A'), options: [option('A', 'Noise'), option('B', 'Light'), option('C', 'Heat')] },
          { ...answer(24, 'What will they change?', 'B'), options: [option('A', 'The room'), option('B', 'The survey'), option('C', 'The schedule')] },
          { ...answer(25, 'What does the tutor recommend?', 'C'), options: [option('A', 'Cancel'), option('B', 'Repeat'), option('C', 'Compare')] },
        ],
      },
      {
        type: 'matching',
        id: 'next-actions',
        questionRange: [26, 30],
        instruction: 'Match each task to the person responsible. You may use each letter more than once.',
        optionReuse: 'may-repeat',
        options: [
          option('A', 'Student A'),
          option('B', 'Student B'),
          option('C', 'Tutor'),
        ],
        questions: [
          matchingAnswer(26, 'Revise the consent note', 'C'),
          matchingAnswer(27, 'Check the booking records', 'A'),
          matchingAnswer(28, 'Prepare the new survey', 'B'),
          matchingAnswer(29, 'Contact the facilities team', 'A'),
          matchingAnswer(30, 'Draft the comparison chart', 'B'),
        ],
      },
    ],
  };
}

function cloneSource() {
  return structuredClone(sourceFixture());
}

function assertRejected(name, mutate, expectedMessage) {
  const source = cloneSource();
  mutate(source);
  assert.throws(
    () => projectIeltsListeningPractice(source, source.audio.localPath),
    expectedMessage,
    name,
  );
}

test('matching remains private-stage and cannot project a public DTO', () => {
  const source = sourceFixture();
  assert.throws(
    () => projectIeltsListeningPractice(source, source.audio.localPath),
    /matching is private-stage and cannot be projected before atomic promotion/,
  );
});

test('matching produces bounded exact-option specs and remains server-scored', () => {
  const source = sourceFixture();
  const specs = ieltsListeningResponseSpecs(source);
  const responses = Object.fromEntries([
    ['21', 'B'], ['22', 'C'], ['23', 'A'], ['24', 'B'], ['25', 'C'],
    ['26', 'C'], ['27', 'A'], ['28', 'B'], ['29', 'A'], ['30', 'B'],
  ]);

  assert.deepEqual(ieltsListeningQuestionNumbers(source), [21, 22, 23, 24, 25, 26, 27, 28, 29, 30]);
  assert.deepEqual(specs.slice(5), [26, 27, 28, 29, 30].map((number) => ({
    number,
    kind: 'choice',
    allowedValues: ['A', 'B', 'C'],
  })));
  assert.equal(validateIeltsListeningResponses(responses, specs), true);
  assert.equal(validateIeltsListeningResponses({ ...responses, 30: 'D' }, specs), false);
  assert.equal(validateIeltsListeningResponses({ ...responses, 30: 'b' }, specs), false);
  assert.equal(validateIeltsListeningResponses({ ...responses, answer: 'B' }, specs), false);

  const result = scoreIeltsListeningPractice(source, responses);
  assert.equal(result.correct, 10);
  assert.equal(result.total, 10);
  assert.equal(result.transcript, source.transcript);
  assert.match(result.disclosure, /not an official IELTS band score/i);
});

test('matching integrity fails closed under key, range, policy and option mutations', () => {
  assertRejected(
    'unknown answer key',
    (source) => { source.groups[1].questions[0].correctOptionKey = 'D'; },
    /unknown correct option/,
  );
  assertRejected(
    'gapped option sequence',
    (source) => { source.groups[1].options[1].key = 'D'; },
    /contiguous option keys beginning with A/,
  );
  assertRejected(
    'duplicate option label',
    (source) => { source.groups[1].options[1].label = source.groups[1].options[0].label; },
    /unique non-empty option keys and labels/,
  );
  assertRejected(
    'invalid reuse policy',
    (source) => { source.groups[1].optionReuse = 'sometimes'; },
    /invalid option reuse policy/,
  );
  assertRejected(
    'repeated answer under once-only policy',
    (source) => { source.groups[1].optionReuse = 'once-only'; },
    /repeats an answer despite its once-only policy/,
  );
  assertRejected(
    'range omits a concrete question',
    (source) => { source.groups[1].questionRange = [26, 29]; },
    /Question range does not match concrete blanks/,
  );
  assertRejected(
    'empty prompt',
    (source) => { source.groups[1].questions[2].prompt = ' '; },
    /has no prompt/,
  );
});
