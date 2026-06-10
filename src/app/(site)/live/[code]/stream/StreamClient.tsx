'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { getSessionLeaderboard } from '@/lib/actions/gameSessions'
import type { LiveSet } from '@/data/live-sets/types'

type SessionStatus = 'lobby' | 'question' | 'locked' | 'reveal' | 'finished'
interface Session { id: string; code: string; set_id: string; status: SessionStatus; current_question_index: number }
interface VoteCounts { A: number; B: number; C: number; D: number }

const BG      = '#0d0f1a'
const SURFACE = '#1a1f2e'
const INK     = '#e8ecf4'
const MUTED   = '#7a87ad'
const ACCENT  = '#c8202e'
const NAVY    = '#14215c'
const BORDER  = 'rgba(232,236,244,0.10)'
const OPTION_BG = ['#0f3d8c','#4338ca','#7c3aed','#be185d']
const TIMER_SECS = 30

// FIX #6: TTS waits for voices to load before speaking
function playKorean(text: string, rate = 0.82) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return
  window.speechSynthesis.cancel()

  const speak = () => {
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'ko-KR'; u.rate = rate; u.pitch = 1
    const voices = window.speechSynthesis.getVoices()
    const ko = voices.find(v => v.lang.startsWith('ko'))
    if (ko) u.voice = ko
    window.speechSynthesis.speak(u)
  }

  const voices = window.speechSynthesis.getVoices()
  if (voices.length > 0) {
    speak()
  } else {
    // Voices not yet loaded — wait for the event
    window.speechSynthesis.onvoiceschanged = () => { speak(); window.speechSynthesis.onvoiceschanged = null }
  }
}

