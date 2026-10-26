import GermanGrammarCollection from '@/components/grammar/GermanGrammarCollection'
import { getTopicsByLevel } from '@/data/grammar/registry'
import { generateGrammarIndexMetadata } from '@/lib/grammar-metadata'
const TOPICS = getTopicsByLevel('aleman', 'b2')
export const metadata = generateGrammarIndexMetadata('aleman', 'b2', TOPICS.length, { includeAudio: false })
export default function Page() { return <GermanGrammarCollection level="b2" topics={TOPICS} /> }
