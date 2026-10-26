import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import GermanGrammarTopicPage from '@/components/grammar/GermanGrammarTopicPage'
import { getTopicBySlug, getTopicsByLevel } from '@/data/grammar/registry'
import { generateGrammarMetadata } from '@/lib/grammar-metadata'
type Props = { params: Promise<{ slug: string }> }
export function generateStaticParams() { return getTopicsByLevel('aleman', 'b2').map(({ slug }) => ({ slug })) }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const topic = getTopicBySlug('aleman', 'b2', (await params).slug); return topic ? generateGrammarMetadata(topic, 'aleman', 'b2', { contentLanguage: 'de' }) : {} }
export default async function Page({ params }: Props) { const topic = getTopicBySlug('aleman', 'b2', (await params).slug); if (!topic) notFound(); return <GermanGrammarTopicPage topic={topic} level="b2" /> }
