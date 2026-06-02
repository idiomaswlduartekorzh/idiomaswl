'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { updateSessionStatus } from '@/lib/actions/gameSessions'
import type { LiveSet } from '@/data/live-sets/types'

type SessionStatus = 'lobby' | 'question' | 'locked' | 'reveal' | 'finished'

interface Session { id: string; code: string; set_id: string; status: SessionStatus; current_question_index: number }
interface Participant { id: string; name: string; whatsapp: string | null; score: number; joined_at: string }
interface Answer { participant_id: string; question_index: number; answer: string; is_correct: boolean; answered_at: string }

const TYPE_LABEL: Record<string, string> = {
  choice: '어휘', formality: '격식체', particle: '조사', blank: '빈칸', 'korean-read': '한국어',
}

export default function AdminSessionClient({
  session: initialSession,
  set,
  initialParticipants,
  initialAnswers,
}: {
  session: Session
  set: LiveSet
  initialParticipants: Participant[]
  initialAnswers: Answer[]
}) {
  const [status, setStatus] = useState<SessionStatus>(initialSession.status)
  const [questionIndex, setQuestionIndex] = useState(initialSession.current_question_index)
  const [participants, setParticipants] = useState<Participant[]>(initialParticipants)
  const [answers, setAnswers] = useState<Answer[]>(initialAnswers)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const question = set.questions[questionIndex]
  const ids: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D']

  // Answers for current question only
  const currentAnswers = answers.filter(a => a.question_index === questionIndex)
  const answeredMap = Object.fromEntries(currentAnswers.map(a => [a.participant_id, a]))
  const totalAnswered = currentAnswers.length
  const correctCount = currentAnswers.filter(a => a.is_correct).length

  // Vote counts for current question
  const votes = { A: 0, B: 0, C: 0, D: 0 }
  currentAnswers.forEach(a => {
    const k = a.answer as 'A'|'B'|'C'|'D'
    if (votes[k] !== undefined) votes[k]++
  })
  const totalVotes = totalAnswered
  const pct = (id: 'A'|'B'|'C'|'D') =>
    totalVotes === 0 ? 0 : Math.round((votes[id] / totalVotes) * 100)

  // Realtime
  useEffect(() => {
    const ch = supabase
      .channel(`admin_${initialSession.id}`)
      .on('postgres_changes', {
        event: 'UPDATE', schema: 'public', table: 'game_sessions',
        filter: `id=eq.${initialSession.id}`,
      }, (p) => {
        const s = p.new as Session
        setStatus(s.status)
        setQuestionIndex(s.current_question_index)
      })
      .on('postgres_changes', {
        event: 'INSERT', schema: 'public', table: 'game_participants',
        filter: `session_id=eq.${initialSession.id}`,
      }, (p) => {
        setParticipants(prev => [...prev, p.new as Participant])
      })
      .on('postgres_changes', {
        event: 'INSERT', schema: 'public', table: 'game_answers',
        filter: `session_id=eq.${initialSession.id}`,
      }, (p) => {
        setAnswers(prev => [...prev, p.new as Answer])
      })
      .subscribe()
    return () => { supabase.removeChannel(ch) }
  }, [initialSession.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const act = useCallback(async (newStatus: SessionStatus, nextIndex?: number) => {
    setLoading(true)
    try {
      await updateSessionStatus(initialSession.code, newStatus, nextIndex)
      setStatus(newStatus)
      if (nextIndex !== undefined) setQuestionIndex(nextIndex)
    } finally {
      setLoading(false)
    }
  }, [initialSession.code])

  const isLastQuestion = questionIndex >= set.questions.length - 1

  return (
    <div className="min-h-screen bg-[#0a0a12] text-white flex" style={{ fontFamily: 'system-ui, sans-serif' }}>

      {/* LEFT — Controls + question */}
      <div className="flex-1 flex flex-col border-r border-white/10 overflow-y-auto">

        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div>
            <p className="text-white/40 text-xs uppercase tracking-widest">Admin · WeLearn Live</p>
            <p className="font-bold">{set.titleKo} <span className="text-white/30 font-normal text-sm">#{initialSession.code}</span></p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`/live/${initialSession.code}/stream`}
              target="_blank"
              className="text-xs text-blue-400 hover:text-blue-300 underline"
            >
              🎬 Pantalla stream →
            </a>
            <div className={`px-3 py-1 rounded-full text-xs font-bold ${
              status === 'lobby' ? 'bg-white/10 text-white/50' :
              status === 'question' ? 'bg-emerald-500/20 text-emerald-400' :
              status === 'reveal' ? 'bg-amber-500/20 text-amber-400' :
              status === 'finished' ? 'bg-white/10 text-white/30' :
              'bg-white/10 text-white/50'
            }`}>
              {status.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Control buttons */}
        <div className="px-6 py-4 border-b border-white/10 flex flex-wrap gap-2">
          {status === 'lobby' && (
            <button onClick={() => act('question', 0)} disabled={loading || participants.length === 0}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 rounded-xl font-bold text-sm cursor-pointer transition-colors">
              ▶ Iniciar quiz
            </button>
          )}
          {status === 'question' && (
            <button onClick={() => act('locked')} disabled={loading}
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-40 rounded-xl font-bold text-sm cursor-pointer transition-colors">
              ⏸ Cerrar votación
            </button>
          )}
          {(status === 'locked') && (
            <button onClick={() => act('reveal')} disabled={loading}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 rounded-xl font-bold text-sm cursor-pointer transition-colors">
              👁 Revelar respuesta
            </button>
          )}
          {status === 'reveal' && (
            <>
              {!isLastQuestion ? (
                <button onClick={() => act('question', questionIndex + 1)} disabled={loading}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 rounded-xl font-bold text-sm cursor-pointer transition-colors">
                  → Siguiente pregunta
                </button>
              ) : (
                <button onClick={() => act('finished')} disabled={loading}
                  className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 rounded-xl font-bold text-sm cursor-pointer transition-colors">
                  🏁 Terminar sesión
                </button>
              )}
            </>
          )}
          <span className="ml-auto text-sm text-white/30 self-center">
            Pregunta {questionIndex + 1}/{set.questions.length}
          </span>
        </div>

        {/* Question card */}
        {question && (
          <div className="px-6 py-5 space-y-4 flex-1">
            <div className="flex items-center gap-2">
              <span className="bg-blue-500/20 text-blue-400 text-xs px-2.5 py-1 rounded-full font-semibold">{question.level}</span>
              <span className="bg-white/10 text-white/50 text-xs px-2.5 py-1 rounded-full">{TYPE_LABEL[question.type]}</span>
            </div>

            {question.context && (
              <p className="text-white/50 text-sm italic border-l-2 border-white/20 pl-3">{question.context}</p>
            )}

            <div className="bg-white/5 rounded-2xl p-5">
              <p className="text-xl font-semibold">{question.prompt}</p>
            </div>

            {/* Options with vote bars */}
            <div className="space-y-2">
              {ids.map(id => {
                const opt = question.options.find(o => o.id === id)
                if (!opt) return null
                const isCorrect = id === question.correct
                const p = pct(id)
                const revealed = status === 'reveal' || status === 'finished'
                return (
                  <div key={id} className={`relative flex items-center gap-3 rounded-xl px-4 py-3 overflow-hidden border ${
                    revealed && isCorrect ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-white/8 bg-white/4'
                  }`}>
                    <div className="absolute inset-y-0 left-0 bg-white/5 transition-all duration-500 rounded-xl"
                      style={{ width: `${p}%` }} />
                    <span className={`relative z-10 w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${
                      revealed && isCorrect ? 'bg-emerald-500 text-white' : 'bg-white/15 text-white/60'
                    }`}>{revealed && isCorrect ? '✓' : id}</span>
                    <span className="relative z-10 flex-1 text-sm font-medium">{opt.text}
                      {opt.romanization && <span className="ml-1.5 text-white/35 font-normal text-xs">{opt.romanization}</span>}
                    </span>
                    <span className={`relative z-10 text-sm font-bold shrink-0 ${revealed && isCorrect ? 'text-emerald-400' : 'text-white/50'}`}>
                      {p}% <span className="text-white/30 font-normal">({votes[id]})</span>
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Explanation — always visible for admin */}
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">💡 Respuesta correcta: {question.correct}</p>
              <p className="text-white/80 text-sm leading-relaxed">{question.explanation}</p>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
              <p className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">⚠️ La trampa</p>
              <p className="text-white/70 text-sm leading-relaxed">{question.trap}</p>
            </div>

            {/* Stats for current question */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold">{totalAnswered}</p>
                <p className="text-white/40 text-xs">respondieron</p>
              </div>
              <div className="bg-emerald-500/10 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-emerald-400">{correctCount}</p>
                <p className="text-white/40 text-xs">correctas</p>
              </div>
              <div className="bg-red-500/10 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-red-400">{totalAnswered - correctCount}</p>
                <p className="text-white/40 text-xs">incorrectas</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT — Participants panel */}
      <div className="w-72 flex flex-col border-l border-white/10">
        <div className="px-4 py-3 border-b border-white/10">
          <p className="text-xs text-white/40 uppercase tracking-widest">Participantes</p>
          <p className="font-bold text-lg">{participants.length} conectados</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {participants.length === 0 && (
            <div className="p-6 text-center text-white/30 text-sm">
              Esperando que entren...
            </div>
          )}
          {participants.map(p => {
            const ans = answeredMap[p.id]
            const isCorrect = ans?.is_correct
            const timeAgo = ans
              ? `${((new Date(ans.answered_at).getTime() - Date.now()) / -1000).toFixed(1)}s`
              : null

            return (
              <div key={p.id} className="px-4 py-3 border-b border-white/5 flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  !ans ? 'bg-white/10 text-white/40' :
                  isCorrect ? 'bg-emerald-500/30 text-emerald-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {!ans ? '⏳' : isCorrect ? '✓' : '✗'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{p.name}</p>
                  {ans && (
                    <p className="text-xs text-white/40">
                      Opción {ans.answer} · {timeAgo}
                    </p>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-blue-400">{p.score}</p>
                  <p className="text-xs text-white/30">pts</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Ranking tab (shows always) */}
        <div className="border-t border-white/10 px-4 py-3">
          <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Ranking</p>
          {[...participants]
            .sort((a, b) => b.score - a.score)
            .slice(0, 5)
            .map((p, i) => (
              <div key={p.id} className="flex items-center gap-2 py-1">
                <span className="text-white/30 text-xs w-4">{i + 1}</span>
                <span className="text-sm flex-1 truncate">{p.name}</span>
                <span className="text-sm font-bold text-blue-400">{p.score}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
