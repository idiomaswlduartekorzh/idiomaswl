export const IMPROVISA_LANGUAGES = ['ingles', 'frances', 'aleman', 'italiano', 'portugues', 'ruso', 'japones', 'coreano'] as const
export const IMPROVISA_LEVELS = ['a1', 'a2', 'b1', 'b2', 'c1', 'c2'] as const
export type ImprovisaLanguage = (typeof IMPROVISA_LANGUAGES)[number]
export type ImprovisaLevel = (typeof IMPROVISA_LEVELS)[number]

export const LANGUAGE_NAMES: Record<ImprovisaLanguage, { es: string; en: string; target: string; code: string }> = {
  ingles: { es: 'Inglés', en: 'English', target: 'English', code: 'en' },
  frances: { es: 'Francés', en: 'French', target: 'Français', code: 'fr' },
  aleman: { es: 'Alemán', en: 'German', target: 'Deutsch', code: 'de' },
  italiano: { es: 'Italiano', en: 'Italian', target: 'Italiano', code: 'it' },
  portugues: { es: 'Portugués', en: 'Portuguese', target: 'Português', code: 'pt' },
  ruso: { es: 'Ruso', en: 'Russian', target: 'Русский', code: 'ru' },
  japones: { es: 'Japonés', en: 'Japanese', target: '日本語', code: 'ja' },
  coreano: { es: 'Coreano', en: 'Korean', target: '한국어', code: 'ko' },
}

export type ImprovisaExercise = {
  title: { es: string; target: string }
  question: string
  questionEs?: string
  followUp: string
  focus: { es: string; target: string }
  cues: { category: { es: string; target: string }; word: string; gloss: string }[]
}

export function isImprovisaLanguage(value: string): value is ImprovisaLanguage {
  return IMPROVISA_LANGUAGES.some((language) => language === value)
}
export function isImprovisaLevel(value: string): value is ImprovisaLevel {
  return IMPROVISA_LEVELS.some((level) => level === value)
}


export function improvisaPath(language: ImprovisaLanguage, level: ImprovisaLevel) {
  return `/practica/${language}/${level}/habla/solo/improvisa`
}
