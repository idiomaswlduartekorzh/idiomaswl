export const WORD_CARDS = [
  ['nouns', 'Nouns'],
  ['phrasalVerbs', 'Phrasal verbs'],
  ['adjectives', 'Adjectives'],
  ['connectors', 'Connectors'],
] as const

type Term = readonly [expression: string, definition: string, example: string]
type WordCard = readonly [Term, Term, Term, Term]
type ModelAnswer = readonly [string, string, string]

type Position = {
  label: string
  description: string
}

export type SpeakingDilemma = {
  slug: string
  title: string
  prompt: string
  options: readonly [a: Position, b: Position]
  conditionalPrompt: string
  vocabulary: Record<(typeof WORD_CARDS)[number][0], WordCard>
  models: Record<'a' | 'b' | 'conditional', ModelAnswer>
}
