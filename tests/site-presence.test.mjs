import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import {
  classifyPresence,
  isBotUserAgent,
  normalizePresencePath,
  shouldTrackPresencePath,
} from '../src/lib/presence.ts'

test('classifies known automation without treating a normal browser as a bot', () => {
  assert.equal(isBotUserAgent('Mozilla/5.0 Googlebot/2.1'), true)
  assert.equal(classifyPresence('Mozilla/5.0 Chrome/140 Safari/537.36'), 'person')
  assert.equal(classifyPresence('Mozilla/5.0 Chrome/140 Safari/537.36', true), 'bot')
})

test('normalizes public paths and rejects internal or foreign routes', () => {
  assert.equal(normalizePresencePath('/practica/ingles?utm_source=test'), '/practica/ingles')
  assert.equal(normalizePresencePath('https://evil.example/path'), null)
  assert.equal(shouldTrackPresencePath('/dashboard/admin'), false)
  assert.equal(shouldTrackPresencePath('/api/presence/heartbeat'), false)
  assert.equal(shouldTrackPresencePath('/dashboard/student'), true)
  assert.equal(shouldTrackPresencePath('/home'), true)
})

test('migration keeps presence data server-only with RLS and explicit grants', () => {
  const migration = readFileSync(
    new URL('../supabase/migrations/20260924233546_live_site_presence.sql', import.meta.url),
    'utf8',
  )
  assert.match(migration, /enable row level security/i)
  assert.match(migration, /revoke all on table public\.site_presence from anon, authenticated/i)
  assert.match(migration, /grant select, insert, update, delete on table public\.site_presence to service_role/i)
  assert.doesNotMatch(migration, /create policy/i)
})

test('admin stats endpoint enforces the central admin authorization', () => {
  const route = readFileSync(
    new URL('../src/app/api/admin/presence/route.ts', import.meta.url),
    'utf8',
  )
  assert.match(route, /await requireAdmin\(\)/)
  assert.match(route, /Cache-Control['"]?:?\s*['"]no-store/)
})

test('production layout mounts the tracker and admin dashboard shows live presence', () => {
  const layout = readFileSync(new URL('../src/app/layout.tsx', import.meta.url), 'utf8')
  const dashboard = readFileSync(
    new URL('../src/app/(site)/dashboard/admin/JoseDashboard.tsx', import.meta.url),
    'utf8',
  )
  assert.match(layout, /PresenceTracker enabled=\{MEDIR_PRESENCIA\}/)
  assert.match(layout, /VERCEL_ENV/)
  assert.match(dashboard, /<LivePresenceCard \/>/)
})
