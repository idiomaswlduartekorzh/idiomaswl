export const IELTS_SPEAKING_PART1_PRIVATE_TOPIC_IDS = [
  'seat-choices',
  'indoor-light',
  'bags-and-pockets',
  'signs-and-labels',
  'small-repairs',
  'short-waits',
] as const;

export type IeltsSpeakingPart1PrivateTopicId =
  (typeof IELTS_SPEAKING_PART1_PRIVATE_TOPIC_IDS)[number];

export interface IeltsSpeakingPart1PrivateQuestion {
  readonly id: string;
  readonly order: 1 | 2 | 3 | 4;
  readonly prompt: string;
}

export interface IeltsSpeakingPart1PrivateTopicPack {
  readonly id: IeltsSpeakingPart1PrivateTopicId;
  readonly label: string;
  readonly transition: string;
  readonly questions: readonly IeltsSpeakingPart1PrivateQuestion[];
}

export interface IeltsSpeakingPart1PrivateBank {
  readonly schemaVersion: 1;
  readonly bankId: 'welearn-speaking-part-1-bank-001';
  readonly contentVersion: '2026-09-01.1';
  readonly part: 1;
  readonly locale: 'en';
  readonly title: 'Small Everyday Choices';
  readonly responseKind: 'open-response';
  readonly practiceDisclosure: 'Independent WeLearn text practice. It omits the identity check, records no response and does not produce an IELTS band score.';
  readonly format: {
    readonly officialPartDurationSeconds: readonly [240, 300];
    readonly publicQuestionCountRule: 'not-fixed';
    readonly practiceComposition: 'two-topic-packs';
  };
  readonly boundaries: {
    readonly artifactMode: 'private-text-only';
    readonly identityCheck: 'omitted';
    readonly personalDataCollection: 'none';
    readonly responseCapture: 'none';
    readonly persistence: 'none';
    readonly networkTransfer: 'none';
    readonly assessment: 'none';
    readonly feedback: 'none';
    readonly modelAnswers: 'none';
  };
  readonly topicPacks: readonly IeltsSpeakingPart1PrivateTopicPack[];
  readonly pilotRecipe: {
    readonly practiceId: 'welearn-speaking-part-1-001';
    readonly practiceNumber: 1;
    readonly topicPackIds: readonly ['seat-choices', 'indoor-light'];
  };
}

const TOP_LEVEL_KEYS = [
  'schemaVersion',
  'bankId',
  'contentVersion',
  'part',
  'locale',
  'title',
  'responseKind',
  'practiceDisclosure',
  'format',
  'boundaries',
  'topicPacks',
  'pilotRecipe',
] as const;

const FORMAT_KEYS = [
  'officialPartDurationSeconds',
  'publicQuestionCountRule',
  'practiceComposition',
] as const;

const BOUNDARY_KEYS = [
  'artifactMode',
  'identityCheck',
  'personalDataCollection',
  'responseCapture',
  'persistence',
  'networkTransfer',
  'assessment',
  'feedback',
  'modelAnswers',
] as const;

const TOPIC_PACK_KEYS = ['id', 'label', 'transition', 'questions'] as const;
const QUESTION_KEYS = ['id', 'order', 'prompt'] as const;
const PILOT_RECIPE_KEYS = ['practiceId', 'practiceNumber', 'topicPackIds'] as const;

const EXPECTED_LABELS: Readonly<Record<IeltsSpeakingPart1PrivateTopicId, string>> = {
  'seat-choices': 'Choosing seats',
  'indoor-light': 'Light where you live',
  'bags-and-pockets': 'Bags and pockets',
  'signs-and-labels': 'Signs and labels',
  'small-repairs': 'Small repairs',
  'short-waits': 'Short waits',
};

const EXPECTED_TRANSITIONS: Readonly<Record<IeltsSpeakingPart1PrivateTopicId, string>> = {
  'seat-choices': "First, let's talk about choosing seats.",
  'indoor-light': "Now let's talk about light where you live.",
  'bags-and-pockets': "Let's talk about the things you carry each day.",
  'signs-and-labels': "Let's talk about signs and labels.",
  'small-repairs': "Let's talk about small repairs.",
  'short-waits': "Let's talk about short waits.",
};

