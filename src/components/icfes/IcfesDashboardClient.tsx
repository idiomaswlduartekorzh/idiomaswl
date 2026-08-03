'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ProgressCard } from './ProgressCard'
import { SkillsHeatmap } from './SkillsHeatmap'
import { MockResultCard } from './MockResultCard'
import { DailyChallengeCard } from './DailyChallengeCard'
import { SkillMeter } from './SkillMeter'
import type { IcfesBand } from '@/lib/types/icfes'

interface DailyQuestion {
  id: string
  text: string
  options: string[]
  correctAnswer: string
  explanation: string
}

interface IcfesDashboardClientProps {
  studentName: string
  estimatedBand: IcfesBand
  overallAccuracy: number
  mocksTaken: number
  consistencyDays: number
  recentMocks: Array<{
    id: string
    title: string
    subtitle?: string
    score: number
    maxScore: number
    band: IcfesBand
    timeSpent: number
    completedAt: Date
  }>
  weaknesses: Array<{
    skill: string
    accuracy: number
    targetAccuracy: number
    questionsDone: number
    trend?: number
  }>
  allSkills: Array<{
    skill: string
    accuracy: number
    questionsDone: number
    trend?: number
  }>
  todayChallenge?: {
    skill: string
    questions: DailyQuestion[]
  }
  prepPlan: {
    examDate: Date
    weeksRemaining: number
    currentWeek: number
  }
}

const WEEK_RECOMMENDATIONS: Record<number, string[]> = {
  1: ['Vocabulario básico', 'Construcciones básicas', 'Matching simple'],
  2: ['Paráfrasis', 'Conectores', 'Referencias'],
  3: ['Idea principal', 'Detalles específicos', 'Inferencias'],
  4: ['Simulacro completo', 'Gestión de tiempo', 'Problemas comunes'],
  5: ['Simulacro oficial', 'Repaso final', 'Confianza'],
}

