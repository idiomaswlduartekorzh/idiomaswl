import type { Metadata } from 'next'
import { generateLearningResourceSchema, practicaBreadcrumbs, generateBreadcrumbSchema } from './schema-generators'
import { practiceOGImage, getLangDisplay, getSkillDisplay } from './schema-generators/og-image-helpers'

const langNames: Record<string, string> = {
  ingles: 'Inglés', frances: 'Francés', portugues: 'Portugués',
  aleman: 'Alemán', italiano: 'Italiano', coreano: 'Coreano',
  japones: 'Japonés', ruso: 'Ruso',
}
const levelNames: Record<string, string> = {
  a1: 'A1 (Principiante)', a2: 'A2 (Elemental)',
  b1: 'B1 (Intermedio)', b2: 'B2 (Intermedio-Alto)', c1: 'C1 (Avanzado)',
}
const skillNames: Record<string, string> = {
  lectura: 'Lectura', gramatica: 'Gramática', escritura: 'Escritura',
  vocabulario: 'Vocabulario', habla: 'Expresión Oral', escucha: 'Comprensión Auditiva',
}
const skillDescriptions: Record<string, string> = {
  lectura: 'textos interactivos, comprensión lectora y vocabulario en contexto',
  gramatica: 'explicaciones claras, tablas de conjugación y ejercicios progresivos',
  escritura: 'prompts guiados, modelos de referencia y checklists de revisión',
  vocabulario: 'flashcards, tests de opción múltiple y práctica de escritura',
  habla: 'frases esenciales, pronunciación y contextos de uso real',
  escucha: 'ejercicios de comprensión auditiva con transcripciones',
}

export function practicaMetadata(lang: string, level: string, skill: string): Metadata {
  const ln = langNames[lang] ?? lang
  const lv = levelNames[level] ?? level.toUpperCase()
  const sk = skillNames[skill] ?? skill
  const desc = skillDescriptions[skill] ?? 'ejercicios interactivos'
  const url = `https://www.idiomaswl.com/practica/${lang}/${level}/${skill}`
  const ogImage = practiceOGImage(lang, level, skill)

  return {
    title: `${sk} en ${ln} ${lv} — Ejercicios interactivos gratis | Idiomas WeLearn`,
    description: `Practica ${sk.toLowerCase()} en ${ln} nivel ${lv} con ${desc}. Ejercicios adaptativos, feedback inmediato y progresión pedagógica. Gratis en Idiomas WeLearn.`,
    keywords: [`${skill} ${lang}`, `ejercicios de ${lang} ${level}`, `${lang} ${level} gratis`, `aprender ${lang}`, `practicar ${lang} online`, `${ln} ${lv}`],
    openGraph: {
      title: `${sk} en ${ln} ${lv} | Idiomas WeLearn`,
      description: `Ejercicios interactivos de ${sk.toLowerCase()} en ${ln} nivel ${lv}. Gratis, adaptativo y con feedback inmediato.`,
      type: 'website',
      locale: 'es_CO',
      url,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${sk} en ${ln} ${lv}` }],
    },
    alternates: {
      canonical: url,
    },
  }
}

// Metadata para una página de un tema concreto de gramática (una URL por tema).
export function grammarTopicMetadata(opts: {
  lang: string
  level: string
  slug: string
  title: string
  description: string
  keywords: string[]
}): Metadata {
  const { lang, level, slug, title, description, keywords } = opts
  const url = `https://www.idiomaswl.com/practica/${lang}/${level}/gramatica/${slug}`
  const { emoji } = getLangDisplay(lang)
  const ogImage = practiceOGImage(lang, level, 'gramatica')

  return {
    title,
    description,
    keywords,
    openGraph: {
      title: `${emoji} ${title}`,
      description,
      type: 'article',
      locale: 'es_CO',
      url,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    alternates: { canonical: url },
  }
}

/**
 * Obtener schemas JSON-LD para páginas de práctica
 */
export function getPracticeSchemas(lang: string, level: string, skill: string) {
  const ln = langNames[lang] ?? lang
  const lv = levelNames[level] ?? level.toUpperCase()
  const sk = skillNames[skill] ?? skill
  const url = `https://www.idiomaswl.com/practica/${lang}/${level}/${skill}`

  const learningResourceSchema = generateLearningResourceSchema({
    name: `${sk} en ${ln} ${lv}`,
    description: `Practica ${sk.toLowerCase()} en ${ln} nivel ${lv}. Ejercicios adaptativos con feedback inmediato.`,
    url,
    educationalLevel: level.toUpperCase(),
    inLanguage: getLangCode(lang),
    teaches: sk,
    keywords: [
      `${skill} ${lang}`,
      `ejercicios ${lang} ${level}`,
      `${lang} ${level} gratis`,
      `${ln} ${lv}`,
      `aprender ${lang.toLowerCase()}`,
    ],
    coursePartOf: {
      name: `${ln} ${lv}`,
      url: `https://www.idiomaswl.com/practica/${lang}/${level}`,
    },
  })

  const breadcrumbs = practicaBreadcrumbs(lang, level, skill)
  const breadcrumbSchema = generateBreadcrumbSchema({ items: breadcrumbs })

  return { learningResourceSchema, breadcrumbSchema }
}

export function getLevelSchemas(lang: string, level: string) {
  const ln = langNames[lang] ?? lang
  const lv = levelNames[level] ?? level.toUpperCase()
  const url = `https://www.idiomaswl.com/practica/${lang}/${level}`

  const breadcrumbs = practicaBreadcrumbs(lang, level)
  const breadcrumbSchema = generateBreadcrumbSchema({ items: breadcrumbs })

  return { breadcrumbSchema }
}

/**
 * Helper para obtener código de idioma ISO 639-1
 */
function getLangCode(lang: string): string {
  const langCodes: Record<string, string> = {
    ingles: 'en',
    coreano: 'ko',
    frances: 'fr',
    aleman: 'de',
    italiano: 'it',
    portugues: 'pt',
    japones: 'ja',
    ruso: 'ru',
  }
  return langCodes[lang] ?? 'es'
}

export function levelMetadata(lang: string, level: string): Metadata {
  const ln = langNames[lang] ?? lang
  const lv = levelNames[level] ?? level.toUpperCase()
  const url = `https://www.idiomaswl.com/practica/${lang}/${level}`
  const ogImage = practiceOGImage(lang, level, 'nivel')

  return {
    title: `${ln} ${lv} — Práctica completa de las 6 habilidades | Idiomas WeLearn`,
    description: `Practica las 6 habilidades del ${ln} nivel ${lv}: lectura, gramática, escritura, vocabulario, expresión oral y comprensión auditiva. Ejercicios MCER adaptativos. Gratis.`,
    keywords: [`${lang} ${level}`, `ejercicios ${lang} ${level}`, `${lang} ${lv} online`, `aprender ${lang} gratis`, `${ln} nivel ${lv}`],
    openGraph: {
      title: `${ln} ${lv} | Idiomas WeLearn`,
      description: `6 habilidades para el nivel ${lv} de ${ln}.`,
      type: 'website',
      locale: 'es_CO',
      url,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${ln} ${lv}` }],
    },
    alternates: { canonical: url },
  }
}
