'use server'

import { createClient } from '@/lib/supabase/server'
import type { OnboardingProfile } from '@/components/icfes/OnboardingFlow'

/**
 * SPRINT 1: Onboarding
 * Save student's initial profile from 5-step wizard
 */
export async function saveOnboarding(
  userId: string,
  profile: OnboardingProfile
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const supabase = await createClient()

    // Verify user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || user.id !== userId) {
      throw new Error('Unauthorized')
    }

    // Insert onboarding record
    const { data, error } = await supabase
      .from('icfes_onboarding')
      .insert({
        user_id: userId,
        initial_level: profile.level,
        min_per_day: profile.minPerDay,
        goal: profile.goal,
        exam_date: profile.examDate,
        weeks_available: profile.weeksAvailable,
        recommended_pace: profile.recommendedPace,
      })
      .select('id')
      .single()

    if (error) throw error

    // Update or create profile summary
    await supabase
      .from('icfes_student_profile_summary')
      .upsert({
        user_id: userId,
        onboarding_completed: true,
        current_level: profile.level,
        target_band: profile.goal === 'bandAPlus' ? 'A+' : profile.goal === 'bandA' ? 'A' : 'Pass',
        weeks_to_exam: profile.weeksAvailable,
        updated_at: new Date().toISOString(),
      })

    return {
      success: true,
      id: data.id,
    }
  } catch (error) {
    console.error('Error saving onboarding:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * SPRINT 1: Diagnostic
 * Save diagnostic test answers
 */
export async function saveDiagnosticAnswers(
  userId: string,
  answers: DiagnosticAnswer[]
): Promise<{ success: boolean; resultId?: string; error?: string }> {
  try {
    const supabase = await createClient()

    // Verify user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || user.id !== userId) {
      throw new Error('Unauthorized')
    }

    // Calculate results
    const totalQuestions = answers.length
    const correctAnswers = answers.filter((a) => a.is_correct).length
    const overallLevel = Math.round((correctAnswers / totalQuestions) * 100)

    // Group by skill
    const skillLevels: Record<string, number> = {}
    for (const answer of answers) {
      if (!skillLevels[answer.skill]) {
        skillLevels[answer.skill] = 0
      }
      skillLevels[answer.skill] += answer.is_correct ? 1 : 0
    }

    // Convert to percentages
    const skillPercentages: Record<string, number> = {}
    const skillCounts: Record<string, number> = {}

    for (const answer of answers) {
      if (!skillCounts[answer.skill]) skillCounts[answer.skill] = 0
      skillCounts[answer.skill]++
    }

    for (const skill in skillLevels) {
      skillPercentages[skill] = Math.round(
        (skillLevels[skill] / skillCounts[skill]) * 100
      )
    }

    // Find weaknesses (skills < 65%)
    const weaknesses = Object.entries(skillPercentages)
      .filter(([_, level]) => level < 65)
      .map(([skill]) => skill)
      .sort((a, b) => skillPercentages[a] - skillPercentages[b])
      .slice(0, 3)

    // Find strengths (skills >= 75%)
    const strengths = Object.entries(skillPercentages)
      .filter(([_, level]) => level >= 75)
      .map(([skill]) => skill)

    // Insert diagnostic result
    const { data: resultData, error: resultError } = await supabase
      .from('icfes_diagnostic_results')
      .insert({
        user_id: userId,
        test_started_at: new Date(Date.now() - 30 * 60000), // 30 min ago
        test_completed_at: new Date(),
        total_questions: totalQuestions,
        questions_answered: totalQuestions,
        overall_level: overallLevel,
        time_spent_seconds: 30 * 60,
        skill_levels: skillPercentages,
        top_weaknesses: weaknesses,
        top_strengths: strengths,
        recommendations: generateRecommendations(weaknesses, overallLevel),
      })
      .select('id')
      .single()

    if (resultError) throw resultError

    // Insert individual answers
    const answersToInsert = answers.map((answer) => ({
      user_id: userId,
      diagnostic_result_id: resultData.id,
      question_number: answer.question_number,
      question_id: answer.question_id,
      student_answer: answer.student_answer,
      correct_answer: answer.correct_answer,
      is_correct: answer.is_correct,
      time_spent_seconds: answer.time_spent_seconds,
    }))

    const { error: answersError } = await supabase
      .from('icfes_diagnostic_answers')
      .insert(answersToInsert)

    if (answersError) throw answersError

    // Update profile summary
    await supabase
      .from('icfes_student_profile_summary')
      .upsert({
        user_id: userId,
        diagnostic_completed: true,
        current_level: overallLevel,
        updated_at: new Date().toISOString(),
      })

    return {
      success: true,
      resultId: resultData.id,
    }
  } catch (error) {
    console.error('Error saving diagnostic:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Get student's onboarding profile
 */
export async function getOnboarding(userId: string) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('icfes_onboarding')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error('Error fetching onboarding:', error)
    return { success: false, data: null }
  }
}

/**
 * Get student's diagnostic results
 */
export async function getDiagnosticResults(userId: string) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('icfes_diagnostic_results')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .single()

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error('Error fetching diagnostic:', error)
    return { success: false, data: null }
  }
}

/**
 * Helper: Generate recommendations based on weaknesses
 */
function generateRecommendations(weaknesses: string[], overallLevel: number): string[] {
  const recommendations: string[] = []

  if (overallLevel < 30) {
    recommendations.push('Necesitas refuerzo en fundamentals - empieza con vocabulario básico')
  } else if (overallLevel < 50) {
    recommendations.push('Buen inicio - enfócate en cerrar gaps en tu vocabulario')
  } else if (overallLevel < 70) {
    recommendations.push('Vas bien - ahora practica las habilidades complejas')
  } else {
    recommendations.push('Excelente base - solo necesitas pulir y practicar bajo presión')
  }

  if (weaknesses.includes('vocabulary_context')) {
    recommendations.push('Prioridad: Domina vocabulario en contexto (40% de ICFES)')
  }

  if (weaknesses.includes('paraphrase')) {
    recommendations.push('Prioridad: Aprende a reconocer paráfrasis (skill clave)')
  }

  if (weaknesses.includes('time_management')) {
    recommendations.push('Nota: Practica speed reading y timing strategies')
  }

  return recommendations
}

// ============================================================================
// TYPES
// ============================================================================

export interface DiagnosticAnswer {
  question_number: number
  question_id: string
  student_answer: string
  correct_answer: string
  is_correct: boolean
  skill: string
  time_spent_seconds: number
}

export interface OnboardingProfile {
  level: 0 | 20 | 40 | 60 | 80 | 100
  minPerDay: 30 | 60 | 90 | 120
  goal: 'pass' | 'bandA' | 'bandAPlus'
  examDate: Date
  weeksAvailable: number
  recommendedPace: 'slow' | 'normal' | 'fast'
}
