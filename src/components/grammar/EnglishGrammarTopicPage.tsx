import Link from 'next/link'
import type { GrammarTopic } from '@/data/grammar/types'
import type { EnglishGrammarLevel } from '@/data/english-grammar-preview'
import EnglishGrammarLesson from '@/components/grammar/EnglishGrammarLesson'
import TopicNav from '@/components/grammar/TopicNav'

type RelatedWritingExercise = { id: string; sequence: number; title: string; genre: string }

export default function EnglishGrammarTopicPage({ topic, level, relatedWritingExercises }: { topic: GrammarTopic; level: EnglishGrammarLevel; relatedWritingExercises: RelatedWritingExercise[] }) {
  const levelLabel = level.toUpperCase()
  const canonical = `https://www.idiomaswl.com/practica/ingles/${level}/gramatica/${topic.slug}`
  const indexUrl = `https://www.idiomaswl.com/practica/ingles/${level}/gramatica`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'LearningResource', name: topic.title, description: topic.description, url: canonical, educationalLevel: topic.level, inLanguage: 'en', teaches: topic.shortTitle, learningResourceType: 'Lección interactiva', provider: { '@type': 'Organization', name: 'Idiomas WeLearn', url: 'https://www.idiomaswl.com' } },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Práctica', item: 'https://www.idiomaswl.com/practica' },
        { '@type': 'ListItem', position: 2, name: 'Inglés', item: 'https://www.idiomaswl.com/practica/ingles' },
        { '@type': 'ListItem', position: 3, name: levelLabel, item: `https://www.idiomaswl.com/practica/ingles/${level}` },
        { '@type': 'ListItem', position: 4, name: `Gramática ${levelLabel}`, item: indexUrl },
        { '@type': 'ListItem', position: 5, name: topic.shortTitle, item: canonical },
      ] },
    ],
  }

  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><div className="gram-page" style={{ '--topic-color': topic.color } as React.CSSProperties}><div className="wrap"><nav aria-label="breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1.5rem 0 0', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}><Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link><span>/</span><Link href={`/practica/ingles/${level}`} style={{ color: 'var(--muted)', textDecoration: 'none' }}>Inglés {levelLabel}</Link><span>/</span><Link href={indexUrl.replace('https://www.idiomaswl.com', '')} style={{ color: 'var(--muted)', textDecoration: 'none' }}>Gramática</Link><span>/</span><span style={{ color: topic.color, fontWeight: 800 }}>{topic.shortTitle}</span></nav><EnglishGrammarLesson topic={topic} level={level} relatedWritingExercises={relatedWritingExercises} /><TopicNav idioma="ingles" nivel={level} slug={topic.slug} indexLabel={`Gramática ${levelLabel}`} /></div></div></>
}
