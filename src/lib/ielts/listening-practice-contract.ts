export interface IeltsListeningAnswerSource {
  number: number;
  expected: string;
  explanation: string;
}

export interface IeltsListeningBlankSource extends IeltsListeningAnswerSource {
  acceptedAnswers: readonly string[];
  maxWords: number;
}

export type IeltsListeningPart = 1 | 2 | 3 | 4;
export type IeltsListeningOptionKey = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';

export interface IeltsListeningChoiceOption {
  key: IeltsListeningOptionKey;
  label: string;
}

export interface IeltsListeningFormSource {
  type: 'form';
  id: string;
  questionRange: readonly [number, number];
  instruction: string;
  title: string;
  example?: string;
  template: string;
  blanks: readonly IeltsListeningBlankSource[];
}

export interface IeltsListeningTableTextCellSource {
  type: 'text';
  text: string;
}

export interface IeltsListeningTableBlankCellSource extends IeltsListeningBlankSource {
  type: 'blank';
}

export type IeltsListeningTableCellSource =
  | IeltsListeningTableTextCellSource
  | IeltsListeningTableBlankCellSource;

export interface IeltsListeningTableSource {
  type: 'table';
  id: string;
  questionRange: readonly [number, number];
  instruction: string;
  headers: readonly string[];
  rows: readonly (readonly IeltsListeningTableCellSource[])[];
}

export interface IeltsListeningSingleChoiceQuestionSource extends IeltsListeningAnswerSource {
  prompt: string;
  options: readonly IeltsListeningChoiceOption[];
  correctOptionKey: IeltsListeningOptionKey;
}

export interface IeltsListeningSingleChoiceGroupSource {
  type: 'single-choice';
  id: string;
  questionRange: readonly [number, number];
  instruction: string;
  questions: readonly IeltsListeningSingleChoiceQuestionSource[];
}

export interface IeltsListeningMapQuestionSource extends IeltsListeningAnswerSource {
  prompt: string;
  correctOptionKey: IeltsListeningOptionKey;
}

export interface IeltsListeningMapLabellingGroupSource {
  type: 'map-labelling';
  id: string;
  questionRange: readonly [number, number];
  instruction: string;
  map: {
    url: string;
    width: number;
    height: number;
    alt: string;
    longDescription: string;
    areaKeys: readonly IeltsListeningOptionKey[];
  };
  options: readonly IeltsListeningChoiceOption[];
  questions: readonly IeltsListeningMapQuestionSource[];
}

export interface IeltsListeningMatchingQuestionSource {
  number: number;
  prompt: string;
  correctOptionKey: IeltsListeningOptionKey;
  explanation: string;
}

export interface IeltsListeningMatchingGroupSource {
  type: 'matching';
  id: string;
  questionRange: readonly [number, number];
  instruction: string;
  optionReuse: 'once-only' | 'may-repeat';
  options: readonly IeltsListeningChoiceOption[];
  questions: readonly IeltsListeningMatchingQuestionSource[];
}

export type IeltsListeningGroupSource =
  | IeltsListeningFormSource
  | IeltsListeningTableSource
  | IeltsListeningSingleChoiceGroupSource
  | IeltsListeningMapLabellingGroupSource
  | IeltsListeningMatchingGroupSource;

export interface IeltsListeningPracticeSource {
  id: string;
  contentVersion: string;
  part: IeltsListeningPart;
  practiceNumber: number;
  title: string;
  scenario: string;
  instructions: string;
  transcript: string;
  audio: {
    localPath: string;
    durationSeconds: number;
    sha256: string;
  };
  groups: readonly IeltsListeningGroupSource[];
}

export interface IeltsListeningPublicBlank {
  number: number;
  maxWords: number;
}

export interface IeltsListeningPublicFormGroup {
  type: 'form';
  id: string;
  questionRange: readonly [number, number];
  instruction: string;
  title: string;
  example?: string;
  template: string;
  blanks: readonly IeltsListeningPublicBlank[];
}

