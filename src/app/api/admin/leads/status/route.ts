import { requireAdmin } from '@/lib/auth/require-admin.server'
import { createAdminClient } from '@/lib/supabase/admin'

export const runtime = 'nodejs'

const statuses = ['new', 'contacted', 'qualified', 'converted', 'discarded'] as const
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const noStore = { 'Cache-Control': 'private, no-store, max-age=0' }

function errorResponse(error: string, status: number): Response {
  return Response.json({ ok: false, error }, { status, headers: noStore })
}

export async function PATCH(request: Request): Promise<Response> {
  if (request.headers.get('origin') !== new URL(request.url).origin) {
    return errorResponse('Solicitud no válida.', 403)
  }
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return errorResponse('La solicitud debe usar JSON.', 415)
  }
  const contentLength = Number(request.headers.get('content-length') ?? 0)
  if (Number.isFinite(contentLength) && contentLength > 1024) {
    return errorResponse('La solicitud es demasiado grande.', 413)
  }

  let body: unknown
  try { body = await request.json() } catch { return errorResponse('Datos inválidos.', 400) }
  if (!body || typeof body !== 'object') return errorResponse('Datos inválidos.', 400)

  const { leadId, status } = body as Record<string, unknown>
  if (typeof leadId !== 'string' || !uuid.test(leadId) || !statuses.includes(status as typeof statuses[number])) {
    return errorResponse('Lead o estado inválido.', 400)
  }

  try { await requireAdmin() } catch { return errorResponse('No tienes permisos de administrador.', 403) }

  try {
    const { data, error } = await createAdminClient().from('leads')
      .update({ lead_status: status, updated_at: new Date().toISOString() })
      .eq('id', leadId)
      .select('id')
      .maybeSingle()
    if (error) return errorResponse('No se pudo guardar el estado. Intenta de nuevo.', 500)
    if (!data) return errorResponse('Lead no encontrado.', 404)
    return Response.json({ ok: true }, { headers: noStore })
  } catch {
    return errorResponse('No se pudo guardar el estado. Intenta de nuevo.', 500)
  }
}
