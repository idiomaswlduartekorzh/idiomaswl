import type { SatModule } from './module-types'
import { items as cs, meta as csMeta } from './blocks/sat-set-1-m2-facil-cs'
import { items as ii, meta as iiMeta } from './blocks/sat-set-1-m2-facil-ii'
import { items as sec, meta as secMeta } from './blocks/sat-set-1-m2-facil-sec'
import { items as eoi, meta as eoiMeta } from './blocks/sat-set-1-m2-facil-eoi'

/**
 * Módulo 2, rama **estándar**: la que se sirve a quien no llega al corte del módulo 1.
 *
 * «Estándar» no quiere decir fácil. Lo que la separa de la rama exigente es la **media**, no
 * la ausencia de los otros niveles: un módulo sin ningún ítem difícil deja de medir a quien
 * va bien, y el examen real tampoco lo hace (blueprint §2, «Módulo 1 vs módulo 2»).
 *
 * **Mezcla medida: 8 fáciles, 12 medios y 7 difíciles. Media 9,33 sobre 15.**
 *
 * El módulo 1 mide 10,19 con la misma vara, así que esta rama queda **0,85 por debajo** y
 * los cuatro bloques están por debajo de su homólogo. Eso es lo que tenía que pasar y no
 * pasaba: durante tres calibraciones esta rama salió MÁS difícil que el módulo que decide
 * quién la recibe, con lo que la adaptación castigaba a quien iba peor.
 *
 * Lo que lo arregló, y conviene saberlo antes de tocar nada: **se bajó por el texto y no
 * por las opciones**. La complejidad del pasaje aporta el 61 % de la separación; la
 * distancia entre opciones se movió −0,04 sobre 3, o sea nada, y el léxico del enunciado
 * tampoco. Aflojar opciones habría reabierto las fugas que costaron once pasadas de panel
 * a ciegas, y el resultado se habría fabricado en vez de conseguirse.
 *
 * Cinco ítems se **reescribieron de cero diseñados fáciles** en vez de ablandarse. Es lo
 * único que movió una banda: ablandar un ítem endurecido agota su margen en tres o cuatro
 * puntos. Un módulo fácil se escribe fácil desde el primer día.
 *
 * El objetivo declarado era 6 · 16 · 5; la mezcla real sale más de barra que de campana y
 * se deja así a propósito. Forzarla dejaría la media donde está —es trasiego de bandas, no
 * bajada— y obligaría a re-endurecer tres pasajes recién ablandados.
 *
 * Mismo reparto y mismo orden de dominios que el módulo 1. Plan en
 * `docs/sat-planes/sat-set-1-m2-facil.md`, con las claves preasignadas.
 *
 * Quien valide esto: `node scripts/check-sat-exam.mjs --module sat-set-1-m2-facil`.
 */
export const satSet1M2Facil: SatModule = {
  id: 'sat-set-1-m2-facil',
  variant: 'M2-facil',
  items: [...cs, ...ii, ...sec, ...eoi],
  meta: [...csMeta, ...iiMeta, ...secMeta, ...eoiMeta],
}
