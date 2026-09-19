import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { isVerifiedAdminUser } from '@/lib/config/admins';
import { createClient } from '@/lib/supabase/server';
import { loadOwnedPaidAttempt, loadStudentDashboard } from '@/lib/student-dashboard/data.server';
import styles from './report.module.css';

export const metadata = { title: 'Mi reporte — WeLearn', robots: { index: false, follow: false } };

export default async function StudentResultPage({ params }: { params: Promise<{ submissionId: string }> }) {
  const { submissionId } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(submissionId)) notFound();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  if (isVerifiedAdminUser(user)) redirect('/dashboard/admin');
  // A verified email can recover a purchase made with an earlier auth identity.
  const dashboard = await loadStudentDashboard(user, null);
  if (!dashboard.dataAvailable) notFound();
  const attempt = await loadOwnedPaidAttempt(user, submissionId);
  if (!attempt) notFound();

  return <main className={styles.page}>
    <nav><Link href="/dashboard/student">← Volver a mi espacio</Link><span>Reporte privado</span></nav>
    <header><p>WeLearn Xpress</p><h1>{attempt.title}</h1><span>{attempt.examFlag} {attempt.examName}</span></header>
    <section className={styles.result}>
      <div className={styles.score}><span>Resultado</span><strong>{attempt.score === null ? 'Listo' : `${attempt.score}%`}</strong><small>{attempt.scoreLabel}</small></div>
      <div><p>Intento guardado en tu cuenta</p><h2>Tu reporte está disponible de forma permanente dentro del acceso contratado.</h2><p>El detalle pedagógico se construye con la información que registró este simulacro. Las correcciones y escalas son de práctica y no constituyen un resultado oficial.</p></div>
    </section>
    {attempt.skills.length ? <section className={styles.breakdown}>
      <p>Tu desempeño</p><h2>Resultados por habilidad</h2>
      <div>{attempt.skills.map((skill) => <article key={skill.name}><span>{skill.name}</span><strong>{skill.percentage}%</strong><small>{skill.score} de {skill.maximum} puntos</small></article>)}</div>
    </section> : null}
    {attempt.feedbackState !== 'not-included' ? <section className={styles.feedback}>
      <p>Revisión pedagógica personalizada</p>
      <h2>{attempt.feedbackState === 'delivered' ? 'Tu devolución ya está lista' : attempt.feedbackState === 'failed' ? 'Estamos retomando tu revisión' : 'Estamos preparando tu devolución'}</h2>
      {attempt.teacherFeedback ? <div className={styles.feedbackGrid}>
        <article><h3>Lectura de tu resultado</h3><p>{attempt.teacherFeedback.summary}</p></article>
        <article><h3>Fortalezas</h3><p>{attempt.teacherFeedback.strengths}</p></article>
        <article><h3>Por mejorar</h3><p>{attempt.teacherFeedback.improvements}</p></article>
        <article><h3>Siguiente paso</h3><p>{attempt.teacherFeedback.nextSteps}</p></article>
      </div> : <span>Tu tutor registrará aquí observaciones sobre tu desempeño y los aspectos que conviene reforzar. Las escalas de práctica no constituyen un resultado oficial.</span>}
    </section> : null}
    <section className={styles.actions}><Link href={attempt.examHubHref}>Volver a los simulacros</Link><a href="https://wa.me/573005004253?text=Hola%2C%20necesito%20ayuda%20con%20mi%20reporte%20de%20WeLearn." rel="noreferrer" target="_blank">Pedir ayuda</a></section>
  </main>;
}
