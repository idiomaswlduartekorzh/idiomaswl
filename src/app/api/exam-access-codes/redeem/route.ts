import { createHash } from 'node:crypto';
import { consumeExamReviewRateLimit } from '@/lib/exam-review/rate-limit.server';
import { redeemExamAccessCode } from '@/lib/exam-access-codes/server';

export const runtime = 'nodejs';

function clientIdentifier(request: Request): string {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';
  const agent = request.headers.get('user-agent')?.slice(0, 160) || 'unknown';
  return createHash('sha256').update(`${ip}\0${agent}`).digest('hex');
}

export async function POST(request: Request): Promise<Response> {
  const permitted = await consumeExamReviewRateLimit({
    namespace: 'exam-access-code-redeem',
    identifier: clientIdentifier(request),
    limit: 15,
    windowSeconds: 900,
  });
  if (!permitted) return Response.json({ ok: false, error: 'Demasiados intentos. Espera 15 minutos.' }, { status: 429 });

  let body: unknown;
  try { body = await request.json(); } catch {
    return Response.json({ ok: false, error: 'Solicitud inválida.' }, { status: 400 });
  }
  const input = body as { code?: unknown; examSlug?: unknown; attemptRef?: unknown };
  const result = await redeemExamAccessCode({ code: input.code, examSlug: input.examSlug, attemptRef: input.attemptRef });
  if (!result.ok) {
    const error = result.reason === 'expired' ? 'Este código de grupo ya venció.' : 'El código no es válido, pertenece a otro examen o ya fue usado.';
    return Response.json({ ok: false, error }, { status: 400 });
  }
  return Response.json({ ok: true, kind: result.kind, activeUntil: result.activeUntil }, {
    headers: { 'cache-control': 'private, no-store, max-age=0' },
  });
}
