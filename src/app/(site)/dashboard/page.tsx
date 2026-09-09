import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { isAdminEmail } from '@/lib/config/admins'

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Email-based admin check is the source of truth (no Supabase profile needed)
  if (isAdminEmail(user.email)) {
    redirect('/dashboard/admin')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, student_path')
    .eq('id', user.id)
    .single()

  const role = profile?.role as string | undefined

  if (profile?.student_path === 'welearn' || role === 'welearn_student') {
    redirect('/dashboard/welearn')
  } else {
    redirect('/dashboard/student')
  }
}
