import type { Metadata } from 'next'
import { buildExerciseMetadata, ExercisePage, readingStaticParams, resolveExerciseForRoute } from '@/components/reading/ReadingPageServer'

type Props = { params: Promise<{ language: string; level: string; slug: string }> }

export function generateStaticParams() { return readingStaticParams('es') }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { language, level, slug } = await params
  return buildExerciseMetadata(resolveExerciseForRoute('es', language, level, slug), 'es')
}

export default async function Page({ params }: Props) {
  const { language, level, slug } = await params
  return <ExercisePage locale="es" exercise={resolveExerciseForRoute('es', language, level, slug)} />
}

