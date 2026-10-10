import type { Metadata } from 'next'
import { generateGrammarIndexMetadata } from '@/lib/grammar-metadata'
import { getTopicsByLevel } from '@/data/grammar/registry'
import JapaneseGrammarIndex from '@/components/grammar/JapaneseGrammarIndex'

export const metadata: Metadata = generateGrammarIndexMetadata('japones', 'a2')
export default function Page() {
  const topics = getTopicsByLevel('japones', 'a2')
  const jsonLd = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Gramática japonesa A2', description: 'Ruta de 25 lecciones de gramática japonesa A2 para hispanohablantes.', url: 'https://www.idiomaswl.com/practica/japones/a2/gramatica', inLanguage: 'es', hasPart: topics.map((topic) => ({ '@type': 'LearningResource', name: topic.title, url: `https://www.idiomaswl.com/practica/japones/a2/gramatica/${topic.slug}`, educationalLevel: 'A2', inLanguage: 'ja' })) }
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><JapaneseGrammarIndex level="a2" topics={topics} /></>
}
