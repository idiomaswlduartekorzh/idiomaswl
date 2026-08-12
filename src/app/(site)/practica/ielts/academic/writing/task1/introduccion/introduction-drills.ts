/**
 * Los ejercicios del motor de introducción.
 *
 * Cada uno se cuelga de una paráfrasis de `introduction-data.ts` con `worked: false`: el
 * gráfico existe, el modelo existe, y la lección NO lo ha resuelto encima. Antes los once
 * ejercicios usaban los mismos gráficos que la lección ya tenía trabajados, y diez de las
 * once respuestas estaban impresas más arriba —cinco palabra por palabra—, así que el
 * ejercicio se resolvía subiendo a copiar.
 *
 * `paraphraseFor()` es lo que impide que vuelva a pasar: si alguien marca uno de estos
 * gráficos como `worked: true`, la compuerta lo caza.
 *
 * CADA OPCIÓN LLEVA SU MOTIVO. Un distractor que solo dice «incorrect» no enseña nada; el
 * estudiante tiene que saber qué error concreto cometió ESA opción, también si no la eligió.
 */

import { paraphraseFor } from './introduction-data'
import type { Paraphrase } from './introduction-data'

export type Option = { text: string; why: string }

/** Un hueco del ejercicio de construcción: una sola opción defendible y dos con su fallo. */
export type Gap = { answer: string; options: Option[] }

export type ClozeDrill = {
  source: Paraphrase
  before: string
  after: string
  gaps: Gap[]
}

export type ChoiceDrill = {
  source: Paraphrase
  question: string
  options: Option[]
  /** Índice en el array tal y como está escrito. La posición de pantalla la reparte `placeOption`. */
  correct: number
}

/**
 * Nivel 1 · Construir la paráfrasis.
 *
 * Los tres errores que se repiten en cada hueco: copiar el enunciado, romper la concordancia
 * o cambiar lo que dice el gráfico. Son los tres que cuestan puntos de verdad.
 */
export const CLOZE_DRILLS: ClozeDrill[] = [
  {
    source: paraphraseFor('bar', 3),
    before: 'The bar chart',
    after: 'in 2010.',
    gaps: [
      {
        answer: 'provides data on',
        options: [
          { text: 'provides data on', why: 'Correct. It reports what the chart contains, and it is not the verb the prompt used.' },
          { text: 'shows', why: 'This is the prompt’s own verb. Repeating it means the examiner sees no paraphrase at all.' },
          { text: 'proves', why: 'A chart records numbers; it does not prove anything. This overstates what the visual can do.' },
        ],
      },
      {
        answer: 'visitor numbers',
        options: [
          { text: 'visitor numbers', why: 'Correct. Same information, different noun phrase: a real structural change.' },
          { text: 'the number of visitors', why: 'This is the prompt’s wording rewritten in the same order. Only the words around it changed.' },
          { text: 'visitor opinions', why: 'The chart counts people, not views. Changing the meaning costs more than not paraphrasing.' },
        ],
      },
      {
        answer: 'at four museums',
        options: [
          { text: 'at four museums', why: 'Correct. It keeps the number and the place exactly as the chart labels them.' },
          { text: 'at four galleries', why: 'A gallery is not a museum. Labels on the visual must survive the paraphrase.' },
          { text: 'at several museums', why: 'The chart names four. “Several” throws away information you were given.' },
        ],
      },
    ],
  },
  {
    source: paraphraseFor('table', 3),
    before: 'The table',
    after: 'in 2024.',
    gaps: [
      {
        answer: 'presents',
        options: [
          { text: 'presents', why: 'Correct. A neutral reporting verb, and not the one in the prompt.' },
          { text: 'shows', why: 'The prompt already says “shows”. Reusing it wastes the easiest paraphrase in the sentence.' },
          { text: 'present', why: '“The table” is singular, so the verb needs an -s. Grammar errors here are visible immediately.' },
        ],
      },
      {
        answer: 'tourist satisfaction ratings',
        options: [
          { text: 'tourist satisfaction ratings', why: 'Correct. It turns the prompt’s clause into a noun phrase, which is the structural change examiners look for.' },
          { text: 'how tourists rated', why: 'This is the prompt’s clause, word for word. Nothing has been restructured.' },
          { text: 'tourist complaints', why: 'The table records excellent and good as well as poor. Reading only the negatives misreports it.' },
        ],
      },
      {
        answer: 'for four facilities',
        options: [
          { text: 'for four facilities', why: 'Correct. Four is what the table has, and “facilities” covers all of them.' },
          { text: 'for every facility', why: 'The table lists four. “Every” claims a completeness the visual does not support.' },
          { text: 'for four hotels', why: 'Accommodation is one row of four. Naming a hotel drops transport, food and guides.' },
        ],
      },
    ],
  },
  {
    source: paraphraseFor('line', 3),
    before: 'The line graph',
    after: 'over a ten-year period.',
    gaps: [
      {
        answer: 'presents',
        options: [
          { text: 'presents', why: 'Correct. It reports the content without repeating the prompt or adding a claim.' },
          { text: 'shows', why: 'Straight from the prompt. The verb is the cheapest word to change, so leaving it stands out.' },
          { text: 'explains', why: 'To explain is to give reasons. The graph shows how many visits, never why.' },
        ],
      },
      {
        answer: 'weekly library attendance',
        options: [
          { text: 'weekly library attendance', why: 'Correct. One noun replaces the prompt’s whole phrase, and the meaning survives.' },
          { text: 'the number of weekly visits', why: 'The prompt’s exact words. This is copying with the order preserved.' },
          { text: 'weekly library membership', why: 'A visit is not a membership. Someone can visit weekly without being a member.' },
        ],
      },
      {
        answer: 'among three groups of users',
        options: [
          { text: 'among three groups of users', why: 'Correct. Three groups, described the way the graph labels them.' },
          { text: 'among three age groups', why: 'The graph separates students, families and retirees — not ages. Two of those are not age bands.' },
          { text: 'among all library users', why: 'The graph tracks three groups, not the total. This makes the sentence describe a different graph.' },
        ],
      },
    ],
  },
  {
    source: paraphraseFor('pie', 3),
    before: 'The pie chart',
    after: 'of the year.',
    gaps: [
      {
        answer: 'depicts',
        options: [
          { text: 'depicts', why: 'Correct. A reporting verb that the prompt did not use.' },
          { text: 'shows', why: 'The prompt’s verb again. Change it: it costs one word and it is the first thing read.' },
          { text: 'depict', why: 'One chart, so the verb is singular. Check the number before you choose the verb.' },
        ],
      },
      {
        answer: 'the proportion of park visitors',
        options: [
          { text: 'the proportion of park visitors', why: 'Correct. “Proportion” is what a pie chart measures, and it is not the prompt’s word.' },
          { text: 'the percentage of visitors', why: '“Percentage” comes straight from the prompt. It is the easiest synonym in Task 1 to miss.' },
          { text: 'the number of park visitors', why: 'A pie chart gives shares of a whole, not totals. There is no number of visitors on it.' },
        ],
      },
      {
        answer: 'arriving in each season',
        options: [
          { text: 'arriving in each season', why: 'Correct. A participle replaces the prompt’s prepositional phrase: the structure really changed.' },
          { text: 'in each of the four seasons', why: 'Copied from the prompt without a single change.' },
          { text: 'arriving in the summer', why: 'The chart covers four seasons. Naming one turns the introduction into a detail sentence.' },
        ],
      },
    ],
  },
]

