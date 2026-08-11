import type { EssayTypeId } from '../introduccion/introduction-data';
import { BODY_ONE_LESSONS } from '../body-1/body-one-data';
import { TASK2_PROMPT_BANK, type ModelParagraph } from '../tarea-completa/task2-prompt-bank';

export type ReviewLayer = { label: string; tone: 'claim' | 'development' | 'contrast' | 'example' | 'link'; question: string };
export type ReviewCase = {
  title: string; prompt: string; draft: string; issue: string; category: string; revision: string; explanation: string;
  /**
   * El ensayo completo y correcto de ESTE enunciado, para leerlo antes de juzgar el
   * borrador.
   *
   * Sin él, seis de los veinticinco casos eran indetectables. El fallo de «Task Response» es
   * una AUSENCIA —no se contesta la segunda pregunta, no se da la opinión, no se compara—, y
   * una ausencia no se ve en un fragmento de dos frases: haría falta el ensayo entero para
   * notar que algo no está. Se leía la descripción del problema y se emparejaba con la
   * etiqueta, que es lo contrario de revisar.
   *
   * Sale del banco de Tarea Completa, que compone los cuatro párrafos de los mismos 25
   * enunciados. No es material nuevo: es el ensayo que el estudiante ya construyó por pasos.
   */
  model: ModelParagraph[];
};
export type ReviewLesson = { id: EssayTypeId; shortLabel: string; instruction: string; decisiveCheck: string; layers: ReviewLayer[]; cases: ReviewCase[] };

const modelByPrompt = new Map(TASK2_PROMPT_BANK.map((item) => [item.prompt, item.model]));

const commonLayers: ReviewLayer[] = [
  { label: 'Task Response', tone: 'claim', question: 'Did I answer every instruction and make any required position visible?' },
  { label: 'Essay logic', tone: 'development', question: 'Does each paragraph perform one necessary and distinct job?' },
  { label: 'Position control', tone: 'contrast', question: 'Do the thesis, body links and conclusion preserve the same judgement?' },
  { label: 'Cohesion', tone: 'link', question: 'Are relationships clear without mechanical or excessive linking phrases?' },
  { label: 'Language control', tone: 'example', question: 'Can I fix specific vocabulary, grammar or punctuation errors without rewriting blindly?' },
];

/**
 * [capa, problema, revisión, explicación, BORRADOR].
 *
 * El quinto campo es el texto que el alumno lee. Antes no existía: `draft` se rellenaba
 * con una copia del campo `problema` —una DESCRIPCIÓN del fallo— y encima no se pintaba en
 * ningún sitio. El resultado es que la página llamada «revisión final» pedía diagnosticar
 * sin enseñar nunca el texto defectuoso: se elegía la etiqueta correcta leyendo el
 * enunciado de la propia pregunta.
 */
