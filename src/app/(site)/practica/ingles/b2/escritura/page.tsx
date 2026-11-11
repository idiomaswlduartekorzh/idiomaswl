import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-b2.json'

export const metadata: Metadata = {
  title: 'Writing B2 · Workplace cases | WeLearn',
  description: 'Twenty English B2 workplace writing cases: read an email, check the facts, and write a clear reply.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <WorkplaceWritingExperience level="B2" cases={cases} />
}
