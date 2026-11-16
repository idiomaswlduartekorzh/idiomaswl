import type { Metadata } from 'next'
import { buildExerciseMetadata, ExercisePage, readingStaticParams, resolveExerciseForRoute } from '@/components/reading/ReadingPageServer'

type Props = { params: Promise<{ language: string; level: string; slug: string }> }

export function generateStaticParams() { return readingStaticParams('en') }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { language, level, slug } = await params
  return buildExerciseMetadata(resolveExerciseForRoute('en', language, level, slug), 'en')
}

export default async function Page({ params }: Props) {
  const { language, level, slug } = await params
  return <ExercisePage locale="en" exercise={resolveExerciseForRoute('en', language, level, slug)} />
}

