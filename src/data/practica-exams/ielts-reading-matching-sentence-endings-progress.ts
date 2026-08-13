import {
  IELTS_MATCHING_SENTENCE_ENDINGS_PASSAGES,
  type MatchingSentenceEndingsPassage,
} from './seo-catalog.ts';
import {
  MATCHING_HEADINGS_PASSAGES,
  type MatchingHeadingsTrainingPassage,
} from './ielts-reading-matching-headings-progress.ts';

export type SentenceEndingErrorCode =
  | 'grammar-only'
  | 'wrong-relation'
  | 'scope-inflation'
  | 'polarity-reversal'
  | 'lexical-echo'
  | 'wrong-evidence-zone';

export type SentenceEndingTrainingQuestion = MatchingSentenceEndingsPassage['questions'][number] & {
  evidence: string;
  closestDistractorId: string;
  distractorFailure: string;
  errorCode: SentenceEndingErrorCode;
};

export type SentenceEndingTrainingPassage = Omit<MatchingSentenceEndingsPassage, 'questions'> & {
  sourceTitle: string;
  sourceUrl: string;
  sourceNote: string;
  questions: SentenceEndingTrainingQuestion[];
};

export type SentenceEndingLevel = {
  id: string;
  title: string;
  focus: string;
  instruction: string;
  passageIds: string[];
  questionIds?: string[];
  masteryScore: number;
};

export const SENTENCE_ENDINGS_STORAGE_KEY = 'welearn:ielts-reading:matching-sentence-endings:v2';
export const SENTENCE_ENDINGS_LEGACY_STORAGE_KEY = 'welearn:ielts-reading:matching-sentence-endings:v1';

const EXISTING_SOURCE_BOUNDARIES = [
  {
    sourceTitle: 'US EPA — Heat Island Effect resources',
    sourceUrl: 'https://www.epa.gov/heatislands',
    sourceNote: 'Existing WeLearn scenario. EPA supports the broad heat-island mechanisms; it does not independently verify every sentence in this composite passage.',
  },
  {
    sourceTitle: 'US EPA — Sustainable Management of Food',
    sourceUrl: 'https://www.epa.gov/sustainable-management-food',
    sourceNote: 'Existing WeLearn composite scenario. EPA supports prevention, donation and composting priorities; the passage is not an official case study.',
  },
  {
    sourceTitle: 'FEMA — Community Lifelines and public information',
    sourceUrl: 'https://www.fema.gov/emergency-managers/practitioners/lifelines',
    sourceNote: 'Existing WeLearn scenario with conservative candidate-source coverage. The source supports community information functions, not every fictional library programme detail.',
  },
] as const;

const EXISTING_COMPETITORS: Record<string, [string, SentenceEndingErrorCode]> = {
  'mse-microclimates-01': ['H', 'wrong-evidence-zone'],
  'mse-microclimates-02': ['B', 'scope-inflation'],
  'mse-microclimates-03': ['F', 'polarity-reversal'],
  'mse-microclimates-04': ['G', 'lexical-echo'],
  'mse-microclimates-05': ['D', 'grammar-only'],
  'mse-microclimates-06': ['F', 'polarity-reversal'],
  'mse-food-waste-01': ['H', 'wrong-evidence-zone'],
  'mse-food-waste-02': ['F', 'wrong-relation'],
  'mse-food-waste-03': ['C', 'polarity-reversal'],
  'mse-food-waste-04': ['A', 'grammar-only'],
  'mse-food-waste-05': ['F', 'wrong-relation'],
  'mse-food-waste-06': ['B', 'wrong-evidence-zone'],
  'mse-libraries-02': ['H', 'wrong-relation'],
  'mse-libraries-03': ['E', 'wrong-evidence-zone'],
  'mse-libraries-04': ['C', 'lexical-echo'],
  'mse-libraries-05': ['A', 'scope-inflation'],
  'mse-libraries-06': ['F', 'polarity-reversal'],
};

function enrichExistingPassage(passage: MatchingSentenceEndingsPassage, passageIndex: number): SentenceEndingTrainingPassage {
  const excludedLegacyQuestionIds = new Set([
    // Two completions remain reasonable when endings may be reused.
    'mse-libraries-01',
    // These two beginnings break the expected passage-information order.
    'mse-food-waste-06',
    'mse-libraries-06',
  ]);
  const questions = passage.questions
    .filter((question) => !excludedLegacyQuestionIds.has(question.id))
    .map((question) => {
      const [closestDistractorId, errorCode] = EXISTING_COMPETITORS[question.id];
      return {
        ...question,
        evidence: question.explanation,
        closestDistractorId,
        distractorFailure: question.trap,
        errorCode,
      };
    });
  return { ...passage, ...EXISTING_SOURCE_BOUNDARIES[passageIndex], questions };
}

