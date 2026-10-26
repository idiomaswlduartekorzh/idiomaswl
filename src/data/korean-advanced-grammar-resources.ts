import type { GrammarTopic } from '@/data/grammar/types'

export type KoreanAdvancedGrammarLevel = 'b2' | 'c1' | 'c2'

const minutes: Record<KoreanAdvancedGrammarLevel, number> = { b2: 55, c1: 60, c2: 65 }

export function getKoreanAdvancedGrammarResource(topic: GrammarTopic, level: KoreanAdvancedGrammarLevel) {
  const root = `/api/site-materials/coreano-${level}/grammar`
  const base = `idiomaswl-${topic.slug}`
  return {
    pdf: `${root}/${base}.pdf`,
    exercisesPdf: `${root}/${base}-yeonseup.pdf`,
    answerKeyPdf: `${root}/${base}-haeseol.pdf`,
    studyMinutes: minutes[level],
    audioTracks: [] as [],
  }
}
