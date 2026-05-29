import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import StudentDashboardClient from './StudentDashboardClient'
import type { RecentExam, DashboardStats } from './StudentDashboardClient'

// Korean lessons shown in the dashboard grid (step IDs match /courses/korean/step/[n])
const KOREAN_STEPS = [
  { day: 1, title: 'Annyeonghaseyo', sub: 'Saludos básicos' },
  { day: 2, title: 'Café I',         sub: 'Pedir bebidas' },
  { day: 3, title: 'Café II',        sub: 'Vocabulario extendido' },
  { day: 4, title: 'Café III',       sub: 'Demostrativos + números' },
  { day: 6, title: 'Mercado',        sub: 'Compras y precios' },
  { day: 7, title: 'Transporte',     sub: 'Cómo pedir taxi' },
]

// Exam slug → brand colour (used for progress cards)
const EXAM_COLOURS: Record<string, string> = {
  ielts: '#c8202e',
  toefl: '#1a6e3c',
  icfes: '#0f7c3e',
  goethe: '#1a2ecc',
  'delf-dalf': '#1a2ecc',
  'cils-celi': '#b45309',
  'celpe-bras': '#166534',
  topik: '#c8202e',
}

export default async function StudentDashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, role')
    .eq('id', user.id)
    .single()

  const name =
    profile?.full_name ||
    user.user_metadata?.full_name ||
    user.email?.split('@')[0] ||
    'Estudiante'

  // ── Fetch real exam stats ────────────────────────────────────────────────────
  const { data: submissions } = await supabase
    .from('exam_submissions')
    .select('exam_slug, exam_name, mock_title, total_score, total_max, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(50)

  let stats: DashboardStats = { simulacros: 0, mejorScore: 0, diasActivo: 0 }
  let recentExams: RecentExam[] = []

  if (submissions && submissions.length > 0) {
    // Total simulacros
    stats.simulacros = submissions.length

    // Best score (as percentage)
    const scores = submissions
      .filter(s => s.total_max > 0)
      .map(s => Math.round((s.total_score / s.total_max) * 100))
    stats.mejorScore = scores.length > 0 ? Math.max(...scores) : 0

    // Unique active days
    const uniqueDays = new Set(
      submissions
        .filter(s => s.created_at)
        .map(s => new Date(s.created_at as string).toISOString().slice(0, 10))
    )
    stats.diasActivo = uniqueDays.size

    // Last 3 unique exam attempts for "Continúa practicando"
    const seen = new Set<string>()
    for (const s of submissions) {
      const key = `${s.exam_slug}/${s.mock_title}`
      if (seen.has(key)) continue
      seen.add(key)
      const pct = s.total_max > 0 ? Math.round((s.total_score / s.total_max) * 100) : 0
      recentExams.push({
        name: s.exam_name as string,
        subtitle: s.mock_title as string,
        pct,
        color: EXAM_COLOURS[s.exam_slug as string] ?? '#1a2ecc',
        slug: s.exam_slug as string,
      })
      if (recentExams.length === 3) break
    }
  }

  // ── Fetch Korean lesson progress ────────────────────────────────────────────
  const { data: progressRows } = await supabase
    .from('user_progress')
    .select('step_id')
    .eq('user_id', user.id)
    .eq('course_slug', 'korean')

  const completedStepIds = new Set(
    (progressRows ?? []).map(r => String(r.step_id))
  )

  const koreanLessons = KOREAN_STEPS.map(step => ({
    ...step,
    done: completedStepIds.has(String(step.day)),
  }))

  return (
    <StudentDashboardClient
      name={name}
      stats={stats}
      recentExams={recentExams}
      koreanLessons={koreanLessons}
    />
  )
}