const SENSITIVE_IDENTITY_PATTERN = /\b(?:what is your name|full name|family name|surname|e-?mail(?: address)?|phone(?: number)?|mobile(?: number)?|telephone(?: number)?|home address|street address|where exactly do you live|postal code|postcode|passport(?: number)?|identity card|identification number|national id|date of birth|birth ?date|bank account|credit card|(?:employer|company|school|university)(?:['’]s)? name|name of your (?:employer|company|school|university)|name of (?:your|another|any other|a different) person|(?:another person|someone else|friend|relative|colleague)(?:['’]s)? (?:name|e-?mail|phone|address|contact details|personal data))\b/i;
const ASSESSMENT_OR_ANSWER_PATTERN = /\b(?:band(?: score)?|score|grade|mark|assess(?:ment)?|feedback|model answer|sample answer|ideal answer|correct answer)\b/i;
const URL_PATTERN = /(?:https?:\/\/|www\.|mailto:|\b[a-z0-9-]+(?:\.[a-z0-9-]+)+\/(?:[^\s]*))/i;

function assertPlainRecord(value: unknown, label: string): asserts value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new TypeError(`${label} must be a plain object.`);
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) {
    throw new TypeError(`${label} must be a plain object.`);
  }
}

function assertExactKeys(
  value: Record<string, unknown>,
  expected: readonly string[],
  label: string,
): void {
  const actual = Object.keys(value).sort();
  const allowed = [...expected].sort();
  if (actual.length !== allowed.length || actual.some((key, index) => key !== allowed[index])) {
    throw new TypeError(`${label} contains missing or unknown fields.`);
  }
}

function assertLiteral(value: unknown, expected: string | number, label: string): void {
  if (value !== expected) {
    throw new TypeError(`${label} must equal ${JSON.stringify(expected)}.`);
  }
}

