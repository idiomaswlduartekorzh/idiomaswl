import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { IcfesStudentFlow } from '@/components/icfes/IcfesStudentFlow'

/**
 * ICFES student entry point.
 *
 * Renders the flow orchestrator, which reads the student's progress from
 * Supabase (icfes_onboarding / icfes_diagnostic_results) and routes them to
 * the right stage: onboarding wizard → diagnostic test → learning dashboard.
 */
export default async function IcfesDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id)
    .single()

  const name =
    profile?.full_name ||
    user.user_metadata?.full_name ||
    user.email?.split('@')[0] ||
    'Estudiante'

  return <IcfesStudentFlow userId={user.id} userName={name} />
}
