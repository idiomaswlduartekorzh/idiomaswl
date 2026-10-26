import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import PerfilClient from './PerfilClient'
import type { StudentPlan } from '@/lib/actions/assignPlan'

export const metadata = {
  title: 'Mi perfil',
}

export default async function PerfilPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, phone, city, avatar_url, plan, enrolled_at, created_at')
    .eq('id', user.id)
    .single()

  const { data: preferences } = await supabase
    .from('student_notification_preferences')
    .select('study_reminders_enabled, study_reminder_frequency, study_reminder_weekday, correction_emails_enabled')
    .eq('student_id', user.id)
    .maybeSingle()

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
      phone={profile?.phone ?? ''}
      city={profile?.city ?? ''}
      avatarUrl={profile?.avatar_url ?? null}
      preferences={{
        reminders: preferences?.study_reminders_enabled ?? false,
        frequency: preferences?.study_reminder_frequency === 'daily' ? 'daily' : 'weekly',
        weekday: preferences?.study_reminder_weekday ?? 1,
        corrections: preferences?.correction_emails_enabled ?? true,
      }}
      plan={plan}
      joinedAt={joinedAt}
    />
  )
}
