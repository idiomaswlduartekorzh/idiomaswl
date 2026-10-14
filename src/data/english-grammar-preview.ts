import englishA1Topics from '@/data/grammar/ingles/a1'
import englishA2Topics from '@/data/grammar/ingles/a2'
import englishB1Topics from '@/data/grammar/ingles/b1'

export type EnglishGrammarLevel = 'a1' | 'a2' | 'b1'

export const ENGLISH_GRAMMAR_PREVIEW_SLUGS: Record<EnglishGrammarLevel, string> = {
  a1: 'subject-pronouns',
  a2: 'past-simple-be',
  b1: 'present-perfect-simple-b1',
}

export const ENGLISH_GRAMMAR_AVAILABLE_SLUGS: Record<EnglishGrammarLevel, readonly string[]> = {
  a1: englishA1Topics.map((topic) => topic.slug),
  a2: englishA2Topics.map((topic) => topic.slug),
  b1: englishB1Topics.map((topic) => topic.slug),
}

export function englishStudyMinutes(level: EnglishGrammarLevel): number {
  return level === 'b1' ? 50 : level === 'a2' ? 40 : 35
}
