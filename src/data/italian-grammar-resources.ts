import type { GrammarTopic } from '@/data/grammar/types'
export type ItalianGrammarLevel = 'b2' | 'c1' | 'c2'
const minutes: Record<ItalianGrammarLevel, number> = { b2: 55, c1: 60, c2: 65 }
export function getItalianGrammarResource(topic: GrammarTopic, level: ItalianGrammarLevel) {
  const root = `/api/site-materials/italiano-${level}/grammar`, base = `idiomaswl-${topic.slug}`
  return { pdf: `${root}/${base}.pdf`, exercisesPdf: `${root}/${base}-esercizi.pdf`, answerKeyPdf: `${root}/${base}-soluzioni.pdf`, studyMinutes: minutes[level], audioTracks: [] as [] }
}
