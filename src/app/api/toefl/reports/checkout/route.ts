import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isToeflReportPaywallEnabled } from '@/lib/toefl/report-payment-config.server';
import { createToeflCheckoutSession, readToeflReport } from '@/lib/toefl/report-payment.server';
import { toeflReportCookieName } from '@/lib/toefl/report-payment';
import { TOEFL_SUBMISSION_ID_PATTERN, verifyToeflSubmissionToken } from '@/lib/toefl/submission-token.server';

export const runtime = 'nodejs';

function noStore(response: NextResponse): NextResponse {
  response.headers.set('cache-control', 'private, no-store, max-age=0');
  return response;
}

export async function POST(request: Request): Promise<Response> {
  if (!isToeflReportPaywallEnabled()) {
    return noStore(NextResponse.json({ ok: false, error: 'El cobro del reporte todavía no está habilitado.' }, { status: 503 }));
  }
  let body: Record<string, unknown>;
  try {
    body = await request.json() as Record<string, unknown>;
  } catch {
    return noStore(NextResponse.json({ ok: false, error: 'La solicitud no contiene JSON válido.' }, { status: 400 }));
  }
  const submissionId = typeof body.submissionId === 'string' ? body.submissionId : '';
  if (!TOEFL_SUBMISSION_ID_PATTERN.test(submissionId)) {
    return noStore(NextResponse.json({ ok: false, error: 'La entrega solicitada no es válida.' }, { status: 400 }));
  }
  const receiptAuthorized = verifyToeflSubmissionToken(submissionId, body.completionToken);
  const cookieStore = await cookies();
  const existingAccess = cookieStore.get(toeflReportCookieName(submissionId))?.value;
  const capabilityAuthorized = !receiptAuthorized && existingAccess
    ? Boolean(await readToeflReport(submissionId, existingAccess))
    : false;
  if (!receiptAuthorized && !capabilityAuthorized) {
    return noStore(NextResponse.json({ ok: false, error: 'La autorización de la entrega no es válida o venció.' }, { status: 403 }));
  }
  try {
    const session = await createToeflCheckoutSession(submissionId);
    const response = noStore(NextResponse.json(session.response));
    response.cookies.set(session.cookieName, session.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 90,
    });
    return response;
  } catch (error) {
    console.error('[toefl-checkout] Could not create checkout:', error instanceof Error ? error.message : 'unknown');
    return noStore(NextResponse.json({ ok: false, error: error instanceof Error ? error.message : 'No pudimos preparar el pago.' }, { status: 503 }));
  }
}
