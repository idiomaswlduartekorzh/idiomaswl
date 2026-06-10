'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { updateSessionStatus } from '@/lib/actions/gameSessions'
import AudioPlayer from '@/components/AudioPlayer'
import type { LiveSet } from '@/data/live-sets/types'

type SessionStatus = 'lobby' | 'question' | 'locked' | 'reveal' | 'finished'
interface Session { id: string; code: string; set_id: string; status: SessionStatus; current_question_index: number }
interface Participant { id: string; name: string; whatsapp: string | null; score: number; joined_at: string }
interface Answer { participant_id: string; question_index: number; answer: string; is_correct: boolean; answered_at: string }

// FIX: added audio-listen
const TYPE_LABEL: Record<string, string> = {
  choice:'어휘', formality:'격식체', particle:'조사',
  blank:'빈칸', 'korean-read':'한국어', 'audio-listen':'🔊 Audio',
}
const LEVEL_COLOR: Record<string, string> = {
  'A1':'#059669','A2':'#059669','TOPIK-I':'#0f3d8c','TOPIK-II':'#4338ca','B2':'#7c3aed','C1':'#be185d',
}

const STATUS_LABELS: Record<SessionStatus, { label: string; color: string; bg: string }> = {
  lobby:    { label:'Lobby',    color:'#7a87ad', bg:'rgba(122,135,173,0.15)' },
  question: { label:'Votando', color:'#22c55e', bg:'rgba(34,197,94,0.15)' },
  locked:   { label:'Cerrado', color:'#f59e0b', bg:'rgba(245,158,11,0.15)' },
  reveal:   { label:'Revelado',color:'#60a5fa', bg:'rgba(96,165,250,0.15)' },
  finished: { label:'Fin',     color:'#7a87ad', bg:'rgba(122,135,173,0.12)' },
}

