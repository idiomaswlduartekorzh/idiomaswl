'use server'

import { createClient } from '@/lib/supabase/server'
export type { StudentSubject } from './inviteStudent'
import type { StudentSubject } from './inviteStudent'

export async function assignSubject(userId: string, subject: StudentSubject): Promise<void> {
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
    .update({ subject })
    .eq('id', userId)

  if (error) throw new Error(error.message)
}
