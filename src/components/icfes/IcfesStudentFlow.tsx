'use client'

import { useState, useEffect } from 'react'
import { getOnboarding, getDiagnosticResults } from '@/lib/actions/icfes'
import { OnboardingFlow } from './OnboardingFlow'
import { DiagnosticTest } from './DiagnosticTest'
import { IcfesDashboardClient } from './IcfesDashboardClient'
import type { OnboardingProfile } from '@/lib/types/icfes'
import { ICFES_DIAGNOSTIC_QUESTIONS } from '@/data/icfes-diagnostic-questions'

interface IcfesStudentFlowProps {
  userId: string
  userName: string
}

interface StudentState {
  status: 'loading' | 'onboarding' | 'diagnostic' | 'learning'
  onboardingProfile?: OnboardingProfile
  diagnosticResults?: any
}

/** Map a persisted icfes_onboarding row into the client OnboardingProfile shape. */
function rowToProfile(row: any): OnboardingProfile {
  return {
    level: row.initial_level,
    minPerDay: row.min_per_day,
    goal: row.goal,
    examDate: new Date(row.exam_date),
    weeksAvailable: row.weeks_available,
    recommendedPace: row.recommended_pace,
  }
}

/**
 * Main flow orchestrator for ICFES student journey
 * Manages: Onboarding → Diagnostic → Learning Dashboard
 */
export function IcfesStudentFlow({ userId, userName }: IcfesStudentFlowProps) {
  const [state, setState] = useState<StudentState>({ status: 'loading' })

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
          onboardingProfile: rowToProfile(onboardingResult.data),
        })
        return
      }

      // Both done → show learning dashboard
      setState({
        status: 'learning',
        onboardingProfile: rowToProfile(onboardingResult.data),
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

  if (state.status === 'diagnostic') {
    return (
      <DiagnosticTest
        userId={userId}
        questions={ICFES_DIAGNOSTIC_QUESTIONS}
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
