import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-aleman-b2.json'

export const metadata: Metadata = {
  title: 'Schreiben B2 · Fälle aus dem Berufsalltag | WeLearn',
  description: 'Zwanzig berufliche Situationen: E-Mails lesen, Fakten prüfen und auf Deutsch eine klare, sachliche Antwort verfassen.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <WorkplaceWritingExperience language="de" level="B2" cases={cases} />
}
