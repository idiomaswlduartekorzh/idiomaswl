import type { EssayTypeId } from '../introduccion/introduction-data';
import { ESSAY_TYPES } from '../introduccion/introduction-data';
import { BODY_ONE_LESSONS } from '../body-1/body-one-data';
import { BODY_TWO_LESSONS } from '../body-2/body-two-data';
import { CONCLUSION_LESSONS } from '../conclusion/conclusion-data';

/**
 * El banco de enunciados de Tarea Completa, con un ensayo modelo entero para cada uno.
 *
 * QUÉ HABÍA
 *
 * Cuatro enunciados. Cuatro. De las cinco familias que enseña el resto de Task 2 faltaba
 * ventajas-desventajas entera, así que se podía terminar el curso sin haber escrito nunca
 * una. Y los modelos eran cuatro pares Band 6 / Band 8 escritos a mano, sin relación con
 * ningún otro ejercicio del curso: el enunciado sobre el que acababas de practicar Body 1
 * no volvía a aparecer aquí.
 *
 * DE DÓNDE SALE ESTE
 *
 * De los mismos 25 enunciados que usan Body 1, Body 2 y la conclusión —medido: los tres
 * módulos comparten los 25—, así que el ensayo modelo se COMPONE de los párrafos que el
 * estudiante ya trabajó por separado. No es material nuevo inventado en paralelo: es el
 * mismo, entero por fin. Practicar Body 1 sobre «Food waste» y llegar aquí a escribir el
 * ensayo completo de «Food waste» es lo que convierte seis ejercicios sueltos en un curso.
 *
 * LAS DOS COSAS QUE HUBO QUE ESCRIBIR
 *
 * 1. **Nueve introducciones.** La introducción usa 9 enunciados que no existen en ningún
 *    otro módulo (toda la familia de discusión y cuatro de cinco de opinión). Se escriben
 *    aquí para completar esos nueve ensayos, sin tocar `introduction-data.ts`, que ya está
 *    revisado y aprobado. El desajuste de fondo —«Build the essay · Step 1 a 6» que no
 *    construye el mismo ensayo— queda anotado en `docs/ielts-task2-loop.md`: alinearlo es
 *    una decisión de contenido, no una corrección.
 *
 * 2. **Diez previsualizaciones de razones.** Al componer los 16 que sí tenían introducción,
 *    diez salían por debajo de **250 palabras**, que es el mínimo que exige la propia tarea.
 *    Un modelo de 225 palabras para un ejercicio de 250+ enseña justo lo contrario de lo que
 *    dice. La frase que faltaba es la que la lección de introducción ya llama «Reason
 *    preview» y marca como opcional: aquí no lo es.
 *
 * Comprobado por `scripts/check-ielts-task2-alignment.mjs`: 25 enunciados, las 5 familias,
 * cuatro párrafos cada uno y ninguno por debajo de 250 palabras.
 */

export type ModelParagraph = {
  label: 'Introduction' | 'Body 1' | 'Body 2' | 'Conclusion';
  text: string;
  /** Qué hace este párrafo. Sale del propio módulo que lo enseña. */
  job: string;
};

export type BankPrompt = {
  id: string;
  essayType: EssayTypeId;
  familyLabel: string;
  /** El patrón de instrucción de la familia, para que se sepa qué se está practicando. */
  signal: string;
  title: string;
  prompt: string;
  model: ModelParagraph[];
  modelWords: number;
  /** Contra qué comparar el texto propio. Son los errores reales que registra cada módulo. */
  watchFor: string[];
};

export const introductionKey = (essayType: string, title: string) => `${essayType}::${title}`;
const key = introductionKey;

/**
 * Las nueve introducciones que faltaban.
 *
 * Misma estructura que enseña la lección: gancho discutible, paráfrasis del enunciado,
 * posición, y las dos premisas en una línea. La preview no es relleno para llegar a 250:
 * es lo que hace que el lector sepa, desde la introducción, qué va a defender cada cuerpo.
 */
