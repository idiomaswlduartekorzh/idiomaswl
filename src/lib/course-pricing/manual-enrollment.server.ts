import 'server-only';
import { createHash } from 'node:crypto';
import { Buffer } from 'node:buffer';
import { createAdminClient } from '@/lib/supabase/admin';
import { type Contact } from './payment';
import { normalizeWhatsAppPhone } from './phone';
import { COURSE_LEGAL_SNAPSHOT, PRIVACY_VERSION, TERMS_VERSION } from './terms';
import { generateCourseTermsPdf, resolveCourseTermsSnapshot } from './terms-pdf.server';
import { escapeEmailHtml, sendCourseEmail } from './email.server';

export const MANUAL_SELECTION = { language: 'ingles', objective: 'general', plan: 'intensivo', level: 'No sé mi nivel' } as const;
export type ManualInvite = { id: string; email: string; token_hash: string; expires_at: string; accepted_at: string | null; completed_at: string | null; welcome_sent_at: string | null; contact: Contact | null; selection: typeof MANUAL_SELECTION | null; signed_pdf_base64: string | null; signed_pdf_sha256: string | null; user_id: string | null; preferred_schedule: string };

export function manualTokenHash(token: string) {
  if (!/^[a-f0-9]{64}$/.test(token)) return null;
  return createHash('sha256').update(token).digest('hex');
}

export async function findManualInvite(token: string): Promise<ManualInvite | null> {
  const hash = manualTokenHash(token);
  if (!hash) return null;
  const { data, error } = await createAdminClient().from('manual_course_enrollment_invites').select('*').eq('token_hash', hash).maybeSingle();
  if (error) throw error;
  return data as ManualInvite | null;
}

function clean(value: unknown, min: number, max: number) {
  if (typeof value !== 'string') return null;
  const result = value.normalize('NFKC').trim().replace(/\s+/g, ' ');
  return result.length >= min && result.length <= max && !/[\x00-\x1f<>]/.test(result) ? result : null;
}

export function parseManualContact(value: unknown, email: string): Contact | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const x = value as Record<string, unknown>;
  const studentName = clean(x.studentName, 2, 100);
  const payerName = clean(x.payerName, 2, 100);
  const signerName = clean(x.signerName, 2, 100);
  const phone = normalizeWhatsAppPhone(x.phone);
  const city = clean(x.city, 2, 100);
  const address = clean(x.address, 5, 180);
  const purpose = clean(x.purpose, 0, 500);
  if (!studentName || !payerName || !signerName || !phone || !city || !address || purpose === null) return null;
  if (signerName.toLocaleLowerCase('es-CO') !== payerName.toLocaleLowerCase('es-CO')) return null;
  return { studentName, studentEmail: email, payerName, signerName, phone, city, address, purpose };
}

export async function recordManualAcceptance(invite: ManualInvite, contact: Contact) {
  const acceptedAt = new Date().toISOString();
  const legalSha256 = createHash('sha256').update(COURSE_LEGAL_SNAPSHOT).digest('hex');
  const pdf = await generateCourseTermsPdf(resolveCourseTermsSnapshot(COURSE_LEGAL_SNAPSHOT), {
    name: contact.signerName, email: invite.email, acceptedAt, sha256: legalSha256,
  });
  const signedPdfSha256 = createHash('sha256').update(pdf.bytes).digest('hex');
  const { data, error } = await createAdminClient().from('manual_course_enrollment_invites').update({
    contact, selection: MANUAL_SELECTION, terms_version: TERMS_VERSION, privacy_version: PRIVACY_VERSION,
    legal_snapshot: COURSE_LEGAL_SNAPSHOT, legal_sha256: legalSha256,
    signed_pdf_base64: Buffer.from(pdf.bytes).toString('base64'), signed_pdf_sha256: signedPdfSha256,
    signed_by: contact.signerName, accepted_at: acceptedAt,
  }).eq('id', invite.id).is('accepted_at', null).gt('expires_at', acceptedAt).select('*').maybeSingle();
  if (error) throw error;
  return data as ManualInvite | null;
}

