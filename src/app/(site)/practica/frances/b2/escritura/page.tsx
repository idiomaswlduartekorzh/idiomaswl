import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-frances-b2.json'

export const metadata: Metadata = {
  title: 'Expression écrite B2 · Situations professionnelles | WeLearn',
  description: 'Vingt situations professionnelles pour lire un courriel, vérifier les faits et rédiger une réponse nuancée en français.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <WorkplaceWritingExperience language="fr" level="B2" cases={cases} />
}
