import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-ruso-c2.json'

export const metadata: Metadata = {
  title: 'Письмо C2 · Рабочие ситуации | WeLearn',
  description: 'Двадцать сложных рабочих ситуаций: оцените границы фактов и ответьте на русском языке точно и тактично.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <WorkplaceWritingExperience language="ru" level="C2" cases={cases} />
}
