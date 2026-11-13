import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { isVerifiedAdminUser } from '@/lib/config/admins'
import ClassBoard from './ClassBoard'

export const metadata: Metadata = {
  title: 'Tablero de clase · WeLearn',
  robots: { index: false, follow: false },
}

export default async function ClassBoardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!isVerifiedAdminUser(user)) redirect('/dashboard')

  return <ClassBoard userId={user!.id} />
}
