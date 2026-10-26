import PortugueseGrammarCollection from '@/components/grammar/PortugueseGrammarCollection'
import { getTopicsByLevel } from '@/data/grammar/registry'
import { generateGrammarIndexMetadata } from '@/lib/grammar-metadata'
const TOPICS = getTopicsByLevel('portugues', 'c2')
export const metadata = generateGrammarIndexMetadata('portugues', 'c2', TOPICS.length, { includeAudio: false })
export default function Page() { return <PortugueseGrammarCollection level="c2" topics={TOPICS} /> }
