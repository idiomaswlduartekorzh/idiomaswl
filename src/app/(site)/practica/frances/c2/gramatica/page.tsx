import FrenchGrammarCollection from '@/components/grammar/FrenchGrammarCollection'
import { getTopicsByLevel } from '@/data/grammar/registry'
import { generateGrammarIndexMetadata } from '@/lib/grammar-metadata'
const TOPICS = getTopicsByLevel('frances', 'c2')
export const metadata = generateGrammarIndexMetadata('frances', 'c2', TOPICS.length, { includeAudio: false })
export default function Page() { return <FrenchGrammarCollection level="c2" topics={TOPICS} /> }
