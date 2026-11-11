import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-frances-c1.json'

const title = "Expression écrite C1 · Situations professionnelles | WeLearn"
const description = "Vingt situations professionnelles pour confronter des versions divergentes et rédiger une réponse précise en français."
const canonical = '/practica/frances/c1/escritura'

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
  return <WorkplaceWritingExperience language="fr" level="C1" cases={cases} />
}
