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

/**
 * Prefijo de la parte para los `id` de los ítems.
 *
 * **Los bloques numeran q01…q27 en los tres módulos**, porque cada uno se escribe y se
 * audita por separado y su plan habla de «q05» sin más. Pero el motor de simulacros
 * guarda las respuestas del estudiante en un diccionario indexado por `id`, así que dos
 * ítems con el mismo nombre en el mismo examen **son el mismo casillero**: contestar el
 * módulo 1 rellenaba solo el módulo 2, y cada respuesta del 2 reescribía hacia atrás la
 * del 1. Medido sobre un estudiante simulado: 27 de 27 en el módulo 1 y ni una del
 * módulo 2 daba **33/54**, con las 54 marcadas como respondidas.
 *
 * Nadie lo vio porque el módulo 2 todavía no está enchufado. Se arregla aquí, en el
 * compositor, y no renumerando los bloques: los planes, las actas y las auditorías
 * hablan de q01…q27 y tienen que seguir hablando de eso.
 */
const conParte = (part: number, id: string) => `p${part}-${id}`

const asInsights = (mod: SatModule, part: number): Record<string, QuestionInsight> => {
  const out: Record<string, QuestionInsight> = {}
  for (const m of mod.meta) {
    // Se copia letra a letra en vez de pasar `m.razones` tal cual: así el día que un
    // ítem tenga cinco opciones esto sigue funcionando sin tocar nada.
    const rationales: Record<string, string> = {}
    for (const [letter, why] of Object.entries(m.razones)) rationales[letter] = why
    out[conParte(part, m.id)] = {
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
  variant: mod.variant,
  skill: 'reading',
  instructions:
    'Cada pregunta trae su propio texto. Lee el texto y elige la opción que mejor responde. ' +
    'Puedes moverte libremente entre las preguntas de este módulo.',
  questions: mod.items.map(
    (q): MCQQuestion => ({
      ...q,
      id: conParte(part, q.id),
      part,
      stimulusStyle: q.stimulusStyle ?? 'passage',
    }),
  ),
  insights: asInsights(mod, part),
})

/** Minutos por módulo. College Board, verificado el 18 ago 2026. */
const MINUTOS_POR_MODULO = 32

/**
 * Aciertos del módulo 1 a partir de los cuales se sirve el módulo exigente.
 *
 * **Es convención de WeLearn, no de College Board**: el punto de corte real del SAT no
 * se publica. 16 de 27 son un 59 %, algo por encima de la mitad, que es donde cae la
 * frontera en las descripciones públicas del enrutado por etapas. Se deja en una
 * constante con nombre y no incrustado, para que el día que haya un dato mejor se
 * cambie en un sitio y se sepa qué se está cambiando.
 */
const CORTE_MODULO_EXIGENTE = 16

const cuentaDominios = (mod: SatModule): string => {
  const cuenta = new Map<SatDomain, number>()
  for (const item of mod.meta) cuenta.set(item.domain, (cuenta.get(item.domain) ?? 0) + 1)
  return (Object.keys(DOMAIN_LABEL) as SatDomain[])
    .map((domain) => `${domain}:${cuenta.get(domain) ?? 0}`)
    .join('|')
}

function validarModulosAdaptativos(m1: SatModule, facil: SatModule, dificil: SatModule): void {
  if (m1.variant !== 'M1' || facil.variant !== 'M2-facil' || dificil.variant !== 'M2-dificil') {
    throw new Error(
      `buildSatMock: variantes inválidas (${m1.variant}, ${facil.variant}, ${dificil.variant}). ` +
      'El orden M1 → M2-facil → M2-dificil es parte del contrato de enrutado.',
    )
  }
  if (!m1.items.length || !facil.items.length || !dificil.items.length) {
    throw new Error('buildSatMock: ningún módulo adaptativo puede estar vacío.')
  }
  if (facil.items.length !== dificil.items.length) {
    throw new Error(
      `buildSatMock: las ramas de M2 tienen ${facil.items.length} y ${dificil.items.length} ítems. ` +
      'El denominador del resultado no puede depender de la ruta.',
    )
  }
  const dominiosFacil = cuentaDominios(facil)
  const dominiosDificil = cuentaDominios(dificil)
  if (dominiosFacil !== dominiosDificil) {
    throw new Error(
      `buildSatMock: las ramas de M2 no tienen el mismo reparto por dominio ` +
      `(${dominiosFacil} frente a ${dominiosDificil}).`,
    )
  }
}

export function buildSatMock(args: {
  id: string
  title: string
  subtitle: string
  m1: SatModule
  /** Las dos ramas del módulo 2. O se pasan las dos, o ninguna: media adaptación no es adaptación. */
  m2Facil?: SatModule
  m2Dificil?: SatModule
}): MockExam {
  const { id, title, subtitle, m1, m2Facil, m2Dificil } = args

  if (Boolean(m2Facil) !== Boolean(m2Dificil)) {
    throw new Error(
      'buildSatMock: el módulo 2 va en dos ramas, fácil y difícil. Con una sola no hay enrutado ' +
      'que hacer, y servirla a todo el mundo sería llamar «adaptativo» a un examen lineal.',
    )
  }

  if (m2Facil && m2Dificil) validarModulosAdaptativos(m1, m2Facil, m2Dificil)

  const sections = [asSection(m1, 1, 'Módulo 1 — Reading and Writing')]

  if (m2Facil && m2Dificil) {
    // Las dos ramas viven en el examen; el motor sirve solo una. Ver `adaptive` en
    // src/data/mocks/types.ts y el enrutado en PracticeClient.
    sections.push(asSection(m2Facil, 2, 'Módulo 2 — Reading and Writing (estándar)'))
    sections.push(asSection(m2Dificil, 3, 'Módulo 2 — Reading and Writing (exigente)'))
  }

  const adaptativo = Boolean(m2Facil && m2Dificil)

  return {
    id,
    examSlug: 'sat',
    title,
    subtitle,
    // El estudiante hace SIEMPRE dos módulos cuando hay enrutado, aunque el examen
    // lleve escritas tres partes. Contar las secciones daría 96 minutos y sería falso.
    timeMinutes: MINUTOS_POR_MODULO * (adaptativo ? 2 : 1),
    ...(adaptativo
      ? {
          adaptive: {
            routeAfterPart: 1,
            correctToRouteHigh: CORTE_MODULO_EXIGENTE,
            lowPart: 2,
            highPart: 3,
            minutesPerModule: MINUTOS_POR_MODULO,
          },
        }
      : {}),
    sections,
  }
}
