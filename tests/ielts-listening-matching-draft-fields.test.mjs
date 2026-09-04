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
const source = fs.readFileSync(new URL('../src/components/ielts/MatchingDraftFields.tsx', import.meta.url), 'utf8');
const output = ts.transpileModule(source, { compilerOptions: {
  module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true, target: ts.ScriptTarget.ES2022,
} }).outputText;
const css = fs.readFileSync(new URL('../src/components/ielts/MatchingDraftFields.module.css', import.meta.url), 'utf8');
const styleNames = Object.fromEntries([...css.matchAll(/\.([a-zA-Z][\w-]*)/g)].map((match) => [match[1], match[1]]));
const evaluatedModule = { exports: {} };
const localRequire = (name) => {
  if (name === 'react/jsx-runtime') return require(name);
  if (name === '../../lib/ielts/listening-draft-input-contract') return contract;
  if (name === './MatchingDraftFields.module.css') return styleNames;
  throw new Error('Unexpected draft component dependency.');
};
// Trusted local TSX only; imports are allowlisted and no file/network APIs enter the context.
vm.runInNewContext(`(function(require,module,exports){${output}\n})`, { Array, Object, Reflect })(localRequire, evaluatedModule, evaluatedModule.exports);
const Fields = evaluatedModule.exports.default;
const fixture = () => ({
  spec: { type: 'matching', scope: 'fixture-match', questionNumbers: [26, 27], optionReuse: 'may-repeat',
    options: [{ key: 'A', label: 'Person one' }, { key: 'B', label: 'Person two' }] },
  prompts: ['Check the handout', 'Choose the room'], responses: {}, onAnswer() {},
});
const render = (props = fixture()) => renderToStaticMarkup(React.createElement(Fields, props));

test('renders labelled native selects with visible reuse instructions and no premature errors', () => {
  const html = render();
  assert.equal((html.match(/<select /g) ?? []).length, 2);
  assert.match(html, /for="fixture-match-answer-26"/);
  assert.match(html, /id="fixture-match-answer-26" name="fixture-match-answer-26"/);
  assert.match(html, /aria-describedby="fixture-match-instructions"/);
  assert.match(html, /You may use each letter more than once/);
  assert.match(html, /A — Person one/);
  assert.doesNotMatch(html, /aria-invalid|Choose a letter for this task|Correct|score|transcript/);
});

test('validation is explicit and binds each error to its affected control', () => {
  const props = fixture(); props.showErrors = true; props.responses = { 27: 'B' };
  const html = render(props);
  assert.equal((html.match(/aria-invalid="true"/g) ?? []).length, 1);
  assert.match(html, /aria-describedby="fixture-match-instructions fixture-match-answer-26-error"/);
  assert.match(html, /<p id="fixture-match-answer-26-error" class="error">Choose a letter for this task/);
  assert.doesNotMatch(html, /id="fixture-match-answer-27-error"/);
});

test('once-only signals both duplicates without removing selectable options', () => {
  const props = fixture(); props.spec.optionReuse = 'once-only'; props.showErrors = true; props.responses = { 26: 'A', 27: 'A' };
  const html = render(props);
  assert.equal((html.match(/aria-invalid="true"/g) ?? []).length, 2);
  assert.equal((html.match(/value="A" selected=""/g) ?? []).length, 2);
  assert.equal((html.match(/value="B"/g) ?? []).length, 2);
  assert.match(html, /Use each letter once only/);
  props.spec.optionReuse = 'may-repeat';
  assert.doesNotMatch(render(props), /aria-invalid/);
});

test('separate instances keep IDs and names distinct even with identical question numbers', () => {
  const left = fixture(), right = fixture(); right.spec.scope = 'second-match';
  const html = renderToStaticMarkup(React.createElement(React.Fragment, null,
    React.createElement(Fields, left), React.createElement(Fields, right)));
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  const names = [...html.matchAll(/\bname="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length); assert.equal(new Set(names).size, names.length);
});

test('disabled controls retain selected values and no focus effect exists in the leaf', () => {
  const props = fixture(); props.disabled = true; props.responses = { 26: 'B' };
  const html = render(props);
  assert.equal((html.match(/disabled=""/g) ?? []).length, 2);
  assert.match(html, /value="B" selected=""/);
  assert.doesNotMatch(source, /useEffect|autoFocus|\.focus\(|fetch\(|localStorage|sessionStorage|server-only/);
});

test('controlled change callbacks fire once and disabled handlers cannot change responses', () => {
  const calls = [];
  const props = { ...fixture(), onAnswer: (number, value) => calls.push([number, value]) };
  const selects = (element) => {
    if (!React.isValidElement(element)) return [];
    return element.type === 'select' ? [element]
      : React.Children.toArray(element.props.children).flatMap(selects);
  };
  selects(Fields(props))[0].props.onChange({ target: { value: 'A' } });
  assert.deepEqual(calls, [[26, 'A']]);
  const disabled = selects(Fields({ ...props, disabled: true, responses: { 26: 'A' } }))[0];
  disabled.props.onChange({ target: { value: 'B' } });
  assert.deepEqual(calls, [[26, 'A']]);
  assert.equal(disabled.props.value, 'A');
  const enabled = selects(Fields({ ...props, disabled: false, responses: { 26: 'A' } }))[0];
  assert.equal(enabled.props.value, 'A');
  enabled.props.onChange({ target: { value: '' } });
  assert.deepEqual(calls, [[26, 'A'], [26, '']]);
});

test('prompt drift, objects and getters fail generically while text stays escaped', () => {
  for (const prompts of [[], ['Only one'], [' ', 'Valid'], [{ answer: 'PRIVATE' }, 'Valid'], ['x'.repeat(501), 'Valid']]) {
    assert.throws(() => render({ ...fixture(), prompts }), /Invalid IELTS Listening matching prompts\./);
  }
  let reads = 0; const prompts = ['One', 'Two'];
  Object.defineProperty(prompts, '0', { get() { reads++; return 'PRIVATE'; } });
  assert.throws(() => render({ ...fixture(), prompts }), /Invalid IELTS Listening matching prompts\./);
  assert.equal(reads, 0);
  const html = render({ ...fixture(), prompts: ['<script>bad</script>', 'Safe'] });
  assert.match(html, /&lt;script&gt;bad&lt;\/script&gt;/);
  assert.doesNotMatch(html, /<script>/);
});
