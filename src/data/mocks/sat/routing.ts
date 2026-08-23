import type { AdaptiveRouting } from '../types'

/**
 * La decisión de enrutado, fuera del componente.
 *
 * Vive aquí y no dentro de PracticeClient por una razón práctica: dentro de React solo
 * se puede comprobar abriendo un navegador, y en esta máquina no se abre. Aquí se puede
 * examinar con un script, que es lo que hace `scripts/check-sat-adaptive.mjs`.
 */

export type RamaModulo2 = 'low' | 'high'

/** Qué rama del módulo 2 le toca a quien acertó `aciertos` en el módulo 1. */
export function elegirRamaModulo2(aciertos: number, routing: AdaptiveRouting): RamaModulo2 {
  return aciertos >= routing.correctToRouteHigh ? 'high' : 'low'
}

/** La parte concreta que corresponde a una rama. */
export function parteParaRama(rama: RamaModulo2, routing: AdaptiveRouting): number {
  return rama === 'high' ? routing.highPart : routing.lowPart
}

/** Las partes que ese estudiante llega a ver. Nunca las tres. */
export function partesServidas(rama: RamaModulo2, routing: AdaptiveRouting): number[] {
  return [routing.routeAfterPart, parteParaRama(rama, routing)]
}

/**
 * Las partes por las que puede navegar en la etapa actual.
 *
 * `partesServidas` conserva M1 para puntuar y revisar el resultado final. Esta función
 * es deliberadamente más estricta: después del corte solo deja M2, porque un módulo ya
 * entregado no puede volver a abrirse ni modificar la ruta que ya produjo.
 */
export function partesNavegables(
  rama: RamaModulo2 | null,
  routing: AdaptiveRouting,
): number[] {
  return rama ? [parteParaRama(rama, routing)] : [routing.routeAfterPart]
}
