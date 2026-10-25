import type { GrammarTopic } from '@/data/grammar/types'

// v2 identifica el banco pedagógico por propósito. La ruta anterior sigue viva como
// compatibilidad, pero las páginas, metadatos y sitemaps apuntan a esta versión para
// que navegadores y buscadores no reutilicen durante un año las imágenes genéricas.
export const GRAMMAR_VISUAL_BASE = '/recursos-visuales/gramatica/v2'
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
export type GrammarVisualLevel = 'a1' | 'a2' | 'b1' | 'b2' | 'c1' | 'c2'

export function isGrammarVisualLanguage(value: string): value is GrammarVisualLanguage {
  return value in GRAMMAR_VISUAL_LANGUAGES
}

export function isGrammarVisualLevel(value: string): value is GrammarVisualLevel {
  return value === 'a1' || value === 'a2' || value === 'b1' || value === 'b2' || value === 'c1' || value === 'c2'
}

export function grammarVisualPath(idioma: string, nivel: string, slug: string): string {
  return `${GRAMMAR_VISUAL_BASE}/${encodeURIComponent(idioma)}/${encodeURIComponent(nivel)}/${encodeURIComponent(slug)}`
}

export function grammarVisualUrl(idioma: string, nivel: string, slug: string): string {
  return `${SITE_ORIGIN}${grammarVisualPath(idioma, nivel, slug)}`
}

export function grammarVisualAlt(topic: GrammarTopic, idioma: GrammarVisualLanguage, nivel: string): string {
  const language = GRAMMAR_VISUAL_LANGUAGES[idioma]
  return `Infografía de ${topic.shortTitle} en ${language.label} ${nivel.toUpperCase()} con tabla, regla y ejemplos: ${topic.guide.formula}`
}

export function grammarVisualImageObject(topic: GrammarTopic, idioma: GrammarVisualLanguage, nivel: string, options: { contentLanguage?: 'es' | 'en' } = {}) {
  const language = GRAMMAR_VISUAL_LANGUAGES[idioma]
  const contentUrl = grammarVisualUrl(idioma, nivel, topic.slug)
  const english = options.contentLanguage === 'en'
  const caption = english
    ? `Visual guide to ${topic.shortTitle} for English ${nivel.toUpperCase()}: ${topic.guide.formula}`
    : grammarVisualAlt(topic, idioma, nivel)
  return {
    '@type': 'ImageObject',
    name: english ? `Visual guide to ${topic.shortTitle} — English ${nivel.toUpperCase()}` : `Guía visual de ${topic.shortTitle} — ${language.label} ${nivel.toUpperCase()}`,
    caption,
    description: english ? `Original educational infographic for ${topic.shortTitle}, built from the lesson’s specific rule, visual map and examples.` : `Infografía educativa específica de ${topic.shortTitle}, con su tabla, estructura o mapa de uso según el tema, creada por Idiomas WeLearn para hispanohablantes.`,
    contentUrl,
    url: contentUrl,
    width: 1200,
    height: 630,
    encodingFormat: 'image/png',
    inLanguage: english ? 'en' : ['es', language.code],
    creditText: 'Idiomas WeLearn',
    creator: { '@type': 'Organization', name: 'Idiomas WeLearn', url: SITE_ORIGIN },
  }
}
