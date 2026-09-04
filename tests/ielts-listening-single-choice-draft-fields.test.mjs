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
const source = fs.readFileSync(new URL('../src/components/ielts/SingleChoiceDraftFields.tsx', import.meta.url), 'utf8');
const output = ts.transpileModule(source, { compilerOptions: {
  module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true, target: ts.ScriptTarget.ES2022,
} }).outputText;
const css = fs.readFileSync(new URL('../src/components/ielts/SingleChoiceDraftFields.module.css', import.meta.url), 'utf8');
const styleNames = Object.fromEntries([...css.matchAll(/\.([a-zA-Z][\w-]*)/g)].map((match) => [match[1], match[1]]));
const evaluatedModule = { exports: {} };
const localRequire = (name) => {
  if (name === 'react/jsx-runtime') return require(name);
  if (name === '../../lib/ielts/listening-draft-input-contract') return contract;
  if (name === './SingleChoiceDraftFields.module.css') return styleNames;
  throw new Error('Unexpected single-choice component dependency.');
};
vm.runInNewContext(`(function(require,module,exports){${output}\n})`, { Array, Error, Object, Reflect, Set })(localRequire, evaluatedModule, evaluatedModule.exports);
const Fields = evaluatedModule.exports.default;

const options = (suffix) => [
  { key: 'A', label: `First ${suffix}` },
  { key: 'B', label: `Second ${suffix}` },
  { key: 'C', label: `Third ${suffix}` },
];
const fixture = () => ({
  spec: { type: 'single-choice', scope: 'fixture-single', questionNumbers: [21, 22], optionKeys: ['A', 'B', 'C'] },
  questions: [
    { prompt: 'Which room will the group use?', options: options('room') },
    { prompt: 'What should the student bring?', options: options('item') },
  ],
  responses: {},
  onAnswer() {},
});
const render = (props = fixture()) => renderToStaticMarkup(React.createElement(Fields, props));

test('renders labelled radio groups with one shared name per question and no premature errors', () => {
  const html = render();
  assert.equal((html.match(/type="radio"/g) ?? []).length, 6);
  assert.equal((html.match(/name="fixture-single-answer-21"/g) ?? []).length, 3);
  assert.equal((html.match(/name="fixture-single-answer-22"/g) ?? []).length, 3);
  assert.match(html, /for="fixture-single-answer-21"/);
  assert.match(html, /for="fixture-single-answer-21-b"/);
  assert.match(html, /Which room will the group use/);
  assert.match(html, /A, B or C/);
  assert.doesNotMatch(html, /aria-invalid|Choose one answer for this question|Correct|score|transcript/);
});

test('deferred validation connects each missing group and radio to its error', () => {
  const props = fixture();
  props.responses = { 21: 'B' };
  props.showErrors = true;
  const html = render(props);
  assert.match(html, /checked="" value="B"/);
  assert.match(html, /id="fixture-single-answer-22-error"/);
  assert.match(html, /aria-describedby="fixture-single-instructions fixture-single-answer-22-error"/);
  assert.match(html, /Choose one answer for this question/);
  assert.doesNotMatch(html, /fixture-single-answer-21-error/);
});

test('all A–C choices remain selectable regardless of which answer might be correct', () => {
  for (const value of ['A', 'B', 'C']) {
    const props = fixture(); props.responses = { 21: value, 22: 'A' }; props.showErrors = true;
    const html = render(props);
    assert.match(html, new RegExp(`checked="" value="${value}"`));
    assert.doesNotMatch(html, /aria-invalid|Correct|Incorrect/);
  }
});

test('separate instances produce distinct radio IDs and names', () => {
  const left = fixture(), right = fixture(); right.spec.scope = 'second-single';
  const html = renderToStaticMarkup(React.createElement(React.Fragment, null,
    React.createElement(Fields, left), React.createElement(Fields, right)));
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length);
  assert.match(html, /name="fixture-single-answer-21"/);
  assert.match(html, /name="second-single-answer-21"/);
});

test('disabled radios retain selection and cannot invoke the answer callback', () => {
  const calls = [];
  const props = { ...fixture(), responses: { 21: 'C' }, onAnswer: (...args) => calls.push(args) };
  const inputs = (element) => {
    if (!React.isValidElement(element)) return [];
    return element.type === 'input' ? [element]
      : React.Children.toArray(element.props.children).flatMap(inputs);
  };
  const enabled = inputs(Fields(props));
  enabled[1].props.onChange();
  assert.deepEqual(calls, [[21, 'B']]);
  const disabled = inputs(Fields({ ...props, disabled: true }));
  assert.equal(disabled.filter((input) => input.props.disabled).length, 6);
  assert.equal(disabled[2].props.checked, true);
  disabled[0].props.onChange();
  assert.deepEqual(calls, [[21, 'B']]);
});

test('question data rejects drift, accessors and foreign prototypes without reading private values', () => {
  for (const mutate of [
    (value) => { value.questions.pop(); },
    (value) => { value.questions[0].prompt = ' '; },
    (value) => { value.questions[0].private = 'PRIVATE'; },
    (value) => { value.questions[0].options[1].key = 'C'; },
    (value) => { value.questions[0].options[1].label = ' first ROOM '; },
    (value) => { delete value.questions[0].options[1]; },
    (value) => { Object.setPrototypeOf(value.questions[0], { private: true }); },
  ]) {
    const props = fixture(); mutate(props);
    assert.throws(() => render(props), /Invalid IELTS Listening single-choice questions\./);
  }
  let reads = 0; const props = fixture();
  Object.defineProperty(props.questions[0], 'prompt', { enumerable: true, get() { reads++; return 'PRIVATE'; } });
  assert.throws(() => render(props), /Invalid IELTS Listening single-choice questions\./);
  assert.equal(reads, 0);
});

test('visible content is escaped and the leaf has no stateful, server or scoring surface', () => {
  const props = fixture(); props.questions[0].prompt = '<script>bad</script>';
  const html = render(props);
  assert.match(html, /&lt;script&gt;bad&lt;\/script&gt;/);
  assert.doesNotMatch(html, /<script>/);
  assert.doesNotMatch(source, /useEffect|useState|autoFocus|\.focus\(|fetch\(|localStorage|sessionStorage|server-only|correctOptionKey|expected|explanation/);
});
