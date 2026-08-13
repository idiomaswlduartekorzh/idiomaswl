import { MATCHING_HEADINGS_PASSAGES } from './ielts-reading-matching-headings-progress.ts';
import {
  IELTS_MATCHING_INFORMATION_PASSAGES,
  type MatchingInformationPassage,
} from './seo-catalog.ts';

export type MatchingInformationErrorCode =
  | 'broad-topic-match'
  | 'entity-confusion'
  | 'ignored-qualifier'
  | 'lexical-echo'
  | 'relationship-mismatch'
  | 'wrong-detail';

export type MatchingInformationTrainingQuestion = MatchingInformationPassage['questions'][number] & {
  searchSignal: string;
  errorCode: MatchingInformationErrorCode;
};

export type MatchingInformationTrainingPassage = Omit<MatchingInformationPassage, 'questions'> & {
  sourceTitle: string;
  sourceUrl: string;
  sourceNote: string;
  questions: MatchingInformationTrainingQuestion[];
};

export type MatchingInformationLevel = {
  id: string;
  title: string;
  focus: string;
  instruction: string;
  passageIds: string[];
  questionIds?: string[];
  masteryScore: number;
};

const LEGACY_QUESTION_META: Record<string, Pick<MatchingInformationTrainingQuestion, 'searchSignal' | 'errorCode'>> = {
  'mi-noise-01': { searchSignal: 'fewer vehicles but unexpectedly high noise', errorCode: 'wrong-detail' },
  'mi-noise-02': { searchSignal: 'measures that reduce sound at its source', errorCode: 'lexical-echo' },
  'mi-noise-03': { searchSignal: 'unequal exposure between social groups', errorCode: 'broad-topic-match' },
  'mi-noise-04': { searchSignal: 'a list of activities producing urban noise', errorCode: 'wrong-detail' },
  'mi-noise-05': { searchSignal: 'benefits that residents may not notice', errorCode: 'relationship-mismatch' },
  'mi-noise-06': { searchSignal: 'several datasets combined to find exposure', errorCode: 'entity-confusion' },
  'mi-lighting-01': { searchSignal: 'materials damaged by too much light', errorCode: 'wrong-detail' },
  'mi-lighting-02': { searchSignal: 'temporary display caused by sensitivity', errorCode: 'relationship-mismatch' },
  'mi-lighting-03': { searchSignal: 'brightness responding to visitor presence', errorCode: 'entity-confusion' },
  'mi-lighting-04': { searchSignal: 'light influencing movement through a gallery', errorCode: 'broad-topic-match' },
  'mi-lighting-05': { searchSignal: 'no universal solution across exhibitions', errorCode: 'ignored-qualifier' },
  'mi-lighting-06': { searchSignal: 'contrast creating a route-safety risk', errorCode: 'lexical-echo' },
  'mi-wetlands-01': { searchSignal: 'an earlier belief that encouraged wetland loss', errorCode: 'wrong-detail' },
  'mi-wetlands-02': { searchSignal: 'site repair required before planting', errorCode: 'relationship-mismatch' },
  'mi-wetlands-03': { searchSignal: 'stakeholders interpreting one project differently', errorCode: 'entity-confusion' },
  'mi-wetlands-04': { searchSignal: 'small indicators used to monitor recovery', errorCode: 'wrong-detail' },
  'mi-wetlands-05': { searchSignal: 'restoration combined with other protection', errorCode: 'ignored-qualifier' },
  'mi-wetlands-06': { searchSignal: 'correct water movement as a condition for success', errorCode: 'lexical-echo' },
};

const LEGACY_SOURCES: Record<string, Pick<MatchingInformationTrainingPassage, 'sourceTitle' | 'sourceUrl' | 'sourceNote'>> = {
  'mi-city-noise': {
    sourceTitle: 'WHO — Environmental noise and health',
    sourceUrl: 'https://www.who.int/tools/compendium-on-health-and-environment/environmental-noise',
    sourceNote: 'Existing WeLearn passage with partial candidate-source coverage. The source supports environmental-noise context, not every municipal example or causal detail.',
  },
  'mi-museum-lighting': {
    sourceTitle: 'Canadian Conservation Institute — Light deterioration',
    sourceUrl: 'https://www.canada.ca/en/conservation-institute/services/agents-deterioration/light.html',
    sourceNote: 'Existing WeLearn passage with partial candidate-source coverage for cumulative light damage and material sensitivity; it is not a universal exhibition-design formula.',
  },
  'mi-coastal-restoration': {
    sourceTitle: 'NOAA Fisheries — Coastal resiliency',
    sourceUrl: 'https://www.fisheries.noaa.gov/news/coastal-resiliency',
    sourceNote: 'Existing WeLearn passage with partial candidate-source coverage for habitat, hydrology and resilience. Some historical and community details remain unverified.',
  },
};

