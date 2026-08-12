/**
 * Los 30 gráficos de Task 1, con el enunciado que le corresponde a cada uno.
 *
 * Existe para que el enunciado de un gráfico se escriba UNA vez. `Task1VisualLab` pinta seis
 * tipos con cinco variantes cada uno, y cada unidad —introducción, overview, tendencias…—
 * los reutiliza. Antes cada unidad escribía su propia versión del enunciado, y al comparar
 * la introducción con el Visual Lab aparecieron tres ejemplos describiendo un gráfico que no
 * era el suyo. Con una sola tabla eso no puede volver a pasar.
 *
 * Aquí solo va lo que es del GRÁFICO. Lo que es de una unidad —la paráfrasis modelo, el
 * overview modelo, los ejercicios— vive en la unidad.
 */

import type { ComponentType } from 'react'
import {
  IELTSBarChartVisual,
  IELTSLineGraphVisual,
  IELTSMapDiagramVisual,
  IELTSPieChartVisual,
  IELTSProcessDiagramVisual,
  IELTSTableVisual,
} from './Task1VisualLab'

export type VisualKind = 'line' | 'bar' | 'pie' | 'table' | 'process' | 'map'
export type Chart = ComponentType<{ variant?: number }>

export type Visual = {
  kind: VisualKind
  /** La variante del Visual Lab. Viaja junto al enunciado que la describe. */
  variant: number
  /** El enunciado tal y como lo daría IELTS. */
  prompt: string
}

export const KINDS: VisualKind[] = ['line', 'bar', 'pie', 'table', 'process', 'map']

export const CHART_OF: Record<VisualKind, Chart> = {
  line: IELTSLineGraphVisual,
  bar: IELTSBarChartVisual,
  pie: IELTSPieChartVisual,
  table: IELTSTableVisual,
  process: IELTSProcessDiagramVisual,
  map: IELTSMapDiagramVisual,
}

export const KIND_LABEL: Record<VisualKind, string> = {
  line: 'Line graphs',
  bar: 'Bar charts',
  pie: 'Pie charts',
  table: 'Tables',
  process: 'Process diagrams',
  map: 'Maps',
}

export const VISUALS: Visual[] = [
  { kind: 'line', variant: 0, prompt: 'The line graph below shows the percentage of people with internet access in three regions between 2000 and 2020.' },
  { kind: 'line', variant: 1, prompt: 'The line graph below shows the number of trips made by three forms of public transport between 2010 and 2025.' },
  { kind: 'line', variant: 2, prompt: 'The line graph below shows the number of people cycling in three districts of a city between 2008 and 2023.' },
  { kind: 'line', variant: 3, prompt: 'The line graph below shows the number of weekly visits to a library by three groups of users between 2012 and 2022.' },
  { kind: 'line', variant: 4, prompt: 'The line graph below shows the percentage of energy from renewable sources in three regions between 2005 and 2025.' },
  { kind: 'bar', variant: 0, prompt: 'The bar chart below shows household spending on five types of expense in one country in 2024.' },
  { kind: 'bar', variant: 1, prompt: 'The bar chart below shows the percentage of students who chose each of five university facilities in 2018.' },
  { kind: 'bar', variant: 2, prompt: 'The bar chart below shows the average number of hours per day spent looking at screens by five age groups in 2023.' },
  { kind: 'bar', variant: 3, prompt: 'The bar chart below shows the number of visitors to four museums in 2010.' },
  { kind: 'bar', variant: 4, prompt: 'The bar chart below shows how much water was used by five sectors in 2005.' },
  { kind: 'pie', variant: 0, prompt: 'The pie chart below shows the percentage of energy produced from four sources in 2025.' },
  { kind: 'pie', variant: 1, prompt: 'The pie charts below show how household spending was divided between four categories in 2000 and in 2020.' },
  { kind: 'pie', variant: 2, prompt: 'The pie chart below shows the reasons students gave for choosing online courses in 2024.' },
  { kind: 'pie', variant: 3, prompt: 'The pie chart below shows the percentage of visitors to a national park in each of the four seasons.' },
  { kind: 'pie', variant: 4, prompt: 'The pie charts below show the percentage of electricity generated from four sources in two countries.' },
  { kind: 'table', variant: 0, prompt: 'The table below shows the percentage of people in four age groups who used social media every day in three countries in 2023.' },
  { kind: 'table', variant: 1, prompt: 'The table below shows the number of international students enrolled in four subjects at a university in 2015, 2020 and 2025.' },
  { kind: 'table', variant: 2, prompt: 'The table below shows the average time taken to commute by car, bus and train in four cities.' },
  { kind: 'table', variant: 3, prompt: 'The table below shows how tourists rated four facilities as excellent, good or poor in 2024.' },
  { kind: 'table', variant: 4, prompt: 'The table below shows the percentage of four materials that were recycled by households in 2010, 2015 and 2020.' },
  { kind: 'process', variant: 0, prompt: 'The diagram below shows how used plastic bottles are recycled.' },
  { kind: 'process', variant: 1, prompt: 'The diagram below shows how coffee is prepared for sale.' },
  { kind: 'process', variant: 2, prompt: 'The diagram below shows how bottled water is produced.' },
  { kind: 'process', variant: 3, prompt: 'The diagram below shows how bricks are manufactured.' },
  { kind: 'process', variant: 4, prompt: 'The diagram below shows the life cycle of a honey bee.' },
  { kind: 'map', variant: 0, prompt: 'The maps below show a town centre in 1990 and in 2020.' },
  { kind: 'map', variant: 1, prompt: 'The maps below show a university campus in 1995 and in 2025.' },
  { kind: 'map', variant: 2, prompt: 'The maps below show a coastal village in 2000 and in 2025.' },
  { kind: 'map', variant: 3, prompt: 'The maps below show a park in 1980 and in 2020.' },
  { kind: 'map', variant: 4, prompt: 'The maps below show a shopping centre before and after redevelopment.' },
]

/** El enunciado de un gráfico. Que ninguna unidad lo escriba a mano. */
export function promptFor(kind: VisualKind, variant: number): string {
  const found = VISUALS.find((item) => item.kind === kind && item.variant === variant)
  if (!found) throw new Error(`No hay enunciado para ${kind} variante ${variant}`)
  return found.prompt
}
