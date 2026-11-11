import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-ruso-c1.json'

const title = "Письмо C1 · Рабочие ситуации | WeLearn"
const description = "Двадцать рабочих ситуаций: сопоставьте разные версии событий и напишите точный, взвешенный ответ на русском языке."
const canonical = '/practica/ruso/c1/escritura'

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
  return <WorkplaceWritingExperience language="ru" level="C1" cases={cases} />
}
