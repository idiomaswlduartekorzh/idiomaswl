import type { Metadata } from 'next'
import FrenchGrammarCollection from '@/components/grammar/FrenchGrammarCollection'
import { getTopicsByLevel } from '@/data/grammar/registry'
import { generateGrammarIndexMetadata } from '@/lib/grammar-metadata'

const IDIOMA = 'frances' as const
const NIVEL = 'b1' as const

export const metadata: Metadata = generateGrammarIndexMetadata(IDIOMA, NIVEL)

export default function GrammarIndexPage() {
  return <FrenchGrammarCollection level={NIVEL} topics={getTopicsByLevel(IDIOMA, NIVEL)} />
}
