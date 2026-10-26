import type { GrammarTopic } from '@/data/grammar/types'

export type RussianAdvancedGrammarLevel = 'b2' | 'c1' | 'c2'
const minutes: Record<RussianAdvancedGrammarLevel, number> = { b2: 55, c1: 60, c2: 65 }

export function getRussianAdvancedGrammarResource(topic: GrammarTopic, level: RussianAdvancedGrammarLevel) {
  const root = `/api/site-materials/ruso-${level}/grammar`, base = `idiomaswl-${topic.slug}`
  return {
    pdf: `${root}/${base}.pdf`,
    exercisesPdf: `${root}/${base}-uprazhneniya.pdf`,
    answerKeyPdf: `${root}/${base}-otvety.pdf`,
    studyMinutes: minutes[level],
    audioTracks: [] as [],
  }
}
