import assert from 'node:assert/strict';
import test from 'node:test';

import {
  ieltsListeningQuestionNumbers,
  ieltsListeningResponseSpecs,
  projectIeltsListeningPractice,
  scoreIeltsListeningPractice,
  validateIeltsListeningResponses,
} from '../src/lib/ielts/listening-practice-contract.ts';

function blank(number, expected) {
  return {
    number,
    acceptedAnswers: [expected],
    expected,
    explanation: `The lecture explicitly supplies ${expected} as the answer to Question ${number}.`,
    maxWords: 1,
  };
}

function sourceFixture() {
  return {
    id: 'welearn-listening-part-4-001',
    contentVersion: '2099-01-01.test.1',
    part: 4,
    practiceNumber: 1,
    title: 'Contract-only Part 4 fixture',
    scenario: 'A lecturer explains an original academic topic.',
    instructions: 'Listen and answer Questions 31–40.',
    transcript: 'A private academic monologue that must not appear in a public projection.',
    audio: {
      localPath: '/audio/ielts/listening/welearn-listening-part-4-001.mp3',
      durationSeconds: 180,
      sha256: 'a'.repeat(64),
    },
    groups: [{
      type: 'note-completion',
      id: 'lecture-notes',
      questionRange: [31, 40],
      instruction: 'Complete the notes. Write ONE WORD ONLY for each answer.',
      title: 'Academic lecture notes',
      maxWords: 1,
      sections: [
        {
          heading: 'Background',
          lines: [
            { type: 'text', indent: 0, text: 'The lecture introduces the research context.' },
            { type: 'blank', indent: 1, before: 'First finding:', blank: blank(31, 'alpha'), after: '' },
            { type: 'blank', indent: 1, before: 'Second finding:', blank: blank(32, 'bravo'), after: '' },
            { type: 'blank', indent: 1, before: 'Third finding:', blank: blank(33, 'charlie'), after: '' },
          ],
        },
        {
          heading: 'Method',
          lines: [
            { type: 'blank', indent: 0, before: 'First stage uses', blank: blank(34, 'delta'), after: '' },
            { type: 'blank', indent: 1, before: 'The sample includes', blank: blank(35, 'echo'), after: '' },
            { type: 'blank', indent: 1, before: 'Records are stored in', blank: blank(36, 'foxtrot'), after: '' },
            { type: 'blank', indent: 0, before: 'Researchers then measure', blank: blank(37, 'golf'), after: '' },
          ],
        },
        {
          heading: 'Findings',
          lines: [
            { type: 'blank', indent: 0, before: 'The main benefit is', blank: blank(38, 'hotel'), after: '' },
            { type: 'blank', indent: 1, before: 'One limitation concerns', blank: blank(39, 'india'), after: '' },
            { type: 'blank', indent: 0, before: 'Future work will examine', blank: blank(40, 'juliet'), after: '' },
          ],
        },
      ],
    }],
  };
}

function cloneSource() {
  return structuredClone(sourceFixture());
}

function assertRejected(label, mutate, expectedMessage) {
  const source = cloneSource();
  mutate(source);
  assert.throws(
    () => projectIeltsListeningPractice(source, source.audio.localPath),
    expectedMessage,
    label,
  );
}

test('note completion remains private-stage and cannot project a public DTO', () => {
  const source = sourceFixture();
  assert.throws(
    () => projectIeltsListeningPractice(source, source.audio.localPath),
    /note completion is private-stage and cannot be projected before atomic promotion/,
  );
});

test('note completion scores Questions 31–40 and exposes only bounded text specs', () => {
  const source = sourceFixture();
  const expected = ['alpha', 'bravo', 'charlie', 'delta', 'echo', 'foxtrot', 'golf', 'hotel', 'india', 'juliet'];
  const responses = Object.fromEntries(expected.map((answer, index) => [String(31 + index), answer]));
  const specs = ieltsListeningResponseSpecs(source);

  assert.deepEqual(ieltsListeningQuestionNumbers(source), [31, 32, 33, 34, 35, 36, 37, 38, 39, 40]);
  assert.deepEqual(specs, [31, 32, 33, 34, 35, 36, 37, 38, 39, 40].map((number) => ({
    number,
    kind: 'text',
    maxWords: 1,
  })));
  assert.equal(validateIeltsListeningResponses(responses, specs), true);
  assert.equal(validateIeltsListeningResponses({ ...responses, 40: '' }, specs), false);
  assert.equal(validateIeltsListeningResponses({ ...responses, 40: 'two words' }, specs), false);
  assert.equal(validateIeltsListeningResponses({ ...responses, 41: 'extra' }, specs), false);

  const result = scoreIeltsListeningPractice(source, responses);
  assert.equal(result.correct, 10);
  assert.equal(result.total, 10);
  assert.equal(result.transcript, source.transcript);
  assert.match(result.disclosure, /not an official IELTS band score/i);
});

