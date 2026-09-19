import Link from 'next/link';
import { requireAdmin } from '@/lib/auth/require-admin.server';
import { completeXpressReview } from '@/lib/actions/xpressReviews';
import { createAdminClient } from '@/lib/supabase/admin';
import { getWompiServerConfig } from '@/lib/wompi/server';
import styles from './reviews.module.css';

export const metadata = { title: 'Revisiones Xpress — WeLearn', robots: { index: false, follow: false } };

function deadline(value: string): string {
  return new Intl.DateTimeFormat('es-CO', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit',
    timeZone: 'America/Bogota' }).format(new Date(value));
}

export default async function XpressReviewsPage() {
  await requireAdmin();
  const db = createAdminClient();
  const { data: reviews, error } = await db.from('xpress_personalized_feedback_requests')
    .select('id,user_id,submission_id,exam_slug,status,created_at,due_at')
    .eq('environment', getWompiServerConfig().environment)
    .in('status', ['pending', 'processing', 'failed'])
    .order('due_at', { ascending: true }).limit(100);
  if (error) throw new Error('No pudimos cargar las revisiones Xpress.');
  const rows = reviews ?? [];
  const [profiles, submissions] = rows.length ? await Promise.all([
    db.from('profiles').select('id,full_name,email').in('id', [...new Set(rows.map((row) => row.user_id))]),
    db.from('exam_submissions').select('id,mock_title,total_score,total_max').in('id', rows.map((row) => row.submission_id)),
  ]) : [{ data: [], error: null }, { data: [], error: null }];
  if (profiles.error || submissions.error) throw new Error('No pudimos cargar los datos de los exámenes.');
  const studentById = new Map((profiles.data ?? []).map((row) => [row.id, row]));
  const submissionById = new Map((submissions.data ?? []).map((row) => [row.id, row]));

  return <main className={styles.page}>
    <nav><Link href="/dashboard/admin">← Volver a administración</Link><span>Cola privada</span></nav>
    <header><div><p>Seguimiento personalizado</p><h1>Revisiones Xpress</h1><span>{rows.length} examen{rows.length === 1 ? '' : 'es'} por revisar · plazo de 24 horas desde la entrega</span></div><div className={styles.pills} aria-hidden="true"><i /><i /></div></header>
    {rows.length ? <div className={styles.list}>{rows.map((review) => {
      const student = studentById.get(review.user_id);
      const submission = submissionById.get(review.submission_id);
      const score = submission?.total_max && submission.total_score !== null
        ? `${Math.round(Number(submission.total_score) / Number(submission.total_max) * 100)}%` : 'Pendiente';
      return <section className={styles.card} key={review.id}>
        <div className={styles.cardHeader}><div><p>{review.exam_slug.toUpperCase()} · {submission?.mock_title ?? 'Simulacro'}</p><h2>{student?.full_name || student?.email || 'Estudiante'}</h2><span>{student?.email ?? ''} · Resultado {score}</span></div><div><strong>Entrega máxima</strong><time dateTime={review.due_at}>{deadline(review.due_at)}</time><Link href={`/dashboard/admin/estudiantes/${review.user_id}`}>Ver ficha →</Link></div></div>
        <form action={completeXpressReview} className={styles.form}>
          <input type="hidden" name="reviewId" value={review.id} />
          <label><span>Lectura del resultado</span><textarea name="summary" required minLength={12} maxLength={2400} rows={3} placeholder="Qué revela el desempeño general de este simulacro" /></label>
          <label><span>Fortalezas</span><textarea name="strengths" required minLength={12} maxLength={2400} rows={3} placeholder="Qué hizo bien y qué conviene mantener" /></label>
          <label><span>Por mejorar</span><textarea name="improvements" required minLength={12} maxLength={2400} rows={3} placeholder="Errores o habilidades que requieren atención" /></label>
          <label><span>Siguiente paso</span><textarea name="nextSteps" required minLength={12} maxLength={2400} rows={3} placeholder="Una acción concreta para su próxima práctica" /></label>
          <button type="submit">Entregar revisión al estudiante</button>
        </form>
      </section>;
    })}</div> : <section className={styles.empty}><h2>Todo al día</h2><p>Las nuevas solicitudes aparecerán aquí cuando un estudiante del plan con revisión entregue un examen.</p></section>}
  </main>;
}
