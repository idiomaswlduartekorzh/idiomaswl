/**
 * Calculate the current streak from a sorted list of date strings ('YYYY-MM-DD').
 * Counts consecutive days backwards from today.
 */
export function calculateStreak(dates: string[]): number {
  if (!dates.length) return 0

  const sorted = [...dates].sort().reverse()
  const today = new Date()
  const todayStr    = today.toISOString().slice(0, 10)
  const yesterday   = new Date(today)
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
