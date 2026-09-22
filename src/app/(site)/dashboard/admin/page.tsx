import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import JoseDashboardServer from './JoseDashboardServer'
import { isVerifiedAdminUser } from '@/lib/config/admins'

export default async function AdminPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (isVerifiedAdminUser(user)) return <JoseDashboardServer />

  redirect('/dashboard')
}
