import assert from 'node:assert/strict';
import test from 'node:test';
import { inspectIeltsListeningDraftInputs as inspect } from '../src/lib/ielts/listening-draft-input-contract.ts';
import { validateIeltsListeningResponses } from '../src/lib/ielts/listening-practice-contract.ts';

const matching = () => ({
  type: 'matching', scope: 'fixture-matching', questionNumbers: [26, 27, 28],
  options: [{ key: 'A', label: 'Person one' }, { key: 'B', label: 'Person two' }, { key: 'C', label: 'Person three' }],
  optionReuse: 'may-repeat',
});
const notes = () => ({
  type: 'note-completion', scope: 'fixture-notes', questionNumbers: [31, 32], maxWords: 1,
});
const singleChoice = () => ({
  type: 'single-choice', scope: 'fixture-single', questionNumbers: [21, 22], optionKeys: ['A', 'B', 'C'],
});

test('missing drafts stay incomplete and expose stable native-control associations', () => {
  const state = inspect(notes(), { 32: '  ' });
  assert.equal(state.status, 'incomplete');
  assert.deepEqual(state.controls[0], {
    number: 31, id: 'fixture-notes-answer-31', name: 'fixture-notes-answer-31',
    instructionId: 'fixture-notes-instructions', errorId: 'fixture-notes-answer-31-error',
    value: '', issue: 'missing',
  });
  assert.equal(state.controls[1].issue, 'missing');
  const other = inspect({ ...notes(), scope: 'another-instance' }, {});
  assert.notEqual(state.controls[0].id, other.controls[0].id);
  assert.notEqual(state.controls[0].name, other.controls[0].name);
});

test('matching allows repeat only under its explicit policy; it does not judge correctness', () => {
  const responses = { 26: 'A', 27: 'A', 28: 'C' };
  assert.equal(inspect(matching(), responses).status, 'ready');
  const state = inspect({ ...matching(), optionReuse: 'once-only' }, responses);
  assert.equal(state.status, 'invalid');
  assert.deepEqual(state.controls.map((control) => control.issue), ['duplicate-choice', 'duplicate-choice', null]);
  assert.equal(inspect({ ...matching(), optionReuse: 'once-only' }, { 26: 'A', 27: 'B', 28: 'C' }).status, 'ready');
  assert.equal(inspect(matching(), { 26: 'C', 27: 'B', 28: 'A' }).status, 'ready');
});

test('matching rejects unknown, lower-case and padded choices without rewriting input', () => {
  for (const value of ['D', 'a', ' A ', 'AB']) {
    const state = inspect(matching(), { 26: value });
    assert.equal(state.status, 'invalid');
    assert.equal(state.controls[0].issue, 'invalid-choice');
    assert.equal(state.controls[0].value, value);
  }
});

test('single-choice accepts only exact A–C values without judging correctness', () => {
  for (const responses of [{ 21: 'A', 22: 'A' }, { 21: 'B', 22: 'C' }, { 21: 'C', 22: 'B' }]) {
    assert.equal(inspect(singleChoice(), responses).status, 'ready');
  }
  for (const value of ['D', 'a', ' A ', 'AB', 'x'.repeat(81)]) {
    const state = inspect(singleChoice(), { 21: value });
    assert.equal(state.status, 'invalid');
    assert.equal(state.controls[0].issue, value.length > 80 ? 'too-long' : 'invalid-choice');
    assert.equal(state.controls[0].value, value);
    assert.equal(state.controls[1].issue, 'missing');
  }
});

test('invalid takes priority over incomplete without hiding other question issues', () => {
  const state = inspect(matching(), { 26: 'z', 28: 'x'.repeat(81) });
  assert.equal(state.status, 'invalid');
  assert.deepEqual(state.controls.map(({ number, issue }) => [number, issue]), [
    [26, 'invalid-choice'], [27, 'missing'], [28, 'too-long'],
  ]);
});

test('notes enforce raw 80-character and whitespace word limits without clipping typing', () => {
  const cases = [
    ['alpha', null], [' alpha ', null], ['self-study', null], ['a'.repeat(80), null],
    ['a'.repeat(81), 'too-long'], [' '.repeat(80) + 'a', 'too-long'],
    ['two words', 'too-many-words'], ['two\nwords', 'too-many-words'],
    ['two\u00a0words', 'too-many-words'],
  ];
  for (const [value, issue] of cases) {
    const state = inspect(notes(), { 31: value, 32: 'beta' });
    assert.equal(state.controls[0].issue, issue);
    assert.equal(state.controls[0].value, value);
    assert.equal(state.status, issue ? 'invalid' : 'ready');
  }
  assert.equal(inspect({ ...notes(), maxWords: 2 }, { 31: 'two words', 32: 'beta' }).status, 'ready');
  assert.equal(inspect({ ...notes(), maxWords: 3 }, { 31: 'one two three', 32: 'beta' }).status, 'ready');
});

test('ready notes and choices agree with the existing transport validator', () => {
  for (const spec of [notes(), matching(), singleChoice()]) {
    const specs = spec.questionNumbers.map((number) => spec.type === 'note-completion'
      ? { number, kind: 'text', maxWords: spec.maxWords }
      : {
          number,
          kind: 'choice',
          allowedValues: spec.type === 'matching' ? spec.options.map(({ key }) => key) : spec.optionKeys,
        });
    for (const value of ['', ' ', 'A', 'B', 'Z', 'b', 'alpha', 'two words', 'x'.repeat(81)]) {
      const responses = Object.fromEntries(spec.questionNumbers.map((number) => [number, value]));
      assert.equal(inspect(spec, responses).status === 'ready', validateIeltsListeningResponses(responses, specs));
    }
  }
});

