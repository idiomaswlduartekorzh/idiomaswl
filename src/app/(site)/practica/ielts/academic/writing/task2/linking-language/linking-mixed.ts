/**
 * Las dos actividades que solo tienen sentido MEZCLADAS.
 *
 * Se separan de `linking-data.ts` a propósito: allí cada familia enseña lo suyo, y dentro de
 * una familia la respuesta siempre es de esa familia. Aquí no se dice de cuál es, así que
 * hay que leer la relación antes de elegir el conector. Es la misma diferencia que entre
 * practicar Body 1 y escribir el ensayo entero.
 *
 * El contenido viene tal cual del taller anterior: estaba bien escrito, solo estaba solo.
 */

export type MixedQuestion = {
  before: string;
  after: string;
  correct: string;
  options: string[];
  explanation: string;
};

export const MIXED_QUIZ: MixedQuestion[] = [
  {
    before: 'Online learning has democratised access to higher education for students worldwide.',
    after: ', it has opened professional development pathways for working adults who cannot attend traditional campuses.',
    correct: 'Furthermore',
    options: ['Furthermore', 'However', 'As a result', 'For example'],
    explanation: '"Furthermore" adds a parallel positive point — both clauses support the same pro-online-learning argument. "However" would contradict it. "As a result" would imply the first clause caused the second (it didn\'t). "For example" would introduce a specific case — but the second clause is another general benefit, not an example.',
  },
  {
    before: 'Renewable energy sources such as solar and wind power have become significantly more affordable in recent years.',
    after: ', many developing nations still rely heavily on fossil fuels due to the high upfront cost of transitioning their infrastructure.',
    correct: 'However',
    options: ['However', 'Furthermore', 'Therefore', 'For instance'],
    explanation: '"However" signals that what follows contradicts or qualifies what was said before. The first clause is positive about renewables; the second introduces an obstacle. "Furthermore" would add a parallel positive point (wrong — this is a contrast). "Therefore" implies causality (wrong — lower costs don\'t cause continued fossil fuel use). "For instance" would introduce an example of the first clause.',
  },
  {
    before: 'The rapid expansion of e-commerce has fundamentally transformed consumer purchasing habits across the globe.',
    after: ', many traditional high-street retailers have been forced to permanently close their stores.',
    correct: 'As a result',
    options: ['As a result', 'In addition', 'For example', 'Nevertheless'],
    explanation: '"As a result" correctly identifies store closures as the EFFECT of e-commerce growth. The first clause is the CAUSE; the second is its CONSEQUENCE. "In addition" would add a parallel point (not a consequence). "For example" would introduce an illustration of e-commerce growth (not what follows). "Nevertheless" would introduce a contrast despite the cause.',
  },
  {
    before: 'Several countries have achieved significant reductions in car dependency through sustained investment in cycling infrastructure.',
    after: ', Amsterdam now handles over 40% of all daily urban trips by bicycle following three decades of dedicated investment in cycle lanes and storage facilities.',
    correct: 'For instance',
    options: ['For instance', 'However', 'Consequently', 'In conclusion'],
    explanation: '"For instance" introduces Amsterdam as a specific, concrete illustration of the general claim. "However" would contradict the claim about car dependency reduction. "Consequently" would imply Amsterdam\'s statistics are a result of the general claim (circular logic). "In conclusion" signals the end of an essay — far too early here.',
  },
  {
    before: 'Public transport systems require substantial upfront government investment.',
    after: ', yet the long-term environmental, social and economic returns on this expenditure vastly outweigh the initial costs for any city serious about sustainability.',
    correct: 'Admittedly',
    options: ['Admittedly', 'Furthermore', 'For example', 'Consequently'],
    explanation: '"Admittedly" introduces a concession — acknowledging a valid point from the opposing view BEFORE countering it. The structure is: "Admittedly [counterargument], yet/however [your stronger argument wins]." This is It is what separates a real concession from a hedge. "Furthermore" would add another supporting point. "For example" would introduce an example. "Consequently" would show a result.',
  },
  {
    before: 'The Nordic countries have consistently achieved high scores on global education rankings through sustained investment in teacher training and school resources.',
    after: ', East Asian nations such as South Korea and Singapore have reached the top of international PISA tables by prioritising educator quality and curriculum rigour.',
    correct: 'Similarly',
    options: ['Similarly', 'However', 'As a result', 'Admittedly'],
    explanation: '"Similarly" introduces a parallel case that reinforces the same point — both examples support the claim about investing in education quality. "However" would contradict the Nordic success story. "As a result" would imply East Asian success was caused by Nordic investment. "Admittedly" would acknowledge a weakness — East Asian success actually supports the argument.',
  },
  {
    before: 'Both individual behaviour change and systemic government policy have critical and complementary roles to play in addressing the climate crisis.',
    after: ', only a sustained, coordinated global effort — combining personal responsibility with ambitious regulation — can lead society towards a genuinely sustainable future.',
    correct: 'In conclusion',
    options: ['In conclusion', 'Furthermore', 'For instance', 'However'],
    explanation: '"In conclusion" signals the final synthesis of the essay\'s argument, drawing together the key points into a definitive statement. This sentence wraps up the entire essay. "Furthermore" would add another supporting point (but the essay is ending). "For instance" would introduce an example (premature in a conclusion). "However" would introduce a contrast (not appropriate for a closing statement).',
  },
  {
    before: 'Remote working undeniably offers employees greater flexibility and in many cases increases individual productivity.',
    after: ', it raises serious concerns about workplace cohesion, employee mental health, and the erosion of the boundary between professional and personal life that cannot simply be dismissed.',
    correct: 'Nevertheless',
    options: ['Nevertheless', 'Furthermore', 'For instance', 'In conclusion'],
    explanation: '"Nevertheless" (like "However") introduces a contrast — but is slightly stronger, indicating that the contrasting point holds DESPITE what was just acknowledged. It is often used after conceding a point: "I admit X is true. Nevertheless, Y is an even more important consideration." "Furthermore" would add a supporting point. "For instance" would add an example. "In conclusion" would end the essay prematurely.',
  },
];

