import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-italiano-b2.json'

const title = "Scrittura B2 · Casi di lavoro | WeLearn"
const description = "Venti situazioni professionali per leggere una email, verificare i fatti e scrivere una risposta chiara in italiano."
const canonical = '/practica/italiano/b2/escritura'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, locale: 'it_IT', type: 'website', siteName: 'WeLearn' },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}

export default function Page() {
  return <WorkplaceWritingExperience language="it" level="B2" cases={cases} />
}
