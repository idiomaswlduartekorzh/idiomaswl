import type { Metadata } from 'next'
import { buildHubMetadata, HubPage, resolveHubForRoute } from '@/components/reading/ReadingPageServer'

export function generateMetadata(): Metadata {
  const r = resolveHubForRoute('es', 'coreano', 'a1')
  return buildHubMetadata('es', r.language, r.level, r.exercises)
}

export default function Page() {
  const r = resolveHubForRoute('es', 'coreano', 'a1')
  return <HubPage locale="es" {...r} />
}
