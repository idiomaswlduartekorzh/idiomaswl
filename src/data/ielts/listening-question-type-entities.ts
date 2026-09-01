export const IELTS_LISTENING_OFFICIAL_FORMAT_URL =
  'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-listening';

export const IELTS_LISTENING_OFFICIAL_MAP_GUIDE_URL =
  'https://ielts.org/news-and-insights/10-tips-for-answering-map-or-plan-questions-in-ielts-listening';

export const IELTS_LISTENING_PART_1_COMPLETION_HREF =
  '/practica/ielts/listening/part-1';

export type IeltsListeningQuestionTypeId =
  | 'multiple-choice'
  | 'matching'
  | 'plan-map-diagram-labelling'
  | 'form-note-table-flow-chart-summary-completion'
  | 'sentence-completion'
  | 'short-answer-questions';

export interface IeltsListeningQuestionTypeWorkedExample {
  ownership: 'welearn-original';
  context: string;
  prompt: string;
  spokenEvidence: string;
  resolution: string;
  rationale: string;
}

export interface IeltsListeningQuestionTypeEntity {
  id: IeltsListeningQuestionTypeId;
  officialOrder: 1 | 2 | 3 | 4 | 5 | 6;
  officialName: string;
  aliases: readonly string[];
  directDefinition: string;
  answerShape: string;
  instructionSignals: readonly string[];
  firstDecision: string;
  commonTrap: string;
  workedExample: IeltsListeningQuestionTypeWorkedExample;
  sourceUrls: readonly string[];
  availablePracticeHref?: typeof IELTS_LISTENING_PART_1_COMPLETION_HREF;
}

const EXPECTED_FAMILIES = [
  { id: 'multiple-choice', officialOrder: 1, officialName: 'Multiple choice' },
  { id: 'matching', officialOrder: 2, officialName: 'Matching' },
  {
    id: 'plan-map-diagram-labelling',
    officialOrder: 3,
    officialName: 'Plan, map or diagram labelling',
  },
  {
    id: 'form-note-table-flow-chart-summary-completion',
    officialOrder: 4,
    officialName: 'Form, note, table, flow-chart or summary completion',
  },
  { id: 'sentence-completion', officialOrder: 5, officialName: 'Sentence completion' },
  {
    id: 'short-answer-questions',
    officialOrder: 6,
    officialName: 'Short-answer questions',
  },
] as const satisfies readonly {
  id: IeltsListeningQuestionTypeId;
  officialOrder: IeltsListeningQuestionTypeEntity['officialOrder'];
  officialName: string;
}[];

const APPROVED_OFFICIAL_SOURCE_URLS = new Set<string>([
  IELTS_LISTENING_OFFICIAL_FORMAT_URL,
  IELTS_LISTENING_OFFICIAL_MAP_GUIDE_URL,
]);

const ENTITY_REQUIRED_KEYS = [
  'id',
  'officialOrder',
  'officialName',
  'aliases',
  'directDefinition',
  'answerShape',
  'instructionSignals',
  'firstDecision',
  'commonTrap',
  'workedExample',
  'sourceUrls',
] as const;

const WORKED_EXAMPLE_KEYS = [
  'ownership',
  'context',
  'prompt',
  'spokenEvidence',
  'resolution',
  'rationale',
] as const;

function fail(path: string, message: string): never {
  throw new Error(`Invalid IELTS Listening question-type entities at ${path}: ${message}`);
}

function requireRecord(value: unknown, path: string): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    fail(path, 'expected an object');
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) {
    fail(path, 'expected a plain object with no inherited content');
  }
  for (const key of Reflect.ownKeys(value)) {
    if (typeof key !== 'string') fail(path, 'symbol properties are not allowed');
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (!descriptor || !Object.hasOwn(descriptor, 'value')) {
      fail(`${path}.${key}`, 'accessor properties are not allowed');
    }
  }
  return value as Record<string, unknown>;
}

