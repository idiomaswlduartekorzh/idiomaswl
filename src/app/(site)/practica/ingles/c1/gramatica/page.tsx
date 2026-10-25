import { GrammarCollectionIndex } from '@/components/grammar/GrammarCollection'
import { getTopicsByLevel } from '@/data/grammar/registry'
import { generateGrammarIndexMetadata } from '@/lib/grammar-metadata'

const IDIOMA = 'ingles'
const NIVEL = 'c1'
const TOPICS = getTopicsByLevel(IDIOMA, NIVEL)

export const metadata = generateGrammarIndexMetadata(IDIOMA, NIVEL, TOPICS.length, { includeAudio: false })

export default function EnglishC1GrammarIndexPage() {
  return <GrammarCollectionIndex idioma={IDIOMA} nivel={NIVEL} topics={TOPICS} />
}
