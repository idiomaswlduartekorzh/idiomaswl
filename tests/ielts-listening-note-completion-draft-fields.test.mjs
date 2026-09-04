import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import test from 'node:test';
import vm from 'node:vm';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';
import * as contract from '../src/lib/ielts/listening-draft-input-contract.ts';

const require = createRequire(import.meta.url);
const source = fs.readFileSync(new URL('../src/components/ielts/NoteCompletionDraftFields.tsx', import.meta.url), 'utf8');
const css = fs.readFileSync(new URL('../src/components/ielts/NoteCompletionDraftFields.module.css', import.meta.url), 'utf8');
const styleNames = Object.fromEntries([...css.matchAll(/\.([a-zA-Z][\w-]*)/g)].map((match) => [match[1], match[1]]));
const compiled = ts.transpileModule(source, { compilerOptions: {
  module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true, target: ts.ScriptTarget.ES2022,
} }).outputText;
const evaluatedModule = { exports: {} };
const localRequire = (name) => {
  if (name === 'react/jsx-runtime') return require(name);
  if (name === '../../lib/ielts/listening-draft-input-contract') return contract;
  if (name === './NoteCompletionDraftFields.module.css') return styleNames;
  throw new Error('Unexpected note component dependency.');
};
// Execute trusted local TSX only, with imports allowlisted and no I/O in the context.
vm.runInNewContext(`(function(require,module,exports){${compiled}\n})`, { Array, Object, Reflect })(localRequire, evaluatedModule, evaluatedModule.exports);
const Fields = evaluatedModule.exports.default;
const fixture = () => ({
  spec: { type: 'note-completion', scope: 'fixture-notes', questionNumbers: [31, 32], maxWords: 1 },
  notes: [{ before: 'Collect a', after: 'at the desk.' }, { before: 'Put the item in the', after: '.' }],
  responses: {}, onAnswer() {},
});
const render = (props = fixture()) => renderToStaticMarkup(React.createElement(Fields, props));
const inputs = (element) => {
  if (!React.isValidElement(element)) return [];
  return element.type === 'textarea' ? [element] : React.Children.toArray(element.props.children).flatMap(inputs);
};

test('notes render native labelled fields with context, word instruction and deferred errors', () => {
  const html = render();
  assert.equal((html.match(/<textarea /g) ?? []).length, 2);
  assert.match(html, /for="fixture-notes-answer-31"/);
  assert.match(html, /Collect a/); assert.match(html, /at the desk\./);
  assert.match(html, /ONE WORD ONLY/);
  assert.match(html, /aria-describedby="fixture-notes-instructions"/);
  assert.match(html, /aria-required="true"/);
  assert.match(html, /spellCheck="false"/);
  assert.doesNotMatch(html, /aria-invalid|Write an answer for this gap|maxLength|placeholder/);
});

test('a blank at the start of a note accepts after-context and rejects context-free gaps', () => {
  const props = fixture();
  props.notes[0] = { before: '', after: 'Begins the note.' };
  const html = render(props);
  assert.match(html, /31/);
  assert.match(html, /Begins the note\./);
  assert.equal((html.match(/<textarea /g) ?? []).length, 2);

  props.notes[0] = { before: ' ', after: ' ' };
  assert.throws(() => render(props), /Invalid IELTS Listening note context\./);
});

test('all three supported word limits have matching visible instructions and errors', () => {
  for (const [maxWords, instruction] of [[1, 'ONE WORD ONLY'], [2, 'NO MORE THAN TWO WORDS'], [3, 'NO MORE THAN THREE WORDS']]) {
    const props = fixture(); props.spec.maxWords = maxWords; props.showErrors = true;
    props.responses = { 31: Array(maxWords).fill('word').join(' '), 32: Array(maxWords + 1).fill('word').join(' ') };
    const html = render(props);
    assert.ok(html.includes(instruction));
    assert.equal((html.match(/aria-invalid="true"/g) ?? []).length, 1);
    assert.match(html, /id="fixture-notes-answer-32-error"/);
    assert.ok(html.includes(maxWords === 1 ? 'Use one word only.' : `Use no more than ${maxWords} words.`));
  }
});

test('validation connects missing and long-text errors without truncating the controlled value', () => {
  const props = fixture(); props.showErrors = true; props.responses = { 31: '   ', 32: 'x'.repeat(81) };
  const html = render(props);
  assert.equal((html.match(/aria-invalid="true"/g) ?? []).length, 2);
  assert.match(html, /aria-describedby="fixture-notes-instructions fixture-notes-answer-31-error"/);
  assert.match(html, /Write an answer for this gap/);
  assert.match(html, /Use 80 characters or fewer\. Your text has not been shortened\./);
  assert.ok(html.includes(`>${'x'.repeat(81)}</textarea>`));
  assert.doesNotMatch(html, /maxLength|maxlength/);
});

