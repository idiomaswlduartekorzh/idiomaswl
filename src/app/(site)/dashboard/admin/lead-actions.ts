'use server'

import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/auth/require-admin.server'
import { createAdminClient } from '@/lib/supabase/admin'
import type { LeadStatus } from './lead-status'

const statuses = ['new', 'contacted', 'qualified', 'converted', 'discarded'] as const

export async function updateLeadStatus(leadId: string, status: LeadStatus): Promise<{ ok: boolean; error?: string }> {
  await requireAdmin()
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(leadId) || !statuses.includes(status)) {
    return { ok: false, error: 'Lead o estado inválido.' }
  }
  const { data, error } = await createAdminClient().from('leads')
    .update({ lead_status: status, updated_at: new Date().toISOString() })
    .eq('id', leadId)
    .select('id')
    .maybeSingle()
  if (error || !data) return { ok: false, error: 'No se pudo guardar el estado. Actualiza e intenta de nuevo.' }
  revalidatePath('/dashboard/admin')
  return { ok: true }
}
