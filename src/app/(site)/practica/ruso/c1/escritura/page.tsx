import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-ruso-c1.json'

export const metadata: Metadata = {
  title: 'Письмо C1 · Рабочие ситуации | WeLearn',
  description: 'Двадцать рабочих ситуаций: сопоставьте разные версии событий и напишите точный, взвешенный ответ на русском языке.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <WorkplaceWritingExperience language="ru" level="C1" cases={cases} />
}
