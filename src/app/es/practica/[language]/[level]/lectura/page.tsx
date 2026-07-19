import type { Metadata } from 'next'
import { buildHubMetadata, HubPage, readingHubStaticParams, resolveHubForRoute } from '@/components/reading/ReadingPageServer'

type Props = { params: Promise<{ language: string; level: string }> }

export function generateStaticParams() { return readingHubStaticParams('es') }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { language, level } = await params
  const resolved = resolveHubForRoute('es', language, level)
  return buildHubMetadata('es', resolved.language, resolved.level, resolved.exercises)
}

export default async function Page({ params }: Props) {
  const { language, level } = await params
  const resolved = resolveHubForRoute('es', language, level)
  return <HubPage locale="es" {...resolved} />
}

