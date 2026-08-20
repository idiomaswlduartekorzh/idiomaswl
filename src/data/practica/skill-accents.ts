/**
 * El acento de cada habilidad de práctica. Fuente de verdad única.
 *
 * El problema que resuelve: hasta ahora la tarjeta del hub y la página a la que lleva
 * escribían su color por separado, y dejaron de coincidir. Los 26 hubs de nivel anuncian
 * Gramática en morado; las páginas de gramática usan seis acentos distintos según el idioma
 * y ninguno es morado. Escucha se anuncia en azul petróleo y por dentro es azul brillante.
 * El estudiante ve un color, hace clic y aterriza en otro.
 *
 * La regla, por tanto: **ambos lados importan de aquí**. Nadie vuelve a escribir el color a
 * mano, ni en la tarjeta ni en la página.
 *
 * Para pintar, usa `var` — así el color se adapta solo al modo oscuro:
 *
 *     import { SKILL_ACCENT } from '@/data/practica/skill-accents'
 *     <div style={{ '--wlp-accent': SKILL_ACCENT.lectura.var }} className="wlp-page">
 *
 * `light` y `dark` son los literales que hay detrás de esa variable. Están aquí para los
 * sitios donde el CSS no llega —las imágenes OG, que se generan en el servidor— y para
 * poder leer la paleta de un vistazo. En una página normal no se usan: si te encuentras
 * escribiendo `SKILL_ACCENT.x.light` dentro de un componente, casi seguro querías `.var`.
 *
 * Un acento por habilidad, igual en los ocho idiomas. Los acentos por bandera que tenía
 * lectura se retiraron: hacían que la misma destreza cambiara de color entre idiomas.
 *
 * Los valores claros salen de la paleta de Task 2 Writing, que es la referencia visual de
 * la sección. Los oscuros son los que el arreglo de modo oscuro ya había calibrado para
 * estos fondos. Ver `docs/sistema-visual-practica.md`.
 */

export type SkillId =
  | 'lectura'
  | 'gramatica'
  | 'escritura'
  | 'habla'
  | 'vocabulario'
  | 'escucha'

export type SkillAccent = {
  /** Lo que se usa para pintar. Cambia solo entre claro y oscuro. */
  var: string
  /** El literal en modo claro. Solo para donde no llega el CSS. */
  light: string
  /** El literal en modo oscuro. Solo para donde no llega el CSS. */
  dark: string
}

export const SKILL_ACCENT: Record<SkillId, SkillAccent> = {
  lectura: { var: 'var(--wlp-accent-lectura)', light: '#1c4b9c', dark: '#86b4ff' },
  gramatica: { var: 'var(--wlp-accent-gramatica)', light: '#6941a5', dark: '#b79bea' },
  escritura: { var: 'var(--wlp-accent-escritura)', light: '#18794e', dark: '#45c88a' },
  habla: { var: 'var(--wlp-accent-habla)', light: '#a84f08', dark: '#f2b65a' },
  vocabulario: { var: 'var(--wlp-accent-vocabulario)', light: '#b42332', dark: '#ff8f99' },
  escucha: { var: 'var(--wlp-accent-escucha)', light: '#176b87', dark: '#6fd0e8' },
}

export const SKILL_IDS = Object.keys(SKILL_ACCENT) as SkillId[]

/** `true` si la cadena nombra una habilidad; útil para validar un parámetro de ruta. */
export function isSkillId(value: string): value is SkillId {
  return value in SKILL_ACCENT
}
