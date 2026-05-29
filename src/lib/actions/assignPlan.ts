'use server'

import { createClient } from '@/lib/supabase/server'

export type StudentPlan = 'autodidacta' | 'preparacion' | 'intensivo'

/**
 * Admin-only: assign a plan to a student.
 * Called from the admin dashboard StudentList.
 */
export async function assignPlan(userId: string, plan: StudentPlan): Promise<void> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autenticado')

  const { data: caller } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (caller?.role !== 'admin') throw new Error('Sin permisos de administrador')

  const { error } = await supabase
    .from('profiles')
    .update({ plan })
    .eq('id', userId)

  if (error) throw new Error(error.message)
}
