import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cancelStudentAssignment, createStudentAssignment } from '@/lib/actions/studentAssignments';
import { requireAdmin } from '@/lib/auth/require-admin.server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getStudentExamWorkspace } from '@/lib/student-dashboard/catalog';
import { buildStudentProgress, parseSkillScores } from '@/lib/student-dashboard/progress';
import type { StudentAttempt } from '@/lib/student-dashboard/types';
import styles from './student-detail.module.css';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function dateLabel(value: string | null): string {
  if (!value) return '—';
  return new Intl.DateTimeFormat('es-CO', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'America/Bogota' }).format(new Date(value));
}

function scoreFor(row: { total_score: number | null; total_max: number | null }) {
  const score = Number(row.total_score);
  const maximum = Number(row.total_max);
  return Number.isFinite(score) && Number.isFinite(maximum) && maximum > 0 ? Math.max(0, Math.min(100, Math.round(score / maximum * 100))) : null;
}

export default async function AdminStudentDetailPage({ params }: { params: Promise<{ studentId: string }> }) {
  await requireAdmin();
  const { studentId } = await params;
  if (!UUID.test(studentId)) notFound();
  const db = createAdminClient();
  const { data: profile, error: profileError } = await db.from('profiles')
    .select('id,email,full_name,plan,subject,enrolled_at,created_at,target_exam').eq('id', studentId).maybeSingle();
  if (profileError || !profile) notFound();

  const [submissionResult, activityResult, assignmentResult] = await Promise.all([
    db.from('exam_submissions').select('id,exam_slug,exam_name,mock_id,mock_title,total_score,total_max,total_label,skills,created_at')
      .eq('user_id', studentId).order('created_at', { ascending: false }).limit(200),
    db.from('daily_activity').select('activity_date').eq('user_id', studentId).order('activity_date', { ascending: false }).limit(365),
    db.from('student_assignments').select('id,title,instructions,resource_url,due_at,status,assigned_at,completed_at')
      .eq('student_id', studentId).order('assigned_at', { ascending: false }).limit(200),
  ]);
  if (submissionResult.error || activityResult.error || assignmentResult.error) throw new Error('No pudimos cargar la ficha del estudiante.');

  const attempts: StudentAttempt[] = (submissionResult.data ?? []).map((row) => {
    const exam = getStudentExamWorkspace(row.exam_slug);
    const score = scoreFor(row);
    return {
      id: row.id, examSlug: row.exam_slug, examName: exam?.name ?? row.exam_name, examFlag: exam?.flag ?? '',
      examHubHref: exam?.hubHref ?? '/examenes', mockId: row.mock_id, title: row.mock_title ?? 'Simulacro',
      createdAt: row.created_at, score, scoreLabel: row.total_label ?? (score === null ? 'Pendiente' : `${score}%`),
      reportHref: `/dashboard/student/resultados/${row.id}`, feedbackState: 'not-included', skills: parseSkillScores(row.skills),
    };
  });
  const preferredExam = typeof profile.target_exam === 'string' ? profile.target_exam : attempts[0]?.examSlug;
  const progress = buildStudentProgress(attempts, preferredExam, (activityResult.data ?? []).map((row) => String(row.activity_date)));
  const points = progress.points.slice(-10);
  const coordinates = points.map((point, index) => ({ ...point, x: points.length === 1 ? 300 : 30 + index * 540 / (points.length - 1), y: 145 - point.score * 1.15 }));
  const assignments = assignmentResult.data ?? [];
  const guided = profile.plan !== 'autodidacta';

  return <main className={styles.page}>
    <nav><Link href="/dashboard/admin">← Volver a estudiantes</Link><span>Ficha privada</span></nav>
    <header><div className={styles.avatar}>{(profile.full_name ?? profile.email ?? 'E')[0].toUpperCase()}</div><div><p>{profile.plan} · {profile.subject ?? 'Sin materia'}</p><h1>{profile.full_name ?? 'Estudiante'}</h1><span>{profile.email}</span></div></header>
    <section className={styles.metrics}>
      <article><span>Simulacros</span><strong>{attempts.length}</strong></article>
      <article><span>Promedio</span><strong>{progress.averageScore === null ? '—' : `${progress.averageScore}%`}</strong></article>
      <article><span>Días activos · 30 días</span><strong>{progress.activeDaysLast30}</strong></article>
      <article><span>Última actividad</span><strong>{dateLabel(progress.lastActiveAt)}</strong></article>
    </section>
    <section className={styles.card}>
      <div className={styles.cardHeader}><div><p>Seguimiento académico</p><h2>Curva de aprendizaje · {progress.examName ?? 'sin examen'}</h2></div><span>{progress.trendPoints === null ? 'Sin tendencia todavía' : `${progress.trendPoints >= 0 ? '+' : ''}${progress.trendPoints} puntos`}</span></div>
      <div className={styles.progressGrid}><div className={styles.chart}>{coordinates.length ? <svg viewBox="0 0 600 170" role="img" aria-label="Curva de resultados del estudiante">{[30,60,90].map((value) => <line key={value} x1="25" x2="575" y1={145-value*1.15} y2={145-value*1.15} />)}{coordinates.length > 1 ? <polyline points={coordinates.map((point) => `${point.x},${point.y}`).join(' ')} /> : null}{coordinates.map((point) => <g key={point.id}><circle cx={point.x} cy={point.y} r="6" /><text x={point.x} y={point.y-12}>{point.score}%</text></g>)}</svg> : <p>Sin resultados comparables.</p>}</div><div className={styles.insights}><article><span>Fortalezas</span>{progress.strengths.length ? progress.strengths.map((item) => <div key={item.name}><b>{item.name}</b><strong>{item.percentage}%</strong></div>) : <p>Sin datos por habilidad.</p>}</article><article><span>Por mejorar</span>{progress.improvements.length ? progress.improvements.map((item) => <div key={item.name}><b>{item.name}</b><strong>{item.percentage}%</strong></div>) : <p>Sin datos suficientes.</p>}</article></div></div>
    </section>
    <section className={styles.card}>
      <div className={styles.cardHeader}><div><p>Historial</p><h2>Exámenes realizados</h2></div><span>{attempts.length} registros</span></div>
      {attempts.length ? <div className={styles.examList}>{attempts.map((attempt) => <article key={attempt.id}><div><span>{dateLabel(attempt.createdAt)} · {attempt.examFlag} {attempt.examName}</span><h3>{attempt.title}</h3></div><strong>{attempt.scoreLabel}</strong></article>)}</div> : <p className={styles.empty}>Aún no ha presentado simulacros.</p>}
    </section>
    <section className={styles.card}>
      <div className={styles.cardHeader}><div><p>Acompañamiento</p><h2>Asignaciones</h2></div><span>{assignments.filter((item) => item.status === 'assigned').length} pendientes</span></div>
      {guided ? <form action={createStudentAssignment} className={styles.assignmentForm}>
        <input type="hidden" name="studentId" value={studentId} />
        <label><span>Título</span><input name="title" required maxLength={140} placeholder="Ej. Writing Task 2" /></label>
        <label><span>Fecha de entrega</span><input name="dueAt" type="datetime-local" /></label>
        <label className={styles.formWide}><span>Instrucciones</span><textarea name="instructions" maxLength={4000} rows={4} placeholder="Qué debe hacer y cómo entregarlo" /></label>
        <label className={styles.formWide}><span>Enlace o material</span><input name="resourceUrl" placeholder="/practica/... o https://..." /></label>
        <button type="submit">Asignar tarea</button>
      </form> : <p className={styles.notice}>Este perfil figura como autodidacta. Cambia su plan desde la lista de estudiantes para habilitar asignaciones.</p>}
      {assignments.length ? <div className={styles.assignmentList}>{assignments.map((assignment) => <article key={assignment.id}><div><span>{assignment.status === 'completed' ? 'Completada' : assignment.status === 'canceled' ? 'Cancelada' : assignment.due_at ? `Entrega ${dateLabel(assignment.due_at)}` : 'Pendiente'}</span><h3>{assignment.title}</h3><p>{assignment.instructions}</p></div>{assignment.status === 'assigned' ? <form action={cancelStudentAssignment}><input type="hidden" name="studentId" value={studentId} /><input type="hidden" name="assignmentId" value={assignment.id} /><button type="submit">Cancelar</button></form> : null}</article>)}</div> : <p className={styles.empty}>Todavía no hay asignaciones.</p>}
    </section>
  </main>;
}
