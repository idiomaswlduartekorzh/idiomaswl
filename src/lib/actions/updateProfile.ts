'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData: FormData): Promise<{ ok: boolean; error?: string }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { ok: false, error: 'No autenticado' }

  const fullName = (formData.get('full_name') as string ?? '').trim()
  if (!fullName || fullName.length < 2) {
    return { ok: false, error: 'El nombre debe tener al menos 2 caracteres.' }
  }
  if (fullName.length > 80) {
    return { ok: false, error: 'El nombre no puede superar 80 caracteres.' }
  }

  const { error } = await supabase
    .from('profiles')
    .update({ full_name: fullName })
    .eq('id', user.id)

  if (error) return { ok: false, error: 'Error al guardar. Inténtalo de nuevo.' }

  revalidatePath('/dashboard/student')
  revalidatePath('/dashboard/student/perfil')
  return { ok: true }
}
