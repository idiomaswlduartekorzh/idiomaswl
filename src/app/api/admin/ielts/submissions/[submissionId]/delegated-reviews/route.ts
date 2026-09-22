import { requireAdmin } from '@/lib/auth/require-admin.server'
import { isIeltsDelegatedReviewTask } from '@/lib/ielts/delegated-review'
import { IELTS_SUBMISSION_ID_PATTERN } from '@/lib/ielts/submission-token.server'
import { createAdminClient } from '@/lib/supabase/admin'

export const runtime = 'nodejs'

const PRIVATE_HEADERS = {
  'Cache-Control': 'private, no-store, max-age=0',
  'Vary': 'Cookie',
  'X-Content-Type-Options': 'nosniff',
}

function fail(status: number, error: string): Response {
  return Response.json({ error }, { status, headers: PRIVATE_HEADERS })
}

export async function GET(_request: Request, context: { params: Promise<{ submissionId: string }> }): Promise<Response> {
  try {
    await requireAdmin()
  } catch {
    return fail(403, 'No tienes permiso para ver este historial.')
  }

  const { submissionId } = await context.params
  if (!IELTS_SUBMISSION_ID_PATTERN.test(submissionId)) return fail(404, 'La entrega no es válida.')

  try {
    const { data, error } = await createAdminClient()
      .from('ielts_delegated_review_invites')
      .select('id, task_type, call_code, created_at, expires_at, used_at, revoked_at, evaluator_name, evaluator_model')
      .eq('submission_id', submissionId)
      .order('created_at', { ascending: false })
      .limit(20)
    if (error) return fail(503, 'No pudimos cargar el historial de llamados.')

    const items = (data ?? []).flatMap(item => isIeltsDelegatedReviewTask(item.task_type) ? [{
      id: item.id,
      task: item.task_type,
      callCode: item.call_code,
      createdAt: item.created_at,
      expiresAt: item.expires_at,
      usedAt: item.used_at,
      revokedAt: item.revoked_at,
      evaluatorName: item.evaluator_name,
      evaluatorModel: item.evaluator_model,
      status: item.used_at
        ? 'used'
        : item.revoked_at
          ? 'revoked'
          : Date.parse(item.expires_at) <= Date.now()
            ? 'expired'
            : 'active',
    }] : [])

    return Response.json({ items }, { headers: PRIVATE_HEADERS })
  } catch {
    return fail(503, 'No pudimos cargar el historial de llamados.')
  }
}
