import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import LanguageQuizHub from '@/components/practica/LanguageQuizHub'
import { QUIZ_LANGUAGE_BY_SLUG, QUIZ_LANGUAGES } from '@/data/practica/quiz-language-catalog'

type Props = { params: Promise<{ idioma: string }> }

export function generateStaticParams() {
  return QUIZ_LANGUAGES.map((language) => ({ idioma: language.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { idioma } = await params
  const language = QUIZ_LANGUAGE_BY_SLUG.get(idioma)
  if (!language) return {}
  const url = `https://www.idiomaswl.com/herramientas/quizes/idiomas/${language.slug}`
  const description = `Elige entre el quiz de tiempos y estructuras y el quiz de pronombres en ${language.name.toLocaleLowerCase('es')}. Dos recorridos configurables de seis niveles.`
  return {
    title: `Quizes de ${language.name} — tiempos y pronombres`,
    description,
    alternates: { canonical: url },
    openGraph: { title: `Quizes de ${language.name} — Idiomas WeLearn`, description, url, type: 'website', siteName: 'Idiomas WeLearn', locale: 'es_CO' },
  }
}

export default async function QuizLanguageHubPage({ params }: Props) {
  const { idioma } = await params
  const language = QUIZ_LANGUAGE_BY_SLUG.get(idioma)
  if (!language) notFound()
  return <LanguageQuizHub language={language}/>
}
