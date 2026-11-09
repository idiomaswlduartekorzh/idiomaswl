import { findManualInvite, finishManualEnrollment, recordManualAcceptance } from '@/lib/course-pricing/manual-enrollment.server';
import { parseManualContact } from '@/lib/course-pricing/payment';
import { json, readBody, sameOrigin } from '@/lib/course-pricing/http.server';
import { PRIVACY_VERSION, TERMS_VERSION } from '@/lib/course-pricing/terms';

export const runtime = 'nodejs';

export async function POST(request: Request, context: { params: Promise<{ token: string }> }) {
  if (!sameOrigin(request)) return json({ message: 'Solicitud no permitida.' }, 403);
  const { token } = await context.params;
  let invite;
  try { invite = await findManualInvite(token); }
  catch { return json({ message: 'No pudimos consultar la invitación.' }, 503); }
  if (!invite) return json({ message: 'Enlace de inscripción inválido.' }, 404);
  if (invite.welcome_sent_at) return json({ ok: true, message: 'La inscripción ya está guardada. Revisa tu correo para activar la cuenta.' });
  if (!invite.accepted_at && Date.parse(invite.expires_at) <= Date.now()) return json({ message: 'Este enlace venció. Solicita uno nuevo a WeLearn.' }, 410);
  try {
    if (!invite.accepted_at) {
      const body = await readBody(request) as Record<string, unknown>;
      if (body.acceptedTerms !== TERMS_VERSION || body.reviewedTerms !== TERMS_VERSION || body.acceptedPrivacy !== PRIVACY_VERSION || body.acceptedAdult !== true) return json({ message: 'Debes leer y aceptar las condiciones para continuar.' }, 400);
      const contact = parseManualContact(body.contact, invite.email);
      if (!contact) return json({ message: 'Revisa los datos del estudiante, del pagador y de quien firma.' }, 400);
      const recorded = await recordManualAcceptance(invite, contact);
      if (recorded) invite = recorded;
      else {
        const current = await findManualInvite(token);
        if (!current?.accepted_at) return json({ message: 'No pudimos guardar la aceptación.' }, 503);
        invite = current;
      }
    }
    await finishManualEnrollment(invite);
    return json({ ok: true, message: 'Inscripción guardada. Te enviamos el reglamento firmado y el acceso a tu correo.' });
  } catch (error) {
    console.error('[manual-enrollment] failed', { id: invite.id, code: error instanceof Error ? error.message : 'unknown' });
    return json({ message: 'Guardamos tu firma, pero falta terminar el acceso o el correo. Inténtalo de nuevo; no tendrás que firmar ni pagar otra vez.' }, 503);
  }
}
