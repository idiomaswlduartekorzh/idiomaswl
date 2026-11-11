import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-italiano-c2.json'

export const metadata: Metadata = {
  title: 'Scrittura C2 · Casi di lavoro | WeLearn',
  description: 'Venti situazioni professionali complesse per valutare le prove, calibrare le affermazioni e rispondere in italiano con precisione e tatto.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <WorkplaceWritingExperience language="it" level="C2" cases={cases} />
}
