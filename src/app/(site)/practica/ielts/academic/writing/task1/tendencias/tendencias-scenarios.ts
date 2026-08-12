/**
 * Los gráficos de la unidad de tendencias, partidos en dos.
 *
 * POR QUÉ
 *
 * El ejercicio de selección de arriba coge un escenario, enseña cinco observaciones y marca
 * cuáles pertenecen al overview y por qué. El motor de abajo preguntaba **sobre esos mismos
 * cinco escenarios**.
 *
 * Medido el 12 de agosto de 2026, y aquí hay una lección de medición: comparando la respuesta
 * del motor contra cada observación por separado, salía **1 de 9**. Parecía poca cosa. Pero la
 * pregunta de nivel 3 sobre el escenario del internet pide «la versión más completa», y su
 * respuesta —«all regions grew, North America remained highest and the gap narrowed»— es la
 * **suma exacta de las tres observaciones que el ejercicio de arriba acaba de marcar como
 * correctas**. Igual en el escenario de la energía. Una respuesta compuesta no se parece a
 * ninguna de sus partes, así que comparar de una en una no la ve.
 *
 * `worked: true` → el ejercicio de selección lo disecciona, con sus cinco observaciones.
 * `worked: false` → el motor practica sobre él. Sin observaciones: nada que copiar.
 */

export type DataSeries = { label: string; color: string; values: number[] }

export type Observation = { text: string; relevant: boolean; explanation: string }

/** Lo que necesita cualquier gráfico para pintarse. */
export type Scenario = {
  id: string
  title: string
  unit: string
  years: number[]
  series: DataSeries[]
  yMax: number
  context: string
}

/** Los que el ejercicio de selección disecciona: llevan además sus observaciones. */
export type WorkedScenario = Scenario & { observations: Observation[]; targetCount: number }

/**
 * Cuatro gráficos que la lección no resuelve, cada uno con un patrón distinto: saturación,
 * anomalía y recuperación, cruce entre dos series, y una que sube y vuelve a bajar.
 */
export const PRACTICE_SCENARIOS: Scenario[] = [
  {
    id: 'phones',
    title: 'Mobile subscriptions per 100 people — three countries, 2000–2020',
    unit: 'per 100',
    years: [2000, 2005, 2010, 2015, 2020],
    yMax: 140,
    series: [
      { label: 'Country X', color: '#0f3d8c', values: [58, 96, 122, 130, 132] },
      { label: 'Country Y', color: '#059669', values: [22, 54, 88, 112, 128] },
      { label: 'Country Z', color: '#f59e0b', values: [4, 14, 38, 72, 104] },
    ],
    context: 'The line graph below shows the number of mobile phone subscriptions per 100 people in three countries between 2000 and 2020.',
  },
  {
    id: 'housing',
    title: 'House price index (2010 = 100) — three cities, 2010–2024',
    unit: 'index',
    years: [2010, 2014, 2018, 2022, 2024],
    yMax: 200,
    series: [
      { label: 'City A', color: '#0f3d8c', values: [100, 124, 148, 166, 178] },
      { label: 'City B', color: '#dc2626', values: [100, 132, 96, 118, 140] },
      { label: 'City C', color: '#7c3aed', values: [100, 103, 101, 104, 106] },
    ],
    context: 'The line graph below shows a house price index for three cities between 2010 and 2024, with 2010 set at 100.',
  },
  {
    id: 'news',
    title: 'People reading the news by format (millions) — 2005–2025',
    unit: 'millions',
    years: [2005, 2010, 2015, 2020, 2025],
    yMax: 60,
    series: [
      { label: 'Printed papers', color: '#0f3d8c', values: [42, 34, 22, 15, 11] },
      { label: 'Online', color: '#059669', values: [8, 19, 33, 44, 52] },
      { label: 'Radio', color: '#f59e0b', values: [20, 19, 19, 18, 18] },
    ],
    context: 'The line graph below shows how many people followed the news in three different formats between 2005 and 2025.',
  },
  {
    id: 'languages',
    title: 'Course enrolments (hundreds) — three languages, 2012–2024',
    unit: 'hundreds',
    years: [2012, 2015, 2018, 2021, 2024],
    yMax: 40,
    series: [
      { label: 'Spanish', color: '#0f3d8c', values: [12, 17, 23, 26, 29] },
      { label: 'Mandarin', color: '#059669', values: [4, 9, 19, 14, 11] },
      { label: 'French', color: '#dc2626', values: [21, 18, 15, 13, 12] },
    ],
    context: 'The line graph below shows the number of students enrolling in three language courses between 2012 and 2024.',
  },
]

/** Índice del escenario del motor por su identificador, para no escribir números sueltos. */
export function practiceScenario(id: string): Scenario {
  const found = PRACTICE_SCENARIOS.find((item) => item.id === id)
  if (!found) throw new Error(`No hay escenario de práctica «${id}»`)
  return found
}
