import type { Metadata } from 'next'
import { GrammarCollectionIndex } from '@/components/grammar/GrammarCollection'
import { getTopicsByLevel } from '@/data/grammar/registry'
import { generateGrammarIndexMetadata } from '@/lib/grammar-metadata'

const IDIOMA = 'italiano' as const
const NIVEL = 'a1' as const

export const metadata: Metadata = generateGrammarIndexMetadata(IDIOMA, NIVEL)

export default function GrammarIndexPage() {
  return <GrammarCollectionIndex idioma={IDIOMA} nivel={NIVEL} topics={getTopicsByLevel(IDIOMA, NIVEL)} />
}
