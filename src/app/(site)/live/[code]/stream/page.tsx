import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import StreamClient from './StreamClient'
import coreano1 from '@/data/live-sets/coreano-1'
import nivel1 from '@/data/live-sets/coreano-nivel-1'
import nivel2 from '@/data/live-sets/coreano-nivel-2'
import nivel3 from '@/data/live-sets/coreano-nivel-3'
import type { LiveSet } from '@/data/live-sets/types'

const SETS: Record<string, LiveSet> = { 'coreano-1': coreano1, 'coreano-nivel-1': nivel1, 'coreano-nivel-2': nivel2, 'coreano-nivel-3': nivel3 }

export default async function StreamPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params
  const admin = createAdminClient()

  const { data: session } = await admin
    .from('game_sessions')
    .select('id, code, set_id, status, current_question_index')
    .eq('code', code.toUpperCase())
    .single()

  if (!session) notFound()
  const set = SETS[session.set_id]
  if (!set) notFound()

  const { data: participants } = await admin
    .from('game_participants')
    .select('id')
    .eq('session_id', session.id)

  // FIX #3: pre-fetch votes for the current question so stream doesn't start at 0% on reload
  const initialVotes = { A: 0, B: 0, C: 0, D: 0 }
  if (session.status === 'question' || session.status === 'locked' || session.status === 'reveal') {
    const { data: answers } = await admin
      .from('game_answers')
      .select('answer')
      .eq('session_id', session.id)
      .eq('question_index', session.current_question_index)

    answers?.forEach(a => {
      const k = a.answer as 'A' | 'B' | 'C' | 'D'
      if (initialVotes[k] !== undefined) initialVotes[k]++
    })
  }

  return (
    <StreamClient
      session={session}
      set={set}
      initialParticipantCount={participants?.length ?? 0}
      initialVotes={initialVotes}
    />
  )
}
