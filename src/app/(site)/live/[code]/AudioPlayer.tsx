'use client'

import { useState, useEffect, useCallback } from 'react'

interface Props {
  text: string
  rate?: number
  autoPlay?: boolean
  maxPlays?: number
}

export default function AudioPlayer({ text, rate = 0.85, autoPlay = true, maxPlays = 3 }: Props) {
  const [plays, setPlays]       = useState(0)
  const [playing, setPlaying]   = useState(false)
  const [supported, setSupported] = useState(true)

  const speak = useCallback(() => {
    if (!window.speechSynthesis || plays >= maxPlays) return
    window.speechSynthesis.cancel()

    const u = new SpeechSynthesisUtterance(text)
    u.lang  = 'ko-KR'
    u.rate  = rate
    u.pitch = 1

    // Prefer a Korean voice if available
    const voices = window.speechSynthesis.getVoices()
    const ko = voices.find(v => v.lang.startsWith('ko')) ?? null
    if (ko) u.voice = ko

    u.onstart = () => setPlaying(true)
    u.onend   = () => { setPlaying(false); setPlays(p => p + 1) }
    u.onerror = () => setPlaying(false)

    window.speechSynthesis.speak(u)
  }, [text, rate, plays, maxPlays])

  // Auto-play once when component mounts (voices may need a tick to load)
  useEffect(() => {
    if (!autoPlay) return
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setSupported(false)
      return
    }
    const timer = setTimeout(speak, 600)
    return () => clearTimeout(timer)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Cancel on unmount
  useEffect(() => () => { window.speechSynthesis?.cancel() }, [])

  if (!supported) return (
    <div style={{ background: 'var(--bg-2)', border: '1px solid var(--line-soft)', borderRadius: 12, padding: '12px 16px', textAlign: 'center' }}>
      <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>🔊 Tu navegador no soporta TTS. Escucha el audio en el live.</p>
    </div>
  )

  const remaining = maxPlays - plays
  const exhausted = remaining <= 0

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'var(--bg-2)', border: '1.5px solid var(--line-soft)', borderRadius: 14, padding: '14px 20px' }}>
      {/* Play button */}
      <button
        onClick={speak}
        disabled={playing || exhausted}
        style={{
          width: 52, height: 52, borderRadius: '50%', border: 'none', flexShrink: 0,
          background: exhausted ? 'var(--bg-2)' : playing ? 'var(--accent)' : 'var(--ink)',
          color: '#fff', fontSize: 20, cursor: exhausted ? 'default' : 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s', boxShadow: playing ? `0 0 16px var(--accent)40` : 'none',
          opacity: exhausted ? 0.4 : 1,
        }}
      >
        {playing ? '◼' : '▶'}
      </button>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: '0 0 3px', fontSize: 12, fontFamily: 'var(--mono, monospace)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {playing ? 'Reproduciendo...' : exhausted ? 'Sin reproducciones' : '🔊 Escucha con atención'}
        </p>
        {/* Sound wave animation when playing */}
        {playing && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 24 }}>
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} style={{
                width: 3, borderRadius: 2, background: 'var(--accent)',
                animation: `soundbar 0.8s ease-in-out ${i * 0.1}s infinite alternate`,
                height: `${[60, 100, 80, 100, 60][i - 1]}%`,
              }} />
            ))}
          </div>
        )}
        {!playing && (
          <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>
            {exhausted ? 'Ya escuchaste todas las reproducciones' : `${remaining} reproducción${remaining !== 1 ? 'es' : ''} disponible${remaining !== 1 ? 's' : ''}`}
          </p>
        )}
      </div>
    </div>
  )
}
