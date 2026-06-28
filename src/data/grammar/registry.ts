import type { GrammarTopic } from './types'
import inglesA1 from './ingles/a1'
import francesA1 from './frances/a1'
import alemanA1 from './aleman/a1'
import coreanoA1 from './coreano/a1'
import italianoA1 from './italiano/a1'
import portuguesA1 from './portugues/a1'
import japonesA1 from './japones/a1'
import rusoA1 from './ruso/a1'

export const grammarRegistry: Record<string, Record<string, GrammarTopic[]>> = {
  ingles: { a1: inglesA1 },
  frances: { a1: francesA1 },
  aleman: { a1: alemanA1 },
  coreano: { a1: coreanoA1 },
  italiano: { a1: italianoA1 },
  portugues: { a1: portuguesA1 },
  japones: { a1: japonesA1 },
  ruso: { a1: rusoA1 },
}

export function getTopicsByLevel(idioma: string, nivel: string): GrammarTopic[] {
  return grammarRegistry[idioma]?.[nivel] ?? []
}

export function getTopicBySlug(idioma: string, nivel: string, slug: string): GrammarTopic | null {
  return getTopicsByLevel(idioma, nivel).find(t => t.slug === slug) ?? null
}
