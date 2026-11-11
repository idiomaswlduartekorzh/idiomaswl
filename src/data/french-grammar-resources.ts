import type { GrammarTopic } from '@/data/grammar/types'

export type FrenchGrammarLevel = 'a1' | 'a2' | 'b1' | 'b2' | 'c1' | 'c2'

export type FrenchGrammarResource = {
  pdf: string
  exercisesPdf: string
  answerKeyPdf: string
  studyMinutes: number
  audioTracks: []
}

const minutes: Record<FrenchGrammarLevel, number> = { a1: 35, a2: 40, b1: 50, b2: 55, c1: 60, c2: 65 }

export function getFrenchGrammarResource(topic: GrammarTopic, level: FrenchGrammarLevel): FrenchGrammarResource {
  const root = `/api/site-materials/frances-${level}/grammar`
  const base = topic.slug.endsWith(`-${level}`) ? `idiomaswl-${topic.slug}` : `idiomaswl-${topic.slug}-${level}`
  return {
    pdf: `${root}/${base}.pdf`,
    exercisesPdf: `${root}/${base}-exercices.pdf`,
    answerKeyPdf: `${root}/${base}-corrige.pdf`,
    studyMinutes: minutes[level],
    audioTracks: [],
  }
}
