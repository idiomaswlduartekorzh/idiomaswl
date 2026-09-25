import { requireAdmin } from '@/lib/auth/require-admin.server';
import criteria from '../../../../../../config/diagnostic/pilot-publication-criteria.json' with { type: 'json' };
import measurementEvidence from '../../../../../../config/diagnostic/pilot-measurement-evidence.json' with { type: 'json' };
import { consumeExamReviewRateLimit } from '@/lib/exam-review/rate-limit.server';
import {
  ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK,
  ENGLISH_DIAGNOSTIC_WRITING_BANK,
} from '@/server/diagnostic/bank';
import {
  buildDiagnosticPilotReport,
  type DiagnosticPilotMeasurementEvidence,
  type DiagnosticPilotCriteria,
} from '@/server/diagnostic/pilot-analytics';
import { loadDiagnosticPilotDataset } from '@/server/diagnostic/repository.server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const NO_STORE_HEADERS = { 'Cache-Control': 'private, no-store, max-age=0' };

function healthProjection(report: ReturnType<typeof buildDiagnosticPilotReport>) {
  const counts = new Map<string, number>();
  for (const item of report.itemMetrics) {
    for (const flag of item.flags) counts.set(flag, (counts.get(flag) ?? 0) + 1);
  }
  return {
    reportVersion: report.reportVersion,
    generatedAt: report.generatedAt,
    decision: report.decision,
    criteria: report.criteria,
    bankSnapshot: {
      sha256: report.bankSnapshot.sha256,
      objectiveItems: report.bankSnapshot.objectiveItems,
      writingPrompts: report.bankSnapshot.writingPrompts,
    },
    gates: report.gates,
    attempts: {
      started: report.attempts.started,
      completed: report.attempts.completed,
      completionRate: report.attempts.completionRate,
      medianCompletionMs: report.attempts.medianCompletionMs,
      p90CompletionMs: report.attempts.p90CompletionMs,
      statusCounts: report.attempts.statusCounts,
      completedRouteCounts: report.attempts.completedRouteCounts,
    },
    flagCounts: [...counts.entries()].sort(([left], [right]) => left.localeCompare(right))
      .map(([flag, count]) => ({ flag, count })),
    writingAgreement: report.writingAgreement,
    independentReference: report.independentReference,
    measurementEvidence: report.measurementEvidence,
    warnings: report.warnings,
  } as const;
}

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
      writingBank: ENGLISH_DIAGNOSTIC_WRITING_BANK,
      criteria: criteria as DiagnosticPilotCriteria,
      measurementEvidence: measurementEvidence as DiagnosticPilotMeasurementEvidence,
      generatedAt: new Date().toISOString(),
    });
    const responseReport = url.searchParams.get('scope') === 'health' ? healthProjection(report) : report;
    return Response.json({ ok: true, report: responseReport }, { status: 200, headers: NO_STORE_HEADERS });
  } catch (cause) {
    console.error('[diagnostic] Pilot report failed:', cause instanceof Error ? cause.message : 'unknown');
    return error('REPORT_UNAVAILABLE', 'No pudimos generar el informe del piloto.', 503);
  }
}
