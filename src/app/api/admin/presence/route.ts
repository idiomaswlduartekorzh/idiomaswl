import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth/require-admin.server'
import { createAdminClient } from '@/lib/supabase/admin'
import { PRESENCE_ACTIVE_WINDOW_SECONDS } from '@/lib/presence'

export const dynamic = 'force-dynamic'

interface ActivePathRow {
  path: string
  visitor_kind: 'person' | 'bot'
}

export async function GET() {
  try {
    await requireAdmin()
  } catch {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  }

  const supabase = createAdminClient()
  const cutoff = new Date(Date.now() - PRESENCE_ACTIVE_WINDOW_SECONDS * 1000).toISOString()
  const staleCutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()

  const [peopleResult, botsResult, pathsResult] = await Promise.all([
    supabase.from('site_presence').select('session_key', { count: 'exact', head: true })
      .eq('visitor_kind', 'person').gte('last_seen', cutoff),
    supabase.from('site_presence').select('session_key', { count: 'exact', head: true })
      .eq('visitor_kind', 'bot').gte('last_seen', cutoff),
    supabase.from('site_presence').select('path, visitor_kind')
      .gte('last_seen', cutoff).limit(1000),
  ])

  const firstError = peopleResult.error ?? botsResult.error ?? pathsResult.error
  if (firstError) {
    return NextResponse.json(
      { error: 'presence_unavailable' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    )
  }

  const pageCounts = new Map<string, { people: number; bots: number }>()
  for (const row of (pathsResult.data ?? []) as ActivePathRow[]) {
    const current = pageCounts.get(row.path) ?? { people: 0, bots: 0 }
    if (row.visitor_kind === 'bot') current.bots += 1
    else current.people += 1
    pageCounts.set(row.path, current)
  }

  const topPages = Array.from(pageCounts, ([path, counts]) => ({ path, ...counts }))
    .sort((a, b) => (b.people + b.bots) - (a.people + a.bots))
    .slice(0, 5)

  // The admin refresh also performs a definitive cleanup of expired rows.
  await supabase.from('site_presence').delete().lt('last_seen', staleCutoff)

  const people = peopleResult.count ?? 0
  const bots = botsResult.count ?? 0
  return NextResponse.json({
    people,
    bots,
    total: people + bots,
    topPages,
    updatedAt: new Date().toISOString(),
    windowSeconds: PRESENCE_ACTIVE_WINDOW_SECONDS,
  }, { headers: { 'Cache-Control': 'no-store' } })
}
