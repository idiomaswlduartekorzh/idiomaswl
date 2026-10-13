import type { GrammarTopic } from '@/data/grammar/types'

export type KoreanGrammarLevel = 'a1' | 'a2' | 'b1'

export const KOREAN_GRAMMAR_PREVIEW_SLUGS: Record<KoreanGrammarLevel, string> = {
  a1: 'estructura-sov',
  a2: 'progresivo-go-itda-a2',
  b1: 'oportunidad-gime-b1',
}

type KoreanGrammarResource = {
  image: string
  imageAlt: string
  glyph: string
  studyMinutes: number
}

const LEVEL_IMAGES: Record<KoreanGrammarLevel, string[]> = {
  a1: [
    '/assets/korean/step002/kr_step002_na_me_v1.png',
    '/assets/korean/step003/cafe_v1.png',
    '/assets/korean/step004/hodduk_stall_v1.png',
    '/assets/korean/step005/hwajangsil_sign_v1.png',
  ],
  a2: [
    '/assets/korean/step007/david_studying_v1.png',
    '/assets/korean/step006/campus_walk_v1.png',
    '/assets/korean/step006/david_minsu_cafe_v1.png',
    '/assets/korean/step007/campus_routine_v1.png',
  ],
  b1: [
    '/assets/korean/step004/market_street_v1.png',
    '/assets/korean/step006/classroom_meeting_v1.png',
    '/assets/korean/step007/minsu_david_chat_v1.png',
    '/assets/korean/step002/kr_step002_eodi_conversation_v1.png',
  ],
}

const PREVIEW_RESOURCES: Record<string, Omit<KoreanGrammarResource, 'studyMinutes'>> = {
  'estructura-sov': {
    image: '/assets/korean/step002/kr_step002_na_me_v1.png',
    imageAlt: 'Dos jóvenes conversan en una calle tradicional de Seúl',
    glyph: '어순',
  },
  'progresivo-go-itda-a2': {
    image: '/assets/korean/step007/david_studying_v1.png',
    imageAlt: 'Estudiante trabajando en coreano en un entorno cotidiano',
    glyph: '-고',
  },
  'oportunidad-gime-b1': {
    image: '/assets/korean/step004/market_street_v1.png',
    imageAlt: 'Mercado tradicional coreano iluminado durante la noche',
    glyph: '김에',
  },
}

export function getKoreanGrammarResource(topic: GrammarTopic, level: KoreanGrammarLevel): KoreanGrammarResource {
  const preview = PREVIEW_RESOURCES[topic.slug]
  const imageIndex = Math.max(0, Number.parseInt(topic.order, 10) - 1) % LEVEL_IMAGES[level].length

  return {
    image: preview?.image ?? LEVEL_IMAGES[level][imageIndex],
    imageAlt: preview?.imageAlt ?? `Escena cotidiana coreana para estudiar ${topic.shortTitle}`,
    glyph: preview?.glyph ?? koreanGlyph(topic.shortTitle),
    studyMinutes: level === 'b1' ? 50 : level === 'a2' ? 40 : 35,
  }
}

function koreanGlyph(title: string): string {
  const match = title.match(/[가-힣]+/u)
  return match?.[0]?.slice(0, 4) || '한글'
}
