import { getIcfesSecureExam } from '@/lib/icfes/exam-registry.server';
import { createIcfesAttemptToken } from '@/lib/icfes/attempt-token.server';

export const runtime = 'nodejs';

export async function POST(request: Request): Promise<Response> {
  let body: Record<string, unknown>;
  try { body = await request.json() as Record<string, unknown>; }
  catch { return Response.json({ ok: false, error: 'Solicitud inválida.' }, { status: 400 }); }
  const examId = typeof body.examId === 'string' ? body.examId : '';
  if (!getIcfesSecureExam(examId)) return Response.json({ ok: false, error: 'El simulacro no existe.' }, { status: 404 });
  try {
    return Response.json({ ok: true, attemptToken: createIcfesAttemptToken(examId) }, {
      headers: { 'cache-control': 'private, no-store, max-age=0' },
    });
  } catch {
    return Response.json({ ok: false, error: 'La calificación segura no está configurada.' }, { status: 503 });
  }
}
