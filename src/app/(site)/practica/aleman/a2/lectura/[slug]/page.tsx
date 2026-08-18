import type { Metadata } from 'next'
import { buildExerciseMetadata, ExercisePage, readingStaticParams, resolveExerciseForRoute } from '@/components/reading/ReadingPageServer'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return readingStaticParams('es').filter((p) => p.language === 'aleman' && p.level === 'a2').map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return buildExerciseMetadata(resolveExerciseForRoute('es', 'aleman', 'a2', slug), 'es')
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  return <ExercisePage locale="es" exercise={resolveExerciseForRoute('es', 'aleman', 'a2', slug)} />
}
