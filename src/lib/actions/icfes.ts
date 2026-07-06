'use server'

import { createClient } from '@/lib/supabase/server'
import type { OnboardingProfile, DiagnosticAnswer, DiagnosticResults } from '@/lib/types/icfes'

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
    // Upsert on user_id so re-running onboarding updates the profile in place
    // (the table has UNIQUE(user_id); a plain insert would throw on redo).
    const { data, error } = await supabase
      .from('icfes_onboarding')
      .upsert(
        {
          user_id: userId,
          initial_level: profile.level,
          min_per_day: profile.minPerDay,
          goal: profile.goal,
          // DATE column: send a local YYYY-MM-DD so an evening submission in
          // UTC-5 doesn't get truncated to the next calendar day.
          exam_date: toDateOnly(profile.examDate),
          weeks_available: profile.weeksAvailable,
          recommended_pace: profile.recommendedPace,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' }
      )
      .select('id')
      .single()

    if (error) throw error

    // Update or create profile summary
    const { error: summaryError } = await supabase
      .from('icfes_student_profile_summary')
      .upsert(
        {
          user_id: userId,
          onboarding_completed: true,
          current_level: profile.level,
          target_band: profile.goal === 'bandAPlus' ? 'A+' : profile.goal === 'bandA' ? 'A' : 'Pass',
          weeks_to_exam: profile.weeksAvailable,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' }
      )

    if (summaryError) throw summaryError

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
  answers: DiagnosticAnswer[],
  totalTimeSeconds: number
): Promise<{ success: boolean; resultId?: string; results?: DiagnosticResults; error?: string }> {
  try {
    const supabase = await createClient()

    // Verify user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || user.id !== userId) {
      throw new Error('Unauthorized')
    }

    if (answers.length === 0) {
      throw new Error('No answers to save')
    }

    // ── Score (single source of truth; the client renders what we return) ────
    const results = scoreDiagnostic(answers)
    const { overall_level, skill_levels, top_weaknesses, top_strengths } = results

    const completedAt = new Date()
    const startedAt = new Date(completedAt.getTime() - totalTimeSeconds * 1000)

    // Upsert the result row. UNIQUE(user_id) means a retake updates the
    // existing baseline in place (same id) rather than throwing.
    const { data: resultData, error: resultError } = await supabase
      .from('icfes_diagnostic_results')
      .upsert(
        {
          user_id: userId,
          test_started_at: startedAt.toISOString(),
          test_completed_at: completedAt.toISOString(),
          total_questions: answers.length,
          questions_answered: answers.length,
          overall_level,
          time_spent_seconds: totalTimeSeconds,
          skill_levels,
          top_weaknesses,
          top_strengths,
          recommendations: results.recommendations,
          is_active: true,
        },
        { onConflict: 'user_id' }
      )
      .select('id')
      .single()

    if (resultError) throw resultError

    // Clear any prior answers for this result before re-inserting (retake).
    const { error: clearError } = await supabase
      .from('icfes_diagnostic_answers')
      .delete()
      .eq('diagnostic_result_id', resultData.id)

    if (clearError) throw clearError

    const answersToInsert = answers.map((answer) => ({
      user_id: userId,
      diagnostic_result_id: resultData.id,
      question_number: answer.question_number,
      question_key: answer.question_key,
      student_answer: answer.student_answer,
      correct_answer: answer.correct_answer,
      is_correct: answer.is_correct,
      time_spent_seconds: answer.time_spent_seconds,
    }))

    const { error: answersError } = await supabase
      .from('icfes_diagnostic_answers')
      .insert(answersToInsert)

    if (answersError) throw answersError

    // Update profile summary (error-checked — silent failure hides RLS issues)
    const { error: summaryError } = await supabase
      .from('icfes_student_profile_summary')
      .upsert(
        {
          user_id: userId,
          diagnostic_completed: true,
          current_level: overall_level,
          updated_at: completedAt.toISOString(),
        },
        { onConflict: 'user_id' }
      )

    if (summaryError) throw summaryError

    return { success: true, resultId: resultData.id, results }
  } catch (error) {
    console.error('Error saving diagnostic:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Pure scoring of a diagnostic attempt. Single source of truth shared by the
 * server (persisted) and returned to the client (rendered) so the two can
 * never disagree. One pass over answers.
 */
function scoreDiagnostic(answers: DiagnosticAnswer[]): DiagnosticResults {
  const correctBySkill: Record<string, number> = {}
  const totalBySkill: Record<string, number> = {}
  let correct = 0

  for (const a of answers) {
    totalBySkill[a.skill] = (totalBySkill[a.skill] ?? 0) + 1
    if (a.is_correct) {
      correct++
      correctBySkill[a.skill] = (correctBySkill[a.skill] ?? 0) + 1
    } else {
      correctBySkill[a.skill] = correctBySkill[a.skill] ?? 0
    }
  }

  const skill_levels: Record<string, number> = {}
  for (const skill in totalBySkill) {
    skill_levels[skill] = Math.round(
      (correctBySkill[skill] / totalBySkill[skill]) * 100
    )
  }

  const overall_level = Math.round((correct / answers.length) * 100)

  const top_weaknesses = Object.entries(skill_levels)
    .filter(([, level]) => level < 65)
    .sort(([, a], [, b]) => a - b)
    .map(([skill]) => skill)
    .slice(0, 3)

  const top_strengths = Object.entries(skill_levels)
    .filter(([, level]) => level >= 75)
    .map(([skill]) => skill)

  return {
    overall_level,
    skill_levels,
    top_weaknesses,
    top_strengths,
    recommendations: generateRecommendations(top_weaknesses, overall_level),
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

/** Format a Date as a local YYYY-MM-DD string (no UTC shift) for DATE columns. */
function toDateOnly(d: Date): string {
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
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
