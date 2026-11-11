import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-frances-c2.json'

const title = "Expression écrite C2 · Situations professionnelles | WeLearn"
const description = "Vingt situations professionnelles pour examiner les limites d’un dossier, attribuer les faits avec précision et rédiger une réponse nuancée en français."
const canonical = '/practica/frances/c2/escritura'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, locale: 'fr_FR', type: 'website', siteName: 'WeLearn' },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}

export default function Page() {
  return <WorkplaceWritingExperience language="fr" level="C2" cases={cases} />
}
