import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, permanentRedirect } from 'next/navigation'
import { grammarVisualPath, grammarVisualUrl } from '@/lib/grammar-visual'
import ClockLesson from '@/components/grammar/ClockLesson'
import styles from '@/components/grammar/ClockHub.module.css'
import { clockHub, clockLanguageKeys, clockLanguages, clockLessonUrl, clockMaterials, type ClockLanguage } from '@/data/clock-lessons/catalog'
import { getClockLesson } from '@/data/clock-lessons/lessons'

type Props = { params: Promise<{ idioma: string }> }

export function generateStaticParams() {
  return clockLanguageKeys.map(idioma => ({ idioma }))
}

function languageKey(value: string): ClockLanguage {
  if (!Object.hasOwn(clockLanguages, value)) notFound()
  return value as ClockLanguage
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const language = languageKey((await params).idioma)
  const name = clockLanguages[language].name.toLowerCase()
  return {
    title: `La hora en ${name} A1 con relojes y ejercicios | WeLearn`,
    description: `Aprende a preguntar y decir la hora en ${name} con ejemplos bilingües, situaciones cotidianas y ejercicios de lectura de relojes.`,
    alternates: { canonical: `https://www.idiomaswl.com${clockLessonUrl(language)}` },
  }
}

export default async function ClockPage({ params }: Props) {
  const language = languageKey((await params).idioma)
  if (language === 'aleman') permanentRedirect(clockLessonUrl(language))
  const { topic, reference } = getClockLesson(language)
  const { lang, name } = clockLanguages[language]
  const resource = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: topic.title,
    inLanguage: ['es', lang],
    educationalLevel: 'A1',
    learningResourceType: 'Lección interactiva',
    description: topic.lead,
    image: grammarVisualUrl(language, 'a1', topic.slug),
    url: `https://www.idiomaswl.com${clockLessonUrl(language)}`,
  }

  return <div className="gram-page"><div className="wrap">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(resource) }} />
    <nav aria-label="Ruta de navegación" className={styles.crumbs}>
      <Link href="/practica">Práctica</Link><span>/</span>
      <Link href={`/practica/${language}/a1/gramatica`}>{name} A1</Link><span>/</span>
      <Link href={clockHub}>La hora</Link>
    </nav>
    <ClockLesson
      topic={topic}
      language={language}
      clocks={topic.visual.clocks!}
      resource={clockMaterials(language)}
      visualUrl={grammarVisualPath(language, 'a1', topic.slug)}
      reference={reference}
    />
  </div></div>
}
