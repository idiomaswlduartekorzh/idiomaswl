import type { GrammarTopic } from './types'
import inglesA1 from './ingles/a1'
import inglesA2 from './ingles/a2'
import francesA1 from './frances/a1'
import francesA2 from './frances/a2'
import alemanA1 from './aleman/a1'
import alemanA2 from './aleman/a2'
import coreanoA1 from './coreano/a1'
import coreanoA2 from './coreano/a2'
import italianoA1 from './italiano/a1'
import italianoA2 from './italiano/a2'
import portuguesA1 from './portugues/a1'
import portuguesA2 from './portugues/a2'
import japonesA1 from './japones/a1'
import japonesA2 from './japones/a2'
import rusoA1 from './ruso/a1'
import rusoA2 from './ruso/a2'

export const grammarRegistry: Record<string, Record<string, GrammarTopic[]>> = {
  ingles: { a1: inglesA1, a2: inglesA2 },
  frances: { a1: francesA1, a2: francesA2 },
  aleman: { a1: alemanA1, a2: alemanA2 },
  coreano: { a1: coreanoA1, a2: coreanoA2 },
  italiano: { a1: italianoA1, a2: italianoA2 },
  portugues: { a1: portuguesA1, a2: portuguesA2 },
  japones: { a1: japonesA1, a2: japonesA2 },
  ruso: { a1: rusoA1, a2: rusoA2 },
}

export function getTopicsByLevel(idioma: string, nivel: string): GrammarTopic[] {
  return grammarRegistry[idioma]?.[nivel] ?? []
}

export function getTopicBySlug(idioma: string, nivel: string, slug: string): GrammarTopic | null {
  return getTopicsByLevel(idioma, nivel).find(t => t.slug === slug) ?? null
}
