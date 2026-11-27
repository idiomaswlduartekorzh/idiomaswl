import type { ImprovisaLanguage, ImprovisaLevel } from '@/data/practica/improvisa/config'

export const ADDITIONAL_DILEMMA_LEVELS = ['a1', 'a2', 'b1', 'b2', 'c2'] as const
export type AdditionalDilemmaLevel = (typeof ADDITIONAL_DILEMMA_LEVELS)[number]

export function speakingHubPath(level: ImprovisaLevel, language: ImprovisaLanguage = 'ingles') {
  return `/practica/${language}/${level}/habla`
}

export function dilemmaCollectionPath(level: ImprovisaLevel, language: ImprovisaLanguage = 'ingles') {
  const path = `${speakingHubPath(level, language)}/dilemas`
  return language === 'ingles' && level === 'c1' ? `${path}/temas` : path
}

export const DILEMMA_BASE_PATH = `${speakingHubPath('c1')}/dilemas`
export const PILOT_DILEMMA_SLUG = 'academic-merit'

export function dilemmaPath(level: ImprovisaLevel, slug: string, language: ImprovisaLanguage = 'ingles') {
  const path = `${speakingHubPath(level, language)}/dilemas`
  return language === 'ingles' && level === 'c1' && slug === PILOT_DILEMMA_SLUG ? path : `${path}/${slug}`
}
