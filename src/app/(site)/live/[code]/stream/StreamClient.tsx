'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { LiveSet } from '@/data/live-sets/types'

type SessionStatus = 'lobby' | 'question' | 'locked' | 'reveal' | 'finished'

interface Session {
  id: string
  code: string
  set_id: string
  status: SessionStatus
  current_question_index: number
}

interface VoteCounts { A: number; B: number; C: number; D: number }

const OPTION_COLORS = {
  A: { bar: '#3b82f6', label: 'bg-blue-600' },
  B: { bar: '#8b5cf6', label: 'bg-violet-600' },
  C: { bar: '#f59e0b', label: 'bg-amber-500' },
  D: { bar: '#ec4899', label: 'bg-pink-500' },
}

export default function StreamClient({
  session,
  set,
  initialParticipantCount,
}: {
  session: Session
  set: LiveSet
  initialParticipantCount: number
}) {
  const [status, setStatus] = useState<SessionStatus>(session.status)
  const [questionIndex, setQuestionIndex] = useState(session.current_question_index)
  const [votes, setVotes] = useState<VoteCounts>({ A: 0, B: 0, C: 0, D: 0 })
  const [participantCount, setParticipantCount] = useState(initialParticipantCount)
  const supabase = createClient()

  // Subscribe to session updates
  useEffect(() => {
    const ch = supabase
      .channel(`stream_session_${session.id}`)
      .on('postgres_changes', {
        event: 'UPDATE', schema: 'public', table: 'game_sessions',
        filter: `id=eq.${session.id}`,
      }, (payload) => {
        const s = payload.new as Session
        if (s.current_question_index !== questionIndex) {
          setVotes({ A: 0, B: 0, C: 0, D: 0 })
        }
        setStatus(s.status)
        setQuestionIndex(s.current_question_index)
      })
      .on('postgres_changes', {
        event: 'INSERT', schema: 'public', table: 'game_participants',
        filter: `session_id=eq.${session.id}`,
      }, () => {
        setParticipantCount(c => c + 1)
      })
      .on('postgres_changes', {
        event: 'INSERT', schema: 'public', table: 'game_answers',
        filter: `session_id=eq.${session.id}`,
      }, (payload) => {
        const ans = payload.new as { question_index: number; answer: string }
        setVotes(prev => {
          // Only count answers for current question (use ref-like approach)
          if (ans.question_index !== questionIndex) return prev
          const key = ans.answer as keyof VoteCounts
          if (!['A','B','C','D'].includes(key)) return prev
          return { ...prev, [key]: prev[key] + 1 }
        })
      })
      .subscribe()

    return () => { supabase.removeChannel(ch) }
  }, [session.id, questionIndex]) // eslint-disable-line react-hooks/exhaustive-deps

  const question = set.questions[questionIndex]
  const ids: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D']
  const totalVotes = votes.A + votes.B + votes.C + votes.D
  const pct = (id: keyof VoteCounts) =>
    totalVotes === 0 ? 0 : Math.round((votes[id] / totalVotes) * 100)
  const answered = totalVotes
  const pending = participantCount - totalVotes

  const isRevealed = status === 'reveal'

  // ── Lobby ──
  if (status === 'lobby') {
    return (
      <div className="min-h-screen bg-[#08080f] text-white flex flex-col items-center justify-center"
        style={{ fontFamily: 'system-ui, sans-serif' }}>
        <div className="text-center space-y-8">
          <div>
            <p className="text-white/40 tracking-widest uppercase text-sm mb-2">WeLearn Live</p>
            <h1 className="text-5xl font-bold mb-2">{set.titleKo}</h1>
            <p className="text-white/50 text-xl">{set.title}</p>
          </div>
          <div className="bg-white/5 rounded-3xl px-16 py-8 border border-white/10">
            <p className="text-white/40 text-sm mb-2">Entra en</p>
            <p className="text-2xl font-bold text-white/70">idiomaswl.com/live/</p>
            <p className="text-7xl font-black tracking-[0.15em] text-blue-400 mt-2">{session.code}</p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-2xl text-white/70">
              <span className="text-white font-bold">{participantCount}</span> conectados
            </p>
          </div>
        </div>
      </div>
    )
  }

  // ── Finished ──
  if (status === 'finished') {
    return (
      <div className="min-h-screen bg-[#08080f] text-white flex flex-col items-center justify-center"
        style={{ fontFamily: 'system-ui, sans-serif' }}>
        <div className="text-center space-y-6">
          <div className="text-8xl">🏆</div>
          <h1 className="text-5xl font-bold">¡Sesión completada!</h1>
          <p className="text-white/50 text-xl">{participantCount} participantes · {set.questions.length} preguntas</p>
          <div className="bg-blue-600/20 border border-blue-500/40 rounded-2xl px-10 py-5">
            <p className="text-white/60 text-lg">Practica más en</p>
            <p className="text-3xl font-bold text-blue-400">idiomaswl.com</p>
          </div>
        </div>
      </div>
    )
  }

  if (!question) return null

  return (
    <div className="min-h-screen bg-[#08080f] text-white flex flex-col"
      style={{ fontFamily: 'system-ui, sans-serif' }}>

      {/* Top bar */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-white/60 font-semibold">EN VIVO</span>
          <span className="text-white/30">·</span>
          <span className="text-white/60">WeLearn</span>
        </div>
        <div className="flex items-center gap-6 text-white/50">
          <span>Pregunta <strong className="text-white">{questionIndex + 1}</strong>/{set.questions.length}</span>
          <span>👥 <strong className="text-white">{participantCount}</strong> jugando</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col px-10 py-8 max-w-4xl mx-auto w-full">

        {/* Context */}
        {question.context && (
          <p className="text-white/40 text-lg italic mb-4 border-l-4 border-white/20 pl-4">
            {question.context}
          </p>
        )}

        {/* Prompt */}
        <div className="bg-white/5 rounded-3xl p-8 mb-8 border border-white/10">
          <p className="text-3xl font-bold leading-snug">{question.prompt}</p>
          {question.promptKo && (
            <p className="text-white/40 text-xl mt-3">{question.promptKo}</p>
          )}
        </div>

        {/* Vote bars */}
        <div className="space-y-4 flex-1">
          {ids.map(id => {
            const opt = question.options.find(o => o.id === id)
            if (!opt) return null
            const p = pct(id)
            const isCorrect = id === question.correct
            const color = OPTION_COLORS[id]

            return (
              <div key={id} className="relative">
                <div className={`
                  flex items-center gap-4 rounded-2xl overflow-hidden border
                  ${isRevealed && isCorrect ? 'border-emerald-500/60' : 'border-white/10'}
                  bg-white/5 transition-all duration-300
                `}>
                  {/* Animated fill */}
                  <div
                    className="absolute inset-y-0 left-0 transition-all duration-700 rounded-2xl"
                    style={{
                      width: `${p}%`,
                      background: isRevealed
                        ? isCorrect ? 'rgba(16,185,129,0.25)' : 'rgba(255,255,255,0.05)'
                        : `${color.bar}30`,
                    }}
                  />

                  <div className={`relative z-10 w-14 h-14 m-3 rounded-xl flex items-center justify-center text-xl font-black shrink-0 ${
                    isRevealed && isCorrect ? 'bg-emerald-500 text-white' : color.label + ' text-white'
                  }`}>
                    {isRevealed && isCorrect ? '✓' : id}
                  </div>

                  <span className="relative z-10 flex-1 text-xl font-semibold py-5">
                    {opt.text}
                    {opt.romanization && (
                      <span className="ml-2 text-base text-white/40 font-normal">{opt.romanization}</span>
                    )}
                  </span>

                  <div className="relative z-10 pr-6 text-right shrink-0">
                    <span className={`text-3xl font-black ${
                      isRevealed && isCorrect ? 'text-emerald-400' : 'text-white/70'
                    }`}>{p}%</span>
                    <p className="text-white/30 text-sm">{votes[id]} votos</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom stats */}
        <div className="mt-6 flex items-center justify-between text-white/40">
          <span>✅ {answered} respondieron</span>
          {pending > 0 && <span>⏳ {pending} pensando...</span>}
          {isRevealed && totalVotes > 0 && (
            <span className="text-lg font-bold text-white/70">
              {pct(question.correct)}% acertó
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
