import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import KoreanGrammarTopicPage from '@/components/grammar/KoreanGrammarTopicPage'
import { getTopicBySlug } from '@/data/grammar/registry'
import { getWritingExercisesForGrammar } from '@/data/practica/writing-integrated'
import { generateGrammarMetadata } from '@/lib/grammar-metadata'
import { KOREAN_GRAMMAR_AVAILABLE_SLUGS, type KoreanGrammarLevel } from '@/data/korean-grammar-preview'

interface Props { params: Promise<{ nivel: string; slug: string }> }

export function generateStaticParams() {
  return (Object.entries(KOREAN_GRAMMAR_AVAILABLE_SLUGS) as Array<[KoreanGrammarLevel, readonly string[]]>)
    .flatMap(([nivel, slugs]) => slugs.map((slug) => ({ nivel, slug })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { nivel, slug } = await params
  if (!isAvailableTopic(nivel, slug)) return {}
  const topic = getTopicBySlug('coreano', nivel, slug)
  return topic ? { ...generateGrammarMetadata(topic, 'coreano', nivel), robots: { index: false, follow: false } } : {}
}

export default async function KoreanGrammarPreviewPage({ params }: Props) {
  const { nivel, slug } = await params
  if (!isAvailableTopic(nivel, slug)) notFound()
  const topic = getTopicBySlug('coreano', nivel, slug)
  if (!topic) notFound()

  return <KoreanGrammarTopicPage topic={topic} level={nivel} relatedWritingExercises={getWritingExercisesForGrammar('coreano', nivel, topic.slug)} />
}

function isPreviewLevel(level: string): level is KoreanGrammarLevel {
  return level === 'a1' || level === 'a2' || level === 'b1'
}

function isAvailableTopic(level: string, slug: string): level is KoreanGrammarLevel {
  return isPreviewLevel(level) && KOREAN_GRAMMAR_AVAILABLE_SLUGS[level].includes(slug)
}
