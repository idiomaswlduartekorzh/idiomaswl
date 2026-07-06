'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { saveDiagnosticAnswers } from '@/lib/actions/icfes'
import { toast } from 'sonner'

interface DiagnosticTestProps {
  userId: string
  questions: DiagnosticQuestion[]
  onComplete: (results: DiagnosticResults) => void
}

interface DiagnosticQuestion {
  id: string
  question_number: number
  question_text: string
  skill: string
  difficulty: 1 | 2 | 3 | 4 | 5
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_answer: string
  explanation_es: string
}

interface DiagnosticResults {
  overall_level: number
  skill_levels: Record<string, number>
  top_weaknesses: string[]
  recommendations: string[]
}

const SKILL_LABELS: Record<string, string> = {
  vocabulary_basic: 'Vocabulario Básico',
  vocabulary_context: 'Vocabulario en Contexto',
  grammar_recognition: 'Gramática',
  connectors: 'Conectores',
  reference_words: 'Referencias',
  main_idea: 'Idea Principal',
  detail: 'Detalles',
  inference: 'Inferencia',
  paraphrase: 'Paráfrasis',
}

export function DiagnosticTest({
  userId,
  questions,
  onComplete,
}: DiagnosticTestProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [loading, setLoading] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [timeSpent, setTimeSpent] = useState(0)

  const question = questions[currentQuestion]
  const isAnswered = answers[currentQuestion]
  const isCorrect = answers[currentQuestion] === question.correct_answer

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleSelectAnswer = (answer: string) => {
    if (isAnswered) return // Don't allow changing answer
    setSelectedAnswer(answer)
    setAnswers({
      ...answers,
      [currentQuestion]: answer,
    })
    setShowExplanation(true)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      handleComplete()
    }
  }

  const handleComplete = async () => {
    setLoading(true)
    try {
      // Prepare answers for saving
      const answersToSave = questions.map((q) => ({
        question_number: q.question_number,
        question_id: q.id,
        student_answer: answers[q.question_number - 1] || '',
        correct_answer: q.correct_answer,
        is_correct: answers[q.question_number - 1] === q.correct_answer,
        skill: q.skill,
        time_spent_seconds: Math.round(timeSpent / questions.length),
      }))

      const result = await saveDiagnosticAnswers(userId, answersToSave)

      if (result.success) {
        // Calculate results for display
        const correct = Object.values(answers).filter(
          (ans, idx) => ans === questions[idx].correct_answer
        ).length

        const skillLevels: Record<string, number> = {}
        const skillCounts: Record<string, number> = {}

        questions.forEach((q, idx) => {
          if (!skillCounts[q.skill]) skillCounts[q.skill] = 0
          if (!skillLevels[q.skill]) skillLevels[q.skill] = 0

          skillCounts[q.skill]++
          if (answers[idx] === q.correct_answer) {
            skillLevels[q.skill]++
          }
        })

        const skillPercentages: Record<string, number> = {}
        for (const skill in skillLevels) {
          skillPercentages[skill] = Math.round(
            (skillLevels[skill] / skillCounts[skill]) * 100
          )
        }

        const weaknesses = Object.entries(skillPercentages)
          .filter(([_, level]) => level < 65)
          .map(([skill]) => skill)
          .sort((a, b) => skillPercentages[a] - skillPercentages[b])
          .slice(0, 3)

        const overallLevel = Math.round((correct / questions.length) * 100)

        const results: DiagnosticResults = {
          overall_level: overallLevel,
          skill_levels: skillPercentages,
          top_weaknesses: weaknesses,
          recommendations: [],
        }

        setCompleted(true)
        onComplete(results)
        toast.success('¡Diagnóstico completado!')
      } else {
        toast.error('Error guardando resultados')
      }
    } catch (error) {
      toast.error('Error en el diagnóstico')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (completed) {
    return null // Results handled by parent
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-8">
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              🎯 Prueba de Diagnóstico
            </h1>
            <div className="text-right">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Pregunta {currentQuestion + 1} de {questions.length}
              </div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: '0%' }}
              animate={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Skill badge */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-medium rounded-full">
              {SKILL_LABELS[question.skill] || question.skill}
            </span>
          </div>

          {/* Question text */}
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-8">
            {question.question_text}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {[
              { key: 'A', text: question.option_a },
              { key: 'B', text: question.option_b },
              { key: 'C', text: question.option_c },
              { key: 'D', text: question.option_d },
            ].map((option) => (
              <motion.button
                key={option.key}
                onClick={() => handleSelectAnswer(option.key)}
                disabled={isAnswered}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left flex items-start gap-3 ${
                  isAnswered && answers[currentQuestion] === option.key
                    ? isCorrect
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                    : isAnswered && option.key === question.correct_answer
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-400'
                }`}
                whileHover={!isAnswered ? { scale: 1.01 } : {}}
                whileTap={!isAnswered ? { scale: 0.99 } : {}}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm ${
                    isAnswered && answers[currentQuestion] === option.key
                      ? isCorrect
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-red-500 bg-red-500 text-white'
                      : isAnswered && option.key === question.correct_answer
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-gray-400 dark:border-gray-600'
                  }`}
                >
                  {option.key}
                </div>
                <span className="text-gray-900 dark:text-gray-100 pt-1">
                  {option.text}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {showExplanation && isAnswered && (
              <motion.div
                className={`mt-6 p-4 rounded-lg ${
                  isCorrect
                    ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700'
                    : 'bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <p className={`font-bold mb-2 ${
                  isCorrect
                    ? 'text-green-700 dark:text-green-400'
                    : 'text-red-700 dark:text-red-400'
                }`}>
                  {isCorrect ? '✅ ¡Correcto!' : '❌ Incorrecto'}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {question.explanation_es}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Navigation */}
        <div className="flex gap-3">
          {isAnswered && (
            <motion.button
              onClick={handleNext}
              disabled={loading}
              className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading
                ? 'Guardando...'
                : currentQuestion === questions.length - 1
                  ? '✅ Terminar'
                  : 'Siguiente →'}
            </motion.button>
          )}
        </div>

        {/* Hint */}
        {!isAnswered && (
          <motion.p
            className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            💡 Lee con cuidado. Las opciones son adaptativas según tu nivel.
          </motion.p>
        )}
      </motion.div>
    </div>
  )
}