const legacyPassages: MatchingInformationTrainingPassage[] = IELTS_MATCHING_INFORMATION_PASSAGES.map((passage) => ({
  ...passage,
  ...LEGACY_SOURCES[passage.id],
  questions: passage.questions.map((question) => ({
    ...question,
    ...LEGACY_QUESTION_META[question.id],
  })),
}));

function sourcePassage(id: string) {
  const passage = MATCHING_HEADINGS_PASSAGES.find((item) => item.id === id);
  if (!passage) throw new Error(`Missing source-backed passage: ${id}`);
  return passage;
}

function derivedPassage(
  id: string,
  sourceId: string,
  questions: MatchingInformationTrainingQuestion[],
): MatchingInformationTrainingPassage {
  const source = sourcePassage(sourceId);
  return {
    id,
    title: source.title,
    instructions: 'Match each statement with the paragraph that contains the specific information. A paragraph may be used more than once.',
    paragraphs: source.paragraphs.map((paragraph, index) => ({
      id: String.fromCharCode(65 + index),
      label: `Paragraph ${String.fromCharCode(65 + index)}`,
      text: paragraph.text,
    })),
    sourceTitle: source.sourceTitle,
    sourceUrl: source.sourceUrl,
    sourceNote: `${source.sourceNote} Reused here to train detail location; this does not add a new factual-verification claim.`,
    questions,
  };
}

const transferPassages: MatchingInformationTrainingPassage[] = [
  derivedPassage('mi-urban-heat', 'cooling-city-blocks', [
    {
      id: 'mi-heat-01', statement: 'why temperatures can differ between neighbourhoods in the same city', answer: 'A', searchSignal: 'a cause of temperature differences within one city', errorCode: 'broad-topic-match',
      explanation: 'Paragraph A connects heat absorption and slower release from developed surfaces with temperature differences inside the same city.',
      trap: 'Several paragraphs discuss cooling, but only A explains why the original difference occurs.',
    },
    {
      id: 'mi-heat-02', statement: 'two processes through which plants cool an urban street', answer: 'B', searchSignal: 'two separate cooling mechanisms from vegetation', errorCode: 'wrong-detail',
      explanation: 'Paragraph B identifies shade and evapotranspiration as two connected cooling processes.',
      trap: 'Do not choose a paragraph simply because it mentions trees; confirm that both processes are present.',
    },
    {
      id: 'mi-heat-03', statement: 'a change to one part of a property that avoids rebuilding the whole structure', answer: 'C', searchSignal: 'one targeted property change instead of reconstruction', errorCode: 'relationship-mismatch',
      explanation: 'Paragraph C describes changing the roof surface to reduce heat without rebuilding the entire property.',
      trap: 'The answer is the paragraph that links a roof intervention with avoiding full reconstruction.',
    },
    {
      id: 'mi-heat-04', statement: 'information planners collect before deciding where to invest', answer: 'D', searchSignal: 'data gathered before investment decisions', errorCode: 'ignored-qualifier',
      explanation: 'Paragraph D describes canopy, surface and building data used before money is spent.',
      trap: 'Paragraph E discusses choosing a mix of methods, but D contains the diagnostic step before investment.',
    },
  ]),
  derivedPassage('mi-sleep-memory', 'sleep-builds-memory', [
    {
      id: 'mi-sleep-01', statement: 'why rest before a lesson affects the first formation of memories', answer: 'B', searchSignal: 'sleep before learning and initial encoding', errorCode: 'relationship-mismatch',
      explanation: 'Paragraph B links adequate rest before a lesson with attention and encoding new material.',
      trap: 'Paragraph C concerns sleep after learning. Preserve the before-versus-after relationship.',
    },
    {
      id: 'mi-sleep-02', statement: 'what happens to newly formed memories after learning', answer: 'C', searchSignal: 'new memories reactivated and stabilised', errorCode: 'lexical-echo',
      explanation: 'Paragraph C says new memories are reactivated, stabilised and linked with older knowledge.',
      trap: 'The word learning appears elsewhere; locate the paragraph describing what happens after a memory already exists.',
    },
    {
      id: 'mi-sleep-03', statement: 'a proposed way the brain reduces interference between old and new information', answer: 'D', searchSignal: 'separate activation preventing interference', errorCode: 'wrong-detail',
      explanation: 'Paragraph D proposes that newer and older information may be reactivated at separate moments.',
      trap: 'General brain activity during sleep is too broad; the required detail is separation between old and new memories.',
    },
    {
      id: 'mi-sleep-04', statement: 'abilities other than recall that can be weakened by insufficient sleep', answer: 'E', searchSignal: 'consequences beyond memory recall', errorCode: 'ignored-qualifier',
      explanation: 'Paragraph E adds attention, judgement and information processing to later recall.',
      trap: 'The statement asks for effects beyond recall, so a paragraph focused only on memory consolidation is incomplete.',
    },
  ]),
  derivedPassage('mi-citizen-science', 'citizens-do-science', [
    {
      id: 'mi-citizen-01', statement: 'why a large number of small public contributions can help research', answer: 'A', searchSignal: 'many modest reports creating research scale', errorCode: 'ignored-qualifier',
      explanation: 'Paragraph A contrasts one modest report with thousands that reveal wide patterns or inspect large archives.',
      trap: 'Participant benefits appear later; this statement asks how distributed contributions expand research capacity.',
    },
    {
      id: 'mi-citizen-02', statement: 'examples of different tools and entry requirements for volunteers', answer: 'B', searchSignal: 'different devices and experience levels', errorCode: 'entity-confusion',
      explanation: 'Paragraph B compares laptops, phones, telescopes and tasks designed for beginners or specialists.',
      trap: 'Paragraph D also mentions technology, but it explains collaboration with algorithms rather than participation tools.',
    },
    {
      id: 'mi-citizen-03', statement: 'methods used to make observations from many people comparable', answer: 'C', searchSignal: 'quality controls for comparable volunteer data', errorCode: 'broad-topic-match',
      explanation: 'Paragraph C lists instructions, examples, fixed categories, repeated checks and review flags.',
      trap: 'Scale alone does not answer the statement. Find the paragraph about consistency and checking.',
    },
    {
      id: 'mi-citizen-04', statement: 'a division of work between human judgement and computer processing', answer: 'D', searchSignal: 'complementary human and software roles', errorCode: 'relationship-mismatch',
      explanation: 'Paragraph D explains that computers scan quickly while people identify or verify subtle patterns.',
      trap: 'The relationship is cooperation, not a competition between volunteers and algorithms.',
    },
  ]),
];

