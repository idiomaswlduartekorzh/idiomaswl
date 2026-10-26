import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PortugueseGrammarTopicPage from '@/components/grammar/PortugueseGrammarTopicPage'
import { getTopicBySlug, getTopicsByLevel } from '@/data/grammar/registry'
import { generateGrammarMetadata } from '@/lib/grammar-metadata'
type Props = { params: Promise<{ slug: string }> }
export function generateStaticParams() { return getTopicsByLevel('portugues', 'c1').map(({ slug }) => ({ slug })) }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const topic = getTopicBySlug('portugues', 'c1', (await params).slug); return topic ? generateGrammarMetadata(topic, 'portugues', 'c1', { contentLanguage: 'pt' }) : {} }
export default async function Page({ params }: Props) { const topic = getTopicBySlug('portugues', 'c1', (await params).slug); if (!topic) notFound(); return <PortugueseGrammarTopicPage topic={topic} level="c1" /> }
