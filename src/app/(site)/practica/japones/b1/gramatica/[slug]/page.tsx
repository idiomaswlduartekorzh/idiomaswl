import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import JapaneseAdvancedGrammarTopicPage from '@/components/grammar/JapaneseAdvancedGrammarTopicPage'
import { getTopicBySlug, getTopicsByLevel } from '@/data/grammar/registry'
import { generateGrammarMetadata } from '@/lib/grammar-metadata'

const IDIOMA = 'japones'
const NIVEL = 'b1'

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
  return <JapaneseAdvancedGrammarTopicPage topic={topic} level={NIVEL} />
}
