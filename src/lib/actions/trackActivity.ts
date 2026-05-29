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

