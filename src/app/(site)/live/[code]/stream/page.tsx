import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import StreamClient from './StreamClient'
import coreano1 from '@/data/live-sets/coreano-1'
import type { LiveSet } from '@/data/live-sets/types'

const SETS: Record<string, LiveSet> = { 'coreano-1': coreano1 }

export default async function StreamPage({
  params,
}: {
  params: Promise<{ code: string }>
}) {
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

  return (
    <StreamClient
      session={session}
      set={set}
      initialParticipantCount={participants?.length ?? 0}
    />
  )
}
