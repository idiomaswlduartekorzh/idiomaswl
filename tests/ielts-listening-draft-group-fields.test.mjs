import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import test from 'node:test';
import vm from 'node:vm';
import React from 'react';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const source = fs.readFileSync(new URL('../src/components/ielts/ListeningDraftGroupFields.tsx', import.meta.url), 'utf8');
const output = ts.transpileModule(source, { compilerOptions: {
  module: ts.ModuleKind.CommonJS,
  jsx: ts.JsxEmit.ReactJSX,
  esModuleInterop: true,
  target: ts.ScriptTarget.ES2022,
} }).outputText;
const MatchingProbe = () => React.createElement('div');
const NotesProbe = () => React.createElement('div');
const evaluatedModule = { exports: {} };
const localRequire = (name) => {
  if (name === 'react/jsx-runtime') return require(name);
  if (name === './MatchingDraftFields') return { __esModule: true, default: MatchingProbe };
  if (name === './NoteCompletionDraftFields') return { __esModule: true, default: NotesProbe };
  throw new Error('Unexpected draft composition dependency.');
};
vm.runInNewContext(
  `(function(require,module,exports){${output}\n})`,
  { Array, Error, Object, Reflect },
)(localRequire, evaluatedModule, evaluatedModule.exports);
const Fields = evaluatedModule.exports.default;

const matching = () => ({
  type: 'matching',
  inputSpec: {
    type: 'matching', scope: 'fixture-composed-match', questionNumbers: [26, 27], optionReuse: 'may-repeat',
    options: [{ key: 'A', label: 'Person one' }, { key: 'B', label: 'Person two' }],
  },
  prompts: ['Check the handout', 'Choose the room'],
});
const notes = () => ({
  type: 'note-completion',
  inputSpec: { type: 'note-completion', scope: 'fixture-composed-notes', questionNumbers: [31, 32], maxWords: 1 },
  notes: [{ before: 'Collect a', after: 'at the desk.' }, { before: 'Put the item in the', after: '.' }],
});

test('matching descriptor is forwarded only to the audited matching leaf', () => {
  const descriptor = matching();
  const responses = { 26: 'A' };
  const calls = [];
  const onAnswer = (...args) => calls.push(args);
  const element = Fields({ descriptor, responses, disabled: true, showErrors: true, onAnswer });
  assert.equal(element.type, MatchingProbe);
  assert.deepEqual(Object.keys(element.props).sort(), ['disabled', 'onAnswer', 'prompts', 'responses', 'showErrors', 'spec']);
  assert.equal(element.props.spec, descriptor.inputSpec);
  assert.equal(element.props.prompts, descriptor.prompts);
  assert.equal(element.props.responses, responses);
  assert.equal(element.props.onAnswer, onAnswer);
  assert.equal(element.props.disabled, true);
  assert.equal(element.props.showErrors, true);
  assert.deepEqual(calls, []);
});

test('note descriptor is forwarded only to the audited note leaf', () => {
  const descriptor = notes();
  const responses = { 31: 'ticket' };
  const onAnswer = () => {};
  const element = Fields({ descriptor, responses, onAnswer });
  assert.equal(element.type, NotesProbe);
  assert.deepEqual(Object.keys(element.props).sort(), ['disabled', 'notes', 'onAnswer', 'responses', 'showErrors', 'spec']);
  assert.equal(element.props.spec, descriptor.inputSpec);
  assert.equal(element.props.notes, descriptor.notes);
  assert.equal(element.props.responses, responses);
  assert.equal(element.props.onAnswer, onAnswer);
  assert.equal(element.props.disabled, false);
  assert.equal(element.props.showErrors, false);
});

test('the composition does not rewrite state or invoke callbacks while selecting a leaf', () => {
  const descriptor = matching();
  const snapshot = structuredClone(descriptor);
  const responses = Object.freeze({ 26: 'B' });
  let calls = 0;
  Fields({ descriptor, responses, onAnswer: () => { calls++; } });
  assert.deepEqual(descriptor, snapshot);
  assert.equal(calls, 0);
  assert.deepEqual(responses, { 26: 'B' });
});

test('unsupported discriminants fail without falling through to a renderer', () => {
  assert.throws(
    () => Fields({ descriptor: { type: 'single-choice', private: 'SENTINEL' }, responses: {}, onAnswer() {} }),
    (error) => error?.message === 'Unsupported IELTS Listening draft control descriptor.',
  );
});

test('the composition stays below a client owner and imports no server or scoring surface', () => {
  assert.doesNotMatch(source, /^['"]use client['"]/m);
  assert.doesNotMatch(source, /server-only|listening-private-draft-adapter|listening-practice-contract|score|fetch\(|localStorage|sessionStorage|useEffect|useLayoutEffect/);
  assert.match(source, /import type \{ IeltsListeningDraftControlDescriptor \}/);
  assert.match(source, /MatchingDraftFields/);
  assert.match(source, /NoteCompletionDraftFields/);
});
