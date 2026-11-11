import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-aleman-c2.json'

export const metadata: Metadata = {
  title: 'Schreiben C2 · Fälle aus dem Berufsalltag | WeLearn',
  description: 'Zwanzig anspruchsvolle berufliche Situationen: Belege einordnen, Verantwortung präzise benennen und auf Deutsch mit Takt antworten.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <WorkplaceWritingExperience language="de" level="C2" cases={cases} />
}
