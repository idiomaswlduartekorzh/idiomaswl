import JapaneseAdvancedGrammarCollection from '@/components/grammar/JapaneseAdvancedGrammarCollection'
import { getTopicsByLevel } from '@/data/grammar/registry'
import { generateGrammarIndexMetadata } from '@/lib/grammar-metadata'
const TOPICS = getTopicsByLevel('japones', 'b2')
export const metadata = generateGrammarIndexMetadata('japones', 'b2', TOPICS.length, { includeAudio: false })
export default function Page() { return <JapaneseAdvancedGrammarCollection level="b2" topics={TOPICS} /> }
