/**
 * Isolated control-state contract for future matching/notes renderers.
 * No source adapter, public-practice DTO, scoring, persistence or release approval.
 * `ready` describes only this input block, never an attempt or a publishable resource.
 */
type DraftOptionKey = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';

interface DraftInputBase {
  /** Caller-owned instance token; distinct blocks on one page need distinct scopes. */
  scope: string;
  questionNumbers: readonly number[];
}

export type IeltsListeningDraftInputSpec = DraftInputBase & (
  | {
      type: 'matching';
      options: readonly { key: DraftOptionKey; label: string }[];
      optionReuse: 'once-only' | 'may-repeat';
    }
  | { type: 'note-completion'; maxWords: 1 | 2 | 3 }
);

export type IeltsListeningDraftInputIssue =
  | 'missing'
  | 'invalid-choice'
  | 'too-long'
  | 'too-many-words'
  | 'duplicate-choice';

export interface IeltsListeningDraftControlState {
  number: number;
  id: string;
  name: string;
  instructionId: string;
  errorId: string;
  value: string;
  issue: IeltsListeningDraftInputIssue | null;
}

export interface IeltsListeningDraftInputState {
  status: 'ready' | 'incomplete' | 'invalid';
  controls: IeltsListeningDraftControlState[];
}

function rejectSpec(): never {
  throw new Error('Invalid IELTS Listening draft input spec.');
}

// Data records only: reject unknown/private fields and accessors before reading values.
function dataRecord(value: unknown): value is Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
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
  if (!Array.isArray(value) || value.length < min || value.length > max) return false;
  if (Object.getPrototypeOf(value) !== Array.prototype) return false;
  if (Reflect.ownKeys(value).length !== value.length + 1) return false;
  for (let i = 0; i < value.length; i++) {
    const descriptor = Object.getOwnPropertyDescriptor(value, String(i));
    if (!descriptor || !('value' in descriptor) || !descriptor.enumerable) return false;
  }
  return true;
}

function assertSpec(value: unknown): asserts value is IeltsListeningDraftInputSpec {
  if (!dataRecord(value)) rejectSpec();
  const fields = value.type === 'matching'
    ? ['type', 'scope', 'questionNumbers', 'options', 'optionReuse']
    : ['type', 'scope', 'questionNumbers', 'maxWords'];
  if (!exactFields(value, fields)
    || typeof value.scope !== 'string'
    || !/^[a-z][a-z0-9-]{0,63}$/.test(value.scope)
    || !denseArray(value.questionNumbers, 1, 10)) rejectSpec();

  const numbers = value.questionNumbers;
  if (numbers.some((n) => typeof n !== 'number' || !Number.isInteger(n) || n < 1 || n > 40)
    || numbers.some((n, i) => i > 0 && n !== Number(numbers[i - 1]) + 1)) rejectSpec();

  if (value.type === 'matching') {
    if (!denseArray(value.options, 2, 8)
      || (value.optionReuse !== 'may-repeat' && value.optionReuse !== 'once-only')) rejectSpec();
    const labels = new Set<string>();
    for (const [index, option] of value.options.entries()) {
      if (!exactFields(option, ['key', 'label'])
        || option.key !== 'ABCDEFGH'[index]
        || typeof option.label !== 'string'
        || !option.label.trim()
        || option.label.length > 200) rejectSpec();
      const label = option.label.trim().toLocaleLowerCase('en');
      if (labels.has(label)) rejectSpec();
      labels.add(label);
    }
    if (value.optionReuse === 'once-only' && numbers.length > value.options.length) rejectSpec();
    return;
  }
  if (value.type !== 'note-completion' || typeof value.maxWords !== 'number'
    || ![1, 2, 3].includes(value.maxWords)) rejectSpec();
}

export function inspectIeltsListeningDraftInputs(
  spec: IeltsListeningDraftInputSpec,
  responses: unknown,
): IeltsListeningDraftInputState {
  assertSpec(spec);
  const keys = new Set(spec.questionNumbers.map(String));
  if (!dataRecord(responses)
    || Object.keys(responses).some((key) => !keys.has(key) || typeof responses[key] !== 'string')) {
    throw new Error('Invalid IELTS Listening draft responses.');
  }

  const controls: IeltsListeningDraftControlState[] = spec.questionNumbers.map((number) => {
    const value = Object.hasOwn(responses, String(number)) ? responses[String(number)] as string : '';
    let issue: IeltsListeningDraftInputIssue | null = null;
    if (!value.trim()) issue = 'missing';
    else if (value.length > 80) issue = 'too-long';
    else if (spec.type === 'matching' && !spec.options.some((option) => option.key === value)) {
      issue = 'invalid-choice';
    } else if (spec.type === 'note-completion' && value.trim().split(/\s+/).length > spec.maxWords) {
      issue = 'too-many-words';
    }
    const id = `${spec.scope}-answer-${number}`;
    return {
      number,
      id,
      name: id,
      instructionId: `${spec.scope}-instructions`,
      errorId: `${id}-error`,
      value,
      issue,
    };
  });

  if (spec.type === 'matching' && spec.optionReuse === 'once-only') {
    const counts = new Map<string, number>();
    for (const control of controls) {
      if (!control.issue) counts.set(control.value, (counts.get(control.value) ?? 0) + 1);
    }
    for (const control of controls) {
      if (!control.issue && (counts.get(control.value) ?? 0) > 1) control.issue = 'duplicate-choice';
    }
  }

  return {
    status: controls.some((control) => control.issue && control.issue !== 'missing')
      ? 'invalid'
      : controls.some((control) => control.issue === 'missing') ? 'incomplete' : 'ready',
    controls,
  };
}
