import { cookies } from 'next/headers';
import { createHash } from 'node:crypto';
import { NextResponse } from 'next/server';
import { saveLead } from '@/lib/actions/saveLead';
import { createAdminClient } from '@/lib/supabase/admin';
import {
  ICFES_ATTEMPT_ID_PATTERN,
  type IcfesLeadAcceptedDto,
} from '@/lib/icfes/attempt-contract';
import { readOwnedIcfesAttempt } from '@/lib/icfes/attempt-store.server';
import {
  createIcfesLeadToken,
  ICFES_ATTEMPT_COOKIE,
  ICFES_LEAD_COOKIE,
  verifyIcfesAttemptToken,
} from '@/lib/icfes/attempt-token.server';
import { getIcfesPublicOfferCatalog } from '@/lib/icfes/product-config.server';
import {
  ICFES_LEAD_CONSENT_VERSION,
  ICFES_PRIVACY_NOTICE,
  ICFES_PRIVACY_VERSION,
} from '@/lib/icfes/terms';
import { isPlausibleEmail, isPlausibleWhatsapp } from '@/lib/leads/contact';

export const runtime = 'nodejs';

function json(body: unknown, status = 200) {
  const response = NextResponse.json(body, { status });
  response.headers.set('cache-control', 'private, no-store, max-age=0');
  return response;
}

export async function POST(
  request: Request,
  context: { params: Promise<{ attemptId: string }> },
): Promise<Response> {
  const { attemptId } = await context.params;
  if (!ICFES_ATTEMPT_ID_PATTERN.test(attemptId)) return json({ ok: false, error: 'Intento inválido.' }, 404);
  let body: Record<string, unknown>;
  try { body = await request.json() as Record<string, unknown>; }
  catch { return json({ ok: false, error: 'Solicitud inválida.' }, 400); }
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const whatsapp = typeof body.whatsapp === 'string' ? body.whatsapp.trim() : '';
  if (body.consentVersion !== ICFES_LEAD_CONSENT_VERSION
    || name.length < 2
    || !isPlausibleEmail(email)
    || !isPlausibleWhatsapp(whatsapp)) {
    return json({ ok: false, error: 'Completa los datos y acepta el consentimiento vigente.' }, 400);
  }

  const token = (await cookies()).get(ICFES_ATTEMPT_COOKIE)?.value ?? '';
  const tokenPayload = verifyIcfesAttemptToken(token);
  if (!tokenPayload || tokenPayload.attemptId !== attemptId) {
    return json({ ok: false, error: 'Acceso no autorizado.' }, 403);
  }
  const attempt = await readOwnedIcfesAttempt(attemptId, token);
  if (!attempt) return json({ ok: false, error: 'El intento seguro no está disponible.' }, 404);

  const noticeDigest = createHash('sha256').update(ICFES_PRIVACY_NOTICE, 'utf8').digest('hex');
  const contactDigest = createHash('sha256')
    .update(`${email.trim().toLowerCase()}\u0000${whatsapp.replace(/\D/g, '')}`, 'utf8')
    .digest('hex');
  const admin = createAdminClient();
  const { error: consentError } = await admin.from('icfes_lead_consents').insert({
    attempt_id: attemptId,
    consent_version: ICFES_LEAD_CONSENT_VERSION,
    privacy_version: ICFES_PRIVACY_VERSION,
    notice_snapshot: ICFES_PRIVACY_NOTICE,
    notice_sha256: noticeDigest,
    contact_sha256: contactDigest,
    accepted_at: new Date().toISOString(),
  });
  if (consentError) {
    const { data: existing } = await admin.from('icfes_lead_consents')
      .select('consent_version,privacy_version,notice_sha256,contact_sha256')
      .eq('attempt_id', attemptId).maybeSingle();
    if (!existing
      || existing.consent_version !== ICFES_LEAD_CONSENT_VERSION
      || existing.privacy_version !== ICFES_PRIVACY_VERSION
      || existing.notice_sha256 !== noticeDigest
      || existing.contact_sha256 !== contactDigest) {
      return json({ ok: false, error: 'No pudimos registrar el consentimiento vigente.' }, 503);
    }
  }

  const saved = await saveLead({
    name,
    email,
    whatsapp,
    examSlug: 'icfes',
    examScore: `${attempt.result.correct}/${attempt.result.total} correctas`,
    source: 'icfes-post-exam-gate',
  });
  if (!saved.ok) return json({ ok: false, error: saved.error ?? 'No pudimos guardar tus datos.' }, 503);

  const responseBody: IcfesLeadAcceptedDto = {
    ok: true,
    offer: getIcfesPublicOfferCatalog(),
    premiumEligible: attempt.result.premiumEligible,
    officialResource: attempt.result.officialResource,
  };
  const response = json(responseBody);
  response.cookies.set(ICFES_LEAD_COOKIE, createIcfesLeadToken(attemptId), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 6 * 60 * 60,
  });
  return response;
}
