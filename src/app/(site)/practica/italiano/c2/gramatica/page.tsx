import ItalianGrammarCollection from '@/components/grammar/ItalianGrammarCollection'
import {getTopicsByLevel} from '@/data/grammar/registry'
import {generateGrammarIndexMetadata} from '@/lib/grammar-metadata'
const TOPICS=getTopicsByLevel('italiano','c2')
export const metadata=generateGrammarIndexMetadata('italiano','c2',TOPICS.length,{includeAudio:false})
export default function Page(){return <ItalianGrammarCollection level="c2" topics={TOPICS}/>}
