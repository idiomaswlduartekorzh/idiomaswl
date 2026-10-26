import PortugueseGrammarCollection from '@/components/grammar/PortugueseGrammarCollection'
import { getTopicsByLevel } from '@/data/grammar/registry'
import { generateGrammarIndexMetadata } from '@/lib/grammar-metadata'
const TOPICS = getTopicsByLevel('portugues', 'b2')
export const metadata = generateGrammarIndexMetadata('portugues', 'b2', TOPICS.length, { includeAudio: false })
export default function Page() { return <PortugueseGrammarCollection level="b2" topics={TOPICS} /> }
