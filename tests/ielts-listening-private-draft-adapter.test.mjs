import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { isProxy } from 'node:util/types';
import vm from 'node:vm';
import ts from 'typescript';

const adapterUrl = new URL('../src/lib/ielts/listening-private-draft-adapter.server.ts', import.meta.url);
const source = fs.readFileSync(adapterUrl, 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: {
  module: ts.ModuleKind.CommonJS,
  target: ts.ScriptTarget.ES2022,
} }).outputText;
const evaluatedModule = { exports: {} };
const localRequire = (name) => {
  if (name === 'server-only') return {};
  if (name === 'node:util/types') return { isProxy };
  throw new Error('Unexpected private draft adapter dependency.');
};
vm.runInNewContext(
  `(function(require,module,exports){${compiled}\n})`,
  { Array, Error, Map, Number, Object, Reflect, RegExp, Set, String },
)(localRequire, evaluatedModule, evaluatedModule.exports);
const { prepareIeltsListeningPrivateDraftGroup: prepare } = evaluatedModule.exports;
const plain = (value) => JSON.parse(JSON.stringify(value));

const option = (key, label) => ({ key, label });
const matchingQuestion = (number, prompt, key) => ({
  number,
  prompt,
  correctOptionKey: key,
  explanation: `Private evidence for Question ${number} points to the expected option.`,
});
const matchingEnvelope = () => ({
  practiceId: 'welearn-listening-part-3-001',
  contentVersion: '2099-01-01.test.1',
  part: 3,
  group: {
    type: 'matching',
    id: 'next-actions',
    questionRange: [26, 27],
    instruction: 'Match each task to a person. You may use each letter more than once.',
    optionReuse: 'may-repeat',
    options: [option('A', 'Student A'), option('B', 'Student B'), option('C', 'Tutor')],
    questions: [
      matchingQuestion(26, 'Revise the consent note', 'C'),
      matchingQuestion(27, 'Check the booking records', 'A'),
    ],
  },
});

const blank = (number, expected) => ({
  number,
  acceptedAnswers: [expected],
  expected,
  explanation: `Private evidence for Question ${number} identifies the expected word.`,
  maxWords: 1,
});
const notesEnvelope = () => ({
  practiceId: 'welearn-listening-part-4-001',
  contentVersion: '2099-01-01.test.1',
  part: 4,
  group: {
    type: 'note-completion',
    id: 'lecture-notes',
    questionRange: [31, 32],
    instruction: 'Complete the notes. Write ONE WORD ONLY for each answer.',
    title: 'Academic lecture notes',
    maxWords: 1,
    sections: [{
      heading: 'Background',
      lines: [
        { type: 'text', indent: 0, text: 'The lecture introduces the research context.' },
        { type: 'blank', indent: 1, before: 'First finding:', blank: blank(31, 'alpha'), after: '.' },
        { type: 'blank', indent: 1, before: 'Second finding:', blank: blank(32, 'bravo'), after: '.' },
      ],
    }],
  },
});

function expectGenericRejection(value) {
  assert.throws(
    () => prepare(value),
    (error) => error?.message === 'Invalid IELTS Listening private draft group.',
  );
}

function outputKeys(value, keys = []) {
  if (!value || typeof value !== 'object') return keys;
  for (const key of Reflect.ownKeys(value)) {
    keys.push(String(key));
    outputKeys(value[key], keys);
  }
  return keys;
}

test('matching adapter emits a minimal serializable descriptor with derived scope', () => {
  const descriptor = plain(prepare(matchingEnvelope()));
  assert.deepEqual(descriptor, {
    type: 'matching',
    identity: {
      practiceId: 'welearn-listening-part-3-001', contentVersion: '2099-01-01.test.1', part: 3, groupId: 'next-actions',
    },
    instruction: 'Match each task to a person. You may use each letter more than once.',
    inputSpec: {
      type: 'matching', scope: 'welearn-listening-part-3-001-next-actions', questionNumbers: [26, 27],
      options: [option('A', 'Student A'), option('B', 'Student B'), option('C', 'Tutor')], optionReuse: 'may-repeat',
    },
    prompts: ['Revise the consent note', 'Check the booking records'],
  });
  assert.deepEqual(JSON.parse(JSON.stringify(descriptor)), descriptor);
});

test('note adapter keeps the visible hierarchy but strips answer material', () => {
  const descriptor = plain(prepare(notesEnvelope()));
  assert.deepEqual(descriptor, {
    type: 'note-completion',
    identity: {
      practiceId: 'welearn-listening-part-4-001', contentVersion: '2099-01-01.test.1', part: 4, groupId: 'lecture-notes',
    },
    title: 'Academic lecture notes',
    instruction: 'Complete the notes. Write ONE WORD ONLY for each answer.',
    inputSpec: {
      type: 'note-completion', scope: 'welearn-listening-part-4-001-lecture-notes', questionNumbers: [31, 32], maxWords: 1,
    },
    sections: [{
      heading: 'Background',
      lines: [
        { type: 'text', indent: 0, text: 'The lecture introduces the research context.' },
        { type: 'blank', indent: 1, before: 'First finding:', number: 31, after: '.' },
        { type: 'blank', indent: 1, before: 'Second finding:', number: 32, after: '.' },
      ],
    }],
  });
});