export const MISSING_INTRODUCTIONS: Record<string, string> = {
  [key('opinion', 'Public transport')]:
    'A city can widen every road it has and still move fewer people than a single busy railway line. Whether public funds are better directed towards buses and trains than towards new road capacity has become a central question of urban policy. I strongly agree that public transport deserves the larger share, both because it carries far more passengers per square metre of city and because it widens access to work, study and healthcare.',
  [key('opinion', 'University access')]:
    'A country that charges for a degree does not select its ablest students; it selects the ablest students who can pay. Whether higher education should be provided without tuition fees to every applicant, irrespective of family wealth, remains genuinely contested. I agree that tuition should be removed, or substantially reduced, for academically qualified applicants, because fees filter candidates by income rather than by ability, and because targeted public funding can keep the policy financially workable.',
  [key('opinion', 'Remote work')]:
    'The office was never the work; it was only the place the work happened to be kept. It is increasingly claimed that employees are better served by working from home than by commuting to a shared workplace. I largely agree, at least for roles that do not depend on constant physical presence, since home working returns control over the working day to the employee and protects the long stretches of concentration that demanding tasks require.',
  [key('opinion', 'Advertising to children')]:
    'An audience that cannot recognise persuasion cannot meaningfully consent to it. There are recurring calls to prohibit commercial messages directed at children, and the objection is not simply that such messages are irritating. I largely agree that this advertising should face strict restrictions, because young viewers cannot reliably identify persuasive intent, and because they cannot evaluate promotional claims with the scepticism an adult would bring to them.',
  [key('discussion', 'Homework')]:
    'Practice makes a skill permanent, but exhaustion makes a subject hateful, and school has to choose how much of each it wants. Opinion is divided over whether children benefit from homework every day or from a firm limit on it. Having considered both positions, I believe purposeful but limited practice serves children better than either extreme, since regular work genuinely consolidates recent learning, while a heavy compulsory workload displaces the rest and thought that learning also depends on.',
  [key('discussion', 'City centres')]:
    'A street empty of cars is not empty; it is simply being used by someone else. Cities are increasingly asked to choose between closing their centres to private vehicles and keeping them open to traffic. Both positions rest on real needs, and I believe the stronger case is for a car-free centre with carefully managed exemptions, because removing general traffic returns space and safety to pedestrians, while deliveries and residents with limited mobility still require a route in.',
  [key('discussion', 'Museum funding')]:
    'A collection that nobody can afford to enter has been preserved for no one. There is longstanding disagreement over whether museums should admit visitors without charge or ask them to contribute at the door. Having weighed both arguments, I favour a mixed system rather than one universal rule, because blanket fees exclude precisely the visitors museums exist to serve, while ticket income does give institutions a dependable source for conservation and staffing.',
  [key('discussion', 'Specialisation')]:
    'Choosing a path early is efficient only if you already know where you are going. Educators disagree about whether teenagers should concentrate on a narrow field or continue with a broad range of subjects. I find the case for breadth more persuasive for the majority of students, since early specialisation rewards the minority who already have a settled goal, whereas a wide curriculum allows everyone else to discover what theirs might be.',
  [key('discussion', 'Artificial intelligence')]:
    'A tool that decides faster than we can check is not saving us time; it is spending our judgement. Artificial intelligence is regarded by some as a transformative benefit to society and by others as a serious danger to it. I consider both readings partly correct, and conclude that the benefits hold only where human review remains accountable, because these systems genuinely relieve people of complex and repetitive work, yet they also concentrate decision-making and reproduce hidden bias at scale.',
};

/**
 * La frase que faltaba en los diez modelos que no llegaban a 250 palabras.
 *
 * Se añade al final de la introducción porque ahí es donde va: anuncia las dos premisas.
 * Acortar no era opción y alargar el cuerpo tampoco —los párrafos de cuerpo están medidos y
 * revisados en sus propios módulos—, así que se completa lo único que estaba incompleto.
 */
