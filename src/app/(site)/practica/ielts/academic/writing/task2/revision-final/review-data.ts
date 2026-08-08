import type { EssayTypeId } from '../introduccion/introduction-data';
import { BODY_ONE_LESSONS } from '../body-1/body-one-data';

export type ReviewLayer = { label: string; tone: 'claim' | 'development' | 'contrast' | 'example' | 'link'; question: string };
export type ReviewCase = { title: string; prompt: string; draft: string; issue: string; category: string; revision: string; explanation: string };
export type ReviewLesson = { id: EssayTypeId; shortLabel: string; instruction: string; decisiveCheck: string; layers: ReviewLayer[]; cases: ReviewCase[] };

const commonLayers: ReviewLayer[] = [
  { label: 'Task Response', tone: 'claim', question: 'Did I answer every instruction and make any required position visible?' },
  { label: 'Essay logic', tone: 'development', question: 'Does each paragraph perform one necessary and distinct job?' },
  { label: 'Position control', tone: 'contrast', question: 'Do the thesis, body links and conclusion preserve the same judgement?' },
  { label: 'Cohesion', tone: 'link', question: 'Are relationships clear without mechanical or excessive linking phrases?' },
  { label: 'Language control', tone: 'example', question: 'Can I fix specific vocabulary, grammar or punctuation errors without rewriting blindly?' },
];

