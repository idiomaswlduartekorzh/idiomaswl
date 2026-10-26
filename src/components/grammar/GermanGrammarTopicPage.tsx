import Link from 'next/link'
import type { GrammarTopic } from '@/data/grammar/types'
import type { GermanGrammarLevel } from '@/data/german-grammar-resources'
import { getGermanGrammarResource } from '@/data/german-grammar-resources'
import GermanGrammarLesson from '@/components/grammar/GermanGrammarLesson'
import TopicNav from '@/components/grammar/TopicNav'
import { grammarVisualImageObject, grammarVisualUrl } from '@/lib/grammar-visual'

export default function GermanGrammarTopicPage({ topic, level }: { topic: GrammarTopic; level: GermanGrammarLevel }) {
  const levelLabel = level.toUpperCase()
  const canonical = `https://www.idiomaswl.com/practica/aleman/${level}/gramatica/${topic.slug}`
  const indexUrl = `https://www.idiomaswl.com/practica/aleman/${level}/gramatica`
  const resource = getGermanGrammarResource(topic, level)
  const jsonLd = {
    '@context': 'https://schema.org', '@graph': [
      {
        '@type': 'LearningResource', name: topic.title, description: topic.description, url: canonical,
        educationalLevel: topic.level, inLanguage: 'de', teaches: topic.shortTitle,
        image: grammarVisualUrl('aleman', level, topic.slug),
        learningResourceType: ['Interaktive Lektion', 'Übungsheft', 'Lerninfografik'],
        timeRequired: `PT${resource.studyMinutes}M`, isAccessibleForFree: true,
        hasPart: [
          { '@type': 'MediaObject', name: 'Vollständiger Grammatikkurs', contentUrl: `https://www.idiomaswl.com${resource.pdf}`, encodingFormat: 'application/pdf', inLanguage: 'de' },
          { '@type': 'MediaObject', name: 'Übungsheft', contentUrl: `https://www.idiomaswl.com${resource.exercisesPdf}`, encodingFormat: 'application/pdf', inLanguage: 'de' },
          { '@type': 'MediaObject', name: 'Lösungsschlüssel', contentUrl: `https://www.idiomaswl.com${resource.answerKeyPdf}`, encodingFormat: 'application/pdf', inLanguage: 'de' },
        ],
        provider: { '@type': 'Organization', name: 'Idiomas WeLearn', url: 'https://www.idiomaswl.com' },
      },
      grammarVisualImageObject(topic, 'aleman', level, { contentLanguage: 'de' }),
      { '@type': 'HowTo', name: `${topic.shortTitle} lernen`, description: topic.guide.goal, totalTime: `PT${resource.studyMinutes}M`, step: topic.guide.decisions.map((decision, index) => ({ '@type': 'HowToStep', position: index + 1, name: `Schritt ${index + 1}`, text: decision })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Übungen', item: 'https://www.idiomaswl.com/practica' },
        { '@type': 'ListItem', position: 2, name: 'Deutsch', item: 'https://www.idiomaswl.com/practica/aleman' },
        { '@type': 'ListItem', position: 3, name: levelLabel, item: `https://www.idiomaswl.com/practica/aleman/${level}` },
        { '@type': 'ListItem', position: 4, name: `Grammatik ${levelLabel}`, item: indexUrl },
        { '@type': 'ListItem', position: 5, name: topic.shortTitle, item: canonical },
      ] },
    ],
  }

  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><div className="gram-page" style={{ '--topic-color': topic.color } as React.CSSProperties}><div className="wrap"><nav aria-label="Brotkrümelnavigation" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1.5rem 0 0', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}><Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Übungen</Link><span>/</span><Link href={`/practica/aleman/${level}`} style={{ color: 'var(--muted)', textDecoration: 'none' }}>Deutsch {levelLabel}</Link><span>/</span><Link href={indexUrl.replace('https://www.idiomaswl.com', '')} style={{ color: 'var(--muted)', textDecoration: 'none' }}>Grammatik</Link><span>/</span><span style={{ color: topic.color, fontWeight: 800 }}>{topic.shortTitle}</span></nav><GermanGrammarLesson topic={topic} level={level} /><TopicNav idioma="aleman" nivel={level} slug={topic.slug} indexLabel={`Grammatik ${levelLabel}`} uiLanguage="de" /></div></div></>
}
