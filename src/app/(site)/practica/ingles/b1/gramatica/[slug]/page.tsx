import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import EnglishGrammarTopicPage from '@/components/grammar/EnglishGrammarTopicPage'
import { getTopicBySlug, getTopicsByLevel } from '@/data/grammar/registry'
import { getWritingExercisesForGrammar } from '@/data/practica/writing-integrated'
import { generateGrammarMetadata } from '@/lib/grammar-metadata'

const IDIOMA = 'ingles'
const NIVEL = 'b1'
type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return getTopicsByLevel(IDIOMA, NIVEL).map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const topic = getTopicBySlug(IDIOMA, NIVEL, (await params).slug)
  return topic ? generateGrammarMetadata(topic, IDIOMA, NIVEL) : {}
}

export default async function GrammarTopicPage({ params }: Props) {
  const topic = getTopicBySlug(IDIOMA, NIVEL, (await params).slug)
  if (!topic) notFound()
  return <EnglishGrammarTopicPage topic={topic} level={NIVEL} relatedWritingExercises={getWritingExercisesForGrammar(IDIOMA, NIVEL, topic.slug)} />
}
