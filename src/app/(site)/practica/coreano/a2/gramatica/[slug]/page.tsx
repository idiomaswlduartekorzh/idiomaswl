import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import KoreanGrammarTopicPage from '@/components/grammar/KoreanGrammarTopicPage'
import { getTopicsByLevel, getTopicBySlug } from '@/data/grammar/registry'
import { getWritingExercisesForGrammar } from '@/data/practica/writing-integrated'
import { generateGrammarMetadata } from '@/lib/grammar-metadata'

const IDIOMA = 'coreano'
const NIVEL = 'a2'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
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
    <KoreanGrammarTopicPage
      topic={topic}
      level={NIVEL}
      relatedWritingExercises={getWritingExercisesForGrammar(IDIOMA, NIVEL, topic.slug)}
    />
  )
}
