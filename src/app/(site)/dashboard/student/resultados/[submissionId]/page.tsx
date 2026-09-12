import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { isAdminEmail } from '@/lib/config/admins';
import { createClient } from '@/lib/supabase/server';
import { loadStudentDashboard } from '@/lib/student-dashboard/data.server';
import styles from './report.module.css';

export const metadata = { title: 'Mi reporte — WeLearn', robots: { index: false, follow: false } };

export default async function StudentResultPage({ params }: { params: Promise<{ submissionId: string }> }) {
  const { submissionId } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(submissionId)) notFound();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  if (isAdminEmail(user.email)) redirect('/dashboard/admin');
  const { data: profile } = await supabase.from('profiles').select('full_name,target_exam').eq('id', user.id).maybeSingle();
  const dashboard = await loadStudentDashboard(user, profile);
  const attempt = dashboard.attempts.find((item) => item.id === submissionId);
  if (!attempt) notFound();

  return <main className={styles.page}>
    <nav><Link href="/dashboard/student">← Volver a mi espacio</Link><span>Reporte privado</span></nav>
    <header><p>WeLearn Xpress</p><h1>{attempt.title}</h1><span>{attempt.examFlag} {attempt.examName}</span></header>
    <section className={styles.result}>
      <div className={styles.score}><span>Resultado</span><strong>{attempt.score === null ? 'Listo' : `${attempt.score}%`}</strong><small>{attempt.scoreLabel}</small></div>
      <div><p>Intento guardado en tu cuenta</p><h2>Tu reporte está disponible de forma permanente dentro del acceso contratado.</h2><p>El detalle pedagógico se construye con la información que registró este simulacro. Las correcciones y escalas son de práctica y no constituyen un resultado oficial.</p></div>
    </section>
    {attempt.feedbackState !== 'not-included' ? <section className={styles.feedback}>
      <p>Revisión pedagógica personalizada</p>
      <h2>{attempt.feedbackState === 'delivered' ? 'Tu devolución ya está lista' : attempt.feedbackState === 'failed' ? 'Estamos reintentando generar tu devolución' : 'Estamos preparando tu devolución'}</h2>
      <span>Encontrarás observaciones sobre tu desempeño y los aspectos que conviene reforzar. Las escalas de práctica no constituyen un resultado oficial.</span>
    </section> : null}
    <section className={styles.actions}><Link href={attempt.examHubHref}>Volver a los simulacros</Link><a href="https://wa.me/573005004253?text=Hola%2C%20necesito%20ayuda%20con%20mi%20reporte%20de%20WeLearn." rel="noreferrer" target="_blank">Pedir ayuda</a></section>
  </main>;
}
