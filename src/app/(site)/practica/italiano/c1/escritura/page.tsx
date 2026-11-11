import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-italiano-c1.json'

export const metadata: Metadata = {
  title: 'Scrittura C1 · Casi di lavoro | WeLearn',
  description: 'Venti situazioni professionali per valutare versioni divergenti e scrivere in italiano una risposta precisa ed equilibrata.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <WorkplaceWritingExperience language="it" level="C1" cases={cases} />
}
