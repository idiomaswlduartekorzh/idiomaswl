import JapaneseAdvancedGrammarCollection from '@/components/grammar/JapaneseAdvancedGrammarCollection'
import { getTopicsByLevel } from '@/data/grammar/registry'
import { generateGrammarIndexMetadata } from '@/lib/grammar-metadata'
const TOPICS = getTopicsByLevel('japones', 'c1')
export const metadata = generateGrammarIndexMetadata('japones', 'c1', TOPICS.length, { includeAudio: false })
export default function Page() { return <JapaneseAdvancedGrammarCollection level="c1" topics={TOPICS} /> }
