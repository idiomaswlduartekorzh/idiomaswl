'use client'

import { useState } from 'react'
import { createSession } from '@/lib/actions/gameSessions'
import { useRouter } from 'next/navigation'

const AVAILABLE_SETS = [
  { id: 'coreano-1', label: '한국어 Set 1 — Partículas y Formalidad', questions: 8 },
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
          {AVAILABLE_SETS.map(s => (
            <button
              key={s.id}
              onClick={() => setSelectedSet(s.id)}
              className={`w-full text-left px-5 py-4 rounded-2xl border transition-all cursor-pointer ${
                selectedSet === s.id
                  ? 'bg-blue-600/20 border-blue-500'
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              <p className="font-semibold">{s.label}</p>
              <p className="text-white/40 text-sm mt-0.5">{s.questions} preguntas</p>
            </button>
          ))}
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
