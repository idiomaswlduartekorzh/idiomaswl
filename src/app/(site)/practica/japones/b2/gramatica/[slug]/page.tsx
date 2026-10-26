import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import JapaneseAdvancedGrammarTopicPage from '@/components/grammar/JapaneseAdvancedGrammarTopicPage'
import { getTopicBySlug, getTopicsByLevel } from '@/data/grammar/registry'
import { generateGrammarMetadata } from '@/lib/grammar-metadata'
type Props = { params: Promise<{ slug: string }> }
export function generateStaticParams() { return getTopicsByLevel('japones', 'b2').map(({ slug }) => ({ slug })) }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const topic = getTopicBySlug('japones', 'b2', (await params).slug); return topic ? generateGrammarMetadata(topic, 'japones', 'b2', { contentLanguage: 'ja' }) : {} }
export default async function Page({ params }: Props) { const topic = getTopicBySlug('japones', 'b2', (await params).slug); if (!topic) notFound(); return <JapaneseAdvancedGrammarTopicPage topic={topic} level="b2" /> }
