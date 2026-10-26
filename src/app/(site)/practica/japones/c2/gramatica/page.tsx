import JapaneseAdvancedGrammarCollection from '@/components/grammar/JapaneseAdvancedGrammarCollection'
import { getTopicsByLevel } from '@/data/grammar/registry'
import { generateGrammarIndexMetadata } from '@/lib/grammar-metadata'
const TOPICS = getTopicsByLevel('japones', 'c2')
export const metadata = generateGrammarIndexMetadata('japones', 'c2', TOPICS.length, { includeAudio: false })
export default function Page() { return <JapaneseAdvancedGrammarCollection level="c2" topics={TOPICS} /> }
