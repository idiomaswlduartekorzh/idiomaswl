'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { joinSession, submitAnswer } from '@/lib/actions/gameSessions'
import type { LiveSet } from '@/data/live-sets/types'

type SessionStatus = 'lobby' | 'question' | 'locked' | 'reveal' | 'finished'

interface Session {
  id: string
  code: string
  set_id: string
  status: SessionStatus
  current_question_index: number
}

interface Props {
  session: Session
  set: LiveSet
}

const STORAGE_KEY = (code: string) => `wl_participant_${code}`

export default function ParticipantClient({ session, set }: Props) {
  const [gameStatus, setGameStatus] = useState<SessionStatus>(session.status as SessionStatus)
  const [questionIndex, setQuestionIndex] = useState(session.current_question_index)
  const [participantId, setParticipantId] = useState<string | null>(null)
  const [sessionId] = useState(session.id)
  const [joined, setJoined] = useState(false)
  const [name, setName] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [joining, setJoining] = useState(false)
  const [error, setError] = useState('')
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  // track which questions were answered to reset per question
  const answeredQuestions = useRef<Set<number>>(new Set())
  const supabase = createClient()

  // Restore participant from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY(session.code))
    if (stored) {
      const { pid } = JSON.parse(stored)
      setParticipantId(pid)
      setJoined(true)
    }
  }, [session.code])

  // Reset answer state when question changes
  useEffect(() => {
    if (!answeredQuestions.current.has(questionIndex)) {
      setSelectedAnswer(null)
      setAnswered(false)
    }
  }, [questionIndex])

  // Supabase Realtime — subscribe to session changes
  useEffect(() => {
    const channel = supabase
      .channel(`session_${session.id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'game_sessions',
          filter: `id=eq.${session.id}`,
        },
        (payload) => {
          const updated = payload.new as Session
          setGameStatus(updated.status as SessionStatus)
          setQuestionIndex(updated.current_question_index)
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [session.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleJoin = async () => {
    if (!name.trim()) { setError('Escribe tu nombre'); return }
    setJoining(true)
    setError('')
    try {
      const { participantId: pid } = await joinSession(session.code, name, whatsapp)
      localStorage.setItem(STORAGE_KEY(session.code), JSON.stringify({ pid, name }))
      setParticipantId(pid)
      setJoined(true)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error al unirse')
    } finally {
      setJoining(false)
    }
  }

  const handleAnswer = async (answer: string) => {
    if (answered || !participantId || gameStatus !== 'question') return
    setSelectedAnswer(answer)
    setAnswered(true)
    answeredQuestions.current.add(questionIndex)

    const question = set.questions[questionIndex]
    const isCorrect = answer === question.correct

    if (isCorrect) setScore(s => s + 1)

    try {
      await submitAnswer(sessionId, participantId, questionIndex, answer, isCorrect)
    } catch { /* silent */ }
  }

  const question = set.questions[questionIndex]
  const ids: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D']

  // ── Join screen ──
  if (!joined) {
    return (
      <div className="min-h-screen bg-[#08080f] text-white flex flex-col items-center justify-center px-6 py-10"
        style={{ fontFamily: 'system-ui, sans-serif' }}>
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center">
            <p className="text-white/40 text-sm tracking-widest uppercase mb-1">WeLearn Live</p>
            <h1 className="text-3xl font-bold">코리아 퀴즈</h1>
            <p className="text-white/50 mt-1">Sesión · {session.code}</p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm text-white/50 mb-1 block">Tu nombre *</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleJoin()}
                placeholder="Juan Pérez"
                className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-blue-500 text-base"
              />
            </div>
            <div>
              <label className="text-sm text-white/50 mb-1 block">WhatsApp <span className="text-white/30">(para recibir tu reporte)</span></label>
              <input
                type="tel"
                value={whatsapp}
                onChange={e => setWhatsapp(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleJoin()}
                placeholder="+57 300 000 0000"
                className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-blue-500 text-base"
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              onClick={handleJoin}
              disabled={joining}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-xl text-lg font-bold transition-colors cursor-pointer"
            >
              {joining ? 'Entrando...' : '✓ Entrar al quiz'}
            </button>
          </div>

          <p className="text-center text-white/25 text-xs">
            Tu información es solo para enviarte el reporte.
          </p>
        </div>
      </div>
    )
  }

  // ── Lobby (waiting for David to start) ──
  if (gameStatus === 'lobby') {
    return (
      <div className="min-h-screen bg-[#08080f] text-white flex flex-col items-center justify-center px-6 text-center"
        style={{ fontFamily: 'system-ui, sans-serif' }}>
        <div className="space-y-6">
          <div className="text-6xl animate-pulse">⏳</div>
          <h2 className="text-2xl font-bold">¡Listo, {name || 'jugador'}!</h2>
          <p className="text-white/50">Esperando que David inicie el quiz...</p>
          <div className="bg-white/5 rounded-2xl px-8 py-4 inline-block">
            <p className="text-white/40 text-sm">Tu sesión</p>
            <p className="text-2xl font-bold tracking-widest text-blue-400">{session.code}</p>
          </div>
          <p className="text-white/30 text-sm">Puntos: {score}</p>
        </div>
      </div>
    )
  }

  // ── Finished ──
  if (gameStatus === 'finished') {
    const total = set.questions.length
    return (
      <div className="min-h-screen bg-[#08080f] text-white flex flex-col items-center justify-center px-6 text-center"
        style={{ fontFamily: 'system-ui, sans-serif' }}>
        <div className="space-y-6 max-w-sm">
          <div className="text-6xl">🏆</div>
          <h2 className="text-3xl font-bold">¡Terminaste!</h2>
          <div className="bg-white/5 rounded-2xl p-6">
            <p className="text-white/40 text-sm mb-1">Tu puntaje</p>
            <p className="text-5xl font-bold text-blue-400">{score}<span className="text-xl text-white/30">/{total}</span></p>
          </div>
          {score >= total * 0.7
            ? <p className="text-emerald-400 font-semibold">🔥 Nivel TOPIK-I — ¡Excelente!</p>
            : score >= total * 0.4
            ? <p className="text-amber-400 font-semibold">📚 Buen avance — sigue practicando</p>
            : <p className="text-white/60">Arranca desde los fundamentos 💪</p>
          }
          <a
            href="/clases-de-coreano"
            className="block w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold transition-colors"
          >
            Ver clases de coreano →
          </a>
        </div>
      </div>
    )
  }

  // ── Active question ──
  if (!question) return null

  const isRevealed = gameStatus === 'reveal'
  const isLocked = gameStatus === 'locked'

  return (
    <div className="min-h-screen bg-[#08080f] text-white flex flex-col"
      style={{ fontFamily: 'system-ui, sans-serif' }}>

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <span className="text-sm text-white/40">{name}</span>
        <span className="text-sm font-bold text-blue-400">⭐ {score} pts</span>
        <span className="text-sm text-white/40">{questionIndex + 1}/{set.questions.length}</span>
      </div>

      <div className="flex-1 flex flex-col px-4 py-6 max-w-lg mx-auto w-full space-y-5">

        {/* Status bar */}
        {isLocked && !answered && (
          <div className="bg-amber-500/15 border border-amber-500/30 rounded-xl px-4 py-2 text-center">
            <p className="text-amber-400 text-sm font-semibold">⏸ Tiempo agotado</p>
          </div>
        )}

        {/* Context */}
        {question.context && (
          <p className="text-white/50 text-sm italic border-l-2 border-white/20 pl-3">
            {question.context}
          </p>
        )}

        {/* Prompt */}
        <div className="bg-white/5 rounded-2xl p-5">
          <p className="text-xl font-semibold leading-snug">{question.prompt}</p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          {ids.map(id => {
            const opt = question.options.find(o => o.id === id)
            if (!opt) return null

            const isSelected = selectedAnswer === id
            const isCorrect = id === question.correct
            const canSelect = !answered && gameStatus === 'question'

            let bg = 'bg-white/8 border-white/15'
            if (isSelected && !isRevealed) bg = 'bg-blue-600/40 border-blue-500'
            if (isRevealed && isCorrect) bg = 'bg-emerald-600/40 border-emerald-500'
            if (isRevealed && isSelected && !isCorrect) bg = 'bg-red-600/30 border-red-500/50'

            return (
              <button
                key={id}
                onClick={() => canSelect && handleAnswer(id)}
                disabled={!canSelect}
                className={`
                  relative flex flex-col items-center justify-center gap-1
                  rounded-2xl border p-4 min-h-[90px]
                  transition-all duration-200 text-center
                  ${bg}
                  ${canSelect ? 'cursor-pointer active:scale-95' : 'cursor-default'}
                `}
              >
                <span className="text-xs text-white/40 font-bold">{id}</span>
                <span className="text-base font-semibold leading-tight">{opt.text}</span>
                {opt.romanization && (
                  <span className="text-xs text-white/40">{opt.romanization}</span>
                )}
                {isRevealed && isCorrect && (
                  <span className="absolute top-2 right-2 text-emerald-400 text-xs font-bold">✓</span>
                )}
              </button>
            )
          })}
        </div>

        {/* Answered confirmation */}
        {answered && !isRevealed && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl px-4 py-3 text-center">
            <p className="text-blue-400 font-semibold">✓ Respuesta enviada</p>
            <p className="text-white/40 text-sm">Espera que David revele...</p>
          </div>
        )}

        {/* Reveal feedback */}
        {isRevealed && answered && (
          <div className={`rounded-xl px-4 py-4 text-center border ${
            selectedAnswer === question.correct
              ? 'bg-emerald-500/15 border-emerald-500/40'
              : 'bg-red-500/10 border-red-500/30'
          }`}>
            {selectedAnswer === question.correct ? (
              <>
                <p className="text-2xl font-bold text-emerald-400">🎉 ¡Correcto!</p>
                <p className="text-white/60 text-sm mt-1">+1 punto</p>
              </>
            ) : (
              <>
                <p className="text-xl font-bold text-red-400">✗ Incorrecto</p>
                <p className="text-white/50 text-sm mt-1">
                  Era: <span className="text-white font-semibold">{question.options.find(o => o.id === question.correct)?.text}</span>
                </p>
              </>
            )}
          </div>
        )}

        {isRevealed && !answered && (
          <div className="bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-center">
            <p className="text-white/50">No respondiste a tiempo</p>
            <p className="text-white/30 text-sm">
              Era: <span className="text-white font-medium">{question.options.find(o => o.id === question.correct)?.text}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
