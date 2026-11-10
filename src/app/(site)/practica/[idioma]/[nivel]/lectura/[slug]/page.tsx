import type { Metadata } from 'next'
import { buildExerciseMetadata, ExercisePage, readingStaticParams, resolveExerciseForRoute } from '@/components/reading/ReadingPageServer'

type Props = { params: Promise<{ idioma: string; nivel: string; slug: string }> }

export function generateStaticParams() {
  return readingStaticParams('es').filter(({ level }) => ['b2', 'c1', 'c2'].includes(level))
    .map(({ language, level, slug }) => ({ idioma: language, nivel: level, slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { idioma, nivel, slug } = await params
  return buildExerciseMetadata(resolveExerciseForRoute('es', idioma, nivel, slug), 'es')
}

export default async function Page({ params }: Props) {
  const { idioma, nivel, slug } = await params
  return <ExercisePage locale="es" exercise={resolveExerciseForRoute('es', idioma, nivel, slug)} />
}
