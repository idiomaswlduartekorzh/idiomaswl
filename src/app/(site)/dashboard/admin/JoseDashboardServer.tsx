import { createClient } from '@/lib/supabase/server'
import JoseDashboard from './JoseDashboard'

export interface ExamSubmission {
  id: string
  user_id: string | null
  user_email: string | null
  user_name: string | null
  exam_slug: string
  exam_name: string
  mock_title: string | null
  total_score: number | null
  total_max: number | null
  total_label: string | null
  skills: unknown
  created_at: string
}

export interface DashboardData {
  submissions: ExamSubmission[]
  totalCount: number
  thisWeekCount: number
  lastWeekCount: number
  perExam: { exam_slug: string; exam_name: string; count: number }[]
  recentSubmissions: ExamSubmission[]
  topUsers: { user_email: string; count: number }[]
}

export default async function JoseDashboardServer() {
  const supabase = await createClient()

  const { data: submissions } = await supabase
    .from('exam_submissions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)

  const rows: ExamSubmission[] = submissions ?? []

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

  const dashboardData: DashboardData = {
    submissions: rows,
    totalCount: rows.length,
    thisWeekCount,
    lastWeekCount,
    perExam,
    recentSubmissions: rows.slice(0, 10),
    topUsers,
  }

  return <JoseDashboard data={dashboardData} />
}
