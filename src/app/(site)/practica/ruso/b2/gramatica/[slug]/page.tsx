import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import RussianAdvancedGrammarTopicPage from '@/components/grammar/RussianAdvancedGrammarTopicPage'
import { getTopicBySlug, getTopicsByLevel } from '@/data/grammar/registry'
import { generateGrammarMetadata } from '@/lib/grammar-metadata'
type Props = { params: Promise<{ slug: string }> }
export function generateStaticParams() { return getTopicsByLevel('ruso', 'b2').map(({ slug }) => ({ slug })) }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const topic = getTopicBySlug('ruso', 'b2', (await params).slug); return topic ? generateGrammarMetadata(topic, 'ruso', 'b2', { contentLanguage: 'ru' }) : {} }
export default async function Page({ params }: Props) { const topic = getTopicBySlug('ruso', 'b2', (await params).slug); if (!topic) notFound(); return <RussianAdvancedGrammarTopicPage topic={topic} level="b2" /> }
