'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface SkillMeterProps {
  skill: string
  accuracy: number // 0-1
  targetAccuracy?: number // 0-1
  icon?: string
  size?: 'sm' | 'md' | 'lg'
  interactive?: boolean
}

const SKILL_LABELS: Record<string, string> = {
  vocabulary_basic: 'Vocabulario Básico',
  vocabulary_context: 'Vocabulario en Contexto',
  grammar_recognition: 'Gramática',
  connectors: 'Conectores',
  reference_words: 'Palabras de Referencia',
  main_idea: 'Idea Principal',
  detail: 'Detalles',
  inference: 'Inferencia',
  paraphrase: 'Paráfrasis',
  tone: 'Tono',
  purpose: 'Propósito',
  sentence_order: 'Orden de Oraciones',
  dialogue_completion: 'Diálogos',
  scanning: 'Scanning',
  time_management: 'Gestión de Tiempo',
  functional_texts: 'Textos Funcionales',
}

const SKILL_COLORS: Record<string, string> = {
  vocabulary_basic: 'from-blue-500 to-cyan-500',
  vocabulary_context: 'from-purple-500 to-pink-500',
  grammar_recognition: 'from-green-500 to-emerald-500',
  connectors: 'from-orange-500 to-red-500',
  reference_words: 'from-indigo-500 to-blue-500',
  main_idea: 'from-amber-500 to-yellow-500',
  detail: 'from-cyan-500 to-teal-500',
  inference: 'from-violet-500 to-purple-500',
  paraphrase: 'from-rose-500 to-pink-500',
  tone: 'from-fuchsia-500 to-rose-500',
  purpose: 'from-lime-500 to-green-500',
  sentence_order: 'from-sky-500 to-blue-500',
  dialogue_completion: 'from-emerald-500 to-green-500',
  scanning: 'from-yellow-500 to-amber-500',
  time_management: 'from-red-500 to-rose-500',
  functional_texts: 'from-teal-500 to-cyan-500',
}

export function SkillMeter({
  skill,
  accuracy,
  targetAccuracy = 0.85,
  icon = '📊',
  size = 'md',
  interactive = false,
}: SkillMeterProps) {
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-40 h-40',
  }

  const textSizes = {
    sm: 'text-lg font-bold',
    md: 'text-3xl font-bold',
    lg: 'text-4xl font-bold',
  }

  const gradientClass = SKILL_COLORS[skill] || 'from-blue-500 to-purple-500'
  const isGood = accuracy >= targetAccuracy
  const isMedium = accuracy >= 0.65

  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (accuracy / 1) * circumference

  const containerVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
  }

  const targetVariants = {
    animate: { opacity: 0.4, scale: 1.05 },
  }

  return (
    <motion.div
      className={`flex flex-col items-center gap-2 ${interactive ? 'cursor-pointer' : ''}`}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      whileHover={interactive ? { scale: 1.05 } : {}}
      transition={{ duration: 0.3 }}
    >
      {/* Circular progress */}
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Background circle */}
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-200 dark:text-gray-700"
          />
          {/* Target accuracy ring (outer) */}
          {targetAccuracy < 1 && (
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (targetAccuracy / 1) * circumference}
              className="text-yellow-300 dark:text-yellow-400 opacity-40"
              strokeLinecap="round"
              variants={targetVariants}
              animate="animate"
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          )}
          {/* Actual accuracy ring */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#meterGradient)"
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="drop-shadow-lg"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.8, delay: 0.1 }}
          />
          <defs>
            <linearGradient id="meterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f7c3e" />
              <stop offset="100%" stopColor="#16a34a" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={textSizes[size]}>{Math.round(accuracy * 100)}%</span>
          <span className="text-xs text-gray-500">
            {isGood ? '✓' : isMedium ? '◐' : '○'}
          </span>
        </div>
      </div>

      {/* Skill label */}
      <div className="text-center">
        <p className="text-xs font-medium text-gray-600 dark:text-gray-300">
          {SKILL_LABELS[skill] || skill}
        </p>
        {targetAccuracy < 1 && (
          <p className="text-xs text-gray-400 mt-0.5">
            Objetivo: {Math.round(targetAccuracy * 100)}%
          </p>
        )}
      </div>

      {/* Status badge */}
      {isGood && (
        <motion.div
          className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs rounded-full font-medium"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🎯 Dominado
        </motion.div>
      )}
      {isMedium && !isGood && (
        <motion.div
          className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 text-xs rounded-full font-medium"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ⚡ En progreso
        </motion.div>
      )}
      {!isMedium && (
        <motion.div
          className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 text-xs rounded-full font-medium"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🔥 Refuerzo
        </motion.div>
      )}
    </motion.div>
  )
}
