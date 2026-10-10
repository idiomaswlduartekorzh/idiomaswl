import type { Metadata } from 'next'
import { generateGrammarIndexMetadata } from '@/lib/grammar-metadata'
import { getTopicsByLevel } from '@/data/grammar/registry'
import JapaneseGrammarIndex from '@/components/grammar/JapaneseGrammarIndex'

export const metadata: Metadata = generateGrammarIndexMetadata('japones', 'b1')
export default function Page() {
  const topics = getTopicsByLevel('japones', 'b1')
  const jsonLd = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Gramática japonesa B1', description: 'Ruta de 25 lecciones de gramática japonesa B1 para hispanohablantes.', url: 'https://www.idiomaswl.com/practica/japones/b1/gramatica', inLanguage: 'es', hasPart: topics.map((topic) => ({ '@type': 'LearningResource', name: topic.title, url: `https://www.idiomaswl.com/practica/japones/b1/gramatica/${topic.slug}`, educationalLevel: 'B1', inLanguage: 'ja' })) }
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><JapaneseGrammarIndex level="b1" topics={topics} /></>
}