export const MATCHING_INFORMATION_PASSAGES: MatchingInformationTrainingPassage[] = [
  ...legacyPassages,
  ...transferPassages,
];

export const MATCHING_INFORMATION_GUIDED_PASSAGE_ID = 'mi-city-noise';
export const MATCHING_INFORMATION_INDEPENDENT_PASSAGE_ID = 'mi-museum-lighting';
export const MATCHING_INFORMATION_STORAGE_KEY = 'welearn:ielts-reading:matching-information:v2';
export const MATCHING_INFORMATION_LEGACY_STORAGE_KEY = 'welearn:ielts-reading:matching-information:v1';

export const MATCHING_INFORMATION_LEVELS: MatchingInformationLevel[] = [
  {
    id: 'mi-level-search-signals',
    title: 'Search-signal control',
    focus: 'distinctive anchors',
    instruction: 'Commit to the paragraph that contains the full detail, not merely the same topic.',
    passageIds: ['mi-coastal-restoration', 'mi-urban-heat', 'mi-sleep-memory', 'mi-citizen-science'],
    questionIds: ['mi-wetlands-02', 'mi-heat-04', 'mi-sleep-01', 'mi-citizen-03'],
    masteryScore: 3,
  },
  {
    id: 'mi-level-relationship-control',
    title: 'Relationship control',
    focus: 'entity, cause and qualification',
    instruction: 'Confirm the entity and relationship on both sides of the candidate evidence before choosing a letter.',
    passageIds: ['mi-coastal-restoration', 'mi-urban-heat', 'mi-sleep-memory', 'mi-citizen-science'],
    questionIds: ['mi-wetlands-03', 'mi-heat-03', 'mi-sleep-03', 'mi-citizen-04'],
    masteryScore: 3,
  },
  {
    id: 'mi-level-wetlands', title: 'Wetland restoration map', focus: 'complete-passage transfer', instruction: 'Locate all six details. A paragraph may be used more than once.', passageIds: ['mi-coastal-restoration'], masteryScore: 5,
  },
  {
    id: 'mi-level-heat', title: 'Urban heat map', focus: 'complete-passage transfer', instruction: 'Map all four statements while preserving cause, sequence and scope.', passageIds: ['mi-urban-heat'], masteryScore: 3,
  },
  {
    id: 'mi-level-sleep', title: 'Sleep and memory map', focus: 'complete-passage transfer', instruction: 'Use timing relationships to separate closely related paragraphs.', passageIds: ['mi-sleep-memory'], masteryScore: 3,
  },
  {
    id: 'mi-level-citizen-science', title: 'Citizen science map', focus: 'complete-passage transfer', instruction: 'Locate the exact function of each detail without following technology keywords.', passageIds: ['mi-citizen-science'], masteryScore: 3,
  },
];

export function getMatchingInformationPassage(id: string) {
  return MATCHING_INFORMATION_PASSAGES.find((passage) => passage.id === id);
}

function stableNumber(value: string) {
  let result = 2166136261;
  for (const character of value) {
    result ^= character.charCodeAt(0);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

export function getMatchingInformationDrillParagraphIds(
  passage: MatchingInformationTrainingPassage,
  question: MatchingInformationTrainingQuestion,
  attemptSeed: number,
) {
  return passage.paragraphs
    .map((paragraph) => paragraph.id)
    .toSorted((a, b) => stableNumber(`${question.id}:${attemptSeed}:${a}`) - stableNumber(`${question.id}:${attemptSeed}:${b}`));
}
