import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-aleman-c1.json'

const title = "Schreiben C1 · Fälle aus dem Berufsalltag | WeLearn"
const description = "Zwanzig berufliche Situationen: widersprüchliche Darstellungen abwägen und auf Deutsch klar und differenziert antworten."
const canonical = '/practica/aleman/c1/escritura'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, locale: 'de_DE', type: 'website', siteName: 'WeLearn' },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}

export default function Page() {
  return <WorkplaceWritingExperience language="de" level="C1" cases={cases} />
}
