import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { GrammarCollectionTopicPage } from '@/components/grammar/GrammarCollection'
import { getTopicBySlug, getTopicsByLevel } from '@/data/grammar/registry'
import { getWritingExercisesForGrammar } from '@/data/practica/writing-integrated'
import { generateGrammarMetadata } from '@/lib/grammar-metadata'

const IDIOMA = 'japones'
const NIVEL = 'a2'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getTopicsByLevel(IDIOMA, NIVEL).map((topic) => ({ slug: topic.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const topic = getTopicBySlug(IDIOMA, NIVEL, (await params).slug)
  return topic ? generateGrammarMetadata(topic, IDIOMA, NIVEL) : {}
}

export default async function GrammarTopicPage({ params }: Props) {
  const topic = getTopicBySlug(IDIOMA, NIVEL, (await params).slug)
  if (!topic) notFound()
  return <GrammarCollectionTopicPage topic={topic} idioma={IDIOMA} nivel={NIVEL} relatedWritingExercises={getWritingExercisesForGrammar(IDIOMA, NIVEL, topic.slug)} />
}
