import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import WelearnDashboardClient from './WelearnDashboardClient'

export default async function WelearnDashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, role, language, level')
    .eq('id', user.id)
    .single()

  const name =
    profile?.full_name ||
    user.user_metadata?.full_name ||
    user.email?.split('@')[0] ||
    'Estudiante'

  const language = (profile as Record<string, unknown> | null)?.language as string | undefined
  const level = (profile as Record<string, unknown> | null)?.level as string | undefined

  return (
    <WelearnDashboardClient
      name={name}
      language={language ?? 'Inglés'}
      level={level ?? 'B1'}
    />
  )
}
