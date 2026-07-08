'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import type { StudentPlan } from './assignPlan'

export type StudentSubject =
  | 'icfes'
  | 'fce'
  | 'ielts'
  | 'toefl'
  | 'ingles'
  | 'coreano'
  | 'italiano'
  | 'aleman'
  | 'frances'
  | 'portugues'
  | 'japones'
  | 'ruso'

export const SUBJECT_LABELS: Record<StudentSubject, string> = {
  icfes:     'ICFES Saber 11',
  fce:       'FCE / B2 Inglés',
  ielts:     'IELTS Academic',
  toefl:     'TOEFL iBT',
  ingles:    'Inglés general',
  coreano:   'Coreano',
  italiano:  'Italiano',
  aleman:    'Alemán',
  frances:   'Francés',
  portugues: 'Portugués',
  japones:   'Japonés',
  ruso:      'Ruso',
}

export async function inviteStudent(
  email: string,
  fullName: string,
  subject: StudentSubject,
  plan: StudentPlan
): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: 'No autenticado' }

  const { data: caller } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (caller?.role !== 'admin') return { ok: false, error: 'Sin permisos de administrador' }

  const admin = createAdminClient()

  const { data, error: inviteError } = await admin.auth.admin.inviteUserByEmail(email, {
    data: { full_name: fullName },
  })

  if (inviteError) return { ok: false, error: inviteError.message }

  if (data?.user) {
    await admin.from('profiles').upsert({
      id:          data.user.id,
      email,
      full_name:   fullName,
      plan,
      subject,
      role:        'student',
      enrolled_at: new Date().toISOString(),
    }, { onConflict: 'id' })
  }

  return { ok: true }
}
