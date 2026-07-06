'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { reviewVocabularyCard } from '@/lib/actions/vocabulary'
import { SKILL_LABELS } from '@/data/icfes-skills'
import type { ReviewGrade, VocabularyCard } from '@/lib/types/icfes'

interface VocabularyEngineProps {
  userId: string
  cards: VocabularyCard[]
  onFinish?: () => void
}

const POS_LABELS: Record<string, string> = {
  verb: 'verbo',
  noun: 'sustantivo',
  adjective: 'adjetivo',
  adverb: 'adverbio',
  connector: 'conector',
  phrase: 'expresión',
}

const GRADES: { grade: ReviewGrade; label: string; hint: string; classes: string }[] = [
  { grade: 'again', label: 'No la sabía', hint: 'la repites hoy', classes: 'from-red-500 to-rose-500' },
  { grade: 'good', label: 'Bien', hint: 'la repasas pronto', classes: 'from-blue-500 to-indigo-500' },
  { grade: 'easy', label: 'Fácil', hint: 'la aplazas más', classes: 'from-emerald-500 to-green-500' },
]

export function VocabularyEngine({ userId, cards, onFinish }: VocabularyEngineProps) {
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [saving, setSaving] = useState(false)
  const [stats, setStats] = useState({ again: 0, good: 0, easy: 0 })

  const total = cards.length
  const card = cards[index]
  const finished = index >= total

  if (total === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center px-6">
          <div className="mb-3 text-5xl">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            ¡Nada que repasar por ahora!
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Vuelve más tarde para tu próxima tanda de vocabulario.
          </p>
        </div>
      </div>
    )
  }

  if (finished) {
    const reviewed = stats.again + stats.good + stats.easy
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 text-center shadow-lg">
        <div className="mb-3 text-5xl">✅</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Tanda completada</h2>
        <p className="mt-1 text-gray-600 dark:text-gray-400">Repasaste {reviewed} palabras</p>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-3">
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.again}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">por reforzar</p>
          </div>
          <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-3">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.good}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">bien</p>
          </div>
          <div className="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 p-3">
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stats.easy}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">fáciles</p>
          </div>
        </div>

        <button
          onClick={() => onFinish?.()}
          className="mt-6 w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 py-3 font-semibold text-white transition-shadow hover:shadow-lg"
        >
          Volver al panel
        </button>
      </div>
    )
  }

  const handleGrade = async (grade: ReviewGrade) => {
    if (saving) return
    setSaving(true)
    setStats((s) => ({ ...s, [grade]: s[grade] + 1 }))

    // Persist; advance regardless so the drill stays fast even if the save fails.
    const res = await reviewVocabularyCard(userId, card.word.id, grade)
    if (!res.success) toast.error('No se pudo guardar el progreso')

    setRevealed(false)
    setIndex((i) => i + 1)
    setSaving(false)
  }

  const isNew = card.progress.status === 'new'

  return (
    <div className="mx-auto max-w-lg">
      {/* Progress */}
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-gray-600 dark:text-gray-400">
            Tarjeta {index + 1} de {total}
          </span>
          {isNew ? (
            <span className="rounded-full bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-400">
              nueva
            </span>
          ) : (
            <span className="rounded-full bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-400">
              repaso
            </span>
          )}
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-[width] duration-300"
            style={{ width: `${(index / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <span className="rounded-full bg-purple-100 dark:bg-purple-900/30 px-3 py-1 text-xs font-medium text-purple-700 dark:text-purple-400">
            {SKILL_LABELS[card.word.skill] || card.word.skill}
          </span>
          <span className="text-xs text-gray-400">{POS_LABELS[card.word.pos] || card.word.pos}</span>
        </div>

        {/* Front: the English word */}
        <p className="text-center text-4xl font-bold text-gray-900 dark:text-white">
          {card.word.word}
        </p>

        {!revealed ? (
          <div className="mt-8">
            <p className="mb-4 text-center text-sm text-gray-500 dark:text-gray-400">
              ¿Sabes qué significa?
            </p>
            <button
              onClick={() => setRevealed(true)}
              className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 py-3 font-semibold text-white transition-shadow hover:shadow-lg"
            >
              Mostrar respuesta
            </button>
          </div>
        ) : (
          <div className="mt-6">
            <p className="text-center text-2xl font-semibold text-blue-600 dark:text-blue-400">
              {card.word.es}
            </p>
            <p className="mt-4 rounded-lg bg-gray-50 dark:bg-slate-800 p-4 text-center italic text-gray-700 dark:text-gray-300">
              “{card.word.example_en}”
            </p>

            <p className="mt-6 mb-3 text-center text-sm text-gray-500 dark:text-gray-400">
              ¿Qué tan bien la recordaste?
            </p>
            <div className="grid grid-cols-3 gap-2">
              {GRADES.map(({ grade, label, hint, classes }) => (
                <button
                  key={grade}
                  onClick={() => handleGrade(grade)}
                  disabled={saving}
                  className={`rounded-lg bg-gradient-to-r ${classes} px-2 py-3 text-white transition-transform hover:scale-[1.03] disabled:opacity-60`}
                >
                  <span className="block text-sm font-semibold">{label}</span>
                  <span className="block text-[10px] opacity-90">{hint}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
