import { ROLEPLAY_INGLES_A1_CANDIDATE as ROLEPLAY_INGLES_A1 } from './drafts/index.ts'
import { ROLEPLAY_INGLES_A2_CANDIDATE as ROLEPLAY_INGLES_A2 } from './drafts/index.ts'
import { ROLEPLAY_INGLES_B1_CANDIDATE as ROLEPLAY_INGLES_B1 } from './drafts/index.ts'
import { TOOLKIT_INGLES_A1 } from './toolkit-ingles-a1.ts'
import { TOOLKIT_INGLES_A2 } from './toolkit-ingles-a2.ts'
import { TOOLKIT_INGLES_B1 } from './toolkit-ingles-b1.ts'
import type {
  RoleId,
  RoleplayLanguage,
  RoleplayLevel,
  RoleplayRole,
  RoleplayScenario,
  RoleplayToolkit,
} from './types.ts'

export * from './types.ts'
export { ROLEPLAY_INGLES_A1_CANDIDATE as ROLEPLAY_INGLES_A1 } from './drafts/index.ts'
export { ROLEPLAY_INGLES_A2_CANDIDATE as ROLEPLAY_INGLES_A2 } from './drafts/index.ts'
export { ROLEPLAY_INGLES_B1_CANDIDATE as ROLEPLAY_INGLES_B1 } from './drafts/index.ts'
export { TOOLKIT_INGLES_A1 } from './toolkit-ingles-a1.ts'
export { TOOLKIT_INGLES_A2 } from './toolkit-ingles-a2.ts'
export { TOOLKIT_INGLES_B1 } from './toolkit-ingles-b1.ts'

type RoleplayTargetLabels = {
  word: string
  meaning: string
  here: string
  purpose: string
  form: string
  effect: string
  closing: string
  success: string
  when: string
  register: string
}

export const ROLEPLAY_LANGUAGES: Record<
  RoleplayLanguage,
  { label: string; labelLower: string; flag: string; htmlLang: string; targetLabels: RoleplayTargetLabels }
> = {
  ingles: {
    label: 'Inglés', labelLower: 'inglés', flag: '🇬🇧', htmlLang: 'en',
    targetLabels: { word: 'Word', meaning: 'What it is', here: 'Here', purpose: 'Purpose', form: 'Form', effect: 'Effect', closing: 'Closing criterion', success: 'Success', when: 'When', register: 'Register' },
  },
  coreano: {
    label: 'Coreano', labelLower: 'coreano', flag: '🇰🇷', htmlLang: 'ko',
    targetLabels: { word: '단어', meaning: '뜻', here: '이 상황에서', purpose: '목적', form: '표현', effect: '효과', closing: '마무리 기준', success: '성공', when: '언제', register: '말투' },
  },
  frances: {
    label: 'Francés', labelLower: 'francés', flag: '🇫🇷', htmlLang: 'fr',
    targetLabels: { word: 'Mot', meaning: 'Ce que c’est', here: 'Ici', purpose: 'Fonction', form: 'Forme', effect: 'Effet', closing: 'Critère de fin', success: 'Réussite', when: 'Quand', register: 'Registre' },
  },
  italiano: {
    label: 'Italiano', labelLower: 'italiano', flag: '🇮🇹', htmlLang: 'it',
    targetLabels: { word: 'Parola', meaning: 'Che cos’è', here: 'Qui', purpose: 'Funzione', form: 'Forma', effect: 'Effetto', closing: 'Criterio finale', success: 'Successo', when: 'Quando', register: 'Registro' },
  },
  portugues: {
    label: 'Portugués', labelLower: 'portugués', flag: '🇧🇷', htmlLang: 'pt-BR',
    targetLabels: { word: 'Palavra', meaning: 'O que é', here: 'Aqui', purpose: 'Função', form: 'Forma', effect: 'Efeito', closing: 'Critério de encerramento', success: 'Sucesso', when: 'Quando', register: 'Registro' },
  },
  aleman: {
    label: 'Alemán', labelLower: 'alemán', flag: '🇩🇪', htmlLang: 'de',
    targetLabels: { word: 'Wort', meaning: 'Bedeutung', here: 'Hier', purpose: 'Funktion', form: 'Formulierung', effect: 'Wirkung', closing: 'Abschlusskriterium', success: 'Erfolg', when: 'Wann', register: 'Register' },
  },
  ruso: {
    label: 'Ruso', labelLower: 'ruso', flag: '🇷🇺', htmlLang: 'ru',
    targetLabels: { word: 'Слово', meaning: 'Что это', here: 'Здесь', purpose: 'Цель', form: 'Форма', effect: 'Эффект', closing: 'Критерий завершения', success: 'Успех', when: 'Когда', register: 'Регистр' },
  },
  japones: {
    label: 'Japonés', labelLower: 'japonés', flag: '🇯🇵', htmlLang: 'ja',
    targetLabels: { word: '言葉', meaning: '意味', here: 'この場面で', purpose: '目的', form: '表現', effect: '効果', closing: '終了条件', success: '成功', when: 'いつ', register: '丁寧さ' },
  },
}

