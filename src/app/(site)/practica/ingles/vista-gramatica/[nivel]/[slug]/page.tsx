import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import EnglishGrammarTopicPage from '@/components/grammar/EnglishGrammarTopicPage'
import { getTopicBySlug } from '@/data/grammar/registry'
import { getWritingExercisesForGrammar } from '@/data/practica/writing-integrated'
import { generateGrammarMetadata } from '@/lib/grammar-metadata'
import { ENGLISH_GRAMMAR_AVAILABLE_SLUGS, type EnglishGrammarLevel } from '@/data/english-grammar-preview'

interface Props { params: Promise<{ nivel: string; slug: string }> }

export function generateStaticParams() {
  return (Object.entries(ENGLISH_GRAMMAR_AVAILABLE_SLUGS) as Array<[EnglishGrammarLevel, readonly string[]]>)
    .flatMap(([nivel, slugs]) => slugs.map((slug) => ({ nivel, slug })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { nivel, slug } = await params
  if (!isAvailableTopic(nivel, slug)) return {}
  const topic = getTopicBySlug('ingles', nivel, slug)
  return topic ? { ...generateGrammarMetadata(topic, 'ingles', nivel), robots: { index: false, follow: false } } : {}
}

export default async function EnglishGrammarPreviewPage({ params }: Props) {
  const { nivel, slug } = await params
  if (!isAvailableTopic(nivel, slug)) notFound()
  const topic = getTopicBySlug('ingles', nivel, slug)
  if (!topic) notFound()

  const relatedWritingExercises = nivel === 'a1' || nivel === 'a2' || nivel === 'b1'
    ? getWritingExercisesForGrammar('ingles', nivel, topic.slug)
    : []
  return <EnglishGrammarTopicPage topic={topic} level={nivel} relatedWritingExercises={relatedWritingExercises} />
}

function isPreviewLevel(level: string): level is EnglishGrammarLevel {
  return level === 'a1' || level === 'a2' || level === 'b1' || level === 'b2' || level === 'c1' || level === 'c2'
}

function isAvailableTopic(level: string, slug: string): level is EnglishGrammarLevel {
  return isPreviewLevel(level) && ENGLISH_GRAMMAR_AVAILABLE_SLUGS[level].includes(slug)
}
