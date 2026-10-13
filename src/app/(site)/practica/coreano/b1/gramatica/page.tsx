import type { Metadata } from 'next'
import KoreanGrammarIndex from '@/components/grammar/KoreanGrammarIndex'
import { getTopicsByLevel } from '@/data/grammar/registry'
import { generateGrammarIndexMetadata } from '@/lib/grammar-metadata'

export const metadata: Metadata = generateGrammarIndexMetadata('coreano', 'b1')

export default function GrammarIndexPage() {
  return <KoreanGrammarIndex level="b1" topics={getTopicsByLevel('coreano', 'b1')} />
}
