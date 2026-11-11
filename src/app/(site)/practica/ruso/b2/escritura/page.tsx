import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-ruso-b2.json'

export const metadata: Metadata = {
  title: 'Письмо B2 · Рабочие ситуации | WeLearn',
  description: 'Двадцать рабочих ситуаций: прочитайте письмо, проверьте факты и напишите ясный ответ на русском языке.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <WorkplaceWritingExperience language="ru" level="B2" cases={cases} />
}