/**
 * Nivel 2 · Elegir la introducción alineada.
 *
 * Los cuatro fallos que se reparten aquí: copiar, meter cifras, cambiar el tipo de gráfico y
 * adelantar el overview. Cada opción los comete de uno en uno para que se puedan nombrar.
 */
export const CHOICE_DRILLS: ChoiceDrill[] = [
  {
    source: paraphraseFor('line', 4),
    question: 'Which introduction reports this graph without adding anything to it?',
    correct: 0,
    options: [
      { text: 'The line graph illustrates the share of energy drawn from renewable sources in three regions over a twenty-year period.', why: 'Correct. Visual type, topic, three regions and the period all survive, and no figure has been added.' },
      { text: 'The line graph shows the percentage of energy from renewable sources in three regions between 2005 and 2025.', why: 'Every content word is the prompt’s. An introduction that copies scores nothing for Lexical Resource.' },
      { text: 'The line graph illustrates the share of renewable energy in Region A, which rose from 18% to 52% over the period.', why: 'The figures belong in the body paragraphs. It also drops two of the three regions.' },
      { text: 'The bar chart compares the share of renewable energy in three regions in 2025.', why: 'It renames the visual and reduces twenty years to a single year. Both are factual errors about what is on screen.' },
    ],
  },
  {
    source: paraphraseFor('map', 3),
    question: 'Which introduction describes what these two maps actually show?',
    correct: 0,
    options: [
      { text: 'The maps depict changes to the layout of a park over the forty-year period from 1980 to 2020.', why: 'Correct. Two maps, one park, layout change, and the full period.' },
      { text: 'The maps show a park in 1980 and in 2020.', why: 'This is the prompt with nothing changed. Maps introductions almost always need “changes to the layout”.' },
      { text: 'The maps depict how a park was improved by the addition of a playground and a cafe.', why: '“Improved” is a judgement the maps cannot support, and naming two features belongs in the body.' },
      { text: 'The map depicts changes to the layout of a park between 1980 and 2020.', why: 'There are two maps. The singular makes the sentence describe a visual that is not there.' },
    ],
  },
  {
    source: paraphraseFor('process', 3),
    question: 'Which introduction fits a process diagram?',
    correct: 0,
    options: [
      { text: 'The diagram depicts the stages involved in manufacturing bricks from clay.', why: 'Correct. It names the sequence and its starting material without walking through the steps.' },
      { text: 'The diagram shows how bricks are manufactured.', why: 'The prompt, unchanged. “Shows how” is exactly the phrase to replace with “the stages involved in”.' },
      { text: 'The diagram depicts the five stages by which clay is dug, crushed, moulded, dried and fired.', why: 'Listing every stage is the body paragraph. The introduction says what the diagram is, not what happens in it.' },
      { text: 'The diagram explains why bricks are manufactured from clay rather than from stone.', why: 'A process diagram shows how, never why. There is no comparison with stone anywhere on it.' },
    ],
  },
  {
    source: paraphraseFor('pie', 4),
    question: 'Which introduction matches two pie charts?',
    correct: 0,
    options: [
      { text: 'The pie charts compare the shares of electricity produced from four sources in two countries.', why: 'Correct. Plural charts, plural verb, four sources, two countries: everything on screen is accounted for.' },
      { text: 'The pie chart compares the shares of electricity produced from four sources in two countries.', why: 'Singular. One chart cannot cover two countries, and the examiner sees the mismatch immediately.' },
      { text: 'The pie charts show the percentage of electricity generated from four sources in two countries.', why: 'Copied: “show”, “percentage” and “generated” are all the prompt’s own words.' },
      { text: 'The pie charts compare the shares of electricity produced in two countries, where gas leads in Country A.', why: 'The leading source is the overview’s job. The introduction has not read the data yet.' },
    ],
  },
]

