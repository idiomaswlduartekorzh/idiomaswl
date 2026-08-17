/**
 * El formato común que devuelven todos los idiomas del transcriptor.
 *
 * Existe por una razón concreta y aprendida: la primera versión traía los campos `us` y
 * `uk` —británico y americano—, que son del inglés. El coreano necesita otros dos (AFI y
 * romanización) y además una cosa que el inglés no tiene: cómo se escribiría en hangul lo
 * que de verdad se pronuncia. Forzar el coreano dentro del molde inglés habría funcionado
 * hoy y sería un desastre al cuarto idioma.
 *
 * En este repositorio ya hay una cicatriz de eso: la pantalla de habla acabó copiada 24
 * veces y hubo que dedicar una fase entera a deshacerlo (`docs/sistema-visual-practica.md`).
 * Con dos idiomas el molde se generaliza en una tarde; con ocho, no.
 *
 * La regla, por tanto: **un idioma nuevo aporta sus sistemas de notación y su motor, no su
 * pantalla.**
 */

export type TokenStatus =
  /** Se pudo transcribir con seguridad. */
  | 'ok'
  /** Se dedujo de una palabra conocida: `rebooting` desde `reboot`. */
  | 'derived'
  /** No se pudo transcribir. Se muestra marcada, sin inventar. */
  | 'unknown'

/**
 * Una forma de escribir la pronunciación.
 *
 * El inglés ofrece dos acentos; el coreano, alfabeto fonético y romanización. Son cosas
 * distintas —un acento es otra pronunciación, una romanización es la misma pronunciación
 * escrita de otra manera— pero para la pantalla se comportan igual: son columnas entre las
 * que el estudiante elige.
 */
export interface NotationSystem {
  readonly id: string
  readonly label: string
  /** Aclaración corta bajo la etiqueta. */
  readonly hint?: string
  /**
   * Este sistema no dice cómo suena, solo cómo se escribe con nuestro alfabeto.
   *
   * La pantalla lo avisa. La romanización coreana engaña: `학교` se romaniza `hakgyo`, y
   * eso le dice a un hispanohablante que pronuncie justo lo que no suena.
   */
  readonly noEsPronunciacion?: boolean
}

export interface WordToken {
  readonly kind: 'word'
  readonly text: string
  /** Pronunciaciones por sistema. Cada sistema puede traer varias variantes. */
  readonly forms: Record<string, string[]>
  /**
   * Por sistema y variante: esa forma acaba en una /r/ que solo suena ante vocal.
   * Solo el inglés lo usa; los demás idiomas lo omiten.
   */
  readonly linking?: Record<string, boolean[]>
  /** La palabra siguiente empieza por vocal, así que la /r/ de enlace suena. */
  readonly followedByVowel?: boolean
  /** Forma reducida dentro de la frase, por sistema. Solo inglés. */
  readonly weak?: Record<string, string> | null
  /**
   * Cómo se escribiría en la lengua original lo que de verdad se pronuncia.
   * En coreano `학교` da `학꾜`, y ver eso es media clase de fonética.
   */
  readonly spoken?: string
  readonly status: TokenStatus
}

/** Espacios y signos: se conservan tal cual para no perder la forma del texto. */
export interface PlainToken { readonly kind: 'plain'; readonly text: string }
export interface BreakToken { readonly kind: 'break' }

export type Token = WordToken | PlainToken | BreakToken
