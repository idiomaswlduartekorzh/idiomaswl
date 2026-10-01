import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTopicsByLevel, getTopicBySlug } from '@/data/grammar/registry'
import { getWritingExercisesForGrammar } from '@/data/practica/writing-integrated'
import { getJapaneseScriptLesson } from '@/data/japanese-scripts-a1'
import { generateGrammarMetadata } from '@/lib/grammar-metadata'
import JapaneseScriptLesson from '@/components/grammar/JapaneseScriptLesson'
import JapaneseGrammarLesson from '@/components/grammar/JapaneseGrammarLesson'
import TopicNav from '@/components/grammar/TopicNav'

const IDIOMA = 'japones'
const NIVEL = 'a1'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const topics = getTopicsByLevel(IDIOMA, NIVEL)
  return topics.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const topic = getTopicBySlug(IDIOMA, NIVEL, slug)
  if (!topic) return {}
  return generateGrammarMetadata(topic, IDIOMA, NIVEL)
}

export default async function GrammarTopicPage({ params }: Props) {
  const { slug } = await params
  const topic = getTopicBySlug(IDIOMA, NIVEL, slug)
  if (!topic) notFound()
  const scriptLesson = getJapaneseScriptLesson(topic.slug)
  const relatedWritingExercises = getWritingExercisesForGrammar(IDIOMA, NIVEL, topic.slug)

  const canonical = `https://www.idiomaswl.com/practica/${IDIOMA}/${NIVEL}/gramatica/${topic.slug}`
  const indexUrl = `https://www.idiomaswl.com/practica/${IDIOMA}/${NIVEL}/gramatica`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LearningResource',
        name: topic.title,
        description: topic.description,
        url: canonical,
        educationalLevel: topic.level,
        inLanguage: 'ja',
        teaches: topic.shortTitle,
        learningResourceType: 'Lección interactiva',
        provider: { '@type': 'Organization', name: 'Idiomas WeLearn', url: 'https://www.idiomaswl.com' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Práctica', item: 'https://www.idiomaswl.com/practica' },
          { '@type': 'ListItem', position: 2, name: 'Japonés', item: 'https://www.idiomaswl.com/practica/japones' },
          { '@type': 'ListItem', position: 3, name: 'A1', item: 'https://www.idiomaswl.com/practica/japones/a1' },
          { '@type': 'ListItem', position: 4, name: 'Gramática A1', item: indexUrl },
          { '@type': 'ListItem', position: 5, name: topic.shortTitle, item: canonical },
        ],
      },
      ...(scriptLesson ? [
        {
          '@type': 'HowTo',
          name: `Cómo aprender ${scriptLesson.name} en nivel A1`,
          description: scriptLesson.lead,
          totalTime: scriptLesson.id === 'kanji' ? 'PT45M' : 'PT35M',
          step: [
            { '@type': 'HowToStep', position: 1, name: 'Comprender su función', text: scriptLesson.intro.paragraphs[0] },
            { '@type': 'HowToStep', position: 2, name: 'Estudiar la tabla visual', text: scriptLesson.chartCopy },
            { '@type': 'HowToStep', position: 3, name: 'Practicar los trazos', text: scriptLesson.strokeCopy },
            { '@type': 'HowToStep', position: 4, name: 'Reconocer en ambas direcciones', text: scriptLesson.practiceCopy },
          ],
        },
        {
          '@type': 'FAQPage',
          mainEntity: scriptLesson.faqs.map(([question, answer]) => ({
            '@type': 'Question',
            name: question,
            acceptedAnswer: { '@type': 'Answer', text: answer },
          })),
        },
      ] : [
        {
          '@type': 'HowTo',
          name: `Cómo aprender ${topic.shortTitle} en japonés A1`,
          description: topic.lead,
          totalTime: 'PT35M',
          step: topic.guide.decisions.map((text, index) => ({
            '@type': 'HowToStep', position: index + 1, name: `Decisión ${index + 1}`, text,
          })),
        },
        {
          '@type': 'FAQPage',
          mainEntity: topic.seo.map((section) => ({
            '@type': 'Question',
            name: section.heading,
            acceptedAnswer: { '@type': 'Answer', text: section.paragraphs.join(' ') },
          })),
        },
      ]),
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="gram-page" style={{ '--topic-color': topic.color } as React.CSSProperties}>
        <div className="wrap">
          <nav aria-label="breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1.5rem 0 0', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/japones/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Japonés A1</Link>
            <span>/</span>
            <Link href={`/practica/${IDIOMA}/${NIVEL}/gramatica`} style={{ color: 'var(--muted)', textDecoration: 'none' }}>Gramática</Link>
            <span>/</span>
            <span style={{ color: topic.color, fontWeight: 800 }}>{topic.shortTitle}</span>
          </nav>

          {scriptLesson ? (
            <JapaneseScriptLesson scriptId={scriptLesson.id} />
          ) : (
            <JapaneseGrammarLesson topic={topic} relatedWritingExercises={relatedWritingExercises} />
          )}

          <TopicNav idioma={IDIOMA} nivel={NIVEL} slug={topic.slug} indexLabel="Gramática A1" />
        </div>
      </div>
    </>
  )
}