/**
 * Nivel 3 · Revisar la respuesta entera.
 *
 * Aquí ya no hay copia literal: los cuatro candidatos suenan bien. El fallo está en lo que
 * cada uno AÑADE —una cifra, una causa, un juicio, un tipo de gráfico— y hay que verlo.
 */
export const PRODUCTION_DRILLS: ChoiceDrill[] = [
  {
    source: paraphraseFor('process', 4),
    question: 'Three of these add something the diagram does not contain. Which one does not?',
    correct: 0,
    options: [
      { text: 'The diagram outlines the stages a honey bee passes through during its life cycle.', why: 'Correct. It reports the sequence and nothing else.' },
      { text: 'The diagram outlines the stages a honey bee passes through in exactly twenty-one days.', why: 'The diagram gives no durations. “Exactly” invents a precision it never showed.' },
      { text: 'The line graph outlines how the honey bee population changed over its life cycle.', why: 'Wrong visual, and a cycle is not a trend: nothing here changes over time.' },
      { text: 'The diagram proves that the adult stage is the most important in the life cycle of a honey bee.', why: 'A diagram reports an order. Importance is a judgement, and nothing on it ranks the stages.' },
    ],
  },
  {
    source: paraphraseFor('map', 4),
    question: 'Which one reports the maps without adding to them?',
    correct: 0,
    options: [
      { text: 'The maps illustrate how the layout of a shopping centre changed after redevelopment.', why: 'Correct. Layout, change and the before/after framing, with nothing invented.' },
      { text: 'The maps illustrate that the shopping centre became far more convenient after redevelopment.', why: 'Convenience is not drawn on a map. This is an opinion presented as a description.' },
      { text: 'The table illustrates how four facilities in a shopping centre changed after redevelopment.', why: 'It renames the visual. There is no table anywhere in this task.' },
      { text: 'The maps illustrate the number of shoppers who visited the centre before and after redevelopment.', why: 'Maps show places, not people. There is no visitor figure to report.' },
    ],
  },
  {
    source: paraphraseFor('bar', 4),
    question: 'Which one belongs in the introduction rather than somewhere else?',
    correct: 0,
    options: [
      { text: 'The bar chart depicts water consumption across five sectors in 2005.', why: 'Correct. What the chart is, what it measures, how many sectors and when.' },
      { text: 'The bar chart depicts water consumption across five sectors, with agriculture using by far the most.', why: 'The leading sector is the overview. Saying it here leaves the overview with nothing to say.' },
      { text: 'The pie chart depicts the proportion of water consumed by five sectors in 2005.', why: 'Wrong visual, and wrong measure: this chart gives volumes in billion litres, not shares of a whole.' },
      { text: 'The bar chart explains why agriculture consumed 46 billion litres of water in 2005.', why: 'It adds a cause the chart cannot show and a figure that belongs in the body.' },
    ],
  },
  {
    source: paraphraseFor('table', 4),
    question: 'Which one states what the table holds, without reading it yet?',
    correct: 0,
    options: [
      { text: 'The table illustrates household recycling rates for four materials over a ten-year period.', why: 'Correct. Four materials, a rate, a period: the contents, not the findings.' },
      { text: 'The table illustrates household recycling rates for four materials, all of which rose over the period.', why: '“All of which rose” is the overview. The introduction has not looked at the numbers yet.' },
      { text: 'The table illustrates the amount of paper, glass, plastic and metal recycled over a ten-year period.', why: 'The table gives percentages, not quantities. An amount would need tonnes, which are not there.' },
      { text: 'The table shows the percentage of four materials that were recycled by households in 2010, 2015 and 2020.', why: 'The prompt, copied. Even the three years are listed in the same order.' },
    ],
  },
]
