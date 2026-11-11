import type { Metadata } from 'next'
import WorkplaceWritingExperience from '@/components/practica/writing-workplace/WorkplaceWritingExperience'
import cases from '@/data/practica/writing-workplace-c1.json'

export const metadata: Metadata = {
  title: 'Writing C1 · Workplace cases | WeLearn',
  description: 'Twenty English C1 workplace writing cases about evidence, intent, scope, and tactful replies.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <WorkplaceWritingExperience level="C1" cases={cases} />
}
