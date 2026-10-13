import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import KoreanGrammarTopicPage from '@/components/grammar/KoreanGrammarTopicPage'
import { getTopicBySlug } from '@/data/grammar/registry'
import { getWritingExercisesForGrammar } from '@/data/practica/writing-integrated'
import { generateGrammarMetadata } from '@/lib/grammar-metadata'
import { KOREAN_GRAMMAR_PREVIEW_SLUGS, type KoreanGrammarLevel } from '@/data/korean-grammar-preview'

interface Props { params: Promise<{ nivel: string; slug: string }> }

export function generateStaticParams() {
  return (Object.entries(KOREAN_GRAMMAR_PREVIEW_SLUGS) as Array<[KoreanGrammarLevel, string]>).map(([nivel, slug]) => ({ nivel, slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { nivel, slug } = await params
  if (!isPreviewLevel(nivel) || KOREAN_GRAMMAR_PREVIEW_SLUGS[nivel] !== slug) return {}
  const topic = getTopicBySlug('coreano', nivel, slug)
  return topic ? { ...generateGrammarMetadata(topic, 'coreano', nivel), robots: { index: false, follow: false } } : {}
}

export default async function KoreanGrammarPreviewPage({ params }: Props) {
  const { nivel, slug } = await params
  if (!isPreviewLevel(nivel) || KOREAN_GRAMMAR_PREVIEW_SLUGS[nivel] !== slug) notFound()
  const topic = getTopicBySlug('coreano', nivel, slug)
  if (!topic) notFound()

  return <KoreanGrammarTopicPage topic={topic} level={nivel} relatedWritingExercises={getWritingExercisesForGrammar('coreano', nivel, topic.slug)} />
}

function isPreviewLevel(level: string): level is KoreanGrammarLevel {
  return level === 'a1' || level === 'a2' || level === 'b1'
}
