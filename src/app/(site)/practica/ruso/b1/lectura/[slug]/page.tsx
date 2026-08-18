import type { Metadata } from 'next'
import { buildExerciseMetadata, ExercisePage, readingStaticParams, resolveExerciseForRoute } from '@/components/reading/ReadingPageServer'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return readingStaticParams('es').filter((p) => p.language === 'ruso' && p.level === 'b1').map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return buildExerciseMetadata(resolveExerciseForRoute('es', 'ruso', 'b1', slug), 'es')
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  return <ExercisePage locale="es" exercise={resolveExerciseForRoute('es', 'ruso', 'b1', slug)} />
}
