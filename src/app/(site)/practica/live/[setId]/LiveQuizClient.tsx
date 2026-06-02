'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import type { LiveSet, LiveQuestion } from '@/data/live-sets/types'

type Stage = 'lobby' | 'question' | 'locked' | 'reveal' | 'explanation' | 'finished'

const TIMER_SECONDS = 30

const LEVEL_COLOR: Record<string, string> = {
  'A1': 'bg-emerald-500',
  'A2': 'bg-emerald-600',
  'TOPIK-I': 'bg-blue-500',
  'TOPIK-II': 'bg-indigo-600',
  'B2': 'bg-violet-600',
  'C1': 'bg-rose-600',
}

const TYPE_LABEL: Record<string, string> = {
  choice: '어휘',
  formality: '격식체',
  particle: '조사',
  blank: '빈칸',
  'korean-read': '한국어',
}

interface Votes {
  A: number
  B: number
  C: number
  D: number
}

export default function LiveQuizClient({ set }: { set: LiveSet }) {
  const [qIndex, setQIndex] = useState(0)
  const [stage, setStage] = useState<Stage>('lobby')
  const [votes, setVotes] = useState<Votes>({ A: 0, B: 0, C: 0, D: 0 })
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS)
  const [streak, setStreak] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const question: LiveQuestion | undefined = set.questions[qIndex]
  const totalVotes = votes.A + votes.B + votes.C + votes.D

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const startTimer = useCallback(() => {
    stopTimer()
    setTimeLeft(TIMER_SECONDS)
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          stopTimer()
          setStage('locked')
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [stopTimer])

  const advance = useCallback(() => {
    if (stage === 'lobby') {
      setStage('question')
      startTimer()
    } else if (stage === 'question' || stage === 'locked') {
      stopTimer()
      setStage('reveal')
    } else if (stage === 'reveal') {
      setStage('explanation')
    } else if (stage === 'explanation') {
      if (qIndex + 1 >= set.questions.length) {
        setStage('finished')
      } else {
        setQIndex(i => i + 1)
        setVotes({ A: 0, B: 0, C: 0, D: 0 })
        setStage('question')
        startTimer()
        setStreak(s => s + 1)
      }
    }
  }, [stage, qIndex, set.questions.length, startTimer, stopTimer])

  const addVote = useCallback((id: 'A' | 'B' | 'C' | 'D') => {
    if (stage !== 'question') return
    setVotes(v => ({ ...v, [id]: v[id] + 1 }))
  }, [stage])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'ArrowRight') {
        e.preventDefault()
        advance()
      }
      if (e.key === '1') addVote('A')
      if (e.key === '2') addVote('B')
      if (e.key === '3') addVote('C')
      if (e.key === '4') addVote('D')
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [advance, addVote])

  useEffect(() => () => stopTimer(), [stopTimer])

  const pct = (id: 'A' | 'B' | 'C' | 'D') =>
    totalVotes === 0 ? 0 : Math.round((votes[id] / totalVotes) * 100)

  return (
    <div className="min-h-screen bg-[#08080f] text-white flex flex-col select-none"
      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* Header strip */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold tracking-tight text-white/90">WeLearn</span>
          <span className="text-white/30">·</span>
          <span className="text-sm text-white/50">{set.titleKo}</span>
        </div>
        <div className="flex items-center gap-4">
          {streak > 0 && (
            <span className="text-sm font-semibold text-amber-400">🔥 {streak} seguidas</span>
          )}
          <span className="text-sm text-white/40">
            {qIndex + 1} / {set.questions.length}
          </span>
        </div>
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 max-w-3xl mx-auto w-full">

        {stage === 'lobby' && <LobbyScreen set={set} onStart={advance} />}

        {stage === 'finished' && <FinishedScreen streak={streak} total={set.questions.length} />}

        {question && ['question', 'locked', 'reveal', 'explanation'].includes(stage) && (
          <QuestionView
            question={question}
            stage={stage}
            votes={votes}
            pct={pct}
            totalVotes={totalVotes}
            timeLeft={timeLeft}
            onVote={addVote}
            onAdvance={advance}
          />
        )}
      </div>

      {/* Footer controls hint */}
      {stage !== 'lobby' && stage !== 'finished' && (
        <div className="px-6 py-3 border-t border-white/10 flex items-center justify-between text-xs text-white/30">
          <span>Teclas 1·2·3·4 → votar &nbsp;|&nbsp; Espacio / → → avanzar</span>
          <span>Click en opción = +1 voto</span>
        </div>
      )}
    </div>
  )
}

/* ── Lobby ── */
function LobbyScreen({ set, onStart }: { set: LiveSet; onStart: () => void }) {
  return (
    <div className="text-center space-y-8">
      <div>
        <p className="text-white/40 text-sm mb-2 tracking-widest uppercase">WeLearn Live Quiz</p>
        <h1 className="text-4xl font-bold mb-2">{set.titleKo}</h1>
        <p className="text-white/60 text-lg">{set.title}</p>
      </div>
      <div className="flex justify-center gap-8 text-center">
        <div>
          <div className="text-3xl font-bold text-blue-400">{set.questions.length}</div>
          <div className="text-white/40 text-sm">preguntas</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-blue-400">{TIMER_SECONDS}s</div>
          <div className="text-white/40 text-sm">por pregunta</div>
        </div>
      </div>
      <button
        onClick={onStart}
        className="px-10 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl text-xl font-bold transition-colors cursor-pointer"
      >
        시작 — Comenzar
      </button>
      <p className="text-white/30 text-sm">Espacio o → también inicia</p>
    </div>
  )
}

