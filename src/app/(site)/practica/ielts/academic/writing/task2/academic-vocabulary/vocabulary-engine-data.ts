/**
 * Los doce ejercicios del motor de vocabulario, mezclando las ocho funciones.
 *
 * NINGUNA FRASE DE AQUÍ APARECE EN LAS LECCIONES
 *
 * Es la corrección del defecto que la auditoría de agosto de 2026 encontró en las ocho
 * unidades de Task 1: la lección imprimía la respuesta y el motor preguntaba por ella, entre
 * el 8 % y el 91 % de las veces según la unidad. Las ocho lecciones de aquí hablan de vivienda
 * urbana, teletrabajo, tráfico, vacunas y transporte público; el motor habla de agricultura,
 * museos, reciclaje, turismo, idiomas y bibliotecas. La compuerta lo mide por solapamiento de
 * palabras con carga, no a ojo.
 *
 * LOS TRES NIVELES
 *
 *   1. NOMBRAR la función. Ver una frase y decir qué trabajo hace la palabra marcada. Sin
 *      esto, el vocabulario se memoriza como lista y se usa donde no toca.
 *   2. ELEGIR la palabra precisa. Cuatro versiones de la misma idea; la buena nombra el
 *      respecto en el que la afirmación es cierta. Los tres fallos son los tres reales:
 *      quedarse en la palabra vaga, pasarse de fuerza, y bajar el registro.
 *   3. DIAGNOSTICAR el fallo. Se da una frase con una palabra mal elegida y se pregunta qué
 *      falla. Es lo que hace falta para revisar el propio borrador, y no se entrena
 *      produciendo.
 *
 * LOS DISTRACTORES SON LARGOS A PROPÓSITO
 *
 * La regla del proyecto es alargar distractores, nunca acortar la correcta: recortar la buena
 * le quita la precisión que se está enseñando. Cada distractor crece explicando el error que
 * representa.
 */

export type EngineDrill = {
  level: 1 | 2 | 3;
  title: string;
  sentence: string;
  question: string;
  options: { text: string; why: string }[];
  /** Índice tal y como está escrito; la posición la reparte `placeOption`. */
  correct: number;
};

