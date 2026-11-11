import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-frances-c1.json'

export const metadata: Metadata = {
  title: 'Expression écrite C1 · Situations professionnelles | WeLearn',
  description: 'Vingt situations professionnelles pour confronter des versions divergentes et rédiger une réponse précise en français.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <WorkplaceWritingExperience language="fr" level="C1" cases={cases} />
}
