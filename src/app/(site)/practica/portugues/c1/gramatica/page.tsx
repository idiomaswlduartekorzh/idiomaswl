import PortugueseGrammarCollection from '@/components/grammar/PortugueseGrammarCollection'
import { getTopicsByLevel } from '@/data/grammar/registry'
import { generateGrammarIndexMetadata } from '@/lib/grammar-metadata'
const TOPICS = getTopicsByLevel('portugues', 'c1')
export const metadata = generateGrammarIndexMetadata('portugues', 'c1', TOPICS.length, { includeAudio: false })
export default function Page() { return <PortugueseGrammarCollection level="c1" topics={TOPICS} /> }
