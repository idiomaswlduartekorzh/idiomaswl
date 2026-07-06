'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface MockResultCardProps {
  id: string
  title: string
  subtitle?: string
  score: number
  maxScore: number
  band: 'A-' | 'A' | 'A+' | 'B' | 'B+'
  timeSpent: number // segundos
  completedAt: Date
  isPerfect?: boolean
  onClick?: () => void
  href?: string
}

const BAND_COLORS: Record<string, { bg: string; text: string; icon: string }> = {
  'A+': {
    bg: 'from-emerald-500 to-green-500',
    text: 'text-emerald-600 dark:text-emerald-400',
    icon: '⭐',
  },
  'A': {
    bg: 'from-green-500 to-lime-500',
    text: 'text-green-600 dark:text-green-400',
    icon: '✨',
  },
  'A-': {
    bg: 'from-lime-500 to-yellow-500',
    text: 'text-yellow-600 dark:text-yellow-400',
    icon: '⚡',
  },
  'B': {
    bg: 'from-yellow-500 to-orange-500',
    text: 'text-orange-600 dark:text-orange-400',
    icon: '🔥',
  },
  'B+': {
    bg: 'from-orange-500 to-red-500',
    text: 'text-red-600 dark:text-red-400',
    icon: '⚠️',
  },
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function MockResultCard({
  id,
  title,
  subtitle,
  score,
  maxScore,
  band,
  timeSpent,
  completedAt,
  isPerfect = false,
  onClick,
  href,
}: MockResultCardProps) {
  const accuracy = (score / maxScore) * 100
  const bandInfo = BAND_COLORS[band]
  const isOvertime = timeSpent > 3600 // 60 minutes

  const cardContent = (
    <motion.div
      className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 transition-all duration-300 cursor-pointer hover:shadow-lg hover:border-gray-300 dark:hover:border-slate-600"
      whileHover={{ scale: 1.02, y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      {/* Gradient header */}
      <div className={`h-24 bg-gradient-to-br ${bandInfo.bg} relative overflow-hidden`}>
        {/* Animated background elements */}
        <motion.div
          className="absolute w-32 h-32 bg-white/10 rounded-full"
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{ top: -50, right: -50 }}
        />
        <motion.div
          className="absolute w-24 h-24 bg-white/10 rounded-full"
          animate={{ x: [0, -15, 0], y: [0, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          style={{ bottom: -40, left: -40 }}
        />

        {/* Perfect badge */}
        {isPerfect && (
          <motion.div
            className="absolute top-2 right-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold flex items-center gap-1"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            <span>🏆</span> ¡Perfecto!
          </motion.div>
        )}

        {/* Title */}
        <div className="relative h-full flex flex-col justify-between p-4 text-white">
          <div>
            <h3 className="text-lg font-bold">{title}</h3>
            {subtitle && <p className="text-xs text-white/80">{subtitle}</p>}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Score and Band */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {score}/{maxScore}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {Math.round(accuracy)}%
            </p>
          </div>
          <motion.div
            className="text-right"
            whileHover={{ scale: 1.1 }}
          >
            <div
              className={`text-4xl font-bold bg-gradient-to-br ${bandInfo.bg} bg-clip-text text-transparent`}
            >
              {band}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {bandInfo.icon} Banda predicha
            </p>
          </motion.div>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
            <span>Precisión</span>
            <span>{Math.round(accuracy)}%</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${bandInfo.bg}`}
              initial={{ width: 0 }}
              animate={{ width: `${accuracy}%` }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-xs text-gray-600 dark:text-gray-400">
              ⏱️ Tiempo
            </p>
            <p className={`text-sm font-semibold ${isOvertime ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
              {formatTime(timeSpent)}
            </p>
            {isOvertime && (
              <p className="text-xs text-red-600 dark:text-red-400">
                +{formatTime(timeSpent - 3600)}
              </p>
            )}
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-xs text-gray-600 dark:text-gray-400">
              📅 Completado
            </p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {completedAt.toLocaleDateString('es-CO', {
                month: 'short',
                day: 'numeric',
              })}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {completedAt.toLocaleDateString('es-CO', {
                weekday: 'short',
              })}
            </p>
          </motion.div>
        </div>
      </div>

      {/* CTA */}
      <motion.div
        className="px-5 pb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <button className="w-full py-2 px-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-shadow">
          📊 Ver desglose por skill
        </button>
      </motion.div>
    </motion.div>
  )

  if (href) {
    return <Link href={href}>{cardContent}</Link>
  }

  return cardContent
}
