import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { buildHubMetadata, readingHubStaticParams, resolveHubForRoute } from '@/components/reading/ReadingPageServer'
import { readingHubPath } from '@/lib/reading/routes'

type Props = { params: Promise<{ idioma: string; nivel: string }> }

export function generateStaticParams() {
  return readingHubStaticParams('es').filter(({ level }) => ['b2', 'c1', 'c2'].includes(level))
    .map(({ language, level }) => ({ idioma: language, nivel: level }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { idioma, nivel } = await params
  const resolved = resolveHubForRoute('es', idioma, nivel)
  return buildHubMetadata('es', resolved.language, resolved.level, resolved.exercises)
}

export default async function Page({ params }: Props) {
  const { idioma, nivel } = await params
  const resolved = resolveHubForRoute('es', idioma, nivel)
  redirect(readingHubPath('en', resolved.language, resolved.level))
}
