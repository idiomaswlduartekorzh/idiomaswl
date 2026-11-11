import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-frances-b2.json'

const title = "Expression écrite B2 · Situations professionnelles | WeLearn"
const description = "Vingt situations professionnelles pour lire un courriel, vérifier les faits et rédiger une réponse nuancée en français."
const canonical = '/practica/frances/b2/escritura'

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
  robots: { index: false, follow: false },
}

export default function Page() {
  return <WorkplaceWritingExperience language="fr" level="B2" cases={cases} />
}
