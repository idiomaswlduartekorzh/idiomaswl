'use client'

import { useState } from 'react'
import type { LiveSet, LiveQuestion } from '@/data/live-sets/types'

const TYPE_LABEL: Record<string, string> = {
  choice: '어휘',
  formality: '격식체',
  particle: '조사',
  blank: '빈칸',
  'korean-read': '한국어',
}

export default function AdminLiveClient({ set }: { set: LiveSet }) {
  const [selected, setSelected] = useState(0)
  const question = set.questions[selected]

  return (
    <div className="min-h-screen bg-[#0d0d14] text-white flex" style={{ fontFamily: 'system-ui, sans-serif' }}>

      {/* Sidebar — question list */}
      <div className="w-64 border-r border-white/10 flex flex-col">
        <div className="p-4 border-b border-white/10">
          <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Admin · Vista profesor</p>
          <p className="font-bold text-sm">{set.titleKo}</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {set.questions.map((q, i) => (
            <button
              key={q.id}
              onClick={() => setSelected(i)}
              className={[
                'w-full text-left px-4 py-3 border-b border-white/5 transition-colors cursor-pointer',
                selected === i ? 'bg-blue-600/20 border-l-2 border-l-blue-500' : 'hover:bg-white/5',
              ].join(' ')}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-white/40">#{i + 1}</span>
                <span className="text-xs text-white/40">{TYPE_LABEL[q.type]}</span>
              </div>
              <p className="text-sm text-white/80 leading-snug line-clamp-2">{q.prompt}</p>
              <p className="text-xs text-emerald-400 mt-1 font-semibold">→ {q.correct}</p>
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-white/10">
          <p className="text-xs text-white/30">Solo visible para admin</p>
          <a
            href={`/practica/live/${set.id}`}
            target="_blank"
            className="text-xs text-blue-400 hover:text-blue-300 underline"
          >
            Ver vista pública →
          </a>
        </div>
      </div>

      {/* Main — question detail */}
      <div className="flex-1 overflow-y-auto p-8 max-w-2xl">
        {question && <QuestionDetail question={question} index={selected} total={set.questions.length} />}
      </div>
    </div>
  )
}

function QuestionDetail({ question, index, total }: { question: LiveQuestion; index: number; total: number }) {
  const ids: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D']

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="text-white/40 text-sm">Pregunta {index + 1} / {total}</span>
        <span className="bg-white/10 text-white/70 text-xs px-2.5 py-1 rounded-full">{question.level}</span>
        <span className="bg-white/10 text-white/70 text-xs px-2.5 py-1 rounded-full">{TYPE_LABEL[question.type]}</span>
      </div>

      {/* Context */}
      {question.context && (
        <div className="bg-white/5 rounded-xl p-4 border-l-2 border-blue-500/50">
          <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Contexto</p>
          <p className="text-white/70">{question.context}</p>
        </div>
      )}

      {/* Prompt */}
      <div className="bg-white/8 rounded-2xl p-6">
        <p className="text-xl font-semibold">{question.prompt}</p>
        {question.promptKo && (
          <p className="text-white/50 mt-2">{question.promptKo}</p>
        )}
      </div>

      {/* Options — always show correct */}
      <div className="space-y-2">
        {ids.map(id => {
          const opt = question.options.find(o => o.id === id)
          if (!opt) return null
          const isCorrect = id === question.correct
          return (
            <div
              key={id}
              className={[
                'flex items-center gap-4 rounded-xl px-5 py-3',
                isCorrect
                  ? 'bg-emerald-600/25 ring-1 ring-emerald-500/60'
                  : 'bg-white/5 opacity-60',
              ].join(' ')}
            >
              <span className={[
                'w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold shrink-0',
                isCorrect ? 'bg-emerald-500 text-white' : 'bg-white/15 text-white/50',
              ].join(' ')}>
                {isCorrect ? '✓' : id}
              </span>
              <span className="flex-1">
                <span className={isCorrect ? 'font-semibold text-emerald-300' : 'text-white/60'}>
                  {opt.text}
                </span>
                {opt.romanization && (
                  <span className="ml-2 text-sm text-white/30">{opt.romanization}</span>
                )}
              </span>
              {isCorrect && (
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Correcta</span>
              )}
            </div>
          )
        })}
      </div>

      {/* Explanation */}
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5">
        <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">💡 Explicación</p>
        <p className="text-white/90 leading-relaxed">{question.explanation}</p>
      </div>

      {/* Trap */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5">
        <p className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">⚠️ La trampa</p>
        <p className="text-white/80 leading-relaxed">{question.trap}</p>
      </div>
    </div>
  )
}
