import { redirect } from 'next/navigation'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { ALL_ADMIN_EMAILS } from '@/lib/config/admins'
import AdminSessionClient from './AdminSessionClient'
import coreano1 from '@/data/live-sets/coreano-1'
import type { LiveSet } from '@/data/live-sets/types'

const SETS: Record<string, LiveSet> = { 'coreano-1': coreano1 }

export default async function AdminSessionPage({
  params,
}: {
  params: Promise<{ code: string }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  if (!ALL_ADMIN_EMAILS.includes(user.email ?? '')) redirect('/dashboard/student')

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
    .select('id, name, whatsapp, score, joined_at')
    .eq('session_id', session.id)
    .order('joined_at', { ascending: true })

  const { data: answers } = await admin
    .from('game_answers')
    .select('participant_id, question_index, answer, is_correct, answered_at')
    .eq('session_id', session.id)

  return (
    <AdminSessionClient
      session={session}
      set={set}
      initialParticipants={participants ?? []}
      initialAnswers={answers ?? []}
    />
  )
}
