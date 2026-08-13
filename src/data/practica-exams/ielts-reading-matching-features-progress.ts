import { IELTS_MATCHING_FEATURES_PASSAGES, type MatchingFeaturesPassage } from './seo-catalog.ts';
import {
  MATCHING_HEADINGS_PASSAGES,
  type MatchingHeadingsTrainingPassage,
} from './ielts-reading-matching-headings-progress.ts';

export type MatchingFeaturesErrorCode =
  | 'nearby-name'
  | 'shared-topic'
  | 'wrong-actor'
  | 'wrong-result'
  | 'qualifier-loss'
  | 'relationship-reversal';

export type MatchingFeaturesTrainingFeature = MatchingFeaturesPassage['features'][number];

export type MatchingFeaturesTrainingQuestion = MatchingFeaturesPassage['questions'][number] & {
  evidence: string;
  closestDistractorId: string;
  distractorFailure: string;
  errorCode: MatchingFeaturesErrorCode;
};

export type MatchingFeaturesTrainingPassage = Omit<MatchingFeaturesPassage, 'questions'> & {
  sourceTitle: string;
  sourceUrl: string;
  sourceNote: string;
  questions: MatchingFeaturesTrainingQuestion[];
};

export type MatchingFeaturesLevel = {
  id: string;
  title: string;
  focus: string;
  instruction: string;
  passageIds: string[];
  questionIds?: string[];
  masteryScore: number;
};

export const MATCHING_FEATURES_STORAGE_KEY = 'welearn:ielts-reading:matching-features:v2';
export const MATCHING_FEATURES_LEGACY_STORAGE_KEY = 'welearn:ielts-reading:matching-features:v1';

const EXISTING_SOURCE_BOUNDARIES = [
  {
    sourceTitle: 'USDA Climate Hubs — Urban Agriculture',
    sourceUrl: 'https://www.climatehubs.usda.gov/urban-agriculture',
    sourceNote: 'Existing WeLearn scenario. USDA supports the broad rooftop, vacant-lot and indoor-farming categories; it does not verify the fictional project names or every stated outcome.',
  },
  {
    sourceTitle: 'National Institute on Aging — memory support resources',
    sourceUrl: 'https://www.nia.nih.gov/health/health-care-professionals-information/caring-older-patients-cognitive-impairment',
    sourceNote: 'Existing WeLearn scenario with partial candidate-source coverage. The source supports ordinary reminders and daily-function aids, not all five fictional studies or their exact findings.',
  },
  {
    sourceTitle: 'US DOT Federal Transit Administration — research and innovation',
    sourceUrl: 'https://www.transit.dot.gov/research-innovation',
    sourceNote: 'Existing WeLearn composite scenario. The institutional source provides transport-policy context; it does not verify the fictional city names or every reported result.',
  },
] as const;

const EXISTING_ERROR_CODES: MatchingFeaturesErrorCode[][] = [
  ['shared-topic', 'qualifier-loss', 'nearby-name', 'wrong-result', 'shared-topic', 'wrong-actor', 'wrong-result'],
  ['nearby-name', 'wrong-actor', 'relationship-reversal', 'wrong-result', 'shared-topic', 'nearby-name'],
  ['wrong-result', 'qualifier-loss', 'wrong-actor', 'relationship-reversal', 'nearby-name', 'shared-topic'],
];

function enrichExistingPassage(passage: MatchingFeaturesPassage, passageIndex: number): MatchingFeaturesTrainingPassage {
  const boundary = EXISTING_SOURCE_BOUNDARIES[passageIndex];
  return {
    ...passage,
    ...boundary,
    questions: passage.questions.map((question, questionIndex) => {
      const closestDistractor = passage.features.find((feature) => feature.id !== question.answer) ?? passage.features[0];
      return {
        ...question,
        evidence: question.explanation,
        closestDistractorId: closestDistractor.id,
        distractorFailure: question.trap,
        errorCode: EXISTING_ERROR_CODES[passageIndex][questionIndex],
      };
    }),
  };
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
  config: Omit<MatchingFeaturesTrainingPassage, 'passage' | 'sourceTitle' | 'sourceUrl' | 'sourceNote'>,
): MatchingFeaturesTrainingPassage {
  return {
    ...config,
    passage: passageText(source),
    sourceTitle: source.sourceTitle,
    sourceUrl: source.sourceUrl,
    sourceNote: `${source.sourceNote} This Matching Features adaptation reuses that reviewed text and does not add a new factual-verification claim.`,
  };
}

