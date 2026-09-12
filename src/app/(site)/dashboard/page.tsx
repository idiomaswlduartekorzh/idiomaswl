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

  // Purchases are the source of truth inside the unified student dashboard.
  // A profile preference must never grant access or split one student across accounts.
  redirect('/dashboard/student')
}
