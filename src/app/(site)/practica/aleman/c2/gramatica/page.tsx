import GermanGrammarCollection from '@/components/grammar/GermanGrammarCollection'
import { getTopicsByLevel } from '@/data/grammar/registry'
import { generateGrammarIndexMetadata } from '@/lib/grammar-metadata'
const TOPICS = getTopicsByLevel('aleman', 'c2')
export const metadata = generateGrammarIndexMetadata('aleman', 'c2', TOPICS.length, { includeAudio: false })
export default function Page() { return <GermanGrammarCollection level="c2" topics={TOPICS} /> }
