import type { Metadata } from 'next'
import JapaneseAdvancedGrammarCollection from '@/components/grammar/JapaneseAdvancedGrammarCollection'
import { getTopicsByLevel } from '@/data/grammar/registry'
import { generateGrammarIndexMetadata } from '@/lib/grammar-metadata'

const IDIOMA = 'japones'
const NIVEL = 'a2'

export const metadata: Metadata = generateGrammarIndexMetadata(IDIOMA, NIVEL)

export default function GrammarIndexPage() {
  return <JapaneseAdvancedGrammarCollection level={NIVEL} topics={getTopicsByLevel(IDIOMA, NIVEL)} />
}
