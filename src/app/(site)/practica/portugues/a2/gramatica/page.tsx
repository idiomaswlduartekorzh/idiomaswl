import type { Metadata } from 'next'
import PortugueseGrammarCollection from '@/components/grammar/PortugueseGrammarCollection'
import { getTopicsByLevel } from '@/data/grammar/registry'
import { generateGrammarIndexMetadata } from '@/lib/grammar-metadata'

const IDIOMA = 'portugues' as const
const NIVEL = 'a2' as const

export const metadata: Metadata = generateGrammarIndexMetadata(IDIOMA, NIVEL)

export default function GrammarIndexPage() {
  return <PortugueseGrammarCollection level={NIVEL} topics={getTopicsByLevel(IDIOMA, NIVEL)} />
}
