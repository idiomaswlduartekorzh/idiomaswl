import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-ruso-c2.json'

const title = "Письмо C2 · Рабочие ситуации | WeLearn"
const description = "Двадцать сложных рабочих ситуаций: оцените границы фактов и ответьте на русском языке точно и тактично."
const canonical = '/practica/ruso/c2/escritura'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, locale: 'ru_RU', type: 'website', siteName: 'WeLearn' },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}

export default function Page() {
  return <WorkplaceWritingExperience language="ru" level="C2" cases={cases} />
}
