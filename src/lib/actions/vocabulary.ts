'use server'

import { createClient } from '@/lib/supabase/server'
import { ICFES_VOCABULARY, VOCABULARY_BY_ID } from '@/data/icfes-vocabulary'
import { newProgress, scheduleNextReview, isDue, accuracy } from '@/lib/icfes/srs'
import type { ReviewGrade, VocabProgress, VocabularyCard } from '@/lib/types/icfes'

const NEW_PER_SESSION = 10
const SESSION_MAX = 20

/** DB row (snake_case) → VocabProgress. */
function rowToProgress(row: any): VocabProgress {
  return {
    word_key: row.word_key,
    status: row.status,
    box: row.box ?? 0,
    review_count: row.review_count ?? 0,
    total_attempts: row.total_attempts ?? 0,
    correct_attempts: row.correct_attempts ?? 0,
    next_review_at: row.next_review_at,
  }
}

/**
 * Build today's flashcard session: cards that are due (learning/review),
 * oldest-due first, topped up with a capped number of brand-new words.
 */
export async function getVocabularySession(
  userId: string
): Promise<{ success: boolean; cards?: VocabularyCard[]; error?: string }> {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || user.id !== userId) throw new Error('Unauthorized')

    const { data: rows, error } = await supabase
      .from('icfes_vocabulary_progress')
      .select('word_key, status, box, review_count, total_attempts, correct_attempts, next_review_at')
      .eq('user_id', userId)
    if (error) throw error

    const progressByKey = new Map<string, VocabProgress>()
    for (const row of rows ?? []) progressByKey.set(row.word_key, rowToProgress(row))

    const now = new Date()

    // Existing cards that are due (exclude brand-new — those are added below).
    const dueReviews = ICFES_VOCABULARY
      .filter((w) => progressByKey.has(w.id))
      .map((w) => ({ word: w, progress: progressByKey.get(w.id)! }))
      .filter((c) => isDue(c.progress, now))
      .sort((a, b) => {
        const at = a.progress.next_review_at ? Date.parse(a.progress.next_review_at) : 0
        const bt = b.progress.next_review_at ? Date.parse(b.progress.next_review_at) : 0
        return at - bt
      })

    // New words never seen, in catalog order, capped per session.
    const newCards: VocabularyCard[] = ICFES_VOCABULARY
      .filter((w) => !progressByKey.has(w.id))
      .slice(0, NEW_PER_SESSION)
      .map((w) => ({ word: w, progress: newProgress(w.id) }))

    const cards = [...dueReviews, ...newCards].slice(0, SESSION_MAX)
    return { success: true, cards }
  } catch (err) {
    console.error('getVocabularySession error:', err)
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' }
  }
}

/**
 * Record a flashcard grade: apply the SRS scheduler and persist the new state.
 */
export async function reviewVocabularyCard(
  userId: string,
  wordKey: string,
  grade: ReviewGrade
): Promise<{ success: boolean; progress?: VocabProgress; error?: string }> {
  try {
    if (!VOCABULARY_BY_ID[wordKey]) throw new Error(`Unknown word: ${wordKey}`)

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || user.id !== userId) throw new Error('Unauthorized')

    // Load current SRS state (or start fresh).
    const { data: existing, error: readErr } = await supabase
      .from('icfes_vocabulary_progress')
      .select('word_key, status, box, review_count, total_attempts, correct_attempts, next_review_at')
      .eq('user_id', userId)
      .eq('word_key', wordKey)
      .maybeSingle()
    if (readErr) throw readErr

    const current = existing ? rowToProgress(existing) : newProgress(wordKey)
    const now = new Date()
    const next = scheduleNextReview(current, grade, now)

    const { error: upsertErr } = await supabase
      .from('icfes_vocabulary_progress')
      .upsert(
        {
          user_id: userId,
          word_key: wordKey,
          status: next.status,
          box: next.box,
          review_count: next.review_count,
          total_attempts: next.total_attempts,
          correct_attempts: next.correct_attempts,
          accuracy: Math.round(accuracy(next) * 100),
          last_reviewed_at: now.toISOString(),
          next_review_at: next.next_review_at,
          mastered_at: next.status === 'mastered' ? now.toISOString() : null,
        },
        { onConflict: 'user_id,word_key' }
      )
    if (upsertErr) throw upsertErr

    // Keep the dashboard's mastered count in sync.
    const { count } = await supabase
      .from('icfes_vocabulary_progress')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('status', 'mastered')

    await supabase
      .from('icfes_student_profile_summary')
      .upsert(
        { user_id: userId, vocabulary_mastered: count ?? 0, updated_at: now.toISOString() },
        { onConflict: 'user_id' }
      )

    return { success: true, progress: next }
  } catch (err) {
    console.error('reviewVocabularyCard error:', err)
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' }
  }
}