const categorySets: Record<EssayTypeId, Array<[string, string, string, string]>> = {
  opinion: [
    ['Position control', 'I agree in the thesis, but the conclusion says that both sides are equally convincing.', 'Restate the same degree of agreement in the conclusion.', 'A changed position makes the response internally inconsistent.'],
    ['Task Response', 'The essay discusses transport spending but never states whether public transport should receive more money than roads.', 'Add an explicit comparative judgement to the thesis and maintain it.', 'An opinion task requires a visible answer, not a neutral topic discussion.'],
    ['Essay logic', 'Body 1 and Body 2 both argue that free university improves access for low-income students.', 'Keep access in one paragraph and develop a distinct funding or social-capacity argument in the other.', 'Two repeated body paragraphs do not extend the response.'],
    ['Language control', 'Working at home is more better for all employees because it always increases productivity.', 'Working from home can be more beneficial for employees in roles that require sustained concentration.', 'The revision removes the double comparative and limits an absolute claim.'],
    ['Cohesion', 'Firstly, children are vulnerable. Secondly, moreover, on the other hand, advertising persuades them. In conclusion, therefore, it should be restricted.', 'Children are especially vulnerable because they may interpret persuasive advertising as neutral information; this supports strict restrictions.', 'Logical relationships should come from meaning, not a chain of memorised connectors.'],
  ],
  discussion: [
    ['Task Response', 'The essay explains both homework views but never gives the writer’s opinion.', 'Add and maintain a clear judgement about purposeful but limited homework.', '“Discuss both views and give your opinion” contains two separate requirements.'],
    ['Essay logic', 'The car-free view is explained carefully, while the opposing view receives one dismissive sentence.', 'Explain the strongest access argument for retained car use before evaluating it.', 'Both views need fair development even when the writer prefers one.'],
    ['Position control', 'The thesis supports free museum entry, but Body 2 and the conclusion recommend universal admission fees.', 'Choose one final judgement and align the thesis, evaluation and conclusion.', 'A discussion essay still needs one coherent writer position.'],
    ['Cohesion', 'On the one hand appears in Body 1, but Body 2 begins with Secondly and never signals the relationship between the views.', 'Use a meaningful controlling sentence that introduces the broad-curriculum view as the alternative argument.', 'Paired connectors are optional; the relationship itself must be unmistakable.'],
    ['Language control', 'AI gives many benefits and many drawbacks for people in the society.', 'Artificial intelligence can improve efficiency, but consequential decisions require accountable human oversight.', 'Precise nouns and a specific contrast communicate more than generic “benefits and drawbacks”.'],
  ],
  'problem-solution': [
    ['Task Response', 'The essay explains congestion causes and effects but offers no government action.', 'Add a developed solution paragraph combining credible alternatives with demand management.', 'The second instruction cannot be replaced by more problem description.'],
    ['Essay logic', 'Food waste is blamed on overbuying, but the proposed solution is to improve restaurant recycling.', 'Match household purchasing and storage causes with meal planning, portions and clearer date information.', 'A solution must act on the diagnosed cause and the population named in the prompt.'],
    ['Task Response', 'The rural-depopulation essay gives solutions but never explains why young adults leave.', 'Develop the work-and-services causes before proposing regional investment.', 'Both halves of the question need visible coverage.'],
    ['Cohesion', 'Schools should add exercise. This is because exercise is important. Therefore, children should exercise. Moreover, schools can help.', 'Schools can reduce inactivity by embedding varied, accessible movement into the normal school day.', 'The revision replaces circular repetition with a causal relationship.'],
    ['Language control', 'Companies must to reduce plastic and consumers should buying less packages.', 'Companies must reduce unnecessary packaging, while consumers should choose refillable or minimally packaged products.', 'Correct modal and verb forms make the shared responsibility clear.'],
  ],
  'advantages-disadvantages': [
    ['Position control', 'The thesis says home-working benefits outweigh drawbacks, but the conclusion calls the effects evenly balanced.', 'Preserve the outweigh judgement while acknowledging that isolation must be managed.', 'The conclusion cannot silently change the comparison established by the essay.'],
    ['Task Response', 'The tourism essay lists benefits and costs but the prompt asks whether the advantages outweigh the disadvantages.', 'Add an explicit conditional judgement based on effective regulation.', 'An outweigh question requires comparison, not two separate lists.'],
    ['Essay logic', 'Both digital-textbook paragraphs discuss convenience; unequal access is mentioned only in the conclusion.', 'Develop access as the counterweight in Body 2 before evaluating whether it can be managed.', 'A conclusion cannot introduce the essay’s first substantial disadvantage.'],
    ['Cohesion', 'Living abroad is beneficial. On the contrary, it is difficult. On the contrary is used as if it meant “however”.', 'Living abroad offers substantial opportunities; however, isolation and practical insecurity can create serious pressure.', '“On the contrary” corrects a false claim, while “however” marks a contrast.'],
    ['Language control', 'Online shopping has more advantages because it is very convenience and gives more choices.', 'Online shopping offers greater convenience and a wider range of products, although local retail may face disruption.', 'The revision corrects the word form and expresses a qualified comparison.'],
  ],
  'direct-questions': [
    ['Task Response', 'The essay explains why people live alone but never judges whether the development is positive or negative.', 'Give Body 2 and the conclusion an explicit overall evaluation.', 'Each direct question is a separate instruction that must be answered.'],
    ['Essay logic', 'Both paragraphs explain why social media is popular; neither explains how users can judge reliability.', 'Use Body 1 for popularity and Body 2 for source verification.', 'The paragraph architecture should mirror the two questions.'],
    ['Position control', 'Career changes are called beneficial in Body 2 but harmful in the conclusion.', 'Maintain the qualified positive judgement when changes are purposeful and supported by training.', 'The final answer must not contradict the developed evaluation.'],
    ['Cohesion', 'Historic buildings matter because history. Who should pay is also a question. Governments and owners.', 'Historic buildings preserve shared cultural value; their costs should therefore be shared by public authorities and private beneficiaries.', 'The revision makes the relationship between the two answers explicit.'],
    ['Language control', 'People buys second-hand products because they are more cheaper and this are positive.', 'People buy second-hand products because they cost less, and this trend is generally positive.', 'Subject–verb agreement, comparative form and pronoun reference all need correction.'],
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
  cases: source.examples.map((example, index) => ({ title: example.title, prompt: example.prompt, draft: categorySets[source.id][index][1], category: categorySets[source.id][index][0], issue: categorySets[source.id][index][1], revision: categorySets[source.id][index][2], explanation: categorySets[source.id][index][3] })),
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
