import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LearningResourceSchema, QuizSchema } from '@/components/practica/EducationSchema'
import { ADVANCED_LESSONS, getAdvancedLesson, getAdvancedTopic } from '@/data/practica/advanced-topics'
import { GUIDED_ADVANCED_LESSONS, getGuidedAdvancedLesson } from '@/data/practica/advanced-guided-topics'
import AdvancedLessonClient from './AdvancedLessonClient'
import GuidedAdvancedLessonClient from './GuidedAdvancedLessonClient'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return [...ADVANCED_LESSONS, ...GUIDED_ADVANCED_LESSONS].map((lesson) => ({ slug: lesson.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const topic = getAdvancedTopic(slug)
  if (!topic || topic.status === 'planned') return {}

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
  const guidedLesson = getGuidedAdvancedLesson(slug)
  const legacyLesson = getAdvancedLesson(slug)
  const lesson = guidedLesson ?? legacyLesson
  if (!lesson) notFound()
  const lessonClient = guidedLesson
    ? <GuidedAdvancedLessonClient lesson={guidedLesson} />
    : legacyLesson
      ? <AdvancedLessonClient lesson={legacyLesson} />
      : null

  const url = `https://www.idiomaswl.com/practica/ideas-avanzadas/${slug}`
  const keywords = [
    lesson.breadcrumbTitle,
    'critical thinking',
    'advanced English',
    'B2 English',
    'C1 English',
  ]

  return (
    <>
      <LearningResourceSchema
        name={`${lesson.title} — ciclo integrado B2–C1`}
        url={url}
        description={lesson.objective}
        inLanguage="en"
        keywords={keywords}
      />
      <QuizSchema
        name={`${lesson.title} — ejercicios de comprensión y aplicación`}
        url={url}
        description="Preguntas de escucha, lectura crítica, vocabulario académico y aplicación argumentada."
      />
      {lessonClient}
    </>
  )
}
