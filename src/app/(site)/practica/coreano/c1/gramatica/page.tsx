import KoreanAdvancedGrammarCollection from '@/components/grammar/KoreanAdvancedGrammarCollection'
import { getTopicsByLevel } from '@/data/grammar/registry'
import { generateGrammarIndexMetadata } from '@/lib/grammar-metadata'
const TOPICS = getTopicsByLevel('coreano', 'c1')
export const metadata = generateGrammarIndexMetadata('coreano', 'c1', TOPICS.length, { includeAudio: false })
export default function Page() { return <KoreanAdvancedGrammarCollection level="c1" topics={TOPICS} /> }
