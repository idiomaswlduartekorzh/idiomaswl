import type { Metadata } from 'next'
import KoreanGrammarIndex from '@/components/grammar/KoreanGrammarIndex'
import { getTopicsByLevel } from '@/data/grammar/registry'
import { generateGrammarIndexMetadata } from '@/lib/grammar-metadata'

export const metadata: Metadata = generateGrammarIndexMetadata('coreano', 'a2')

export default function GrammarIndexPage() {
  return <KoreanGrammarIndex level="a2" topics={getTopicsByLevel('coreano', 'a2')} />
}
