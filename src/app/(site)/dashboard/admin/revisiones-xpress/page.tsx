import Link from 'next/link';
import { requireAdmin } from '@/lib/auth/require-admin.server';
import { completeHumanXpressReview, completeXpressReview } from '@/lib/actions/xpressReviews';
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
  const environment = getWompiServerConfig().environment;
  const [feedbackResult, humanResult] = await Promise.all([
    db.from('xpress_personalized_feedback_requests')
      .select('id,user_id,submission_id,exam_slug,status,created_at,due_at')
      .eq('environment', environment).in('status', ['pending', 'processing', 'failed'])
      .order('due_at', { ascending: true }).limit(100),
    db.from('xpress_human_review_requests')
      .select('id,user_id,membership_id,submission_id,exam_slug,review_kind,status,created_at')
      .eq('environment', environment).in('status', ['pending', 'assigned'])
      .order('created_at', { ascending: true }).limit(100),
  ]);
  if (feedbackResult.error || humanResult.error) throw new Error('No pudimos cargar las revisiones Xpress.');
  const feedbackRows = feedbackResult.data ?? [];
  const humanRows = humanResult.data ?? [];
  const allRows = [...feedbackRows, ...humanRows];
  const [profiles, submissions, memberships] = allRows.length ? await Promise.all([
    db.from('profiles').select('id,full_name,email').in('id', [...new Set(allRows.map((row) => row.user_id))]),
    db.from('exam_submissions').select('id,mock_title,total_score,total_max').in('id', [...new Set(allRows.map((row) => row.submission_id))]),
    humanRows.length
      ? db.from('xpress_memberships').select('id,offer_id').in('id', [...new Set(humanRows.map((row) => row.membership_id))])
      : Promise.resolve({ data: [] as { id: string; offer_id: string }[], error: null }),
  ]) : [{ data: [], error: null }, { data: [], error: null }, { data: [], error: null }];
  if (profiles.error || submissions.error || memberships.error) throw new Error('No pudimos cargar los datos de los exámenes.');
  const studentById = new Map((profiles.data ?? []).map((row) => [row.id, row]));
  const submissionById = new Map((submissions.data ?? []).map((row) => [row.id, row]));
  const offerByMembership = new Map((memberships.data ?? []).map((row) => [row.id, row.offer_id]));

  return <main className={styles.page}>
    <nav><Link href="/dashboard/admin">← Volver a administración</Link><span>Cola privada</span></nav>
    <header><div><p>Seguimiento personalizado</p><h1>Revisiones Xpress</h1><span>{allRows.length} solicitud{allRows.length === 1 ? '' : 'es'} pendiente{allRows.length === 1 ? '' : 's'} en la cola privada</span></div><div className={styles.pills} aria-hidden="true"><i /><i /></div></header>
    {humanRows.length ? <section className={styles.queueSection}><div className={styles.queueTitle}><p>Writing y Speaking</p><h2>Revisiones humanas solicitadas</h2></div><div className={styles.list}>{humanRows.map((review) => {
      const student = studentById.get(review.user_id);
      const submission = submissionById.get(review.submission_id);
      const offerId = offerByMembership.get(review.membership_id);
      const personalized = offerId === 'exam-teacher';
      return <section className={styles.card} key={review.id}>
        <div className={styles.cardHeader}><div><p>{review.exam_slug.toUpperCase()} · {review.review_kind === 'writing' ? 'Writing' : 'Speaking'}</p><h2>{student?.full_name || student?.email || 'Estudiante'}</h2><span>{student?.email ?? ''} · {submission?.mock_title ?? 'Simulacro'}</span></div><div><strong>{personalized ? 'Plan Personalizado' : 'Plan Autodidacta'}</strong><time dateTime={review.created_at}>{deadline(review.created_at)}</time><Link href={`/dashboard/admin/estudiantes/${review.user_id}`}>Ver ficha →</Link></div></div>
        <form action={completeHumanXpressReview} className={styles.form}>
          <input type="hidden" name="reviewId" value={review.id} />
          <label><span>Evaluación humana</span><textarea name="summary" required minLength={12} maxLength={2400} rows={3} placeholder={`Evaluación concreta de ${review.review_kind === 'writing' ? 'la producción escrita' : 'la producción oral'}`} /></label>
          <label><span>Fortalezas</span><textarea name="strengths" required minLength={12} maxLength={2400} rows={3} placeholder="Qué hizo bien y qué debe conservar" /></label>
          <label><span>Por mejorar</span><textarea name="improvements" required minLength={12} maxLength={2400} rows={3} placeholder="Errores, patrones y habilidades que requieren atención" /></label>
          {personalized ? <label><span>Plan de mejora</span><textarea name="improvementPlan" required minLength={12} maxLength={2400} rows={3} placeholder="Acciones, secuencia y siguiente objetivo medible" /></label> : null}
          <button type="submit">Entregar revisión humana</button>
        </form>
      </section>;
    })}</div></section> : null}
    {feedbackRows.length ? <section className={styles.queueSection}><div className={styles.queueTitle}><p>Reporte integral</p><h2>Retroalimentación personalizada</h2></div><div className={styles.list}>{feedbackRows.map((review) => {
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
    })}</div></section> : null}
    {!allRows.length ? <section className={styles.empty}><h2>Todo al día</h2><p>Las nuevas solicitudes aparecerán aquí cuando un estudiante de un plan con revisión las envíe.</p></section> : null}
  </main>;
}
