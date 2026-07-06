'use client'

import { useState, useEffect } from 'react'
import { getOnboarding, getDiagnosticResults } from '@/lib/actions/icfes'
import { OnboardingFlow } from './OnboardingFlow'
import { DiagnosticTest } from './DiagnosticTest'
import { IcfesDashboardClient } from './IcfesDashboardClient'
import type { OnboardingProfile } from './OnboardingFlow'

interface IcfesStudentFlowProps {
  userId: string
  userName: string
}

interface StudentState {
  status: 'loading' | 'onboarding' | 'diagnostic' | 'learning'
  onboardingProfile?: OnboardingProfile
  diagnosticResults?: any
}

/**
 * Main flow orchestrator for ICFES student journey
 * Manages: Onboarding → Diagnostic → Learning Dashboard
 */
export function IcfesStudentFlow({ userId, userName }: IcfesStudentFlowProps) {
  const [state, setState] = useState<StudentState>({ status: 'loading' })
  const [diagnosticQuestions, setDiagnosticQuestions] = useState<any[]>([])

  // Check student's progress
  useEffect(() => {
    const checkProgress = async () => {
      // Check if onboarding completed
      const onboardingResult = await getOnboarding(userId)

      if (!onboardingResult.success) {
        // No onboarding → show wizard
        setState({ status: 'onboarding' })
        return
      }

      // Check if diagnostic completed
      const diagnosticResult = await getDiagnosticResults(userId)

      if (!diagnosticResult.success) {
        // Onboarding done, diagnostic pending → show test
        setState({
          status: 'diagnostic',
          onboardingProfile: {
            level: onboardingResult.data.initial_level as any,
            minPerDay: onboardingResult.data.min_per_day as any,
            goal: onboardingResult.data.goal as any,
            examDate: new Date(onboardingResult.data.exam_date),
            weeksAvailable: onboardingResult.data.weeks_available,
            recommendedPace: onboardingResult.data.recommended_pace as any,
          },
        })

        // Load diagnostic questions
        // TODO: Fetch from DB
        const mockQuestions = generateMockDiagnosticQuestions()
        setDiagnosticQuestions(mockQuestions)
        return
      }

      // Both done → show learning dashboard
      setState({
        status: 'learning',
        onboardingProfile: {
          level: onboardingResult.data.initial_level as any,
          minPerDay: onboardingResult.data.min_per_day as any,
          goal: onboardingResult.data.goal as any,
          examDate: new Date(onboardingResult.data.exam_date),
          weeksAvailable: onboardingResult.data.weeks_available,
          recommendedPace: onboardingResult.data.recommended_pace as any,
        },
        diagnosticResults: diagnosticResult.data,
      })
    }

    checkProgress()
  }, [userId])

  // Handlers
  const handleOnboardingComplete = (profile: OnboardingProfile) => {
    setState({
      status: 'diagnostic',
      onboardingProfile: profile,
    })

    // Load diagnostic questions
    const mockQuestions = generateMockDiagnosticQuestions()
    setDiagnosticQuestions(mockQuestions)
  }

  const handleDiagnosticComplete = (results: any) => {
    if (state.onboardingProfile) {
      setState({
        status: 'learning',
        onboardingProfile: state.onboardingProfile,
        diagnosticResults: results,
      })
    }
  }

  // Render based on state
  if (state.status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-950 dark:to-slate-900">
        <div className="text-center">
          <div className="mb-4 text-6xl">🚀</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Cargando tu perfil ICFES...
          </h1>
        </div>
      </div>
    )
  }

  if (state.status === 'onboarding') {
    return (
      <OnboardingFlow
        userId={userId}
        onComplete={handleOnboardingComplete}
      />
    )
  }

  if (state.status === 'diagnostic' && diagnosticQuestions.length > 0) {
    return (
      <DiagnosticTest
        userId={userId}
        questions={diagnosticQuestions}
        onComplete={handleDiagnosticComplete}
      />
    )
  }

  if (state.status === 'learning' && state.onboardingProfile && state.diagnosticResults) {
    return (
      <IcfesDashboardClient
        studentName={userName}
        estimatedBand="A"
        overallAccuracy={state.diagnosticResults.overall_level / 100}
        mocksTaken={0}
        consistencyDays={0}
        recentMocks={[]}
        weaknesses={state.diagnosticResults.top_weaknesses.map((skill: string) => ({
          skill,
          accuracy: (state.diagnosticResults.skill_levels[skill] || 0) / 100,
          targetAccuracy: 0.85,
          questionsDone: 0,
        }))}
        allSkills={Object.entries(state.diagnosticResults.skill_levels || {}).map(
          ([skill, level]: [string, any]) => ({
            skill,
            accuracy: level / 100,
            questionsDone: 0,
          })
        )}
        prepPlan={{
          examDate: state.onboardingProfile.examDate,
          weeksRemaining: state.onboardingProfile.weeksAvailable,
          currentWeek: 1,
        }}
      />
    )
  }

  return null
}

/**
 * Generate mock diagnostic questions for testing
 * TODO: Replace with DB fetch
 */
function generateMockDiagnosticQuestions() {
  return [
    {
      id: '1',
      question_number: 1,
      question_text: 'What does "enact" mean in this context: "The government enacted strict legislation"?',
      skill: 'vocabulary_context',
      difficulty: 2,
      option_a: 'Cancel',
      option_b: 'Approve and put into law',
      option_c: 'Ignore',
      option_d: 'Study',
      correct_answer: 'B',
      explanation_es:
        '"Enact" significa promulgar o convertir en ley. Es un verbo común en textos legislativos.',
    },
    {
      id: '2',
      question_number: 2,
      question_text: 'Which word can best replace "ambiguous" in: "The message was ambiguous"?',
      skill: 'vocabulary_context',
      difficulty: 2,
      option_a: 'Clear',
      option_b: 'Confusing or unclear',
      option_c: 'Loud',
      option_d: 'Old',
      correct_answer: 'B',
      explanation_es:
        '"Ambiguous" significa que tiene más de un significado o es confuso. Es lo opuesto a "clear".',
    },
    {
      id: '3',
      question_number: 3,
      question_text:
        'What is the main idea of this text: "Trees help reduce carbon dioxide. They also provide oxygen and create habitats for animals."',
      skill: 'main_idea',
      difficulty: 2,
      option_a: 'Animals live in trees',
      option_b: 'Trees have many environmental benefits',
      option_c: 'Carbon dioxide is bad',
      option_d: 'Oxygen is important',
      correct_answer: 'B',
      explanation_es:
        'La idea principal es que los árboles tienen muchos beneficios ambientales (CO2, oxígeno, hábitat).',
    },
    // ... Add more questions (20 total for real diagnostic)
  ]
}