export const REASON_PREVIEWS: Record<string, string> = {
  [key('opinion', 'Academic pressure')]:
    'The two costs that concern me most are the loss of durable understanding and the replacement of curiosity by a fear of failing.',
  [key('problem-solution', 'Food waste')]:
    'This essay identifies the main causes of household waste and then sets out the purchasing and storage measures most likely to reduce it.',
  [key('problem-solution', 'Student inactivity')]:
    'It examines why activity levels have fallen and then what schools can realistically change about how often and how widely sport is offered.',
  [key('problem-solution', 'Plastic packaging')]:
    'The discussion below traces where the packaging originates and then explains why reducing it requires businesses and consumers to move at the same time.',
  [key('advantages-disadvantages', 'Working from home')]:
    'The clearest gain is personal control over the working day; the clearest cost is the informal contact that keeps a team coordinated.',
  [key('advantages-disadvantages', 'International tourism')]:
    'The benefits are largely economic and cultural, while the costs fall on housing, infrastructure and the local environment of the places visited.',
  [key('advantages-disadvantages', 'Living abroad')]:
    'What is gained is independence and a wider sense of how life can be organised; what is risked is emotional isolation and a long period of practical insecurity.',
  [key('direct-questions', 'Living alone')]:
    'The answer depends on whether living alone has been chosen or merely arrived at, and the two paragraphs below take each case in turn.',
  [key('direct-questions', 'News consumption')]:
    'The first paragraph explains why trust in news has fallen, and the second sets out how a reader can test a claim before believing it.',
  [key('direct-questions', 'Historic buildings')]:
    'The case for preservation is addressed first, followed by the harder question of who should reasonably pay for it.',
};

const FAMILY_LABEL: Record<EssayTypeId, string> = {
  opinion: 'Opinion',
  discussion: 'Discussion',
  'problem-solution': 'Problem and solution',
  'advantages-disadvantages': 'Advantages and disadvantages',
  'direct-questions': 'Two direct questions',
};

const countWords = (value: string) => value.trim().split(/\s+/).filter(Boolean).length;
const joinBlocks = (blocks: { text: string }[]) => blocks.map((block) => block.text).join(' ');

const introductionByPrompt = new Map(
  ESSAY_TYPES.flatMap((lesson) => lesson.examples.map((example) => [example.prompt, example] as const)),
);

function buildIntroduction(essayType: EssayTypeId, title: string, prompt: string) {
  const written = MISSING_INTRODUCTIONS[key(essayType, title)];
  if (written) return written;

  const source = introductionByPrompt.get(prompt);
  const base = source ? joinBlocks(source.blocks) : '';
  const preview = REASON_PREVIEWS[key(essayType, title)];
  return preview ? `${base} ${preview}` : base;
}

export const TASK2_PROMPT_BANK: BankPrompt[] = BODY_ONE_LESSONS.flatMap((lesson, lessonIndex) =>
  lesson.examples.map((example, exampleIndex) => {
    const bodyTwo = BODY_TWO_LESSONS[lessonIndex].examples[exampleIndex];
    const conclusion = CONCLUSION_LESSONS[lessonIndex].examples[exampleIndex];
    const family = ESSAY_TYPES[lessonIndex];

    const model: ModelParagraph[] = [
      {
        label: 'Introduction',
        text: buildIntroduction(lesson.id, example.title, example.prompt),
        job: 'Reframe the prompt, state the position, and preview what each body paragraph will argue.',
      },
      { label: 'Body 1', text: joinBlocks(example.blocks), job: example.paragraphJob },
      { label: 'Body 2', text: joinBlocks(bodyTwo.blocks), job: bodyTwo.paragraphJob },
      { label: 'Conclusion', text: joinBlocks(conclusion.blocks), job: conclusion.conclusionJob },
    ];

    return {
      id: `${lesson.id}--${example.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      essayType: lesson.id,
      familyLabel: FAMILY_LABEL[lesson.id],
      signal: family.signal,
      title: example.title,
      prompt: example.prompt,
      model,
      modelWords: countWords(model.map((paragraph) => paragraph.text).join(' ')),
      // Los errores que registran los propios módulos, no una lista genérica de consejos.
      watchFor: [example.commonMistake, bodyTwo.commonMistake, conclusion.commonMistake].filter(Boolean),
    } satisfies BankPrompt;
  }),
);

/** Agrupado por familia, que es como se elige un enunciado. */
export const BANK_BY_FAMILY = ESSAY_TYPES.map((family) => ({
  id: family.id,
  label: FAMILY_LABEL[family.id],
  signal: family.signal,
  prompts: TASK2_PROMPT_BANK.filter((item) => item.essayType === family.id),
}));
