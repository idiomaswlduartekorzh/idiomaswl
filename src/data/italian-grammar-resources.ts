import type { GrammarTopic } from '@/data/grammar/types'
export type ItalianGrammarLevel = 'a1' | 'a2' | 'b1' | 'b2' | 'c1' | 'c2'
const minutes: Record<ItalianGrammarLevel, number> = { a1: 35, a2: 40, b1: 50, b2: 55, c1: 60, c2: 65 }
export function getItalianGrammarResource(topic: GrammarTopic, level: ItalianGrammarLevel) {
  const root = `/api/site-materials/italiano-${level}/grammar`
  const base = topic.slug.endsWith(`-${level}`) ? `idiomaswl-${topic.slug}` : `idiomaswl-${topic.slug}-${level}`
  return { pdf: `${root}/${base}.pdf`, exercisesPdf: `${root}/${base}-esercizi.pdf`, answerKeyPdf: `${root}/${base}-soluzioni.pdf`, studyMinutes: minutes[level], audioTracks: [] as [] }
}
