import { requireAdmin } from '@/lib/auth/require-admin.server';
import { consumeExamReviewRateLimit } from '@/lib/exam-review/rate-limit.server';
import {
  ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK,
  ENGLISH_DIAGNOSTIC_WRITING_BANK,
} from '@/server/diagnostic/bank';
import { diagnosticPilotBankSha256 } from '@/server/diagnostic/pilot-analytics';
import { buildDiagnosticLiveReleaseBinding } from '@/server/diagnostic/release-binding';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const NO_STORE_HEADERS = { 'Cache-Control': 'private, no-store, max-age=0' };

function error(code: string, message: string, status: number): Response {
  return Response.json({ ok: false, code, error: message }, { status, headers: NO_STORE_HEADERS });
}

export async function GET(): Promise<Response> {
  let admin;
  try {
    admin = await requireAdmin();
  } catch {
    return error('ADMIN_REQUIRED', 'No tienes permisos de administrador.', 403);
  }
  const allowed = await consumeExamReviewRateLimit({
    namespace: 'diagnostic-release-binding-admin', identifier: admin.id, limit: 30, windowSeconds: 3600,
  });
  if (!allowed) return error('RATE_LIMITED', 'Espera antes de verificar de nuevo.', 429);

  const binding = buildDiagnosticLiveReleaseBinding({
    env: process.env,
    currentBankSha256: diagnosticPilotBankSha256({
      bank: ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK,
      writingBank: ENGLISH_DIAGNOSTIC_WRITING_BANK,
    }),
  });
  return Response.json({ ok: true, binding }, { status: 200, headers: NO_STORE_HEADERS });
}
