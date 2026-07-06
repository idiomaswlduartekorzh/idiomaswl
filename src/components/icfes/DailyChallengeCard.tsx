'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface Question {
  id: string
  text: string
  options: string[]
  correctAnswer: string
  explanation: string
}

interface DailyChallengeCardProps {
  skill: string
  questions: Question[]
  timeLimit?: number // segundos
  onComplete?: (correct: number, timeSpent: number) => void
}

const SKILL_LABELS: Record<string, { label: string; emoji: string }> = {
  vocabulary_context: { label: 'Vocabulario en Contexto', emoji: '📚' },
  paraphrase: { label: 'Paráfrasis', emoji: '🔄' },
  grammar_recognition: { label: 'Gramática', emoji: '✏️' },
  connectors: { label: 'Conectores', emoji: '🔗' },
  main_idea: { label: 'Idea Principal', emoji: '💡' },
  inference: { label: 'Inferencia', emoji: '🔍' },
  reference_words: { label: 'Referencias', emoji: '👉' },
  default: { label: 'Reto Diario', emoji: '🎯' },
}

export function DailyChallengeCard({
  skill,
  questions,
  timeLimit = 300, // 5 minutos
  onComplete,
}: DailyChallengeCardProps) {
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(timeLimit)
  const [showExplanation, setShowExplanation] = useState(false)

  const skillInfo = SKILL_LABELS[skill] || SKILL_LABELS.default
  const q = questions[currentQ]
  const isCorrect = selectedAnswer === q.correctAnswer

  // Timer
  useEffect(() => {
    if (completed || showFeedback) return
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCompleted(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [completed, showFeedback])

  const handleSelectAnswer = (option: string) => {
    if (showFeedback || completed) return
    setSelectedAnswer(option)
    setShowFeedback(true)
  }

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setAnswers([...answers, selectedAnswer || ''])
      setCurrentQ(currentQ + 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
      setShowExplanation(false)
    } else {
      setAnswers([...answers, selectedAnswer || ''])
      const correct = answers.filter(
        (ans, idx) => ans === questions[idx].correctAnswer
      ).length
      setCompleted(true)
      const timeSpent = timeLimit - timeLeft
      onComplete?.(correct, timeSpent)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const correctSoFar = answers.filter(
    (ans, idx) => ans === questions[idx].correctAnswer
  ).length

  if (completed) {
    const totalCorrect =
      correctSoFar + (isCorrect ? 1 : 0)
    const accuracy = Math.round((totalCorrect / questions.length) * 100)

    return (
      <motion.div
        className="rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 overflow-hidden shadow-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {/* Header */}
        <div className="h-32 bg-gradient-to-br from-green-500 to-emerald-500 relative overflow-hidden">
          <motion.div
            className="absolute w-40 h-40 bg-white/10 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ top: -50, right: -50 }}
          />
          <div className="relative h-full flex flex-col justify-between p-6 text-white">
            <h3 className="text-2xl font-bold">¡Reto completado! 🎉</h3>
          </div>
        </div>

        {/* Results */}
        <div className="p-6 space-y-6">
          {/* Score */}
          <div className="text-center space-y-2">
            <motion.div
              className="text-6xl font-bold text-green-600 dark:text-green-400"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
            >
              {totalCorrect}/{questions.length}
            </motion.div>
            <p className="text-gray-600 dark:text-gray-400">
              {accuracy}% de precisión
            </p>
          </div>

          {/* Feedback */}
          <motion.div
            className={`p-4 rounded-xl text-center text-sm font-medium ${
              accuracy >= 80
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                : accuracy >= 60
                  ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                  : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {accuracy >= 80 && '¡Excelente! Sigue así.'}
            {accuracy >= 60 && accuracy < 80 && 'Buen esfuerzo. Practica más.'}
            {accuracy < 60 && 'Necesitas reforzar esta área. No te desanimes.'}
          </motion.div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-3">
            <motion.div
              className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-xs text-gray-600 dark:text-gray-400">Correctas</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {totalCorrect}
              </p>
            </motion.div>
            <motion.div
              className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-xs text-gray-600 dark:text-gray-400">Incorrectas</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                {questions.length - totalCorrect}
              </p>
            </motion.div>
            <motion.div
              className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-xs text-gray-600 dark:text-gray-400">Tiempo</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {formatTime(timeLimit - timeLeft)}
              </p>
            </motion.div>
          </div>

          {/* CTA */}
          <button className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:shadow-lg transition-shadow">
            Volver al Dashboard
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 overflow-hidden shadow-lg"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      {/* Header with skill info and timer */}
      <div className="h-24 bg-gradient-to-br from-blue-500 to-purple-500 relative overflow-hidden">
        <motion.div
          className="absolute w-32 h-32 bg-white/10 rounded-full"
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{ top: -50, right: -50 }}
        />

        <div className="relative h-full flex justify-between items-center px-6 text-white">
          <div>
            <p className="text-sm opacity-90">Reto del día</p>
            <p className="text-xl font-bold flex items-center gap-2">
              <span>{skillInfo.emoji}</span> {skillInfo.label}
            </p>
          </div>

          {/* Timer */}
          <motion.div
            className={`text-center ${timeLeft < 60 ? 'animate-pulse' : ''}`}
          >
            <p className="text-sm opacity-90">Tiempo</p>
            <p className={`text-3xl font-bold font-mono ${
              timeLeft < 60 ? 'text-red-200' : 'text-white'
            }`}>
              {formatTime(timeLeft)}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Progress */}
      <div className="px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Pregunta {currentQ + 1} de {questions.length}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            {correctSoFar} correcta{correctSoFar !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="p-6 space-y-6">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {q.text}
          </p>

          {/* Options */}
          <div className="space-y-2">
            {q.options.map((option, idx) => (
              <motion.button
                key={idx}
                onClick={() => handleSelectAnswer(option)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  selectedAnswer === option
                    ? isCorrect
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20 dark:border-green-400'
                      : 'border-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-400'
                    : showFeedback
                      ? 'border-gray-200 dark:border-gray-700 opacity-50'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-400'
                }`}
                disabled={showFeedback}
                whileHover={!showFeedback ? { scale: 1.02 } : {}}
                whileTap={!showFeedback ? { scale: 0.98 } : {}}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                      selectedAnswer === option
                        ? isCorrect
                          ? 'border-green-500 bg-green-500 text-white'
                          : 'border-red-500 bg-red-500 text-white'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    {isCorrect && selectedAnswer === option ? '✓' : '✕'}
                  </div>
                  <span className="text-sm text-gray-900 dark:text-gray-100">
                    {option}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Feedback */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`p-4 rounded-lg ${
                isCorrect
                  ? 'bg-green-100 dark:bg-green-900/30'
                  : 'bg-red-100 dark:bg-red-900/30'
              }`}
            >
              <p
                className={`font-semibold mb-2 ${
                  isCorrect
                    ? 'text-green-700 dark:text-green-400'
                    : 'text-red-700 dark:text-red-400'
                }`}
              >
                {isCorrect ? '✓ ¡Correcto!' : '✗ Incorrecto'}
              </p>
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline mb-2"
              >
                {showExplanation ? 'Ocultar' : 'Ver'} explicación
              </button>
              {showExplanation && (
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                  {q.explanation}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next button */}
        {showFeedback && (
          <motion.button
            onClick={handleNext}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg transition-shadow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {currentQ < questions.length - 1 ? 'Siguiente' : 'Finalizar'}
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}
