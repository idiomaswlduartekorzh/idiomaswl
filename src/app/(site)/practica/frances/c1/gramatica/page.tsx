import FrenchGrammarCollection from '@/components/grammar/FrenchGrammarCollection'
import { getTopicsByLevel } from '@/data/grammar/registry'
import { generateGrammarIndexMetadata } from '@/lib/grammar-metadata'
const TOPICS = getTopicsByLevel('frances', 'c1')
export const metadata = generateGrammarIndexMetadata('frances', 'c1', TOPICS.length, { includeAudio: false })
export default function Page() { return <FrenchGrammarCollection level="c1" topics={TOPICS} /> }
