import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-italiano-c1.json'

const title = "Scrittura C1 · Casi di lavoro | WeLearn"
const description = "Venti situazioni professionali per valutare versioni divergenti e scrivere in italiano una risposta precisa ed equilibrata."
const canonical = '/practica/italiano/c1/escritura'

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
  return <WorkplaceWritingExperience language="it" level="C1" cases={cases} />
}