test('private answer sentinels and forbidden fields never enter either descriptor', () => {
  const matching = matchingEnvelope();
  matching.group.questions[0].correctOptionKey = 'B';
  matching.group.questions[0].explanation = 'PRIVATE_MATCHING_SENTINEL remains server-side for this question.';
  const notes = notesEnvelope();
  notes.group.sections[0].lines[1].blank.expected = 'PRIVATE_NOTE_SENTINEL';
  notes.group.sections[0].lines[1].blank.acceptedAnswers = ['PRIVATE_NOTE_SENTINEL'];

  for (const descriptor of [prepare(matching), prepare(notes)]) {
    const serialized = JSON.stringify(descriptor);
    assert.doesNotMatch(serialized, /PRIVATE_(?:MATCHING|NOTE)_SENTINEL/);
    const keys = outputKeys(descriptor);
    for (const forbidden of ['expected', 'acceptedAnswers', 'explanation', 'correctOptionKey', 'transcript', 'audio', 'sha256']) {
      assert.equal(keys.includes(forbidden), false, `${forbidden} escaped the server adapter`);
    }
  }
});

test('outputs are copies: source and descriptor mutations cannot cross the boundary', () => {
  const sourceEnvelope = matchingEnvelope();
  const descriptor = prepare(sourceEnvelope);
  descriptor.inputSpec.options[0].label = 'Changed output';
  descriptor.prompts[0] = 'Changed output prompt';
  assert.equal(sourceEnvelope.group.options[0].label, 'Student A');
  assert.equal(sourceEnvelope.group.questions[0].prompt, 'Revise the consent note');

  sourceEnvelope.group.options[1].label = 'Changed source';
  sourceEnvelope.group.questions[1].prompt = 'Changed source prompt';
  assert.equal(descriptor.inputSpec.options[1].label, 'Student B');
  assert.equal(descriptor.prompts[1], 'Check the booking records');
});

test('identity, range, option and note invariants fail closed', () => {
  for (const mutate of [
    (value) => { value.part = 2; },
    (value) => { value.practiceId = 'welearn-listening-part-3-000'; },
    (value) => { value.group.questionRange = [25, 27]; },
    (value) => { value.group.questions.reverse(); },
    (value) => { value.group.options[1].key = 'D'; },
    (value) => { value.group.options[1].label = 'student a'; },
    (value) => { value.group.optionReuse = 'sometimes'; },
  ]) {
    const value = matchingEnvelope(); mutate(value); expectGenericRejection(value);
  }
  const onceOnly = matchingEnvelope(); onceOnly.group.optionReuse = 'once-only';
  onceOnly.group.questions[1].correctOptionKey = onceOnly.group.questions[0].correctOptionKey;
  expectGenericRejection(onceOnly);

  for (const mutate of [
    (value) => { value.group.maxWords = 2; },
    (value) => { value.group.instruction = 'Complete the notes. Write TWO WORDS.'; },
    (value) => { value.group.sections[0].lines[0].indent = 1; },
    (value) => { value.group.sections[0].lines[1].before = ''; value.group.sections[0].lines[1].after = ''; },
    (value) => { value.group.sections[0].lines[1].blank.maxWords = 2; },
    (value) => { value.group.sections[0].lines[1].blank.acceptedAnswers = ['two words']; },
  ]) {
    const value = notesEnvelope(); mutate(value); expectGenericRejection(value);
  }
});

test('unknown fields, foreign prototypes, sparse arrays and symbols are rejected', () => {
  const unknown = matchingEnvelope(); unknown.group.questions[0].answer = 'PRIVATE'; expectGenericRejection(unknown);
  const symbol = matchingEnvelope(); symbol.group[Symbol('private')] = 'PRIVATE'; expectGenericRejection(symbol);
  const inherited = matchingEnvelope(); Object.setPrototypeOf(inherited.group, { private: true }); expectGenericRejection(inherited);
  const sparse = matchingEnvelope(); delete sparse.group.questions[0]; expectGenericRejection(sparse);
  const hidden = notesEnvelope(); Object.defineProperty(hidden.group, 'private', { value: true }); expectGenericRejection(hidden);
});

