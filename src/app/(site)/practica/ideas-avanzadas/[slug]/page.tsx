import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LearningResourceSchema, QuizSchema } from '@/components/practica/EducationSchema'
import { ADVANCED_LESSONS, getAdvancedLesson, getAdvancedTopic } from '@/data/practica/advanced-topics'
import { GUIDED_ADVANCED_LESSONS, getGuidedAdvancedLesson } from '@/data/practica/advanced-guided-topics'
import AdvancedLessonClient from './AdvancedLessonClient'
import GuidedAdvancedLessonClient from './GuidedAdvancedLessonClient'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return [...new Set([...ADVANCED_LESSONS, ...GUIDED_ADVANCED_LESSONS].map((lesson) => lesson.slug))]
    .map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const topic = getAdvancedTopic(slug)
  if (!topic || topic.status === 'planned') return {}

  return {
    title: `${topic.title} in English B2–C1 | Integrated cycle`,
    description: `${topic.premise} Practise listening, long-form reading, vocabulary, analysis and production in advanced English.`,
    alternates: { canonical: `https://www.idiomaswl.com/practica/ideas-avanzadas/${topic.slug}` },
    openGraph: {
      title: `${topic.titleEn} — integrated practice`,
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
        name={`${lesson.title} — integrated B2–C1 cycle`}
        url={url}
        description={lesson.objective}
        inLanguage="en"
        keywords={keywords}
      />
      <QuizSchema
        name={`${lesson.title} — comprehension and application practice`}
        url={url}
        description="Listening questions, critical reading, academic vocabulary and evidence-based application."
      />
      {lessonClient}
    </>
  )
}
