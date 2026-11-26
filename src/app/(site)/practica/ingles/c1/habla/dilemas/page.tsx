import type { Metadata } from 'next'
import { DILEMMA_BASE_PATH } from '@/lib/practica/speaking-dilemma-routes'
import { PILOT_DILEMMA } from '@/data/practica/speaking-dilemmas/pilot'
import DilemmaExercise from '@/components/practica/speaking-dilemmas/DilemmaExercise'

export const metadata: Metadata = {
  title: 'Speaking Dilemmas C1 — What should count as merit? | WeLearn',
  description: 'Weigh academic performance against final-semester placement performance with C1 vocabulary, short examples and three model answers.',
  alternates: { canonical: `https://www.idiomaswl.com${DILEMMA_BASE_PATH}` },
}

export default function SpeakingDilemmaPage() {
  return <DilemmaExercise level="c1" dilemma={PILOT_DILEMMA} />
}