function sourcePassage(id: string) {
  const passage = MATCHING_HEADINGS_PASSAGES.find((item) => item.id === id);
  if (!passage) throw new Error(`Missing source-backed passage: ${id}`);
  return passage;
}

function passageText(passage: MatchingHeadingsTrainingPassage) {
  return passage.paragraphs.map((paragraph) => paragraph.text).join('\n\n');
}

function derivedPassage(
  source: MatchingHeadingsTrainingPassage,
  config: Omit<SentenceEndingTrainingPassage, 'passage' | 'sourceTitle' | 'sourceUrl' | 'sourceNote'>,
): SentenceEndingTrainingPassage {
  return {
    ...config,
    passage: passageText(source),
    sourceTitle: source.sourceTitle,
    sourceUrl: source.sourceUrl,
    sourceNote: `${source.sourceNote} This sentence-endings adaptation reuses that reviewed text and adds no new factual claim.`,
  };
}

const cooling = sourcePassage('cooling-city-blocks');
const sleep = sourcePassage('sleep-builds-memory');
const citizen = sourcePassage('citizens-do-science');

const DERIVED_PASSAGES: SentenceEndingTrainingPassage[] = [
  derivedPassage(cooling, {
    id: 'mse-city-cooling',
    title: 'Matching Sentence Endings practice: city cooling',
    instructions: 'Choose the ending that completes both the grammar and the passage meaning. There are extra endings.',
    passageTitle: cooling.title,
    endingOptions: [
      { id: 'A', text: 'because developed surfaces store and release more heat.' },
      { id: 'B', text: 'by providing shade and releasing water into the surrounding air.' },
      { id: 'C', text: 'without requiring the whole property to be rebuilt.' },
      { id: 'D', text: 'before deciding where each intervention should be used.' },
      { id: 'E', text: 'when several methods are selected for local conditions.' },
      { id: 'F', text: 'because every climate responds to reflective roofs in the same way.' },
      { id: 'G', text: 'only if vegetation is treated mainly as decoration.' },
      { id: 'H', text: 'after a citywide average replaces block-level evidence.' },
    ],
    questions: [
      {
        id: 'mse-cooling-01', sentenceStart: 'Neighbouring city blocks may reach different temperatures', answer: 'A',
        explanation: 'The first paragraph links uneven urban warming to roofs, roads and buildings that absorb and retain solar energy.',
        trap: 'The statement asks for the physical cause, not the later planning response.', evidence: 'Dark roofs, roads and other developed surfaces absorb and hold more solar energy.',
        closestDistractorId: 'D', distractorFailure: 'D describes diagnosis before investment, not the origin of uneven heat.', errorCode: 'wrong-evidence-zone',
      },
      {
        id: 'mse-cooling-02', sentenceStart: 'Trees cool streets in two connected ways', answer: 'B',
        explanation: 'The vegetation paragraph names shade and evapotranspiration.', trap: 'Decoration is explicitly rejected as the source of the benefit.',
        evidence: 'Leaves shade surfaces and plants release water through evapotranspiration.', closestDistractorId: 'G', distractorFailure: 'G reverses the passage’s contrast between cooling mechanisms and decoration.', errorCode: 'polarity-reversal',
      },
      {
        id: 'mse-cooling-03', sentenceStart: 'Changing a roof surface can lower temperatures', answer: 'C',
        explanation: 'The cool-roof paragraph says the intervention can reduce temperatures without rebuilding the property.', trap: 'Do not add a universal climate claim that the passage explicitly qualifies.',
        evidence: 'A cool roof can reduce temperatures without rebuilding the entire property.', closestDistractorId: 'F', distractorFailure: 'F removes the stated climate and design limitations.', errorCode: 'scope-inflation',
      },
      {
        id: 'mse-cooling-04', sentenceStart: 'Planners compare canopy, surface and building data', answer: 'D',
        explanation: 'Those datasets locate different needs before money is spent.', trap: 'Combining measures is the later decision, not the purpose of the initial mapping.',
        evidence: 'Planners map where exposure and missing shade overlap before spending money.', closestDistractorId: 'E', distractorFailure: 'E is the resulting portfolio, while the start describes the diagnostic step.', errorCode: 'wrong-relation',
      },
      {
        id: 'mse-cooling-05', sentenceStart: 'A practical heat plan avoids one universal fix', answer: 'E',
        explanation: 'The conclusion combines methods according to space, budget and maintenance capacity.', trap: 'A citywide average is described as less useful, not as the basis of the plan.',
        evidence: 'A practical plan combines methods according to local capacity.', closestDistractorId: 'H', distractorFailure: 'H contradicts the block-level planning principle.', errorCode: 'polarity-reversal',
      },
    ],
  }),
  derivedPassage(sleep, {
    id: 'mse-sleep-memory',
    title: 'Matching Sentence Endings practice: sleep and memory',
    instructions: 'Choose the ending that preserves timing, cause and scope. There are extra endings.',
    passageTitle: sleep.title,
    endingOptions: [
      { id: 'A', text: 'because the sleeping brain continues to process information.' },
      { id: 'B', text: 'before a learner first tries to encode new material.' },
      { id: 'C', text: 'by reactivating and stabilising information already encountered.' },
      { id: 'D', text: 'when newer and older memories are activated at separate moments.' },
      { id: 'E', text: 'because sleep can replace deliberate practice.' },
      { id: 'F', text: 'only if every learner follows one perfect bedtime.' },
      { id: 'G', text: 'after attention and judgement have become irrelevant.' },
      { id: 'H', text: 'while new notes are being added during the night.' },
    ],
    questions: [
      {
        id: 'mse-sleep-01', sentenceStart: 'Researchers treat sleep as part of learning', answer: 'A',
        explanation: 'The opening corrects the idea that sleep is an empty interval.', trap: 'The passage never says sleep substitutes for practice.',
        evidence: 'The sleeping brain remains busy and continues to process information.', closestDistractorId: 'E', distractorFailure: 'E inflates an active role into replacement of practice.', errorCode: 'scope-inflation',
      },
      {
        id: 'mse-sleep-02', sentenceStart: 'Adequate rest can support memory formation', answer: 'B',
        explanation: 'The second paragraph concerns readiness before a lesson.', trap: 'Do not confuse pre-learning readiness with post-learning consolidation.',
        evidence: 'Sleep before a lesson supports attention and initial encoding.', closestDistractorId: 'C', distractorFailure: 'C happens after material has already been learned.', errorCode: 'wrong-relation',
      },
      {
        id: 'mse-sleep-03', sentenceStart: 'Sleep after learning may strengthen a memory', answer: 'C',
        explanation: 'New memories are reactivated, stabilised and linked with older knowledge.', trap: 'The brain reorganises existing information; it does not add new notes.',
        evidence: 'Newly formed memories are reactivated and stabilised.', closestDistractorId: 'H', distractorFailure: 'H repeats night-time vocabulary but reverses what the passage says occurs.', errorCode: 'lexical-echo',
      },
      {
        id: 'mse-sleep-04', sentenceStart: 'Interference between old and new learning may be reduced', answer: 'D',
        explanation: 'Separate activation patterns may stop newer experience overwriting earlier learning.', trap: 'The answer must describe separation between memories, not general brain activity.',
        evidence: 'Newer and older information may reactivate at separate moments.', closestDistractorId: 'A', distractorFailure: 'A is true but too broad for the specific anti-interference relationship.', errorCode: 'grammar-only',
      },
    ],
  }),
  derivedPassage(citizen, {
    id: 'mse-citizen-science',
    title: 'Matching Sentence Endings practice: citizen science',
    instructions: 'Choose the ending that preserves the project mechanism and result. There are extra endings.',
    passageTitle: citizen.title,
    endingOptions: [
      { id: 'A', text: 'when many modest reports create a much larger dataset.' },
      { id: 'B', text: 'because every task requires professional scientific training.' },
      { id: 'C', text: 'by giving volunteers shared instructions and reporting categories.' },
      { id: 'D', text: 'when human judgement and computation perform complementary roles.' },
      { id: 'E', text: 'by producing research evidence and developing observation skills.' },
      { id: 'F', text: 'while removing the need for project design and expert review.' },
      { id: 'G', text: 'although a single volunteer must inspect the entire archive.' },
      { id: 'H', text: 'after algorithms stop searching large datasets.' },
    ],
    questions: [
      {
        id: 'mse-citizen-01', sentenceStart: 'Distributed participation expands research capacity', answer: 'A',
        explanation: 'Thousands of small contributions can expose patterns across a wide area or image archive.', trap: 'The scale comes from many volunteers, not one person inspecting everything.',
        evidence: 'Thousands of reports can reveal patterns or examine an enormous archive.', closestDistractorId: 'G', distractorFailure: 'G reverses the distributed-work model.', errorCode: 'polarity-reversal',
      },
      {
        id: 'mse-citizen-02', sentenceStart: 'Projects make volunteer observations comparable', answer: 'C',
        explanation: 'Instructions, examples and fixed categories provide a shared method.', trap: 'A large group creates scale but not comparability by itself.',
        evidence: 'Projects provide instructions, examples and fixed reporting categories.', closestDistractorId: 'A', distractorFailure: 'A is about quantity of reports, not the quality-control mechanism.', errorCode: 'wrong-relation',
      },
      {
        id: 'mse-citizen-03', sentenceStart: 'Software and volunteers can support the same investigation', answer: 'D',
        explanation: 'People verify or label examples while software scans at scale.', trap: 'The relationship is collaboration, not the disappearance of automated search.',
        evidence: 'Human judgement and computation perform different parts of the same investigation.', closestDistractorId: 'H', distractorFailure: 'H turns collaboration into the end of algorithmic work.', errorCode: 'polarity-reversal',
      },
      {
        id: 'mse-citizen-04', sentenceStart: 'Citizen science may benefit research and participants', answer: 'E',
        explanation: 'The passage links useful evidence and publications with stronger observation skills for volunteers.', trap: 'No ending may erase the stated need for expert review.',
        evidence: 'Volunteer reports create evidence, while participation can build skills and support publications.', closestDistractorId: 'F', distractorFailure: 'F makes the benefits absolute by removing quality-control needs.', errorCode: 'scope-inflation',
      },
    ],
  }),
];

