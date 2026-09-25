import 'server-only';

import { consumeExamReviewRateLimit } from '@/lib/exam-review/rate-limit.server';
import { createClient } from '@/lib/supabase/server';
import { deleteDiagnosticUserData } from './repository.server';
import { logDiagnosticInternalFailure } from './observability';

const NO_STORE_HEADERS = { 'Cache-Control': 'private, no-store, max-age=0' };
const CONFIRMATION = 'DELETE_DIAGNOSTIC_DATA';

function error(code: string, message: string, status: number): Response {
  return Response.json({ ok: false, code, error: message }, { status, headers: NO_STORE_HEADERS });
}

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  return Boolean(origin && origin === new URL(request.url).origin);
}

export async function handleDiagnosticDataDeletion(request: Request): Promise<Response> {
  if (!sameOrigin(request)) return error('INVALID_ORIGIN', 'Solicitud no válida.', 403);
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return error('INVALID_CONTENT_TYPE', 'La solicitud debe usar JSON.', 415);
  }
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (Number.isFinite(contentLength) && contentLength > 512) {
    return error('PAYLOAD_TOO_LARGE', 'La solicitud es demasiado grande.', 413);
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return error('INVALID_JSON', 'La solicitud no contiene JSON válido.', 400);
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)
    || (body as { confirmation?: unknown }).confirmation !== CONFIRMATION
    || Object.keys(body).some(key => key !== 'confirmation')) {
    return error('CONFIRMATION_REQUIRED', 'Confirma el borrado de tus datos diagnósticos.', 400);
  }

  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return error('AUTH_REQUIRED', 'Inicia sesión para borrar tus datos.', 401);
  const allowed = await consumeExamReviewRateLimit({
    namespace: 'diagnostic-data-deletion-user', identifier: user.id, limit: 2, windowSeconds: 86_400,
  });
  if (!allowed) return error('RATE_LIMITED', 'Espera antes de repetir esta solicitud.', 429);

  try {
    const receipt = await deleteDiagnosticUserData(user.id);
    return Response.json({ ok: true, receipt }, { status: 200, headers: NO_STORE_HEADERS });
  } catch {
    logDiagnosticInternalFailure({ component: 'data-deletion', reason: 'data-deletion-failed' });
    return error('DELETION_UNAVAILABLE', 'No pudimos borrar los datos diagnósticos.', 503);
  }
}
