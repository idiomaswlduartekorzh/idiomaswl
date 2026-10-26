import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';
import { escapeEmailHtml, sendCourseEmail } from '@/lib/course-pricing/email.server';
import { studentEmailShell } from '@/lib/student-operations/email.server';

export async function correctionEmailEnabled(studentId: string): Promise<boolean> {
  const { data, error } = await createAdminClient().from('student_notification_preferences')
    .select('correction_emails_enabled').eq('student_id', studentId).maybeSingle();
  if (error) throw error;
  return data?.correction_emails_enabled ?? true;
}

export async function notifyExamReview(submissionId: string, title: string, reviewKind = 'final'): Promise<void> {
  const db = createAdminClient();
  const { data: submission, error: submissionError } = await db.from('exam_submissions')
    .select('user_id').eq('id', submissionId).maybeSingle();
  if (submissionError || !submission?.user_id) throw new Error('review_owner_missing');
  if (!await correctionEmailEnabled(submission.user_id)) return;
  const { data: profile, error: profileError } = await db.from('profiles')
    .select('email').eq('id', submission.user_id).maybeSingle();
  if (profileError || !profile?.email) throw new Error('review_email_missing');
  const link = `https://www.idiomaswl.com/dashboard/student/resultados/${submissionId}`;
  await sendCourseEmail({
    to: profile.email,
    subject: `Tu revisión de ${title} está lista`,
    html: studentEmailShell({
      preheader: 'Tu docente ya revisó tu entrega.',
      title: 'Tu corrección está lista',
      body: `<p>Tu docente ya revisó tu entrega de <strong>${escapeEmailHtml(title)}</strong>. Puedes consultar el resultado y los comentarios en tu panel.</p>`,
      cta: { href: link, label: 'Ver mi corrección' },
    }),
    idempotencyKey: `exam-review/${submissionId}/${reviewKind}`,
  });
}

export async function sendStudyReminders(): Promise<{ attempted: number; sent: number; failed: number }> {
  const db = createAdminClient();
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Bogota', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  const weekday = ((new Date(`${today}T12:00:00Z`).getUTCDay() + 6) % 7) + 1;
  const preferences: { student_id: string; study_reminder_frequency: string; study_reminder_weekday: number }[] = [];
  for (let offset = 0; ; offset += 500) {
    const { data, error } = await db.from('student_notification_preferences')
      .select('student_id, study_reminder_frequency, study_reminder_weekday')
      .eq('study_reminders_enabled', true)
      .or(`last_study_reminder_on.is.null,last_study_reminder_on.neq.${today}`)
      .order('student_id').range(offset, offset + 499);
    if (error) throw error;
    preferences.push(...(data ?? []));
    if (!data || data.length < 500) break;
  }
  const due = preferences.filter(row => row.study_reminder_frequency === 'daily' || row.study_reminder_weekday === weekday);
  let sent = 0;
  let failed = 0;
  for (const pref of due) {
    const { data: claimed, error: claimError } = await db.from('student_notification_preferences')
      .update({ last_study_reminder_on: today })
      .eq('student_id', pref.student_id).eq('study_reminders_enabled', true)
      .or(`last_study_reminder_on.is.null,last_study_reminder_on.neq.${today}`)
      .select('student_id').maybeSingle();
    if (claimError || !claimed) { if (claimError) failed++; continue; }
    try {
      const { data: profile, error: profileError } = await db.from('profiles')
        .select('email, full_name').eq('id', pref.student_id).maybeSingle();
      if (profileError || !profile?.email) throw new Error('reminder_email_missing');
      await sendCourseEmail({
        to: profile.email,
        subject: 'Tu momento para estudiar en WeLearn',
        html: studentEmailShell({
          preheader: 'Un pequeño paso hoy suma a tu progreso.',
          title: `¡A estudiar${profile.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}!`,
          body: '<p>Dedica unos minutos a tu próxima actividad y sigue avanzando a tu ritmo.</p>',
          cta: { href: 'https://www.idiomaswl.com/dashboard/student', label: 'Abrir mi panel' },
        }),
        idempotencyKey: `study-reminder/${pref.student_id}/${today}`,
      });
      sent++;
    } catch {
      failed++;
      await db.from('student_notification_preferences').update({ last_study_reminder_on: null })
        .eq('student_id', pref.student_id).eq('last_study_reminder_on', today);
    }
  }
  return { attempted: due.length, sent, failed };
}