const cooling = sourcePassage('cooling-city-blocks');
const sleep = sourcePassage('sleep-builds-memory');
const citizen = sourcePassage('citizens-do-science');

const DERIVED_PASSAGES: MatchingFeaturesTrainingPassage[] = [
  derivedPassage(cooling, {
    id: 'mf-city-cooling-approaches',
    title: 'City-cooling approaches',
    instructions: 'Match each statement with the approach it describes. Some approaches may not be used.',
    passageTitle: cooling.title,
    features: [
      { id: 'A', label: 'Built-surface diagnosis', description: 'Explaining why developed areas retain more heat.' },
      { id: 'B', label: 'Trees and vegetation', description: 'Cooling through shade and evapotranspiration.' },
      { id: 'C', label: 'Cool roofs', description: 'Changing a roof surface where planting space is scarce.' },
      { id: 'D', label: 'Heat mapping', description: 'Locating exposure and missing shade before investment.' },
      { id: 'E', label: 'Local intervention portfolios', description: 'Combining measures around space, cost and maintenance.' },
    ],
    questions: [
      {
        id: 'mf-cooling-01', statement: 'provides cooling through both shade and the release of water', answer: 'B',
        explanation: 'Trees shade surfaces and release water through evapotranspiration.', trap: 'The roof option changes heat absorption but does not provide both mechanisms.',
        evidence: '“Their leaves shade walls and pavements” and plants “release water through evapotranspiration”.', closestDistractorId: 'C', distractorFailure: 'Cool roofs alter reflection and heat release, not shade plus water release.', errorCode: 'shared-topic',
      },
      {
        id: 'mf-cooling-02', statement: 'can modify an existing property without reconstructing the whole building', answer: 'C',
        explanation: 'The cool-roof section explicitly describes changing a roof surface without rebuilding the property.', trap: 'A local portfolio may include roofs, but it is a planning strategy rather than this specific building intervention.',
        evidence: '“This can reduce roof and indoor temperatures without rebuilding the entire property.”', closestDistractorId: 'E', distractorFailure: 'The portfolio is the combination decision, not the property-level method.', errorCode: 'wrong-actor',
      },
      {
        id: 'mf-cooling-03', statement: 'is used to identify where exposure and missing shade occur together', answer: 'D',
        explanation: 'The mapping approach overlaps heat exposure, canopy and building data before investment.', trap: 'Built-surface diagnosis explains the cause; it does not locate priority blocks.',
        evidence: '“Planners need to know where heat exposure and missing shade overlap.”', closestDistractorId: 'A', distractorFailure: 'The diagnosis describes uneven warming but not the decision tool.', errorCode: 'wrong-result',
      },
      {
        id: 'mf-cooling-04', statement: 'selects several methods according to local capacity rather than seeking one universal answer', answer: 'E',
        explanation: 'The portfolio approach combines methods according to space, budget and maintenance capacity.', trap: 'Heat mapping informs the choice, but the statement describes the resulting combination.',
        evidence: '“A practical heat plan therefore combines methods according to local space, budget and maintenance capacity.”', closestDistractorId: 'D', distractorFailure: 'Mapping diagnoses need; it is not the combined response.', errorCode: 'relationship-reversal',
      },
    ],
  }),
  derivedPassage(sleep, {
    id: 'mf-memory-processes',
    title: 'Memory processes during sleep',
    instructions: 'Match each finding with the stage or process it describes. Some options may not be used.',
    passageTitle: sleep.title,
    features: [
      { id: 'A', label: 'Active sleep processing', description: 'The general correction that sleep is not an empty interval.' },
      { id: 'B', label: 'Pre-learning readiness', description: 'Rest supporting attention and initial encoding.' },
      { id: 'C', label: 'Post-learning consolidation', description: 'Reactivation and stabilisation of new material.' },
      { id: 'D', label: 'Interference control', description: 'Separating activation of older and newer memories.' },
      { id: 'E', label: 'Broader sleep-loss effects', description: 'Consequences beyond later recall.' },
    ],
    questions: [
      {
        id: 'mf-sleep-01', statement: 'affects the brain before new information is first encoded', answer: 'B',
        explanation: 'Pre-learning rest supports attention and the initial formation of memories.', trap: 'Consolidation happens after a memory has already formed.', evidence: '“Sleep before a lesson matters” because the brain must be ready “to encode new material”.',
        closestDistractorId: 'C', distractorFailure: 'Consolidation strengthens material after learning.', errorCode: 'relationship-reversal',
      },
      {
        id: 'mf-sleep-02', statement: 'reactivates and stabilises information after it has been encountered', answer: 'C',
        explanation: 'Post-learning consolidation reorganises and stabilises new memories.', trap: 'Active sleep processing is the broad category; the statement asks for this specific function.', evidence: '“Newly formed memories are reactivated and stabilised.”',
        closestDistractorId: 'A', distractorFailure: 'Active processing is too broad to identify the stated result.', errorCode: 'shared-topic',
      },
      {
        id: 'mf-sleep-03', statement: 'may prevent newer experience from overwriting earlier learning', answer: 'D',
        explanation: 'Interference control separates newer and older activation at different moments.', trap: 'General consolidation strengthens memory but does not specify separation of old and new.', evidence: 'The separation could prevent “yesterday’s learning from being overwritten by today’s experience”.',
        closestDistractorId: 'C', distractorFailure: 'The statement concerns protection between memories, not stabilisation alone.', errorCode: 'qualifier-loss',
      },
      {
        id: 'mf-sleep-04', statement: 'includes weaker judgement and information processing as well as memory problems', answer: 'E',
        explanation: 'The final section broadens sleep-loss effects to attention, judgement and processing.', trap: 'Pre-learning readiness includes attention but not this full set of consequences.', evidence: 'Insufficient sleep can weaken “attention, judgement and the ability to process information as well as later recall”.',
        closestDistractorId: 'B', distractorFailure: 'Readiness is one timing relationship, not the broader effect profile.', errorCode: 'wrong-result',
      },
    ],
  }),
  derivedPassage(citizen, {
    id: 'mf-citizen-science-models',
    title: 'Citizen-science participation models',
    instructions: 'Match each statement with the project feature it describes. Some options may not be used.',
    passageTitle: citizen.title,
    features: [
      { id: 'A', label: 'Distributed participation', description: 'Many modest reports creating research scale.' },
      { id: 'B', label: 'Flexible participation tools', description: 'Different devices and entry requirements.' },
      { id: 'C', label: 'Quality-control protocols', description: 'Instructions, categories and repeated checks.' },
      { id: 'D', label: 'Human–software collaboration', description: 'Complementary judgement and automated search.' },
      { id: 'E', label: 'Wider participant outcomes', description: 'Research output plus learning and co-authorship.' },
    ],
    questions: [
      {
        id: 'mf-citizen-01', statement: 'makes observations from a large volunteer group comparable', answer: 'C',
        explanation: 'Quality-control protocols provide shared instructions, examples and fixed categories.', trap: 'Distributed participation creates scale, but it does not by itself create comparability.', evidence: 'Projects provide “instructions, examples and fixed reporting categories”.',
        closestDistractorId: 'A', distractorFailure: 'Scale is the input; common protocols are the quality mechanism.', errorCode: 'wrong-result',
      },
      {
        id: 'mf-citizen-02', statement: 'uses people to verify suggestions or label examples for later automated searches', answer: 'D',
        explanation: 'Human–software collaboration gives volunteers and algorithms complementary roles.', trap: 'The tools option concerns devices used to participate, not the relationship with algorithms.', evidence: 'Volunteers can “verify an algorithm’s suggestions or label examples that improve later automated searches”.',
        closestDistractorId: 'B', distractorFailure: 'Participation tools are laptops or phones, not the human–software workflow.', errorCode: 'nearby-name',
      },
      {
        id: 'mf-citizen-03', statement: 'can produce publications while also developing volunteers’ observation skills', answer: 'E',
        explanation: 'Wider outcomes include co-authorship and better understanding of scientific testing.', trap: 'Distributed participation helps research capacity but does not contain both stated participant outcomes.', evidence: 'Volunteers have become co-authors, and participation can build observation skills.',
        closestDistractorId: 'A', distractorFailure: 'The statement evaluates outcomes, not the scale mechanism.', errorCode: 'qualifier-loss',
      },
    ],
  }),
];

