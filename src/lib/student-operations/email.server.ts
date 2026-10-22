import 'server-only';

import { escapeEmailHtml, sendCourseEmail } from '@/lib/course-pricing/email.server';
import { createAdminClient } from '@/lib/supabase/admin';

export type StudentCommunicationKind = 'welcome' | 'assignment' | 'follow_up' | 'general';

type TrackedEmailInput = Readonly<{
  studentId: string;
  createdBy: string;
  kind: StudentCommunicationKind;
  subject: string;
  bodyText: string;
  html: string;
  idempotencyKey: string;
  relatedAssignmentId?: string | null;
}>;

export function studentEmailShell(input: { preheader: string; title: string; body: string; cta?: { href: string; label: string } }): string {
  const cta = input.cta
    ? `<p style="margin:28px 0"><a href="${escapeEmailHtml(input.cta.href)}" style="display:inline-block;background:#172154;color:#fff;text-decoration:none;padding:13px 20px;border-radius:10px;font-weight:700">${escapeEmailHtml(input.cta.label)}</a></p>`
    : '';
  return `<!doctype html><html><body style="margin:0;background:#f4f1ed;font-family:Arial,sans-serif;color:#172154"><div style="display:none;max-height:0;overflow:hidden">${escapeEmailHtml(input.preheader)}</div><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f1ed;padding:28px 12px"><tr><td align="center"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#fff;border-radius:18px;overflow:hidden;border:1px solid #e8ddd4"><tr><td style="background:#172154;padding:22px 28px;color:#fff"><strong style="font-size:20px"><span style="color:#ef3340">We</span>Learn</strong><div style="font-size:12px;opacity:.72;margin-top:4px">Centro de estudiantes</div></td></tr><tr><td style="padding:30px 28px"><h1 style="font-size:24px;line-height:1.2;margin:0 0 18px">${escapeEmailHtml(input.title)}</h1>${input.body}${cta}<p style="font-size:12px;line-height:1.6;color:#6b7280;margin:28px 0 0">Equipo WeLearn · IdiomasWL</p></td></tr></table></td></tr></table></body></html>`;
}

export async function sendTrackedStudentEmail(input: TrackedEmailInput): Promise<{ communicationId: string; providerMessageId: string | null }> {
  const db = createAdminClient();
  const { data: profile, error: profileError } = await db.from('profiles')
    .select('email').eq('id', input.studentId).maybeSingle();
  const recipient = profile?.email?.trim().toLowerCase();
  if (profileError || !recipient || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient)) {
    throw new Error('student_email_missing');
  }

  const { data: communication, error: logError } = await db.from('student_communications').insert({
    student_id: input.studentId,
    created_by: input.createdBy,
    related_assignment_id: input.relatedAssignmentId ?? null,
    kind: input.kind,
    recipient_email: recipient,
    subject: input.subject.trim(),
    body_text: input.bodyText.trim(),
  }).select('id').single();
  if (logError || !communication) throw new Error('student_email_log_failed');

  try {
    const sent = await sendCourseEmail({
      to: recipient,
      subject: input.subject.trim(),
      html: input.html,
      idempotencyKey: input.idempotencyKey,
    });
    const { error: updateError } = await db.from('student_communications').update({
      status: 'sent',
      provider_message_id: sent.id,
      sent_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }).eq('id', communication.id);
    if (updateError) throw new Error('student_email_status_failed');
    return { communicationId: communication.id, providerMessageId: sent.id };
  } catch (error) {
    await db.from('student_communications').update({
      status: 'failed',
      error_message: error instanceof Error ? error.message.slice(0, 500) : 'student_email_failed',
      updated_at: new Date().toISOString(),
    }).eq('id', communication.id);
    throw error;
  }
}
