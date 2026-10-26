import Link from 'next/link'
import type { GrammarTopic } from '@/data/grammar/types'
import type { FrenchGrammarLevel } from '@/data/french-grammar-resources'
import { getFrenchGrammarResource } from '@/data/french-grammar-resources'
import FrenchGrammarLesson from '@/components/grammar/FrenchGrammarLesson'
import TopicNav from '@/components/grammar/TopicNav'
import { grammarVisualImageObject, grammarVisualUrl } from '@/lib/grammar-visual'

export default function FrenchGrammarTopicPage({ topic, level }: { topic: GrammarTopic; level: FrenchGrammarLevel }) {
  const levelLabel = level.toUpperCase()
  const canonical = `https://www.idiomaswl.com/practica/frances/${level}/gramatica/${topic.slug}`
  const indexUrl = `https://www.idiomaswl.com/practica/frances/${level}/gramatica`
  const resource = getFrenchGrammarResource(topic, level)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LearningResource', name: topic.title, description: topic.description, url: canonical,
        educationalLevel: topic.level, inLanguage: 'fr', teaches: topic.shortTitle,
        image: grammarVisualUrl('frances', level, topic.slug),
        learningResourceType: ['Leçon interactive', 'Cahier d’exercices', 'Infographie pédagogique'],
        timeRequired: `PT${resource.studyMinutes}M`, isAccessibleForFree: true,
        hasPart: [
          { '@type': 'MediaObject', name: 'Cours complet de grammaire', contentUrl: `https://www.idiomaswl.com${resource.pdf}`, encodingFormat: 'application/pdf', inLanguage: 'fr' },
          { '@type': 'MediaObject', name: 'Cahier d’exercices', contentUrl: `https://www.idiomaswl.com${resource.exercisesPdf}`, encodingFormat: 'application/pdf', inLanguage: 'fr' },
          { '@type': 'MediaObject', name: 'Corrigé raisonné', contentUrl: `https://www.idiomaswl.com${resource.answerKeyPdf}`, encodingFormat: 'application/pdf', inLanguage: 'fr' },
        ],
        provider: { '@type': 'Organization', name: 'Idiomas WeLearn', url: 'https://www.idiomaswl.com' },
      },
      grammarVisualImageObject(topic, 'frances', level, { contentLanguage: 'fr' }),
      { '@type': 'HowTo', name: `Comment étudier ${topic.shortTitle}`, description: topic.guide.goal, totalTime: `PT${resource.studyMinutes}M`, step: topic.guide.decisions.map((decision, index) => ({ '@type': 'HowToStep', position: index + 1, name: `Étape ${index + 1}`, text: decision })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Pratique', item: 'https://www.idiomaswl.com/practica' },
        { '@type': 'ListItem', position: 2, name: 'Français', item: 'https://www.idiomaswl.com/practica/frances' },
        { '@type': 'ListItem', position: 3, name: levelLabel, item: `https://www.idiomaswl.com/practica/frances/${level}` },
        { '@type': 'ListItem', position: 4, name: `Grammaire ${levelLabel}`, item: indexUrl },
        { '@type': 'ListItem', position: 5, name: topic.shortTitle, item: canonical },
      ] },
    ],
  }

  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><div className="gram-page" style={{ '--topic-color': topic.color } as React.CSSProperties}><div className="wrap"><nav aria-label="Fil d’Ariane" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1.5rem 0 0', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}><Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Pratique</Link><span>/</span><Link href={`/practica/frances/${level}`} style={{ color: 'var(--muted)', textDecoration: 'none' }}>Français {levelLabel}</Link><span>/</span><Link href={indexUrl.replace('https://www.idiomaswl.com', '')} style={{ color: 'var(--muted)', textDecoration: 'none' }}>Grammaire</Link><span>/</span><span style={{ color: topic.color, fontWeight: 800 }}>{topic.shortTitle}</span></nav><FrenchGrammarLesson topic={topic} level={level} /><TopicNav idioma="frances" nivel={level} slug={topic.slug} indexLabel={`Grammaire ${levelLabel}`} uiLanguage="fr" /></div></div></>
}