test('accessors at every trust level execute zero times and errors reveal no private text', () => {
  const targets = [
    (value) => [value, 'practiceId'],
    (value) => [value, 'group'],
    (value) => [value.group, 'instruction'],
    (value) => [value.group.options[0], 'label'],
    (value) => [value.group.questions[0], 'correctOptionKey'],
  ];
  for (const locate of targets) {
    let reads = 0; const value = matchingEnvelope(); const [target, key] = locate(value);
    Object.defineProperty(target, key, { enumerable: true, get() { reads++; return 'PRIVATE_ACCESSOR'; } });
    expectGenericRejection(value); assert.equal(reads, 0);
  }
  for (const locate of [
    (value) => [value.group.sections[0], 'heading'],
    (value) => [value.group.sections[0].lines[1], 'blank'],
    (value) => [value.group.sections[0].lines[1].blank, 'expected'],
  ]) {
    let reads = 0; const value = notesEnvelope(); const [target, key] = locate(value);
    Object.defineProperty(target, key, { enumerable: true, get() { reads++; return 'PRIVATE_ACCESSOR'; } });
    expectGenericRejection(value); assert.equal(reads, 0);
  }
});

test('proxies and revoked proxies are rejected before any get trap can supply private text', () => {
  const proxyCases = [
    {
      create: matchingEnvelope,
      locate: (value) => ({ parent: null, key: null, target: value }),
    },
    {
      create: matchingEnvelope,
      locate: (value) => ({ parent: value, key: 'group', target: value.group }),
    },
    {
      create: matchingEnvelope,
      locate: (value) => ({ parent: value.group, key: 'options', target: value.group.options }),
    },
    {
      create: matchingEnvelope,
      locate: (value) => ({ parent: value.group.options, key: 0, target: value.group.options[0] }),
    },
    {
      create: matchingEnvelope,
      locate: (value) => ({ parent: value.group.questions, key: 0, target: value.group.questions[0] }),
    },
    {
      create: notesEnvelope,
      locate: (value) => ({ parent: value.group, key: 'sections', target: value.group.sections }),
    },
    {
      create: notesEnvelope,
      locate: (value) => ({ parent: value.group.sections, key: 0, target: value.group.sections[0] }),
    },
    {
      create: notesEnvelope,
      locate: (value) => ({ parent: value.group.sections[0].lines, key: 1, target: value.group.sections[0].lines[1] }),
    },
    {
      create: notesEnvelope,
      locate: (value) => ({ parent: value.group.sections[0].lines[1], key: 'blank', target: value.group.sections[0].lines[1].blank }),
    },
    {
      create: notesEnvelope,
      locate: (value) => ({ parent: value.group.sections[0].lines[1].blank, key: 'acceptedAnswers', target: value.group.sections[0].lines[1].blank.acceptedAnswers }),
    },
  ];

  for (const { create, locate } of proxyCases) {
    let reads = 0;
    const value = create();
    const { parent, key, target } = locate(value);
    const proxy = new Proxy(target, {
      get(inner, property, receiver) {
        reads++;
        if (property === 'prompt' || property === 'label' || property === 'text' || property === 'before') {
          return 'PRIVATE_PROXY_SENTINEL';
        }
        return Reflect.get(inner, property, receiver);
      },
    });
    if (parent) parent[key] = proxy;
    expectGenericRejection(parent ? value : proxy);
    assert.equal(reads, 0);
  }

  const revokedEnvelope = matchingEnvelope();
  const revocable = Proxy.revocable(revokedEnvelope.group, {});
  revokedEnvelope.group = revocable.proxy;
  revocable.revoke();
  expectGenericRejection(revokedEnvelope);
});

test('adapter is server-only and does not import candidates, registries or public projectors', () => {
  assert.match(source, /^import 'server-only';/);
  assert.equal((source.match(/import 'server-only';/g) ?? []).length, 1);
  assert.equal((source.match(/from 'node:util\/types';/g) ?? []).length, 1);
  assert.doesNotMatch(source, /src\/data|listening-practice-registry|projectIeltsListeningPractice|scoreIeltsListening|transcript/);

  const srcRoot = path.resolve(path.dirname(adapterUrl.pathname), '../..');
  const pending = [srcRoot];
  const imports = [];
  while (pending.length) {
    const directory = pending.pop();
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const resolved = path.join(directory, entry.name);
      if (entry.isDirectory()) pending.push(resolved);
      else if (/\.[cm]?[jt]sx?$/.test(entry.name) && resolved !== adapterUrl.pathname) {
        if (fs.readFileSync(resolved, 'utf8').includes('listening-private-draft-adapter')) imports.push(resolved);
      }
    }
  }
  assert.deepEqual(imports, [], 'the private adapter must not be connected to an active source yet');
});

test('TypeScript keeps private descriptors outside the public DTO union', () => {
  const fixture = path.resolve(path.dirname(adapterUrl.pathname), '../../../tests/fixtures/ielts-private-draft-promotion-boundary.ts');
  const program = ts.createProgram([fixture], {
    allowJs: false,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    noEmit: true,
    skipLibCheck: true,
    strict: true,
    target: ts.ScriptTarget.ES2022,
  });
  const diagnostics = ts.getPreEmitDiagnostics(program);
  assert.deepEqual(diagnostics.map((diagnostic) => ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')), []);
});
