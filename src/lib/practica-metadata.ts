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
