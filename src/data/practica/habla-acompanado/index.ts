import { ROLEPLAY_INGLES_A2 } from './ingles-a2'
import { TOOLKIT_INGLES_A2 } from './toolkit-ingles-a2'
import type {
  RoleId,
  RoleplayLanguage,
  RoleplayLevel,
  RoleplayRole,
  RoleplayScenario,
  RoleplayToolkit,
} from './types'

export * from './types'
export { ROLEPLAY_INGLES_A2 } from './ingles-a2'
export { TOOLKIT_INGLES_A2 } from './toolkit-ingles-a2'

/**
 * Registro de habla acompañada.
 *
 * Hoy hay un solo conjunto vivo —inglés A2, el piloto—. Los otros siete idiomas y los
 * otros dos niveles entran aquí y en ningún otro sitio: las rutas se derivan de este
 * registro, no de una lista escrita a mano en `app/`.
 */
export type RoleplaySet = {
  language: RoleplayLanguage
  level: RoleplayLevel
  /** Cómo se llama el idioma en el migajero y en los títulos. */
  languageLabel: string
  scenarios: RoleplayScenario[]
  toolkit: RoleplayToolkit
}

export const ROLEPLAY_SETS: RoleplaySet[] = [
  {
    language: 'ingles',
    level: 'a2',
    languageLabel: 'Inglés',
    scenarios: ROLEPLAY_INGLES_A2,
    toolkit: TOOLKIT_INGLES_A2,
  },
]

export function getRoleplaySet(language: string, level: string): RoleplaySet | null {
  return ROLEPLAY_SETS.find((set) => set.language === language && set.level === level) ?? null
}

export function getRoleplayScenario(
  language: string,
  level: string,
  slug: string,
): RoleplayScenario | null {
  return getRoleplaySet(language, level)?.scenarios.find((s) => s.slug === slug) ?? null
}

export function getRoleplayRole(scenario: RoleplayScenario, roleId: string): RoleplayRole | null {
  return scenario.roles.find((role) => role.id === roleId) ?? null
}

export function isRoleId(value: string): value is RoleId {
  return value === 'a' || value === 'b'
}

/** El otro rol. Para el enlace de «esta pantalla no es la tuya». */
export function otherRole(scenario: RoleplayScenario, roleId: RoleId): RoleplayRole {
  return roleId === 'a' ? scenario.roles[1] : scenario.roles[0]
}

/**
 * Lo que el motor no hace, dicho con las mismas palabras en las tres pantallas.
 * §8 del blueprint. No es letra pequeña de un informe: el estudiante tiene que leerlo
 * antes de contar con este modo, sobre todo el tercero.
 */
export const ROLEPLAY_LIMITS: { title: string; body: string }[] = [
  {
    title: 'No hay sincronía entre las dos pantallas',
    body: 'Cada uno abre su ficha en su dispositivo y no pasa nada entre ellos. El reloj lo llevan ustedes, y la carta de complicación la abre quien la tenga, cuando le toque.',
  },
  {
    title: 'No se graba nada',
    body: 'No hay micrófono, no hay audio guardado, no hay evaluación automática y no queda progreso. Lo que se dijo se lo quedan ustedes dos.',
  },
  {
    title: 'No hay emparejador',
    body: 'El sitio no te busca compañero. Si no tienes con quién hablar, este modo no te sirve todavía: usa «habla solo», que son 20 frases con pronunciación y no necesitan a nadie.',
  },
]
