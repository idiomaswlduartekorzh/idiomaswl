import type { GrammarTopic } from '@/data/grammar/types'

export type GermanGrammarLevel = 'b2' | 'c1' | 'c2'

const minutes: Record<GermanGrammarLevel, number> = { b2: 55, c1: 60, c2: 65 }

export function getGermanGrammarResource(topic: GrammarTopic, level: GermanGrammarLevel) {
  const root = `/api/site-materials/aleman-${level}/grammar`
  const base = `idiomaswl-${topic.slug}`
  return {
    pdf: `${root}/${base}.pdf`,
    exercisesPdf: `${root}/${base}-uebungen.pdf`,
    answerKeyPdf: `${root}/${base}-loesungen.pdf`,
    studyMinutes: minutes[level],
    audioTracks: [] as [],
  }
}
