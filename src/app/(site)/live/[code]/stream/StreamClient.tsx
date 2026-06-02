'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { LiveSet } from '@/data/live-sets/types'

type SessionStatus = 'lobby' | 'question' | 'locked' | 'reveal' | 'finished'
interface Session { id: string; code: string; set_id: string; status: SessionStatus; current_question_index: number }
interface VoteCounts { A: number; B: number; C: number; D: number }

// WeLearn brand palette — dark canvas
const BG       = '#0d0f1a'   // same as --bg dark
const SURFACE  = '#1a1f2e'   // same as --surface dark
const INK      = '#e8ecf4'
const MUTED    = '#7a87ad'
const ACCENT   = '#c8202e'   // WeLearn red
const NAVY     = '#14215c'   // WeLearn navy
const BORDER   = 'rgba(232,236,244,0.10)'

const OPTION_BG = ['#0f3d8c','#4338ca','#7c3aed','#be185d']

export default function StreamClient({
  session, set, initialParticipantCount,
}: {
  session: Session; set: LiveSet; initialParticipantCount: number
}) {
  const [status, setStatus]         = useState<SessionStatus>(session.status)
  const [qIndex, setQIndex]         = useState(session.current_question_index)
  const [votes, setVotes]           = useState<VoteCounts>({ A:0, B:0, C:0, D:0 })
  const [participants, setParticipants] = useState(initialParticipantCount)
  const [prevIndex, setPrevIndex]   = useState(session.current_question_index)
  const supabase = createClient()

  useEffect(() => {
    const ch = supabase.channel(`stream_${session.id}`)
      .on('postgres_changes', { event:'UPDATE', schema:'public', table:'game_sessions', filter:`id=eq.${session.id}` },
        (p) => {
          const s = p.new as Session
          if (s.current_question_index !== prevIndex) {
            setVotes({ A:0, B:0, C:0, D:0 })
            setPrevIndex(s.current_question_index)
          }
          setStatus(s.status); setQIndex(s.current_question_index)
        })
      .on('postgres_changes', { event:'INSERT', schema:'public', table:'game_participants', filter:`session_id=eq.${session.id}` },
        () => setParticipants(c => c+1))
      .on('postgres_changes', { event:'INSERT', schema:'public', table:'game_answers', filter:`session_id=eq.${session.id}` },
        (p) => {
          const a = p.new as { question_index: number; answer: string }
          setVotes(prev => {
            if (a.question_index !== qIndex) return prev
            const k = a.answer as keyof VoteCounts
            if (!['A','B','C','D'].includes(k)) return prev
            return { ...prev, [k]: prev[k] + 1 }
          })
        })
      .subscribe()
    return () => { supabase.removeChannel(ch) }
  }, [session.id, qIndex, prevIndex]) // eslint-disable-line react-hooks/exhaustive-deps

  const question = set.questions[qIndex]
  const ids: ('A'|'B'|'C'|'D')[] = ['A','B','C','D']
  const total = votes.A + votes.B + votes.C + votes.D
  const pct = (id: keyof VoteCounts) => total === 0 ? 0 : Math.round((votes[id]/total)*100)
  const isRevealed = status === 'reveal'

  // ── Lobby ──────────────────────────────────────────────────────────────────
  if (status === 'lobby') return (
    <div style={{ minHeight:'100vh', background: BG, color: INK, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontFamily:'system-ui,sans-serif', padding:'2rem' }}>
      {/* WeLearn header */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:4, background:`linear-gradient(90deg,${ACCENT},${NAVY})` }} />

      <div style={{ textAlign:'center', maxWidth:640 }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:10, marginBottom:28, padding:'8px 16px', borderRadius:100, border:`1px solid ${BORDER}`, background: SURFACE }}>
          <div style={{ width:8, height:8, borderRadius:'50%', background:ACCENT, boxShadow:`0 0 8px ${ACCENT}` }} />
          <span style={{ fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:MUTED }}>En vivo · WeLearn</span>
        </div>

        <h1 style={{ margin:'0 0 6px', fontSize:52, fontWeight:800, letterSpacing:'-1px', color:INK }}>{set.titleKo}</h1>
        <p style={{ margin:'0 0 36px', fontSize:20, color:MUTED }}>{set.title}</p>

        <div style={{ background: SURFACE, border:`1px solid ${BORDER}`, borderRadius:20, padding:'28px 48px', display:'inline-block', marginBottom:32 }}>
          <p style={{ margin:'0 0 6px', fontFamily:'var(--mono,monospace)', fontSize:12, color:MUTED, textTransform:'uppercase', letterSpacing:'0.12em' }}>Entra en idiomaswl.com/live/</p>
          <p style={{ margin:0, fontFamily:'var(--mono,monospace)', fontSize:72, fontWeight:900, letterSpacing:'0.18em', color:ACCENT, lineHeight:1 }}>{session.code}</p>
        </div>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10 }}>
          <div style={{ width:10, height:10, borderRadius:'50%', background:'#22c55e', animation:'pulse 2s infinite' }} />
          <p style={{ margin:0, fontSize:22, color:MUTED }}>
            <span style={{ color:INK, fontWeight:700, fontSize:28 }}>{participants}</span> conectados esperando
          </p>
        </div>
      </div>
    </div>
  )

  // ── Finished ──────────────────────────────────────────────────────────────
  if (status === 'finished') return (
    <div style={{ minHeight:'100vh', background:BG, color:INK, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontFamily:'system-ui,sans-serif' }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:4, background:`linear-gradient(90deg,${ACCENT},${NAVY})` }} />
      <div style={{ textAlign:'center' }}>
        <div style={{ fontSize:80, marginBottom:16 }}>🏆</div>
        <h1 style={{ margin:'0 0 8px', fontSize:52, fontWeight:800, color:INK }}>¡Sesión completada!</h1>
        <p style={{ margin:'0 0 32px', fontSize:20, color:MUTED }}>{participants} participantes · {set.questions.length} preguntas</p>
        <div style={{ background:SURFACE, border:`1px solid rgba(200,32,46,0.3)`, borderRadius:16, padding:'16px 36px', display:'inline-block' }}>
          <p style={{ margin:0, color:MUTED, fontSize:16 }}>Practica más en</p>
          <p style={{ margin:0, fontWeight:800, fontSize:28, color:ACCENT }}>idiomaswl.com</p>
        </div>
      </div>
    </div>
  )

  if (!question) return null

  return (
    <div style={{ minHeight:'100vh', background:BG, color:INK, display:'flex', flexDirection:'column', fontFamily:'system-ui,sans-serif' }}>
      {/* Red top stripe */}
      <div style={{ height:4, background:`linear-gradient(90deg,${ACCENT},${NAVY})`, flexShrink:0 }} />

      {/* Topbar */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 32px', height:56, background:SURFACE, borderBottom:`1px solid ${BORDER}`, flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:8, height:8, borderRadius:'50%', background:ACCENT, boxShadow:`0 0 6px ${ACCENT}` }} />
          <span style={{ fontWeight:800, fontSize:15, color:INK }}>
            <span style={{ color:ACCENT }}>Idiomas</span> WeLearn — Live Quiz
          </span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:24 }}>
          <span style={{ fontFamily:'var(--mono,monospace)', fontSize:12, color:MUTED }}>
            PREGUNTA <span style={{ color:INK, fontWeight:700 }}>{qIndex+1}</span>/{set.questions.length}
          </span>
          <div style={{ display:'flex', alignItems:'center', gap:6, background:'rgba(255,255,255,0.06)', borderRadius:100, padding:'4px 12px' }}>
            <span style={{ fontSize:14 }}>👥</span>
            <span style={{ fontFamily:'var(--mono,monospace)', fontSize:14, fontWeight:700, color:INK }}>{participants}</span>
            <span style={{ fontSize:12, color:MUTED }}>jugando</span>
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', padding:'28px 40px', maxWidth:900, margin:'0 auto', width:'100%', boxSizing:'border-box' }}>

        {/* Context */}
        {question.context && (
          <div style={{ background:SURFACE, border:`1px solid ${BORDER}`, borderLeft:`3px solid ${ACCENT}`, borderRadius:10, padding:'10px 16px', marginBottom:16 }}>
            <p style={{ margin:0, fontSize:14, color:MUTED, fontStyle:'italic' }}>{question.context}</p>
          </div>
        )}

        {/* Prompt */}
        <div style={{ background:SURFACE, border:`1px solid ${BORDER}`, borderRadius:16, padding:'24px 28px', marginBottom:24 }}>
          <p style={{ margin:0, fontSize:30, fontWeight:700, color:INK, lineHeight:1.35 }}>{question.prompt}</p>
          {question.promptKo && <p style={{ margin:'8px 0 0', fontSize:18, color:MUTED }}>{question.promptKo}</p>}
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
                position:'relative', overflow:'hidden',
                borderRadius:14,
                border: isRevealed && isCorrect
                  ? '2px solid #22c55e'
                  : isRevealed
                  ? `1px solid ${BORDER}`
                  : `1px solid ${BORDER}`,
                background: isRevealed && isCorrect
                  ? 'rgba(34,197,94,0.10)'
                  : SURFACE,
                transition:'all 0.4s',
              }}>
                {/* Animated fill */}
                <div style={{
                  position:'absolute', inset:'0', left:0, top:0, bottom:0,
                  width:`${p}%`,
                  background: isRevealed
                    ? isCorrect ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.03)'
                    : `${color}22`,
                  transition:'width 0.7s cubic-bezier(0.4,0,0.2,1)',
                  borderRadius:14,
                }} />

                <div style={{ position:'relative', zIndex:1, display:'flex', alignItems:'center', gap:16, padding:'14px 20px' }}>
                  <div style={{
                    width:52, height:52, borderRadius:12, flexShrink:0,
                    background: isRevealed && isCorrect ? '#22c55e' : color,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:22, fontWeight:900, color:'#fff',
                    transition:'background 0.3s',
                  }}>
                    {isRevealed && isCorrect ? '✓' : id}
                  </div>

                  <div style={{ flex:1, minWidth:0 }}>
                    <span style={{ fontSize:20, fontWeight:600, color: isRevealed && !isCorrect ? MUTED : INK }}>
                      {opt.text}
                    </span>
                    {opt.romanization && (
                      <span style={{ marginLeft:10, fontSize:15, color:MUTED }}>{opt.romanization}</span>
                    )}
                  </div>

                  <div style={{ textAlign:'right', flexShrink:0 }}>
                    <span style={{ fontSize:32, fontWeight:900, color: isRevealed && isCorrect ? '#22c55e' : INK }}>
                      {p}%
                    </span>
                    <p style={{ margin:'2px 0 0', fontSize:12, color:MUTED }}>{votes[id]} votos</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer stats */}
        <div style={{ marginTop:20, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 0', borderTop:`1px solid ${BORDER}` }}>
          <span style={{ color:MUTED, fontSize:14 }}>
            ✅ <strong style={{ color:INK }}>{total}</strong> respondieron
            {participants - total > 0 && <span style={{ marginLeft:16 }}>⏳ <strong style={{ color:INK }}>{participants-total}</strong> pensando</span>}
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
