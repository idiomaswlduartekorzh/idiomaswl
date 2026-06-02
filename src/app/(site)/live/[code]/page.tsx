import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import ParticipantClient from './ParticipantClient'
import coreano1 from '@/data/live-sets/coreano-1'
import nivel1 from '@/data/live-sets/coreano-nivel-1'
import nivel2 from '@/data/live-sets/coreano-nivel-2'
import nivel3 from '@/data/live-sets/coreano-nivel-3'
import type { LiveSet } from '@/data/live-sets/types'

const SETS: Record<string, LiveSet> = { 'coreano-1': coreano1, 'coreano-nivel-1': nivel1, 'coreano-nivel-2': nivel2, 'coreano-nivel-3': nivel3 }

export default async function LiveParticipantPage({
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

  return (
    <ParticipantClient
      session={session}
      set={set}
    />
  )
}
