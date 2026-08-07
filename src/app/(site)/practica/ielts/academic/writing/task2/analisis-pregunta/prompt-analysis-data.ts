import { ESSAY_TYPES, type EssayTypeId } from '../introduccion/introduction-data';

export type PromptMap = {
  topic: string;
  instruction: string;
  scope: string;
  position: string;
  bodyRoute: string[];
  checklist: string[];
};

const TOPICS: Record<EssayTypeId, string[]> = {
  opinion: ['academic pressure', 'free public transport', 'university access', 'remote work', 'advertising to children'],
  discussion: ['children and smartphones', 'city investment', 'online learning', 'prison policy', 'international tourism'],
  'problem-solution': ['urban congestion', 'food waste', 'graduate unemployment', 'water scarcity', 'declining physical activity'],
  'advantages-disadvantages': ['cashless payments', 'international study', 'automation', 'tourism growth', 'online shopping'],
  'direct-questions': ['longer life expectancy', 'career changes', 'news avoidance', 'urban migration', 'language loss'],
};

function getBodyRoute(plan: string, fallback: [string, string]): [string, string] {
  const bodyOnePrefix = 'Body 1: ';
  const bodyTwoPrefix = ' Body 2: ';
  const bodyTwoIndex = plan.indexOf(bodyTwoPrefix);

  if (!plan.startsWith(bodyOnePrefix) || bodyTwoIndex === -1) return fallback;

  return [
    plan.slice(bodyOnePrefix.length, bodyTwoIndex),
    plan.slice(bodyTwoIndex + bodyTwoPrefix.length),
  ];
}

export const PROMPT_ANALYSIS_LESSONS = ESSAY_TYPES.map((lesson) => ({
  ...lesson,
  examples: lesson.examples.map((example, index) => ({
    ...example,
    map: {
      topic: TOPICS[lesson.id][index],
      instruction: lesson.signal,
      scope: example.instruction,
      position: example.blocks.find((block) => block.label === 'Position')?.text ?? lesson.position,
      bodyRoute: getBodyRoute(example.plan, [lesson.bodyOne, lesson.bodyTwo]),
      checklist: [lesson.mustAnswer, `Body 1: ${lesson.bodyOne}`, `Body 2: ${lesson.bodyTwo}`, `Conclusion: ${lesson.conclusion}`],
    } satisfies PromptMap,
  })),
}));

export type PromptAnalysisExample = (typeof PROMPT_ANALYSIS_LESSONS)[number]['examples'][number];

export const ANALYSIS_BLOCKS = [
  { label: 'Topic', tone: 'prompt', text: 'What issue or situation is being discussed?' },
  { label: 'Instruction', tone: 'claim', text: 'What must the writer do: evaluate, discuss, solve, compare or answer?' },
  { label: 'Scope', tone: 'contrast', text: 'Which people, places, time limits, causes or parts must remain inside the answer?' },
  { label: 'Position', tone: 'development', text: 'Is a personal judgement required, optional or inappropriate?' },
  { label: 'Body route', tone: 'link', text: 'What distinct job will Body 1 and Body 2 perform?' },
] as const;
