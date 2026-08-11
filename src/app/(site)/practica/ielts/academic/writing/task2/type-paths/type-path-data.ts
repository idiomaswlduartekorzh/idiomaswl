import { ESSAY_TYPES, type EssayTypeId } from '../introduccion/introduction-data';
import { PROMPT_ANALYSIS_LESSONS } from '../analisis-pregunta/prompt-analysis-data';
import { BODY_ONE_LESSONS } from '../body-1/body-one-data';
import { BODY_TWO_LESSONS } from '../body-2/body-two-data';
import { CONCLUSION_LESSONS } from '../conclusion/conclusion-data';
import { BANK_BY_FAMILY } from '../tarea-completa/task2-prompt-bank';
import { LINKING_FAMILIES } from '../linking-language/linking-data';

/**
 * La ruta completa de UN tipo de ensayo, armada con lo que ya existe.
 *
 * DE DÓNDE SALIÓ ESTO
 *
 * Las cinco páginas de tipo (`/opinion`, `/discussion`, …) eran cinco lecciones sueltas de
 * ~362 líneas cada una, casi idénticas entre sí, que volvían a explicar por su cuenta lo que
 * el curso ya enseña en `analisis-pregunta`, `introduccion`, `body-1`, `body-2` y
 * `conclusion`. David lo vio: «cojamos las partes que ya tenemos ahí, de opinión, y las
 * ponemos en opinión como bloques de lego… para no tener que volver a construir».
 *
 * Se puede porque los cinco módulos están indexados por los MISMOS cinco identificadores, así
 * que la rebanada vertical de un tipo existe entera y ya está auditada. Esto no crea
 * contenido: lo recoge.
 *
 * QUÉ GANA QUIEN SOLO QUIERE ESTUDIAR OPINION
 *
 * Una página con el camino entero —leer el enunciado, introducción, Body 1, Body 2,
 * conclusión, los conectores que ese tipo necesita y el ensayo terminado— en vez de una
 * lección corta que repetía lo mismo con otras palabras. Y cada paso enlaza a su unidad
 * completa para quien quiera practicarlo a fondo.
 *
 * LA REGLA QUE NO SE PUEDE ROMPER
 *
 * Todo lo que se muestra viene de la fuente, nunca de una copia. Si mañana cambia el ejemplo
 * de Body 1 para opinion, esta página cambia con él. Copiarlo aquí sería crear la segunda
 * lista paralela que ya nos costó 10 ejercicios desalineados en producción.
 */

/** Las funciones de conector que declara cada tipo, traducidas a familias reales. */
const FAMILY_OF: Record<string, string> = {
  stance: 'contrast',
  concession: 'concession',
  reason: 'cause-and-effect',
  contrast: 'contrast',
  comparison: 'comparison',
  cause: 'cause-and-effect',
  result: 'cause-and-effect',
  solution: 'cause-and-effect',
  evaluation: 'comparison',
  sequence: 'addition',
  scope: 'addition',
};

/* ── Cómo se saca cada componente del enunciado ──────────────────────────────────────
 *
 * David, viendo el paso 1: «no explica cómo llegar a esto, cómo llego a sacar el topic. La
 * instrucción de cómo llegar a sacar esos componentes es la clave del éxito y no me estás
 * explicando cómo hacerlo».
 *
 * Tenía razón y el hueco era grande: la página enseñaba las seis respuestas ya resueltas
 * —«Topic: academic pressure»— sin decir de dónde salen. Enseñar el resultado de un análisis
 * no enseña a analizar.
 *
 * Estas seis filas son el MÉTODO, y son las mismas para los cinco tipos: eso es justamente lo
 * que las hace valer. Lo que cambia de un enunciado a otro es la respuesta, no la pregunta.
 *
 * Ninguna de las seis se puede contestar mirando la respuesta: por eso en la página van
 * plegadas, con la pregunta fuera y la respuesta dentro.
 */