export const MATCHING_FEATURES_PASSAGES: MatchingFeaturesTrainingPassage[] = [
  ...IELTS_MATCHING_FEATURES_PASSAGES.map(enrichExistingPassage),
  ...DERIVED_PASSAGES,
];

export const MATCHING_FEATURES_GUIDED_PASSAGE_ID = 'mf-urban-farming';
export const MATCHING_FEATURES_INDEPENDENT_PASSAGE_ID = 'mf-memory-research';

export const MATCHING_FEATURES_LEVELS: MatchingFeaturesLevel[] = [
  {
    id: 'actor-signals', title: 'Actor-signal control', focus: 'Who or what performs the action',
    instruction: 'Match the action or outcome to its exact feature; ignore a nearby name that lacks the relationship.',
    passageIds: ['mf-transport-policies', 'mf-city-cooling-approaches', 'mf-memory-processes', 'mf-citizen-science-models'],
    questionIds: ['mf-transport-01', 'mf-cooling-02', 'mf-sleep-01', 'mf-citizen-02'], masteryScore: 3,
  },
  {
    id: 'relationship-signals', title: 'Relationship control', focus: 'Action, result and limitation',
    instruction: 'Confirm the complete association, including timing, cause, limitation or stated result.',
    passageIds: ['mf-transport-policies', 'mf-city-cooling-approaches', 'mf-memory-processes', 'mf-citizen-science-models'],
    questionIds: ['mf-transport-03', 'mf-cooling-04', 'mf-sleep-03', 'mf-citizen-01'], masteryScore: 3,
  },
  {
    id: 'transport-map', title: 'Transport-policy map', focus: 'Full set · six statements',
    instruction: 'Map all six statements before feedback opens. A feature may be used more than once.',
    passageIds: ['mf-transport-policies'], masteryScore: 5,
  },
  {
    id: 'cooling-map', title: 'City-cooling map', focus: 'Full set · four statements',
    instruction: 'Separate the intervention, diagnostic tool and planning strategy before submission.',
    passageIds: ['mf-city-cooling-approaches'], masteryScore: 3,
  },
  {
    id: 'sleep-map', title: 'Sleep-process map', focus: 'Full set · four statements',
    instruction: 'Track whether each claim occurs before, after or between memories.',
    passageIds: ['mf-memory-processes'], masteryScore: 3,
  },
  {
    id: 'citizen-map', title: 'Citizen-science map', focus: 'Full set · three statements',
    instruction: 'Distinguish participation scale, quality control, collaboration and wider outcomes.',
    passageIds: ['mf-citizen-science-models'], masteryScore: 3,
  },
];

export function getMatchingFeaturesPassage(id: string) {
  return MATCHING_FEATURES_PASSAGES.find((passage) => passage.id === id);
}

function hashSeed(value: string) {
  let hash = 2166136261;
  for (const character of value) {
    hash ^= character.codePointAt(0) ?? 0;
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function getMatchingFeaturesDrillFeatureIds(
  passage: MatchingFeaturesTrainingPassage,
  question: MatchingFeaturesTrainingQuestion,
  attemptSeed: number,
) {
  const featureIds = [question.answer, question.closestDistractorId];
  for (const feature of passage.features) {
    if (!featureIds.includes(feature.id)) featureIds.push(feature.id);
    if (featureIds.length === 4) break;
  }
  let seed = hashSeed(`${question.id}:${Math.max(0, Math.trunc(attemptSeed))}`);
  const shuffled = featureIds.slice();
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const target = seed % (index + 1);
    [shuffled[index], shuffled[target]] = [shuffled[target], shuffled[index]];
  }
  return shuffled;
}