export function IcfesDashboardClient({
  studentName,
  estimatedBand,
  overallAccuracy,
  mocksTaken,
  consistencyDays,
  recentMocks,
  weaknesses,
  allSkills,
  todayChallenge,
  prepPlan,
}: IcfesDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'challenge' | 'skills'>('overview')
  const [selectedWeakness, setSelectedWeakness] = useState<string | null>(null)

  const bandGradients: Record<string, string> = {
    'B1': 'from-emerald-500 to-green-500',
    'A2': 'from-green-500 to-lime-500',
    'A1': 'from-yellow-500 to-orange-500',
    'Pre A1': 'from-orange-500 to-red-500',
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header Hero */}
      <motion.div
        className="relative overflow-hidden pt-8 pb-12 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Greeting */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Hola, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {studentName}
              </span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
              Tu progreso ICFES en tiempo real
            </p>
          </motion.div>

          {/* Tab navigation */}
          <div className="flex gap-2 mb-8 border-b border-gray-200 dark:border-gray-700">
            {['overview', 'challenge', 'skills'].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`px-4 py-3 font-semibold text-sm transition-all ${
                  activeTab === tab
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab === 'overview' && '📊 Resumen'}
                {tab === 'challenge' && '🎯 Reto Hoy'}
                {tab === 'skills' && '🔥 Skills'}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <AnimatePresence mode="wait">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              className="space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* KPIs Grid */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                variants={container}
                initial="hidden"
                animate="show"
              >
                <motion.div variants={item}>
                  <ProgressCard
                    title="Nivel de práctica"
                    value={estimatedBand}
                    subtitle={`Basada en ${mocksTaken} simulacros`}
                    icon="📈"
                    gradient={bandGradients[estimatedBand]}
                  />
                </motion.div>

                <motion.div variants={item}>
                  <ProgressCard
                    title="Precisión general"
                    value={`${Math.round(overallAccuracy * 100)}%`}
                    subtitle="Promedio de todos los simulacros"
                    icon="🎯"
                    gradient="from-blue-500 to-cyan-500"
                    trend="up"
                    trendValue="+5%"
                  />
                </motion.div>

                <motion.div variants={item}>
                  <ProgressCard
                    title="Simulacros"
                    value={mocksTaken}
                    subtitle="Prácticas completadas"
                    icon="📝"
                    gradient="from-purple-500 to-pink-500"
                    trend="up"
                    trendValue="+2"
                  />
                </motion.div>

                <motion.div variants={item}>
                  <ProgressCard
                    title="Racha"
                    value={`${consistencyDays}d`}
                    subtitle="Días consecutivos"
                    icon="🔥"
                    gradient="from-orange-500 to-red-500"
                  />
                </motion.div>
              </motion.div>

              {/* Main band indicator */}
              <motion.div
                className={`rounded-2xl bg-gradient-to-br ${bandGradients[estimatedBand]} p-8 text-white relative overflow-hidden shadow-xl`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="absolute w-64 h-64 bg-white/10 rounded-full"
                  animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  style={{ top: -80, right: -80 }}
                />

                <div className="relative space-y-4">
                  <div>
                    <p className="text-sm opacity-90 uppercase tracking-wide">
                      Tu predicción
                    </p>
                    <p className="text-5xl font-bold mt-2">
                      Nivel {estimatedBand}
                    </p>
                  </div>

                  <p className="text-white/80 max-w-md">
                    {estimatedBand === 'B1' && 'Excelente desempeño dentro de la escala reportada. Conserva precisión y estrategia.'}
                    {estimatedBand === 'A2' && 'Buena base. Refuerza paráfrasis, gramática en contexto e inferencia.'}
                    {estimatedBand === 'A1' && 'Buen inicio. Prioriza vocabulario, avisos y conversaciones breves.'}
                    {estimatedBand === 'Pre A1' && 'Empieza con vocabulario esencial y reconocimiento de instrucciones cortas.'}
                  </p>

                  <div className="pt-4 border-t border-white/20">
                    <p className="text-sm opacity-90">
                      {prepPlan.weeksRemaining} semanas para tu examen
                      ({prepPlan.examDate.toLocaleDateString('es-CO')})
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Weaknesses section */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Áreas a reforzar
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {weaknesses.map((w) => (
                    <motion.div
                      key={w.skill}
                      onClick={() => setSelectedWeakness(w.skill)}
                      whileHover={{ scale: 1.05 }}
                    >
                      <SkillMeter
                        skill={w.skill}
                        accuracy={w.accuracy}
                        targetAccuracy={w.targetAccuracy}
                        size="md"
                        interactive
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Recent mocks */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Últimos simulacros
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recentMocks.slice(0, 3).map((mock, idx) => (
                    <motion.div
                      key={mock.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                    >
                      <MockResultCard
                        {...mock}
                        href={`/dashboard/student/icfes/simulacros/${mock.id}`}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Prep plan roadmap */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Tu roadmap
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {Array.from({ length: 5 }).map((_, week) => {
                    const w = week + 1
                    const isActive = w === prepPlan.currentWeek
                    const isDone = w < prepPlan.currentWeek
                    const isNext = w === prepPlan.currentWeek + 1

                    return (
                      <motion.div
                        key={w}
                        className={`rounded-lg p-4 border-2 transition-all ${
                          isActive
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : isDone
                              ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                              : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900'
                        }`}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-center space-y-2">
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {w}
                          </div>
                          <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                            {isDone ? '✓' : isActive ? '🔥' : isNext ? '→' : '○'}{' '}
                            Semana {w}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            {WEEK_RECOMMENDATIONS[w]?.[0]}
                          </p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* CHALLENGE TAB */}
          {activeTab === 'challenge' && (
            <motion.div
              key="challenge"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {todayChallenge ? (
                <DailyChallengeCard
                  skill={todayChallenge.skill}
                  questions={todayChallenge.questions}
                  timeLimit={300}
                  onComplete={(correct, timeSpent) => {
                    console.log(
                      `Reto completado: ${correct}/5 en ${timeSpent}s`
                    )
                  }}
                />
              ) : (
                <div className="rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 p-12 text-center">
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Reto no disponible por ahora
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* SKILLS TAB */}
          {activeTab === 'skills' && (
            <motion.div
              key="skills"
              className="space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Todas las habilidades
                </h2>
                <SkillsHeatmap
                  skills={allSkills}
                  columns={4}
                  onSkillClick={(skill) => console.log('Clicked:', skill)}
                />
              </div>

              {/* Detailed view of selected skill */}
              {selectedWeakness && (
                <motion.div
                  className="rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 p-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <button
                    onClick={() => setSelectedWeakness(null)}
                    className="mb-4 text-blue-600 dark:text-blue-400 hover:underline text-sm"
                  >
                    ← Volver
                  </button>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Detalles: {selectedWeakness}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Análisis detallado próximamente
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
