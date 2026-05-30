import { createClient } from '@/lib/supabase/server'
import ZhannaDashboard from './ZhannaDashboard'

export interface ZhannaRealData {
  totalStudents: number
  weekSimulacros: number
}

export default async function ZhannaDashboardServer() {
  const supabase = await createClient()

  // Real student count
  const { count: studentCount } = await supabase
    .from('profiles')
    .select('id', { count: 'exact', head: true })
    .eq('role', 'student')

  // This week's exam submissions
  const startOfThisWeek = new Date()
  startOfThisWeek.setDate(startOfThisWeek.getDate() - startOfThisWeek.getDay())
  startOfThisWeek.setHours(0, 0, 0, 0)

  const { count: weekSimulacros } = await supabase
    .from('exam_submissions')
    .select('id', { count: 'exact', head: true })
    .gte('created_at', startOfThisWeek.toISOString())

  return (
    <ZhannaDashboard
      realData={{
        totalStudents: studentCount ?? 0,
        weekSimulacros: weekSimulacros ?? 0,
      }}
    />
  )
}
