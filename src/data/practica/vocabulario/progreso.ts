import type { VocabEntry } from './schema'

/**
 * El progreso de una unidad, guardado entre sesiones.
 *
 * Existe porque la auditoría de usuario encontró el motivo de abandono más caro del motor:
 * **salir borraba todo**. Una unidad son cincuenta ejercicios y entre veinticinco y cuarenta
 * minutos; el estudiante que quería volver a mirar una ficha tenía dos opciones, fallar a
 * propósito o pulsar «Salir» y perderlo todo sin aviso.
 *
 * La lógica vive aquí y no dentro del componente, por la misma razón de siempre: lo que
 * decide qué ve o qué conserva el estudiante tiene que poder ejecutarlo la puerta de calidad.
 * El hook del componente solo se ocupa de `localStorage`, que en Node no existe.
 *
 * La clave es por BLOQUE y no por unidad. Las unidades se derivan del reparto —y ese reparto
 * ya cambió una vez, cuando tres bloques pasaron a 31 entradas— así que guardar por índice de
 * unidad habría dejado el progreso colgado del día que se añada una palabra. Los `id` de las
 * entradas, en cambio, son estables: son la clave del SRS.
 */

export const CAJA_INICIAL = 1
export const CAJA_DOMINADA = 6

export type ProgresoBloque = {
  /** Caja de cada entrada, por `id`. Ausente = sin empezar. */
  cajas: Record<string, number>
  /** ISO 8601. Se pasa desde fuera: aquí no se lee el reloj, para poder auditar. */
  actualizado: string
}

export const claveDe = (lang: string, nivel: string, bloque: string) =>
  `wl-vocab-${lang}-${nivel}-${bloque}`

export const progresoVacio = (): ProgresoBloque => ({ cajas: {}, actualizado: '' })

/**
 * Junta lo guardado con las entradas de hoy.
 *
 * Descarta los `id` que ya no existen y arranca en la caja 1 los que son nuevos. Sin esto,
 * añadir una palabra a un bloque publicado dejaría a quien ya lo había estudiado con una
 * entrada fantasma en el contador, y quitar otra rompería el recuento de «dominadas».
 */
export function fusionar(guardado: ProgresoBloque | null, entradas: VocabEntry[]): Record<string, number> {
  const previo = guardado?.cajas ?? {}
  const out: Record<string, number> = {}
  for (const e of entradas) {
    const n = previo[e.id]
    out[e.id] = Number.isInteger(n) && n >= CAJA_INICIAL && n <= CAJA_DOMINADA ? n : CAJA_INICIAL
  }
  return out
}

/** Lo que hay que enseñarle al estudiante para que sepa si retoma o empieza. */
export function resumen(cajas: Record<string, number>, entradas: VocabEntry[]) {
  let dominadas = 0
  let empezadas = 0
  for (const e of entradas) {
    const c = cajas[e.id] ?? CAJA_INICIAL
    if (c >= CAJA_DOMINADA) dominadas += 1
    else if (c > CAJA_INICIAL) empezadas += 1
  }
  return {
    dominadas,
    empezadas,
    sinEmpezar: entradas.length - dominadas - empezadas,
    /** Hay algo que retomar solo si se avanzó de verdad, no por haber abierto la pantalla. */
    hayQueRetomar: dominadas + empezadas > 0,
  }
}

/**
 * ¿Se puede confiar en lo que había guardado?
 *
 * `JSON.parse` de `localStorage` devuelve lo que sea que hubiera ahí: contenido de otra
 * versión, de otra pestaña, o basura. Comprobar la forma antes de usarla evita que un valor
 * raro deje al estudiante con una unidad medio dominada que nunca hizo.
 */
export function esProgresoValido(v: unknown): v is ProgresoBloque {
  if (!v || typeof v !== 'object') return false
  const p = v as Partial<ProgresoBloque>
  if (typeof p.actualizado !== 'string') return false
  if (!p.cajas || typeof p.cajas !== 'object') return false
  return Object.values(p.cajas).every((n) => Number.isInteger(n) && (n as number) >= 1 && (n as number) <= CAJA_DOMINADA)
}
