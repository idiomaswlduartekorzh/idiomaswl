import type { MCQQuestion } from '../types'

/**
 * Contrato de un módulo SAT. Lo exige `scripts/check-sat-exam.mjs`.
 *
 * Los ítems son `MCQQuestion` normales —los mismos que IELTS, TOEFL e ICFES— para no
 * tocar el motor de simulacros. Todo lo que el examen SAT necesita y un MCQ no tiene
 * (dominio, tipo, dificultad, tema, y la razón de error de cada opción) vive aparte, en
 * `meta`, emparejado por `id`.
 *
 * Se separa a propósito: meterlo dentro del ítem obligaría a cambiar `MCQQuestion`, que
 * usan otros cuatro exámenes ya publicados.
 */

/** Los cuatro dominios, en el orden fijo en que aparecen dentro de un módulo. */
export type SatDomain = 'CS' | 'II' | 'SEC' | 'EOI'

export const SAT_DOMAIN_ORDER: SatDomain[] = ['CS', 'II', 'SEC', 'EOI']

/** Reparto por módulo derivado de los pesos oficiales (blueprint §2). No es un rango. */
export const SAT_DOMAIN_COUNTS: Record<SatDomain, number> = { CS: 8, II: 7, SEC: 7, EOI: 5 }

/** Tipos de ítem admitidos por dominio (blueprint §2, verificado contra College Board). */
export const SAT_TYPES_BY_DOMAIN: Record<SatDomain, string[]> = {
  CS: ['words-in-context', 'text-structure-purpose', 'cross-text-connections'],
  II: ['central-ideas-details', 'command-of-evidence-textual', 'command-of-evidence-quantitative', 'inferences'],
  SEC: ['boundaries', 'form-structure-sense'],
  EOI: ['rhetorical-synthesis', 'transitions'],
}

/**
 * La página del espinazo que explica cada dominio. Es lo que convierte el desglose de
 * la pantalla de resultados en algo accionable: el estudiante falla seis de ocho en
 * Craft and Structure y tiene dónde ir a arreglarlo.
 *
 * Vive aquí y no en `src/data/satGuides.ts` a propósito: la pantalla de resultados es
 * un componente de cliente, e importar allí el archivo de las guías metería en el
 * paquete del navegador el texto entero de las páginas. `scripts/check-sat-superhub.mjs`
 * comprueba que cada slug de este mapa exista de verdad como guía escrita.
 */
export const SAT_DOMAIN_GUIDE_SLUG: Record<SatDomain, string> = {
  CS: 'craft-and-structure',
  II: 'information-and-ideas',
  SEC: 'standard-english-conventions',
  EOI: 'expression-of-ideas',
}

export type SatTopic = 'ciencia' | 'historia' | 'humanidades' | 'literatura'

export type SatVariant = 'M1' | 'M2-facil' | 'M2-dificil'

export interface SatItemMeta {
  /** Mismo `id` que el `MCQQuestion` al que acompaña. */
  id: string
  domain: SatDomain
  /** Uno de `SAT_TYPES_BY_DOMAIN[domain]`. */
  tipo: string
  /** 1 fácil · 2 medio · 3 difícil. La suma de los cinco ejes la calcula el calibrador. */
  dificultad: 1 | 2 | 3
  tema: SatTopic
  /** Solo en Standard English Conventions: la regla que examina el ítem, nombrada. */
  regla?: string
  /**
   * Por qué la clave es la clave, y qué error concreto comete quien elige cada distractor.
   * Las cuatro claves A-D son obligatorias. Un distractor sin razón no está terminado.
   */
  razones: { A: string; B: string; C: string; D: string }
  /** Si el texto se apoya en un hecho real, de dónde sale. */
  fuenteHecho?: string
}

export interface SatModule {
  /** p. ej. `sat-set-1-m1`. */
  id: string
  variant: SatVariant
  /** 27 ítems, todos puntuables. El examen real mete 25 + 2 de prueba; nosotros no. */
  items: MCQQuestion[]
  /** Un `SatItemMeta` por ítem, emparejado por `id`. */
  meta: SatItemMeta[]
}
