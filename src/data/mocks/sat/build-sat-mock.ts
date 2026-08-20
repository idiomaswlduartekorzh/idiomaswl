import type { MCQQuestion, MockExam, MockSection, QuestionInsight } from '../types'
import type { SatDomain, SatModule } from './module-types'

/**
 * Compone un simulacro SAT a partir de dos módulos escritos.
 *
 * Por qué existe: el motor de simulacros sirve secciones lineales, así que un «set» es una
 * secuencia de módulos. `m2` es opcional a propósito: el primer producto publicado es un
 * simulacro de **un solo módulo de 27 ítems**, por decisión de alcance de David el 19 ago
 * 2026 —menos ítems y mejor construidos antes que un examen completo con ítems flojos—.
 * Cuando existan las variantes de M2, se pasan aquí y el set pasa a tener dos secciones.
 *
 * El builder es también el sitio donde se fuerzan tres cosas para que ningún redactor
 * tenga que acordarse de ellas: el `part` de cada ítem, el `stimulusStyle: 'passage'`,
 * sin el cual un texto de 150 palabras se pinta en monoespaciado y no hay quien lo lea, y
 * el paso de `mod.meta` a `section.insights`.
 *
 * Ese tercer punto no es cosmético. Cada ítem lleva cuatro explicaciones escritas y
 * auditadas —por qué la clave lo es y qué error comete quien elige cada distractor—, y
 * hasta que este mapeo existió se quedaban en `meta`, donde solo las leían los scripts de
 * validación. El estudiante no veía ninguna. Si algún día se quitan de aquí, se apagan las
 * explicaciones de la pantalla de revisión sin que nada falle en el build: es un cable,
 * no un adorno.
 */

/** Nombre legible de cada dominio. Es el rótulo del desglose de resultados. */
const DOMAIN_LABEL: Record<SatDomain, string> = {
  CS: 'Craft and Structure',
  II: 'Information and Ideas',
  SEC: 'Standard English Conventions',
  EOI: 'Expression of Ideas',
}

const asInsights = (mod: SatModule): Record<string, QuestionInsight> => {
  const out: Record<string, QuestionInsight> = {}
  for (const m of mod.meta) {
    // Se copia letra a letra en vez de pasar `m.razones` tal cual: así el día que un
    // ítem tenga cinco opciones esto sigue funcionando sin tocar nada.
    const rationales: Record<string, string> = {}
    for (const [letter, why] of Object.entries(m.razones)) rationales[letter] = why
    out[m.id] = {
      domain: m.domain,
      domainLabel: DOMAIN_LABEL[m.domain] ?? m.domain,
      rationales,
    }
  }
  return out
}

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
  insights: asInsights(mod),
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
