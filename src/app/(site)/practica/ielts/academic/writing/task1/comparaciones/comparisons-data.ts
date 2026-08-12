/**
 * Los 20 ejemplos de comparación, uno por gráfico del Visual Lab en los cuatro tipos que
 * admiten comparación (líneas, barras, tartas y tablas).
 *
 * POR QUÉ ESTÁ PARTIDO
 *
 * Medido el 12 de agosto de 2026: la lección resolvía los 20 y el motor practicaba sobre esos
 * mismos 20. **3 de las 15 respuestas del motor solapaban un modelo impreso arriba**, una al
 * 88 %. Mismo defecto que en las cinco unidades anteriores, misma corrección.
 *
 * `worked: true` → la lección lo enseña resuelto. Tres por tipo, doce en total.
 * `worked: false` → el motor practica sobre él. Dos por tipo, ocho en total.
 *
 * Ninguno de los 20 modelos se ha borrado: ocho pasan de estar encima del ejercicio a
 * enseñarse al comprobar.
 */

import { promptFor } from '../task1-visuals'
import type { VisualKind } from '../task1-visuals'

export type ComparisonKind = Extract<VisualKind, 'line' | 'bar' | 'pie' | 'table'>

export type ComparisonExample = {
  kind: ComparisonKind
  variant: number
  /** El movimiento que enseña: cruce, ranking invertido, brecha que se cierra… */
  title: string
  /** Lo que hay que ver en el gráfico. */
  focus: string
  /** La comparación modelo. */
  model: string
  worked: boolean
}

