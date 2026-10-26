import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import JapaneseAdvancedGrammarTopicPage from '@/components/grammar/JapaneseAdvancedGrammarTopicPage'
import { getTopicBySlug, getTopicsByLevel } from '@/data/grammar/registry'
import { generateGrammarMetadata } from '@/lib/grammar-metadata'
type Props = { params: Promise<{ slug: string }> }
export function generateStaticParams() { return getTopicsByLevel('japones', 'c1').map(({ slug }) => ({ slug })) }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const topic = getTopicBySlug('japones', 'c1', (await params).slug); return topic ? generateGrammarMetadata(topic, 'japones', 'c1', { contentLanguage: 'ja' }) : {} }
export default async function Page({ params }: Props) { const topic = getTopicBySlug('japones', 'c1', (await params).slug); if (!topic) notFound(); return <JapaneseAdvancedGrammarTopicPage topic={topic} level="c1" /> }
