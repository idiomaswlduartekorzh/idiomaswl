'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { joinSession, submitAnswer, getParticipantScore } from '@/lib/actions/gameSessions'
import AudioPlayer from '@/components/AudioPlayer'
import type { LiveSet } from '@/data/live-sets/types'

type SessionStatus = 'lobby' | 'question' | 'locked' | 'reveal' | 'finished'
interface Session { id: string; code: string; set_id: string; status: SessionStatus; current_question_index: number }
interface Props { session: Session; set: LiveSet }

const STORAGE_KEY = (code: string) => `wl_participant_${code}`

const LEVEL_COLOR: Record<string, string> = {
  'A1': '#059669', 'A2': '#059669',
  'TOPIK-I': '#0f3d8c', 'TOPIK-II': '#4338ca',
  'B2': '#7c3aed', 'C1': '#be185d',
}
// FIX: added audio-listen
const TYPE_LABEL: Record<string, string> = {
  choice: '어휘', formality: '격식체', particle: '조사',
  blank: '빈칸', 'korean-read': '한국어', 'audio-listen': '🔊 Audio',
}

export default function ParticipantClient({ session, set }: Props) {
  const [gameStatus, setGameStatus]   = useState<SessionStatus>(session.status)
  const [questionIndex, setQI]        = useState(session.current_question_index)
  const [participantId, setPid]       = useState<string | null>(null)
  const [joined, setJoined]           = useState(false)
  const [name, setName]               = useState('')
  const [whatsapp, setWhatsapp]       = useState('')
  const [joining, setJoining]         = useState(false)
  const [error, setError]             = useState('')
  const [selectedAnswer, setSelected] = useState<string | null>(null)
  const [answered, setAnswered]       = useState(false)
  // FIX: score synced from server on mount/rejoin
  const [score, setScore]             = useState(0)
  // FIX #2: timer
  const [timeLeft, setTimeLeft]       = useState(30)
  const timerRef                      = useRef<ReturnType<typeof setInterval> | null>(null)
  const answeredSet = useRef<Set<number>>(new Set())
  const supabase = createClient()

  const stopTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
  }, [])
  const startTimer = useCallback(() => {
    stopTimer(); setTimeLeft(30)
    timerRef.current = setInterval(() => {
      setTimeLeft(t => { if (t <= 1) { stopTimer(); return 0 } return t - 1 })
    }, 1000)
  }, [stopTimer])
  useEffect(() => () => stopTimer(), [stopTimer])

  // FIX: restore session from localStorage AND re-fetch real score
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY(session.code))
    if (!stored) return
    const { pid, n } = JSON.parse(stored)
    setPid(pid); setName(n || ''); setJoined(true)
    // Re-fetch authoritative score from server
    getParticipantScore(pid).then(s => setScore(s)).catch(() => {})
  }, [session.code])

  // Reset answer state per question
  useEffect(() => {
    if (!answeredSet.current.has(questionIndex)) { setSelected(null); setAnswered(false) }
  }, [questionIndex])

  // Realtime session updates
  useEffect(() => {
    const ch = supabase!.channel(`part_${session.id}`)
      .on('postgres_changes', {
        event: 'UPDATE', schema: 'public', table: 'game_sessions',
        filter: `id=eq.${session.id}`,
      }, (p) => {
        const s = p.new as Session
        setGameStatus(s.status)
        setQI(s.current_question_index)
        // FIX #2: sync timer with game state
        if (s.status === 'question') startTimer()
        else stopTimer()
      })
      .subscribe()
    return () => { supabase!.removeChannel(ch) }
  }, [session.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleJoin = async () => {
    if (!name.trim()) { setError('Escribe tu nombre'); return }
    setJoining(true); setError('')
    try {
      const { participantId: pid, score: s } = await joinSession(session.code, name, whatsapp)
      localStorage.setItem(STORAGE_KEY(session.code), JSON.stringify({ pid, n: name }))
      setPid(pid); setJoined(true); setScore(s)
    } catch (e: unknown) { setError(e instanceof Error ? e.message : 'Error al unirse') }
    finally { setJoining(false) }
  }

  const handleAnswer = async (answer: string) => {
    if (answered || !participantId || gameStatus !== 'question') return
    // Optimistic UI
    setSelected(answer); setAnswered(true); answeredSet.current.add(questionIndex)
    try {
      // FIX: correctness derived server-side, not trusted from client
      const { isCorrect } = await submitAnswer(session.id, participantId, questionIndex, answer)
      if (isCorrect) setScore(s => s + 1)
    } catch { /**/ }
  }

  const question = set.questions[questionIndex]
  const ids: ('A'|'B'|'C'|'D')[] = ['A','B','C','D']
  const isRevealed = gameStatus === 'reveal'

  // ── Join ──────────────────────────────────────────────────────────────────
  if (!joined) return (
    <div className="prac-shell prac-shell--intro">
      <div className="prac-intro" style={{ maxWidth: 440 }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontSize: 18 }}>🎬</span>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)' }}>WeLearn Live</p>
              <p style={{ margin: 0, fontWeight: 800, color: 'var(--ink)', fontSize: 15 }}>{set.titleKo}</p>
            </div>
          </div>
          <div style={{ background: 'var(--bg-2)', borderRadius: 10, padding: '8px 14px', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)' }}>SESIÓN</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 18, fontWeight: 800, color: 'var(--accent)', letterSpacing: '0.12em' }}>{session.code}</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Tu nombre *</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleJoin()} placeholder="Juan Pérez"
              style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1.5px solid var(--line-soft)', background: 'var(--bg-2)', color: 'var(--ink)', fontSize: 15, outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              WhatsApp <span style={{ fontWeight: 400, textTransform: 'none' }}>(recibe tu reporte)</span>
            </label>
            <input type="tel" value={whatsapp} onChange={e => setWhatsapp(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleJoin()} placeholder="+57 300 000 0000"
              style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1.5px solid var(--line-soft)', background: 'var(--bg-2)', color: 'var(--ink)', fontSize: 15, outline: 'none', boxSizing: 'border-box' }} />
          </div>
          {error && <p style={{ color: 'var(--accent)', fontSize: 13, margin: 0 }}>{error}</p>}
          <button onClick={handleJoin} disabled={joining}
            style={{ padding: '12px', borderRadius: 10, border: 'none', background: 'var(--ink-bg)', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', opacity: joining ? 0.6 : 1 }}>
            {joining ? 'Entrando...' : '✓ Entrar al quiz'}
          </button>
        </div>
        <p style={{ marginTop: 16, fontSize: 11, color: 'var(--muted)', textAlign: 'center', width: '100%' }}>
          Tu información solo se usa para enviarte el reporte.
        </p>
      </div>
    </div>
  )

  // ── Lobby ─────────────────────────────────────────────────────────────────
  if (gameStatus === 'lobby') return (
    <div className="prac-shell prac-shell--intro">
      <div className="prac-intro" style={{ maxWidth: 420, alignItems: 'center', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>⏳</div>
        <h2 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 800, color: 'var(--ink)' }}>¡Listo, {name}!</h2>
        <p style={{ margin: '0 0 20px', color: 'var(--muted)' }}>Esperando que David inicie el quiz...</p>
        <div style={{ background: 'var(--bg-2)', borderRadius: 12, padding: '12px 28px', border: '1px solid var(--line-soft)' }}>
          <p style={{ margin: '0 0 2px', fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Tu sesión</p>
          <p style={{ margin: 0, fontFamily: 'var(--mono)', fontSize: 24, fontWeight: 800, color: 'var(--accent)', letterSpacing: '0.15em' }}>{session.code}</p>
        </div>
      </div>
    </div>
  )

  // ── Finished ─────────────────────────────────────────────────────────────
  if (gameStatus === 'finished') {
    const total = set.questions.length
    const pct = Math.round((score / total) * 100)
    return (
      <div className="prac-shell prac-shell--intro">
        <div className="prac-intro" style={{ maxWidth: 420, alignItems: 'center', textAlign: 'center' }}>
          <div style={{ fontSize: 52, marginBottom: 8 }}>🏆</div>
          <h2 style={{ margin: '0 0 4px', fontSize: 26, fontWeight: 800, color: 'var(--ink)' }}>¡Terminaste!</h2>
          <p style={{ margin: '0 0 20px', color: 'var(--muted)' }}>{set.title}</p>
          <div style={{ background: 'var(--bg-2)', borderRadius: 12, padding: '20px 28px', border: '1px solid var(--line-soft)', width: '100%', boxSizing: 'border-box', marginBottom: 16 }}>
            <p style={{ margin: '0 0 4px', fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Tu puntaje final</p>
            <p style={{ margin: 0, fontSize: 52, fontWeight: 800, color: 'var(--ink)', lineHeight: 1 }}>
              {score}<span style={{ fontSize: 20, color: 'var(--muted)', fontWeight: 400 }}>/{total}</span>
            </p>
            <p style={{ margin: '8px 0 0', fontSize: 13, color: pct >= 70 ? '#059669' : pct >= 40 ? '#d97706' : 'var(--muted)' }}>
              {pct >= 70 ? '🔥 Nivel TOPIK-I — ¡Excelente!' : pct >= 40 ? '📚 Buen avance — sigue practicando' : '💪 Empieza por los fundamentos'}
            </p>
          </div>
          <a href="/clases-de-coreano" style={{ display: 'block', width: '100%', padding: '12px', borderRadius: 10, background: 'var(--ink-bg)', color: '#fff', textAlign: 'center', textDecoration: 'none', fontWeight: 700, fontSize: 15, boxSizing: 'border-box' }}>
            Ver clases de coreano →
          </a>
        </div>
      </div>
    )
  }

  // ── Active question ───────────────────────────────────────────────────────
  if (!question) return null

  return (
    <div className="prac-shell">
      <div className="prac-topbar">
        <div className="prac-topbar__left">
          <span className="prac-topbar__title">{set.titleKo}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          {/* FIX #2: timer visible on participant */}
          {gameStatus === 'question' && (
            <div style={{
              background: timeLeft <= 10 ? 'rgba(200,32,46,0.3)' : 'rgba(255,255,255,0.1)',
              borderRadius: 8, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 5,
              transition: 'background 0.3s',
            }}>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>⏱</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 16, fontWeight: 800, color: timeLeft <= 10 ? '#fca5a5' : '#fff', minWidth: 20, textAlign: 'center' }}>
                {timeLeft}
              </span>
            </div>
          )}
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {questionIndex + 1}/{set.questions.length}
          </span>
          <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 8, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: '#fbbf24', fontSize: 13 }}>⭐</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 14, fontWeight: 700, color: '#fff' }}>{score}</span>
          </div>
        </div>
      </div>
      {/* FIX #2: timer progress bar below topbar */}
      {gameStatus === 'question' && (
        <div style={{ height: 3, background: 'rgba(255,255,255,0.08)' }}>
          <div style={{
            height: '100%',
            width: `${(timeLeft / 30) * 100}%`,
            background: timeLeft <= 10 ? 'linear-gradient(90deg,#c8202e,#f97316)' : 'linear-gradient(90deg,#3b82f6,#818cf8)',
            transition: 'width 1s linear',
          }} />
        </div>
      )}

      <div style={{ maxWidth: 560, margin: '0 auto', padding: '1.5rem 1rem' }}>
        {gameStatus === 'locked' && !answered && (
          <div style={{ background: 'rgba(217,119,6,0.1)', border: '1px solid rgba(217,119,6,0.3)', borderRadius: 10, padding: '10px 14px', marginBottom: 16, textAlign: 'center' }}>
            <p style={{ margin: 0, color: '#d97706', fontWeight: 600, fontSize: 14 }}>⏸ Tiempo agotado — sin respuesta</p>
          </div>
        )}

        <div className="prac-question">
          <div className="prac-question__header">
            <span className="prac-question__num">Pregunta {questionIndex + 1}</span>
            <div style={{ display: 'flex', gap: 6 }}>
              <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 100, color: '#fff', background: LEVEL_COLOR[question.level] ?? '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {question.level}
              </span>
              <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 100, color: 'var(--muted)', background: 'var(--bg-2)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {TYPE_LABEL[question.type] ?? question.type}
              </span>
            </div>
          </div>

          {question.context && (
            <div className="prac-stimulus">
              <p className="prac-stimulus__label">Contexto</p>
              <p className="prac-stimulus__text">{question.context}</p>
            </div>
          )}

          <p className="prac-question__text">{question.prompt}</p>

          {question.type === 'audio-listen' && question.audioText && (
            <div style={{ marginBottom: 16 }}>
              <AudioPlayer
                text={question.audioText}
                rate={question.audioRate ?? 0.85}
                autoPlay={!answered}
                maxPlays={3}
              />
            </div>
          )}

          <div className="prac-options">
            {ids.map(id => {
              const opt = question.options.find(o => o.id === id)
              if (!opt) return null
              const isSelected = selectedAnswer === id
              const isCorrect = id === question.correct
              const canSelect = !answered && gameStatus === 'question'

              let extraClass = ''
              let letterStyle: React.CSSProperties = {}
              let borderStyle: React.CSSProperties = {}

              if (isSelected && !isRevealed) { extraClass = 'prac-option--selected' }
              if (isRevealed && isCorrect) {
                borderStyle = { borderColor: '#059669', background: 'rgba(5,150,105,0.07)' }
                letterStyle = { background: '#059669', color: '#fff' }
              }
              if (isRevealed && isSelected && !isCorrect) {
                borderStyle = { borderColor: 'var(--accent)', background: 'rgba(200,32,46,0.06)' }
              }

              return (
                <button key={id}
                  onClick={() => canSelect && handleAnswer(id)}
                  disabled={!canSelect}
                  className={`prac-option ${extraClass}`}
                  style={{ cursor: canSelect ? 'pointer' : 'default', ...borderStyle }}>
                  <span className="prac-option__letter" style={letterStyle}>
                    {isRevealed && isCorrect ? '✓' : id}
                  </span>
                  <span className="prac-option__text" style={{ display: 'flex', flexDirection: 'column' }}>
                    <span>{opt.text}
                      {opt.romanization && (question.type !== 'audio-listen' || isRevealed) && (
                        <span style={{ marginLeft: 8, fontSize: '0.82rem', color: 'var(--muted)' }}>{opt.romanization}</span>
                      )}
                    </span>
                    {opt.meaning && isRevealed && question.type === 'audio-listen' && (
                      <span style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: 2 }}>{opt.meaning}</span>
                    )}
                  </span>
                </button>
              )
            })}
          </div>

          {/* FIX #5: answered waiting state with timer context */}
          {answered && !isRevealed && (
            <div style={{ background: 'rgba(15,61,140,0.07)', border: '1px solid rgba(15,61,140,0.2)', borderRadius: 10, padding: '14px 16px', textAlign: 'center' }}>
              <p style={{ margin: '0 0 6px', color: '#0f3d8c', fontWeight: 700, fontSize: 15 }}>✓ Respuesta enviada</p>
              <p style={{ margin: 0, fontSize: 12, color: 'var(--muted)' }}>
                {gameStatus === 'question'
                  ? `Esperando que los demás respondan... (${timeLeft}s)`
                  : 'Votación cerrada — David está por revelar'}
              </p>
            </div>
          )}

          {isRevealed && answered && (
            <div style={{
              borderRadius: 10, padding: '12px 16px', textAlign: 'center',
              background: selectedAnswer === question.correct ? 'rgba(5,150,105,0.08)' : 'rgba(200,32,46,0.06)',
              border: `1px solid ${selectedAnswer === question.correct ? 'rgba(5,150,105,0.3)' : 'rgba(200,32,46,0.2)'}`,
            }}>
              {selectedAnswer === question.correct ? (
                <p style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#059669' }}>🎉 ¡Correcto! +1 punto</p>
              ) : (
                <>
                  <p style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 700, color: 'var(--accent)' }}>✗ Incorrecto</p>
                  <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>
                    Era: <strong style={{ color: 'var(--ink)' }}>{question.options.find(o => o.id === question.correct)?.text}</strong>
                  </p>
                </>
              )}
            </div>
          )}

          {isRevealed && !answered && (
            <div style={{ background: 'var(--bg-2)', border: '1px solid var(--line-soft)', borderRadius: 10, padding: '10px 14px', textAlign: 'center' }}>
              <p style={{ margin: '0 0 2px', color: 'var(--muted)', fontSize: 14 }}>No respondiste a tiempo</p>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>
                Era: <strong style={{ color: 'var(--ink)' }}>{question.options.find(o => o.id === question.correct)?.text}</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