function requirePlainArray(value: unknown, path: string): unknown[] {
  if (!Array.isArray(value)) fail(path, 'expected an array');
  if (Object.getPrototypeOf(value) !== Array.prototype) {
    fail(path, 'expected a native array with no inherited content');
  }
  const expectedKeys = new Set([
    ...Array.from({ length: value.length }, (_, index) => String(index)),
    'length',
  ]);
  for (const key of Reflect.ownKeys(value)) {
    if (typeof key !== 'string' || !expectedKeys.has(key)) {
      fail(path, 'array contains an unsupported own property');
    }
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (!descriptor || !Object.hasOwn(descriptor, 'value')) {
      fail(`${path}[${key}]`, 'accessor array values are not allowed');
    }
  }
  if (Reflect.ownKeys(value).length !== expectedKeys.size) {
    fail(path, 'sparse arrays are not allowed');
  }
  return value;
}

function requireExactKeys(
  record: Record<string, unknown>,
  requiredKeys: readonly string[],
  optionalKeys: readonly string[],
  path: string,
) {
  const allowed = new Set([...requiredKeys, ...optionalKeys]);
  for (const key of Object.getOwnPropertyNames(record)) {
    if (!allowed.has(key)) fail(`${path}.${key}`, 'unsupported field');
  }
  for (const key of requiredKeys) {
    if (!Object.hasOwn(record, key)) fail(`${path}.${key}`, 'missing required field');
  }
}

function requireText(
  value: unknown,
  path: string,
  minimumLength: number,
): string {
  if (typeof value !== 'string' || value.trim().length < minimumLength) {
    fail(path, `expected trimmed text with at least ${minimumLength} characters`);
  }
  if (value !== value.trim()) fail(path, 'leading or trailing whitespace is not allowed');
  return value;
}

function requireUniqueTextArray(
  value: unknown,
  path: string,
  minimumItems: number,
): readonly string[] {
  const array = requirePlainArray(value, path);
  if (array.length < minimumItems) {
    fail(path, `expected at least ${minimumItems} text items`);
  }
  const items = array.map((item, index) => requireText(item, `${path}[${index}]`, 2));
  const normalized = items.map((item) => item.toLocaleLowerCase('en'));
  if (new Set(normalized).size !== normalized.length) fail(path, 'contains duplicate items');
  return items;
}

