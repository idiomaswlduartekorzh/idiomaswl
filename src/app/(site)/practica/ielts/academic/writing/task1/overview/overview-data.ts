/**
 * Los 30 overviews modelo, uno por gráfico del Visual Lab.
 *
 * POR QUÉ ESTÁ PARTIDO EN DOS
 *
 * Medido el 12 de agosto de 2026: **6 de las 15 respuestas del motor ya estaban impresas en
 * la lección**, encima del ejercicio, dos de ellas palabra por palabra. La lección enseñaba
 * los 30 overviews resueltos y el motor practicaba sobre esos mismos 30, así que se resolvía
 * subiendo a leer. El mismo defecto de la unidad de introducción, y por la misma causa.
 *
 * `worked: true` → la lección lo enseña resuelto. Tres por tipo de gráfico.
 * `worked: false` → el motor practica sobre él. Dos por tipo, doce en total, y el modelo se
 * enseña al comprobar, no antes.
 *
 * Ninguno de los 30 se ha borrado: doce han pasado de estar encima del ejercicio a estar
 * debajo.
 */

import { promptFor } from '../task1-visuals'
import type { VisualKind } from '../task1-visuals'

export type { Chart, VisualKind } from '../task1-visuals'
export { CHART_OF, KINDS, KIND_LABEL } from '../task1-visuals'

export type OverviewModel = {
  kind: VisualKind
  variant: number
  /** Lo que hay que ver en el gráfico, en una frase. */
  insight: string
  /** El overview modelo. */
  model: string
  worked: boolean
}

