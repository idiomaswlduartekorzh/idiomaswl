import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-aleman-b2.json'

const title = "Schreiben B2 · Fälle aus dem Berufsalltag | WeLearn"
const description = "Zwanzig berufliche Situationen: E-Mails lesen, Fakten prüfen und auf Deutsch eine klare, sachliche Antwort verfassen."
const canonical = '/practica/aleman/b2/escritura'

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
  robots: { index: false, follow: false },
}

export default function Page() {
  return <WorkplaceWritingExperience language="de" level="B2" cases={cases} />
}
