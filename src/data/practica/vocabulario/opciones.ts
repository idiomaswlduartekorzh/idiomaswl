import type { VocabEntry } from './schema'

/**
 * Construcción de las opciones de la pregunta de reconocimiento (caja 1).
 *
 * Vive aquí, fuera del componente, por un motivo concreto: **la puerta de calidad tiene que
 * poder auditar exactamente lo que ve el estudiante**. La primera versión barajaba dentro del
 * componente usando `id.length`, que vale lo mismo para las treinta entradas, así que la
 * respuesta correcta caía siempre en la segunda opción. El dato estaba bien y la pantalla mal,
 * y el script no podía verlo porque auditaba el dato.
 *
 * Es el mismo defecto que ya llegó a producción en cinco series de escucha con la correcta
 * siempre en la A. La lección no es «barajar mejor»: es que el barajado sea código compartido
 * y auditable, no una expresión suelta dentro del JSX.
 */

export const N_OPCIONES = 4

/** FNV-1a: determinista, estable entre servidor y cliente, y bien repartido. */
function semilla(texto: string): number {
  let h = 2166136261
  for (const ch of texto) {
    h ^= ch.codePointAt(0)!
    h = Math.imul(h, 16777619)
  }
  return Math.abs(h)
}

/**
 * Devuelve las cuatro opciones ya ordenadas y el índice de la correcta.
 *
 * Sin `Math.random`: el mismo estudiante que recarga la página encuentra la misma pregunta,
 * y el servidor y el cliente pintan lo mismo.
 */
export function opcionesDe(
  entrada: VocabEntry,
  todas: VocabEntry[],
): { opciones: string[]; correcta: number } {
  const pool = todas
    .filter((e) => e.id !== entrada.id && e.es !== entrada.es)
    .map((e) => e.es)

  const base = semilla(entrada.id)
  const distractores: string[] = []
  const usados = new Set<string>()
  for (let k = 0; distractores.length < N_OPCIONES - 1 && k < pool.length * 2; k += 1) {
    const candidato = pool[(base + k * 31) % pool.length]
    if (candidato && !usados.has(candidato)) {
      usados.add(candidato)
      distractores.push(candidato)
    }
  }

  const slot = base % N_OPCIONES
  const opciones = [...distractores]
  opciones.splice(slot, 0, entrada.es)

  return { opciones, correcta: slot }
}
