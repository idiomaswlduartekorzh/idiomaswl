import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-aleman-c1.json'

export const metadata: Metadata = {
  title: 'Schreiben C1 · Fälle aus dem Berufsalltag | WeLearn',
  description: 'Zwanzig berufliche Situationen: widersprüchliche Darstellungen abwägen und auf Deutsch klar und differenziert antworten.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <WorkplaceWritingExperience language="de" level="C1" cases={cases} />
}
