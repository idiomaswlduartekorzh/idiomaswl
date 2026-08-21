'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { requireAdmin } from '@/lib/auth/require-admin.server'
export type { StudentSubject } from './inviteStudent'
import type { StudentSubject } from './inviteStudent'

export async function assignSubject(userId: string, subject: StudentSubject): Promise<void> {
  await requireAdmin()
  const admin = createAdminClient()

  const { error } = await admin
    .from('profiles')
    .update({ subject })
    .eq('id', userId)

  if (error) throw new Error(error.message)
}
