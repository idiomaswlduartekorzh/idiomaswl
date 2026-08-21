'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { requireAdmin } from '@/lib/auth/require-admin.server'

export type StudentPlan = 'autodidacta' | 'preparacion' | 'intensivo'

/**
 * Admin-only: assign a plan to a student.
 * Called from the admin dashboard StudentList.
 */
export async function assignPlan(userId: string, plan: StudentPlan): Promise<void> {
  await requireAdmin()
  const admin = createAdminClient()

  const { error } = await admin
    .from('profiles')
    .update({ plan })
    .eq('id', userId)

  if (error) throw new Error(error.message)
}