/* ── Finished ── */
function FinishedScreen({ streak, total }: { streak: number; total: number }) {
  return (
    <div className="text-center space-y-6">
      <div className="text-6xl">🏆</div>
      <h2 className="text-3xl font-bold">¡Set completado!</h2>
      <p className="text-white/60 text-lg">{total} preguntas · {streak} racha final</p>
      <div className="bg-white/5 rounded-2xl p-6 max-w-sm mx-auto">
        <p className="text-white/50 text-sm mb-1">Practica más en</p>
        <p className="text-blue-400 font-semibold text-lg">idiomaswl.com</p>
      </div>
    </div>
  )
}

/* ── Question view ── */
function QuestionView({
  question, stage, votes, pct, totalVotes, timeLeft, onVote, onAdvance,
}: {
  question: LiveQuestion
  stage: Stage
  votes: Votes
  pct: (id: 'A' | 'B' | 'C' | 'D') => number
  totalVotes: number
  timeLeft: number
  onVote: (id: 'A' | 'B' | 'C' | 'D') => void
  onAdvance: () => void
}) {
  const ids: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D']
  const votingOpen = stage === 'question'
  const revealed = stage === 'reveal' || stage === 'explanation'

  return (
    <div className="w-full space-y-6">
      {/* Level + type badges */}
      <div className="flex items-center gap-2">
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${LEVEL_COLOR[question.level] ?? 'bg-gray-600'}`}>
          {question.level}
        </span>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10 text-white/70">
          {TYPE_LABEL[question.type]}
        </span>
        {stage === 'locked' && (
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400">
            ⏸ Tiempo agotado
          </span>
        )}
      </div>

      {/* Timer bar (only while voting) */}
      {votingOpen && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-white/40">
            <span>Votación abierta</span>
            <span className={timeLeft <= 10 ? 'text-red-400 font-bold' : ''}>{timeLeft}s</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${(timeLeft / TIMER_SECONDS) * 100}%`,
                background: timeLeft <= 10
                  ? 'linear-gradient(90deg, #ef4444, #f97316)'
                  : 'linear-gradient(90deg, #3b82f6, #818cf8)',
              }}
            />
          </div>
        </div>
      )}

      {/* Context */}
      {question.context && (
        <p className="text-white/50 text-sm italic border-l-2 border-white/20 pl-3">
          {question.context}
        </p>
      )}

      {/* Prompt */}
      <div className="bg-white/5 rounded-2xl p-6">
        <p className="text-2xl font-semibold leading-snug">{question.prompt}</p>
        {question.promptKo && (
          <p className="text-white/50 text-base mt-2">{question.promptKo}</p>
        )}
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-3">
        {ids.map(id => {
          const opt = question.options.find(o => o.id === id)
          if (!opt) return null
          const isCorrect = revealed && id === question.correct
          const isWrong = revealed && id !== question.correct
          const p = pct(id)

          return (
            <button
              key={id}
              onClick={() => votingOpen ? onVote(id) : undefined}
              disabled={!votingOpen && !revealed}
              className={[
                'relative w-full text-left rounded-xl px-5 py-4 transition-all duration-300 overflow-hidden',
                'flex items-center gap-4',
                votingOpen ? 'cursor-pointer hover:bg-white/15 bg-white/8' : 'cursor-default',
                isCorrect ? 'bg-emerald-600/30 ring-2 ring-emerald-500' : '',
                isWrong ? 'bg-white/5 opacity-60' : '',
                !revealed && !votingOpen ? 'bg-white/8' : '',
              ].join(' ')}
            >
              {/* Vote bar background */}
              {(totalVotes > 0) && (
                <div
                  className="absolute inset-y-0 left-0 bg-white/5 transition-all duration-500 rounded-xl"
                  style={{ width: `${p}%` }}
                />
              )}

              <span className={[
                'relative z-10 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0',
                isCorrect ? 'bg-emerald-500 text-white' : 'bg-white/15 text-white/70',
              ].join(' ')}>
                {isCorrect ? '✓' : id}
              </span>

              <span className="relative z-10 flex-1">
                <span className="text-base font-medium">{opt.text}</span>
                {opt.romanization && (
                  <span className="ml-2 text-sm text-white/40">{opt.romanization}</span>
                )}
              </span>

              {totalVotes > 0 && (
                <span className={[
                  'relative z-10 text-sm font-bold shrink-0',
                  isCorrect ? 'text-emerald-400' : 'text-white/40',
                ].join(' ')}>
                  {p}%
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Vote count */}
      {totalVotes > 0 && !revealed && (
        <p className="text-center text-white/30 text-sm">{totalVotes} votos</p>
      )}

      {/* Explanation card */}
      {stage === 'explanation' && (
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-400">
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5">
            <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">
              💡 Explicación
            </p>
            <p className="text-white/90 leading-relaxed">{question.explanation}</p>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5">
            <p className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">
              ⚠️ La trampa
            </p>
            <p className="text-white/80 leading-relaxed">{question.trap}</p>
          </div>
        </div>
      )}

      {/* Advance button */}
      {stage !== 'question' && (
        <div className="flex justify-center pt-2">
          <button
            onClick={onAdvance}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold transition-colors cursor-pointer"
          >
            {stage === 'locked' && 'Revelar respuesta →'}
            {stage === 'reveal' && 'Ver explicación →'}
            {stage === 'explanation' && 'Siguiente pregunta →'}
          </button>
        </div>
      )}
    </div>
  )
}
