import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-aleman-c2.json'

const title = "Schreiben C2 · Fälle aus dem Berufsalltag | WeLearn"
const description = "Zwanzig anspruchsvolle berufliche Situationen: Belege einordnen, Verantwortung präzise benennen und auf Deutsch mit Takt antworten."
const canonical = '/practica/aleman/c2/escritura'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, locale: 'de_DE', type: 'website', siteName: 'WeLearn' },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}

export default function Page() {
  return <WorkplaceWritingExperience language="de" level="C2" cases={cases} />
}
