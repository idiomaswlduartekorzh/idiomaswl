import type { Metadata } from 'next'
import WorkplaceWritingPreview from './WorkplaceWritingPreview'

export const metadata: Metadata = {
  title: 'Writing B2 · Casos de trabajo | WeLearn',
  description: 'Lee un correo, contrasta los hechos y responde con claridad en inglés. Preview de tres casos de writing B2.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <WorkplaceWritingPreview />
}
