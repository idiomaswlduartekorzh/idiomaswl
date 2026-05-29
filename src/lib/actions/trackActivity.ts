'use server'

import { createClient } from '@/lib/supabase/server'

/**
 * Records today as an active day for the current user.
 * Uses upsert so calling it multiple times per day is a no-op.
 * Called once per dashboard page load.
 */
export async function trackDailyActivity(): Promise<void> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const today = new Date().toISOString().slice(0, 10) // 'YYYY-MM-DD'

  await supabase
    .from('daily_activity')
    .upsert(
      { user_id: user.id, activity_date: today },
      { onConflict: 'user_id,activity_date' }
    )
}

/**
 * Calculate the current streak from a sorted list of date strings ('YYYY-MM-DD').
 * Counts consecutive days backwards from today.
 */
export function calculateStreak(dates: string[]): number {
  if (!dates.length) return 0

  const sorted = [...dates].sort().reverse()
  const today = new Date()
  // Also accept yesterday as the streak start (user hasn't visited yet today)
  const todayStr   = today.toISOString().slice(0, 10)
  const yesterday  = new Date(today)
  yesterday.setDate(today.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().slice(0, 10)

  // Streak must start from today or yesterday
  if (sorted[0] !== todayStr && sorted[0] !== yesterdayStr) return 0

  let streak = 0
  let expected = sorted[0]

  for (const date of sorted) {
    if (date === expected) {
      streak++
      const d = new Date(expected)
      d.setDate(d.getDate() - 1)
      expected = d.toISOString().slice(0, 10)
    } else {
      break
    }
  }

  return streak
}
