import { cookies } from 'next/headers';
import {
  hasSensitiveResultFields,
  ICFES_ATTEMPT_ID_PATTERN,
  toIcfesFreeSummary,
} from '@/lib/icfes/attempt-contract';
import { readOwnedIcfesAttempt } from '@/lib/icfes/attempt-store.server';
import {
  ICFES_ATTEMPT_COOKIE,
  ICFES_LEAD_COOKIE,
  verifyIcfesAttemptToken,
  verifyIcfesLeadToken,
} from '@/lib/icfes/attempt-token.server';

export const runtime = 'nodejs';
const headers = { 'cache-control': 'private, no-store, max-age=0' };

export async function GET(
  _request: Request,
  context: { params: Promise<{ attemptId: string }> },
): Promise<Response> {
  const { attemptId } = await context.params;
  if (!ICFES_ATTEMPT_ID_PATTERN.test(attemptId)) {
    return Response.json({ ok: false, error: 'Resultado no disponible.' }, { status: 404, headers });
  }
  const jar = await cookies();
  const attemptToken = jar.get(ICFES_ATTEMPT_COOKIE)?.value ?? '';
  const leadToken = jar.get(ICFES_LEAD_COOKIE)?.value;
  const payload = verifyIcfesAttemptToken(attemptToken);
  if (!payload || payload.attemptId !== attemptId || !verifyIcfesLeadToken(leadToken, attemptId)) {
    return Response.json({ ok: false, error: 'Completa el registro antes de ver el resumen.' }, { status: 403, headers });
  }
  const attempt = await readOwnedIcfesAttempt(attemptId, attemptToken);
  if (!attempt || hasSensitiveResultFields(attempt.result)) {
    return Response.json({ ok: false, error: 'Resultado no disponible.' }, { status: 404, headers });
  }
  return Response.json({ ok: true, result: toIcfesFreeSummary(attempt.result) }, { headers });
}
