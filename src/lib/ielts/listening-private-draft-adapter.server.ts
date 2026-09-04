import 'server-only';

import { isProxy } from 'node:util/types';

import type {
  IeltsListeningMatchingGroupSource,
  IeltsListeningNoteCompletionGroupSource,
  IeltsListeningPart,
} from './listening-practice-contract';
import type { IeltsListeningDraftInputSpec } from './listening-draft-input-contract';
import type { IeltsListeningDraftControlDescriptor } from './listening-draft-control-descriptor';

type PrivateDraftGroupSource =
  | IeltsListeningMatchingGroupSource
  | IeltsListeningNoteCompletionGroupSource;

export interface IeltsListeningPrivateDraftGroupEnvelope {
  practiceId: string;
  contentVersion: string;
  part: IeltsListeningPart;
  group: PrivateDraftGroupSource;
}

interface IeltsListeningPrivateDraftIdentity {
  practiceId: string;
  contentVersion: string;
  part: IeltsListeningPart;
  groupId: string;
}

export type IeltsListeningPrivateDraftGroupDescriptor =
  | {
      type: 'matching';
      identity: IeltsListeningPrivateDraftIdentity;
      instruction: string;
      inputSpec: Extract<IeltsListeningDraftInputSpec, { type: 'matching' }>;
      prompts: readonly string[];
    }
  | {
      type: 'note-completion';
      identity: IeltsListeningPrivateDraftIdentity;
      title: string;
      instruction: string;
      inputSpec: Extract<IeltsListeningDraftInputSpec, { type: 'note-completion' }>;
      sections: ReadonlyArray<{
        heading: string;
        lines: ReadonlyArray<
          | { type: 'text'; indent: 0 | 1; text: string }
          | { type: 'blank'; indent: 0 | 1; before: string; number: number; after: string }
        >;
      }>;
    };

function reject(): never {
  throw new Error('Invalid IELTS Listening private draft group.');
}

// Accept plain data only. Accessors and unknown fields are rejected before values are read.
function dataRecord(value: unknown): value is Record<string, unknown> {
  if (!value || typeof value !== 'object' || isProxy(value) || Array.isArray(value)) return false;
  const proto = Object.getPrototypeOf(value);
  if (proto !== Object.prototype && proto !== null) return false;
  return Reflect.ownKeys(value).every((key) => {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    return typeof key === 'string' && descriptor?.enumerable === true && 'value' in descriptor;
  });
}

function exactFields(value: unknown, fields: readonly string[]): value is Record<string, unknown> {
  return dataRecord(value)
    && Reflect.ownKeys(value).length === fields.length
    && fields.every((field) => Object.hasOwn(value, field));
}

function denseArray(value: unknown, min: number, max: number): value is unknown[] {
  if (typeof value !== 'object' || value === null || isProxy(value) || !Array.isArray(value)) return false;
  if (value.length < min || value.length > max) return false;
  if (Object.getPrototypeOf(value) !== Array.prototype) return false;
  if (Reflect.ownKeys(value).length !== value.length + 1) return false;
  for (let index = 0; index < value.length; index++) {
    const descriptor = Object.getOwnPropertyDescriptor(value, String(index));
    if (!descriptor || !descriptor.enumerable || !('value' in descriptor)) return false;
  }
  return true;
}

function boundedText(value: unknown, max: number, allowEmpty = false): value is string {
  return typeof value === 'string'
    && value.length <= max
    && (allowEmpty || Boolean(value.trim()));
}

