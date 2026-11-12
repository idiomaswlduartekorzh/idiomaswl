import type { GrammarTopic } from '@/data/grammar/types'

export type RussianAdvancedGrammarLevel = 'a1' | 'a2' | 'b1' | 'b2' | 'c1' | 'c2'
const minutes: Record<RussianAdvancedGrammarLevel, number> = { a1:35,a2:40,b1:50,b2: 55, c1: 60, c2: 65 }

export function getRussianAdvancedGrammarResource(topic: GrammarTopic, level: RussianAdvancedGrammarLevel) {
  const root = `/api/site-materials/ruso-${level}/grammar`, base = topic.slug.endsWith(`-${level}`)?`idiomaswl-${topic.slug}`:`idiomaswl-${topic.slug}-${level}`
  return {
    pdf: `${root}/${base}.pdf`,
    exercisesPdf: `${root}/${base}-uprazhneniya.pdf`,
    answerKeyPdf: `${root}/${base}-otvety.pdf`,
    studyMinutes: minutes[level],
    audioTracks: [] as [],
  }
}
