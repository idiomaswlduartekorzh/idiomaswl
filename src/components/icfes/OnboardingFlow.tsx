'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { saveOnboarding } from '@/lib/actions/icfes'
import { toast } from 'sonner'

interface OnboardingFlowProps {
  userId: string
  onComplete: (profile: OnboardingProfile) => void
}

interface OnboardingProfile {
  level: 0 | 20 | 40 | 60 | 80 | 100
  minPerDay: 30 | 60 | 90 | 120
  goal: 'pass' | 'bandA' | 'bandAPlus'
  examDate: Date
  weeksAvailable: number
  recommendedPace: 'slow' | 'normal' | 'fast'
}

const LEVEL_OPTIONS = [
  { value: 0, label: 'No tengo idea (0%)', desc: 'Estoy empezando de cero' },
  { value: 20, label: 'Sé algunos verbos (20%)', desc: 'Entiendo palabras básicas' },
  { value: 40, label: 'Puedo hacer frases simples (40%)', desc: 'Leo y entiendo un poco' },
  { value: 60, label: 'Entiendo conversaciones (60%)', desc: 'Tengo vocabulario decente' },
  { value: 80, label: 'Casi listo (80%)', desc: 'Solo necesito pulir' },
  { value: 100, label: 'Avanzado (100%)', desc: 'Solo necesito estrategia ICFES' },
]

const TIME_OPTIONS = [
  { value: 30, label: '30 min/día', desc: '3.5 horas/semana' },
  { value: 60, label: '60 min/día', desc: '7 horas/semana' },
  { value: 90, label: '90 min/día', desc: '10.5 horas/semana' },
  { value: 120, label: '120+ min/día', desc: '14+ horas/semana' },
] as const

const GOAL_OPTIONS = [
  { value: 'pass', label: 'Solo aprobar (50%)', icon: '✓' },
  { value: 'bandA', label: 'Banda A (75%)', icon: '★' },
  { value: 'bandAPlus', label: 'Banda A+ (90%+)', icon: '⭐' },
] as const

const TIMELINE_OPTIONS = [
  { weeks: 4, label: '1 mes', desc: 'Urgente' },
  { weeks: 8, label: '2 meses', desc: 'Ideal' },
  { weeks: 12, label: '3 meses', desc: 'Relajado' },
  { weeks: 16, label: '4 meses', desc: 'Muy relajado' },
] as const

