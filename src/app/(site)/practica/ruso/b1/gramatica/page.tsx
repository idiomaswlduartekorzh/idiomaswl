import type { Metadata } from 'next'
import RussianAdvancedGrammarCollection from '@/components/grammar/RussianAdvancedGrammarCollection'
import { getTopicsByLevel } from '@/data/grammar/registry'
import { generateGrammarIndexMetadata } from '@/lib/grammar-metadata'

const IDIOMA = 'ruso' as const
const NIVEL = 'b1' as const

export const metadata: Metadata = generateGrammarIndexMetadata(IDIOMA, NIVEL)

export default function GrammarIndexPage() {
  return <RussianAdvancedGrammarCollection level={NIVEL} topics={getTopicsByLevel(IDIOMA, NIVEL)} />
}