export type ReadingStep = {
  key: 'topic' | 'instruction' | 'scope' | 'position' | 'body-1' | 'body-2';
  label: string;
  /** La pregunta que le haces al enunciado. */
  ask: string;
  /** Dónde se mira para contestarla. */
  where: string;
  /** `true` = no está en el enunciado. La pones tú. */
  yours?: boolean;
};

export const READING_METHOD: ReadingStep[] = [
  {
    key: 'topic',
    label: 'Topic',
    ask: 'What situation is this prompt about?',
    where: 'Cover the highlighted instruction with your hand and read only what is left. That is the topic — and it is the part that matters least, which is why most people spend the most time on it.',
  },
  {
    key: 'instruction',
    label: 'Instruction',
    ask: 'What am I being told to produce?',
    where: 'The highlighted words, and nothing else. Not the topic, not how many views appear before it. Every decision below follows from this one sentence.',
  },
  {
    key: 'scope',
    label: 'Scope',
    ask: 'How much room does that instruction leave me?',
    where: 'The exact wording. “To what extent” allows a degree — largely, partly. “Do you agree” does not. “Outweigh” forces a verdict; “advantages and disadvantages” forbids one. One word decides.',
  },
  {
    key: 'position',
    label: 'Your answer',
    ask: 'What do I actually think, in one sentence?',
    where: 'Nowhere in the prompt. This is the first row you supply, and if you skip it now you will discover halfway through Body 2 that you never decided.',
    yours: true,
  },
  {
    key: 'body-1',
    label: 'Body 1',
    ask: 'What is the strongest reason for that answer?',
    where: 'Also yours. The test is whether it supports the answer above — not whether it is true about the topic. A true statement that does not support your answer belongs in someone else\'s essay.',
    yours: true,
  },
  {
    key: 'body-2',
    label: 'Body 2',
    ask: 'What is the second reason, and is it genuinely different?',
    where: 'Yours as well. If you can rewrite Body 2 using Body 1\'s sentences, you have one reason written twice, and the examiner will read it as one.',
    yours: true,
  },
];

export type PathStep = {
  /** El ancla y el número que se pinta. */
  key: string;
  step: number;
  title: string;
  /** Qué tiene que hacer este paso en ESTE tipo de ensayo. */
  job: string;
  /** El error que se comete aquí, si el módulo lo declara. */
  trap?: string;
  /**
   * LA CADENA. David, mirando la página: «de una vez llegando y entregando la solución sin
   * llegar al proceso mental para llegar a esa producción».
   *
   * Tenía razón: se veía el enunciado y acto seguido el párrafo terminado, sin nada en medio.
   * Estos dos campos son ese medio — qué te obliga el enunciado, y qué decides tú — y salen
   * de campos que ya existían en los módulos y que nadie estaba pintando.
   */
  forces: string;
  decision: string;
  /**
   * `false` = este paso NO usa el enunciado del hilo, porque su módulo no lo tiene.
   * Se dice en pantalla. Callarlo sería lo peor: el alumno leería un párrafo que responde a
   * otra pregunta creyendo que responde a la de arriba.
   */
  onThread: boolean;
  /** Por qué el resultado funciona, cuando el módulo lo declara. */
  whyItWorks?: string[];
  /** El ejemplo resuelto: sus bloques, tal y como los muestra su unidad. */
  prompt: string;
  blocks: { label: string; text: string; purpose?: string }[];
  /** A dónde ir a practicarlo entero. */
  href: string;
  hrefLabel: string;
};

export type TypePath = {
  id: EssayTypeId;
  label: string;
  shortLabel: string;
  signal: string;
  mustAnswer: string;
  trap: string;
  sentenceTypes: string[];
  /** El enunciado que recorre la página entera, de leerlo a tenerlo escrito. */
  thread: { prompt: string; steps: number; total: number };
  /** Cómo se lee el enunciado antes de escribir nada. */
  reading: {
    onThread: boolean;
    prompt: string;
    topic: string;
    instruction: string;
    scope: string;
    position: string;
    bodyRoute: string[];
  };
  steps: PathStep[];
  linking: { slug: string; label: string; signals: string }[];
  /** El ensayo terminado: los mismos párrafos, ya montados. */
  model: { title: string; prompt: string; paragraphs: { label: string; text: string; job: string }[]; words: number } | null;
};

