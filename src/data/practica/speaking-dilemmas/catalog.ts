import { IMPROVISA_LANGUAGES, IMPROVISA_LEVELS, type ImprovisaLanguage, type ImprovisaLevel } from '@/data/practica/improvisa/config'
import { SPEAKING_DILEMMAS } from './index'
import { DILEMMAS_BY_LEVEL } from './levels'
import type { SpeakingDilemma } from './types'

type LocalizedLanguage = Exclude<ImprovisaLanguage, 'ingles'>
type CollectionLoader = () => Promise<{ default: unknown }>

const localized: Record<LocalizedLanguage, Record<ImprovisaLevel, CollectionLoader>> = {
  frances: {
    a1: () => import('./localized/frances/a1.json'),
    a2: () => import('./localized/frances/a2.json'),
    b1: () => import('./localized/frances/b1.json'),
    b2: () => import('./localized/frances/b2.json'),
    c1: () => import('./localized/frances/c1.json'),
    c2: () => import('./localized/frances/c2.json'),
  },
  aleman: {
    a1: () => import('./localized/aleman/a1.json'),
    a2: () => import('./localized/aleman/a2.json'),
    b1: () => import('./localized/aleman/b1.json'),
    b2: () => import('./localized/aleman/b2.json'),
    c1: () => import('./localized/aleman/c1.json'),
    c2: () => import('./localized/aleman/c2.json'),
  },
  italiano: {
    a1: () => import('./localized/italiano/a1.json'),
    a2: () => import('./localized/italiano/a2.json'),
    b1: () => import('./localized/italiano/b1.json'),
    b2: () => import('./localized/italiano/b2.json'),
    c1: () => import('./localized/italiano/c1.json'),
    c2: () => import('./localized/italiano/c2.json'),
  },
  portugues: {
    a1: () => import('./localized/portugues/a1.json'),
    a2: () => import('./localized/portugues/a2.json'),
    b1: () => import('./localized/portugues/b1.json'),
    b2: () => import('./localized/portugues/b2.json'),
    c1: () => import('./localized/portugues/c1.json'),
    c2: () => import('./localized/portugues/c2.json'),
  },
  ruso: {
    a1: () => import('./localized/ruso/a1.json'),
    a2: () => import('./localized/ruso/a2.json'),
    b1: () => import('./localized/ruso/b1.json'),
    b2: () => import('./localized/ruso/b2.json'),
    c1: () => import('./localized/ruso/c1.json'),
    c2: () => import('./localized/ruso/c2.json'),
  },
  japones: {
    a1: () => import('./localized/japones/a1.json'),
    a2: () => import('./localized/japones/a2.json'),
    b1: () => import('./localized/japones/b1.json'),
    b2: () => import('./localized/japones/b2.json'),
    c1: () => import('./localized/japones/c1.json'),
    c2: () => import('./localized/japones/c2.json'),
  },
  coreano: {
    a1: () => import('./localized/coreano/a1.json'),
    a2: () => import('./localized/coreano/a2.json'),
    b1: () => import('./localized/coreano/b1.json'),
    b2: () => import('./localized/coreano/b2.json'),
    c1: () => import('./localized/coreano/c1.json'),
    c2: () => import('./localized/coreano/c2.json'),
  },
}

// The original English C1 pilot and topic list have their own routes.
export const DILEMMA_COLLECTION_PARAMS = IMPROVISA_LANGUAGES.flatMap((idioma) => (
  IMPROVISA_LEVELS
    .filter((nivel) => idioma !== 'ingles' || nivel !== 'c1')
    .map((nivel) => ({ idioma, nivel }))
))

const english = { ...DILEMMAS_BY_LEVEL, c1: SPEAKING_DILEMMAS }

export async function loadDilemmaCollection(language: ImprovisaLanguage, level: ImprovisaLevel): Promise<readonly SpeakingDilemma[]> {
  if (language === 'ingles') return english[level]

  const { default: collection } = await localized[language][level]()
  return collection as readonly SpeakingDilemma[]
}
