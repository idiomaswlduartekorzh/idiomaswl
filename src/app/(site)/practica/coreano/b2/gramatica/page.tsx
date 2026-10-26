import KoreanAdvancedGrammarCollection from '@/components/grammar/KoreanAdvancedGrammarCollection'
import { getTopicsByLevel } from '@/data/grammar/registry'
import { generateGrammarIndexMetadata } from '@/lib/grammar-metadata'
const TOPICS = getTopicsByLevel('coreano', 'b2')
export const metadata = generateGrammarIndexMetadata('coreano', 'b2', TOPICS.length, { includeAudio: false })
export default function Page() { return <KoreanAdvancedGrammarCollection level="b2" topics={TOPICS} /> }