export type IeltsListeningPublicTableCell =
  | IeltsListeningTableTextCellSource
  | ({ type: 'blank' } & IeltsListeningPublicBlank);

export interface IeltsListeningPublicTableGroup {
  type: 'table';
  id: string;
  questionRange: readonly [number, number];
  instruction: string;
  headers: readonly string[];
  rows: readonly (readonly IeltsListeningPublicTableCell[])[];
}

export interface IeltsListeningPublicSingleChoiceGroup {
  type: 'single-choice';
  id: string;
  questionRange: readonly [number, number];
  instruction: string;
  questions: ReadonlyArray<{
    number: number;
    prompt: string;
    options: readonly IeltsListeningChoiceOption[];
  }>;
}

export interface IeltsListeningPublicMapLabellingGroup {
  type: 'map-labelling';
  id: string;
  questionRange: readonly [number, number];
  instruction: string;
  map: {
    url: string;
    width: number;
    height: number;
    alt: string;
    longDescription: string;
    areaKeys: readonly IeltsListeningOptionKey[];
  };
  options: readonly IeltsListeningChoiceOption[];
  questions: ReadonlyArray<{
    number: number;
    prompt: string;
  }>;
}

export type IeltsListeningPublicGroup =
  | IeltsListeningPublicFormGroup
  | IeltsListeningPublicTableGroup
  | IeltsListeningPublicSingleChoiceGroup
  | IeltsListeningPublicMapLabellingGroup;

export type IeltsListeningResponseSpec =
  | { readonly number: number; readonly kind: 'text' }
  | {
      readonly number: number;
      readonly kind: 'choice';
      readonly allowedValues: readonly IeltsListeningOptionKey[];
    };

export interface IeltsListeningPublicPractice {
  id: string;
  contentVersion: string;
  part: IeltsListeningPart;
  practiceNumber: number;
  title: string;
  scenario: string;
  instructions: string;
  questionCount: number;
  questionRange: readonly [number, number];
  audio: {
    url: string;
    durationSeconds: number;
  };
  groups: readonly IeltsListeningPublicGroup[];
}

export interface IeltsListeningScoreResult {
  correct: number;
  total: number;
  transcript: string;
  outcomes: ReadonlyArray<{
    number: number;
    correct: boolean;
    expected: string;
    explanation: string;
  }>;
  disclosure: string;
}

