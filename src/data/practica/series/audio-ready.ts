/**
 * Interruptor único de audio para las series narrativas A1.
 *
 * `false` = la página se publica con el guion, el vocabulario y las preguntas, pero
 * ListeningJourney avisa de que el audio está en preparación en lugar de pedir un mp3
 * que devolvería 404. También ajusta la metadata, el JSON-LD y la ficha del hub.
 *
 * Se pone a `true` para un idioma SOLO cuando sus 20 archivos definitivos están en
 * `public/audio/<idioma>/a1/listening-01.mp3` … `listening-20.mp3` y commiteados.
 * `scripts/validate-listening-series.mjs` lo verifica en el prebuild: si un idioma dice
 * `true` y falta un archivo —o si lo que hay son placeholders— el build falla.
 *
 * ESTE OBJETO ES LA FUENTE COMMITEADA. El validador lo lee como texto, así que debe
 * seguir siendo un literal plano de cinco líneas `idioma: true|false,`.
 */
export const A1_AUDIO_READY = {
  frances: true,
  portugues: true,
  coreano: true,
  japones: true,
  ruso: true,
} as const

/** Mismo contrato para A2. El validador lo lee como texto: literal plano, una línea por idioma. */
export const A2_AUDIO_READY = {
  italiano: true,
  frances: true,
  portugues: true,
  coreano: true,
  japones: true,
  ruso: true,
} as const

/** Mismo contrato para B1. */
export const B1_AUDIO_READY = {
  italiano: true,
  frances: true,
  portugues: true,
  coreano: true,
  japones: true,
  ruso: true,
} as const

export type A1AudioLanguage = keyof typeof A1_AUDIO_READY
export type ListeningLevel = 'a1' | 'a2' | 'b1'

/**
 * Permite revisar el recorrido completo en local con el audio provisional de
 * `scripts/make-placeholder-audio.mjs`, sin tocar el valor commiteado:
 *
 *   LISTENING_PLACEHOLDER_AUDIO=1 npm run dev
 *
 * Existe porque con el interruptor en `false` el runner bloquea el avance en la fase 2
 * —que es lo correcto en producción— y entonces las fases 3 a 7 no se podrían revisar
 * hasta después de haber pagado la generación. La variable no está en ningún entorno
 * desplegado, así que en producción manda siempre el literal de arriba.
 */
export function audioReady(language: string, level: ListeningLevel = 'a1'): boolean {
  const map: Record<string, boolean> = level === 'b1' ? B1_AUDIO_READY : level === 'a2' ? A2_AUDIO_READY : A1_AUDIO_READY
  return (map[language] ?? false) || process.env.LISTENING_PLACEHOLDER_AUDIO === '1'
}