test('note completion structure and answer mutations fail closed', () => {
  assertRejected(
    'empty group ID',
    (source) => { source.groups[0].id = ' '; },
    /unique non-empty group IDs/,
  );
  assertRejected(
    'audio path belongs to another practice',
    (source) => { source.audio.localPath = '/audio/ielts/listening/welearn-listening-part-1-999.mp3'; },
    /audio path must be \/audio\/ielts\/listening\/welearn-listening-part-4-001\.mp3/,
  );
  assertRejected(
    'duplicate heading',
    (source) => { source.groups[0].sections[1].heading = source.groups[0].sections[0].heading; },
    /unique headings and non-empty sections/,
  );
  assertRejected(
    'orphan indent',
    (source) => { source.groups[0].sections[0].lines[0].indent = 1; },
    /must begin at indent 0/,
  );
  assertRejected(
    'empty section',
    (source) => { source.groups[0].sections[1].lines = []; },
    /exact question sequence|Question range does not match concrete blanks|unique headings and non-empty sections/,
  );
  assertRejected(
    'invalid indent',
    (source) => { source.groups[0].sections[0].lines[1].indent = 2; },
    /invalid indent/,
  );
  assertRejected(
    'empty text line',
    (source) => { source.groups[0].sections[0].lines[0].text = ' '; },
    /has no text/,
  );
  assertRejected(
    'blank without context',
    (source) => {
      source.groups[0].sections[0].lines[1].before = '';
      source.groups[0].sections[0].lines[1].after = '';
    },
    /needs visible context/,
  );
  assertRejected(
    'invalid word limit',
    (source) => { source.groups[0].sections[0].lines[1].blank.maxWords = 0; },
    /invalid answers or word limits/,
  );
  assertRejected(
    'blank limit differs from group instruction',
    (source) => { source.groups[0].sections[0].lines[1].blank.maxWords = 2; },
    /invalid answers or word limits/,
  );
  assertRejected(
    'instruction differs from structured limit',
    (source) => { source.groups[0].instruction = 'Complete the notes. Write NO MORE THAN TWO WORDS.'; },
    /is incomplete/,
  );
  assertRejected(
    'instruction adds a contradictory limit',
    (source) => { source.groups[0].instruction += ' OR NO MORE THAN TWO WORDS'; },
    /is incomplete/,
  );
  assertRejected(
    'answer exceeds transport limit',
    (source) => {
      const answer = 'x'.repeat(81);
      source.groups[0].sections[0].lines[1].blank.expected = answer;
      source.groups[0].sections[0].lines[1].blank.acceptedAnswers = [answer];
    },
    /invalid answers or word limits/,
  );
  assertRejected(
    'duplicate normalized answer',
    (source) => { source.groups[0].sections[0].lines[1].blank.acceptedAnswers = ['alpha', 'Alpha']; },
    /invalid answers or word limits/,
  );
  assertRejected(
    'expected answer not accepted',
    (source) => { source.groups[0].sections[0].lines[1].blank.expected = 'wrong'; },
    /invalid answers or word limits/,
  );
  assertRejected(
    'accepted answer exceeds limit',
    (source) => { source.groups[0].sections[0].lines[1].blank.acceptedAnswers = ['alpha', 'two words']; },
    /invalid answers or word limits/,
  );
  assertRejected(
    'missing question',
    (source) => { source.groups[0].sections[2].lines.pop(); },
    /exact question sequence|Question range does not match concrete blanks/,
  );
  assertRejected(
    'range omits question',
    (source) => { source.groups[0].questionRange = [31, 39]; },
    /Question range does not match concrete blanks/,
  );
  assertRejected(
    'range has hidden third element',
    (source) => { source.groups[0].questionRange = [31, 40, 999]; },
    /Question range is invalid/,
  );
});
