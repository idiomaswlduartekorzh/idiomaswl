import Link from 'next/link'
import type { GrammarTopic } from '@/data/grammar/types'
import JapaneseGrammarLesson from '@/components/grammar/JapaneseGrammarLesson'
import TopicNav from '@/components/grammar/TopicNav'

type RelatedWritingExercise = { id: string; sequence: number; title: string; genre: string }

export default function JapaneseGrammarTopicPage({ topic, level, relatedWritingExercises }: { topic: GrammarTopic; level: 'a2' | 'b1'; relatedWritingExercises: RelatedWritingExercise[] }) {
  const levelLabel = level.toUpperCase()
  const canonical = `https://www.idiomaswl.com/practica/japones/${level}/gramatica/${topic.slug}`
  const indexUrl = `https://www.idiomaswl.com/practica/japones/${level}/gramatica`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'LearningResource', name: topic.title, description: topic.description, url: canonical, educationalLevel: topic.level, inLanguage: 'ja', teaches: topic.shortTitle, learningResourceType: ['Lección interactiva', 'Cuaderno imprimible', 'Audio de pronunciación'], provider: { '@type': 'Organization', name: 'Idiomas WeLearn', url: 'https://www.idiomaswl.com' } },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Práctica', item: 'https://www.idiomaswl.com/practica' },
        { '@type': 'ListItem', position: 2, name: 'Japonés', item: 'https://www.idiomaswl.com/practica/japones' },
        { '@type': 'ListItem', position: 3, name: levelLabel, item: `https://www.idiomaswl.com/practica/japones/${level}` },
        { '@type': 'ListItem', position: 4, name: `Gramática ${levelLabel}`, item: indexUrl },
        { '@type': 'ListItem', position: 5, name: topic.shortTitle, item: canonical },
      ] },
      { '@type': 'HowTo', name: `Cómo dominar ${topic.shortTitle} en japonés ${levelLabel}`, description: topic.lead, totalTime: level === 'b1' ? 'PT50M' : 'PT40M', step: topic.guide.decisions.map((text, index) => ({ '@type': 'HowToStep', position: index + 1, name: `Decisión ${index + 1}`, text })) },
      { '@type': 'FAQPage', mainEntity: topic.seo.map((section) => ({ '@type': 'Question', name: section.heading, acceptedAnswer: { '@type': 'Answer', text: section.paragraphs.join(' ') } })) },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="gram-page" style={{ '--topic-color': topic.color } as React.CSSProperties}>
        <div className="wrap">
          <nav aria-label="breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1.5rem 0 0', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link><span>/</span>
            <Link href={`/practica/japones/${level}`} style={{ color: 'var(--muted)', textDecoration: 'none' }}>Japonés {levelLabel}</Link><span>/</span>
            <Link href={`/practica/japones/${level}/gramatica`} style={{ color: 'var(--muted)', textDecoration: 'none' }}>Gramática</Link><span>/</span>
            <span style={{ color: topic.color, fontWeight: 800 }}>{topic.shortTitle}</span>
          </nav>
          <JapaneseGrammarLesson topic={topic} level={level} relatedWritingExercises={relatedWritingExercises} />
          <TopicNav idioma="japones" nivel={level} slug={topic.slug} indexLabel={`Gramática ${levelLabel}`} />
        </div>
      </div>
    </>
  )
}
