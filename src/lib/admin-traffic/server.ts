import 'server-only'

import { createAdminClient } from '@/lib/supabase/admin'
import { PRESENCE_ACTIVE_WINDOW_SECONDS } from '@/lib/presence'

export interface AdminTrafficData {
  available: boolean
  limited: boolean
  observedSince: string | null
  daily: { day: string; visitors: number | null }[]
  visitors7d: number
  arrived15m: number
  inactive15m: number
  examPageVisitors7d: number
  examPageActiveNow: number
  topPages: { path: string; visitors: number }[]
  quietPages: { path: string; visitors: number }[]
}

type ReachRow = { day: string; session_key: string; path: string; first_seen: string }
type PresenceRow = { session_key: string; last_seen: string; path: string }

const MAX_ROWS = 10_000
const PAGE_SIZE = 1_000

function emptyTraffic(): AdminTrafficData {
  return {
    available: false, limited: false, observedSince: null,
    daily: [], visitors7d: 0, arrived15m: 0, inactive15m: 0,
    examPageVisitors7d: 0, examPageActiveNow: 0, topPages: [], quietPages: [],
  }
}

export async function loadAdminTrafficData(now = new Date()): Promise<AdminTrafficData> {
  const db = createAdminClient()
  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Bogota', year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(now)
  const dayStart = new Date(`${today}T00:00:00.000Z`)
  const firstDay = new Date(dayStart.getTime() - 6 * 86_400_000).toISOString().slice(0, 10)
  const fifteenMinutesAgo = new Date(now.getTime() - 15 * 60_000).toISOString()
  const activeCutoff = now.getTime() - PRESENCE_ACTIVE_WINDOW_SECONDS * 1_000

  const [firstReachPage, presenceResult] = await Promise.all([
    db.from('site_daily_page_reach')
      .select('day,session_key,path,first_seen', { count: 'exact' })
      .gte('day', firstDay)
      .order('day', { ascending: false })
      .order('session_key')
      .order('path')
      .range(0, PAGE_SIZE - 1),
    db.from('site_presence')
      .select('session_key,last_seen,path')
      .eq('visitor_kind', 'person')
      .gte('last_seen', fifteenMinutesAgo)
      .limit(PAGE_SIZE),
  ])

  if (firstReachPage.error || presenceResult.error) {
    console.error('[admin-traffic] unavailable:', firstReachPage.error?.code ?? presenceResult.error?.code ?? 'unknown')
    return emptyTraffic()
  }

  const reach = [...((firstReachPage.data ?? []) as ReachRow[])]
  const totalReachRows = firstReachPage.count ?? reach.length
  const rowsToRead = Math.min(totalReachRows, MAX_ROWS)
  for (let offset = PAGE_SIZE; offset < rowsToRead; offset += PAGE_SIZE) {
    const page = await db.from('site_daily_page_reach')
      .select('day,session_key,path,first_seen')
      .gte('day', firstDay)
      .order('day', { ascending: false })
      .order('session_key')
      .order('path')
      .range(offset, Math.min(offset + PAGE_SIZE, rowsToRead) - 1)
    if (page.error) {
      console.error('[admin-traffic] page unavailable:', page.error.code ?? 'unknown')
      return emptyTraffic()
    }
    reach.push(...((page.data ?? []) as ReachRow[]))
  }
  const presence = (presenceResult.data ?? []) as PresenceRow[]
  const dailyVisitors = new Map<string, Set<string>>()
  const pageVisitors = new Map<string, Set<string>>()
  const allVisitors = new Set<string>()
  const examVisitors = new Set<string>()
  const firstSeenToday = new Map<string, number>()
  let observedSince: string | null = null
  let firstObservedDay: string | null = null

  for (const row of reach) {
    allVisitors.add(row.session_key)
    if (!dailyVisitors.has(row.day)) dailyVisitors.set(row.day, new Set())
    dailyVisitors.get(row.day)!.add(row.session_key)
    if (!pageVisitors.has(row.path)) pageVisitors.set(row.path, new Set())
    pageVisitors.get(row.path)!.add(row.session_key)
    if (/^\/examenes\/[^/]+\/practica\//.test(row.path)) examVisitors.add(row.session_key)
    if (row.day === today) {
      const seenAt = Date.parse(row.first_seen)
      const previous = firstSeenToday.get(row.session_key)
      if (Number.isFinite(seenAt) && (previous === undefined || seenAt < previous)) {
        firstSeenToday.set(row.session_key, seenAt)
      }
    }
    if (!observedSince || row.first_seen < observedSince) observedSince = row.first_seen
    if (!firstObservedDay || row.day < firstObservedDay) firstObservedDay = row.day
  }

  const daily = Array.from({ length: 7 }, (_, index) => {
    const day = new Date(dayStart.getTime() - (6 - index) * 86_400_000).toISOString().slice(0, 10)
    return { day, visitors: firstObservedDay && day < firstObservedDay ? null : dailyVisitors.get(day)?.size ?? 0 }
  })
  const rankedPages = Array.from(pageVisitors, ([path, visitors]) => ({ path, visitors: visitors.size }))
  rankedPages.sort((a, b) => b.visitors - a.visitors || a.path.localeCompare(b.path))
  const inactive15m = presence.filter(row => Date.parse(row.last_seen) < activeCutoff).length
  const examPageActiveNow = presence.filter(row => Date.parse(row.last_seen) >= activeCutoff && /^\/examenes\/[^/]+\/practica\//.test(row.path)).length
  const arrived15m = Array.from(firstSeenToday.values()).filter(time => time >= Date.parse(fifteenMinutesAgo)).length

  return {
    available: true,
    limited: totalReachRows > MAX_ROWS || presence.length === PAGE_SIZE,
    observedSince,
    daily,
    visitors7d: allVisitors.size,
    arrived15m,
    inactive15m,
    examPageVisitors7d: examVisitors.size,
    examPageActiveNow,
    topPages: rankedPages.slice(0, 8),
    quietPages: rankedPages.filter(page => page.visitors > 0).sort((a, b) => a.visitors - b.visitors || a.path.localeCompare(b.path)).slice(0, 8),
  }
}
