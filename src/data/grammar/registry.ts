import type { GrammarTopic } from './types'
import inglesA1 from './ingles/a1'
import inglesA2 from './ingles/a2'
import inglesB1 from './ingles/b1'
import francesA1 from './frances/a1'
import francesA2 from './frances/a2'
import francesB1 from './frances/b1'
import alemanA1 from './aleman/a1'
import alemanA2 from './aleman/a2'
import alemanB1 from './aleman/b1'
import coreanoA1 from './coreano/a1'
import coreanoA2 from './coreano/a2'
import coreanoB1 from './coreano/b1'
import italianoA1 from './italiano/a1'
import italianoA2 from './italiano/a2'
import italianoB1 from './italiano/b1'
import portuguesA1 from './portugues/a1'
import portuguesA2 from './portugues/a2'
import portuguesB1 from './portugues/b1'
import japonesA1 from './japones/a1'
import japonesA2 from './japones/a2'
import japonesB1 from './japones/b1'
import rusoA1 from './ruso/a1'
import rusoA2 from './ruso/a2'
import rusoB1 from './ruso/b1'

export const grammarRegistry: Record<string, Record<string, GrammarTopic[]>> = {
  ingles: { a1: inglesA1, a2: inglesA2, b1: inglesB1 },
  frances: { a1: francesA1, a2: francesA2, b1: francesB1 },
  aleman: { a1: alemanA1, a2: alemanA2, b1: alemanB1 },
  coreano: { a1: coreanoA1, a2: coreanoA2, b1: coreanoB1 },
  italiano: { a1: italianoA1, a2: italianoA2, b1: italianoB1 },
  portugues: { a1: portuguesA1, a2: portuguesA2, b1: portuguesB1 },
  japones: { a1: japonesA1, a2: japonesA2, b1: japonesB1 },
  ruso: { a1: rusoA1, a2: rusoA2, b1: rusoB1 },
}

export function getTopicsByLevel(idioma: string, nivel: string): GrammarTopic[] {
  return grammarRegistry[idioma]?.[nivel] ?? []
}

export function getTopicBySlug(idioma: string, nivel: string, slug: string): GrammarTopic | null {
  return getTopicsByLevel(idioma, nivel).find(t => t.slug === slug) ?? null
}
