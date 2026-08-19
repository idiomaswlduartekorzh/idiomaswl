import type { MCQQuestion, MockExam, MockSection } from '../types'
import type { SatModule } from './module-types'

/**
 * Compone un simulacro SAT a partir de dos módulos escritos.
 *
 * Por qué existe: el motor de simulacros sirve secciones lineales, así que un «set» es
 * M1 + una variante de M2. De los tres módulos que se escriben por examen (M1, M2-fácil,
 * M2-difícil) salen dos simulacros que comparten el módulo 1.
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
  m2: SatModule
}): MockExam {
  const { id, title, subtitle, m1, m2 } = args
  return {
    id,
    examSlug: 'sat',
    title,
    subtitle,
    // 32 min por módulo (College Board, verificado 18 ago 2026).
    timeMinutes: 64,
    sections: [
      asSection(m1, 1, 'Módulo 1 — Reading and Writing'),
      asSection(m2, 2, `Módulo 2 — Reading and Writing (${m2.variant === 'M2-dificil' ? 'exigente' : 'estándar'})`),
    ],
  }
}
