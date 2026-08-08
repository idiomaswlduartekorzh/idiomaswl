import type { Metadata } from 'next'

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

  return {
    title: `${sk} en ${ln} ${lv} — Ejercicios interactivos gratis | Idiomas WeLearn`,
    description: `Practica ${sk.toLowerCase()} en ${ln} nivel ${lv} con ${desc}. Ejercicios adaptativos, feedback inmediato y progresión pedagógica. Gratis en Idiomas WeLearn.`,
    keywords: [`${skill} ${lang}`, `ejercicios de ${lang} ${level}`, `${lang} ${level} gratis`, `aprender ${lang}`, `practicar ${lang} online`],
    openGraph: {
      title: `${sk} en ${ln} ${lv} | Idiomas WeLearn`,
      description: `Ejercicios interactivos de ${sk.toLowerCase()} en ${ln} nivel ${lv}. Gratis, adaptativo y con feedback inmediato.`,
      type: 'website',
      locale: 'es_CO',
    },
    alternates: {
      canonical: `https://www.idiomaswl.com/practica/${lang}/${level}/${skill}`,
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
  return {
    // El layout raíz aplica el template "%s · Idiomas WeLearn"; no repetir la marca.
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'article',
      locale: 'es_CO',
      url,
    },
    alternates: { canonical: url },
  }
}

// Metadata para un bloque de vocabulario (una URL por bloque, como en gramática).
// Cada bloque es un tema con entidad propia — «presentarse», «el clima», «la hora» — y por eso
// merece su URL: es como lo busca la gente y como lo indexa Google.
export function vocabBlockMetadata(opts: {
  lang: string
  level: string
  slug: string
  bloque: string
  entradas: number
}): Metadata {
  const { lang, level, slug, bloque, entradas } = opts
  const ln = langNames[lang] ?? lang
  const lv = levelNames[level] ?? level.toUpperCase()
  const url = `https://www.idiomaswl.com/practica/${lang}/${level}/vocabulario/${slug}`
  const title = `Vocabulario de ${ln} ${level.toUpperCase()}: ${bloque}`
  const description =
    `${entradas} palabras de ${ln} nivel ${lv} sobre ${bloque.toLowerCase()}, con ejemplo real, ` +
    `colocaciones traducidas y repaso espaciado. Gratis en Idiomas WeLearn.`
  return {
    title,
    description,
    keywords: [
      `vocabulario ${lang} ${level}`,
      `${bloque.toLowerCase()} en ${lang}`,
      `palabras ${lang} ${level}`,
      `aprender vocabulario de ${lang}`,
    ],
    openGraph: { title, description, type: 'article', locale: 'es_CO', url },
    alternates: { canonical: url },
  }
}

export function levelMetadata(lang: string, level: string): Metadata {
  const ln = langNames[lang] ?? lang
  const lv = levelNames[level] ?? level.toUpperCase()
  return {
    title: `${ln} ${lv} — Práctica completa de las 6 habilidades | Idiomas WeLearn`,
    description: `Practica las 6 habilidades del ${ln} nivel ${lv}: lectura, gramática, escritura, vocabulario, expresión oral y comprensión auditiva. Ejercicios MCER adaptativos. Gratis.`,
    keywords: [`${lang} ${level}`, `ejercicios ${lang} ${level}`, `${lang} ${lv} online`, `aprender ${lang} gratis`],
    openGraph: {
      title: `${ln} ${lv} | Idiomas WeLearn`,
      description: `6 habilidades para el nivel ${lv} de ${ln}.`,
      type: 'website',
      locale: 'es_CO',
    },
    alternates: { canonical: `https://www.idiomaswl.com/practica/${lang}/${level}` },
  }
}
