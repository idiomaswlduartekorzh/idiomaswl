import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { IcfesDashboardClient } from '@/components/icfes/IcfesDashboardClient'

// Temporary mock data (será reemplazado por datos de Supabase)
const MOCK_DAILY_CHALLENGE = {
  skill: 'paraphrase',
  questions: [
    {
      id: '1',
      text: 'The government enacted strict legislation to combat pollution.',
      options: [
        'A) El gobierno canceló las leyes sobre contaminación',
        'B) El gobierno aprobó leyes estrictas para combatir la contaminación',
        'C) El gobierno estudió la contaminación con legislación',
        'D) El gobierno eliminó todo tipo de leyes',
      ],
      correctAnswer: 'B) El gobierno aprobó leyes estrictas para combatir la contaminación',
      explanation:
        '"Enacted" significa aprobó o promulgó. La opción B refleja correctamente el significado. "Cancel" sería "canceló", no "enacted".',
    },
    {
      id: '2',
      text: 'The scientist\'s findings were ambiguous and required further investigation.',
      options: [
        'A) Los hallazgos fueron claros e inmediatos',
        'B) Los hallazgos fueron confusos y necesitaban más estudio',
        'C) Los hallazgos fueron falsos',
        'D) Los hallazgos fueron perfectos',
      ],
      correctAnswer: 'B) Los hallazgos fueron confusos y necesitaban más estudio',
      explanation: '"Ambiguous" significa ambiguo o confuso, no claro. "Required further investigation" confirma la necesidad de más estudio.',
    },
    {
      id: '3',
      text: 'Despite the setback, the team persevered and achieved their goal.',
      options: [
        'A) El equipo se rindió ante el revés',
        'B) El equipo ignoró el revés',
        'C) El equipo continuó a pesar del revés y logró su objetivo',
        'D) El equipo nunca tuvo reveses',
      ],
      correctAnswer: 'C) El equipo continuó a pesar del revés y logró su objetivo',
      explanation: '"Persevered" significa persistió o continuó esforzándose. "Despite" indica que a pesar del revés, lograron el objetivo.',
    },
    {
      id: '4',
      text: 'The theory was refuted by new empirical evidence.',
      options: [
        'A) La teoría fue probada por evidencia nueva',
        'B) La teoría fue refutada por evidencia empírica nueva',
        'C) La teoría fue confirmada',
        'D) No hay evidencia para la teoría',
      ],
      correctAnswer: 'B) La teoría fue refutada por evidencia empírica nueva',
      explanation: '"Refuted" significa refutada o desmentida. "Empirical evidence" es evidencia basada en observación y experimento.',
    },
    {
      id: '5',
      text: 'The novel depicts a utopian society where conflict has been eradicated.',
      options: [
        'A) La novela muestra una sociedad con mucho conflicto',
        'B) La novela retrata una sociedad ideal donde el conflicto ha sido eliminado',
        'C) La novela describe un lugar pobre',
        'D) La novela no menciona conflictos',
      ],
      correctAnswer: 'B) La novela retrata una sociedad ideal donde el conflicto ha sido eliminado',
      explanation: '"Utopian" significa utópico o ideal. "Eradicated" significa erradicado o eliminado completamente.',
    },
  ],
}

const MOCK_RECENT_MOCKS = [
  {
    id: '1',
    title: 'ICFES 2023 Grado 11',
    subtitle: 'Cuadernillo oficial',
    score: 19,
    maxScore: 25,
    band: 'A' as const,
    timeSpent: 3270,
    completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: '2',
    title: 'ICFES 2022 Grado 11',
    subtitle: 'Simulado de diagnóstico',
    score: 17,
    maxScore: 25,
    band: 'A-' as const,
    timeSpent: 3815,
    completedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
  },
  {
    id: '3',
    title: 'ICFES 2021 Examen 1',
    subtitle: 'Cuadernillo oficial',
    score: 16,
    maxScore: 25,
    band: 'A-' as const,
    timeSpent: 3600,
    completedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
  },
]

const MOCK_WEAKNESSES = [
  {
    skill: 'paraphrase',
    accuracy: 0.52,
    targetAccuracy: 0.85,
    questionsDone: 34,
    trend: -8,
  },
  {
    skill: 'vocabulary_context',
    accuracy: 0.61,
    targetAccuracy: 0.85,
    questionsDone: 52,
    trend: -3,
  },
  {
    skill: 'main_idea',
    accuracy: 0.75,
    targetAccuracy: 0.85,
    questionsDone: 41,
    trend: 5,
  },
]

const MOCK_ALL_SKILLS = [
  { skill: 'vocabulary_basic', accuracy: 0.88, questionsDone: 67, trend: 3 },
  { skill: 'vocabulary_context', accuracy: 0.61, questionsDone: 52, trend: -3 },
  { skill: 'grammar_recognition', accuracy: 0.72, questionsDone: 45, trend: 2 },
  { skill: 'connectors', accuracy: 0.68, questionsDone: 38, trend: 1 },
  { skill: 'reference_words', accuracy: 0.74, questionsDone: 42, trend: 4 },
  { skill: 'main_idea', accuracy: 0.75, questionsDone: 41, trend: 5 },
  { skill: 'detail', accuracy: 0.71, questionsDone: 39, trend: 0 },
  { skill: 'inference', accuracy: 0.64, questionsDone: 33, trend: -2 },
  { skill: 'paraphrase', accuracy: 0.52, questionsDone: 34, trend: -8 },
  { skill: 'tone', accuracy: 0.66, questionsDone: 28, trend: 1 },
  { skill: 'purpose', accuracy: 0.69, questionsDone: 31, trend: 3 },
  { skill: 'sentence_order', accuracy: 0.73, questionsDone: 29, trend: 2 },
  { skill: 'dialogue_completion', accuracy: 0.81, questionsDone: 36, trend: 4 },
  { skill: 'scanning', accuracy: 0.78, questionsDone: 35, trend: 2 },
  { skill: 'time_management', accuracy: 0.65, questionsDone: 8, trend: -5 },
  { skill: 'functional_texts', accuracy: 0.79, questionsDone: 33, trend: 3 },
]

export default async function IcfesDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // TODO: Reemplazar datos mockeados con datos reales de Supabase
  const profile = {
    full_name: 'María García',
    plan: 'intensivo',
  }

  const estimatedBand = 'A' as const
  const overallAccuracy = 0.68
  const mocksTaken = MOCK_RECENT_MOCKS.length
  const consistencyDays = 12

  const examDate = new Date()
  examDate.setDate(examDate.getDate() + 35) // 5 semanas
  const weeksRemaining = 5
  const currentWeek = 1

  return (
    <IcfesDashboardClient
      studentName={profile.full_name || 'Estudiante'}
      estimatedBand={estimatedBand}
      overallAccuracy={overallAccuracy}
      mocksTaken={mocksTaken}
      consistencyDays={consistencyDays}
      recentMocks={MOCK_RECENT_MOCKS}
      weaknesses={MOCK_WEAKNESSES}
      allSkills={MOCK_ALL_SKILLS}
      todayChallenge={MOCK_DAILY_CHALLENGE}
      prepPlan={{
        examDate,
        weeksRemaining,
        currentWeek,
      }}
    />
  )
}