export const ENGINE_DRILLS: EngineDrill[] = [
  // ── Nivel 1 · nombrar la función ───────────────────────────────────────────
  {
    level: 1,
    title: 'Level 1 · Name the function',
    sentence: 'Rural populations tend to have poorer access to specialist healthcare.',
    question: 'What job is “tend to” doing in this sentence?',
    correct: 0,
    options: [
      { text: 'Hedging: it reports a pattern without claiming every rural population follows it.', why: 'Correct. The claim survives the one counter-example a reader will think of, which is exactly what a hedge buys you.' },
      { text: 'Asserting: it strengthens the claim so the reader knows the writer stands behind it.', why: 'It does the opposite. “Tend to” lowers the temperature of the claim rather than raising it.' },
      { text: 'Quantifying: it states how many rural populations are affected by the problem.', why: 'No quantity appears anywhere in the sentence. “Tend to” reports a tendency, not a proportion.' },
      { text: 'Causing: it names which of the two things in the sentence produces the other.', why: 'No cause is claimed. The sentence reports a state of affairs, not a mechanism behind it.' },
    ],
  },
  {
    level: 1,
    title: 'Level 1 · Name the function',
    sentence: 'According to agricultural economists, crop yields have plateaued since 2010.',
    question: 'What job is “according to” doing here?',
    correct: 0,
    options: [
      { text: 'Attributing: it names whose finding this is, so it does not read as the writer’s own.', why: 'Correct. The main clause is left free to carry the finding, and the reader knows where it came from.' },
      { text: 'Hedging: it softens the claim so that the writer does not have to defend it fully.', why: 'The claim itself is not softened at all — “have plateaued” is stated flatly. Only its source was named.' },
      { text: 'Evaluating: it says whether the plateau in crop yields is a good or a bad thing.', why: 'No judgement appears. The sentence reports what happened and says nothing about whether it is welcome.' },
      { text: 'Quantifying: it says how many agricultural economists hold this particular view.', why: 'No number is given. Naming a group is not the same as counting it.' },
    ],
  },
  {
    level: 1,
    title: 'Level 1 · Name the function',
    sentence: 'The recycling subsidy proved counterproductive, increasing the waste it was meant to reduce.',
    question: 'What job is “counterproductive” doing here?',
    correct: 0,
    options: [
      { text: 'Evaluating: it judges the subsidy, and names the respect — it worked against its own aim.', why: 'Correct. No other word in this family carries the reversal, which is the whole point of the sentence.' },
      { text: 'Causing: it names the mechanism by which the subsidy produced more waste than before.', why: 'The mechanism is in the participle clause that follows. “Counterproductive” delivers the verdict, not the mechanism.' },
      { text: 'Asserting: it raises the strength of the claim above what the evidence would support.', why: 'It is a judgement, not an intensifier. Nothing here makes the claim stronger or weaker.' },
      { text: 'Attributing: it reports that somebody else considers the subsidy to have failed.', why: 'Nobody is named. “Proved” makes this the writer’s own verdict.' },
    ],
  },
  {
    level: 1,
    title: 'Level 1 · Name the function',
    sentence: 'A significant proportion of food waste occurs before produce ever reaches a shop.',
    question: 'What job is “a significant proportion of” doing here?',
    correct: 0,
    options: [
      { text: 'Quantifying: it reports a share large enough to matter, without inventing a figure.', why: 'Correct. It claims more than a trivial amount and stops there, which is all an essay without data can support.' },
      { text: 'Asserting: it states that the amount of food waste is beyond any reasonable doubt.', why: 'Nothing here is asserted as certain. The phrase reports a quantity, and a deliberately imprecise one.' },
      { text: 'Evaluating: it judges whether this amount of food waste is acceptable or excessive.', why: '“Significant” here means sizeable, not deserving of criticism. No verdict is given.' },
      { text: 'Hedging: it softens the claim about where in the chain the food waste occurs.', why: 'The location claim is stated flatly. The imprecision is in the quantity, and reporting a share honestly is not hedging.' },
    ],
  },

  // ── Nivel 2 · elegir la palabra precisa ────────────────────────────────────
  {
    level: 2,
    title: 'Level 2 · Choose the precise version',
    sentence: 'Museums are good for kids.',
    question: 'Which version says the same thing at the register the task expects?',
    correct: 0,
    options: [
      { text: 'Museum visits are beneficial to children’s understanding of their own history.', why: 'Correct. “Beneficial to” names the respect, and “children” replaces a word that belongs to speech.' },
      { text: 'Museums are extremely good for kids in a very large number of different ways.', why: 'Length is not precision. “Good” and “kids” both survived, and the added words say nothing.' },
      { text: 'Museums are undoubtedly essential to the intellectual development of all children.', why: 'The register rose and the claim rose with it. “Undoubtedly”, “essential” and “all” are three overclaims.' },
      { text: 'Museum visits are beneficial for children in a number of quite important respects.', why: 'Two problems: “beneficial” takes “to”, and “important respects” promises to name them and does not.' },
    ],
  },
  {
    level: 2,
    title: 'Level 2 · Choose the precise version',
    sentence: 'A lot of people don’t recycle.',
    question: 'Which version keeps the claim and fixes the register?',
    correct: 0,
    options: [
      { text: 'A substantial proportion of households do not separate their waste for recycling.', why: 'Correct. The quantifier is neutral, the contraction is gone, and “separate their waste” names the actual behaviour.' },
      { text: 'Lots of people out there still don’t bother to recycle their household waste.', why: 'Four drops: “lots of”, “out there”, the contraction, and “bother to”. The sentence got more informal, not less.' },
      { text: 'The overwhelming majority of people do not recycle any of their household waste.', why: 'The register is fixed and the quantity is now an overclaim — “a lot of” is nowhere near “the overwhelming majority”.' },
      { text: 'A significant amount of households do not separate their waste for recycling.', why: 'The register is fixed and one word is still wrong: “amount” measures a mass, and households come in units you can count.' },
    ],
  },
  {
    level: 2,
    title: 'Level 2 · Choose the precise version',
    sentence: 'Someone needs to fix the plastic in the oceans.',
    question: 'Which version turns this into an actual proposal?',
    correct: 0,
    options: [
      { text: 'Coastal authorities should require fishing fleets to return discarded netting to port.', why: 'Correct. The actor, the mechanism and the target are all named, so a reader can picture the measure happening.' },
      { text: 'Someone really needs to fix the plastic in the oceans as soon as they possibly can.', why: 'Two intensifiers and still no measure. “Fix” proposes nothing however urgently it is said.' },
      { text: 'Coastal authorities should implement more concern about the plastic in the oceans.', why: '“Implement” takes a policy or a scheme, not an abstract noun. Concern cannot be implemented.' },
      { text: 'Everybody should try to be a great deal more careful about the plastic they discard.', why: 'The actor became “everybody”, which is nobody. A proposal needs someone who can actually carry it out.' },
    ],
  },
  {
    level: 2,
    title: 'Level 2 · Choose the precise version',
    sentence: 'Cheap streaming makes new musicians earn less.',
    question: 'Which version names the causal relationship properly?',
    correct: 0,
    options: [
      { text: 'Low streaming royalties give rise to falling earnings among emerging musicians.', why: 'Correct. “Give rise to” takes its noun directly, and the sentence names what falls and for whom.' },
      { text: 'Low streaming royalties make falling earnings happen among emerging musicians.', why: '“Makes … happen” is the construction reached for when the verb is missing. The register did not move.' },
      { text: 'Low streaming royalties are associated with falling earnings among emerging musicians.', why: 'This retreats to a correlation, and the royalty rate driving the earnings is a link an essay can defend.' },
      { text: 'Low streaming royalties give rise for falling earnings among emerging musicians.', why: 'The verb is right and the preposition is wrong: “give rise to” takes its object with “to”, or none at all.' },
    ],
  },

  // ── Nivel 3 · diagnosticar el fallo ────────────────────────────────────────
  {
    level: 3,
    title: 'Level 3 · Diagnose the wrong word',
    sentence: 'Learning a second language causes higher lifetime earnings.',
    question: 'One word is doing more work than the evidence allows. Which problem is it?',
    correct: 0,
    options: [
      { text: '“Causes” claims a direction nobody has shown; the honest verb reports an association.', why: 'Correct. People who learn languages differ from those who do not in many ways, and any of those could explain the gap.' },
      { text: 'The register is too informal for an academic response and should be raised.', why: 'Every word here is neutral academic English. The problem is what the sentence claims, not how it sounds.' },
      { text: 'The quantity is overstated: “higher earnings” claims more than the data supports.', why: '“Higher” is already the most cautious comparative available. The overclaim is in the verb.' },
      { text: 'The claim needs attributing to a source before it can be used in an essay.', why: 'Attribution would help, and it would not repair the sentence: a cause attributed is still a cause claimed.' },
    ],
  },
  {
    level: 3,
    title: 'Level 3 · Diagnose the wrong word',
    sentence: 'Studies have proven that public libraries reduce crime in the surrounding area.',
    question: 'What is wrong with this sentence?',
    correct: 0,
    options: [
      { text: '“Proven” overstates what a study can do; research shows, indicates or suggests.', why: 'Correct. Proof belongs to mathematics. Examiners also read “studies have proven” as a memorised phrase.' },
      { text: 'The subject and verb do not agree, so the sentence is grammatically incorrect.', why: '“Studies have” agrees correctly. The problem is a word choice, not the grammar.' },
      { text: 'The register drops because “studies” is too informal for an academic response.', why: '“Studies” is standard academic English. Nothing here is informal.' },
      { text: 'The causal direction is reversed: crime reduction is what leads to more libraries.', why: 'That would be an odd claim, and it is not the problem. The direction is plausible; the certainty is not.' },
    ],
  },
  {
    level: 3,
    title: 'Level 3 · Diagnose the wrong word',
    sentence: 'The closure of village schools was detrimental for families in remote areas.',
    question: 'What is wrong with this sentence?',
    correct: 0,
    options: [
      { text: 'The preposition: “detrimental” takes “to”, and “for” is carried over from Spanish.', why: 'Correct. It is a collocation error rather than a grammar one, which is why spell-checkers never flag it.' },
      { text: 'The adjective is too strong for the situation and should be softened with a hedge.', why: '“Detrimental” is the right strength for a school closing in a remote area. Only its preposition is wrong.' },
      { text: 'The claim needs a quantity: how many families in remote areas were affected?', why: 'A figure would add detail, and its absence is not an error. The sentence has a specific fault elsewhere.' },
      { text: 'The register is too formal, and a plainer word would communicate the point better.', why: 'Formality is not a fault in an academic response, and “detrimental” is exactly the register the task expects.' },
    ],
  },
  {
    level: 3,
    title: 'Level 3 · Diagnose the wrong word',
    sentence: 'The majority of the plastic in the ocean comes from discarded fishing equipment.',
    question: 'What is wrong with this sentence?',
    correct: 0,
    options: [
      { text: '“The majority of” counts things, and plastic is uncountable here; the word is “most”.', why: 'Correct. Use “the majority of” with things you can count, and “most of” with an uncountable mass.' },
      { text: 'The verb should be plural, because “majority” always refers to more than one thing.', why: 'The verb agrees with what follows “of”, and “plastic” is singular. “Comes” is correct.' },
      { text: 'The claim is too strong: without a source, no proportion at all can be reported.', why: 'A share can be claimed honestly without a source. The fault is which quantifier was used, not that one was.' },
      { text: 'The register drops because “fishing equipment” is too conversational for an essay.', why: '“Fishing equipment” is the neutral term, and it is the one used in the research on this subject.' },
    ],
  },
];
