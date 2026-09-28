'use client'

import { useCallback, useEffect, useState } from 'react'
import { Activity, Bot, RefreshCw, Users } from 'lucide-react'

interface PresenceStats {
  people: number
  bots: number
  total: number
  topPages: { path: string; people: number; bots: number }[]
  updatedAt: string
  windowSeconds: number
}

const BORDER = '#e8ddd4'
const MUTED = '#6b7280'
const TEXT = '#1a1a2e'

function Metric({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: typeof Users
  label: string
  value: number
  color: string
}) {
  return (
    <div style={{ flex: 1, minWidth: 130, padding: '14px 16px', border: `1px solid ${BORDER}`, borderRadius: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, color, marginBottom: 7 }}>
        <Icon size={16} aria-hidden="true" />
        <span style={{ fontSize: 11, fontWeight: 800 }}>{label}</span>
      </div>
      <strong style={{ color: TEXT, fontSize: 30, lineHeight: 1 }}>{value}</strong>
    </div>
  )
}

export default function LivePresenceCard() {
  const [stats, setStats] = useState<PresenceStats | null>(null)
  const [error, setError] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const refresh = useCallback(async () => {
    setRefreshing(true)
    try {
      const response = await fetch('/api/admin/presence', { cache: 'no-store' })
      if (!response.ok) throw new Error('presence_unavailable')
      setStats(await response.json() as PresenceStats)
      setError(false)
    } catch {
      setError(true)
    } finally {
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    const initial = window.setTimeout(() => void refresh(), 0)
    const interval = window.setInterval(() => void refresh(), 10_000)
    return () => {
      window.clearTimeout(initial)
      window.clearInterval(interval)
    }
  }, [refresh])

  return (
    <section
      aria-labelledby="live-presence-title"
      style={{ background: '#fff', borderRadius: 16, padding: 20, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start', marginBottom: 14 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: error ? '#9ca3af' : '#16a34a', boxShadow: error ? 'none' : '0 0 0 4px rgba(22,163,74,.12)' }} />
            <h2 id="live-presence-title" style={{ margin: 0, color: TEXT, fontSize: 15 }}>En el sitio ahora</h2>
          </div>
          <p style={{ margin: '5px 0 0 17px', color: MUTED, fontSize: 11 }}>
            {error
              ? 'La medición no está disponible en este momento.'
              : stats
                ? `Actualizado ${new Date(stats.updatedAt).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'America/Bogota' })}`
                : 'Cargando actividad…'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => void refresh()}
          disabled={refreshing}
          aria-label="Actualizar presencia"
          style={{ width: 34, height: 34, display: 'grid', placeItems: 'center', borderRadius: 9, border: `1px solid ${BORDER}`, background: '#fff', color: MUTED, cursor: refreshing ? 'wait' : 'pointer' }}
        >
          <RefreshCw size={14} aria-hidden="true" style={{ opacity: refreshing ? 0.45 : 1 }} />
        </button>
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <Metric icon={Users} label="Personas activas" value={stats?.people ?? 0} color="#16a34a" />
        <Metric icon={Bot} label="Bots detectados" value={stats?.bots ?? 0} color="#7c3aed" />
        <Metric icon={Activity} label="Total observado" value={stats?.total ?? 0} color="#c87941" />
      </div>

      {stats && stats.topPages.length > 0 && (
        <div style={{ marginTop: 14, borderTop: `1px solid ${BORDER}`, paddingTop: 12 }}>
          <p style={{ margin: '0 0 8px', color: TEXT, fontSize: 11, fontWeight: 800 }}>Páginas con actividad</p>
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            {stats.topPages.map(page => (
              <span key={page.path} title={`${page.people} personas · ${page.bots} bots`} style={{ maxWidth: '100%', padding: '5px 9px', borderRadius: 999, background: '#f5f0eb', color: MUTED, fontSize: 10, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {page.path} · {page.people + page.bots}
              </span>
            ))}
          </div>
        </div>
      )}

      <p style={{ margin: '12px 0 0', color: MUTED, fontSize: 10, lineHeight: 1.45 }}>
        Activos durante los últimos {stats?.windowSeconds ?? 90} segundos. La separación entre personas y bots es una estimación basada en señales del navegador y patrones conocidos.
      </p>
    </section>
  )
}
