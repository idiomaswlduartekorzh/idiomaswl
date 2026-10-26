import type { GrammarTopic } from '@/data/grammar/types'

export type FrenchGrammarLevel = 'b2' | 'c1' | 'c2'

export type FrenchGrammarResource = {
  pdf: string
  exercisesPdf: string
  answerKeyPdf: string
  studyMinutes: number
  audioTracks: []
}

const minutes: Record<FrenchGrammarLevel, number> = { b2: 55, c1: 60, c2: 65 }

export function getFrenchGrammarResource(topic: GrammarTopic, level: FrenchGrammarLevel): FrenchGrammarResource {
  const root = `/api/site-materials/frances-${level}/grammar`
  const base = `idiomaswl-${topic.slug}`
  return {
    pdf: `${root}/${base}.pdf`,
    exercisesPdf: `${root}/${base}-exercices.pdf`,
    answerKeyPdf: `${root}/${base}-corrige.pdf`,
    studyMinutes: minutes[level],
    audioTracks: [],
  }
}
