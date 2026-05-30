import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import PerfilClient from './PerfilClient'
import type { StudentPlan } from '@/lib/actions/assignPlan'

export const metadata = {
  title: 'Mi perfil — WeLearn',
}

export default async function PerfilPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, plan, enrolled_at, created_at')
    .eq('id', user.id)
    .single()

  const name: string =
    profile?.full_name ||
    user.user_metadata?.full_name ||
    user.email?.split('@')[0] ||
    'Estudiante'

  const plan: StudentPlan = (profile?.plan as StudentPlan) ?? 'autodidacta'

  const joinedAt: string =
    profile?.enrolled_at ??
    profile?.created_at ??
    user.created_at

  return (
    <PerfilClient
      name={name}
      email={user.email ?? ''}
      plan={plan}
      joinedAt={joinedAt}
    />
  )
}
