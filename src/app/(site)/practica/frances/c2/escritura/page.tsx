import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-frances-c2.json'

export const metadata: Metadata = {
  title: 'Expression écrite C2 · Situations professionnelles | WeLearn',
  description: 'Vingt situations professionnelles pour examiner les limites d’un dossier, attribuer les faits avec précision et rédiger une réponse nuancée en français.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <WorkplaceWritingExperience language="fr" level="C2" cases={cases} />
}
