import { redirect } from 'next/navigation'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ALL_ADMIN_EMAILS } from '@/lib/config/admins'
import AdminLiveClient from './AdminLiveClient'
import coreano1 from '@/data/live-sets/coreano-1'
import type { LiveSet } from '@/data/live-sets/types'

const SETS: Record<string, LiveSet> = {
  'coreano-1': coreano1,
}

export default async function AdminLivePage({
  params,
}: {
  params: Promise<{ setId: string }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  if (!ALL_ADMIN_EMAILS.includes(user.email ?? '')) redirect('/dashboard/student')

  const { setId } = await params
  const set = SETS[setId]
  if (!set) notFound()

  return <AdminLiveClient set={set} />
}