export function validateIeltsListeningQuestionTypeEntities(
  value: unknown,
): readonly IeltsListeningQuestionTypeEntity[] {
  const entities = requirePlainArray(value, '$');
  if (entities.length !== EXPECTED_FAMILIES.length) {
    fail('$', `expected exactly ${EXPECTED_FAMILIES.length} official families`);
  }

  const seenAliases = new Set<string>();
  const seenExampleEvidence = new Set<string>();

  for (const [index, expected] of EXPECTED_FAMILIES.entries()) {
    const path = `$[${index}]`;
    const entity = requireRecord(entities[index], path);
    requireExactKeys(entity, ENTITY_REQUIRED_KEYS, ['availablePracticeHref'], path);

    if (entity.id !== expected.id) {
      fail(`${path}.id`, `expected ${expected.id}`);
    }
    if (entity.officialOrder !== expected.officialOrder) {
      fail(`${path}.officialOrder`, `expected ${expected.officialOrder}`);
    }
    if (entity.officialName !== expected.officialName) {
      fail(`${path}.officialName`, `expected ${expected.officialName}`);
    }

    const aliases = requireUniqueTextArray(entity.aliases, `${path}.aliases`, 2);
    for (const alias of aliases) {
      const normalized = alias.toLocaleLowerCase('en');
      if (seenAliases.has(normalized)) fail(`${path}.aliases`, `duplicate alias: ${alias}`);
      seenAliases.add(normalized);
    }

    requireText(entity.directDefinition, `${path}.directDefinition`, 80);
    requireText(entity.answerShape, `${path}.answerShape`, 20);
    requireUniqueTextArray(entity.instructionSignals, `${path}.instructionSignals`, 2);
    requireText(entity.firstDecision, `${path}.firstDecision`, 40);
    requireText(entity.commonTrap, `${path}.commonTrap`, 40);

    const example = requireRecord(entity.workedExample, `${path}.workedExample`);
    requireExactKeys(example, WORKED_EXAMPLE_KEYS, [], `${path}.workedExample`);
    if (example.ownership !== 'welearn-original') {
      fail(`${path}.workedExample.ownership`, 'must be welearn-original');
    }
    requireText(example.context, `${path}.workedExample.context`, 30);
    requireText(example.prompt, `${path}.workedExample.prompt`, 30);
    const evidence = requireText(
      example.spokenEvidence,
      `${path}.workedExample.spokenEvidence`,
      50,
    );
    requireText(example.resolution, `${path}.workedExample.resolution`, 3);
    requireText(example.rationale, `${path}.workedExample.rationale`, 40);
    const normalizedEvidence = evidence.toLocaleLowerCase('en');
    if (seenExampleEvidence.has(normalizedEvidence)) {
      fail(`${path}.workedExample.spokenEvidence`, 'must be unique');
    }
    seenExampleEvidence.add(normalizedEvidence);

    const sourceUrls = requireUniqueTextArray(entity.sourceUrls, `${path}.sourceUrls`, 1);
    const expectedSourceUrls = expected.id === 'plan-map-diagram-labelling'
      ? [IELTS_LISTENING_OFFICIAL_FORMAT_URL, IELTS_LISTENING_OFFICIAL_MAP_GUIDE_URL]
      : [IELTS_LISTENING_OFFICIAL_FORMAT_URL];
    if (
      sourceUrls.length !== expectedSourceUrls.length
      || sourceUrls.some((sourceUrl, sourceIndex) => sourceUrl !== expectedSourceUrls[sourceIndex])
    ) {
      fail(`${path}.sourceUrls`, `must equal the canonical source list for ${expected.id}`);
    }
    for (const sourceUrl of sourceUrls) {
      if (!APPROVED_OFFICIAL_SOURCE_URLS.has(sourceUrl)) {
        fail(`${path}.sourceUrls`, `unapproved official source URL: ${sourceUrl}`);
      }
    }

    const practiceHref = entity.availablePracticeHref;
    if (expected.id === 'form-note-table-flow-chart-summary-completion') {
      if (practiceHref !== IELTS_LISTENING_PART_1_COMPLETION_HREF) {
        fail(
          `${path}.availablePracticeHref`,
          `must equal ${IELTS_LISTENING_PART_1_COMPLETION_HREF}`,
        );
      }
    } else if (practiceHref !== undefined) {
      fail(`${path}.availablePracticeHref`, 'practice is not publicly available for this family');
    }

    const serialized = JSON.stringify(entity);
    if (
      /welearn-listening-part-[2-4]|\/part-[2-4](?:\b|\/)|\bpart\s*[2-4]\b|docs\/ielts-superhub\/candidates|public\/(?:audio|images)\/ielts\/listening/i.test(
        serialized,
      )
    ) {
      fail(path, 'contains a private or candidate-only reference');
    }
  }

  return entities as unknown as readonly IeltsListeningQuestionTypeEntity[];
}

function deepFreeze<T>(value: T): T {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    for (const nestedValue of Object.values(value as Record<string, unknown>)) {
      deepFreeze(nestedValue);
    }
    Object.freeze(value);
  }
  return value;
}

