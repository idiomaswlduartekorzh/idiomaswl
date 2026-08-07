import { ESSAY_TYPES } from '../introduccion/introduction-data';

export type PromptMap = {
  topic: string;
  instruction: string;
  scope: string;
  position: string;
  bodyRoute: string[];
  checklist: string[];
};

/**
 * El tema sale del propio ejemplo, no de una tabla aparte.
 *
 * Antes había un `TOPICS: Record<EssayTypeId, string[]>` y el tema se buscaba por POSICIÓN:
 * `TOPICS[lesson.id][index]`. Dos listas separadas que hay que mantener en el mismo orden a
 * mano, y que se habían desincronizado: 10 de los 25 ejercicios mostraban el tema de otro.
 * El de «prison sentences» anunciaba international tourism, el de «museums» anunciaba prison
 * policy y el de «team sports» anunciaba online learning. El estudiante leía un enunciado
 * sobre cárceles y arriba le decía que el tema era turismo.
 *
 * El dato correcto ya estaba en el ejemplo desde el principio —`title` dice «Prison or
 * rehabilitation», «Museums», «Team or individual sport»—, así que la corrección no es
 * volver a alinear las dos listas: es que no haya dos listas. Con el tema colgando del
 * ejemplo, no existe orden que se pueda romper.
 */
const toTopic = (title: string) => title.charAt(0).toLowerCase() + title.slice(1);

/** Identificador estable e irrepetible: de él cuelgan enunciado, modelo y feedback. */
const toId = (essayType: string, title: string) =>
  `${essayType}--${title.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/gu, '').replace(/[^a-z0-9]+/gu, '-').replace(/^-|-$/gu, '')}`;

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
  examples: lesson.examples.map((example) => ({
    ...example,
    id: toId(lesson.id, example.title),
    essayType: lesson.id,
    map: {
      topic: toTopic(example.title),
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
