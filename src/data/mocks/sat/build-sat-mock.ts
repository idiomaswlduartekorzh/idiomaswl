import type { MCQQuestion, MockExam, MockSection } from '../types'
import type { SatModule } from './module-types'

/**
 * Compone un simulacro SAT a partir de dos módulos escritos.
 *
 * Por qué existe: el motor de simulacros sirve secciones lineales, así que un «set» es una
 * secuencia de módulos. `m2` es opcional a propósito: el primer producto publicado es un
 * simulacro de **un solo módulo de 27 ítems**, por decisión de alcance de David el 19 ago
 * 2026 —menos ítems y mejor construidos antes que un examen completo con ítems flojos—.
 * Cuando existan las variantes de M2, se pasan aquí y el set pasa a tener dos secciones.
 *
 * El builder es también el sitio donde se fuerzan dos cosas para que ningún redactor
 * tenga que acordarse de ellas: el `part` de cada ítem y el `stimulusStyle: 'passage'`,
 * sin el cual un texto de 150 palabras se pinta en monoespaciado y no hay quien lo lea.
 */

const asSection = (mod: SatModule, part: number, title: string): MockSection => ({
  part,
  title,
  skill: 'reading',
  instructions:
    'Cada pregunta trae su propio texto. Lee el texto y elige la opción que mejor responde. ' +
    'Puedes moverte libremente entre las preguntas de este módulo.',
  questions: mod.items.map(
    (q): MCQQuestion => ({ ...q, part, stimulusStyle: q.stimulusStyle ?? 'passage' }),
  ),
})

export function buildSatMock(args: {
  id: string
  title: string
  subtitle: string
  m1: SatModule
  m2?: SatModule
}): MockExam {
  const { id, title, subtitle, m1, m2 } = args
  const sections = [asSection(m1, 1, 'Módulo 1 — Reading and Writing')]
  if (m2) {
    sections.push(
      asSection(m2, 2, `Módulo 2 — Reading and Writing (${m2.variant === 'M2-dificil' ? 'exigente' : 'estándar'})`),
    )
  }
  return {
    id,
    examSlug: 'sat',
    title,
    subtitle,
    // 32 min por módulo (College Board, verificado 18 ago 2026).
    timeMinutes: 32 * sections.length,
    sections,
  }
}
