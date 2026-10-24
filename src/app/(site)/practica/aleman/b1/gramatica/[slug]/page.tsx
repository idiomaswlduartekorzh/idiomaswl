import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { GrammarCollectionTopicPage } from '@/components/grammar/GrammarCollection'
import { getTopicsByLevel, getTopicBySlug } from '@/data/grammar/registry'
import { getWritingExercisesForGrammar } from '@/data/practica/writing-integrated'
import { generateGrammarMetadata } from '@/lib/grammar-metadata'

const IDIOMA = 'aleman' as const
const NIVEL = 'b1' as const

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getTopicsByLevel(IDIOMA, NIVEL).map((topic) => ({ slug: topic.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const topic = getTopicBySlug(IDIOMA, NIVEL, slug)
  return topic ? generateGrammarMetadata(topic, IDIOMA, NIVEL) : {}
}

export default async function GrammarTopicPage({ params }: Props) {
  const { slug } = await params
  const topic = getTopicBySlug(IDIOMA, NIVEL, slug)
  if (!topic) notFound()

  return (
    <GrammarCollectionTopicPage
      topic={topic}
      idioma={IDIOMA}
      nivel={NIVEL}
      relatedWritingExercises={getWritingExercisesForGrammar(IDIOMA, NIVEL, topic.slug)}
    />
  )
}
