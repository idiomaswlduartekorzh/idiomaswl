'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface SkillAccuracy {
  skill: string
  accuracy: number // 0-1
  questionsDone: number
  trend?: number // % change
}

interface SkillsHeatmapProps {
  skills: SkillAccuracy[]
  columns?: number
  onSkillClick?: (skill: string) => void
}

const SKILL_LABELS: Record<string, string> = {
  vocabulary_basic: 'Vocab\nBásico',
  vocabulary_context: 'Vocab\nContexto',
  grammar_recognition: 'Gramática',
  connectors: 'Conectores',
  reference_words: 'Referencias',
  main_idea: 'Idea\nPrincipal',
  detail: 'Detalles',
  inference: 'Inferencia',
  paraphrase: 'Paráfrasis',
  tone: 'Tono',
  purpose: 'Propósito',
  sentence_order: 'Orden',
  dialogue_completion: 'Diálogos',
  scanning: 'Scanning',
  time_management: 'Tiempo',
  functional_texts: 'Textos\nFuncionales',
}

function getColor(accuracy: number): string {
  // Color scale from red (0%) to green (100%)
  if (accuracy >= 0.85) return 'bg-emerald-500 dark:bg-emerald-600'
  if (accuracy >= 0.75) return 'bg-green-500 dark:bg-green-600'
  if (accuracy >= 0.65) return 'bg-lime-500 dark:bg-lime-600'
  if (accuracy >= 0.55) return 'bg-yellow-500 dark:bg-yellow-600'
  if (accuracy >= 0.45) return 'bg-orange-500 dark:bg-orange-600'
  return 'bg-red-500 dark:bg-red-600'
}

export function SkillsHeatmap({
  skills,
  columns = 4,
  onSkillClick,
}: SkillsHeatmapProps) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      {/* Legend */}
      <div className="flex items-center justify-between gap-2 px-2">
        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
          Precisión
        </span>
        <div className="flex items-center gap-1">
          {[
            { color: 'bg-red-500', label: '0-40%' },
            { color: 'bg-orange-500', label: '40-55%' },
            { color: 'bg-yellow-500', label: '55-65%' },
            { color: 'bg-lime-500', label: '65-75%' },
            { color: 'bg-green-500', label: '75-85%' },
            { color: 'bg-emerald-500', label: '85%+' },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded ${color}`} />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
      >
        {skills.map((skill, idx) => (
          <motion.div
            key={skill.skill}
            className={`relative group cursor-pointer`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            onMouseEnter={() => setHoveredSkill(skill.skill)}
            onMouseLeave={() => setHoveredSkill(null)}
            onClick={() => onSkillClick?.(skill.skill)}
          >
            <motion.div
              className={`relative overflow-hidden rounded-xl p-4 ${getColor(
                skill.accuracy
              )} transition-all duration-300 shadow-md`}
              whileHover={{
                scale: 1.1,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              }}
            >
              {/* Shimmer effect on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20"
                animate={
                  hoveredSkill === skill.skill
                    ? { x: ['100%', '-100%'] }
                    : {}
                }
                transition={{
                  duration: 0.6,
                  repeat: hoveredSkill === skill.skill ? Infinity : 0,
                }}
              />

              {/* Content */}
              <div className="relative space-y-2 text-white">
                {/* Accuracy percentage */}
                <div className="text-2xl font-bold">
                  {Math.round(skill.accuracy * 100)}%
                </div>

                {/* Skill name */}
                <div className="text-xs font-semibold whitespace-pre-wrap leading-tight">
                  {SKILL_LABELS[skill.skill] || skill.skill}
                </div>

                {/* Questions count */}
                <div className="text-xs opacity-90">
                  {skill.questionsDone} pregs
                </div>

                {/* Trend indicator */}
                {skill.trend !== undefined && (
                  <motion.div
                    className="flex items-center gap-1 text-xs font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <span>
                      {skill.trend > 0 ? '📈' : skill.trend < 0 ? '📉' : '➡️'}
                    </span>
                    <span>{skill.trend > 0 ? '+' : ''}{skill.trend}%</span>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Tooltip on hover */}
            <motion.div
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-950 text-white text-xs rounded-lg whitespace-nowrap pointer-events-none z-50"
              initial={{ opacity: 0, y: 10 }}
              animate={
                hoveredSkill === skill.skill
                  ? { opacity: 1, y: -5 }
                  : { opacity: 0, y: 10 }
              }
              transition={{ duration: 0.2 }}
            >
              Haz clic para detalles
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-950" />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <motion.div
          className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {Math.round(
              (skills.reduce((sum, s) => sum + s.accuracy, 0) / skills.length) *
                100
            )}%
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Promedio general
          </p>
        </motion.div>

        <motion.div
          className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">
            {
              skills.filter((s) => s.accuracy < 0.65).length
            }
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Necesitan refuerzo
          </p>
        </motion.div>

        <motion.div
          className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {
              skills.filter((s) => s.accuracy >= 0.85).length
            }
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Dominadas
          </p>
        </motion.div>
      </div>
    </div>
  )
}
