import ItalianGrammarCollection from '@/components/grammar/ItalianGrammarCollection'
import {getTopicsByLevel} from '@/data/grammar/registry'
import {generateGrammarIndexMetadata} from '@/lib/grammar-metadata'
const TOPICS=getTopicsByLevel('italiano','c1')
export const metadata=generateGrammarIndexMetadata('italiano','c1',TOPICS.length,{includeAudio:false})
export default function Page(){return <ItalianGrammarCollection level="c1" topics={TOPICS}/>}
