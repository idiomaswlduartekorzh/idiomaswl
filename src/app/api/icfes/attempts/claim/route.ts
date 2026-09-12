import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ICFES_ATTEMPT_ID_PATTERN } from '@/lib/icfes/attempt-contract';
import { icfesAttemptCookieName } from '@/lib/icfes/attempt-token.server';
import { claimIcfesAttemptForUser, IcfesAttemptClaimError } from '@/lib/icfes/attempt-ownership.server';
import { sameOrigin } from '@/lib/course-pricing/http.server';

export const runtime = 'nodejs';

export async function POST(request: Request): Promise<Response> {
  if (!sameOrigin(request)) return NextResponse.json({ ok: false, error: 'Solicitud no permitida.' }, { status: 403 });
  let body: Record<string, unknown>;
  try { body = await request.json() as Record<string, unknown>; }
  catch { return NextResponse.json({ ok: false, error: 'Solicitud inválida.' }, { status: 400 }); }
  const attemptId = typeof body.attemptId === 'string' ? body.attemptId : '';
  if (!ICFES_ATTEMPT_ID_PATTERN.test(attemptId)) return NextResponse.json({ ok: false }, { status: 403 });
  const { data: { user } } = await (await createClient()).auth.getUser();
  if (!user) return NextResponse.json({ ok: false, error: 'Debes iniciar sesión.' }, { status: 401 });
  const token = (await cookies()).get(icfesAttemptCookieName(attemptId))?.value;
  try {
    await claimIcfesAttemptForUser({ attemptId, token, userId: user.id });
    return NextResponse.json({ ok: true }, { headers: { 'cache-control': 'private, no-store, max-age=0' } });
  } catch (error) {
    const status = error instanceof IcfesAttemptClaimError
      && (error.code === 'UNAVAILABLE' || error.code === 'DISABLED') ? 503 : 403;
    return NextResponse.json({ ok: false, error: 'No pudimos asociar el intento con tu cuenta.' }, { status });
  }
}
