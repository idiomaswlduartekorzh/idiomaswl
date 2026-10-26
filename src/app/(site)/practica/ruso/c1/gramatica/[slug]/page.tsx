import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import RussianAdvancedGrammarTopicPage from '@/components/grammar/RussianAdvancedGrammarTopicPage'
import { getTopicBySlug, getTopicsByLevel } from '@/data/grammar/registry'
import { generateGrammarMetadata } from '@/lib/grammar-metadata'
type Props = { params: Promise<{ slug: string }> }
export function generateStaticParams() { return getTopicsByLevel('ruso', 'c1').map(({ slug }) => ({ slug })) }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const topic = getTopicBySlug('ruso', 'c1', (await params).slug); return topic ? generateGrammarMetadata(topic, 'ruso', 'c1', { contentLanguage: 'ru' }) : {} }
export default async function Page({ params }: Props) { const topic = getTopicBySlug('ruso', 'c1', (await params).slug); if (!topic) notFound(); return <RussianAdvancedGrammarTopicPage topic={topic} level="c1" /> }
