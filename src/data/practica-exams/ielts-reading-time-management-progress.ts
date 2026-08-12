import {
  MATCHING_HEADINGS_PASSAGES,
  type MatchingHeadingsTrainingPassage,
} from './ielts-reading-matching-headings-progress.ts';

export type TimeManagementErrorCode =
  | 'over-investment'
  | 'restart-search'
  | 'evidence-abandonment'
  | 'unsupported-rush'
  | 'review-mispriority'
  | 'equal-time-fallacy';

export type TimeManagementDecision = {
  id: string;
  paragraphId: string;
  checkpointMinute: number;
  secondsOnItem: number;
  questionType: string;
  prompt: string;
  evidenceState: string;
  answer: string;
  distractors: [string, string];
  explanation: string;
  trap: string;
  errorCode: TimeManagementErrorCode;
};

export type TimeManagementTrainingPassage = MatchingHeadingsTrainingPassage & {
  decisions: TimeManagementDecision[];
};

export type TimeManagementLevel = {
  id: string;
  title: string;
  focus: string;
  instruction: string;
  passageIds: string[];
  decisionIds?: string[];
  masteryScore: number;
};

export const TIME_MANAGEMENT_STORAGE_KEY = 'welearn:ielts-reading:time-management:v2';
export const TIME_MANAGEMENT_LEGACY_STORAGE_KEY = 'welearn:ielts-reading:time-management:v1';
export const TIME_MANAGEMENT_GUIDED_PASSAGE_ID = 'cooling-city-blocks';
export const TIME_MANAGEMENT_INDEPENDENT_PASSAGE_ID = 'mangroves-after-storms';

const ACTIONS = {
  solve: 'Solve now with a bounded local evidence check.',
  mark: 'Save the evidence zone and unresolved distinction, answer provisionally, then return.',
  postpone: 'Postpone the zero-evidence search and move to a question with a visible anchor.',
  compare: 'Use a bounded whole-paragraph comparison now; mark it only if the limit expires.',
  review: 'Return first to the marked item that already has an evidence zone.',
} as const;

function buildDecisions(passage: MatchingHeadingsTrainingPassage): TimeManagementDecision[] {
  const [a, b, c, d, e] = passage.paragraphs;
  return [
    {
      id: `${passage.id}-time-a`, paragraphId: a.id, checkpointMinute: 3, secondsOnItem: 15,
      questionType: 'Matching Information',
      prompt: `The passage map identifies ${a.label} as “${a.functionLabel.toLowerCase()}”. A question asks where that function is developed.`,
      evidenceState: `The likely paragraph is already located and its opening matches the question purpose.`,
      answer: ACTIONS.solve,
      distractors: [ACTIONS.mark, 'Restart at Paragraph A and reread every line before deciding.'],
      explanation: 'A mapped paragraph and matching function make this a low-search-cost point. Verify locally and bank it.',
      trap: 'Restarting the passage discards useful mapping work and treats a local task like an open search.',
      errorCode: 'restart-search',
    },
    {
      id: `${passage.id}-time-b`, paragraphId: b.id, checkpointMinute: 7, secondsOnItem: 75,
      questionType: 'True / False / Not Given',
      prompt: `You found the relevant sentence in ${b.label}, but after 75 seconds you still cannot separate contradiction from missing information.`,
      evidenceState: `Evidence located; one precise distinction remains unresolved.`,
      answer: ACTIONS.mark,
      distractors: ['Stay on the item until certainty is complete, regardless of elapsed time.', ACTIONS.postpone],
      explanation: 'Preserve the paragraph and the unresolved distinction. Returning to a saved comparison is cheaper than searching again.',
      trap: 'Unlimited certainty can consume the time needed for several answerable questions.',
      errorCode: passage.id === 'citizens-do-science' ? 'evidence-abandonment' : 'over-investment',
    },
    {
      id: `${passage.id}-time-c`, paragraphId: c.id, checkpointMinute: 10, secondsOnItem: 40,
      questionType: 'Multiple Choice',
      prompt: `One option sounds plausible, but a 40-second search has not produced a paragraph, sentence or paraphrase that supports it.`,
      evidenceState: `No evidence zone; only outside plausibility.`,
      answer: ACTIONS.postpone,
      distractors: ['Select the plausible option immediately because it fits the topic.', 'Restart the full passage and keep searching until the option appears.'],
      explanation: 'A zero-evidence search has low expected return. Move to an anchored question and revisit only if time remains.',
      trap: 'A fast unsupported guess is not efficient evidence use, and an unlimited restart compounds the loss.',
      errorCode: 'unsupported-rush',
    },
    {
      id: `${passage.id}-time-d`, paragraphId: d.id, checkpointMinute: 14, secondsOnItem: 25,
      questionType: 'Matching Headings',
      prompt: `Two headings remain for ${d.label}: one repeats a vivid detail; the other matches “${d.functionLabel.toLowerCase()}”.`,
      evidenceState: `Paragraph located; opening and closing function can be checked within a short cap.`,
      answer: ACTIONS.compare,
      distractors: ['Choose the heading with the most repeated vocabulary immediately.', 'Postpone every heading until the final minute.'],
      explanation: 'A bounded structure check is productive because the evidence zone and competing distinction are already known.',
      trap: 'Equal treatment of every heading ignores that this comparison is nearly resolved.',
      errorCode: 'equal-time-fallacy',
    },
    {
      id: `${passage.id}-time-e`, paragraphId: e.id, checkpointMinute: 18, secondsOnItem: 0,
      questionType: 'Final review',
      prompt: `Two minutes remain. One unanswered item points to ${e.label}; another item has no saved paragraph or anchor.`,
      evidenceState: `One evidence-rich return and one search from zero.`,
      answer: ACTIONS.review,
      distractors: ['Begin the completely new search first.', 'Reread the entire passage before choosing either item.'],
      explanation: 'The marked item has higher expected return because the expensive location step is already complete.',
      trap: 'Trying to rescue the most lost question first can sacrifice a point that is already close.',
      errorCode: 'review-mispriority',
    },
  ];
}