export default function AdminSessionClient({ session: init, set, initialParticipants, initialAnswers }: {
  session: Session; set: LiveSet; initialParticipants: Participant[]; initialAnswers: Answer[]
}) {
  const [status, setStatus]       = useState<SessionStatus>(init.status)
  const [qIndex, setQIndex]       = useState(init.current_question_index)
  const [participants, setP]      = useState<Participant[]>(initialParticipants)
  const [answers, setA]           = useState<Answer[]>(initialAnswers)
  const [loading, setLoading]     = useState(false)
  const [timeLeft, setTimeLeft]   = useState(30)
  const timerRef                  = useRef<ReturnType<typeof setInterval> | null>(null)
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

  const question = set.questions[qIndex]
  const ids: ('A'|'B'|'C'|'D')[] = ['A','B','C','D']
  const curAnswers  = answers.filter(a => a.question_index === qIndex)
  const answeredMap = Object.fromEntries(curAnswers.map(a => [a.participant_id, a]))
  const votes = { A:0, B:0, C:0, D:0 }
  curAnswers.forEach(a => { const k = a.answer as 'A'|'B'|'C'|'D'; if (votes[k] !== undefined) votes[k]++ })
  const totalVotes    = curAnswers.length
  const correctCount  = curAnswers.filter(a => a.is_correct).length
  const pct = (id:'A'|'B'|'C'|'D') => totalVotes === 0 ? 0 : Math.round((votes[id]/totalVotes)*100)

  useEffect(() => {
    const ch = supabase!.channel(`admin_${init.id}`)
      .on('postgres_changes', { event:'UPDATE', schema:'public', table:'game_sessions', filter:`id=eq.${init.id}` },
        (p) => {
          const s = p.new as Session
          setStatus(s.status)
          setQIndex(s.current_question_index)
          if (s.status === 'question') startTimer()
          else stopTimer()
        })
      .on('postgres_changes', { event:'INSERT', schema:'public', table:'game_participants', filter:`session_id=eq.${init.id}` },
        (p) => setP(prev => [...prev, p.new as Participant]))
      .on('postgres_changes', { event:'INSERT', schema:'public', table:'game_answers', filter:`session_id=eq.${init.id}` },
        (p) => setA(prev => [...prev, p.new as Answer]))
      .subscribe()
    return () => { supabase!.removeChannel(ch) }
  }, [init.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const act = useCallback(async (s: SessionStatus, idx?: number) => {
    setLoading(true)
    try { await updateSessionStatus(init.code, s, idx); setStatus(s); if (idx !== undefined) setQIndex(idx) }
    finally { setLoading(false) }
  }, [init.code])

  const isLast = qIndex >= set.questions.length - 1
  const st = STATUS_LABELS[status]

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', color:'var(--ink)', display:'flex', flexDirection:'column', fontFamily:'system-ui,sans-serif' }}>

      {/* Top accent bar */}
      <div style={{ height:3, background:'linear-gradient(90deg,#c8202e,#14215c)', flexShrink:0 }} />

      {/* Topbar */}
      <div className="prac-topbar" style={{ gap:16 }}>
        <div className="prac-topbar__left">
          <a href="/dashboard/admin" className="prac-topbar__back">← Admin</a>
          <span className="prac-topbar__title">{set.titleKo} — Panel Live</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:12, flexShrink:0 }}>
          <a href={`/live/${init.code}/stream`} target="_blank"
            style={{ fontSize:12, fontWeight:600, color:'rgba(255,255,255,0.5)', textDecoration:'none', padding:'4px 10px', borderRadius:8, border:'1px solid rgba(255,255,255,0.15)', whiteSpace:'nowrap' }}>
            🎬 Stream →
          </a>
          <div style={{ padding:'4px 12px', borderRadius:100, background:st.bg, fontSize:11, fontWeight:700, color:st.color, textTransform:'uppercase', letterSpacing:'0.08em' }}>
            {st.label}
          </div>
          <span style={{ fontFamily:'var(--mono,monospace)', fontSize:11, color:'rgba(255,255,255,0.4)' }}>
            {qIndex+1}/{set.questions.length}
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{ display:'flex', flex:1, minHeight:0 }}>

        {/* LEFT — question + controls */}
        <div style={{ flex:1, overflowY:'auto', padding:'20px 24px', display:'flex', flexDirection:'column', gap:16, minWidth:0 }}>

          {/* Control bar */}
          <div style={{ background:'var(--surface)', border:'1px solid var(--line-soft)', borderRadius:12, padding:'12px 16px', display:'flex', alignItems:'center', gap:10, flexWrap:'wrap' }}>
            {status === 'lobby' && (
              <button onClick={() => act('question',0)} disabled={loading || participants.length === 0}
                style={{ padding:'8px 20px', borderRadius:8, border:'none', background:'#059669', color:'#fff', fontSize:13, fontWeight:700, cursor:'pointer', opacity: loading || participants.length===0 ? 0.5 : 1 }}>
                ▶ Iniciar quiz
              </button>
            )}
            {status === 'question' && (
              <button onClick={() => act('locked')} disabled={loading}
                style={{ padding:'8px 20px', borderRadius:8, border:'none', background:'#d97706', color:'#fff', fontSize:13, fontWeight:700, cursor:'pointer', opacity:loading?0.5:1 }}>
                ⏸ Cerrar votación
              </button>
            )}
            {status === 'locked' && (
              <button onClick={() => act('reveal')} disabled={loading}
                style={{ padding:'8px 20px', borderRadius:8, border:'none', background:'var(--ink)', color:'var(--bg)', fontSize:13, fontWeight:700, cursor:'pointer', opacity:loading?0.5:1 }}>
                👁 Revelar respuesta
              </button>
            )}
            {status === 'reveal' && !isLast && (
              <button onClick={() => act('question',qIndex+1)} disabled={loading}
                style={{ padding:'8px 20px', borderRadius:8, border:'none', background:'var(--ink)', color:'var(--bg)', fontSize:13, fontWeight:700, cursor:'pointer', opacity:loading?0.5:1 }}>
                → Siguiente pregunta
              </button>
            )}
            {status === 'reveal' && isLast && (
              <button onClick={() => act('finished')} disabled={loading}
                style={{ padding:'8px 20px', borderRadius:8, border:'none', background:'#7c3aed', color:'#fff', fontSize:13, fontWeight:700, cursor:'pointer', opacity:loading?0.5:1 }}>
                🏁 Terminar sesión
              </button>
            )}
            {/* FIX #9: skip button — available in question/locked/reveal (not lobby/finished) */}
            {!isLast && ['question','locked','reveal'].includes(status) && (
              <button onClick={() => { if (confirm('¿Saltar esta pregunta?')) act('question', qIndex + 1) }} disabled={loading}
                style={{ padding:'8px 14px', borderRadius:8, border:'1px solid var(--line-soft)', background:'transparent', color:'var(--muted)', fontSize:12, fontWeight:600, cursor:'pointer', opacity:loading?0.5:1, marginLeft:4 }}>
                Saltar →
              </button>
            )}

            {/* FIX #2: timer display in admin */}
            {status === 'question' && (
              <div style={{ display:'flex', alignItems:'center', gap:6, background: timeLeft <= 10 ? 'rgba(200,32,46,0.15)' : 'rgba(255,255,255,0.05)', borderRadius:8, padding:'4px 12px', border: timeLeft <= 10 ? '1px solid rgba(200,32,46,0.3)' : '1px solid var(--line-soft)' }}>
                <span style={{ fontSize:11, color:'var(--muted)' }}>⏱</span>
                <span style={{ fontFamily:'var(--mono,monospace)', fontSize:18, fontWeight:800, color: timeLeft <= 10 ? 'var(--accent)' : 'var(--ink)', minWidth:24, textAlign:'center' }}>
                  {timeLeft}
                </span>
              </div>
            )}

            <div style={{ marginLeft:'auto', display:'flex', gap:10 }}>
              {/* FIX: nav dots now dynamic, not hardcoded to 8 */}
              {Array.from({ length: set.questions.length }, (_, i) => i).map(i => (
                <div key={i} style={{
                  width:24, height:24, borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:10, fontWeight:700, background: i === qIndex ? 'var(--accent)' : 'var(--bg-2)',
                  color: i === qIndex ? '#fff' : 'var(--muted)', border:'1px solid var(--line-soft)',
                }}>{i+1}</div>
              ))}
            </div>
          </div>

          {/* Question card */}
          {question && (
            <div className="prac-question">
              <div className="prac-question__header">
                <span className="prac-question__num">Pregunta {qIndex+1} de {set.questions.length}</span>
                <div style={{ display:'flex', gap:6 }}>
                  <span style={{ fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:100, color:'#fff', background:LEVEL_COLOR[question.level]??'#6b7280', textTransform:'uppercase', letterSpacing:'0.06em' }}>
                    {question.level}
                  </span>
                  <span style={{ fontSize:10, fontWeight:600, padding:'2px 8px', borderRadius:100, color:'var(--muted)', background:'var(--bg-2)', textTransform:'uppercase', letterSpacing:'0.06em' }}>
                    {TYPE_LABEL[question.type]}
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

              {/* FIX: admin audio player for audio-listen questions */}
              {question.type === 'audio-listen' && question.audioText && (
                <div style={{ marginBottom: 12 }}>
                  <AudioPlayer
                    text={question.audioText}
                    rate={question.audioRate ?? 0.85}
                    autoPlay={false}
                    maxPlays={10}
                  />
                </div>
              )}

              {/* Options with vote bars */}
              <div className="prac-options">
                {ids.map(id => {
                  const opt = question.options.find(o => o.id === id)
                  if (!opt) return null
                  const isCorrect = id === question.correct
                  const p = pct(id)
                  const revealed = status === 'reveal' || status === 'finished'
                  return (
                    <div key={id} style={{ position:'relative', overflow:'hidden', borderRadius:10, border:`1.5px solid ${revealed && isCorrect ? '#059669' : 'var(--line-soft)'}`, background: revealed && isCorrect ? 'rgba(5,150,105,0.07)' : 'var(--surface)' }}>
                      <div style={{ position:'absolute', inset:0, background:'rgba(15,61,140,0.06)', width:`${p}%`, transition:'width 0.5s ease', borderRadius:10 }} />
                      <div style={{ position:'relative', zIndex:1, display:'flex', alignItems:'center', gap:10, padding:'10px 14px' }}>
                        <span style={{ width:26, height:26, borderRadius:7, background: revealed && isCorrect ? '#059669' : 'var(--bg-2)', color: revealed && isCorrect ? '#fff' : 'var(--muted)', fontFamily:'var(--mono,monospace)', fontSize:11, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                          {revealed && isCorrect ? '✓' : id}
                        </span>
                        <span style={{ flex:1, fontSize:14, color:'var(--ink)', fontWeight:500 }}>
                          {opt.text}{opt.romanization && <span style={{ marginLeft:8, fontSize:12, color:'var(--muted)', fontWeight:400 }}>{opt.romanization}</span>}
                        </span>
                        <span style={{ fontSize:14, fontWeight:700, color: revealed && isCorrect ? '#059669' : 'var(--muted)', flexShrink:0 }}>
                          {p}% <span style={{ fontWeight:400, color:'var(--muted)' }}>({votes[id]})</span>
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Stats row */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, marginTop:4 }}>
                {[
                  { label:'Respondieron', val:totalVotes, color:'var(--ink)' },
                  { label:'Correctas', val:correctCount, color:'#059669' },
                  { label:'Incorrectas', val:totalVotes-correctCount, color:'var(--accent)' },
                ].map(s => (
                  <div key={s.label} style={{ background:'var(--bg-2)', borderRadius:10, padding:'12px', textAlign:'center', border:'1px solid var(--line-soft)' }}>
                    <p style={{ margin:'0 0 2px', fontSize:22, fontWeight:800, color:s.color }}>{s.val}</p>
                    <p style={{ margin:0, fontSize:11, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.06em', fontFamily:'var(--mono,monospace)' }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Explanation + trap — always visible for admin */}
          {question && (
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              <div style={{ background:'rgba(5,150,105,0.07)', border:'1px solid rgba(5,150,105,0.25)', borderRadius:12, padding:'14px 16px' }}>
                <p style={{ margin:'0 0 6px', fontSize:11, fontWeight:700, color:'#059669', textTransform:'uppercase', letterSpacing:'0.08em', fontFamily:'var(--mono,monospace)' }}>
                  💡 Correcta: {question.correct} — {question.options.find(o => o.id === question.correct)?.text}
                </p>
                <p style={{ margin:0, fontSize:13, color:'var(--ink)', lineHeight:1.6 }}>{question.explanation}</p>
              </div>
              <div style={{ background:'rgba(245,158,11,0.07)', border:'1px solid rgba(245,158,11,0.2)', borderRadius:12, padding:'14px 16px' }}>
                <p style={{ margin:'0 0 6px', fontSize:11, fontWeight:700, color:'#d97706', textTransform:'uppercase', letterSpacing:'0.08em', fontFamily:'var(--mono,monospace)' }}>⚠️ La trampa</p>
                <p style={{ margin:0, fontSize:13, color:'var(--ink)', lineHeight:1.6 }}>{question.trap}</p>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT — participants */}
        <div style={{ width:260, borderLeft:'1px solid var(--line-soft)', display:'flex', flexDirection:'column', flexShrink:0 }}>
          <div style={{ padding:'14px 16px', borderBottom:'1px solid var(--line-soft)' }}>
            <p style={{ margin:'0 0 2px', fontSize:11, fontFamily:'var(--mono,monospace)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.08em' }}>Participantes</p>
            <p style={{ margin:0, fontSize:20, fontWeight:800, color:'var(--ink)' }}>{participants.length}</p>
          </div>

          <div style={{ flex:1, overflowY:'auto' }}>
            {participants.length === 0 && (
              <p style={{ padding:'20px 16px', color:'var(--muted)', fontSize:13, textAlign:'center' }}>Esperando...</p>
            )}
            {participants.map(p => {
              const ans = answeredMap[p.id]
              return (
                <div key={p.id} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px', borderBottom:'1px solid var(--line-soft)' }}>
                  <div style={{
                    width:30, height:30, borderRadius:8, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700,
                    background: !ans ? 'var(--bg-2)' : ans.is_correct ? 'rgba(5,150,105,0.15)' : 'rgba(200,32,46,0.1)',
                    color: !ans ? 'var(--muted)' : ans.is_correct ? '#059669' : 'var(--accent)',
                    border: `1px solid ${!ans ? 'var(--line-soft)' : ans.is_correct ? 'rgba(5,150,105,0.3)' : 'rgba(200,32,46,0.2)'}`,
                  }}>
                    {!ans ? '…' : ans.is_correct ? '✓' : '✗'}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <p style={{ margin:'0 0 1px', fontSize:13, fontWeight:600, color:'var(--ink)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{p.name}</p>
                    {ans && <p style={{ margin:0, fontSize:11, color:'var(--muted)', fontFamily:'var(--mono,monospace)' }}>Opción {ans.answer}</p>}
                  </div>
                  <span style={{ fontSize:13, fontWeight:700, color:'var(--accent)', flexShrink:0 }}>{p.score}pts</span>
                </div>
              )
            })}
          </div>

          {/* Ranking */}
          <div style={{ borderTop:'1px solid var(--line-soft)', padding:'12px 14px' }}>
            <p style={{ margin:'0 0 8px', fontSize:11, fontFamily:'var(--mono,monospace)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.08em' }}>Ranking</p>
            {[...participants].sort((a,b) => b.score-a.score).slice(0,5).map((p,i) => (
              <div key={p.id} style={{ display:'flex', alignItems:'center', gap:8, padding:'4px 0' }}>
                <span style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--mono,monospace)', width:14 }}>{i+1}</span>
                <span style={{ flex:1, fontSize:12, color:'var(--ink)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{p.name}</span>
                <span style={{ fontSize:12, fontWeight:700, color:'var(--accent)' }}>{p.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
