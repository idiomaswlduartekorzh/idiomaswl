import { requireAdmin } from '@/lib/auth/require-admin.server'
import { createAdminClient } from '@/lib/supabase/admin'
import JoseDashboard from './JoseDashboard'
import type { StudentProgressRow, StudentRow } from './StudentList'
import type { StudentPlan } from '@/lib/actions/assignPlan'
import type { StudentSubject } from '@/lib/actions/inviteStudent'
import { EXAMS } from '@/data/exams'
import type { FullAssessment } from '@/lib/labs/types'
import type { IeltsSpeakingAssessment } from '@/lib/ielts/delegated-review'

export interface ExamSubmission {
  id: string
  user_id: string | null
  user_email: string | null
  user_name: string | null
  exam_slug: string
  exam_name: string
  mock_title: string | null
  mock_id?: string | null
  total_score: number | null
  total_max: number | null
  total_label: string | null
  skills: unknown
  created_at: string
  // IELTS admin-review fields
  writing_task1_answer?: string | null
  writing_task2_answer?: string | null
  speaking_answers?: Record<string, string> | null
  speaking_audio_paths?: Record<string, string> | null
  speaking_audio_files?: { questionId: string; signedUrl: string }[]
  submission_status?: 'uploading' | 'submitted'
  reading_band?: number | null
  listening_band?: number | null
  writing_band?: number | null
  speaking_band?: number | null
  writing_task1_assessment?: FullAssessment | null
  writing_task2_assessment?: FullAssessment | null
  writing_task1_delegated_assessment?: FullAssessment | null
  writing_task2_delegated_assessment?: FullAssessment | null
  speaking_assessment?: IeltsSpeakingAssessment | null
  toefl_speaking_repeat_assessment?: { score: number; evidenceNotes: string; reviewedAt?: string; reviewedBy?: string } | null
  toefl_speaking_interview_assessment?: { score: number; evidenceNotes: string; reviewedAt?: string; reviewedBy?: string } | null
  reviewed_at?: string | null
  reviewed_by?: string | null
}

export interface LeadRow {
  id: string
  name: string | null
  whatsapp: string | null
  email: string | null
  exam_slug: string | null
  exam_score: string | null
  source: string | null
  created_at: string
  /** Nombre legible del examen ('ICFES', 'SAT', 'IELTS'...). Se resuelve en el
   *  servidor para no arrastrar todo `EXAMS` al bundle del cliente. */
  exam_label: string | null
}

export interface DashboardData {
  submissions: ExamSubmission[]
  totalCount: number
  thisWeekCount: number
  lastWeekCount: number
  perExam: { exam_slug: string; exam_name: string; count: number }[]
  recentSubmissions: ExamSubmission[]
  topUsers: { user_email: string; count: number }[]
  ieltsReviews: ExamSubmission[]
  toeflReviews: ExamSubmission[]
  students: StudentRow[]
  /** Leads de TODOS los simulacros (ICFES, SAT, IELTS, TOPIK...), no solo ICFES. */
  leads: LeadRow[]
}

// ── Resolución del examen de un lead ─────────────────────────────────────────
// Los leads de simulacro llegan por dos rutas y hay que reconocer las dos:
//   · PracticeClient  → source '<examen>-practica'  (icfes-practica, sat-practica…)
//   · LeadCaptureModal→ source 'simulacro'          (IELTS, TOPIK…)
// El source 'blog' queda fuera a propósito: no es un simulacro y su `exam_score`
// guarda una categoría de blog, no un puntaje.
const LEADS_SOURCE_FILTER = 'source.like.*-practica,source.eq.simulacro'
const PRACTICA_SUFFIX = /-practica$/

/** El slug del examen: primero el campo propio; si falta, se deduce del source. */
function leadExamSlug(examSlug: string | null, source: string | null): string | null {
  const own = examSlug?.trim()
  if (own) return own
  if (source && PRACTICA_SUFFIX.test(source)) {
    const derived = source.replace(PRACTICA_SUFFIX, '').trim()
    if (derived) return derived
  }
  return null
}

/** Nombre legible del examen. Si el slug no está en EXAMS, se muestra en crudo
 *  antes que mentir: un examen nuevo se ve raro, pero se ve. */
function leadExamLabel(examSlug: string | null, source: string | null): string | null {
  const slug = leadExamSlug(examSlug, source)
  if (!slug) return null
  return EXAMS[slug]?.name ?? slug.toUpperCase()
}

function leadIdentity(email: string | null, examSlug: string | null): string | null {
  const cleanEmail = email?.trim().toLowerCase()
  const cleanSlug = examSlug?.trim().toLowerCase()
  return cleanEmail && cleanSlug ? `${cleanEmail}::${cleanSlug}` : null
}

