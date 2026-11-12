import type { Metadata } from 'next'
import ItalianGrammarCollection from '@/components/grammar/ItalianGrammarCollection'
import { getTopicsByLevel } from '@/data/grammar/registry'
import { generateGrammarIndexMetadata } from '@/lib/grammar-metadata'

const IDIOMA = 'italiano' as const
const NIVEL = 'a2' as const

export const metadata: Metadata = generateGrammarIndexMetadata(IDIOMA, NIVEL)

export default function GrammarIndexPage() {
  return <ItalianGrammarCollection level={NIVEL} topics={getTopicsByLevel(IDIOMA, NIVEL)} />
}
