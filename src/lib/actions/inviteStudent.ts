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