const categorySets: Record<EssayTypeId, Array<[string, string, string, string, string]>> = {
  opinion: [
    ['Position control', 'I agree in the thesis, but the conclusion says that both sides are equally convincing.', 'Restate the same degree of agreement in the conclusion.', 'A changed position makes the response internally inconsistent.', 'Thesis: “I largely agree that schools place excessive pressure on students.” … Conclusion: “In conclusion, both sides of this debate are equally convincing, and each family must decide for itself.”'],
    ['Task Response', 'The essay discusses transport spending but never states whether public transport should receive more money than roads.', 'Add an explicit comparative judgement to the thesis and maintain it.', 'An opinion task requires a visible answer, not a neutral topic discussion.', '“Public transport spending has risen in many cities, while road building continues to absorb large budgets. This essay will examine how governments divide transport funding and what each choice involves.”'],
    ['Essay logic', 'Body 1 and Body 2 both argue that free university improves access for low-income students.', 'Keep access in one paragraph and develop a distinct funding or social-capacity argument in the other.', 'Two repeated body paragraphs do not extend the response.', 'Body 1: “Free tuition removes the financial barrier that stops low-income students from applying.” … Body 2: “A further benefit is that students from poorer families would no longer be prevented from studying by cost.”'],
    ['Language control', 'Working at home is more better for all employees because it always increases productivity.', 'Working from home can be more beneficial for employees in roles that require sustained concentration.', 'The revision removes the double comparative and limits an absolute claim.', '“Working at home is more better for all employees because it always increase the productivity and give them more free time for theirs families.”'],
    ['Cohesion', 'Firstly, children are vulnerable. Secondly, moreover, on the other hand, advertising persuades them. In conclusion, therefore, it should be restricted.', 'Children are especially vulnerable because they may interpret persuasive advertising as neutral information; this supports strict restrictions.', 'Logical relationships should come from meaning, not a chain of memorised connectors.', '“Firstly, children are vulnerable. Secondly, moreover, on the other hand, advertising persuades them. In conclusion, therefore, adverts should be banned.”'],
  ],
  discussion: [
    ['Task Response', 'The essay explains both homework views but never gives the writer’s opinion.', 'Add and maintain a clear judgement about purposeful but limited homework.', '“Discuss both views and give your opinion” contains two separate requirements.', '“Some parents believe homework builds discipline, while others argue that it takes time away from rest and family life. Both positions have supporters among teachers and researchers.”'],
    ['Essay logic', 'The car-free view is explained carefully, while the opposing view receives one dismissive sentence.', 'Explain the strongest access argument for retained car use before evaluating it.', 'Both views need fair development even when the writer prefers one.', 'Body 1: “Removing cars lowers air pollution, frees space for pedestrians, encourages local trade and makes streets safer for children.” … Body 2: “Some people disagree with car-free centres, but their arguments are not very strong.”'],
    ['Position control', 'The thesis supports free museum entry, but Body 2 and the conclusion recommend universal admission fees.', 'Choose one final judgement and align the thesis, evaluation and conclusion.', 'A discussion essay still needs one coherent writer position.', 'Thesis: “Museums should remain free so that income does not decide who sees a collection.” … Conclusion: “A modest admission fee for every visitor is therefore the fairest solution.”'],
    ['Cohesion', 'On the one hand appears in Body 1, but Body 2 begins with Secondly and never signals the relationship between the views.', 'Use a meaningful controlling sentence that introduces the broad-curriculum view as the alternative argument.', 'Paired connectors are optional; the relationship itself must be unmistakable.', 'Body 1: “On the one hand, cities benefit from removing cars from their centres.” … Body 2: “Secondly, shops in pedestrian streets report higher visitor numbers.”'],
    ['Language control', 'AI gives many benefits and many drawbacks for people in the society.', 'Artificial intelligence can improve efficiency, but consequential decisions require accountable human oversight.', 'Precise nouns and a specific contrast communicate more than generic “benefits and drawbacks”.', '“AI give many benefits and many drawbacks for the peoples in the society, and this technologies is changing how we works every day.”'],
  ],
  'problem-solution': [
    ['Task Response', 'The essay explains congestion causes and effects but offers no government action.', 'Add a developed solution paragraph combining credible alternatives with demand management.', 'The second instruction cannot be replaced by more problem description.', '“Traffic congestion delays commuters and raises pollution levels. These effects reduce productivity and damage public health in almost every large city.”'],
    ['Essay logic', 'Food waste is blamed on overbuying, but the proposed solution is to improve restaurant recycling.', 'Match household purchasing and storage causes with meal planning, portions and clearer date information.', 'A solution must act on the diagnosed cause and the population named in the prompt.', '“Households waste food mainly because they buy more than they can eat before it spoils. Restaurants should therefore be required to separate organic waste for municipal composting.”'],
    ['Task Response', 'The rural-depopulation essay gives solutions but never explains why young adults leave.', 'Develop the work-and-services causes before proposing regional investment.', 'Both halves of the question need visible coverage.', '“Regional employment schemes and better rural transport would help. Governments could also fund digital infrastructure so that remote work becomes possible outside the cities.”'],
    ['Cohesion', 'Schools should add exercise. This is because exercise is important. Therefore, children should exercise. Moreover, schools can help.', 'Schools can reduce inactivity by embedding varied, accessible movement into the normal school day.', 'The revision replaces circular repetition with a causal relationship.', '“Schools should add exercise. This is because exercise is important. Therefore, children should exercise. Moreover, schools should add exercise to the timetable.”'],
    ['Language control', 'Companies must to reduce plastic and consumers should buying less packages.', 'Companies must reduce unnecessary packaging, while consumers should choose refillable or minimally packaged products.', 'Correct modal and verb forms make the shared responsibility clear.', '“Companies must to reduce the plastic and consumers should buying less packages, because this problem are affecting to everyone.”'],
  ],
  'advantages-disadvantages': [
    ['Position control', 'The thesis says home-working benefits outweigh drawbacks, but the conclusion calls the effects evenly balanced.', 'Preserve the outweigh judgement while acknowledging that isolation must be managed.', 'The conclusion cannot silently change the comparison established by the essay.', 'Thesis: “The advantages of home working clearly outweigh its drawbacks.” … Conclusion: “Overall, the benefits and the difficulties of remote work are evenly balanced.”'],
    ['Task Response', 'The tourism essay lists benefits and costs but the prompt asks whether the advantages outweigh the disadvantages.', 'Add an explicit conditional judgement based on effective regulation.', 'An outweigh question requires comparison, not two separate lists.', '“Tourism creates employment and encourages cultural exchange. It also increases waste, raises housing costs and puts pressure on fragile heritage sites.”'],
    ['Essay logic', 'Both digital-textbook paragraphs discuss convenience; unequal access is mentioned only in the conclusion.', 'Develop access as the counterweight in Body 2 before evaluating whether it can be managed.', 'A conclusion cannot introduce the essay’s first substantial disadvantage.', 'Body 1: “Digital textbooks are convenient because a whole course fits on one device.” … Body 2: “They are also convenient because any passage can be searched instantly.”'],
    ['Cohesion', 'Living abroad is beneficial. On the contrary, it is difficult. On the contrary is used as if it meant “however”.', 'Living abroad offers substantial opportunities; however, isolation and practical insecurity can create serious pressure.', '“On the contrary” corrects a false claim, while “however” marks a contrast.', '“Living abroad broadens professional experience. On the contrary, it can be difficult to build a support network far from family.”'],
    ['Language control', 'Online shopping has more advantages because it is very convenience and gives more choices.', 'Online shopping offers greater convenience and a wider range of products, although local retail may face disruption.', 'The revision corrects the word form and expresses a qualified comparison.', '“Online shopping have more advantages because it is very convenience and give to the customers more choices than the physical shops.”'],
  ],
  'direct-questions': [
    ['Task Response', 'The essay explains why people live alone but never judges whether the development is positive or negative.', 'Give Body 2 and the conclusion an explicit overall evaluation.', 'Each direct question is a separate instruction that must be answered.', '“More adults live alone because housing has become more available to single people and because attitudes to marriage have changed. Both factors have grown stronger over the last two decades.”'],
    ['Essay logic', 'Both paragraphs explain why social media is popular; neither explains how users can judge reliability.', 'Use Body 1 for popularity and Body 2 for source verification.', 'The paragraph architecture should mirror the two questions.', 'Body 1: “Social media is popular for news because it is instant and free.” … Body 2: “It is also popular because users can follow the accounts they already trust.”'],
    ['Position control', 'Career changes are called beneficial in Body 2 but harmful in the conclusion.', 'Maintain the qualified positive judgement when changes are purposeful and supported by training.', 'The final answer must not contradict the developed evaluation.', 'Body 2: “Frequent career changes generally benefit workers who retrain deliberately.” … Conclusion: “This instability ultimately harms both employees and the companies that train them.”'],
    ['Cohesion', 'Historic buildings matter because history. Who should pay is also a question. Governments and owners.', 'Historic buildings preserve shared cultural value; their costs should therefore be shared by public authorities and private beneficiaries.', 'The revision makes the relationship between the two answers explicit.', '“Historic buildings matter because history. Who should pay is also a question. Governments and owners.”'],
    ['Language control', 'Adults has children later because life are more expensiver now, and this bring many effect to the society.', 'Adults have children later because life is more expensive now, and this brings several effects for society.', 'Subject–verb agreement, comparative form and singular–plural agreement all need correction.', '“Adults has children later because life are more expensiver now, and this bring many effect to the society.”'],
  ],
};

