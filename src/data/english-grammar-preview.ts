import englishA1Topics from '@/data/grammar/ingles/a1'
import englishA2Topics from '@/data/grammar/ingles/a2'
import englishB1Topics from '@/data/grammar/ingles/b1'
import englishB2Topics from '@/data/grammar/ingles/b2'
import englishC1Topics from '@/data/grammar/ingles/c1'
import englishC2Topics from '@/data/grammar/ingles/c2'
import type { GrammarTopic } from '@/data/grammar/types'

export type EnglishGrammarLevel = 'a1' | 'a2' | 'b1' | 'b2' | 'c1' | 'c2'

export const ENGLISH_GRAMMAR_PREVIEW_SLUGS: Record<EnglishGrammarLevel, string> = {
  a1: 'subject-pronouns',
  a2: 'past-simple-be',
  b1: 'present-perfect-simple-b1',
  b2: 'mixed-conditionals-b2',
  c1: 'inversion-emphasis-c1',
  c2: 'ellipsis-substitution-c2',
}

export const ENGLISH_GRAMMAR_AVAILABLE_SLUGS: Record<EnglishGrammarLevel, readonly string[]> = {
  a1: englishA1Topics.map((topic) => topic.slug),
  a2: englishA2Topics.map((topic) => topic.slug),
  b1: englishB1Topics.map((topic) => topic.slug),
  b2: englishB2Topics.map((topic) => topic.slug),
  c1: englishC1Topics.map((topic) => topic.slug),
  c2: englishC2Topics.map((topic) => topic.slug),
}

export function englishStudyMinutes(level: EnglishGrammarLevel): number {
  if (level === 'c2') return 65
  if (level === 'c1') return 60
  if (level === 'b2') return 55
  return level === 'b1' ? 50 : level === 'a2' ? 40 : 35
}

export type EnglishGrammarAudioTrack = {
  id: string
  title: string
  text: string
  translation: string
  src: string
}

export type EnglishGrammarResource = {
  studyMinutes: number
  pdf: string
  audioTracks: EnglishGrammarAudioTrack[]
}

export function getEnglishGrammarResource(topic: GrammarTopic, level: EnglishGrammarLevel): EnglishGrammarResource {
  const selected = englishTrackExamples(topic)
  const definitions = [
    ['modelo-estructura', 'Modelo y estructura'],
    ['contraste-guiado', 'Contraste guiado'],
    ['practica-contexto', 'Práctica en contexto'],
  ] as const

  return {
    studyMinutes: englishStudyMinutes(level),
    pdf: englishGrammarPdf(topic.slug, level),
    audioTracks: isAdvancedPilot(level) ? [] : definitions.map(([id, title], index) => ({
      id,
      title,
      text: normalizeSpokenEnglish(selected[index] ?? topic.guide.model),
      translation: topic.visual.scene[index]?.[1] ?? topic.guide.goal,
      src: `/audio/ingles/${level}/grammar/${topic.slug}/${id}.m4a`,
    })),
  }
}

export function isAdvancedPilot(level: EnglishGrammarLevel): boolean {
  return level === 'b2' || level === 'c1' || level === 'c2'
}

function englishTrackExamples(topic: GrammarTopic): string[] {
  const choice = topic.practice.levels.find((practice) => practice.type === 'choice')
  const examples = choice?.items.map(choiceExample).filter((text) => !/___|\[\[/u.test(text)) ?? []
  const fallback = topic.visual.scene.map(([english]) => String(english))
  return pickThree(examples.length >= 3 ? examples : fallback)
}

function choiceExample(item: Extract<GrammarTopic['practice']['levels'][number], { type: 'choice' }>['items'][number]): string {
  const parts = item.answer.split(/\s+\/\s+/u)
  let partIndex = 0
  return item.lines.map(([, text]) => text.replace(/___|\[\[\d+\]\]/gu, (_blank, offset: number) => {
    let answer = parts[Math.min(partIndex, parts.length - 1)]
    partIndex += 1
    if (/^(?:--|—)$/u.test(answer)) answer = ''
    const prefix = text.slice(0, offset).trimEnd()
    if (!prefix || /[.!?]$/u.test(prefix)) answer = answer.charAt(0).toUpperCase() + answer.slice(1)
    return answer
  })).join(' ')
}

function pickThree(items: string[]): string[] {
  const values = [...new Set(items.filter(Boolean))]
  return [values[0], values[Math.floor((values.length - 1) / 2)], values.at(-1)!]
}

function englishGrammarPdf(slug: string, level: EnglishGrammarLevel): string {
  const filename = slug.endsWith(`-${level}`) ? `idiomaswl-${slug}.pdf` : `idiomaswl-${slug}-${level}.pdf`
  return `/api/site-materials/ingles-${level}/grammar/${filename}`
}

function normalizeSpokenEnglish(text: string): string {
  const normalized = text
    .replace(/\s*\([^)]*\)\s*/gu, ' ')
    .replace(/\[[^\]]+\]/gu, 'something')
    .replace(/\s*(?:→|\/)\s*/gu, '. ')
    .replace(/\s*(?:--|—)\s*/gu, '. ')
    .replace(/([.!?])\s*\.\s*/gu, '$1 ')
    .replace(/\.{2,}/gu, '.')
    .replace(/\s+/gu, ' ')
    .replace(/\s+(['’](?:s|re|ve|ll|d|m|t)\b)/giu, '$1')
    .replace(/(^|[.!?]\s+)([a-z])/gu, (_match, boundary: string, letter: string) => `${boundary}${letter.toUpperCase()}`)
    .trim()

  const spoken = /[.!?]$/u.test(normalized) ? normalized : `${normalized}.`
  return spoken.length < 8 ? `${spoken} ${spoken}` : spoken
}
