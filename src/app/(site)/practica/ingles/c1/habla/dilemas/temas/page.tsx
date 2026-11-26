import type { Metadata } from 'next'
import DilemmaCollection from '@/components/practica/speaking-dilemmas/DilemmaCollection'
import { SPEAKING_DILEMMAS } from '@/data/practica/speaking-dilemmas'
import { dilemmaCollectionPath } from '@/lib/practica/speaking-dilemma-routes'

export const metadata: Metadata = {
  title: '20 Speaking Dilemmas for English C1 | WeLearn',
  description: 'Choose a C1 speaking dilemma and practise taking a position with four vocabulary cards and three model answers.',
  alternates: { canonical: `https://www.idiomaswl.com${dilemmaCollectionPath('c1')}` },
}

export default function Page() {
  return <DilemmaCollection level="c1" dilemmas={SPEAKING_DILEMMAS} />
}