export default function StreamClient({
  session, set, initialParticipantCount, initialVotes,
}: {
  session: Session
  set: LiveSet
  initialParticipantCount: number
  // FIX #3: votes pre-fetched for current question if session is mid-game
  initialVotes: VoteCounts
}) {
  const [status, setStatus]           = useState<SessionStatus>(session.status)
  const [qIndex, setQIndex]           = useState(session.current_question_index)
  // FIX #3: start with server-fetched votes, not zeros
  const [votes, setVotes]             = useState<VoteCounts>(initialVotes)
  const [participants, setParticipants] = useState(initialParticipantCount)
  const [leaderboard, setLeaderboard] = useState<{ name: string; score: number }[]>([])
  // FIX #2: timer state
  const [timeLeft, setTimeLeft]       = useState(TIMER_SECS)
  const timerRef                      = useRef<ReturnType<typeof setInterval> | null>(null)
  // FIX #4: transition screen
  const [showStart, setShowStart]     = useState(false)

  const qIndexRef = useRef(qIndex)
  qIndexRef.current = qIndex

  const supabase = createClient()

  // ── Timer helpers ──────────────────────────────────────────────────────────
  const stopTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
  }, [])

  const startTimer = useCallback(() => {
    stopTimer()
    setTimeLeft(TIMER_SECS)
    timerRef.current = setInterval(() => {
      setTimeLeft(t => { if (t <= 1) { stopTimer(); return 0 } return t - 1 })
    }, 1000)
  }, [stopTimer])

  useEffect(() => () => stopTimer(), [stopTimer])

  // FIX #1: on mount, if status is already 'question', play audio + start timer
  useEffect(() => {
    if (status === 'question') {
      startTimer()
      const q = set.questions[qIndex]
      if (q?.type === 'audio-listen' && q.audioText) {
        setTimeout(() => playKorean(q.audioText!, q.audioRate ?? 0.82), 1000)
      }
    }
    if (status === 'finished') {
      getSessionLeaderboard(session.id).then(lb => setLeaderboard(lb)).catch(() => {})
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchLeaderboard = useCallback(async () => {
    const lb = await getSessionLeaderboard(session.id)
    setLeaderboard(lb)
  }, [session.id])

  // ── Realtime ───────────────────────────────────────────────────────────────
  useEffect(() => {
    const ch = supabase!.channel(`stream_${session.id}`)
      .on('postgres_changes', {
        event: 'UPDATE', schema: 'public', table: 'game_sessions',
        filter: `id=eq.${session.id}`,
      }, (p) => {
        const s = p.new as Session

        if (s.current_question_index !== qIndexRef.current) {
          setVotes({ A:0, B:0, C:0, D:0 })
        }

        // FIX #4: show transition screen when going to new question
        if (s.status === 'question' && (s.current_question_index !== qIndexRef.current || status === 'lobby')) {
          setShowStart(true)
          setTimeout(() => setShowStart(false), 2000)
        }

        setStatus(s.status)
        setQIndex(s.current_question_index)

        if (s.status === 'question') {
          startTimer()
          const q = set.questions[s.current_question_index]
          if (q?.type === 'audio-listen' && q.audioText) {
            setTimeout(() => playKorean(q.audioText!, q.audioRate ?? 0.82), 800)
          }
        } else {
          stopTimer()
        }

        if (s.status === 'finished') fetchLeaderboard()
      })
      .on('postgres_changes', {
        event: 'INSERT', schema: 'public', table: 'game_participants',
        filter: `session_id=eq.${session.id}`,
      }, () => setParticipants(c => c + 1))
      .on('postgres_changes', {
        event: 'INSERT', schema: 'public', table: 'game_answers',
        filter: `session_id=eq.${session.id}`,
      }, (p) => {
        const a = p.new as { question_index: number; answer: string }
        if (a.question_index !== qIndexRef.current) return
        const k = a.answer as keyof VoteCounts
        if (!['A','B','C','D'].includes(k)) return
        setVotes(prev => ({ ...prev, [k]: prev[k] + 1 }))
      })
      .subscribe()
    return () => { supabase!.removeChannel(ch) }
  }, [session.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const question = set.questions[qIndex]
  const ids: ('A'|'B'|'C'|'D')[] = ['A','B','C','D']
  const total = votes.A + votes.B + votes.C + votes.D
  const pct = (id: keyof VoteCounts) => total === 0 ? 0 : Math.round((votes[id]/total)*100)
  const isRevealed = status === 'reveal'
  const timerPct = (timeLeft / TIMER_SECS) * 100
  const timerUrgent = timeLeft <= 10 && status === 'question'

  // ── FIX #4: Transition screen ──────────────────────────────────────────────
  if (showStart) {
    const q = set.questions[qIndex]
    return (
      <div style={{ minHeight:'100vh', background:BG, color:INK, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontFamily:'system-ui,sans-serif' }}>
        <div style={{ position:'absolute', top:0, left:0, right:0, height:4, background:`linear-gradient(90deg,${ACCENT},${NAVY})` }} />
        <div style={{ textAlign:'center', animation:'fadeIn 0.3s ease' }}>
          <p style={{ margin:'0 0 8px', fontSize:14, fontFamily:'monospace', color:MUTED, textTransform:'uppercase', letterSpacing:'0.12em' }}>
            Pregunta {qIndex + 1} de {set.questions.length}
          </p>
          <p style={{ margin:0, fontSize:72, fontWeight:900, color:ACCENT, lineHeight:1 }}>
            {qIndex + 1}
          </p>
          {q?.type === 'audio-listen' && (
            <p style={{ margin:'16px 0 0', fontSize:18, color:MUTED }}>🔊 Pregunta de audio</p>
          )}
        </div>
      </div>
    )
  }

  // ── Lobby ──────────────────────────────────────────────────────────────────
  if (status === 'lobby') return (
    <div style={{ minHeight:'100vh', background:BG, color:INK, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontFamily:'system-ui,sans-serif', padding:'2rem' }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:4, background:`linear-gradient(90deg,${ACCENT},${NAVY})` }} />
      <div style={{ textAlign:'center', maxWidth:640 }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:10, marginBottom:28, padding:'8px 16px', borderRadius:100, border:`1px solid ${BORDER}`, background:SURFACE }}>
          <div style={{ width:8, height:8, borderRadius:'50%', background:'#22c55e', animation:'pulse 2s infinite' }} />
          <span style={{ fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:MUTED }}>En vivo · WeLearn</span>
        </div>
        <h1 style={{ margin:'0 0 6px', fontSize:52, fontWeight:800, letterSpacing:'-1px', color:INK }}>{set.titleKo}</h1>
        <p style={{ margin:'0 0 36px', fontSize:20, color:MUTED }}>{set.title}</p>
        <div style={{ background:SURFACE, border:`1px solid ${BORDER}`, borderRadius:20, padding:'28px 48px', display:'inline-block', marginBottom:32 }}>
          <p style={{ margin:'0 0 6px', fontFamily:'monospace', fontSize:12, color:MUTED, textTransform:'uppercase', letterSpacing:'0.12em' }}>Entra en idiomaswl.com/live/</p>
          <p style={{ margin:0, fontFamily:'monospace', fontSize:72, fontWeight:900, letterSpacing:'0.18em', color:ACCENT, lineHeight:1 }}>{session.code}</p>
        </div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10 }}>
          <div style={{ width:10, height:10, borderRadius:'50%', background:'#22c55e' }} />
          <p style={{ margin:0, fontSize:22, color:MUTED }}>
            <span style={{ color:INK, fontWeight:700, fontSize:28 }}>{participants}</span> conectados
          </p>
        </div>
      </div>
    </div>
  )

  // ── Finished with leaderboard ──────────────────────────────────────────────
  if (status === 'finished') return (
    <div style={{ minHeight:'100vh', background:BG, color:INK, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontFamily:'system-ui,sans-serif' }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:4, background:`linear-gradient(90deg,${ACCENT},${NAVY})` }} />
      <div style={{ textAlign:'center', maxWidth:560, width:'100%', padding:'0 2rem' }}>
        <div style={{ fontSize:72, marginBottom:12 }}>🏆</div>
        <h1 style={{ margin:'0 0 6px', fontSize:44, fontWeight:800, color:INK }}>¡Sesión completada!</h1>
        <p style={{ margin:'0 0 32px', fontSize:18, color:MUTED }}>{participants} participantes · {set.questions.length} preguntas</p>
        {leaderboard.length > 0 ? (
          <div style={{ background:SURFACE, border:`1px solid ${BORDER}`, borderRadius:20, padding:'24px', marginBottom:24 }}>
            <p style={{ margin:'0 0 16px', fontSize:11, fontFamily:'monospace', color:MUTED, textTransform:'uppercase', letterSpacing:'0.12em' }}>🏅 Ranking final</p>
            {leaderboard.slice(0,5).map((p, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:14, padding:'10px 0', borderBottom: i < Math.min(leaderboard.length,5)-1 ? `1px solid ${BORDER}` : 'none' }}>
                <span style={{ fontSize:24, width:36, textAlign:'center' }}>{i===0?'🥇':i===1?'🥈':i===2?'🥉':`${i+1}.`}</span>
                <span style={{ flex:1, fontSize:20, fontWeight:700, color:INK, textAlign:'left' }}>{p.name}</span>
                <span style={{ fontSize:24, fontWeight:900, color:ACCENT }}>{p.score} pts</span>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ background:SURFACE, border:`1px solid ${BORDER}`, borderRadius:16, padding:'20px', marginBottom:24 }}>
            <p style={{ margin:0, color:MUTED }}>Cargando ranking...</p>
          </div>
        )}
        <div style={{ background:`rgba(200,32,46,0.12)`, border:`1px solid rgba(200,32,46,0.3)`, borderRadius:16, padding:'14px 32px', display:'inline-block' }}>
          <p style={{ margin:0, color:MUTED, fontSize:14 }}>Practica más en</p>
          <p style={{ margin:0, fontWeight:800, fontSize:26, color:ACCENT }}>idiomaswl.com</p>
        </div>
      </div>
    </div>
  )

  if (!question) return null

  return (
    <div style={{ minHeight:'100vh', background:BG, color:INK, display:'flex', flexDirection:'column', fontFamily:'system-ui,sans-serif' }}>
      <div style={{ height:4, background:`linear-gradient(90deg,${ACCENT},${NAVY})`, flexShrink:0 }} />

      {/* Topbar */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 32px', height:56, background:SURFACE, borderBottom:`1px solid ${BORDER}`, flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:8, height:8, borderRadius:'50%', background:ACCENT, boxShadow:`0 0 6px ${ACCENT}` }} />
          <span style={{ fontWeight:800, fontSize:15, color:INK }}><span style={{ color:ACCENT }}>Idiomas</span> WeLearn</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:20 }}>
          {question.type === 'audio-listen' && (
            <button onClick={() => question.audioText && playKorean(question.audioText, question.audioRate ?? 0.82)}
              style={{ background:ACCENT, border:'none', borderRadius:8, padding:'5px 14px', color:'#fff', fontSize:13, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:6 }}>
              🔊 Reproducir
            </button>
          )}
          <span style={{ fontFamily:'monospace', fontSize:12, color:MUTED }}>
            <strong style={{ color:INK }}>{qIndex+1}</strong>/{set.questions.length}
          </span>
          <div style={{ display:'flex', alignItems:'center', gap:6, background:'rgba(255,255,255,0.06)', borderRadius:100, padding:'4px 12px' }}>
            <span style={{ fontSize:14 }}>👥</span>
            <span style={{ fontFamily:'monospace', fontSize:14, fontWeight:700, color:INK }}>{participants}</span>
          </div>
        </div>
      </div>

      {/* FIX #2: Timer bar — full width, color-coded */}
      <div style={{ height:6, background:'rgba(255,255,255,0.06)', flexShrink:0 }}>
        <div style={{
          height:'100%',
          width: status === 'question' ? `${timerPct}%` : status === 'locked' ? '0%' : '100%',
          background: timerUrgent ? `linear-gradient(90deg,${ACCENT},#f97316)` : `linear-gradient(90deg,#3b82f6,#818cf8)`,
          transition: status === 'question' ? 'width 1s linear' : 'none',
        }} />
      </div>

      {/* Main */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', padding:'20px 40px', maxWidth:900, margin:'0 auto', width:'100%', boxSizing:'border-box' }}>

        {/* FIX #2: timer display */}
        {status === 'question' && (
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              {question.type === 'audio-listen' && (
                <span style={{ fontSize:12, color:ACCENT, fontWeight:700, background:`rgba(200,32,46,0.15)`, padding:'3px 10px', borderRadius:100 }}>🔊 Pregunta de audio</span>
              )}
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:8, background: timerUrgent ? 'rgba(200,32,46,0.15)' : 'rgba(255,255,255,0.06)', borderRadius:100, padding:'5px 16px' }}>
              <span style={{ fontSize:12, fontFamily:'monospace', color:MUTED }}>⏱</span>
              <span style={{ fontSize:22, fontWeight:900, fontFamily:'monospace', color: timerUrgent ? ACCENT : INK, minWidth:32, textAlign:'center' }}>
                {timeLeft}
              </span>
              <span style={{ fontSize:12, color:MUTED }}>seg</span>
            </div>
          </div>
        )}
        {status === 'locked' && (
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', marginBottom:12 }}>
            <span style={{ fontSize:13, fontWeight:700, color:'#d97706', background:'rgba(217,119,6,0.12)', padding:'5px 16px', borderRadius:100 }}>
              ⏸ Votación cerrada
            </span>
          </div>
        )}

        {/* Context */}
        {question.context && (
          <div style={{ background:SURFACE, border:`1px solid ${BORDER}`, borderLeft:`3px solid ${ACCENT}`, borderRadius:10, padding:'10px 16px', marginBottom:16 }}>
            <p style={{ margin:0, fontSize:14, color:MUTED, fontStyle:'italic' }}>{question.context}</p>
          </div>
        )}

        {/* Prompt */}
        <div style={{ background:SURFACE, border:`1px solid ${BORDER}`, borderRadius:16, padding:'22px 28px', marginBottom:22 }}>
          <p style={{ margin:0, fontSize:28, fontWeight:700, color:INK, lineHeight:1.35 }}>{question.prompt}</p>
        </div>

        {/* Vote bars */}
        <div style={{ display:'flex', flexDirection:'column', gap:12, flex:1 }}>
          {ids.map((id, i) => {
            const opt = question.options.find(o => o.id === id)
            if (!opt) return null
            const p = pct(id)
            const isCorrect = id === question.correct
            const color = OPTION_BG[i]
            return (
              <div key={id} style={{
                position:'relative', overflow:'hidden', borderRadius:14,
                border: isRevealed && isCorrect ? '2px solid #22c55e' : `1px solid ${BORDER}`,
                background: isRevealed && isCorrect ? 'rgba(34,197,94,0.10)' : SURFACE,
                transition:'all 0.4s',
              }}>
                <div style={{ position:'absolute', inset:0, width:`${p}%`, background: isRevealed ? (isCorrect ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.03)') : `${color}22`, transition:'width 0.7s cubic-bezier(0.4,0,0.2,1)', borderRadius:14 }} />
                <div style={{ position:'relative', zIndex:1, display:'flex', alignItems:'center', gap:16, padding:'13px 20px' }}>
                  <div style={{ width:50, height:50, borderRadius:12, flexShrink:0, background: isRevealed && isCorrect ? '#22c55e' : color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, fontWeight:900, color:'#fff', transition:'background 0.3s' }}>
                    {isRevealed && isCorrect ? '✓' : id}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <span style={{ fontSize:20, fontWeight:600, color: isRevealed && !isCorrect ? MUTED : INK }}>{opt.text}</span>
                    {opt.romanization && (isRevealed || question.type !== 'audio-listen') && (
                      <span style={{ marginLeft:10, fontSize:14, color:MUTED }}>{opt.romanization}</span>
                    )}
                    {opt.meaning && isRevealed && question.type === 'audio-listen' && (
                      <p style={{ margin:'2px 0 0', fontSize:13, color:MUTED }}>{opt.meaning}</p>
                    )}
                  </div>
                  <div style={{ textAlign:'right', flexShrink:0 }}>
                    <span style={{ fontSize:30, fontWeight:900, color: isRevealed && isCorrect ? '#22c55e' : INK }}>{p}%</span>
                    <p style={{ margin:'2px 0 0', fontSize:12, color:MUTED }}>{votes[id]} votos</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer stats */}
        <div style={{ marginTop:18, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 0', borderTop:`1px solid ${BORDER}` }}>
          <span style={{ color:MUTED, fontSize:14 }}>
            ✅ <strong style={{ color:INK }}>{total}</strong> respondieron
            {participants - total > 0 && <span style={{ marginLeft:14 }}>⏳ <strong style={{ color:INK }}>{participants-total}</strong> pensando</span>}
          </span>
          {isRevealed && total > 0 && (
            <div style={{ background: pct(question.correct) >= 60 ? 'rgba(34,197,94,0.15)' : 'rgba(200,32,46,0.12)', border:`1px solid ${pct(question.correct) >= 60 ? 'rgba(34,197,94,0.4)' : ACCENT}`, borderRadius:100, padding:'6px 18px' }}>
              <span style={{ fontSize:18, fontWeight:800, color: pct(question.correct) >= 60 ? '#22c55e' : ACCENT }}>
                {pct(question.correct)}% acertó
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
