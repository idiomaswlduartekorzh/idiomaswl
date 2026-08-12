/**
 * Los 30 gráficos de Task 1, con su enunciado y su paráfrasis modelo.
 *
 * POR QUÉ ESTE FICHERO EXISTE
 *
 * Antes había dos listas. La lección tenía sus 30 ejemplos trabajados escritos a mano, y el
 * motor de práctica tenía sus 11 ejercicios escritos aparte. Medido el 12 de agosto de 2026:
 *
 *   · **10 de las 11 respuestas del motor ya estaban impresas en la lección**, encima del
 *     ejercicio, y cinco de ellas palabra por palabra. No se practicaba: se subía y se
 *     copiaba.
 *   · **3 de los 30 ejemplos enseñaban un gráfico que no era el suyo.** La lección pintaba
 *     `<Chart variant={exampleIndex} />` y el texto se escribía en otra lista, así que el
 *     ejemplo «Average temperature in three cities» salía junto a un gráfico de visitas
 *     semanales a la biblioteca. Emparejamiento por posición entre dos listas paralelas: el
 *     mismo fallo que costó 10 ejercicios desalineados en Task 2.
 *   · Ningún ejemplo mostraba **el enunciado original**. Se leía un título («Internet access
 *     in three regions») y debajo una paráfrasis. No se puede juzgar una paráfrasis sin ver
 *     de qué frase sale.
 *
 * Ahora hay una sola fuente. Cada entrada lleva su gráfico, su enunciado y su modelo, y el
 * `variant` vive junto al texto que lo describe, así que no se pueden desincronizar.
 *
 * EL REPARTO
 *
 * `worked: true` → la lección lo enseña resuelto. Tres por tipo de gráfico: suficientes para
 * ver el movimiento, y es un movimiento, no seis.
 * `worked: false` → el motor practica sobre él. Dos por tipo. El modelo sigue estando, pero
 * se enseña DESPUÉS de intentarlo, que es donde sirve.
 *
 * No se ha borrado ninguna de las 30 paráfrasis: doce se han movido de encima del ejercicio
 * a debajo de él.
 */

import { promptFor } from '../task1-visuals'

export type { Chart, VisualKind } from '../task1-visuals'
export { CHART_OF, KINDS, KIND_LABEL } from '../task1-visuals'

import type { VisualKind } from '../task1-visuals'

export type Paraphrase = {
  kind: VisualKind
  /** El gráfico del Visual Lab que se pinta. Vive junto al texto que lo describe. */
  variant: number
  /** El enunciado tal y como lo daría IELTS. Es lo que hay que parafrasear. */
  prompt: string
  /** La paráfrasis modelo. */
  model: string
  /** Una segunda paráfrasis igual de válida: no hay una única respuesta buena. */
  alternative: string
  /** Las sustituciones que hacen los dos modelos. */
  swaps: string
  /** true = la lección lo enseña resuelto. false = el motor practica sobre él. */
  worked: boolean
}



