export const ADDITIONAL_DILEMMA_LEVELS = ['a1', 'a2', 'b1', 'b2', 'c2'] as const
export type AdditionalDilemmaLevel = (typeof ADDITIONAL_DILEMMA_LEVELS)[number]
export type EnglishDilemmaLevel = AdditionalDilemmaLevel | 'c1'

export function isAdditionalDilemmaLevel(level: string): level is AdditionalDilemmaLevel {
  return ADDITIONAL_DILEMMA_LEVELS.some((item) => item === level)
}

export function englishSpeakingPath(level: EnglishDilemmaLevel) {
  return `/practica/ingles/${level}/habla`
}

export function dilemmaCollectionPath(level: EnglishDilemmaLevel) {
  const path = `${englishSpeakingPath(level)}/dilemas`
  return level === 'c1' ? `${path}/temas` : path
}

export const DILEMMA_BASE_PATH = `${englishSpeakingPath('c1')}/dilemas`
export const PILOT_DILEMMA_SLUG = 'academic-merit'

export function dilemmaPath(level: EnglishDilemmaLevel, slug: string) {
  const path = `${englishSpeakingPath(level)}/dilemas`
  return level === 'c1' && slug === PILOT_DILEMMA_SLUG ? path : `${path}/${slug}`
}
