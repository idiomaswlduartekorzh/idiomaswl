import {
  MATCHING_HEADINGS_PASSAGES,
  type MatchingHeadingsParagraph,
  type MatchingHeadingsTrainingPassage,
} from './ielts-reading-matching-headings-progress.ts';

export type SkimmingErrorCode =
  | 'detail-before-purpose'
  | 'topic-without-function'
  | 'direction-change-missed'
  | 'scope-too-narrow'
  | 'scope-too-broad';

export type SkimmingLevel = {
  id: string;
  title: string;
  focus: string;
  instruction: string;
  passageIds: string[];
  questionIds?: string[];
  masteryScore: number;
};

export const SKIMMING_STORAGE_KEY = 'welearn:ielts-reading:skimming:v2';
export const SKIMMING_LEGACY_STORAGE_KEY = 'welearn:ielts-reading:skimming:v1';
export const SKIMMING_GUIDED_PASSAGE_ID = 'cooling-city-blocks';
export const SKIMMING_INDEPENDENT_PASSAGE_ID = 'mangroves-after-storms';

export const SKIMMING_LEVELS: SkimmingLevel[] = [
  {
    id: 'paragraph-role',
    title: 'Name the paragraph job',
    focus: 'Function before detail',
    instruction: 'Use the opening, development and final sentence to compress each paragraph into one writer action.',
    passageIds: ['sleep-builds-memory', 'citizens-do-science', 'keeping-seeds-useful', 'night-trains-cross-borders'],
    questionIds: ['sleep-a', 'citizen-b', 'seed-c', 'rail-d'],
    masteryScore: 3,
  },
  {
    id: 'direction-change',
    title: 'Track the change of direction',
    focus: 'Contrast and conclusion',
    instruction: 'Notice qualification, contrast and evaluation. Do not label a paragraph from its first topic word alone.',
    passageIds: ['sleep-builds-memory', 'citizens-do-science', 'keeping-seeds-useful', 'night-trains-cross-borders'],
    questionIds: ['sleep-e', 'citizen-d', 'seed-d', 'rail-e'],
    masteryScore: 3,
  },
  {
    id: 'sleep-map',
    title: 'Full map · Sleep and memory',
    focus: 'Untimed passage',
    instruction: 'Map all five paragraph jobs before submitting. Feedback stays closed until the complete passage is mapped.',
    passageIds: ['sleep-builds-memory'],
    masteryScore: 4,
  },
  {
    id: 'citizen-map',
    title: 'Full map · Citizen science',
    focus: 'Independent transfer',
    instruction: 'Build a five-part passage map, then check whether every label describes the writer action rather than a local detail.',
    passageIds: ['citizens-do-science'],
    masteryScore: 4,
  },
  {
    id: 'seed-map',
    title: 'Paced map · Seed collections',
    focus: 'Target: six minutes',
    instruction: 'Work at a steady pace and preserve paragraph-purpose accuracy across the whole passage.',
    passageIds: ['keeping-seeds-useful'],
    masteryScore: 4,
  },
  {
    id: 'rail-map',
    title: 'Skill check · Night trains',
    focus: 'Unseen transfer',
    instruction: 'Complete the map independently. A 4/5 result records this WeLearn micro-skill only, not an IELTS band or readiness score.',
    passageIds: ['night-trains-cross-borders'],
    masteryScore: 4,
  },
];

export function getSkimmingPassage(id: string) {
  return MATCHING_HEADINGS_PASSAGES.find((passage) => passage.id === id);
}

export function getSkimmingParagraph(passage: MatchingHeadingsTrainingPassage, id: string) {
  return passage.paragraphs.find((paragraph) => paragraph.id === id);
}

function hashSeed(value: string) {
  let hash = 2166136261;
  for (const character of value) {
    hash ^= character.codePointAt(0) ?? 0;
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function shuffledIds(ids: string[], seedValue: string) {
  let seed = hashSeed(seedValue);
  const shuffled = ids.slice();
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const target = seed % (index + 1);
    [shuffled[index], shuffled[target]] = [shuffled[target], shuffled[index]];
  }
  return shuffled;
}

export function getSkimmingFunctionOptionIds(
  passage: MatchingHeadingsTrainingPassage,
  paragraph: MatchingHeadingsParagraph,
  attemptSeed: number,
  fullPassage = false,
) {
  const candidates = fullPassage
    ? passage.paragraphs.map((item) => item.id)
    : [paragraph.id, ...passage.paragraphs.filter((item) => item.id !== paragraph.id).slice(0, 3).map((item) => item.id)];
  return shuffledIds(candidates, `${paragraph.id}:${Math.max(0, Math.trunc(attemptSeed))}:${fullPassage ? 'full' : 'drill'}`);
}

export function getSkimmingErrorCode(paragraph: MatchingHeadingsParagraph): SkimmingErrorCode {
  if (paragraph.errorCode === 'keyword-match') return 'topic-without-function';
  if (paragraph.errorCode === 'wrong-paragraph-function') return 'detail-before-purpose';
  if (paragraph.errorCode === 'detail-not-main-idea') return 'scope-too-narrow';
  if (paragraph.errorCode === 'too-broad') return 'scope-too-broad';
  return 'direction-change-missed';
}
