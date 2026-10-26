import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import KoreanAdvancedGrammarTopicPage from '@/components/grammar/KoreanAdvancedGrammarTopicPage'
import { getTopicBySlug, getTopicsByLevel } from '@/data/grammar/registry'
import { generateGrammarMetadata } from '@/lib/grammar-metadata'
type Props = { params: Promise<{ slug: string }> }
export function generateStaticParams() { return getTopicsByLevel('coreano', 'c1').map(({ slug }) => ({ slug })) }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const topic = getTopicBySlug('coreano', 'c1', (await params).slug); return topic ? generateGrammarMetadata(topic, 'coreano', 'c1', { contentLanguage: 'ko' }) : {} }
export default async function Page({ params }: Props) { const topic = getTopicBySlug('coreano', 'c1', (await params).slug); if (!topic) notFound(); return <KoreanAdvancedGrammarTopicPage topic={topic} level="c1" /> }