function normalizeAnswer(value: string): string {
  return value
    .normalize('NFKC')
    .trim()
    .toLocaleLowerCase('en')
    .replace(/[.,!?;:'“”]/g, '')
    .replace(/\s+/g, ' ');
}

interface IeltsListeningAnswerSpec extends IeltsListeningAnswerSource {
  readonly mode: 'normalized-text' | 'exact-option';
  readonly acceptedValues: readonly string[];
}

function sourceAnswers(source: IeltsListeningPracticeSource): IeltsListeningAnswerSpec[] {
  const answers: IeltsListeningAnswerSpec[] = [];
  for (const group of source.groups) {
    if (group.type === 'form') {
      answers.push(...group.blanks.map((blank) => ({
        number: blank.number,
        expected: blank.expected,
        explanation: blank.explanation,
        mode: 'normalized-text' as const,
        acceptedValues: blank.acceptedAnswers,
      })));
      continue;
    }
    if (group.type === 'table') {
      answers.push(...group.rows.flatMap((row) =>
        row.flatMap((cell) => cell.type === 'blank' ? [{
          number: cell.number,
          expected: cell.expected,
          explanation: cell.explanation,
          mode: 'normalized-text' as const,
          acceptedValues: cell.acceptedAnswers,
        }] : []),
      ));
      continue;
    }
    if (group.type === 'single-choice' || group.type === 'map-labelling') {
      answers.push(...group.questions.map((question) => ({
        number: question.number,
        expected: question.expected,
        explanation: question.explanation,
        mode: 'exact-option' as const,
        acceptedValues: [question.correctOptionKey],
      })));
      continue;
    }
    if (group.type === 'matching') {
      answers.push(...group.questions.map((question) => ({
        number: question.number,
        expected: question.correctOptionKey,
        explanation: question.explanation,
        mode: 'exact-option' as const,
        acceptedValues: [question.correctOptionKey],
      })));
      continue;
    }
    throw new Error('Unsupported IELTS Listening question group type.');
  }
  return answers;
}

function assertChoiceOptions(
  options: readonly IeltsListeningChoiceOption[],
  label: string,
  expectedKeys?: readonly IeltsListeningOptionKey[],
): void {
  const keys = options.map((option) => option.key);
  const normalizedLabels = options.map((option) => option.label.trim().toLocaleLowerCase('en'));
  if (
    !options.length
    || keys.some((key) => !/^[A-H]$/.test(key))
    || new Set(keys).size !== keys.length
    || normalizedLabels.some((optionLabel) => !optionLabel)
    || new Set(normalizedLabels).size !== normalizedLabels.length
  ) {
    throw new Error(`${label} needs unique non-empty option keys and labels.`);
  }
  if (expectedKeys && (keys.length !== expectedKeys.length || keys.some((key, index) => key !== expectedKeys[index]))) {
    throw new Error(`${label} must use the exact option sequence ${expectedKeys.join(', ')}.`);
  }
}

function assertSourceIntegrity(source: IeltsListeningPracticeSource): void {
  if (![1, 2, 3, 4].includes(source.part)) {
    throw new Error('IELTS Listening practice part must be an integer from 1 to 4.');
  }
  if (!Number.isInteger(source.practiceNumber) || source.practiceNumber <= 0) {
    throw new Error('IELTS Listening practice number must be a positive integer.');
  }
  const expectedId = `welearn-listening-part-${source.part}-${String(source.practiceNumber).padStart(3, '0')}`;
  if (source.id !== expectedId) {
    throw new Error(`IELTS Listening practice ID must be ${expectedId}.`);
  }

  const groupIds = source.groups.map((group) => group.id);
  if (new Set(groupIds).size !== groupIds.length) {
    throw new Error('IELTS Listening practice contains duplicate group IDs.');
  }

  const answers = sourceAnswers(source).sort((a, b) => a.number - b.number);
  const numbers = answers.map((answer) => answer.number);
  const firstQuestion = (source.part - 1) * 10 + 1;
  const lastQuestion = source.part * 10;
  if (numbers.length !== 10 || numbers.some((number, index) => number !== firstQuestion + index)) {
    throw new Error(`IELTS Listening Part ${source.part} must contain the exact question sequence ${firstQuestion}–${lastQuestion}.`);
  }
  if (answers.some((answer) =>
    !answer.expected.trim()
    || answer.explanation.trim().length < 20
    || !answer.acceptedValues.length
    || answer.acceptedValues.some((acceptedValue) => !acceptedValue.trim())
  )) {
    throw new Error('Every IELTS Listening answer needs a model response and an evidence explanation.');
  }

  for (const group of source.groups) {
    let groupNumbers: number[];
    if (group.type === 'form') groupNumbers = group.blanks.map((blank) => blank.number);
    else if (group.type === 'table') {
      groupNumbers = group.rows.flatMap((row) => row.flatMap((cell) => cell.type === 'blank' ? [cell.number] : []));
    } else if (
      group.type === 'single-choice'
      || group.type === 'map-labelling'
      || group.type === 'matching'
    ) {
      groupNumbers = group.questions.map((question) => question.number);
    } else {
      throw new Error('Unsupported IELTS Listening question group type.');
    }
    const sorted = [...groupNumbers].sort((a, b) => a - b);
    const expectedRangeLength = group.questionRange[1] - group.questionRange[0] + 1;
    if (
      sorted.length !== expectedRangeLength
      || sorted.some((number, index) => number !== group.questionRange[0] + index)
    ) {
      throw new Error(`Question range does not match concrete blanks in group ${group.id}.`);
    }

    if (group.type === 'form') {
      if (group.blanks.some((blank) => !Number.isInteger(blank.maxWords) || blank.maxWords <= 0)) {
        throw new Error(`Form group ${group.id} contains an invalid word limit.`);
      }
      const placeholders = [...group.template.matchAll(/\{\{(\d+)\}\}/g)].map((match) => Number(match[1])).sort((a, b) => a - b);
      if (placeholders.length !== sorted.length || placeholders.some((number, index) => number !== sorted[index])) {
        throw new Error(`Template placeholders do not match blanks in group ${group.id}.`);
      }
    } else if (group.type === 'table') {
      if (
        !group.headers.length
        || group.headers.some((header) => !header.trim())
        || !group.rows.length
        || group.rows.some((row) => row.length !== group.headers.length)
      ) {
        throw new Error(`Table rows do not match headers in group ${group.id}.`);
      }
      const tableBlanks = group.rows.flatMap((row) => row.filter((cell) => cell.type === 'blank'));
      if (tableBlanks.some((blank) => !Number.isInteger(blank.maxWords) || blank.maxWords <= 0)) {
        throw new Error(`Table group ${group.id} contains an invalid word limit.`);
      }
    } else if (group.type === 'single-choice') {
      if (!group.instruction.trim() || !group.questions.length) {
        throw new Error(`Single-choice group ${group.id} is incomplete.`);
      }
      for (const question of group.questions) {
        if (!question.prompt.trim()) throw new Error(`Single-choice question ${question.number} has no prompt.`);
        assertChoiceOptions(question.options, `Single-choice question ${question.number}`, ['A', 'B', 'C']);
        if (!question.options.some((option) => option.key === question.correctOptionKey)) {
          throw new Error(`Single-choice question ${question.number} has an unknown correct option.`);
        }
        if (question.expected.trim() !== question.correctOptionKey) {
          throw new Error(`Single-choice question ${question.number} model response contradicts its correct option.`);
        }
      }
    } else if (group.type === 'map-labelling') {
      if (!group.instruction.trim() || !group.questions.length) {
        throw new Error(`Map-labelling group ${group.id} is incomplete.`);
      }
      assertChoiceOptions(group.options, `Map-labelling group ${group.id}`);
      const optionKeys = group.options.map((option) => option.key);
      const expectedAreaKeys = (['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] as const).slice(0, optionKeys.length);
      if (
        optionKeys.length < group.questions.length
        || group.map.areaKeys.length !== optionKeys.length
        || group.map.areaKeys.some((key, index) => key !== optionKeys[index])
        || optionKeys.some((key, index) => key !== expectedAreaKeys[index])
      ) {
        throw new Error(`Map-labelling group ${group.id} must use matching contiguous area keys beginning with A.`);
      }
      const expectedMapUrl = `/images/ielts/listening/${source.id}-map.svg`;
      if (
        group.map.url !== expectedMapUrl
        || !Number.isInteger(group.map.width)
        || group.map.width <= 0
        || !Number.isInteger(group.map.height)
        || group.map.height <= 0
        || group.map.alt.trim().length < 40
        || group.map.longDescription.trim().length < 80
      ) {
        throw new Error(`Map asset metadata is invalid for group ${group.id}.`);
      }
      for (const question of group.questions) {
        if (!question.prompt.trim()) throw new Error(`Map question ${question.number} has no prompt.`);
        if (!group.options.some((option) => option.key === question.correctOptionKey)) {
          throw new Error(`Map question ${question.number} has an unknown correct option.`);
        }
        if (question.expected.trim() !== question.correctOptionKey) {
          throw new Error(`Map question ${question.number} model response contradicts its correct option.`);
        }
      }
    } else if (group.type === 'matching') {
      if (!group.instruction.trim() || !group.questions.length) {
        throw new Error(`Matching group ${group.id} is incomplete.`);
      }
      assertChoiceOptions(group.options, `Matching group ${group.id}`);
      const optionKeys = group.options.map((option) => option.key);
      const expectedOptionKeys = (['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] as const)
        .slice(0, optionKeys.length);
      if (
        optionKeys.length < 2
        || optionKeys.some((key, index) => key !== expectedOptionKeys[index])
      ) {
        throw new Error(`Matching group ${group.id} must use at least two contiguous option keys beginning with A.`);
      }
      if (group.optionReuse !== 'once-only' && group.optionReuse !== 'may-repeat') {
        throw new Error(`Matching group ${group.id} has an invalid option reuse policy.`);
      }
      const correctOptionKeys = group.questions.map((question) => question.correctOptionKey);
      if (
        group.optionReuse === 'once-only'
        && new Set(correctOptionKeys).size !== correctOptionKeys.length
      ) {
        throw new Error(`Matching group ${group.id} repeats an answer despite its once-only policy.`);
      }
      for (const question of group.questions) {
        if (!question.prompt.trim()) throw new Error(`Matching question ${question.number} has no prompt.`);
        if (!group.options.some((option) => option.key === question.correctOptionKey)) {
          throw new Error(`Matching question ${question.number} has an unknown correct option.`);
        }
      }
    } else {
      throw new Error('Unsupported IELTS Listening question group type.');
    }
  }

  if (!/^\/audio\/ielts\/listening\/[a-z0-9-]+\.mp3$/.test(source.audio.localPath)) {
    throw new Error('IELTS Listening practice must use its own part-level audio asset.');
  }
  if (!(source.audio.durationSeconds > 0) || !/^[a-f0-9]{64}$/.test(source.audio.sha256)) {
    throw new Error('IELTS Listening practice audio metadata is not release-ready.');
  }
}

export function projectIeltsListeningPractice(
  source: IeltsListeningPracticeSource,
  resolvedAudioUrl: string,
): IeltsListeningPublicPractice {
  assertSourceIntegrity(source);
  if (!resolvedAudioUrl.trim()) throw new Error('IELTS Listening practice audio URL is empty.');
  const groups: IeltsListeningPublicGroup[] = source.groups.map((group) => {
    if (group.type === 'form') {
      return {
        type: 'form',
        id: group.id,
        questionRange: group.questionRange,
        instruction: group.instruction,
        title: group.title,
        ...(group.example ? { example: group.example } : {}),
        template: group.template,
        blanks: group.blanks.map(({ number, maxWords }) => ({ number, maxWords })),
      };
    }

    if (group.type === 'table') return {
      type: 'table',
      id: group.id,
      questionRange: group.questionRange,
      instruction: group.instruction,
      headers: group.headers,
      rows: group.rows.map((row) => row.map((cell) =>
        cell.type === 'text'
          ? { type: 'text' as const, text: cell.text }
          : { type: 'blank' as const, number: cell.number, maxWords: cell.maxWords },
      )),
    };

    if (group.type === 'single-choice') return {
      type: 'single-choice',
      id: group.id,
      questionRange: group.questionRange,
      instruction: group.instruction,
      questions: group.questions.map((question) => ({
        number: question.number,
        prompt: question.prompt,
        options: question.options.map((option) => ({ key: option.key, label: option.label })),
      })),
    };

    if (group.type === 'map-labelling') return {
      type: 'map-labelling',
      id: group.id,
      questionRange: group.questionRange,
      instruction: group.instruction,
      map: {
        url: group.map.url,
        width: group.map.width,
        height: group.map.height,
        alt: group.map.alt,
        longDescription: group.map.longDescription,
        areaKeys: [...group.map.areaKeys],
      },
      options: group.options.map((option) => ({ key: option.key, label: option.label })),
      questions: group.questions.map((question) => ({
        number: question.number,
        prompt: question.prompt,
      })),
    };

    if (group.type === 'matching') {
      throw new Error('IELTS Listening matching is private-stage and cannot be projected before atomic promotion.');
    }

    throw new Error('Unsupported IELTS Listening question group type.');
  });

  const questionRange = [(source.part - 1) * 10 + 1, source.part * 10] as const;

  return {
    id: source.id,
    contentVersion: source.contentVersion,
    part: source.part,
    practiceNumber: source.practiceNumber,
    title: source.title,
    scenario: source.scenario,
    instructions: source.instructions,
    questionCount: sourceAnswers(source).length,
    questionRange,
    audio: {
      url: resolvedAudioUrl,
      durationSeconds: source.audio.durationSeconds,
    },
    groups,
  };
}

export function validateIeltsListeningResponses(
  value: unknown,
  expectedSpecs: readonly IeltsListeningResponseSpec[],
): value is Record<string, string> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const record = value as Record<string, unknown>;
  const keys = Object.keys(record);
  const expected = new Set(expectedSpecs.map((spec) => String(spec.number)));
  if (keys.length !== expected.size || keys.some((key) => !expected.has(key))) return false;
  return expectedSpecs.every((spec) => {
    const response = record[String(spec.number)];
    return typeof response === 'string'
      && response.trim().length > 0
      && response.length <= 80
      && (spec.kind === 'text' || spec.allowedValues.includes(response as IeltsListeningOptionKey));
  });
}

export function scoreIeltsListeningPractice(
  source: IeltsListeningPracticeSource,
  responses: Readonly<Record<string, string>>,
): IeltsListeningScoreResult {
  assertSourceIntegrity(source);
  const answers = sourceAnswers(source).sort((a, b) => a.number - b.number);
  const outcomes = answers.map((answer) => ({
    number: answer.number,
    correct: answer.acceptedValues.some((accepted) => answer.mode === 'exact-option'
      ? accepted === (responses[String(answer.number)] ?? '')
      : normalizeAnswer(accepted) === normalizeAnswer(responses[String(answer.number)] ?? '')),
    expected: answer.expected,
    explanation: answer.explanation,
  }));

  return {
    correct: outcomes.filter((outcome) => outcome.correct).length,
    total: outcomes.length,
    transcript: source.transcript,
    outcomes,
    disclosure: 'WeLearn practice result. It is not an official IELTS band score.',
  };
}

export function ieltsListeningQuestionNumbers(source: IeltsListeningPracticeSource): number[] {
  assertSourceIntegrity(source);
  return sourceAnswers(source).map((answer) => answer.number).sort((a, b) => a - b);
}

export function ieltsListeningResponseSpecs(
  source: IeltsListeningPracticeSource,
): IeltsListeningResponseSpec[] {
  assertSourceIntegrity(source);
  const specs: IeltsListeningResponseSpec[] = [];
  for (const group of source.groups) {
    if (group.type === 'form') {
      specs.push(...group.blanks.map((blank) => ({ number: blank.number, kind: 'text' as const })));
      continue;
    }
    if (group.type === 'table') {
      specs.push(...group.rows.flatMap((row) => row.flatMap((cell) =>
        cell.type === 'blank' ? [{ number: cell.number, kind: 'text' as const }] : [],
      )));
      continue;
    }
    if (group.type === 'single-choice') {
      specs.push(...group.questions.map((question) => ({
        number: question.number,
        kind: 'choice' as const,
        allowedValues: question.options.map((option) => option.key),
      })));
      continue;
    }
    if (group.type === 'map-labelling') {
      specs.push(...group.questions.map((question) => ({
        number: question.number,
        kind: 'choice' as const,
        allowedValues: group.options.map((option) => option.key),
      })));
      continue;
    }
    if (group.type === 'matching') {
      specs.push(...group.questions.map((question) => ({
        number: question.number,
        kind: 'choice' as const,
        allowedValues: group.options.map((option) => option.key),
      })));
      continue;
    }
    throw new Error('Unsupported IELTS Listening question group type.');
  }
  return specs.sort((a, b) => a.number - b.number);
}
