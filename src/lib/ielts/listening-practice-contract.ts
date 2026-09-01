export interface IeltsListeningBlankSource {
  number: number;
  acceptedAnswers: readonly string[];
  expected: string;
  explanation: string;
  maxWords: number;
}

export type IeltsListeningPart = 1 | 2 | 3 | 4;

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

export type IeltsListeningGroupSource = IeltsListeningFormSource | IeltsListeningTableSource;

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

export type IeltsListeningPublicGroup =
  | IeltsListeningPublicFormGroup
  | IeltsListeningPublicTableGroup;

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

function sourceBlanks(source: IeltsListeningPracticeSource): IeltsListeningBlankSource[] {
  return source.groups.flatMap((group) => {
    if (group.type === 'form') return [...group.blanks];
    if (group.type === 'table') {
      return group.rows.flatMap((row) =>
        row.flatMap((cell) => cell.type === 'blank' ? [cell] : []),
      );
    }
    throw new Error('Unsupported IELTS Listening question group type.');
  });
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

  const blanks = sourceBlanks(source).sort((a, b) => a.number - b.number);
  const numbers = blanks.map((blank) => blank.number);
  const firstQuestion = (source.part - 1) * 10 + 1;
  const lastQuestion = source.part * 10;
  if (numbers.length !== 10 || numbers.some((number, index) => number !== firstQuestion + index)) {
    throw new Error(`IELTS Listening Part ${source.part} must contain the exact question sequence ${firstQuestion}–${lastQuestion}.`);
  }
  if (blanks.some((blank) =>
    !blank.expected.trim()
    || blank.explanation.trim().length < 20
    || !blank.acceptedAnswers.length
    || blank.acceptedAnswers.some((answer) => !answer.trim())
    || !Number.isInteger(blank.maxWords)
    || blank.maxWords <= 0
  )) {
    throw new Error('Every IELTS Listening answer needs a model response and an evidence explanation.');
  }

  for (const group of source.groups) {
    const groupNumbers = group.type === 'form'
      ? group.blanks.map((blank) => blank.number)
      : group.rows.flatMap((row) => row.flatMap((cell) => cell.type === 'blank' ? [cell.number] : []));
    const sorted = [...groupNumbers].sort((a, b) => a - b);
    const expectedRangeLength = group.questionRange[1] - group.questionRange[0] + 1;
    if (
      sorted.length !== expectedRangeLength
      || sorted.some((number, index) => number !== group.questionRange[0] + index)
    ) {
      throw new Error(`Question range does not match concrete blanks in group ${group.id}.`);
    }

    if (group.type === 'form') {
      const placeholders = [...group.template.matchAll(/\{\{(\d+)\}\}/g)].map((match) => Number(match[1])).sort((a, b) => a - b);
      if (placeholders.length !== sorted.length || placeholders.some((number, index) => number !== sorted[index])) {
        throw new Error(`Template placeholders do not match blanks in group ${group.id}.`);
      }
    } else if (group.type === 'table' && (
      !group.headers.length
      || group.headers.some((header) => !header.trim())
      || !group.rows.length
      || group.rows.some((row) => row.length !== group.headers.length)
    )) {
      throw new Error(`Table rows do not match headers in group ${group.id}.`);
    } else if (group.type !== 'table') {
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
    questionCount: sourceBlanks(source).length,
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
  expectedNumbers: readonly number[],
): value is Record<string, string> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const record = value as Record<string, unknown>;
  const keys = Object.keys(record);
  const expected = new Set(expectedNumbers.map(String));
  if (keys.length !== expected.size || keys.some((key) => !expected.has(key))) return false;
  return keys.every((key) =>
    typeof record[key] === 'string'
    && record[key].trim().length > 0
    && record[key].length <= 80,
  );
}

export function scoreIeltsListeningPractice(
  source: IeltsListeningPracticeSource,
  responses: Readonly<Record<string, string>>,
): IeltsListeningScoreResult {
  assertSourceIntegrity(source);
  const blanks = sourceBlanks(source).sort((a, b) => a.number - b.number);
  const outcomes = blanks.map((blank) => ({
    number: blank.number,
    correct: blank.acceptedAnswers.some(
      (accepted) => normalizeAnswer(accepted) === normalizeAnswer(responses[String(blank.number)] ?? ''),
    ),
    expected: blank.expected,
    explanation: blank.explanation,
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
  return sourceBlanks(source).map((blank) => blank.number).sort((a, b) => a - b);
}
