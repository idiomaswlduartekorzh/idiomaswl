import type { GrammarTopic } from '@/data/grammar/types'
export type JapaneseAdvancedGrammarLevel = 'b2' | 'c1' | 'c2'
const minutes: Record<JapaneseAdvancedGrammarLevel, number> = { b2: 55, c1: 60, c2: 65 }
export function getJapaneseAdvancedGrammarResource(topic: GrammarTopic, level: JapaneseAdvancedGrammarLevel) {
  const root = `/api/site-materials/japones-${level}/grammar`, base = `idiomaswl-${topic.slug}`
  return { pdf: `${root}/${base}.pdf`, exercisesPdf: `${root}/${base}-renshu.pdf`, answerKeyPdf: `${root}/${base}-kaito.pdf`, studyMinutes: minutes[level], audioTracks: [] as [] }
}
