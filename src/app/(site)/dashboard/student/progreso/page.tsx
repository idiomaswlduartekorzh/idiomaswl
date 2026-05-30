import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ProgresoClient from './ProgresoClient'

// Korean steps metadata (same as main dashboard)
const KOREAN_STEPS = [
  { day: 1, title: 'Annyeonghaseyo', sub: 'Saludos básicos' },
  { day: 2, title: 'Café I',         sub: 'Pedir bebidas' },
  { day: 3, title: 'Café II',        sub: 'Vocabulario extendido' },
  { day: 4, title: 'Café III',       sub: 'Demostrativos + números' },
  { day: 6, title: 'Mercado',        sub: 'Compras y precios' },
  { day: 7, title: 'Transporte',     sub: 'Cómo pedir taxi' },
]

const EXAM_COLOURS: Record<string, string> = {
  ielts:      '#c8202e',
  toefl:      '#1a6e3c',
  icfes:      '#0f7c3e',
  goethe:     '#1a2ecc',
  'delf-dalf':'#1a2ecc',
  'cils-celi':'#b45309',
  'celpe-bras':'#166534',
  topik:      '#c8202e',
}

export interface ExamEntry {
  id: string
  name: string
  mockTitle: string
  pct: number
  color: string
  date: string
  slug: string
}

export interface KoreanStep {
  day: number
  title: string
  sub: string
  done: boolean
}

export interface ActivityDay {
  date: string // YYYY-MM-DD
  active: boolean
}

export default async function ProgresoPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // ── Profile ────────────────────────────────────────────────────────────────
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id)
    .single()

  const name =
    profile?.full_name ||
    user.user_metadata?.full_name ||
    user.email?.split('@')[0] ||
    'Estudiante'

  // ── All exam submissions ───────────────────────────────────────────────────
  const { data: submissions } = await supabase
    .from('exam_submissions')
    .select('id, exam_slug, exam_name, mock_title, total_score, total_max, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(50)

  const exams: ExamEntry[] = (submissions ?? []).map(s => ({
    id:        s.id,
    name:      s.exam_name as string,
    mockTitle: (s.mock_title as string) ?? '',
    pct:       s.total_max > 0 ? Math.round((s.total_score / s.total_max) * 100) : 0,
    color:     EXAM_COLOURS[s.exam_slug as string] ?? '#1a2ecc',
    date:      s.created_at as string,
    slug:      s.exam_slug as string,
  }))

  // ── Korean progress ────────────────────────────────────────────────────────
  const { data: progressRows } = await supabase
    .from('user_progress')
    .select('step_id')
    .eq('user_id', user.id)
    .eq('course_slug', 'korean')

  const completedIds = new Set((progressRows ?? []).map(r => String(r.step_id)))
  const koreanSteps: KoreanStep[] = KOREAN_STEPS.map(s => ({
    ...s,
    done: completedIds.has(String(s.day)),
  }))

  // ── Activity calendar (last 70 days) ──────────────────────────────────────
  const { data: activityRows } = await supabase
    .from('daily_activity')
    .select('activity_date')
    .eq('user_id', user.id)
    .order('activity_date', { ascending: false })
    .limit(365)

  const activeDates = new Set((activityRows ?? []).map(r => String(r.activity_date)))

  // Build last 70 days grid (10 weeks × 7 days)
  const activityDays: ActivityDay[] = []
  const today = new Date()
  for (let i = 69; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const dateStr = d.toISOString().slice(0, 10)
    activityDays.push({ date: dateStr, active: activeDates.has(dateStr) })
  }

  return (
    <ProgresoClient
      name={name}
      exams={exams}
      koreanSteps={koreanSteps}
      activityDays={activityDays}
      totalActive={activeDates.size}
    />
  )
}
