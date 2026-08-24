import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LearningResourceSchema, QuizSchema } from '@/components/practica/EducationSchema'
import { ADVANCED_TOPICS, FRAMING_LESSON, getAdvancedTopic } from '@/data/practica/advanced-topics'
import AdvancedLessonClient from './AdvancedLessonClient'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return ADVANCED_TOPICS.filter((topic) => topic.status === 'available').map((topic) => ({ slug: topic.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const topic = getAdvancedTopic(slug)
  if (!topic || topic.status !== 'available') return {}

  return {
    title: `${topic.title} en inglés B2–C1 | Ciclo integrado`,
    description: `${topic.premise} Practica escucha, lectura larga, vocabulario, análisis y producción en inglés avanzado.`,
    alternates: { canonical: `https://www.idiomaswl.com/practica/ideas-avanzadas/${topic.slug}` },
    openGraph: {
      title: `${topic.titleEn} — práctica integrada`,
      description: topic.premise,
      url: `https://www.idiomaswl.com/practica/ideas-avanzadas/${topic.slug}`,
    },
  }
}

export default async function AdvancedTopicPage({ params }: Props) {
  const { slug } = await params
  if (slug !== FRAMING_LESSON.slug) notFound()

  const url = `https://www.idiomaswl.com/practica/ideas-avanzadas/${slug}`

  return (
    <>
      <LearningResourceSchema
        name="The framing effect — ciclo integrado B2–C1"
        url={url}
        description={FRAMING_LESSON.objective}
        inLanguage="en"
        keywords={['framing effect', 'critical thinking', 'advanced English', 'B2 English', 'C1 English']}
      />
      <QuizSchema
        name="The framing effect — ejercicios de comprensión y aplicación"
        url={url}
        description="Preguntas de escucha, lectura crítica, equivalencia numérica y encuadre lingüístico."
      />
      <AdvancedLessonClient />
    </>
  )
}

