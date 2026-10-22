import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cancelStudentAssignment, createStudentAssignment, giveStudentAssignmentFeedback } from '@/lib/actions/studentAssignments';
import { addStudentNote, grantStudentExamAccess, resendStudentAccess, revokeStudentExamAccess, sendStudentMessage, updateStudentAcademicProfile } from '@/lib/actions/studentOperations';
import { requireAdmin } from '@/lib/auth/require-admin.server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getStudentExamWorkspace } from '@/lib/student-dashboard/catalog';
import { buildStudentProgress, parseSkillScores } from '@/lib/student-dashboard/progress';
import { WELEARN_LANGUAGE_OPTIONS, XPRESS_EXAM_OPTIONS } from '@/lib/student-onboarding/catalog';
import type { StudentAttempt } from '@/lib/student-dashboard/types';
import styles from './student-detail.module.css';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const SUBJECT_OPTIONS = [
  ['fce', 'Cambridge B2 First'], ['ielts', 'IELTS'], ['toefl', 'TOEFL iBT'], ['sat', 'SAT'],
  ['icfes', 'ICFES Saber 11'], ['goethe', 'Goethe-Zertifikat'], ['delf-dalf', 'DELF / DALF'],
  ['cils-celi', 'CILS / CELI'], ['topik', 'TOPIK'], ['celpe-bras', 'CELPE-BRAS'],
] as const;

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
    .select('id,email,full_name,plan,subject,language,level,student_path,enrolled_at,created_at,target_exam').eq('id', studentId).maybeSingle();
  if (profileError || !profile) notFound();

  const [submissionResult, activityResult, assignmentResult, grantResult, membershipResult, communicationResult, noteResult] = await Promise.all([
    db.from('exam_submissions').select('id,exam_slug,exam_name,mock_id,mock_title,total_score,total_max,total_label,skills,created_at')
      .eq('user_id', studentId).order('created_at', { ascending: false }).limit(200),
    db.from('daily_activity').select('activity_date').eq('user_id', studentId).order('activity_date', { ascending: false }).limit(365),
    db.from('student_assignments').select('id,title,instructions,resource_url,due_at,status,assigned_at,completed_at,submission_text,submission_url,submitted_at,teacher_feedback,feedback_at')
      .eq('student_id', studentId).order('assigned_at', { ascending: false }).limit(200),
    db.from('exam_access_grants').select('id,exam_slug,source,plan_id,status,starts_at,ends_at,source_reference,created_at,updated_at')
      .eq('user_id', studentId).order('created_at', { ascending: false }).limit(100),
    db.from('xpress_memberships').select('id,exam_slug,offer_id,status,starts_at,ends_at,created_at')
      .eq('user_id', studentId).order('created_at', { ascending: false }).limit(100),
    db.from('student_communications').select('id,kind,recipient_email,subject,status,provider_message_id,error_message,sent_at,created_at')
      .eq('student_id', studentId).order('created_at', { ascending: false }).limit(100),
    db.from('student_notes').select('id,note,pinned,created_at').eq('student_id', studentId)
      .order('pinned', { ascending: false }).order('created_at', { ascending: false }).limit(100),
  ]);
  if ([submissionResult, activityResult, assignmentResult, grantResult, membershipResult, communicationResult, noteResult].some((result) => result.error)) throw new Error('No pudimos cargar la ficha del estudiante.');

  const attempts: StudentAttempt[] = (submissionResult.data ?? []).map((row) => {
    const exam = getStudentExamWorkspace(row.exam_slug);
    const score = scoreFor(row);
    return {
      id: row.id, examSlug: row.exam_slug, examName: exam?.name ?? row.exam_name, examFlag: exam?.flag ?? '',
      examHubHref: exam?.hubHref ?? '/examenes', mockId: row.mock_id, title: row.mock_title ?? 'Simulacro',
      createdAt: row.created_at, score, scoreLabel: row.total_label ?? (score === null ? 'Pendiente' : `${score}%`),
      reportHref: `/dashboard/student/resultados/${row.id}`, reportAvailable: true, feedbackState: 'not-included', skills: parseSkillScores(row.skills),
    };
  });
  const preferredExam = typeof profile.target_exam === 'string' ? profile.target_exam : attempts[0]?.examSlug;
  const progress = buildStudentProgress(attempts, preferredExam, (activityResult.data ?? []).map((row) => String(row.activity_date)));
  const points = progress.points.slice(-10);
  const coordinates = points.map((point, index) => ({ ...point, x: points.length === 1 ? 300 : 30 + index * 540 / (points.length - 1), y: 145 - point.score * 1.15 }));
  const assignments = assignmentResult.data ?? [];
  const grants = grantResult.data ?? [];
  const memberships = membershipResult.data ?? [];
  const communications = communicationResult.data ?? [];
  const notes = noteResult.data ?? [];
  const activeGrants = grants.filter((item) => item.status === 'active');
  const activeMemberships = memberships.filter((item) => item.status === 'active');
  const guided = profile.plan !== 'autodidacta';

  return <main className={styles.page}>
    <nav><Link href="/dashboard/admin">← Volver a estudiantes</Link><span>Ficha privada</span></nav>
    <header><div className={styles.avatar}>{(profile.full_name ?? profile.email ?? 'E')[0].toUpperCase()}</div><div><p>{profile.plan} · {profile.subject ?? 'Sin materia'} · {profile.language ?? 'Sin idioma'} {profile.level ?? ''}</p><h1>{profile.full_name ?? 'Estudiante'}</h1><span>{profile.email}</span></div><div className={styles.heroPills} aria-hidden="true"><i /><i /></div></header>
    <section className={styles.metrics}>
      <article><span>Simulacros</span><strong>{attempts.length}</strong></article>
      <article><span>Promedio</span><strong>{progress.averageScore === null ? '—' : `${progress.averageScore}%`}</strong></article>
      <article><span>Días activos · 30 días</span><strong>{progress.activeDaysLast30}</strong></article>
      <article><span>Última actividad</span><strong>{dateLabel(progress.lastActiveAt)}</strong></article>
    </section>
    <section className={styles.operationsGrid} aria-label="Centro operativo del estudiante">
      <article className={styles.card}>
        <div className={styles.cardHeader}><div><p>Configuración</p><h2>Perfil académico</h2></div><span>Editable</span></div>
        <form action={updateStudentAcademicProfile} className={styles.operationForm}>
          <input type="hidden" name="studentId" value={studentId} />
          <label><span>Plan</span><select name="plan" defaultValue={profile.plan ?? 'autodidacta'}><option value="autodidacta">Autodidacta</option><option value="preparacion">Preparación</option><option value="intensivo">Intensivo</option></select></label>
          <label><span>Idioma</span><select name="language" defaultValue={profile.language ?? 'ingles'}>{WELEARN_LANGUAGE_OPTIONS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
          <label><span>Nivel</span><select name="level" defaultValue={profile.level ?? 'B2'}>{['A1','A2','B1','B2','C1','C2','Por diagnosticar'].map((level) => <option key={level} value={level}>{level}</option>)}</select></label>
          <label><span>Materia / ruta</span><select name="subject" defaultValue={profile.subject ?? 'fce'}>{SUBJECT_OPTIONS.map(([value,label]) => <option key={value} value={value}>{label}</option>)}</select></label>
          <button type="submit">Guardar perfil</button>
        </form>
      </article>
      <article className={styles.card}>
        <div className={styles.cardHeader}><div><p>Permisos</p><h2>Accesos a exámenes</h2></div><span>{activeGrants.length + activeMemberships.length} activos</span></div>
        <form action={grantStudentExamAccess} className={styles.inlineForm}><input type="hidden" name="studentId" value={studentId} /><select name="examSlug" required defaultValue="cambridge-b2">{XPRESS_EXAM_OPTIONS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select><button type="submit">Conceder acceso</button></form>
        <div className={styles.accessList}>
          {activeGrants.map((grant) => <article key={grant.id}><div><strong>{XPRESS_EXAM_OPTIONS.find((item) => item.id === grant.exam_slug)?.label ?? grant.exam_slug}</strong><span>Acceso académico · desde {dateLabel(grant.starts_at)}</span></div><form action={revokeStudentExamAccess}><input type="hidden" name="studentId" value={studentId} /><input type="hidden" name="examSlug" value={grant.exam_slug} /><input aria-label={`Motivo para revocar ${grant.exam_slug}`} name="reason" required minLength={3} maxLength={500} placeholder="Motivo" /><button type="submit">Revocar</button></form></article>)}
          {activeMemberships.map((membership) => <article key={membership.id}><div><strong>{XPRESS_EXAM_OPTIONS.find((item) => item.id === membership.exam_slug)?.label ?? membership.exam_slug}</strong><span>Compra {membership.offer_id} · vence {dateLabel(membership.ends_at)}</span></div><em>Gestionado por suscripción</em></article>)}
          {!activeGrants.length && !activeMemberships.length ? <p className={styles.empty}>No tiene accesos activos.</p> : null}
        </div>
      </article>
    </section>
    <section className={styles.card}>
      <div className={styles.cardHeader}><div><p>Seguimiento académico</p><h2>Curva de aprendizaje · {progress.examName ?? 'sin examen'}</h2></div><span>{progress.trendPoints === null ? 'Sin tendencia todavía' : `${progress.trendPoints >= 0 ? '+' : ''}${progress.trendPoints} puntos`}</span></div>
      <div className={styles.progressGrid}><div className={styles.chart}>{coordinates.length ? <svg viewBox="0 0 600 170" role="img" aria-label="Curva de resultados del estudiante">{[30,60,90].map((value) => <line key={value} x1="25" x2="575" y1={145-value*1.15} y2={145-value*1.15} />)}{coordinates.length > 1 ? <polyline points={coordinates.map((point) => `${point.x},${point.y}`).join(' ')} /> : null}{coordinates.map((point) => <g key={point.id}><circle cx={point.x} cy={point.y} r="6" /><text x={point.x} y={point.y-12}>{point.score}%</text></g>)}</svg> : <p>Sin resultados comparables.</p>}</div><div className={styles.insights}><article><span>Fortalezas</span>{progress.strengths.length ? progress.strengths.map((item) => <div key={item.name}><b>{item.name}</b><strong>{item.percentage}%</strong></div>) : <p>Sin datos por habilidad.</p>}</article><article><span>Por mejorar</span>{progress.improvements.length ? progress.improvements.map((item) => <div key={item.name}><b>{item.name}</b><strong>{item.percentage}%</strong></div>) : <p>Sin datos suficientes.</p>}</article></div></div>
    </section>
    <section className={styles.card}>
      <div className={styles.cardHeader}><div><p>Historial</p><h2>Exámenes realizados</h2></div><span>{attempts.length} registros</span></div>
      {attempts.length ? <div className={styles.examList}>{attempts.map((attempt) => <article key={attempt.id}><div><span>{dateLabel(attempt.createdAt)} · {attempt.examFlag} {attempt.examName}</span><h3>{attempt.title}</h3></div><strong>{attempt.scoreLabel}</strong></article>)}</div> : <p className={styles.empty}>Aún no ha presentado simulacros.</p>}
    </section>
    <section className={styles.operationsGrid}>
      <article className={styles.card}>
        <div className={styles.cardHeader}><div><p>Comunicación</p><h2>Enviar mensaje</h2></div><span>Resend</span></div>
        <form action={sendStudentMessage} className={styles.messageForm}>
          <input type="hidden" name="studentId" value={studentId} />
          <label><span>Tipo</span><select name="kind" defaultValue="follow_up"><option value="follow_up">Seguimiento</option><option value="general">Mensaje general</option></select></label>
          <label><span>Asunto</span><input name="subject" required minLength={3} maxLength={180} placeholder="Seguimiento de tu proceso" /></label>
          <label className={styles.formWide}><span>Mensaje</span><textarea name="body" required maxLength={12000} rows={6} placeholder="Escribe el mensaje que recibirá por correo…" /></label>
          <button type="submit">Enviar correo</button>
        </form>
        <form action={resendStudentAccess} className={styles.secondaryAction}><input type="hidden" name="studentId" value={studentId} /><p>Renueva la contraseña temporal y envía nuevas credenciales.</p><button type="submit">Reenviar acceso</button></form>
        <div className={styles.timeline}>{communications.slice(0, 12).map((item) => <article key={item.id}><i data-status={item.status} /><div><strong>{item.subject}</strong><span>{item.kind} · {item.status} · {dateLabel(item.sent_at ?? item.created_at)}</span>{item.error_message ? <small>{item.error_message}</small> : null}</div></article>)}{!communications.length ? <p className={styles.empty}>No hay comunicaciones registradas.</p> : null}</div>
      </article>
      <article className={styles.card}>
        <div className={styles.cardHeader}><div><p>Equipo académico</p><h2>Notas privadas</h2></div><span>Solo admins</span></div>
        <form action={addStudentNote} className={styles.noteForm}><input type="hidden" name="studentId" value={studentId} /><textarea aria-label="Nueva nota privada" name="note" required maxLength={4000} rows={5} placeholder="Acuerdos, alertas, preferencias o próximos pasos…" /><label><input type="checkbox" name="pinned" /> Fijar nota</label><button type="submit">Guardar nota</button></form>
        <div className={styles.noteList}>{notes.map((note) => <article key={note.id} data-pinned={note.pinned}><span>{note.pinned ? 'Fijada · ' : ''}{dateLabel(note.created_at)}</span><p>{note.note}</p></article>)}{!notes.length ? <p className={styles.empty}>Aún no hay notas internas.</p> : null}</div>
      </article>
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
      {assignments.length ? <div className={styles.assignmentList}>{assignments.map((assignment) => <article key={assignment.id}><div><span>{assignment.status === 'completed' ? `Entregada ${dateLabel(assignment.submitted_at ?? assignment.completed_at)}` : assignment.status === 'canceled' ? 'Cancelada' : assignment.due_at ? `Entrega ${dateLabel(assignment.due_at)}` : 'Pendiente'}</span><h3>{assignment.title}</h3><p>{assignment.instructions}</p>{assignment.submission_text || assignment.submission_url ? <div className={styles.delivery}><strong>Entrega del estudiante</strong>{assignment.submission_text ? <p>{assignment.submission_text}</p> : null}{assignment.submission_url ? <a href={assignment.submission_url} target="_blank" rel="noreferrer">Abrir enlace entregado →</a> : null}</div> : null}{assignment.teacher_feedback ? <div className={styles.delivery}><strong>Retroalimentación enviada</strong><p>{assignment.teacher_feedback}</p></div> : null}{assignment.status === 'completed' ? <form action={giveStudentAssignmentFeedback} className={styles.feedbackForm}><input type="hidden" name="studentId" value={studentId} /><input type="hidden" name="assignmentId" value={assignment.id} /><textarea aria-label={`Retroalimentación para ${assignment.title}`} name="feedback" required maxLength={6000} rows={3} defaultValue={assignment.teacher_feedback ?? ''} placeholder="Retroalimentación para el estudiante" /><button type="submit">Guardar y notificar</button></form> : null}</div>{assignment.status === 'assigned' ? <form action={cancelStudentAssignment}><input type="hidden" name="studentId" value={studentId} /><input type="hidden" name="assignmentId" value={assignment.id} /><button type="submit">Cancelar</button></form> : null}</article>)}</div> : <p className={styles.empty}>Todavía no hay asignaciones.</p>}
    </section>
  </main>;
}
