import type { GrammarTopic } from '@/data/grammar/types'

export type PortugueseGrammarLevel = 'b2' | 'c1' | 'c2'

const minutes: Record<PortugueseGrammarLevel, number> = { b2: 55, c1: 60, c2: 65 }

export function getPortugueseGrammarResource(topic: GrammarTopic, level: PortugueseGrammarLevel) {
  const root = `/api/site-materials/portugues-${level}/grammar`
  const base = `idiomaswl-${topic.slug}`
  return {
    pdf: `${root}/${base}.pdf`,
    exercisesPdf: `${root}/${base}-exercicios.pdf`,
    answerKeyPdf: `${root}/${base}-gabarito.pdf`,
    studyMinutes: minutes[level],
    audioTracks: [] as [],
  }
}
