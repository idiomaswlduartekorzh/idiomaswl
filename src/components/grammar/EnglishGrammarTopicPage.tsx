import Link from 'next/link'
import type { GrammarTopic } from '@/data/grammar/types'
import { isAdvancedPilot, type EnglishGrammarLevel } from '@/data/english-grammar-preview'
import EnglishGrammarLesson from '@/components/grammar/EnglishGrammarLesson'
import TopicNav from '@/components/grammar/TopicNav'
import { getEnglishGrammarResource } from '@/data/english-grammar-preview'
import { grammarVisualImageObject, grammarVisualUrl } from '@/lib/grammar-visual'

type RelatedWritingExercise = { id: string; sequence: number; title: string; genre: string }

export default function EnglishGrammarTopicPage({ topic, level, relatedWritingExercises, afterLesson }: { topic: GrammarTopic; level: EnglishGrammarLevel; relatedWritingExercises: RelatedWritingExercise[]; afterLesson?: React.ReactNode }) {
  const levelLabel = level.toUpperCase()
  const advancedPilot = isAdvancedPilot(level)
  const canonical = `https://www.idiomaswl.com/practica/ingles/${level}/gramatica/${topic.slug}`
  const indexUrl = `https://www.idiomaswl.com/practica/ingles/${level}/gramatica`
  const resource = getEnglishGrammarResource(topic, level)
  const resourceParts = [
    { '@type': 'MediaObject', name: advancedPilot ? 'Complete grammar guide' : 'Cuaderno PDF', contentUrl: `https://www.idiomaswl.com${resource.pdf}`, encodingFormat: 'application/pdf', inLanguage: advancedPilot ? 'en' : ['es', 'en'] },
    ...(resource.exercisesPdf ? [{ '@type': 'MediaObject', name: 'Grammar exercise workbook', contentUrl: `https://www.idiomaswl.com${resource.exercisesPdf}`, encodingFormat: 'application/pdf', inLanguage: 'en' }] : []),
    ...(resource.answerKeyPdf ? [{ '@type': 'MediaObject', name: 'Grammar answer key', contentUrl: `https://www.idiomaswl.com${resource.answerKeyPdf}`, encodingFormat: 'application/pdf', inLanguage: 'en' }] : []),
    ...resource.audioTracks.map((track) => ({ '@type': 'AudioObject', name: track.title, contentUrl: `https://www.idiomaswl.com${track.src}`, encodingFormat: 'audio/mp4', inLanguage: 'en' })),
  ]
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'LearningResource', name: topic.title, description: topic.description, url: canonical, educationalLevel: topic.level, inLanguage: advancedPilot ? 'en' : ['es', 'en'], teaches: topic.shortTitle, image: grammarVisualUrl('ingles', level, topic.slug), learningResourceType: resource.audioTracks.length ? ['Lección interactiva', 'Cuaderno de ejercicios', 'Audio'] : ['Interactive lesson', 'Exercise workbook', 'Educational infographic'], timeRequired: `PT${resource.studyMinutes}M`, isAccessibleForFree: true, hasPart: resourceParts, provider: { '@type': 'Organization', name: 'Idiomas WeLearn', url: 'https://www.idiomaswl.com' } },
      grammarVisualImageObject(topic, 'ingles', level, { contentLanguage: advancedPilot ? 'en' : 'es' }),
      { '@type': 'HowTo', name: advancedPilot ? `How to study ${topic.shortTitle}` : `Cómo estudiar ${topic.shortTitle}`, description: topic.guide.goal, totalTime: `PT${resource.studyMinutes}M`, step: topic.guide.decisions.map((decision, index) => ({ '@type': 'HowToStep', position: index + 1, name: `${advancedPilot ? 'Step' : 'Paso'} ${index + 1}`, text: decision })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Práctica', item: 'https://www.idiomaswl.com/practica' },
        { '@type': 'ListItem', position: 2, name: 'Inglés', item: 'https://www.idiomaswl.com/practica/ingles' },
        { '@type': 'ListItem', position: 3, name: levelLabel, item: `https://www.idiomaswl.com/practica/ingles/${level}` },
        { '@type': 'ListItem', position: 4, name: `Gramática ${levelLabel}`, item: indexUrl },
        { '@type': 'ListItem', position: 5, name: topic.shortTitle, item: canonical },
      ] },
    ],
  }

  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><div className="gram-page" style={{ '--topic-color': topic.color } as React.CSSProperties}><div className="wrap"><nav aria-label="breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1.5rem 0 0', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}><Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>{advancedPilot ? 'Practice' : 'Práctica'}</Link><span>/</span><Link href={`/practica/ingles/${level}`} style={{ color: 'var(--muted)', textDecoration: 'none' }}>{advancedPilot ? 'English' : 'Inglés'} {levelLabel}</Link><span>/</span><Link href={indexUrl.replace('https://www.idiomaswl.com', '')} style={{ color: 'var(--muted)', textDecoration: 'none' }}>{advancedPilot ? 'Grammar' : 'Gramática'}</Link><span>/</span><span style={{ color: topic.color, fontWeight: 800 }}>{topic.shortTitle}</span></nav><EnglishGrammarLesson topic={topic} level={level} relatedWritingExercises={relatedWritingExercises} />{afterLesson}<TopicNav idioma="ingles" nivel={level} slug={topic.slug} indexLabel={`${advancedPilot ? 'Grammar' : 'Gramática'} ${levelLabel}`} uiLanguage={advancedPilot ? 'en' : 'es'} /></div></div></>
}
