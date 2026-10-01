import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTopicsByLevel, getTopicBySlug } from '@/data/grammar/registry'
import { getWritingExercisesForGrammar } from '@/data/practica/writing-integrated'
import { generateGrammarMetadata } from '@/lib/grammar-metadata'
import JapaneseGrammarTopicPage from '@/components/grammar/JapaneseGrammarTopicPage'

const NIVEL = 'a2'
interface Props { params: Promise<{ slug: string }> }
export async function generateStaticParams() { return getTopicsByLevel('japones', NIVEL).map((topic) => ({ slug: topic.slug })) }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const topic = getTopicBySlug('japones', NIVEL, slug); return topic ? generateGrammarMetadata(topic, 'japones', NIVEL) : {} }
export default async function Page({ params }: Props) { const { slug } = await params; const topic = getTopicBySlug('japones', NIVEL, slug); if (!topic) notFound(); return <JapaneseGrammarTopicPage topic={topic} level={NIVEL} relatedWritingExercises={getWritingExercisesForGrammar('japones', NIVEL, topic.slug)} /> }
