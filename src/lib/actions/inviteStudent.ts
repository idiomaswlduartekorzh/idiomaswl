'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { requireAdmin } from '@/lib/auth/require-admin.server'
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
  try {
    await requireAdmin()
  } catch {
    return { ok: false, error: 'Sin permisos de administrador' }
  }

  const normalizedEmail = email.trim().toLowerCase()
  const normalizedName = fullName.trim()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail) || !normalizedName) {
    return { ok: false, error: 'Email y nombre son requeridos' }
  }

  const admin = createAdminClient()

  const { data, error: inviteError } = await admin.auth.admin.inviteUserByEmail(normalizedEmail, {
    data: { full_name: normalizedName },
  })

  if (inviteError) return { ok: false, error: inviteError.message }

  if (data?.user) {
    const { error: profileError } = await admin.from('profiles').upsert({
      id:          data.user.id,
      email:       normalizedEmail,
      full_name:   normalizedName,
      name:        normalizedName,
      plan,
      subject,
      role:        'user',
      enrolled_at: new Date().toISOString(),
    }, { onConflict: 'id' })

    if (profileError) return { ok: false, error: profileError.message }
  }

  return { ok: true }
}