export const FIX_PARAGRAPH = {
  original: 'In conclusion, technology has clearly changed how people communicate. Furthermore, there are both benefits and drawbacks to consider carefully. However, for example, social media platforms allow people to stay in contact across great distances. Moreover, some experts argue that face-to-face communication is becoming rarer. Therefore, in conclusion, we must all think carefully about how we use digital technology going forward.',
  problems: [
    { label: '"In conclusion" at the start of a BODY paragraph', fix: 'Never use "In conclusion" in a body paragraph. It signals the end of the essay. Use "It is clear that..." or just state your point directly.' },
    { label: '"Furthermore, there are both benefits and drawbacks" — vague and non-committal', fix: '"Furthermore" signals addition, but "both benefits and drawbacks" adds nothing specific. This sentence says nothing. Remove it and replace with an actual developed point.' },
    { label: '"However, for example" — two connectors with conflicting functions', fix: '"However" (contrast) and "for example" (illustration) cannot be combined. Choose one: if it\'s a contrast use "However,"; if it\'s an example use "For example,".' },
    { label: '"Moreover, some experts argue..." — "Moreover" signals addition, but this introduces a contrasting view', fix: 'Use "However" or "In contrast" when introducing a view that contradicts or contrasts with the previous point. "Moreover" is for adding a supporting parallel point.' },
    { label: '"Therefore, in conclusion" — two conclusion connectors colliding', fix: '"Therefore" (cause-effect) and "in conclusion" (essay ending) have different functions. Use only one. Here, neither is needed — just state your conclusion directly.' },
  ],
  repaired: 'A repaired version keeps one connector per relationship: “Technology has undeniably transformed how people communicate. Social media platforms, for instance, allow contact across great distances. Some researchers argue, however, that face-to-face conversation is becoming rarer.”',
};