export async function finishManualEnrollment(invite: ManualInvite) {
  if (!invite.accepted_at || !invite.contact || !invite.signed_pdf_base64 || !invite.signed_pdf_sha256) throw new Error('manual_acceptance_missing');
  const admin = createAdminClient();
  const contact = invite.contact;
  const pdfBytes = Buffer.from(invite.signed_pdf_base64, 'base64');
  if (createHash('sha256').update(pdfBytes).digest('hex') !== invite.signed_pdf_sha256) throw new Error('manual_pdf_hash_mismatch');
  let userId = invite.user_id;
  let actionLink: string | null = null;
  if (!userId) {
    const { data: profile, error: profileLookupError } = await admin.from('profiles').select('id').eq('email', invite.email).maybeSingle();
    if (profileLookupError) throw profileLookupError;
    userId = profile?.id ?? null;
    if (!userId) {
      const options = { data: { full_name: contact.studentName, source: 'manual_course_enrollment', course_language: 'ingles' }, redirectTo: 'https://www.idiomaswl.com/auth/callback?next=%2Fdashboard%2Fstudent' };
      let link = await admin.auth.admin.generateLink({ type: 'invite', email: invite.email, options });
      if (link.error) link = await admin.auth.admin.generateLink({ type: 'magiclink', email: invite.email, options });
      if (link.error || !link.data.user || !link.data.properties) throw new Error('manual_account_link_failed');
      userId = link.data.user.id;
      actionLink = link.data.properties.action_link;
    }
  }
  const { error: profileError } = await admin.from('profiles').upsert({
    id: userId, email: invite.email, name: contact.studentName, full_name: contact.studentName,
    language: 'ingles', level: MANUAL_SELECTION.level, subject: 'ingles', plan: 'intensivo', role: 'user',
    student_path: 'welearn', target_exam: null, xpress_plan_interest: null,
    onboarding_completed_at: new Date().toISOString(), enrolled_at: new Date().toISOString(),
  }, { onConflict: 'id' });
  if (profileError) throw new Error(`manual_profile_failed:${profileError.code}`);
  const { error: updateError } = await admin.from('manual_course_enrollment_invites').update({ user_id: userId, completed_at: new Date().toISOString() }).eq('id', invite.id);
  if (updateError) throw updateError;
  if (!invite.welcome_sent_at) {
    if (!actionLink) {
      const link = await admin.auth.admin.generateLink({
        type: 'magiclink', email: invite.email,
        options: { redirectTo: 'https://www.idiomaswl.com/auth/callback?next=%2Fdashboard%2Fstudent' },
      });
      if (link.error || !link.data.properties) throw new Error('manual_account_link_failed');
      actionLink = link.data.properties.action_link;
    }
    const accountHref = actionLink ?? 'https://www.idiomaswl.com/login';
    await sendCourseEmail({
      to: invite.email,
      subject: 'Activa tu cuenta y guarda el reglamento firmado · WeLearn',
      idempotencyKey: `manual-enrollment-welcome/${invite.id}`,
      html: `<h1>Tu inscripción en WeLearn quedó guardada</h1><p>Hola, ${escapeEmailHtml(contact.studentName)}.</p><p>Registramos tu inscripción por consignación en inglés general, plan de cuatro clases por semana. Tu horario preferido es ${escapeEmailHtml(invite.preferred_schedule)}. Acordaremos contigo los cuatro días antes de confirmar el horario.</p><p><strong>Tu reglamento firmado está adjunto en PDF.</strong> Guardamos también la constancia de tu aceptación en WeLearn.</p><p><a href="${escapeEmailHtml(accountHref)}">${actionLink ? 'Verificar correo y activar mi cuenta' : 'Entrar a mi cuenta'}</a></p><p>Si el enlace caduca, usa la opción de acceso por correo en la página de inicio de sesión.</p>`,
      attachments: [{ filename: 'reglamento-welearn-firmado.pdf', content: pdfBytes, contentType: 'application/pdf' }],
    });
    const { error: sentError } = await admin.from('manual_course_enrollment_invites').update({ welcome_sent_at: new Date().toISOString() }).eq('id', invite.id);
    if (sentError) throw sentError;
  }
}
