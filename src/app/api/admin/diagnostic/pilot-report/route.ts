import { requireAdmin } from '@/lib/auth/require-admin.server';
import criteria from '../../../../../../config/diagnostic/pilot-publication-criteria.json' with { type: 'json' };
import { consumeExamReviewRateLimit } from '@/lib/exam-review/rate-limit.server';
import { ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK } from '@/server/diagnostic/bank';
import {
  buildDiagnosticPilotReport,
  type DiagnosticPilotCriteria,
} from '@/server/diagnostic/pilot-analytics';
import { loadDiagnosticPilotDataset } from '@/server/diagnostic/repository.server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const NO_STORE_HEADERS = { 'Cache-Control': 'private, no-store, max-age=0' };

function error(code: string, message: string, status: number): Response {
  return Response.json({ ok: false, code, error: message }, { status, headers: NO_STORE_HEADERS });
}

export async function GET(request: Request): Promise<Response> {
  let admin;
  try {
    admin = await requireAdmin();
  } catch {
    return error('ADMIN_REQUIRED', 'No tienes permisos de administrador.', 403);
  }
  const allowed = await consumeExamReviewRateLimit({
    namespace: 'diagnostic-pilot-report-admin', identifier: admin.id, limit: 12, windowSeconds: 3600,
  });
  if (!allowed) return error('RATE_LIMITED', 'Espera antes de generar otro informe.', 429);

  const url = new URL(request.url);
  const sinceValue = url.searchParams.get('since');
  const since = sinceValue ? new Date(sinceValue) : new Date(Date.now() - 180 * 24 * 60 * 60 * 1_000);
  if (Number.isNaN(since.getTime()) || since.getTime() > Date.now() || since.getTime() < Date.now() - 366 * 24 * 60 * 60 * 1_000) {
    return error('INVALID_WINDOW', 'El rango del piloto no es válido.', 400);
  }
  try {
    const dataset = await loadDiagnosticPilotDataset({ language: 'en', since });
    const report = buildDiagnosticPilotReport({
      ...dataset,
      bank: ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK,
      criteria: criteria as DiagnosticPilotCriteria,
      generatedAt: new Date().toISOString(),
    });
    return Response.json({ ok: true, report }, { status: 200, headers: NO_STORE_HEADERS });
  } catch (cause) {
    console.error('[diagnostic] Pilot report failed:', cause instanceof Error ? cause.message : 'unknown');
    return error('REPORT_UNAVAILABLE', 'No pudimos generar el informe del piloto.', 503);
  }
}