const find = <T extends { id: string }>(list: T[], id: string) => list.find((item) => item.id === id);

/** Arma la ruta de un tipo leyendo de los cinco módulos. Nada se copia a mano. */
export function pathFor(id: EssayTypeId): TypePath {
  const type = find(ESSAY_TYPES, id)!;
  const analysis = find(PROMPT_ANALYSIS_LESSONS, id)!;
  const bodyOne = find(BODY_ONE_LESSONS, id)!;
  const bodyTwo = find(BODY_TWO_LESSONS, id)!;
  const conclusion = find(CONCLUSION_LESSONS, id)!;
  const bank = BANK_BY_FAMILY.find((family) => family.id === id);

  /**
   * EL HILO: un solo enunciado recorriendo la página entera.
   *
   * David, mirando la primera versión: «el usuario va a llegar de una vez, va a haber una
   * respuesta y no sabe cómo llegamos a esa respuesta… no entiendo cuál es la transición».
   * Parte del problema era que cada paso enseñaba SU primer ejemplo, y esos ejemplos son
   * enunciados distintos. Se leía el enunciado A y justo debajo la introducción del B.
   *
   * Así que se elige el enunciado que más módulos comparten —medido, no supuesto— y cada paso
   * usa su ejemplo de ESE enunciado. Donde el módulo no lo tenga, se usa el suyo y la página
   * lo dice.
   */
  const normalise = (value: string) => value.trim().replace(/\s+/gu, ' ');
  const modules = [analysis, type, bodyOne, bodyTwo, conclusion];
  const coverage = new Map<string, number>();
  for (const source of modules) {
    for (const key of new Set(source.examples.map((example) => normalise(example.prompt)))) {
      coverage.set(key, (coverage.get(key) ?? 0) + 1);
    }
  }
  // A igualdad de cobertura gana el que además tenga ensayo modelo en el banco.
  const inBank = new Set((bank?.prompts ?? []).map((item) => normalise(item.prompt)));
  const thread = [...coverage.entries()].sort((a, b) => {
    const byCoverage = b[1] - a[1];
    if (byCoverage !== 0) return byCoverage;
    const byBank = Number(inBank.has(b[0])) - Number(inBank.has(a[0]));
    return byBank !== 0 ? byBank : a[0].localeCompare(b[0]);
  })[0][0];

  const onThread = <T extends { prompt: string }>(list: T[]) =>
    list.find((example) => normalise(example.prompt) === thread);

  const analysisExample = onThread(analysis.examples) ?? analysis.examples[0];
  const introExample = onThread(type.examples) ?? type.examples[0];
  const bodyOneExample = onThread(bodyOne.examples) ?? bodyOne.examples[0];
  const bodyTwoExample = onThread(bodyTwo.examples) ?? bodyTwo.examples[0];
  const conclusionExample = onThread(conclusion.examples) ?? conclusion.examples[0];
  const modelPrompt = (bank?.prompts ?? []).find((item) => normalise(item.prompt) === thread) ?? bank?.prompts[0];
  const isThread = (example: { prompt: string }) => normalise(example.prompt) === thread;

  /**
   * «Lo que el enunciado obliga aquí» sale del MAPA del enunciado —la ruta de cuerpos que
   * salió de leerlo—, no de la arquitectura genérica del tipo. Si saliera de la arquitectura
   * diría lo mismo que el encabezado de la sección, y repetir una frase dos veces en la misma
   * pantalla hace que la segunda no se lea.
   *
   * Cuando el mapa es de otro enunciado (le pasa a `discussion`) no se puede usar: entonces
   * se cae a la arquitectura, que es genérica pero cierta.
   */
  const routeMatches = isThread(analysisExample);
  /**
   * La ruta del mapa son notas de redacción —«wellbeing.», «depth of learning.»—, no frases.
   * Pintadas en crudo se leen como un apunte ajeno. Se envuelven en la frase que las explica,
   * sin tocar el dato: es el mismo defecto que arrastra `analisis-pregunta` en sus opciones.
   */
  const trim = (value: string) => value.trim().replace(/[.;]+$/u, '');
  const forcedBy = (index: 0 | 1, fallback: string) =>
    routeMatches
      ? `Body ${index + 1} carries the ${index === 0 ? 'first' : 'second'} reason you committed to when you read the prompt: ${trim(analysisExample.map.bodyRoute[index])}.`
      : fallback;

  const steps: PathStep[] = [
    {
      key: 'introduction',
      step: 2,
      title: 'The introduction',
      job: type.position,
      trap: type.trap,
      forces: introExample.instruction,
      decision: introExample.plan,
      whyItWorks: introExample.whyItWorks,
      onThread: isThread(introExample),
      prompt: introExample.prompt,
      /**
       * El propósito de cada bloque sale de la ARQUITECTURA del tipo, emparejada por etiqueta
       * con el ejemplo. Nunca por posición: el ejemplo puede traer tres bloques y la
       * arquitectura cuatro, y emparejar por índice desplazaría los propósitos uno a uno.
       */
      blocks: introExample.blocks.map((block) => ({
        label: block.label,
        text: block.text,
        purpose: type.blocks.find((spec) => spec.label === block.label)?.text,
      })),
      href: '/practica/ielts/academic/writing/task2/introduccion',
      hrefLabel: 'Practise introductions',
    },
    {
      key: 'body-1',
      step: 3,
      title: 'Body 1',
      job: type.bodyOne,
      trap: bodyOneExample.commonMistake,
      forces: forcedBy(0, type.bodyOne),
      decision: bodyOneExample.paragraphJob,
      onThread: isThread(bodyOneExample),
      prompt: bodyOneExample.prompt,
      blocks: bodyOneExample.blocks.map((block) => ({ label: block.label, text: block.text, purpose: block.purpose })),
      href: '/practica/ielts/academic/writing/task2/body-1',
      hrefLabel: 'Practise Body 1',
    },
    {
      key: 'body-2',
      step: 4,
      title: 'Body 2',
      job: type.bodyTwo,
      trap: bodyTwoExample.commonMistake,
      forces: forcedBy(1, type.bodyTwo),
      decision: bodyTwoExample.paragraphJob,
      onThread: isThread(bodyTwoExample),
      prompt: bodyTwoExample.prompt,
      blocks: bodyTwoExample.blocks.map((block) => ({ label: block.label, text: block.text, purpose: block.purpose })),
      href: '/practica/ielts/academic/writing/task2/body-2',
      hrefLabel: 'Practise Body 2',
    },
    {
      key: 'conclusion',
      step: 5,
      title: 'The conclusion',
      job: type.conclusion,
      trap: conclusionExample.commonMistake,
      forces: routeMatches
        ? `The conclusion has to end on the answer you committed to when you read the prompt: ${trim(analysisExample.map.position)}.`
        : type.conclusion,
      decision: conclusionExample.conclusionJob,
      onThread: isThread(conclusionExample),
      prompt: conclusionExample.prompt,
      blocks: conclusionExample.blocks.map((block) => ({ label: block.label, text: block.text, purpose: block.purpose })),
      href: '/practica/ielts/academic/writing/task2/conclusion',
      hrefLabel: 'Practise conclusions',
    },
  ];

  // Las familias de conectores que este tipo necesita, sin repetir.
  const slugs = [...new Set(type.linkingFunctions.map((fn) => FAMILY_OF[fn]).filter(Boolean))];
  const linking = slugs
    .map((slug) => LINKING_FAMILIES.find((family) => family.slug === slug))
    .filter((family): family is NonNullable<typeof family> => Boolean(family))
    .map((family) => ({ slug: family.slug, label: family.label, signals: family.signals }));

  return {
    id,
    label: type.label,
    shortLabel: type.shortLabel,
    signal: type.signal,
    mustAnswer: type.mustAnswer,
    trap: type.trap,
    sentenceTypes: type.sentenceTypes,
    thread: { prompt: thread, steps: coverage.get(thread) ?? 0, total: modules.length },
    reading: {
      onThread: isThread(analysisExample),
      prompt: analysisExample.prompt,
      topic: analysisExample.map.topic,
      instruction: analysisExample.map.instruction,
      scope: analysisExample.map.scope,
      position: analysisExample.map.position,
      bodyRoute: analysisExample.map.bodyRoute,
    },
    steps,
    linking,
    model: modelPrompt
      ? {
          title: modelPrompt.title,
          prompt: modelPrompt.prompt,
          paragraphs: modelPrompt.model.map((paragraph) => ({
            label: paragraph.label,
            text: paragraph.text,
            job: paragraph.job,
          })),
          words: modelPrompt.modelWords,
        }
      : null,
  };
}

