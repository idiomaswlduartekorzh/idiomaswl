import type { GrammarTopic } from './types'
import inglesA1 from './ingles/a1'

export const grammarRegistry: Record<string, Record<string, GrammarTopic[]>> = {
  ingles: { a1: inglesA1 },
}

export function getTopicsByLevel(idioma: string, nivel: string): GrammarTopic[] {
  return grammarRegistry[idioma]?.[nivel] ?? []
}

export function getTopicBySlug(idioma: string, nivel: string, slug: string): GrammarTopic | null {
  return getTopicsByLevel(idioma, nivel).find(t => t.slug === slug) ?? null
}
