import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-italiano-b2.json'

export const metadata: Metadata = {
  title: 'Scrittura B2 · Casi di lavoro | WeLearn',
  description: 'Venti situazioni professionali per leggere una email, verificare i fatti e scrivere una risposta chiara in italiano.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <WorkplaceWritingExperience language="it" level="B2" cases={cases} />
}