test('input callbacks preserve spaces, case, Unicode and pasted over-limit text exactly', () => {
  const calls = [];
  const props = { ...fixture(), onAnswer: (number, value) => calls.push([number, value]) };
  const field = inputs(Fields(props))[0];
  for (const value of ['  Café-au-lait  ', '日本語', 'RED blue', 'x'.repeat(81), 'two\nwords', '']) {
    field.props.onChange({ target: { value } });
    assert.deepEqual(calls.at(-1), [31, value]);
  }
  assert.equal(calls.length, 6);
  const html = render({ ...props, responses: { 31: '  Café-au-lait  ', 32: '日本語' }, showErrors: true });
  assert.match(html, />  Café-au-lait  <\/textarea>/);
  assert.doesNotMatch(html, /aria-invalid/);
});

test('disabled fields keep their text and cannot invoke the answer callback', () => {
  const calls = [];
  const props = { ...fixture(), disabled: true, responses: { 31: 'Word' }, onAnswer: (...args) => calls.push(args) };
  const field = inputs(Fields(props))[0];
  assert.equal(field.props.value, 'Word');
  field.props.onChange({ target: { value: 'Changed' } });
  assert.deepEqual(calls, []);
  assert.equal((render(props).match(/disabled=""/g) ?? []).length, 2);
  const enabled = inputs(Fields({ ...props, disabled: false }))[0];
  assert.equal(enabled.props.value, 'Word');
  enabled.props.onChange({ target: { value: '' } });
  assert.deepEqual(calls, [[31, '']]);
});

test('multiline answers use textarea and keep word separators in controlled markup', () => {
  const props = { ...fixture(), responses: { 31: 'two\nwords', 32: 'valid' }, showErrors: true };
  const field = inputs(Fields(props))[0];
  assert.equal(field.type, 'textarea');
  assert.equal(field.props.rows, 1);
  assert.equal(field.props.value, 'two\nwords');
  const html = render(props);
  assert.match(html, />two\nwords<\/textarea>/);
  assert.match(html, /Use one word only\./);
  assert.equal((html.match(/aria-invalid="true"/g) ?? []).length, 1);
  assert.doesNotMatch(html, /twowords/);
});

test('instances sharing question numbers have distinct IDs, labels and names', () => {
  const left = fixture(), right = fixture(); right.spec.scope = 'other-notes';
  const html = renderToStaticMarkup(React.createElement(React.Fragment, null,
    React.createElement(Fields, left), React.createElement(Fields, right)));
  for (const attribute of ['id', 'name']) {
    const values = [...html.matchAll(new RegExp(`\\b${attribute}="([^"]+)"`, 'g'))].map((match) => match[1]);
    assert.equal(new Set(values).size, values.length);
  }
  assert.match(html, /for="other-notes-answer-31"/);
});

test('note context rejects source fields, drift, prototypes and executable getters', () => {
  let reads = 0;
  const access = { after: 'safe' };
  Object.defineProperty(access, 'before', { enumerable: true, get() { reads++; return 'PRIVATE'; } });
  const arrayAccess = fixture().notes;
  Object.defineProperty(arrayAccess, '0', { get() { reads++; return access; } });
  const inherited = fixture().notes; Object.setPrototypeOf(inherited, Object.create(Array.prototype));
  for (const notes of [[], [fixture().notes[0]], [access, fixture().notes[1]], arrayAccess, inherited,
    [{ before: 'visible', after: '', answer: 'PRIVATE' }, fixture().notes[1]],
    [{ before: 'x'.repeat(501), after: '' }, fixture().notes[1]],
    [{ before: 'safe', after: 'x'.repeat(501) }, fixture().notes[1]],
    [Object.assign(Object.create({ hidden: 'PRIVATE' }), { before: 'safe', after: '' }), fixture().notes[1]]]) {
    assert.throws(() => render({ ...fixture(), notes }), /Invalid IELTS Listening note context\./);
  }
  assert.equal(reads, 0);
});

test('both pieces of visible context are escaped and no private source or effects enter the leaf', () => {
  const props = fixture(); props.notes[0] = { before: '<script>bad</script>', after: '<img src=x>' };
  const html = render(props);
  assert.match(html, /&lt;script&gt;bad&lt;\/script&gt;/); assert.match(html, /&lt;img src=x&gt;/);
  assert.doesNotMatch(html, /<script|<img/);
  assert.doesNotMatch(source, /useEffect|useLayoutEffect|autoFocus|\.focus\(|fetch\(|localStorage|sessionStorage|server-only/);
});

test('wrong question types and unrelated response fields fail closed', () => {
  const props = fixture();
  props.spec = { type: 'matching', scope: 'fixture-notes', questionNumbers: [31, 32], optionReuse: 'may-repeat',
    options: [{ key: 'A', label: 'One' }, { key: 'B', label: 'Two' }] };
  assert.throws(() => render(props), /Invalid IELTS Listening note spec\./);
  assert.throws(() => render({ ...fixture(), responses: { answer: 'PRIVATE' } }), /Invalid IELTS Listening draft responses\./);
});
