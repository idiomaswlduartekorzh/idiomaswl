import type { VocabEntry } from './schema'

/**
 * Lógica de los ejercicios de vocabulario, fuera del componente.
 *
 * Está aquí por la misma razón que `opciones.ts`: lo que vive dentro del JSX no se puede
 * auditar. El barajado de opciones estuvo roto —la correcta caía siempre en la segunda— y el
 * script no lo veía porque auditaba el dato y el defecto estaba en la pantalla. Todo lo que
 * decide qué ve o qué acierta el estudiante vive aquí, en funciones puras que la puerta de
 * calidad puede ejecutar.
 */

/** Raíz tolerante a la flexión: work → wor, teaches ← tea, children ← childr. */
export const raiz = (lemma: string) => lemma.toLowerCase().slice(0, Math.max(3, lemma.length - 2))

export const limpio = (v: string) => v.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '')

export const palabras = (v: string) =>
  v.toLowerCase().replace(/[^\p{L}\p{N}\s’']/gu, ' ').split(/\s+/).filter(Boolean)

/** ¿Aparece la palabra en el texto, aunque venga flexionada? */
export const usa = (texto: string, lemma: string) =>
  palabras(texto).some((p) => p.startsWith(raiz(lemma)))

/**
 * Ahueca la palabra dentro de su frase (caja 4), tolerando la flexión.
 *
 * La puntuación pegada al token se queda en la frase: si se ahuecara «student,» entero, la
 * coma desaparecería y el estudiante vería una frase que no es la que va a oír.
 */
export function ahuecar(
  frase: string,
  lemma: string,
): { antes: string; despues: string; forma: string } | null {
  const stem = raiz(lemma)
  const tokens = frase.split(/(\s+)/)
  const i = tokens.findIndex((t) => t.replace(/[^\p{L}\p{N}’']/gu, '').toLowerCase().startsWith(stem))
  if (i === -1) return null
  const partes = tokens[i].match(/^([^\p{L}\p{N}]*)([\p{L}\p{N}’']+)(.*)$/u)
  if (!partes) return null
  const [, previa, forma, posterior] = partes
  return {
    antes: tokens.slice(0, i).join('') + previa,
    despues: posterior + tokens.slice(i + 1).join(''),
    forma,
  }
}

/**
 * Caja 5 — la frase propia.
 *
 * La primera versión solo comprobaba que la palabra apareciera, así que «father.» pasaba por
 * frase. Eso no es producir, es copiar. Ahora exige la palabra y una frase de verdad, y
 * reconoce —sin exigirlo— que haya usado uno de los chunks de la ficha, que es el objetivo
 * real del enfoque léxico.
 */
export const MIN_PALABRAS_FRASE = 3

const chunksDe = (entrada: VocabEntry) =>
  'colocaciones' in entrada.extra ? entrada.extra.colocaciones : []

/** El chunk sin los puntos suspensivos ni paréntesis con que se anota en la ficha. */
const nucleoChunk = (chunk: string) => chunk.replace(/[…().]/gu, ' ').replace(/\s+/gu, ' ').trim()

export function evaluarFrasePropia(
  texto: string,
  entrada: VocabEntry,
): { ok: boolean; faltas: string[]; chunkUsado?: string } {
  const faltas: string[] = []
  const tokens = palabras(texto)

  if (!usa(texto, entrada.lemma)) {
    faltas.push(`Falta «${entrada.lemma}» en tu frase.`)
  } else if (tokens.length < MIN_PALABRAS_FRASE) {
    faltas.push(`Con «${texto.trim()}» no basta: escribe una frase, no la palabra suelta.`)
  }

  const chunks = chunksDe(entrada)
  const chunkUsado = chunks.find((col) => {
    const clave = nucleoChunk(col.chunk)
    return clave.length > 3 && limpio(texto).includes(limpio(clave))
  })?.chunk

  // Copiar el chunk tal cual no es producir: el chunk es el andamio, no la respuesta.
  // Sin esto, «we are friends» —que está impreso en la ficha— se premiaba y se rechazaba a
  // la vez, y el estudiante se quedaba atascado sin saber qué le pedían.
  const copiaLiteral = chunks.some((col) => limpio(nucleoChunk(col.chunk)) === limpio(texto))
  if (copiaLiteral) {
    faltas.push(`«${texto.trim()}» es el chunk de la ficha tal cual. Añádele algo tuyo y ya está.`)
  }

  const ok = faltas.length === 0
  // El elogio solo cuando la frase vale. Felicitar y suspender a la vez no orienta a nadie.
  return { ok, faltas, chunkUsado: ok ? chunkUsado : undefined }
}

/**
 * Ortografía (caja 2, variante) — se muestra la palabra mal escrita y hay que corregirla.
 *
 * Reconocer una palabra escrita mal exige saber cómo se escribe bien, que es un grado de
 * conocimiento distinto de reconocer el significado. Y las faltas que genera no son al azar:
 * son las que de verdad comete un hispanohablante —*foto* por *photo*, *freind* por *friend*,
 * *fater* por *father*— porque salen de reglas de sustitución, no de barajar letras.
 */
const REGLAS_FALTA: { nombre: string; aplicar: (w: string) => string | null }[] = [
  {
    // Solo si queda una palabra de cuatro letras o más: acortar «meet» da «met», que existe
    // y significa otra cosa. Corregir eso no enseña ortografía, enseña a dudar.
    nombre: 'consonante doble simplificada',
    aplicar: (w) => {
      if (!/(.)\1/.test(w)) return null
      const mal = w.replace(/(.)\1/, '$1')
      return mal.length >= 4 ? mal : null
    },
  },
  { nombre: 'th → t', aplicar: (w) => (w.includes('th') ? w.replace('th', 't') : null) },
  { nombre: 'ph → f', aplicar: (w) => (w.includes('ph') ? w.replace('ph', 'f') : null) },
  { nombre: 'ie → ei', aplicar: (w) => (w.includes('ie') ? w.replace('ie', 'ei') : null) },
  { nombre: 'e final perdida', aplicar: (w) => (w.length > 3 && w.endsWith('e') ? w.slice(0, -1) : null) },
  { nombre: 'y final → i', aplicar: (w) => (w.length > 3 && w.endsWith('y') ? `${w.slice(0, -1)}i` : null) },
  {
    // Último recurso, y solo en palabras largas: en «son» o «boy» la transposición da «sno» y
    // «byo», que no son faltas de nadie — son erratas de teclado. Ahí no hay nada que corregir
    // y la palabra se queda con la variante de la inicial, que sí enseña.
    nombre: 'dos últimas letras cambiadas',
    aplicar: (w) => (w.length >= 5 ? `${w.slice(0, -2)}${w[w.length - 1]}${w[w.length - 2]}` : null),
  },
]

/**
 * Devuelve la palabra mal escrita, o `null` si no se puede generar una falta que no choque
 * con otra palabra del bloque —enseñar «met» como falta de «meet» cuando «met» significa otra
 * cosa confundiría más de lo que enseña.
 */
export function malEscribir(lemma: string, otrosLemas: string[] = []): { mal: string; regla: string } | null {
  const prohibidas = new Set(otrosLemas.map((l) => l.toLowerCase()))
  for (const regla of REGLAS_FALTA) {
    const mal = regla.aplicar(lemma.toLowerCase())
    if (mal && mal !== lemma.toLowerCase() && !prohibidas.has(mal)) {
      return { mal, regla: regla.nombre }
    }
  }
  return null
}

/** ¿Corrigió bien la palabra mal escrita? */
export const corrigioOrtografia = (respuesta: string, lemma: string) =>
  limpio(respuesta) === limpio(lemma)

/** FNV-1a: determinista y estable entre servidor y cliente. Sin `Math.random`. */
export function semilla(texto: string): number {
  let h = 2166136261
  for (const ch of texto) {
    h ^= ch.codePointAt(0)!
    h = Math.imul(h, 16777619)
  }
  return Math.abs(h)
}

export type EjercicioCaja2 =
  | { tipo: 'ortografia'; mal: string; regla: string }
  | { tipo: 'inicial' }

/**
 * La caja 2 alterna dos formas: escribir con la inicial dada, y corregir la palabra mal
 * escrita. Alternar importa — si el peldaño pregunta siempre igual, el estudiante aprende el
 * formato antes que la palabra. El reparto es determinista por `id`, así que la misma palabra
 * siempre trae el mismo ejercicio y el estudiante no ve la pregunta cambiar al recargar.
 */
export function ejercicioCaja2(entrada: VocabEntry, otrosLemas: string[] = []): EjercicioCaja2 {
  if (semilla(entrada.id) % 2 === 0) {
    const falta = malEscribir(entrada.lemma, otrosLemas)
    if (falta) return { tipo: 'ortografia', ...falta }
  }
  return { tipo: 'inicial' }
}

/**
 * Cierre escrito de la unidad — el «día 6» de la semana tipo (metodología §4).
 *
 * Cuenta como frase lo que tiene al menos tres palabras: así «My name is Maya.» cuenta y
 * «Yes.» no, que es la diferencia entre escribir y rellenar.
 */
export const MIN_PALABRAS_USADAS = 5
export const MIN_FRASES = 5

export function progresoEscritura(
  texto: string,
  entradas: VocabEntry[],
): { usadas: VocabEntry[]; frases: number; listo: boolean } {
  const usadas = entradas.filter((e) => usa(texto, e.lemma))
  const frases = texto
    .split(/[.!?]+/u)
    .map((f) => f.trim())
    .filter((f) => palabras(f).length >= 3).length
  return { usadas, frases, listo: usadas.length >= MIN_PALABRAS_USADAS && frases >= MIN_FRASES }
}

/**
 * Corrección del dictado: qué palabras de la frase original faltan en lo que escribió.
 */
export function corregirDictado(
  original: string,
  escrito: string,
): { esperadas: string[]; acertadas: number; falladas: string[] } {
  const esperadas = palabras(original)
  const escritas = new Set(palabras(escrito))
  const falladas = esperadas.filter((p) => !escritas.has(p))
  return { esperadas, acertadas: esperadas.length - falladas.length, falladas }
}