function questionWordCount(prompt: string): number {
  return prompt.match(/[A-Za-z]+(?:['’-][A-Za-z]+)*/g)?.length ?? 0;
}

function assertQuestion(
  value: unknown,
  topicId: IeltsSpeakingPart1PrivateTopicId,
  questionNumber: number,
): asserts value is IeltsSpeakingPart1PrivateQuestion {
  const label = `${topicId} question ${questionNumber}`;
  assertPlainRecord(value, label);
  assertExactKeys(value, QUESTION_KEYS, label);
  assertLiteral(value.id, `${topicId}-q${questionNumber}`, `${label}.id`);
  assertLiteral(value.order, questionNumber, `${label}.order`);
  if (typeof value.prompt !== 'string') {
    throw new TypeError(`${label}.prompt must be a string.`);
  }
  if (/[\r\n\u2028\u2029]/u.test(value.prompt)) {
    throw new TypeError(`${label}.prompt must fit on one line.`);
  }
  if (/[<>]/u.test(value.prompt) || URL_PATTERN.test(value.prompt)) {
    throw new TypeError(`${label}.prompt must not contain HTML or URLs.`);
  }
  if (!value.prompt.endsWith('?')) {
    throw new TypeError(`${label}.prompt must be a question.`);
  }
  const wordCount = questionWordCount(value.prompt);
  if (wordCount < 7 || wordCount > 18) {
    throw new TypeError(`${label}.prompt must contain between 7 and 18 words.`);
  }
  if (SENSITIVE_IDENTITY_PATTERN.test(value.prompt)) {
    throw new TypeError(`${label}.prompt must not request personal identifying data.`);
  }
  if (ASSESSMENT_OR_ANSWER_PATTERN.test(value.prompt)) {
    throw new TypeError(`${label}.prompt must not request assessment or model-answer content.`);
  }
}

function assertTopicPack(
  value: unknown,
  expectedId: IeltsSpeakingPart1PrivateTopicId,
): asserts value is IeltsSpeakingPart1PrivateTopicPack {
  const label = `topic pack ${expectedId}`;
  assertPlainRecord(value, label);
  assertExactKeys(value, TOPIC_PACK_KEYS, label);
  assertLiteral(value.id, expectedId, `${label}.id`);
  assertLiteral(value.label, EXPECTED_LABELS[expectedId], `${label}.label`);
  assertLiteral(value.transition, EXPECTED_TRANSITIONS[expectedId], `${label}.transition`);
  if (!Array.isArray(value.questions) || value.questions.length !== 4) {
    throw new TypeError(`${label}.questions must contain exactly four questions.`);
  }
  value.questions.forEach((question, index) => assertQuestion(question, expectedId, index + 1));
}

export function assertIeltsSpeakingPart1PrivateBank(
  value: unknown,
): asserts value is IeltsSpeakingPart1PrivateBank {
  assertPlainRecord(value, 'IELTS Speaking Part 1 private bank');
  assertExactKeys(value, TOP_LEVEL_KEYS, 'IELTS Speaking Part 1 private bank');

  assertLiteral(value.schemaVersion, 1, 'schemaVersion');
  assertLiteral(value.bankId, 'welearn-speaking-part-1-bank-001', 'bankId');
  assertLiteral(value.contentVersion, '2026-09-01.1', 'contentVersion');
  assertLiteral(value.part, 1, 'part');
  assertLiteral(value.locale, 'en', 'locale');
  assertLiteral(value.title, 'Small Everyday Choices', 'title');
  assertLiteral(value.responseKind, 'open-response', 'responseKind');
  assertLiteral(
    value.practiceDisclosure,
    'Independent WeLearn text practice. It omits the identity check, records no response and does not produce an IELTS band score.',
    'practiceDisclosure',
  );

  assertPlainRecord(value.format, 'format');
  assertExactKeys(value.format, FORMAT_KEYS, 'format');
  if (
    !Array.isArray(value.format.officialPartDurationSeconds)
    || value.format.officialPartDurationSeconds.length !== 2
    || value.format.officialPartDurationSeconds[0] !== 240
    || value.format.officialPartDurationSeconds[1] !== 300
  ) {
    throw new TypeError('format.officialPartDurationSeconds must equal [240, 300].');
  }
  assertLiteral(value.format.publicQuestionCountRule, 'not-fixed', 'format.publicQuestionCountRule');
  assertLiteral(value.format.practiceComposition, 'two-topic-packs', 'format.practiceComposition');

  assertPlainRecord(value.boundaries, 'boundaries');
  assertExactKeys(value.boundaries, BOUNDARY_KEYS, 'boundaries');
  assertLiteral(value.boundaries.artifactMode, 'private-text-only', 'boundaries.artifactMode');
  assertLiteral(value.boundaries.identityCheck, 'omitted', 'boundaries.identityCheck');
  for (const key of BOUNDARY_KEYS.slice(2)) {
    assertLiteral(value.boundaries[key], 'none', `boundaries.${key}`);
  }

  if (!Array.isArray(value.topicPacks) || value.topicPacks.length !== 6) {
    throw new TypeError('topicPacks must contain exactly six packs.');
  }
  value.topicPacks.forEach((pack, index) => {
    assertTopicPack(pack, IELTS_SPEAKING_PART1_PRIVATE_TOPIC_IDS[index]);
  });

  const prompts = value.topicPacks.flatMap((pack) =>
    (pack as IeltsSpeakingPart1PrivateTopicPack).questions.map((question) =>
      question.prompt.normalize('NFKC').toLocaleLowerCase('en').replace(/\s+/g, ' ').trim()));
  if (new Set(prompts).size !== prompts.length) {
    throw new TypeError('Question prompts must be unique across the bank.');
  }

  assertPlainRecord(value.pilotRecipe, 'pilotRecipe');
  assertExactKeys(value.pilotRecipe, PILOT_RECIPE_KEYS, 'pilotRecipe');
  assertLiteral(value.pilotRecipe.practiceId, 'welearn-speaking-part-1-001', 'pilotRecipe.practiceId');
  assertLiteral(value.pilotRecipe.practiceNumber, 1, 'pilotRecipe.practiceNumber');
  if (
    !Array.isArray(value.pilotRecipe.topicPackIds)
    || value.pilotRecipe.topicPackIds.length !== 2
    || value.pilotRecipe.topicPackIds[0] !== 'seat-choices'
    || value.pilotRecipe.topicPackIds[1] !== 'indoor-light'
  ) {
    throw new TypeError('pilotRecipe.topicPackIds must equal ["seat-choices", "indoor-light"].');
  }
}
