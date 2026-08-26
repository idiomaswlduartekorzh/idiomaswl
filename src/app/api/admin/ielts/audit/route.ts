import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth/require-admin.server'
import { auditIeltsSubmissionBatches } from '@/lib/ielts/submission-audit.server'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

export async function GET(request: Request) {
  try {
    await requireAdmin()
    const baselineCount = Number(new URL(request.url).searchParams.get('baselineCount') ?? 25)
    if (!Number.isInteger(baselineCount) || baselineCount < 0 || baselineCount > 500) {
      return NextResponse.json({ ok: false, error: 'El corte solicitado no es válido.' }, { status: 400 })
    }
    const audit = await auditIeltsSubmissionBatches(baselineCount)
    return NextResponse.json({ ok: true, audit }, {
      headers: { 'cache-control': 'private, no-store, max-age=0' },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'No se pudo completar la auditoría.'
    const status = message === 'No tienes permisos de administrador.' ? 403 : 500
    return NextResponse.json({ ok: false, error: message }, { status })
  }
}