export const TIME_MANAGEMENT_PASSAGES: TimeManagementTrainingPassage[] = MATCHING_HEADINGS_PASSAGES.map((passage) => ({
  ...passage,
  decisions: buildDecisions(passage),
}));

export const TIME_MANAGEMENT_LEVELS: TimeManagementLevel[] = [
  { id: 'evidence-state', title: 'Read the evidence state', focus: 'Solve · mark · postpone', instruction: 'Choose the next move from search cost and evidence state, not from question-type anxiety.', passageIds: ['sleep-builds-memory', 'citizens-do-science', 'keeping-seeds-useful', 'night-trains-cross-borders'], decisionIds: ['sleep-builds-memory-time-a', 'citizens-do-science-time-b', 'keeping-seeds-useful-time-c', 'night-trains-cross-borders-time-e'], masteryScore: 3 },
  { id: 'time-cap', title: 'Use a productive time cap', focus: 'Preserve useful work', instruction: 'Move on without throwing away the paragraph, comparison or anchor you already found.', passageIds: ['sleep-builds-memory', 'citizens-do-science', 'keeping-seeds-useful', 'night-trains-cross-borders'], decisionIds: ['sleep-builds-memory-time-b', 'citizens-do-science-time-c', 'keeping-seeds-useful-time-d', 'night-trains-cross-borders-time-a'], masteryScore: 3 },
  { id: 'sleep', title: 'Full set · Sleep and memory', focus: '20-minute passage plan', instruction: 'Complete all five timing decisions before feedback opens.', passageIds: ['sleep-builds-memory'], masteryScore: 4 },
  { id: 'citizen', title: 'Full set · Citizen science', focus: 'Evidence-weighted triage', instruction: 'Protect points without turning the clock into a reason to guess blindly.', passageIds: ['citizens-do-science'], masteryScore: 4 },
  { id: 'seed', title: 'Paced set · Seed collections', focus: 'Target: six minutes', instruction: 'Use the timer as information while preserving evidence locations.', passageIds: ['keeping-seeds-useful'], masteryScore: 4 },
  { id: 'rail', title: 'Skill check · Night trains', focus: 'Controlled transfer', instruction: 'This measures pacing decisions, not an IELTS band or secure exam result.', passageIds: ['night-trains-cross-borders'], masteryScore: 4 },
];

export function getTimeManagementPassage(id: string) { return TIME_MANAGEMENT_PASSAGES.find((passage) => passage.id === id); }

function hashSeed(value: string) {
  let hash = 2166136261;
  for (const character of value) { hash ^= character.codePointAt(0) ?? 0; hash = Math.imul(hash, 16777619); }
  return hash >>> 0;
}

export function getTimeManagementOptions(decision: TimeManagementDecision, attemptSeed: number) {
  let seed = hashSeed(`time-management-v2:${decision.id}:${Math.max(0, Math.trunc(attemptSeed))}`);
  const result = [decision.answer, ...decision.distractors];
  for (let index = result.length - 1; index > 0; index -= 1) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const target = seed % (index + 1);
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
}