export const SENTENCE_ENDINGS_PASSAGES: SentenceEndingTrainingPassage[] = [
  ...IELTS_MATCHING_SENTENCE_ENDINGS_PASSAGES.map(enrichExistingPassage),
  ...DERIVED_PASSAGES,
];

export const SENTENCE_ENDINGS_GUIDED_PASSAGE_ID = 'mse-microclimates';
export const SENTENCE_ENDINGS_INDEPENDENT_PASSAGE_ID = 'mse-food-waste';

export const SENTENCE_ENDINGS_LEVELS: SentenceEndingLevel[] = [
  {
    id: 'grammar-logic', title: 'Grammar is only the first filter', focus: 'Grammar plus passage meaning',
    instruction: 'Reject an ending that sounds natural but changes the passage relationship.',
    passageIds: ['mse-coastal-libraries', 'mse-city-cooling', 'mse-sleep-memory', 'mse-citizen-science'],
    questionIds: ['mse-libraries-03', 'mse-cooling-03', 'mse-sleep-04', 'mse-citizen-02'], masteryScore: 3,
  },
  {
    id: 'relationship-control', title: 'Control timing, cause and scope', focus: 'Complete proposition control',
    instruction: 'Match the exact relationship, not a repeated topic word or a plausible general fact.',
    passageIds: ['mse-coastal-libraries', 'mse-city-cooling', 'mse-sleep-memory', 'mse-citizen-science'],
    questionIds: ['mse-libraries-05', 'mse-cooling-04', 'mse-sleep-02', 'mse-citizen-03'], masteryScore: 3,
  },
  {
    id: 'library-set', title: 'Climate-information set', focus: 'Full set · four sentence starts',
    instruction: 'Complete the full set before feedback opens. Ambiguous and out-of-order legacy items remain excluded.',
    passageIds: ['mse-coastal-libraries'], masteryScore: 4,
  },
  {
    id: 'cooling-set', title: 'City-cooling set', focus: 'Full set · five sentence starts',
    instruction: 'Separate cause, intervention, diagnosis and policy conclusion.', passageIds: ['mse-city-cooling'], masteryScore: 4,
  },
  {
    id: 'sleep-set', title: 'Sleep-and-memory set', focus: 'Full set · four sentence starts',
    instruction: 'Track whether the evidence comes before, after or between memories.', passageIds: ['mse-sleep-memory'], masteryScore: 3,
  },
  {
    id: 'citizen-set', title: 'Citizen-science set', focus: 'Full set · four sentence starts',
    instruction: 'Preserve the mechanism and result across every completed sentence.', passageIds: ['mse-citizen-science'], masteryScore: 3,
  },
];

export function getSentenceEndingPassage(id: string) {
  return SENTENCE_ENDINGS_PASSAGES.find((passage) => passage.id === id);
}

function hashText(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function ordered<T>(items: T[], seed: number) {
  return items.map((item, index) => ({ item, score: hashText(`${seed}:${index}:${JSON.stringify(item)}`) }))
    .sort((a, b) => a.score - b.score).map(({ item }) => item);
}

export function getSentenceEndingDrillIds(
  passage: SentenceEndingTrainingPassage,
  question: SentenceEndingTrainingQuestion,
  attemptSeed: number,
) {
  const distractors = passage.endingOptions.filter((ending) => ending.id !== question.answer);
  const closest = distractors.find((ending) => ending.id === question.closestDistractorId);
  const remaining = distractors.filter((ending) => ending.id !== question.closestDistractorId);
  const selected = [passage.endingOptions.find((ending) => ending.id === question.answer), closest, ...ordered(remaining, hashText(question.id)).slice(0, 2)]
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  return ordered(selected, hashText(`${question.id}:${attemptSeed}`)).map((ending) => ending.id);
}
