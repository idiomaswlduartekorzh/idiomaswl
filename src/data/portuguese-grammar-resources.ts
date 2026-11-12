import type { GrammarTopic } from '@/data/grammar/types'

export type PortugueseGrammarLevel = 'a1' | 'a2' | 'b1' | 'b2' | 'c1' | 'c2'

const minutes: Record<PortugueseGrammarLevel, number> = { a1:35, a2:40, b1:50, b2: 55, c1: 60, c2: 65 }

export function getPortugueseGrammarResource(topic: GrammarTopic, level: PortugueseGrammarLevel) {
  const root = `/api/site-materials/portugues-${level}/grammar`
  const base = topic.slug.endsWith(`-${level}`) ? `idiomaswl-${topic.slug}` : `idiomaswl-${topic.slug}-${level}`
  return {
    pdf: `${root}/${base}.pdf`,
    exercisesPdf: `${root}/${base}-exercicios.pdf`,
    answerKeyPdf: `${root}/${base}-gabarito.pdf`,
    studyMinutes: minutes[level],
    audioTracks: [] as [],
  }
}