export const PARAPHRASES: Paraphrase[] = [
  // ── Line graphs ────────────────────────────────────────────────────────────
  {
    kind: 'line', variant: 0, worked: true,
    prompt: promptFor('line', 0),
    model: 'The line graph illustrates the proportion of the population with internet access in three regions over a twenty-year period.',
    alternative: 'The chart presents changes in internet access across three regions from 2000 to 2020.',
    swaps: 'shows → illustrates · percentage → proportion · between X and Y → over a twenty-year period',
  },
  {
    kind: 'line', variant: 1, worked: true,
    prompt: promptFor('line', 1),
    model: 'The line graph presents the number of journeys made by three modes of public transport between 2010 and 2025.',
    alternative: 'The chart compares public transport use across three modes over the period from 2010 to 2025.',
    swaps: 'shows → presents · trips → journeys · forms → modes',
  },
  {
    kind: 'line', variant: 2, worked: true,
    prompt: promptFor('line', 2),
    model: 'The line graph illustrates how many residents cycled in three districts of a city over a fifteen-year period.',
    alternative: 'The chart presents changes in cycling levels across three city districts from 2008 to 2023.',
    swaps: 'shows → illustrates · people → residents · between X and Y → over a fifteen-year period',
  },
  {
    kind: 'line', variant: 3, worked: false,
    prompt: promptFor('line', 3),
    model: 'The line graph presents weekly library attendance among three groups of users over a ten-year period.',
    alternative: 'The chart compares how often three types of user visited a library each week from 2012 to 2022.',
    swaps: 'shows → presents · visits → attendance · between X and Y → over a ten-year period',
  },
  {
    kind: 'line', variant: 4, worked: false,
    prompt: promptFor('line', 4),
    model: 'The line graph illustrates the share of energy drawn from renewable sources in three regions over a twenty-year period.',
    alternative: 'The chart presents changes in the proportion of renewable energy across three regions from 2005 to 2025.',
    swaps: 'shows → illustrates · percentage → share · from → drawn from',
  },

  // ── Bar charts ─────────────────────────────────────────────────────────────
  {
    kind: 'bar', variant: 0, worked: true,
    prompt: promptFor('bar', 0),
    model: 'The bar chart presents household expenditure across five categories in 2024.',
    alternative: 'The chart compares spending on five areas of household consumption during 2024.',
    swaps: 'shows → presents · spending → expenditure · types → categories',
  },
  {
    kind: 'bar', variant: 1, worked: true,
    prompt: promptFor('bar', 1),
    model: 'The bar chart illustrates the proportion of students selecting five university facilities in 2018.',
    alternative: 'The chart compares student preferences for different campus facilities in 2018.',
    swaps: 'shows → illustrates · percentage → proportion · chose → selecting',
  },
  {
    kind: 'bar', variant: 2, worked: true,
    prompt: promptFor('bar', 2),
    model: 'The bar chart presents mean daily screen time among five age brackets in 2023.',
    alternative: 'The chart compares how long people in five age groups spent on screens each day during 2023.',
    swaps: 'average → mean · hours per day → daily screen time · groups → brackets',
  },
  {
    kind: 'bar', variant: 3, worked: false,
    prompt: promptFor('bar', 3),
    model: 'The bar chart provides data on visitor numbers at four museums in 2010.',
    alternative: 'The chart compares the annual attendance figures for four museums during 2010.',
    swaps: 'shows → provides data on · visitors → attendance figures · in → during',
  },
  {
    kind: 'bar', variant: 4, worked: false,
    prompt: promptFor('bar', 4),
    model: 'The bar chart depicts water consumption across five sectors in 2005.',
    alternative: 'The chart presents the volume of water used by five different sectors during 2005.',
    swaps: 'shows → depicts · how much water was used → water consumption',
  },

  // ── Pie charts ─────────────────────────────────────────────────────────────
  {
    kind: 'pie', variant: 0, worked: true,
    prompt: promptFor('pie', 0),
    model: 'The pie chart illustrates the proportion of energy generated from four sources in 2025.',
    alternative: 'The chart presents the share of national energy supply provided by four sources during 2025.',
    swaps: 'shows → illustrates · percentage → proportion · produced → generated',
  },
  {
    kind: 'pie', variant: 1, worked: true,
    prompt: promptFor('pie', 1),
    model: 'The pie charts compare the distribution of household expenditure across four categories in 2000 and 2020.',
    alternative: 'The two charts illustrate how household spending was shared out between four categories over twenty years.',
    swaps: 'show → compare · divided → distribution · spending → expenditure',
  },
  {
    kind: 'pie', variant: 2, worked: true,
    prompt: promptFor('pie', 2),
    model: 'The pie chart presents the main motives students reported for selecting online courses in 2024.',
    alternative: 'The chart illustrates how students’ reasons for taking online courses were distributed during 2024.',
    swaps: 'shows → presents · reasons → motives · choosing → selecting',
  },
  {
    kind: 'pie', variant: 3, worked: false,
    prompt: promptFor('pie', 3),
    model: 'The pie chart depicts the proportion of park visitors arriving in each season of the year.',
    alternative: 'The chart shows how annual attendance at a national park was distributed across the four seasons.',
    swaps: 'percentage → proportion · visitors → attendance · in each season → across the seasons',
  },
  {
    kind: 'pie', variant: 4, worked: false,
    prompt: promptFor('pie', 4),
    model: 'The pie charts compare the shares of electricity produced from four sources in two countries.',
    alternative: 'The two charts provide information about the composition of electricity supply in two nations.',
    swaps: 'show → compare · percentage → shares · generated → produced · countries → nations',
  },

  // ── Tables ─────────────────────────────────────────────────────────────────
  {
    kind: 'table', variant: 0, worked: true,
    prompt: promptFor('table', 0),
    model: 'The table provides data on daily social media use among four age groups in three countries in 2023.',
    alternative: 'The table compares the proportion of adults using social media every day across four age brackets.',
    swaps: 'shows → provides data on · percentage → proportion · groups → brackets',
  },
  {
    kind: 'table', variant: 1, worked: true,
    prompt: promptFor('table', 1),
    model: 'The table presents figures for international students studying four subjects at a university over a ten-year period.',
    alternative: 'The table compares enrolment numbers across four university subjects between 2015 and 2025.',
    swaps: 'number → figures · enrolled in → studying · three years → a ten-year period',
  },
  {
    kind: 'table', variant: 2, worked: true,
    prompt: promptFor('table', 2),
    model: 'The table compares mean commuting times by three modes of transport in four cities.',
    alternative: 'The table provides information about average journey times for car, bus and train across four urban areas.',
    swaps: 'shows → compares · average → mean · cities → urban areas',
  },
  {
    kind: 'table', variant: 3, worked: false,
    prompt: promptFor('table', 3),
    model: 'The table presents tourist satisfaction ratings for four facilities in 2024.',
    alternative: 'The table compares visitors’ assessments of accommodation, transport, food and guides during 2024.',
    swaps: 'how tourists rated → satisfaction ratings · tourists → visitors · in → during',
  },
  {
    kind: 'table', variant: 4, worked: false,
    prompt: promptFor('table', 4),
    model: 'The table illustrates household recycling rates for four materials over a ten-year period.',
    alternative: 'The table provides data on the proportion of paper, glass, plastic and metal recycled between 2010 and 2020.',
    swaps: 'percentage recycled → recycling rates · three years → a ten-year period',
  },

  // ── Process diagrams ───────────────────────────────────────────────────────
  {
    kind: 'process', variant: 0, worked: true,
    prompt: promptFor('process', 0),
    model: 'The process diagram illustrates the stages involved in recycling used plastic bottles into new products.',
    alternative: 'The diagram outlines how discarded plastic bottles are collected, treated and converted into new items.',
    swaps: 'shows → illustrates · how → the stages involved in · used → discarded',
  },
  {
    kind: 'process', variant: 1, worked: true,
    prompt: promptFor('process', 1),
    model: 'The diagram presents the stages involved in producing coffee for sale.',
    alternative: 'The process outlines how coffee cherries are transformed into packaged coffee products.',
    swaps: 'shows → presents · prepared → produced · how → the stages involved in',
  },
  {
    kind: 'process', variant: 2, worked: true,
    prompt: promptFor('process', 2),
    model: 'The diagram illustrates how water is extracted, purified, bottled and distributed for consumption.',
    alternative: 'The process outlines the stages through which spring water becomes a bottled product.',
    swaps: 'shows → illustrates · produced → becomes a bottled product · how → the stages through which',
  },
  {
    kind: 'process', variant: 3, worked: false,
    prompt: promptFor('process', 3),
    model: 'The diagram depicts the stages involved in manufacturing bricks from clay.',
    alternative: 'The process shows how raw clay is shaped, dried and fired before delivery.',
    swaps: 'shows → depicts · how → the stages involved in · manufactured → manufacturing from clay',
  },
  {
    kind: 'process', variant: 4, worked: false,
    prompt: promptFor('process', 4),
    model: 'The diagram outlines the stages a honey bee passes through during its life cycle.',
    alternative: 'The process illustrates how a honey bee develops from an egg into an adult within a colony.',
    swaps: 'shows → outlines · life cycle → the stages it passes through · of → develops from',
  },

  // ── Maps ───────────────────────────────────────────────────────────────────
  {
    kind: 'map', variant: 0, worked: true,
    prompt: promptFor('map', 0),
    model: 'The maps illustrate how the layout of a town centre changed over the thirty-year period from 1990 to 2020.',
    alternative: 'The two maps compare the arrangement of a town centre in 1990 with its layout in 2020.',
    swaps: 'show → illustrate · in two years → how the layout changed · between → over',
  },
  {
    kind: 'map', variant: 1, worked: true,
    prompt: promptFor('map', 1),
    model: 'The maps present changes to the layout of a university campus between 1995 and 2025.',
    alternative: 'The two maps compare the campus before and after a thirty-year period of development.',
    swaps: 'show → present · in two years → changes to the layout · between → before and after',
  },
  {
    kind: 'map', variant: 2, worked: true,
    prompt: promptFor('map', 2),
    model: 'The maps illustrate how a coastal village was transformed between 2000 and 2025.',
    alternative: 'The two maps compare the arrangement of the village at the beginning and end of the period.',
    swaps: 'show → illustrate · in two years → was transformed · layout → arrangement',
  },
  {
    kind: 'map', variant: 3, worked: false,
    prompt: promptFor('map', 3),
    model: 'The maps depict changes to the layout of a park over the forty-year period from 1980 to 2020.',
    alternative: 'The two maps compare the park before and after its redevelopment.',
    swaps: 'show → depict · in two years → changes to the layout · between → over',
  },
  {
    kind: 'map', variant: 4, worked: false,
    prompt: promptFor('map', 4),
    model: 'The maps illustrate how the layout of a shopping centre changed after redevelopment.',
    alternative: 'The two maps compare the arrangement of the shopping centre before and after the building work.',
    swaps: 'show → illustrate · layout → arrangement · redevelopment → building work',
  },
]

/** Los que la lección enseña resueltos. */
export const WORKED = PARAPHRASES.filter((item) => item.worked)

/** Los que quedan para el motor: mismo gráfico, respuesta no impresa en la lección. */
export const PRACTICE = PARAPHRASES.filter((item) => !item.worked)

/** Busca por tipo y variante. Que el motor no escriba un `variant` suelto a mano. */
export function paraphraseFor(kind: VisualKind, variant: number): Paraphrase {
  const found = PARAPHRASES.find((item) => item.kind === kind && item.variant === variant)
  if (!found) throw new Error(`No hay paráfrasis para ${kind} variante ${variant}`)
  return found
}