export function OnboardingFlow({ userId, onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  // Form state
  const [level, setLevel] = useState<0 | 20 | 40 | 60 | 80 | 100 | null>(null)
  const [minPerDay, setMinPerDay] = useState<30 | 60 | 90 | 120 | null>(null)
  const [goal, setGoal] = useState<'pass' | 'bandA' | 'bandAPlus' | null>(null)
  const [weeksAvailable, setWeeksAvailable] = useState<number | null>(null)

  const canProceed = {
    1: level !== null,
    2: minPerDay !== null,
    3: goal !== null,
    4: weeksAvailable !== null,
  }[step]

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleComplete = async () => {
    if (!level || !minPerDay || !goal || !weeksAvailable) {
      toast.error('Por favor completa todos los campos')
      return
    }

    setLoading(true)
    try {
      const examDate = new Date()
      examDate.setDate(examDate.getDate() + weeksAvailable * 7)

      const pace = calculatePace(level, minPerDay, goal, weeksAvailable)

      const profile: OnboardingProfile = {
        level: level as 0 | 20 | 40 | 60 | 80 | 100,
        minPerDay: minPerDay as 30 | 60 | 90 | 120,
        goal,
        examDate,
        weeksAvailable,
        recommendedPace: pace,
      }

      // Save to database
      await saveOnboarding(userId, profile)

      toast.success('¡Perfil creado! Tu plan personalizadoestá listo.')
      onComplete(profile)
    } catch (error) {
      toast.error('Error guardando perfil')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 md:p-12"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            👋 Bienvenido a ICFES
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-3">
            Necesitamos conocerte para personalizar tu plan de estudio
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Paso {step} de 5
            </span>
            <span className="text-sm text-gray-500">{Math.round((step / 5) * 100)}%</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: '0%' }}
              animate={{ width: `${(step / 5) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Steps */}
        <AnimatePresence mode="wait">
          {/* STEP 1: Level */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                ¿Cuál es tu nivel actual?
              </h2>
              <div className="space-y-3">
                {LEVEL_OPTIONS.map((opt) => (
                  <motion.button
                    key={opt.value}
                    onClick={() => setLevel(opt.value as any)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      level === opt.value
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {opt.label}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {opt.desc}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: Time */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                ⏱️ ¿Cuánto tiempo tienes para estudiar?
              </h2>
              <div className="space-y-3">
                {TIME_OPTIONS.map((opt) => (
                  <motion.button
                    key={opt.value}
                    onClick={() => setMinPerDay(opt.value)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      minPerDay === opt.value
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-green-300'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {opt.label}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {opt.desc}
                    </div>
                  </motion.button>
                ))}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                💡 Recomendación: 60 min/día es el balance ideal entre progreso y
                sostenibilidad
              </p>
            </motion.div>
          )}

          {/* STEP 3: Goal */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                🎯 ¿Cuál es tu objetivo?
              </h2>
              <div className="space-y-3">
                {GOAL_OPTIONS.map((opt) => (
                  <motion.button
                    key={opt.value}
                    onClick={() => setGoal(opt.value)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left flex items-center justify-between ${
                      goal === opt.value
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {opt.label}
                    </div>
                    <span className="text-2xl">{opt.icon}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 4: Timeline */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                📅 ¿Cuándo es tu examen?
              </h2>
              <div className="space-y-3">
                {TIMELINE_OPTIONS.map((opt) => (
                  <motion.button
                    key={opt.weeks}
                    onClick={() => setWeeksAvailable(opt.weeks)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      weeksAvailable === opt.weeks
                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {opt.label}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {opt.desc}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 5: Summary */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                ✅ Tu perfil ICFES
              </h2>

              {level !== null && minPerDay !== null && goal !== null && weeksAvailable !== null && (
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  {/* Summary card */}
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                      Tu plan personalizado:
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-700 dark:text-gray-300">Nivel actual:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {level}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700 dark:text-gray-300">Tiempo/día:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {minPerDay} minutos
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700 dark:text-gray-300">Objetivo:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {goal === 'pass' ? 'Aprobar' : goal === 'bandA' ? 'Banda A' : 'Banda A+'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700 dark:text-gray-300">
                          Semanas disponibles:
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {weeksAvailable} semanas
                        </span>
                      </div>
                      <div className="flex justify-between pt-3 border-t border-blue-200 dark:border-blue-700">
                        <span className="text-gray-700 dark:text-gray-300">Ritmo recomendado:</span>
                        <span className="font-semibold text-blue-600 dark:text-blue-400">
                          {calculatePace(level, minPerDay, goal, weeksAvailable)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* What's next */}
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                      🚀 Lo que viene:
                    </h3>
                    <ol className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li>✓ <strong>Diagnóstico</strong> (20 preguntas, 30 min)</li>
                      <li>✓ <strong>Learning Path</strong> (plan semana a semana)</li>
                      <li>✓ <strong>Contenido personalizado</strong> (lecciones + ejercicios)</li>
                      <li>✓ <strong>Vocabulario</strong> (300 palabras clave)</li>
                      <li>✓ <strong>Retos diarios</strong> (5 preguntas, 15 min)</li>
                    </ol>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer - Navigation buttons */}
        <div className="mt-12 flex gap-3">
          {step > 1 && (
            <motion.button
              onClick={handleBack}
              className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              ← Atrás
            </motion.button>
          )}

          {step < 5 ? (
            <motion.button
              onClick={handleNext}
              disabled={!canProceed}
              className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${
                canProceed
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg'
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed'
              }`}
              whileHover={canProceed ? { scale: 1.02 } : {}}
              whileTap={canProceed ? { scale: 0.98 } : {}}
            >
              Siguiente →
            </motion.button>
          ) : (
            <motion.button
              onClick={handleComplete}
              disabled={loading}
              className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50"
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
            >
              {loading ? 'Guardando...' : '¡Empezar! 🚀'}
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  )
}

/**
 * Calculate recommended pace based on:
 * - Current level (gap to reach)
 * - Time available per day
 * - Goal (difficulty level)
 * - Weeks available
 */
function calculatePace(
  level: number,
  minPerDay: number,
  goal: string,
  weeksAvailable: number
): 'slow' | 'normal' | 'fast' {
  // Gap to cover
  const targetLevel = goal === 'bandAPlus' ? 100 : goal === 'bandA' ? 80 : 60
  const gap = targetLevel - level

  // Hours available
  const totalMinutes = minPerDay * 7 * weeksAvailable
  const totalHours = totalMinutes / 60

  // Needed hours (rough estimate: ~1 hour per 5 points)
  const neededHours = gap / 5

  const ratio = totalHours / neededHours

  if (ratio > 2) return 'slow'
  if (ratio > 1.2) return 'normal'
  return 'fast'
}