export default async function JoseDashboardServer() {
  // All reads in the owner dashboard stay server-side. Authorization is based
  // on the immutable email registry, never on a user-editable profile role.
  await requireAdmin()
  const supabase = createAdminClient()

  // IELTS and TOEFL own independent queues so general exam traffic cannot push
  // valid attempts out of the admin panel. Audio links are generated lazily only
  // for the selected attempt.
  const [
    { data: submissions },
    { data: ieltsSubmissionRows },
    { data: toeflSubmissionRows },
  ] = await Promise.all([
    supabase
      .from('exam_submissions')
      .select('*')
      .eq('submission_status', 'submitted')
      .order('created_at', { ascending: false })
      .limit(100),
    supabase
      .from('exam_submissions')
      .select('*')
      .eq('exam_slug', 'ielts')
      .eq('submission_status', 'submitted')
      .order('created_at', { ascending: false })
      .limit(500),
    supabase
      .from('exam_submissions')
      .select('id, user_id, user_email, user_name, exam_slug, exam_name, mock_id, mock_title, total_score, total_max, total_label, created_at, writing_task1_answer, writing_task2_answer, speaking_audio_paths, writing_task1_assessment, writing_task2_assessment, toefl_speaking_repeat_assessment, toefl_speaking_interview_assessment, reviewed_at, reviewed_by, submission_status')
      .eq('exam_slug', 'toefl')
      .eq('submission_status', 'submitted')
      .order('created_at', { ascending: false })
      .limit(500),
  ])

  const rows = (submissions ?? []) as ExamSubmission[]

  const now = new Date()
  const startOfThisWeek = new Date(now)
  startOfThisWeek.setDate(now.getDate() - now.getDay())
  startOfThisWeek.setHours(0, 0, 0, 0)

  const startOfLastWeek = new Date(startOfThisWeek)
  startOfLastWeek.setDate(startOfThisWeek.getDate() - 7)

  const thisWeekCount = rows.filter(r => new Date(r.created_at) >= startOfThisWeek).length
  const lastWeekCount = rows.filter(r => {
    const d = new Date(r.created_at)
    return d >= startOfLastWeek && d < startOfThisWeek
  }).length

  // Per-exam breakdown
  const examMap = new Map<string, { exam_name: string; count: number }>()
  for (const r of rows) {
    const existing = examMap.get(r.exam_slug)
    if (existing) {
      existing.count++
    } else {
      examMap.set(r.exam_slug, { exam_name: r.exam_name, count: 1 })
    }
  }
  const perExam = Array.from(examMap.entries())
    .map(([exam_slug, v]) => ({ exam_slug, exam_name: v.exam_name, count: v.count }))
    .sort((a, b) => b.count - a.count)

  // Top users by submission count
  const userMap = new Map<string, number>()
  for (const r of rows) {
    if (!r.user_email) continue
    userMap.set(r.user_email, (userMap.get(r.user_email) ?? 0) + 1)
  }
  const topUsers = Array.from(userMap.entries())
    .map(([user_email, count]) => ({ user_email, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  // IELTS review history stays visible after correction. The client panel owns
  // the Pending/Reviewed filter, so an evaluated student never disappears.
  const ieltsReviews = ((ieltsSubmissionRows ?? []) as ExamSubmission[]).filter(r =>
    Boolean(r.writing_task1_answer || r.writing_task2_answer || r.speaking_answers || r.speaking_audio_paths)
  )
  const toeflReviews = ((toeflSubmissionRows ?? []) as ExamSubmission[]).filter(r =>
    Boolean(r.writing_task1_answer || r.writing_task2_answer || r.speaking_audio_paths)
  )

  // ── Students list ────────────────────────────────────────────────────────────
  const [
    { data: profileRows },
    { data: progressRows },
    { data: activityRows },
  ] = await Promise.all([
    supabase
      .from('profiles')
      .select('id, email, full_name, plan, subject, enrolled_at, created_at')
      .eq('role', 'user')
      .order('created_at', { ascending: false }),
    supabase
      .from('user_progress')
      .select('user_id, course_slug, step_id, last_stage, completed_at')
      .order('completed_at', { ascending: false })
      .limit(5000),
    supabase
      .from('daily_activity')
      .select('user_id, activity_date')
      .order('activity_date', { ascending: false })
      .limit(10000),
  ])

  // Build simulacro count per user from existing submissions
  const simCountMap = new Map<string, number>()
  for (const r of rows) {
    if (!r.user_id) continue
    simCountMap.set(r.user_id, (simCountMap.get(r.user_id) ?? 0) + 1)
  }

  // Last active date per user (most recent submission)
  const lastActiveMap = new Map<string, string>()
  for (const r of rows) {
    if (!r.user_id) continue
    if (!lastActiveMap.has(r.user_id)) lastActiveMap.set(r.user_id, r.created_at)
  }

  const progressMap = new Map<string, StudentProgressRow[]>()
  for (const row of progressRows ?? []) {
    const progress: StudentProgressRow = {
      course_slug: String(row.course_slug),
      step_id: String(row.step_id),
      last_stage: row.last_stage ? String(row.last_stage) : null,
      completed_at: String(row.completed_at),
    }
    const current = progressMap.get(String(row.user_id)) ?? []
    current.push(progress)
    progressMap.set(String(row.user_id), current)
  }

  const activeDaysMap = new Map<string, number>()
  for (const row of activityRows ?? []) {
    const userId = String(row.user_id)
    activeDaysMap.set(userId, (activeDaysMap.get(userId) ?? 0) + 1)
    const activityAt = `${String(row.activity_date)}T00:00:00.000Z`
    const previous = lastActiveMap.get(userId)
    if (!previous || new Date(activityAt) > new Date(previous)) {
      lastActiveMap.set(userId, activityAt)
    }
  }

  for (const [userId, progress] of progressMap) {
    const completedAt = progress[0]?.completed_at
    const previous = lastActiveMap.get(userId)
    if (completedAt && (!previous || new Date(completedAt) > new Date(previous))) {
      lastActiveMap.set(userId, completedAt)
    }
  }

  const students: StudentRow[] = (profileRows ?? [])
    .filter(p => typeof p.email === 'string' && p.email.length > 0)
    .map(p => ({
      id:              p.id,
      email:           p.email,
      full_name:       p.full_name ?? null,
      plan:            (p.plan as StudentPlan) ?? 'autodidacta',
      subject:         (p.subject as StudentSubject | null) ?? null,
      enrolled_at:     p.enrolled_at ?? p.created_at ?? null,
      simulacro_count: simCountMap.get(p.id) ?? 0,
      completed_steps: progressMap.get(p.id)?.length ?? 0,
      active_days:     activeDaysMap.get(p.id) ?? 0,
      last_active:     lastActiveMap.get(p.id) ?? null,
      progress:        progressMap.get(p.id) ?? [],
    }))

  // ── Leads de simulacros (formulario de captura) ─────────────────────────────
  // NO filtrar por un examen concreto: el patrón '<examen>-practica' cubre a los
  // que vengan (SAT ya, y los siguientes) sin tener que volver a tocar esto.
  const leadsSelect = () => supabase
    .from('leads')
    .select('id, name, whatsapp, email, exam_slug, exam_score, source, created_at')
    .order('created_at', { ascending: false })
    .limit(300)

  let { data: leadsData } = await leadsSelect().or(LEADS_SOURCE_FILTER)

  if (!leadsData) {
    // Red de seguridad: si el filtro compuesto falla, el panel de David no se
    // queda en blanco — al menos salen los leads de simulacro de tipo '-practica'.
    const fallback = await leadsSelect().like('source', '%-practica')
    leadsData = fallback.data
  }

  const storedLeads: LeadRow[] = ((leadsData ?? []) as Omit<LeadRow, 'exam_label'>[]).map(l => ({
    ...l,
    exam_label: leadExamLabel(l.exam_slug, l.source),
  }))

  // Antes de septiembre de 2026, IELTS y TOEFL sí guardaban nombre/correo en
  // exam_submissions, pero no creaban una fila en leads. Recuperamos esos
  // contactos históricos en la vista sin inventar el WhatsApp que nunca se pidió.
  const storedIdentities = new Set(
    storedLeads.flatMap(lead => {
      const identity = leadIdentity(lead.email, leadExamSlug(lead.exam_slug, lead.source))
      return identity ? [identity] : []
    })
  )
  const submissionMap = new Map<string, ExamSubmission>()
  for (const submission of [
    ...rows,
    ...((ieltsSubmissionRows ?? []) as ExamSubmission[]),
    ...((toeflSubmissionRows ?? []) as ExamSubmission[]),
  ]) {
    if (!submissionMap.has(submission.id)) submissionMap.set(submission.id, submission)
  }

  const recoveredIdentities = new Set(storedIdentities)
  const historicalSubmissionLeads: LeadRow[] = Array.from(submissionMap.values())
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .filter(submission => {
      const identity = leadIdentity(submission.user_email, submission.exam_slug)
      if (!identity || recoveredIdentities.has(identity)) return false
      recoveredIdentities.add(identity)
      return true
    })
    .map(submission => ({
      id: `submission-${submission.id}`,
      name: submission.user_name,
      whatsapp: null,
      email: submission.user_email,
      exam_slug: submission.exam_slug,
      exam_score: submission.total_label,
      source: 'exam_submission_historic',
      created_at: submission.created_at,
      exam_label: leadExamLabel(submission.exam_slug, 'exam_submission_historic'),
    }))

  const leads = [...storedLeads, ...historicalSubmissionLeads]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 300)

  const dashboardData: DashboardData = {
    submissions: rows,
    totalCount: rows.length,
    thisWeekCount,
    lastWeekCount,
    perExam,
    recentSubmissions: rows.slice(0, 10),
    topUsers,
    ieltsReviews,
    toeflReviews,
    students,
    leads,
  }

  return <JoseDashboard data={dashboardData} />
}
