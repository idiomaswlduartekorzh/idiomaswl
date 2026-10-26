import GermanGrammarCollection from '@/components/grammar/GermanGrammarCollection'
import { getTopicsByLevel } from '@/data/grammar/registry'
import { generateGrammarIndexMetadata } from '@/lib/grammar-metadata'
const TOPICS = getTopicsByLevel('aleman', 'c1')
export const metadata = generateGrammarIndexMetadata('aleman', 'c1', TOPICS.length, { includeAudio: false })
export default function Page() { return <GermanGrammarCollection level="c1" topics={TOPICS} /> }
