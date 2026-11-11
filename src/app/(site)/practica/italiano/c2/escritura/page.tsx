import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-italiano-c2.json'

const title = "Scrittura C2 · Casi di lavoro | WeLearn"
const description = "Venti situazioni professionali complesse per valutare le prove, calibrare le affermazioni e rispondere in italiano con precisione e tatto."
const canonical = '/practica/italiano/c2/escritura'

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
  return <WorkplaceWritingExperience language="it" level="C2" cases={cases} />
}