test('spec mutations fail closed without echoing data', () => {
  const mutations = [
    (s) => { s.transcript = 'PRIVATE_SENTINEL'; },
    (s) => { s.options[0].correctOptionKey = 'PRIVATE_SENTINEL'; },
    (s) => { s.scope = 'bad scope'; },
    (s) => { s.scope = 'a'.repeat(65); },
    (s) => { s.questionNumbers = [26, 26]; },
    (s) => { s.questionNumbers = [27, 26]; },
    (s) => { s.questionNumbers = [26, 28]; },
    (s) => { s.questionNumbers = [0]; },
    (s) => { s.questionNumbers = [41]; },
    (s) => { s.questionNumbers = [26.5]; },
    (s) => { s.questionNumbers = []; },
    (s) => { s.questionNumbers = Array.from({ length: 11 }, (_, i) => i + 1); },
    (s) => { s.options[1].key = 'D'; },
    (s) => { s.options[1].label = ' PERSON ONE '; },
    (s) => { s.options[1].label = ' '; },
    (s) => { s.options[1].label = 'x'.repeat(201); },
    (s) => { s.options = [s.options[0]]; },
    (s) => { s.optionReuse = 'sometimes'; },
    (s) => { s.optionReuse = 'once-only'; s.options.pop(); },
    (s) => { s.options.extra = 'PRIVATE_SENTINEL'; },
    (s) => { delete s.questionNumbers[1]; },
    (s) => { s.type = 'unexpected'; },
  ];
  for (const mutate of mutations) {
    const spec = matching(); mutate(spec);
    assert.throws(() => inspect(spec, {}), { message: 'Invalid IELTS Listening draft input spec.' });
  }
  for (const maxWords of [0, 4, 1.5, '1', NaN]) {
    assert.throws(() => inspect({ ...notes(), maxWords }, {}), /Invalid IELTS Listening draft input spec\./);
  }
  for (const optionKeys of [[], ['A', 'B'], ['A', 'B', 'C', 'D'], ['A', 'C', 'B'], ['A', 'B', 'D'], ['A', 'B', 'c']]) {
    assert.throws(() => inspect({ ...singleChoice(), optionKeys }, {}), /Invalid IELTS Listening draft input spec\./);
  }
  const extra = singleChoice(); extra.optionKeys.extra = 'PRIVATE_SENTINEL';
  assert.throws(() => inspect(extra, {}), /Invalid IELTS Listening draft input spec\./);
  const sparse = singleChoice(); delete sparse.optionKeys[1];
  assert.throws(() => inspect(sparse, {}), /Invalid IELTS Listening draft input spec\./);
});

test('response shape rejects unrelated/private fields, inheritance and executable accessors', () => {
  let reads = 0;
  const accessor = {};
  Object.defineProperty(accessor, '31', { enumerable: true, get() { reads++; return 'PRIVATE_SENTINEL'; } });
  for (const responses of [null, [], { 31: 1 }, { 31: null }, { 33: 'extra' },
    { transcript: 'PRIVATE_SENTINEL' }, Object.create({ 31: 'inherited' }), accessor,
    { [Symbol('private')]: 'PRIVATE_SENTINEL' }]) {
    assert.throws(() => inspect(notes(), responses), { message: 'Invalid IELTS Listening draft responses.' });
  }
  const spec = matching();
  Object.defineProperty(spec.options[0], 'label', { enumerable: true, get() { reads++; return 'PRIVATE_SENTINEL'; } });
  assert.throws(() => inspect(spec, {}), /Invalid IELTS Listening draft input spec\./);
  const executable = { [Symbol.toPrimitive]() { reads++; return 1; } };
  assert.throws(() => inspect({ ...notes(), maxWords: executable }, {}), /Invalid IELTS Listening draft input spec\./);
  assert.throws(() => inspect({ ...matching(), optionReuse: executable }, {}), /Invalid IELTS Listening draft input spec\./);
  assert.equal(reads, 0);
});

test('inspection does not mutate frozen caller data or retain input object aliases', () => {
  const spec = notes(); Object.freeze(spec.questionNumbers); Object.freeze(spec);
  const responses = Object.freeze({ 31: 'alpha', 32: 'beta' });
  const state = inspect(spec, responses);
  state.controls[0].value = 'changed';
  assert.equal(responses[31], 'alpha');
  assert.equal(inspect(spec, responses).controls[0].value, 'alpha');
  assert.deepEqual(Object.keys(state), ['status', 'controls']);
  assert.equal('correct' in state, false);
});

test('array prototype accessors cannot execute or expose exception contents', () => {
  let reads = 0;
  for (const [field, method] of [['questionNumbers', 'some'], ['options', 'entries']]) {
    const spec = matching();
    const prototype = Object.create(Array.prototype);
    Object.defineProperty(prototype, method, { get() {
      reads++;
      throw new Error('PRIVATE_SENTINEL');
    } });
    Object.setPrototypeOf(spec[field], prototype);
    assert.throws(() => inspect(spec, {}), { message: 'Invalid IELTS Listening draft input spec.' });
  }
  const single = singleChoice();
  const prototype = Object.create(Array.prototype);
  Object.defineProperty(prototype, 'some', { get() {
    reads++;
    throw new Error('PRIVATE_SENTINEL');
  } });
  Object.setPrototypeOf(single.optionKeys, prototype);
  assert.throws(() => inspect(single, {}), { message: 'Invalid IELTS Listening draft input spec.' });
  assert.equal(reads, 0);
});
