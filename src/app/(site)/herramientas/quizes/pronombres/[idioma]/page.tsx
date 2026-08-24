import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { GrammarLessonSchema, QuizSchema } from '@/components/practica/EducationSchema'
import PronounQuestEngine from '@/components/practica/PronounQuestEngine'
import { PRONOUN_QUEST_BY_SLUG, PRONOUN_QUESTS } from '@/data/practica/pronoun-quest-registry'

type Props = { params: Promise<{ idioma: string }> }

export function generateStaticParams() {
  return PRONOUN_QUESTS.filter((entry) => entry.slug !== 'italiano').map((entry) => ({ idioma: entry.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { idioma } = await params
  const entry = PRONOUN_QUEST_BY_SLUG.get(idioma)
  if (!entry) return {}
  const url = `https://www.idiomaswl.com/herramientas/quizes/pronombres/${entry.slug}`
  const description = `Practica ${entry.config.topics.map((topic) => topic.label.toLocaleLowerCase('es')).join(', ')} en ${entry.config.languageName.toLocaleLowerCase('es')} con seis niveles cerrados.`
  return {
    title: `Quiz de pronombres en ${entry.config.languageName.toLocaleLowerCase('es')} — 6 niveles`,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${entry.config.title} — Quiz de ${entry.config.languageName}`, description, url, type: 'website', siteName: 'Idiomas WeLearn', locale: 'es_CO' },
  }
}

export default async function PronounQuizLanguagePage({ params }: Props) {
  const { idioma } = await params
  const entry = PRONOUN_QUEST_BY_SLUG.get(idioma)
  if (!entry) notFound()
  const url = `https://www.idiomaswl.com/herramientas/quizes/pronombres/${entry.slug}`
  return <>
    <GrammarLessonSchema
      course={{ name: `Quizes de ${entry.config.languageName}`, url: 'https://www.idiomaswl.com/herramientas/quizes/pronombres' }}
      description={`Quiz configurable para practicar referente, función, concordancia y uso de pronombres en ${entry.config.languageName.toLocaleLowerCase('es')}.`}
      educationalLevel="A1, A2, B1"
      inLanguage={entry.config.languageCode}
      keywords={entry.keywords}
      name={`${entry.config.title} — Quiz acumulativo de pronombres`}
      url={url}
    />
    <QuizSchema description={`Quiz cerrado de seis niveles sobre pronombres en ${entry.config.languageName.toLocaleLowerCase('es')}, con resultados al finalizar cada nivel.`} name={entry.config.title} url={url}/>
    <PronounQuestEngine config={entry.config}/>
  </>
}
