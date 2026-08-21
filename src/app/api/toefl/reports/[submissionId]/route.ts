import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { isToeflReportPaywallEnabled } from '@/lib/toefl/report-payment-config.server';
import { readToeflReport } from '@/lib/toefl/report-payment.server';
import { toeflReportCookieName } from '@/lib/toefl/report-payment';
import { TOEFL_SUBMISSION_ID_PATTERN } from '@/lib/toefl/submission-token.server';

export const runtime = 'nodejs';

export async function GET(
  _request: Request,
  context: { params: Promise<{ submissionId: string }> },
): Promise<Response> {
  const { submissionId } = await context.params;
  const headers = { 'cache-control': 'private, no-store, max-age=0' };
  if (!isToeflReportPaywallEnabled()) {
    return NextResponse.json({ ok: false, error: 'El reporte pagado no está habilitado.' }, { status: 503, headers });
  }
  if (!TOEFL_SUBMISSION_ID_PATTERN.test(submissionId)) {
    return NextResponse.json({ ok: false, error: 'El reporte solicitado no es válido.' }, { status: 400, headers });
  }
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(toeflReportCookieName(submissionId))?.value;
  if (!accessToken) {
    return NextResponse.json({ ok: false, error: 'Este navegador no tiene acceso a ese reporte.' }, { status: 403, headers });
  }
  const report = await readToeflReport(submissionId, accessToken);
  if (!report) {
    return NextResponse.json({ ok: false, error: 'No pudimos verificar el acceso al reporte.' }, { status: 403, headers });
  }
  return NextResponse.json(report, { headers });
}