const QUESTION_TYPE_ENTITIES = [
  {
    id: 'multiple-choice',
    officialOrder: 1,
    officialName: 'Multiple choice',
    aliases: [
      'IELTS Listening multiple choice',
      'single-answer and multiple-answer selection',
    ],
    directDefinition:
      'Multiple-choice tasks ask you to select the option that matches the speaker’s final meaning. A task may require one answer from three choices or several answers from a longer list, so the number of selections comes from the instruction rather than the page layout.',
    answerShape:
      'One letter, or a stated number of letters, selected from the options provided.',
    instructionSignals: [
      'Check how many options the task asks you to select.',
      'Compare each option with the exact focus of the question.',
    ],
    firstDecision:
      'Before listening, decide whether the item is asking for one choice or several and underline the difference between the options.',
    commonTrap:
      'A speaker may mention an attractive option first and then correct, narrow or reject it before giving the final decision.',
    workedExample: {
      ownership: 'welearn-original',
      context: 'A museum guide explains a revised start time for a small architecture tour.',
      prompt:
        'When will the architecture tour begin? A — 10:00; B — 10:20; C — 11:00.',
      spokenEvidence:
        'The leaflet still says ten o’clock, but a school group now needs the gallery first. They leave at ten twenty, and our architecture tour will begin immediately afterwards.',
      resolution: 'B — 10:20.',
      rationale:
        'Ten o’clock is the superseded leaflet time. The guide confirms that the tour starts when the school group leaves at ten twenty.',
    },
    sourceUrls: [IELTS_LISTENING_OFFICIAL_FORMAT_URL],
  },
  {
    id: 'matching',
    officialOrder: 2,
    officialName: 'Matching',
    aliases: ['IELTS Listening matching', 'match speakers, places or features'],
    directDefinition:
      'Matching tasks connect items heard in the recording with a fixed option list. The important job is to track who or what each statement belongs to, then recognise the relationship expressed after paraphrase, contrast or a change of preference.',
    answerShape:
      'A letter from the shared option list assigned to each numbered item.',
    instructionSignals: [
      'Check whether an option can be used once, more than once or not at all.',
      'Mark the category represented by each list before the recording begins.',
    ],
    firstDecision:
      'Identify what is being matched—such as people to opinions or places to facilities—so every note is attached to the correct category.',
    commonTrap:
      'The recording can mention several options for one person, while only the speaker’s final preference or confirmed association answers the item.',
    workedExample: {
      ownership: 'welearn-original',
      context: 'A student called Leo chooses a place for an afternoon study session.',
      prompt:
        'Match Leo to his chosen study space: A — art room; B — library; C — courtyard; D — café.',
      spokenEvidence:
        'The art room has better light, but I need silence today, so I have booked a desk in the library for the whole afternoon.',
      resolution: 'B — library.',
      rationale:
        'The art room is only compared with the final choice. The booking confirms that Leo selected the library.',
    },
    sourceUrls: [IELTS_LISTENING_OFFICIAL_FORMAT_URL],
  },
  {
    id: 'plan-map-diagram-labelling',
    officialOrder: 3,
    officialName: 'Plan, map or diagram labelling',
    aliases: [
      'IELTS Listening map labelling',
      'plan labeling and diagram labeling',
    ],
    directDefinition:
      'Plan, map or diagram labelling asks you to connect spoken spatial or process information with a visual. The reliable method is to establish orientation and a starting point, then follow landmarks and directional language instead of jumping directly to an isolated label.',
    answerShape:
      'A supplied letter or a short label, depending on the instruction and visual.',
    instructionSignals: [
      'Locate the entrance, compass, arrows and fixed labels before listening.',
      'Confirm whether you choose from letters or write words into gaps.',
    ],
    firstDecision:
      'Anchor the starting position and viewing direction before tracing any movement, because left and right depend on that orientation.',
    commonTrap:
      'A nearby landmark can sound like the destination; keep following the route until the speaker identifies the exact position being labelled.',
    workedExample: {
      ownership: 'welearn-original',
      context: 'A text-only recognition example follows a coastal path from a lighthouse to a footbridge.',
      prompt:
        'Which labelled area contains the information hut: before the footbridge, on the bridge, or just beyond it?',
      spokenEvidence:
        'Start at the lighthouse and follow the coastal path east. Cross the wooden footbridge, then look immediately to the seaward side; the small hut there is the information point.',
      resolution: 'The area just beyond the footbridge.',
      rationale:
        'The bridge is a landmark rather than the destination. “Cross” and “then” place the hut in the first area after it on the seaward side.',
    },
    sourceUrls: [
      IELTS_LISTENING_OFFICIAL_FORMAT_URL,
      IELTS_LISTENING_OFFICIAL_MAP_GUIDE_URL,
    ],
  },
  {
    id: 'form-note-table-flow-chart-summary-completion',
    officialOrder: 4,
    officialName: 'Form, note, table, flow-chart or summary completion',
    aliases: [
      'IELTS Listening completion tasks',
      'form, note, table, flow chart and summary gaps',
    ],
    directDefinition:
      'Completion tasks place missing information inside a form, notes, a table, a flow chart or a summary. The surrounding structure predicts the kind of detail required, while the instruction controls how many words or numbers may be entered in each gap.',
    answerShape:
      'Words and/or numbers that fit both the recorded meaning and the stated limit.',
    instructionSignals: [
      'Read the maximum word-and-number allowance before predicting an answer.',
      'Use headings, units and neighbouring entries to predict the missing information type.',
    ],
    firstDecision:
      'Label every gap as a likely name, date, quantity, place, category or step before the recording reaches that part of the structure.',
    commonTrap:
      'A semantically correct phrase can still fail if it exceeds the stated limit or does not fit the grammar and units around the gap.',
    workedExample: {
      ownership: 'welearn-original',
      context: 'An observatory announces the schedule and fee for an evening sky-watch session.',
      prompt:
        'Complete the notes: Day: ___; Meeting point: ___ Gate; Fee: £___. Use no more than one word and/or a number for each gap.',
      spokenEvidence:
        'The sky-watch takes place on Friday. Meet the astronomer at the North Gate, and bring seven pounds for the evening session.',
      resolution: 'Friday | North | 7.',
      rationale:
        'The headings predict a day, part of a gate name and a price. Each confirmed detail fits the one-word-and/or-number allowance.',
    },
    sourceUrls: [IELTS_LISTENING_OFFICIAL_FORMAT_URL],
    availablePracticeHref: IELTS_LISTENING_PART_1_COMPLETION_HREF,
  },
  {
    id: 'sentence-completion',
    officialOrder: 5,
    officialName: 'Sentence completion',
    aliases: ['IELTS Listening sentence completion', 'complete statements from audio'],
    directDefinition:
      'Sentence-completion tasks ask you to finish statements that represent important information from the recording. The completed sentence must preserve the speaker’s meaning, remain grammatically coherent and stay inside the word or number limit shown in the instruction.',
    answerShape:
      'A short word or phrase that completes the sentence within the declared limit.',
    instructionSignals: [
      'Predict the grammatical role needed after the words already printed.',
      'Track paraphrases between the sentence stem and the recording.',
    ],
    firstDecision:
      'Use the words before and after the gap to predict whether the missing material must be a noun phrase, number, place or other form.',
    commonTrap:
      'Copying a nearby phrase without checking grammar can produce an idea from the recording that does not complete the sentence correctly.',
    workedExample: {
      ownership: 'welearn-original',
      context: 'A ranger explains why a walking route is temporarily unavailable.',
      prompt:
        'Complete the sentence: The trail closed after ___ damaged the bridge. Use no more than two words.',
      spokenEvidence:
        'Heavy rain damaged the wooden bridge overnight, so the ranger closed the trail before the first walkers arrived.',
      resolution: 'heavy rain.',
      rationale:
        'The two-word noun phrase states the cause and completes the sentence grammatically without exceeding the limit.',
    },
    sourceUrls: [IELTS_LISTENING_OFFICIAL_FORMAT_URL],
  },
  {
    id: 'short-answer-questions',
    officialOrder: 6,
    officialName: 'Short-answer questions',
    aliases: ['IELTS Listening short answers', 'brief factual listening questions'],
    directDefinition:
      'Short-answer questions request a concise fact from the recording, commonly a place, price, time or other specific detail. The question word defines the information needed, and the response must remain within the stated limit rather than becoming a full explanatory sentence.',
    answerShape:
      'A brief fact written as words and/or numbers within the stated allowance.',
    instructionSignals: [
      'Use the question word to predict the category of fact required.',
      'Check whether one item or several separate answers are requested.',
    ],
    firstDecision:
      'Translate the question word into an answer category—where means a place, when means a time, and how much means a quantity or price.',
    commonTrap:
      'Extra explanation can break the limit even when the required fact is present, so record only the smallest complete response.',
    workedExample: {
      ownership: 'welearn-original',
      context: 'An event organiser explains where rented bicycles must be returned.',
      prompt:
        'Where can visitors return the bicycles? Use no more than three words.',
      spokenEvidence:
        'Bicycles can be returned to the east gate between four and six. The main entrance will be reserved for delivery vehicles.',
      resolution: 'the east gate.',
      rationale:
        'The question asks for a place. “The east gate” supplies that fact in three words, while the main entrance is explicitly reserved for another use.',
    },
    sourceUrls: [IELTS_LISTENING_OFFICIAL_FORMAT_URL],
  },
] as const satisfies readonly IeltsListeningQuestionTypeEntity[];

export const IELTS_LISTENING_QUESTION_TYPE_ENTITIES =
  deepFreeze(validateIeltsListeningQuestionTypeEntities(QUESTION_TYPE_ENTITIES));
