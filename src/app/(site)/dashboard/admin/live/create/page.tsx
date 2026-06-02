'use client'

import { useState } from 'react'
import { createSession } from '@/lib/actions/gameSessions'
import { useRouter } from 'next/navigation'

const AVAILABLE_SETS = [
  {
    id: 'coreano-nivel-1',
    label: '레벨 1 — Saludos y básico',
    sublabel: 'Audio: palabras del día a día · Gramática: partículas A1',
    questions: 8,
    difficulty: 1,
    expected: '70-80% de acierto',
    color: '#059669',
    emoji: '🟢',
  },
  {
    id: 'coreano-nivel-2',
    label: '레벨 2 — Fonética y gramática',
    sublabel: 'Audio: pares mínimos (있 vs 없) · Gramática: conectores',
    questions: 8,
    difficulty: 2,
    expected: '55-65% de acierto',
    color: '#d97706',
    emoji: '🟡',
  },
  {
    id: 'coreano-nivel-3',
    label: '레벨 3 — Desafío',
    sublabel: 'Audio: consonantes aspiradas/tensas · Gramática TOPIK-II',
    questions: 8,
    difficulty: 3,
    expected: '40-55% de acierto',
    color: '#dc2626',
    emoji: '🔴',
  },
  {
    id: 'coreano-1',
    label: 'Set original — Partículas y Formalidad',
    sublabel: 'El set clásico sin audio (solo gramática)',
    questions: 8,
    difficulty: 1,
    expected: '60-70% de acierto',
    color: '#6b7280',
    emoji: '⬜',
  },
]

export default function CreateSessionPage() {
  const [selectedSet, setSelectedSet] = useState('coreano-1')
  const [creating, setCreating] = useState(false)
  const [created, setCreated] = useState<{ code: string } | null>(null)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleCreate = async () => {
    setCreating(true)
    setError('')
    try {
      const session = await createSession(selectedSet)
      setCreated(session)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error al crear sesión')
    } finally {
      setCreating(false)
    }
  }

  if (created) {
    const liveUrl = `${window.location.origin}/live/${created.code}`
    const streamUrl = `${window.location.origin}/live/${created.code}/stream`
    const adminUrl = `${window.location.origin}/dashboard/admin/live/session/${created.code}`

    return (
      <div className="min-h-screen bg-[#0a0a12] text-white flex flex-col items-center justify-center px-6"
        style={{ fontFamily: 'system-ui, sans-serif' }}>
        <div className="w-full max-w-lg space-y-6">
          <div className="text-center">
            <div className="text-5xl mb-3">🎉</div>
            <h1 className="text-3xl font-bold">¡Sesión creada!</h1>
            <p className="text-white/50 mt-1">Código: <span className="text-4xl font-black text-blue-400 tracking-widest">{created.code}</span></p>
          </div>

          <div className="space-y-3">
            {/* Link participantes */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <p className="text-xs text-white/40 uppercase tracking-widest mb-1">📱 Link para participantes (comparte en TikTok)</p>
              <p className="text-white font-mono text-sm break-all">{liveUrl}</p>
              <button
                onClick={() => navigator.clipboard.writeText(liveUrl)}
                className="mt-2 text-xs text-blue-400 hover:text-blue-300 cursor-pointer"
              >
                Copiar →
              </button>
            </div>

            {/* Stream */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <p className="text-xs text-white/40 uppercase tracking-widest mb-1">🎬 Pantalla stream (apunta la cámara aquí)</p>
              <p className="text-white font-mono text-sm break-all">{streamUrl}</p>
              <button
                onClick={() => window.open(streamUrl, '_blank')}
                className="mt-2 text-xs text-blue-400 hover:text-blue-300 cursor-pointer"
              >
                Abrir en nueva pestaña →
              </button>
            </div>

            {/* Admin */}
            <div className="bg-blue-600/10 border border-blue-500/30 rounded-2xl p-4">
              <p className="text-xs text-blue-400 uppercase tracking-widest mb-1">🖥️ Tu panel de control</p>
              <p className="text-white font-mono text-sm break-all">{adminUrl}</p>
            </div>
          </div>

          <button
            onClick={() => router.push(`/dashboard/admin/live/session/${created.code}`)}
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl text-lg font-bold transition-colors cursor-pointer"
          >
            Ir al panel de control →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a12] text-white flex flex-col items-center justify-center px-6"
      style={{ fontFamily: 'system-ui, sans-serif' }}>
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <p className="text-white/40 text-sm uppercase tracking-widest mb-1">WeLearn Live</p>
          <h1 className="text-3xl font-bold">Nueva sesión</h1>
          <p className="text-white/50 mt-1">Elige el set de preguntas y empieza</p>
        </div>

        <div className="space-y-3">
          {AVAILABLE_SETS.map(s => {
            const sel = selectedSet === s.id
            return (
              <button
                key={s.id}
                onClick={() => setSelectedSet(s.id)}
                style={{
                  width: '100%', textAlign: 'left', padding: '16px 20px', borderRadius: 16,
                  border: `2px solid ${sel ? s.color : 'rgba(255,255,255,0.1)'}`,
                  background: sel ? `${s.color}18` : 'rgba(255,255,255,0.04)',
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 16 }}>{s.emoji}</span>
                    <span style={{ fontWeight: 700, fontSize: 15, color: '#fff' }}>{s.label}</span>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 100, background: `${s.color}25`, color: s.color }}>
                    {s.expected}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{s.sublabel} · {s.questions} preguntas</p>
              </button>
            )
          })}
        </div>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <button
          onClick={handleCreate}
          disabled={creating}
          className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-2xl text-lg font-bold transition-colors cursor-pointer"
        >
          {creating ? 'Creando...' : '✓ Crear sesión live'}
        </button>

        <a
          href="/dashboard/admin"
          className="block text-center text-white/30 text-sm hover:text-white/50"
        >
          ← Volver al panel admin
        </a>
      </div>
    </div>
  )
}