export const COMPARISONS: ComparisonExample[] = [
  {
    kind: 'line', variant: 0, worked: true,
    title: 'Start versus end',
    focus: 'Region A starts and finishes ahead, while all three regions rise.',
    model: 'Region A remained the leading region throughout, increasing from 30% to almost 90%, whereas Region C rose from only 6% to 57%.',
  },
  {
    kind: 'line', variant: 1, worked: true,
    title: 'Crossover',
    focus: 'Metro overtakes bus in the final period.',
    model: 'Although bus trips were initially the most common, metro use rose steadily and surpassed bus travel by 2025.',
  },
  {
    kind: 'line', variant: 2, worked: true,
    title: 'Opposing directions',
    focus: 'Cycling grows in the North and South but declines in Central.',
    model: 'Cycling levels increased markedly in the North and South districts, whereas the Central figure fell gradually over the period.',
  },
  {
    kind: 'line', variant: 3, worked: false,
    title: 'Narrowing gap',
    focus: 'Family visits rise while the gap with students becomes much smaller.',
    model: 'Family visits increased steadily, whereas visits by students declined slightly. As a result, the gap between the two groups narrowed considerably by 2022.',
  },
  {
    kind: 'line', variant: 4, worked: false,
    title: 'Reversed ranking',
    focus: 'Region A rises above Region B after starting below it.',
    model: 'Region A overtook Region B during the period, as the former increased consistently while the latter declined.',
  },
  {
    kind: 'bar', variant: 0, worked: true,
    title: 'Highest versus lowest',
    focus: 'Housing is the largest household expense and health is the smallest.',
    model: 'Housing accounted for the largest share of expenditure at 32%, while health made up the smallest proportion, at 13%.',
  },
  {
    kind: 'bar', variant: 1, worked: true,
    title: 'Leading facility',
    focus: 'The library ranks first; clubs sit clearly last.',
    model: 'The library was the most popular facility, with 74 users, whereas clubs were selected by only 28 people.',
  },
  {
    kind: 'bar', variant: 2, worked: true,
    title: 'Clear age pattern',
    focus: 'Screen time falls consistently across age groups.',
    model: 'Average screen time declined steadily with age, dropping from 5.8 hours among 18-24 year olds to 2.1 hours in the oldest group.',
  },
  {
    kind: 'bar', variant: 3, worked: false,
    title: 'A clear outlier',
    focus: 'Museum A attracts far more visitors than Museum D.',
    model: 'Museum A received 2.4 million visitors, more than three times the figure for Museum D, at 0.7 million.',
  },
  {
    kind: 'bar', variant: 4, worked: false,
    title: 'Dominant use',
    focus: 'Agriculture leads water use by a wide margin.',
    model: 'Agriculture used the most water, at 46 units, compared with just 9 units for the smallest category, Other.',
  },
  {
    kind: 'pie', variant: 0, worked: true,
    title: 'Largest and smallest share',
    focus: 'Solar is largest and Other is smallest.',
    model: 'Solar represented the largest share of energy production, at 34%, while other sources accounted for only 16%.',
  },
  {
    kind: 'pie', variant: 1, worked: true,
    title: 'Change in composition',
    focus: 'Housing gains share while food loses share between two years.',
    model: 'Housing rose from 22% to 31%, whereas food declined from 31% to 24% over the same period.',
  },
  {
    kind: 'pie', variant: 2, worked: true,
    title: 'Combined majority',
    focus: 'Flexibility and cost together make up most reasons for choosing online courses.',
    model: 'Flexibility and cost together accounted for 69% of responses, far exceeding the combined share of the two remaining reasons.',
  },
  {
    kind: 'pie', variant: 3, worked: false,
    title: 'Near balance',
    focus: 'The seasonal distribution is close, with only a small gap between the extremes.',
    model: 'Visitor numbers were distributed fairly evenly across the seasons, with summer only slightly ahead of winter.',
  },
  {
    kind: 'pie', variant: 4, worked: false,
    title: 'Different profiles',
    focus: 'Country A is led by gas whereas Country B is led by coal.',
    model: 'Gas was the largest source in Country A, while coal accounted for the greatest proportion of electricity generation in Country B.',
  },
  {
    kind: 'table', variant: 0, worked: true,
    title: 'Leading country',
    focus: 'The USA records the highest use in every age group.',
    model: 'The USA had the highest daily social-media use across all age groups, whereas Australia consistently recorded the lowest figures.',
  },
  {
    kind: 'table', variant: 1, worked: true,
    title: 'Largest subject and fastest growth',
    focus: 'Business remains largest, but Science grows fastest.',
    model: 'Business attracted the most international students in every year, while Science showed the sharpest rise, more than doubling from 180 to 380 students.',
  },
  {
    kind: 'table', variant: 2, worked: true,
    title: 'Consistent transport ranking',
    focus: 'Car travel is shortest and bus travel is longest in each city.',
    model: 'Travelling by car took the least time in all four cities, whereas bus journeys were consistently the longest.',
  },
  {
    kind: 'table', variant: 3, worked: false,
    title: 'A meaningful exception',
    focus: 'Guides receive the strongest ratings while transport performs worst.',
    model: 'Guides achieved the highest satisfaction scores, in contrast to transport, which had both the weakest positive rating and the largest poor-rating share.',
  },
  {
    kind: 'table', variant: 4, worked: false,
    title: 'Shared upward direction',
    focus: 'All four materials are recycled more over time.',
    model: 'Recycling rates rose for every material, although paper remained the most recycled and plastic the least recycled throughout.',
  },
]

export const COMPARISON_KINDS: ComparisonKind[] = ['line', 'bar', 'pie', 'table']

/** Los que la lección enseña resueltos. */
export const WORKED = COMPARISONS.filter((item) => item.worked)

/** Los que quedan para el motor: la lección no imprime su modelo. */
export const PRACTICE = COMPARISONS.filter((item) => !item.worked)

export function comparisonFor(kind: ComparisonKind, variant: number): ComparisonExample & { prompt: string } {
  const found = COMPARISONS.find((item) => item.kind === kind && item.variant === variant)
  if (!found) throw new Error(`No hay ejemplo de comparación para ${kind} variante ${variant}`)
  return { ...found, prompt: promptFor(kind, variant) }
}
