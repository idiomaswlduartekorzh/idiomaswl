import RussianAdvancedGrammarCollection from '@/components/grammar/RussianAdvancedGrammarCollection'
import { getTopicsByLevel } from '@/data/grammar/registry'
import { generateGrammarIndexMetadata } from '@/lib/grammar-metadata'
const TOPICS = getTopicsByLevel('ruso', 'b2')
export const metadata = generateGrammarIndexMetadata('ruso', 'b2', TOPICS.length, { includeAudio: false })
export default function Page() { return <RussianAdvancedGrammarCollection level="b2" topics={TOPICS} /> }
