import RussianAdvancedGrammarCollection from '@/components/grammar/RussianAdvancedGrammarCollection'
import { getTopicsByLevel } from '@/data/grammar/registry'
import { generateGrammarIndexMetadata } from '@/lib/grammar-metadata'
const TOPICS = getTopicsByLevel('ruso', 'c1')
export const metadata = generateGrammarIndexMetadata('ruso', 'c1', TOPICS.length, { includeAudio: false })
export default function Page() { return <RussianAdvancedGrammarCollection level="c1" topics={TOPICS} /> }
