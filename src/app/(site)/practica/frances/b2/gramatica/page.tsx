import FrenchGrammarCollection from '@/components/grammar/FrenchGrammarCollection'
import { getTopicsByLevel } from '@/data/grammar/registry'
import { generateGrammarIndexMetadata } from '@/lib/grammar-metadata'
const TOPICS = getTopicsByLevel('frances', 'b2')
export const metadata = generateGrammarIndexMetadata('frances', 'b2', TOPICS.length, { includeAudio: false })
export default function Page() { return <FrenchGrammarCollection level="b2" topics={TOPICS} /> }
