import type { GrammarTopic } from '@/data/grammar/types'
import koreanA1Topics from '@/data/grammar/coreano/a1'
import koreanA2Topics from '@/data/grammar/coreano/a2'
import koreanB1Topics from '@/data/grammar/coreano/b1'

export type KoreanGrammarLevel = 'a1' | 'a2' | 'b1'

export const KOREAN_GRAMMAR_PREVIEW_SLUGS: Record<KoreanGrammarLevel, string> = {
  a1: 'hangul-basico',
  a2: 'progresivo-go-itda-a2',
  b1: 'oportunidad-gime-b1',
}

export const KOREAN_GRAMMAR_AVAILABLE_SLUGS: Record<KoreanGrammarLevel, readonly string[]> = {
  a1: koreanA1Topics.map((topic) => topic.slug),
  a2: koreanA2Topics.map((topic) => topic.slug),
  b1: koreanB1Topics.map((topic) => topic.slug),
}

export type KoreanGrammarAudioTrack = {
  id: string
  title: string
  text: string
  translation: string
  src: string
}

type KoreanGrammarResource = {
  image: string
  imageAlt: string
  glyph: string
  studyMinutes: number
  pdf?: string
  audioTracks?: KoreanGrammarAudioTrack[]
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
  'hangul-basico': {
    image: '/assets/korean/step002/kr_step002_geulja_signs_v1.png',
    imageAlt: 'Letreros coreanos para reconocer bloques silábicos del hangeúl',
    glyph: '한글',
    pdf: '/api/site-materials/coreano-a1/idiomaswl-hangul-basico-a1.pdf',
    audioTracks: [
      {
        id: 'modelo-silabas',
        title: 'Modelo de sílabas',
        text: '가, 나, 다, 라, 마, 바, 사, 아, 자, 차, 카, 타, 파, 하.',
        translation: 'Serie básica: consonante + ㅏ.',
        src: '/audio/coreano/a1/grammar/hangul-basico/modelo-silabas.m4a',
      },
      {
        id: 'vocales-basicas',
        title: 'Vocales básicas',
        text: '아, 어, 오, 우, 으, 이.',
        translation: 'a, eo, o, u, eu, i',
        src: '/audio/coreano/a1/grammar/hangul-basico/vocales-basicas.m4a',
      },
      {
        id: 'palabras-basicas',
        title: 'Palabras para leer',
        text: '아이. 어디. 오늘. 우리. 이름. 한글.',
        translation: 'niño; dónde; hoy; nosotros; nombre; hangeúl',
        src: '/audio/coreano/a1/grammar/hangul-basico/palabras-basicas.m4a',
      },
      {
        id: 'frases-iniciales',
        title: 'Primeras frases',
        text: '안녕하세요. 감사합니다. 저는 한국어를 공부해요.',
        translation: 'Hola. Gracias. Estudio coreano.',
        src: '/audio/coreano/a1/grammar/hangul-basico/frases-iniciales.m4a',
      },
    ],
  },
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
    pdf: preview?.pdf ?? koreanGrammarPdf(topic.slug, level),
    audioTracks: preview?.audioTracks ?? koreanGrammarAudio(topic, level),
  }
}

function koreanGrammarPdf(slug: string, level: KoreanGrammarLevel): string {
  const filename = slug.endsWith(`-${level}`) ? `idiomaswl-${slug}.pdf` : `idiomaswl-${slug}-${level}.pdf`
  return `/api/site-materials/coreano-${level}/grammar/${filename}`
}

function koreanGrammarAudio(topic: GrammarTopic, level: KoreanGrammarLevel): KoreanGrammarAudioTrack[] {
  const scene = topic.visual.scene
  const groups = [[scene[0]], [scene[Math.floor((scene.length - 1) / 2)]], [scene.at(-1)!]]
  const definitions = [
    ['modelo-estructura', 'Modelo y estructura'],
    ['contraste-guiado', 'Contraste guiado'],
    ['practica-contexto', 'Práctica en contexto'],
  ] as const

  return definitions.map(([id, title], index) => ({
    id,
    title,
    text: repeatShortSpoken(groups[index].map(([korean]) => normalizeSpokenKorean(korean)).join(' ')),
    translation: groups[index].map(([, spanish]) => spanish).join(' · '),
    src: `/audio/coreano/${level}/grammar/${topic.slug}/${id}.m4a`,
  }))
}

function normalizeSpokenKorean(text: string): string {
  const normalized = text
    .replace(/\s*\([^)]*\)\s*/gu, ' ')
    .replace(/\[[^\]]+\]/gu, '어디')
    .replace(/\s*(?:→|\/)\s*/gu, '. ')
    .replace(/\s*—\s*/gu, ' ')
    .replace(/10분/gu, '십 분')
    .replace(/1990년에/gu, '천구백구십 년에')
    .replace(/\.{2,}/gu, '.')
    .replace(/\s+/gu, ' ')
    .trim()

  return /[.!?。！？]$/u.test(normalized) ? normalized : `${normalized}.`
}

function repeatShortSpoken(text: string): string {
  return text.length < 8 ? `${text} ${text}` : text
}

function koreanGlyph(title: string): string {
  const match = title.match(/[가-힣]+/u)
  return match?.[0]?.slice(0, 4) || '한글'
}
