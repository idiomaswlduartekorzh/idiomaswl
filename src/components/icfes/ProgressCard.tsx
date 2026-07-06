'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ProgressCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: ReactNode
  trend?: 'up' | 'down' | 'stable'
  trendValue?: string
  gradient?: string
  onClick?: () => void
}

export function ProgressCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendValue,
  gradient = 'from-blue-500 to-cyan-500',
  onClick,
}: ProgressCardProps) {
  const trendColors = {
    up: 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30',
    down: 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30',
    stable: 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30',
  }

  const trendIcons = {
    up: '↑',
    down: '↓',
    stable: '→',
  }

  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 backdrop-blur-md transition-all duration-300 ${
        onClick ? 'cursor-pointer hover:border-gray-300 dark:hover:border-slate-600 hover:shadow-lg' : 'shadow-md'
      }`}
      onClick={onClick}
      whileHover={onClick ? { scale: 1.02, y: -4 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Gradient background decoration */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-10 rounded-full -mr-16 -mt-16`} />

      {/* Content */}
      <div className="relative p-6 space-y-3">
        {/* Header with icon */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              {title}
            </p>
          </div>
          {icon && <div className="text-2xl">{icon}</div>}
        </div>

        {/* Main value */}
        <div className="flex items-baseline gap-2">
          <motion.span
            className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {value}
          </motion.span>
          {trend && (
            <motion.div
              className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 ${trendColors[trend]}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <span>{trendIcons[trend]}</span>
              <span>{trendValue}</span>
            </motion.div>
          )}
        </div>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
        )}
      </div>

      {/* Bottom accent line */}
      <div className={`h-1 bg-gradient-to-r ${gradient}`} />
    </motion.div>
  )
}
