import type { GrammarTopic } from '@/data/grammar/types'

export const GRAMMAR_VISUAL_BASE = '/recursos-visuales/gramatica'
export const SITE_ORIGIN = 'https://www.idiomaswl.com'

export const GRAMMAR_VISUAL_LANGUAGES = {
  aleman: { label: 'Alemán', code: 'de', native: 'Deutsch', accent: '#e1a400', deep: '#171717', soft: '#fff5cf' },
  coreano: { label: 'Coreano', code: 'ko', native: '한국어', accent: '#d6293e', deep: '#153c79', soft: '#edf4ff' },
  frances: { label: 'Francés', code: 'fr', native: 'Français', accent: '#e7374f', deep: '#18347a', soft: '#eef3ff' },
  ingles: { label: 'Inglés', code: 'en', native: 'English', accent: '#d12a43', deep: '#082c67', soft: '#eef4ff' },
  italiano: { label: 'Italiano', code: 'it', native: 'Italiano', accent: '#d72b3f', deep: '#08713c', soft: '#edf8f0' },
  japones: { label: 'Japonés', code: 'ja', native: '日本語', accent: '#dc2f45', deep: '#202a44', soft: '#fff0f1' },
  portugues: { label: 'Portugués', code: 'pt', native: 'Português', accent: '#dfaa00', deep: '#126b3a', soft: '#f4fae8' },
  ruso: { label: 'Ruso', code: 'ru', native: 'Русский', accent: '#d92f45', deep: '#24458f', soft: '#f1f5ff' },
} as const

export type GrammarVisualLanguage = keyof typeof GRAMMAR_VISUAL_LANGUAGES
export type GrammarVisualLevel = 'a1' | 'a2' | 'b1'

export function isGrammarVisualLanguage(value: string): value is GrammarVisualLanguage {
  return value in GRAMMAR_VISUAL_LANGUAGES
}

export function isGrammarVisualLevel(value: string): value is GrammarVisualLevel {
  return value === 'a1' || value === 'a2' || value === 'b1'
}

export function grammarVisualPath(idioma: string, nivel: string, slug: string): string {
  return `${GRAMMAR_VISUAL_BASE}/${encodeURIComponent(idioma)}/${encodeURIComponent(nivel)}/${encodeURIComponent(slug)}`
}

export function grammarVisualUrl(idioma: string, nivel: string, slug: string): string {
  return `${SITE_ORIGIN}${grammarVisualPath(idioma, nivel, slug)}`
}

export function grammarVisualAlt(topic: GrammarTopic, idioma: GrammarVisualLanguage, nivel: string): string {
  const language = GRAMMAR_VISUAL_LANGUAGES[idioma]
  return `Explicación visual de ${topic.shortTitle} en ${language.label} ${nivel.toUpperCase()}: ${topic.guide.formula}`
}

export function grammarVisualImageObject(topic: GrammarTopic, idioma: GrammarVisualLanguage, nivel: string) {
  const language = GRAMMAR_VISUAL_LANGUAGES[idioma]
  const contentUrl = grammarVisualUrl(idioma, nivel, topic.slug)
  return {
    '@type': 'ImageObject',
    name: `Guía visual de ${topic.shortTitle} — ${language.label} ${nivel.toUpperCase()}`,
    caption: grammarVisualAlt(topic, idioma, nivel),
    description: `Infografía educativa con la regla, el modelo y ejemplos de ${topic.shortTitle}, creada por Idiomas WeLearn para hispanohablantes.`,
    contentUrl,
    url: contentUrl,
    width: 1200,
    height: 630,
    encodingFormat: 'image/png',
    inLanguage: ['es', language.code],
    creditText: 'Idiomas WeLearn',
    creator: { '@type': 'Organization', name: 'Idiomas WeLearn', url: SITE_ORIGIN },
  }
}