function normalizedAnswer(value: string): string {
  return value
    .normalize('NFKC')
    .trim()
    .toLocaleLowerCase('en')
    .replace(/[.,!?;:'“”]/g, '')
    .replace(/\s+/g, ' ');
}

function assertQuestionRange(
  range: unknown,
  numbers: readonly number[],
  part: IeltsListeningPart,
): void {
  if (!denseArray(range, 2, 2)) reject();
  const [first, last] = range;
  const partFirst = (part - 1) * 10 + 1;
  const partLast = part * 10;
  if (
    typeof first !== 'number'
    || typeof last !== 'number'
    || !Number.isInteger(first)
    || !Number.isInteger(last)
    || first < partFirst
    || last > partLast
    || first > last
    || numbers.length !== last - first + 1
    || numbers.some((number, index) => !Number.isInteger(number) || number !== first + index)
  ) reject();
}

function assertMatchingGroup(
  value: unknown,
  part: IeltsListeningPart,
): asserts value is IeltsListeningMatchingGroupSource {
  if (!exactFields(value, [
    'type', 'id', 'questionRange', 'instruction', 'optionReuse', 'options', 'questions',
  ]) || value.type !== 'matching'
    || !/^[a-z][a-z0-9-]{0,63}$/.test(typeof value.id === 'string' ? value.id : '')
    || !boundedText(value.instruction, 400)
    || (value.optionReuse !== 'once-only' && value.optionReuse !== 'may-repeat')
    || !denseArray(value.options, 2, 8)
    || !denseArray(value.questions, 1, 10)) reject();

  const optionKeys: string[] = [];
  const labels = new Set<string>();
  for (const [index, option] of value.options.entries()) {
    if (!exactFields(option, ['key', 'label'])
      || option.key !== 'ABCDEFGH'[index]
      || !boundedText(option.label, 200)) reject();
    const label = option.label.trim().toLocaleLowerCase('en');
    if (labels.has(label)) reject();
    labels.add(label);
    optionKeys.push(option.key);
  }

  const numbers: number[] = [];
  const correctKeys: string[] = [];
  for (const question of value.questions) {
    if (!exactFields(question, ['number', 'prompt', 'correctOptionKey', 'explanation'])
      || typeof question.number !== 'number'
      || !boundedText(question.prompt, 500)
      || typeof question.correctOptionKey !== 'string'
      || !optionKeys.includes(question.correctOptionKey)
      || !boundedText(question.explanation, 1000)
      || question.explanation.trim().length < 20) reject();
    numbers.push(question.number);
    correctKeys.push(question.correctOptionKey);
  }
  assertQuestionRange(value.questionRange, numbers, part);
  if (value.optionReuse === 'once-only' && new Set(correctKeys).size !== correctKeys.length) reject();
}

function assertNoteBlank(value: unknown, maxWords: 1 | 2 | 3): asserts value is Record<string, unknown> {
  if (!exactFields(value, ['number', 'acceptedAnswers', 'expected', 'explanation', 'maxWords'])
    || typeof value.number !== 'number'
    || !Number.isInteger(value.number)
    || value.maxWords !== maxWords
    || !boundedText(value.expected, 80)
    || !boundedText(value.explanation, 1000)
    || value.explanation.trim().length < 20
    || !denseArray(value.acceptedAnswers, 1, 10)) reject();

  const accepted = value.acceptedAnswers;
  if (accepted.some((answer) => !boundedText(answer, 80))) reject();
  const normalized = accepted.map((answer) => normalizedAnswer(answer as string));
  if (normalized.some((answer) => !answer || answer.split(' ').length > maxWords)
    || new Set(normalized).size !== normalized.length
    || !normalized.includes(normalizedAnswer(value.expected))) reject();
}

function assertNoteGroup(
  value: unknown,
  part: IeltsListeningPart,
): asserts value is IeltsListeningNoteCompletionGroupSource {
  if (!exactFields(value, [
    'type', 'id', 'questionRange', 'instruction', 'title', 'maxWords', 'sections',
  ]) || value.type !== 'note-completion'
    || !/^[a-z][a-z0-9-]{0,63}$/.test(typeof value.id === 'string' ? value.id : '')
    || !boundedText(value.instruction, 400)
    || !boundedText(value.title, 300)
    || (value.maxWords !== 1 && value.maxWords !== 2 && value.maxWords !== 3)
    || !denseArray(value.sections, 1, 10)) reject();

  const wordLimit = {
    1: 'ONE WORD ONLY',
    2: 'NO MORE THAN TWO WORDS',
    3: 'NO MORE THAN THREE WORDS',
  }[value.maxWords];
  if (value.instruction.trim() !== `Complete the notes. Write ${wordLimit} for each answer.`) reject();

  const headings = new Set<string>();
  const numbers: number[] = [];
  for (const section of value.sections) {
    if (!exactFields(section, ['heading', 'lines'])
      || !boundedText(section.heading, 300)
      || !denseArray(section.lines, 1, 30)) reject();
    const heading = section.heading.trim().toLocaleLowerCase('en');
    if (headings.has(heading)) reject();
    headings.add(heading);

    for (const [lineIndex, line] of section.lines.entries()) {
      if (!dataRecord(line) || (line.indent !== 0 && line.indent !== 1)) reject();
      if (lineIndex === 0 && line.indent !== 0) reject();
      if (line.type === 'text') {
        if (!exactFields(line, ['type', 'indent', 'text']) || !boundedText(line.text, 500)) reject();
        continue;
      }
      if (line.type !== 'blank'
        || !exactFields(line, ['type', 'indent', 'before', 'blank', 'after'])
        || !boundedText(line.before, 500, true)
        || !boundedText(line.after, 500, true)
        || (!line.before.trim() && !line.after.trim())) reject();
      assertNoteBlank(line.blank, value.maxWords);
      numbers.push(line.blank.number as number);
    }
  }
  assertQuestionRange(value.questionRange, numbers, part);
}

function assertEnvelope(value: unknown): asserts value is IeltsListeningPrivateDraftGroupEnvelope {
  if (!exactFields(value, ['practiceId', 'contentVersion', 'part', 'group'])
    || typeof value.practiceId !== 'string'
    || typeof value.contentVersion !== 'string'
    || !/^[a-z0-9][a-z0-9.-]{0,79}$/.test(value.contentVersion)
    || (value.part !== 1 && value.part !== 2 && value.part !== 3 && value.part !== 4)) reject();

  const idMatch = /^welearn-listening-part-([1-4])-([0-9]{3})$/.exec(value.practiceId);
  if (!idMatch || Number(idMatch[1]) !== value.part || idMatch[2] === '000') reject();
  if (!dataRecord(value.group)) reject();
  if (value.group.type === 'matching') assertMatchingGroup(value.group, value.part);
  else if (value.group.type === 'note-completion') assertNoteGroup(value.group, value.part);
  else reject();

  const scope = `${value.practiceId}-${value.group.id}`;
  if (!/^[a-z][a-z0-9-]{0,63}$/.test(scope)) reject();
}

export function prepareIeltsListeningPrivateDraftGroup(
  envelope: IeltsListeningPrivateDraftGroupEnvelope,
): IeltsListeningPrivateDraftGroupDescriptor {
  assertEnvelope(envelope);
  const group = envelope.group;
  const identity = {
    practiceId: envelope.practiceId,
    contentVersion: envelope.contentVersion,
    part: envelope.part,
    groupId: group.id,
  };
  const scope = `${envelope.practiceId}-${group.id}`;

  if (group.type === 'matching') {
    const options = group.options.map((option) => ({ key: option.key, label: option.label }));
    return {
      type: 'matching',
      identity,
      instruction: group.instruction,
      inputSpec: {
        type: 'matching',
        scope,
        questionNumbers: group.questions.map((question) => question.number),
        options,
        optionReuse: group.optionReuse,
      },
      prompts: group.questions.map((question) => question.prompt),
    };
  }

  return {
    type: 'note-completion',
    identity,
    title: group.title,
    instruction: group.instruction,
    inputSpec: {
      type: 'note-completion',
      scope,
      questionNumbers: group.sections.flatMap((section) => section.lines.flatMap((line) =>
        line.type === 'blank' ? [line.blank.number] : [],
      )),
      maxWords: group.maxWords,
    },
    sections: group.sections.map((section) => ({
      heading: section.heading,
      lines: section.lines.map((line) => line.type === 'text'
        ? { type: 'text' as const, indent: line.indent, text: line.text }
        : {
            type: 'blank' as const,
            indent: line.indent,
            before: line.before,
            number: line.blank.number,
            after: line.after,
          }),
    })),
  };
}

/** Select only fields used by the client-owned controls; keep identity and hierarchy server-side. */
export function prepareIeltsListeningPrivateDraftControls(
  envelope: IeltsListeningPrivateDraftGroupEnvelope,
): IeltsListeningDraftControlDescriptor {
  const descriptor = prepareIeltsListeningPrivateDraftGroup(envelope);
  if (descriptor.type === 'matching') {
    return {
      type: 'matching',
      inputSpec: {
        ...descriptor.inputSpec,
        questionNumbers: [...descriptor.inputSpec.questionNumbers],
        options: descriptor.inputSpec.options.map((option) => ({ ...option })),
      },
      prompts: [...descriptor.prompts],
    };
  }

  return {
    type: 'note-completion',
    inputSpec: {
      ...descriptor.inputSpec,
      questionNumbers: [...descriptor.inputSpec.questionNumbers],
    },
    notes: descriptor.sections.flatMap((section) => section.lines.flatMap((line) =>
      line.type === 'blank' ? [{ before: line.before, after: line.after }] : [],
    )),
  };
}
