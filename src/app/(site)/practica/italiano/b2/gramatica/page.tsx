import ItalianGrammarCollection from '@/components/grammar/ItalianGrammarCollection'
import { getTopicsByLevel } from '@/data/grammar/registry'
import { generateGrammarIndexMetadata } from '@/lib/grammar-metadata'
const TOPICS=getTopicsByLevel('italiano','b2')
export const metadata=generateGrammarIndexMetadata('italiano','b2',TOPICS.length,{includeAudio:false})
export default function Page(){return <ItalianGrammarCollection level="b2" topics={TOPICS}/>}