export const ROLEPLAY_LEVELS: Record<
  RoleplayLevel,
  { label: string; minutes: string; minMinutes: number; maxMinutes: number; minTurns: number; maxTurns: number }
> = {
  a1: { label: 'A1', minutes: '3–4', minMinutes: 3, maxMinutes: 4, minTurns: 4, maxTurns: 6 },
  a2: { label: 'A2', minutes: '5–8', minMinutes: 5, maxMinutes: 8, minTurns: 6, maxTurns: 9 },
  b1: { label: 'B1', minutes: '6–9', minMinutes: 6, maxMinutes: 9, minTurns: 8, maxTurns: 12 },
}

export type RoleplaySetKey = `${RoleplayLanguage}-${RoleplayLevel}`

export const ROLEPLAY_TARGET_SET_SIZE = 20
export const ROLEPLAY_TARGET_SET_KEYS: RoleplaySetKey[] = Object.keys(ROLEPLAY_LANGUAGES).flatMap(
  (language) => Object.keys(ROLEPLAY_LEVELS).map((level) => `${language}-${level}` as RoleplaySetKey),
)

/**
 * Piso monotónico de contenido ya publicado. Solo puede subir. Los conjuntos nuevos
 * entran directamente con 20; inglés A2 es la única cohorte histórica parcial.
 */
export const ROLEPLAY_PUBLISHED_FLOORS: Partial<Record<RoleplaySetKey, number>> = {
  'ingles-a1': 20,
  'ingles-a2': 20,
  'ingles-b1': 20,
}

/**
 * Registro de habla acompañada.
 *
 * Los conjuntos vivos entran completos y en ningún otro sitio: rutas y sitemap se
 * derivan de este registro.
 */
export type RoleplaySet = {
  language: RoleplayLanguage
  level: RoleplayLevel
  scenarios: RoleplayScenario[]
  toolkit: RoleplayToolkit
}

export const ROLEPLAY_SETS: RoleplaySet[] = [
  {
    language: 'ingles',
    level: 'a1',
    scenarios: ROLEPLAY_INGLES_A1,
    toolkit: TOOLKIT_INGLES_A1,
  },
  {
    language: 'ingles',
    level: 'a2',
    scenarios: ROLEPLAY_INGLES_A2,
    toolkit: TOOLKIT_INGLES_A2,
  },
  {
    language: 'ingles',
    level: 'b1',
    scenarios: ROLEPLAY_INGLES_B1,
    toolkit: TOOLKIT_INGLES_B1,
  },
]

export function roleplaySetKey(language: RoleplayLanguage, level: RoleplayLevel): RoleplaySetKey {
  return `${language}-${level}`
}

export function speakingPath(language: RoleplayLanguage, level: RoleplayLevel): string {
  return `/practica/${language}/${level}/habla`
}

export function soloSpeakingPath(language: RoleplayLanguage, level: RoleplayLevel): string {
  return `${speakingPath(language, level)}/solo`
}

export function accompaniedSpeakingPath(language: RoleplayLanguage, level: RoleplayLevel): string {
  return `${speakingPath(language, level)}/acompanada`
}

export function roleplayToolkitPath(language: RoleplayLanguage, level: RoleplayLevel): string {
  return `${accompaniedSpeakingPath(language, level)}/herramientas`
}

export function roleplayScenarioPath(scenario: RoleplayScenario): string {
  return `${accompaniedSpeakingPath(scenario.language, scenario.level)}/${scenario.slug}`
}

export function roleplayRolePath(scenario: RoleplayScenario, role: RoleId): string {
  return `${roleplayScenarioPath(scenario)}/${role}`
}

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