/* ── El ejercicio guiado, que sí es propio de cada ruta ──────────────────────────────── */

export type GuidedOption = {
  id: string;
  text: string;
  good: boolean;
  /** Por qué esta opción concreta funciona o falla. Nunca una frase común. */
  why: string;
};

export type GuidedExercise = {
  prompt: string;
  first: { title: string; ask: string; options: GuidedOption[] };
  second: { title: string; ask: string; options: GuidedOption[] };
};

/**
 * Se llena una ruta por iteración, no las cinco de golpe: cada una se verifica antes de pasar
 * a la siguiente. La página pinta el ejercicio solo si su tipo ya está aquí.
 */
export const GUIDED_EXERCISES: Partial<Record<EssayTypeId, GuidedExercise>> = {
  opinion: {
    prompt:
      'Some people believe that university students should choose subjects that lead directly to employment. Others think students should be free to study whatever they are interested in. To what extent do you agree or disagree?',
    first: {
      title: 'Choose the thesis that answers the question',
      ask: 'One of these three answers the question. The other two look like answers and are not.',
      options: [
        {
          id: 'clear',
          text: 'I largely agree that students should have freedom of choice, although universities should also help them understand the employment consequences of their decisions.',
          good: true,
          why: 'Strong. It answers the question, allows one qualification, and announces a line of argument that can be defended for four paragraphs.',
        },
        {
          id: 'balanced',
          text: 'There are advantages and disadvantages to both views, and this essay will discuss them before reaching a conclusion.',
          good: false,
          why: 'Weak here. It reads as a discussion essay: it promises to examine both sides and never answers how far the writer agrees.',
        },
        {
          id: 'vague',
          text: 'I think this is an important issue because education and employment are both relevant in modern society.',
          good: false,
          why: 'Too vague. It says the issue matters, which nobody disputes, and never says whether the writer agrees, disagrees or agrees in part.',
        },
      ],
    },
    second: {
      title: 'Pick the planning decisions that hold the position',
      ask: 'More than one is right, and two of them are not. Choose every decision that would produce a coherent answer.',
      options: [
        {
          id: 'body1',
          text: 'Body 1: argue that interest-driven study improves motivation, depth of learning and long-term performance.',
          good: true,
          why: 'Useful. It develops the position directly and leaves room for a concrete example rather than a general claim.',
        },
        {
          id: 'body2',
          text: 'Body 2: acknowledge employability concerns, then argue that guidance is better than forcing students into job-linked degrees.',
          good: true,
          why: 'Strong. It concedes the opposing concern and then answers it, which strengthens the position instead of diluting it.',
        },
        {
          id: 'example',
          text: 'Use an example of students choosing design, research or education because interest can become professional expertise.',
          good: true,
          why: 'Useful. A named case supports the argument without inventing statistics, which is the safer way to be specific.',
        },
        {
          id: 'both-sides',
          text: 'Write one body paragraph for employment-focused degrees and another for personal-interest degrees, with no clear winner.',
          good: false,
          why: 'Risky. Two balanced paragraphs with no winner is the shape of a discussion essay, and it leaves the position unanswered.',
        },
        {
          id: 'off-task',
          text: 'Propose government scholarships and university career fairs as the main focus of the essay.',
          good: false,
          why: 'Off task. Nobody asked what should be done. Proposing measures answers a problem-and-solution prompt, not this one.',
        },
      ],
    },
  },
  discussion: {
    prompt:
      'Some people believe that children should begin learning a foreign language at primary school. Others think language learning should start later, when students are more mature. Discuss both views and give your own opinion.',
    first: {
      title: 'Choose the structure the instruction asks for',
      ask: 'Three shapes. Only one of them does everything the final sentence asks for.',
      options: [
        {
          id: 'balanced',
          text: 'Intro with both views and your opinion → Body 1: the early-learning view → Body 2: the later-learning view and why you find one side stronger → Conclusion with your opinion.',
          good: true,
          why: 'Works. Both views get a paragraph, and your own judgement is stated rather than implied — which is the third thing the instruction asks for.',
        },
        {
          id: 'opinion',
          text: 'Intro with a strong personal thesis → Body 1 and Body 2 both defend your view → Conclusion repeats it.',
          good: false,
          why: 'This is the shape of an opinion essay. It answers only one of the three demands: the second view never gets developed, and “discuss both views” is not optional.',
        },
        {
          id: 'neutral',
          text: 'Neutral intro → Body 1: view A → Body 2: view B → Conclusion: both sides have advantages and there is no clear answer.',
          good: false,
          why: 'Both views are there, and then the essay refuses the one thing only you can supply. “Give your own opinion” makes a verdict compulsory, not optional.',
        },
      ],
    },
    second: {
      title: 'Pick the planning decisions that keep the essay balanced',
      ask: 'Three of these belong in the plan. Two of them would unbalance the essay.',
      options: [
        {
          id: 'view-a',
          text: 'Body 1: explain that young children absorb pronunciation and basic patterns more naturally.',
          good: true,
          why: 'Works. It develops the first view with a specific reason instead of restating that some people believe it.',
        },
        {
          id: 'view-b',
          text: 'Body 2: explain that older students may learn faster because they understand grammar and study goals better.',
          good: true,
          why: 'Works. It gives the second view real weight, which is what stops the essay from looking like it decided before it started.',
        },
        {
          id: 'own-opinion',
          text: 'State that early exposure is preferable if lessons are playful rather than exam-focused.',
          good: true,
          why: 'Works. The opinion arrives with a condition, which is stronger than a flat preference and connects the two views instead of dismissing one.',
        },
        {
          id: 'ignore-side',
          text: 'Mention the later-learning view in one sentence because you disagree with it.',
          good: false,
          why: 'Does not work. Disagreeing with a view is not a reason to leave it undeveloped: the instruction asks you to discuss it, and one sentence is not a discussion.',
        },
        {
          id: 'solutions',
          text: 'Focus mainly on how governments can train more language teachers.',
          good: false,
          why: 'Off task. Nobody asked what should be done. Proposing measures answers a problem-and-solution prompt, not this one.',
        },
      ],
    },
  },
  'problem-solution': {
    prompt:
      'In many cities, young people are finding it increasingly difficult to buy their first home. What problems does this cause, and what solutions can governments and communities offer?',
    first: {
      title: 'Choose the structure the two questions ask for',
      ask: 'The prompt asks two things. Only one of these shapes answers both.',
      options: [
        {
          id: 'matched',
          text: 'Intro: paraphrase and answer both parts → Body 1: two problems this causes → Body 2: two solutions tied to those problems → Conclusion: the link between them.',
          good: true,
          why: 'Works. Problems and solutions each get a paragraph, and the solutions answer the problems named — which is the connection the examiner reads for.',
        },
        {
          id: 'causes-only',
          text: 'Intro: housing is expensive → Body 1: why prices are rising → Body 2: why salaries are low → Conclusion: governments should help.',
          good: false,
          why: 'Does not work. The prompt asks what problems this causes, not why it happens. Both bodies answer a question about causes that was never asked, and the solutions half is left to one closing sentence.',
        },
        {
          id: 'solutions-list',
          text: 'Intro: many young people cannot buy homes → Body 1: build houses, reduce taxes, control rent → Body 2: give loans, offer advice, improve transport → Conclusion: several solutions exist.',
          good: false,
          why: 'Does not work. Six measures listed and none developed, and the problems half never appears. A list of solutions with nothing to solve is the most common way this type goes wrong.',
        },
      ],
    },
    second: {
      title: 'Pick the ideas worth developing',
      ask: 'Three of these can carry a paragraph. Two of them cannot.',
      options: [
        {
          id: 'problem-delay',
          text: 'Problem: young adults delay forming families or living independently because housing consumes too much of their income.',
          good: true,
          why: 'Works. It is a specific social consequence and it can be developed into a mechanism, not just asserted.',
        },
        {
          id: 'problem-inequality',
          text: 'Problem: wealth gaps widen because people with family support can buy property while others stay renters.',
          good: true,
          why: 'Works. It shows an effect beyond personal inconvenience, which is what separates a real problem from a complaint.',
        },
        {
          id: 'solution-affordable',
          text: 'Solution: require new developments to include affordable units reserved for first-time buyers.',
          good: true,
          why: 'Works. It acts on the shortage itself rather than on its symptoms, so it can be tied directly to a problem named in Body 1.',
        },
        {
          id: 'solution-education',
          text: 'Solution: schools should teach young people how to save money.',
          good: false,
          why: 'Weak on its own. Saving advice does nothing about prices or supply, so it cannot answer either of the problems this essay just described.',
        },
        {
          id: 'solution-generic',
          text: 'Solution: the government should act quickly because the situation is serious.',
          good: false,
          why: 'Does not work. That is an intention, not a measure. There is nothing in it to explain, so the paragraph would have nowhere to go.',
        },
      ],
    },
  },
  'advantages-disadvantages': {
    prompt:
      'In many countries, more people are choosing to work remotely rather than travelling to an office every day. Do the advantages of this development outweigh the disadvantages?',
    first: {
      title: 'Choose the structure the word “outweigh” forces',
      ask: 'One word in the instruction changes what the essay owes. Which shape pays it?',
      options: [
        {
          id: 'outweigh',
          text: 'Intro: say which side is heavier → Body 1: the main advantages → Body 2: the disadvantages, then why they weigh less → Conclusion: restate the verdict.',
          good: true,
          why: 'Works. Both sides appear and the essay decides, which is what “outweigh” asks for. The verdict is visible in the introduction and still visible at the end.',
        },
        {
          id: 'neutral',
          text: 'Neutral intro → Body 1: advantages → Body 2: disadvantages → Conclusion: both sides matter and it depends.',
          good: false,
          why: 'Does not work. Both sides are covered and the question is left unanswered. “It depends” is exactly the ending an outweigh prompt rules out.',
        },
        {
          id: 'opinion-only',
          text: 'Intro agreeing strongly → Body 1 and Body 2 both on the benefits of remote work → Conclusion repeats the benefits.',
          good: false,
          why: 'Does not work. You cannot say one side is heavier without weighing the other. Deciding is required; skipping the disadvantages is not allowed.',
        },
      ],
    },
    second: {
      title: 'Pick the ideas that let you deliver a verdict',
      ask: 'Three of these help you decide. Two of them stop you.',
      options: [
        {
          id: 'adv-flexibility',
          text: 'Advantage: remote work removes the commute and gives employees more control over their day.',
          good: true,
          why: 'Works. It is concrete and it can be developed into a measurable consequence rather than left as a preference.',
        },
        {
          id: 'adv-access',
          text: 'Advantage: companies can hire outside one city, which widens the pool of candidates.',
          good: true,
          why: 'Works. It is a genuinely different benefit, not another way of saying convenience — so it earns its own paragraph.',
        },
        {
          id: 'dis-isolation',
          text: 'Disadvantage: workers can feel isolated, though hybrid schedules and deliberate team time reduce it.',
          good: true,
          why: 'Works, and it is the strongest of the three: it concedes a real cost and then shows why it does not tip the balance. That concession is what makes the verdict credible.',
        },
        {
          id: 'ignore-disadvantages',
          text: 'Skip the disadvantages, since the question asks whether the advantages outweigh them.',
          good: false,
          why: 'Does not work. “Outweigh” is a comparison: with only one side on the scale there is nothing to compare, and the verdict becomes an assertion.',
        },
        {
          id: 'unrelated',
          text: 'Focus mainly on whether governments should regulate internet prices.',
          good: false,
          why: 'Off task. The prompt is about remote work, not telecoms policy. A relevant-sounding neighbour topic is still a different topic.',
        },
      ],
    },
  },
  'direct-questions': {
    prompt:
      'In many countries, people are spending less time cooking at home and more time eating prepared food. Why is this happening, and do you think this is a positive or negative development?',
    first: {
      title: 'Choose the structure the two questions ask for',
      ask: 'Two questions were asked. Only one of these answers both.',
      options: [
        {
          id: 'two-part',
          text: 'Intro: answer both questions briefly → Body 1: why it is happening → Body 2: positive or negative, with reasons → Conclusion: both answers again.',
          good: true,
          why: 'Works. One paragraph per question, in the order they were asked, and each answer is visible rather than implied.',
        },
        {
          id: 'opinion-only',
          text: 'Intro: prepared food is negative → Body 1 and Body 2: health risks → Conclusion: people should cook more.',
          good: false,
          why: 'Does not work. The evaluation is answered twice and the first question — why it is happening — is never answered at all.',
        },
        {
          id: 'causes-list',
          text: 'Intro: prepared food is popular → Body 1: work, advertising and apps → Body 2: more causes → Conclusion: the trend will continue.',
          good: false,
          why: 'Does not work. It is the mirror of the previous one: all causes, no evaluation. Half the task is missing either way.',
        },
      ],
    },
    second: {
      title: 'Pick the answers worth developing',
      ask: 'Three of these can carry a paragraph. Two of them cannot.',
      options: [
        {
          id: 'cause-work',
          text: 'Why: longer hours and commuting leave many adults with little time or energy to cook.',
          good: true,
          why: 'Works. It is a cause with a mechanism behind it, so the paragraph has something to explain rather than only to assert.',
        },
        {
          id: 'cause-delivery',
          text: 'Why: delivery apps and supermarkets have made prepared meals cheaper and easier to get.',
          good: true,
          why: 'Works. It is a second cause of a different kind — availability rather than time — so the two do not overlap.',
        },
        {
          id: 'evaluation-negative',
          text: 'Evaluation: mostly negative, because frequent prepared food lowers nutritional quality and erodes cooking skills.',
          good: true,
          why: 'Works. It answers the second question directly and gives two lines of reasoning that can each be developed.',
        },
        {
          id: 'generic-positive',
          text: 'Evaluation: positive, because modern life is modern and people like modern things.',
          good: false,
          why: 'Does not work. It restates the trend instead of judging it. There is no reason in it, so there is nothing for the paragraph to develop.',
        },
        {
          id: 'off-topic',
          text: 'Focus on whether restaurants should pay higher taxes.',
          good: false,
          why: 'Off task. The prompt asks about a change in eating habits and what you make of it, not about tax policy.',
        },
      ],
    },
  },
};
