import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-ruso-b2.json'

const title = "Письмо B2 · Рабочие ситуации | WeLearn"
const description = "Двадцать рабочих ситуаций: прочитайте письмо, проверьте факты и напишите ясный ответ на русском языке."
const canonical = '/practica/ruso/b2/escritura'

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
  robots: { index: false, follow: false },
}

export default function Page() {
  return <WorkplaceWritingExperience language="ru" level="B2" cases={cases} />
}
