import KoreanAdvancedGrammarCollection from '@/components/grammar/KoreanAdvancedGrammarCollection'
import { getTopicsByLevel } from '@/data/grammar/registry'
import { generateGrammarIndexMetadata } from '@/lib/grammar-metadata'
const TOPICS = getTopicsByLevel('coreano', 'c2')
export const metadata = generateGrammarIndexMetadata('coreano', 'c2', TOPICS.length, { includeAudio: false })
export default function Page() { return <KoreanAdvancedGrammarCollection level="c2" topics={TOPICS} /> }
