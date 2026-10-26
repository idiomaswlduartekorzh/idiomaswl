import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ItalianGrammarTopicPage from '@/components/grammar/ItalianGrammarTopicPage'
import { getTopicBySlug,getTopicsByLevel } from '@/data/grammar/registry'
import { generateGrammarMetadata } from '@/lib/grammar-metadata'
type Props={params:Promise<{slug:string}>}
export function generateStaticParams(){return getTopicsByLevel('italiano','b2').map(({slug})=>({slug}))}
export async function generateMetadata({params}:Props):Promise<Metadata>{const topic=getTopicBySlug('italiano','b2',(await params).slug);return topic?generateGrammarMetadata(topic,'italiano','b2',{contentLanguage:'it'}):{}}
export default async function Page({params}:Props){const topic=getTopicBySlug('italiano','b2',(await params).slug);if(!topic)notFound();return <ItalianGrammarTopicPage topic={topic} level="b2"/>}
