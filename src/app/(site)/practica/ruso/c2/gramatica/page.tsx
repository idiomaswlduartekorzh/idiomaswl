import RussianAdvancedGrammarCollection from '@/components/grammar/RussianAdvancedGrammarCollection'
import { getTopicsByLevel } from '@/data/grammar/registry'
import { generateGrammarIndexMetadata } from '@/lib/grammar-metadata'
const TOPICS = getTopicsByLevel('ruso', 'c2')
export const metadata = generateGrammarIndexMetadata('ruso', 'c2', TOPICS.length, { includeAudio: false })
export default function Page() { return <RussianAdvancedGrammarCollection level="c2" topics={TOPICS} /> }
