import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { sameOrigin } from '@/lib/course-pricing/http.server';
import { ICFES_ATTEMPT_ID_PATTERN } from '@/lib/icfes/attempt-contract';
import { icfesAttemptCookieName, verifyIcfesAttemptToken } from '@/lib/icfes/attempt-token.server';
import { persistVerifiedIcfesTransaction } from '@/lib/icfes/payment-events.server';
import { isIcfesPassEnabled } from '@/lib/icfes/product-config.server';
import { getWompiServerConfig } from '@/lib/wompi/server';

export const runtime = 'nodejs';

export async function POST(request: Request): Promise<Response> {
  if (!sameOrigin(request)) return NextResponse.json({ ok: false }, { status: 403 });
  if (!isIcfesPassEnabled()) return NextResponse.json({ ok: false }, { status: 503 });
  let body: Record<string, unknown>;
  try { body = await request.json() as Record<string, unknown>; }
  catch { return NextResponse.json({ ok: false }, { status: 400 }); }
  const attemptId = typeof body.attemptId === 'string' ? body.attemptId : '';
  const transactionId = typeof body.transactionId === 'string' ? body.transactionId : '';
  if (!ICFES_ATTEMPT_ID_PATTERN.test(attemptId) || !/^[A-Za-z0-9_-]{6,120}$/.test(transactionId)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const token = (await cookies()).get(icfesAttemptCookieName(attemptId))?.value;
  const payload = verifyIcfesAttemptToken(token);
  if (!payload || payload.attemptId !== attemptId) return NextResponse.json({ ok: false }, { status: 403 });
  const result = await persistVerifiedIcfesTransaction({
    transactionId,
    config: getWompiServerConfig(),
    expectedAttemptId: attemptId,
  });
  if (result === 'failed') return NextResponse.json({ ok: false }, { status: 503 });
  return NextResponse.json({ ok: true, saved: result === 'saved' }, {
    headers: { 'cache-control': 'private, no-store, max-age=0' },
  });
}