const SOURCE: OverviewModel[] = [
  {
    kind: 'line', variant: 0, worked: true,
    insight: 'All three regions rise.',
    model: 'Overall, internet access increased in all three regions, although Region A remained the most connected throughout the period.',
  },
  {
    kind: 'line', variant: 1, worked: true,
    insight: 'Metro and tram rise while bus use falls.',
    model: 'Overall, metro and tram trips increased, whereas bus use declined; metro became the most popular mode by the end of the period.',
  },
  {
    kind: 'line', variant: 2, worked: true,
    insight: 'North overtakes Central.',
    model: 'Overall, cycling increased substantially in the North and South districts, while the Central district declined and lost its initial lead.',
  },
  {
    kind: 'line', variant: 3, worked: false,
    insight: 'Families become the leading group.',
    model: 'Overall, family visits rose steadily, whereas visits by students and retirees decreased; families became the largest group in the later years.',
  },
  {
    kind: 'line', variant: 4, worked: false,
    insight: 'The original leader falls behind.',
    model: 'Overall, Region A and Region C increased, while Region B declined; Region A replaced Region B as the leading region by 2025.',
  },
  {
    kind: 'bar', variant: 0, worked: true,
    insight: 'Housing dominates.',
    model: 'Overall, housing accounted for the largest share of spending, while health represented the smallest category.',
  },
  {
    kind: 'bar', variant: 1, worked: true,
    insight: 'The library leads.',
    model: 'Overall, the library was the most popular facility, while clubs were the least selected; the remaining facilities occupied intermediate positions.',
  },
  {
    kind: 'bar', variant: 2, worked: true,
    insight: 'Screen time falls with age.',
    model: 'Overall, average screen time declined consistently across successive age groups, with the youngest adults recording the highest figure.',
  },
  {
    kind: 'bar', variant: 3, worked: false,
    insight: 'Museum A is the clear leader.',
    model: 'Overall, Museum A received the most visitors by a substantial margin, whereas Museum D attracted the fewest.',
  },
  {
    kind: 'bar', variant: 4, worked: false,
    insight: 'Agriculture dominates water use.',
    model: 'Overall, agriculture used by far the most water, while energy and other sectors accounted for comparatively small amounts.',
  },
  {
    kind: 'pie', variant: 0, worked: true,
    insight: 'Solar leads.',
    model: 'Overall, solar energy made up the largest share of production, while other sources contributed the smallest proportion.',
  },
  {
    kind: 'pie', variant: 1, worked: true,
    insight: 'Housing becomes the largest share.',
    model: 'Overall, housing increased to become the largest household expense, while food declined and the other categories changed more modestly.',
  },
  {
    kind: 'pie', variant: 2, worked: true,
    insight: 'Flexibility is the main reason.',
    model: 'Overall, flexibility was the main reason for choosing online courses, while cost was the second most common factor and other reasons were less significant.',
  },
  {
    kind: 'pie', variant: 3, worked: false,
    insight: 'The four seasons are closely balanced.',
    model: 'Overall, visitor numbers were distributed relatively evenly across the seasons, although summer was marginally the most popular.',
  },
  {
    kind: 'pie', variant: 4, worked: false,
    insight: 'The leading source differs by country.',
    model: 'Overall, gas was the largest source in Country A, whereas coal dominated electricity generation in Country B.',
  },
  {
    kind: 'table', variant: 0, worked: true,
    insight: 'Use falls with age.',
    model: 'Overall, daily social media use declined with age in all three countries.',
  },
  {
    kind: 'table', variant: 1, worked: true,
    insight: 'Business stays largest; Science grows fastest.',
    model: 'Overall, Business attracted the most international students throughout, while Science experienced the fastest growth over the period.',
  },
  {
    kind: 'table', variant: 2, worked: true,
    insight: 'Car is consistently quickest.',
    model: 'Overall, travelling by car took the least time in every city, whereas bus journeys were consistently the longest.',
  },
  {
    kind: 'table', variant: 3, worked: false,
    insight: 'Guides outperform the other facilities.',
    model: 'Overall, guides received the strongest satisfaction ratings, while transport had the weakest results and the largest share of poor ratings.',
  },
  {
    kind: 'table', variant: 4, worked: false,
    insight: 'All recycling rates rise.',
    model: 'Overall, recycling increased for all four materials, with paper remaining the most recycled and plastic the least recycled throughout.',
  },
  {
    kind: 'process', variant: 0, worked: true,
    insight: 'A linear process.',
    model: 'Overall, the process is linear, beginning with the collection of used bottles and ending with the manufacture of new products.',
  },
  {
    kind: 'process', variant: 1, worked: true,
    insight: 'Coffee follows a linear production sequence.',
    model: 'Overall, coffee preparation is a linear process that begins with harvesting cherries and ends with roasted beans being ground and packaged for sale.',
  },
  {
    kind: 'process', variant: 2, worked: true,
    insight: 'Water is extracted, treated and distributed.',
    model: 'Overall, bottled water production starts with extraction and filtration, followed by purification, bottling and delivery to shops.',
  },
  {
    kind: 'process', variant: 3, worked: false,
    insight: 'Bricks pass through five industrial stages.',
    model: 'Overall, brick manufacture is a linear process in which clay is prepared, moulded, dried and fired before delivery.',
  },
  {
    kind: 'process', variant: 4, worked: false,
    insight: 'The bee diagram is cyclical.',
    model: 'Overall, the honey bee life cycle is cyclical, progressing from egg to adult before the adult stage supports the next generation.',
  },
  {
    kind: 'map', variant: 0, worked: true,
    insight: 'Urbanisation.',
    model: 'Overall, the town centre became more urbanised, with open and industrial areas replaced by residential, educational and commercial facilities.',
  },
  {
    kind: 'map', variant: 1, worked: true,
    insight: 'The campus gains residential and academic facilities.',
    model: 'Overall, the campus was extensively redeveloped, with the garden and lecture hall replaced by student flats and a library, while the southern facilities were modernised.',
  },
  {
    kind: 'map', variant: 2, worked: true,
    insight: 'The village shifts toward tourism.',
    model: 'Overall, the coastal village became more tourist-oriented, with farmland and a fishing harbour replaced by a holiday resort and marina.',
  },
  {
    kind: 'map', variant: 3, worked: false,
    insight: 'The park adds new leisure facilities.',
    model: 'Overall, the park retained much of its green space but gained new recreational facilities, including a playground, cafe and open-air stage.',
  },
  {
    kind: 'map', variant: 4, worked: false,
    insight: 'Retail functions are modernised.',
    model: 'Overall, the shopping centre was modernised through the replacement of small-scale retail and transport facilities with larger commercial and parking infrastructure.',
  },
]

export const OVERVIEWS = SOURCE

/** Los que la lección enseña resueltos. */
export const WORKED = OVERVIEWS.filter((item) => item.worked)

/** Los que quedan para el motor: la lección no imprime su respuesta. */
export const PRACTICE = OVERVIEWS.filter((item) => !item.worked)

export function overviewFor(kind: VisualKind, variant: number): OverviewModel & { prompt: string } {
  const found = OVERVIEWS.find((item) => item.kind === kind && item.variant === variant)
  if (!found) throw new Error(`No hay overview modelo para ${kind} variante ${variant}`)
  return { ...found, prompt: promptFor(kind, variant) }
}