const meta: Record<EssayTypeId, Pick<ReviewLesson, 'shortLabel' | 'instruction' | 'decisiveCheck'>> = {
  opinion: { shortLabel: 'Opinion', instruction: 'State and maintain one visible degree of agreement.', decisiveCheck: 'Can a reader underline the same position in the thesis and conclusion?' },
  discussion: { shortLabel: 'Discussion', instruction: 'Develop both views and give a clear writer opinion.', decisiveCheck: 'Are both views represented fairly before the writer evaluates them?' },
  'problem-solution': { shortLabel: 'Problem–Solution', instruction: 'Cover every requested cause, problem or solution and match responses to diagnoses.', decisiveCheck: 'Does each proposed response act on a problem or cause the essay actually developed?' },
  'advantages-disadvantages': { shortLabel: 'Advantages–Disadvantages', instruction: 'Discuss both sides and give an explicit comparison when “outweigh” is asked.', decisiveCheck: 'Does the final judgement use the same comparison as the thesis and body evaluation?' },
  'direct-questions': { shortLabel: 'Direct Questions', instruction: 'Answer both explicit questions separately and completely.', decisiveCheck: 'Can a reader point to one developed answer for Question 1 and one for Question 2?' },
};

export const REVIEW_LESSONS: ReviewLesson[] = BODY_ONE_LESSONS.map((source) => ({
  id: source.id, ...meta[source.id], layers: commonLayers,
  cases: source.examples.map((example, index) => ({ title: example.title, prompt: example.prompt, draft: categorySets[source.id][index][4], category: categorySets[source.id][index][0], issue: categorySets[source.id][index][1], revision: categorySets[source.id][index][2], explanation: categorySets[source.id][index][3], model: modelByPrompt.get(example.prompt) ?? [] })),
}));

/**
 * Elige tres capas distractoras sin dejar ninguna sistemáticamente fuera.
 *
 * Antes era `layers.filter((l) => l !== category).slice(0, 3)`. Con cinco capas, `slice(0, 3)`
 * descarta siempre las dos últimas de la lista, así que «Language control» —la última— solo
 * llegaba a aparecer en la rejilla cuando ERA la respuesta. Se acertaban 5 de las 20
 * preguntas del taller con esa sola regla, sin leer el enunciado.
 *
 * La ventana rota según el caso, de modo que a lo largo de la serie cada capa aparece como
 * distractor. El desplazamiento sale de un hash del texto del problema, no del índice: así
 * dos casos contiguos no comparten reparto y el resultado no depende del orden del array.
 */
export function pickDistractors(layers: string[], category: string, seed: string): string[] {
  const pool = layers.filter((layer) => layer !== category);
  if (pool.length <= 3) return pool;

  let hash = 0x811c9dc5;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  const start = (hash >>> 0) % pool.length;
  return Array.from({ length: 3 }, (_, offset) => pool[(start + offset) % pool.length]);
}
