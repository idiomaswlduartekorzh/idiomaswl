import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import FrenchGrammarTopicPage from '@/components/grammar/FrenchGrammarTopicPage'
import { getTopicBySlug, getTopicsByLevel } from '@/data/grammar/registry'
import { generateGrammarMetadata } from '@/lib/grammar-metadata'
type Props = { params: Promise<{ slug: string }> }
export function generateStaticParams() { return getTopicsByLevel('frances', 'b2').map(({ slug }) => ({ slug })) }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const topic = getTopicBySlug('frances', 'b2', (await params).slug); return topic ? generateGrammarMetadata(topic, 'frances', 'b2', { contentLanguage: 'fr' }) : {} }
export default async function Page({ params }: Props) { const topic = getTopicBySlug('frances', 'b2', (await params).slug); if (!topic) notFound(); return <FrenchGrammarTopicPage topic={topic} level="b2" /> }
